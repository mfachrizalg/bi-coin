'use strict';

const {
    RetailWorkloadBase,
    CONTRACT,
    PER_TX_BASIC,
    transactionDiagnostic,
    transactionResults,
    transactionStatus,
} = require('./retail-base');

/**
 * Negative-path conformance workload.
 *
 * Every transaction submitted here violates exactly one chaincode policy rule
 * and MUST be rejected. The workload records "enforced" (correctly rejected) vs
 * "gap" (unexpectedly accepted). A run with zero gaps means every rule rejected
 * as required; a gap is an enforcement defect and is surfaced as a Caliper
 * transaction failure.
 *
 * Note on Caliper accounting: on-chain rejection is the intended outcome here,
 * so Caliper will count the rejected submissions as failed transactions. Read
 * the per-worker "[negative-path]" line logged at cleanup for the conformance
 * verdict (enforced vs gap), not the raw success/failure ratio.
 *
 * Rules exercised: per-transaction cap, insufficient balance, receiver
 * maximum-balance cap, frozen sender, expired KYC, prohibited-risk approval,
 * and high-risk approval without senior sign-off.
 *
 * This is a scaffold: it is designed to run against the deployed chaincode and
 * report a conformance verdict. Verify each fixture's expected rejection reason
 * against the current chaincode before citing the numbers.
 */
class NegativePathWorkload extends RetailWorkloadBase {
    constructor() {
        super();
        this.enforced = 0;
        this.gaps = 0;
        this.oracleErrors = 0;
        this.cases = [];
    }

    async initializeWorkloadModule(workerIndex, totalWorkers, roundIndex, roundArguments, sutAdapter, sutContext) {
        await super.initializeWorkloadModule(workerIndex, totalWorkers, roundIndex, roundArguments, sutAdapter, sutContext);
        this.workerIndex = workerIndex;
        this.totalWorkers = totalWorkers;
        this.roundIndex = roundIndex;
        await this.seedFixtures();
        this.buildCases();
    }

    id(suffix) { return `neg_${this.ns()}_${suffix}`; }

    // Create an approved retail customer + wallet in a caller-chosen state so
    // each fixture sits in exactly the condition one negative case needs.
    async createCustomer({ suffix, tier, risk = 'low', diligence, senior = false, expiresAt = '2099-12-31T23:59:59Z', fund = 0 }) {
        const id = this.id(suffix);
        const walletId = this.walletId(id);
        const profileId = `kyc_${id}`;
        const hashes = JSON.stringify([`sha256:${id}`]);
        const dd = diligence || (tier === 'BASIC' ? 'simplified' : 'standard');
        await this.submit('CreateRetailCustomer', [id, `sha256:identity:${id}`, walletId, profileId]);
        await this.submit('SubmitKycProfile', [profileId, 'retail_customer', id, hashes]);
        await this.submit('RefreshKycProfile', [profileId, 'approved', risk, dd, senior, hashes, expiresAt]);
        await this.submit('CreateWallet', [walletId, id, tier]);
        if (fund > 0) await this.submit('Mint', [walletId, fund]);
        return { id, walletId, tier };
    }

    async seedFixtures() {
        const expiresAtMs = Date.now() + 60000;
        [
            this.basicSender,
            this.stdReceiver,
            this.poorSender,
            this.stdSender,
            this.fullReceiver,
            this.frozenSender,
            this.expiredSender,
        ] = await Promise.all([
            this.createCustomer({ suffix: 'basic_sender', tier: 'BASIC', fund: 500000 }),
            this.createCustomer({ suffix: 'std_receiver', tier: 'STANDARD', fund: 0 }),
            this.createCustomer({ suffix: 'poor_sender', tier: 'STANDARD', fund: 1000 }),
            this.createCustomer({ suffix: 'std_sender', tier: 'STANDARD', fund: 5000000 }),
            // Receiver near its BASIC max-balance cap (2,000,000).
            this.createCustomer({ suffix: 'full_receiver', tier: 'BASIC', fund: 1900000 }),
            this.createCustomer({ suffix: 'frozen_sender', tier: 'STANDARD', fund: 5000000 }),
            this.createCustomer({
                suffix: 'expired_sender',
                tier: 'STANDARD',
                expiresAt: new Date(expiresAtMs).toISOString(),
                fund: 5000000,
            }),
        ]);
        await this.submit('FreezeWallet', [this.frozenSender.walletId]);

        await Promise.all([
            this.seedProfile(this.id('prohibited')),
            this.seedProfile(this.id('highrisk')),
        ]);

        const waitMs = expiresAtMs - Date.now() + 1000;
        if (waitMs > 0) {
            await new Promise(resolve => setTimeout(resolve, waitMs));
        }
    }

    buildCases() {
        const cases = [
            { label: 'per-tx-cap', expected: /per-transaction limit exceeded/i, fn: 'Transfer', args: () => [this.basicSender.walletId, this.stdReceiver.walletId, PER_TX_BASIC + 50000] },
            { label: 'insufficient-balance', expected: /insufficient balance/i, fn: 'Transfer', args: () => [this.poorSender.walletId, this.stdReceiver.walletId, 500000] },
            { label: 'receiver-max-balance', expected: /exceed receiver max balance/i, fn: 'Transfer', args: () => [this.stdSender.walletId, this.fullReceiver.walletId, 200000] },
            { label: 'frozen-sender', expected: /sender wallet .* is frozen/i, fn: 'Transfer', args: () => [this.frozenSender.walletId, this.stdReceiver.walletId, 50000] },
            { label: 'prohibited-approval', fn: 'RefreshKycProfile',
                expected: /KYC risk level prohibited/i,
                args: () => [`kyc_${this.id('prohibited')}`, 'approved', 'prohibited', 'enhanced', true, JSON.stringify(['sha256:x']), '2099-12-31T23:59:59Z'] },
            { label: 'high-risk-no-senior', fn: 'RefreshKycProfile',
                expected: /high-risk subject requires enhanced due diligence and senior approval/i,
                args: () => [`kyc_${this.id('highrisk')}`, 'approved', 'high', 'enhanced', false, JSON.stringify(['sha256:x']), '2099-12-31T23:59:59Z'] },
            { label: 'expired-kyc', expected: /KYC profile expired/i, fn: 'Transfer', args: () => [this.expiredSender.walletId, this.stdReceiver.walletId, 50000] },
        ];
        this.cases = cases;
    }

    async seedProfile(subjectId) {
        await this.submit('SubmitKycProfile', [
            `kyc_${subjectId}`,
            'retail_customer',
            subjectId,
            JSON.stringify(['sha256:x']),
        ]);
    }

    recordExpectedRejection(label, expected, diagnostic) {
        if (expected.test(diagnostic)) {
            this.enforced += 1;
            return;
        }
        this.oracleErrors += 1;
        throw new Error(`[negative-path] ORACLE ERROR: "${label}" failed for an unexpected reason: ${diagnostic}`);
    }

    async expectReject(label, expected, fn, args) {
        const request = { ...CONTRACT, contractFunction: fn, contractArguments: args.map(String), readOnly: false };
        try {
            const response = await this.sutAdapter.sendRequests(request);
            const results = transactionResults(response);
            const failed = results.filter(tx => transactionStatus(tx) === 'failed');
            if (failed.length === results.length && failed.length > 0) {
                this.recordExpectedRejection(
                    label,
                    expected,
                    failed.map(transactionDiagnostic).join(' | '),
                );
                return;
            }
        } catch (err) {
            this.recordExpectedRejection(label, expected, String(err));
            return;
        }

        this.gaps += 1;
        const msg = `[negative-path] ENFORCEMENT GAP: "${label}" committed but a policy rule should reject it`;
        console.error(msg);
        throw new Error(msg);
    }

    async submitTransaction() {
        const c = this.cases[this.txIndex++ % this.cases.length];
        await this.expectReject(c.label, c.expected, c.fn, c.args());
    }

    async cleanupWorkloadModule() {
        const total = this.enforced + this.gaps + this.oracleErrors;
        const verdict = this.gaps === 0 && this.oracleErrors === 0
            ? '(all rules rejected for the expected reason)'
            : '(INVALID CONFORMANCE RUN)';
        console.log(`[negative-path] worker ${this.workerIndex}: enforced=${this.enforced}/${total}, gaps=${this.gaps}, oracle_errors=${this.oracleErrors} ${verdict}`);
    }
}

function createWorkloadModule() {
    return new NegativePathWorkload();
}

module.exports.createWorkloadModule = createWorkloadModule;
