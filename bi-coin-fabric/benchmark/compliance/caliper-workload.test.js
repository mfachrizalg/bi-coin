'use strict';

const assert = require('node:assert/strict');
const test = require('node:test');
const catalog = require('./case-catalog.json');
const { ComplianceWorkload, epochMilliseconds, validationCode, verifyQuery } = require('./caliper-workload');

test('Caliper query results receive method-specific semantic checks', () => {
    assert.equal(verifyQuery('CanPay', 'true'), true);
    assert.equal(verifyQuery('GetBalance', '900'), true);
    assert.equal(verifyQuery('GetSubject', '{"status":"active"}'), true);
    assert.equal(verifyQuery('GetSubject', '{"restricted":false}'), false);
    assert.equal(verifyQuery('GetReceipt', '{"reference":"ref-1"}'), true);
    assert.equal(verifyQuery('GetLimits', 'not-json'), false);
});

test('Caliper event timing uses epoch values and preserves validation codes', () => {
    assert.equal(epochMilliseconds(1789585132607), 1789585132607);
    assert.equal(epochMilliseconds(250), null);
    assert.equal(validationCode('transaction invalid with validation code: MVCC_READ_CONFLICT'), 'MVCC_READ_CONFLICT');
});

test('every catalogued query workload has a response check', () => {
    // A query without a check is never verified, so preflight marks it inconclusive.
    const samples = {
        GetCallerIdentity: 'client-id', CanPay: 'true', CanActFor: 'false', GetLimits: '{"daily":"1"}',
        GetSubject: '{"status":"active"}', GetParticipant: '{"distributor_id":"retail-bank","reserve":1000}', GetReceipt: '{"reference":"ref-1"}',
        GetWholesaleSupply: '1', GetRetailSupply: '1', GetTotalSupply: '2', GetReserve: '1', GetRetailFloat: '1', GetBalance: '1',
    };
    for (const scenario of catalog.performance_scenarios.filter(item => item.operation_kind === 'query')) {
        assert.ok(scenario.transaction in samples, `${scenario.id} has no sample response`);
        assert.equal(verifyQuery(scenario.transaction, samples[scenario.transaction]), true, scenario.id);
    }
    assert.equal(verifyQuery('GetParticipant', '{"kind":"retail"}'), false);
    assert.equal(verifyQuery('GetParticipant', '{"status":"active"}'), false, 'participant status was removed (D2)');
});

test('Fabric requests carry the fixture transient map only when the fixture has one', async () => {
    const requests = [];
    const workload = Object.create(ComplianceWorkload.prototype);
    Object.assign(workload, {
        fixtures: [
            { identity: 'kyc_verified', msp_id: 'EndUserMSP', chaincode: 'rupiah-controls', transaction: 'ApproveSubject', args: ['subject-1'], read_only: false, transient: { payload: '{"approved":true}' } },
            { identity: 'kyc_verified', msp_id: 'EndUserMSP', chaincode: 'rupiah-controls', transaction: 'GetSubject', args: ['subject-1'], read_only: true },
        ],
        fixtureDocument: { scenario: 'approve-subject', fixtures: { ledger: { reuse: false } } },
        identities: [{ username: 'kyc_verified', msp_id: 'EndUserMSP' }],
        roundArguments: { operationId: 'approve-subject', channel: 'bi-coin', timeoutSeconds: 30 },
        txIndex: 0,
        windowStart: 0,
        sutAdapter: { sendRequests: async request => { requests.push(request); return []; } },
    });
    await workload.submitTransaction();
    await workload.submitTransaction();
    assert.deepEqual(requests[0].transientMap, { payload: '{"approved":true}' });
    assert.equal('transientMap' in requests[1], false);
});

test('describeError keeps Fabric error details instead of [object Object]', () => {
    const { describeError, validationCode } = require('./caliper-workload');
    assert.equal(describeError(new Error('boom')), 'boom');
    const detail = describeError({ details: [{ message: 'transaction invalid with validation code MVCC_READ_CONFLICT' }] });
    assert.notEqual(detail, '[object Object]');
    assert.equal(validationCode(detail), 'MVCC_READ_CONFLICT');
});
