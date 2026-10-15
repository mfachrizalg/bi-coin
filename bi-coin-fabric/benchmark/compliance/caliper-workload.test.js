'use strict';

const assert = require('node:assert/strict');
const test = require('node:test');
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
