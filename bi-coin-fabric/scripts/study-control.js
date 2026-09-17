'use strict';

const fs = require('node:fs');

const summary = JSON.parse(fs.readFileSync(process.argv[3], 'utf8'));
const command = process.argv[2];

function passing(row) {
    return row.success_rate >= 0.99 && row.p95_s !== null && row.p95_s <= 2.5 && row.missing === 0;
}

function roundRate(value) {
    const step = value < 10 ? 1 : 5;
    return Math.max(1, Math.round(value / step) * step);
}

function pilotKnee() {
    const rows = summary.runs.filter(row => row.phase === 'pilot' && row.operation === 'retail-transfer' && row.contention === 'low');
    const passingRates = rows.filter(passing).map(row => Number(row.targetTps));
    if (!passingRates.length) throw new Error('pilot found no sustainable load');
    return Math.max(...passingRates);
}

function calibrationRates() {
    const knee = pilotKnee();
    console.log([...new Set([roundRate(knee * 0.75), roundRate(knee), roundRate(knee * 1.25)])].sort((a, b) => a - b).join(','));
}

function scenarioKnee(operation, contention) {
    const rows = summary.runs.filter(row => row.phase === 'scenario-pilot'
        && row.operation === operation && (row.contention || 'low') === contention);
    const passingRates = rows.filter(passing).map(row => Number(row.targetTps));
    if (!passingRates.length) throw new Error(`scenario pilot found no sustainable load: ${operation}/${contention}`);
    return Math.max(...passingRates);
}

function primaryRates() {
    const operation = process.argv[4];
    const contention = process.argv[5] || 'low';
    const knee = scenarioKnee(operation, contention);
    const rates = [0.5, 0.75, 0.9, 1, 1.1, 1.25].map(factor => roundRate(knee * factor));
    console.log([...new Set(rates)].sort((a, b) => a - b).join(','));
}

function selectedWorker() {
    const rows = summary.scenarios.filter(row => row.phase === 'calibration'
        && row.operation === 'retail-transfer'
        && row.contention === 'low' && row.repetitions === 5);
    if (![1, 2, 4, 8].every(worker => rows.some(row => Number(row.workerCount) === worker))) {
        throw new Error('worker calibration is incomplete: expected 1, 2, 4, and 8 workers');
    }
    const byWorker = new Map();
    for (const row of rows) {
        const worker = Number(row.workerCount);
        if (!byWorker.has(worker)) byWorker.set(worker, []);
        byWorker.get(worker).push(row);
    }
    const candidates = [...byWorker.entries()].map(([worker, values]) => ({
        worker,
        highest: Math.max(...values.filter(value => value.sustainable).map(value => Number(value.targetTps)), 0),
    }));
    const highest = Math.max(...candidates.map(value => value.highest), 0);
    if (!highest) throw new Error('worker calibration found no sustainable worker count');
    const selected = candidates.filter(value => value.highest === highest).sort((a, b) => a.worker - b.worker)[0];
    console.log(selected.worker);
}

if (command === 'pilot-knee') console.log(pilotKnee());
else if (command === 'calibration-rates') calibrationRates();
else if (command === 'primary-rates') primaryRates();
else if (command === 'selected-worker') selectedWorker();
else throw new Error('usage: node scripts/study-control.js <pilot-knee|calibration-rates|primary-rates|selected-worker> <summary.json> [operation] [contention]');
