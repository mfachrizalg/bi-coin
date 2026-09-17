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
    try { return execFileSync(program, args, { encoding: 'utf8' }).trim(); }
    catch { return null; }
}

function filesUnder(directory) {
    if (!fs.existsSync(directory)) return [];
    return fs.readdirSync(directory, { withFileTypes: true }).flatMap(entry => {
        const file = path.join(directory, entry.name);
        return entry.isDirectory() ? filesUnder(file) : [file];
    });
}

function hash(file) {
    return crypto.createHash('sha256').update(fs.readFileSync(file)).digest('hex');
}

const metadata = JSON.parse(fs.readFileSync(path.join(root, 'metadata.json'), 'utf8'));
const status = command('git', ['status', '--porcelain']) || '';
const images = [
    'prom/prometheus:v3.14.0',
    'ghcr.io/google/cadvisor:v0.60.5',
    'prom/node-exporter:v1.12.1',
].map(image => ({ image, digest: command('docker', ['image', 'inspect', '--format', '{{index .RepoDigests 0}}', image]) }));
const artifacts = filesUnder(root)
    .filter(file => file !== output)
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
        caliper: command('npm', ['ls', '@hyperledger/caliper-cli', '--depth=0', '--parseable']),
    },
    revision: {
        commit: command('git', ['rev-parse', 'HEAD']),
        dirty: status.length > 0,
        changedPaths: status.split('\n').filter(Boolean).map(line => line.slice(3)),
    },
    monitoringImages: images,
    artifacts,
};

fs.writeFileSync(output, `${JSON.stringify(manifest, null, 2)}\n`);
console.log(output);
