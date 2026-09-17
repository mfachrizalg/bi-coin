'use strict';

const crypto = require('node:crypto');
const fs = require('node:fs');
const path = require('node:path');
const { execFileSync } = require('node:child_process');

const [statusPath, outputPath] = process.argv.slice(2);
if (!statusPath || !outputPath) {
    throw new Error('usage: node scripts/write-benchmark-manifest.js <status.tsv> <manifest.json>');
}

function command(program, args) {
    try {
        return execFileSync(program, args, { encoding: 'utf8' }).trim();
    } catch {
        return null;
    }
}

function hashFile(file) {
    return crypto.createHash('sha256').update(fs.readFileSync(file)).digest('hex');
}

function filesUnder(root) {
    if (!fs.existsSync(root)) return [];
    return fs.readdirSync(root, { withFileTypes: true }).flatMap(entry => {
        const file = path.join(root, entry.name);
        return entry.isDirectory() ? filesUnder(file) : [file];
    });
}

function evidenceInputs() {
    const roots = ['benchmark/benchconfigs', 'benchmark/workloads'];
    const files = roots.flatMap(root => filesUnder(root))
        .filter(file => /\.(ya?ml|js)$/.test(file));
    files.push(
        'benchmark/networkconfig.yaml',
        'package.json',
        'package-lock.json',
        'chaincode/digital_rupiah.go',
        'network/docker-compose.yaml',
        'network/configtx.yaml',
        'scripts/run-full-suite.sh',
        'benchmark/gen-network-assets.sh',
        'scripts/network-up.sh',
        'scripts/deploy-chaincode.sh',
        'scripts/init-ledger.sh',
        'scripts/smoke-test.sh',
        'scripts/validate-caliper-report.js',
        'scripts/validate-boundary-log.js',
    );
    return [...new Set(files)].filter(file => fs.existsSync(file)).sort()
        .map(relativePath => ({ path: relativePath, sha256: hashFile(relativePath) }));
}

function resultArtifacts() {
    const stamp = path.basename(statusPath).replace(/-status\.tsv$/, '');
    const artifactStamps = (process.env.BENCHMARK_ARTIFACT_STAMPS || stamp)
        .split(',')
        .map(value => value.trim())
        .filter(Boolean);
    return filesUnder(path.dirname(statusPath))
        .filter(file => artifactStamps.some(value => {
            const name = path.basename(file);
            return name === value || name.startsWith(`${value}-`) || name.startsWith(`${value}.`);
        }))
        .sort()
        .map(file => ({ path: path.relative('.', file), sha256: hashFile(file) }));
}

function imageDigests() {
    const compose = fs.existsSync('network/docker-compose.yaml')
        ? fs.readFileSync('network/docker-compose.yaml', 'utf8')
        : '';
    const images = [...compose.matchAll(/^\s+image:\s*(\S+)\s*$/gm)]
        .map(match => match[1])
        .filter((image, index, all) => all.indexOf(image) === index);
    return images.map(image => ({
        image,
        digest: command('docker', ['image', 'inspect', '--format', '{{index .RepoDigests 0}}', image]),
    }));
}

function installedPackageVersion(name) {
    const raw = command('npm', ['ls', name, '--depth=0', '--json']);
    if (!raw) return null;
    try {
        return JSON.parse(raw).dependencies?.[name]?.version || null;
    } catch {
        return null;
    }
}

function parseStatus() {
    const [header, ...lines] = fs.readFileSync(statusPath, 'utf8').trim().split('\n');
    const keys = header.split('\t');
    return lines.filter(Boolean).map(line => Object.fromEntries(
        line.split('\t').map((value, index) => [keys[index], value]),
    ));
}

const porcelain = command('git', ['status', '--porcelain']) || '';
const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
const cleanLedger = process.env.BENCHMARK_CLEAN_LEDGER === 'true';
if (!cleanLedger) throw new Error('manifest requires BENCHMARK_CLEAN_LEDGER=true');
const manifest = {
    schemaVersion: 2,
    startedAt: process.env.BENCHMARK_STARTED_AT || null,
    completedAt: new Date().toISOString(),
    seed: Number(process.env.BENCHMARK_SEED || 20260725),
    revision: {
        commit: command('git', ['rev-parse', 'HEAD']),
        dirty: porcelain.length > 0,
        changedPaths: porcelain.split('\n').filter(Boolean).map(line => line.slice(3)),
    },
    runtime: {
        node: command('node', ['--version']),
        npm: command('npm', ['--version']),
        docker: command('docker', ['--version']),
        caliper: installedPackageVersion('@hyperledger/caliper-cli'),
        caliperRequested: packageJson.devDependencies?.['@hyperledger/caliper-cli'] || null,
    },
    preconditions: {
        cleanLedger,
        networkMode: process.env.NETWORK_MODE || 'garuda',
        chaincode: {
            name: process.env.CHAINCODE_NAME || 'digital-rupiah',
            version: process.env.CHAINCODE_VERSION || '3.0',
            sequence: Number(process.env.CHAINCODE_SEQUENCE || 1),
        },
    },
    profiles: parseStatus(),
    artifacts: resultArtifacts(),
    evidenceInputs: evidenceInputs(),
    imageDigests: imageDigests(),
    topology: {
        orderers: 1,
        peersPerOrganization: 1,
        faultTolerance: 'prototype-single-node-per-role; no orderer or peer failure tolerance',
    },
};

fs.writeFileSync(outputPath, `${JSON.stringify(manifest, null, 2)}\n`);
console.log(outputPath);
