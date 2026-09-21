'use strict';

const { RetailWorkloadBase } = require('./retail-base');

/**
 * Monetary wallet-operation benchmark.
 *
 * Setup establishes funded retail wallets through the Custodian path. Measured
 * redemptions burn one distinct wallet per slot, avoiding shared-key contention.
 */
class MonetaryOpsWorkload extends RetailWorkloadBase {
    async initializeWorkloadModule(workerIndex, totalWorkers, roundIndex, roundArguments, sutAdapter, sutContext) {
        await super.initializeWorkloadModule(workerIndex, totalWorkers, roundIndex, roundArguments, sutAdapter, sutContext);
        this.workerIndex = workerIndex;
        this.totalWorkers = totalWorkers;
        this.roundIndex = roundIndex;

        const slots = this.arg('transactionSlots', 100);
        await this.seedPopulation({
            numCustomers: slots,
            numMerchants: 0,
            fundedRatio: 1,
            fundStandard: this.arg('initialStandardBalance', 1000000),
            fundBasic: this.arg('initialBasicBalance', 100000),
            seed: true,
        });
        this.txIndex = 0;
        this.configureMeasuredTraffic(slots);
    }

    configureMeasuredTraffic(transactionSlots) {
        if (this.customers.length < transactionSlots) {
            throw new Error(`insufficient monetary-operation wallets: need ${transactionSlots}, have ${this.customers.length}`);
        }
        this.transactionPlans = Array.from({ length: transactionSlots }, (_, slot) => ({ wallet: this.customers[slot] }));
    }

    planTransaction(slot) {
        const plan = this.transactionPlans && this.transactionPlans[slot];
        if (!plan) throw new Error(`transaction slot ${slot} exceeds configured monetary-operation population`);
        return plan;
    }

    async submitTransaction() {
        const plan = this.planTransaction(this.txIndex++);
        const amount = this.arg('operationAmount', 100000);
        return this.submit('Burn', [plan.wallet.walletId, amount], false, 'bi');
    }
}

function createWorkloadModule() {
    return new MonetaryOpsWorkload();
}

module.exports.createWorkloadModule = createWorkloadModule;
