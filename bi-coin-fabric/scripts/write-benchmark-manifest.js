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

function evidenceInputs() {
    const roots = ['benchmark/benchconfigs', 'benchmark/workloads'];
    return roots.flatMap(root => fs.readdirSync(root)
        .filter(file => /\.(ya?ml|js)$/.test(file))
        .sort()
        .map(file => {
            const relativePath = path.join(root, file);
            return { path: relativePath, sha256: hashFile(relativePath) };
        }));
}

function parseStatus() {
    const [header, ...lines] = fs.readFileSync(statusPath, 'utf8').trim().split('\n');
    const keys = header.split('\t');
    return lines.filter(Boolean).map(line => Object.fromEntries(
        line.split('\t').map((value, index) => [keys[index], value]),
    ));
}

const porcelain = command('git', ['status', '--porcelain']) || '';
const manifest = {
    schemaVersion: 1,
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
    },
    profiles: parseStatus(),
    evidenceInputs: evidenceInputs(),
};

fs.writeFileSync(outputPath, `${JSON.stringify(manifest, null, 2)}\n`);
console.log(outputPath);
