'use strict';

function firstDegradation(rows) {
    const ordered = [...rows].sort((left, right) => left.target_ops_per_second - right.target_ops_per_second);
    for (let index = 0; index < ordered.length; index += 1) {
        const current = ordered[index];
        if (current.failed_after_drain > 0 || current.timeouts > 0
            || current.offered_ops_per_second < current.target_ops_per_second * 0.9) {
            return index;
        }
        const previous = ordered[index - 1];
        if (previous && current.offered_ops_per_second > previous.offered_ops_per_second
            && current.completed_ops_per_second <= previous.completed_ops_per_second) {
            return index;
        }
    }
    return -1;
}

function selectLoads(rows) {
    const ordered = [...rows].sort((left, right) => left.target_ops_per_second - right.target_ops_per_second);
    if (ordered.length < 3) throw new Error('at least three sweep rates are required');
    if (ordered.some(row => row.fixture_exhausted)) throw new Error('sweep fixture pool was exhausted');
    const degradationIndex = firstDegradation(ordered);
    let end = degradationIndex < 0 ? ordered.length : Math.min(ordered.length, degradationIndex + 2);
    let start = Math.max(0, end - 3);
    if (end - start < 3) end = Math.min(ordered.length, start + 3);
    return {
        selected: ordered.slice(start, end).map(row => row.target_ops_per_second),
        degradation_index: degradationIndex,
        ceiling_not_observed: degradationIndex < 0,
        tested_rates: ordered.map(row => row.target_ops_per_second),
    };
}

module.exports = { firstDegradation, selectLoads };
