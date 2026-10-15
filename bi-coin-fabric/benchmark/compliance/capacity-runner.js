'use strict';

const fs = require('node:fs');
const path = require('node:path');
const catalog = require('./case-catalog.json');
const { createSearch, nextProbeRate, recordProbe } = require('./capacity-search');
const { classifyFailure } = require('./failure-classifier');
const { evaluateWindow } = require('./outcome-analysis');
const { prepareFixturePool } = require('./prepare-fixtures');
const { runCaliperRounds, readJsonLines } = require('./caliper-runner');

async function runCapacityStudy({ projectRoot, resultDirectory, stamp, fixtureIds, startAPI, networkConfigPath, identityMapPath, preflightOnly = false }) {
    const startedAt = Date.now();
    const preflightPath = path.join(resultDirectory, 'preflight.json');
    const capacityPath = path.join(resultDirectory, 'capacity.json');
    const progressPath = path.join(resultDirectory, 'progress.json');
    const preflight = readJSON(preflightPath, { schema_version: 1, workloads: [] });
    const report = readJSON(capacityPath, {
        schema_version: 1,
        worker_count: 1,
        performance_method_count: catalog.protocol.performance_method_count,
        performance_workload_count: catalog.protocol.performance_workload_count,
        protocol: catalog.protocol,
        workloads: [],
    });
    preflight.workloads ||= [];
    report.workloads ||= [];

    function checkpoint(phase, scenario, rate, fixtureProgress) {
        const state = {
            stamp,
            phase,
            workload: scenario?.id || null,
            current_rate_ops_per_second: rate ?? null,
            fixture_prepared: fixtureProgress?.prepared ?? null,
            fixture_requested: fixtureProgress?.requested ?? null,
            elapsed_seconds: Math.round((Date.now() - startedAt) / 1000),
            updated_at: new Date().toISOString(),
        };
        fs.writeFileSync(progressPath, `${JSON.stringify(state, null, 2)}\n`);
        console.log(`CHECKPOINT ${JSON.stringify(state)}`);
    }

    async function prepare(scenario, phase, rate, durationSeconds, repetition = 1) {
        const count = scenario.operation_kind === 'query'
            ? 1
            : Math.max(1, Math.ceil(rate * durationSeconds * 1.05) + 1);
        const fixturePath = path.join(resultDirectory, 'fixtures', scenario.id, phase, `rate-${rate}-rep-${repetition}.json`);
        const api = await startAPI(projectRoot, resultDirectory, stamp);
        api.fixtureIds = fixtureIds;
        try {
            await prepareFixturePool({
                api,
                catalogScenario: scenario,
                count,
                stamp,
                outputPath: fixturePath,
                phase,
                pathName: 'caliper',
                onProgress: value => checkpoint('fixture-preparation', scenario, rate, value),
            });
        } finally {
            await api.close();
        }
        return fixturePath;
    }

    async function execute(scenario, phase, rate, durationSeconds, repetition = 1, preflightRound = false) {
        const fixturePath = await prepare(scenario, phase, rate, durationSeconds || 1, repetition);
        const roundLabel = preflightRound
            ? `preflight-${scenario.id}`
            : `${phase}-${scenario.id}-${rate}-rep-${repetition}`;
        checkpoint(preflightRound ? 'preflight' : phase, scenario, rate);
        const run = await runCaliperRounds({
            projectRoot,
            resultDirectory,
            networkConfigPath,
            identityMapPath,
            scenario,
            phase,
            sampleResources: !preflightRound,
            rounds: [{
                label: roundLabel,
                rate,
                durationSeconds,
                txNumber: preflightRound ? 1 : undefined,
                fixturePath,
            }],
        });
        const round = run.rounds[0];
        return { run, round, fixturePath, roundLabel };
    }

    function storePreflight(result) {
        preflight.workloads = preflight.workloads.filter(item => item.id !== result.id);
        preflight.workloads.push(result);
        fs.writeFileSync(preflightPath, `${JSON.stringify(preflight, null, 2)}\n`);
    }

    for (const scenario of catalog.performance_scenarios) {
        if (preflight.workloads.some(item => item.id === scenario.id)) continue;
        let result;
        try {
            const { run, round, fixturePath, roundLabel } = await execute(scenario, 'preflight', 1, null, 1, true);
            const event = round.events[0];
            let classification = event?.status === 'success' && event.verified && round.caliper_trace?.consistent
                ? 'pass'
                : event?.failure_class || 'inconclusive';
            if (!round.events.length) classification = classifyFailure(run.error || runDiagnostic(run));
            result = {
                id: scenario.id,
                chaincode: scenario.chaincode,
                transaction: scenario.transaction,
                classification,
                fixture_file: path.relative(resultDirectory, fixturePath),
                round_label: roundLabel,
                event_count: round.event_count,
                caliper_exit_status: run.exit_status,
                diagnostic: event?.diagnostic || runDiagnostic(run),
                transaction_id: event?.transaction_id || null,
            };
        } catch (error) {
            result = {
                id: scenario.id,
                chaincode: scenario.chaincode,
                transaction: scenario.transaction,
                classification: classifyFailure(error),
                diagnostic: error.message,
            };
        }
        storePreflight(result);
        checkpoint('preflight', scenario, null);
    }

    report.preflight_complete = catalog.performance_scenarios.every(scenario => preflight.workloads.some(item => item.id === scenario.id));
    report.preflight_passed = preflight.workloads.filter(item => item.classification === 'pass').length;
    report.preflight_failed = preflight.workloads.filter(item => item.classification !== 'pass').length;
    if (preflightOnly) {
        saveReport();
        return report;
    }

    const preflightByID = new Map(preflight.workloads.map(item => [item.id, item]));
    for (const scenario of catalog.performance_scenarios) {
        let workload = report.workloads.find(item => item.id === scenario.id);
        if (workload?.search?.complete || workload?.confirmation?.classification === 'pass'
            || workload?.confirmation?.classification === 'unstable-boundary') continue;
        if (!workload) {
            const hint = catalog.protocol.search_hints_ops_per_second[scenario.id]
                || catalog.protocol.initial_rate_ops_per_second;
            workload = {
                id: scenario.id,
                chaincode: scenario.chaincode,
                transaction: scenario.transaction,
                operation_kind: scenario.operation_kind,
                family: scenario.family,
                search_hint_ops_per_second: hint,
                preflight: preflightByID.get(scenario.id) || { classification: 'inconclusive' },
                search: { probes: [], complete: false },
                confirmation: null,
            };
            report.workloads.push(workload);
        }

        const preflightResult = preflightByID.get(scenario.id);
        workload.preflight = preflightResult || workload.preflight;
        if (preflightResult?.classification !== 'pass') {
            workload.search = { ...workload.search, complete: true, classification: preflightResult?.classification || 'inconclusive', reason: 'preflight did not verify a successful transaction' };
            saveReport();
            checkpoint('diagnosis-required', scenario, null);
            continue;
        }

        const search = restoreSearch(workload.search, workload.search_hint_ops_per_second);
        while (true) {
            const rate = nextProbeRate(search);
            if (rate === null) break;
            const prior = search.probes.find(item => item.rate === rate);
            if (prior) {
                search.stop_reason = 'repeated-search-rate';
                break;
            }
            let probe;
            try {
                const { run, round, fixturePath, roundLabel } = await execute(scenario, 'probe', rate, catalog.protocol.probe_duration_seconds);
                probe = classifyRound({ scenario, rate, durationSeconds: catalog.protocol.probe_duration_seconds, run, round });
                probe.fixture_file = path.relative(resultDirectory, fixturePath);
                probe.round_label = roundLabel;
            } catch (error) {
                probe = { rate, classification: classifyFailure(error), diagnostic: error.message };
            }
            recordProbe(search, probe);
            workload.search = snapshotSearch(search);
            saveProbe(resultDirectory, scenario.id, probe);
            saveReport();
            checkpoint('binary-search', scenario, rate);
            if (search.stop_reason) break;
        }

        if (!search.stop_reason && search.passing_rate !== null && search.failing_rate !== null
            && (search.failing_rate - search.passing_rate) / search.passing_rate <= catalog.protocol.boundary_tolerance_percent / 100) {
            search.boundary = 'bracketed';
        }
        workload.search = snapshotSearch(search);
        if (search.stop_reason || search.passing_rate === null) {
            workload.search.complete = true;
            workload.search.classification = search.stop_reason || 'no-passing-rate';
            workload.confirmation = null;
            saveReport();
            checkpoint('diagnosis-required', scenario, null);
            continue;
        }

        let confirmation;
        let candidate = search.passing_rate;
        while (candidate !== null) {
            try {
                confirmation = await confirmCandidate({
                    scenario,
                    candidate,
                    resultDirectory,
                    protocol: catalog.protocol,
                    projectRoot,
                    stamp,
                    fixtureIds,
                    startAPI,
                    networkConfigPath,
                    identityMapPath,
                    checkpoint,
                });
            } catch (error) {
                confirmation = { candidate_rate_ops_per_second: candidate, classification: classifyFailure(error), diagnostic: error.message, rounds: [] };
            }
            workload.confirmation = confirmation;
            saveReport();
            checkpoint('confirmation', scenario, candidate);
            if (['pass', 'unstable-boundary', 'inconclusive', 'configuration-error', 'fixture-error'].includes(confirmation.classification)) break;

            search.failing_rate = Math.min(search.failing_rate ?? candidate, candidate);
            const lowerPass = search.probes.filter(item => item.classification === 'pass' && item.rate < candidate)
                .reduce((max, item) => Math.max(max, item.rate), null);
            search.passing_rate = lowerPass;
            search.bounds = { passing: search.passing_rate, failing: search.failing_rate };
            search.boundary = null;
            while (search.passing_rate === null || search.failing_rate === null
                || (search.failing_rate - search.passing_rate) / search.passing_rate > catalog.protocol.boundary_tolerance_percent / 100) {
                const rate = nextProbeRate(search);
                if (rate === null) break;
                let probe;
                try {
                    const { run, round, fixturePath, roundLabel } = await execute(scenario, 'probe', rate, catalog.protocol.probe_duration_seconds);
                    probe = classifyRound({ scenario, rate, durationSeconds: catalog.protocol.probe_duration_seconds, run, round });
                    probe.fixture_file = path.relative(resultDirectory, fixturePath);
                    probe.round_label = roundLabel;
                } catch (error) {
                    probe = { rate, classification: classifyFailure(error), diagnostic: error.message };
                }
                recordProbe(search, probe);
                workload.search = snapshotSearch(search);
                saveProbe(resultDirectory, scenario.id, probe);
                saveReport();
                checkpoint('binary-search-after-confirmation-failure', scenario, rate);
                if (search.stop_reason) break;
            }
            if (search.stop_reason || search.passing_rate === null) candidate = null;
            else candidate = search.passing_rate;
        }

        workload.search = snapshotSearch(search);
        workload.search.complete = true;
        if (confirmation?.classification === 'pass') {
            workload.highest_confirmed_passing_rate_ops_per_second = candidate;
            workload.first_failing_rate_ops_per_second = search.failing_rate;
            workload.remaining_interval_ops_per_second = search.failing_rate === null ? null : search.failing_rate - candidate;
            workload.capacity_boundary = search.failing_rate === null ? 'at-least-ceiling' : 'bracketed';
        } else if (confirmation?.classification === 'unstable-boundary') {
            workload.capacity_boundary = 'unstable';
        } else if (confirmation?.classification === 'inconclusive' || confirmation?.classification === 'configuration-error' || confirmation?.classification === 'fixture-error') {
            workload.capacity_boundary = confirmation.classification;
        } else if (candidate === null) {
            workload.capacity_boundary = search.boundary || 'no-passing-rate';
        }
        saveReport();
        checkpoint('workload-complete', scenario, candidate);
    }

    report.completed_at = new Date().toISOString();
    report.elapsed_seconds = Math.round((Date.now() - startedAt) / 1000);
    saveReport();
    return report;

    function saveReport() {
        report.updated_at = new Date().toISOString();
        fs.writeFileSync(capacityPath, `${JSON.stringify(report, null, 2)}\n`);
    }
}

async function confirmCandidate({ scenario, candidate, resultDirectory, protocol, projectRoot, stamp, fixtureIds, startAPI, networkConfigPath, identityMapPath, checkpoint }) {
    const preparation = [];
    const api = await startAPI(projectRoot, resultDirectory, stamp);
    api.fixtureIds = fixtureIds;
    try {
        for (let repetition = 1; repetition <= protocol.confirmation_repetitions; repetition += 1) {
            const count = scenario.operation_kind === 'query'
                ? 1
                : Math.ceil(candidate * protocol.confirmation_duration_seconds * 1.05) + 1;
            const fixturePath = path.join(resultDirectory, 'fixtures', scenario.id, 'confirmation', `rate-${candidate}-rep-${repetition}.json`);
            await prepareFixturePool({
                api,
                catalogScenario: scenario,
                count,
                stamp,
                outputPath: fixturePath,
                phase: 'confirmation',
                pathName: 'caliper',
                onProgress: value => checkpoint('fixture-preparation', scenario, candidate, value),
            });
            preparation.push({ label: `confirm-${repetition}`, rate: candidate, durationSeconds: protocol.confirmation_duration_seconds, fixturePath });
        }
    } finally {
        await api.close();
    }

    checkpoint('confirmation', scenario, candidate, { prepared: preparation.length, requested: preparation.length });
    const run = await runCaliperRounds({
        projectRoot,
        resultDirectory,
        networkConfigPath,
        identityMapPath,
        scenario,
        phase: 'confirmation',
        rounds: preparation,
    });
    const measurements = run.rounds.map(round => ({
        ...classifyRound({
            scenario,
            rate: candidate,
            durationSeconds: protocol.confirmation_duration_seconds,
            run,
            round,
        }),
        round_label: round.label,
    }));
    const classifications = new Set(measurements.map(item => item.classification));
    const classification = classifications.size > 1
        ? 'unstable-boundary'
        : (classifications.has('pass') ? 'pass' : classifications.has('fail') ? 'fail' : measurements[0]?.classification || 'inconclusive');
    return {
        candidate_rate_ops_per_second: candidate,
        repetitions: measurements.length,
        duration_seconds_each: protocol.confirmation_duration_seconds,
        classification,
        rounds: measurements,
        run_directory: path.relative(resultDirectory, run.runDirectory),
    };
}

function classifyRound({ scenario, rate, durationSeconds, run, round }) {
    const events = round.events || [];
    if (!events.length) {
        return {
            rate,
            classification: classifyFailure(run.error || runDiagnostic(run)),
            diagnostic: runDiagnostic(run),
            caliper_exit_status: run.exit_status,
            resource: round.resource,
            caliper_trace: round.caliper_trace,
        };
    }
    const failureClasses = new Set(events.filter(event => event.failure_class).map(event => event.failure_class));
    const blockedClass = ['configuration-error', 'fixture-error'].find(value => failureClasses.has(value));
    if (blockedClass) {
        return {
            ...evaluateWindow({
                rate,
                duration_seconds: durationSeconds,
                operation_kind: scenario.operation_kind,
                events,
                window_start_ms: round.window_start_ms,
                resource_complete: round.resource?.complete === true,
                trace_complete: round.caliper_trace?.consistent === true,
            }),
            rate,
            classification: blockedClass,
            resource: round.resource,
            caliper_trace: round.caliper_trace,
            caliper_exit_status: run.exit_status,
            diagnostic: events.find(event => event.failure_class === blockedClass)?.diagnostic || runDiagnostic(run),
        };
    }
    const outcome = evaluateWindow({
            rate,
            duration_seconds: durationSeconds,
            operation_kind: scenario.operation_kind,
            events,
            window_start_ms: round.window_start_ms,
            resource_complete: round.resource?.complete === true,
            trace_complete: round.caliper_trace?.consistent === true,
        });
    if (run.error || (run.exit_status !== 0 && outcome.failed_count === 0 && outcome.timeout_count === 0)) {
        outcome.classification = 'configuration-error';
    }
    return {
        ...outcome,
        rate,
        resource: round.resource,
        caliper_trace: round.caliper_trace,
        caliper_exit_status: run.exit_status,
        diagnostic: runDiagnostic(run),
    };
}

function restoreSearch(saved, hint) {
    const search = createSearch({ hint });
    for (const probe of saved?.probes || []) recordProbe(search, probe);
    return search;
}

function snapshotSearch(search) {
    return {
        hint_ops_per_second: search.hint,
        passing_rate_ops_per_second: search.passing_rate,
        failing_rate_ops_per_second: search.failing_rate,
        remaining_interval_ops_per_second: search.passing_rate !== null && search.failing_rate !== null
            ? search.failing_rate - search.passing_rate
            : null,
        boundary: search.boundary,
        stop_reason: search.stop_reason,
        probes: search.probes,
        complete: false,
    };
}

function saveProbe(resultDirectory, scenarioId, probe) {
    const directory = path.join(resultDirectory, 'capacity', scenarioId, 'probes');
    fs.mkdirSync(directory, { recursive: true });
    fs.writeFileSync(path.join(directory, `rate-${probe.rate}.json`), `${JSON.stringify(probe, null, 2)}\n`);
}

function runDiagnostic(run) {
    if (run.error) return run.error;
    try {
        const tail = fs.readFileSync(path.join(run.runDirectory, 'caliper.log'), 'utf8').split(/\r?\n/);
        return tail.filter(line => /error|fail|timeout|validation|endorsement/i.test(line)).slice(-12).join('\n');
    } catch {
        return '';
    }
}

function readJSON(file, fallback) {
    try {
        return JSON.parse(fs.readFileSync(file, 'utf8'));
    } catch {
        return fallback;
    }
}

module.exports = { runCapacityStudy, classifyRound, restoreSearch, snapshotSearch };
