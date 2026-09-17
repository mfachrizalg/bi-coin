'use strict';

const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const test = require('node:test');
const assert = require('node:assert/strict');
const {
    assertSuccessfulResponse,
    RetailWorkloadBase,
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

test('transactionDiagnostic preserves structured Caliper error details', () => {
    const tx = { GetStatus: () => 'failed', GetResult: () => ({ message: 'insufficient balance' }) };
    assert.match(transactionDiagnostic(tx), /insufficient balance/);
});

test('transactionDiagnostic includes Caliper error-message fields', () => {
    const tx = { GetStatus: () => 'failed', GetErrMsg: () => ['per-transaction limit exceeded'] };
    assert.match(transactionDiagnostic(tx), /per-transaction limit exceeded/);
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
    const active = { setup: 0, funding: 0 };
    const maximum = { setup: 0, funding: 0 };
    const workload = new RetailTransferWorkload();
    workload.workerIndex = 0;
    workload.totalWorkers = 1;
    workload.roundIndex = 0;
    workload.custodianWalletId = 'wlt_test_custodian';
    workload.submit = async (fn, args) => {
        calls.push({ fn, wallet: args[0] });
        const phase = fn === 'Transfer' ? 'funding' : 'setup';
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
        custodianSetup: false,
    });

    const firstFunding = calls.findIndex(call => call.fn === 'Transfer');
    assert.ok(firstFunding > 0);
    assert.ok(calls.slice(0, firstFunding).every(call => call.fn !== 'Transfer'));
    assert.ok(maximum.setup > 1);
    assert.equal(maximum.funding, 1);
    assert.equal(calls.filter(call => call.fn === 'Transfer').length, 2);
    assert.ok(calls.filter(call => call.fn === 'Transfer').every(call => call.wallet === 'wlt_test_custodian'));
});

test('benchmark setup seeds a shared custodian through Treasury distribution', async () => {
    const calls = [];
    const workload = new RetailTransferWorkload();
    workload.workerIndex = 0;
    workload.totalWorkers = 1;
    workload.roundIndex = 0;
    workload.roundArguments = { scenario: 'custodian-test', custodianFunding: 1000 };
    workload.sutAdapter = {
        sendRequests: async request => {
            calls.push(request);
            if (request.contractFunction === 'GetParticipant') return [{ status: 'failed', error: 'not found' }];
            if (request.contractFunction === 'GetWallet') return [{ status: 'success', result: JSON.stringify({ balance: 0 }) }];
            return [{ status: 'success' }];
        },
    };

    await workload.ensureBenchmarkCustodian();

    assert.deepEqual(calls.map(call => call.contractFunction), [
        'GetParticipant',
        'SubmitParticipant',
        'ApproveParticipant',
        'GetWallet',
        'GetWallet',
        'RequestIssuance',
        'DistributeToParticipant',
    ]);
    assert.equal(calls[1].invokerMspId, 'HimbaraBankOrgMSP');
    assert.equal(calls[5].invokerMspId, 'BankIndonesiaOrgMSP');
    assert.equal(calls[6].contractArguments[1], '1000');
});

test('setup lock recovers a dead owner', async () => {
    const stamp = `lock-recovery-${process.pid}`;
    const lockPath = path.join(os.tmpdir(), `bi-coin-${stamp}-retail-funding.lock`);
    const ownerPath = path.join(lockPath, 'owner');
    const previousStamp = process.env.BENCHMARK_STAMP;
    process.env.BENCHMARK_STAMP = stamp;
    fs.mkdirSync(lockPath);
    fs.writeFileSync(ownerPath, '99999999');

    try {
        let executed = false;
        await new RetailWorkloadBase().withSetupLock('retail-funding', async () => {
            executed = true;
        });
        assert.equal(executed, true);
        assert.equal(fs.existsSync(lockPath), false);
    } finally {
        fs.rmSync(lockPath, { recursive: true, force: true });
        if (previousStamp === undefined) delete process.env.BENCHMARK_STAMP;
        else process.env.BENCHMARK_STAMP = previousStamp;
    }
});
