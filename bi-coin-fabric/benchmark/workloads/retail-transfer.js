'use strict';

const { RetailWorkloadBase } = require('./retail-base');

/**
 * Transfer-only retail CBDC workload:
 *   70% customer-to-customer transfer
 *   25% customer-to-merchant transfer
 *    5% wallet read
 *
 * Customer population is 20% BASIC and 80% STANDARD. Merchant wallets are
 * policy-derived MERCHANT wallets. All subjects receive approved KYC anchors
 * during deterministic seeding before measured traffic starts.
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

        const senders = this.customers.slice(0, transactionSlots);
        const receivers = this.customers
            .slice(transactionSlots)
            .filter(customer => customer.tier === 'STANDARD');
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
        const plan = this.transactionPlans && this.transactionPlans[slot];
        if (!plan) throw new Error(`transaction slot ${slot} exceeds configured contention-free population`);
        return plan;
    }

    async submitTransaction() {
        const plan = this.planTransaction(this.txIndex++);
        if (plan.kind === 'read') {
            return this.submit('GetWallet', [plan.customer.walletId], true);
        }
        const amount = this.retailAmount(plan.sender.perTxCap);
        return this.submit('Transfer', [plan.sender.walletId, plan.receiver.walletId, amount]);
    }
}

function createWorkloadModule() {
    return new RetailTransferWorkload();
}

module.exports.createWorkloadModule = createWorkloadModule;
