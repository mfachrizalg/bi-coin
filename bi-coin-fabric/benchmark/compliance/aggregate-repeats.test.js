'use strict';

const assert = require('node:assert/strict');
const { execFileSync } = require('node:child_process');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const test = require('node:test');
const { stat } = require('./aggregate-repeats');

const round = (tps, p95) => ({ verified_achieved_tps: tps, latency_ms: { minimum: 10, median: 50, p95, maximum: 300 }, resource: { components: { 'peer0.distributor.bi-coin': { cpu_mean_percent: tps } } } });
const workload = ({ max, firstFail, boundary, probe, p95s, curveTps }) => ({
    id: 'transfer-retail',
    capacity_boundary: boundary,
    highest_confirmed_passing_rate_ops_per_second: max,
    first_failing_rate_ops_per_second: firstFail,
    search: { probes: probe ? [probe] : [] },
    confirmation: { rounds: p95s.map(p95 => round(max, p95)) },
    load_curve: { levels: [{ level: 1, rate_ops_per_second: max, verified_throughput_ops_per_second: curveTps, latency_ms: { p95: 100 }, failed_count: 0, failure_classes: [] }] },
});

const repeats = [
    workload({ max: 40, firstFail: 44, boundary: 'bracketed', p95s: [100, 120, 110], curveTps: 40,
        probe: { rate: 44, classification: 'fail', failures: [
            { validation_code: 'MVCC_READ_CONFLICT' }, { validation_code: 'MVCC_READ_CONFLICT' }, { validation_code: 'MVCC_READ_CONFLICT' }, { failure_class: 'timeout' },
        ] } }),
    workload({ max: 64, firstFail: 70, boundary: 'bracketed', p95s: [200, 180, 190], curveTps: 64,
        probe: { rate: 70, classification: 'fail', failures: [], drain_throughput_pass: false } }),
    workload({ max: 52, firstFail: null, boundary: 'client-bound', p95s: [150, 150, 160], curveTps: 50 }),
];

test('three repeats give the hand-computed median and min-max per workload', t => {
    const directory = fs.mkdtempSync(path.join(os.tmpdir(), 'aggregate-repeats-'));
    t.after(() => fs.rmSync(directory, { recursive: true, force: true }));
    const inputs = repeats.map((item, index) => {
        const file = path.join(directory, `capacity-${index + 1}.json`);
        fs.writeFileSync(file, JSON.stringify({ workloads: [item] }));
        return file;
    });
    const output = path.join(directory, 'aggregate.json');
    execFileSync(process.execPath, [path.join(__dirname, 'aggregate-repeats.js'), output, ...inputs]);
    const result = JSON.parse(fs.readFileSync(output, 'utf8')).workloads['transfer-retail'];

    assert.deepEqual(result.max_confirmed_ops_per_second, { median: 52, min: 40, max: 64, n: 3 });
    assert.deepEqual(result.first_failing_rate_ops_per_second, { median: 57, min: 44, max: 70, n: 2 }, 'client-bound repeat has no failing rate');
    assert.deepEqual(result.first_fail_cause, ['MVCC_READ_CONFLICT', 'backlog-drain', 'client-bound']);
    assert.deepEqual(result.capacity_boundary, ['bracketed', 'bracketed', 'client-bound']);
    // Per repeat p95 is the median of its rounds (110, 190, 150); across repeats the median is 150.
    assert.deepEqual(result.confirmed.latency_ms.p95, { median: 150, min: 110, max: 190, n: 3 });
    assert.deepEqual(result.confirmed.resources['peer0.distributor.bi-coin'].cpu_mean_percent, { median: 52, min: 40, max: 64, n: 3 });
    assert.deepEqual(result.curve['1'].verified_throughput_ops_per_second, { median: 50, min: 40, max: 64, n: 3 });
});

test('median of an even count averages the two middle values and ignores non-numbers', () => {
    assert.deepEqual(stat([4, 1, null, 3, 2]), { median: 2.5, min: 1, max: 4, n: 4 });
    assert.equal(stat([null, undefined]), null);
});
