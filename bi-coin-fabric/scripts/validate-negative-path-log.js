'use strict';

const fs = require('node:fs');

const expectedReasons = [
    ['per-tx-cap', /per-transaction limit exceeded/i],
    ['insufficient-balance', /insufficient balance/i],
    ['receiver-max-balance', /exceed receiver max balance/i],
    ['frozen-sender', /sender wallet .* is frozen/i],
    ['prohibited-approval', /prohibited-risk subject cannot be approved/i],
    ['high-risk-no-senior', /high-risk approval requires enhanced due diligence and senior approval/i],
    ['expired-kyc', /KYC profile expired/i],
];

function validateNegativePathLog(log) {
    for (const [label, expected] of expectedReasons) {
        if (!expected.test(log)) {
            throw new Error(`missing expected rejection reason for ${label}`);
        }
    }

    const failures = log.match(/Failed to perform submit transaction/g) || [];
    if (failures.length !== expectedReasons.length) {
        throw new Error(`expected ${expectedReasons.length} rejected submissions, found ${failures.length}`);
    }
    if (/ProposalResponsePayloads do not match|Channel has been shut down|Failed round [0-9]+|ORACLE ERROR|ENFORCEMENT GAP/.test(log)) {
        throw new Error('negative-path log contains an infrastructure or oracle failure');
    }
    if (!/\[negative-path\].*rejected_status=7\/7, gaps=0/.test(log)) {
        throw new Error('workload did not confirm seven failed statuses and zero gaps');
    }

    return { enforced: expectedReasons.length, gaps: 0, oracleErrors: 0 };
}

if (require.main === module) {
    const logPath = process.argv[2];
    if (!logPath) {
        console.error('usage: node scripts/validate-negative-path-log.js <caliper-log>');
        process.exit(2);
    }
    try {
        const result = validateNegativePathLog(fs.readFileSync(logPath, 'utf8'));
        console.log(`[negative-path-oracle] enforced=${result.enforced}/7, gaps=0, oracle_errors=0, verdict=PASS`);
    } catch (error) {
        console.error(`[negative-path-oracle] verdict=FAIL: ${error.message}`);
        process.exit(1);
    }
}

module.exports.validateNegativePathLog = validateNegativePathLog;
