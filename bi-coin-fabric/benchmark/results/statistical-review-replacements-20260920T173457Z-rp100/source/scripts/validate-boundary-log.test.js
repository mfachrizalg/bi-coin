'use strict';

const assert = require('node:assert/strict');
const test = require('node:test');
const { validateBoundaryLog } = require('./validate-boundary-log');

test('accepts a passing boundary oracle', () => {
    const log = [
        JSON.stringify({ event: 'boundary-oracle', passed: 8, total: 8, expected: 8, mismatches: 0, infrastructureErrors: 0, verdict: 'PASS' }),
        'per-transaction limit exceeded',
        'daily transaction limit exceeded',
        'transfer would exceed receiver max balance',
        'insufficient balance',
    ].join('\n');
    assert.deepEqual(validateBoundaryLog(log), { workers: 1, verdict: 'PASS' });
});

test('rejects infrastructure failures as boundary evidence', () => {
    assert.throws(() => validateBoundaryLog(JSON.stringify({ event: 'boundary-oracle', passed: 8, total: 8, expected: 8, mismatches: 0, infrastructureErrors: 1, verdict: 'PASS' })), /boundary oracle rejected/);

test('rejects an incomplete boundary oracle', () => {
    assert.throws(() => validateBoundaryLog(JSON.stringify({ event: 'boundary-oracle', passed: 7, total: 7, expected: 8, mismatches: 0, infrastructureErrors: 0, verdict: 'PASS' })), /boundary oracle rejected/);
});
});
