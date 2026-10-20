'use strict';

const crypto = require('node:crypto');
const fs = require('node:fs');
const path = require('node:path');
const { spawnSync } = require('node:child_process');
const { startAPI } = require('./api-server');
const { runAccessMatrix } = require('./http-access-matrix');
const { prepareAccessMatrixFixtures } = require('./prepare-fixtures');
const { writeFabricNetworkConfig } = require('./caliper-config');
const { runCapacityStudy } = require('./capacity-runner');
const catalog = require('./case-catalog.json');

const projectRoot = path.resolve(__dirname, '../..');
const stamp = process.env.BENCHMARK_COMPLIANCE_STAMP;
const scenarioFilter = process.env.BENCHMARK_COMPLIANCE_SCENARIOS;
if (!/^[A-Za-z0-9][A-Za-z0-9_-]{0,63}$/.test(stamp || '')) throw new Error('benchmark stamp must be 1-64 safe characters');
if (projectRoot !== '/workspace' || fs.existsSync(path.join(projectRoot, '.git'))) {
    throw new Error('compliance benchmark and network resets are allowed only from the disposable /workspace copy');
}
const resultDirectory = path.join(projectRoot, 'benchmark/results', `compliance-${stamp}`);
const metadataPath = path.join(resultDirectory, 'metadata.json');

function run(program, args, name, options = {}) {
    const logPath = path.join(resultDirectory, `${name}.log`);
    const logFD = options.captureStdout ? null : fs.openSync(logPath, options.append ? 'a' : 'w');
    const result = spawnSync(program, args, {
        cwd: options.cwd || projectRoot,
        env: { ...process.env, ...(options.env || {}) },
        encoding: 'utf8',
        stdio: options.captureStdout ? ['ignore', 'pipe', 'pipe'] : ['ignore', logFD, logFD],
    });
    if (logFD !== null) fs.closeSync(logFD);
    if (options.captureStdout) fs.writeFileSync(logPath, `${result.stdout || ''}${result.stderr || ''}`);
    if ((result.error || result.status !== 0) && !options.allowFailure) throw new Error(`${name} failed; inspect ${logPath}`);
    return options.captureStdout && options.allowFailure
        ? result
        : (result.stdout || '');
}

function writeMetadata() {
    const protocolHash = crypto.createHash('sha256')
        .update(fs.readFileSync(path.join(__dirname, 'case-catalog.json')))
        .digest('hex');
    fs.writeFileSync(metadataPath, `${JSON.stringify({
        schema_version: 2,
        study: {
            name: 'retail-rupiah-compliance',
            stamp,
            channel: catalog.network.channel,
            msps: catalog.network.msps,
            chaincodes: catalog.network.chaincodes,
            protocol_sha256: protocolHash,
            performance_method_count: catalog.protocol.performance_method_count,
            performance_workload_count: catalog.protocol.performance_workload_count,
        },
        runs: [],
    }, null, 2)}\n`);
}

function ensureSourceSnapshot() {
    if (!fs.existsSync(path.join(resultDirectory, 'source'))) {
        run('bash', ['scripts/vendor-study-chaincodes.sh'], 'vendor-study-chaincodes');
    }
    run(process.execPath, ['scripts/write-study-manifest.js', resultDirectory, '--capture-source-only'], 'source-capture');
}

function finalizeManifest() {
    run(process.execPath, ['benchmark/compliance/write-report.js', resultDirectory], 'report');
    run(process.execPath, ['scripts/write-study-manifest.js', resultDirectory], 'manifest');
    fs.writeFileSync(path.join(resultDirectory, 'manifest-path.txt'), `${path.join(resultDirectory, 'manifest.json')}\n`);
}

function setupFreshNetwork() {
    run('bash', ['scripts/network-down.sh'], 'network-down', { env: { REMOVE_VOLUMES: 'true' } });
    for (const generatedPath of ['organizations', 'channel-artifacts', 'ca-client', 'packages']) {
        fs.rmSync(path.join(projectRoot, 'network', generatedPath), { recursive: true, force: true });
    }
    fs.rmSync(path.join(projectRoot, 'network/.env.study'), { force: true });
    run('bash', ['scripts/network-up.sh'], 'network-up');
    run('bash', ['scripts/deploy-chaincodes.sh'], 'deploy-chaincodes');
}

function resumeNetwork() {
    run('bash', ['scripts/network-up.sh'], 'network-resume', { append: true });
    run('bash', ['scripts/deploy-chaincodes.sh'], 'chaincode-resume', { append: true });
}

function runLedgerSmoke() {
    const result = run(process.execPath, ['scripts/smoke-test.js'], 'ledger-correctness', { captureStdout: true, allowFailure: true });
    try {
        const report = JSON.parse((result.stdout || '').trim());
        report.process_exit_status = result.status;
        fs.writeFileSync(path.join(resultDirectory, 'ledger-correctness.json'), `${JSON.stringify(report, null, 2)}\n`);
        return report;
    } catch (error) {
        throw new Error(`study smoke test did not return its JSON report: ${error.message}`);
    }
}

async function runAPIAccessMatrix(subjectID, fixtureIds, initializationReplayStateUnchanged) {
    const outputPath = path.join(resultDirectory, 'http-access-matrix.json');
    let api;
    try {
        api = await startAPI(projectRoot, resultDirectory, stamp);
        const apiFixtures = await prepareAccessMatrixFixtures(api, subjectID, stamp);
        apiFixtures.initializationReplayStateUnchanged = initializationReplayStateUnchanged === true;
        fs.writeFileSync(path.join(resultDirectory, 'api-access-fixtures.json'), `${JSON.stringify(apiFixtures, null, 2)}\n`);
        console.log(JSON.stringify({ phase: 'correctness-fixture-preparation', subjects: 4, staff: 1, completed: true }));
        return await runAccessMatrix({
            baseURL: api.baseURL,
            roleUsers: api.roleUsers,
            subjectID,
            fixtureIds,
            apiFixtures,
            outputPath,
        });
    } catch (error) {
        const unresolved = { schema_version: 2, cells: 0, passed: 0, unresolved: 1, action_cells: 0, action_passed: 0, action_violations: 0, action_unresolved: 1, results: [{ classification: 'unresolved', diagnostic: error.message }] };
        fs.writeFileSync(outputPath, `${JSON.stringify(unresolved, null, 2)}\n`);
        return unresolved;
    } finally {
        if (api) await api.close();
    }
}

async function correctness({ networkReady = false } = {}) {
    if (!fs.existsSync(resultDirectory)) throw new Error('study directory missing; use mode "new" first');
    const metadata = JSON.parse(fs.readFileSync(metadataPath, 'utf8'));
    ensureSourceSnapshot();
    if (!networkReady) resumeNetwork();
    const correctnessPath = path.join(resultDirectory, 'correctness.json');
    if (fs.existsSync(correctnessPath)) return JSON.parse(fs.readFileSync(correctnessPath, 'utf8'));

    const ledgerPath = path.join(resultDirectory, 'ledger-correctness.json');
    const ledger = fs.existsSync(ledgerPath) ? JSON.parse(fs.readFileSync(ledgerPath, 'utf8')) : runLedgerSmoke();
    if (!ledger.fixtures || !ledger.fixtures.retailSubject) throw new Error('ledger smoke report omitted fixture subject IDs');
    const api = await runAPIAccessMatrix(ledger.fixtures.retailSubject, ledger.fixtures, ledger.initialization_replay_state_unchanged);
    const ledgerCases = Array.isArray(ledger.case_results) ? ledger.case_results : [];
    const apiAuthorizationComplete = api.cells > 0 && api.cells === api.authorization_passed && (api.unresolved || 0) === 0;
    const apiValidationComplete = api.validation_cells > 0 && api.validation_cells === api.validation_passed && (api.validation_unresolved || 0) === 0;
    const apiActionOutcomesComplete = api.action_cells > 0 && api.action_cells === api.action_passed
        && (api.action_unresolved || 0) === 0 && (api.action_violations || 0) === 0;
    const apiScenarios = catalog.correctness_scenarios.filter(item => item.executor === 'api-access-matrix');
    const apiCases = apiScenarios.map(item => {
        const passed = item.id === 'api-route-authorization-matrix' ? apiAuthorizationComplete
            : item.id === 'api-request-validation-matrix' ? apiValidationComplete : apiActionOutcomesComplete;
        return {
            id: item.id,
            status: passed ? 'pass' : 'fail',
            evidence: {
                route_cells: api.cells,
                authorization_passed: api.authorization_passed,
                validation_cells: api.validation_cells,
                validation_passed: api.validation_passed,
                action_cells: api.action_cells,
                action_passed: api.action_passed,
                unresolved: api.unresolved || 0,
                results_file: 'http-access-matrix.json',
            },
        };
    });
    const allCases = [...ledgerCases, ...apiCases];
    const expectedCases = catalog.correctness_scenarios.map(item => item.id);
    const executed = new Set(allCases.filter(item => item.status === 'pass').map(item => item.id));
    const missingCases = expectedCases.filter(id => !executed.has(id));
    const complete = ledger.classification === 'pass' && ledger.process_exit_status === 0
        && expectedCases.length > 0 && missingCases.length === 0 && allCases.length === expectedCases.length;
    const report = {
        schema_version: 2,
        classification: complete ? 'pass' : 'incomplete',
        overall_conformance_claim_allowed: complete,
        contract_methods_catalogued: catalog.contract_methods.length,
        functional_scenario_count: expectedCases.length,
        functional_scenarios_executed: allCases.length,
        functional_cases_missing: missingCases,
        api_route_role_cells: api.cells,
        api_access_passed: api.authorization_passed,
        api_access_unresolved: api.unresolved || 0,
        api_validation_cells: api.validation_cells,
        api_validation_passed: api.validation_passed,
        api_validation_unresolved: api.validation_unresolved,
        api_action_cells: api.action_cells,
        api_action_passed: api.action_passed,
        api_action_violations: api.action_violations,
        api_action_unresolved: api.action_unresolved,
        api_access_results: api.results,
        ledger: {
            fixtures: ledger.fixtures,
            case_results: allCases,
            peers: ledger.peers,
            reserve: ledger.reserve,
            supply: {
                wholesale: ledger.wholesale_supply,
                retail: ledger.retail_supply,
                total: ledger.supply,
            },
            msp_authorization_denials: ledger.msp_authorization_denials,
            nested_debit_direct_denials: ledger.nested_debit_direct_denials,
            initialization_replay_state_unchanged: ledger.initialization_replay_state_unchanged,
            read_msp_matrix_cells: ledger.read_msp_matrix_cells,
            receipt_read_by_unrelated_end_user: ledger.receipt_read_by_unrelated_end_user,
            enduser_get_subject_denial: ledger.enduser_get_subject_denial,
            enduser_admin_get_subject_projection_error: ledger.enduser_admin_get_subject_projection_error,
        },
    };
    fs.writeFileSync(correctnessPath, `${JSON.stringify(report, null, 2)}\n`);
    metadata.runs = metadata.runs.filter(runRecord => runRecord.phase !== 'correctness');
    metadata.runs.push({ phase: 'correctness', completed_at: new Date().toISOString(), artifact: 'correctness.json' });
    fs.writeFileSync(metadataPath, `${JSON.stringify(metadata, null, 2)}\n`);
    return report;
}

async function buildCaliperNetwork(ledger) {
    const api = await startAPI(projectRoot, resultDirectory, stamp);
    api.fixtureIds = ledger.fixtures;
    try {
        return writeFabricNetworkConfig({
            outputDirectory: path.join(resultDirectory, 'caliper-network'),
            identities: api.identities,
            channel: catalog.network.channel,
            chaincodes: catalog.network.chaincodes,
        });
    } finally {
        await api.close();
    }
}

async function runCapacity({ preflightOnly = false } = {}) {
    const correctnessReport = JSON.parse(fs.readFileSync(path.join(resultDirectory, 'correctness.json'), 'utf8'));
    const network = fs.existsSync(path.join(resultDirectory, 'caliper-network/caliper-network.json'))
        ? {
            networkPath: path.join(resultDirectory, 'caliper-network/caliper-network.json'),
            identityMapPath: path.join(resultDirectory, 'caliper-network/identity-map.json'),
        }
        : await buildCaliperNetwork(correctnessReport.ledger);
    const report = await runCapacityStudy({
        projectRoot,
        resultDirectory,
        stamp,
        fixtureIds: correctnessReport.ledger.fixtures,
        startAPI,
        networkConfigPath: network.networkPath,
        identityMapPath: network.identityMapPath,
        preflightOnly,
        scenarioFilter,
    });
    return report;
}

function recordRun(phase, artifact) {
    const metadata = JSON.parse(fs.readFileSync(metadataPath, 'utf8'));
    metadata.runs = metadata.runs.filter(runRecord => runRecord.phase !== phase);
    metadata.runs.push({ phase, completed_at: new Date().toISOString(), artifact });
    fs.writeFileSync(metadataPath, `${JSON.stringify(metadata, null, 2)}\n`);
}

async function main() {
    const mode = process.argv[2] || 'new';
    if (!['new', 'resume', 'correctness', 'preflight', 'performance', 'all'].includes(mode)) {
        throw new Error('usage: run.js {new|resume|correctness|preflight|performance|all}');
    }

    const isNew = mode === 'new' || (mode === 'all' && !fs.existsSync(resultDirectory));
    if (isNew) {
        if (fs.existsSync(resultDirectory)) throw new Error(`result directory already exists: ${resultDirectory}; use resume with the same stamp`);
        fs.mkdirSync(resultDirectory, { recursive: true });
        writeMetadata();
        ensureSourceSnapshot();
        setupFreshNetwork();
    } else {
        if (!fs.existsSync(resultDirectory)) throw new Error(`no matching study at ${resultDirectory}; run mode "new" first`);
        ensureSourceSnapshot();
        resumeNetwork();
    }

    const correctnessReport = await correctness({ networkReady: true });
    finalizeManifest();
    if (mode === 'correctness') {
        console.log(JSON.stringify({ phase: 'correctness', resultDirectory, ...correctnessReport }));
        return;
    }

    const preflightOnly = mode === 'new' || mode === 'preflight';
    const capacity = await runCapacity({ preflightOnly });
    recordRun(preflightOnly ? 'preflight' : 'capacity', preflightOnly ? 'preflight.json' : 'capacity.json');
    finalizeManifest();
    console.log(JSON.stringify({
        phase: preflightOnly ? 'preflight' : 'capacity',
        resultDirectory,
        correctness: correctnessReport.classification,
        workloads: capacity.workloads.length,
        completeConformance: correctnessReport.overall_conformance_claim_allowed,
    }));
}

module.exports = { correctness, main, setupFreshNetwork };
