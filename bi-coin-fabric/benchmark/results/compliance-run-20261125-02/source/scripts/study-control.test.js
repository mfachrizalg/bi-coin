'use strict';

const assert = require('node:assert/strict');
const { execFileSync } = require('node:child_process');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const test = require('node:test');

test('primary rates fall back to the highest tested rate when no pilot load passes', () => {
    const directory = fs.mkdtempSync(path.join(os.tmpdir(), 'bi-coin-study-control-'));
    const summaryPath = path.join(directory, 'summary.json');
    fs.writeFileSync(summaryPath, JSON.stringify({ runs: [
        { phase: 'scenario-pilot', operation: 'issuance', contention: 'low', targetTps: 5, success_rate: 0.1, p95_s: 0.2, missing: 0 },
        { phase: 'scenario-pilot', operation: 'issuance', contention: 'low', targetTps: 10, success_rate: 0.1, p95_s: 0.2, missing: 0 },
    ] }));

    try {
        const output = execFileSync(process.execPath, [
            path.join(__dirname, 'study-control.js'), 'primary-rates', summaryPath, 'issuance', 'low',
        ], { encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'] });
        assert.equal(output.trim(), '5,8,9,10,15');
    } finally {
        fs.rmSync(directory, { recursive: true, force: true });
    }
});
