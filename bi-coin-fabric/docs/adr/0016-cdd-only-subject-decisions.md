# CDD-only subject decisions

## Status

Accepted (2026-11-06). Supersedes the "distinct senior identity" clause of ADR 0008.

## Context

The thesis draft claimed "CDD, termasuk EDD", but the prototype implemented only CDD. Its subject flow still carried a risk level, a PEP flag, and a senior approver.

POJK 8/2023 defines CDD as identification, verification, and monitoring (Pasal 1 angka 12 and Pasal 19–34). Pasal 36–37(1) place senior approval and PEP identification beside the CDD process ("selain menerapkan proses CDD"). EDD is Pasal 35(3) and 37(1)(d). Senior approval is therefore not a CDD step.

## Decision

- The prototype and the thesis implement CDD only. EDD becomes future work.
- The risk level, the PEP flag, the senior approver role, and `DecideHighRisk` are removed.
- The staff roles are `kyc_reviewer` and `compliance_officer`.
- `ApproveStandard` is renamed `ApproveSubject`. The assigned reviewer still approves or rejects the subject.
- The actions held by the senior approver move as follows.

| Action | Owner | Basis |
|---|---|---|
| `SetLimits` | `kyc_reviewer` | PADG 24/7/PADG/2022 Pasal 22 |
| `SetBusinessAuthority` | `kyc_reviewer` | POJK 8/2023 Pasal 27(a)(1), 33, 51 |
| `ApproveUnfreeze` | `compliance_officer` (`kyc_reviewer` requests) | POJK 8/2023 Pasal 12(e), 14(f), 47, 48, 53 |

## Consequences

- This ADR supersedes the "distinct senior identity" clause of ADR 0008. The reviewer and the compliance officer must still be different people. A release requester cannot approve the same release.
- `DecideSubject` passes the reviewer's `approved` flag to `ApproveSubject`. A `false` flag sets the `rejected` status.
- The high-risk and PEP workloads leave the compliance benchmark catalog. Earlier compliance results are not comparable with runs under this ADR.
