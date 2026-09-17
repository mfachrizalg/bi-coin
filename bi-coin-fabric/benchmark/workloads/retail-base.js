'use strict';

const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const { WorkloadModuleBase } = require('@hyperledger/caliper-core');

const CONTRACT = { contractId: 'digital-rupiah', contractVersion: '3.0' };

const ACTORS = Object.freeze({
    bi: { invokerMspId: 'BankIndonesiaOrgMSP', invokerIdentity: 'User1' },
    himbara: { invokerMspId: 'HimbaraBankOrgMSP', invokerIdentity: 'User1' },
    commercial: { invokerMspId: 'CommercialBankOrgMSP', invokerIdentity: 'User1' },
});

function actorRequest(request, actor = 'bi') {
    const identity = ACTORS[actor];
    if (!identity) throw new Error(`unknown Caliper actor: ${actor}`);
    return { ...request, ...identity };
}

// Tier per-transaction caps (must match chaincode InitLedger).
const PER_TX_BASIC = 250000;
const PER_TX_STANDARD = 2500000;

function transactionStatus(tx) {
    if (!tx) return '';
    const value = typeof tx.GetStatus === 'function' ? tx.GetStatus() : tx.status;
    return String(value || '').toLowerCase();
}

function transactionDiagnostic(tx) {
    if (!tx) return 'missing transaction result';
    const parts = [];
    for (const key of ['error', 'message', 'status']) {
        if (tx[key]) parts.push(String(tx[key]));
    }
    if (typeof tx.GetErrMsg === 'function') {
        try {
            parts.push(...tx.GetErrMsg().filter(Boolean).map(String));
        } catch {
            // Caliper result objects may omit error messages for transport failures.
        }
    }
    if (typeof tx.GetResult === 'function') {
        try {
            const result = tx.GetResult();
            if (result) parts.push(Buffer.isBuffer(result) ? result.toString('utf8') : typeof result === 'object' ? JSON.stringify(result) : String(result));
        } catch (error) {
            parts.push(String(error));
        }
    }
    return parts.join(' | ') || 'transaction failed without diagnostic';
}

function transactionPayload(tx) {
    if (!tx) return '';
    let value = tx.result;
    if (typeof tx.GetResult === 'function') {
        value = tx.GetResult();
    }
    if (Buffer.isBuffer(value)) return value.toString('utf8');
    if (ArrayBuffer.isView(value)) {
        return Buffer.from(value.buffer, value.byteOffset, value.byteLength).toString('utf8');
    }
    return typeof value === 'string' ? value : JSON.stringify(value || '');
}

function transactionResults(response) {
    return Array.isArray(response) ? response : [response];
}

function assertSuccessfulResponse(fn, response) {
    const results = transactionResults(response);
    if (results.length === 0) {
        throw new Error(`setup ${fn} returned no transaction result`);
    }
    for (const tx of results) {
        const status = transactionStatus(tx);
        if (status !== 'success') {
            throw new Error(`setup ${fn} failed: ${transactionDiagnostic(tx)}`);
        }
    }
}

/**
 * Shared base for the retail CBDC workloads.
 *
 * Seeds a worker- and round-partitioned population (customers and merchants) so
 * that load spreads across many distinct keys instead of a single hot key-pair.
 * Provides realistic Indonesian-retail amount sampling and selection helpers.
 *
 * Population IDs are namespaced per run and worker; transaction references remain
 * round-specific so setup is reusable across Caliper rounds.
 */
class RetailWorkloadBase extends WorkloadModuleBase {
    constructor() {
        super();
        this.customers = []; // { id, walletId, tier, perTxCap, funded }
        this.standardCustomers = []; // subset of customers on the STANDARD tier
        this.merchants = []; // { id, walletId }
        this.txIndex = 0;
        this.randomState = 1;
    }

    async initializeWorkloadModule(workerIndex, totalWorkers, roundIndex, roundArguments, sutAdapter, sutContext) {
        await super.initializeWorkloadModule(workerIndex, totalWorkers, roundIndex, roundArguments, sutAdapter, sutContext);
        this.workerIndex = workerIndex;
        this.roundIndex = roundIndex;
        this.totalWorkers = totalWorkers;
        const configuredSeed = Number(this.arg('seed', 20260725));
        this.randomState = (configuredSeed + (workerIndex + 1) * 1009 + (roundIndex + 1) * 9176) >>> 0;
    }

    arg(name, def) {
        const v = this.roundArguments ? this.roundArguments[name] : undefined;
        return v === undefined ? def : v;
    }

    // Namespace: per-worker+round by default. A scenario prefix lets multiple
    // benchmark profiles run on the same clean ledger without cross-profile key
    // collisions while still keeping each round isolated.
    ns() {
        const scenario = this.arg('scenario', null);
        const run = process.env.BENCHMARK_STAMP || '';
        const prefix = scenario ? `${scenario}_` : '';
        return `${run ? `${run}_` : ''}${prefix}w${this.workerIndex}_r${this.roundIndex}`;
    }

    populationNs() {
        const scenario = this.arg('scenario', null);
        const run = process.env.BENCHMARK_STAMP || '';
        const prefix = scenario ? `${scenario}_` : '';
        return `${run ? `${run}_` : ''}${prefix}w${this.workerIndex}`;
    }

    customerId(i) { return `c_${this.populationNs()}_${i}`; }
    merchantId(i) { return `m_${this.populationNs()}_${i}`; }
    walletId(ownerId) { return `wlt_${ownerId}`; }
    isBasic(i) { return i % 5 === 0; } // ~20% BASIC, rest STANDARD

    random() {
        this.randomState = (1664525 * this.randomState + 1013904223) >>> 0;
        return this.randomState / 0x100000000;
    }

    randInt(min, max) { return Math.floor(this.random() * (max - min + 1)) + min; }
    pick(arr) { return arr[Math.floor(this.random() * arr.length)]; }

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

    benchmarkCustodianId() {
        const scenario = this.arg('scenario', 'default');
        const run = process.env.BENCHMARK_STAMP || 'manual';
        return `bench_custodian_${run}_${scenario}`.replace(/[^a-zA-Z0-9_-]/g, '_');
    }

    custodianReadyPath() {
        const run = (process.env.BENCHMARK_STAMP || 'manual').replace(/[^a-zA-Z0-9_-]/g, '_');
        const scenario = String(this.arg('scenario', 'default')).replace(/[^a-zA-Z0-9_-]/g, '_');
        return path.join(os.tmpdir(), `bi-coin-${run}-${scenario}-custodian-ready`);
    }

    async withSetupLock(name, operation) {
        // ponytail: one process-wide setup lock; use per-wallet locks if fixtures ever share a ledger.
        const run = (process.env.BENCHMARK_STAMP || 'manual').replace(/[^a-zA-Z0-9_-]/g, '_');
        const lockPath = path.join(os.tmpdir(), `bi-coin-${run}-${name}.lock`);
        const lockOwnerPath = path.join(lockPath, 'owner');
        const started = Date.now();
        while (true) {
            try {
                fs.mkdirSync(lockPath);
                fs.writeFileSync(lockOwnerPath, String(process.pid));
                break;
            } catch (error) {
                if (error.code !== 'EEXIST') throw error;
                if (Date.now() - started > 600000) throw new Error(`timed out waiting for setup lock ${name}`);
                try {
                    const age = Date.now() - fs.statSync(lockPath).mtimeMs;
                    let stale = age > 900000;
                    try {
                        const owner = Number(fs.readFileSync(lockOwnerPath, 'utf8'));
                        if (Number.isInteger(owner) && owner > 0) {
                            try { process.kill(owner, 0); }
                            catch (ownerError) { if (ownerError.code === 'ESRCH') stale = true; }
                        } else if (age > 60000) {
                            stale = true;
                        }
                    } catch (ownerError) {
                        if (ownerError.code === 'ENOENT' && age > 60000) stale = true;
                    }
                    if (stale) fs.rmSync(lockPath, { recursive: true, force: true });
                } catch {
                    // Another worker may have released the lock between stat and removal.
                }
                await new Promise(resolve => setTimeout(resolve, 100));
            }
        }
        try {
            return await operation();
        } finally {
            fs.rmSync(lockPath, { recursive: true, force: true });
        }
    }

    async waitForCustodianReady() {
        const readyPath = this.custodianReadyPath();
        const started = Date.now();
        while (!fs.existsSync(readyPath)) {
            if (Date.now() - started > 600000) throw new Error('timed out waiting for benchmark custodian setup');
            await new Promise(resolve => setTimeout(resolve, 500));
        }
    }

    async waitForWallet(walletId, actor = 'himbara') {
        let lastError;
        for (let attempt = 0; attempt < 120; attempt++) {
            try {
                await this.submit('GetWallet', [walletId], true, actor);
                return;
            } catch (error) {
                lastError = error;
                await new Promise(resolve => setTimeout(resolve, 500));
            }
        }
        throw new Error(`benchmark custodian wallet was not seeded: ${lastError}`);
    }

    async ensureBenchmarkCustodian() {
        const participantId = this.benchmarkCustodianId();
        const walletId = this.walletId(participantId);
        this.custodianParticipantId = participantId;
        this.custodianWalletId = walletId;
        if (this.workerIndex !== 0) {
            // Wait for worker zero to finish participant approval and Treasury funding.
            await this.waitForCustodianReady();
            await this.waitForWallet(walletId);
            return;
        }

        return this.withSetupLock('custodian-setup', async () => {
            const target = BigInt(this.arg('custodianFunding', 20000000000));
            if (this.roundIndex === 0) fs.rmSync(this.custodianReadyPath(), { force: true });

            let participantExists = false;
            try {
                await this.submit('GetParticipant', [participantId], true, 'bi');
                participantExists = true;
            } catch {
                // Fresh ledgers have no benchmark custodian.
            }
            if (!participantExists) {
                await this.submit('SubmitParticipant', [
                    participantId,
                    'Benchmark Himbara Custodian',
                    'himbara.paynet',
                    `${participantId}-account`,
                    'validator',
                    '0',
                    'pending',
                ], false, 'himbara', true);
                await this.submit('ApproveParticipant', [participantId], false, 'bi', true);
            }
            await this.waitForWallet(walletId);

            let current = 0n;
            try {
                const response = await this.submit('GetWallet', [walletId], true, 'himbara');
                const payload = transactionPayload(transactionResults(response)[0]);
                if (payload) current = BigInt(JSON.parse(payload).balance || 0);
            } catch {
                // The approval transaction above creates the wallet on a fresh ledger.
            }
            if (current < target) {
                const delta = target - current;
                await this.submit('RequestIssuance', [delta.toString()], false, 'bi', true);
                await this.submit('DistributeToParticipant', [
                    participantId,
                    delta.toString(),
                    `bench-liquidity-${participantId}-${target.toString()}`,
                ], false, 'bi', true);
            }
            fs.writeFileSync(this.custodianReadyPath(), 'ready');
        });
    }

    async fundRetailWallet(walletId, amount, actor = 'himbara') {
        if (amount <= 0) return;
        await this.submit('Transfer', [this.custodianWalletId, walletId, amount], false, actor, true);
    }

    async submit(fn, args, readOnly = false, actor = 'bi', retrySetupConflicts = false) {
        if (fn === 'Transfer' && args.length === 3) args = [...args, `bench_${this.ns()}_${this.txIndex++}`];
        const execute = async () => {
            const attempts = retrySetupConflicts ? 5 : 1;
            for (let attempt = 0; attempt < attempts; attempt++) {
                const response = await this.sutAdapter.sendRequests(actorRequest({
                    ...CONTRACT,
                    contractFunction: fn,
                    contractArguments: args.map(String),
                    readOnly,
                }, actor));
                try {
                    assertSuccessfulResponse(fn, response);
                    return response;
                } catch (error) {
                    if (attempt + 1 === attempts) throw error;
                    await new Promise(resolve => setTimeout(resolve, 250 * (attempt + 1) + this.workerIndex * 113));
                }
            }
        };
        return fn === 'Transfer' && retrySetupConflicts
            ? this.withSetupLock('retail-funding', execute)
            : execute();
    }

    // Small-value-heavy distribution typical of retail payments, clamped to cap.
    retailAmount(cap) {
        const r = this.random();
        let a;
        if (r < 0.70) a = this.randInt(5000, 100000);
        else if (r < 0.92) a = this.randInt(100000, 500000);
        else if (r < 0.99) a = this.randInt(500000, 2000000);
        else a = this.randInt(2000000, 2500000);
        return Math.min(a, cap, this.arg('maxTransferAmount', cap));
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
    async seedPopulation({ numCustomers, numMerchants, fundedRatio, fundStandard, fundBasic, fundReceiverStandard = 1000000, fundReceivers = true, seed = this.roundIndex === 0, custodianSetup = true }) {
        this.customers = [];
        this.standardCustomers = [];
        this.merchants = [];
        if (custodianSetup) await this.ensureBenchmarkCustodian();
        const seedConcurrency = this.arg('seedConcurrency', 8);
        const merchantTasks = [];
        for (let i = 0; i < numMerchants; i++) {
            const id = this.merchantId(i);
            const walletId = this.walletId(id);
            this.merchants.push({ id, walletId });
            if (seed) merchantTasks.push(async () => {
                const profileId = `kyc_${id}`;
                const hashes = JSON.stringify([`sha256:${id}`]);
                await this.submit('SubmitKycProfile', [profileId, 'merchant', id, hashes], false, 'himbara', true);
                await this.submit('RefreshKycProfile', [profileId, 'approved', 'low', 'standard', false, hashes, '2099-12-31T23:59:59Z'], false, 'himbara', true);
                await this.submit('CreateWallet', [walletId, id, 'MERCHANT'], false, 'himbara', true);
            });
        }
        await this.runPool(merchantTasks, seedConcurrency);

        const customerTasks = [];
        const fundTasks = [];
        let standardIndex = 0;
        for (let i = 0; i < numCustomers; i++) {
            const id = this.customerId(i);
            const walletId = this.walletId(id);
            const basic = this.isBasic(i);
            const tier = basic ? 'BASIC' : 'STANDARD';
            const perTxCap = basic ? PER_TX_BASIC : PER_TX_STANDARD;
            const funded = (i / numCustomers) < fundedRatio;
            const sender = !basic && standardIndex < Number(this.arg('transactionSlots', 0));
            const fund = funded && (fundReceivers || sender)
                ? (basic ? fundBasic : sender ? fundStandard : fundReceiverStandard)
                : 0;
            const cust = { id, walletId, tier, perTxCap, funded };
            this.customers.push(cust);
            if (!basic) this.standardCustomers.push(cust);
            if (!basic) standardIndex++;
            // Per-customer steps are ordered; different customers run concurrently.
            if (seed) customerTasks.push(async () => {
                const profileId = `kyc_${id}`;
                const hashes = JSON.stringify([`sha256:${id}`]);
                const diligence = basic ? 'simplified' : 'standard';
                await this.submit('CreateRetailCustomer', [id, `sha256:identity:${id}`, walletId, profileId], false, 'himbara', true);
                await this.submit('SubmitKycProfile', [profileId, 'retail_customer', id, hashes], false, 'himbara', true);
                await this.submit('RefreshKycProfile', [profileId, 'approved', 'low', diligence, false, hashes, '2099-12-31T23:59:59Z'], false, 'himbara', true);
                await this.submit('CreateWallet', [walletId, id, tier], false, 'himbara', true);
            });
            if (seed && fund > 0) fundTasks.push(async () => {
                await this.fundRetailWallet(walletId, fund);
            });
        }
        await this.runPool(customerTasks, seedConcurrency);
        // The custodian reserve is a shared key; serialize setup funding to avoid MVCC conflicts.
        await this.runPool(fundTasks, 1);

    }
}

module.exports = {
    RetailWorkloadBase,
    CONTRACT,
    ACTORS,
    actorRequest,
    PER_TX_BASIC,
    PER_TX_STANDARD,
    assertSuccessfulResponse,
    transactionDiagnostic,
    transactionPayload,
    transactionResults,
    transactionStatus,
};
