'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const {
    assertSuccessfulResponse,
    transactionDiagnostic,
    transactionPayload,
    transactionStatus,
} = require('./retail-base');
const { RetailTransferWorkload } = require('./retail-transfer');

test('assertSuccessfulResponse accepts explicit Caliper success', () => {
    assert.doesNotThrow(() => assertSuccessfulResponse('Mint', [{ status: 'success' }]));
});

test('assertSuccessfulResponse rejects returned setup failure', () => {
    assert.throws(
        () => assertSuccessfulResponse('Mint', [{ status: 'failed', error: 'wallet not found' }]),
        /setup Mint failed: wallet not found/,
    );
});

test('transaction helpers read Caliper method-based results', () => {
    const tx = {
        GetStatus: () => 'failed',
        GetResult: () => Buffer.from('MVCC_READ_CONFLICT'),
    };
    assert.equal(transactionStatus(tx), 'failed');
    assert.match(transactionDiagnostic(tx), /MVCC_READ_CONFLICT/);
    assert.equal(transactionPayload(tx), 'MVCC_READ_CONFLICT');
});

test('transactionPayload decodes typed byte arrays returned by Caliper', () => {
    const payload = new TextEncoder().encode('{"balance":42000}');
    assert.equal(transactionPayload({ GetResult: () => payload }), '{"balance":42000}');
});

test('duration workload rotates a STANDARD-only transaction plan', () => {
    const workload = new RetailTransferWorkload();
    workload.workerIndex = 0;
    workload.customers = [
        { id: 'basic', tier: 'BASIC' },
        { id: 'standard-1', tier: 'STANDARD' },
        { id: 'standard-2', tier: 'STANDARD' },
        { id: 'standard-3', tier: 'STANDARD' },
    ];
    workload.standardCustomers = workload.customers.filter(customer => customer.tier === 'STANDARD');
    workload.merchants = [{ id: 'merchant-1' }];

    workload.configureMeasuredTraffic(1, 1);

    assert.equal(workload.planTransaction(0).sender.id, 'standard-1');
    assert.equal(workload.planTransaction(1).sender.id, 'standard-1');
});

test('measured transfer returns a failed Caliper result without terminating the round', async () => {
    const failedResult = [{ status: 'failed', error: 'MVCC_READ_CONFLICT' }];
    const workload = new RetailTransferWorkload();
    workload.txIndex = 0;
    workload.transactionPlans = [{
        kind: 'customer',
        sender: { walletId: 'sender', perTxCap: 50000 },
        receiver: { walletId: 'receiver' },
    }];
    workload.randomState = 1;
    workload.sutAdapter = {
        sendRequests: async () => failedResult,
    };

    assert.equal(await workload.submitTransaction(), failedResult);
});

test('population setup completes wallets before serialized funding', async () => {
    const calls = [];
    const active = { setup: 0, mint: 0 };
    const maximum = { setup: 0, mint: 0 };
    const workload = new RetailTransferWorkload();
    workload.workerIndex = 0;
    workload.totalWorkers = 1;
    workload.roundIndex = 0;
    workload.submit = async (fn, args) => {
        calls.push({ fn, wallet: args[0] });
        const phase = fn === 'Mint' ? 'mint' : 'setup';
        active[phase] += 1;
        maximum[phase] = Math.max(maximum[phase], active[phase]);
        await new Promise(resolve => setImmediate(resolve));
        active[phase] -= 1;
        return [{ status: 'success' }];
    };

    await workload.seedPopulation({
        numCustomers: 2,
        numMerchants: 0,
        fundedRatio: 1,
        fundStandard: 5000000,
        fundBasic: 500000,
        seed: true,
    });

    const firstMint = calls.findIndex(call => call.fn === 'Mint');
    assert.ok(firstMint > 0);
    assert.ok(calls.slice(0, firstMint).every(call => call.fn !== 'Mint'));
    assert.ok(maximum.setup > 1);
    assert.equal(maximum.mint, 1);
    assert.equal(calls.filter(call => call.fn === 'Mint').length, 2);
});
