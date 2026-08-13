'use strict';

const fs = require('node:fs');

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
    if (rows.some((row) => row.verdict !== 'PASS' || row.mismatches !== 0 || row.infrastructureErrors !== 0)) {
        throw new Error(`boundary oracle rejected: ${JSON.stringify(rows)}`);
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

