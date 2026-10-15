'use strict';

const assert = require('node:assert/strict');
const test = require('node:test');
const { summarizeCaliperTrace } = require('./caliper-runner');

test('Caliper observer trace correlates submitted and finished IDs with workload outcomes', () => {
    const trace = [
        { event: 'submitted', roundLabel: 'probe-32', count: 2 },
        { event: 'finished', roundLabel: 'probe-32', result: { id: 'tx-1', status: 'success' } },
        { event: 'finished', roundLabel: 'probe-32', result: { id: 'tx-2', status: 'failed' } },
    ];
    const clientEvents = [
        { transaction_id: 'tx-1', status: 'success' },
        { transaction_id: 'tx-2', status: 'failed' },
    ];
    assert.deepEqual(summarizeCaliperTrace(trace, 'probe-32', clientEvents), {
        submitted_count: 2,
        finished_count: 2,
        client_event_count: 2,
        ids_match: true,
        statuses_match: true,
        consistent: true,
        failures: [{ transaction_id: 'tx-2', status: 'failed', diagnostic: '' }],
    });
});

test('missing Caliper outcomes mark the observer trace inconsistent', () => {
    const trace = [{ event: 'submitted', roundLabel: 'probe-1', count: 2 }];
    const result = summarizeCaliperTrace(trace, 'probe-1', [{ transaction_id: 'tx-1', status: 'success' }]);
    assert.equal(result.consistent, false);
});
