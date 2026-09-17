'use strict';

const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const test = require('node:test');

const {
    classifyFailure,
    latencySummary,
    percentile,
    populationStandardDeviation,
    sampleStandardDeviation,
    summarizeAcrossRuns,
    summarizeRun,
} = require('./analyze-benchmark-results');

test('percentiles use Type-7 interpolation and standard deviations are explicit', () => {
    assert.equal(percentile([1, 2, 3, 4], 0.50), 2.5);
    assert.equal(percentile([1, 2, 3, 4], 0.95).toFixed(2), '3.85');
    assert.equal(populationStandardDeviation([1, 2, 3, 4]).toFixed(6), '1.118034');
    assert.equal(sampleStandardDeviation([1, 2, 3, 4]).toFixed(6), '1.290994');
    assert.deepEqual(latencySummary([1, 2, 3]), {
        mean_s: 2,
        p50_s: 2,
        p95_s: 2.9,
        p99_s: 2.98,
        sd_s: Math.sqrt(2 / 3),
        min_s: 1,
        max_s: 3,
        samples: 3,
    });
});

test('failure classification prefers a specific KYC reason over EndorseError', () => {
    assert.equal(classifyFailure({
        error_messages: ['EndorseError: chaincode response 500, KYC profile expired'],
    }), 'KYC rejection');
    assert.equal(classifyFailure({ flags: 11 }), 'MVCC read conflict');
    assert.equal(classifyFailure({ error_messages: ['too many requests for /gateway.Gateway, exceeding concurrency limit'] }), 'Gateway concurrency limit');
});

test('run summary splits failed and timed-out completions', () => {
    const directory = fs.mkdtempSync(path.join(os.tmpdir(), 'bi-coin-analysis-'));
    try {
        fs.writeFileSync(path.join(directory, 'trace.jsonl'), [
            { event: 'submitted', roundLabel: 'retail-transfer', count: 4 },
            { event: 'finished', roundLabel: 'retail-transfer', result: { status: 'success', time_create: 0, time_final: 1000 } },
            { event: 'finished', roundLabel: 'retail-transfer', result: { status: 'success', time_create: 0, time_final: 3000 } },
            { event: 'finished', roundLabel: 'retail-transfer', result: { status: 'failed', flags: 11 } },
            { event: 'finished', roundLabel: 'retail-transfer', result: { status: 'failed', error_messages: ['deadline exceeded'] } },
        ].map(value => JSON.stringify(value)).join('\n') + '\n');

        const [row] = summarizeRun({
            scenarioId: 'retail-transfer',
            transactionFamily: 'Retail Transfer',
            operation: 'retail-transfer',
            contention: 'low',
            repetition: 1,
            targetTps: 1,
            durationSeconds: 10,
            traceFiles: ['trace.jsonl'],
        }, directory);

        assert.equal(row.submitted, 4);
        assert.equal(row.successful, 2);
        assert.equal(row.failed, 1);
        assert.equal(row.timed_out, 1);
        assert.equal(row.offered_tps, 0.4);
        assert.equal(row.achieved_tps, 0.2);
        assert.equal(row.success_rate, 0.5);
        assert.equal(row.mean_s, 2);
        assert.equal(row.p50_s, 2);
        assert.equal(row.failureReasons['MVCC read conflict'], 1);
        assert.equal(row.failureReasons['Gateway timeout'], 1);
    } finally {
        fs.rmSync(directory, { recursive: true, force: true });
    }
});

test('run summary uses measured Caliper log status codes when trace diagnostics are empty', () => {
    const directory = fs.mkdtempSync(path.join(os.tmpdir(), 'bi-coin-analysis-log-'));
    try {
        fs.writeFileSync(path.join(directory, 'trace.jsonl'), [
            { event: 'submitted', roundLabel: 'retail-transfer', count: 3 },
            { event: 'finished', roundLabel: 'retail-transfer', result: { status: 'success', time_create: 1000, time_final: 1500 } },
            { event: 'finished', roundLabel: 'retail-transfer', result: { status: 'failed', flags: 0, error_messages: [] } },
            { event: 'finished', roundLabel: 'retail-transfer', result: { status: 'failed', flags: 0, error_messages: [] } },
        ].map(value => JSON.stringify(value)).join('\n') + '\n');
        fs.writeFileSync(path.join(directory, 'caliper.log'), [
            'Started round 1 (warmup-retail-transfer)',
            'Failed to perform submit transaction [Transfer] with error: status code: 10',
            'Finished round 1 (warmup-retail-transfer)',
            'Started round 2 (retail-transfer)',
            'Failed to perform submit transaction [Transfer] with error: status code: 11',
            'Failed to perform submit transaction [Transfer] with error: deadline exceeded',
            'Finished round 2 (retail-transfer)',
        ].join('\n') + '\n');

        const [row] = summarizeRun({
            scenarioId: 'retail-transfer',
            transactionFamily: 'Retail Transfer',
            operation: 'retail-transfer',
            contention: 'low',
            repetition: 1,
            targetTps: 1,
            durationSeconds: 10,
            measuredRound: 'retail-transfer',
            traceFiles: ['trace.jsonl'],
            logFile: 'caliper.log',
        }, directory);

        assert.equal(row.failed, 1);
        assert.equal(row.timed_out, 1);
        assert.deepEqual(row.failureReasons, { 'MVCC read conflict': 1, 'Gateway timeout': 1 });
    } finally {
        fs.rmSync(directory, { recursive: true, force: true });
    }
});

test('aggregate statistics keep pilot and calibration phases separate', () => {
    const row = phase => ({
        phase,
        scenarioId: 'retail-transfer-low',
        transactionFamily: 'retail-transfer',
        operation: 'retail-transfer',
        contention: 'low',
        workerCount: 1,
        targetTps: 40,
        submitted: 1,
        successful: 1,
        failed: 0,
        timed_out: 0,
        offered_tps: 1,
        achieved_tps: 1,
        success_rate: 1,
        mean_s: 1,
        p50_s: 1,
        p95_s: 1,
        p99_s: 1,
        sd_s: 0,
        min_s: 1,
        max_s: 1,
    });

    const summaries = summarizeAcrossRuns([row('pilot'), row('calibration')]);
    assert.deepEqual(summaries.map(value => value.phase).sort(), ['calibration', 'pilot']);
    assert.equal(summaries.every(value => value.repetitions === 1), true);
});
