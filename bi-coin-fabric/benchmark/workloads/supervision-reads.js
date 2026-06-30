'use strict';

const { RetailWorkloadBase } = require('./retail-base');

/**
 * Supervision/read benchmark.
 *
 * Setup creates a small funded population and optional transfer history. Measured
 * invocations are read-only queries, reported separately from write-heavy flows.
 */
class SupervisionReadsWorkload extends RetailWorkloadBase {
    async initializeWorkloadModule(workerIndex, totalWorkers, roundIndex, roundArguments, sutAdapter, sutContext) {
        await super.initializeWorkloadModule(workerIndex, totalWorkers, roundIndex, roundArguments, sutAdapter, sutContext);
        this.workerIndex = workerIndex;
        this.totalWorkers = totalWorkers;
        this.roundIndex = roundIndex;

        await this.seedPopulation({
            numCustomers: this.arg('customers', 100),
            numMerchants: this.arg('merchants', 10),
            fundedRatio: 1,
            fundStandard: this.arg('fundStandard', 1000000),
            fundBasic: this.arg('fundBasic', 100000),
        });

        const seedTransfers = this.arg('seedTransfers', 10);
        for (let i = 0; i < seedTransfers && i < this.customers.length && i < this.standardCustomers.length; i++) {
            const sender = this.customers[i];
            const receiver = this.standardCustomers[i];
            if (sender.id !== receiver.id) {
                await this.submit('Transfer', [sender.walletId, receiver.walletId, this.retailAmount(sender.perTxCap)]);
            }
        }

        this.configureMeasuredTraffic(this.arg('transactionSlots', 100));
    }

    configureMeasuredTraffic(transactionSlots) {
        if (this.customers.length === 0) {
            throw new Error('supervision read workload requires at least one customer wallet');
        }
        const functions = ['GetWallet', 'GetTotalSupply', 'GetMetrics', 'GetTransactionHistory', 'GetSupervisionEvents'];
        this.transactionPlans = Array.from({ length: transactionSlots }, (_, slot) => ({
            fn: functions[slot % functions.length],
            wallet: this.customers[slot % this.customers.length],
        }));
    }

    planTransaction(slot) {
        const plan = this.transactionPlans && this.transactionPlans[slot];
        if (!plan) throw new Error(`transaction slot ${slot} exceeds configured supervision-read plan`);
        return plan;
    }

    async submitTransaction() {
        const plan = this.planTransaction(this.txIndex++);
        if (plan.fn === 'GetWallet') {
            return this.submit('GetWallet', [plan.wallet.walletId], true);
        }
        if (plan.fn === 'GetTransactionHistory') {
            return this.submit('GetTransactionHistory', ['', '', '', '', ''], true);
        }
        return this.submit(plan.fn, [], true);
    }
}

function createWorkloadModule() {
    return new SupervisionReadsWorkload();
}

module.exports.createWorkloadModule = createWorkloadModule;
