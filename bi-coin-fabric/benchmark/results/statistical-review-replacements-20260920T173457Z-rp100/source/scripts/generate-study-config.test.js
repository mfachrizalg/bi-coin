'use strict';

const assert = require('node:assert/strict');
const { spawnSync } = require('node:child_process');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const test = require('node:test');

test('controlled high-contention loads retain financial headroom and record their amount', () => {
    const directory = fs.mkdtempSync(path.join(os.tmpdir(), 'bi-coin-config-'));
    try {
        const output = path.join(directory, 'config.yaml');
        const args = [path.join(__dirname, 'generate-study-config.js'), '--output', output,
            '--workers', '1', '--target-tps', '190', '--duration', '120', '--contention', 'high'];
        const invalid = spawnSync(process.execPath, args, { encoding: 'utf8' });
        assert.notEqual(invalid.status, 0);
        assert.match(invalid.stderr, /daily budget/);
        assert.equal(fs.existsSync(output), false);
        const valid = spawnSync(process.execPath, [...args, '--operation-amount', '100'], { encoding: 'utf8' });
        assert.equal(valid.status, 0, valid.stderr);
        const yaml = fs.readFileSync(output, 'utf8');
        assert.equal((yaml.match(/operationAmount: 100\n/g) || []).length, 2);
        assert.match(yaml, /transactionBudget: 22801/);
    } finally {
        fs.rmSync(directory, { recursive: true, force: true });
    }
});
