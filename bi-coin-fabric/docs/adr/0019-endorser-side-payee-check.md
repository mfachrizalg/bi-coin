# Endorser-side payee check

## Status

Accepted (2026-11-23). Settles the access rule that ADR 0018 left open for `CanPay` and `GetLimits`. Removes the public commitment that ADR 0018 kept for `GetSubjectHash`. Amended (2026-11-25): the payee check adds the low-risk and effective-ceiling conditions (ADR 0020).

## Context

ADR 0018 moved the Subject record into `cddCollection` but left the access rule for `CanPay` and `GetLimits` open. Transfer reads both for the payee. The transfer proposal is signed by EndUserMSP, which is not a collection member.

The workaround put the payee's full record in the transient map. The backend read it with a Distributor identity (`GetSubjectRecord`). Payments checked it against `GetSubjectHash`, a public commitment. The transient map travelled in the payer's proposal, so the payer's client and the EndUser gateway peer received the record: restriction reason, representatives, beneficial-owner references, document reference, salt, and all limits. That contradicted ADR 0018 and the Subject record definition in CONTEXT.md.

## Decision

1. The payee check runs on the endorsing members. The Transfer endorsement policy requires DistributorMSP and CentralBankMSP peers, and both are `cddCollection` members. `rupiah-payments` calls `controls.CheckPayee(subjectID, balanceAfter)` for the receiving Subject. It returns nil, or the single refusal `transfer not permitted`.
2. `CheckPayee` passes only when the Subject exists, is `active`, is not restricted at transaction time, has limits set, and `balanceAfter` does not exceed its holdings limit.
3. `CheckPayee` has no access check. Fabric passes the payer's creator into the nested call, so a member-only rule would refuse every transfer.
4. `CanPay` and `GetLimits` use `requireMemberOrActor`. `requireCounterpartyAccess` is removed.
5. Removed: `GetSubjectRecord`, `GetSubjectHash`, the public commitment that `putSubject` wrote, the `payee_record` transient argument, and the payments code that checked it. The backend submits `Transfer` without transient data.
6. Controls and payments are redeployed together as version 2.2, sequence 3.

## Consequences

- The payer learns only whether a transfer is permitted. The payer's client and gateway peer no longer receive payee CDD contents.
- Residual leak: any channel identity can call `CheckPayee`. With `balanceAfter` 0 it reveals whether a Subject is active, unrestricted, and has limits set. Varying `balanceAfter` reveals the holdings limit. Batasan item 2 ("pseudonym, action type, and time") does not cover this. Upgrade path: bind `CheckPayee` to the payer and require the caller to act for that payer.
- Fabric private-data hashes remain on the ledger as integrity evidence. No chaincode function returns them.
- Existing ledgers keep the `commitment` keys written before this change. No function reads them. A network reset clears them.
- Upgrade order matters. Commit controls first, then payments. Between the two commits, Transfer fails, because the old payments code calls `GetSubjectHash`.

## Amendment (2026-11-25): low-risk and effective ceiling (ADR 0020)

- Decision 2 is replaced. `CheckPayee` passes only when the Subject exists, is `active`, is not restricted at transaction time, is low risk, has limits set, and `balanceAfter` does not exceed its effective holdings limit. The effective holdings limit is the lower of the Subject's holdings limit and the Bank Indonesia ceiling for its verification state (unverified Rp2.000.000, verified Rp20.000.000). If the ceilings are not set, the check refuses. The refusal is still the single `transfer not permitted`.
- `CanPay`, `GetLimits`, and `CheckPayee` use one eligibility rule: status `active`, not restricted, low risk. `GetLimits` returns the effective holdings limit.
- Residual leak: varying `balanceAfter` now reveals the effective holdings limit, and therefore which ceiling applies when the ceiling is below the reviewer's holdings limit. The refusal does not say which condition failed, so a revoked low-risk flag looks like any other refusal. The upgrade path stays the same: bind `CheckPayee` to the payer.
- Payments needs no code change. The controls redeployment carries the new rule.
