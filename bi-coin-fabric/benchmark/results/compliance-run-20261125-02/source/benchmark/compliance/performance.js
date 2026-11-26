'use strict';

const fs = require('node:fs');
const path = require('node:path');
const catalog = require('./case-catalog.json');
const { createLedgerSession } = require('./direct-ledger-load');
const { runHTTPWindow } = require('./http-load');
const { prepareFixturePool } = require('./prepare-fixtures');
const { selectLoads } = require('./select-loads');

function windowFixtures(pool, offset, count) {
    return pool.reuse ? pool : { reuse: false, items: pool.items.slice(offset, offset + count) };
}

function saveRun(outputDirectory, summary, name) {
    const { request_trace: trace, ...result } = summary;
    const base = path.join(outputDirectory, name);
    fs.writeFileSync(`${base}.json`, `${JSON.stringify(result, null, 2)}\n`);
    fs.writeFileSync(`${base}.jsonl`, `${trace.map(item => JSON.stringify(item)).join('\n')}\n`);
    return result;
}

function shouldStopAfter(row, previous) {
    if (row.fixture_exhausted) return 'fixture-exhausted';
    if (row.failed_after_drain > 0 || row.timeouts > 0 || row.offered_ops_per_second < row.target_ops_per_second * 0.9) {
        return 'error-timeout-or-under-offer';
    }
    if (previous && row.offered_ops_per_second > previous.offered_ops_per_second
        && row.completed_ops_per_second <= previous.completed_ops_per_second) {
        return 'throughput-flattened';
    }
    return '';
}

async function runSweepForScenario({ api, scenario, pathName, stamp, outputDirectory }) {
    const directory = path.join(outputDirectory, 'sweep', scenario.id, pathName);
    fs.mkdirSync(directory, { recursive: true });
    const summaryPath = path.join(directory, 'sweep.json');
    const previousReport = fs.existsSync(summaryPath) ? JSON.parse(fs.readFileSync(summaryPath, 'utf8')) : null;
    if (previousReport?.selection) return previousReport;

    const rates = catalog.protocol.load_sweep_ops_per_second;
    const tokens = new Map();
    let ledgerSession = null;
    const rows = previousReport?.rows || [];
    let stopReason = 'sweep-ceiling';
    const previousLast = rows.at(-1);
    if (previousLast && (previousLast.failed_after_drain > 0 || previousLast.timeouts > 0
        || previousLast.offered_ops_per_second < previousLast.target_ops_per_second * 0.9)) {
        stopReason = 'error-timeout-or-under-offer';
    } else if (previousLast?.fixture_exhausted) {
        stopReason = 'fixture-exhausted';
    }
    for (let index = 1; index < rows.length; index += 1) {
        if (shouldStopAfter(rows[index], rows[index - 1]) === 'throughput-flattened') {
            stopReason = index === rows.length - 1 ? 'flattened-with-one-higher-probe' : 'flattened-confirmed';
        }
    }
    try {
        for (const rate of rates) {
            if (stopReason === 'flattened-confirmed') break;
            if (stopReason === 'error-timeout-or-under-offer' || stopReason === 'fixture-exhausted') break;
            if (rows.some(row => row.target_ops_per_second === rate)) continue;
            const isHigherConfirmationProbe = stopReason === 'flattened-with-one-higher-probe';
            const count = rate * catalog.protocol.sweep_duration_seconds;
            const runName = `rate-${rate}`;
            const runPath = path.join(directory, `${runName}.json`);
            const markerPath = path.join(directory, `${runName}.in-progress`);
            if (fs.existsSync(markerPath) && !fs.existsSync(runPath)) {
                stopReason = 'interrupted-during-probe';
                break;
            }
            if (fs.existsSync(runPath)) {
                const prior = JSON.parse(fs.readFileSync(runPath, 'utf8'));
                rows.push(prior);
                continue;
            }
            const fixtureDoc = await prepareFixturePool({
                api,
                catalogScenario: scenario,
                count,
                stamp,
                outputPath: path.join(outputDirectory, 'fixtures', 'sweep', scenario.id, `${pathName}-rate-${rate}.json`),
                phase: 'sweep',
                pathName,
            });
            const fixtures = fixtureDoc[pathName];
            if (pathName === 'ledger' && !ledgerSession) {
                ledgerSession = createLedgerSession({
                    identities: Object.fromEntries(api.identities.map(identity => [identity.username, identity])),
                    identityNames: fixtures.items.map(item => item.identity),
                });
            }
            fs.writeFileSync(markerPath, 'started\n');
            const summary = pathName === 'api'
                ? await runHTTPWindow({
                    baseURL: api.baseURL,
                    users: api.namedUsers,
                    tokenCache: tokens,
                    fixtures,
                    scenario: scenario.id,
                    rate,
                    durationSeconds: catalog.protocol.sweep_duration_seconds,
                })
                : await ledgerSession.runWindow({
                    fixtures,
                    scenario: scenario.id,
                    rate,
                    durationSeconds: catalog.protocol.sweep_duration_seconds,
                });
            const row = saveRun(directory, summary, runName);
            fs.rmSync(markerPath, { force: true });
            rows.push(row);
            fs.writeFileSync(summaryPath, `${JSON.stringify({ scenario: scenario.id, path: pathName, rows, stop_reason: stopReason }, null, 2)}\n`);

            const stop = shouldStopAfter(row, rows.at(-2));
            if (stopReason === 'interrupted-during-probe') break;
            if (stop === 'fixture-exhausted') {
                stopReason = stop;
                break;
            }
            if (stop === 'error-timeout-or-under-offer') {
                stopReason = stop;
                break;
            }
            if (isHigherConfirmationProbe) {
                stopReason = 'flattened-confirmed';
                break;
            }
            if (stop === 'throughput-flattened') stopReason = 'flattened-with-one-higher-probe';
        }
    } finally {
        ledgerSession?.close();
    }

    let selection;
    try {
            selection = selectLoads(rows);
        selection.classification = 'pass';
    } catch (error) {
        selection = { classification: 'inconclusive', selected: [], reason: error.message, tested_rates: rows.map(row => row.target_ops_per_second) };
    }
    if (stopReason === 'interrupted-during-probe') selection = { classification: 'inconclusive', selected: [], reason: stopReason, tested_rates: rows.map(row => row.target_ops_per_second) };
    const report = { scenario: scenario.id, path: pathName, stop_reason: stopReason, rows, selection };
    fs.writeFileSync(summaryPath, `${JSON.stringify(report, null, 2)}\n`);
    return report;
}

async function runSweep({ api, stamp, outputDirectory }) {
    const reports = [];
    for (const scenario of catalog.performance_scenarios) {
        for (const pathName of ['api', 'ledger']) {
            reports.push(await runSweepForScenario({ api, scenario, pathName, stamp, outputDirectory }));
        }
    }
    const report = {
        schema_version: 1,
        worker_count: 1,
        measurement_seconds_per_probe: catalog.protocol.sweep_duration_seconds,
        sweep_rates: catalog.protocol.load_sweep_ops_per_second,
        scenarios: reports,
    };
    fs.writeFileSync(path.join(outputDirectory, 'sweep.json'), `${JSON.stringify(report, null, 2)}\n`);
    return report;
}

async function runPrimaryForScenario({ api, scenario, pathName, stamp, outputDirectory, timing }) {
    const sweepPath = path.join(outputDirectory, 'sweep', scenario.id, pathName, 'sweep.json');
    const sweep = JSON.parse(fs.readFileSync(sweepPath, 'utf8'));
    if (sweep.selection.classification !== 'pass' || sweep.selection.selected.length !== 3) {
        return { scenario: scenario.id, path: pathName, classification: 'inconclusive', reason: 'fewer than three usable sweep rates', runs: [] };
    }
    const rates = sweep.selection.selected;
    const warmup = timing.decision.classification === 'pass'
        ? timing.decision.selected.warmup_seconds : catalog.protocol.timing_reference.warmup_seconds;
    const measurement = timing.decision.classification === 'pass'
        ? timing.decision.selected.measurement_seconds : catalog.protocol.timing_reference.measurement_seconds;
    const repetitions = catalog.protocol.primary_repetitions;
    const total = rates.reduce((sum, rate) => sum + rate * (warmup + measurement) * repetitions, 0);
    const fixturePath = path.join(outputDirectory, 'fixtures', 'primary', scenario.id, `${pathName}.json`);
    const fixtureDoc = await prepareFixturePool({
        api,
        catalogScenario: scenario,
        count: Math.max(1, total),
        stamp,
        outputPath: fixturePath,
        phase: 'primary',
        pathName,
    });
    const pool = fixtureDoc[pathName];
    const directory = path.join(outputDirectory, 'primary', scenario.id, pathName);
    fs.mkdirSync(directory, { recursive: true });
    const tokens = new Map();
    const ledgerSession = pathName === 'ledger'
        ? createLedgerSession({
            identities: Object.fromEntries(api.identities.map(identity => [identity.username, identity])),
            identityNames: pool.items.map(item => item.identity),
        }) : null;
    const runs = [];
    let offset = 0;
    let interrupted = false;
    try {
        for (const rate of rates) {
            for (let repetition = 1; repetition <= repetitions; repetition += 1) {
                const base = `${rate}-rep${repetition}`;
                if (warmup > 0) {
                    const count = rate * warmup;
                    const fixtureSlice = windowFixtures(pool, offset, count);
                    const warmupPath = path.join(directory, `${base}-warmup.json`);
                    const warmupMarker = path.join(directory, `${base}-warmup.in-progress`);
                    if (fs.existsSync(warmupMarker) && !fs.existsSync(warmupPath)) { interrupted = true; break; }
                    if (fs.existsSync(warmupPath)) {
                        runs.push(JSON.parse(fs.readFileSync(warmupPath, 'utf8')));
                    } else {
                        fs.writeFileSync(warmupMarker, 'started\n');
                        const summary = pathName === 'api'
                            ? await runHTTPWindow({ baseURL: api.baseURL, users: api.namedUsers, tokenCache: tokens, fixtures: fixtureSlice, scenario: scenario.id, rate, durationSeconds: warmup })
                            : await ledgerSession.runWindow({ fixtures: fixtureSlice, scenario: scenario.id, rate, durationSeconds: warmup });
                        const result = saveRun(directory, { ...summary, phase: 'warmup', repetition, rate }, `${base}-warmup`);
                        fs.rmSync(warmupMarker, { force: true });
                        runs.push(result);
                    }
                    if (!pool.reuse) offset += count;
                }
                if (interrupted) break;
                const count = rate * measurement;
                const fixtureSlice = windowFixtures(pool, offset, count);
                const measurementPath = path.join(directory, `${base}-measurement.json`);
                const measurementMarker = path.join(directory, `${base}-measurement.in-progress`);
                if (fs.existsSync(measurementMarker) && !fs.existsSync(measurementPath)) { interrupted = true; break; }
                if (fs.existsSync(measurementPath)) {
                    runs.push(JSON.parse(fs.readFileSync(measurementPath, 'utf8')));
                } else {
                    fs.writeFileSync(measurementMarker, 'started\n');
                    const summary = pathName === 'api'
                        ? await runHTTPWindow({ baseURL: api.baseURL, users: api.namedUsers, tokenCache: tokens, fixtures: fixtureSlice, scenario: scenario.id, rate, durationSeconds: measurement })
                        : await ledgerSession.runWindow({ fixtures: fixtureSlice, scenario: scenario.id, rate, durationSeconds: measurement });
                    const result = saveRun(directory, { ...summary, phase: 'measurement', repetition, rate }, `${base}-measurement`);
                    fs.rmSync(measurementMarker, { force: true });
                    runs.push(result);
                }
                if (!pool.reuse) offset += count;
                fs.writeFileSync(path.join(directory, 'progress.json'), `${JSON.stringify({ rate, repetition, completed_runs: runs.length, expected_runs: rates.length * repetitions }, null, 2)}\n`);
            }
            if (interrupted) break;
        }
    } finally {
        ledgerSession?.close();
    }
    return { scenario: scenario.id, path: pathName, classification: interrupted ? 'inconclusive' : 'descriptive', ...(interrupted ? { reason: 'interrupted inside a measurement window; retain the attempt and use a new stamp' } : {}), rates, warmup_seconds: warmup, measurement_seconds: measurement, repetitions, runs };
}

async function runPrimary({ api, stamp, outputDirectory, timing }) {
    const reports = [];
    for (const scenario of catalog.performance_scenarios) {
        for (const pathName of ['api', 'ledger']) {
            const scenarioDirectory = path.join(outputDirectory, 'primary', scenario.id, pathName);
            if (fs.existsSync(path.join(scenarioDirectory, 'summary.json'))) {
                reports.push(JSON.parse(fs.readFileSync(path.join(scenarioDirectory, 'summary.json'), 'utf8')));
                continue;
            }
            const report = await runPrimaryForScenario({ api, scenario, pathName, stamp, outputDirectory, timing });
            fs.mkdirSync(scenarioDirectory, { recursive: true });
            fs.writeFileSync(path.join(scenarioDirectory, 'summary.json'), `${JSON.stringify(report, null, 2)}\n`);
            reports.push(report);
        }
    }
    const report = { schema_version: 1, worker_count: 1, scenarios: reports };
    fs.writeFileSync(path.join(outputDirectory, 'primary.json'), `${JSON.stringify(report, null, 2)}\n`);
    return report;
}

module.exports = { runPrimary, runSweep, runSweepForScenario };
