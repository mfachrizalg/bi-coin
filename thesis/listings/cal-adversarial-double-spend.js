'use strict';

const {
    RetailWorkloadBase,
    CONTRACT,
    transactionDiagnostic,
    transactionPayload,
    transactionResults,
    transactionStatus,
} = require('./retail-base');

/**
 * Adversarial aggregate-overspend / hot-key workload.
 *
 * All workers issue transfers from ONE shared sender wallet, so concurrent
 * transfers read the same balance version. The aggregate requested value is
 * deliberately greater than the sender's funded balance. Rejections are
 * classified from their actual diagnostics instead of being assumed to be MVCC.
 *
 * Requires >= 2 Caliper workers and an overlapping rate to create contention; a
 * single worker serialises submissions and will not conflict.
 *
 * Reports committed and rejected transactions by reason plus the final balance.
 * Each worker verifies the non-negative-balance invariant; the suite runner
 * verifies that at least one worker observed a rejection.
 */
class AdversarialDoubleSpendWorkload extends RetailWorkloadBase {
    constructor() {
        super();
        this.committed = 0;
        this.rejected = 0;
        this.rejectionReasons = {
            mvcc: 0,
            insufficientBalance: 0,
            endorsement: 0,
            other: 0,
        };
    }

    async initializeWorkloadModule(workerIndex, totalWorkers, roundIndex, roundArguments, sutAdapter, sutContext) {
        await super.initializeWorkloadModule(workerIndex, totalWorkers, roundIndex, roundArguments, sutAdapter, sutContext);
        this.workerIndex = workerIndex;
        this.totalWorkers = totalWorkers;
        this.roundIndex = roundIndex;
        this.transferAmount = this.arg('transferAmount', 1000);
        this.senderFunding = this.arg('senderFunding', 50000);
        await this.seedSharedSender();
        await this.seedReceivers(this.arg('receivers', 20));
    }

    // Shared across workers: namespaced by round only, NOT by worker.
    sharedSenderId() {
        const s = this.arg('scenario', null);
        return `${s ? s + '_' : ''}dblspend_sender_r${this.roundIndex}`;
    }

    async seedSharedSender() {
        const id = this.sharedSenderId();
        const walletId = this.walletId(id);
        const profileId = `kyc_${id}`;
        const hashes = JSON.stringify([`sha256:${id}`]);
        if (this.workerIndex === 0) {
            await this.submit('CreateRetailCustomer', [id, `sha256:identity:${id}`, walletId, profileId]);
            await this.submit('SubmitKycProfile', [profileId, 'retail_customer', id, hashes]);
            await this.submit('RefreshKycProfile', [profileId, 'approved', 'low', 'standard', false, hashes, '2099-12-31T23:59:59Z']);
            await this.submit('CreateWallet', [walletId, id, 'STANDARD']);
            await this.submit('Mint', [walletId, this.senderFunding]);
        } else {
            await this.waitForWallet(walletId);
        }
        this.senderWallet = walletId;
    }

    async waitForWallet(walletId) {
        let lastError;
        for (let attempt = 0; attempt < 120; attempt++) {
            try {
                await this.submit('GetWallet', [walletId], true);
                return;
            } catch (error) {
                lastError = error;
                await new Promise(resolve => setTimeout(resolve, 500));
            }
        }
        throw new Error(`shared sender was not seeded: ${lastError}`);
    }

    async seedReceivers(n) {
        this.receivers = [];
        const tasks = [];
        for (let i = 0; i < n; i++) {
            const rid = `dbl_rcv_${this.ns()}_${i}`;
            const walletId = this.walletId(rid);
            this.receivers.push(walletId);
            const profileId = `kyc_${rid}`;
            const hashes = JSON.stringify([`sha256:${rid}`]);
            tasks.push(async () => {
                await this.submit('CreateRetailCustomer', [rid, `sha256:identity:${rid}`, walletId, profileId]);
                await this.submit('SubmitKycProfile', [profileId, 'retail_customer', rid, hashes]);
                await this.submit('RefreshKycProfile', [profileId, 'approved', 'low', 'standard', false, hashes, '2099-12-31T23:59:59Z']);
                await this.submit('CreateWallet', [walletId, rid, 'STANDARD']);
            });
        }
        await this.runPool(tasks, this.arg('seedConcurrency', 2));
    }

    async submitTransaction() {
        const receiver = this.receivers[this.txIndex++ % this.receivers.length];
        const request = {
            ...CONTRACT,
            contractFunction: 'Transfer',
            contractArguments: [this.senderWallet, receiver, String(this.transferAmount)],
            readOnly: false,
        };
        try {
            const response = await this.sutAdapter.sendRequests(request);
            for (const tx of transactionResults(response)) {
                if (transactionStatus(tx) === 'success') {
                    this.committed += 1;
                } else {
                    this.recordRejection(transactionDiagnostic(tx));
                }
            }
        } catch (error) {
            this.recordRejection(String(error));
        }
    }

    recordRejection(diagnostic) {
        this.rejected += 1;
        if (/MVCC_READ_CONFLICT|mvcc/i.test(diagnostic)) {
            this.rejectionReasons.mvcc += 1;
        } else if (/insufficient balance/i.test(diagnostic)) {
            this.rejectionReasons.insufficientBalance += 1;
        } else if (/endorsement/i.test(diagnostic)) {
            this.rejectionReasons.endorsement += 1;
        } else {
            this.rejectionReasons.other += 1;
        }
    }

    async readFinalBalance() {
        const response = await this.sutAdapter.sendRequests({
            ...CONTRACT,
            contractFunction: 'GetWallet',
            contractArguments: [this.senderWallet],
            readOnly: true,
        });
        const tx = transactionResults(response)[0];
        if (transactionStatus(tx) !== 'success') {
            throw new Error(`final wallet read failed: ${transactionDiagnostic(tx)}`);
        }
        const wallet = JSON.parse(transactionPayload(tx));
        return Number(wallet.balance);
    }

    async cleanupWorkloadModule() {
        const finalBalance = await this.readFinalBalance();
        const invariant = Number.isFinite(finalBalance) && finalBalance >= 0;
        console.log(
            `[overspend-contention] worker ${this.workerIndex}: committed=${this.committed}, rejected=${this.rejected}, `
            + `mvcc=${this.rejectionReasons.mvcc}, insufficient_balance=${this.rejectionReasons.insufficientBalance}, `
            + `endorsement=${this.rejectionReasons.endorsement}, other=${this.rejectionReasons.other}, `
            + `final_balance=${finalBalance}, invariant=${invariant ? 'PASS' : 'FAIL'}`,
        );
        if (!invariant) {
            throw new Error('aggregate-overspend invariant failed');
        }
    }
}

function createWorkloadModule() {
    return new AdversarialDoubleSpendWorkload();
}

module.exports.createWorkloadModule = createWorkloadModule;
