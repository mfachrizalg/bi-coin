'use strict';

// Combines the capacity.json files of independent repeats (ADR 0021): every number becomes median, min, max, and n.
// Usage: node benchmark/compliance/aggregate-repeats.js <out.json> <capacity.json> <capacity.json> <capacity.json>

const fs = require('node:fs');

function stat(values) {
    const sorted = values.filter(Number.isFinite).sort((left, right) => left - right);
    if (!sorted.length) return null;
    const middle = Math.floor(sorted.length / 2);
    const median = sorted.length % 2 ? sorted[middle] : (sorted[middle - 1] + sorted[middle]) / 2;
    return { median, min: sorted[0], max: sorted.at(-1), n: sorted.length };
}

// Numbers become a stat; strings, arrays, and nulls become the list of per-item values; objects recurse by key.
function combine(items) {
    const present = items.filter(item => item !== undefined);
    if (present.some(item => typeof item === 'number')) return stat(present);
    if (present.some(item => item && typeof item === 'object' && !Array.isArray(item))) {
        const keys = [...new Set(present.flatMap(item => (item && typeof item === 'object' ? Object.keys(item) : [])))];
        return Object.fromEntries(keys.map(key => [key, combine(present.map(item => item?.[key]))]));
    }
    return present.map(item => (Array.isArray(item) ? item.join('+') : item ?? null));
}

function medians(value) {
    if (value === null || typeof value !== 'object' || Array.isArray(value)) return value;
    if ('median' in value && 'n' in value) return value.median;
    return Object.fromEntries(Object.entries(value).map(([key, item]) => [key, medians(item)]));
}

// Cause of the first failing rate: the most frequent validation code or failure class of its probe.
function firstFailCause(workload) {
    const rate = workload.first_failing_rate_ops_per_second;
    if (!Number.isFinite(rate)) return workload.capacity_boundary === 'client-bound' ? 'client-bound' : 'none';
    const probe = (workload.search?.probes || []).find(item => item.rate === rate);
    if (!probe) return 'unknown';
    const counts = {};
    for (const failure of probe.failures || []) {
        const cause = failure.validation_code || failure.failure_class || 'unresolved';
        counts[cause] = (counts[cause] || 0) + 1;
    }
    const top = Object.entries(counts).sort((left, right) => right[1] - left[1])[0];
    if (top) return top[0];
    if (probe.drain_throughput_pass === false) return 'backlog-drain';
    // The probe passed, but the confirmation at this rate failed (the runner keeps only the last confirmation).
    return probe.classification === 'pass' ? 'confirmation-failure' : probe.classification || 'unknown';
}

function summarizeRepeat(workload) {
    const rounds = workload.confirmation?.rounds || [];
    return {
        capacity_boundary: workload.capacity_boundary ?? null,
        max_confirmed_ops_per_second: workload.highest_confirmed_passing_rate_ops_per_second ?? null,
        first_failing_rate_ops_per_second: workload.first_failing_rate_ops_per_second ?? null,
        first_fail_cause: firstFailCause(workload),
        // Per repeat, each confirmation number is the median of its rounds.
        confirmed: rounds.length ? medians(combine(rounds.map(round => ({
            verified_throughput_ops_per_second: round.verified_achieved_tps ?? round.verified_query_rate ?? null,
            latency_ms: round.latency_ms,
            resources: round.resource?.components,
        })))) : null,
        curve: Object.fromEntries((workload.load_curve?.levels || []).map(level => [String(level.level), {
            rate_ops_per_second: level.rate_ops_per_second,
            verified_throughput_ops_per_second: level.verified_throughput_ops_per_second,
            latency_ms: level.latency_ms,
            failed_count: level.failed_count,
            timeout_count: level.timeout_count,
            drain_seconds: level.drain_seconds,
            failure_classes: level.failure_classes,
        }])),
    };
}

function aggregateRepeats(reports) {
    const ids = [...new Set(reports.flatMap(report => (report.workloads || []).map(item => item.id)))];
    return {
        repeats: reports.length,
        workloads: Object.fromEntries(ids.map(id => [id, combine(reports.map(report => {
            const workload = (report.workloads || []).find(item => item.id === id);
            return workload ? summarizeRepeat(workload) : undefined;
        }))])),
    };
}

if (require.main === module) {
    const [output, ...inputs] = process.argv.slice(2);
    if (!output || inputs.length < 2) {
        console.error('usage: aggregate-repeats.js <out.json> <capacity.json> <capacity.json> [...]');
        process.exit(2);
    }
    const result = aggregateRepeats(inputs.map(file => JSON.parse(fs.readFileSync(file, 'utf8'))));
    result.sources = inputs;
    fs.writeFileSync(output, `${JSON.stringify(result, null, 2)}\n`);
    for (const [id, item] of Object.entries(result.workloads)) {
        const max = item.max_confirmed_ops_per_second;
        const range = max?.median === undefined ? 'n/a' : `${max.median} [${max.min}-${max.max}]`;
        console.log(`${id}: max ${range} ops/s; boundary ${item.capacity_boundary.join(',')}; first-fail cause ${item.first_fail_cause.join(',')}`);
    }
}

module.exports = { aggregateRepeats, combine, firstFailCause, stat };
