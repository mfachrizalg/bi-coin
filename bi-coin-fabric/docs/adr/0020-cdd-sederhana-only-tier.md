# CDD Sederhana as the only tier

## Status

Accepted (2026-11-25). Supersedes ADR 0016 in part: the "no risk level" decision gives way to one low-risk flag, and `SetBusinessAuthority` is removed. Amends ADR 0018 (record fields and off-chain placement) and ADR 0019 (payee check conditions).

## Context

ADR 0016 limited the prototype to CDD and removed the risk level. After that decision the subject flow was identification plus one reviewer approval. It had no verification state, no record of the DTTOT check, no monitoring, no data update, and no closure.

The prototype's Distributor is a non-bank PJSP. The governing text is Bank Indonesia's "Pedoman Prinsip Mengenal Pengguna Jasa (CDD) bagi PJSP Selain Bank dan KUPVA BB" (2023), kept in `.raw/papers/pedoman-prinsip-mengenal-pengguna-jasa-cdd-pjsp-selain-bank-dan-kupvabb.md`. Line numbers below refer to that markdown copy. The Pedoman allows simplified CDD for a low-risk product with a limited balance (lines 2672–2674).

The study is research work. It does not implement AML/CFT detection. Evidence gathering therefore cannot be automated, and the question is which part of CDD the ledger can still enforce.

## Decision

1. **Tier.** The prototype implements CDD Sederhana only, for individual Retail Customers. Chaincode accepts the category `retail` and nothing else. The categories `merchant` and `business`, `SetBusinessAuthority`, representatives, and beneficial-owner references are removed. Standard CDD and EDD are outside the prototype and are listed as future work.
2. **Low-risk flag.** The ADR 0016 removal of the risk level no longer holds for one product-level flag. A `kyc_reviewer` records a boolean `low_risk` and a reason through `RecordReview`. It is the condition for staying in CDD Sederhana. It is not a level, a score, or a model. The PEP flag, the senior approver, and `DecideHighRisk` stay removed.
3. **Boundary.** The ledger enforces the decision gates: who may transact, up to which ceiling, and until when. Evidence gathering stays manual and off chain. Identity verification is a reviewer's comparison of the data with the identity document, recorded as an evidence reference. DTTOT list matching is a reviewer's manual check, and the ledger records only the result (`not_listed` or `listed`). No Dukcapil check and no list-matching service exists. Every obligation gets a code representation, even when a person supplies the evidence.
4. **Approval gate.** `ApproveSubject` activates a Subject only when the reviewer approves, the DTTOT result is `not_listed`, the low-risk flag is set, limits are set, and Bank Indonesia has set the ceilings. Otherwise the Subject becomes `rejected`, which is terminal. Eligibility to pay or receive means status `active`, not restricted, and low risk. `CanPay`, `GetLimits`, and `CheckPayee` share one eligibility rule.
5. **Ceilings.** Bank Indonesia sets two holdings ceilings in public ledger state through `SetCddCeilings`: Rp2.000.000 for an unverified Subject and Rp20.000.000 for a verified one. The reviewer's per-Subject limits stay, and the holdings limit may not exceed the verified ceiling. The effective holdings limit is the lower of the reviewer's holdings limit and the ceiling of the Subject's verification state. Unset ceilings refuse approval and `SetLimits`. The values come from PADG 32/2025 Pasal 19(1) as parameters, mapping unregistered to unverified and registered to verified. Digital Rupiah is not e-money, so the article is a parameter source and not a legal basis.
6. **Lifecycle.** `VerifySubject` (`kyc_reviewer`) records an evidence reference (SHA-256) and raises the Subject to verified. `UpdateSubject` (`kyc_reviewer`) replaces the document reference and the DTTOT result and returns the Subject to unverified. A `listed` result restricts the Subject with reason `dttot`, as `FreezeSubject` does. `CloseSubject` (`kyc_reviewer`) ends the relationship for `data_missing`, `fictitious`, `identity_doubtful`, or `customer_request`. Status `closed` is terminal, and the funds stay held. `RevokeLowRisk` (`compliance_officer`) clears the flag after a confirmed suspicion. The Subject stays `active` but cannot pay or receive.
7. **Monitoring.** Monitoring is a backend consumer of the payments event `TransferReceived`, through a Fabric Gateway chaincode-event listener. It is not chaincode. Three rules run as pure functions. R1: an unverified balance at or above 80% of the unverified ceiling raises a verify alert. R2: more than N transfers in 24 hours. R3: at least three transfers within 10% below the per-transaction limit in 24 hours. Thresholds come from backend configuration, and the listener checkpoints in PostgreSQL. An alert has no ledger effect until a compliance officer confirms it. Confirmation writes an LTKM draft and calls `RevokeLowRisk`. LTKM drafts stay in PostgreSQL and are not sent to PPATK.
8. **Anti-tipping-off.** Confirming an alert and revoking the low-risk flag write no customer notice (Pedoman lines 1907–1918). Closure does write a written notice (Pedoman lines 1889–1906).

Obligation mapping, from the Pedoman:

| Obligation | Pedoman lines | Representation |
|---|---|---|
| DTTOT or proliferation-financing match: block and report | 1545–1558 | Listed at onboarding: `ApproveSubject` rejects. Active Subject found listed later: `FreezeSubject` or `UpdateSubject` with reason `dttot`. |
| Suspicion: report, and simplified CDD no longer applies | 1583–1587, 1828–1832 | Alert confirmation, LTKM draft, `RevokeLowRisk` |
| Missing, fictitious, or doubtful identity: close and notify in writing | 1889–1906 | `CloseSubject` and a customer notice |
| Low-risk product with limited balance and limit | 2672–2674 | Low-risk flag and the CDD ceilings |
| Register of simplified-CDD users with their reason | 1834–1839 | Sederhana register, readable by Bank Indonesia and the Auditor |
| Verification after opening while capped, and when the threshold is reached | 1831–1837 | `VerifySubject`, the unverified ceiling, and rule R1 |

## Trade-off

CDD Sederhana permits verification after the relationship opens, or when a threshold is reached, for a capped low-risk product (Pasal 31(3)(b)–(c)). In return the prototype needs no risk model, no PEP identification, and no senior approver, which ADR 0016 had already moved out of scope. Standard CDD and EDD would serve a customer who needs more than the ceiling or who is not low risk. The prototype serves neither: a Subject without the low-risk flag is rejected.

The choice has three costs. First, the product has a hard maximum of Rp20.000.000 in holdings, and a customer who needs more has no path, because Standard CDD is not implemented. Second, low risk is the reviewer's assertion about the product, so the system enforces a decision but cannot show that the decision was sound. Third, the unverified ceiling prompts verification and no deadline does, so an unverified Subject can stay unverified below Rp2.000.000. Rule R1 only raises an alert.

One may argue that a ledger which cannot check a DTTOT list or a population record enforces nothing of substance. The argument holds for evidence quality. It does not hold for the gates. A Subject that is listed, not low risk, closed, or over its ceiling cannot be paid, whatever any off-chain system says, because both endorsing peers run the same payee check (ADR 0019).

## Legal basis

Checked against regulation text on 2026-11-25.

- PBI 10/2024 Pasal 68 revokes PBI 19/10/PBI/2017. CDD Sederhana is PBI 10/2024 Pasal 31. Verification after opening or at a threshold is Pasal 31(3)(b)–(c). The identity fields of an individual are Pasal 18(1)(a).
- The 2023 Pedoman stays in force. PADG 15/2025 Pasal 41 keeps it in force "tetap berlaku sepanjang tidak bertentangan".
- Banks: POJK 8/2023 Pasal 45 (CDD sederhana). As in ADR 0016, the same chaincode serves a bank and a non-bank Distributor.
- Holdings ceilings: PADG 32/2025 Pasal 19. Balance Rp2.000.000 for an unregistered customer and Rp20.000.000 for a registered one. Pasal 19(2) sets a monthly incoming cap of Rp20.000.000 and Rp40.000.000, which the prototype does not enforce. These are e-money rules used as parameters. They do not bind Digital Rupiah.
- PADG 24/7/PADG/2022 Pasal 22, named in ADR 0016 as a parameter source, points to a revoked rule and is no longer cited for ceilings.

The tier-level citations above cover the new controls. They are not assigned article by article to each transaction.

## Consequences

- Records written before this decision lack the new fields. The study network is reset with a backup (ADR 0011) and not migrated. Earlier compliance results are not comparable with runs under this ADR.
- Controls is redeployed with a higher sequence. Payments needs no code change for this decision. Bank Indonesia must set the ceilings before any Subject can be approved.
- The refusal text stays `transfer not permitted` (ADR 0019). A payer learns only that the transfer is not permitted.
- Not modelled, and listed as Batasan: Dukcapil verification, automated DTTOT matching, signature, beneficial-owner identification, a risk model, Standard CDD and EDD, sending LTKM to PPATK, leftover funds after closure, handover to BHP, the 5-year purge (ADR 0018), and the monthly incoming cap.
