'use strict';

const fs = require('node:fs');
const path = require('node:path');
const zlib = require('node:zlib');

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
                for (const line of lines) {
                    try {
                        const event = JSON.parse(line);
                        if (event.error || event.httpStatus !== 200 || event.response?.status !== 'success') {
                            errors.push(`${run.scenarioId} repetition ${run.repetition}: Prometheus query failed`);
                            break;
                        }
                    } catch {
                        errors.push(`${run.scenarioId} repetition ${run.repetition}: invalid Prometheus trace line`);
                        break;
                    }
                }
            }
        }
    }

    const primaryGroups = new Map();
    for (const run of summary.runs || []) {
        if (run.phase !== 'primary') continue;
        const key = `${run.scenarioId}|${run.targetTps}|${run.workerCount}`;
        primaryGroups.set(key, (primaryGroups.get(key) || 0) + 1);
    }
    for (const [key, count] of primaryGroups) if (count !== 5) errors.push(`${key}: expected 5 repetitions, found ${count}`);
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
