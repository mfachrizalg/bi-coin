'use strict';

const crypto = require('node:crypto');
const { spawnSync } = require('node:child_process');
const { assertStateUnchanged } = require('../benchmark/compliance/outcome-analysis');
const catalog = require('../benchmark/compliance/case-catalog.json');

const LEDGER_SCENARIO_IDS = catalog.correctness_scenarios.filter(item => item.executor === 'ledger-smoke').map(item => item.id);
let caseResults = [];

const channel = 'rupiah-study';
const cliContainer = 'study-cli';
const ordererHost = 'orderer.centralbank.rupiah.study';
const ordererTls = '/study/organizations/ordererOrganizations/centralbank.rupiah.study/orderers/orderer.centralbank.rupiah.study/tls/ca.crt';
const orgs = {
    centralbank: { msp: 'CentralBankMSP', domain: 'centralbank.rupiah.study', peer: 'peer0.centralbank.rupiah.study:7051' },
    distributor: { msp: 'DistributorMSP', domain: 'distributor.rupiah.study', peer: 'peer0.distributor.rupiah.study:7051' },
    validator: { msp: 'ValidatorMSP', domain: 'validator.rupiah.study', peer: 'peer0.validator.rupiah.study:7051' },
    enduser: { msp: 'EndUserMSP', domain: 'enduser.rupiah.study', peer: 'peer0.enduser.rupiah.study:7051' },
};

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
        balances[subjectID] = query(orgName, userName, 'rupiah-payments', 'GetBalance', [subjectID]);
    }
    return {
        balances,
        reserve: query('centralbank', 'Admin', 'rupiah-monetary', 'GetReserve', ['pjp-demo']),
        supply: query('centralbank', 'Admin', 'rupiah-monetary', 'GetTotalSupply'),
        treasury: query('centralbank', 'Admin', 'rupiah-monetary', 'GetTreasury'),
    };
}

function identity(orgName, userName) {
    const org = orgs[orgName];
    if (!org) fail(`unknown org ${orgName}`);
    const userDir = `/study/organizations/peerOrganizations/${org.domain}/users/${userName}@${org.domain}/msp`;
    const cert = orgName === 'centralbank'
        ? `${userDir}/signcerts/cert.pem`
        : `${userDir}/signcerts/${userName}@${org.domain}-cert.pem`;
    const key = orgName === 'centralbank'
        ? `/study/organizations/peerOrganizations/${org.domain}/users/${userName}@${org.domain}/msp/keystore`
        : `${userDir}/keystore/priv_sk`;
    return { ...org, cert, key, userDir };
}

function dockerPeer(orgName, userName, command, args) {
    const id = identity(orgName, userName);
    const env = [
        '-e', `CORE_PEER_LOCALMSPID=${id.msp}`,
        '-e', `CORE_PEER_ADDRESS=${id.peer}`,
        '-e', `CORE_PEER_TLS_ROOTCERT_FILE=/study/organizations/peerOrganizations/${id.domain}/peers/peer0.${id.domain}/tls/ca.crt`,
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
            '--tlsRootCertFiles', `/study/organizations/peerOrganizations/${org.domain}/peers/peer0.${org.domain}/tls/ca.crt`,
        ];
    });
}

function invoke(orgName, userName, chaincode, functionName, args, endorsers) {
    const proposal = JSON.stringify({ function: functionName, Args: args.map(String) });
    const result = dockerPeer(orgName, userName, ['chaincode', 'invoke'], [
        '-o', `${ordererHost}:7050`,
        '--ordererTLSHostnameOverride', ordererHost,
        '--tls', '--cafile', ordererTls,
        '--channelID', channel,
        '--name', chaincode,
        ...endorseArgs(endorsers),
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

function expectRejected(orgName, userName, chaincode, functionName, args, endorsers) {
    const proposal = JSON.stringify({ function: functionName, Args: args.map(String) });
    const result = dockerPeer(orgName, userName, ['chaincode', 'invoke'], [
        '-o', `${ordererHost}:7050`,
        '--ordererTLSHostnameOverride', ordererHost,
        '--tls', '--cafile', ordererTls,
        '--channelID', channel,
        '--name', chaincode,
        ...endorseArgs(endorsers),
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

function expectChaincodeRejection(orgName, userName, chaincode, functionName, args, endorsers, expected) {
    try {
        invoke(orgName, userName, chaincode, functionName, args, endorsers);
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

function query(orgName, userName, chaincode, functionName, args = []) {
    const proposal = JSON.stringify({ function: functionName, Args: args.map(String) });
    const result = dockerPeer(orgName, userName, ['chaincode', 'query'], [
        '-C', channel, '-n', chaincode, '-c', proposal,
    ]);
    if (result.error || result.status !== 0) {
        fail(`${chaincode}.${functionName} query failed: ${(result.error && result.error.message) || result.stderr || result.stdout}`);
    }
    try {
        return JSON.parse(result.stdout);
    } catch {
        return result.stdout;
    }
}

function expectQueryRejection(orgName, userName, chaincode, functionName, args, expected) {
    try {
        query(orgName, userName, chaincode, functionName, args);
    } catch (error) {
        if (error.message.includes(expected)) return error.message;
        throw error;
    }
    fail(`${chaincode}.${functionName} unexpectedly returned a value`);
}

function paymentSnapshot(wallets) {
    const balances = {};
    for (const [orgName, userName, subjectID] of wallets) {
        balances[subjectID] = query(orgName, userName, 'rupiah-payments', 'GetBalance', [subjectID]);
    }
    return {
        balances,
        reserve: query('centralbank', 'Admin', 'rupiah-monetary', 'GetReserve', ['pjp-demo']),
        supply: query('centralbank', 'Admin', 'rupiah-monetary', 'GetTotalSupply'),
        treasury: query('centralbank', 'Admin', 'rupiah-monetary', 'GetTreasury'),
    };
}

function getClientID(orgName, userName) {
    return query(orgName, userName, 'rupiah-controls', 'GetCallerIdentity');
}

function setupStaff(clientID, role) {
    invokeAllowError('centralbank', 'Admin', 'rupiah-controls', 'CreateStaffPending', [clientID], ['centralbank', 'distributor'], 'staff identity already exists');
    invokeAllowError('centralbank', 'Admin', 'rupiah-controls', 'ProtectStaff', [clientID], ['centralbank', 'distributor'], 'staff identity is already protected');
    invoke('centralbank', 'Admin', 'rupiah-controls', 'SetStaffRole', [clientID, role], ['centralbank', 'distributor']);
}

function approveSubject(subjectID, category, ownerUser, riskLevel, pep, limits = ['1000', '5000', '20000', '5000']) {
    invoke('enduser', ownerUser, 'rupiah-controls', 'CreatePending', [subjectID, category], ['distributor', 'enduser']);
    invoke('distributor', 'User1', 'rupiah-controls', 'ProtectSubject', [subjectID], ['centralbank', 'distributor']);
    invoke('distributor', 'User2', 'rupiah-controls', 'SetLimits', [subjectID, ...limits], ['centralbank', 'distributor']);
    invoke('distributor', 'User1', 'rupiah-controls', 'RecordReview', [subjectID, riskLevel, String(pep)], ['centralbank', 'distributor']);
    if (riskLevel === 'high' || pep) {
        expectRejected('distributor', 'User1', 'rupiah-controls', 'DecideHighRisk', [subjectID, 'true'], ['centralbank', 'distributor']);
        invoke('distributor', 'User2', 'rupiah-controls', 'DecideHighRisk', [subjectID, 'true'], ['centralbank', 'distributor']);
    } else {
        invoke('distributor', 'User1', 'rupiah-controls', 'ApproveStandard', [subjectID, 'true'], ['centralbank', 'distributor']);
    }
}

function main() {
    caseResults = [];
    const runID = Date.now().toString(36);
    const retailSubject = `retail-${runID}-001`;
    const merchantSubject = `merchant-${runID}-001`;
    const businessSubject = `business-${runID}-001`;
    const secondRetailSubject = `retail-${runID}-002`;
    const secondMerchantSubject = `merchant-${runID}-002`;
    const secondBusinessSubject = `business-${runID}-002`;
    const rejectedSubject = `rejected-${runID}-001`;
    const highRiskSubject = `high-risk-${runID}-001`;
    const pepSubject = `pep-${runID}-001`;
    const reviewer = getClientID('distributor', 'User1');
    const senior = getClientID('distributor', 'User2');
    const compliance = getClientID('distributor', 'User3');
    const centralBankClient = getClientID('centralbank', 'Admin');
    const validatorClient = getClientID('validator', 'Admin');
    if (reviewer === senior || reviewer === compliance || senior === compliance) fail('synthetic staff certificates must be distinct');
    if ([reviewer, senior, compliance].includes(centralBankClient) || [reviewer, senior, compliance, centralBankClient].includes(validatorClient)) {
        fail('study MSP client identities must be distinct');
    }
    setupStaff(reviewer, 'kyc_reviewer');
    setupStaff(senior, 'senior_approver');
    setupStaff(compliance, 'compliance_officer');

    const authorizationChecks = [
        ['rupiah-controls', 'CreatePending', [`msp-${runID}`, 'retail'], 'EndUserMSP', ['centralbank', 'distributor']],
        ['rupiah-controls', 'ProtectSubject', [`msp-${runID}`], 'DistributorMSP', ['centralbank', 'distributor']],
        ['rupiah-controls', 'CreateStaffPending', [`msp-${runID}`], 'CentralBankMSP', ['centralbank', 'distributor']],
        ['rupiah-controls', 'ProtectStaff', [`msp-${runID}`], 'CentralBankMSP', ['centralbank', 'distributor']],
        ['rupiah-controls', 'SetStaffRole', [`msp-${runID}`, 'kyc_reviewer'], 'CentralBankMSP', ['centralbank', 'distributor']],
        ['rupiah-controls', 'RecordReview', [`msp-${runID}`, 'standard', 'false'], 'DistributorMSP', ['centralbank', 'distributor']],
        ['rupiah-controls', 'ApproveStandard', [`msp-${runID}`, 'true'], 'DistributorMSP', ['centralbank', 'distributor']],
        ['rupiah-controls', 'DecideHighRisk', [`msp-${runID}`, 'true'], 'DistributorMSP', ['centralbank', 'distributor']],
        ['rupiah-controls', 'SetLimits', [`msp-${runID}`, '1', '1', '1', '1'], 'DistributorMSP', ['centralbank', 'distributor']],
        ['rupiah-controls', 'SetBusinessAuthority', [`msp-${runID}`, '[]', '[]'], 'DistributorMSP', ['centralbank', 'distributor']],
        ['rupiah-controls', 'FreezeSubject', [`msp-${runID}`, 'dttot'], 'DistributorMSP', ['centralbank', 'distributor']],
        ['rupiah-controls', 'RequestUnfreeze', [`msp-${runID}`, crypto.createHash('sha256').update(runID).digest('hex')], 'DistributorMSP', ['centralbank', 'distributor']],
        ['rupiah-controls', 'ApproveUnfreeze', [`msp-${runID}`], 'DistributorMSP', ['centralbank', 'distributor']],
        ['rupiah-monetary', 'Initialize', [], 'CentralBankMSP', ['centralbank', 'distributor']],
        ['rupiah-monetary', 'RegisterDistributor', [`msp-${runID}`], 'CentralBankMSP', ['centralbank', 'distributor']],
        ['rupiah-monetary', 'Mint', ['1', `msp-${runID}`], 'CentralBankMSP', ['centralbank', 'distributor']],
        ['rupiah-monetary', 'AllocateReserve', ['pjp-demo', '1', `msp-${runID}`], 'CentralBankMSP', ['centralbank', 'distributor']],
        ['rupiah-monetary', 'RedeemReserve', ['pjp-demo', '1', `msp-${runID}`], 'CentralBankMSP', ['centralbank', 'distributor']],
        ['rupiah-payments', 'OpenWallet', [`msp-${runID}`], 'EndUserMSP', ['distributor', 'enduser']],
        ['rupiah-payments', 'Transfer', [`msp-${runID}`, `other-${runID}`, '1', `msp-${runID}`], 'EndUserMSP', ['distributor', 'enduser']],
        ['rupiah-payments', 'FundFromReserve', [`msp-${runID}`, 'pjp-demo', '1', `msp-${runID}`], 'DistributorMSP', ['centralbank', 'distributor', 'enduser']],
    ];
    const mspAuthorizationCells = authorizationChecks.reduce((count, [chaincode, transaction, args, allowedMSP, endorsers]) =>
        count + checkWrongMSPMatrix(chaincode, transaction, args, allowedMSP, endorsers), 0);

    invokeAllowError('centralbank', 'Admin', 'rupiah-monetary', 'Initialize', [], ['centralbank', 'distributor'], 'already initialized');
    const initializationReplayBefore = {
        treasury: query('centralbank', 'Admin', 'rupiah-monetary', 'GetTreasury'),
        supply: query('centralbank', 'Admin', 'rupiah-monetary', 'GetTotalSupply'),
    };
    const initializationReplay = invokeAllowError('centralbank', 'Admin', 'rupiah-monetary', 'Initialize', [], ['centralbank', 'distributor'], 'already initialized');
    const initializationReplayAfter = {
        treasury: query('centralbank', 'Admin', 'rupiah-monetary', 'GetTreasury'),
        supply: query('centralbank', 'Admin', 'rupiah-monetary', 'GetTotalSupply'),
    };
    const initializationReplayStateUnchanged = initializationReplay === null
        && JSON.stringify(initializationReplayBefore) === JSON.stringify(initializationReplayAfter);
    if (!initializationReplayStateUnchanged) fail('repeated monetary initialization changed ledger state');
    invokeAllowError('centralbank', 'Admin', 'rupiah-monetary', 'RegisterDistributor', ['pjp-demo'], ['centralbank', 'distributor'], 'already registered');
    invoke('centralbank', 'Admin', 'rupiah-monetary', 'Mint', ['1000000', 'issue-demo-001'], ['centralbank', 'distributor']);
    const treasuryAfterMint = query('centralbank', 'Admin', 'rupiah-monetary', 'GetTreasury');
    invoke('centralbank', 'Admin', 'rupiah-monetary', 'AllocateReserve', ['pjp-demo', '10000', `reserve-${runID}`], ['centralbank', 'distributor']);
    const reserveAfterAllocation = query('centralbank', 'Admin', 'rupiah-monetary', 'GetReserve', ['pjp-demo']);

    approveSubject(retailSubject, 'retail', 'User1', 'high', true);
    approveSubject(merchantSubject, 'merchant', 'User2', 'standard', false);
    approveSubject(businessSubject, 'business', 'User3', 'standard', false);
    approveSubject(secondRetailSubject, 'retail', 'User5', 'standard', false);
    approveSubject(secondMerchantSubject, 'merchant', 'User6', 'standard', false);
    approveSubject(secondBusinessSubject, 'business', 'User7', 'standard', false);
    approveSubject(highRiskSubject, 'retail', 'User1', 'high', false);
    approveSubject(pepSubject, 'retail', 'User1', 'standard', true);
    invoke('enduser', 'User1', 'rupiah-controls', 'CreatePending', [rejectedSubject, 'retail'], ['distributor', 'enduser']);
    invoke('distributor', 'User1', 'rupiah-controls', 'ProtectSubject', [rejectedSubject], ['centralbank', 'distributor']);
    invoke('distributor', 'User2', 'rupiah-controls', 'SetLimits', [rejectedSubject, '1000', '5000', '20000', '5000'], ['centralbank', 'distributor']);
    invoke('distributor', 'User1', 'rupiah-controls', 'RecordReview', [rejectedSubject, 'standard', 'false'], ['centralbank', 'distributor']);
    invoke('distributor', 'User1', 'rupiah-controls', 'ApproveStandard', [rejectedSubject, 'false'], ['centralbank', 'distributor']);
    if (query('validator', 'Admin', 'rupiah-controls', 'GetSubject', [rejectedSubject]).status !== 'rejected') {
        fail('explicit false decision did not reject the pending subject');
    }
    const highRiskView = query('validator', 'Admin', 'rupiah-controls', 'GetSubject', [highRiskSubject]);
    const pepView = query('validator', 'Admin', 'rupiah-controls', 'GetSubject', [pepSubject]);
    recordCase('kyc-risk-pep', highRiskView.status === 'active' && pepView.status === 'active'
        && query('validator', 'Admin', 'rupiah-controls', 'CanPay', [highRiskSubject]) === true
        && query('validator', 'Admin', 'rupiah-controls', 'CanPay', [pepSubject]) === true,
    { high_risk: highRiskView.status, pep: pepView.status, explicit_rejection: 'rejected' });
    recordCase('staff-separation', reviewer !== senior && reviewer !== compliance && senior !== compliance
        && query('distributor', 'User1', 'rupiah-controls', 'GetCallerIdentity') !== query('distributor', 'User2', 'rupiah-controls', 'GetCallerIdentity'),
    { reviewer: 'User1', senior: 'User2', compliance: 'User3' });
    expectChaincodeRejection('enduser', 'User1', 'rupiah-controls', 'CreatePending', [`invalid-${runID}`, 'other'], ['distributor', 'enduser'], 'subject_id and a supported category are required');
    const representative = getClientID('enduser', 'User4');
    invoke('distributor', 'User2', 'rupiah-controls', 'SetBusinessAuthority', [
        businessSubject, JSON.stringify([representative]), JSON.stringify([crypto.createHash('sha256').update(runID).digest('hex')]),
    ], ['centralbank', 'distributor']);
    const secondRepresentative = getClientID('enduser', 'User8');
    invoke('distributor', 'User2', 'rupiah-controls', 'SetBusinessAuthority', [
        secondBusinessSubject, JSON.stringify([secondRepresentative]), JSON.stringify([crypto.createHash('sha256').update(`second-${runID}`).digest('hex')]),
    ], ['centralbank', 'distributor']);
    if (query('enduser', 'User4', 'rupiah-controls', 'CanActFor', [businessSubject]) !== true
        || query('enduser', 'User1', 'rupiah-controls', 'CanActFor', [businessSubject]) !== false
        || query('enduser', 'User8', 'rupiah-controls', 'CanActFor', [secondBusinessSubject]) !== true) {
        fail('business representative authorization did not match the configured representative list');
    }
    invoke('distributor', 'User2', 'rupiah-controls', 'SetBusinessAuthority', [
        businessSubject, JSON.stringify([getClientID('enduser', 'User5')]), JSON.stringify([crypto.createHash('sha256').update(`replacement-${runID}`).digest('hex')]),
    ], ['centralbank', 'distributor']);
    if (query('enduser', 'User4', 'rupiah-controls', 'CanActFor', [businessSubject]) !== false
        || query('enduser', 'User5', 'rupiah-controls', 'CanActFor', [businessSubject]) !== true) {
        fail('replacing business representatives did not revoke the previous representative');
    }
    recordCase('business-authority', query('enduser', 'User4', 'rupiah-controls', 'CanActFor', [businessSubject]) === false
        && query('enduser', 'User5', 'rupiah-controls', 'CanActFor', [businessSubject]) === true
        && query('enduser', 'User8', 'rupiah-controls', 'CanActFor', [secondBusinessSubject]) === true,
    { previous_representative_revoked: true, replacement_active: true });
    const limits = query('enduser', 'User1', 'rupiah-controls', 'GetLimits', [retailSubject]);
    if (limits.per_transaction !== 1000 || limits.daily !== 5000 || limits.monthly !== 20000 || limits.holdings !== 5000) {
        fail('active subject payment limits did not match their configured values');
    }

    invoke('enduser', 'User1', 'rupiah-payments', 'OpenWallet', [retailSubject], ['distributor', 'enduser']);
    invoke('enduser', 'User2', 'rupiah-payments', 'OpenWallet', [merchantSubject], ['distributor', 'enduser']);
    invoke('enduser', 'User5', 'rupiah-payments', 'OpenWallet', [businessSubject], ['distributor', 'enduser']);
    invoke('enduser', 'User5', 'rupiah-payments', 'OpenWallet', [secondRetailSubject], ['distributor', 'enduser']);
    invoke('enduser', 'User6', 'rupiah-payments', 'OpenWallet', [secondMerchantSubject], ['distributor', 'enduser']);
    invoke('enduser', 'User8', 'rupiah-payments', 'OpenWallet', [secondBusinessSubject], ['distributor', 'enduser']);
    invoke('distributor', 'User1', 'rupiah-payments', 'FundFromReserve', [retailSubject, 'pjp-demo', '1000', `fund-retail-${runID}`], ['centralbank', 'distributor', 'enduser']);
    invoke('distributor', 'User1', 'rupiah-payments', 'FundFromReserve', [merchantSubject, 'pjp-demo', '1000', `fund-merchant-${runID}`], ['centralbank', 'distributor', 'enduser']);
    invoke('distributor', 'User1', 'rupiah-payments', 'FundFromReserve', [businessSubject, 'pjp-demo', '1000', `fund-business-${runID}`], ['centralbank', 'distributor', 'enduser']);
    invoke('distributor', 'User1', 'rupiah-payments', 'FundFromReserve', [secondRetailSubject, 'pjp-demo', '1000', `fund-retail2-${runID}`], ['centralbank', 'distributor', 'enduser']);
    invoke('distributor', 'User1', 'rupiah-payments', 'FundFromReserve', [secondMerchantSubject, 'pjp-demo', '1000', `fund-merchant2-${runID}`], ['centralbank', 'distributor', 'enduser']);
    invoke('distributor', 'User1', 'rupiah-payments', 'FundFromReserve', [secondBusinessSubject, 'pjp-demo', '1000', `fund-business2-${runID}`], ['centralbank', 'distributor', 'enduser']);
    const initialPayment = [retailSubject, merchantSubject, '100', `payment-${runID}`];
    const paymentBefore = ledgerSnapshot([['enduser', 'User1', retailSubject], ['enduser', 'User2', merchantSubject]]);
    invoke('enduser', 'User1', 'rupiah-payments', 'Transfer', initialPayment, ['distributor', 'enduser']);
    const paymentAfterFirst = ledgerSnapshot([['enduser', 'User1', retailSubject], ['enduser', 'User2', merchantSubject]]);
    invoke('enduser', 'User1', 'rupiah-payments', 'Transfer', initialPayment, ['distributor', 'enduser']);
    const paymentAfterReplay = ledgerSnapshot([['enduser', 'User1', retailSubject], ['enduser', 'User2', merchantSubject]]);
    assertStateUnchanged(paymentAfterFirst, paymentAfterReplay);
    expectChaincodeRejection('enduser', 'User1', 'rupiah-payments', 'Transfer', [retailSubject, merchantSubject, '99', initialPayment[3]], ['distributor', 'enduser'], 'reference was used for another operation');
    const paymentAfterConflict = ledgerSnapshot([['enduser', 'User1', retailSubject], ['enduser', 'User2', merchantSubject]]);
    assertStateUnchanged(paymentAfterReplay, paymentAfterConflict);
    const receipt = query('enduser', 'User1', 'rupiah-payments', 'GetReceipt', [initialPayment[3]]);
    if (receipt.amount !== 100 || receipt.from !== retailSubject || receipt.to !== merchantSubject || receipt.kind !== 'transfer') {
        fail('transfer receipt did not match the committed transfer');
    }
    const unrelatedReceipt = query('enduser', 'User6', 'rupiah-payments', 'GetReceipt', [initialPayment[3]]);
    recordCase('transfer-replay-conflict', paymentAfterFirst.balances[retailSubject] === paymentBefore.balances[retailSubject] - 100
        && paymentAfterFirst.balances[merchantSubject] === paymentBefore.balances[merchantSubject] + 100
        && receipt.amount === 100 && receipt.reference === initialPayment[3],
    { replay_state_unchanged: true, payload_conflict_state_unchanged: true, transaction_id: initialPayment[3] });
    const categoryPairs = [
        ['retail', 'retail', retailSubject, secondRetailSubject, 'User1'],
        ['retail', 'merchant', retailSubject, secondMerchantSubject, 'User1'],
        ['retail', 'business', retailSubject, secondBusinessSubject, 'User1'],
        ['merchant', 'retail', merchantSubject, secondRetailSubject, 'User2'],
        ['merchant', 'merchant', merchantSubject, secondMerchantSubject, 'User2'],
        ['merchant', 'business', merchantSubject, secondBusinessSubject, 'User2'],
        ['business', 'retail', businessSubject, secondRetailSubject, 'User5'],
        ['business', 'merchant', businessSubject, secondMerchantSubject, 'User5'],
        ['business', 'business', businessSubject, secondBusinessSubject, 'User5'],
    ];
    for (const [senderCategory, receiverCategory, sender, receiver, actor] of categoryPairs) {
        invoke('enduser', actor, 'rupiah-payments', 'Transfer', [sender, receiver, '1', `matrix-${senderCategory}-${receiverCategory}-${runID}`], ['distributor', 'enduser']);
    }

    expectRejected('centralbank', 'Admin', 'rupiah-monetary', 'Mint', ['1', `mint-underendorsed-${runID}`], ['centralbank']);
    expectRejected('enduser', 'User1', 'rupiah-payments', 'Transfer', [retailSubject, merchantSubject, '10', `payment-underendorsed-${runID}`], ['enduser']);
    expectRejected('distributor', 'User1', 'rupiah-payments', 'FundFromReserve', [retailSubject, 'pjp-demo', '10', `fund-underendorsed-${runID}`], ['distributor', 'enduser']);
    expectRejected('enduser', 'User1', 'rupiah-payments', 'Transfer', [retailSubject, merchantSubject, '10', `validator-underendorsed-${runID}`], ['validator', 'enduser']);
    expectRejected('distributor', 'User3', 'rupiah-controls', 'FreezeSubject', [retailSubject, 'dttot'], ['distributor']);
    expectChaincodeRejection('distributor', 'User1', 'rupiah-controls', 'FreezeSubject', [retailSubject, 'dttot'], ['centralbank', 'distributor'], 'staff identity lacks role compliance_officer');
    expectChaincodeRejection('centralbank', 'Admin', 'rupiah-controls', 'CreatePending', [`wrong-msp-${runID}`, 'retail'], ['centralbank', 'distributor'], 'access denied for MSP CentralBankMSP');
    expectChaincodeRejection('enduser', 'User1', 'rupiah-monetary', 'Mint', ['1', `wrong-msp-${runID}`], ['centralbank', 'distributor'], 'access denied for MSP EndUserMSP');
    expectChaincodeRejection('distributor', 'User1', 'rupiah-payments', 'Transfer', [retailSubject, merchantSubject, '1', `wrong-msp-${runID}`], ['distributor', 'enduser'], 'access denied for MSP DistributorMSP');
    expectChaincodeRejection('distributor', 'User3', 'rupiah-controls', 'FreezeSubject', [retailSubject, 'other'], ['centralbank', 'distributor'], 'unsupported restriction reason code');
    recordCase('authorization-endorsement', mspAuthorizationCells === authorizationChecks.length * (Object.keys(orgs).length - 1),
        { wrong_msp_denials: mspAuthorizationCells, underendorsed_operations: 4 });

    for (const orgName of Object.keys(orgs)) {
        expectChaincodeRejection(
            orgName, 'Admin', 'rupiah-monetary', 'DebitReserveForFunding', ['pjp-demo', retailSubject, '10', `direct-debit-${orgName}-${runID}`],
            ['centralbank', 'distributor'], 'FundFromReserve is callable only through rupiah-payments.FundFromReserve',
        );
    }
    const testedRestrictionReasons = new Set(['dttot']);
    invoke('distributor', 'User3', 'rupiah-controls', 'FreezeSubject', [retailSubject, 'dttot'], ['centralbank', 'distributor']);
    if (query('enduser', 'User1', 'rupiah-controls', 'CanPay', [retailSubject]) !== false) fail('frozen subject remained eligible');
    expectChaincodeRejection('enduser', 'User1', 'rupiah-payments', 'Transfer', [retailSubject, merchantSubject, '1', `frozen-transfer-${runID}`], ['distributor', 'enduser'], 'not eligible to pay or receive');
    const releaseEvidence = crypto.createHash('sha256').update(`authority-${runID}`).digest('hex');
    invoke('distributor', 'User1', 'rupiah-controls', 'RequestUnfreeze', [retailSubject, releaseEvidence], ['centralbank', 'distributor']);
    expectRejected('distributor', 'User1', 'rupiah-controls', 'ApproveUnfreeze', [retailSubject], ['centralbank', 'distributor']);
    invoke('distributor', 'User2', 'rupiah-controls', 'ApproveUnfreeze', [retailSubject], ['centralbank', 'distributor']);
    if (query('enduser', 'User1', 'rupiah-controls', 'CanPay', [retailSubject]) !== true) fail('released subject is not eligible');

    for (const [reason, label] of [
        ['authority_order', 'different reason'],
        ['authority_order', 'same reason'],
        ['internal_review', 'third reason'],
    ]) {
        invoke('distributor', 'User3', 'rupiah-controls', 'FreezeSubject', [retailSubject, reason], ['centralbank', 'distributor']);
        testedRestrictionReasons.add(reason);
        const reblockedSubject = query('validator', 'Admin', 'rupiah-controls', 'GetSubject', [retailSubject]);
        if (!reblockedSubject.restricted || reblockedSubject.authority_evidence_ref) {
            fail(`${label} reblock retained prior release evidence`);
        }
        expectChaincodeRejection(
            'distributor', 'User2', 'rupiah-controls', 'ApproveUnfreeze', [retailSubject],
            ['centralbank', 'distributor'], 'unfreeze requires authority evidence',
        );
        if (query('enduser', 'User1', 'rupiah-controls', 'CanPay', [retailSubject]) !== false) {
            fail(`${label} reblock became eligible without a new reviewer request`);
        }
        invoke('distributor', 'User1', 'rupiah-controls', 'RequestUnfreeze', [retailSubject, releaseEvidence], ['centralbank', 'distributor']);
        invoke('distributor', 'User2', 'rupiah-controls', 'ApproveUnfreeze', [retailSubject], ['centralbank', 'distributor']);
        if (query('enduser', 'User1', 'rupiah-controls', 'CanPay', [retailSubject]) !== true) {
            fail(`${label} reblock could not be released after a fresh reviewer request`);
        }
    }
    recordCase('restriction-reasons', ['dttot', 'authority_order', 'internal_review'].every(reason => testedRestrictionReasons.has(reason)),
        { tested: [...testedRestrictionReasons] });
    recordCase('fresh-release-evidence', true, { old_evidence_cleared: true, fresh_request_required: true, repeated_reason_checked: true });

    const oversightRecord = query('validator', 'Admin', 'rupiah-controls', 'GetSubject', [retailSubject]);
    if (oversightRecord.status !== 'active') fail('ValidatorMSP cannot read the committed audit subject');
    if (!Array.isArray(oversightRecord.representatives) || !Array.isArray(oversightRecord.beneficial_owner_refs)) {
        fail('ValidatorMSP subject view omitted business authority fields');
    }
    const enduserGetSubjectDenial = expectQueryRejection('enduser', 'Admin', 'rupiah-controls', 'GetSubject', [retailSubject], 'error handling success response');

    const retailBalance = query('enduser', 'User1', 'rupiah-payments', 'GetBalance', [retailSubject]);
    const merchantBalance = query('enduser', 'User2', 'rupiah-payments', 'GetBalance', [merchantSubject]);
    const reserve = query('centralbank', 'Admin', 'rupiah-monetary', 'GetReserve', ['pjp-demo']);
    const secondRetailBalance = query('enduser', 'User5', 'rupiah-payments', 'GetBalance', [secondRetailSubject]);
    const secondMerchantBalance = query('enduser', 'User6', 'rupiah-payments', 'GetBalance', [secondMerchantSubject]);
    const secondBusinessBalance = query('enduser', 'User8', 'rupiah-payments', 'GetBalance', [secondBusinessSubject]);
    if (retailBalance !== 897 || merchantBalance !== 1097 || secondRetailBalance !== 1003 || secondMerchantBalance !== 1003
        || secondBusinessBalance !== 1003 || reserve !== reserveAfterAllocation - 6000) {
        fail(`unexpected payment matrix state: retail=${retailBalance}, merchant=${merchantBalance}, retail2=${secondRetailBalance}, merchant2=${secondMerchantBalance}, business2=${secondBusinessBalance}, reserve=${reserve}`);
    }
    recordCase('transfer-category-matrix', retailBalance === 897 && merchantBalance === 1097
        && secondRetailBalance === 1003 && secondMerchantBalance === 1003 && secondBusinessBalance === 1003,
    { sender_recipient_category_pairs: 9, balances_conserved: true });

    const limitSender = `limits-${runID}-sender`;
    const dailyReceiver = `limits-${runID}-daily-receiver`;
    const holdingSender = `limits-${runID}-holding-sender`;
    const holdingReceiver = `limits-${runID}-holding-receiver`;
    approveSubject(limitSender, 'retail', 'User5', 'standard', false, ['10', '20', '100', '1000']);
    approveSubject(dailyReceiver, 'retail', 'User6', 'standard', false, ['100', '100', '100', '1000']);
    approveSubject(holdingSender, 'retail', 'User7', 'standard', false, ['10', '100', '100', '1000']);
    approveSubject(holdingReceiver, 'retail', 'User8', 'standard', false, ['10', '100', '100', '10']);
    for (const [subjectID, user] of [[limitSender, 'User5'], [dailyReceiver, 'User6'], [holdingSender, 'User7'], [holdingReceiver, 'User8']]) {
        invoke('enduser', user, 'rupiah-payments', 'OpenWallet', [subjectID], ['distributor', 'enduser']);
    }
    invoke('distributor', 'User1', 'rupiah-payments', 'FundFromReserve', [limitSender, 'pjp-demo', '100', `limits-fund-${runID}`], ['centralbank', 'distributor', 'enduser']);
    invoke('distributor', 'User1', 'rupiah-payments', 'FundFromReserve', [holdingSender, 'pjp-demo', '20', `holdings-fund-${runID}`], ['centralbank', 'distributor', 'enduser']);
    const limitSenderState = () => ledgerSnapshot([['enduser', 'User5', limitSender], ['enduser', 'User6', dailyReceiver]]);
    invoke('enduser', 'User5', 'rupiah-payments', 'Transfer', [limitSender, dailyReceiver, '10', `limits-exact-per-tx-${runID}`], ['distributor', 'enduser']);
    const afterPerTxExact = limitSenderState();
    const beforePerTxFailure = limitSenderState();
    expectChaincodeRejection('enduser', 'User5', 'rupiah-payments', 'Transfer', [limitSender, dailyReceiver, '11', `limits-over-per-tx-${runID}`], ['distributor', 'enduser'], 'per-transaction limit');
    assertStateUnchanged(beforePerTxFailure, limitSenderState());
    invoke('enduser', 'User5', 'rupiah-payments', 'Transfer', [limitSender, dailyReceiver, '10', `limits-exact-daily-${runID}`], ['distributor', 'enduser']);
    const beforeDailyFailure = limitSenderState();
    expectChaincodeRejection('enduser', 'User5', 'rupiah-payments', 'Transfer', [limitSender, dailyReceiver, '1', `limits-over-daily-${runID}`], ['distributor', 'enduser'], 'daily payment limit');
    assertStateUnchanged(beforeDailyFailure, limitSenderState());
    const beforeHoldingExact = ledgerSnapshot([['enduser', 'User7', holdingSender], ['enduser', 'User8', holdingReceiver]]);
    invoke('enduser', 'User7', 'rupiah-payments', 'Transfer', [holdingSender, holdingReceiver, '10', `limits-exact-holdings-${runID}`], ['distributor', 'enduser']);
    const afterHoldingExact = ledgerSnapshot([['enduser', 'User7', holdingSender], ['enduser', 'User8', holdingReceiver]]);
    if (afterHoldingExact.balances[holdingReceiver] !== 10) fail('recipient holdings exact boundary was not accepted');
    expectChaincodeRejection('enduser', 'User7', 'rupiah-payments', 'Transfer', [holdingSender, holdingReceiver, '1', `limits-over-holdings-${runID}`], ['distributor', 'enduser'], 'recipient holdings limit');
    assertStateUnchanged(afterHoldingExact, ledgerSnapshot([['enduser', 'User7', holdingSender], ['enduser', 'User8', holdingReceiver]]));
    recordCase('transaction-limits', afterPerTxExact.balances[dailyReceiver] === 10
        && beforeDailyFailure.balances[dailyReceiver] === 20 && afterHoldingExact.balances[holdingReceiver] === 10,
    { per_transaction_exact: true, per_transaction_excess_unchanged: true, daily_exact: true, daily_excess_unchanged: true, holdings_exact: true, holdings_excess_unchanged: true });

    const conversionSubject = `conversion-${runID}`;
    approveSubject(conversionSubject, 'retail', 'User5', 'standard', false, ['100', '1000', '1000', '1000']);
    invoke('enduser', 'User5', 'rupiah-payments', 'OpenWallet', [conversionSubject], ['distributor', 'enduser']);
    const conversionReference = `conversion-replay-${runID}`;
    const conversionBefore = ledgerSnapshot([['enduser', 'User5', conversionSubject]]);
    invoke('distributor', 'User1', 'rupiah-payments', 'FundFromReserve', [conversionSubject, 'pjp-demo', '10', conversionReference], ['centralbank', 'distributor', 'enduser']);
    const conversionAfterFirst = ledgerSnapshot([['enduser', 'User5', conversionSubject]]);
    invoke('distributor', 'User1', 'rupiah-payments', 'FundFromReserve', [conversionSubject, 'pjp-demo', '10', conversionReference], ['centralbank', 'distributor', 'enduser']);
    const conversionAfterReplay = ledgerSnapshot([['enduser', 'User5', conversionSubject]]);
    assertStateUnchanged(conversionAfterFirst, conversionAfterReplay);
    expectChaincodeRejection('distributor', 'User1', 'rupiah-payments', 'FundFromReserve', [conversionSubject, 'pjp-demo', '11', conversionReference], ['centralbank', 'distributor', 'enduser'], 'reference was used for another operation');
    const conversionAfterConflict = ledgerSnapshot([['enduser', 'User5', conversionSubject]]);
    assertStateUnchanged(conversionAfterReplay, conversionAfterConflict);
    const conversionReceipt = query('enduser', 'User5', 'rupiah-payments', 'GetReceipt', [conversionReference]);
    recordCase('conversion-replay-conflict', conversionAfterFirst.balances[conversionSubject] === conversionBefore.balances[conversionSubject] + 10
        && conversionAfterFirst.reserve === conversionBefore.reserve - 10
        && conversionReceipt.amount === 10 && conversionReceipt.kind === 'funding',
    { exact_replay_state_unchanged: true, payload_conflict_state_unchanged: true, receipt_reference: conversionReceipt.reference });

    const reserveFailureSubject = `reserve-failure-${runID}`;
    const reserveForFailure = query('centralbank', 'Admin', 'rupiah-monetary', 'GetReserve', ['pjp-demo']);
    const beyondReserve = reserveForFailure + 1;
    const largeLimits = [String(beyondReserve + 1), String(beyondReserve + 1), String(beyondReserve + 1), String(beyondReserve + 1)];
    approveSubject(reserveFailureSubject, 'retail', 'User6', 'standard', false, largeLimits);
    invoke('enduser', 'User6', 'rupiah-payments', 'OpenWallet', [reserveFailureSubject], ['distributor', 'enduser']);
    const insufficientBefore = ledgerSnapshot([['enduser', 'User6', reserveFailureSubject]]);
    expectChaincodeRejection('distributor', 'User1', 'rupiah-payments', 'FundFromReserve', [reserveFailureSubject, 'pjp-demo', String(beyondReserve), `insufficient-reserve-${runID}`], ['centralbank', 'distributor', 'enduser'], 'distributor reserve');
    const insufficientAfter = ledgerSnapshot([['enduser', 'User6', reserveFailureSubject]]);
    assertStateUnchanged(insufficientBefore, insufficientAfter);
    recordCase('conversion-insufficient-reserve', insufficientBefore.balances[reserveFailureSubject] === 0
        && insufficientAfter.reserve === insufficientBefore.reserve,
    { rejected_amount: beyondReserve, wallet_and_reserve_unchanged: true });

    const holdingsSubject = `conversion-holdings-${runID}`;
    approveSubject(holdingsSubject, 'retail', 'User8', 'standard', false, ['100', '100', '100', '100']);
    invoke('enduser', 'User8', 'rupiah-payments', 'OpenWallet', [holdingsSubject], ['distributor', 'enduser']);
    invoke('distributor', 'User1', 'rupiah-payments', 'FundFromReserve', [holdingsSubject, 'pjp-demo', '100', `holdings-exact-${runID}`], ['centralbank', 'distributor', 'enduser']);
    const holdingsAtLimit = ledgerSnapshot([['enduser', 'User8', holdingsSubject]]);
    expectChaincodeRejection('distributor', 'User1', 'rupiah-payments', 'FundFromReserve', [holdingsSubject, 'pjp-demo', '1', `holdings-over-${runID}`], ['centralbank', 'distributor', 'enduser'], 'recipient holdings limit exceeded');
    assertStateUnchanged(holdingsAtLimit, ledgerSnapshot([['enduser', 'User8', holdingsSubject]]));
    recordCase('conversion-holdings-limit', holdingsAtLimit.balances[holdingsSubject] === 100,
        { holdings_exact: true, one_unit_over_unchanged: true });

    const beforeEndorsementFailure = ledgerSnapshot([['enduser', 'User5', conversionSubject]]);
    expectRejected('distributor', 'User1', 'rupiah-payments', 'FundFromReserve', [conversionSubject, 'pjp-demo', '5', `fund-underendorsed-atomic-${runID}`], ['distributor', 'enduser']);
    assertStateUnchanged(beforeEndorsementFailure, ledgerSnapshot([['enduser', 'User5', conversionSubject]]));
    recordCase('conversion-failure-atomicity', true, { incomplete_endorsement_left_wallet_and_reserve_unchanged: true });

    const supplyBeforeRedemption = query('centralbank', 'Admin', 'rupiah-monetary', 'GetTotalSupply');
    const reserveBeforeRedemption = query('centralbank', 'Admin', 'rupiah-monetary', 'GetReserve', ['pjp-demo']);
    const beforeInsufficientRedemption = ledgerSnapshot();
    expectChaincodeRejection('centralbank', 'Admin', 'rupiah-monetary', 'RedeemReserve', ['pjp-demo', String(reserveBeforeRedemption + 1), `redeem-too-large-${runID}`], ['centralbank', 'distributor'], 'distributor reserve');
    assertStateUnchanged(beforeInsufficientRedemption, ledgerSnapshot());
    const redemptionReference = `redeem-${runID}`;
    invoke('centralbank', 'Admin', 'rupiah-monetary', 'RedeemReserve', ['pjp-demo', '1000', redemptionReference], ['centralbank', 'distributor']);
    const afterFirstRedemption = ledgerSnapshot();
    invoke('centralbank', 'Admin', 'rupiah-monetary', 'RedeemReserve', ['pjp-demo', '1000', redemptionReference], ['centralbank', 'distributor']);
    const afterRedemptionReplay = ledgerSnapshot();
    assertStateUnchanged(afterFirstRedemption, afterRedemptionReplay);
    expectChaincodeRejection('centralbank', 'Admin', 'rupiah-monetary', 'RedeemReserve', ['pjp-demo', '999', redemptionReference], ['centralbank', 'distributor'], 'reference');
    assertStateUnchanged(afterRedemptionReplay, ledgerSnapshot());
    recordCase('redemption-replay-conflict', true, { exact_replay_state_unchanged: true, payload_conflict_state_unchanged: true, insufficient_reserve_state_unchanged: true });
    const reserveAfterRedemption = query('centralbank', 'Admin', 'rupiah-monetary', 'GetReserve', ['pjp-demo']);
    const supplyAfterRedemption = query('centralbank', 'Admin', 'rupiah-monetary', 'GetTotalSupply');
    const treasury = query('centralbank', 'Admin', 'rupiah-monetary', 'GetTreasury');
    if (reserveAfterRedemption !== reserveBeforeRedemption - 1000
        || supplyAfterRedemption !== supplyBeforeRedemption - 1000
        || treasury !== treasuryAfterMint - 10000) {
        fail(`redemption invariant failed: reserve=${reserveAfterRedemption}/${reserveBeforeRedemption}, supply=${supplyAfterRedemption}/${supplyBeforeRedemption}, treasury=${treasury}`);
    }
    recordCase('redemption-conservation', reserveAfterRedemption === reserveBeforeRedemption - 1000
        && supplyAfterRedemption === supplyBeforeRedemption - 1000
        && treasury === treasuryAfterMint - 10000,
    { reserve_delta: -1000, supply_delta: -1000, treasury });
    const readMSPs = Object.keys(orgs);
    const callerIDs = new Set();
    let enduserAdminGetSubjectProjectionError;
    for (const orgName of readMSPs) {
        const callerID = getClientID(orgName, 'Admin');
        callerIDs.add(callerID);
        if (query(orgName, 'Admin', 'rupiah-controls', 'CanPay', [retailSubject]) !== true) fail(`${orgs[orgName].msp} GetCanPay disagreed for active subject`);
        const observedLimits = query(orgName, 'Admin', 'rupiah-controls', 'GetLimits', [retailSubject]);
        if (observedLimits.per_transaction !== 1000) fail(`${orgs[orgName].msp} GetLimits returned unexpected state`);
        if (query(orgName, 'Admin', 'rupiah-controls', 'CanActFor', [retailSubject]) !== false) fail(`${orgs[orgName].msp} admin unexpectedly acts for the retail subject`);
        if (orgName === 'enduser') {
            enduserAdminGetSubjectProjectionError = expectQueryRejection(
                orgName, 'Admin', 'rupiah-controls', 'GetSubject', [retailSubject], 'error handling success response',
            );
        } else if (query(orgName, 'Admin', 'rupiah-controls', 'GetSubject', [retailSubject]).status !== 'active') {
            fail(`${orgs[orgName].msp} GetSubject returned unexpected state`);
        }
        if (query(orgName, 'Admin', 'rupiah-monetary', 'GetTreasury') !== treasury
            || query(orgName, 'Admin', 'rupiah-monetary', 'GetTotalSupply') !== supplyAfterRedemption
            || query(orgName, 'Admin', 'rupiah-monetary', 'GetReserve', ['pjp-demo']) !== reserveAfterRedemption) {
            fail(`${orgs[orgName].msp} monetary read projection disagreed`);
        }
        expectQueryRejection(orgName, 'Admin', 'rupiah-payments', 'GetBalance', [retailSubject], 'caller cannot view this wallet');
        const visibleReceipt = query(orgName, 'Admin', 'rupiah-payments', 'GetReceipt', [initialPayment[3]]);
        if (visibleReceipt.reference !== initialPayment[3]) fail(`${orgs[orgName].msp} GetReceipt returned a different reference`);
    }
    if (callerIDs.size !== 4) fail('GetCallerIdentity did not distinguish all four MSP admin certificates');
    recordCase('msp-read-authorization', callerIDs.size === 4 && unrelatedReceipt.reference === initialPayment[3]
        && enduserGetSubjectDenial.length > 0 && readMSPs.length === 4,
    { msp_read_matrix_cells: readMSPs.length * 10, unrelated_receipt_read: true, enduser_get_subject_denied: true });
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
        enduser_admin_get_subject_projection_error: enduserAdminGetSubjectProjectionError,
        policies: { monetary: 'CentralBankMSP+DistributorMSP', controls: 'CentralBankMSP+DistributorMSP for writes', payments: 'DistributorMSP+EndUserMSP', funding: 'all three' },
        fixtures: {
            retailSubject, merchantSubject, businessSubject, secondRetailSubject, secondMerchantSubject, secondBusinessSubject,
            rejectedSubject, highRiskSubject, pepSubject, businessRepresentative: representative, receiptReference: initialPayment[3],
        },
        receipt_read_by_unrelated_end_user: unrelatedReceipt.reference === initialPayment[3],
        retailBalance,
        merchantBalance,
        reserve: reserveAfterRedemption,
        supply: supplyAfterRedemption,
        treasury,
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
