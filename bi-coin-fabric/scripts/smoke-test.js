'use strict';

const crypto = require('node:crypto');
const { spawnSync } = require('node:child_process');
const { assertStateUnchanged } = require('../benchmark/compliance/outcome-analysis');
const catalog = require('../benchmark/compliance/case-catalog.json');

const LEDGER_SCENARIO_IDS = catalog.correctness_scenarios.filter(item => item.executor === 'ledger-smoke').map(item => item.id);
let caseResults = [];

const channel = 'bi-coin';
const cliContainer = 'bi-coin-cli';
// The network runs three Raft orderers (orderer0..2); submissions go through orderer0.
const ordererHost = 'orderer0.centralbank.bi-coin';
const ordererTls = '/network/organizations/ordererOrganizations/centralbank.bi-coin/orderers/orderer0.centralbank.bi-coin/tls/ca.crt';
const orgs = {
    centralbank: { msp: 'CentralBankMSP', domain: 'centralbank.bi-coin', peer: 'peer0.centralbank.bi-coin:7051' },
    distributor: { msp: 'DistributorMSP', domain: 'distributor.bi-coin', peer: 'peer0.distributor.bi-coin:7051' },
    validator: { msp: 'ValidatorMSP', domain: 'validator.bi-coin', peer: 'peer0.validator.bi-coin:7051' },
    enduser: { msp: 'EndUserMSP', domain: 'enduser.bi-coin', peer: 'peer0.enduser.bi-coin:7051' },
};
// cddCollection is held by CentralBank, Distributor, and Validator. The deployed policies need CentralBank and Distributor to endorse.
const MEMBER_ENDORSERS = ['centralbank', 'distributor'];
// EndUser peers hold no PDC, so PDC-backed reads made with an EndUser identity go to this member peer.
const MEMBER_PEER = 'distributor';

function fail(message) {
    throw new Error(message);
}

function recordCase(id, passed, evidence = {}) {
    if (!LEDGER_SCENARIO_IDS.includes(id)) fail(`uncatalogued compliance scenario ${id}`);
    if (caseResults.some(item => item.id === id)) fail(`compliance scenario recorded twice: ${id}`);
    if (!passed) fail(`compliance scenario failed: ${id}`);
    caseResults.push({ id, status: 'pass', evidence });
}

function ledgerSnapshot(wallets = []) {
    const balances = {};
    for (const [orgName, userName, subjectID] of wallets) {
        balances[subjectID] = query(orgName, userName, 'rupiah-payments', 'GetBalance', [subjectID], MEMBER_PEER);
    }
    return {
        balances,
        retailReserve: query('centralbank', 'Admin', 'rupiah-monetary', 'GetReserve', ['retail-bank']),
        retailFloat: query('centralbank', 'Admin', 'rupiah-payments', 'GetRetailFloat', ['retail-bank']),
        wholesaleSupply: query('centralbank', 'Admin', 'rupiah-monetary', 'GetWholesaleSupply'),
        retailSupply: query('centralbank', 'Admin', 'rupiah-monetary', 'GetRetailSupply'),
        supply: query('centralbank', 'Admin', 'rupiah-monetary', 'GetTotalSupply'),
    };
}

function identity(orgName, userName) {
    const org = orgs[orgName];
    if (!org) fail(`unknown org ${orgName}`);
    const userDir = `/network/organizations/peerOrganizations/${org.domain}/users/${userName}@${org.domain}/msp`;
    const cert = orgName === 'centralbank'
        ? `${userDir}/signcerts/cert.pem`
        : `${userDir}/signcerts/${userName}@${org.domain}-cert.pem`;
    const key = orgName === 'centralbank'
        ? `/network/organizations/peerOrganizations/${org.domain}/users/${userName}@${org.domain}/msp/keystore`
        : `${userDir}/keystore/priv_sk`;
    return { ...org, cert, key, userDir };
}

// The signing identity comes from orgName and userName. The peer comes from peerOrgName.
function dockerPeer(orgName, userName, command, args, peerOrgName = orgName) {
    const id = identity(orgName, userName);
    const target = orgs[peerOrgName];
    if (!target) fail(`unknown peer org ${peerOrgName}`);
    const env = [
        '-e', `CORE_PEER_LOCALMSPID=${id.msp}`,
        '-e', `CORE_PEER_ADDRESS=${target.peer}`,
        '-e', `CORE_PEER_TLS_ROOTCERT_FILE=/network/organizations/peerOrganizations/${target.domain}/peers/peer0.${target.domain}/tls/ca.crt`,
        '-e', `CORE_PEER_MSPCONFIGPATH=${id.userDir}`,
        '-e', 'CORE_PEER_TLS_ENABLED=true',
        '-e', 'FABRIC_CFG_PATH=/etc/hyperledger/fabric',
    ];
    const result = spawnSync('docker', ['exec', ...env, cliContainer, 'peer', ...command, ...args], {
        encoding: 'utf8',
        timeout: 120000,
    });
    return {
        status: result.status,
        stdout: (result.stdout || '').trim(),
        stderr: (result.stderr || '').trim(),
        error: result.error,
    };
}

function endorseArgs(endorsers) {
    return endorsers.flatMap(name => {
        const org = orgs[name];
        return [
            '--peerAddresses', org.peer,
            '--tlsRootCertFiles', `/network/organizations/peerOrganizations/${org.domain}/peers/peer0.${org.domain}/tls/ca.crt`,
        ];
    });
}

// The peer CLI takes --transient as JSON with base64 values. Private bytes never go into proposal arguments.
function transientArgs(transient) {
    if (!transient) return [];
    const encoded = Object.fromEntries(Object.entries(transient).map(([key, value]) => [key, Buffer.from(value).toString('base64')]));
    return ['--transient', JSON.stringify(encoded)];
}

function payloadTransient(contents) {
    return { payload: JSON.stringify(contents) };
}

function invoke(orgName, userName, chaincode, functionName, args, endorsers, transient) {
    const proposal = JSON.stringify({ function: functionName, Args: args.map(String) });
    const result = dockerPeer(orgName, userName, ['chaincode', 'invoke'], [
        '-o', `${ordererHost}:7050`,
        '--ordererTLSHostnameOverride', ordererHost,
        '--tls', '--cafile', ordererTls,
        '--channelID', channel,
        '--name', chaincode,
        ...endorseArgs(endorsers),
        ...transientArgs(transient),
        '--ctor', proposal,
        '--waitForEvent',
        '--waitForEventTimeout', '2m',
    ]);
    if (result.error || result.status !== 0) {
        fail(`${chaincode}.${functionName} failed: ${(result.error && result.error.message) || result.stderr || result.stdout}`);
    }
    return result;
}

function invokeAllowError(orgName, userName, chaincode, functionName, args, endorsers, expected) {
    try {
        return invoke(orgName, userName, chaincode, functionName, args, endorsers);
    } catch (error) {
        if (!error.message.includes(expected)) throw error;
        return null;
    }
}

function expectRejected(orgName, userName, chaincode, functionName, args, endorsers, transient) {
    const proposal = JSON.stringify({ function: functionName, Args: args.map(String) });
    const result = dockerPeer(orgName, userName, ['chaincode', 'invoke'], [
        '-o', `${ordererHost}:7050`,
        '--ordererTLSHostnameOverride', ordererHost,
        '--tls', '--cafile', ordererTls,
        '--channelID', channel,
        '--name', chaincode,
        ...endorseArgs(endorsers),
        ...transientArgs(transient),
        '--ctor', proposal,
        '--waitForEvent',
        '--waitForEventTimeout', '30s',
    ]);
    if (result.error) fail(`expected ${chaincode}.${functionName} endorsement rejection: ${result.error.message}`);
    if (result.status === 0 && /committed with status \(VALID\)/.test(`${result.stdout}\n${result.stderr}`)) {
        fail(`${chaincode}.${functionName} unexpectedly committed with ${endorsers.join('+')} endorsements`);
    }
    return true;
}

function expectChaincodeRejection(orgName, userName, chaincode, functionName, args, endorsers, expected, transient) {
    try {
        invoke(orgName, userName, chaincode, functionName, args, endorsers, transient);
    } catch (error) {
        if (error.message.includes(expected)) return error.message;
        throw error;
    }
    fail(`${chaincode}.${functionName} unexpectedly succeeded`);
}

function checkWrongMSPMatrix(chaincode, functionName, args, allowedMSP, endorsers) {
    for (const [orgName, org] of Object.entries(orgs)) {
        if (org.msp === allowedMSP) continue;
        expectChaincodeRejection(
            orgName, 'Admin', chaincode, functionName, args, endorsers,
            `access denied for MSP ${org.msp}`,
        );
    }
    return Object.keys(orgs).length - 1;
}

function queryText(orgName, userName, chaincode, functionName, args = [], peerOrgName = orgName) {
    const proposal = JSON.stringify({ function: functionName, Args: args.map(String) });
    const result = dockerPeer(orgName, userName, ['chaincode', 'query'], [
        '-C', channel, '-n', chaincode, '-c', proposal,
    ], peerOrgName);
    if (result.error || result.status !== 0) {
        fail(`${chaincode}.${functionName} query failed: ${(result.error && result.error.message) || result.stderr || result.stdout}`);
    }
    return result.stdout;
}

function query(orgName, userName, chaincode, functionName, args = [], peerOrgName = orgName) {
    const text = queryText(orgName, userName, chaincode, functionName, args, peerOrgName);
    try {
        return JSON.parse(text);
    } catch {
        return text;
    }
}

function expectQueryRejection(orgName, userName, chaincode, functionName, args, expected, peerOrgName = orgName) {
    try {
        query(orgName, userName, chaincode, functionName, args, peerOrgName);
    } catch (error) {
        if (error.message.includes(expected)) return error.message;
        throw error;
    }
    fail(`${chaincode}.${functionName} unexpectedly returned a value`);
}

function getClientID(orgName, userName) {
    return query(orgName, userName, 'rupiah-controls', 'GetCallerIdentity');
}

function setupStaff(clientID, role) {
    invokeAllowError('centralbank', 'Admin', 'rupiah-controls', 'CreateStaffPending', [clientID], MEMBER_ENDORSERS, 'staff identity already exists');
    invokeAllowError('centralbank', 'Admin', 'rupiah-controls', 'ProtectStaff', [clientID], MEMBER_ENDORSERS, 'staff identity is already protected');
    invoke('centralbank', 'Admin', 'rupiah-controls', 'SetStaffRole', [clientID, role], MEMBER_ENDORSERS);
}

function cddPayload(subjectID, category) {
    return payloadTransient({
        category,
        salt: crypto.randomBytes(32).toString('hex'),
        documentRef: crypto.createHash('sha256').update(`cdd-${subjectID}`).digest('hex'),
    });
}

// review overrides the default CDD Sederhana evidence: not listed, low risk, reason "capped product".
function approveSubject(subjectID, category, ownerUser, limits = ['1000', '5000', '20000', '5000'], approved = true, review = {}) {
    invoke('enduser', ownerUser, 'rupiah-controls', 'CreatePending', [subjectID], MEMBER_ENDORSERS, cddPayload(subjectID, category));
    invoke('distributor', 'User1', 'rupiah-controls', 'ProtectSubject', [subjectID], MEMBER_ENDORSERS);
    const [perTransaction, daily, monthly, holdings] = limits.map(Number);
    invoke('distributor', 'User1', 'rupiah-controls', 'SetLimits', [subjectID], MEMBER_ENDORSERS,
        payloadTransient({ per_transaction: perTransaction, daily, monthly, holdings }));
    invoke('distributor', 'User1', 'rupiah-controls', 'RecordReview', [subjectID], MEMBER_ENDORSERS,
        payloadTransient({ dttot_result: 'not_listed', low_risk: true, low_risk_reason: 'capped product', ...review }));
    invoke('distributor', 'User1', 'rupiah-controls', 'ApproveSubject', [subjectID], MEMBER_ENDORSERS, payloadTransient({ approved }));
}

function convertAndFund(subjectID, amount, reference) {
    invoke('distributor', 'User1', 'rupiah-payments', 'ConvertToRetail', ['retail-bank', amount, `convert-${reference}`], MEMBER_ENDORSERS);
    invoke('distributor', 'User1', 'rupiah-payments', 'FundWallet', [subjectID, 'retail-bank', amount, `fund-${reference}`], MEMBER_ENDORSERS);
}

function main() {
    caseResults = [];
    const runID = Date.now().toString(36);
    const retailSubject = `retail-${runID}-001`;
    const secondRetailSubject = `retail-${runID}-002`;
    const rejectedSubject = `rejected-${runID}-001`;
    const reviewer = getClientID('distributor', 'User1');
    const compliance = getClientID('distributor', 'User3');
    const centralBankClient = getClientID('centralbank', 'Admin');
    const validatorClient = getClientID('validator', 'Admin');
    if (reviewer === compliance) fail('synthetic staff certificates must be distinct');
    if ([reviewer, compliance].includes(centralBankClient) || [reviewer, compliance, centralBankClient].includes(validatorClient)) {
        fail('study MSP client identities must be distinct');
    }
    setupStaff(reviewer, 'kyc_reviewer');
    setupStaff(compliance, 'compliance_officer');
    // BI sets the CDD ceilings before any approval. Setting them again with the same values is idempotent.
    invoke('centralbank', 'Admin', 'rupiah-controls', 'SetCddCeilings', ['2000000', '20000000'], MEMBER_ENDORSERS);

    const authorizationChecks = [
        ['rupiah-controls', 'CreatePending', [`msp-${runID}`], 'EndUserMSP', MEMBER_ENDORSERS],
        ['rupiah-controls', 'ProtectSubject', [`msp-${runID}`], 'DistributorMSP', MEMBER_ENDORSERS],
        ['rupiah-controls', 'CreateStaffPending', [`msp-${runID}`], 'CentralBankMSP', MEMBER_ENDORSERS],
        ['rupiah-controls', 'ProtectStaff', [`msp-${runID}`], 'CentralBankMSP', MEMBER_ENDORSERS],
        ['rupiah-controls', 'SetStaffRole', [`msp-${runID}`, 'kyc_reviewer'], 'CentralBankMSP', MEMBER_ENDORSERS],
        ['rupiah-controls', 'RecordReview', [`msp-${runID}`], 'DistributorMSP', MEMBER_ENDORSERS],
        ['rupiah-controls', 'ApproveSubject', [`msp-${runID}`], 'DistributorMSP', MEMBER_ENDORSERS],
        ['rupiah-controls', 'SetLimits', [`msp-${runID}`], 'DistributorMSP', MEMBER_ENDORSERS],
        ['rupiah-controls', 'SetCddCeilings', ['1', '2'], 'CentralBankMSP', MEMBER_ENDORSERS],
        ['rupiah-controls', 'VerifySubject', [`msp-${runID}`], 'DistributorMSP', MEMBER_ENDORSERS],
        ['rupiah-controls', 'UpdateSubject', [`msp-${runID}`], 'DistributorMSP', MEMBER_ENDORSERS],
        ['rupiah-controls', 'CloseSubject', [`msp-${runID}`], 'DistributorMSP', MEMBER_ENDORSERS],
        ['rupiah-controls', 'RevokeLowRisk', [`msp-${runID}`], 'DistributorMSP', MEMBER_ENDORSERS],
        ['rupiah-controls', 'FreezeSubject', [`msp-${runID}`], 'DistributorMSP', MEMBER_ENDORSERS],
        ['rupiah-controls', 'RequestUnfreeze', [`msp-${runID}`], 'DistributorMSP', MEMBER_ENDORSERS],
        ['rupiah-controls', 'ApproveUnfreeze', [`msp-${runID}`], 'DistributorMSP', MEMBER_ENDORSERS],
        ['rupiah-monetary', 'Initialize', [], 'CentralBankMSP', MEMBER_ENDORSERS],
        ['rupiah-monetary', 'RegisterDistributor', [`msp-${runID}`], 'CentralBankMSP', MEMBER_ENDORSERS],
        ['rupiah-monetary', 'Issue', [`msp-${runID}`, '1', `msp-${runID}`], 'CentralBankMSP', MEMBER_ENDORSERS],
        ['rupiah-monetary', 'RedeemReserve', ['retail-bank', '1', `msp-${runID}`], 'CentralBankMSP', MEMBER_ENDORSERS],
        ['rupiah-payments', 'OpenWallet', [`msp-${runID}`], 'EndUserMSP', MEMBER_ENDORSERS],
        ['rupiah-payments', 'Transfer', [`msp-${runID}`, `other-${runID}`, '1', `msp-${runID}`], 'EndUserMSP', MEMBER_ENDORSERS],
        ['rupiah-payments', 'ConvertToRetail', ['retail-bank', '1', `msp-${runID}`], 'DistributorMSP', MEMBER_ENDORSERS],
        ['rupiah-payments', 'FundWallet', [`msp-${runID}`, 'retail-bank', '1', `msp-${runID}`], 'DistributorMSP', MEMBER_ENDORSERS],
    ];
    const mspAuthorizationCells = authorizationChecks.reduce((count, [chaincode, transaction, args, allowedMSP, endorsers]) =>
        count + checkWrongMSPMatrix(chaincode, transaction, args, allowedMSP, endorsers), 0);

    invokeAllowError('centralbank', 'Admin', 'rupiah-monetary', 'Initialize', [], MEMBER_ENDORSERS, 'already initialized');
    const initializationReplayBefore = {
        wholesaleSupply: query('centralbank', 'Admin', 'rupiah-monetary', 'GetWholesaleSupply'),
        retailSupply: query('centralbank', 'Admin', 'rupiah-monetary', 'GetRetailSupply'),
        supply: query('centralbank', 'Admin', 'rupiah-monetary', 'GetTotalSupply'),
    };
    const initializationReplay = invokeAllowError('centralbank', 'Admin', 'rupiah-monetary', 'Initialize', [], MEMBER_ENDORSERS, 'already initialized');
    const initializationReplayAfter = {
        wholesaleSupply: query('centralbank', 'Admin', 'rupiah-monetary', 'GetWholesaleSupply'),
        retailSupply: query('centralbank', 'Admin', 'rupiah-monetary', 'GetRetailSupply'),
        supply: query('centralbank', 'Admin', 'rupiah-monetary', 'GetTotalSupply'),
    };
    const initializationReplayStateUnchanged = initializationReplay === null
        && JSON.stringify(initializationReplayBefore) === JSON.stringify(initializationReplayAfter);
    if (!initializationReplayStateUnchanged) fail('repeated monetary initialization changed ledger state');
    invokeAllowError('centralbank', 'Admin', 'rupiah-monetary', 'RegisterDistributor', ['retail-bank'], MEMBER_ENDORSERS, 'already registered');
    invoke('centralbank', 'Admin', 'rupiah-monetary', 'Issue', ['retail-bank', '1000000', `issue-demo-${runID}`], MEMBER_ENDORSERS);
    const retailReserveBeforeConversions = query('centralbank', 'Admin', 'rupiah-monetary', 'GetReserve', ['retail-bank']);

    approveSubject(retailSubject, 'retail', 'User1');
    approveSubject(secondRetailSubject, 'retail', 'User5');
    approveSubject(rejectedSubject, 'retail', 'User1', ['1000', '5000', '20000', '5000'], false);
    if (query('validator', 'Admin', 'rupiah-controls', 'GetSubject', [rejectedSubject]).status !== 'rejected') {
        fail('explicit false decision did not reject the pending subject');
    }
    recordCase('staff-separation', reviewer !== compliance
        && query('distributor', 'User1', 'rupiah-controls', 'GetCallerIdentity') !== query('distributor', 'User3', 'rupiah-controls', 'GetCallerIdentity'),
    { reviewer: 'User1', compliance: 'User3' });
    expectChaincodeRejection('enduser', 'User1', 'rupiah-controls', 'CreatePending', [`invalid-${runID}`], MEMBER_ENDORSERS,
        'a supported category is required', cddPayload(`invalid-${runID}`, 'other'));
    const limits = query('enduser', 'User1', 'rupiah-controls', 'GetLimits', [retailSubject], MEMBER_PEER);
    if (limits.per_transaction !== 1000 || limits.daily !== 5000 || limits.monthly !== 20000 || limits.holdings !== 5000) {
        fail('active subject payment limits did not match their configured values');
    }

    invoke('enduser', 'User1', 'rupiah-payments', 'OpenWallet', [retailSubject], MEMBER_ENDORSERS);
    invoke('enduser', 'User5', 'rupiah-payments', 'OpenWallet', [secondRetailSubject], MEMBER_ENDORSERS);
    convertAndFund(retailSubject, '1000', `retail-${runID}`);
    convertAndFund(secondRetailSubject, '1000', `retail2-${runID}`);
    const initialPayment = [retailSubject, secondRetailSubject, '100', `payment-${runID}`];
    const paymentBefore = ledgerSnapshot([['enduser', 'User1', retailSubject], ['enduser', 'User5', secondRetailSubject]]);
    invoke('enduser', 'User1', 'rupiah-payments', 'Transfer', initialPayment, MEMBER_ENDORSERS);
    const paymentAfterFirst = ledgerSnapshot([['enduser', 'User1', retailSubject], ['enduser', 'User5', secondRetailSubject]]);
    invoke('enduser', 'User1', 'rupiah-payments', 'Transfer', initialPayment, MEMBER_ENDORSERS);
    const paymentAfterReplay = ledgerSnapshot([['enduser', 'User1', retailSubject], ['enduser', 'User5', secondRetailSubject]]);
    assertStateUnchanged(paymentAfterFirst, paymentAfterReplay);
    expectChaincodeRejection('enduser', 'User1', 'rupiah-payments', 'Transfer', [retailSubject, secondRetailSubject, '99', initialPayment[3]], MEMBER_ENDORSERS,
        'reference was used for another operation');
    const paymentAfterConflict = ledgerSnapshot([['enduser', 'User1', retailSubject], ['enduser', 'User5', secondRetailSubject]]);
    assertStateUnchanged(paymentAfterReplay, paymentAfterConflict);
    const receipt = query('enduser', 'User1', 'rupiah-payments', 'GetReceipt', [initialPayment[3]], MEMBER_PEER);
    if (receipt.amount !== 100 || receipt.from !== retailSubject || receipt.to !== secondRetailSubject || receipt.kind !== 'transfer') {
        fail('transfer receipt did not match the committed transfer');
    }
    const unrelatedReceiptDenied = Boolean(expectQueryRejection('enduser', 'User6', 'rupiah-payments', 'GetReceipt', [initialPayment[3]],
        'caller is not a party to receipt', MEMBER_PEER));
    recordCase('transfer-replay-conflict', paymentAfterFirst.balances[retailSubject] === paymentBefore.balances[retailSubject] - 100
        && paymentAfterFirst.balances[secondRetailSubject] === paymentBefore.balances[secondRetailSubject] + 100
        && receipt.amount === 100 && receipt.reference === initialPayment[3],
    { replay_state_unchanged: true, payload_conflict_state_unchanged: true, transaction_id: initialPayment[3] });
    invoke('enduser', 'User1', 'rupiah-payments', 'Transfer', [retailSubject, secondRetailSubject, '1', `matrix-retail-retail-${runID}`], MEMBER_ENDORSERS);

    // Underendorsed: the policy needs CentralBank and Distributor, so one member alone must not commit.
    expectRejected('centralbank', 'Admin', 'rupiah-monetary', 'Issue', ['retail-bank', '1', `issue-underendorsed-${runID}`], ['centralbank']);
    expectRejected('enduser', 'User1', 'rupiah-payments', 'Transfer', [retailSubject, secondRetailSubject, '10', `payment-underendorsed-${runID}`],
        ['distributor']);
    expectRejected('distributor', 'User1', 'rupiah-payments', 'ConvertToRetail', ['retail-bank', '10', `convert-underendorsed-${runID}`], ['distributor']);
    expectRejected('enduser', 'User1', 'rupiah-payments', 'Transfer', [retailSubject, secondRetailSubject, '10', `validator-underendorsed-${runID}`],
        ['validator']);
    expectRejected('distributor', 'User3', 'rupiah-controls', 'FreezeSubject', [retailSubject], ['distributor'], payloadTransient({ reason: 'dttot' }));
    expectChaincodeRejection('distributor', 'User1', 'rupiah-controls', 'FreezeSubject', [retailSubject], MEMBER_ENDORSERS,
        'staff identity lacks role compliance_officer', payloadTransient({ reason: 'dttot' }));
    expectChaincodeRejection('centralbank', 'Admin', 'rupiah-controls', 'CreatePending', [`wrong-msp-${runID}`], MEMBER_ENDORSERS,
        'access denied for MSP CentralBankMSP');
    expectChaincodeRejection('enduser', 'User1', 'rupiah-monetary', 'Issue', ['retail-bank', '1', `wrong-msp-${runID}`], MEMBER_ENDORSERS,
        'access denied for MSP EndUserMSP');
    expectChaincodeRejection('distributor', 'User1', 'rupiah-payments', 'Transfer', [retailSubject, secondRetailSubject, '1', `wrong-msp-${runID}`], MEMBER_ENDORSERS,
        'access denied for MSP DistributorMSP');
    expectChaincodeRejection('distributor', 'User3', 'rupiah-controls', 'FreezeSubject', [retailSubject], MEMBER_ENDORSERS,
        'unsupported restriction reason code', payloadTransient({ reason: 'other' }));
    recordCase('authorization-endorsement', mspAuthorizationCells === authorizationChecks.length * (Object.keys(orgs).length - 1),
        { wrong_msp_denials: mspAuthorizationCells, underendorsed_operations: 4 });

    for (const orgName of Object.keys(orgs)) {
        expectChaincodeRejection(
            orgName, 'Admin', 'rupiah-monetary', 'DebitReserveForConversion', ['retail-bank', '10', `direct-debit-${orgName}-${runID}`],
            MEMBER_ENDORSERS, 'ConvertToRetail is callable only through rupiah-payments.ConvertToRetail',
        );
    }
    const testedRestrictionReasons = new Set(['dttot']);
    invoke('distributor', 'User3', 'rupiah-controls', 'FreezeSubject', [retailSubject], MEMBER_ENDORSERS, payloadTransient({ reason: 'dttot' }));
    if (query('enduser', 'User1', 'rupiah-controls', 'CanPay', [retailSubject], MEMBER_PEER) !== false) fail('frozen subject remained eligible');
    expectChaincodeRejection('enduser', 'User1', 'rupiah-payments', 'Transfer', [retailSubject, secondRetailSubject, '1', `frozen-transfer-${runID}`], MEMBER_ENDORSERS,
        'is not eligible to pay');
    const releaseEvidence = crypto.createHash('sha256').update(`authority-${runID}`).digest('hex');
    invoke('distributor', 'User1', 'rupiah-controls', 'RequestUnfreeze', [retailSubject], MEMBER_ENDORSERS, payloadTransient({ authority_evidence_ref: releaseEvidence }));
    expectRejected('distributor', 'User1', 'rupiah-controls', 'ApproveUnfreeze', [retailSubject], MEMBER_ENDORSERS);
    invoke('distributor', 'User3', 'rupiah-controls', 'ApproveUnfreeze', [retailSubject], MEMBER_ENDORSERS);
    if (query('enduser', 'User1', 'rupiah-controls', 'CanPay', [retailSubject], MEMBER_PEER) !== true) fail('released subject is not eligible');

    for (const [reason, label] of [
        ['authority_order', 'different reason'],
        ['authority_order', 'same reason'],
        ['internal_review', 'third reason'],
    ]) {
        invoke('distributor', 'User3', 'rupiah-controls', 'FreezeSubject', [retailSubject], MEMBER_ENDORSERS, payloadTransient({ reason }));
        testedRestrictionReasons.add(reason);
        const reblockedSubject = query('validator', 'Admin', 'rupiah-controls', 'GetSubject', [retailSubject]);
        if (!reblockedSubject.restricted || reblockedSubject.authority_evidence_ref) {
            fail(`${label} reblock retained prior release evidence`);
        }
        expectChaincodeRejection(
            'distributor', 'User3', 'rupiah-controls', 'ApproveUnfreeze', [retailSubject],
            MEMBER_ENDORSERS, 'unfreeze requires authority evidence',
        );
        if (query('enduser', 'User1', 'rupiah-controls', 'CanPay', [retailSubject], MEMBER_PEER) !== false) {
            fail(`${label} reblock became eligible without a new reviewer request`);
        }
        invoke('distributor', 'User1', 'rupiah-controls', 'RequestUnfreeze', [retailSubject], MEMBER_ENDORSERS, payloadTransient({ authority_evidence_ref: releaseEvidence }));
        invoke('distributor', 'User3', 'rupiah-controls', 'ApproveUnfreeze', [retailSubject], MEMBER_ENDORSERS);
        if (query('enduser', 'User1', 'rupiah-controls', 'CanPay', [retailSubject], MEMBER_PEER) !== true) {
            fail(`${label} reblock could not be released after a fresh reviewer request`);
        }
    }
    recordCase('restriction-reasons', ['dttot', 'authority_order', 'internal_review'].every(reason => testedRestrictionReasons.has(reason)),
        { tested: [...testedRestrictionReasons] });
    recordCase('fresh-release-evidence', true, { old_evidence_cleared: true, fresh_request_required: true, repeated_reason_checked: true });

    const oversightRecord = query('validator', 'Admin', 'rupiah-controls', 'GetSubject', [retailSubject]);
    if (oversightRecord.status !== 'active') fail('ValidatorMSP cannot read the committed audit subject');
    if (oversightRecord.low_risk !== true || oversightRecord.verified !== false || 'representatives' in oversightRecord) {
        fail('ValidatorMSP subject view did not carry the CDD Sederhana fields');
    }

    // PDC confidentiality. Denials must leave the ledger unchanged, and the public hash must commit to the member record.
    const retailStateBeforeDenial = ledgerSnapshot([['enduser', 'User1', retailSubject]]);
    const enduserGetSubjectDenial = expectQueryRejection('enduser', 'Admin', 'rupiah-controls', 'GetSubject', [retailSubject],
        'access denied for subject', MEMBER_PEER);
    assertStateUnchanged(retailStateBeforeDenial, ledgerSnapshot([['enduser', 'User1', retailSubject]]));
    recordCase('enduser-get-subject-denied', enduserGetSubjectDenial.includes('access denied for subject'),
        { denied_on_member_peer: 'DistributorMSP', denied_identity: 'EndUserMSP', state_unchanged: true });

    const retailStateBeforeLimitsDenial = ledgerSnapshot([['enduser', 'User1', retailSubject]]);
    const enduserLimitsDenial = expectQueryRejection('enduser', 'User2', 'rupiah-controls', 'GetLimits', [retailSubject],
        'access denied for subject', MEMBER_PEER);
    assertStateUnchanged(retailStateBeforeLimitsDenial, ledgerSnapshot([['enduser', 'User1', retailSubject]]));
    recordCase('enduser-limits-other-subject-denied', enduserLimitsDenial.includes('access denied for subject'),
        { caller: 'EndUser applicant for another subject', denied_on_member_peer: 'DistributorMSP', state_unchanged: true });

    const retailBalance = query('enduser', 'User1', 'rupiah-payments', 'GetBalance', [retailSubject], MEMBER_PEER);
    const reserve = query('centralbank', 'Admin', 'rupiah-monetary', 'GetReserve', ['retail-bank']);
    const secondRetailBalance = query('enduser', 'User5', 'rupiah-payments', 'GetBalance', [secondRetailSubject], MEMBER_PEER);
    if (retailBalance !== 899 || secondRetailBalance !== 1101 || reserve !== retailReserveBeforeConversions - 2000) {
        fail(`unexpected payment matrix state: retail=${retailBalance}, retail2=${secondRetailBalance}, reserve=${reserve}`);
    }
    recordCase('transfer-category-matrix', retailBalance === 899 && secondRetailBalance === 1101,
    { sender_recipient_category_pairs: 1, balances_conserved: true });

    // CDD Sederhana gates, with the BI ceilings set above (2,000,000 unverified, 20,000,000 verified).
    const digest = label => crypto.createHash('sha256').update(`${label}-${runID}`).digest('hex');
    const subjectStatus = subjectID => query('validator', 'Admin', 'rupiah-controls', 'GetSubject', [subjectID]);
    const listedSubject = `listed-${runID}`;
    const notLowRiskSubject = `not-low-risk-${runID}`;
    approveSubject(listedSubject, 'retail', 'User1', undefined, true, { dttot_result: 'listed' });
    approveSubject(notLowRiskSubject, 'retail', 'User1', undefined, true, { low_risk: false, low_risk_reason: '' });
    recordCase('cdd-listed-rejected', subjectStatus(listedSubject).status === 'rejected', { approved_by_reviewer: true, status: 'rejected' });
    recordCase('cdd-not-low-risk-rejected', subjectStatus(notLowRiskSubject).status === 'rejected', { approved_by_reviewer: true, status: 'rejected' });

    // The sender is verified so it can hold more than the unverified ceiling. The extra issuance covers its 2,500,000 funding.
    invoke('centralbank', 'Admin', 'rupiah-monetary', 'Issue', ['retail-bank', '3000000', `issue-cdd-${runID}`], MEMBER_ENDORSERS);
    const ceilingSender = `ceiling-${runID}-sender`;
    const ceilingPayee = `ceiling-${runID}-payee`;
    const wideLimits = ['3000000', '5000000', '20000000', '20000000'];
    approveSubject(ceilingSender, 'retail', 'User5', wideLimits);
    approveSubject(ceilingPayee, 'retail', 'User6', wideLimits);
    invoke('distributor', 'User1', 'rupiah-controls', 'VerifySubject', [ceilingSender], MEMBER_ENDORSERS, payloadTransient({ evidence_ref: digest('verify-sender') }));
    invoke('enduser', 'User5', 'rupiah-payments', 'OpenWallet', [ceilingSender], MEMBER_ENDORSERS);
    invoke('enduser', 'User6', 'rupiah-payments', 'OpenWallet', [ceilingPayee], MEMBER_ENDORSERS);
    convertAndFund(ceilingSender, '2500000', `ceiling-${runID}`);
    const ceilingState = () => ledgerSnapshot([['enduser', 'User5', ceilingSender], ['enduser', 'User6', ceilingPayee]]);
    const payeeHoldings = () => query('enduser', 'User6', 'rupiah-controls', 'GetLimits', [ceilingPayee], MEMBER_PEER).holdings;
    const payFromCeilingSender = (amount, reference) => invoke('enduser', 'User5', 'rupiah-payments', 'Transfer',
        [ceilingSender, ceilingPayee, amount, `${reference}-${runID}`], MEMBER_ENDORSERS);
    const refusePayFromCeilingSender = (amount, reference) => expectChaincodeRejection('enduser', 'User5', 'rupiah-payments', 'Transfer',
        [ceilingSender, ceilingPayee, amount, `${reference}-${runID}`], MEMBER_ENDORSERS, 'transfer not permitted');

    const unverifiedHoldings = payeeHoldings();
    const beforeOverCeiling = ceilingState();
    refusePayFromCeilingSender('2000001', 'ceiling-over');
    assertStateUnchanged(beforeOverCeiling, ceilingState());
    payFromCeilingSender('2000000', 'ceiling-exact');
    recordCase('cdd-unverified-ceiling', unverifiedHoldings === 2000000 && ceilingState().balances[ceilingPayee] === 2000000,
    { effective_holdings: unverifiedHoldings, one_unit_over_refused_unchanged: true, exact_ceiling_accepted: true });

    invoke('distributor', 'User1', 'rupiah-controls', 'VerifySubject', [ceilingPayee], MEMBER_ENDORSERS, payloadTransient({ evidence_ref: digest('verify-payee') }));
    const verifiedHoldings = payeeHoldings();
    payFromCeilingSender('1', 'ceiling-verified');
    recordCase('cdd-verify-raises-ceiling', subjectStatus(ceilingPayee).verified === true && verifiedHoldings === 20000000
        && ceilingState().balances[ceilingPayee] === 2000001,
    { effective_holdings: verifiedHoldings, balance_above_unverified_ceiling: 2000001 });

    invoke('distributor', 'User1', 'rupiah-controls', 'UpdateSubject', [ceilingPayee], MEMBER_ENDORSERS,
        payloadTransient({ documentRef: digest('update-payee'), dttot_result: 'not_listed' }));
    const updatedPayee = subjectStatus(ceilingPayee);
    const beforeReset = ceilingState();
    refusePayFromCeilingSender('1', 'ceiling-reset');
    assertStateUnchanged(beforeReset, ceilingState());
    recordCase('cdd-update-resets-verification', updatedPayee.status === 'active' && updatedPayee.verified === false && payeeHoldings() === 2000000,
    { verified_after_update: false, effective_holdings: 2000000, payment_above_ceiling_refused_unchanged: true });

    const closedSubject = `closed-${runID}`;
    approveSubject(closedSubject, 'retail', 'User7');
    invoke('enduser', 'User7', 'rupiah-payments', 'OpenWallet', [closedSubject], MEMBER_ENDORSERS);
    convertAndFund(closedSubject, '100', `closed-${runID}`);
    expectChaincodeRejection('distributor', 'User3', 'rupiah-controls', 'CloseSubject', [closedSubject], MEMBER_ENDORSERS,
        'staff identity lacks role kyc_reviewer', payloadTransient({ reason: 'identity_doubtful' }));
    invoke('distributor', 'User1', 'rupiah-controls', 'CloseSubject', [closedSubject], MEMBER_ENDORSERS, payloadTransient({ reason: 'identity_doubtful' }));
    const closedView = subjectStatus(closedSubject);
    const closedState = () => ledgerSnapshot([['enduser', 'User7', closedSubject], ['enduser', 'User5', secondRetailSubject]]);
    const beforeClosedPayments = closedState();
    expectChaincodeRejection('enduser', 'User5', 'rupiah-payments', 'Transfer', [secondRetailSubject, closedSubject, '1', `closed-receive-${runID}`],
        MEMBER_ENDORSERS, 'transfer not permitted');
    expectChaincodeRejection('enduser', 'User7', 'rupiah-payments', 'Transfer', [closedSubject, secondRetailSubject, '1', `closed-pay-${runID}`],
        MEMBER_ENDORSERS, 'is not eligible to pay');
    assertStateUnchanged(beforeClosedPayments, closedState());
    expectChaincodeRejection('distributor', 'User1', 'rupiah-controls', 'CloseSubject', [closedSubject], MEMBER_ENDORSERS,
        'subject is not active', payloadTransient({ reason: 'fictitious' }));
    expectChaincodeRejection('distributor', 'User1', 'rupiah-controls', 'UpdateSubject', [closedSubject], MEMBER_ENDORSERS,
        'subject is not active', payloadTransient({ documentRef: digest('update-closed'), dttot_result: 'not_listed' }));
    expectChaincodeRejection('distributor', 'User1', 'rupiah-controls', 'VerifySubject', [closedSubject], MEMBER_ENDORSERS,
        'subject is not active', payloadTransient({ evidence_ref: digest('verify-closed') }));
    recordCase('cdd-close-terminal', closedView.status === 'closed' && closedView.close_reason === 'identity_doubtful' && closedView.closed_at > 0
        && query('enduser', 'User7', 'rupiah-controls', 'CanPay', [closedSubject], MEMBER_PEER) === false,
    { cannot_pay: true, cannot_receive: true, close_update_verify_refused: true, state_unchanged: true });

    const revokedSubject = `revoked-${runID}`;
    approveSubject(revokedSubject, 'retail', 'User8');
    invoke('enduser', 'User8', 'rupiah-payments', 'OpenWallet', [revokedSubject], MEMBER_ENDORSERS);
    convertAndFund(revokedSubject, '100', `revoked-${runID}`);
    expectChaincodeRejection('distributor', 'User1', 'rupiah-controls', 'RevokeLowRisk', [revokedSubject], MEMBER_ENDORSERS,
        'staff identity lacks role compliance_officer');
    invoke('distributor', 'User3', 'rupiah-controls', 'RevokeLowRisk', [revokedSubject], MEMBER_ENDORSERS);
    const revokedView = subjectStatus(revokedSubject);
    const revokedState = () => ledgerSnapshot([['enduser', 'User8', revokedSubject], ['enduser', 'User5', secondRetailSubject]]);
    const beforeRevokedPayments = revokedState();
    expectChaincodeRejection('enduser', 'User5', 'rupiah-payments', 'Transfer', [secondRetailSubject, revokedSubject, '1', `revoked-receive-${runID}`],
        MEMBER_ENDORSERS, 'transfer not permitted');
    expectChaincodeRejection('enduser', 'User8', 'rupiah-payments', 'Transfer', [revokedSubject, secondRetailSubject, '1', `revoked-pay-${runID}`],
        MEMBER_ENDORSERS, 'is not eligible to pay');
    assertStateUnchanged(beforeRevokedPayments, revokedState());
    expectChaincodeRejection('distributor', 'User3', 'rupiah-controls', 'RevokeLowRisk', [revokedSubject], MEMBER_ENDORSERS,
        'subject is already outside CDD Sederhana');
    recordCase('cdd-revoke-low-risk', revokedView.status === 'active' && revokedView.low_risk === false
        && query('enduser', 'User8', 'rupiah-controls', 'CanPay', [revokedSubject], MEMBER_PEER) === false,
    { payee_check_refused: true, sender_refused: true, status_still_active: true, state_unchanged: true });

    const limitSender = `limits-${runID}-sender`;
    const dailyReceiver = `limits-${runID}-daily-receiver`;
    const holdingSender = `limits-${runID}-holding-sender`;
    const holdingReceiver = `limits-${runID}-holding-receiver`;
    approveSubject(limitSender, 'retail', 'User5', ['10', '20', '100', '1000']);
    approveSubject(dailyReceiver, 'retail', 'User6', ['100', '100', '100', '1000']);
    approveSubject(holdingSender, 'retail', 'User7', ['10', '100', '100', '1000']);
    approveSubject(holdingReceiver, 'retail', 'User8', ['10', '100', '100', '10']);
    for (const [subjectID, user] of [[limitSender, 'User5'], [dailyReceiver, 'User6'], [holdingSender, 'User7'], [holdingReceiver, 'User8']]) {
        invoke('enduser', user, 'rupiah-payments', 'OpenWallet', [subjectID], MEMBER_ENDORSERS);
    }
    convertAndFund(limitSender, '100', `limits-${runID}`);
    convertAndFund(holdingSender, '20', `holdings-${runID}`);
    const limitSenderState = () => ledgerSnapshot([['enduser', 'User5', limitSender], ['enduser', 'User6', dailyReceiver]]);
    invoke('enduser', 'User5', 'rupiah-payments', 'Transfer', [limitSender, dailyReceiver, '10', `limits-exact-per-tx-${runID}`],
        MEMBER_ENDORSERS);
    const afterPerTxExact = limitSenderState();
    const beforePerTxFailure = limitSenderState();
    expectChaincodeRejection('enduser', 'User5', 'rupiah-payments', 'Transfer', [limitSender, dailyReceiver, '11', `limits-over-per-tx-${runID}`],
        MEMBER_ENDORSERS, 'per-transaction limit');
    assertStateUnchanged(beforePerTxFailure, limitSenderState());
    invoke('enduser', 'User5', 'rupiah-payments', 'Transfer', [limitSender, dailyReceiver, '10', `limits-exact-daily-${runID}`],
        MEMBER_ENDORSERS);
    const beforeDailyFailure = limitSenderState();
    expectChaincodeRejection('enduser', 'User5', 'rupiah-payments', 'Transfer', [limitSender, dailyReceiver, '1', `limits-over-daily-${runID}`],
        MEMBER_ENDORSERS, 'daily payment limit');
    assertStateUnchanged(beforeDailyFailure, limitSenderState());
    const beforeHoldingExact = ledgerSnapshot([['enduser', 'User7', holdingSender], ['enduser', 'User8', holdingReceiver]]);
    invoke('enduser', 'User7', 'rupiah-payments', 'Transfer', [holdingSender, holdingReceiver, '10', `limits-exact-holdings-${runID}`],
        MEMBER_ENDORSERS);
    const afterHoldingExact = ledgerSnapshot([['enduser', 'User7', holdingSender], ['enduser', 'User8', holdingReceiver]]);
    if (afterHoldingExact.balances[holdingReceiver] !== 10) fail('recipient holdings exact boundary was not accepted');
    expectChaincodeRejection('enduser', 'User7', 'rupiah-payments', 'Transfer', [holdingSender, holdingReceiver, '1', `limits-over-holdings-${runID}`],
        MEMBER_ENDORSERS, 'transfer not permitted');
    assertStateUnchanged(afterHoldingExact, ledgerSnapshot([['enduser', 'User7', holdingSender], ['enduser', 'User8', holdingReceiver]]));
    recordCase('transaction-limits', afterPerTxExact.balances[dailyReceiver] === 10
        && beforeDailyFailure.balances[dailyReceiver] === 20 && afterHoldingExact.balances[holdingReceiver] === 10,
    { per_transaction_exact: true, per_transaction_excess_unchanged: true, daily_exact: true, daily_excess_unchanged: true, holdings_exact: true, holdings_excess_unchanged: true });

    const conversionSubject = `conversion-${runID}`;
    approveSubject(conversionSubject, 'retail', 'User5', ['100', '1000', '1000', '1000']);
    invoke('enduser', 'User5', 'rupiah-payments', 'OpenWallet', [conversionSubject], MEMBER_ENDORSERS);
    const conversionReference = `conversion-replay-${runID}`;
    const convertRef = `convert-${conversionReference}`;
    const fundRef = `fund-${conversionReference}`;
    const conversionBefore = ledgerSnapshot([['enduser', 'User5', conversionSubject]]);
    invoke('distributor', 'User1', 'rupiah-payments', 'ConvertToRetail', ['retail-bank', '10', convertRef], MEMBER_ENDORSERS);
    invoke('distributor', 'User1', 'rupiah-payments', 'FundWallet', [conversionSubject, 'retail-bank', '10', fundRef], MEMBER_ENDORSERS);
    const conversionAfterFirst = ledgerSnapshot([['enduser', 'User5', conversionSubject]]);
    invoke('distributor', 'User1', 'rupiah-payments', 'ConvertToRetail', ['retail-bank', '10', convertRef], MEMBER_ENDORSERS);
    invoke('distributor', 'User1', 'rupiah-payments', 'FundWallet', [conversionSubject, 'retail-bank', '10', fundRef], MEMBER_ENDORSERS);
    const conversionAfterReplay = ledgerSnapshot([['enduser', 'User5', conversionSubject]]);
    assertStateUnchanged(conversionAfterFirst, conversionAfterReplay);
    expectChaincodeRejection('distributor', 'User1', 'rupiah-payments', 'ConvertToRetail', ['retail-bank', '11', convertRef], MEMBER_ENDORSERS, 'reference');
    expectChaincodeRejection('distributor', 'User1', 'rupiah-payments', 'FundWallet', [conversionSubject, 'retail-bank', '11', fundRef], MEMBER_ENDORSERS,
        'reference was used for another operation');
    const conversionAfterConflict = ledgerSnapshot([['enduser', 'User5', conversionSubject]]);
    assertStateUnchanged(conversionAfterReplay, conversionAfterConflict);
    const conversionReceipt = query('enduser', 'User5', 'rupiah-payments', 'GetReceipt', [fundRef], MEMBER_PEER);
    recordCase('conversion-replay-conflict', conversionAfterFirst.balances[conversionSubject] === conversionBefore.balances[conversionSubject] + 10
        && conversionAfterFirst.retailReserve === conversionBefore.retailReserve - 10
        && conversionReceipt.amount === 10 && conversionReceipt.kind === 'funding',
    { exact_replay_state_unchanged: true, payload_conflict_state_unchanged: true, receipt_reference: conversionReceipt.reference });

    const reserveFailureSubject = `reserve-failure-${runID}`;
    const reserveForFailure = query('centralbank', 'Admin', 'rupiah-monetary', 'GetReserve', ['retail-bank']);
    const beyondReserve = reserveForFailure + 1;
    // Holdings cannot exceed the 20,000,000 verified ceiling, so cap them. FundWallet below only needs holdings above the float.
    const largeLimits = [String(beyondReserve + 1), String(beyondReserve + 1), String(beyondReserve + 1), String(Math.min(beyondReserve + 1, 20000000))];
    approveSubject(reserveFailureSubject, 'retail', 'User6', largeLimits);
    invoke('enduser', 'User6', 'rupiah-payments', 'OpenWallet', [reserveFailureSubject], MEMBER_ENDORSERS);
    const insufficientBefore = ledgerSnapshot([['enduser', 'User6', reserveFailureSubject]]);
    expectChaincodeRejection('distributor', 'User1', 'rupiah-payments', 'ConvertToRetail', ['retail-bank', String(beyondReserve), `insufficient-reserve-${runID}`],
        MEMBER_ENDORSERS, 'distributor reserve');
    const insufficientAfter = ledgerSnapshot([['enduser', 'User6', reserveFailureSubject]]);
    assertStateUnchanged(insufficientBefore, insufficientAfter);
    recordCase('conversion-insufficient-reserve', insufficientBefore.balances[reserveFailureSubject] === 0
        && insufficientAfter.retailReserve === insufficientBefore.retailReserve,
    { rejected_amount: beyondReserve, wallet_and_reserve_unchanged: true });
    // Float left by earlier runs (the holdings-over-convert step) can exceed 1, so fund one unit more than the float.
    const floatNow = query('centralbank', 'Admin', 'rupiah-payments', 'GetRetailFloat', ['retail-bank']);
    const insufficientFloatBefore = ledgerSnapshot([['enduser', 'User6', reserveFailureSubject]]);
    expectChaincodeRejection('distributor', 'User1', 'rupiah-payments', 'FundWallet', [reserveFailureSubject, 'retail-bank', String(floatNow + 1), `insufficient-float-${runID}`],
        MEMBER_ENDORSERS, 'retail float');
    assertStateUnchanged(insufficientFloatBefore, ledgerSnapshot([['enduser', 'User6', reserveFailureSubject]]));
    recordCase('insufficient-float', true, { rejected_amount: 1, float_and_wallet_unchanged: true });

    const holdingsSubject = `conversion-holdings-${runID}`;
    approveSubject(holdingsSubject, 'retail', 'User8', ['100', '100', '100', '100']);
    invoke('enduser', 'User8', 'rupiah-payments', 'OpenWallet', [holdingsSubject], MEMBER_ENDORSERS);
    convertAndFund(holdingsSubject, '100', `holdings-exact-${runID}`);
    const holdingsAtLimit = ledgerSnapshot([['enduser', 'User8', holdingsSubject]]);
    invoke('distributor', 'User1', 'rupiah-payments', 'ConvertToRetail', ['retail-bank', '1', `holdings-over-convert-${runID}`], MEMBER_ENDORSERS);
    const holdingsBeforeOver = ledgerSnapshot([['enduser', 'User8', holdingsSubject]]);
    expectChaincodeRejection('distributor', 'User1', 'rupiah-payments', 'FundWallet', [holdingsSubject, 'retail-bank', '1', `holdings-over-${runID}`], MEMBER_ENDORSERS,
        'recipient holdings limit exceeded');
    assertStateUnchanged(holdingsBeforeOver, ledgerSnapshot([['enduser', 'User8', holdingsSubject]]));
    recordCase('wallet-funding-holdings-limit', holdingsAtLimit.balances[holdingsSubject] === 100,
        { holdings_exact: true, one_unit_over_unchanged: true });

    const beforeEndorsementFailure = ledgerSnapshot([['enduser', 'User5', conversionSubject]]);
    expectRejected('distributor', 'User1', 'rupiah-payments', 'ConvertToRetail', ['retail-bank', '5', `convert-underendorsed-atomic-${runID}`], ['distributor']);
    assertStateUnchanged(beforeEndorsementFailure, ledgerSnapshot([['enduser', 'User5', conversionSubject]]));
    recordCase('conversion-failure-atomicity', true, { incomplete_endorsement_left_float_and_reserve_unchanged: true });

    const supplyBeforeRedemption = query('centralbank', 'Admin', 'rupiah-monetary', 'GetTotalSupply');
    const wholesaleSupplyBeforeRedemption = query('centralbank', 'Admin', 'rupiah-monetary', 'GetWholesaleSupply');
    const reserveBeforeRedemption = query('centralbank', 'Admin', 'rupiah-monetary', 'GetReserve', ['retail-bank']);
    const beforeInsufficientRedemption = ledgerSnapshot();
    expectChaincodeRejection('centralbank', 'Admin', 'rupiah-monetary', 'RedeemReserve', ['retail-bank', String(reserveBeforeRedemption + 1), `redeem-too-large-${runID}`],
        MEMBER_ENDORSERS, 'distributor reserve');
    assertStateUnchanged(beforeInsufficientRedemption, ledgerSnapshot());
    const redemptionReference = `redeem-${runID}`;
    invoke('centralbank', 'Admin', 'rupiah-monetary', 'RedeemReserve', ['retail-bank', '1000', redemptionReference], MEMBER_ENDORSERS);
    const afterFirstRedemption = ledgerSnapshot();
    invoke('centralbank', 'Admin', 'rupiah-monetary', 'RedeemReserve', ['retail-bank', '1000', redemptionReference], MEMBER_ENDORSERS);
    const afterRedemptionReplay = ledgerSnapshot();
    assertStateUnchanged(afterFirstRedemption, afterRedemptionReplay);
    expectChaincodeRejection('centralbank', 'Admin', 'rupiah-monetary', 'RedeemReserve', ['retail-bank', '999', redemptionReference], MEMBER_ENDORSERS, 'reference');
    assertStateUnchanged(afterRedemptionReplay, ledgerSnapshot());
    recordCase('redemption-replay-conflict', true, { exact_replay_state_unchanged: true, payload_conflict_state_unchanged: true, insufficient_reserve_state_unchanged: true });
    const reserveAfterRedemption = query('centralbank', 'Admin', 'rupiah-monetary', 'GetReserve', ['retail-bank']);
    const supplyAfterRedemption = query('centralbank', 'Admin', 'rupiah-monetary', 'GetTotalSupply');
    const wholesaleSupply = query('centralbank', 'Admin', 'rupiah-monetary', 'GetWholesaleSupply');
    const retailSupply = query('centralbank', 'Admin', 'rupiah-monetary', 'GetRetailSupply');
    if (reserveAfterRedemption !== reserveBeforeRedemption - 1000
        || wholesaleSupply !== wholesaleSupplyBeforeRedemption - 1000
        || supplyAfterRedemption !== supplyBeforeRedemption - 1000
        || supplyAfterRedemption !== wholesaleSupply + retailSupply) {
        fail(`redemption invariant failed: reserve=${reserveAfterRedemption}/${reserveBeforeRedemption}, wholesale=${wholesaleSupply}/${wholesaleSupplyBeforeRedemption}, total=${supplyAfterRedemption}/${supplyBeforeRedemption}, retail=${retailSupply}`);
    }
    recordCase('redemption-conservation', reserveAfterRedemption === reserveBeforeRedemption - 1000
        && wholesaleSupply === wholesaleSupplyBeforeRedemption - 1000
        && supplyAfterRedemption === supplyBeforeRedemption - 1000
        && supplyAfterRedemption === wholesaleSupply + retailSupply,
    { reserve_delta: -1000, wholesale_supply_delta: -1000, supply_delta: -1000, retail_supply: retailSupply });
    const readMSPs = Object.keys(orgs);
    const callerIDs = new Set();
    let validatorReceiptVisible = false;
    for (const orgName of readMSPs) {
        const callerID = getClientID(orgName, 'Admin');
        callerIDs.add(callerID);
        const readPeer = orgName === 'enduser' ? MEMBER_PEER : orgName;
        if (orgName === 'enduser') {
            // An EndUser Admin is not a party to the retail subject, so PDC-backed subject reads are denied.
            expectQueryRejection(orgName, 'Admin', 'rupiah-controls', 'CanPay', [retailSubject], 'access denied for subject', readPeer);
            expectQueryRejection(orgName, 'Admin', 'rupiah-controls', 'GetLimits', [retailSubject], 'access denied for subject', readPeer);
        } else {
            if (query(orgName, 'Admin', 'rupiah-controls', 'CanPay', [retailSubject]) !== true) fail(`${orgs[orgName].msp} GetCanPay disagreed for active subject`);
            const observedLimits = query(orgName, 'Admin', 'rupiah-controls', 'GetLimits', [retailSubject]);
            if (observedLimits.per_transaction !== 1000) fail(`${orgs[orgName].msp} GetLimits returned unexpected state`);
            if (query(orgName, 'Admin', 'rupiah-controls', 'GetSubject', [retailSubject]).status !== 'active') {
                fail(`${orgs[orgName].msp} GetSubject returned unexpected state`);
            }
        }
        if (query(orgName, 'Admin', 'rupiah-controls', 'CanActFor', [retailSubject], readPeer) !== false) fail(`${orgs[orgName].msp} admin unexpectedly acts for the retail subject`);
        if (query(orgName, 'Admin', 'rupiah-monetary', 'GetWholesaleSupply') !== wholesaleSupply
            || query(orgName, 'Admin', 'rupiah-monetary', 'GetRetailSupply') !== retailSupply
            || query(orgName, 'Admin', 'rupiah-monetary', 'GetTotalSupply') !== supplyAfterRedemption
            || query(orgName, 'Admin', 'rupiah-monetary', 'GetReserve', ['retail-bank']) !== reserveAfterRedemption) {
            fail(`${orgs[orgName].msp} monetary read projection disagreed`);
        }
        expectQueryRejection(orgName, 'Admin', 'rupiah-payments', 'GetBalance', [retailSubject], 'caller cannot view this wallet', readPeer);
        if (orgName === 'validator') {
            const visibleReceipt = query(orgName, 'Admin', 'rupiah-payments', 'GetReceipt', [initialPayment[3]]);
            if (visibleReceipt.reference !== initialPayment[3]) fail(`${orgs[orgName].msp} GetReceipt returned a different reference`);
            validatorReceiptVisible = true;
        } else {
            expectQueryRejection(orgName, 'Admin', 'rupiah-payments', 'GetReceipt', [initialPayment[3]], 'caller is not a party to receipt', readPeer);
        }
    }
    if (callerIDs.size !== 4) fail('GetCallerIdentity did not distinguish all four MSP admin certificates');
    recordCase('receipt-read-authorization', receipt.reference === initialPayment[3] && unrelatedReceiptDenied && validatorReceiptVisible,
    { party_read: true, unrelated_party_denied: true, validator_supervision_read: true, non_validator_denied: true });
    recordCase('msp-read-authorization', callerIDs.size === 4 && unrelatedReceiptDenied
        && enduserGetSubjectDenial.length > 0 && readMSPs.length === 4,
    { msp_read_matrix_cells: readMSPs.length * 10, unrelated_receipt_denied: true, enduser_get_subject_denied: true });
    recordCase('initialization-and-nested-debit', readMSPs.length === 4 && mspAuthorizationCells > 0
        && initializationReplayStateUnchanged,
    { initialization_checked: true, initialization_replay_state_unchanged: initializationReplayStateUnchanged, direct_internal_debit_denied_for_msps: readMSPs.length });

    const missingScenarios = LEDGER_SCENARIO_IDS.filter(id => !caseResults.some(item => item.id === id));
    const report = {
        status: missingScenarios.length === 0 ? 'passed' : 'incomplete',
        classification: missingScenarios.length === 0 ? 'pass' : 'incomplete',
        case_results: caseResults,
        missing_scenarios: missingScenarios,
        peers: ['CentralBankMSP', 'DistributorMSP', 'ValidatorMSP', 'EndUserMSP'],
        msp_authorization_denials: mspAuthorizationCells,
        nested_debit_direct_denials: readMSPs.length,
        initialization_replay_state_unchanged: initializationReplayStateUnchanged,
        read_msp_matrix_cells: readMSPs.length * 10,
        enduser_get_subject_denial: enduserGetSubjectDenial,
        policies: { monetary: 'AND(CentralBankMSP, DistributorMSP)', controls: 'AND(DistributorMSP, CentralBankMSP)', payments: 'AND(DistributorMSP, CentralBankMSP)' },
        fixtures: {
            retailSubject, secondRetailSubject, rejectedSubject, receiptReference: initialPayment[3],
        },
        receipt_read_by_unrelated_end_user: !unrelatedReceiptDenied,
        retailBalance,
        secondRetailBalance,
        reserve: reserveAfterRedemption,
        wholesale_supply: wholesaleSupply,
        retail_supply: retailSupply,
        supply: supplyAfterRedemption,
    };
    return report;
}

if (require.main === module) {
    try {
        const report = main();
        console.log(JSON.stringify(report));
        if (report.classification !== 'pass') process.exitCode = 1;
    } catch (error) {
        console.log(JSON.stringify({ status: 'failed', classification: 'fail', case_results: caseResults, missing_scenarios: LEDGER_SCENARIO_IDS.filter(id => !caseResults.some(item => item.id === id)), failure: error.message }));
        process.exitCode = 1;
    }
}

module.exports = { LEDGER_SCENARIO_IDS, main };
