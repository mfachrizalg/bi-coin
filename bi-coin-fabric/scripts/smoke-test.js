'use strict';

const crypto = require('node:crypto');
const { spawnSync } = require('node:child_process');
const { assertStateUnchanged } = require('../benchmark/compliance/outcome-analysis');
const catalog = require('../benchmark/compliance/case-catalog.json');

const LEDGER_SCENARIO_IDS = catalog.correctness_scenarios.filter(item => item.executor === 'ledger-smoke').map(item => item.id);
let caseResults = [];

const channel = 'bi-coin';
// SetTransferLimit needs a positive value; this one never binds in the smoke run.
const NO_TRANSFER_LIMIT = String(Number.MAX_SAFE_INTEGER);
const cliContainer = 'bi-coin-cli';
const ordererHost = 'orderer.centralbank.bi-coin';
const ordererTls = '/network/organizations/ordererOrganizations/centralbank.bi-coin/orderers/orderer.centralbank.bi-coin/tls/ca.crt';
const orgs = {
    centralbank: { msp: 'CentralBankMSP', domain: 'centralbank.bi-coin', peer: 'peer0.centralbank.bi-coin:7051' },
    distributor: { msp: 'DistributorMSP', domain: 'distributor.bi-coin', peer: 'peer0.distributor.bi-coin:7051' },
    validator: { msp: 'ValidatorMSP', domain: 'validator.bi-coin', peer: 'peer0.validator.bi-coin:7051' },
    enduser: { msp: 'EndUserMSP', domain: 'enduser.bi-coin', peer: 'peer0.enduser.bi-coin:7051' },
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

function dockerPeer(orgName, userName, command, args) {
    const id = identity(orgName, userName);
    const env = [
        '-e', `CORE_PEER_LOCALMSPID=${id.msp}`,
        '-e', `CORE_PEER_ADDRESS=${id.peer}`,
        '-e', `CORE_PEER_TLS_ROOTCERT_FILE=/network/organizations/peerOrganizations/${id.domain}/peers/peer0.${id.domain}/tls/ca.crt`,
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

function admissionRef(distributorID) {
    return crypto.createHash('sha256').update(`bi-admission:${distributorID}`).digest('hex');
}

// PBI No. 10 Tahun 2025 Pasal 81-82: suspended blocks only outgoing activity, frozen blocks all,
// closing needs settled obligations and is final.
function runParticipantStatusCases(runID) {
    const monetary = ['centralbank', 'distributor'];
    const setStatus = (bank, status, reason) => invoke('centralbank', 'Admin', 'rupiah-monetary', 'SetParticipantStatus', [bank, status, reason], monetary);
    const rejected = (org, user, chaincode, fn, args, endorsers, expected) => {
        const before = ledgerSnapshot();
        expectChaincodeRejection(org, user, chaincode, fn, args, endorsers, expected);
        assertStateUnchanged(before, ledgerSnapshot());
    };

    setStatus('retail-bank', 'suspended', 'administrative_sanction');
    rejected('distributor', 'User1', 'rupiah-payments', 'ConvertToRetail', ['retail-bank', '1', `suspended-convert-${runID}`], ['centralbank', 'distributor', 'enduser'], 'does not allow send');
    rejected('distributor', 'User1', 'rupiah-payments', 'FundWallet', [`suspended-${runID}`, 'retail-bank', '1', `suspended-fund-${runID}`], ['distributor', 'enduser'], 'participant status does not allow funding');
    rejected('distributor', 'User1', 'rupiah-monetary', 'TransferReserve', ['retail-bank', 'wholesale-bank', '1', `suspended-send-${runID}`], monetary, 'does not allow send');
    const suspendedReserve = query('centralbank', 'Admin', 'rupiah-monetary', 'GetReserve', ['retail-bank']);
    invoke('centralbank', 'Admin', 'rupiah-monetary', 'Issue', ['retail-bank', '1', `suspended-issue-${runID}`], monetary);
    invoke('distributor', 'User4', 'rupiah-monetary', 'TransferReserve', ['wholesale-bank', 'retail-bank', '1', `suspended-receive-${runID}`], monetary);
    invoke('centralbank', 'Admin', 'rupiah-monetary', 'RedeemReserve', ['retail-bank', '2', `suspended-redeem-${runID}`], monetary);
    const suspendedIncomingAllowed = query('centralbank', 'Admin', 'rupiah-monetary', 'GetReserve', ['retail-bank']) === suspendedReserve;

    setStatus('retail-bank', 'frozen', 'authority_request');
    rejected('centralbank', 'Admin', 'rupiah-monetary', 'Issue', ['retail-bank', '1', `frozen-issue-${runID}`], monetary, 'does not allow issue');
    rejected('centralbank', 'Admin', 'rupiah-monetary', 'RedeemReserve', ['retail-bank', '1', `frozen-redeem-${runID}`], monetary, 'does not allow redeem');
    rejected('distributor', 'User4', 'rupiah-monetary', 'TransferReserve', ['wholesale-bank', 'retail-bank', '1', `frozen-receive-${runID}`], monetary, 'does not allow receive');
    expectChaincodeRejection('centralbank', 'Admin', 'rupiah-monetary', 'SetParticipantStatus', ['retail-bank', 'paused', 'participation_policy'], monetary, 'unsupported participant status');
    expectChaincodeRejection('centralbank', 'Admin', 'rupiah-monetary', 'SetParticipantStatus', ['retail-bank', 'active', 'other'], monetary, 'unsupported status reason code');
    setStatus('retail-bank', 'active', 'participation_policy');
    const reactivated = query('centralbank', 'Admin', 'rupiah-monetary', 'GetParticipant', ['retail-bank']);
    recordCase('participant-status-matrix', suspendedIncomingAllowed && reactivated.status === 'active' && reactivated.status_reason === 'participation_policy',
        { suspended_outgoing_denied: 3, suspended_incoming_allowed: suspendedIncomingAllowed, frozen_denied: 3, unknown_codes_denied: 2, reactivated: true });

    const closing = `closing-${runID}`;
    invoke('centralbank', 'Admin', 'rupiah-monetary', 'RegisterDistributor', [closing, 'retail', admissionRef(closing)], monetary);
    invoke('centralbank', 'Admin', 'rupiah-monetary', 'Issue', [closing, '10', `closing-issue-${runID}`], monetary);
    expectChaincodeRejection('centralbank', 'Admin', 'rupiah-monetary', 'SetParticipantStatus', [closing, 'closed', 'participant_request'], monetary, 'participant must settle its reserve before closing');
    invoke('centralbank', 'Admin', 'rupiah-monetary', 'RedeemReserve', [closing, '10', `closing-redeem-${runID}`], monetary);
    setStatus(closing, 'closed', 'participant_request');
    expectChaincodeRejection('centralbank', 'Admin', 'rupiah-monetary', 'SetParticipantStatus', [closing, 'active', 'participation_policy'], monetary, 'a closed participant cannot change status');
    rejected('centralbank', 'Admin', 'rupiah-monetary', 'Issue', [closing, '1', `closed-issue-${runID}`], monetary, 'does not allow issue');
    recordCase('participant-closure', query('centralbank', 'Admin', 'rupiah-monetary', 'GetParticipant', [closing]).status === 'closed',
        { unsettled_close_denied: true, settled_close_allowed: true, reopen_denied: true, closed_issue_denied: true });
}

function convertAndFund(subjectID, amount, reference) {
    invoke('distributor', 'User1', 'rupiah-payments', 'ConvertToRetail', ['retail-bank', amount, `convert-${reference}`], ['centralbank', 'distributor', 'enduser']);
    invoke('distributor', 'User1', 'rupiah-payments', 'FundWallet', [subjectID, 'retail-bank', amount, `fund-${reference}`], ['distributor', 'enduser']);
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
        ['rupiah-monetary', 'RegisterDistributor', [`msp-${runID}`, 'retail', admissionRef(`msp-${runID}`)], 'CentralBankMSP', ['centralbank', 'distributor']],
        ['rupiah-monetary', 'SetParticipantStatus', [`msp-${runID}`, 'active', 'participation_policy'], 'CentralBankMSP', ['centralbank', 'distributor']],
        ['rupiah-monetary', 'SetTransferLimit', ['1'], 'CentralBankMSP', ['centralbank', 'distributor']],
        ['rupiah-monetary', 'Issue', [`msp-${runID}`, '1', `msp-${runID}`], 'CentralBankMSP', ['centralbank', 'distributor']],
        ['rupiah-monetary', 'RedeemReserve', ['wholesale-bank', '1', `msp-${runID}`], 'CentralBankMSP', ['centralbank', 'distributor']],
        ['rupiah-monetary', 'TransferReserve', ['wholesale-bank', 'retail-bank', '1', `msp-${runID}`], 'DistributorMSP', ['centralbank', 'distributor']],
        ['rupiah-monetary', 'ApproveTransfer', [`msp-${runID}`], 'DistributorMSP', ['centralbank', 'distributor']],
        ['rupiah-monetary', 'RejectTransfer', [`msp-${runID}`], 'DistributorMSP', ['centralbank', 'distributor']],
        ['rupiah-monetary', 'ProposeApprovalThreshold', ['wholesale-bank', '1'], 'DistributorMSP', ['centralbank', 'distributor']],
        ['rupiah-monetary', 'ApproveApprovalThreshold', ['wholesale-bank', '1'], 'DistributorMSP', ['centralbank', 'distributor']],
        ['rupiah-payments', 'OpenWallet', [`msp-${runID}`], 'EndUserMSP', ['distributor', 'enduser']],
        ['rupiah-payments', 'Transfer', [`msp-${runID}`, `other-${runID}`, '1', `msp-${runID}`], 'EndUserMSP', ['distributor', 'enduser']],
        ['rupiah-payments', 'ConvertToRetail', ['retail-bank', '1', `msp-${runID}`], 'DistributorMSP', ['centralbank', 'distributor', 'enduser']],
        ['rupiah-payments', 'FundWallet', [`msp-${runID}`, 'retail-bank', '1', `msp-${runID}`], 'DistributorMSP', ['distributor', 'enduser']],
    ];
    const mspAuthorizationCells = authorizationChecks.reduce((count, [chaincode, transaction, args, allowedMSP, endorsers]) =>
        count + checkWrongMSPMatrix(chaincode, transaction, args, allowedMSP, endorsers), 0);

    invokeAllowError('centralbank', 'Admin', 'rupiah-monetary', 'Initialize', [], ['centralbank', 'distributor'], 'already initialized');
    const initializationReplayBefore = {
        wholesaleSupply: query('centralbank', 'Admin', 'rupiah-monetary', 'GetWholesaleSupply'),
        retailSupply: query('centralbank', 'Admin', 'rupiah-monetary', 'GetRetailSupply'),
        supply: query('centralbank', 'Admin', 'rupiah-monetary', 'GetTotalSupply'),
    };
    const initializationReplay = invokeAllowError('centralbank', 'Admin', 'rupiah-monetary', 'Initialize', [], ['centralbank', 'distributor'], 'already initialized');
    const initializationReplayAfter = {
        wholesaleSupply: query('centralbank', 'Admin', 'rupiah-monetary', 'GetWholesaleSupply'),
        retailSupply: query('centralbank', 'Admin', 'rupiah-monetary', 'GetRetailSupply'),
        supply: query('centralbank', 'Admin', 'rupiah-monetary', 'GetTotalSupply'),
    };
    const initializationReplayStateUnchanged = initializationReplay === null
        && JSON.stringify(initializationReplayBefore) === JSON.stringify(initializationReplayAfter);
    if (!initializationReplayStateUnchanged) fail('repeated monetary initialization changed ledger state');
    invokeAllowError('centralbank', 'Admin', 'rupiah-monetary', 'RegisterDistributor', ['wholesale-bank', 'wholesale', admissionRef('wholesale-bank')], ['centralbank', 'distributor'], 'already registered');
    invokeAllowError('centralbank', 'Admin', 'rupiah-monetary', 'RegisterDistributor', ['retail-bank', 'retail', admissionRef('retail-bank')], ['centralbank', 'distributor'], 'already registered');
    // An earlier failed run may have left a bank suspended or a low transfer limit.
    for (const bank of ['wholesale-bank', 'retail-bank']) {
        invoke('centralbank', 'Admin', 'rupiah-monetary', 'SetParticipantStatus', [bank, 'active', 'participation_policy'], ['centralbank', 'distributor']);
    }
    invoke('centralbank', 'Admin', 'rupiah-monetary', 'SetTransferLimit', [NO_TRANSFER_LIMIT], ['centralbank', 'distributor']);
    invoke('centralbank', 'Admin', 'rupiah-monetary', 'Issue', ['wholesale-bank', '1000000', 'issue-demo-001'], ['centralbank', 'distributor']);

    const beforeMissingAdmission = ledgerSnapshot();
    expectChaincodeRejection('centralbank', 'Admin', 'rupiah-monetary', 'RegisterDistributor', [`no-admission-${runID}`, 'retail', 'approval-letter'], ['centralbank', 'distributor'], 'admission_ref must be a SHA-256 reference');
    assertStateUnchanged(beforeMissingAdmission, ledgerSnapshot());
    expectQueryRejection('centralbank', 'Admin', 'rupiah-monetary', 'GetParticipant', [`no-admission-${runID}`], 'not found');
    const admittedBanks = ['wholesale-bank', 'retail-bank'].map(bank => query('centralbank', 'Admin', 'rupiah-monetary', 'GetParticipant', [bank]));
    recordCase('participant-admission-evidence', admittedBanks.every(bank => /^[0-9a-f]{64}$/.test(bank.admission_ref) && bank.status === 'active'),
        { missing_evidence_rejected: true, state_unchanged: true, admitted_banks_have_evidence: admittedBanks.length });

    // Four-eyes: the sender's approval threshold decides whether a transfer waits for a second officer.
    expectChaincodeRejection('distributor', 'User1', 'rupiah-monetary', 'ProposeApprovalThreshold', ['wholesale-bank', '5000'], ['centralbank', 'distributor'], 'access denied for distributor wholesale-bank');
    invoke('distributor', 'User4', 'rupiah-monetary', 'ProposeApprovalThreshold', ['wholesale-bank', '5000'], ['centralbank', 'distributor']);
    expectChaincodeRejection('distributor', 'User4', 'rupiah-monetary', 'ApproveApprovalThreshold', ['wholesale-bank', '5000'], ['centralbank', 'distributor'], 'the proposer cannot approve their own threshold change');
    expectChaincodeRejection('distributor', 'User5', 'rupiah-monetary', 'ApproveApprovalThreshold', ['wholesale-bank', '4000'], ['centralbank', 'distributor'], 'amount does not match the pending proposal');
    invoke('distributor', 'User5', 'rupiah-monetary', 'ApproveApprovalThreshold', ['wholesale-bank', '5000'], ['centralbank', 'distributor']);
    const thresholdApplied = query('centralbank', 'Admin', 'rupiah-monetary', 'GetParticipant', ['wholesale-bank']).approval_threshold === 5000;
    const beforeSmallTransfer = query('centralbank', 'Admin', 'rupiah-monetary', 'GetReserve', ['wholesale-bank']);
    invoke('distributor', 'User4', 'rupiah-monetary', 'TransferReserve', ['wholesale-bank', 'retail-bank', '5000', `reserve-small-${runID}`], ['centralbank', 'distributor']);
    const smallTransferExecuted = query('centralbank', 'Admin', 'rupiah-monetary', 'GetReserve', ['wholesale-bank']) === beforeSmallTransfer - 5000;
    recordCase('approval-threshold-dual-control', thresholdApplied && smallTransferExecuted,
        { other_bank_denied: true, proposer_self_approval_denied: true, amount_mismatch_denied: true, applied_threshold: 5000, transfer_at_threshold_executed: smallTransferExecuted });

    const reservesBeforeTransfer = {
        wholesale: query('centralbank', 'Admin', 'rupiah-monetary', 'GetReserve', ['wholesale-bank']),
        retail: query('centralbank', 'Admin', 'rupiah-monetary', 'GetReserve', ['retail-bank']),
    };
    const pendingReference = `reserve-${runID}`;
    invoke('distributor', 'User4', 'rupiah-monetary', 'TransferReserve', ['wholesale-bank', 'retail-bank', '10000', pendingReference], ['centralbank', 'distributor']);
    const beforeApproval = ledgerSnapshot();
    const pendingLeftReservesUnchanged = beforeApproval.retailReserve === reservesBeforeTransfer.retail
        && query('centralbank', 'Admin', 'rupiah-monetary', 'GetReserve', ['wholesale-bank']) === reservesBeforeTransfer.wholesale;
    expectChaincodeRejection('distributor', 'User4', 'rupiah-monetary', 'ApproveTransfer', [pendingReference], ['centralbank', 'distributor'], 'the maker cannot approve their own transfer');
    expectChaincodeRejection('distributor', 'User1', 'rupiah-monetary', 'ApproveTransfer', [pendingReference], ['centralbank', 'distributor'], 'access denied for distributor wholesale-bank');
    assertStateUnchanged(beforeApproval, ledgerSnapshot());
    invoke('distributor', 'User5', 'rupiah-monetary', 'ApproveTransfer', [pendingReference], ['centralbank', 'distributor']);
    const retailReserveAfterTransfer = query('centralbank', 'Admin', 'rupiah-monetary', 'GetReserve', ['retail-bank']);
    if (query('centralbank', 'Admin', 'rupiah-monetary', 'GetReserve', ['wholesale-bank']) !== reservesBeforeTransfer.wholesale - 10000
        || retailReserveAfterTransfer !== reservesBeforeTransfer.retail + 10000) {
        fail('approved interbank transfer did not move the reserve between banks');
    }
    expectChaincodeRejection('distributor', 'User5', 'rupiah-monetary', 'ApproveTransfer', [pendingReference], ['centralbank', 'distributor'], 'transfer is not awaiting approval');
    const rejectedReference = `reserve-rejected-${runID}`;
    invoke('distributor', 'User4', 'rupiah-monetary', 'TransferReserve', ['wholesale-bank', 'retail-bank', '10000', rejectedReference], ['centralbank', 'distributor']);
    const beforeRejection = ledgerSnapshot();
    invoke('distributor', 'User5', 'rupiah-monetary', 'RejectTransfer', [rejectedReference], ['centralbank', 'distributor']);
    expectChaincodeRejection('distributor', 'User5', 'rupiah-monetary', 'ApproveTransfer', [rejectedReference], ['centralbank', 'distributor'], 'transfer is not awaiting approval');
    assertStateUnchanged(beforeRejection, ledgerSnapshot());
    recordCase('four-eyes-transfer', pendingLeftReservesUnchanged,
        { pending_until_second_officer: true, maker_self_approval_denied: true, other_bank_approval_denied: true, approved_amount: 10000, rejected_transfer_unchanged: true });

    const beforeLimitBreach = ledgerSnapshot();
    invoke('centralbank', 'Admin', 'rupiah-monetary', 'SetTransferLimit', ['50000'], ['centralbank', 'distributor']);
    expectChaincodeRejection('distributor', 'User4', 'rupiah-monetary', 'TransferReserve', ['wholesale-bank', 'retail-bank', '50001', `limit-breach-${runID}`], ['centralbank', 'distributor'], "amount exceeds Bank Indonesia's transfer limit");
    assertStateUnchanged(beforeLimitBreach, ledgerSnapshot());
    expectChaincodeRejection('centralbank', 'Admin', 'rupiah-monetary', 'SetTransferLimit', ['0'], ['centralbank', 'distributor'], 'transfer limit must be positive');
    const appliedLimit = query('centralbank', 'Admin', 'rupiah-monetary', 'GetTransferLimit');
    invoke('centralbank', 'Admin', 'rupiah-monetary', 'SetTransferLimit', [NO_TRANSFER_LIMIT], ['centralbank', 'distributor']);
    recordCase('transfer-limit', appliedLimit === 50000, { limit: 50000, rejected_amount: 50001, state_unchanged: true, nonpositive_limit_rejected: true });

    const wholesaleReserveBeforeShortfall = query('centralbank', 'Admin', 'rupiah-monetary', 'GetReserve', ['wholesale-bank']);
    const beforeTransferShortfall = ledgerSnapshot();
    expectChaincodeRejection('distributor', 'User4', 'rupiah-monetary', 'TransferReserve', ['wholesale-bank', 'retail-bank', String(wholesaleReserveBeforeShortfall + 1), `transfer-too-large-${runID}`], ['centralbank', 'distributor'], 'distributor reserve');
    assertStateUnchanged(beforeTransferShortfall, ledgerSnapshot());
    recordCase('insufficient-reserve', true, { rejected_amount: wholesaleReserveBeforeShortfall + 1, source_and_destination_reserves_unchanged: true });
    const beforeCrossBankDebit = ledgerSnapshot();
    expectChaincodeRejection('distributor', 'User1', 'rupiah-monetary', 'TransferReserve', ['wholesale-bank', 'retail-bank', '1', `cross-bank-${runID}`], ['centralbank', 'distributor'], 'access denied for distributor wholesale-bank');
    assertStateUnchanged(beforeCrossBankDebit, ledgerSnapshot());
    recordCase('cross-bank-debit-denied', true, { retail_identity_debit_of_wholesale_denied: true, state_unchanged: true });
    const beforeWholesaleConversion = ledgerSnapshot();
    expectChaincodeRejection('distributor', 'User4', 'rupiah-payments', 'ConvertToRetail', ['wholesale-bank', '1', `wholesale-convert-${runID}`], ['centralbank', 'distributor', 'enduser'], 'conversion requires a retail bank');
    assertStateUnchanged(beforeWholesaleConversion, ledgerSnapshot());
    recordCase('wholesale-conversion-denied', true, { wholesale_conversion_denied: true, state_unchanged: true });

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
    convertAndFund(retailSubject, '1000', `retail-${runID}`);
    convertAndFund(merchantSubject, '1000', `merchant-${runID}`);
    convertAndFund(businessSubject, '1000', `business-${runID}`);
    convertAndFund(secondRetailSubject, '1000', `retail2-${runID}`);
    convertAndFund(secondMerchantSubject, '1000', `merchant2-${runID}`);
    convertAndFund(secondBusinessSubject, '1000', `business2-${runID}`);
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

    expectRejected('centralbank', 'Admin', 'rupiah-monetary', 'Issue', ['wholesale-bank', '1', `issue-underendorsed-${runID}`], ['centralbank']);
    expectRejected('enduser', 'User1', 'rupiah-payments', 'Transfer', [retailSubject, merchantSubject, '10', `payment-underendorsed-${runID}`], ['enduser']);
    expectRejected('distributor', 'User1', 'rupiah-payments', 'ConvertToRetail', ['retail-bank', '10', `convert-underendorsed-${runID}`], ['distributor', 'enduser']);
    expectRejected('enduser', 'User1', 'rupiah-payments', 'Transfer', [retailSubject, merchantSubject, '10', `validator-underendorsed-${runID}`], ['validator', 'enduser']);
    expectRejected('distributor', 'User3', 'rupiah-controls', 'FreezeSubject', [retailSubject, 'dttot'], ['distributor']);
    expectChaincodeRejection('distributor', 'User1', 'rupiah-controls', 'FreezeSubject', [retailSubject, 'dttot'], ['centralbank', 'distributor'], 'staff identity lacks role compliance_officer');
    expectChaincodeRejection('centralbank', 'Admin', 'rupiah-controls', 'CreatePending', [`wrong-msp-${runID}`, 'retail'], ['centralbank', 'distributor'], 'access denied for MSP CentralBankMSP');
    expectChaincodeRejection('enduser', 'User1', 'rupiah-monetary', 'Issue', ['wholesale-bank', '1', `wrong-msp-${runID}`], ['centralbank', 'distributor'], 'access denied for MSP EndUserMSP');
    expectChaincodeRejection('distributor', 'User1', 'rupiah-payments', 'Transfer', [retailSubject, merchantSubject, '1', `wrong-msp-${runID}`], ['distributor', 'enduser'], 'access denied for MSP DistributorMSP');
    expectChaincodeRejection('distributor', 'User3', 'rupiah-controls', 'FreezeSubject', [retailSubject, 'other'], ['centralbank', 'distributor'], 'unsupported restriction reason code');
    recordCase('authorization-endorsement', mspAuthorizationCells === authorizationChecks.length * (Object.keys(orgs).length - 1),
        { wrong_msp_denials: mspAuthorizationCells, underendorsed_operations: 4 });

    for (const orgName of Object.keys(orgs)) {
        expectChaincodeRejection(
            orgName, 'Admin', 'rupiah-monetary', 'DebitReserveForConversion', ['retail-bank', '10', `direct-debit-${orgName}-${runID}`],
            ['centralbank', 'distributor'], 'ConvertToRetail is callable only through rupiah-payments.ConvertToRetail',
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
    const reserve = query('centralbank', 'Admin', 'rupiah-monetary', 'GetReserve', ['retail-bank']);
    const secondRetailBalance = query('enduser', 'User5', 'rupiah-payments', 'GetBalance', [secondRetailSubject]);
    const secondMerchantBalance = query('enduser', 'User6', 'rupiah-payments', 'GetBalance', [secondMerchantSubject]);
    const secondBusinessBalance = query('enduser', 'User8', 'rupiah-payments', 'GetBalance', [secondBusinessSubject]);
    if (retailBalance !== 897 || merchantBalance !== 1097 || secondRetailBalance !== 1003 || secondMerchantBalance !== 1003
        || secondBusinessBalance !== 1003 || reserve !== retailReserveAfterTransfer - 6000) {
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
    convertAndFund(limitSender, '100', `limits-${runID}`);
    convertAndFund(holdingSender, '20', `holdings-${runID}`);
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
    const convertRef = `convert-${conversionReference}`;
    const fundRef = `fund-${conversionReference}`;
    const conversionBefore = ledgerSnapshot([['enduser', 'User5', conversionSubject]]);
    invoke('distributor', 'User1', 'rupiah-payments', 'ConvertToRetail', ['retail-bank', '10', convertRef], ['centralbank', 'distributor', 'enduser']);
    invoke('distributor', 'User1', 'rupiah-payments', 'FundWallet', [conversionSubject, 'retail-bank', '10', fundRef], ['distributor', 'enduser']);
    const conversionAfterFirst =ledgerSnapshot([['enduser', 'User5', conversionSubject]]);
    invoke('distributor', 'User1', 'rupiah-payments', 'ConvertToRetail', ['retail-bank', '10', convertRef], ['centralbank', 'distributor', 'enduser']);
    invoke('distributor', 'User1', 'rupiah-payments', 'FundWallet', [conversionSubject, 'retail-bank', '10', fundRef], ['distributor', 'enduser']);
    const conversionAfterReplay =ledgerSnapshot([['enduser', 'User5', conversionSubject]]);
    assertStateUnchanged(conversionAfterFirst, conversionAfterReplay);
    expectChaincodeRejection('distributor', 'User1', 'rupiah-payments', 'ConvertToRetail', ['retail-bank', '11', convertRef], ['centralbank', 'distributor', 'enduser'], 'reference');
    expectChaincodeRejection('distributor', 'User1', 'rupiah-payments', 'FundWallet', [conversionSubject, 'retail-bank', '11', fundRef], ['distributor', 'enduser'], 'reference was used for another operation');
    const conversionAfterConflict = ledgerSnapshot([['enduser', 'User5', conversionSubject]]);
    assertStateUnchanged(conversionAfterReplay, conversionAfterConflict);
    const conversionReceipt = query('enduser', 'User5', 'rupiah-payments', 'GetReceipt', [fundRef]);
    recordCase('conversion-replay-conflict', conversionAfterFirst.balances[conversionSubject] === conversionBefore.balances[conversionSubject] + 10
        && conversionAfterFirst.retailReserve === conversionBefore.retailReserve - 10
        && conversionReceipt.amount === 10 && conversionReceipt.kind === 'funding',
    { exact_replay_state_unchanged: true, payload_conflict_state_unchanged: true, receipt_reference: conversionReceipt.reference });

    const reserveFailureSubject = `reserve-failure-${runID}`;
    const reserveForFailure = query('centralbank', 'Admin', 'rupiah-monetary', 'GetReserve', ['retail-bank']);
    const beyondReserve = reserveForFailure + 1;
    const largeLimits = [String(beyondReserve + 1), String(beyondReserve + 1), String(beyondReserve + 1), String(beyondReserve + 1)];
    approveSubject(reserveFailureSubject, 'retail', 'User6', 'standard', false, largeLimits);
    invoke('enduser', 'User6', 'rupiah-payments', 'OpenWallet', [reserveFailureSubject], ['distributor', 'enduser']);
    const insufficientBefore = ledgerSnapshot([['enduser', 'User6', reserveFailureSubject]]);
    expectChaincodeRejection('distributor', 'User1', 'rupiah-payments', 'ConvertToRetail', ['retail-bank', String(beyondReserve), `insufficient-reserve-${runID}`], ['centralbank', 'distributor', 'enduser'], 'distributor reserve');
    const insufficientAfter = ledgerSnapshot([['enduser', 'User6', reserveFailureSubject]]);
    assertStateUnchanged(insufficientBefore, insufficientAfter);
    recordCase('conversion-insufficient-reserve', insufficientBefore.balances[reserveFailureSubject] === 0
        && insufficientAfter.retailReserve === insufficientBefore.retailReserve,
    { rejected_amount: beyondReserve, wallet_and_reserve_unchanged: true });
    const insufficientFloatBefore = ledgerSnapshot([['enduser', 'User6', reserveFailureSubject]]);
    expectChaincodeRejection('distributor', 'User1', 'rupiah-payments', 'FundWallet', [reserveFailureSubject, 'retail-bank', '1', `insufficient-float-${runID}`], ['distributor', 'enduser'], 'retail float');
    assertStateUnchanged(insufficientFloatBefore, ledgerSnapshot([['enduser', 'User6', reserveFailureSubject]]));
    recordCase('insufficient-float', true, { rejected_amount: 1, float_and_wallet_unchanged: true });

    const holdingsSubject = `conversion-holdings-${runID}`;
    approveSubject(holdingsSubject, 'retail', 'User8', 'standard', false, ['100', '100', '100', '100']);
    invoke('enduser', 'User8', 'rupiah-payments', 'OpenWallet', [holdingsSubject], ['distributor', 'enduser']);
    convertAndFund(holdingsSubject, '100', `holdings-exact-${runID}`);
    const holdingsAtLimit = ledgerSnapshot([['enduser', 'User8', holdingsSubject]]);
    invoke('distributor', 'User1', 'rupiah-payments', 'ConvertToRetail', ['retail-bank', '1', `holdings-over-convert-${runID}`], ['centralbank', 'distributor', 'enduser']);
    const holdingsBeforeOver = ledgerSnapshot([['enduser', 'User8', holdingsSubject]]);
    expectChaincodeRejection('distributor', 'User1', 'rupiah-payments', 'FundWallet', [holdingsSubject, 'retail-bank', '1', `holdings-over-${runID}`], ['distributor', 'enduser'], 'recipient holdings limit exceeded');
    assertStateUnchanged(holdingsBeforeOver, ledgerSnapshot([['enduser', 'User8', holdingsSubject]]));
    recordCase('wallet-funding-holdings-limit', holdingsAtLimit.balances[holdingsSubject] === 100,
        { holdings_exact: true, one_unit_over_unchanged: true });

    const beforeEndorsementFailure = ledgerSnapshot([['enduser', 'User5', conversionSubject]]);
    expectRejected('distributor', 'User1', 'rupiah-payments', 'ConvertToRetail', ['retail-bank', '5', `convert-underendorsed-atomic-${runID}`], ['distributor', 'enduser']);
    assertStateUnchanged(beforeEndorsementFailure, ledgerSnapshot([['enduser', 'User5', conversionSubject]]));
    recordCase('conversion-failure-atomicity', true, { incomplete_endorsement_left_float_and_reserve_unchanged: true });

    const supplyBeforeRedemption = query('centralbank', 'Admin', 'rupiah-monetary', 'GetTotalSupply');
    const wholesaleSupplyBeforeRedemption = query('centralbank', 'Admin', 'rupiah-monetary', 'GetWholesaleSupply');
    const reserveBeforeRedemption = query('centralbank', 'Admin', 'rupiah-monetary', 'GetReserve', ['wholesale-bank']);
    const beforeInsufficientRedemption = ledgerSnapshot();
    expectChaincodeRejection('centralbank', 'Admin', 'rupiah-monetary', 'RedeemReserve', ['wholesale-bank', String(reserveBeforeRedemption + 1), `redeem-too-large-${runID}`], ['centralbank', 'distributor'], 'distributor reserve');
    assertStateUnchanged(beforeInsufficientRedemption, ledgerSnapshot());
    const redemptionReference = `redeem-${runID}`;
    invoke('centralbank', 'Admin', 'rupiah-monetary', 'RedeemReserve', ['wholesale-bank', '1000', redemptionReference], ['centralbank', 'distributor']);
    const afterFirstRedemption = ledgerSnapshot();
    invoke('centralbank', 'Admin', 'rupiah-monetary', 'RedeemReserve', ['wholesale-bank', '1000', redemptionReference], ['centralbank', 'distributor']);
    const afterRedemptionReplay = ledgerSnapshot();
    assertStateUnchanged(afterFirstRedemption, afterRedemptionReplay);
    expectChaincodeRejection('centralbank', 'Admin', 'rupiah-monetary', 'RedeemReserve', ['wholesale-bank', '999', redemptionReference], ['centralbank', 'distributor'], 'reference');
    assertStateUnchanged(afterRedemptionReplay, ledgerSnapshot());
    recordCase('redemption-replay-conflict', true, { exact_replay_state_unchanged: true, payload_conflict_state_unchanged: true, insufficient_reserve_state_unchanged: true });
    const reserveAfterRedemption = query('centralbank', 'Admin', 'rupiah-monetary', 'GetReserve', ['wholesale-bank']);
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
        if (query(orgName, 'Admin', 'rupiah-monetary', 'GetWholesaleSupply') !== wholesaleSupply
            || query(orgName, 'Admin', 'rupiah-monetary', 'GetRetailSupply') !== retailSupply
            || query(orgName, 'Admin', 'rupiah-monetary', 'GetTotalSupply') !== supplyAfterRedemption
            || query(orgName, 'Admin', 'rupiah-monetary', 'GetReserve', ['wholesale-bank']) !== reserveAfterRedemption) {
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

    // Runs last: it changes bank statuses and reserves that the checks above compare.
    runParticipantStatusCases(runID);

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
