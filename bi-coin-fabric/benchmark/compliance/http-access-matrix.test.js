'use strict';

const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const test = require('node:test');

const catalog = require('./case-catalog.json');
const { runAccessMatrix } = require('./http-access-matrix');

test('API matrix separates route authorization from JSON validation and selects per-role fixtures', async t => {
    const directory = fs.mkdtempSync(path.join(os.tmpdir(), 'api-access-matrix-'));
    t.after(() => fs.rmSync(directory, { recursive: true, force: true }));

    const roleUsers = Object.fromEntries(catalog.application_roles
        .filter(role => role !== 'public')
        .map(role => [role, { username: role, password: 'test-password' }]));
    const requests = [];
    const apiFixtures = {
        protectSubjectByRole: { retail_bank: 'protect-bank' },
        releaseDecisionByRole: { retail_bank: 'release-bank' },
        revokeLowRiskByRole: { retail_bank: 'revoke-bank' },
        pendingStaffClientID: 'pending-staff-client',
        initializationReplayStateUnchanged: true,
    };
    const subjectStates = new Map([
        ['protect-bank', { status: 'pending', protected: false }],
        ['release-bank', { status: 'active', protected: true, restricted: true, unfreeze_approver_id: '' }],
        ['revoke-bank', { status: 'active', protected: true, low_risk: true }],
    ]);
    const originalFetch = global.fetch;
    global.fetch = async (input, init = {}) => {
        const url = new URL(input);
        if (url.pathname === '/auth/login') {
            const { username } = JSON.parse(init.body);
            return { ok: true, status: 200, json: async () => ({ access_token: `token-${username}` }) };
        }

        const role = init.headers?.Authorization?.replace('Bearer token-', '') || 'public';
        if (init.headers?.['X-Compliance-Verification'] === 'true') {
            if (!init.method || init.method === 'GET') {
                const id = decodeURIComponent(url.pathname.split('/').at(-1));
                return { ok: true, status: 200, json: async () => structuredClone(subjectStates.get(id)) };
            }
            return { ok: true, status: 204, text: async () => '' };
        }
        const route = catalog.api_routes.find(candidate => candidate.method === init.method
            && candidate.path
                .replace('{subject_id}', candidate.path === '/subjects/{subject_id}/endorsement-policies'
                    ? apiFixtures.protectSubjectByRole[role] || 'retail-subject'
                    : candidate.path === '/subjects/{subject_id}/restriction-release-decisions'
                        ? apiFixtures.releaseDecisionByRole[role] || 'retail-subject'
                        : candidate.path === '/subjects/{subject_id}/low-risk-revocations'
                            ? apiFixtures.revokeLowRiskByRole[role] || 'retail-subject'
                            : 'retail-subject')
                .replace('{alert_id}', 'missing-alert-fixture')
                .replace('{client_id}', candidate.path === '/staff/{client_id}/endorsement-policies'
                    ? apiFixtures.pendingStaffClientID : 'missing-staff-fixture')
                .replace('{distributor_id}', 'retail-bank') === url.pathname);
        assert.ok(route, `unexpected request ${init.method} ${url.pathname}`);
        const allowed = route.roles.includes(role);
        const subjectID = decodeURIComponent(url.pathname.split('/')[2] || '');
        let status = allowed ? route.json ? 422 : 204 : role === 'public' ? 401 : 403;
        if (allowed && route.path === '/subjects/{subject_id}/restriction-release-decisions' && role === 'retail_bank') status = 500;
        if (allowed && route.path === '/subjects/{subject_id}/low-risk-revocations' && role === 'retail_bank') status = 500;
        if (allowed && route.path === '/monitoring-alerts/{alert_id}/confirmations') status = 404;
        if (allowed && route.path === '/monetary-initializations' && role === 'bank_indonesia') status = 500;
        if (allowed && route.path === '/subjects/{subject_id}/endorsement-policies' && status < 400) {
            subjectStates.get(subjectID).protected = true;
        }
        requests.push({ route, role, url, init });
        return { ok: status < 400, status, text: async () => 'validation error' };
    };

    try {
        const summary = await runAccessMatrix({
            baseURL: 'http://api.test',
            roleUsers,
            subjectID: 'retail-subject',
            apiFixtures,
            outputPath: path.join(directory, 'matrix.json'),
        });
        const expectedValidationCells = catalog.api_routes
            .filter(route => route.json)
            .reduce((count, route) => count + route.roles.length, 0);

        assert.equal(summary.cells, catalog.api_routes.length * catalog.application_roles.length);
        assert.equal(summary.authorization_passed, summary.cells, JSON.stringify(
            summary.results.filter(result => result.authorization_classification !== 'pass'), null, 2,
        ));
        assert.equal(summary.validation_cells, expectedValidationCells);
        assert.equal(summary.validation_passed, expectedValidationCells);
        assert.equal(summary.action_cells, summary.action_passed);
        assert.equal(summary.action_unresolved, 0);
        assert.ok(requests.filter(request => !request.route.json).every(request => request.init.body === undefined));
        assert.ok(requests.filter(request => request.route.json).every(request => request.init.body === '{}'));

        const revocation = requests.find(request => request.role === 'retail_bank'
            && request.route.path === '/subjects/{subject_id}/low-risk-revocations');
        assert.equal(revocation.url.pathname, '/subjects/revoke-bank/low-risk-revocations');
    } finally {
        global.fetch = originalFetch;
    }
});
