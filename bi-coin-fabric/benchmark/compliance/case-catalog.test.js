'use strict';

const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const test = require('node:test');
const { LEDGER_SCENARIO_IDS } = require('../../scripts/study-smoke-test');

const catalog = JSON.parse(fs.readFileSync(path.join(__dirname, 'case-catalog.json'), 'utf8'));
const roles = catalog.application_roles;

test('catalog covers every public study transaction and route role cell', () => {
    const methods = catalog.contract_methods;
    const methodKeys = methods.map(item => `${item.chaincode}.${item.method}`);
    assert.equal(methods.length, 32);
    assert.equal(new Set(methodKeys).size, methodKeys.length, 'contract method duplicated');
    assert.ok(methods.every(item => item.cases.length > 0), 'method has no correctness cases');

    assert.equal(catalog.api_routes.length, 23);
    const routeKeys = catalog.api_routes.map(item => `${item.method} ${item.path}`);
    assert.equal(new Set(routeKeys).size, routeKeys.length, 'API route duplicated');
    assert.equal(catalog.api_routes.reduce((count, route) => count + route.roles.length, 0), 42);
    assert.equal(catalog.api_routes.length * roles.length, 207);

    const sourceRoot = path.resolve(__dirname, '../../study/chaincode');
    const files = {
        'rupiah-controls': ['controls', 'ControlsContract'],
        'rupiah-monetary': ['monetary', 'MonetaryContract'],
        'rupiah-payments': ['payments', 'PaymentsContract'],
    };
    for (const [chaincode, [directory, contract]] of Object.entries(files)) {
        const source = fs.readFileSync(path.join(sourceRoot, directory, `${directory}.go`), 'utf8');
        const actual = [...source.matchAll(new RegExp(`func \\(c \\*${contract}\\) ([A-Z][A-Za-z0-9]*)\\(`, 'g'))]
            .map(match => match[1]).sort();
        const expected = methods.filter(item => item.chaincode === chaincode).map(item => item.method).sort();
        assert.deepEqual(expected, actual, `${chaincode} catalog must match exported contract methods`);
    }

    const handlerSource = fs.readFileSync(path.resolve(__dirname, '../../backend/handlers/study_handlers.go'), 'utf8');
    const actualRoutes = [...handlerSource.matchAll(/HandleFunc\("([^"]+)",\s*h\.\w+\)\.Methods\("(GET|POST|PUT|DELETE)"\)/g)]
        .map(match => `${match[2]} ${match[1]}`).sort();
    const expectedRoutes = catalog.api_routes.map(route => `${route.method} ${route.path}`).sort();
    assert.deepEqual(expectedRoutes, actualRoutes, 'API catalog must match registered study routes');
});

test('performance catalog covers all 30 public performance methods in 31 workloads', () => {
    assert.equal(catalog.performance_scenarios.length, 31);
    assert.equal(catalog.protocol.performance_workload_count, 31);
    assert.equal(catalog.protocol.performance_method_count, 30);
    const publicMethods = new Set(catalog.contract_methods.map(item => `${item.chaincode}.${item.method}`));
    for (const scenario of catalog.performance_scenarios) {
        assert.ok(publicMethods.has(`${scenario.chaincode}.${scenario.transaction}`), scenario.id);
        assert.ok(scenario.fixture_profile, `${scenario.id} has no fixture profile`);
        assert.ok(scenario.actor, `${scenario.id} has no signer`);
        assert.ok(['query', 'write'].includes(scenario.operation_kind), `${scenario.id} has no operation kind`);
    }
    const performanceMethods = new Set(catalog.performance_scenarios.map(item => `${item.chaincode}.${item.transaction}`));
    const excluded = new Set(['rupiah-monetary.Initialize', 'rupiah-monetary.DebitReserveForFunding']);
    assert.equal(performanceMethods.size, 30);
    for (const method of catalog.contract_methods.map(item => `${item.chaincode}.${item.method}`)) {
        assert.equal(performanceMethods.has(method), !excluded.has(method), method);
    }
    assert.equal(catalog.performance_scenarios.filter(item => item.transaction === 'Transfer').length, 2);
});

test('protocol uses bounded binary search and three grouped confirmations', () => {
    assert.equal(catalog.protocol.worker_count, 1);
    assert.equal(catalog.protocol.measurement_mode, 'binary-search-and-confirmation');
    assert.equal(catalog.protocol.minimum_rate_ops_per_second, 0.1);
    assert.equal(catalog.protocol.maximum_rate_ops_per_second, 4096);
    assert.equal(catalog.protocol.initial_rate_ops_per_second, 32);
    assert.equal(catalog.protocol.unbounded_rate_expansion_factor, 4);
    assert.equal(catalog.protocol.probe_duration_seconds, 10);
    assert.equal(catalog.protocol.boundary_tolerance_percent, 10);
    assert.equal(catalog.protocol.confirmation_repetitions, 3);
    assert.equal(catalog.protocol.confirmation_duration_seconds, 30);
    assert.equal(catalog.protocol.resource_sample_interval_ms, 1000);
    assert.deepEqual(catalog.protocol.search_hints_ops_per_second, {
        'create-pending': 64,
        'record-review': 32,
        'approve-standard': 32,
        'decide-high-risk': 32,
        'open-wallet': 128,
        'freeze-subject': 32,
        'request-unfreeze': 32,
        'approve-unfreeze': 32,
        mint: 32,
        'allocate-reserve': 32,
        'redeem-reserve': 32,
        'fund-reserve': 32,
    });
});

test('each functional correctness scenario has one executable runner', () => {
    const scenarios = catalog.correctness_scenarios;
    assert.ok(scenarios.length > 0);
    assert.equal(new Set(scenarios.map(item => item.id)).size, scenarios.length);
    assert.ok(scenarios.every(item => item.assertion), 'scenario has no assertion description');
    assert.ok(scenarios.every(item => ['ledger-smoke', 'api-access-matrix'].includes(item.executor)));
    assert.ok(scenarios.some(item => item.id === 'conversion-failure-atomicity'));
    assert.ok(scenarios.some(item => item.id === 'api-route-authorization-matrix'));
    assert.ok(scenarios.some(item => item.id === 'api-request-validation-matrix'));
    assert.deepEqual(
        [...LEDGER_SCENARIO_IDS].sort(),
        scenarios.filter(item => item.executor === 'ledger-smoke').map(item => item.id).sort(),
    );
});
