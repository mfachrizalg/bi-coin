'use strict';

const fs = require('node:fs');
const path = require('node:path');
const TxObserverInterface = require('@hyperledger/caliper-core/lib/worker/tx-observers/tx-observer-interface');

function marshalResult(result) {
    const value = typeof result?.Marshal === 'function' ? result.Marshal() : result?.status || result || {};
    const customData = value.custom_data instanceof Map
        ? Object.fromEntries(value.custom_data.entries())
        : value.custom_data || {};
    return { ...value, custom_data: customData };
}

/**
 * Persists the Caliper lifecycle events needed for exact result analysis.
 * The regular Caliper HTML report intentionally omits percentiles and timeout
 * partitions, so the statistical report is derived from this trace.
 */
class JsonlTransactionObserver extends TxObserverInterface {
    constructor(options, messenger, workerIndex) {
        super(messenger, workerIndex);
        this.traceDir = options?.traceDir || process.env.BENCHMARK_TRACE_DIR || 'benchmark/results';
        this.stream = null;
    }

    async activate(roundIndex, roundLabel) {
        await super.activate(roundIndex, roundLabel);
        if (!this.stream) {
            fs.mkdirSync(this.traceDir, { recursive: true });
            this.stream = fs.createWriteStream(
                path.join(this.traceDir, `transactions-worker-${this.workerIndex}.jsonl`),
                { flags: 'a' },
            );
        }
    }

    txSubmitted(count) {
        if (!this.active) return;
        this.write({
            event: 'submitted',
            workerIndex: this.workerIndex,
            roundIndex: this.currentRound,
            roundLabel: this.roundLabel,
            count,
            timestamp: Date.now(),
        });
    }

    txFinished(results) {
        if (!this.active) return;
        const values = Array.isArray(results) ? results : [results];
        for (const result of values) {
            this.write({
                event: 'finished',
                workerIndex: this.workerIndex,
                roundIndex: this.currentRound,
                roundLabel: this.roundLabel,
                result: marshalResult(result),
            });
        }
    }

    write(value) {
        if (!this.stream) throw new Error('transaction trace stream is not initialized');
        this.stream.write(`${JSON.stringify(value)}\n`);
    }

    async deactivate() {
        await super.deactivate();
        if (!this.stream) return;
        await new Promise((resolve, reject) => {
            this.stream.write('', error => (error ? reject(error) : resolve()));
        });
    }
}

function createTxObserver(options, messenger, workerIndex) {
    return new JsonlTransactionObserver(options, messenger, workerIndex);
}

module.exports = { JsonlTransactionObserver, createTxObserver, marshalResult };
