'use strict';

const crypto = require('node:crypto');
const fs = require('node:fs');
const path = require('node:path');
const grpc = require('@grpc/grpc-js');
const { connect, hash, signers } = require('@hyperledger/fabric-gateway');
const { runFixedWindow } = require('./load-common');

function openIdentity(identity) {
    const tlsRootCert = fs.readFileSync(identity.tls_cert_path);
    const tlsServerName = identity.gateway_peer.replace(/:\d+$/, '');
    const client = new grpc.Client(identity.peer_endpoint, grpc.credentials.createSsl(tlsRootCert), {
        'grpc.ssl_target_name_override': tlsServerName,
    });
    const gateway = connect({
        client,
        identity: { mspId: identity.msp_id, credentials: fs.readFileSync(identity.cert_path) },
        signer: signers.newPrivateKeySigner(crypto.createPrivateKey(fs.readFileSync(identity.key_path))),
        hash: hash.sha256,
    });
    return { client, gateway };
}

function withTimeout(operation, timeoutMs) {
    let timer;
    const pending = Promise.resolve(operation);
    pending.catch(() => {});
    return Promise.race([
        pending,
        new Promise((_, reject) => {
            timer = setTimeout(() => {
                const error = new Error('Fabric Gateway operation timed out');
                error.name = 'TimeoutError';
                reject(error);
            }, timeoutMs);
        }),
    ]).finally(() => clearTimeout(timer));
}

function createLedgerSession({ identities, identityNames, channel = 'bi-coin', timeoutMs = 30000 }) {
    const connections = new Map();
    for (const name of new Set(identityNames)) {
        const identity = identities[name];
        if (!identity) throw new Error(`fixture references missing Fabric identity ${name}`);
        connections.set(name, openIdentity(identity));
    }
    const contracts = new Map();
    return {
        async runWindow({ fixtures, scenario, rate, durationSeconds, timeoutMs: requestTimeout = timeoutMs }) {
            return runFixedWindow({
                scenario,
                path: 'ledger',
                rate,
                durationSeconds,
                fixtures,
                execute: async fixture => {
                    const connectionKey = `${fixture.identity}:${fixture.chaincode}`;
                    let contract = contracts.get(connectionKey);
                    if (!contract) {
                        const { gateway } = connections.get(fixture.identity);
                        contract = gateway.getNetwork(channel).getContract(fixture.chaincode);
                        contracts.set(connectionKey, contract);
                    }
                    if (fixture.read_only) {
                        await withTimeout(contract.evaluateTransaction(fixture.transaction, ...fixture.args.map(String)), requestTimeout);
                    } else {
                        await withTimeout(contract.submitTransaction(fixture.transaction, ...fixture.args.map(String)), requestTimeout);
                    }
                    return { ok: true, status: 'success' };
                },
            });
        },
        close() {
            for (const { gateway, client } of connections.values()) {
                gateway.close();
                client.close();
            }
        },
    };
}

async function runLedgerWindow(options) {
    const session = options.session || createLedgerSession({
        identities: options.identities,
        identityNames: options.fixtures.items.map(item => item.identity),
        channel: options.channel,
        timeoutMs: options.timeoutMs,
    });
    try {
        return await session.runWindow(options);
    } finally {
        if (!options.session) session.close();
    }
}

async function main() {
    const fixturePath = process.env.COMPLIANCE_FIXTURES_FILE;
    const scenario = process.env.COMPLIANCE_SCENARIO;
    const outputPath = process.env.COMPLIANCE_RUN_OUTPUT;
    const identityPath = process.env.COMPLIANCE_IDENTITIES_FILE;
    const tracePath = process.env.COMPLIANCE_TRACE_OUTPUT;
    if (!fixturePath || !scenario || !outputPath || !identityPath) {
        throw new Error('set COMPLIANCE_FIXTURES_FILE, COMPLIANCE_SCENARIO, COMPLIANCE_RUN_OUTPUT, and COMPLIANCE_IDENTITIES_FILE');
    }
    const fixtureDocument = JSON.parse(fs.readFileSync(path.resolve(fixturePath), 'utf8'));
    const fixtures = fixtureDocument.ledger[scenario];
    if (!fixtures) throw new Error(`no direct-ledger fixtures for ${scenario}`);
    const result = await runLedgerWindow({
        identities: JSON.parse(fs.readFileSync(path.resolve(identityPath), 'utf8')),
        fixtures,
        scenario,
        rate: Number(process.env.COMPLIANCE_RATE),
        durationSeconds: Number(process.env.COMPLIANCE_DURATION_SECONDS),
    });
    const { request_trace: trace, ...summary } = result;
    fs.mkdirSync(path.dirname(path.resolve(outputPath)), { recursive: true });
    fs.writeFileSync(path.resolve(outputPath), `${JSON.stringify(summary, null, 2)}\n`);
    if (tracePath) fs.writeFileSync(path.resolve(tracePath), `${trace.map(record => JSON.stringify(record)).join('\n')}\n`);
    console.log(JSON.stringify({ scenario: summary.scenario, path: summary.path, offered: summary.offered, completed: summary.completed_in_window, failed: summary.failed_after_drain, fixture_exhausted: summary.fixture_exhausted }));
}

if (require.main === module) {
    main().catch(error => { console.error(error.message); process.exitCode = 1; });
}

module.exports = { createLedgerSession, runLedgerWindow };
