'use strict';

const fs = require('node:fs');
const path = require('node:path');
const catalog = require('./case-catalog.json');

async function login(baseURL, credentials) {
    const response = await fetch(`${baseURL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials),
    });
    if (!response.ok) throw new Error(`login failed with HTTP ${response.status}`);
    const payload = await response.json();
    if (typeof payload.access_token !== 'string' || !payload.access_token) throw new Error('login returned no access token');
    return payload.access_token;
}

function routePath(route, subjectID, fixtureIds, apiFixtures, role) {
    const routeSubjectID = route.path === '/customer-wallets/{subject_id}/balance' && role === 'merchant'
        ? fixtureIds.merchantSubject || subjectID
        : route.path === '/subjects/{subject_id}/endorsement-policies'
            ? apiFixtures.protectSubjectByRole?.[role] || subjectID
            : route.path === '/subjects/{subject_id}/restriction-release-decisions'
                ? apiFixtures.releaseDecisionByRole?.[role] || subjectID
                : subjectID;
    const clientID = route.path === '/staff/{client_id}/endorsement-policies'
        ? apiFixtures.pendingStaffClientID || 'missing-staff-fixture'
        : 'missing-staff-fixture';
    return route.path
        .replace('{subject_id}', encodeURIComponent(routeSubjectID))
        .replace('{client_id}', encodeURIComponent(clientID))
        .replace('{distributor_id}', 'retail-bank');
}

async function readSubjectState(baseURL, token, subjectID) {
    const response = await fetch(`${baseURL}/subjects/${encodeURIComponent(subjectID)}`, {
        headers: { Authorization: `Bearer ${token}`, 'X-Compliance-Verification': 'true' },
    });
    if (!response.ok) throw new Error(`subject state verification failed with HTTP ${response.status}`);
    return response.json();
}

async function verifyStaffProtection(baseURL, token, clientID) {
    const response = await fetch(`${baseURL}/staff/${encodeURIComponent(clientID)}/role`, {
        method: 'PUT',
        headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json', 'X-Compliance-Verification': 'true' },
        body: JSON.stringify({ role: 'kyc_reviewer' }),
    });
    return response.status;
}

async function runAccessMatrix({ baseURL, roleUsers, subjectID, fixtureIds = {}, apiFixtures = {}, outputPath }) {
    const tokens = new Map();
    for (const role of catalog.application_roles) {
        if (role === 'public') continue;
        const credentials = roleUsers[role];
        if (!credentials) throw new Error(`missing synthetic login for application role ${role}`);
        tokens.set(role, await login(baseURL, credentials));
    }

    const results = [];
    for (const route of catalog.api_routes) {
        for (const role of catalog.application_roles) {
            const allowed = route.roles.includes(role);
            const headers = {};
            if (role !== 'public') headers.Authorization = `Bearer ${tokens.get(role)}`;
            const hasBody = route.json === true;
            if (hasBody) headers['Content-Type'] = 'application/json';
            try {
                const targetPath = routePath(route, subjectID, fixtureIds, apiFixtures, role);
                let stateBefore;
                let actionSubjectID;
                if (allowed && route.path === '/subjects/{subject_id}/endorsement-policies') {
                    actionSubjectID = apiFixtures.protectSubjectByRole?.[role];
                    if (!actionSubjectID) throw new Error(`missing protect-subject fixture for ${role}`);
                    stateBefore = await readSubjectState(baseURL, tokens.get(role), actionSubjectID);
                } else if (allowed && route.path === '/subjects/{subject_id}/restriction-release-decisions') {
                    actionSubjectID = apiFixtures.releaseDecisionByRole?.[role];
                    if (!actionSubjectID) throw new Error(`missing release-decision fixture for ${role}`);
                    stateBefore = await readSubjectState(baseURL, tokens.get(role), actionSubjectID);
                }
                const response = await fetch(`${baseURL}${targetPath}`, {
                    method: route.method,
                    headers,
                    ...(hasBody ? { body: '{}' } : {}),
                });
                const responseText = response.status >= 400 ? await response.text() : '';
                const reachedHandler = response.status !== 401 && response.status !== 403;
                const validationRejected = [400, 422].includes(response.status);
                const authorizationPassed = allowed ? reachedHandler
                    : role === 'public' ? response.status === 401 : response.status === 403;
                const validationClassification = !allowed || !hasBody ? 'not-applicable'
                    : validationRejected ? 'pass' : 'violation';
                let actionClassification = 'not-applicable';
                let actionExpected = 'not-applicable';
                let actionStateEffect = !allowed ? 'blocked-before-handler' : hasBody
                    ? validationRejected ? 'validation-rejected-before-service' : 'unverified-or-server-error'
                    : 'read-only';
                let actionEvidence;
                if (allowed && !hasBody) {
                    actionExpected = 'handler succeeds';
                    actionClassification = response.ok ? 'pass' : 'violation';
                    actionStateEffect = response.ok ? 'handler-succeeded' : 'unexpected-handler-error';

                    if (route.path === '/subjects/{subject_id}/endorsement-policies') {
                        const stateAfter = await readSubjectState(baseURL, tokens.get(role), actionSubjectID);
                        const applied = response.ok && stateBefore.status === 'pending' && !stateBefore.protected && stateAfter.protected;
                        actionExpected = 'pending subject becomes protected';
                        actionClassification = applied ? 'pass' : 'violation';
                        actionStateEffect = applied ? 'subject-protected' : 'subject-protection-unverified';
                        actionEvidence = { protected_before: stateBefore.protected, protected_after: stateAfter.protected };
                    } else if (route.path === '/subjects/{subject_id}/restriction-release-decisions') {
                        const stateAfter = await readSubjectState(baseURL, tokens.get(role), actionSubjectID);
                        const unchanged = JSON.stringify(stateBefore) === JSON.stringify(stateAfter);
                        if (role === 'retail_bank') {
                            const deniedWithoutMutation = response.status === 500 && unchanged;
                            actionExpected = 'staff-role denial leaves restriction unchanged';
                            actionClassification = deniedWithoutMutation ? 'pass' : 'violation';
                            actionStateEffect = deniedWithoutMutation ? 'expected-denial-state-unchanged' : 'denial-state-unverified';
                        } else {
                            const released = response.ok && stateBefore.restricted && !stateAfter.restricted && Boolean(stateAfter.senior_id);
                            actionExpected = 'authorized senior releases requested restriction';
                            actionClassification = released ? 'pass' : 'violation';
                            actionStateEffect = released ? 'restriction-released' : 'release-effect-unverified';
                        }
                        actionEvidence = { restricted_before: stateBefore.restricted, restricted_after: stateAfter.restricted, unchanged };
                    } else if (route.path === '/staff/{client_id}/endorsement-policies') {
                        const verificationStatus = await verifyStaffProtection(baseURL, tokens.get(role), apiFixtures.pendingStaffClientID);
                        const protectedStaff = response.ok && verificationStatus < 400;
                        actionExpected = 'pending staff can receive a role after protection';
                        actionClassification = protectedStaff ? 'pass' : 'violation';
                        actionStateEffect = protectedStaff ? 'staff-protection-verified' : 'staff-protection-unverified';
                        actionEvidence = { verification_status: verificationStatus };
                    } else if (route.path === '/monetary-initializations') {
                        const unchanged = apiFixtures.initializationReplayStateUnchanged === true;
                        const duplicateDeniedWithoutMutation = response.status === 500 && unchanged;
                        actionExpected = 'duplicate initialization is denied without state change';
                        actionClassification = duplicateDeniedWithoutMutation ? 'pass' : 'violation';
                        actionStateEffect = duplicateDeniedWithoutMutation ? 'expected-denial-state-unchanged' : 'initialization-replay-unverified';
                        actionEvidence = { state_unchanged_verified_by_ledger_smoke: unchanged };
                    }
                }
                const passed = authorizationPassed && validationClassification !== 'violation'
                    && !['violation', 'unresolved'].includes(actionClassification);
                results.push({
                    method: route.method,
                    path: route.path,
                    role,
                    expected: allowed ? 'handler reached' : role === 'public' ? '401' : '403',
                    status: response.status,
                    state_effect: !allowed ? 'blocked-before-handler' : actionStateEffect,
                    diagnostic: responseText.replace(/\s+/g, ' ').replace(/Bearer\s+\S+/ig, 'Bearer [redacted]').slice(0, 500),
                    authorization_classification: authorizationPassed ? 'pass' : 'violation',
                    validation_classification: validationClassification,
                    action_expected: actionExpected,
                    action_classification: actionClassification,
                    ...(actionEvidence ? { action_evidence: actionEvidence } : {}),
                    classification: passed ? 'pass' : 'violation',
                });
            } catch (error) {
                results.push({
                    method: route.method,
                    path: route.path,
                    role,
                    expected: allowed ? 'handler reached' : role === 'public' ? '401' : '403',
                    status: null,
                    state_effect: 'unresolved',
                    diagnostic: error.message,
                    authorization_classification: 'unresolved',
                    validation_classification: hasBody && allowed ? 'unresolved' : 'not-applicable',
                    action_classification: allowed && !hasBody ? 'unresolved' : 'not-applicable',
                    classification: 'unresolved',
                });
            }
        }
    }

    const summary = {
        schema_version: 2,
        routes: catalog.api_routes.length,
        roles: catalog.application_roles.length,
        cells: results.length,
        allowed: results.filter(result => result.expected === 'handler reached').length,
        denied: results.filter(result => result.expected !== 'handler reached').length,
        passed: results.filter(result => result.classification === 'pass').length,
        violations: results.filter(result => result.classification === 'violation').length,
        unresolved: results.filter(result => result.classification === 'unresolved').length,
        authorization_passed: results.filter(result => result.authorization_classification === 'pass').length,
        authorization_violations: results.filter(result => result.authorization_classification === 'violation').length,
        validation_cells: results.filter(result => result.validation_classification !== 'not-applicable').length,
        validation_passed: results.filter(result => result.validation_classification === 'pass').length,
        validation_violations: results.filter(result => result.validation_classification === 'violation').length,
        validation_unresolved: results.filter(result => result.validation_classification === 'unresolved').length,
        action_cells: results.filter(result => result.action_classification !== 'not-applicable').length,
        action_passed: results.filter(result => result.action_classification === 'pass').length,
        action_violations: results.filter(result => result.action_classification === 'violation').length,
        action_unresolved: results.filter(result => result.action_classification === 'unresolved').length,
        results,
    };
    fs.writeFileSync(outputPath, `${JSON.stringify(summary, null, 2)}\n`);
    return summary;
}

if (require.main === module) {
    const baseURL = process.env.COMPLIANCE_API_BASE;
    const roleUsersPath = process.env.COMPLIANCE_ROLE_USERS_FILE;
    const subjectID = process.env.COMPLIANCE_SUBJECT_ID;
    const outputPath = process.env.COMPLIANCE_ACCESS_MATRIX_OUTPUT;
    if (!baseURL || !roleUsersPath || !subjectID || !outputPath) {
        throw new Error('set COMPLIANCE_API_BASE, COMPLIANCE_ROLE_USERS_FILE, COMPLIANCE_SUBJECT_ID, and COMPLIANCE_ACCESS_MATRIX_OUTPUT');
    }
    const roleUsers = JSON.parse(fs.readFileSync(path.resolve(roleUsersPath), 'utf8'));
    runAccessMatrix({ baseURL, roleUsers, subjectID, outputPath })
        .then(summary => console.log(JSON.stringify({ cells: summary.cells, passed: summary.passed, authorization_passed: summary.authorization_passed, validation_passed: summary.validation_passed, action_passed: summary.action_passed, violations: summary.violations, unresolved: summary.unresolved, allowed: summary.allowed, denied: summary.denied })))
        .catch(error => { console.error(error.message); process.exitCode = 1; });
}

module.exports = { login, runAccessMatrix };
