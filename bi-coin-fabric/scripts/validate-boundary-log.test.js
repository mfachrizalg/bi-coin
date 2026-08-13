'use strict';

const assert = require('node:assert/strict');
const test = require('node:test');
const { validateBoundaryLog } = require('./validate-boundary-log');

test('accepts a passing boundary oracle', () => {
    assert.deepEqual(validateBoundaryLog(JSON.stringify({ event: 'boundary-oracle', mismatches: 0, infrastructureErrors: 0, verdict: 'PASS' })), { workers: 1, verdict: 'PASS' });
});

test('rejects infrastructure failures as boundary evidence', () => {
    assert.throws(() => validateBoundaryLog(JSON.stringify({ event: 'boundary-oracle', mismatches: 0, infrastructureErrors: 1, verdict: 'PASS' })), /boundary oracle rejected/);
});

