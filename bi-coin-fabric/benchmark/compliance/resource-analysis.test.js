'use strict';

const assert = require('node:assert/strict');
const test = require('node:test');

const { parseDockerStatsLine, summarizeResourceWindow } = require('./resource-analysis');

function sample(at, cpu, memory, net, block) {
    return {
        sampled_at: at,
        containers: [{
            Name: 'peer0',
            CPUPerc: `${cpu}%`,
            MemUsage: `${memory}MiB / 1GiB`,
            NetIO: `${net}kB / ${net * 2}kB`,
            BlockIO: `${block}kB / ${block * 2}kB`,
        }],
    };
}

test('attributes only samples within the measured interval', () => {
    const result = summarizeResourceWindow([
        sample('2026-01-01T00:00:00.000Z', 99, 900, 900, 900),
        sample('2026-01-01T00:00:01.000Z', 10, 100, 10, 20),
        sample('2026-01-01T00:00:02.000Z', 20, 120, 15, 25),
        sample('2026-01-01T00:00:03.000Z', 90, 800, 800, 800),
    ], {
        start: '2026-01-01T00:00:01.000Z',
        end: '2026-01-01T00:00:02.000Z',
    });

    assert.equal(result.sample_count, 2);
    assert.equal(result.components.peer0.cpu_mean_percent, 15);
    assert.equal(result.components.peer0.cpu_peak_percent, 20);
    assert.equal(result.components.peer0.net_rx_delta_bytes, 5 * 1000);
    assert.equal(result.components.peer0.block_read_delta_bytes, 5 * 1000);
});

test('marks a resource window incomplete when no samples fall inside it', () => {
    const result = summarizeResourceWindow([], { start: 0, end: 1000 });
    assert.equal(result.complete, false);
    assert.equal(result.sample_count, 0);
});

test('marks a one-second resource window incomplete when a sample failed', () => {
    const result = summarizeResourceWindow([
        { ...sample('2026-01-01T00:00:00.000Z', 10, 10, 10, 10), sample_errors: ['missing Caliper client'] },
        sample('2026-01-01T00:00:01.000Z', 10, 10, 11, 11),
        sample('2026-01-01T00:00:02.000Z', 10, 10, 12, 12),
    ], { start: '2026-01-01T00:00:00.000Z', end: '2026-01-01T00:00:02.000Z' });
    assert.equal(result.sample_errors, 1);
    assert.equal(result.complete, false);
});

test('parses Docker stats JSON after terminal clear-line sequences', () => {
    assert.deepEqual(parseDockerStatsLine('\u001b[K{"Name":"peer0","CPUPerc":"1.0%"}\r'), {
        Name: 'peer0', CPUPerc: '1.0%',
    });
});
