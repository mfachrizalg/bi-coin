'use strict';

function classifyFailure(value) {
    const message = String(value?.message || value?.diagnostic || value || '').trim();
    if (!message) return 'unresolved';
    const text = message.toLowerCase();

    if (/timeout|timed out|deadline exceeded|etimedout|aborterror/.test(text)) return 'timeout';
    if (/missing fabric identity|msp mismatch|access denied for msp|connection profile|network config|tls handshake|certificate|endorsement_policy_failure|endorsement mismatch|failed to load connection/.test(text)) {
        return 'configuration-error';
    }
    if (/fixture|subject is not active|subject not found|wallet not found|not eligible|insufficient balance|insufficient reserve|unsupported restriction|unknown distributor|missing reviewer request/.test(text)) {
        return 'fixture-error';
    }
    if (/fetch failed|econnrefused|econnreset|socket hang up|enotfound|eai_again|epipe|und_err/.test(text)) return 'unresolved';
    if (/mvcc|validation code|chaincode error|transaction invalid|transaction failed|endorsement failure/.test(text)) return 'transaction-failure';
    return 'transaction-failure';
}

function failureConfidence(value, classification = classifyFailure(value)) {
    const text = String(value?.message || value?.diagnostic || value || '').toLowerCase();
    if (classification === 'unresolved') return 'hypothesis';
    if (classification === 'timeout') return /timeout|timed out|deadline exceeded|etimedout/.test(text) ? 'confirmed' : 'hypothesis';
    if (classification === 'fixture-error') return /subject is not active|subject not found|wallet not found|not eligible|insufficient balance|insufficient reserve|limit exceeded|unsupported/.test(text)
        ? 'confirmed'
        : 'hypothesis';
    if (classification === 'configuration-error') return /missing fabric identity|msp mismatch|access denied for msp|connection profile|network config|tls handshake|certificate|endorsement_policy_failure|endorsement mismatch|failed to load connection/.test(text)
        ? 'confirmed'
        : 'hypothesis';
    return /mvcc_read_conflict|validation code|endorsement failure|transaction invalid/.test(text) ? 'confirmed' : 'hypothesis';
}

module.exports = { classifyFailure, failureConfidence };
