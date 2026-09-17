'use strict';

const fs = require('node:fs');
const path = require('node:path');

function arg(name, fallback) {
    const index = process.argv.indexOf(`--${name}`);
    return index >= 0 ? process.argv[index + 1] : fallback;
}

const output = arg('output');
const operation = arg('operation', 'retail-transfer');
const contention = arg('contention', 'low');
const scenario = arg('scenario', `${operation}-${contention}`);
const workers = Number(arg('workers', 4));
const targetTps = Number(arg('target-tps', 10));
const duration = Number(arg('duration', 120));
const warmupDuration = Number(arg('warmup-duration', 30));
const transactionSlots = Number(arg('transaction-slots', Math.max(10, Math.min(50, Math.ceil(targetTps / workers * 2)))));
const seed = Number(arg('seed', process.env.BENCHMARK_SEED || 20260725));
const measuredLabel = `${operation}-${contention}-${targetTps}tps`;

if (!output) throw new Error('usage: node scripts/generate-study-config.js --output <file> [options]');
if (!Number.isInteger(workers) || ![1, 2, 4, 8].includes(workers)) throw new Error('workers must be one of 1, 2, 4, or 8');
if (!Number.isFinite(targetTps) || targetTps <= 0) throw new Error('target-tps must be positive');

const containers = [
    '/peer0.bi.paynet',
    '/peer0.himbara.paynet',
    '/peer0.commercial.paynet',
    '/peer0.pjp.paynet',
    '/peer0.ojk.paynet',
    '/couchdb0.bi.paynet',
    '/couchdb0.himbara.paynet',
    '/couchdb0.commercial.paynet',
    '/couchdb0.pjp.paynet',
    '/couchdb0.ojk.paynet',
    '/orderer.paynet',
];

function yamlList(values, indentation) {
    return values.map(value => `${indentation}- ${value}`).join('\n');
}

function round(label, seconds, tps) {
    return `    - label: ${label}
      txDuration: ${seconds}
      rateControl:
        type: fixed-rate
        opts:
          tps: ${tps}
      workload:
        module: benchmark/workloads/transaction-types.js
        arguments:
          operation: ${operation}
          contention: ${contention}
          scenario: ${scenario}
          transactionSlots: ${transactionSlots}
          operationAmount: 1000
          fundStandard: 20000000
          fundReceiverStandard: 1000000
          maxTransferAmount: 50000
          seed: ${seed}`;
}

const config = `test:
  name: Digital Rupiah Statistical Study - ${operation} - ${contention}
  description: Isolated fixed-rate workload with explicit transaction and contention semantics
  workers:
    type: local
    number: ${workers}
  rounds:
${round(`warmup-${measuredLabel}`, warmupDuration, Math.min(5, targetTps))}
${round(measuredLabel, duration, targetTps)}

observer:
  type: local
  interval: 1

monitors:
  transaction:
    - module: ./benchmark/observers/jsonl-transaction-observer.js
      options: {}
  resource:
    - module: docker
      options:
        interval: 1
        cpuUsageNormalization: true
        containers:
${yamlList(containers, '          ')}
    - module: process
      options:
        interval: 1
        processes:
          - command: node
            arguments: caliper
            multiOutput: sum
`;

fs.mkdirSync(path.dirname(output), { recursive: true });
fs.writeFileSync(output, config);
console.log(JSON.stringify({ output, operation, contention, scenario, workers, targetTps, duration, measuredLabel }));
