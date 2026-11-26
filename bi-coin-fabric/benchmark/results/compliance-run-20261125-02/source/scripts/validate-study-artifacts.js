'use strict';

const fs = require('node:fs');
const path = require('node:path');
const zlib = require('node:zlib');
const { summarizeRun } = require('./analyze-benchmark-results');

function readLines(file) {
    const data = fs.readFileSync(file);
    const text = file.endsWith('.gz') ? zlib.gunzipSync(data).toString('utf8') : data.toString('utf8');
    return text.split(/\r?\n/).filter(Boolean);
}

function validateStudy(resultDirectory) {
    const summaryPath = path.join(resultDirectory, 'summary.json');
    if (!fs.existsSync(summaryPath)) throw new Error(`missing ${summaryPath}`);
    const summary = JSON.parse(fs.readFileSync(summaryPath, 'utf8'));
    const errors = [];
    for (const run of summary.runs || []) {
        if (run.exitStatus !== undefined && Number(run.exitStatus) !== 0) errors.push(`${run.scenarioId}: unsuccessful benchmark process`);
        try {
            const rows = summarizeRun(run, resultDirectory);
            if (rows.length !== 1 || rows[0].submitted === 0) throw new Error('missing measured transactions');
            for (const field of ['submitted', 'successful', 'failed', 'timed_out']) {
                if (rows[0][field] !== run[field]) throw new Error(`${field} differs from raw transaction evidence`);
            }
        } catch (error) {
            errors.push(`${run.scenarioId} repetition ${run.repetition}: ${error.message}`);
        }
        const total = run.successful + run.failed + run.timed_out;
        if (run.submitted !== total) errors.push(`${run.scenarioId} repetition ${run.repetition}: completion counts do not reconcile`);
        if (run.missing < 0) errors.push(`${run.scenarioId} repetition ${run.repetition}: negative missing count`);
        if (run.phase !== 'pilot' && (!run.traceFiles || run.traceFiles.length === 0)) {
            errors.push(`${run.scenarioId} repetition ${run.repetition}: missing transaction trace`);
        }
        for (const artifact of ['configFile', 'reportFile', 'logFile']) {
            if (run.phase !== 'pilot' && (!run[artifact] || !fs.existsSync(path.join(resultDirectory, run[artifact])))) {
                errors.push(`${run.scenarioId} repetition ${run.repetition}: missing ${artifact}`);
            }
        }
        if (run.phase !== 'pilot' && (!run.metricsFile || !fs.existsSync(path.join(resultDirectory, run.metricsFile)))) {
            errors.push(`${run.scenarioId} repetition ${run.repetition}: missing Prometheus trace`);
        }
        if (run.phase !== 'pilot' && run.metricsFile) {
            const metricsPath = path.join(resultDirectory, run.metricsFile);
            if (fs.existsSync(metricsPath)) {
                const lines = readLines(metricsPath);
                if (lines.length === 0) errors.push(`${run.scenarioId} repetition ${run.repetition}: empty Prometheus trace`);
                let hasSamples = false;
                for (const line of lines) {
                    try {
                        const event = JSON.parse(line);
                        if (event.response?.data?.result?.some(sample => Number.isFinite(Number(sample.value?.[1])))) hasSamples = true;
                        if (event.error || event.httpStatus !== 200 || event.response?.status !== 'success') {
                            errors.push(`${run.scenarioId} repetition ${run.repetition}: Prometheus query failed`);
                            break;
                        }
                    } catch {
                        errors.push(`${run.scenarioId} repetition ${run.repetition}: invalid Prometheus trace line`);
                        break;
                    }
                }
                if (!hasSamples) errors.push(`${run.scenarioId} repetition ${run.repetition}: no Prometheus samples`);
            }
        }
    }

    const primaryGroups = new Map();
    for (const run of summary.runs || []) {
        if (!['primary', 'calibration'].includes(run.phase)) continue;
        const key = `${run.phase}|${run.scenarioId}|${run.targetTps}|${run.workerCount}`;
        if (!primaryGroups.has(key)) primaryGroups.set(key, []);
        primaryGroups.get(key).push(Number(run.repetition));
    }
    for (const [key, repetitions] of primaryGroups) {
        if (repetitions.length !== 5 || ![1, 2, 3, 4, 5].every(value => repetitions.includes(value))) {
            errors.push(`${key}: expected distinct repetitions 1 through 5, found ${repetitions.join(',')}`);
        }
    }
    if (errors.length) throw new Error(errors.join('\n'));
    return { runs: (summary.runs || []).length, scenarios: (summary.scenarios || []).length, valid: true };
}

if (require.main === module) {
    const resultDirectory = process.argv[2];
    if (!resultDirectory) {
        console.error('usage: node scripts/validate-study-artifacts.js <result-directory>');
        process.exit(2);
    }
    try { console.log(JSON.stringify(validateStudy(resultDirectory))); }
    catch (error) { console.error(error.message); process.exit(1); }
}

module.exports = { validateStudy };
