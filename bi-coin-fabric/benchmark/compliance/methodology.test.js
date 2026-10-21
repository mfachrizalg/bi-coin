'use strict';

const assert = require('node:assert/strict');
const test = require('node:test');
const catalog = require('./case-catalog.json');

test('confirmation windows total 64.5 minutes across the 43 operation workloads', () => {
    const seconds = catalog.performance_scenarios.length
        * catalog.protocol.confirmation_repetitions
        * catalog.protocol.confirmation_duration_seconds;
    assert.equal(seconds, 64.5 * 60);
});

test('protocol selects one worker, ten-second probes, and no separate timed warmup', () => {
    assert.equal(catalog.protocol.worker_count, 1);
    assert.equal(catalog.protocol.probe_duration_seconds, 10);
    assert.equal(catalog.protocol.confirmation_repetitions, 3);
    assert.equal(catalog.protocol.confirmation_duration_seconds, 30);
    assert.equal('timing_candidates' in catalog.protocol, false);
});
