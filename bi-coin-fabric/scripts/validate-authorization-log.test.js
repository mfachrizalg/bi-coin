'use strict';

const assert = require('node:assert/strict');
const test = require('node:test');
const { validateAuthorizationLog } = require('./validate-authorization-log');

test('accepts a custody rejection with no infrastructure failure', () => {
    assert.deepEqual(validateAuthorizationLog(JSON.stringify({
        event: 'authorization-oracle', total: 1, failed: 1, custodyErrors: 1, infrastructureErrors: 0, verdict: 'PASS',
    })), { actors: 1, verdict: 'PASS' });
});

test('rejects endorsement failure as an invalid negative result', () => {
    assert.throws(() => validateAuthorizationLog(JSON.stringify({
        event: 'authorization-oracle', total: 1, failed: 1, custodyErrors: 0, infrastructureErrors: 1, verdict: 'PASS',
    })), /authorization oracle rejected/);
});

