'use strict';

const fs = require('node:fs');
const path = require('node:path');

function option(name, fallback) {
    const index = process.argv.indexOf(name);
    return index >= 0 ? process.argv[index + 1] : fallback;
}

const url = option('--url', process.env.PROMETHEUS_URL || 'http://127.0.0.1:9090');
const output = option('--output');
const intervalMs = Number(option('--interval-ms', 1000));
const queryTimeoutMs = Number(option('--query-timeout-ms', 5000));
const durationSeconds = Number(option('--duration-seconds', 0));
const queryFile = option('--queries', path.join(__dirname, '../benchmark/monitoring/queries.json'));

if (!output) throw new Error('usage: node scripts/sample-prometheus.js --output <file> [--duration-seconds N]');

const queries = JSON.parse(fs.readFileSync(queryFile, 'utf8'));
fs.mkdirSync(path.dirname(output), { recursive: true });
const stream = fs.createWriteStream(output, { flags: 'a' });
let stopping = false;
process.on('SIGINT', () => { stopping = true; });
process.on('SIGTERM', () => { stopping = true; });

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function query(item) {
    const sampledAt = new Date().toISOString();
    try {
        const response = await fetch(`${url}/api/v1/query?query=${encodeURIComponent(item.query)}`, {
            signal: AbortSignal.timeout(Math.max(1000, queryTimeoutMs)),
        });
        const body = await response.text();
        let parsed;
        try { parsed = JSON.parse(body); } catch { parsed = { raw: body }; }
        stream.write(`${JSON.stringify({ sampledAt, ...item, httpStatus: response.status, response: parsed })}\n`);
    } catch (error) {
        stream.write(`${JSON.stringify({ sampledAt, ...item, error: String(error) })}\n`);
    }
}

async function main() {
    const deadline = durationSeconds > 0 ? Date.now() + durationSeconds * 1000 : Infinity;
    do {
        for (const item of queries) await query(item);
        if (stopping || Date.now() >= deadline) break;
        await sleep(intervalMs);
    } while (!stopping);
    await new Promise((resolve, reject) => stream.end(error => (error ? reject(error) : resolve())));
}

main().catch(error => {
    stream.destroy();
    console.error(error.message);
    process.exitCode = 1;
});
