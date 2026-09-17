'use strict';

const { RetailWorkloadBase, CONTRACT, actorRequest } = require('./retail-base');

const OPERATIONS = Object.freeze([
    'issuance',
    'distribution',
    'retail-transfer',
    'merchant-payment',
    'redemption',
    'balance-query',
    'wallet-freeze',
    'wallet-unfreeze',
]);

function standardCountFor(required) {
    return Math.ceil(required * 5 / 4) + 5;
}

/**
 * Isolated transaction-type workload used by the statistical benchmark.
 *
 * The workload deliberately has no mixed transaction selector. Each Caliper
 * round names one operation, so its result can be attributed to one contract
 * function and one latency distribution.
 */
class TransactionTypeWorkload extends RetailWorkloadBase {
    constructor() {
        super();
        this.operation = 'retail-transfer';
        this.contention = 'low';
    }

    async initializeWorkloadModule(workerIndex, totalWorkers, roundIndex, roundArguments, sutAdapter, sutContext) {
        await super.initializeWorkloadModule(workerIndex, totalWorkers, roundIndex, roundArguments, sutAdapter, sutContext);
        this.workerIndex = workerIndex;
        this.totalWorkers = totalWorkers;
        this.roundIndex = roundIndex;
        this.operation = this.arg('operation', 'retail-transfer');
        this.contention = this.arg('contention', 'low');
        this.transactionSlots = Number(this.arg('transactionSlots', 100));
        if (!OPERATIONS.includes(this.operation)) {
            throw new Error(`unknown benchmark transaction operation: ${this.operation}`);
        }
        if (!['low', 'high'].includes(this.contention)) {
            throw new Error(`unknown benchmark contention mode: ${this.contention}`);
        }

        switch (this.operation) {
        case 'issuance':
            this.configureMeasuredTraffic(this.transactionSlots);
            break;
        case 'distribution':
            await this.ensureBenchmarkCustodian();
            this.configureMeasuredTraffic(this.transactionSlots);
            break;
        case 'retail-transfer':
            await this.seedPopulation({
                numCustomers: standardCountFor(this.contention === 'high' ? this.transactionSlots + 1 : this.transactionSlots * 2),
                numMerchants: 0,
                fundedRatio: 1,
                fundStandard: this.arg('fundStandard', 20000000),
                fundBasic: this.arg('fundBasic', 500000),
                fundReceiverStandard: this.arg('fundReceiverStandard', 1000000),
                fundReceivers: false,
            });
            this.configureMeasuredTraffic(this.transactionSlots);
            break;
        case 'merchant-payment':
            await this.seedPopulation({
                numCustomers: standardCountFor(this.transactionSlots),
                numMerchants: this.transactionSlots,
                fundedRatio: 1,
                fundStandard: this.arg('fundStandard', 20000000),
                fundBasic: this.arg('fundBasic', 500000),
                fundReceiverStandard: this.arg('fundReceiverStandard', 1000000),
                fundReceivers: false,
            });
            this.configureMeasuredTraffic(this.transactionSlots);
            break;
        case 'redemption':
            await this.seedPopulation({
                numCustomers: standardCountFor(this.transactionSlots),
                numMerchants: 0,
                fundedRatio: 1,
                fundStandard: this.arg('fundStandard', 1000000),
                fundBasic: this.arg('fundBasic', 500000),
                fundReceivers: false,
            });
            this.configureMeasuredTraffic(this.transactionSlots);
            break;
        case 'balance-query':
            await this.seedPopulation({
                numCustomers: standardCountFor(this.transactionSlots),
                numMerchants: 0,
                fundedRatio: 1,
                fundStandard: this.arg('fundStandard', 1000000),
                fundBasic: this.arg('fundBasic', 500000),
                fundReceivers: false,
            });
            this.configureMeasuredTraffic(this.transactionSlots);
            break;
        case 'wallet-freeze':
            await this.seedPopulation({
                numCustomers: standardCountFor(this.transactionSlots),
                numMerchants: 0,
                fundedRatio: 1,
                fundStandard: this.arg('fundStandard', 1000000),
                fundBasic: this.arg('fundBasic', 500000),
                fundReceivers: false,
            });
            this.configureMeasuredTraffic(this.transactionSlots);
            break;
        case 'wallet-unfreeze':
            await this.seedPopulation({
                numCustomers: standardCountFor(this.transactionSlots),
                numMerchants: 0,
                fundedRatio: 1,
                fundStandard: this.arg('fundStandard', 1000000),
                fundBasic: this.arg('fundBasic', 500000),
                fundReceivers: false,
            });
            await this.prepareUnfreezePlans();
            this.configureMeasuredTraffic(this.transactionSlots);
            break;
        default:
            throw new Error(`unsupported benchmark transaction operation: ${this.operation}`);
        }
    }

    configureMeasuredTraffic(transactionSlots) {
        this.transactionSlots = Number(transactionSlots);
        if (!Number.isInteger(this.transactionSlots) || this.transactionSlots < 1) {
            throw new Error('transactionSlots must be a positive integer');
        }

        if (this.operation === 'retail-transfer') {
            if (this.contention === 'high') {
                const sender = this.standardCustomers[0];
                const receivers = this.standardCustomers.slice(1, this.transactionSlots + 1);
                if (!sender || receivers.length < this.transactionSlots) {
                    throw new Error(`insufficient high-contention population: need ${this.transactionSlots + 1} STANDARD wallets`);
                }
                this.transactionPlans = receivers.map(receiver => ({ sender, receiver }));
            } else {
                const senders = this.standardCustomers.slice(0, this.transactionSlots);
                const receivers = this.standardCustomers.slice(this.transactionSlots, this.transactionSlots * 2);
                if (senders.length < this.transactionSlots || receivers.length < this.transactionSlots) {
                    throw new Error(`insufficient low-contention population: need ${this.transactionSlots * 2} STANDARD wallets`);
                }
                this.transactionPlans = senders.map((sender, slot) => ({ sender, receiver: receivers[slot] }));
            }
        } else if (this.operation === 'merchant-payment') {
            const senders = this.standardCustomers.slice(0, this.transactionSlots);
            const merchants = this.merchants.slice(0, this.transactionSlots);
            if (senders.length < this.transactionSlots || merchants.length < this.transactionSlots) {
                throw new Error(`insufficient merchant-payment population: need ${this.transactionSlots} senders and merchants`);
            }
            this.transactionPlans = senders.map((sender, slot) => ({ sender, receiver: merchants[slot] }));
        } else if (this.operation === 'redemption' || this.operation === 'balance-query'
            || this.operation === 'wallet-freeze' || this.operation === 'wallet-unfreeze') {
            const wallets = this.standardCustomers.slice(0, this.transactionSlots);
            if (wallets.length < this.transactionSlots) {
                throw new Error(`insufficient wallet population: need ${this.transactionSlots} STANDARD wallets`);
            }
            this.transactionPlans = wallets.map(wallet => ({ wallet }));
        } else {
            this.transactionPlans = Array.from({ length: this.transactionSlots }, (_, slot) => ({ slot }));
        }

    }

    async prepareUnfreezePlans() {
        const wallets = this.standardCustomers.slice(0, this.transactionSlots);
        for (const wallet of wallets) {
            await this.submit('FreezeWallet', [wallet.walletId], false, 'bi', true);
        }
    }

    planTransaction(slot) {
        const plan = this.transactionPlans && this.transactionPlans[slot % this.transactionPlans.length];
        if (!plan) throw new Error(`transaction slot ${slot} exceeds configured transaction plan`);
        return plan;
    }

    async measuredRequest(plan, contractFunction, contractArguments, readOnly, actor) {
        return this.sutAdapter.sendRequests(actorRequest({
            ...CONTRACT,
            contractFunction,
            contractArguments: contractArguments.map(String),
            readOnly,
        }, actor));
    }

    async submitTransaction() {
        const index = this.txIndex++;
        const plan = this.planTransaction(index);
        const amount = this.arg('operationAmount', 1000);

        switch (this.operation) {
        case 'issuance':
            return this.measuredRequest(plan, 'Mint', ['bi_treasury', amount], false, 'bi');
        case 'distribution':
            return this.measuredRequest(plan, 'DistributeToParticipant', [
                this.custodianParticipantId,
                amount,
                `distribution_${this.ns()}_${index}`,
            ], false, 'bi');
        case 'retail-transfer':
        case 'merchant-payment':
            return this.measuredRequest(plan, 'Transfer', [
                plan.sender.walletId,
                plan.receiver.walletId,
                Math.min(amount, plan.sender.perTxCap || amount),
                `transfer_${this.ns()}_${index}`,
            ], false, 'himbara');
        case 'redemption':
            return this.measuredRequest(plan, 'Burn', [plan.wallet.walletId, amount], false, 'bi');
        case 'balance-query':
            return this.measuredRequest(plan, 'GetWallet', [plan.wallet.walletId], true, 'himbara');
        case 'wallet-freeze':
            return this.measuredRequest(plan, 'FreezeWallet', [plan.wallet.walletId], false, 'bi');
        case 'wallet-unfreeze':
            return this.measuredRequest(plan, 'UnfreezeWallet', [plan.wallet.walletId], false, 'bi');
        default:
            throw new Error(`unsupported benchmark transaction operation: ${this.operation}`);
        }
    }
}

function createWorkloadModule() {
    return new TransactionTypeWorkload();
}

module.exports = { OPERATIONS, TransactionTypeWorkload, createWorkloadModule };
