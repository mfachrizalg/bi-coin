'use strict';

const { RetailWorkloadBase, CONTRACT, actorRequest } = require('./retail-base');

/**
 * Transfer-only retail CBDC workload:
 *   customer-to-customer transfer only
 *
 * Customer population is 20% BASIC and 80% STANDARD, while the measured
 * senders are STANDARD wallets so duration-based rounds do not fail because a
 * BASIC wallet reaches its deliberately small balance or transaction limit.
 * Merchant wallets are policy-derived MERCHANT wallets. All subjects receive
 * approved KYC anchors during deterministic seeding before measured traffic.
 */
class RetailTransferWorkload extends RetailWorkloadBase {
    async initializeWorkloadModule(workerIndex, totalWorkers, roundIndex, roundArguments, sutAdapter, sutContext) {
        await super.initializeWorkloadModule(workerIndex, totalWorkers, roundIndex, roundArguments, sutAdapter, sutContext);
        this.workerIndex = workerIndex;
        await this.seedPopulation({
            numCustomers: this.arg('customers', 200),
            numMerchants: this.arg('merchants', 20),
            fundedRatio: this.arg('fundedRatio', 1),
            fundStandard: this.arg('fundStandard', 20000000),
            fundBasic: this.arg('fundBasic', 500000),
            fundReceiverStandard: this.arg('fundReceiverStandard', 1000000),
        });
        this.configureMeasuredTraffic(this.arg('transactionSlots', 0), totalWorkers);
    }

    configureMeasuredTraffic(transactionSlots, totalWorkers) {
        this.transactionSlots = transactionSlots;
        this.totalWorkers = totalWorkers;

        const senders = this.standardCustomers.slice(0, transactionSlots);
        const receivers = this.standardCustomers.slice(transactionSlots, transactionSlots * 2);

        if (senders.length < transactionSlots || receivers.length < transactionSlots) {
            throw new Error(
                `insufficient contention-free population: need ${transactionSlots} senders, ` +
                `${transactionSlots} STANDARD receivers`,
            );
        }

        this.transactionPlans = Array.from({ length: transactionSlots }, (_, slot) => ({
            sender: senders[slot],
            receiver: receivers[slot],
        }));
    }

    planTransaction(slot) {
        const plan = this.transactionPlans && this.transactionPlans[slot % this.transactionPlans.length];
        if (!plan) throw new Error(`transaction slot ${slot} exceeds configured rotating population`);
        return plan;
    }

    async submitTransaction() {
        const plan = this.planTransaction(this.txIndex++);
        const contractArguments = [
            plan.sender.walletId,
            plan.receiver.walletId,
            this.retailAmount(plan.sender.perTxCap),
            `bench_${this.ns()}_${this.txIndex}`,
        ];

        // Measured failures belong in Caliper's metrics; only setup uses fail-closed submit().
        return this.sutAdapter.sendRequests(actorRequest({
            ...CONTRACT,
            contractFunction: 'Transfer',
            contractArguments: contractArguments.map(String),
            readOnly: false,
        }, 'himbara'));
    }
}

function createWorkloadModule() {
    return new RetailTransferWorkload();
}

module.exports.createWorkloadModule = createWorkloadModule;
module.exports.RetailTransferWorkload = RetailTransferWorkload;
