'use strict';

const assert = require('node:assert/strict');
const { spawnSync } = require('node:child_process');
const crypto = require('node:crypto');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const test = require('node:test');

test('manifest preserves the executed source and remains valid after its output pointer is written', () => {
    const project = fs.mkdtempSync(path.join(os.tmpdir(), 'bi-coin-manifest-'));
    try {
        fs.mkdirSync(path.join(project, 'scripts'));
        fs.mkdirSync(path.join(project, 'benchmark'));
        const script = path.join(project, 'scripts/write-study-manifest.js');
        fs.copyFileSync(__filename.replace('.test.js', '.js'), script);
        for (const file of ['package.json', 'package-lock.json', 'benchmark/networkconfig.yaml']) {
            fs.writeFileSync(path.join(project, file), '{}\n');
        }
        const source = path.join(project, 'scripts/example.js');
        fs.writeFileSync(source, 'original\n');
        const study = path.join(project, 'study');
        fs.mkdirSync(study);
        fs.writeFileSync(path.join(study, 'metadata.json'), '{"study":"regression"}\n');
        fs.writeFileSync(path.join(study, 'manifest-path.txt'), '');
        const result = spawnSync(process.execPath, [script, study], { cwd: project, encoding: 'utf8' });
        assert.equal(result.status, 0, result.stderr);
        fs.writeFileSync(path.join(study, 'manifest-path.txt'), result.stdout);
        const manifest = JSON.parse(fs.readFileSync(path.join(study, 'manifest.json'), 'utf8'));
        for (const artifact of manifest.artifacts) {
            const digest = crypto.createHash('sha256').update(fs.readFileSync(path.join(study, artifact.path))).digest('hex');
            assert.equal(digest, artifact.sha256, artifact.path);
        }
        assert.equal(fs.readFileSync(path.join(study, 'source/scripts/example.js'), 'utf8'), 'original\n');
        fs.writeFileSync(source, 'changed\n');
        const changed = spawnSync(process.execPath, [script, study, '--capture-source-only'], { cwd: project, encoding: 'utf8' });
        assert.notEqual(changed.status, 0);
        assert.match(changed.stderr, /source changed during study/);
    } finally {
        fs.rmSync(project, { recursive: true, force: true });
    }
});
