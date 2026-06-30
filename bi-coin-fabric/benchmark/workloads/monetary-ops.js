'use strict';

const { RetailWorkloadBase } = require('./retail-base');

/**
 * Monetary wallet-operation benchmark.
 *
 * Setup seeds funded wallets. Measured invocations alternate Mint and Burn on
 * unique wallet keys so MVCC contention does not dominate this functional profile.
 */
class MonetaryOpsWorkload extends RetailWorkloadBase {
    async initializeWorkloadModule(workerIndex, totalWorkers, roundIndex, roundArguments, sutAdapter, sutContext) {
        await super.initializeWorkloadModule(workerIndex, totalWorkers, roundIndex, roundArguments, sutAdapter, sutContext);
        this.workerIndex = workerIndex;
        this.totalWorkers = totalWorkers;
        this.roundIndex = roundIndex;

        const slots = this.arg('transactionSlots', 100);
        await this.seedPopulation({
            numCustomers: this.arg('wallets', slots),
            numMerchants: 0,
            fundedRatio: 1,
            fundStandard: this.arg('initialStandardBalance', 1000000),
            fundBasic: this.arg('initialBasicBalance', 100000),
        });
        this.configureMeasuredTraffic(slots);
    }

    configureMeasuredTraffic(transactionSlots) {
        if (this.customers.length < transactionSlots) {
            throw new Error(`insufficient monetary-operation wallets: need ${transactionSlots}, have ${this.customers.length}`);
        }
        this.transactionPlans = Array.from({ length: transactionSlots }, (_, slot) => ({
            kind: slot % 2 === 0 ? 'mint' : 'burn',
            wallet: this.customers[slot],
        }));
    }

    planTransaction(slot) {
        const plan = this.transactionPlans && this.transactionPlans[slot];
        if (!plan) throw new Error(`transaction slot ${slot} exceeds configured monetary-operation population`);
        return plan;
    }

    async submitTransaction() {
        const plan = this.planTransaction(this.txIndex++);
        const amount = Math.max(1000, Math.floor(plan.wallet.perTxCap / 100));
        return this.submit(plan.kind === 'mint' ? 'Mint' : 'Burn', [plan.wallet.walletId, amount]);
    }
}

function createWorkloadModule() {
    return new MonetaryOpsWorkload();
}

module.exports.createWorkloadModule = createWorkloadModule;
