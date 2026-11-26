'use strict';

function summarizeResourceWindow(records, { start, end, expected_interval_ms = 1000 } = {}) {
    const startMs = timestamp(start);
    const endMs = timestamp(end);
    const window = records.filter(record => {
        const at = timestamp(record.sampled_at);
        return at >= startMs && at <= endMs;
    });
    const grouped = new Map();
    for (const record of window) {
        for (const container of record.containers || []) {
            const name = container.Name || container.Container;
            if (!name) continue;
            const rows = grouped.get(name) || [];
            rows.push(container);
            grouped.set(name, rows);
        }
    }

    const components = {};
    for (const [name, rows] of grouped) components[name] = summarizeContainer(rows);
    const durationMs = Math.max(0, endMs - startMs);
    const minimumSamples = Math.max(1, Math.floor(durationMs / expected_interval_ms) - 1);
    const sampleErrors = records.filter(record => (record.sample_error || record.sample_errors?.length)
        && timestamp(record.sampled_at) >= startMs && timestamp(record.sampled_at) <= endMs).length;
    return {
        complete: window.length >= minimumSamples && sampleErrors === 0,
        sample_count: window.length,
        sample_errors: sampleErrors,
        interval_ms: expected_interval_ms,
        window_start: new Date(startMs).toISOString(),
        window_end: new Date(endMs).toISOString(),
        components,
    };
}

function summarizeContainer(rows) {
    const cpu = rows.map(row => parsePercent(row.CPUPerc)).filter(Number.isFinite);
    const memory = rows.map(row => parseBytes(String(row.MemUsage || '').split('/')[0])).filter(Number.isFinite);
    const first = rows[0];
    const last = rows.at(-1);
    const firstNet = splitPair(first.NetIO).map(parseBytes);
    const lastNet = splitPair(last.NetIO).map(parseBytes);
    const firstBlock = splitPair(first.BlockIO).map(parseBytes);
    const lastBlock = splitPair(last.BlockIO).map(parseBytes);
    return {
        sample_count: rows.length,
        cpu_mean_percent: mean(cpu),
        cpu_peak_percent: cpu.length ? Math.max(...cpu) : null,
        memory_mean_bytes: mean(memory),
        memory_peak_bytes: memory.length ? Math.max(...memory) : null,
        net_rx_delta_bytes: delta(firstNet[0], lastNet[0]),
        net_tx_delta_bytes: delta(firstNet[1], lastNet[1]),
        block_read_delta_bytes: delta(firstBlock[0], lastBlock[0]),
        block_write_delta_bytes: delta(firstBlock[1], lastBlock[1]),
    };
}

function splitPair(value) {
    return String(value || '').split('/').map(item => item.trim());
}

function parsePercent(value) {
    const parsed = Number.parseFloat(String(value || '').replace('%', '').trim());
    return Number.isFinite(parsed) ? parsed : null;
}

function parseDockerStatsLine(line) {
    const cleaned = String(line).replace(/\x1b\[[0-?]*[ -/]*[@-~]/g, '').replace(/\r/g, '').trim();
    return cleaned ? JSON.parse(cleaned) : null;
}

function parseBytes(value) {
    const match = String(value || '').trim().match(/^([0-9.]+)\s*([a-zA-Z]*)$/);
    if (!match) return null;
    const amount = Number(match[1]);
    const unit = match[2].toLowerCase();
    const multipliers = {
        '': 1, b: 1,
        kb: 1000, mb: 1000 ** 2, gb: 1000 ** 3, tb: 1000 ** 4,
        kib: 1024, mib: 1024 ** 2, gib: 1024 ** 3, tib: 1024 ** 4,
    };
    return Number.isFinite(amount) && multipliers[unit] ? amount * multipliers[unit] : null;
}

function delta(before, after) {
    return Number.isFinite(before) && Number.isFinite(after) && after >= before ? after - before : null;
}

function mean(values) {
    return values.length ? values.reduce((sum, value) => sum + value, 0) / values.length : null;
}

function timestamp(value) {
    if (typeof value === 'number') return value;
    const parsed = Date.parse(value);
    return Number.isFinite(parsed) ? parsed : NaN;
}

module.exports = { parseBytes, parseDockerStatsLine, summarizeResourceWindow };
