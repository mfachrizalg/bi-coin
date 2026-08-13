'use strict';

const {
    RetailWorkloadBase,
    CONTRACT,
    PER_TX_BASIC,
    transactionResults,
    transactionStatus,
    transactionDiagnostic,
} = require('./retail-base');

const INFRASTRUCTURE_FAILURE = /proposalresponsepayloads do not match|channel has been shut down|failed to connect|deadline exceeded|unavailable|timeout|endorsement policy failure/i;

const DAILY_CAP_BASIC = 500000;   // TierBasic.DailyTxLimit
const MAX_BALANCE_BASIC = 2000000; // TierBasic.MaxBalance

/**
 * Boundary-value conformance workload.
 *
 * The negative-path workload shows that each policy rule fires on an input that
 * sits well inside the violating region. That does not show the cap is placed
 * correctly. This workload probes each cap from both sides: one submission whose
 * value lands exactly on the limit and must commit, and one a single rupiah past
 * it that must be rejected. A rule whose comparison is off by one passes the
 * negative-path suite and fails here.
 *
 * Chaincode semantics under test (compliance_policy.go): every cap is inclusive,
 * because each check rejects only when the value is strictly greater than the
 * limit, or, for the balance check, strictly less than the amount.
 *
 * Rules probed, one pair each:
 *   per-transaction cap   BASIC   250,000
 *   daily outgoing cap    BASIC   500,000
 *   receiver max balance  BASIC 2,000,000
 *   sender balance                exact drain
 *
 * Caliper issues submitTransaction calls concurrently, so the round cannot rely
 * on ordering. Every assertion therefore gets its own sender wallet and its own
 * receiver, and all state accumulation (partial daily spend, pre-filled receiver
 * balance, drained sender) happens during seeding, outside the measured round.
 * No two submissions in the round touch a shared key, so nothing here can be
 * rejected by an MVCC conflict.
 *
 * Note on Caliper accounting: rejection is the intended outcome for four of the
 * eight submissions, and Caliper scores a rejected submission as a failed
 * transaction. Read the "[boundary]" verdict logged at cleanup, not the raw
 * success/failure ratio.
 */
class BoundaryPathWorkload extends RetailWorkloadBase {
    constructor() {
        super();
        this.passed = 0;
        this.mismatches = 0;
        this.infrastructureErrors = 0;
        this.checks = [];
        this.cases = [];
        this.runNonce = Date.now().toString(36);
    }

    async initializeWorkloadModule(workerIndex, totalWorkers, roundIndex, roundArguments, sutAdapter, sutContext) {
        await super.initializeWorkloadModule(workerIndex, totalWorkers, roundIndex, roundArguments, sutAdapter, sutContext);
        this.workerIndex = workerIndex;
        this.totalWorkers = totalWorkers;
        this.roundIndex = roundIndex;
        await this.seedFixtures();
        this.buildCases();
    }

    // Cases depend on exact seeded balances and counters, so a rerun must not
    // inherit wallets from an earlier run on the same ledger. A per-run nonce
    // keeps every fixture key fresh; the workload is single-worker, so one
    // nonce covers the whole run.
    id(suffix) { return `bnd_${this.ns()}_${this.runNonce}_${suffix}`; }

    async createCustomer({ suffix, tier, fund = 0 }) {
        const id = this.id(suffix);
        const walletId = this.walletId(id);
        const profileId = `kyc_${id}`;
        const hashes = JSON.stringify([`sha256:${id}`]);
        const dd = tier === 'BASIC' ? 'simplified' : 'standard';
        await this.submit('CreateRetailCustomer', [id, `sha256:identity:${id}`, walletId, profileId]);
        await this.submit('SubmitKycProfile', [profileId, 'retail_customer', id, hashes]);
        await this.submit('RefreshKycProfile', [profileId, 'approved', 'low', dd, false, hashes, '2099-12-31T23:59:59Z']);
        await this.submit('CreateWallet', [walletId, id, tier]);
        if (fund > 0) await this.submit('Mint', [walletId, fund]);
        return { id, walletId, tier };
    }

    // One independent (sender, receiver) pair per assertion.
    async pair(name, { tier = 'BASIC', fund = 0, sinkFund = 0, sinkTier = 'STANDARD' } = {}) {
        const sender = await this.createCustomer({ suffix: `${name}_s`, tier, fund });
        const sink = await this.createCustomer({ suffix: `${name}_r`, tier: sinkTier, fund: sinkFund });
        return { sender, sink };
    }

    async seedFixtures() {
        // Per-transaction cap: funded far above the cap so only the
        // per-transaction rule can reject.
        this.pertxOver = await this.pair('pertx_over', { fund: 1000000 });
        this.pertxExact = await this.pair('pertx_exact', { fund: 1000000 });

        // Daily outgoing cap. The daily counter is advanced during seeding so the
        // round needs only one submission per assertion.
        this.dailyExact = await this.pair('daily_exact', { fund: 1000000 });
        await this.submit('Transfer', [this.dailyExact.sender.walletId, this.dailyExact.sink.walletId, 250000]);

        this.dailyOver = await this.pair('daily_over', { fund: 1000000 });
        await this.submit('Transfer', [this.dailyOver.sender.walletId, this.dailyOver.sink.walletId, 250000]);
        await this.submit('Transfer', [this.dailyOver.sender.walletId, this.dailyOver.sink.walletId, 250000]);

        // Receiver maximum balance. The BASIC receiver sits 1,000 below its
        // ceiling in the first case and exactly on it in the second. Mint applies
        // the same inclusive comparison, so funding to exactly the cap is allowed.
        this.recvExact = await this.pair('recv_exact', {
            tier: 'STANDARD', fund: 500000, sinkTier: 'BASIC', sinkFund: MAX_BALANCE_BASIC - 1000,
        });
        this.recvOver = await this.pair('recv_over', {
            tier: 'STANDARD', fund: 500000, sinkTier: 'BASIC', sinkFund: MAX_BALANCE_BASIC,
        });

        // Sender balance. One wallet holds exactly what it will send; the other is
        // drained during seeding so the round submission has nothing left.
        this.balExact = await this.pair('bal_exact', { fund: 200000 });
        this.balOver = await this.pair('bal_over', { fund: 200000 });
        await this.submit('Transfer', [this.balOver.sender.walletId, this.balOver.sink.walletId, 200000]);
    }

    buildCases() {
        this.cases = [
            { label: 'per-tx cap, exactly at limit', accept: true,
                args: () => [this.pertxExact.sender.walletId, this.pertxExact.sink.walletId, PER_TX_BASIC] },
            { label: 'per-tx cap, one past limit', accept: false,
                expected: /per-transaction limit exceeded/i,
                args: () => [this.pertxOver.sender.walletId, this.pertxOver.sink.walletId, PER_TX_BASIC + 1] },

            { label: 'daily outgoing cap, exactly at limit', accept: true,
                args: () => [this.dailyExact.sender.walletId, this.dailyExact.sink.walletId, DAILY_CAP_BASIC - 250000] },
            { label: 'daily outgoing cap, one past limit', accept: false,
                expected: /daily transaction limit exceeded/i,
                args: () => [this.dailyOver.sender.walletId, this.dailyOver.sink.walletId, 1] },

            { label: 'receiver max balance, exactly at limit', accept: true,
                args: () => [this.recvExact.sender.walletId, this.recvExact.sink.walletId, 1000] },
            { label: 'receiver max balance, one past limit', accept: false,
                expected: /exceed receiver max balance/i,
                args: () => [this.recvOver.sender.walletId, this.recvOver.sink.walletId, 1] },

            { label: 'sender balance, exact drain', accept: true,
                args: () => [this.balExact.sender.walletId, this.balExact.sink.walletId, 200000] },
            { label: 'sender balance, one past available', accept: false,
                expected: /insufficient balance/i,
                args: () => [this.balOver.sender.walletId, this.balOver.sink.walletId, 1] },
        ];
    }

    async expect(label, shouldCommit, args, expected) {
        const request = { ...CONTRACT, contractFunction: 'Transfer', contractArguments: [...args, `boundary_${this.ns()}_${this.txIndex++}`].map(String), readOnly: false };
        let committed;
        try {
            const res = await this.sutAdapter.sendRequests(request);
            const results = transactionResults(res);
            const diagnostics = results.map(transactionDiagnostic);
            const diagnosticText = diagnostics.join('\n');
            if (INFRASTRUCTURE_FAILURE.test(diagnosticText)) {
                this.infrastructureErrors += 1;
                committed = false;
            } else {
                const failed = results.filter(tx => transactionStatus(tx) === 'failed');
                committed = failed.length === 0;
                if (!shouldCommit && !committed && expected && !expected.test(diagnosticText)) {
                    this.infrastructureErrors += 1;
                }
            }
        } catch (err) {
            this.infrastructureErrors += 1;
            committed = false;
        }
        this.checks.push({ label, expected: shouldCommit ? 'commit' : 'reject', observed: committed ? 'commit' : 'reject' });
        if (committed === shouldCommit) {
            this.passed += 1;
            return;
        }
        this.mismatches += 1;
        console.error(`[boundary] MISMATCH: "${label}" expected ${shouldCommit ? 'commit' : 'reject'} but was ${committed ? 'committed' : 'rejected'}`);
    }

    async submitTransaction() {
        const c = this.cases[this.txIndex++ % this.cases.length];
        await this.expect(c.label, c.accept, c.args(), c.expected);
    }

    async cleanupWorkloadModule() {
        const total = this.passed + this.mismatches;
        console.log(JSON.stringify({
            event: 'boundary-oracle',
            worker: this.workerIndex,
            passed: this.passed,
            total,
            mismatches: this.mismatches,
            infrastructureErrors: this.infrastructureErrors,
            verdict: this.mismatches === 0 && this.infrastructureErrors === 0 ? 'PASS' : 'FAIL',
        }));
        const verdict = this.mismatches === 0 ? '(every cap inclusive and correctly placed)' : '(BOUNDARY DEFECT present)';
        console.log(`[boundary] worker ${this.workerIndex}: passed=${this.passed}/${total}, mismatches=${this.mismatches} ${verdict}`);
        for (const c of this.checks) {
            console.log(`[boundary]   ${c.label}: expected ${c.expected}, observed ${c.observed}`);
        }
    }
}

function createWorkloadModule() {
    return new BoundaryPathWorkload();
}

module.exports.createWorkloadModule = createWorkloadModule;
