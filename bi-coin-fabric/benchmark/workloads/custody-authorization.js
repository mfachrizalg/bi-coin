'use strict';

const {
    RetailWorkloadBase,
    CONTRACT,
    ACTORS,
    actorRequest,
    transactionDiagnostic,
    transactionPayload,
    transactionResults,
    transactionStatus,
} = require('./retail-base');

const INFRASTRUCTURE_FAILURE = /proposalresponsepayloads do not match|channel has been shut down|failed to connect|deadline exceeded|unavailable|timeout|endorsement policy failure/i;

/**
 * Proves that a wallet is spendable only through its custodian MSP.
 * Setup runs as BI; the measured transfer is submitted by Himbara and must
 * fail with a chaincode custody error, not an infrastructure/endorsement error.
 */
class CustodyAuthorizationWorkload extends RetailWorkloadBase {
    async initializeWorkloadModule(workerIndex, totalWorkers, roundIndex, roundArguments, sutAdapter, sutContext) {
        await super.initializeWorkloadModule(workerIndex, totalWorkers, roundIndex, roundArguments, sutAdapter, sutContext);
        this.workerIndex = workerIndex;
        this.sender = `auth_sender_${this.ns()}`;
        this.receiver = `auth_receiver_${this.ns()}`;
        this.senderWallet = this.walletId(this.sender);
        this.receiverWallet = this.walletId(this.receiver);
        const hashes = JSON.stringify([`sha256:${this.sender}`]);

        await this.submit('CreateRetailCustomer', [this.sender, `sha256:identity:${this.sender}`, this.senderWallet, `kyc_${this.sender}`], false, 'bi');
        await this.submit('SubmitKycProfile', [`kyc_${this.sender}`, 'retail_customer', this.sender, hashes], false, 'bi');
        await this.submit('RefreshKycProfile', [`kyc_${this.sender}`, 'approved', 'low', 'standard', false, hashes, '2099-12-31T23:59:59Z'], false, 'bi');
        await this.submit('CreateWallet', [this.senderWallet, this.sender, 'STANDARD'], false, 'bi');
        await this.submit('CreateRetailCustomer', [this.receiver, `sha256:identity:${this.receiver}`, this.receiverWallet, `kyc_${this.receiver}`], false, 'bi');
        await this.submit('SubmitKycProfile', [`kyc_${this.receiver}`, 'retail_customer', this.receiver, hashes], false, 'bi');
        await this.submit('RefreshKycProfile', [`kyc_${this.receiver}`, 'approved', 'low', 'standard', false, hashes, '2099-12-31T23:59:59Z'], false, 'bi');
        await this.submit('CreateWallet', [this.receiverWallet, this.receiver, 'STANDARD'], false, 'bi');
        await this.submit('Mint', [this.senderWallet, '100000'], false, 'bi');
    }

    async submitTransaction() {
        const response = await this.sutAdapter.sendRequests(actorRequest({
            ...CONTRACT,
            contractFunction: 'Transfer',
            contractArguments: [this.senderWallet, this.receiverWallet, '1000', `custody_${this.ns()}_himbara`],
            readOnly: false,
        }, 'himbara'));
        const results = transactionResults(response);
        const diagnostics = results.map(transactionDiagnostic);
        const failed = results.filter((tx) => transactionStatus(tx) === 'failed');
        const infrastructure = diagnostics.filter((message) => INFRASTRUCTURE_FAILURE.test(message));
        // Peer-gateway reports a chaincode rejection as a generic ABORTED status,
        // so the TxStatus payload does not carry the chaincode's custody message.
        // Prove the rejection by checking both balances stayed unchanged.
        let unchanged = false;
        if (failed.length === results.length && infrastructure.length === 0) {
            const [senderResult, receiverResult] = await Promise.all([
                this.submit('GetWallet', [this.senderWallet], true, 'bi'),
                this.submit('GetWallet', [this.receiverWallet], true, 'bi'),
            ]);
            const balance = (response) => {
                try {
                    return JSON.parse(transactionPayload(transactionResults(response)[0])).balance;
                } catch (error) {
                    return undefined;
                }
            };
            unchanged = balance(senderResult) === 100000 && balance(receiverResult) === 0;
        }
        const custody = unchanged ? results : diagnostics.filter((message) => /custod|msp|caller/i.test(message));
        const oracle = {
            event: 'authorization-oracle',
            worker: this.workerIndex,
            actor: ACTORS.himbara,
            targetCustodian: ACTORS.bi.invokerMspId,
            total: results.length,
            failed: failed.length,
            custodyErrors: custody.length,
            infrastructureErrors: infrastructure.length,
            verdict: failed.length === results.length && custody.length === results.length && infrastructure.length === 0 ? 'PASS' : 'FAIL',
        };
        console.log(JSON.stringify(oracle));
        if (oracle.verdict !== 'PASS') {
            throw new Error(`authorization oracle failed: ${JSON.stringify(oracle)}; ${diagnostics.join(' | ')}`);
        }
        return response;
    }
}

function createWorkloadModule() {
    return new CustodyAuthorizationWorkload();
}

module.exports = { CustodyAuthorizationWorkload, createWorkloadModule };
