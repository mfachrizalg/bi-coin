'use strict';

const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const test = require('node:test');
const zlib = require('node:zlib');
const catalog = require('./case-catalog.json');
const { fundingSchedule, operationFixture, prepareAccessMatrixFixtures, prepareFixturePool, SENDER_FUNDING, solidPNG } = require('./prepare-fixtures');

const userMSPs = {
    kyc_verified: 'EndUserMSP', retail_two: 'EndUserMSP', reviewer: 'DistributorMSP',
    compliance: 'DistributorMSP', bank_indonesia: 'CentralBankMSP', auditor: 'ValidatorMSP', retail_bank: 'DistributorMSP',
};

function ledgerAPI() {
    const userKeys = Object.keys(userMSPs);
    return {
        namedUsers: Object.fromEntries(userKeys.map(key => [key, { username: key }])),
        identities: userKeys.map(username => ({ username, msp_id: userMSPs[username] })),
        fixtureIds: {
            retailSubject: 'retail-subject',
            receiptReference: 'transfer-receipt-1',
        },
    };
}

const scenarioFor = id => catalog.performance_scenarios.find(item => item.id === id);
let subjectCount = 0;

// Stands in for POST /subjects: the server generates the subject ID, so the stub does too.
// The ID is fixed at request time; concurrent requests would otherwise read the counter after it advanced.
function subjectReply() {
    subjectCount += 1;
    const body = JSON.stringify({ status: 'pending', subject_id: `test-subject-${subjectCount}` });
    return { ok: true, status: 200, text: async () => body };
}

function loginReply(init) {
    const { username } = JSON.parse(init.body);
    return { ok: true, status: 200, json: async () => ({ access_token: `token-${username}` }) };
}

test('every Caliper workload maps to its exact chaincode method and signer MSP', () => {
    const api = ledgerAPI();
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
        if (['issue', 'redeem-reserve', 'convert-to-retail', 'fund-wallet', 'transfer-retail'].includes(scenario.id)) {
            assert.ok(fixture.ledger.args.at(-1), `${scenario.id} requires a ledger reference`);
        }
    }
    assert.equal(catalog.performance_scenarios.length, 4);
});

test('controls writes carry the transient keys the chaincode reads, and transfers carry none', () => {
    const api = ledgerAPI();
    const fixtureFor = id => operationFixture({ api, scenario: scenarioFor(id), id: 'subject-1', index: 0, stamp: 'test-stamp', attempt: 'attempt' });
    assert.deepEqual(JSON.parse(fixtureFor('approve-subject').ledger.transient.payload), { approved: true });
    const verify = fixtureFor('verify-subject');
    assert.match(JSON.parse(verify.ledger.transient.payload).evidence_ref, /^[0-9a-f]{64}$/, 'VerifySubject needs a SHA-256 evidence reference');
    assert.deepEqual(JSON.parse(verify.ledger.transient.payload), verify.api.body, 'the API body and the transient payload match');
    assert.equal(verify.api.path, '/subjects/subject-1/verifications');
    for (const id of ['approve-subject', 'verify-subject']) {
        assert.deepEqual(fixtureFor(id).ledger.args, ['subject-1'], `${id} takes the subject ID only`);
    }

    const transfer = operationFixture({ api, scenario: scenarioFor('transfer-retail'), id: 'subject-1', index: 0, stamp: 'test-stamp', attempt: 'attempt', from: 'sender-1', to: 'receiver-1' });
    assert.equal(transfer.ledger.transient, undefined, 'transfer takes no transient input');
});

test('the onboarding document is a valid solid-colour PNG', () => {
    const png = solidPNG(Buffer.from([0x12, 0x34, 0x56]));
    assert.deepEqual(png.subarray(0, 8), Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]));
    const chunks = [];
    for (let offset = 8; offset < png.length;) {
        const length = png.readUInt32BE(offset);
        chunks.push({
            type: png.toString('latin1', offset + 4, offset + 8),
            data: png.subarray(offset + 8, offset + 8 + length),
            crc: png.readUInt32BE(offset + 8 + length),
        });
        offset += 12 + length;
    }
    assert.deepEqual(chunks.map(chunk => chunk.type), ['IHDR', 'IDAT', 'IEND']);
    assert.equal(chunks.at(-1).crc, 0xae426082, 'the PNG specification CRC of an empty IEND chunk');
    for (const chunk of chunks) {
        assert.equal(chunk.crc, zlib.crc32(chunk.data, zlib.crc32(Buffer.from(chunk.type, 'latin1'))), `${chunk.type} CRC`);
    }
    assert.equal(chunks[0].data.readUInt32BE(0), 8);
    assert.equal(chunks[0].data.readUInt32BE(4), 8);
    const scanlines = zlib.inflateSync(chunks[1].data);
    assert.equal(scanlines.length, 8 * (1 + 8 * 3));
    for (let row = 0; row < 8; row += 1) {
        const line = scanlines.subarray(row * 25, (row + 1) * 25);
        assert.equal(line[0], 0, 'filter type 0');
        for (let x = 0; x < 8; x += 1) assert.deepEqual([...line.subarray(1 + x * 3, 4 + x * 3)], [0x12, 0x34, 0x56]);
    }
});

test('reserve-backed fixture setup serializes debits to the shared distributor reserve', async t => {
    const directory = fs.mkdtempSync(path.join(os.tmpdir(), 'reserve-fixtures-'));
    t.after(() => fs.rmSync(directory, { recursive: true, force: true }));

    const mspByUser = {
        bank_indonesia: 'CentralBankMSP', kyc_verified: 'EndUserMSP', retail_two: 'EndUserMSP',
        reviewer: 'DistributorMSP', compliance: 'DistributorMSP', retail_bank: 'DistributorMSP',
    };
    const api = {
        baseURL: 'http://api.test',
        namedUsers: Object.fromEntries(Object.keys(mspByUser).map(username => [username, { username, password: 'test' }])),
        identities: Object.entries(mspByUser).map(([username, msp_id]) => ({ username, msp_id })),
        fixtureIds: { retailSubject: 'retail', receiptReference: 'receipt' },
    };
    const originalFetch = global.fetch;
    let activeConversions = 0;
    let maxActiveConversions = 0;
    global.fetch = async (input, init = {}) => {
        const url = new URL(input);
        if (url.pathname === '/auth/login') return loginReply(init);
        if (url.pathname === '/conversions') {
            activeConversions += 1;
            maxActiveConversions = Math.max(maxActiveConversions, activeConversions);
            await new Promise(resolve => setTimeout(resolve, 2));
            activeConversions -= 1;
        }
        return url.pathname === '/subjects' ? subjectReply() : { ok: true, status: 200, text: async () => '' };
    };

    try {
        for (const id of ['transfer-retail']) {
            await prepareFixturePool({
                api,
                catalogScenario: scenarioFor(id),
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
        if (url.pathname === '/auth/login') return loginReply(init);
        requests.push({
            method: init.method,
            path: url.pathname,
            body: init.body instanceof FormData ? undefined : init.body && JSON.parse(init.body),
            form: init.body instanceof FormData ? init.body : undefined,
            user: init.headers?.Authorization?.replace('Bearer token-', ''),
            reference: init.headers?.['Idempotency-Key'],
        });
        return url.pathname === '/subjects' ? subjectReply() : { ok: true, status: 200, text: async () => '' };
    };

    try {
        const api = {
            baseURL: 'http://api.test',
            namedUsers: Object.fromEntries(['kyc_verified', 'reviewer', 'compliance', 'bank_indonesia', 'retail_bank']
                .map(username => [username, { username, password: 'test' }])),
        };
        const fixtures = await prepareAccessMatrixFixtures(api, 'retail-subject', 'test-stamp');
        const subjectIDs = [
            ...Object.values(fixtures.protectSubjectByRole),
            ...Object.values(fixtures.releaseDecisionByRole),
            ...Object.values(fixtures.revokeLowRiskByRole),
            fixtures.pendingStaffClientID,
        ];

        assert.equal(new Set(subjectIDs).size, subjectIDs.length);
        const onboarding = requests.filter(request => request.method === 'POST' && request.path === '/subjects');
        assert.equal(onboarding.length, 3);
        for (const request of onboarding) {
            assert.equal(request.form.get('category'), 'retail');
            assert.equal(request.form.get('document').type, 'image/png');
        }
        assert.equal(requests.filter(request => request.path.endsWith('/restriction-release-requests')).length, 1);
        assert.equal(requests.filter(request => request.method === 'POST' && request.path === '/staff').length, 1);
    } finally {
        global.fetch = originalFetch;
    }
});

test('funding tree gives every child its subtree budget and leaves each sender one unit-set of its own', () => {
    for (const count of [1, 2, 3, 7, 16, 1024]) {
        const received = new Map();
        const sent = new Map();
        for (const level of fundingSchedule(count)) {
            const parents = level.map(group => group.parent);
            assert.equal(new Set(parents).size, parents.length, 'parents in one level must be distinct');
            for (const group of level) {
                for (const edge of group.children) {
                    received.set(edge.child, (received.get(edge.child) || 0) + edge.units);
                    sent.set(group.parent, (sent.get(group.parent) || 0) + edge.units);
                }
            }
        }
        assert.equal(received.size, count - 1, `every non-root sender is funded once (${count})`);
        for (let index = 0; index < count; index += 1) {
            const start = index === 0 ? SENDER_FUNDING * count : received.get(index);
            assert.equal(start - (sent.get(index) || 0), SENDER_FUNDING, `sender ${index} of ${count} keeps its own budget`);
        }
    }
});

test('pooled transfer fixtures are created once per run, keep each round distinct, and reuse entries across rounds', async t => {
    const calls = [];
    const originalFetch = global.fetch;
    global.fetch = async (input, init = {}) => {
        const url = new URL(input);
        if (url.pathname === '/auth/login') return loginReply(init);
        calls.push({ method: init.method, path: url.pathname, user: init.headers?.Authorization?.replace('Bearer token-', '') });
        return url.pathname === '/subjects' ? subjectReply() : { ok: true, status: 200, text: async () => '' };
    };

    try {
        const users = ['bank_indonesia', 'reviewer', 'compliance', 'retail_bank', 'retail_two', 'kyc_verified'];
        const api = {
            baseURL: 'http://api.test',
            namedUsers: Object.fromEntries(users.map(username => [username, { username, password: 'test' }])),
            identities: users.map(username => ({ username, msp_id: 'DistributorMSP' })),
            fixtureIds: {},
        };
        const stamp = `pool-test-${Date.now().toString(36)}`;
        const directory = fs.mkdtempSync(path.join(os.tmpdir(), 'pool-test-'));
        t.after(() => fs.rmSync(directory, { recursive: true, force: true }));
        const first = await prepareFixturePool({ api, catalogScenario: scenarioFor('transfer-retail'), count: 6, stamp, outputPath: path.join(directory, 'a.json'), phase: 'probe' });
        const subjectsAfterFirst = calls.filter(call => call.path === '/subjects').length;
        const distributorsAfterFirst = calls.filter(call => call.path === '/distributors').length;
        const second = await prepareFixturePool({ api, catalogScenario: scenarioFor('transfer-retail'), count: 4, stamp, outputPath: path.join(directory, 'b.json'), phase: 'probe' });

        const pairs = fixtures => fixtures.ledger.items.map(item => item.args.slice(0, 2));
        const firstPairs = pairs(first);
        assert.equal(new Set(firstPairs.map(([from]) => from)).size, 6, 'senders are distinct within a round');
        assert.equal(new Set(firstPairs.map(([, to]) => to)).size, 6, 'receivers are distinct within a round');
        assert.deepEqual(pairs(second), firstPairs.slice(0, 4), 'the next round reuses the first pool entries');
        assert.equal(calls.filter(call => call.path === '/subjects').length, subjectsAfterFirst, 'no subjects are created for the second round');
        assert.equal(calls.filter(call => call.path === '/distributors').length, distributorsAfterFirst, 'reserve top-up runs once per run');
        const transfers = calls.filter(call => call.path === '/retail-transfers');
        assert.ok(transfers.length > 0 && transfers.every(call => call.user === 'kyc_verified'), 'pool funding is signed by the sender owner');
    } finally {
        global.fetch = originalFetch;
    }
});
