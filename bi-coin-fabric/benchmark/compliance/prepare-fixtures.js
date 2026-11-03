'use strict';

const crypto = require('node:crypto');
const fs = require('node:fs');
const path = require('node:path');
const { login } = require('./http-access-matrix');

const LIMITS = { per_transaction: '1000000000', daily: '1000000000', monthly: '1000000000', holdings: '1000000000' };
// A 1-unit wholesale transfer executes at once; every retail-bank transfer waits for a second officer.
const WHOLESALE_APPROVAL_THRESHOLD = '1000000';
const RETAIL_APPROVAL_THRESHOLD = '0';
// SetTransferLimit needs a positive value; this one never binds.
const NO_TRANSFER_LIMIT = String(Number.MAX_SAFE_INTEGER);

async function createApiClient(api) {
    const tokens = new Map();
    async function request(userKey, method, route, body, idempotencyKey) {
        if (!tokens.has(userKey)) tokens.set(userKey, login(api.baseURL, api.namedUsers[userKey]));
        const headers = { Authorization: `Bearer ${await tokens.get(userKey)}` };
        if (body !== undefined) headers['Content-Type'] = 'application/json';
        if (idempotencyKey) headers['Idempotency-Key'] = idempotencyKey;
        const response = await fetch(new URL(route, api.baseURL), {
            method,
            headers,
            ...(body === undefined ? {} : { body: JSON.stringify(body) }),
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

function admissionRef(distributorID) {
    return crypto.createHash('sha256').update(`bi-admission:${distributorID}`).digest('hex');
}

async function registerBank(request, distributorID, kind) {
    // A repeated registration is rejected; the issuance that follows fails if the bank is still unregistered.
    await request('bank_indonesia', 'POST', '/distributors', { distributor_id: distributorID, kind, admission_ref: admissionRef(distributorID) }).catch(() => {});
}

async function setApprovalThreshold(request, distributorID, amount, proposer, approver) {
    await request(proposer, 'POST', `/distributors/${distributorID}/approval-threshold-proposals`, { amount });
    await request(approver, 'POST', `/distributors/${distributorID}/approval-threshold-approvals`, { amount });
}

// Resets participation state that the ledger smoke test and earlier workloads change.
async function configureParticipants(request) {
    for (const bank of ['wholesale-bank', 'retail-bank']) {
        await request('bank_indonesia', 'PUT', `/distributors/${bank}/status`, { status: 'active', reason_code: 'participation_policy' });
    }
    await request('bank_indonesia', 'PUT', '/transfer-limit', { amount: NO_TRANSFER_LIMIT });
    await setApprovalThreshold(request, 'wholesale-bank', WHOLESALE_APPROVAL_THRESHOLD, 'wholesale_bank', 'wholesale_two');
    await setApprovalThreshold(request, 'retail-bank', RETAIL_APPROVAL_THRESHOLD, 'retail_bank', 'reviewer');
}

async function topUpReserve(api, stamp) {
    const { request } = await createApiClient(api);
    const topupAmount = '1000000000000';
    await registerBank(request, 'wholesale-bank', 'wholesale');
    await registerBank(request, 'retail-bank', 'retail');
  await request('bank_indonesia', 'POST', '/issuances', { distributor_id: 'wholesale-bank', amount: topupAmount }, `compliance-topup-wholesale-${stamp}`);
  await request('bank_indonesia', 'POST', '/issuances', { distributor_id: 'retail-bank', amount: topupAmount }, `compliance-topup-retail-${stamp}`);
    await configureParticipants(request);
}

async function prepareSubject(client, id, owner, { category = 'retail', risk = 'standard', pep = false, active = false, restricted = false, releaseRequested = false, recordReview = true } = {}) {
    await client.request(owner, 'POST', '/subjects', { subject_id: id, category });
    await client.request('reviewer', 'POST', `/subjects/${encodeURIComponent(id)}/endorsement-policies`);
    await client.request('senior', 'PUT', `/subjects/${encodeURIComponent(id)}/limits`, LIMITS);
    if (recordReview) await client.request('reviewer', 'POST', `/subjects/${encodeURIComponent(id)}/reviews`, { risk_level: risk, pep });
    if (active) {
        const decider = risk === 'high' || pep ? 'senior' : 'reviewer';
        await client.request(decider, 'POST', `/subjects/${encodeURIComponent(id)}/decisions`, { approved: true });
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
    for (const role of ['retail_bank']) {
        const pendingID = fixtureID(`protect-${role}`);
        await client.request('kyc_verified', 'POST', '/subjects', { subject_id: pendingID, category: 'retail' });
        protectSubjectByRole[role] = pendingID;

        const releaseID = fixtureID(`release-${role}`);
        await prepareSubject(client, releaseID, 'kyc_verified', { active: true, restricted: true, releaseRequested: true });
        releaseDecisionByRole[role] = releaseID;
    }
    const pendingStaffClientID = fixtureID('pending-staff');
    await client.request('bank_indonesia', 'POST', '/staff', { client_id: pendingStaffClientID });
    await topUpReserve(api, stamp);
    // Each approving role needs a pending transfer made by another officer of the same bank.
    const makers = {
        retail_bank: { maker: 'reviewer', from: 'retail-bank', to: 'wholesale-bank', amount: '1' },
        wholesale_bank: { maker: 'wholesale_two', from: 'wholesale-bank', to: 'retail-bank', amount: String(Number(WHOLESALE_APPROVAL_THRESHOLD) + 1) },
    };
    const pendingTransferByRoute = {};
    for (const action of ['approval', 'rejection']) {
        const byRole = {};
        for (const [role, { maker, from, to, amount }] of Object.entries(makers)) {
            const transferReference = fixtureID(`${action}-${role}`);
            await client.request(maker, 'POST', '/interbank-transfers', { from_distributor_id: from, to_distributor_id: to, amount }, transferReference);
            byRole[role] = transferReference;
        }
        pendingTransferByRoute[`/interbank-transfers/{reference}/${action}`] = byRole;
    }
    return { protectSubjectByRole, releaseDecisionByRole, pendingStaffClientID, pendingTransferByRoute };
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
    let apiUser = scenario.actor || owner;
    let args;
    const readOnly = scenario.operation_kind === 'query';
    const businessRepresentative = api.fixtureIds.businessRepresentative || 'synthetic-business-representative';
    const receiptReference = api.fixtureIds.receiptReference;

    switch (scenario.id) {
        case 'create-pending':
            body = { subject_id: id, category: 'retail' };
            args = [id, 'retail'];
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
            body = { risk_level: 'standard', pep: false };
            args = [id, 'standard', 'false'];
            break;
        case 'approve-standard':
            route = `/subjects/${encodeURIComponent(id)}/decisions`;
            body = { approved: true };
            args = [id, 'true'];
            break;
        case 'decide-high-risk':
            route = `/subjects/${encodeURIComponent(id)}/decisions`;
            body = { approved: true };
            args = [id, 'true'];
            break;
        case 'set-limits':
            route = `/subjects/${encodeURIComponent(id)}/limits`;
            body = LIMITS;
            args = [id, '1000', '5000', '20000', '5000'];
            break;
        case 'set-business-authority':
            route = `/subjects/${encodeURIComponent(id)}/business-authority`;
            body = { representatives: [businessRepresentative], beneficial_owner_refs: ['synthetic-owner-ref'] };
            args = [id, JSON.stringify(body.representatives), JSON.stringify(body.beneficial_owner_refs)];
            break;
        case 'freeze-subject':
            route = `/subjects/${encodeURIComponent(id)}/restrictions`;
            body = { reason_code: 'internal_review' };
            args = [id, 'internal_review'];
            break;
        case 'request-unfreeze': {
            route = `/subjects/${encodeURIComponent(id)}/restriction-release-requests`;
            const evidence = reference(stamp, attempt, scenario.id, 'caliper', index, 'release');
            body = { authority_evidence_ref: evidence };
            args = [id, evidence];
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
            body = { distributor_id: id, kind: 'retail', admission_ref: admissionRef(id) };
            args = [id, 'retail', admissionRef(id)];
            break;
        case 'issue':
            body = { distributor_id: 'wholesale-bank', amount: '1' };
            args = ['wholesale-bank', '1', ref];
            break;
        case 'redeem-reserve':
            body = { distributor_id: 'wholesale-bank', amount: '1' };
            args = ['wholesale-bank', '1', ref];
            break;
        case 'interbank-transfer':
            body = { from_distributor_id: 'wholesale-bank', to_distributor_id: 'retail-bank', amount: '1' };
            args = ['wholesale-bank', 'retail-bank', '1', ref];
            break;
        case 'interbank-transfer-pending':
            body = { from_distributor_id: 'retail-bank', to_distributor_id: 'wholesale-bank', amount: '1' };
            args = ['retail-bank', 'wholesale-bank', '1', ref];
            break;
        case 'approve-transfer':
        case 'reject-transfer':
            route = `/interbank-transfers/${encodeURIComponent(id)}/${scenario.id === 'approve-transfer' ? 'approval' : 'rejection'}`;
            args = [id];
            break;
        case 'propose-approval-threshold':
            route = '/distributors/wholesale-bank/approval-threshold-proposals';
            body = { amount: WHOLESALE_APPROVAL_THRESHOLD };
            args = ['wholesale-bank', WHOLESALE_APPROVAL_THRESHOLD];
            break;
        case 'set-participant-status':
            route = '/distributors/wholesale-bank/status';
            body = { status: 'active', reason_code: 'participation_policy' };
            args = ['wholesale-bank', 'active', 'participation_policy'];
            break;
        case 'set-transfer-limit':
            body = { amount: NO_TRANSFER_LIMIT };
            args = [NO_TRANSFER_LIMIT];
            break;
        case 'read-participant':
            route = '/distributors/wholesale-bank';
            args = ['wholesale-bank'];
            break;
        case 'can-send':
            args = ['retail-bank'];
            break;
        case 'read-transfer-limit':
            args = [];
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
            args = ['wholesale-bank'];
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
        case 'transfer-merchant':
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
    const idempotencyRequired = ['transfer-retail', 'transfer-merchant', 'issue', 'redeem-reserve', 'interbank-transfer', 'interbank-transfer-pending', 'convert-to-retail', 'fund-wallet'].includes(scenario.id);
    return {
        api: {
            user: apiUser,
            method,
            path: route,
            ...(body === undefined ? {} : { body }),
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
        },
    };
}

// Pooled profiles create subjects once per run and reuse them across rounds. A round uses pool entries [0, count) in
// order, so its entries are distinct; the next round reuses them only after the previous round has ended, so a
// transaction in flight never shares a key with the next round.
const POOLED_PROFILES = new Set(['retail-transfer-pair', 'merchant-transfer-pair', 'float-subject']);
const TOPUP_PROFILES = new Set(['monetary', 'pending-transfer', 'float-subject', 'retail-transfer-pair', 'merchant-transfer-pair']);
const SETUP_CONCURRENCY = 64;
const FUNDING_BATCH = 1024;
const SENDER_FUNDING = 200; // units per sender; each measured transfer moves 1 unit
const BANK_REFILL_MINIMUM = 10000000; // stays far below the 1e9 holdings and daily-usage limits
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
        const id = `pool-bank-${state.token}`;
        await prepareSubject(client, id, 'kyc_verified', { active: true });
        await client.request('kyc_verified', 'POST', '/customer-wallets', { subject_id: id });
        state.bank = { id, balance: 0, refills: 0 };
    }
    if (state.bank.balance < units) {
        const amount = Math.max(BANK_REFILL_MINIMUM, units);
        if (amount > 500000000) throw new Error('pool funding batch exceeds the holdings limit; reduce the pool batch size');
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

async function createPoolEntries(client, profile, state, indices) {
    return mapLimit(indices, SETUP_CONCURRENCY, async index => {
        const base = `pool-${profile}-${state.token}-${index}`;
        if (profile === 'float-subject') {
            const subject = `${base}-f`;
            await prepareSubject(client, subject, 'kyc_verified', { active: true });
            await client.request('kyc_verified', 'POST', '/customer-wallets', { subject_id: subject });
            return { subject, sender: subject, receiver: subject };
        }
        const sender = `${base}-s`;
        const receiver = `${base}-r`;
        const receiverOwner = profile === 'retail-transfer-pair' ? 'retail_two' : 'merchant';
        await prepareSubject(client, sender, 'kyc_verified', { active: true });
        await client.request('kyc_verified', 'POST', '/customer-wallets', { subject_id: sender });
        await prepareSubject(client, receiver, receiverOwner, { active: true });
        await client.request(receiverOwner, 'POST', '/customer-wallets', { subject_id: receiver });
        return { subject: sender, sender, receiver };
    });
}

async function ensurePool(client, profile, count, stamp) {
    const state = poolState(stamp, profile);
    const start = state.entries.length;
    if (start >= count) return state;
    const created = await createPoolEntries(client, profile, state, Array.from({ length: count - start }, (_, offset) => start + offset));
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
        const id = fixtureProfile === 'reuse-business-subject'
            ? smokeIds.businessSubject
            : fixtureProfile === 'reuse-payment-receipt'
                ? smokeIds.retailSubject
                : smokeIds.retailSubject;
        const fixture = operationFixture({ api, scenario: catalogScenario, id, index: 0, stamp, attempt });
        apiItems.push(fixture.api);
        ledgerItems.push(fixture.ledger);
    } else {
        if (TOPUP_PROFILES.has(fixtureProfile)) await topUpOnce(api, stamp);
        if (fixtureProfile === 'float-subject') await ensureFloat(client, stamp);
        if (POOLED_PROFILES.has(fixtureProfile)) await ensurePool(client, fixtureProfile, count, stamp);
        const independentSubjectSetup = [
            'protected-pending-subject', 'standard-review-subject', 'high-risk-review-subject',
            'active-subject', 'active-business-subject', 'restricted-subject', 'release-requested-subject',
            'float-subject', 'retail-transfer-pair', 'merchant-transfer-pair', 'pending-staff', 'protected-staff',
        ].includes(fixtureProfile);
        const sharesReserveKey = ['float-subject', 'retail-transfer-pair', 'merchant-transfer-pair', 'pending-transfer'].includes(fixtureProfile);
        const preparationConcurrency = independentSubjectSetup && !sharesReserveKey ? SETUP_CONCURRENCY : 1;
        const prepareOne = async index => {
            if (POOLED_PROFILES.has(fixtureProfile)) {
                const entry = poolState(stamp, fixtureProfile).entries[index];
                return operationFixture({ api, scenario: catalogScenario, id: entry.subject, index, stamp, attempt, owner: 'kyc_verified', from: entry.sender, to: entry.receiver });
            }
            const id = subjectID(stamp, attempt, catalogScenario.id, pathName, index, 'primary');
            let from;
            let to;
            const owner = catalogScenario.actor || 'kyc_verified';
            if (fixtureProfile === 'pending-subject') {
                await client.request('kyc_verified', 'POST', '/subjects', { subject_id: id, category: 'retail' });
            } else if (fixtureProfile === 'protected-pending-subject') {
                await prepareSubject(client, id, 'kyc_verified', { recordReview: false });
            } else if (fixtureProfile === 'standard-review-subject') {
                await prepareSubject(client, id, 'kyc_verified');
            } else if (fixtureProfile === 'high-risk-review-subject') {
                await prepareSubject(client, id, 'kyc_verified', { risk: 'high' });
            } else if (fixtureProfile === 'active-subject') {
                await prepareSubject(client, id, 'kyc_verified', { active: true });
            } else if (fixtureProfile === 'active-business-subject') {
                await prepareSubject(client, id, 'kyc_verified', { category: 'business', active: true });
            } else if (fixtureProfile === 'restricted-subject' || fixtureProfile === 'release-requested-subject') {
                await prepareSubject(client, id, 'kyc_verified', {
                    active: true,
                    restricted: true,
                    releaseRequested: fixtureProfile === 'release-requested-subject',
                });
            } else if (fixtureProfile === 'pending-staff' || fixtureProfile === 'protected-staff') {
                await client.request('bank_indonesia', 'POST', '/staff', { client_id: id });
                if (fixtureProfile === 'protected-staff') {
                    await client.request('bank_indonesia', 'POST', `/staff/${encodeURIComponent(id)}/endorsement-policies`);
                }
            } else if (fixtureProfile === 'pending-transfer') {
                // The measured actor (reviewer) is a different retail-bank officer from this maker.
                await client.request('retail_bank', 'POST', '/interbank-transfers', {
                    from_distributor_id: 'retail-bank', to_distributor_id: 'wholesale-bank', amount: '1',
                }, id);
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

module.exports = { fundingSchedule, operationFixture, prepareAccessMatrixFixtures, prepareFixturePool, SENDER_FUNDING, topUpReserve };
