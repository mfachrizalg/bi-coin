'use strict';

const assert = require('node:assert/strict');
const test = require('node:test');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');

const { JsonlTransactionObserver, marshalResult } = require('./jsonl-transaction-observer');
const ConfigUtil = require('@hyperledger/caliper-core/lib/common/config/config-util');

test('transaction observer serializes Caliper status and Map custom data', () => {
    const result = {
        Marshal: () => ({
            id: 'tx-1',
            status: 'success',
            time_create: 100,
            time_final: 250,
            custom_data: new Map([['request_type', 'transaction']]),
        }),
    };
    assert.deepEqual(marshalResult(result), {
        id: 'tx-1',
        status: 'success',
        time_create: 100,
        time_final: 250,
        custom_data: { request_type: 'transaction' },
    });
});

test('one attempt retains its rounds but a new observer cannot append another attempt', async () => {
    const directory = fs.mkdtempSync(path.join(os.tmpdir(), 'bi-coin-observer-'));
    const config = path.join(directory, 'benchconfig.yaml');
    fs.writeFileSync(config, '{}\n');
    ConfigUtil.set(ConfigUtil.keys.Workspace, directory);
    ConfigUtil.set(ConfigUtil.keys.BenchConfig, config);
    const first = new JsonlTransactionObserver({ traceDir: directory }, null, 0);
    try {
        await first.activate(0, 'warmup');
        first.txSubmitted(1);
        await first.deactivate();
        await first.activate(1, 'measured');
        first.txSubmitted(1);
        await first.deactivate();
        const second = new JsonlTransactionObserver({ traceDir: directory }, null, 0);
        await assert.rejects(second.activate(0, 'warmup'), /EEXIST/);
        const lines = fs.readFileSync(path.join(directory, 'transactions-worker-0.jsonl'), 'utf8').trim().split('\n').map(JSON.parse);
        assert.deepEqual(lines.map(event => event.roundLabel), ['warmup', 'measured']);
    } finally {
        if (first.stream) await new Promise(resolve => first.stream.end(resolve));
        fs.rmSync(directory, { recursive: true, force: true });
    }
});
