'use strict';

const { RetailWorkloadBase } = require('./retail-base');

/**
 * Administrative policy benchmark.
 *
 * Uses SetAutoLimitPolicy with unique participant IDs. Shared global/tier policy
 * keys are intentionally excluded from this baseline because they create a hot
 * administrative key and should be benchmarked as a separate contention scenario.
 */
class AdminPolicyWorkload extends RetailWorkloadBase {
    async initializeWorkloadModule(workerIndex, totalWorkers, roundIndex, roundArguments, sutAdapter, sutContext) {
        await super.initializeWorkloadModule(workerIndex, totalWorkers, roundIndex, roundArguments, sutAdapter, sutContext);
        this.workerIndex = workerIndex;
        this.totalWorkers = totalWorkers;
        this.roundIndex = roundIndex;
    }

    participantId(slot) {
        return `policy_${this.ns()}_${slot}`;
    }

    async submitTransaction() {
        const slot = this.txIndex++;
        const autoRedemption = slot % 2 === 0;
        const minBalance = 50000 + slot;
        return this.submit('SetAutoLimitPolicy', [this.participantId(slot), autoRedemption, minBalance]);
    }
}

function createWorkloadModule() {
    return new AdminPolicyWorkload();
}

module.exports.createWorkloadModule = createWorkloadModule;
