'use strict';

const assert = require('node:assert/strict');
const test = require('node:test');

const { TransactionTypeWorkload } = require('./transaction-types');

function standardCustomer(i) {
    return {
        id: `customer-${i}`,
        walletId: `wlt-customer-${i}`,
        tier: 'STANDARD',
        perTxCap: 2500000,
    };
}

function captureWorkload(operation) {
    const workload = new TransactionTypeWorkload();
    const calls = [];
    workload.workerIndex = 0;
    workload.roundIndex = 0;
    workload.roundArguments = { operation, scenario: operation, operationAmount: 1000 };
    workload.sutAdapter = {
        async sendRequests(request) {
            calls.push(request);
            return [{ status: 'success' }];
        },
    };
    workload.operation = operation;
    return { workload, calls };
}

test('isolated workload maps each requested operation to its chaincode call', async () => {
    const cases = [
        ['issuance', 'Mint', 'BankIndonesiaOrgMSP'],
        ['distribution', 'DistributeToParticipant', 'BankIndonesiaOrgMSP'],
        ['redemption', 'Burn', 'BankIndonesiaOrgMSP'],
        ['balance-query', 'GetWallet', 'HimbaraBankOrgMSP'],
        ['wallet-freeze', 'FreezeWallet', 'BankIndonesiaOrgMSP'],
        ['wallet-unfreeze', 'UnfreezeWallet', 'BankIndonesiaOrgMSP'],
    ];

    for (const [operation, contractFunction, invokerMspId] of cases) {
        const { workload, calls } = captureWorkload(operation);
        workload.standardCustomers = [standardCustomer(0), standardCustomer(1)];
        workload.custodianParticipantId = 'himbara';
        workload.configureMeasuredTraffic(1);
        await workload.submitTransaction();

        assert.equal(calls[0].contractFunction, contractFunction, operation);
        assert.equal(calls[0].invokerMspId, invokerMspId, operation);
    }
});

test('retail transfer low contention creates disjoint sender and receiver pairs', () => {
    const { workload } = captureWorkload('retail-transfer');
    workload.standardCustomers = Array.from({ length: 6 }, (_, i) => standardCustomer(i));
    workload.contention = 'low';
    workload.configureMeasuredTraffic(3);

    const plans = workload.transactionPlans;
    assert.deepEqual(plans.map(plan => [plan.sender.id, plan.receiver.id]), [
        ['customer-0', 'customer-3'],
        ['customer-1', 'customer-4'],
        ['customer-2', 'customer-5'],
    ]);
    assert.equal(new Set(plans.flatMap(plan => [plan.sender.id, plan.receiver.id])).size, 6);
});

test('retail transfer high contention shares one sender and keeps receivers distinct', () => {
    const { workload } = captureWorkload('retail-transfer');
    workload.standardCustomers = Array.from({ length: 4 }, (_, i) => standardCustomer(i));
    workload.contention = 'high';
    workload.configureMeasuredTraffic(3);

    assert.equal(new Set(workload.transactionPlans.map(plan => plan.sender.id)).size, 1);
    assert.equal(new Set(workload.transactionPlans.map(plan => plan.receiver.id)).size, 3);
});

test('merchant payment is a direct Transfer to a merchant wallet', async () => {
    const { workload, calls } = captureWorkload('merchant-payment');
    workload.standardCustomers = [standardCustomer(0)];
    workload.merchants = [{ id: 'merchant-0', walletId: 'wlt-merchant-0' }];
    workload.configureMeasuredTraffic(1);
    await workload.submitTransaction();

    assert.equal(calls[0].contractFunction, 'Transfer');
    assert.deepEqual(calls[0].contractArguments.slice(0, 2), ['wlt-customer-0', 'wlt-merchant-0']);
});
