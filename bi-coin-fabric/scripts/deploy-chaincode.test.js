'use strict';

const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const test = require('node:test');

const script = fs.readFileSync(path.join(__dirname, 'deploy-chaincode.sh'), 'utf8');

test('Garuda lifecycle approval is sent only to the approving organization peer', () => {
    const start = script.indexOf('peer lifecycle chaincode approveformyorg');
    const end = script.indexOf('\n  done\n\n  echo "Committing chaincode..."', start);
    const block = script.slice(start, end);

    assert.match(block, /--peerAddresses "localhost:\$PORT"/);
    assert.doesNotMatch(block, /localhost:(7051|9051|11051|13051)/);
});

test('Garuda lifecycle commit collects endorsements from the approving orgs only (validator is read-only)', () => {
    const start = script.indexOf('peer lifecycle chaincode commit');
    const end = script.indexOf('\n\n  echo "Chaincode deployed successfully', start);
    const block = script.slice(start, end);

    assert.match(block, /--peerAddresses localhost:7051/);
    assert.match(block, /--peerAddresses localhost:9051/);
    assert.doesNotMatch(block, /--peerAddresses localhost:(12051|13051)/);
});

test('incremental upgrades replace approvals only when they match the committed definition', () => {
    assert.match(script, /COMMITTED_SEQUENCE/);
    assert.match(script, /approval_matches_committed/);
    assert.match(script, /mismatched uncommitted approval/);
});

test('default deployment does not target an older committed sequence', () => {
    assert.match(script, /already at newer version .*; no upgrade requested/);
    assert.match(script, /Requested sequence .* is older than committed sequence/);
});
