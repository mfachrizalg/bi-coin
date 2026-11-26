'use strict';

const { performance } = require('node:perf_hooks');

function percentile(values, percentileValue) {
    if (values.length === 0) return null;
    const ordered = [...values].sort((left, right) => left - right);
    return ordered[Math.max(0, Math.ceil(percentileValue * ordered.length) - 1)];
}

function summarizeWindow({ scenario, path, rate, durationSeconds, windowStart, results, fixtureExhausted }) {
    const windowEnd = windowStart + durationSeconds * 1000;
    const started = results.filter(result => result.startedAt < windowEnd);
    const completedInWindow = started.filter(result => result.completedAt <= windowEnd);
    const successes = started.filter(result => result.ok);
    const successfulLatencies = successes.map(result => result.latencyMs);
    const failureKinds = {};
    for (const result of started.filter(item => !item.ok)) {
        failureKinds[result.errorKind || `http_${result.status || 'unknown'}`] = (failureKinds[result.errorKind || `http_${result.status || 'unknown'}`] || 0) + 1;
    }
    return {
        scenario,
        path,
        worker_count: 1,
        target_ops_per_second: rate,
        duration_seconds: durationSeconds,
        offered: started.length,
        completed_in_window: completedInWindow.length,
        success_after_drain: successes.length,
        failed_after_drain: started.length - successes.length,
        timeouts: failureKinds.timeout || 0,
        offered_ops_per_second: started.length / durationSeconds,
        completed_ops_per_second: completedInWindow.filter(result => result.ok).length / durationSeconds,
        in_flight_at_window_end: started.length - completedInWindow.length,
        late_completion_count: started.filter(result => result.completedAt > windowEnd).length,
        latency_ms: {
            p50: percentile(successfulLatencies, 0.50),
            p95: percentile(successfulLatencies, 0.95),
            p99: percentile(successfulLatencies, 0.99),
            max: successfulLatencies.length ? Math.max(...successfulLatencies) : null,
        },
        failure_kinds: failureKinds,
        fixture_exhausted: fixtureExhausted,
    };
}

async function runFixedWindow({ scenario, path, rate, durationSeconds, fixtures, execute }) {
    if (!Number.isFinite(rate) || rate <= 0 || !Number.isInteger(durationSeconds) || durationSeconds <= 0) {
        throw new Error('rate and duration must be positive');
    }
    const windowStart = performance.now();
    const intervalMs = 1000 / rate;
    const deadline = windowStart + durationSeconds * 1000;
    const results = [];
    const pending = [];
    let attempts = 0;
    let fixtureExhausted = false;

    while (performance.now() < deadline) {
        const now = performance.now();
        const nextStart = windowStart + attempts * intervalMs;
        if (now < nextStart) {
            await new Promise(resolve => setTimeout(resolve, Math.max(1, Math.min(25, nextStart - now))));
            continue;
        }
        const fixture = fixtures.reuse ? fixtures.items[0] : fixtures.items[attempts];
        if (!fixture) {
            fixtureExhausted = true;
            break;
        }
        const startedAt = performance.now();
        attempts += 1;
        const task = Promise.resolve()
            .then(() => execute(fixture))
            .then(outcome => {
                const completedAt = performance.now();
                const record = {
                    startedAt: startedAt - windowStart,
                    completedAt: completedAt - windowStart,
                    latencyMs: completedAt - startedAt,
                    ok: outcome.ok,
                    status: outcome.status,
                    errorKind: outcome.errorKind,
                    errorMessage: outcome.errorMessage ? String(outcome.errorMessage).slice(0, 256) : undefined,
                };
                results.push(record);
            }, error => {
                const completedAt = performance.now();
                const record = {
                    startedAt: startedAt - windowStart,
                    completedAt: completedAt - windowStart,
                    latencyMs: completedAt - startedAt,
                    ok: false,
                    errorKind: error && error.name === 'TimeoutError' ? 'timeout' : 'gateway_error',
                    errorName: error && error.name,
                    errorCode: error && error.code,
                    errorMessage: String(error && error.message ? error.message : error).slice(0, 256),
                };
                results.push(record);
            });
        pending.push(task);
    }
    await Promise.all(pending);
    return {
        ...summarizeWindow({ scenario, path, rate, durationSeconds, windowStart: 0, results, fixtureExhausted }),
        request_trace: results,
    };
}

module.exports = { percentile, runFixedWindow, summarizeWindow };
