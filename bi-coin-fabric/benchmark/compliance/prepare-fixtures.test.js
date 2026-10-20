'use strict';

const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const test = require('node:test');
const catalog = require('./case-catalog.json');
const { operationFixture, prepareAccessMatrixFixtures, prepareFixturePool } = require('./prepare-fixtures');

test('every Caliper workload maps to its exact chaincode method and signer MSP', () => {
    const userMSPs = {
        kyc_verified: 'EndUserMSP', retail_two: 'EndUserMSP', reviewer: 'DistributorMSP', senior: 'DistributorMSP',
        compliance: 'DistributorMSP', bank_indonesia: 'CentralBankMSP', merchant: 'EndUserMSP', auditor: 'ValidatorMSP',
        business_rep: 'EndUserMSP', retail_bank: 'DistributorMSP', wholesale_bank: 'DistributorMSP',
    };
    const userKeys = Object.keys(userMSPs);
    const api = {
        namedUsers: Object.fromEntries(userKeys.map(key => [key, { username: key }])),
        identities: userKeys.map(username => ({ username, msp_id: userMSPs[username] })),
        fixtureIds: {
            retailSubject: 'retail-subject',
            businessSubject: 'business-subject',
            businessRepresentative: 'business-representative',
            receiptReference: 'transfer-receipt-1',
        },
    };
    for (const scenario of catalog.performance_scenarios) {
        const fixture = operationFixture({
            api,
            scenario,
            id: 'subject-1',
            index: 3,
            stamp: 'test-stamp',
            attempt: 'attempt',
            from: 'sender-1',
            to: 'receiver-1',
        });
        assert.equal(fixture.ledger.chaincode, scenario.chaincode, scenario.id);
        assert.equal(fixture.ledger.transaction, scenario.transaction, scenario.id);
        assert.ok(Array.isArray(fixture.ledger.args), scenario.id);
        assert.equal(fixture.ledger.msp_id, userMSPs[scenario.actor], scenario.id);
        assert.equal(fixture.ledger.read_only, scenario.operation_kind === 'query', scenario.id);
        if (['issue', 'redeem-reserve', 'interbank-transfer', 'convert-to-retail', 'fund-wallet', 'transfer-retail', 'transfer-merchant'].includes(scenario.id)) {
            assert.ok(fixture.ledger.args.at(-1), `${scenario.id} requires a ledger reference`);
        }
    }
    assert.equal(catalog.performance_scenarios.length, 34);
});

test('reserve-backed fixture setup serializes debits to the shared distributor reserve', async t => {
    const directory = fs.mkdtempSync(path.join(os.tmpdir(), 'reserve-fixtures-'));
    t.after(() => fs.rmSync(directory, { recursive: true, force: true }));

    const mspByUser = {
        bank_indonesia: 'CentralBankMSP', kyc_verified: 'EndUserMSP', retail_two: 'EndUserMSP',
        reviewer: 'DistributorMSP', senior: 'DistributorMSP', compliance: 'DistributorMSP', retail_bank: 'DistributorMSP',
        merchant: 'EndUserMSP',
    };
    const api = {
        baseURL: 'http://api.test',
        namedUsers: Object.fromEntries(Object.keys(mspByUser).map(username => [username, { username, password: 'test' }])),
        identities: Object.entries(mspByUser).map(([username, msp_id]) => ({ username, msp_id })),
        fixtureIds: { retailSubject: 'retail', businessSubject: 'business', businessRepresentative: 'rep', receiptReference: 'receipt' },
    };
    const originalFetch = global.fetch;
    let activeConversions = 0;
    let maxActiveConversions = 0;
    global.fetch = async (input, init = {}) => {
        const url = new URL(input);
        if (url.pathname === '/auth/login') {
            const { username } = JSON.parse(init.body);
            return { ok: true, status: 200, json: async () => ({ access_token: `token-${username}` }) };
        }
        if (url.pathname === '/conversions') {
            activeConversions++;
            maxActiveConversions = Math.max(maxActiveConversions, activeConversions);
            await new Promise(resolve => setTimeout(resolve, 2));
            activeConversions--;
        }
        return { ok: true, status: 200, text: async () => '' };
    };

    try {
        for (const id of ['fund-wallet', 'transfer-retail', 'transfer-merchant']) {
            const catalogScenario = catalog.performance_scenarios.find(scenario => scenario.id === id);
            await prepareFixturePool({
                api,
                catalogScenario,
                count: 2,
                stamp: 'test-stamp',
                outputPath: path.join(directory, `${id}.json`),
                phase: 'preflight',
            });
        }
        assert.equal(maxActiveConversions, 1);
    } finally {
        global.fetch = originalFetch;
    }
});

test('API action checks receive fresh subject and staff fixtures per authorized role', async t => {
    const requests = [];
    const originalFetch = global.fetch;
    global.fetch = async (input, init = {}) => {
        const url = new URL(input);
        if (url.pathname === '/auth/login') {
            const { username } = JSON.parse(init.body);
            return { ok: true, status: 200, json: async () => ({ access_token: `token-${username}` }) };
        }
        requests.push({ method: init.method, path: url.pathname, body: init.body && JSON.parse(init.body) });
        return { ok: true, status: 200, text: async () => '' };
    };

    try {
        const api = {
            baseURL: 'http://api.test',
            namedUsers: Object.fromEntries(['kyc_verified', 'reviewer', 'senior', 'compliance', 'bank_indonesia']
                .map(username => [username, { username, password: 'test' }])),
        };
        const fixtures = await prepareAccessMatrixFixtures(api, 'retail-subject', 'test-stamp');
        const subjectIDs = [
            ...Object.values(fixtures.protectSubjectByRole),
            ...Object.values(fixtures.releaseDecisionByRole),
            fixtures.pendingStaffClientID,
        ];

        assert.equal(new Set(subjectIDs).size, subjectIDs.length);
        assert.equal(requests.filter(request => request.method === 'POST' && request.path === '/subjects').length, 2);
        assert.equal(requests.filter(request => request.path.endsWith('/restriction-release-requests')).length, 1);
        assert.equal(requests.filter(request => request.method === 'POST' && request.path === '/staff').length, 1);
    } finally {
        global.fetch = originalFetch;
    }
});
