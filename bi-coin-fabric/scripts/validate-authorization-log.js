'use strict';

const fs = require('node:fs');

function oracleLines(log, event) {
    return log.split('\n').flatMap((line) => {
        try {
            const value = JSON.parse(line);
            return value.event === event ? [value] : [];
        } catch {
            return [];
        }
    });
}

function validateAuthorizationLog(log) {
    const rows = oracleLines(log, 'authorization-oracle');
    if (rows.length === 0) throw new Error('missing structured authorization oracle');
    for (const row of rows) {
        if (row.verdict !== 'PASS' || row.infrastructureErrors !== 0 || row.failed !== row.total || row.custodyErrors !== row.total) {
            throw new Error(`authorization oracle rejected: ${JSON.stringify(row)}`);
        }
    }
    return { actors: rows.length, verdict: 'PASS' };
}

if (require.main === module) {
    const logPath = process.argv[2];
    if (!logPath) {
        console.error('usage: node scripts/validate-authorization-log.js <caliper-log>');
        process.exit(2);
    }
    try {
        console.log(`[authorization-oracle] ${JSON.stringify(validateAuthorizationLog(fs.readFileSync(logPath, 'utf8')))}`);
    } catch (error) {
        console.error(`[authorization-oracle] verdict=FAIL: ${error.message}`);
        process.exit(1);
    }
}

module.exports = { validateAuthorizationLog };

