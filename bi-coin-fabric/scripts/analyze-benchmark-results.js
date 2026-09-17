'use strict';

const fs = require('node:fs');
const path = require('node:path');
const zlib = require('node:zlib');

const FAILURE_RULES = [
    ['KYC rejection', /KYC profile expired|KYC status|KYC risk|prohibited-risk|high-risk.*approval|due diligence/i],
    ['Wallet-tier limit exceeded', /per-transaction limit exceeded|daily transaction limit exceeded|monthly transaction limit exceeded|receiver max balance|monthly incoming limit exceeded|mint would exceed max balance/i],
    ['Insufficient balance', /insufficient (?:balance|funds|wholesale balance)/i],
    ['Authorization failure', /access denied|not authorized|custodian MSP mismatch|custody|forbidden|permission/i],
    ['MVCC read conflict', /MVCC_READ_CONFLICT|read conflict|status code:\s*11\b/i],
    ['Endorsement failure', /ENDORSEMENT_POLICY_FAILURE|status code:\s*10\b|endorsement policy failure/i],
    ['Gateway timeout', /gateway.*timeout|gateway.*deadline|deadline exceeded/i],
    ['Ordering or commit timeout', /commit timeout|order(?:er|ing).*timeout|timed? out.*commit/i],
    ['Connection failure', /failed to connect|connection (?:refused|reset|closed)|channel has been shut down|\bunavailable\b/i],
    ['Invalid chaincode response', /invalid chaincode|chaincode response\s+5\d\d|chaincode.*(?:error|failed)/i],
    ['Gateway concurrency limit', /too many requests for \/gateway\.Gateway|exceeding concurrency limit/i],
    ['Timeout', /\btimeout\b|timed? out/i],
];

function number(value) {
    const result = Number(value);
    return Number.isFinite(result) ? result : null;
}

function percentile(values, probability) {
    if (!values.length) return null;
    const sorted = [...values].sort((a, b) => a - b);
    const position = (sorted.length - 1) * probability;
    const lower = Math.floor(position);
    const upper = Math.ceil(position);
    if (lower === upper) return sorted[lower];
    return sorted[lower] + (sorted[upper] - sorted[lower]) * (position - lower);
}

function mean(values) {
    return values.length ? values.reduce((sum, value) => sum + value, 0) / values.length : null;
}

function populationStandardDeviation(values) {
    if (!values.length) return null;
    const average = mean(values);
    return Math.sqrt(values.reduce((sum, value) => sum + (value - average) ** 2, 0) / values.length);
}

function sampleStandardDeviation(values) {
    if (values.length < 2) return values.length === 1 ? 0 : null;
    const average = mean(values);
    return Math.sqrt(values.reduce((sum, value) => sum + (value - average) ** 2, 0) / (values.length - 1));
}

function latencySummary(latencies) {
    return {
        mean_s: mean(latencies),
        p50_s: percentile(latencies, 0.50),
        p95_s: percentile(latencies, 0.95),
        p99_s: percentile(latencies, 0.99),
        sd_s: populationStandardDeviation(latencies),
        min_s: latencies.length ? Math.min(...latencies) : null,
        max_s: latencies.length ? Math.max(...latencies) : null,
        samples: latencies.length,
    };
}

function resultText(result) {
    if (!result) return '';
    const values = [result.error, result.message, result.error_message, result.error_messages, result.result];
    return values.filter(value => value !== undefined && value !== null)
        .map(value => typeof value === 'string' ? value : JSON.stringify(value))
        .join(' | ');
}

function classifyFailure(result) {
    const text = resultText(result);
    const flags = number(result?.flags);
    if (flags === 11) return 'MVCC read conflict';
    if (flags === 10) return 'Endorsement failure';
    if (flags === 25) return 'Invalid chaincode response';
    for (const [category, pattern] of FAILURE_RULES) {
        if (pattern.test(text)) return category;
    }
    return 'Unknown failure';
}

function isTimeout(result) {
    return classifyFailure(result) === 'Gateway timeout'
        || classifyFailure(result) === 'Ordering or commit timeout'
        || classifyFailure(result) === 'Timeout';
}

function isTimeoutCategory(category) {
    return category === 'Gateway timeout'
        || category === 'Ordering or commit timeout'
        || category === 'Timeout';
}

function readTraceFiles(resultDirectory, traceFiles) {
    const files = traceFiles?.length
        ? traceFiles
        : fs.readdirSync(resultDirectory).filter(file => /^transactions-worker-\d+\.jsonl$/.test(file));
    const events = [];
    for (const file of files) {
        const absolute = path.isAbsolute(file) ? file : path.join(resultDirectory, file);
        if (!fs.existsSync(absolute)) continue;
        for (const line of fs.readFileSync(absolute, 'utf8').split(/\r?\n/).filter(Boolean)) {
            try { events.push(JSON.parse(line)); } catch { /* retain raw logs for diagnosis */ }
        }
    }
    return events;
}

function readLines(file) {
    const data = fs.readFileSync(file);
    const text = file.endsWith('.gz') ? zlib.gunzipSync(data).toString('utf8') : data.toString('utf8');
    return text.split(/\r?\n/).filter(Boolean);
}

function readCaliperFailureReasons(run, resultDirectory) {
    if (!run.logFile) return [];
    const file = path.isAbsolute(run.logFile) ? run.logFile : path.join(resultDirectory, run.logFile);
    if (!fs.existsSync(file)) return [];
    const label = run.measuredRound;
    let active = !label;
    const reasons = [];
    for (const rawLine of fs.readFileSync(file, 'utf8').split(/\r?\n/)) {
        const line = rawLine.replace(/\x1b\[[0-9;]*m/g, '');
        if (label && line.includes(`Started round`) && line.includes(`(${label})`)) active = true;
        if (active && /Failed to perform (?:submit|query) transaction/.test(line)) {
            reasons.push(classifyFailure({ message: line }));
        }
        if (label && active && line.includes(`Finished round`) && line.includes(`(${label})`)) active = false;
    }
    return reasons;
}

function summarizeRun(run, resultDirectory) {
    const events = readTraceFiles(resultDirectory, run.traceFiles);
    const submitted = new Map();
    const finished = new Map();
    for (const event of events) {
        const label = event.roundLabel || run.scenarioId || 'unknown';
        if (event.event === 'submitted') submitted.set(label, (submitted.get(label) || 0) + (number(event.count) || 0));
        if (event.event === 'finished') (finished.get(label) || finished.set(label, []).get(label)).push(event.result || {});
    }

    const allLabels = new Set([...submitted.keys(), ...finished.keys()]);
    const labels = run.measuredRound ? new Set([run.measuredRound]) : allLabels;
    const rows = [];
    for (const label of labels) {
        const results = finished.get(label) || [];
        const totalSubmitted = submitted.get(label) || results.length;
        const successResults = results.filter(result => String(result.status).toLowerCase() === 'success' && result.verified !== false);
        const failureResults = results.filter(result => !successResults.includes(result));
        const timeoutResults = failureResults.filter(isTimeout);
        const failedResults = failureResults.filter(result => !timeoutResults.includes(result));
        const missing = Math.max(0, totalSubmitted - results.length);
        const latencies = successResults.map(result => {
            const create = number(result.time_create);
            const finish = number(result.time_final);
            return create !== null && finish !== null ? (finish - create) / 1000 : null;
        }).filter(value => value !== null && value >= 0);
        const duration = number(run.durationSeconds) || 1;
        const reasons = {};
        let failedCount = failedResults.length;
        let timedOutCount = timeoutResults.length;
        for (const result of failedResults) {
            const category = classifyFailure(result);
            reasons[category] = (reasons[category] || 0) + 1;
        }
        for (const result of timeoutResults) {
            const category = classifyFailure(result);
            reasons[category] = (reasons[category] || 0) + 1;
        }
        const loggedReasons = readCaliperFailureReasons(run, resultDirectory);
        if (loggedReasons.length === failedResults.length + timeoutResults.length) {
            for (const category of Object.keys(reasons)) delete reasons[category];
            for (const category of loggedReasons) reasons[category] = (reasons[category] || 0) + 1;
            timedOutCount = loggedReasons.filter(isTimeoutCategory).length;
            failedCount = loggedReasons.length - timedOutCount;
        }
        if (missing) reasons['Timeout'] = (reasons['Timeout'] || 0) + missing;
        rows.push({
            ...run,
            roundLabel: label,
            submitted: totalSubmitted,
            successful: successResults.length,
            failed: failedCount,
            timed_out: timedOutCount + missing,
            offered_tps: totalSubmitted / duration,
            achieved_tps: successResults.length / duration,
            success_rate: totalSubmitted ? successResults.length / totalSubmitted : 0,
            ...latencySummary(latencies),
            failureReasons: reasons,
            completed: results.length,
            missing,
        });
    }
    return rows;
}

function summarizeAcrossRuns(rows) {
    const byScenario = new Map();
    for (const row of rows) {
        const key = `${row.phase || 'primary'}|${row.transactionFamily || row.scenarioId}|${row.operation || ''}|${row.contention || 'none'}|${row.workerCount || ''}|${row.targetTps}`;
        if (!byScenario.has(key)) byScenario.set(key, []);
        byScenario.get(key).push(row);
    }
    return [...byScenario.entries()].map(([key, values]) => {
        const numeric = field => values.map(value => number(value[field])).filter(value => value !== null);
        const summary = field => ({ mean: mean(numeric(field)), sd: sampleStandardDeviation(numeric(field)) });
        const first = values[0];
        return {
            key,
            phase: first.phase || 'primary',
            transactionFamily: first.transactionFamily,
            operation: first.operation,
            contention: first.contention || 'none',
            workerCount: first.workerCount || null,
            targetTps: first.targetTps,
            repetitions: values.length,
            submitted: values.reduce((sum, value) => sum + value.submitted, 0),
            successful: values.reduce((sum, value) => sum + value.successful, 0),
            failed: values.reduce((sum, value) => sum + value.failed, 0),
            timed_out: values.reduce((sum, value) => sum + value.timed_out, 0),
            offered_tps: summary('offered_tps'),
            achieved_tps: summary('achieved_tps'),
            success_rate: summary('success_rate'),
            latency_mean_s: summary('mean_s'),
            latency_p50_s: summary('p50_s'),
            latency_p95_s: summary('p95_s'),
            latency_p99_s: summary('p99_s'),
            latency_sd_s: summary('sd_s'),
            latency_min_s: summary('min_s'),
            latency_max_s: summary('max_s'),
            sustainable: values.length === 5 && values.every(value => value.success_rate >= 0.99 && value.p95_s !== null && value.p95_s <= 2.5),
        };
    });
}

function flattenFailureReasons(rows) {
    const counts = new Map();
    for (const row of rows) for (const [category, count] of Object.entries(row.failureReasons || {})) {
        const key = `${row.phase || 'primary'}|${row.transactionFamily || row.scenarioId}|${row.operation || ''}|${row.contention || 'none'}|${category}`;
        counts.set(key, (counts.get(key) || 0) + count);
    }
    return [...counts.entries()].map(([key, count]) => {
        const [phase, transactionFamily, operation, contention, category] = key.split('|');
        return { phase, transactionFamily, operation, contention, category, count };
    });
}

function summarizeResourceFile(file, run, resultDirectory) {
    if (!file || !fs.existsSync(file)) return [];
    const traceEvents = readTraceFiles(resultDirectory, run.traceFiles);
    const measuredResults = traceEvents
        .filter(event => event.event === 'finished' && (!run.measuredRound || event.roundLabel === run.measuredRound))
        .map(event => event.result || {});
    const timestamps = measuredResults.flatMap(result => [number(result.time_create), number(result.time_final)])
        .filter(value => value !== null && value > 0);
    const start = timestamps.length ? Math.min(...timestamps) : null;
    const end = timestamps.length ? Math.max(...timestamps) : null;
    const values = new Map();
    for (const line of readLines(file)) {
        let event;
        try { event = JSON.parse(line); } catch { continue; }
        const sampledAt = Date.parse(event.sampledAt || '');
        if (start !== null && end !== null && (!Number.isFinite(sampledAt) || sampledAt < start || sampledAt > end)) continue;
        const results = event.response?.data?.result;
        if (!Array.isArray(results)) continue;
        for (const sample of results) {
            const value = number(sample.value?.[1]);
            if (value === null) continue;
            const metric = sample.metric || {};
            const component = metric.name || metric.container_label_com_docker_compose_service
                || metric.instance || metric.device || 'host';
            const key = JSON.stringify([event.name, component, event.unit || '']);
            if (!values.has(key)) values.set(key, []);
            values.get(key).push(value);
        }
    }
    return [...values.entries()].map(([key, samples]) => {
        const [metric, component, unit] = JSON.parse(key);
        return {
            phase: run.phase || 'primary',
            scenarioId: run.scenarioId,
            component,
            metric,
            unit,
            mean: mean(samples),
            max: Math.max(...samples),
            p95: percentile(samples, 0.95),
        };
    });
}

function summarizeCaliperProcessResources(file, run) {
    if (!file || !fs.existsSync(file)) return [];
    const fullHtml = fs.readFileSync(file, 'utf8');
    const marker = `<h3>Resource utilization for ${run.measuredRound}</h3>`;
    const start = run.measuredRound ? fullHtml.indexOf(marker) : 0;
    if (run.measuredRound && start === -1) return [];
    const end = fullHtml.indexOf('<h2>', start + marker.length);
    const html = fullHtml.slice(start, end === -1 ? fullHtml.length : end);
    const decode = value => value.replace(/<[^>]*>/g, ' ').replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&').replace(/&#x2F;/gi, '/').replace(/\s+/g, ' ').trim();
    const parseValue = (value, unit) => {
        const match = value.match(/[0-9.]+/);
        if (!match) return null;
        const multipliers = { B: 1, KB: 1024, MB: 1024 ** 2, GB: 1024 ** 3 };
        return unit === 'bytes' ? Number(match[0]) * (multipliers[value.match(/(GB|MB|KB|B)/i)?.[1]?.toUpperCase()] || 1) : Number(match[0]);
    };
    const rows = [];
    for (const table of html.matchAll(/<table[^>]*>([\s\S]*?)<\/table>/gi)) {
        const parsed = [...table[1].matchAll(/<tr[^>]*>([\s\S]*?)<\/tr>/gi)].map(row => (
            [...row[1].matchAll(/<t[hd][^>]*>([\s\S]*?)<\/t[hd]>/gi)].map(cell => decode(cell[1]))
        ));
        const header = parsed[0] || [];
        if (!header.includes('CPU%(max)') || header.includes('Traffic In')) continue;
        const indexes = Object.fromEntries(header.map((value, index) => [value, index]));
        for (const row of parsed.slice(1)) {
            if (!row[indexes.Name]) continue;
            for (const [column, metric, unit] of [
                ['CPU%(avg)', 'caliper_client_cpu_avg', 'percent'],
                ['CPU%(max)', 'caliper_client_cpu_max', 'percent'],
                ['Memory(avg)', 'caliper_client_memory_avg', 'bytes'],
                ['Memory(max)', 'caliper_client_memory_max', 'bytes'],
            ]) {
                const index = header.findIndex(value => value.startsWith(column));
                if (index === -1) continue;
                const value = parseValue(row[index], unit);
                if (value === null) continue;
                rows.push({
                    phase: run.phase || 'primary',
                    scenarioId: run.scenarioId,
                    component: row[indexes.Name],
                    metric,
                    unit,
                    mean: value,
                    max: value,
                    p95: null,
                });
            }
        }
    }
    return rows;
}

function csvValue(value) {
    if (value === null || value === undefined) return '';
    const text = typeof value === 'object' ? JSON.stringify(value) : String(value);
    return /[",\n]/.test(text) ? `"${text.replaceAll('"', '""')}"` : text;
}

function writeCsv(file, rows, columns) {
    const output = [columns.join(','), ...rows.map(row => columns.map(column => csvValue(row[column])).join(','))].join('\n') + '\n';
    fs.writeFileSync(file, output);
}

function markdownTable(rows, columns) {
    if (!rows.length) return '_No rows._';
    return [
        `| ${columns.join(' | ')} |`,
        `| ${columns.map(() => '---').join(' | ')} |`,
        ...rows.map(row => `| ${columns.map(column => csvValue(row[column])).join(' | ')} |`),
    ].join('\n');
}

function scenarioName(row) {
    return `${row.phase || 'primary'}/${row.transactionFamily}/${row.operation}/${row.contention}`;
}

function reportMarkdown(result, runs, failures) {
    const format = value => value === null || value === undefined ? 'N/A' : typeof value === 'number' ? value.toFixed(4) : value;
    const rows = result.scenarios.map(row => ({
        Scenario: scenarioName(row),
        'Target TPS': row.targetTps,
        Repetitions: row.repetitions,
        'Offered TPS mean±SD': `${format(row.offered_tps.mean)} ± ${format(row.offered_tps.sd)}`,
        'Achieved TPS mean±SD': `${format(row.achieved_tps.mean)} ± ${format(row.achieved_tps.sd)}`,
        'Success mean±SD': `${format(row.success_rate.mean * 100)}% ± ${format(row.success_rate.sd * 100)}%`,
        'Sustainable': row.sustainable ? 'YES' : 'NO',
    }));
    const latency = result.scenarios.map(row => ({
        Scenario: scenarioName(row),
        'Mean (s)': format(row.latency_mean_s.mean),
        'p50 (s)': format(row.latency_p50_s.mean),
        'p95 (s)': format(row.latency_p95_s.mean),
        'p99 (s)': format(row.latency_p99_s.mean),
        'SD (s)': format(row.latency_sd_s.mean),
        'Min (s)': format(row.latency_min_s.mean),
        'Max (s)': format(row.latency_max_s.mean),
    }));
    return `# Benchmark Statistical Report

## 1. Offered TPS vs Achieved TPS

Offered TPS is submitted transactions divided by the measured duration. Achieved TPS is successful completions divided by the same duration.

${markdownTable(rows, ['Scenario', 'Target TPS', 'Repetitions', 'Offered TPS mean±SD', 'Achieved TPS mean±SD', 'Success mean±SD', 'Sustainable'])}

## 2. Transaction Completion Counts

    ${markdownTable(result.scenarios.map(row => ({
    Scenario: scenarioName(row),
    Submitted: row.submitted,
    Successful: row.successful,
    Failed: row.failed,
    'Timed out': row.timed_out,
    'Success rate': `${format(row.success_rate.mean * 100)}%`,
})), ['Scenario', 'Submitted', 'Successful', 'Failed', 'Timed out', 'Success rate'])}

## 3. Failure Reasons

${markdownTable(failures, ['phase', 'transactionFamily', 'operation', 'contention', 'category', 'count'])}

## 4. Latency Measurements

Latency is Caliper-observed Fabric end-to-final-status latency (time_final - time_create) for successful completions. Percentiles use Type-7 interpolation; latency SD is the population SD within each run.

${markdownTable(latency, ['Scenario', 'Mean (s)', 'p50 (s)', 'p95 (s)', 'p99 (s)', 'SD (s)', 'Min (s)', 'Max (s)'])}

## 5. Saturation Point

The sustainable gate is at least 99% successful completions and p95 latency at most 2.5 seconds in all five repetitions. The highest load passing that gate is the maximum sustainable offered load; its successful throughput is reported separately as Achieved TPS.

## 6. Resource Metrics

Resource rows are emitted from the synchronized Prometheus capture. Missing telemetry is invalid evidence, not zero usage.

${markdownTable(result.resources || [], ['phase', 'scenarioId', 'component', 'metric', 'unit', 'mean', 'max', 'p95'])}

## 7. Results by Transaction Type

Each row is isolated: Issuance, Distribution, Retail Transfer, Merchant Payment, Redemption, Balance Query, and Wallet Status Change. Freeze and Unfreeze are preserved as separate operations.

## 8. Repetition and Uncertainty

Every confirmatory scenario is repeated five times. Tables report the mean and sample standard deviation across repetitions. Raw traces and Prometheus responses remain beside this report for reanalysis.

## Measurement Boundary

The primary benchmark measures direct Fabric traffic. Backend API, PostgreSQL, and KYC are evaluated separately by the end-to-end demonstration and are not mixed into these Fabric latency or throughput values.
`;
}

function analyze(resultDirectory) {
    const metadataPath = path.join(resultDirectory, 'metadata.json');
    if (!fs.existsSync(metadataPath)) throw new Error(`missing ${metadataPath}`);
    const metadata = JSON.parse(fs.readFileSync(metadataPath, 'utf8'));
    const runs = (metadata.runs || []).flatMap(run => summarizeRun(run, resultDirectory));
    const scenarios = summarizeAcrossRuns(runs);
    const failures = flattenFailureReasons(runs);
    const resourceRows = [
        ...(metadata.resources || []),
        ...(metadata.runs || []).flatMap(run => {
            const file = run.metricsFile && (path.isAbsolute(run.metricsFile)
                ? run.metricsFile : path.join(resultDirectory, run.metricsFile));
            const report = run.reportFile && (path.isAbsolute(run.reportFile)
                ? run.reportFile : path.join(resultDirectory, run.reportFile));
            return [
                ...summarizeResourceFile(file, run, resultDirectory),
                ...summarizeCaliperProcessResources(report, run),
            ];
        }),
    ];
    const result = {
        schemaVersion: 1,
        study: metadata.study || null,
        definition: {
            durationSeconds: metadata.durationSeconds || 120,
            successThreshold: 0.99,
            p95ThresholdSeconds: 2.5,
            latencyBoundary: 'Fabric time_final - time_create',
            timeoutIsExclusive: true,
        },
        runs,
        scenarios,
        failures,
        resources: resourceRows,
    };
    writeCsv(path.join(resultDirectory, 'runs.csv'), runs, [
        'scenarioId', 'phase', 'transactionFamily', 'operation', 'contention', 'repetition', 'roundLabel', 'targetTps',
        'durationSeconds', 'submitted', 'successful', 'failed', 'timed_out', 'offered_tps', 'achieved_tps',
        'success_rate', 'mean_s', 'p50_s', 'p95_s', 'p99_s', 'sd_s', 'min_s', 'max_s', 'missing',
    ]);
    writeCsv(path.join(resultDirectory, 'failure-reasons.csv'), failures, ['phase', 'transactionFamily', 'operation', 'contention', 'category', 'count']);
    writeCsv(path.join(resultDirectory, 'resources.csv'), result.resources, ['phase', 'scenarioId', 'component', 'metric', 'unit', 'mean', 'max', 'p95']);
    fs.writeFileSync(path.join(resultDirectory, 'summary.json'), `${JSON.stringify(result, null, 2)}\n`);
    fs.writeFileSync(path.join(resultDirectory, 'REPORT.md'), reportMarkdown(result, runs, failures));
    return result;
}

if (require.main === module) {
    const resultDirectory = process.argv[2];
    if (!resultDirectory) {
        console.error('usage: node scripts/analyze-benchmark-results.js <result-directory>');
        process.exit(2);
    }
    try {
        const result = analyze(resultDirectory);
        console.log(JSON.stringify({ runs: result.runs.length, scenarios: result.scenarios.length, failures: result.failures.length }));
    } catch (error) {
        console.error(error.message);
        process.exit(1);
    }
}

module.exports = {
    analyze,
    classifyFailure,
    latencySummary,
    percentile,
    populationStandardDeviation,
    sampleStandardDeviation,
    summarizeAcrossRuns,
    summarizeRun,
};
