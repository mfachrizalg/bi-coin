'use strict';

const { isDeepStrictEqual } = require('node:util');

function evaluateWindow({ rate, duration_seconds: durationSeconds, operation_kind: operationKind, events, window_start_ms: startMs = 0, resource_complete: resourceComplete = true, trace_complete: traceComplete = true }) {
    if (!Number.isFinite(rate) || rate <= 0 || !Number.isFinite(durationSeconds) || durationSeconds <= 0) {
        throw new Error('rate and duration must be positive');
    }
    const endMs = startMs + durationSeconds * 1000;
    const measured = events.filter(event => event.started_at_ms >= startMs && event.started_at_ms < endMs);
    const delivered = measured.length;
    const completed = measured.filter(event => Number.isFinite(event.completed_at_ms));
    const successful = measured.filter(event => event.status === 'success' && event.verified === true);
    const expectedDenials = measured.filter(event => event.expected_status === 'denied' && event.status === 'denied' && event.state_unchanged === true);
    const timeouts = measured.filter(event => event.status === 'timeout');
    const unresolved = measured.filter(event => !Number.isFinite(event.completed_at_ms)
        || (event.status === 'success' && (!event.transaction_id || event.verified !== true))
        || (event.status === 'denied' && (event.expected_status !== 'denied' || event.state_unchanged !== true))
        || !['success', 'denied', 'failed', 'timeout'].includes(event.status));
    const unexpectedFailures = measured.filter(event => event.status === 'failed'
        || (event.status === 'denied' && event.expected_status !== 'denied'));
    const deliveredRate = delivered / durationSeconds;
    const targetCount = rate * durationSeconds;
    const allowedCountDifference = Math.max(targetCount * 0.05, 1);
    const offeredLoadWithinTolerance = Math.abs(delivered - targetCount) <= allowedCountDifference;
    const late = completed.filter(event => event.completed_at_ms > endMs);
    const lastCompletion = completed.reduce((latest, event) => Math.max(latest, event.completed_at_ms), endMs);
    const drainSeconds = Math.max(0, lastCompletion - endMs) / 1000;
    const verifiedCount = successful.length + expectedDenials.length;
    const drainAdjustedRate = verifiedCount / (durationSeconds + drainSeconds);
    const latencies = completed.map(event => Math.max(0, event.completed_at_ms - event.started_at_ms));
    const latency = summarizeLatencies(latencies);
    const throughputPass = drainAdjustedRate >= deliveredRate * 0.9;
    const noFailures = unexpectedFailures.length === 0 && timeouts.length === 0 && unresolved.length === 0;
    const traceUnresolved = traceComplete ? 0 : 1;
    const unresolvedCount = unresolved.length + traceUnresolved;
    const complete = resourceComplete && traceComplete;
    const classification = !complete || unresolvedCount > 0
        ? 'inconclusive'
        : (offeredLoadWithinTolerance && noFailures && throughputPass ? 'pass' : 'fail');

    return {
        classification,
        target_ops_per_second: rate,
        duration_seconds: durationSeconds,
        delivered_count: delivered,
        offered_ops_per_second: deliveredRate,
        verified_count: verifiedCount,
        failed_count: unexpectedFailures.length,
        timeout_count: timeouts.length,
        unresolved_count: unresolvedCount,
        backlog_at_cutoff: measured.filter(event => !Number.isFinite(event.completed_at_ms) || event.completed_at_ms > endMs).length,
        late_completions: late.length,
        drain_seconds: drainSeconds,
        drain_adjusted_verified_ops_per_second: drainAdjustedRate,
        ...(operationKind === 'query'
            ? { verified_query_rate: drainAdjustedRate }
            : { verified_achieved_tps: drainAdjustedRate }),
        offered_load_within_tolerance: offeredLoadWithinTolerance,
        drain_throughput_pass: throughputPass,
        resource_complete: resourceComplete,
        caliper_trace_complete: traceComplete,
        latency_ms: latency,
        counts: {
            delivered,
            verified: verifiedCount,
            failed: unexpectedFailures.length,
            timeouts: timeouts.length,
            unresolved: unresolvedCount,
            expected_denials: expectedDenials.length,
        },
        failures: measured.filter(event => event.status !== 'success' || event.verified !== true).map(event => ({
            transaction_id: event.transaction_id || null,
            status: event.status || 'unresolved',
            diagnostic: event.diagnostic || '',
            validation_code: event.validation_code || null,
            failure_class: event.failure_class || 'unresolved',
            failure_confidence: event.failure_confidence || 'hypothesis',
        })),
    };
}

function assertStateUnchanged(before, after) {
    if (!isDeepStrictEqual(before, after)) throw new Error('ledger state changed after expected denial');
}

function verifySemanticValue({ expected, actual }) {
    return { verified: isDeepStrictEqual(expected, actual), expected, actual };
}

function summarizeLatencies(values) {
    const sorted = values.filter(Number.isFinite).sort((left, right) => left - right);
    if (!sorted.length) return { median: null, p95: null, maximum: null, sample_count: 0 };
    return {
        median: percentile(sorted, 0.5),
        p95: percentile(sorted, 0.95),
        maximum: sorted.at(-1),
        sample_count: sorted.length,
    };
}

function percentile(sorted, quantile) {
    return sorted[Math.max(0, Math.ceil(sorted.length * quantile) - 1)];
}

module.exports = { assertStateUnchanged, evaluateWindow, summarizeLatencies, verifySemanticValue };
