'use strict';

const assert = require('node:assert/strict');
const test = require('node:test');

const { createSearch, nextProbeRate, recordProbe } = require('./capacity-search');

test('search starts from a verified hint or 32 operations per second', () => {
    assert.equal(nextProbeRate(createSearch({ hint: 64 })), 64);
    assert.equal(nextProbeRate(createSearch()), 32);
});

test('unbounded passing and failing rates expand by four within declared limits', () => {
    const high = createSearch({ hint: 32 });
    recordProbe(high, { rate: 32, classification: 'pass' });
    assert.equal(nextProbeRate(high), 128);

    const low = createSearch({ hint: 32 });
    recordProbe(low, { rate: 32, classification: 'fail' });
    assert.equal(nextProbeRate(low), 8);
});

test('binary search probes the midpoint and stops when the failing bound is within ten percent', () => {
    const search = createSearch({ hint: 32 });
    recordProbe(search, { rate: 32, classification: 'pass' });
    recordProbe(search, { rate: 128, classification: 'fail' });
    assert.equal(nextProbeRate(search), 80);

    recordProbe(search, { rate: 80, classification: 'pass' });
    recordProbe(search, { rate: 104, classification: 'fail' });
    recordProbe(search, { rate: 92, classification: 'pass' });
    recordProbe(search, { rate: 98, classification: 'pass' });
    recordProbe(search, { rate: 101, classification: 'fail' });
    assert.equal(nextProbeRate(search), null);
    assert.deepEqual(search.bounds, { passing: 98, failing: 101 });
});

test('configuration, fixture, and unresolved outcomes stop search for diagnosis', () => {
    for (const classification of ['configuration-error', 'fixture-error', 'inconclusive']) {
        const search = createSearch();
        recordProbe(search, { rate: 32, classification });
        assert.equal(nextProbeRate(search), null, classification);
        assert.equal(search.stop_reason, classification);
    }
});

test('a passing rate at the ceiling is reported as a lower bound', () => {
    const search = createSearch({ hint: 4096 });
    recordProbe(search, { rate: 4096, classification: 'pass' });
    assert.equal(nextProbeRate(search), null);
    assert.equal(search.boundary, 'at-least-ceiling');
});

test('classifier failure outcomes map to probe outcomes instead of aborting the search', () => {
    const search = createSearch({ hint: 32 });
    recordProbe(search, { rate: 32, classification: 'transaction-failure' });
    recordProbe(search, { rate: 8, classification: 'timeout' });
    recordProbe(search, { rate: 2, classification: 'unresolved' });
    assert.deepEqual(search.probes.map(item => [item.classification, item.failure_class]), [
        ['fail', 'transaction-failure'],
        ['inconclusive', 'timeout'],
        ['inconclusive', 'unresolved'],
    ]);
});
