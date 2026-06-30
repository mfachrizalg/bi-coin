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

test('monetary operations workload alternates Mint and Burn on preplanned wallets', async () => {
    const { createWorkloadModule } = require('./monetary-ops');
    const workload = createWorkloadModule();
    const { calls, adapter } = captureAdapter();
    workload.sutAdapter = adapter;
    workload.customers = [standardCustomer(0), standardCustomer(1), standardCustomer(2)];
    workload.configureMeasuredTraffic(3);

    await workload.submitTransaction();
    await workload.submitTransaction();
    await workload.submitTransaction();

    assert.deepEqual(calls.map(call => call.contractFunction), ['Mint', 'Burn', 'Mint']);
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
