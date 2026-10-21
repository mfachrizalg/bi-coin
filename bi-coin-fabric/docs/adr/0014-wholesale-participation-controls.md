# Wholesale participation controls and restriction periods

## Status

Accepted (2026-10-21)

## Context

Retail subjects already pass CDD, EDD, beneficial-owner, limit, and restriction controls. Before this decision, wholesale participants had only access rules: Bank Indonesia registered a bank, issued to it, and redeemed from it, and a bank could debit only its own reserve. No implementing regulation for Rupiah Digital was found as of October 2026. UU No. 4 Tahun 2023 (P2SK) inserts Pasal 14A into UU No. 7 Tahun 2011 and leaves Rupiah Digital issuance to a future Peraturan Bank Indonesia. The controls below therefore follow Bank Indonesia's rules for the payment infrastructure it already operates (BI-RTGS participants), as the Proyek Garuda public consultation report recommends (p. 13).

## Decision

| Control | Ledger rule | Legal basis | Checked against the primary text |
|---|---|---|---|
| W1 Participant status | `SetParticipantStatus` (CentralBankMSP) sets `active`, `suspended`, `frozen`, or `closed` with one of six reason codes. | PBI No. 10 Tahun 2025, Pasal 81 ayat (1)–(2) and Penjelasan | Yes, by hand |
| W2 Closing | `closed` needs a zero reserve and a zero retail float, and is final. | PBI No. 10 Tahun 2025, Pasal 82 ayat (2) | Yes, by hand |
| W3 Admission evidence | `RegisterDistributor` requires `admissionRef`, the SHA-256 of Bank Indonesia's approval record. | PBI No. 10 Tahun 2025, Pasal 78–79 | Research agent only |
| W4 Transfer limit | `SetTransferLimit` (CentralBankMSP) sets a maximum value per interbank transfer. | PBI No. 10 Tahun 2025, Pasal 84 huruf a and Pasal 85 ayat (1) huruf a | Yes, by hand |
| W5 Four-eyes | A transfer above the sender's `approval_threshold` stays `pending` until another officer of the same bank calls `ApproveTransfer`. `RejectTransfer` cancels it. The threshold changes only through `ProposeApprovalThreshold` and `ApproveApprovalThreshold` by two different officers. | SEOJK No. 35/SEOJK.03/2017 (Four-Eyes Principle); PBI No. 10 Tahun 2025 Penjelasan on segregation of duties | SEOJK: research agent only. PBI text: by hand |

Status effects follow the Penjelasan of Pasal 81 ayat (1). `suspended` (ditangguhkan) blocks outgoing activity only: interbank transfer out, conversion, and wallet funding. Bank Indonesia can still issue to or redeem from the reserve, and other banks can still pay it. `frozen` (dibekukan) blocks every transaction. Reason codes map to Pasal 81 ayat (2) huruf a–f: `tikmi_assessment`, `administrative_sanction`, `authority_request`, `participant_request`, `participation_policy`, `payment_system_continuity`.

Each bank sets its own approval threshold. A new participant starts at 0, so every transfer needs a second officer until the bank sets a threshold.

Retail restrictions now end on their own after the legal maximum. `internal_review` lasts 5 days (UU No. 8 Tahun 2010, Pasal 26 ayat (1): at most 5 working days). `authority_order` lasts 30 days (Pasal 71 ayat (3): at most 30 working days). `dttot` lasts until lifted (UU No. 9 Tahun 2013, Pasal 28). The chaincode counts calendar days from the transaction timestamp, which never exceeds the working-day maximum.

## Consequences

- The thesis may claim these controls are modelled on Bank Indonesia's payment-infrastructure participation rules. It must not claim that they implement a Rupiah Digital regulation.
- The four-eyes threshold, the transfer limit, and the use of calendar days are design parameters, because the regulations set no number for them.
- Cite PBI No. 10 Tahun 2025 by its Lembaran Negara entry. The copy on bi.go.id leaves the promulgation number blank.
- The network enrolls a second wholesale officer, Distributor `User5`.
- The compliance catalog grows to 44 methods, 37 API routes, and 43 performance workloads. `ApproveApprovalThreshold` has correctness checks only, because each call needs a fresh proposal from another officer.
- The restriction expiry has Go unit tests only. The ledger smoke test cannot advance the transaction clock by 5 or 30 days.
