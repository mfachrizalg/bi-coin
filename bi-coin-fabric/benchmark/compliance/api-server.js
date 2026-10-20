'use strict';

const crypto = require('node:crypto');
const fs = require('node:fs');
const path = require('node:path');
const { spawn, spawnSync } = require('node:child_process');

function readStudyEnv(file) {
    return Object.fromEntries(fs.readFileSync(file, 'utf8').split(/\r?\n/).filter(Boolean).map(line => {
        const index = line.indexOf('=');
        return [line.slice(0, index), line.slice(index + 1)];
    }));
}

function identityFiles(projectRoot, organization, username) {
    const domains = {
        CentralBankMSP: ['centralbank', 'centralbank.bi-coin', 17051],
        DistributorMSP: ['distributor', 'distributor.bi-coin', 18051],
        ValidatorMSP: ['validator', 'validator.bi-coin', 19051],
        EndUserMSP: ['enduser', 'enduser.bi-coin', 20051],
    };
    const [shortName, domain, port] = domains[organization];
    const base = path.join(projectRoot, 'network/organizations/peerOrganizations', domain);
    const userMsp = path.join(base, 'users', `${username}@${domain}`, 'msp');
    const signcerts = path.join(userMsp, 'signcerts');
    const keystore = path.join(userMsp, 'keystore');
    const certNames = organization === 'CentralBankMSP'
        ? ['cert.pem', `${username}@${domain}-cert.pem`]
        : [`${username}@${domain}-cert.pem`, 'cert.pem'];
    const certName = certNames.find(name => fs.existsSync(path.join(signcerts, name)));
    const keyNames = ['priv_sk', 'key.pem'];
    const keyName = keyNames.find(name => fs.existsSync(path.join(keystore, name)))
        || fs.readdirSync(keystore).find(name => name.endsWith('_sk'));
    if (!certName || !keyName) throw new Error(`missing generated certificate/key for ${organization}/${username}`);
    const peerHost = `peer0.${domain}`;
    return {
        username: '',
        msp_id: organization,
        peer_endpoint: `127.0.0.1:${port}`,
        gateway_peer: `${peerHost}:7051`,
        cert_path: path.join(signcerts, certName),
        key_path: path.join(keystore, keyName),
        tls_cert_path: path.join(base, 'peers', peerHost, 'tls', 'ca.crt'),
        shortName,
    };
}

function createApiConfig(projectRoot, stamp) {
    const studyEnv = readStudyEnv(path.join(projectRoot, 'network/.env.study'));
    const suffix = crypto.createHash('sha256').update(stamp).digest('hex').slice(0, 10);
    const password = crypto.createHash('sha256').update(`compliance:${stamp}`).digest('hex');
    const principals = [
        { key: 'authenticated', role: 'authenticated', msp: 'EndUserMSP', cert: 'User5' },
        { key: 'kyc_verified', role: 'kyc_verified', msp: 'EndUserMSP', cert: 'User1' },
        { key: 'retail_bank', role: 'retail_bank', msp: 'DistributorMSP', cert: 'Admin' },
        { key: 'wholesale_bank', role: 'wholesale_bank', msp: 'DistributorMSP', cert: 'User4' },
        { key: 'bank_indonesia', role: 'bank_indonesia', msp: 'CentralBankMSP', cert: 'Admin' },
        { key: 'merchant', role: 'merchant', msp: 'EndUserMSP', cert: 'User2' },
        { key: 'auditor', role: 'auditor', msp: 'ValidatorMSP', cert: 'Admin' },
        { key: 'reviewer', role: 'retail_bank', msp: 'DistributorMSP', cert: 'User1' },
        { key: 'senior', role: 'retail_bank', msp: 'DistributorMSP', cert: 'User2' },
        { key: 'compliance', role: 'retail_bank', msp: 'DistributorMSP', cert: 'User3' },
        { key: 'retail_two', role: 'kyc_verified', msp: 'EndUserMSP', cert: 'User5' },
        { key: 'business_rep', role: 'merchant', msp: 'EndUserMSP', cert: 'User4' },
    ];
    const identities = [];
    const users = [];
    const roleUsers = {};
    const namedUsers = {};
    for (const principal of principals) {
        const username = `c${suffix}-${principal.key}`;
        const identity = identityFiles(projectRoot, principal.msp, principal.cert);
        identity.username = username;
        identities.push(identity);
        users.push({ username, password, role: principal.role });
        namedUsers[principal.key] = { username, password, role: principal.role, msp: principal.msp, certificate: principal.cert };
        if (!roleUsers[principal.key] || principal.key === principal.role) {
            roleUsers[principal.key] = { username, password };
        }
        if (['authenticated', 'kyc_verified', 'merchant'].includes(principal.role)) {
            roleUsers[principal.role] ||= { username, password };
        }
    }
    const databaseURL = `postgresql://${studyEnv.POSTGRES_USER}:${studyEnv.POSTGRES_PASSWORD}@127.0.0.1:15432/${studyEnv.POSTGRES_DB}?sslmode=disable`;
    const env = {
        ...process.env,
        PORT: process.env.COMPLIANCE_API_PORT || '18080',
        DATABASE_URL: databaseURL,
        AUTH_JWT_SECRET: password,
        AUTH_TOKEN_TTL_SECONDS: '86400',
        AUTH_BOOTSTRAP_USERS_JSON: JSON.stringify(users),
        CONTRACT_SCHEMA_VERSION: 'v3',
        FABRIC_CHANNEL_NAME: 'bi-coin',
        FABRIC_IDENTITIES_JSON: JSON.stringify(identities.map(({ shortName, ...identity }) => identity)),
    };
    return { env, roleUsers, namedUsers, identities, port: env.PORT };
}

async function waitForAPI(baseURL, child, logPath, timeoutMs = 60000) {
    const deadline = Date.now() + timeoutMs;
    while (Date.now() < deadline) {
        if (child.exitCode !== null) {
            throw new Error(`backend exited before health check; see ${logPath}`);
        }
        try {
            const response = await fetch(`${baseURL}/health`);
            if (response.ok) return;
        } catch {
            // The API is still starting.
        }
        await new Promise(resolve => setTimeout(resolve, 250));
    }
    throw new Error(`backend health check timed out; see ${logPath}`);
}

async function startAPI(projectRoot, outputDirectory, stamp) {
    const config = createApiConfig(projectRoot, stamp);
    const logPath = path.join(outputDirectory, 'api.log');
    const backendDirectory = path.join(projectRoot, 'backend');
    const binaryPath = path.join(outputDirectory, 'backend-api');
    if (!fs.existsSync(binaryPath)) {
        const build = spawnSync('go', ['build', '-o', binaryPath, '.'], { cwd: backendDirectory, encoding: 'utf8' });
        if (build.error || build.status !== 0) throw new Error(`backend build failed: ${(build.stderr || build.error?.message || '').slice(-2000)}`);
        fs.chmodSync(binaryPath, 0o700);
    }
    const fd = fs.openSync(logPath, 'a');
    const child = spawn(binaryPath, [], {
        cwd: backendDirectory,
        env: config.env,
        stdio: ['ignore', fd, fd],
    });
    child.exitCode = null;
    child.once('exit', code => { child.exitCode = code ?? 1; });
    const baseURL = `http://127.0.0.1:${config.port}`;
    try {
        await waitForAPI(baseURL, child, logPath);
    } catch (error) {
        child.kill('SIGTERM');
        fs.closeSync(fd);
        throw error;
    }
    let closed = false;
    return {
        baseURL,
        roleUsers: config.roleUsers,
        namedUsers: config.namedUsers,
        identities: config.identities,
        child,
        close() {
            if (closed) return Promise.resolve();
            closed = true;
            return new Promise(resolve => {
                const finish = () => {
                    fs.closeSync(fd);
                    resolve();
                };
                if (child.exitCode !== null) return finish();
                child.once('exit', finish);
                child.kill('SIGTERM');
            });
        },
    };
}

module.exports = { createApiConfig, startAPI };
