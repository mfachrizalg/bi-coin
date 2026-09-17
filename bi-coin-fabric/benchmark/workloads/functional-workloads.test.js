'use strict';

const assert = require('node:assert/strict');
const test = require('node:test');

function captureAdapter() {
    const calls = [];
    return {
        calls,
        adapter: {
            async sendRequests(request) {
                calls.push(request);
                return [{ status: 'success' }];
            },
        },
    };
}

function standardCustomer(i, prefix = 'c') {
    return {
        id: `${prefix}_${i}`,
        walletId: `wlt_${prefix}_${i}`,
        tier: 'STANDARD',
        perTxCap: 2500000,
        funded: true,
    };
}

test('retail onboarding workload benchmarks the full onboarding workflow with unique identities', async () => {
    const { createWorkloadModule } = require('./retail-onboarding');
    const workload = createWorkloadModule();
    const { calls, adapter } = captureAdapter();
    workload.workerIndex = 1;
    workload.roundIndex = 2;
    workload.roundArguments = { scenario: 'kyc', tier: 'STANDARD' };
    workload.sutAdapter = adapter;

    await workload.submitTransaction();
    await workload.submitTransaction();

    assert.deepEqual(calls.map(call => call.contractFunction), [
        'CreateRetailCustomer',
        'SubmitKycProfile',
        'RefreshKycProfile',
        'CreateWallet',
        'CreateRetailCustomer',
        'SubmitKycProfile',
        'RefreshKycProfile',
        'CreateWallet',
    ]);
    assert.notEqual(calls[0].contractArguments[0], calls[4].contractArguments[0]);
    assert.notEqual(calls[3].contractArguments[0], calls[7].contractArguments[0]);
});

test('monetary operations workload burns distinct funded wallets', async () => {
    const { createWorkloadModule } = require('./monetary-ops');
    const workload = createWorkloadModule();
    const { calls, adapter } = captureAdapter();
    workload.sutAdapter = adapter;
    workload.roundArguments = { operationAmount: 1000 };
    workload.customers = [standardCustomer(0), standardCustomer(1), standardCustomer(2)];
    workload.configureMeasuredTraffic(3);
    calls.length = 0;
    await workload.submitTransaction();
    await workload.submitTransaction();
    await workload.submitTransaction();

    assert.deepEqual(calls.map(call => call.contractFunction), ['Burn', 'Burn', 'Burn']);
    assert.deepEqual(calls.map(call => call.contractArguments[0]), [
        'wlt_c_0',
        'wlt_c_1',
        'wlt_c_2',
    ]);
});

test('supervision read workload uses read-only query functions only', async () => {
    const { createWorkloadModule } = require('./supervision-reads');
    const workload = createWorkloadModule();
    const { calls, adapter } = captureAdapter();
    workload.sutAdapter = adapter;
    workload.customers = [standardCustomer(0), standardCustomer(1), standardCustomer(2)];
    workload.configureMeasuredTraffic(5);

    for (let i = 0; i < 5; i++) {
        await workload.submitTransaction();
    }

    assert.deepEqual(calls.map(call => call.contractFunction), [
        'GetWallet',
        'GetTotalSupply',
        'GetMetrics',
        'GetTransactionHistory',
        'GetSupervisionEvents',
    ]);
    assert.ok(calls.every(call => call.readOnly === true));
});

test('supervision history setup uses distinct STANDARD wallets', () => {
    const { SupervisionReadsWorkload } = require('./supervision-reads');
    const workload = new SupervisionReadsWorkload();
    workload.standardCustomers = [
        standardCustomer(0),
        standardCustomer(1),
        standardCustomer(2),
    ];

    const pairs = workload.planSeedTransfers(3);

    assert.deepEqual(
        pairs.map(({ sender, receiver }) => [sender.id, receiver.id]),
        [['c_0', 'c_1'], ['c_1', 'c_2'], ['c_2', 'c_0']],
    );
    assert.ok(pairs.every(({ sender, receiver }) =>
        sender.tier === 'STANDARD' && receiver.tier === 'STANDARD' && sender.id !== receiver.id));
});

test('admin policy workload writes unique auto-limit policy keys', async () => {
    const { createWorkloadModule } = require('./admin-policy');
    const workload = createWorkloadModule();
    const { calls, adapter } = captureAdapter();
    workload.workerIndex = 0;
    workload.roundIndex = 0;
    workload.roundArguments = { scenario: 'admin' };
    workload.sutAdapter = adapter;

    await workload.submitTransaction();
    await workload.submitTransaction();

    assert.deepEqual(calls.map(call => call.contractFunction), [
        'SetAutoLimitPolicy',
        'SetAutoLimitPolicy',
    ]);
    assert.notEqual(calls[0].contractArguments[0], calls[1].contractArguments[0]);
});
