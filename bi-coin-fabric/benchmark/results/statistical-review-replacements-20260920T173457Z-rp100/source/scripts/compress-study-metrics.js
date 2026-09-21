'use strict';

const fs = require('node:fs');
const path = require('node:path');
const zlib = require('node:zlib');

const studyDirectory = process.argv[2];
if (!studyDirectory) throw new Error('usage: node scripts/compress-study-metrics.js <study-directory>');

const root = path.resolve(studyDirectory);
const metadataPath = path.join(root, 'metadata.json');
const metadata = JSON.parse(fs.readFileSync(metadataPath, 'utf8'));
let compressed = 0;
let before = 0;
let after = 0;

for (const run of metadata.runs || []) {
    const directory = path.join(root, run.runDirectory);
    const source = path.join(directory, 'prometheus.jsonl');
    const target = path.join(directory, 'prometheus.jsonl.gz');
    if (fs.existsSync(source) && !fs.existsSync(target)) {
        const data = fs.readFileSync(source);
        const encoded = zlib.gzipSync(data, { level: 9 });
        fs.writeFileSync(target, encoded);
        fs.rmSync(source);
        compressed++;
        before += data.length;
        after += encoded.length;
    }
    if (fs.existsSync(target)) {
        run.metricsFile = path.relative(root, target);
    }
}

const temporary = `${metadataPath}.tmp-${process.pid}`;
fs.writeFileSync(temporary, `${JSON.stringify(metadata, null, 2)}\n`);
fs.renameSync(temporary, metadataPath);
console.log(JSON.stringify({ compressed, before, after }));
