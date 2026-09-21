'use strict';

const fs = require('node:fs');

function parseCaliperRows(log) {
    const rows = [];
    let inTransactionTable = false;
    for (const line of log.split('\n')) {
        if (/^\|\s*Name\s*\|\s*Succ\s*\|\s*Fail\s*\|\s*Send Rate/i.test(line)) {
            inTransactionTable = true;
            continue;
        }
        if (!inTransactionTable) continue;
        if (!line.startsWith('|')) {
            inTransactionTable = false;
            continue;
        }
        const match = line.match(/^\|\s*([^|]+?)\s*\|\s*(\d+)\s*\|\s*(\d+)\s*\|/);
        if (match) rows.push({ name: match[1].trim(), success: Number(match[2]), failed: Number(match[3]) });
    }
    return rows;
}

function uniqueRows(log) {
    return parseCaliperRows(log).filter((row, index, all) => (
        all.findIndex(candidate => candidate.name === row.name
            && candidate.success === row.success
            && candidate.failed === row.failed) === index
    ));
}

function summarizeCaliperReport(log) {
    const rows = uniqueRows(log);
    if (rows.length === 0) throw new Error('missing Caliper transaction report rows');
    return {
        rounds: rows.length,
        success: rows.reduce((total, row) => total + row.success, 0),
        failed: rows.reduce((total, row) => total + row.failed, 0),
        rows,
    };
}

function validateCaliperReport(log) {
    const summary = summarizeCaliperReport(log);
    if (summary.failed > 0) throw new Error(`unexpected transaction failures: ${JSON.stringify(summary.rows.filter((row) => row.failed > 0))}`);
    return { rounds: summary.rounds, success: summary.success, failed: summary.failed, verdict: 'PASS' };
}

if (require.main === module) {
    const logPath = process.argv[2];
    if (!logPath) {
        console.error('usage: node scripts/validate-caliper-report.js <caliper-log>');
        process.exit(2);
    }
    const log = fs.readFileSync(logPath, 'utf8');
    try {
        const summary = summarizeCaliperReport(log);
        console.log(`[caliper-report] ${JSON.stringify({ ...summary, verdict: summary.failed === 0 ? 'PASS' : 'MEASURED_WITH_FAILURES' })}`);
        if (summary.failed > 0) throw new Error(`unexpected transaction failures: ${JSON.stringify(summary.rows.filter((row) => row.failed > 0))}`);
    } catch (error) {
        console.error(`[caliper-report] verdict=FAIL: ${error.message}`);
        process.exit(1);
    }
}

module.exports = { parseCaliperRows, summarizeCaliperReport, validateCaliperReport };
