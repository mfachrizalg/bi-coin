'use strict';

const assert = require('node:assert/strict');
const test = require('node:test');

const { evaluateWindow, assertStateUnchanged, verifySemanticValue } = require('./outcome-analysis');

function events(count, { verified = true, completedAt = 9000 } = {}) {
    return Array.from({ length: count }, (_, index) => ({
        transaction_id: `tx-${index}`,
        started_at_ms: index * 50,
        completed_at_ms: completedAt,
        status: 'success',
        verified,
    }));
}

test('accepts a fully verified write window at the requested delivered rate', () => {
    const result = evaluateWindow({
        rate: 10,
        duration_seconds: 10,
        operation_kind: 'write',
        events: events(100),
    });
    assert.equal(result.classification, 'pass');
    assert.equal(result.offered_ops_per_second, 10);
    assert.equal(result.verified_achieved_tps, 10);
    assert.equal(result.counts.verified, 100);
});

test('allows one-request rounding but rejects a larger offered-load shortfall', () => {
    const rounded = evaluateWindow({ rate: 0.1, duration_seconds: 10, operation_kind: 'write', events: events(1) });
    assert.equal(rounded.offered_load_within_tolerance, true);
    const short = evaluateWindow({ rate: 10, duration_seconds: 10, operation_kind: 'write', events: events(94) });
    assert.equal(short.classification, 'client-bound');
    assert.equal(short.offered_load_within_tolerance, false);
    const shortWithFailure = evaluateWindow({ rate: 10, duration_seconds: 10, operation_kind: 'write', events: [...events(93), { ...events(1)[0], status: 'failed', verified: false }] });
    assert.equal(shortWithFailure.classification, 'fail');
});

test('regression: fully verified 64 TPS window with a 2.08 s batch tail passes the drain cap', () => {
    // 641 submissions spread over the 10 s window; the last commit lands 2.076 s after it.
    const rows = Array.from({ length: 641 }, (_, index) => ({
        transaction_id: `tx-${index}`,
        started_at_ms: Math.floor((index * 10000) / 641),
        completed_at_ms: 10000 + 2076,
        status: 'success',
        verified: true,
    }));
    const result = evaluateWindow({ rate: 64, duration_seconds: 10, operation_kind: 'write', events: rows });
    assert.equal(result.drain_seconds, 2.076);
    assert.equal(result.classification, 'pass');
});

test('drain beyond the cap fails even with every result verified', () => {
    const result = evaluateWindow({ rate: 10, duration_seconds: 10, operation_kind: 'write', events: events(100, { completedAt: 10000 + 3500 }) });
    assert.equal(result.drain_seconds, 3.5);
    assert.equal(result.classification, 'fail');
    assert.equal(result.counts.verified, 100);
});

test('summarizes latency with minimum, median, p95, maximum and count', () => {
    const { summarizeLatencies } = require('./outcome-analysis');
    assert.deepEqual(summarizeLatencies([30, 10, 20]), { minimum: 10, median: 20, p95: 30, maximum: 30, sample_count: 3 });
    assert.equal(summarizeLatencies([]).minimum, null);
});

test('reports query rate separately and counts late completions and backlog', () => {
    const rows = events(10, { completedAt: 12000 });
    const result = evaluateWindow({ rate: 1, duration_seconds: 10, operation_kind: 'query', events: rows });
    assert.equal(result.verified_query_rate, 0.8333333333333334);
    assert.equal(result.verified_achieved_tps, undefined);
    assert.equal(result.backlog_at_cutoff, 10);
    assert.equal(result.late_completions, 10);
});

test('does not accept an outcome without semantic verification', () => {
    const result = evaluateWindow({ rate: 1, duration_seconds: 10, operation_kind: 'write', events: events(10, { verified: false }) });
    assert.equal(result.classification, 'inconclusive');
    assert.equal(result.counts.unresolved, 10);
});

test('counts a completed timeout without a peer transaction ID as a failed outcome', () => {
    const result = evaluateWindow({
        rate: 0.1,
        duration_seconds: 10,
        operation_kind: 'write',
        events: [{ started_at_ms: 0, completed_at_ms: 1000, status: 'timeout', failure_class: 'timeout', diagnostic: 'deadline exceeded' }],
    });
    assert.equal(result.classification, 'fail');
    assert.equal(result.counts.timeouts, 1);
    assert.equal(result.counts.unresolved, 0);
    assert.equal(result.failures[0].transaction_id, null);
});

test('does not accept a trace whose Caliper submitted and finished counts disagree', () => {
    const result = evaluateWindow({ rate: 0.1, duration_seconds: 10, operation_kind: 'write', events: events(1), trace_complete: false });
    assert.equal(result.classification, 'inconclusive');
    assert.equal(result.caliper_trace_complete, false);
    assert.equal(result.counts.unresolved, 1);
});

test('expected denial is correct only when before and after state are identical', () => {
    const before = { balance: 100, reserve: 50 };
    assert.doesNotThrow(() => assertStateUnchanged(before, { ...before }));
    assert.throws(() => assertStateUnchanged(before, { ...before, balance: 90 }), /state changed/);
});

test('semantic result comparison checks values, not HTTP or Caliper success alone', () => {
    assert.equal(verifySemanticValue({ expected: { status: 'active' }, actual: { status: 'active' } }).verified, true);
    assert.equal(verifySemanticValue({ expected: { status: 'active' }, actual: { status: 'pending' } }).verified, false);
});
