'use strict';

const crypto = require('node:crypto');
const fs = require('node:fs');
const path = require('node:path');
const { runHTTPWindow } = require('./http-load');
const { runLedgerWindow } = require('./direct-ledger-load');
const { chooseTiming } = require('./timing-analysis');
const catalog = require('./case-catalog.json');

function transferFixtures({ fixtureIds, api, repetition, pathName, attempt, count = 150 * catalog.protocol.timing_load_ops_per_second }) {
    const apiItems = [];
    const ledgerItems = [];
    const pairs = [
        { from: fixtureIds.retailSubject, to: fixtureIds.merchantSubject, user: 'kyc_verified' },
        { from: fixtureIds.secondRetailSubject, to: fixtureIds.secondMerchantSubject, user: 'retail_two' },
    ];
    for (let index = 0; index < count; index += 1) {
        const pair = pairs[index % pairs.length];
        const from = pair.from;
        const to = pair.to;
        const userKey = pair.user;
        const identityKey = api.namedUsers[userKey].username;
        const reference = `timing-${attempt}-${pathName}-${repetition}-${index}`;
        apiItems.push({
            user: userKey,
            method: 'POST',
      path: '/retail-transfers',
            body: { from, to, amount: '1' },
            headers: { 'Idempotency-Key': reference },
        });
        ledgerItems.push({
            identity: identityKey,
            chaincode: 'rupiah-payments',
            transaction: 'Transfer',
            args: [from, to, '1', reference],
        });
    }
    return { api: { items: apiItems }, ledger: { items: ledgerItems } };
}

async function runTimingCheck({ api, fixtureIds, outputDirectory }) {
    const tracesByPath = { api: [], ledger: [] };
    const runSummaries = [];
    const attempt = crypto.randomBytes(6).toString('hex');
    const timingRoot = path.join(outputDirectory, 'timing-check', `attempt-${attempt}`);
    fs.mkdirSync(timingRoot, { recursive: true });
    for (const pathName of ['api', 'ledger']) {
        for (let repetition = 1; repetition <= 3; repetition += 1) {
            const fixtures = transferFixtures({ fixtureIds, api, repetition, pathName, attempt });
            const result = pathName === 'api'
                ? await runHTTPWindow({
                    baseURL: api.baseURL,
                    users: api.namedUsers,
                    fixtures: fixtures.api,
                    scenario: `timing-transfer-${pathName}-${repetition}`,
                    rate: catalog.protocol.timing_load_ops_per_second,
                    durationSeconds: 150,
                })
                : await runLedgerWindow({
                    identities: Object.fromEntries(api.identities.map(identity => [identity.username, identity])),
                    fixtures: fixtures.ledger,
                    scenario: `timing-transfer-${pathName}-${repetition}`,
                    rate: catalog.protocol.timing_load_ops_per_second,
                    durationSeconds: 150,
                });
            const { request_trace: trace, ...summary } = result;
            const prefix = path.join(timingRoot, `${pathName}-rep${repetition}`);
            fs.writeFileSync(`${prefix}.jsonl`, `${trace.map(item => JSON.stringify(item)).join('\n')}\n`);
            fs.writeFileSync(`${prefix}.json`, `${JSON.stringify(summary, null, 2)}\n`);
            tracesByPath[pathName].push(trace);
            runSummaries.push(summary);
        }
    }
    const decision = chooseTiming(tracesByPath);
    if (runSummaries.some(summary => summary.failed_after_drain > 0 || summary.fixture_exhausted)) {
        decision.classification = 'inconclusive';
        decision.selected = { ...decision.reference };
        decision.reason = 'timing traces contained failed requests or exhausted fixtures';
    }
    const report = {
        schema_version: 1,
        attempt,
        load_ops_per_second: catalog.protocol.timing_load_ops_per_second,
        repetitions_per_path: 3,
        trace_duration_seconds: 150,
        decision,
        runs: runSummaries,
        note: 'Fixed-duration timing comparison is an engineering sensitivity check, not a steady-state guarantee.',
    };
    fs.writeFileSync(path.join(outputDirectory, 'timing-check', 'timing.json'), `${JSON.stringify(report, null, 2)}\n`);
    return report;
}

module.exports = { runTimingCheck, transferFixtures };
