'use strict';

const assert = require('node:assert/strict');
const test = require('node:test');
const { validateCaliperReport } = require('./validate-caliper-report');

const table = (rows) => [
    '| Name | Succ | Fail | Send Rate (TPS) |',
    '|------|------|------|-----------------|',
    ...rows.map(([name, success, failed]) => `| ${name} | ${success} | ${failed} | 1.0 |`),
].join('\n');

test('accepts a report with zero failed transactions', () => {
    assert.deepEqual(validateCaliperReport(table([['transfer', 10, 0], ['read', 5, 0]])), { rounds: 2, success: 15, failed: 0, verdict: 'PASS' });
});

test('rejects a failure-heavy report even when Caliper exited normally', () => {
    assert.throws(() => validateCaliperReport(table([['transfer', 2, 8]])), /unexpected transaction failures/);
});
