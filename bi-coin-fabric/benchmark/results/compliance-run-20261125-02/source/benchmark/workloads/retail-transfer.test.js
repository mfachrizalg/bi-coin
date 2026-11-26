'use strict';

const assert = require('node:assert/strict');
const test = require('node:test');

const { createWorkloadModule } = require('./retail-transfer');

function makeWorkload(workerIndex) {
    const workload = createWorkloadModule();
    workload.workerIndex = workerIndex;
    workload.customers = Array.from({ length: 800 }, (_, i) => ({
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

test('measured traffic contains only customer-to-customer transfers', () => {
    const plans = [0, 1].flatMap(workerIndex => {
        const workload = makeWorkload(workerIndex);
        return Array.from({ length: 300 }, (_, slot) => workload.planTransaction(slot));
    });

    assert.ok(plans.every(plan => plan.sender && plan.receiver));
    const writableWallets = plans.flatMap(plan => [plan.sender.walletId, plan.receiver.walletId]);
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

test('measured traffic preserves distinct transfer pairs for small worker-scaling rounds', () => {
    const workload = createWorkloadModule();
    workload.workerIndex = 0;
    workload.customers = Array.from({ length: 100 }, (_, i) => ({
        id: `small_c_${i}`,
        walletId: `wlt_small_c_${i}`,
        tier: i % 5 === 0 ? 'BASIC' : 'STANDARD',
        perTxCap: i % 5 === 0 ? 250000 : 2500000,
    }));
    workload.standardCustomers = workload.customers.filter(customer => customer.tier === 'STANDARD');
    workload.configureMeasuredTraffic(40, 1);

    const plans = Array.from({ length: 40 }, (_, slot) => workload.planTransaction(slot));
    assert.equal(new Set(plans.flatMap(plan => [plan.sender.walletId, plan.receiver.walletId])).size, 80);
});
