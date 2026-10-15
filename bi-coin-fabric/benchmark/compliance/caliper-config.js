'use strict';

const fs = require('node:fs');
const path = require('node:path');

const WORKLOAD_MODULE = 'benchmark/compliance/caliper-workload.js';

function writeFabricNetworkConfig({ outputDirectory, identities, channel, chaincodes }) {
    const byMsp = new Map();
    for (const identity of identities) {
        if (!identity.username || !identity.msp_id || !identity.peer_endpoint || !identity.gateway_peer
            || !identity.cert_path || !identity.key_path || !identity.tls_cert_path) {
            throw new Error(`incomplete Caliper signer mapping for ${identity.username || 'unknown identity'}`);
        }
        const list = byMsp.get(identity.msp_id) || [];
        list.push(identity);
        byMsp.set(identity.msp_id, list);
    }
    if (byMsp.size !== 4) throw new Error(`expected four study MSPs, got ${byMsp.size}`);

    const profileDirectory = path.join(outputDirectory, 'connection-profiles');
    fs.mkdirSync(profileDirectory, { recursive: true });
    const organizations = [];
    const profileOrganizations = {};
    const peers = {};
    for (const [mspid, members] of byMsp) {
        const identity = members[0];
        const peerName = identity.gateway_peer.replace(/:\d+$/, '');
        profileOrganizations[mspid] = { mspid, peers: [peerName] };
        peers[peerName] = {
            url: `grpcs://${identity.peer_endpoint}`,
            tlsCACerts: { path: identity.tls_cert_path },
            grpcOptions: {
                'ssl-target-name-override': peerName,
                hostnameOverride: peerName,
            },
        };
    }
    for (const [mspid, members] of byMsp) {
        const profilePath = path.join(profileDirectory, `${mspid}.json`);
        const profile = {
            name: `study-${mspid}`,
            version: '1.0.0',
            client: { organization: mspid },
            organizations: profileOrganizations,
            peers,
        };
        fs.writeFileSync(profilePath, `${JSON.stringify(profile, null, 2)}\n`);
        organizations.push({
            mspid,
            identities: {
                certificates: members.map(member => ({
                    name: member.username,
                    clientPrivateKey: { path: member.key_path },
                    clientSignedCert: { path: member.cert_path },
                })),
            },
            connectionProfile: { path: profilePath },
        });
    }

    const networkPath = path.join(outputDirectory, 'caliper-network.json');
    const network = {
        name: 'Retail Rupiah Compliance Study',
        version: '2.0.0',
        caliper: { blockchain: 'fabric' },
        channels: [{ channelName: channel, contracts: chaincodes.map(id => ({ id })) }],
        organizations,
    };
    fs.writeFileSync(networkPath, `${JSON.stringify(network, null, 2)}\n`);
    const identityMapPath = path.join(outputDirectory, 'identity-map.json');
    fs.writeFileSync(identityMapPath, `${JSON.stringify(identities.map(({ username, msp_id }) => ({ username, msp_id })), null, 2)}\n`);
    return { networkPath, identityMapPath };
}

function buildBenchmarkConfig({ name, rounds, traceDirectory }) {
    if (!Array.isArray(rounds) || rounds.length === 0) throw new Error('Caliper config requires at least one round');
    return {
        test: {
            name,
            workers: { type: 'local', number: 1 },
            rounds: rounds.map(round => ({
                label: round.label,
                ...(round.txNumber ? { txNumber: round.txNumber } : { txDuration: round.durationSeconds }),
                rateControl: { type: 'fixed-rate', opts: { tps: round.rate } },
                workload: {
                    module: WORKLOAD_MODULE,
                    arguments: round.arguments,
                },
            })),
        },
        observer: { type: 'local', interval: 1 },
        monitors: {
            transaction: [{ module: './benchmark/observers/jsonl-transaction-observer.js', options: { traceDir: traceDirectory } }],
        },
    };
}

function writeBenchmarkConfig(outputPath, options) {
    const config = buildBenchmarkConfig(options);
    fs.mkdirSync(path.dirname(outputPath), { recursive: true });
    fs.writeFileSync(outputPath, `${JSON.stringify(config, null, 2)}\n`);
    return outputPath;
}

module.exports = { buildBenchmarkConfig, writeBenchmarkConfig, writeFabricNetworkConfig };
