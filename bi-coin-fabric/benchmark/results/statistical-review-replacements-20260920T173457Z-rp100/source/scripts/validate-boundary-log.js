'use strict';

const fs = require('node:fs');

const expectedReasons = [
    /per-transaction limit exceeded/i,
    /daily transaction limit exceeded/i,
    /transfer would exceed receiver max balance/i,
    /insufficient balance/i,
];

function validateBoundaryLog(log) {
    const rows = log.split('\n').flatMap((line) => {
        try {
            const row = JSON.parse(line);
            return row.event === 'boundary-oracle' ? [row] : [];
        } catch {
            return [];
        }
    });
    if (rows.length === 0) throw new Error('missing structured boundary oracle');
    if (rows.some((row) => row.verdict !== 'PASS' || row.mismatches !== 0 || row.infrastructureErrors !== 0 || row.passed !== row.expected || row.total !== row.expected || row.expected !== 8)) {
        throw new Error(`boundary oracle rejected: ${JSON.stringify(rows)}`);
    }
    for (const reason of expectedReasons) {
        if (!reason.test(log)) throw new Error(`missing expected boundary rejection reason: ${reason}`);
    }
    return { workers: rows.length, verdict: 'PASS' };
}

if (require.main === module) {
    const logPath = process.argv[2];
    if (!logPath) {
        console.error('usage: node scripts/validate-boundary-log.js <caliper-log>');
        process.exit(2);
    }
    try {
        console.log(`[boundary-oracle] ${JSON.stringify(validateBoundaryLog(fs.readFileSync(logPath, 'utf8')))}`);
    } catch (error) {
        console.error(`[boundary-oracle] verdict=FAIL: ${error.message}`);
        process.exit(1);
    }
}

module.exports = { validateBoundaryLog };
