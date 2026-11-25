# CDD-only subject decisions

## Status

Accepted (2026-11-06). Supersedes the "distinct senior identity" clause of ADR 0008. Amended (2026-11-09): each ledger control carries a bank and a non-bank citation (see Amendment). Superseded in part by ADR 0020 (2026-11-25): one low-risk flag returns, and `SetBusinessAuthority` is removed (see the last Amendment).

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

## Amendment (2026-11-09): dual citation (D19)

Each ledger control cites two regimes: a bank under POJK 8/2023, and a non-bank under PBI 10/2024. The same chaincode serves both. PBI 19/10/PBI/2017, cited in earlier drafts, was revoked by PBI 10/2024 with effect from 31 December 2024. The 2023 CDD Pedoman of Bank Indonesia is guidance for non-bank PJSP.

| Control | POJK 8/2023 (bank) | PBI 10/2024 (non-bank) | Checked against primary text |
|---|---|---|---|
| `CreatePending`, `ApproveSubject`: identification and verification before the relationship opens | Pasal 19 huruf a; Pasal 21 ayat (1) huruf a; Pasal 22 ayat (1) | Pasal 17 ayat (1); Pasal 22 ayat (2); Pasal 28 | Yes, both regimes |
| `FreezeSubject` with reason `dttot`: automatic blocking | Pasal 53 (ayat number not re-checked); Pasal 77 ayat (1) (report) | Pasal 47 ayat (1) huruf d; Pasal 60 ayat (1) (report) | Yes, DTTOT scope only |
| `SetBusinessAuthority`: representatives and beneficial owners | Not verified | Pasal 25 ayat (1) | Non-bank only |
| `ApproveSubject` with `approved = false`: refusal | Not verified | Pasal 38 ayat (1) | Non-bank only |
| `SetLimits`: payment limits | No operative article verified. PADG 24/7/PADG/2022 Pasal 22 remains a prototype parameter source, not a legal basis for limits | No operative article verified. Penjelasan Pasal 22 ayat (5) huruf a only | No |
| `FreezeSubject` with reasons `internal_review` and `authority_order`; `RequestUnfreeze`, `ApproveUnfreeze`: release | No operative article verified | No operative article verified | No |

The POJK citations in the Decision section were written before this check and are not re-verified. The table above replaces them for each control it covers.

## Amendment (2026-11-10): restriction periods

Moved here from ADR 0014, which ADR 0017 supersedes. Restriction periods are subject decisions, so this ADR holds them.

| Restriction | Period in chaincode | Legal basis cited in ADR 0014 | Checked against primary text |
|---|---|---|---|
| `internal_review` | 5 calendar days | UU No. 8 Tahun 2010, Pasal 26 ayat (1): at most 5 working days | No |
| `authority_order` | 30 calendar days | UU No. 8 Tahun 2010, Pasal 71 ayat (3): at most 30 working days | No |
| `dttot` | Until released | UU No. 9 Tahun 2013, Pasal 28 | No |

Calendar days never exceed the working-day maximum, so the chaincode stays within each cited limit. The chaincode map is `restrictionPeriods` in `chaincode/controls/controls.go`. The citations stay unverified until checked against the primary texts.

## Amendment (2026-11-25): superseded in part by ADR 0020

- The decision "The risk level, the PEP flag, the senior approver role, and `DecideHighRisk` are removed" no longer holds for the risk level in one respect. A `kyc_reviewer` records one boolean low-risk flag with a reason through `RecordReview`. It decides whether a Subject stays in CDD Sederhana and is not a risk level. The PEP flag, the senior approver, and `DecideHighRisk` stay removed, and EDD stays future work.
- The `SetBusinessAuthority` row in the action table and in the dual-citation table is void. The categories `merchant` and `business` are removed, so representatives and beneficial-owner references no longer exist. Subjects are Retail Customers only.
- The holdings limit now follows two Bank Indonesia ceilings, with PADG 32/2025 Pasal 19(1) as the parameter source. PADG 24/7/PADG/2022 Pasal 22 is no longer cited for ceilings, because ADR 0020 records it as a revoked rule.
