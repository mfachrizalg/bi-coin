'use strict';

const assert = require('node:assert/strict');
const test = require('node:test');

const { marshalResult } = require('./jsonl-transaction-observer');

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
