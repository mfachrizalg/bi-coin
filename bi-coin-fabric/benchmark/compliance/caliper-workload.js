'use strict';

const fs = require('node:fs');
const path = require('node:path');
const { WorkloadModuleBase } = require('@hyperledger/caliper-core');
const { transactionDiagnostic, transactionPayload, transactionResults, transactionStatus } = require('../workloads/retail-base');
const { classifyFailure, failureConfidence } = require('./failure-classifier');
const { mapSigner } = require('./signer-map');

class ComplianceWorkload extends WorkloadModuleBase {
    async initializeWorkloadModule(workerIndex, totalWorkers, roundIndex, roundArguments, sutAdapter, sutContext) {
        await super.initializeWorkloadModule(workerIndex, totalWorkers, roundIndex, roundArguments, sutAdapter, sutContext);
        this.fixtureDocument = JSON.parse(fs.readFileSync(path.resolve(roundArguments.fixturePath), 'utf8'));
        this.fixtures = this.fixtureDocument.fixtures.ledger.items;
        this.identities = JSON.parse(fs.readFileSync(path.resolve(roundArguments.identityMapPath), 'utf8'));
        if (!this.fixtures.length) throw new Error('fixture pool is empty');
        if (this.fixtureDocument.scenario !== roundArguments.operationId) throw new Error('fixture scenario does not match the Caliper round');
        this.txIndex = 0;
        this.windowStart = null;
        this.eventsPath = path.resolve(roundArguments.eventsPath);
        fs.mkdirSync(path.dirname(this.eventsPath), { recursive: true });
        this.events = fs.createWriteStream(this.eventsPath, { flags: 'wx' });
    }

    async submitTransaction() {
        const submittedAt = Date.now();
        if (this.windowStart === null) this.windowStart = submittedAt;
        const fixtureIndex = this.txIndex;
        const fixture = this.fixtures[fixtureIndex % this.fixtures.length];
        if (fixtureIndex >= this.fixtures.length && !this.fixtureDocument.fixtures.ledger.reuse) {
            throw new Error(`fixture pool exhausted for ${this.roundArguments.operationId}`);
        }
        this.txIndex += 1;
        const signer = mapSigner(fixture, this.identities);
        const request = {
            contractId: fixture.chaincode,
            contractFunction: fixture.transaction,
            contractArguments: fixture.args.map(String),
            invokerIdentity: signer.invokerIdentity,
            invokerMspId: signer.invokerMspId,
            channel: this.roundArguments.channel,
            readOnly: fixture.read_only,
            timeout: this.roundArguments.timeoutSeconds,
        };

        try {
            const response = await this.sutAdapter.sendRequests(request);
            for (const result of transactionResults(response)) this.recordResult(result, fixture, fixtureIndex, submittedAt);
            return response;
        } catch (error) {
            this.writeEvent({
                operation_id: this.roundArguments.operationId,
                fixture_index: fixtureIndex,
                identity: fixture.identity,
                msp_id: fixture.msp_id,
                chaincode: fixture.chaincode,
                transaction: fixture.transaction,
                reference: fixture.reference || null,
                started_at_ms: submittedAt,
                completed_at_ms: Date.now(),
                status: /timeout|deadline/i.test(error.message || '') ? 'timeout' : 'failed',
                verified: false,
                failure_class: classifyFailure(error),
                failure_confidence: failureConfidence(error),
                diagnostic: error.message || String(error),
                validation_code: validationCode(error.message || String(error)),
            });
            throw error;
        }
    }

    recordResult(result, fixture, fixtureIndex, submittedAt) {
        const observedCreate = readTime(result, 'GetTimeCreate');
        const observedFinal = readTime(result, 'GetTimeFinal');
        const startedAt = epochMilliseconds(observedCreate) ?? submittedAt;
        const completedAt = epochMilliseconds(observedFinal) ?? Date.now();
        const status = transactionStatus(result);
        const diagnostic = status === 'success' ? '' : transactionDiagnostic(result);
        const failureClass = status === 'success' ? null : classifyFailure(diagnostic);
        const payload = transactionPayload(result);
        const readVerified = fixture.read_only ? verifyQuery(fixture.transaction, payload) : true;
        const id = typeof result?.GetID === 'function' ? result.GetID() : result?.id;
        this.writeEvent({
            operation_id: this.roundArguments.operationId,
            round_label: this.roundArguments.roundLabel,
            fixture_index: fixtureIndex,
            transaction_id: id || null,
            identity: fixture.identity,
            msp_id: fixture.msp_id,
            chaincode: fixture.chaincode,
            transaction: fixture.transaction,
            reference: fixture.reference || null,
            read_only: fixture.read_only,
            started_at_ms: startedAt,
            completed_at_ms: completedAt,
            latency_ms: Number.isFinite(observedCreate) && Number.isFinite(observedFinal) && observedFinal >= observedCreate
                ? observedFinal - observedCreate
                : completedAt - startedAt,
            caliper_time_create: Number.isFinite(observedCreate) ? observedCreate : null,
            caliper_time_final: Number.isFinite(observedFinal) ? observedFinal : null,
            status,
            verified: status === 'success' && Boolean(id) && readVerified,
            semantic_verification: fixture.read_only ? (readVerified ? 'response-shape' : 'invalid-query-result') : 'committed-status',
            failure_class: failureClass,
            failure_confidence: status === 'success' ? null : failureConfidence(diagnostic, failureClass),
            diagnostic,
            validation_code: validationCode(diagnostic),
            result: fixture.read_only ? payload : undefined,
        });
    }

    writeEvent(value) {
        this.events.write(`${JSON.stringify(value)}\n`);
    }

    async cleanupWorkloadModule() {
        if (!this.events) return;
        await new Promise((resolve, reject) => this.events.end(error => (error ? reject(error) : resolve())));
    }
}

function verifyQuery(transaction, payload) {
    if (transaction === 'GetCallerIdentity') return typeof payload === 'string' && payload.length > 0;
    if (['CanPay', 'CanActFor'].includes(transaction)) return payload === 'true' || payload === 'false';
    if (['GetWholesaleSupply', 'GetRetailSupply', 'GetTotalSupply', 'GetReserve', 'GetRetailFloat', 'GetBalance'].includes(transaction)) return Number.isSafeInteger(Number(payload));
    if (['GetLimits', 'GetSubject', 'GetReceipt'].includes(transaction)) {
        try {
            const value = JSON.parse(payload);
            if (!value || typeof value !== 'object') return false;
            if (transaction === 'GetSubject') return typeof value.status === 'string';
            if (transaction === 'GetReceipt') return typeof value.reference === 'string';
            return true;
        } catch {
            return false;
        }
    }
    return false;
}

function validationCode(message) {
    const text = String(message || '');
    const known = text.match(/\b(MVCC_READ_CONFLICT|PHANTOM_READ_CONFLICT|ENDORSEMENT_POLICY_FAILURE|INVALID_ENDORSER_TRANSACTION|DUPLICATE_TXID|BAD_RWSET|MARSHAL_TX_ERROR)\b/i);
    if (known) return known[1].toUpperCase();
    const labeled = text.match(/(?:validation code|code)\s*[:=]\s*([A-Z_]+)/i);
    return labeled ? labeled[1].toUpperCase() : null;
}

function readTime(result, method) {
    try {
        return typeof result?.[method] === 'function' ? Number(result[method]()) : NaN;
    } catch {
        return NaN;
    }
}

function epochMilliseconds(value) {
    return Number.isFinite(value) && value > 100_000_000_000 ? value : null;
}

function createWorkloadModule() {
    return new ComplianceWorkload();
}

module.exports = { ComplianceWorkload, createWorkloadModule, epochMilliseconds, readTime, validationCode, verifyQuery };
