'use strict';

const assert = require('node:assert/strict');
const test = require('node:test');

const { mapSigner } = require('./signer-map');

test('maps each of the four study MSP identities without changing the signer', () => {
    const identities = [
        { username: 'central-admin', msp_id: 'CentralBankMSP' },
        { username: 'distributor-reviewer', msp_id: 'DistributorMSP' },
        { username: 'validator-admin', msp_id: 'ValidatorMSP' },
        { username: 'enduser-wallet', msp_id: 'EndUserMSP' },
    ];
    for (const identity of identities) {
        assert.deepEqual(mapSigner({ identity: identity.username, msp_id: identity.msp_id }, identities), {
            invokerIdentity: identity.username,
            invokerMspId: identity.msp_id,
        });
    }
});

test('rejects missing or mismatched signer mappings before Caliper submission', () => {
    const identities = [{ username: 'reviewer', msp_id: 'DistributorMSP' }];
    assert.throws(() => mapSigner({ identity: 'unknown', msp_id: 'DistributorMSP' }, identities), /missing Fabric identity/);
    assert.throws(() => mapSigner({ identity: 'reviewer', msp_id: 'CentralBankMSP' }, identities), /MSP mismatch/);
});
