'use strict';

const fs = require('node:fs');
const path = require('node:path');

function readJSON(file) {
    return fs.existsSync(file) ? JSON.parse(fs.readFileSync(file, 'utf8')) : null;
}

function summarizeWorkloads(capacity) {
    return (capacity?.workloads || []).map(workload => {
        const rateUnit = workload.operation_kind === 'query' ? 'operations/second' : 'TPS';
        const probes = (workload.search?.probes || []).map(row => summarizeMeasurement(workload, row, 'probe', rateUnit));
        const confirmations = (workload.confirmation?.rounds || []).map(row => summarizeMeasurement(workload, row, 'confirmation', rateUnit));
        return {
            id: workload.id,
            chaincode: workload.chaincode,
            transaction: workload.transaction,
            operation_kind: workload.operation_kind,
            rate_unit: rateUnit,
            preflight: workload.preflight?.classification || 'missing',
            search_hint_ops_per_second: workload.search_hint_ops_per_second ?? null,
            highest_confirmed_passing_rate_ops_per_second: workload.highest_confirmed_passing_rate_ops_per_second ?? null,
            first_failing_rate_ops_per_second: workload.first_failing_rate_ops_per_second ?? workload.search?.failing_rate_ops_per_second ?? null,
            remaining_interval_ops_per_second: workload.remaining_interval_ops_per_second ?? workload.search?.remaining_interval_ops_per_second ?? null,
            capacity_boundary: workload.capacity_boundary || workload.search?.boundary || workload.search?.classification || 'incomplete',
            search_complete: workload.search?.complete === true,
            confirmation_classification: workload.confirmation?.classification || null,
            probes,
            confirmations,
        };
    });
}

function summarizeMeasurement(workload, row, phase, rateUnit) {
    const queryRate = workload.operation_kind === 'query' ? row.verified_query_rate : undefined;
    const writeRate = workload.operation_kind === 'write' ? row.verified_achieved_tps : undefined;
    return {
        phase,
        label: row.round_label || null,
        target_rate_ops_per_second: row.rate ?? row.target_ops_per_second ?? row.target_rate ?? null,
        delivered_rate_ops_per_second: row.offered_ops_per_second ?? null,
        verified_rate_ops_per_second: queryRate ?? writeRate ?? row.drain_adjusted_verified_ops_per_second ?? null,
        rate_unit: rateUnit,
        classification: row.classification || 'inconclusive',
        delivered_count: row.delivered_count ?? row.counts?.delivered ?? 0,
        verified_count: row.verified_count ?? row.counts?.verified ?? 0,
        failed_count: row.failed_count ?? row.counts?.failed ?? 0,
        timeout_count: row.timeout_count ?? row.counts?.timeouts ?? 0,
        unresolved_count: row.unresolved_count ?? row.counts?.unresolved ?? 0,
        backlog_at_cutoff: row.backlog_at_cutoff ?? 0,
        late_completions: row.late_completions ?? 0,
        latency_ms: row.latency_ms || { median: null, p95: null, maximum: null, sample_count: 0 },
        resources: row.resource || { complete: false, sample_count: 0, components: {} },
        caliper_trace: row.caliper_trace || { consistent: false, submitted_count: 0, finished_count: 0 },
        failures: row.failures || [],
        diagnostic: row.diagnostic || '',
        caliper_exit_status: row.caliper_exit_status ?? null,
    };
}

function measurementRows(workloads) {
    return workloads.flatMap(workload => [
        ...workload.probes.map(row => ({ workload: workload.id, method: `${workload.chaincode}.${workload.transaction}`, operation_kind: workload.operation_kind, ...row })),
        ...workload.confirmations.map(row => ({ workload: workload.id, method: `${workload.chaincode}.${workload.transaction}`, operation_kind: workload.operation_kind, ...row })),
    ]);
}

function format(value, digits = 2) {
    return Number.isFinite(value) ? value.toFixed(digits) : 'n/a';
}

function capacityBoundary(workload) {
    if (workload.capacity_boundary === 'unstable') return 'unstable boundary';
    if (workload.capacity_boundary === 'at-least-ceiling') return 'at least 4096';
    if (workload.capacity_boundary === 'bracketed') return 'bracketed';
    return workload.capacity_boundary || 'not established';
}

function resourceRows(measurements) {
    return measurements.flatMap(row => Object.entries(row.resources.components || {}).map(([component, stats]) => ({
        workload: row.workload,
        rate: row.target_rate_ops_per_second,
        phase: row.phase,
        component,
        cpu_mean_percent: stats.cpu_mean_percent,
        cpu_peak_percent: stats.cpu_peak_percent,
        memory_mean_bytes: stats.memory_mean_bytes,
        memory_peak_bytes: stats.memory_peak_bytes,
        net_rx_delta_bytes: stats.net_rx_delta_bytes,
        net_tx_delta_bytes: stats.net_tx_delta_bytes,
        block_read_delta_bytes: stats.block_read_delta_bytes,
        block_write_delta_bytes: stats.block_write_delta_bytes,
        sample_count: row.resources.sample_count,
        sample_complete: row.resources.complete,
    })));
}

function makeReport(directory) {
    const correctness = readJSON(path.join(directory, 'correctness.json'));
    const capacity = readJSON(path.join(directory, 'capacity.json'));
    const workloads = summarizeWorkloads(capacity);
    const measurements = measurementRows(workloads);
    const resources = resourceRows(measurements);
    const failures = measurements.flatMap(row => row.failures.map(failure => ({
        workload: row.workload,
        rate: row.target_rate_ops_per_second,
        phase: row.phase,
        ...failure,
    }))).concat(measurements.filter(row => row.diagnostic).map(row => ({
        workload: row.workload,
        rate: row.target_rate_ops_per_second,
        phase: row.phase,
        transaction_id: null,
        status: row.classification,
        diagnostic: row.diagnostic,
        validation_code: null,
        failure_class: row.classification,
    })));
    const summary = {
        schema_version: 2,
        study: path.basename(directory),
        generated_at: new Date().toISOString(),
        worker_count: 1,
        workload_count: capacity?.performance_workload_count ?? 31,
        method_count: capacity?.performance_method_count ?? 30,
        correctness: correctness ? {
            classification: correctness.classification,
            overall_conformance_claim_allowed: correctness.overall_conformance_claim_allowed,
            functional_scenario_count: correctness.functional_scenario_count,
            functional_scenarios_executed: correctness.functional_scenarios_executed,
            functional_scenarios_missing: correctness.functional_cases_missing,
            api_route_role_cells: correctness.api_route_role_cells,
            api_access_passed: correctness.api_access_passed,
            api_access_unresolved: correctness.api_access_unresolved,
            api_validation_cells: correctness.api_validation_cells,
            api_validation_passed: correctness.api_validation_passed,
            api_validation_unresolved: correctness.api_validation_unresolved,
            api_action_cells: correctness.api_action_cells,
            api_action_passed: correctness.api_action_passed,
            api_action_violations: correctness.api_action_violations,
            api_action_unresolved: correctness.api_action_unresolved,
        } : null,
        workloads,
        measurements,
        resources,
        failures,
        interpretation: 'Local observed capacity for the captured single-host, one-worker workload. A passing ceiling is a lower bound; mixed confirmation results are unstable.',
    };

    const workloadTable = workloads.length
        ? ['| Workload | Method | Kind | Highest confirmed pass | First failing rate | Remaining interval | Boundary | Confirmation |', '|---|---|---|---:|---:|---:|---|---|', ...workloads.map(row => `| ${row.id} | ${row.chaincode}.${row.transaction} | ${row.operation_kind} | ${row.highest_confirmed_passing_rate_ops_per_second ?? 'n/a'} | ${row.first_failing_rate_ops_per_second ?? 'n/a'} | ${row.remaining_interval_ops_per_second ?? 'n/a'} | ${capacityBoundary(row)} | ${row.confirmation_classification || 'not confirmed'} |`)].join('\n')
        : 'Capacity measurements are not present yet.';
    const measurementTable = measurements.length
        ? ['| Workload | Phase | Target | Delivered | Verified | Correct / failed / timeout / unresolved | Caliper submitted / finished | Backlog | Late | Median / p95 / max ms (n) | Resource samples |', '|---|---|---:|---:|---:|---|---|---:|---:|---|---:|', ...measurements.map(row => `| ${row.workload} | ${row.phase} | ${row.target_rate_ops_per_second ?? 'n/a'} | ${format(row.delivered_rate_ops_per_second)} | ${format(row.verified_rate_ops_per_second)} ${row.rate_unit} | ${row.verified_count}/${row.failed_count}/${row.timeout_count}/${row.unresolved_count} | ${row.caliper_trace.submitted_count}/${row.caliper_trace.finished_count}${row.caliper_trace.consistent ? '' : ' mismatch'} | ${row.backlog_at_cutoff} | ${row.late_completions} | ${format(row.latency_ms.median)}/${format(row.latency_ms.p95)}/${format(row.latency_ms.maximum)} (${row.latency_ms.sample_count}) | ${row.resources.sample_count}${row.resources.complete ? '' : ' incomplete'} |`)].join('\n')
        : 'No probes completed yet.';
    const resourceTable = resources.length
        ? ['| Workload | Rate | Phase | Component | CPU mean / peak % | Memory mean / peak bytes | Network RX / TX delta bytes | Disk read / write delta bytes | Samples |', '|---|---:|---|---|---:|---:|---:|---:|---:|', ...resources.map(row => `| ${row.workload} | ${row.rate} | ${row.phase} | ${row.component} | ${format(row.cpu_mean_percent)}/${format(row.cpu_peak_percent)} | ${format(row.memory_mean_bytes, 0)}/${format(row.memory_peak_bytes, 0)} | ${row.net_rx_delta_bytes ?? 'n/a'}/${row.net_tx_delta_bytes ?? 'n/a'} | ${row.block_read_delta_bytes ?? 'n/a'}/${row.block_write_delta_bytes ?? 'n/a'} | ${row.sample_count}${row.sample_complete ? '' : ' incomplete'} |`)].join('\n')
        : 'Resource samples are not present yet.';
    const failureTable = failures.length
        ? ['| Workload | Rate | Phase | Transaction ID | Failure class | Cause confidence | Validation code | Diagnostic |', '|---|---:|---|---|---|---|---|---|', ...failures.map(row => `| ${row.workload} | ${row.rate ?? 'n/a'} | ${row.phase} | ${row.transaction_id || 'n/a'} | ${row.failure_class || 'unresolved'} | ${row.failure_confidence || 'hypothesis'} | ${row.validation_code || 'n/a'} | ${String(row.diagnostic || '').replaceAll('|', '\\|')} |`)].join('\n')
        : 'No transaction failures recorded.';

    const report = [
        `# ${summary.study} compliance benchmark`,
        '',
        `Generated: ${summary.generated_at}`,
        '',
        'One Caliper Fabric worker ran on the captured local host. Backend routes are covered by correctness checks and are excluded from performance measurements. Worker comparisons are future research.',
        '',
        '## Functional correctness',
        '',
        correctness
            ? `Classification: **${correctness.classification}**. Executed ${correctness.functional_scenarios_executed}/${correctness.functional_scenario_count} catalogued correctness scenarios; API authorization ${correctness.api_access_passed}/${correctness.api_route_role_cells} cells passed; malformed-request validation ${correctness.api_validation_passed}/${correctness.api_validation_cells} cells passed; bodyless action outcomes ${correctness.api_action_passed}/${correctness.api_action_cells} passed; unresolved API checks ${(correctness.api_access_unresolved || 0) + (correctness.api_action_unresolved || 0)}. Overall conformance claim allowed: **${correctness.overall_conformance_claim_allowed}**.`
            : 'Correctness artifacts are not present.',
        '',
        '## Capacity boundaries',
        '',
        workloadTable,
        '',
        'The 10-second probes establish a passing/failing bracket. The final rate is accepted only when all three 30-second confirmation rounds pass. A ceiling without a failing bound is reported as “at least”; inconsistent confirmation is reported as an unstable boundary.',
        '',
        '## Tested rates',
        '',
        measurementTable,
        '',
        'Read-only methods report verified operations per second. Write methods report verified achieved TPS. Latencies include median, p95, maximum, and sample count. Backlog and late completions are reported separately.',
        '',
        '## Per-component resources',
        '',
        resourceTable,
        '',
        'CPU and memory are summarized as per-component mean/peak values. Network and disk I/O are deltas over each measured window. Samples are collected once per second.',
        '',
        '## Failures',
        '',
        failureTable,
        '',
        summary.interpretation,
        '',
        'The experiment is single-host, one-worker, and short-duration. It does not establish production capacity, cross-worker scaling, geographically distributed latency, or live sanctions effectiveness.',
        '',
    ].join('\n');
    fs.writeFileSync(path.join(directory, 'summary.json'), `${JSON.stringify(summary, null, 2)}\n`);
    fs.writeFileSync(path.join(directory, 'REPORT.md'), report);
    return summary;
}

if (require.main === module) {
    const directory = process.argv[2];
    if (!directory) throw new Error('usage: node benchmark/compliance/write-report.js <study-directory>');
    const result = makeReport(path.resolve(directory));
    console.log(path.join(path.resolve(directory), 'REPORT.md'));
}

module.exports = { makeReport, measurementRows, summarizeWorkloads };
