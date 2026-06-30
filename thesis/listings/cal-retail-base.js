'use strict';

const { WorkloadModuleBase } = require('@hyperledger/caliper-core');

const CONTRACT = { contractId: 'digital-rupiah', contractVersion: '2.0' };

// Tier per-transaction caps (must match chaincode InitLedger).
const PER_TX_BASIC = 250000;
const PER_TX_STANDARD = 2500000;

/**
 * Shared base for the retail CBDC workloads.
 *
 * Seeds a worker- and round-partitioned population (customers and merchants) so
 * that load spreads across many distinct keys instead of a single hot key-pair.
 * Provides realistic Indonesian-retail amount sampling and selection helpers.
 *
 * IDs are namespaced per worker (and per round unless a fixed `scenario` is given) to
 * avoid "already exists" collisions and cross-worker MVCC contention on the same key.
 */
class RetailWorkloadBase extends WorkloadModuleBase {
    constructor() {
        super();
        this.customers = []; // { id, walletId, tier, perTxCap, funded }
        this.standardCustomers = []; // subset of customers on the STANDARD tier
        this.merchants = []; // { id, walletId }
        this.txIndex = 0;
    }

    arg(name, def) {
        const v = this.roundArguments ? this.roundArguments[name] : undefined;
        return v === undefined ? def : v;
    }

    // Namespace: per-worker+round by default; per-worker only when a fixed scenario is
    // set, so a follow-up round can address the same population.
    ns() {
        const scenario = this.arg('scenario', null);
        return scenario ? `${scenario}_w${this.workerIndex}` : `w${this.workerIndex}_r${this.roundIndex}`;
    }

    customerId(i) { return `c_${this.ns()}_${i}`; }
    merchantId(i) { return `m_${this.ns()}_${i}`; }
    walletId(ownerId) { return `wlt_${ownerId}`; }
    isBasic(i) { return i % 5 === 0; } // ~20% BASIC, rest STANDARD

    randInt(min, max) { return Math.floor(Math.random() * (max - min + 1)) + min; }
    pick(arr) { return arr[Math.floor(Math.random() * arr.length)]; }

    // Run async tasks with bounded concurrency. Seeding is otherwise sequential and, with
    // a 2s orderer BatchTimeout, far too slow; concurrency lets blocks cut on MaxMessageCount.
    async runPool(tasks, concurrency = 8) {
        let next = 0;
        const workers = Array.from({ length: Math.min(concurrency, tasks.length) }, async () => {
            while (next < tasks.length) {
                const i = next++;
                await tasks[i]();
            }
        });
        await Promise.all(workers);
    }

    async submit(fn, args, readOnly = false) {
        await this.sutAdapter.sendRequests({
            ...CONTRACT,
            contractFunction: fn,
            contractArguments: args.map(String),
            readOnly,
        });
    }

    // Small-value-heavy distribution typical of retail payments, clamped to cap.
    retailAmount(cap) {
        const r = Math.random();
        let a;
        if (r < 0.70) a = this.randInt(5000, 100000);
        else if (r < 0.92) a = this.randInt(100000, 500000);
        else if (r < 0.99) a = this.randInt(500000, 2000000);
        else a = this.randInt(2000000, 2500000);
        return Math.min(a, cap);
    }

    pickTwoDistinct() {
        if (this.customers.length < 2) return null;
        const a = this.randInt(0, this.customers.length - 1);
        let b = this.randInt(0, this.customers.length - 1);
        if (b === a) b = (b + 1) % this.customers.length;
        return [this.customers[a], this.customers[b]];
    }

    // Pick a STANDARD-tier receiver distinct from senderId. Routing most P2P receipts to
    // STANDARD wallets avoids expected BASIC balance-cap rejections dominating results.
    pickStandardReceiver(senderId) {
        if (this.standardCustomers.length === 0) return null;
        for (let attempt = 0; attempt < 5; attempt++) {
            const c = this.pick(this.standardCustomers);
            if (c.id !== senderId) return c;
        }
        return null;
    }

    /**
     * Seed merchants and customers (tier mix + funding).
     * `fundedRatio` of customers are funded normally; the remainder are underfunded.
     */
    async seedPopulation({ numCustomers, numMerchants, fundedRatio, fundStandard, fundBasic }) {
        const merchantTasks = [];
        for (let i = 0; i < numMerchants; i++) {
            const id = this.merchantId(i);
            const walletId = this.walletId(id);
            this.merchants.push({ id, walletId });
            merchantTasks.push(async () => {
                const profileId = `kyc_${id}`;
                const hashes = JSON.stringify([`sha256:${id}`]);
                await this.submit('SubmitKycProfile', [profileId, 'merchant', id, hashes]);
                await this.submit('RefreshKycProfile', [profileId, 'approved', 'low', 'standard', false, hashes, '2099-12-31T23:59:59Z']);
                await this.submit('CreateWallet', [walletId, id, 'MERCHANT']);
            });
        }
        await this.runPool(merchantTasks);

        const customerTasks = [];
        for (let i = 0; i < numCustomers; i++) {
            const id = this.customerId(i);
            const walletId = this.walletId(id);
            const basic = this.isBasic(i);
            const tier = basic ? 'BASIC' : 'STANDARD';
            const perTxCap = basic ? PER_TX_BASIC : PER_TX_STANDARD;
            const funded = (i / numCustomers) < fundedRatio;
            const fund = funded ? (basic ? fundBasic : fundStandard) : this.randInt(1000, 20000);
            const cust = { id, walletId, tier, perTxCap, funded };
            this.customers.push(cust);
            if (!basic) this.standardCustomers.push(cust);
            // Per-customer steps are ordered; different customers run concurrently.
            customerTasks.push(async () => {
                const profileId = `kyc_${id}`;
                const hashes = JSON.stringify([`sha256:${id}`]);
                const diligence = basic ? 'simplified' : 'standard';
                await this.submit('CreateRetailCustomer', [id, `sha256:identity:${id}`, walletId, profileId]);
                await this.submit('SubmitKycProfile', [profileId, 'retail_customer', id, hashes]);
                await this.submit('RefreshKycProfile', [profileId, 'approved', 'low', diligence, false, hashes, '2099-12-31T23:59:59Z']);
                await this.submit('CreateWallet', [walletId, id, tier]);
                if (fund > 0) {
                    await this.submit('Mint', [walletId, fund]);
                }
            });
        }
        await this.runPool(customerTasks);

    }
}

module.exports = { RetailWorkloadBase, CONTRACT, PER_TX_BASIC, PER_TX_STANDARD };
