'use strict';

const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const test = require('node:test');
const zlib = require('node:zlib');

const { validateStudy } = require('./validate-study-artifacts');

test('study artifact validation rejects unreconciled completion counts', () => {
    const directory = fs.mkdtempSync(path.join(os.tmpdir(), 'bi-coin-study-validation-'));
    try {
        fs.writeFileSync(path.join(directory, 'summary.json'), JSON.stringify({
            runs: [{
                scenarioId: 'retail-transfer-low', phase: 'primary', repetition: 1,
                targetTps: 10, workerCount: 2, submitted: 3, successful: 1, failed: 1, timed_out: 0,
                traceFiles: ['trace.jsonl'], metricsFile: null,
            }],
            scenarios: [],
        }));
        fs.writeFileSync(path.join(directory, 'trace.jsonl'), '');
        assert.throws(() => validateStudy(directory), /completion counts do not reconcile/);
    } finally {
        fs.rmSync(directory, { recursive: true, force: true });
    }
});

test('study artifact validation accepts a compressed Prometheus trace', () => {
    const directory = fs.mkdtempSync(path.join(os.tmpdir(), 'bi-coin-study-gzip-'));
    try {
        fs.writeFileSync(path.join(directory, 'summary.json'), JSON.stringify({
            runs: [{
                scenarioId: 'retail-transfer-low', phase: 'scenario-pilot', repetition: 1,
                targetTps: 10, workerCount: 1, submitted: 1, successful: 1, failed: 0, timed_out: 0,
                measuredRound: 'measured', durationSeconds: 30,
                traceFiles: ['trace.jsonl'], metricsFile: 'metrics.jsonl.gz',
                configFile: 'benchconfig.yaml', reportFile: 'report.html', logFile: 'caliper.log',
            }],
            scenarios: [],
        }));
        for (const file of ['benchconfig.yaml', 'report.html', 'caliper.log']) {
            fs.writeFileSync(path.join(directory, file), 'present\n');
        }
        fs.writeFileSync(path.join(directory, 'trace.jsonl'), [
            { event: 'submitted', roundLabel: 'measured', count: 1, timestamp: 1000 },
            { event: 'finished', roundLabel: 'measured', result: { status: 'success', time_create: 1000, time_final: 1500 } },
        ].map(JSON.stringify).join('\n'));
        const metrics = JSON.stringify({ httpStatus: 200, response: { status: 'success', data: { result: [{ value: [1, '2'] }] } } });
        fs.writeFileSync(path.join(directory, 'metrics.jsonl.gz'), zlib.gzipSync(`${metrics}\n`));

        assert.deepEqual(validateStudy(directory), { runs: 1, scenarios: 0, valid: true });
    } finally {
        fs.rmSync(directory, { recursive: true, force: true });
    }
});
