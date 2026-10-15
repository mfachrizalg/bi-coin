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
        fs.mkdirSync(path.join(project, 'study/chaincode'), { recursive: true });
        fs.mkdirSync(path.join(project, 'study/chaincode/controls/vendor/example'), { recursive: true });
        fs.mkdirSync(path.join(project, 'backend/vendor/example'), { recursive: true });
        fs.mkdirSync(path.join(project, 'frontend/src'), { recursive: true });
        fs.mkdirSync(path.join(project, 'frontend/tests'), { recursive: true });
        fs.mkdirSync(path.join(project, 'benchmark/compliance'), { recursive: true });
        fs.mkdirSync(path.join(project, 'network/study/ca-client'), { recursive: true });
        fs.mkdirSync(path.join(project, 'network/study/packages'), { recursive: true });
        const script = path.join(project, 'scripts/write-study-manifest.js');
        fs.copyFileSync(__filename.replace('.test.js', '.js'), script);
        for (const file of ['package.json', 'package-lock.json']) {
            fs.writeFileSync(path.join(project, file), '{}\n');
        }
        const source = path.join(project, 'scripts/example.js');
        fs.writeFileSync(source, 'original\n');
        fs.writeFileSync(path.join(project, 'study/chaincode/controls.go'), 'contract source\n');
        fs.writeFileSync(path.join(project, 'study/chaincode/controls/vendor/example/LICENSE'), 'vendored dependency license\n');
        fs.writeFileSync(path.join(project, 'backend/vendor/example/LICENSE'), 'backend vendored license\n');
        fs.writeFileSync(path.join(project, 'frontend/src/Study.tsx'), 'frontend source\n');
        fs.writeFileSync(path.join(project, 'frontend/tests/study.test.mjs'), 'frontend test\n');
        fs.writeFileSync(path.join(project, 'benchmark/compliance/cases.json'), '{}\n');
        fs.writeFileSync(path.join(project, 'network/study/ca-client/fabric-ca-client-config.yaml'), 'synthetic local credential config\n');
        fs.writeFileSync(path.join(project, 'network/study/packages/chaincode.tar.gz'), 'generated chaincode archive\n');
        const study = path.join(project, 'results/study');
        fs.mkdirSync(study, { recursive: true });
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
        assert.equal(fs.readFileSync(path.join(study, 'source/study/chaincode/controls.go'), 'utf8'), 'contract source\n');
        assert.equal(fs.readFileSync(path.join(study, 'source/study/chaincode/controls/vendor/example/LICENSE'), 'utf8'), 'vendored dependency license\n');
        assert.equal(fs.readFileSync(path.join(study, 'source/backend/vendor/example/LICENSE'), 'utf8'), 'backend vendored license\n');
        assert.equal(fs.readFileSync(path.join(study, 'source/frontend/src/Study.tsx'), 'utf8'), 'frontend source\n');
        assert.equal(fs.readFileSync(path.join(study, 'source/frontend/tests/study.test.mjs'), 'utf8'), 'frontend test\n');
        assert.equal(fs.readFileSync(path.join(study, 'source/benchmark/compliance/cases.json'), 'utf8'), '{}\n');
        assert.equal(fs.existsSync(path.join(study, 'source/network/study/ca-client')), false);
        assert.equal(fs.existsSync(path.join(study, 'source/network/study/packages')), false);
        const compatibleResume = spawnSync(process.execPath, [script, study, '--capture-source-only'], { cwd: project, encoding: 'utf8' });
        assert.equal(compatibleResume.status, 0, compatibleResume.stderr);
        fs.writeFileSync(source, 'changed\n');
        const changed = spawnSync(process.execPath, [script, study, '--capture-source-only'], { cwd: project, encoding: 'utf8' });
        assert.notEqual(changed.status, 0);
        assert.match(changed.stderr, /source changed during study/);
    } finally {
        fs.rmSync(project, { recursive: true, force: true });
    }
});
