'use strict';

const assert = require('node:assert/strict');
const test = require('node:test');

const { selectScenarios } = require('./capacity-runner');

const scenarios = [{ id: 'create-pending' }, { id: 'read-balance' }, { id: 'read-receipt' }, { id: 'fund-reserve' }];
const allIDs = ['create-pending', 'read-balance', 'read-receipt', 'fund-reserve'];

test('selects every scenario when no filter is given', () => {
    assert.deepEqual(selectScenarios(scenarios, undefined).map(item => item.id), allIDs);
    assert.deepEqual(selectScenarios(scenarios, '').map(item => item.id), allIDs);
});

test('keeps catalog order and selects only the named scenarios', () => {
    assert.deepEqual(selectScenarios(scenarios, 'fund-reserve, read-balance').map(item => item.id), ['read-balance', 'fund-reserve']);
});

test('rejects unknown scenario names instead of silently running fewer workloads', () => {
    assert.throws(() => selectScenarios(scenarios, 'read-balnce'), /unknown scenario/);
});
