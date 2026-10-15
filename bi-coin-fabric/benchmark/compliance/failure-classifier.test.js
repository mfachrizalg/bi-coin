'use strict';

const assert = require('node:assert/strict');
const test = require('node:test');

const { classifyFailure, failureConfidence } = require('./failure-classifier');

test('classifies signer and connector setup errors as configuration errors', () => {
    assert.equal(classifyFailure('failed to load connection profile'), 'configuration-error');
    assert.equal(classifyFailure('access denied for MSP EndUserMSP'), 'configuration-error');
});

test('classifies invalid fixture state separately from capacity failures', () => {
    assert.equal(classifyFailure('subject is not active'), 'fixture-error');
    assert.equal(classifyFailure('distributor reserve: insufficient balance'), 'fixture-error');
});

test('keeps MVCC conflicts as measured transaction failures and endorsement failures diagnostic', () => {
    assert.equal(classifyFailure('MVCC_READ_CONFLICT'), 'transaction-failure');
    assert.equal(classifyFailure('validation code: ENDORSEMENT_POLICY_FAILURE'), 'configuration-error');
});

test('recognizes timeouts and unresolved responses without guessing a cause', () => {
    assert.equal(classifyFailure('Gateway deadline exceeded'), 'timeout');
    assert.equal(classifyFailure(''), 'unresolved');
    assert.equal(failureConfidence('MVCC_READ_CONFLICT'), 'confirmed');
    assert.equal(failureConfidence('unknown transport failure'), 'hypothesis');
});

test("treats transport errors as unresolved, not measured transaction failures", () => {
    assert.equal(classifyFailure("fetch failed"), "unresolved");
    assert.equal(classifyFailure("connect ECONNREFUSED 127.0.0.1:17051"), "unresolved");
    assert.equal(classifyFailure("socket hang up"), "unresolved");
});
