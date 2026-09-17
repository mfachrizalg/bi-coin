'use strict';

const { RetailWorkloadBase, PER_TX_BASIC, PER_TX_STANDARD } = require('./retail-base');

/**
 * KYC/onboarding benchmark.
 *
 * One Caliper workload invocation executes the full retail onboarding workflow:
 * customer record, KYC submission, KYC approval refresh, and wallet creation.
 * IDs are unique per worker/round/transaction to avoid duplicate-key failures.
 */
class RetailOnboardingWorkload extends RetailWorkloadBase {
    async initializeWorkloadModule(workerIndex, totalWorkers, roundIndex, roundArguments, sutAdapter, sutContext) {
        await super.initializeWorkloadModule(workerIndex, totalWorkers, roundIndex, roundArguments, sutAdapter, sutContext);
        this.workerIndex = workerIndex;
        this.totalWorkers = totalWorkers;
        this.roundIndex = roundIndex;
    }

    nextSubject() {
        const slot = this.txIndex++;
        const id = `onboard_${this.ns()}_${slot}`;
        const walletId = this.walletId(id);
        const tier = this.arg('tier', 'STANDARD');
        const diligence = tier === 'BASIC' ? 'simplified' : 'standard';
        const perTxCap = tier === 'BASIC' ? PER_TX_BASIC : PER_TX_STANDARD;
        return { id, walletId, tier, diligence, perTxCap, profileId: `kyc_${id}` };
    }

    async submitTransaction() {
        const subject = this.nextSubject();
        const hashes = JSON.stringify([`sha256:${subject.id}`]);
        await this.submit('CreateRetailCustomer', [
            subject.id,
            `sha256:identity:${subject.id}`,
            subject.walletId,
            subject.profileId,
        ], false, 'himbara');
        await this.submit('SubmitKycProfile', [
            subject.profileId,
            'retail_customer',
            subject.id,
            hashes,
        ], false, 'himbara');
        await this.submit('RefreshKycProfile', [
            subject.profileId,
            'approved',
            'low',
            subject.diligence,
            false,
            hashes,
            '2099-12-31T23:59:59Z',
        ], false, 'himbara');
        await this.submit('CreateWallet', [
            subject.walletId,
            subject.id,
            subject.tier,
        ], false, 'himbara');
    }
}

function createWorkloadModule() {
    return new RetailOnboardingWorkload();
}

module.exports.createWorkloadModule = createWorkloadModule;
