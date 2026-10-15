'use strict';

const fs = require('node:fs');
const { percentile } = require('./load-common');

function measureWindow(trace, warmupSeconds, measurementSeconds) {
    const start = warmupSeconds * 1000;
    const end = start + measurementSeconds * 1000;
    const arrivals = trace.filter(item => item.startedAt >= start && item.startedAt < end);
    const completions = arrivals.filter(item => item.completedAt <= end);
    const successful = arrivals.filter(item => item.ok);
    const latencies = successful.map(item => item.latencyMs);
    return {
        offered: arrivals.length,
        completed: completions.filter(item => item.ok).length,
        throughput: completions.filter(item => item.ok).length / measurementSeconds,
        p95_ms: percentile(latencies, 0.95),
    };
}

function compare(candidate, reference) {
    if (reference.throughput <= 0 || reference.p95_ms === null || candidate.p95_ms === null) return false;
    const throughputDelta = Math.abs(candidate.throughput - reference.throughput) / reference.throughput;
    const latencyDelta = Math.abs(candidate.p95_ms - reference.p95_ms) / reference.p95_ms;
    return throughputDelta <= 0.10 && latencyDelta <= 0.10;
}

function chooseTiming(tracesByPath) {
    const warmups = [0, 15, 30];
    const measurements = [60, 120];
    const reference = { warmup_seconds: 30, measurement_seconds: 120 };
    const paths = Object.keys(tracesByPath).sort();
    if (paths.length !== 2 || paths.some(name => tracesByPath[name].length !== 3)) {
        throw new Error('timing check needs three traces each for API and direct ledger');
    }
    const referenceRows = Object.fromEntries(paths.map(name => [
        name,
        tracesByPath[name].map(trace => measureWindow(trace, reference.warmup_seconds, reference.measurement_seconds)),
    ]));
    const candidates = [];
    for (const warmup of warmups) {
        for (const measurement of measurements) {
            const rows = Object.fromEntries(paths.map(name => [
                name,
                tracesByPath[name].map(trace => measureWindow(trace, warmup, measurement)),
            ]));
            const passes = paths.every(name => rows[name].every((row, index) => compare(row, referenceRows[name][index])));
            candidates.push({ warmup_seconds: warmup, measurement_seconds: measurement, passes_all: passes, rows });
        }
    }
    if (paths.some(name => tracesByPath[name].some(trace => trace.some(record => record.ok === false)))) {
        return {
            selected: { ...reference },
            classification: 'inconclusive',
            tolerance_percent: 10,
            reference,
            reference_rows: referenceRows,
            candidates,
            reason: 'timing traces contained failed requests',
        };
    }
    const shorter = candidates.filter(candidate => candidate.passes_all
        && (candidate.warmup_seconds !== reference.warmup_seconds || candidate.measurement_seconds !== reference.measurement_seconds))
        .sort((left, right) => left.warmup_seconds + left.measurement_seconds - right.warmup_seconds - right.measurement_seconds
            || left.warmup_seconds - right.warmup_seconds);
    const selected = shorter[0] || { ...reference };
    return {
        selected: { warmup_seconds: selected.warmup_seconds, measurement_seconds: selected.measurement_seconds },
        classification: shorter.length ? 'pass' : 'inconclusive',
        tolerance_percent: 10,
        reference,
        reference_rows: referenceRows,
        candidates,
    };
}

function readTrace(path) {
    return fs.readFileSync(path, 'utf8').split(/\r?\n/).filter(Boolean).map(line => JSON.parse(line));
}

module.exports = { chooseTiming, compare, measureWindow, readTrace };
