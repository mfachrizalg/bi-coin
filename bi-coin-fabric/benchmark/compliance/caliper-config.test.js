'use strict';

const assert = require('node:assert/strict');
const test = require('node:test');

const { buildBenchmarkConfig } = require('./caliper-config');

test('Caliper rounds use one worker, fixed-rate control, and no timed warmup round', () => {
    const config = buildBenchmarkConfig({
        name: 'transfer confirmation',
        traceDirectory: '/tmp/traces',
        rounds: [1, 2, 3].map(index => ({
            label: `confirm-${index}`,
            rate: 32,
            durationSeconds: 30,
            arguments: { operationId: 'transfer-retail' },
        })),
    });
    assert.equal(config.test.workers.number, 1);
    assert.equal(config.test.rounds.length, 3);
    assert.ok(config.test.rounds.every(round => round.txDuration === 30));
    assert.ok(config.test.rounds.every(round => round.rateControl.opts.tps === 32));
    assert.ok(config.test.rounds.every(round => !round.label.startsWith('warmup-')));
});

test('Fabric network configuration creates one certificate profile for each study MSP', () => {
    const fs = require('node:fs');
    const os = require('node:os');
    const path = require('node:path');
    const { writeFabricNetworkConfig } = require('./caliper-config');
    const directory = fs.mkdtempSync(path.join(os.tmpdir(), 'caliper-network-'));
    const identities = ['CentralBankMSP', 'DistributorMSP', 'ValidatorMSP', 'EndUserMSP'].map((msp_id, index) => ({
        username: `user-${index}`,
        msp_id,
        peer_endpoint: `127.0.0.1:${17051 + index * 1000}`,
        gateway_peer: `peer0.${msp_id}.study:7051`,
        cert_path: `/tmp/${msp_id}.crt`,
        key_path: `/tmp/${msp_id}.key`,
        tls_cert_path: `/tmp/${msp_id}-tls.crt`,
    }));
    try {
        const paths = writeFabricNetworkConfig({ outputDirectory: directory, identities, channel: 'bi-coin', chaincodes: ['rupiah-controls', 'rupiah-monetary', 'rupiah-payments'] });
        const network = JSON.parse(fs.readFileSync(paths.networkPath, 'utf8'));
        assert.equal(network.version, '2.0.0');
        assert.equal(network.organizations.length, 4);
        assert.equal(network.channels[0].contracts.length, 3);
        const profile = JSON.parse(fs.readFileSync(network.organizations[0].connectionProfile.path, 'utf8'));
        assert.equal(Object.keys(profile.peers).length, 4);
        assert.equal(JSON.parse(fs.readFileSync(paths.identityMapPath, 'utf8')).length, 4);
    } finally {
        fs.rmSync(directory, { recursive: true, force: true });
    }
});
