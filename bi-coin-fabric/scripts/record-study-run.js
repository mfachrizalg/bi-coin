'use strict';

const fs = require('node:fs');
const path = require('node:path');

function option(name, fallback) {
    const index = process.argv.indexOf(`--${name}`);
    return index >= 0 ? process.argv[index + 1] : fallback;
}

const metadataPath = process.argv[2];
const action = process.argv[3];
if (!metadataPath || !action) throw new Error('usage: node scripts/record-study-run.js <metadata.json> <init|append> [options]');

function writeMetadata(value) {
    const temporary = `${metadataPath}.tmp-${process.pid}`;
    fs.writeFileSync(temporary, `${JSON.stringify(value, null, 2)}\n`);
    fs.renameSync(temporary, metadataPath);
}

if (action === 'init') {
    writeMetadata({
        schemaVersion: 1,
        study: option('study', 'Digital Rupiah statistical benchmark'),
        durationSeconds: Number(option('duration', 120)),
        runs: [],
    });
    process.exit(0);
}

if (action !== 'append') throw new Error(`unknown action: ${action}`);
const runDirectory = option('run-dir');
if (!runDirectory) throw new Error('--run-dir is required');
const metadataDirectory = path.dirname(path.resolve(metadataPath));
const absoluteRunDirectory = path.resolve(runDirectory);
const relative = file => path.relative(metadataDirectory, path.join(absoluteRunDirectory, file));
const metricsName = ['prometheus.jsonl', 'prometheus.jsonl.gz']
    .find(file => fs.existsSync(path.join(absoluteRunDirectory, file)));
const traceFiles = fs.existsSync(absoluteRunDirectory)
    ? fs.readdirSync(absoluteRunDirectory).filter(file => /^transactions-worker-\d+\.jsonl$/.test(file)).map(relative)
    : [];
const metadata = JSON.parse(fs.readFileSync(metadataPath, 'utf8'));
const run = {
    scenarioId: option('scenario-id'),
    transactionFamily: option('family'),
    operation: option('operation'),
    contention: option('contention', 'low'),
    phase: option('phase', 'primary'),
    repetition: Number(option('repetition', 1)),
    targetTps: Number(option('target-tps', 0)),
    durationSeconds: Number(option('duration', metadata.durationSeconds || 120)),
    workerCount: Number(option('workers', 4)),
    measuredRound: option('measured-round'),
    runDirectory: path.relative(metadataDirectory, absoluteRunDirectory),
    traceFiles,
    metricsFile: metricsName ? relative(metricsName) : null,
    configFile: fs.existsSync(path.join(absoluteRunDirectory, 'benchconfig.yaml'))
        ? relative('benchconfig.yaml') : null,
    reportFile: fs.existsSync(path.join(absoluteRunDirectory, 'report.html'))
        ? relative('report.html') : null,
    logFile: fs.existsSync(path.join(absoluteRunDirectory, 'caliper.log'))
        ? relative('caliper.log') : null,
    exitStatus: Number(option('exit-status', 1)),
    recordedAt: new Date().toISOString(),
};

const runKey = `${run.scenarioId}|${run.phase}|${run.repetition}|${run.targetTps}|${run.workerCount}`;
metadata.runs = (metadata.runs || []).filter(candidate => (
    `${candidate.scenarioId}|${candidate.phase}|${candidate.repetition}|${candidate.targetTps}|${candidate.workerCount}` !== runKey
));
metadata.runs.push(run);
metadata.runs.sort((left, right) => String(left.scenarioId).localeCompare(String(right.scenarioId))
    || Number(left.targetTps) - Number(right.targetTps)
    || Number(left.repetition) - Number(right.repetition));
writeMetadata(metadata);
console.log(JSON.stringify(run));
