'use strict';

const DEFAULTS = Object.freeze({
    minimum: 0.1,
    maximum: 4096,
    initial: 32,
    expansion: 4,
    tolerance: 0.1,
});

function createSearch({ hint, minimum = DEFAULTS.minimum, maximum = DEFAULTS.maximum } = {}) {
    if (!(minimum > 0) || !(maximum >= minimum)) throw new Error('invalid capacity search range');
    const initial = Number.isFinite(Number(hint)) ? Number(hint) : DEFAULTS.initial;
    return {
        range: { minimum, maximum },
        hint: clamp(initial, minimum, maximum),
        probes: [],
        passing_rate: null,
        failing_rate: null,
        bounds: { passing: null, failing: null },
        boundary: null,
        stop_reason: null,
    };
}

const FAILURE_PROBE_OUTCOMES = Object.freeze({
    'transaction-failure': 'fail',
    timeout: 'inconclusive',
    unresolved: 'inconclusive',
});

function recordProbe(search, probe) {
    if (!Number.isFinite(probe.rate) || probe.rate < search.range.minimum || probe.rate > search.range.maximum) {
        throw new Error('probe rate is outside the configured search range');
    }
    if (FAILURE_PROBE_OUTCOMES[probe.classification]) {
        probe = { ...probe, classification: FAILURE_PROBE_OUTCOMES[probe.classification], failure_class: probe.classification };
    }
    if (!['pass', 'fail', 'configuration-error', 'fixture-error', 'inconclusive'].includes(probe.classification)) {
        throw new Error(`unknown probe classification: ${probe.classification}`);
    }

    const prior = search.probes.find(item => item.rate === probe.rate);
    if (prior && prior.classification !== probe.classification) {
        search.boundary = 'unstable';
        search.stop_reason = 'unstable-boundary';
    }
    search.probes.push({ ...probe });

    if (probe.classification === 'configuration-error' || probe.classification === 'fixture-error' || probe.classification === 'inconclusive') {
        search.stop_reason = probe.classification;
    } else if (probe.classification === 'pass') {
        search.passing_rate = Math.max(search.passing_rate ?? search.range.minimum - 1, probe.rate);
    } else {
        search.failing_rate = Math.min(search.failing_rate ?? search.range.maximum + 1, probe.rate);
    }

    if (search.passing_rate !== null && search.passing_rate >= search.range.maximum && search.failing_rate === null) {
        search.boundary = 'at-least-ceiling';
    } else if (search.failing_rate !== null && search.failing_rate <= search.range.minimum && search.passing_rate === null) {
        search.boundary = 'below-minimum';
    }
    search.bounds = { passing: search.passing_rate, failing: search.failing_rate };
}

function nextProbeRate(search) {
    if (search.stop_reason || search.boundary) return null;

    const { minimum, maximum } = search.range;
    const passing = search.passing_rate;
    const failing = search.failing_rate;
    if (passing !== null && failing !== null) {
        if ((failing - passing) / passing <= DEFAULTS.tolerance) return null;
        return roundedMidpoint(passing, failing);
    }
    if (passing !== null) {
        if (passing >= maximum) {
            search.boundary = 'at-least-ceiling';
            return null;
        }
        return Math.min(maximum, passing * DEFAULTS.expansion);
    }
    if (failing !== null) {
        if (failing <= minimum) {
            search.boundary = 'below-minimum';
            return null;
        }
        return Math.max(minimum, failing / DEFAULTS.expansion);
    }
    return search.hint;
}

function clamp(value, minimum, maximum) {
    return Math.min(maximum, Math.max(minimum, value));
}

function roundedMidpoint(passing, failing) {
    const midpoint = Number(((passing + failing) / 2).toFixed(6));
    if (midpoint <= passing || midpoint >= failing) return null;
    return midpoint;
}

module.exports = { DEFAULTS, createSearch, nextProbeRate, recordProbe };
