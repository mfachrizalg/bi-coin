'use strict';

function mapSigner(fixture, identities) {
    const identity = identities.find(item => item.username === fixture.identity);
    if (!identity) throw new Error(`fixture references missing Fabric identity ${fixture.identity}`);
    if (identity.msp_id !== fixture.msp_id) {
        throw new Error(`fixture MSP mismatch for ${fixture.identity}: expected ${fixture.msp_id}, got ${identity.msp_id}`);
    }
    return { invokerIdentity: identity.username, invokerMspId: identity.msp_id };
}

module.exports = { mapSigner };
