'use strict';

const fs = require('node:fs');
const path = require('node:path');
const { login } = require('./http-access-matrix');
const { runFixedWindow } = require('./load-common');

async function runHTTPWindow({ baseURL, users, fixtures, scenario, rate, durationSeconds, timeoutMs = 30000, tokenCache = new Map() }) {
    const tokens = tokenCache;
    for (const userKey of new Set(fixtures.items.map(item => item.user))) {
        const user = users[userKey];
        if (!user) throw new Error(`fixture references missing API user ${userKey}`);
        if (!tokens.has(userKey)) tokens.set(userKey, await login(baseURL, user));
    }
    return runFixedWindow({
        scenario,
        path: 'api',
        rate,
        durationSeconds,
        fixtures,
        execute: async fixture => {
            const headers = { ...(fixture.headers || {}) };
            if (fixture.user) headers.Authorization = `Bearer ${tokens.get(fixture.user)}`;
            if (fixture.body !== undefined) headers['Content-Type'] = 'application/json';
            const response = await fetch(new URL(fixture.path, baseURL), {
                method: fixture.method,
                headers,
                ...(fixture.body === undefined ? {} : { body: JSON.stringify(fixture.body) }),
                signal: AbortSignal.timeout(timeoutMs),
            });
            let errorMessage;
            if (response.ok) await response.arrayBuffer();
            else errorMessage = (await response.text()).slice(0, 256);
            return { ok: response.ok, status: response.status, errorKind: response.ok ? undefined : `http_${response.status}`, errorMessage };
        },
    });
}

async function main() {
    const fixturePath = process.env.COMPLIANCE_FIXTURES_FILE;
    const scenario = process.env.COMPLIANCE_SCENARIO;
    const outputPath = process.env.COMPLIANCE_RUN_OUTPUT;
    const tracePath = process.env.COMPLIANCE_TRACE_OUTPUT;
    if (!fixturePath || !scenario || !outputPath || !process.env.COMPLIANCE_API_BASE || !process.env.COMPLIANCE_ROLE_USERS_JSON) {
        throw new Error('set COMPLIANCE_FIXTURES_FILE, COMPLIANCE_SCENARIO, COMPLIANCE_RUN_OUTPUT, COMPLIANCE_API_BASE, and COMPLIANCE_ROLE_USERS_JSON');
    }
    const fixtureDocument = JSON.parse(fs.readFileSync(path.resolve(fixturePath), 'utf8'));
    const fixtures = fixtureDocument.api[scenario];
    if (!fixtures) throw new Error(`no API fixtures for ${scenario}`);
    const result = await runHTTPWindow({
        baseURL: process.env.COMPLIANCE_API_BASE,
        users: JSON.parse(process.env.COMPLIANCE_ROLE_USERS_JSON),
        fixtures,
        scenario,
        rate: Number(process.env.COMPLIANCE_RATE),
        durationSeconds: Number(process.env.COMPLIANCE_DURATION_SECONDS),
    });
    const { request_trace: trace, ...summary } = result;
    fs.mkdirSync(path.dirname(path.resolve(outputPath)), { recursive: true });
    fs.writeFileSync(path.resolve(outputPath), `${JSON.stringify(summary, null, 2)}\n`);
    if (tracePath) fs.writeFileSync(path.resolve(tracePath), `${trace.map(record => JSON.stringify(record)).join('\n')}\n`);
    console.log(JSON.stringify({ scenario: summary.scenario, path: summary.path, offered: summary.offered, completed: summary.completed_in_window, failed: summary.failed_after_drain, fixture_exhausted: summary.fixture_exhausted }));
}

if (require.main === module) {
    main().catch(error => { console.error(error.message); process.exitCode = 1; });
}

module.exports = { runHTTPWindow };
