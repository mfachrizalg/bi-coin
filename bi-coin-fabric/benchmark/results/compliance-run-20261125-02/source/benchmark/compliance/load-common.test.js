'use strict';

const assert = require('node:assert/strict');
const test = require('node:test');
const { runFixedWindow, summarizeWindow } = require('./load-common');

test('fixed-window summary separates offered work from completions after the window', () => {
    const summary = summarizeWindow({
        scenario: 'transfer',
        path: 'ledger',
        rate: 2,
        durationSeconds: 1,
        windowStart: 0,
        fixtureExhausted: false,
        results: [
            { startedAt: 0, completedAt: 500, latencyMs: 500, ok: true },
            { startedAt: 500, completedAt: 1200, latencyMs: 700, ok: true },
        ],
    });
    assert.equal(summary.offered, 2);
    assert.equal(summary.completed_in_window, 1);
    assert.equal(summary.success_after_drain, 2);
    assert.equal(summary.late_completion_count, 1);
    assert.equal(summary.completed_ops_per_second, 1);
});

test('one scheduled worker may have concurrent in-flight requests', async () => {
    let active = 0;
    let maximumActive = 0;
    const summary = await runFixedWindow({
        scenario: 'transfer',
        path: 'api',
        rate: 2,
        durationSeconds: 1,
        fixtures: { items: [{}, {}] },
        execute: async () => {
            active += 1;
            maximumActive = Math.max(maximumActive, active);
            await new Promise(resolve => setTimeout(resolve, 600));
            active -= 1;
            return { ok: true, status: 200 };
        },
    });
    assert.equal(summary.worker_count, 1);
    assert.equal(summary.offered, 2);
    assert.equal(maximumActive, 2);
});

test('request traces retain bounded gateway error details', async () => {
    const summary = await runFixedWindow({
        scenario: 'transfer',
        path: 'ledger',
        rate: 1,
        durationSeconds: 1,
        fixtures: { reuse: true, items: [{}] },
        execute: async () => {
            throw Object.assign(new Error('commit returned validation code 11'), { code: 11 });
        },
    });
    const [record] = summary.request_trace;
    assert.equal(record.errorKind, 'gateway_error');
    assert.equal(record.errorCode, 11);
    assert.equal(record.errorMessage, 'commit returned validation code 11');
});
