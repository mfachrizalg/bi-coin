'use strict';

const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const test = require('node:test');

const root = path.resolve(__dirname, '..');
const deploy = fs.readFileSync(path.join(__dirname, 'deploy-chaincodes.sh'), 'utf8');
const compose = fs.readFileSync(path.join(root, 'network/docker-compose.yaml'), 'utf8');

test('study chaincode package path is shared with the nested Docker daemon', () => {
    assert.match(deploy, /PACKAGE_DIR="\$NETWORK_DIR\/packages"/);
    assert.match(compose, /\.\/packages:\/network\/packages/);
    assert.doesNotMatch(deploy, /PACKAGE_DIR="\/tmp\//);
    assert.doesNotMatch(compose, /\/tmp\/bi-coin-chaincode/);
});
