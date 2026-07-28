'use strict';

const { RetailWorkloadBase, CONTRACT } = require('./retail-base');

/**
 * Transfer-only retail CBDC workload:
 *   70% customer-to-customer transfer
 *   25% customer-to-merchant transfer
 *    5% wallet read
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
            fundStandard: this.arg('fundStandard', 5000000),
            fundBasic: this.arg('fundBasic', 500000),
        });
        this.configureMeasuredTraffic(this.arg('transactionSlots', 0), totalWorkers);
    }

    operationKind(slot) {
        const totalSlots = this.transactionSlots * this.totalWorkers;
        const globalSlot = (slot * this.totalWorkers) + this.workerIndex;
        const phase = Math.floor((globalSlot * 100) / totalSlots);
        if (phase < 70) return 'customer';
        if (phase < 95) return 'merchant';
        return 'read';
    }

    configureMeasuredTraffic(transactionSlots, totalWorkers) {
        this.transactionSlots = transactionSlots;
        this.totalWorkers = totalWorkers;

        const senders = this.standardCustomers.slice(0, transactionSlots);
        const receivers = this.standardCustomers.slice(transactionSlots);
        const required = Array.from({ length: transactionSlots }, (_, slot) => this.operationKind(slot));
        const requiredReceivers = required.filter(kind => kind === 'customer').length;
        const requiredMerchants = required.filter(kind => kind === 'merchant').length;

        if (senders.length < transactionSlots || receivers.length < requiredReceivers || this.merchants.length < requiredMerchants) {
            throw new Error(
                `insufficient contention-free population: need ${transactionSlots} senders, ` +
                `${requiredReceivers} STANDARD receivers, and ${requiredMerchants} merchants`,
            );
        }

        let receiverIndex = 0;
        let merchantIndex = 0;
        this.transactionPlans = required.map((kind, slot) => {
            if (kind === 'customer') {
                return { kind, sender: senders[slot], receiver: receivers[receiverIndex++] };
            }
            if (kind === 'merchant') {
                return { kind, sender: senders[slot], receiver: this.merchants[merchantIndex++] };
            }
            return { kind, customer: senders[slot] };
        });
    }

    planTransaction(slot) {
        const plan = this.transactionPlans && this.transactionPlans[slot % this.transactionPlans.length];
        if (!plan) throw new Error(`transaction slot ${slot} exceeds configured rotating population`);
        return plan;
    }

    async submitTransaction() {
        const plan = this.planTransaction(this.txIndex++);
        const readOnly = plan.kind === 'read';
        const contractFunction = readOnly ? 'GetWallet' : 'Transfer';
        const contractArguments = readOnly
            ? [plan.customer.walletId]
            : [plan.sender.walletId, plan.receiver.walletId, this.retailAmount(plan.sender.perTxCap)];

        // Measured failures belong in Caliper's metrics; only setup uses fail-closed submit().
        return this.sutAdapter.sendRequests({
            ...CONTRACT,
            contractFunction,
            contractArguments: contractArguments.map(String),
            readOnly,
        });
    }
}

function createWorkloadModule() {
    return new RetailTransferWorkload();
}

module.exports.createWorkloadModule = createWorkloadModule;
module.exports.RetailTransferWorkload = RetailTransferWorkload;
