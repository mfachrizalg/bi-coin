'use strict';

const assert = require('node:assert/strict');
const test = require('node:test');
const { validateNegativePathLog } = require('./validate-negative-path-log');

const reasons = [
    'per-transaction limit exceeded',
    'insufficient balance',
    'transfer would exceed receiver max balance',
    'sender wallet wlt_x is frozen',
    'prohibited-risk subject cannot be approved',
    'high-risk approval requires enhanced due diligence and senior approval',
    'KYC profile expired',
];

function validLog() {
    return [
        ...reasons.map(reason => `Failed to perform submit transaction [Transfer]\nDetails:\n- peer0:${reason}`),
        '[negative-path] worker 0: rejected_status=7/7, gaps=0',
        'Benchmark finished in 10 seconds. Total rounds: 1. Successful rounds: 1. Failed rounds: 0.',
    ].join('\n');
}

test('accepts one exact rejection for every negative-path rule', () => {
    assert.deepEqual(validateNegativePathLog(validLog()), {
        enforced: 7,
        gaps: 0,
        oracleErrors: 0,
    });
});

test('rejects a generic endorsement failure without the expected reason', () => {
    const log = validLog().replace('KYC profile expired', 'ProposalResponsePayloads do not match');
    assert.throws(() => validateNegativePathLog(log), /expired-kyc/);
});
