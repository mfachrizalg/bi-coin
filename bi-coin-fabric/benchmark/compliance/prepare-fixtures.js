'use strict';

const crypto = require('node:crypto');
const fs = require('node:fs');
const path = require('node:path');
const { login } = require('./http-access-matrix');

const LIMITS = { per_transaction: '1000000000', daily: '1000000000', monthly: '1000000000', holdings: '1000000000' };

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

async function registerBank(request, distributorID, kind) {
    // A repeated registration is rejected; the issuance that follows fails if the bank is still unregistered.
    await request('bank_indonesia', 'POST', '/distributors', { distributor_id: distributorID, kind }).catch(() => {});
}

async function topUpReserve(api, stamp) {
    const { request } = await createApiClient(api);
    const topupAmount = '1000000000000';
    await registerBank(request, 'wholesale-bank', 'wholesale');
    await registerBank(request, 'retail-bank', 'retail');
  await request('bank_indonesia', 'POST', '/issuances', { distributor_id: 'wholesale-bank', amount: topupAmount }, `compliance-topup-wholesale-${stamp}`);
  await request('bank_indonesia', 'POST', '/issuances', { distributor_id: 'retail-bank', amount: topupAmount }, `compliance-topup-retail-${stamp}`);
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

async function openAndFund(client, subject, owner, stamp, attempt, scenario, pathName, index) {
  await client.request(owner, 'POST', '/customer-wallets', { subject_id: subject });
  await client.request('reviewer', 'POST', '/conversions', {
        distributor_id: 'retail-bank', amount: '1000',
    }, reference(stamp, attempt, scenario, pathName, index, 'prepare-convert'));
  await client.request('reviewer', 'POST', '/wallet-fundings', {
        subject_id: subject, distributor_id: 'retail-bank', amount: '1000',
    }, reference(stamp, attempt, scenario, pathName, index, 'prepare-fund'));
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
    return { protectSubjectByRole, releaseDecisionByRole, pendingStaffClientID };
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
            body = { distributor_id: id, kind: 'retail' };
            args = [id, 'retail'];
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
    const idempotencyRequired = ['transfer-retail', 'transfer-merchant', 'issue', 'redeem-reserve', 'interbank-transfer', 'convert-to-retail', 'fund-wallet'].includes(scenario.id);
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
        if (['monetary', 'float-subject', 'retail-transfer-pair', 'merchant-transfer-pair'].includes(fixtureProfile)) {
            await topUpReserve(api, stamp);
        }
        const independentSubjectSetup = [
            'protected-pending-subject', 'standard-review-subject', 'high-risk-review-subject',
            'active-subject', 'active-business-subject', 'restricted-subject', 'release-requested-subject',
            'float-subject', 'retail-transfer-pair', 'merchant-transfer-pair', 'pending-staff', 'protected-staff',
        ].includes(fixtureProfile);
        const sharesReserveKey = ['float-subject', 'retail-transfer-pair', 'merchant-transfer-pair'].includes(fixtureProfile);
        const preparationConcurrency = independentSubjectSetup && !sharesReserveKey ? 8 : 1;
        const prepareOne = async index => {
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
            } else if (fixtureProfile === 'float-subject') {
                await prepareSubject(client, id, 'kyc_verified', { active: true });
                await client.request('kyc_verified', 'POST', '/customer-wallets', { subject_id: id });
                await client.request('reviewer', 'POST', '/conversions', {
                    distributor_id: 'retail-bank', amount: '1000',
                }, reference(stamp, attempt, catalogScenario.id, pathName, index, 'prepare-convert'));
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
            } else if (fixtureProfile === 'retail-transfer-pair' || fixtureProfile === 'merchant-transfer-pair') {
                await prepareSubject(client, id, 'kyc_verified', { active: true });
                await openAndFund(client, id, 'kyc_verified', stamp, attempt, catalogScenario.id, pathName, index);
                const receiverOwner = fixtureProfile === 'retail-transfer-pair' ? 'retail_two' : 'merchant';
                to = subjectID(stamp, attempt, catalogScenario.id, pathName, index, 'receiver');
                await prepareSubject(client, to, receiverOwner, { active: true });
                await openAndFund(client, to, receiverOwner, stamp, attempt, catalogScenario.id, pathName, index + count);
                from = id;
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

module.exports = { operationFixture, prepareAccessMatrixFixtures, prepareFixturePool, topUpReserve };
