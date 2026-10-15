'use strict';

const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const test = require('node:test');
const { makeReport, measurementRows, summarizeWorkloads } = require('./write-report');

test('report retains every tested rate and distinguishes query rate from committed TPS', () => {
    const capacity = { workloads: [{
        id: 'read-balance',
        chaincode: 'rupiah-payments',
        transaction: 'GetBalance',
        operation_kind: 'query',
        search_hint_ops_per_second: 32,
        search: {
            probes: [
                { rate: 32, classification: 'pass', offered_ops_per_second: 32, verified_query_rate: 31, counts: { delivered: 320, verified: 310, failed: 0, timeouts: 0, unresolved: 0 } },
                { rate: 128, classification: 'fail', offered_ops_per_second: 128, verified_query_rate: 100, counts: { delivered: 1280, verified: 1000, failed: 280, timeouts: 0, unresolved: 0 } },
            ],
            failing_rate_ops_per_second: 128,
            remaining_interval_ops_per_second: 1,
        },
        confirmation: {
            classification: 'pass',
            rounds: [{ rate: 32, classification: 'pass', offered_ops_per_second: 32, verified_query_rate: 31.5, counts: { delivered: 960, verified: 945, failed: 0, timeouts: 0, unresolved: 0 }, latency_ms: { median: 10, p95: 20, maximum: 30, sample_count: 945 }, resource: { complete: true, sample_count: 30, components: {} } }],
        },
        highest_confirmed_passing_rate_ops_per_second: 32,
        first_failing_rate_ops_per_second: 128,
        capacity_boundary: 'bracketed',
    }] };

    const workloads = summarizeWorkloads(capacity);
    const rows = measurementRows(workloads);
    assert.equal(rows.length, 3);
    assert.equal(workloads[0].rate_unit, 'operations/second');
    assert.equal(workloads[0].highest_confirmed_passing_rate_ops_per_second, 32);
    assert.equal(workloads[0].probes[0].verified_rate_ops_per_second, 31);
    assert.equal(workloads[0].probes[0].verified_achieved_tps, undefined);
    assert.equal(workloads[0].confirmations[0].resources.sample_count, 30);
});

test('report keeps failure transaction IDs, validation codes, and component I/O deltas', () => {
    const [workload] = summarizeWorkloads({ workloads: [{
        id: 'transfer-retail', chaincode: 'rupiah-payments', transaction: 'Transfer', operation_kind: 'write',
        search: { probes: [{ rate: 64, classification: 'fail', failures: [{ transaction_id: 'tx-1', failure_class: 'transaction-failure', validation_code: 'MVCC_READ_CONFLICT', diagnostic: 'peer validation' }], resource: { sample_count: 10, complete: true, components: { peer: { cpu_mean_percent: 10, cpu_peak_percent: 20, net_rx_delta_bytes: 100, block_read_delta_bytes: 50 } } } }] },
    }] });
    assert.equal(workload.probes[0].failures[0].transaction_id, 'tx-1');
    assert.equal(workload.probes[0].failures[0].validation_code, 'MVCC_READ_CONFLICT');
    assert.equal(workload.probes[0].resources.components.peer.net_rx_delta_bytes, 100);
});

test('functional report separates API authorization, validation, and action outcomes', t => {
    const directory = fs.mkdtempSync(path.join(os.tmpdir(), 'compliance-report-'));
    t.after(() => fs.rmSync(directory, { recursive: true, force: true }));
    fs.writeFileSync(path.join(directory, 'correctness.json'), JSON.stringify({
        classification: 'pass',
        overall_conformance_claim_allowed: true,
        functional_scenario_count: 20,
        functional_scenarios_executed: 20,
        functional_cases_missing: [],
        api_route_role_cells: 207,
        api_access_passed: 207,
        api_access_unresolved: 0,
        api_validation_cells: 27,
        api_validation_passed: 27,
        api_validation_unresolved: 0,
        api_action_cells: 15,
        api_action_passed: 15,
        api_action_violations: 0,
        api_action_unresolved: 0,
    }));
    fs.writeFileSync(path.join(directory, 'capacity.json'), JSON.stringify({ workloads: [] }));

    const summary = makeReport(directory);
    const report = fs.readFileSync(path.join(directory, 'REPORT.md'), 'utf8');
    assert.equal(summary.correctness.api_action_passed, 15);
    assert.match(report, /bodyless action outcomes 15\/15 passed/);
});
