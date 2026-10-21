'use strict';

const assert = require('node:assert/strict');
const test = require('node:test');
const catalog = require('./case-catalog.json');
const { epochMilliseconds, validationCode, verifyQuery } = require('./caliper-workload');

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
        GetCallerIdentity: 'client-id', CanPay: 'true', CanActFor: 'false', CanSend: 'true', GetLimits: '{"daily":"1"}',
        GetSubject: '{"status":"active"}', GetParticipant: '{"status":"active"}', GetReceipt: '{"reference":"ref-1"}',
        GetWholesaleSupply: '1', GetRetailSupply: '1', GetTotalSupply: '2', GetReserve: '1', GetRetailFloat: '1', GetBalance: '1',
        GetTransferLimit: '9007199254740991',
    };
    for (const scenario of catalog.performance_scenarios.filter(item => item.operation_kind === 'query')) {
        assert.ok(scenario.transaction in samples, `${scenario.id} has no sample response`);
        assert.equal(verifyQuery(scenario.transaction, samples[scenario.transaction]), true, scenario.id);
    }
    assert.equal(verifyQuery('GetParticipant', '{"kind":"retail"}'), false);
});
