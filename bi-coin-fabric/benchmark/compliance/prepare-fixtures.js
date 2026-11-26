'use strict';

const crypto = require('node:crypto');
const fs = require('node:fs');
const path = require('node:path');
const zlib = require('node:zlib');
const { login } = require('./http-access-matrix');

// Holdings stay at the 20000000 verified CDD ceiling, the highest value SetLimits accepts.
const LIMITS = { per_transaction: '1000000000', daily: '1000000000', monthly: '1000000000', holdings: '20000000' };
const REVIEW = { dttot_result: 'not_listed', low_risk: true, low_risk_reason: 'capped product' };

async function createApiClient(api) {
    const tokens = new Map();
    async function request(userKey, method, route, body, idempotencyKey) {
        if (!tokens.has(userKey)) tokens.set(userKey, login(api.baseURL, api.namedUsers[userKey]));
        const headers = { Authorization: `Bearer ${await tokens.get(userKey)}` };
        const form = body instanceof FormData;
        if (body !== undefined && !form) headers['Content-Type'] = 'application/json';
        if (idempotencyKey) headers['Idempotency-Key'] = idempotencyKey;
        const response = await fetch(new URL(route, api.baseURL), {
            method,
            headers,
            ...(body === undefined ? {} : { body: form ? body : JSON.stringify(body) }),
            signal: AbortSignal.timeout(120000),
        });
        const payload = await response.text();
        if (!response.ok) {
            const diagnostic = payload.replace(/\s+/g, ' ').replace(/Bearer\s+\S+/ig, 'Bearer [redacted]').slice(0, 500);
            throw new Error(`fixture setup ${method} ${route} failed with HTTP ${response.status}: ${diagnostic}`);
        }
        return payload;
    }
    return { request };
}

function reference(stamp, attempt, scenario, pathName, index, purpose) {
    return crypto.createHash('sha256').update(`${stamp}:${attempt}:${scenario}:${pathName}:${index}:${purpose}`).digest('hex');
}

function subjectID(stamp, attempt, scenario, pathName, index, suffix) {
    return `cf-${crypto.createHash('sha256').update(`${stamp}:${attempt}:${scenario}:${pathName}:${index}:${suffix}`).digest('hex').slice(0, 24)}`;
}

// Synthetic onboarding document: a solid-colour PNG built with zlib. No real identity document is used.
const PNG_SIGNATURE = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);
const CRC_TABLE = Array.from({ length: 256 }, (_, n) => {
    let c = n;
    for (let k = 0; k < 8; k += 1) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
    return c >>> 0;
});

function crc32(buffer) {
    let crc = 0xffffffff;
    for (const byte of buffer) crc = CRC_TABLE[(crc ^ byte) & 0xff] ^ (crc >>> 8);
    return (crc ^ 0xffffffff) >>> 0;
}

function pngChunk(type, data) {
    const body = Buffer.concat([Buffer.from(type, 'latin1'), data]);
    const length = Buffer.alloc(4);
    length.writeUInt32BE(data.length);
    const crc = Buffer.alloc(4);
    crc.writeUInt32BE(crc32(body));
    return Buffer.concat([length, body, crc]);
}

// rgb is a 3-byte Buffer. Returns an 8x8 truecolour PNG filled with that colour.
function solidPNG(rgb) {
    const size = 8;
    const row = Buffer.alloc(1 + size * 3); // filter byte 0, then RGB triples
    for (let x = 0; x < size; x += 1) rgb.copy(row, 1 + x * 3);
    const header = Buffer.alloc(13);
    header.writeUInt32BE(size, 0);
    header.writeUInt32BE(size, 4);
    header[8] = 8; // bit depth
    header[9] = 2; // colour type RGB
    const scanlines = Buffer.concat(Array.from({ length: size }, () => row));
    return Buffer.concat([PNG_SIGNATURE, pngChunk('IHDR', header), pngChunk('IDAT', zlib.deflateSync(scanlines)), pngChunk('IEND', Buffer.alloc(0))]);
}

// Fields for the multipart POST /subjects route. Each call gets its own colour, so no two documents share a hash.
function onboardingFields() {
    return {
        category: 'retail',
        legal_name: 'Synthetic retail subject',
        address: 'Synthetic address 1',
        birth_place: 'Yogyakarta',
        birth_date: '1990-01-01',
        document_type: 'synthetic-fixture',
        document_number: crypto.randomBytes(8).toString('hex'),
        document: { filename: 'fixture.png', type: 'image/png', base64: solidPNG(crypto.randomBytes(3)).toString('base64') },
    };
}

function toFormData({ document, ...fields }) {
    const form = new FormData();
    for (const [name, value] of Object.entries(fields)) form.append(name, value);
    form.append('document', new Blob([Buffer.from(document.base64, 'base64')], { type: document.type }), document.filename);
    return form;
}

// The server generates the subject ID, so the fixture reads it from the response.
async function onboardSubject(client, owner) {
    const response = JSON.parse(await client.request(owner, 'POST', '/subjects', toFormData(onboardingFields())));
    return response.subject_id;
}

async function registerBank(request, distributorID) {
    // A repeated registration is rejected; the issuance that follows fails if the bank is still unregistered.
    await request('bank_indonesia', 'POST', '/distributors', { distributor_id: distributorID }).catch(() => {});
}

async function topUpReserve(api, stamp) {
    const { request } = await createApiClient(api);
    const topupAmount = '1000000000000';
    await registerBank(request, 'retail-bank');
    await request('bank_indonesia', 'POST', '/issuances', { distributor_id: 'retail-bank', amount: topupAmount }, `compliance-topup-retail-${stamp}`);
}

async function prepareSubject(client, owner, { active = false, restricted = false, releaseRequested = false, recordReview = true } = {}) {
    const id = await onboardSubject(client, owner);
    await client.request('reviewer', 'POST', `/subjects/${encodeURIComponent(id)}/endorsement-policies`);
    await client.request('reviewer', 'PUT', `/subjects/${encodeURIComponent(id)}/limits`, LIMITS);
    if (recordReview) await client.request('reviewer', 'POST', `/subjects/${encodeURIComponent(id)}/reviews`, REVIEW);
    if (active) {
        await client.request('reviewer', 'POST', `/subjects/${encodeURIComponent(id)}/decisions`, { approved: true });
    }
    if (restricted) {
        await client.request('compliance', 'POST', `/subjects/${encodeURIComponent(id)}/restrictions`, { reason_code: 'internal_review' });
        if (releaseRequested) {
            await client.request('reviewer', 'POST', `/subjects/${encodeURIComponent(id)}/restriction-release-requests`, {
                authority_evidence_ref: reference(id, 'release', 'fixture', 'fixture', 0, 'evidence'),
            });
        }
    }
    return id;
}

async function prepareAccessMatrixFixtures(api, subjectID, stamp) {
    const client = await createApiClient(api);
    const fixtureID = purpose => `matrix-${crypto.createHash('sha256').update(`${stamp}:${subjectID}:${purpose}`).digest('hex').slice(0, 24)}`;
    const protectSubjectByRole = {};
    const releaseDecisionByRole = {};
    const revokeLowRiskByRole = {};
    for (const role of ['retail_bank']) {
        protectSubjectByRole[role] = await onboardSubject(client, 'kyc_verified');
        releaseDecisionByRole[role] = await prepareSubject(client, 'kyc_verified', { active: true, restricted: true, releaseRequested: true });
        revokeLowRiskByRole[role] = await prepareSubject(client, 'kyc_verified', { active: true });
    }
    const pendingStaffClientID = fixtureID('pending-staff');
    await client.request('bank_indonesia', 'POST', '/staff', { client_id: pendingStaffClientID });
    await topUpReserve(api, stamp);
    return { protectSubjectByRole, releaseDecisionByRole, revokeLowRiskByRole, pendingStaffClientID };
}

function directIdentity(api, userKey) {
    const username = api.namedUsers[userKey].username;
    if (!api.identities.some(identity => identity.username === username)) throw new Error(`no direct ledger certificate for ${userKey}`);
    return username;
}

function operationFixture({ api, scenario, id, index, stamp, attempt, owner = 'kyc_verified', from, to }) {
    const ref = reference(stamp, attempt, scenario.id, 'caliper', index, 'operation');
    const method = scenario.api?.split(' ', 1)[0] || (scenario.operation_kind === 'query' ? 'GET' : 'POST');
    let route = scenario.api?.slice(method.length).trim() || '/';
    let body;
    let multipart;
    let transient;
    let apiUser = scenario.actor || owner;
    let args;
    const readOnly = scenario.operation_kind === 'query';
    const receiptReference = api.fixtureIds.receiptReference;

    switch (scenario.id) {
        case 'create-pending':
            multipart = onboardingFields();
            args = [id];
            transient = { payload: JSON.stringify({
                category: 'retail',
                salt: reference(stamp, attempt, scenario.id, 'caliper', index, 'salt'),
                documentRef: reference(stamp, attempt, scenario.id, 'caliper', index, 'document'),
            }) };
            break;
        case 'protect-subject':
            args = [id];
            break;
        case 'create-staff-pending':
            body = { client_id: id };
            args = [id];
            break;
        case 'protect-staff':
            route = `/staff/${encodeURIComponent(id)}/endorsement-policies`;
            args = [id];
            break;
        case 'set-staff-role':
            route = `/staff/${encodeURIComponent(id)}/role`;
            body = { role: 'kyc_reviewer' };
            args = [id, 'kyc_reviewer'];
            break;
        case 'record-review':
            route = `/subjects/${encodeURIComponent(id)}/reviews`;
            body = REVIEW;
            args = [id];
            transient = { payload: JSON.stringify(REVIEW) };
            break;
        case 'approve-subject':
            route = `/subjects/${encodeURIComponent(id)}/decisions`;
            body = { approved: true };
            args = [id];
            transient = { payload: JSON.stringify(body) };
            break;
        case 'verify-subject':
            route = `/subjects/${encodeURIComponent(id)}/verifications`;
            body = { evidence_ref: reference(stamp, attempt, scenario.id, 'caliper', index, 'evidence') };
            args = [id];
            transient = { payload: JSON.stringify(body) };
            break;
        case 'set-limits':
            route = `/subjects/${encodeURIComponent(id)}/limits`;
            body = LIMITS;
            args = [id];
            transient = { payload: JSON.stringify({ per_transaction: 1000, daily: 5000, monthly: 20000, holdings: 5000 }) };
            break;
        case 'freeze-subject':
            route = `/subjects/${encodeURIComponent(id)}/restrictions`;
            body = { reason_code: 'internal_review' };
            args = [id];
            transient = { payload: JSON.stringify({ reason: 'internal_review' }) };
            break;
        case 'request-unfreeze': {
            route = `/subjects/${encodeURIComponent(id)}/restriction-release-requests`;
            const evidence = reference(stamp, attempt, scenario.id, 'caliper', index, 'release');
            body = { authority_evidence_ref: evidence };
            args = [id];
            transient = { payload: JSON.stringify(body) };
            break;
        }
        case 'approve-unfreeze':
            route = `/subjects/${encodeURIComponent(id)}/restriction-release-decisions`;
            args = [id];
            break;
        case 'read-caller-identity':
            args = [];
            break;
        case 'can-pay':
        case 'read-limits':
        case 'can-act-for':
        case 'validator-read-subject':
        case 'read-balance':
            args = [id];
            break;
        case 'register-distributor':
            body = { distributor_id: id };
            args = [id];
            break;
        case 'issue':
            body = { distributor_id: 'retail-bank', amount: '1' };
            args = ['retail-bank', '1', ref];
            break;
        case 'redeem-reserve':
            body = { distributor_id: 'retail-bank', amount: '1' };
            args = ['retail-bank', '1', ref];
            break;
        case 'read-participant':
            route = '/distributors/retail-bank';
            args = ['retail-bank'];
            break;
        case 'convert-to-retail':
            body = { distributor_id: 'retail-bank', amount: '1' };
            args = ['retail-bank', '1', ref];
            break;
        case 'read-supply':
        case 'read-wholesale-supply':
        case 'read-retail-supply':
            args = [];
            break;
        case 'read-reserve':
            args = ['retail-bank'];
            break;
        case 'read-retail-float':
            args = ['retail-bank'];
            break;
        case 'open-wallet':
            body = { subject_id: id };
            args = [id];
            break;
        case 'fund-wallet':
            body = { subject_id: id, distributor_id: 'retail-bank', amount: '1' };
            args = [id, 'retail-bank', '1', ref];
            break;
        case 'transfer-retail':
            body = { from, to, amount: '1' };
            args = [from, to, '1', ref];
            break;
        case 'read-receipt':
            if (!receiptReference) throw new Error('ledger smoke test omitted a transfer receipt reference');
            args = [receiptReference];
            break;
        default:
            throw new Error(`unsupported Caliper operation ${scenario.id}`);
    }

    const identity = directIdentity(api, apiUser);
    const mspId = api.identities.find(item => item.username === identity)?.msp_id;
    if (!mspId) throw new Error(`missing MSP mapping for Caliper signer ${identity}`);
    const idempotencyRequired = ['transfer-retail', 'issue', 'redeem-reserve', 'convert-to-retail', 'fund-wallet'].includes(scenario.id);
    return {
        api: {
            user: apiUser,
            method,
            path: route,
            ...(body === undefined ? {} : { body }),
            ...(multipart === undefined ? {} : { multipart }),
            ...(idempotencyRequired ? { headers: { 'Idempotency-Key': ref } } : {}),
        },
        ledger: {
            identity,
            msp_id: mspId,
            chaincode: scenario.chaincode,
            transaction: scenario.transaction,
            args,
            read_only: readOnly,
            reference: idempotencyRequired ? ref : null,
            ...(transient === undefined ? {} : { transient }),
        },
    };
}

// Pooled profiles create subjects once per run and reuse them across rounds. A round uses pool entries [0, count) in
// order, so its entries are distinct; the next round reuses them only after the previous round has ended, so a
// transaction in flight never shares a key with the next round.
const POOLED_PROFILES = new Set(['retail-transfer-pair', 'float-subject']);
const TOPUP_PROFILES = new Set(['monetary', 'float-subject', 'retail-transfer-pair']);
const SETUP_CONCURRENCY = 64;
const FUNDING_BATCH = 1024;
const SENDER_FUNDING = 200; // units per sender; each measured transfer moves 1 unit
const BANK_REFILL_MINIMUM = 10000000; // needs the verified ceiling, and stays below the 20000000 holdings limit
const FLOAT_PREFILL = 10000000;

const pools = new Map();
const runTopUps = new Set();
const runFloats = new Set();

async function topUpOnce(api, stamp) {
    if (runTopUps.has(stamp)) return;
    await topUpReserve(api, stamp);
    runTopUps.add(stamp);
}

function poolState(stamp, profile) {
    const key = `${stamp}:${profile}`;
    if (!pools.has(key)) pools.set(key, { token: crypto.randomBytes(3).toString('hex'), entries: [], bank: null });
    return pools.get(key);
}

async function mapLimit(items, limit, task) {
    const results = new Array(items.length);
    let next = 0;
    await Promise.all(Array.from({ length: Math.min(limit, items.length) }, async () => {
        while (next < items.length) {
            const index = next;
            next += 1;
            results[index] = await task(items[index], index);
        }
    }));
    return results;
}

function subtreeSize(index, count) {
    if (index >= count) return 0;
    return 1 + subtreeSize(2 * index + 1, count) + subtreeSize(2 * index + 2, count);
}

// Heap-shaped funding tree over one batch of senders. Each level lists parent groups; a parent sends to its two children
// one after the other (same key), and the groups of one level run in parallel (distinct keys).
// A child receives SENDER_FUNDING units for every sender in its subtree, so each sender keeps SENDER_FUNDING of its own.
function fundingSchedule(count) {
    const levels = [];
    for (let start = 0, depth = 0; start < count; start += 2 ** depth, depth += 1) {
        const level = [];
        for (let parent = start; parent < Math.min(count, start + 2 ** depth); parent += 1) {
            const children = [2 * parent + 1, 2 * parent + 2]
                .filter(child => child < count)
                .map(child => ({ child, units: SENDER_FUNDING * subtreeSize(child, count) }));
            if (children.length) level.push({ parent, children });
        }
        if (level.length) levels.push(level);
    }
    return levels;
}

async function fundBank(client, state, stamp, units) {
    if (!state.bank) {
        const id = await prepareSubject(client, 'kyc_verified', { active: true });
        // The bank holds more than the unverified ceiling, so its identity is verified first.
        await client.request('reviewer', 'POST', `/subjects/${encodeURIComponent(id)}/verifications`, { evidence_ref: reference(stamp, id, 'pool-bank', 'fixture', 0, 'evidence') });
        await client.request('kyc_verified', 'POST', '/customer-wallets', { subject_id: id });
        state.bank = { id, balance: 0, refills: 0 };
    }
    if (state.bank.balance < units) {
        const amount = Math.max(BANK_REFILL_MINIMUM, units);
        if (amount > 20000000) throw new Error('pool funding batch exceeds the holdings limit; reduce the pool batch size');
        const tag = `${stamp}-${state.token}-${state.bank.refills}`;
        await client.request('reviewer', 'POST', '/conversions', { distributor_id: 'retail-bank', amount: String(amount) }, `pool-convert-${tag}`);
        await client.request('reviewer', 'POST', '/wallet-fundings', { subject_id: state.bank.id, distributor_id: 'retail-bank', amount: String(amount) }, `pool-fund-${tag}`);
        state.bank.balance += amount;
        state.bank.refills += 1;
    }
    state.bank.balance -= units;
    return state.bank.id;
}

async function fundBatch(client, state, stamp, senders, batchTag) {
    const schedule = fundingSchedule(senders.length);
    const bankId = await fundBank(client, state, stamp, SENDER_FUNDING * senders.length);
    await client.request('kyc_verified', 'POST', '/retail-transfers', { from: bankId, to: senders[0], amount: String(SENDER_FUNDING * senders.length) }, `pool-root-${state.token}-${batchTag}`);
    for (const level of schedule) {
        await mapLimit(level, SETUP_CONCURRENCY, async group => {
            for (const edge of group.children) {
                await client.request('kyc_verified', 'POST', '/retail-transfers', { from: senders[group.parent], to: senders[edge.child], amount: String(edge.units) }, `pool-tree-${state.token}-${batchTag}-${group.parent}-${edge.child}`);
            }
        });
    }
}

async function createPoolEntries(client, profile, indices) {
    return mapLimit(indices, SETUP_CONCURRENCY, async () => {
        if (profile === 'float-subject') {
            const subject = await prepareSubject(client, 'kyc_verified', { active: true });
            await client.request('kyc_verified', 'POST', '/customer-wallets', { subject_id: subject });
            return { subject, sender: subject, receiver: subject };
        }
        const sender = await prepareSubject(client, 'kyc_verified', { active: true });
        await client.request('kyc_verified', 'POST', '/customer-wallets', { subject_id: sender });
        const receiver = await prepareSubject(client, 'retail_two', { active: true });
        await client.request('retail_two', 'POST', '/customer-wallets', { subject_id: receiver });
        return { subject: sender, sender, receiver };
    });
}

async function ensurePool(client, profile, count, stamp) {
    const state = poolState(stamp, profile);
    const start = state.entries.length;
    if (start >= count) return state;
    const created = await createPoolEntries(client, profile, Array.from({ length: count - start }, (_, offset) => start + offset));
    if (profile !== 'float-subject') {
        for (let batch = 0; batch < created.length; batch += FUNDING_BATCH) {
            const senders = created.slice(batch, batch + FUNDING_BATCH).map(entry => entry.sender);
            await fundBatch(client, state, stamp, senders, `${start + batch}`);
        }
    }
    state.entries.push(...created);
    return state;
}

async function ensureFloat(client, stamp) {
    if (runFloats.has(stamp)) return;
    await client.request('reviewer', 'POST', '/conversions', { distributor_id: 'retail-bank', amount: String(FLOAT_PREFILL) }, `pool-float-${stamp}`);
    runFloats.add(stamp);
}

async function prepareFixturePool({ api, catalogScenario, count, stamp, outputPath, phase, pathName = 'caliper', onProgress = () => {} }) {
    if (!Number.isInteger(count) || count < 1) throw new Error('fixture count must be a positive integer');
    if (fs.existsSync(outputPath)) {
        const prior = JSON.parse(fs.readFileSync(outputPath, 'utf8'));
        if (prior.phase === phase && prior.path === pathName && prior.scenario === catalogScenario.id && prior.count >= count) return prior.fixtures;
    }
    const client = await createApiClient(api);
    const attempt = `${Date.now().toString(36)}-${crypto.randomBytes(3).toString('hex')}`;
    const apiItems = [];
    const ledgerItems = [];
    const fixtureProfile = catalogScenario.fixture_profile;
    const reuse = fixtureProfile.startsWith('reuse-') || catalogScenario.operation_kind === 'query';
    const smokeIds = api.fixtureIds;

    if (reuse) {
        const fixture = operationFixture({ api, scenario: catalogScenario, id: smokeIds.retailSubject, index: 0, stamp, attempt });
        apiItems.push(fixture.api);
        ledgerItems.push(fixture.ledger);
    } else {
        if (TOPUP_PROFILES.has(fixtureProfile)) await topUpOnce(api, stamp);
        if (fixtureProfile === 'float-subject') await ensureFloat(client, stamp);
        if (POOLED_PROFILES.has(fixtureProfile)) await ensurePool(client, fixtureProfile, count, stamp);
        const independentSubjectSetup = [
            'protected-pending-subject', 'standard-review-subject',
            'active-subject', 'restricted-subject', 'release-requested-subject',
            'float-subject', 'retail-transfer-pair', 'pending-staff', 'protected-staff',
        ].includes(fixtureProfile);
        const sharesReserveKey = ['float-subject', 'retail-transfer-pair'].includes(fixtureProfile);
        const preparationConcurrency = independentSubjectSetup && !sharesReserveKey ? SETUP_CONCURRENCY : 1;
        const prepareOne = async index => {
            if (POOLED_PROFILES.has(fixtureProfile)) {
                const entry = poolState(stamp, fixtureProfile).entries[index];
                return operationFixture({ api, scenario: catalogScenario, id: entry.subject, index, stamp, attempt, owner: 'kyc_verified', from: entry.sender, to: entry.receiver });
            }
            let id = subjectID(stamp, attempt, catalogScenario.id, pathName, index, 'primary');
            let from;
            let to;
            const owner = catalogScenario.actor || 'kyc_verified';
            if (fixtureProfile === 'pending-subject') {
                id = await onboardSubject(client, 'kyc_verified');
            } else if (fixtureProfile === 'protected-pending-subject') {
                id = await prepareSubject(client, 'kyc_verified', { recordReview: false });
            } else if (fixtureProfile === 'standard-review-subject') {
                id = await prepareSubject(client, 'kyc_verified');
            } else if (fixtureProfile === 'active-subject') {
                id = await prepareSubject(client, 'kyc_verified', { active: true });
            } else if (fixtureProfile === 'restricted-subject' || fixtureProfile === 'release-requested-subject') {
                id = await prepareSubject(client, 'kyc_verified', {
                    active: true,
                    restricted: true,
                    releaseRequested: fixtureProfile === 'release-requested-subject',
                });
            } else if (fixtureProfile === 'pending-staff' || fixtureProfile === 'protected-staff') {
                await client.request('bank_indonesia', 'POST', '/staff', { client_id: id });
                if (fixtureProfile === 'protected-staff') {
                    await client.request('bank_indonesia', 'POST', `/staff/${encodeURIComponent(id)}/endorsement-policies`);
                }
            } else if (!['fresh-subject', 'fresh-staff', 'fresh-distributor', 'monetary', 'none'].includes(fixtureProfile)) {
                throw new Error(`unsupported fixture profile ${fixtureProfile} for ${catalogScenario.id}`);
            }
            return operationFixture({ api, scenario: catalogScenario, id, index, stamp, attempt, owner, from, to });
        };
        for (let start = 0; start < count; start += preparationConcurrency) {
            // Setup writes target separate subjects; the measured load still uses one worker.
            const fixtures = await Promise.all(Array.from(
                { length: Math.min(preparationConcurrency, count - start) },
                (_, offset) => prepareOne(start + offset),
            ));
            for (const fixture of fixtures) {
                apiItems.push(fixture.api);
                ledgerItems.push(fixture.ledger);
            }
            const prepared = start + fixtures.length;
            if (prepared % 100 < preparationConcurrency || prepared === count) {
                const progress = { phase: 'fixture-preparation', scenario: catalogScenario.id, path: pathName, prepared, requested: count };
                onProgress(progress);
                console.log(JSON.stringify(progress));
            }
        }
    }

    const fixtures = { reuse, items: apiItems };
    const document = {
        phase,
        path: pathName,
        scenario: catalogScenario.id,
        count: apiItems.length,
        fixtures: {
            api: fixtures,
            ledger: { reuse, items: ledgerItems },
        },
        preparation_attempt: attempt,
    };
    fs.mkdirSync(path.dirname(outputPath), { recursive: true });
    fs.writeFileSync(outputPath, `${JSON.stringify(document)}\n`);
    return document.fixtures;
}

module.exports = { fundingSchedule, operationFixture, prepareAccessMatrixFixtures, prepareFixturePool, SENDER_FUNDING, solidPNG, topUpReserve };
