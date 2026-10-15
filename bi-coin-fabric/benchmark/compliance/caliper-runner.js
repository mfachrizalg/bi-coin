'use strict';

const crypto = require('node:crypto');
const fs = require('node:fs');
const path = require('node:path');
const { spawn, spawnSync } = require('node:child_process');
const { writeBenchmarkConfig } = require('./caliper-config');
const { summarizeResourceWindow } = require('./resource-analysis');

async function runCaliperRounds({ projectRoot, resultDirectory, networkConfigPath, identityMapPath, scenario, phase, rounds, sampleResources = true }) {
    const runId = `${Date.now().toString(36)}-${crypto.randomBytes(3).toString('hex')}`;
    const runDirectory = path.join(resultDirectory, 'caliper', scenario.id, phase, runId);
    const traceDirectory = path.join(runDirectory, 'caliper-trace');
    const eventsDirectory = path.join(runDirectory, 'events');
    fs.mkdirSync(eventsDirectory, { recursive: true });

    const configuredRounds = rounds.map(round => {
        const eventsPath = path.join(eventsDirectory, `${round.label}.jsonl`);
        return {
            ...round,
            arguments: {
                operationId: scenario.id,
                channel: 'rupiah-study',
                fixturePath: path.resolve(round.fixturePath),
                identityMapPath: path.resolve(identityMapPath),
                eventsPath,
                roundLabel: round.label,
                durationSeconds: round.durationSeconds,
                timeoutSeconds: 30,
            },
        };
    });
    const configPath = path.join(runDirectory, 'benchconfig.json');
    writeBenchmarkConfig(configPath, {
        name: `Compliance ${scenario.id} ${phase}`,
        traceDirectory,
        rounds: configuredRounds,
    });

    const resourcePath = path.join(runDirectory, 'resource.jsonl');
    const stopSampler = sampleResources ? startResourceSampler(resourcePath, projectRoot) : async () => {};
    const startedAt = Date.now();
    const logPath = path.join(runDirectory, 'caliper.log');
    const logFD = fs.openSync(logPath, 'w');
    let commandResult;
    try {
        commandResult = spawnSync(path.join(projectRoot, 'node_modules/.bin/caliper'), [
            'launch', 'manager',
            '--caliper-benchconfig', configPath,
            '--caliper-networkconfig', path.resolve(networkConfigPath),
            '--caliper-workspace', projectRoot,
        ], {
            cwd: projectRoot,
            env: { ...process.env },
            encoding: 'utf8',
            stdio: ['ignore', logFD, logFD],
        });
    } finally {
        fs.closeSync(logFD);
        await stopSampler();
    }

    const resourceRecords = sampleResources ? readJsonLines(resourcePath) : [];
    const traceEvents = readJsonLines(path.join(traceDirectory, 'transactions-worker-0.jsonl'));
    const runReport = {
        run_id: runId,
        phase,
        started_at: new Date(startedAt).toISOString(),
        completed_at: new Date().toISOString(),
        exit_status: commandResult?.status ?? null,
        signal: commandResult?.signal ?? null,
        error: commandResult?.error?.message ?? null,
        log_file: path.relative(resultDirectory, logPath),
        config_file: path.relative(resultDirectory, configPath),
        network_config_file: path.relative(resultDirectory, networkConfigPath),
        rounds: [],
    };

    for (const round of configuredRounds) {
        const eventsPath = round.arguments.eventsPath;
        const events = readJsonLines(eventsPath);
        const caliperTrace = summarizeCaliperTrace(traceEvents, round.label, events);
        const starts = events.map(event => event.started_at_ms).filter(Number.isFinite);
        const windowStart = starts.length ? Math.min(...starts) : null;
        const windowEnd = Number.isFinite(windowStart) && Number.isFinite(round.durationSeconds)
            ? windowStart + round.durationSeconds * 1000
            : null;
        const resourceWindow = sampleResources && Number.isFinite(windowStart) && Number.isFinite(windowEnd)
            ? summarizeResourceWindow(resourceRecords, { start: windowStart, end: windowEnd, expected_interval_ms: 1000 })
            : { complete: !sampleResources, sample_count: 0, components: {} };
        const output = {
            label: round.label,
            target_rate: round.rate,
            duration_seconds: round.durationSeconds ?? null,
            tx_number: round.txNumber ?? null,
            fixture_file: path.relative(resultDirectory, round.arguments.fixturePath),
            event_file: path.relative(resultDirectory, eventsPath),
            event_count: events.length,
            caliper_trace: caliperTrace,
            window_start_ms: windowStart,
            window_end_ms: windowEnd,
            resource: resourceWindow,
        };
        fs.writeFileSync(path.join(runDirectory, `${round.label}.json`), `${JSON.stringify(output, null, 2)}\n`);
        runReport.rounds.push(output);
    }

    const reportPath = path.join(projectRoot, 'report.html');
    try {
        const stat = fs.statSync(reportPath);
        if (stat.mtimeMs >= startedAt) {
            const target = path.join(runDirectory, 'report.html');
            fs.copyFileSync(reportPath, target);
            runReport.report_file = path.relative(resultDirectory, target);
        }
    } catch {
        // Caliper's HTML report is optional when launch fails before result generation.
    }
    fs.writeFileSync(path.join(runDirectory, 'run.json'), `${JSON.stringify(runReport, null, 2)}\n`);
    return { ...runReport, runDirectory, resourceRecords, rounds: configuredRounds.map((round, index) => ({ ...runReport.rounds[index], events: readJsonLines(round.arguments.eventsPath) })) };
}

function startResourceSampler(outputPath, projectRoot) {
    const child = spawn(process.execPath, [path.join(__dirname, 'resource-sampler.js')], {
        cwd: projectRoot,
        env: {
            ...process.env,
            COMPLIANCE_RESOURCE_OUTPUT: outputPath,
            COMPLIANCE_RESOURCE_INTERVAL_MS: '1000',
            COMPLIANCE_RUNNER_PID: String(process.pid),
        },
        stdio: 'ignore',
    });
    return () => new Promise((resolve, reject) => {
        if (child.exitCode !== null) return resolve();
        child.once('error', reject);
        child.once('exit', () => resolve());
        child.kill('SIGTERM');
    });
}

function summarizeCaliperTrace(traceEvents, roundLabel, clientEvents) {
    const roundEvents = traceEvents.filter(event => event.roundLabel === roundLabel);
    const submittedCount = roundEvents.filter(event => event.event === 'submitted')
        .reduce((sum, event) => sum + Number(event.count || 0), 0);
    const finished = roundEvents.filter(event => event.event === 'finished').map(event => event.result || {});
    const byId = new Map(clientEvents.filter(event => event.transaction_id).map(event => [event.transaction_id, event]));
    const idsMatch = finished.length === clientEvents.length
        && finished.every(result => result.id && byId.has(result.id))
        && byId.size === finished.length;
    const statusesMatch = idsMatch && finished.every(result => (
        String(result.status || '').toLowerCase() === String(byId.get(result.id).status || '').toLowerCase()
    ));
    return {
        submitted_count: submittedCount,
        finished_count: finished.length,
        client_event_count: clientEvents.length,
        ids_match: idsMatch,
        statuses_match: statusesMatch,
        consistent: submittedCount === clientEvents.length && idsMatch && statusesMatch,
        failures: finished.filter(result => String(result.status || '').toLowerCase() !== 'success').map(result => ({
            transaction_id: result.id || null,
            status: result.status || 'unresolved',
            diagnostic: [result.error, result.message, ...(result.error_messages || [])].filter(Boolean).join(' | '),
        })),
    };
}

function readJsonLines(file) {
    if (!fs.existsSync(file)) return [];
    const rows = [];
    for (const line of fs.readFileSync(file, 'utf8').split(/\r?\n/)) {
        if (!line) continue;
        try {
            rows.push(JSON.parse(line));
        } catch {
            rows.push({ status: 'unresolved', diagnostic: 'malformed JSONL event' });
        }
    }
    return rows;
}

module.exports = { readJsonLines, runCaliperRounds, startResourceSampler, summarizeCaliperTrace };
