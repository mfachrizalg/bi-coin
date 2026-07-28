'use strict';

const assert = require('node:assert/strict');
const test = require('node:test');

const { createWorkloadModule } = require('./retail-transfer');

function makeWorkload(workerIndex) {
    const workload = createWorkloadModule();
    workload.workerIndex = workerIndex;
    workload.customers = Array.from({ length: 650 }, (_, i) => ({
        id: `c_w${workerIndex}_${i}`,
        walletId: `wlt_c_w${workerIndex}_${i}`,
        tier: i % 5 === 0 ? 'BASIC' : 'STANDARD',
        perTxCap: i % 5 === 0 ? 250000 : 2500000,
    }));
    workload.standardCustomers = workload.customers.filter(customer => customer.tier === 'STANDARD');
    workload.merchants = Array.from({ length: 80 }, (_, i) => ({
        id: `m_w${workerIndex}_${i}`,
        walletId: `wlt_m_w${workerIndex}_${i}`,
    }));
    workload.configureMeasuredTraffic(300, 2);
    return workload;
}

test('measured traffic keeps the 70/25/5 operation mix without reusing writable wallets', () => {
    const plans = [0, 1].flatMap(workerIndex => {
        const workload = makeWorkload(workerIndex);
        return Array.from({ length: 300 }, (_, slot) => workload.planTransaction(slot));
    });

    const counts = plans.reduce((result, plan) => {
        result[plan.kind]++;
        return result;
    }, { customer: 0, merchant: 0, read: 0 });
    assert.deepEqual(counts, { customer: 420, merchant: 150, read: 30 });

    const writableWallets = plans
        .filter(plan => plan.kind !== 'read')
        .flatMap(plan => [plan.sender.walletId, plan.receiver.walletId]);
    assert.equal(new Set(writableWallets).size, writableWallets.length);
});

test('measured traffic rejects a population too small to avoid contention', () => {
    const workload = createWorkloadModule();
    workload.workerIndex = 0;
    workload.customers = Array.from({ length: 100 }, (_, i) => ({
        id: `c_${i}`,
        walletId: `wlt_c_${i}`,
        tier: 'STANDARD',
        perTxCap: 2500000,
    }));
    workload.standardCustomers = workload.customers;
    workload.merchants = [];

    assert.throws(
        () => workload.configureMeasuredTraffic(300, 2),
        /insufficient contention-free population/,
    );
});

test('measured traffic preserves the operation mix for small worker-scaling rounds', () => {
    const workload = createWorkloadModule();
    workload.workerIndex = 0;
    workload.customers = Array.from({ length: 85 }, (_, i) => ({
        id: `small_c_${i}`,
        walletId: `wlt_small_c_${i}`,
        tier: i % 5 === 0 ? 'BASIC' : 'STANDARD',
        perTxCap: i % 5 === 0 ? 250000 : 2500000,
    }));
    workload.standardCustomers = workload.customers.filter(customer => customer.tier === 'STANDARD');
    workload.merchants = Array.from({ length: 10 }, (_, i) => ({
        id: `small_m_${i}`,
        walletId: `wlt_small_m_${i}`,
    }));

    workload.configureMeasuredTraffic(40, 1);

    const counts = Array.from({ length: 40 }, (_, slot) => workload.planTransaction(slot))
        .reduce((result, plan) => {
            result[plan.kind]++;
            return result;
        }, { customer: 0, merchant: 0, read: 0 });

    assert.deepEqual(counts, { customer: 28, merchant: 10, read: 2 });
});
