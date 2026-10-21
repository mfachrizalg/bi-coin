'use strict';

const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const test = require('node:test');

const catalog = require('./case-catalog.json');
const { runAccessMatrix } = require('./http-access-matrix');

test('API matrix separates route authorization from JSON validation and selects merchant fixtures', async t => {
    const directory = fs.mkdtempSync(path.join(os.tmpdir(), 'api-access-matrix-'));
    t.after(() => fs.rmSync(directory, { recursive: true, force: true }));

    const roleUsers = Object.fromEntries(catalog.application_roles
        .filter(role => role !== 'public')
        .map(role => [role, { username: role, password: 'test-password' }]));
    const requests = [];
    const apiFixtures = {
        protectSubjectByRole: { retail_bank: 'protect-bank' },
        releaseDecisionByRole: { retail_bank: 'release-bank' },
        pendingStaffClientID: 'pending-staff-client',
        initializationReplayStateUnchanged: true,
        pendingTransferByRoute: {
            '/interbank-transfers/{reference}/approval': { retail_bank: 'approve-retail', wholesale_bank: 'approve-wholesale' },
            '/interbank-transfers/{reference}/rejection': { retail_bank: 'reject-retail', wholesale_bank: 'reject-wholesale' },
        },
    };
    const subjectStates = new Map([
        ['protect-bank', { status: 'pending', protected: false }],
        ['release-bank', { status: 'active', protected: true, restricted: true, senior_id: '' }],
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
                .replace('{subject_id}', candidate.path === '/customer-wallets/{subject_id}/balance' && role === 'merchant'
                    ? 'merchant-subject'
                    : candidate.path === '/subjects/{subject_id}/endorsement-policies'
                        ? apiFixtures.protectSubjectByRole[role] || 'retail-subject'
                        : candidate.path === '/subjects/{subject_id}/restriction-release-decisions'
                            ? apiFixtures.releaseDecisionByRole[role] || 'retail-subject'
                            : 'retail-subject')
                .replace('{client_id}', candidate.path === '/staff/{client_id}/endorsement-policies'
                    ? apiFixtures.pendingStaffClientID : 'missing-staff-fixture')
                .replace('{distributor_id}', 'retail-bank')
                .replace('{reference}', apiFixtures.pendingTransferByRoute[candidate.path]?.[role] || 'missing-transfer-fixture') === url.pathname);
        assert.ok(route, `unexpected request ${init.method} ${url.pathname}`);
        const allowed = route.roles.includes(role);
        const subjectID = decodeURIComponent(url.pathname.split('/')[2] || '');
        let status = allowed ? route.json ? 422 : 204 : role === 'public' ? 401 : 403;
        if (allowed && route.path === '/subjects/{subject_id}/restriction-release-decisions' && role === 'retail_bank') status = 500;
        if (allowed && route.path === '/monetary-initializations' && role === 'bank_indonesia') status = 500;
        if (allowed && route.path === '/subjects/{subject_id}/endorsement-policies' && status < 400) {
            subjectStates.get(subjectID).protected = true;
        }
        requests.push({ route, role, url, init });
        if (allowed && route.path.startsWith('/interbank-transfers/{reference}/')) {
            const decided = route.path.endsWith('/approval') ? 'executed' : 'rejected';
            return { ok: true, status: 200, json: async () => ({ status: decided, maker_id: 'maker', checker_id: 'checker' }) };
        }
        return { ok: status < 400, status, text: async () => 'validation error' };
    };

    try {
        const summary = await runAccessMatrix({
            baseURL: 'http://api.test',
            roleUsers,
            subjectID: 'retail-subject',
            fixtureIds: { merchantSubject: 'merchant-subject' },
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

        const approval = requests.find(request => request.role === 'wholesale_bank'
            && request.route.path === '/interbank-transfers/{reference}/approval');
        assert.equal(approval.url.pathname, '/interbank-transfers/approve-wholesale/approval');

        const merchantBalance = requests.find(request => request.role === 'merchant'
            && request.route.path === '/customer-wallets/{subject_id}/balance');
        assert.equal(merchantBalance.url.pathname, '/customer-wallets/merchant-subject/balance');
    } finally {
        global.fetch = originalFetch;
    }
});
