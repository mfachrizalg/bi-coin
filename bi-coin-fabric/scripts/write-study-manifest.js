'use strict';

const crypto = require('node:crypto');
const fs = require('node:fs');
const path = require('node:path');
const { execFileSync } = require('node:child_process');

const studyDirectory = process.argv[2];
if (!studyDirectory) throw new Error('usage: node scripts/write-study-manifest.js <study-directory>');

const root = path.resolve(studyDirectory);
const output = path.join(root, 'manifest.json');

function command(program, args) {
    try { return execFileSync(program, args, { encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'] }).trimEnd(); }
    catch { return null; }
}

function filesUnder(directory) {
    if (!fs.existsSync(directory)) return [];
    return fs.readdirSync(directory, { withFileTypes: true }).flatMap(entry => {
        if (['.git', 'node_modules', 'organizations', 'channel-artifacts', 'ca-client', 'packages'].includes(entry.name)) return [];
        const file = path.join(directory, entry.name);
        return entry.isDirectory() ? filesUnder(file) : [file];
    });
}

function hash(file) {
    return crypto.createHash('sha256').update(fs.readFileSync(file)).digest('hex');
}

const projectRoot = path.resolve(__dirname, '..');
const sourceRoot = path.join(root, 'source');
const existingSnapshot = fs.existsSync(sourceRoot);
const recordedRuns = JSON.parse(fs.readFileSync(path.join(root, 'metadata.json'), 'utf8')).runs || [];
if (!existingSnapshot && recordedRuns.length) {
    throw new Error('existing runs have no captured source; preserve the old study and use a new BENCHMARK_STAMP');
}
const sourceFiles = ['scripts', 'chaincode', 'backend', 'frontend/src', 'frontend/tests', 'benchmark/workloads', 'benchmark/observers', 'benchmark/isolated', 'benchmark/compliance', 'network', 'docs/adr']
    .flatMap(directory => filesUnder(path.join(projectRoot, directory)))
    .concat([
        'CONTEXT.md',
        'package.json',
        'package-lock.json',
        'frontend/package.json',
        'frontend/package-lock.json',
    ].map(file => path.join(projectRoot, file)).filter(fs.existsSync))
    .filter(file => /\.(?:go|js|mjs|sh|json|ya?ml|md|ts|tsx)$|\/go\.(?:mod|sum)$|\/Dockerfile$/.test(file)
        || path.relative(projectRoot, file).split(path.sep).slice(0, 2).join(path.sep) === ['backend', 'vendor'].join(path.sep)
        || path.relative(projectRoot, file).split(path.sep).slice(0, 3).join(path.sep) === ['chaincode', 'controls', 'vendor'].join(path.sep)
        || path.relative(projectRoot, file).split(path.sep).slice(0, 3).join(path.sep) === ['chaincode', 'monetary', 'vendor'].join(path.sep)
        || path.relative(projectRoot, file).split(path.sep).slice(0, 3).join(path.sep) === ['chaincode', 'payments', 'vendor'].join(path.sep));
if (existingSnapshot && filesUnder(sourceRoot).length !== sourceFiles.length) {
    throw new Error('source file set changed during study; use a new BENCHMARK_STAMP');
}
for (const file of sourceFiles) {
    const destination = path.join(sourceRoot, path.relative(projectRoot, file));
    if (existingSnapshot) {
        if (!fs.existsSync(destination) || hash(destination) !== hash(file)) {
            throw new Error(`source changed during study: ${path.relative(projectRoot, file)}; use a new BENCHMARK_STAMP`);
        }
    } else {
        fs.mkdirSync(path.dirname(destination), { recursive: true });
        fs.copyFileSync(file, destination);
    }
}
if (process.argv.includes('--capture-source-only')) process.exit(0);

const metadata = JSON.parse(fs.readFileSync(path.join(root, 'metadata.json'), 'utf8'));
const status = command('git', ['status', '--porcelain']);
const images = [
    'prom/prometheus:v3.14.0',
    'ghcr.io/google/cadvisor:v0.60.5',
    'prom/node-exporter:v1.12.1',
].map(image => ({ image, id: command('docker', ['image', 'inspect', '--format', '{{.Id}}', image]), digest: command('docker', ['image', 'inspect', '--format', '{{index .RepoDigests 0}}', image]) }));
const artifacts = filesUnder(root)
    .filter(file => file !== output && path.relative(root, file) !== 'manifest-path.txt')
    .sort()
    .map(file => ({ path: path.relative(root, file), sha256: hash(file) }));

const manifest = {
    schemaVersion: 1,
    createdAt: new Date().toISOString(),
    study: metadata.study || null,
    runtime: {
        node: command('node', ['--version']),
        npm: command('npm', ['--version']),
        docker: command('docker', ['--version']),
        dockerServer: command('docker', ['version', '--format', '{{json .Server}}']),
        dockerDaemonID: command('docker', ['info', '--format', '{{.ID}}']),
        go: command('go', ['version']),
        caliper: command('node', ['-p', 'require("@hyperledger/caliper-cli/package.json").version']),
    },
    revision: {
        commit: command('git', ['rev-parse', 'HEAD']),
        baseCommit: process.env.BENCHMARK_SOURCE_COMMIT || null,
        dirty: status === null
            ? (process.env.BENCHMARK_SOURCE_DIRTY === 'true' ? true : null)
            : status.length > 0,
        changedPaths: status === null
            ? null
            : status.split('\n').filter(Boolean).map(line => line.slice(3)),
    },
    monitoringImages: images,
    sourceSnapshot: 'source/',
    artifacts,
};

fs.writeFileSync(output, `${JSON.stringify(manifest, null, 2)}\n`);
console.log(output);
