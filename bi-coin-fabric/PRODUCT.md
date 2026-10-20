# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Primary and only design audience: thesis examiners (penguji) at the DTETI FT UGM undergraduate defense. They watch a guided, projected demonstration of the frontend. Their job in a short session: confirm that each thesis requirement either works on screen or is backed by a captured measurement, and see clearly what the prototype does not cover.

The five in-product roles (Central Bank, Wholesale Bank, Retail Bank, Auditor, End User) follow the organization architecture. Both bank roles sit in the Distributor organization. They are demonstration roles, not real users. Each role is entered by explicit sign-in and sign-out. The examiner must never read a role switch as a change of real user.

## Product Purpose

A local two-tier retail Digital Rupiah prototype. The React/TypeScript frontend calls a Go REST API. The API uses PostgreSQL for private application data and Fabric Gateway for ledger transactions. Go chaincode enforces the shared ledger rules.

Success: an examiner can find each thesis requirement by its name and trace it to a demonstrated flow in the UI or to a captured benchmark artifact.

## Positioning

A working prototype on a permissioned four-organization Hyperledger Fabric network (CentralBankMSP, DistributorMSP, ValidatorMSP, EndUserMSP), built against the Proyek Garuda design documents, with captured Caliper evidence. It is a research prototype, not a production system and not an official Bank Indonesia product.

## Operating Context

- Local stack: `./start.sh` starts the Fabric network and chaincode, PostgreSQL, the Go API on port 8080, and the Vite frontend on port 5173, which proxies `/api`.
- One bundle, two shells: institutional (Central Bank, Wholesale Bank, Retail Bank, Auditor) and retail (End User). Hash routes, no router dependency (`docs/adr/0004-frontend-experience-boundaries.md`).
- The guided demonstration lives in `frontend/src/pages/StudyConsole.tsx`. Role handoffs are real: each change of role requires sign-out and sign-in.
- Desktop-first, projected during the defense. Mobile reflow is secondary.

## Capabilities and Constraints

- Thesis flows are primary: participant lifecycle, Issuance, subject onboarding and approval, Conversion, Wallet funding, retail transfer, Restriction and release, and Supervision.
- Subject onboarding and subject approval are KYC. KYC is implementation-only and not a thesis acceptance criterion (`docs/adr/0003-thesis-and-prototype-feature-boundaries.md`). These screens stay demonstrable and carry a visible "outside thesis acceptance" label.
- Monetary flow: Central Bank Issuance of w-Rupiah Digital into a Distributor reserve, then Conversion into the Retail Bank's Retail float as r-Rupiah Digital, then Wallet funding into an End User Wallet, then retail transfer.
- Vocabulary is binding (see Vocabulary below).
- Frontend role gates control navigation only. Backend middleware and chaincode are the authorization boundaries. The UI must not imply otherwise.
- Money is an integer rupiah string across the API. Sensitive operations follow review, submit, receipt, with duplicate-submit protection and stable idempotency keys.

## Vocabulary

Every heading, label, and button uses `CONTEXT.md` terms. Known gaps in the current UI:

- Role labels: Central Bank, Wholesale Bank, Retail Bank, Auditor, End User. Replace the current labels "Bank Indonesia", "Participant", "Retail Customer", and "Merchant" as role labels.
- "Mint" becomes Issuance.
- "Redeem reserve" becomes Redemption.
- Restriction, not Freeze. "Freeze" is a legacy term and must not appear.
- A tab's navigation label and its heading use one name. Today "Pay" and "Transfer" differ.
- "DTTOT" is expanded on screen and shown as a Restriction reason. It is not a screening result.

Thesis requirement codes (FR-01 to NFR-05) never appear on screen. Requirements are named by their title.

## Requirements

The thesis defines ten requirements. The table is for maintainers. The UI shows titles and evidence only.

| Title | Thesis ID | Requirement (summary) | Evidence (thesis chapter 4) |
|---|---|---|---|
| Participant lifecycle | FR-01 | Registration, approval, restriction, lifting, and termination of participants by role | Partial: termination not tested |
| Issuance and interbank transfer | FR-02 | Issuance by the Central Bank directly into Distributor reserves; Interbank transfer between reserves; Conversion and Wallet funding to retail | Limited: issue and convert-to-retail workloads in performance run |
| Transfer authorization | FR-03 | Reject unauthorized, restricted, invalid, or over-balance transfers; atomic balance update | Integration test, run-20261014-01 |
| Reconciliation and monitoring | FR-04 | Reconciliation reports, metrics, transaction history, and supervision events for authorized roles | Partial: not tested on study network |
| API role separation | FR-05 | Access separation on the backend API for public, authenticated, Wholesale Bank, Retail Bank, End User, and Auditor | Role-route matrix, run-20261014-01 |
| Permissioned Fabric network | NFR-01 | Permissioned network with organization endorsement policies on the channel | Architecture and network inspection |
| Audit traceability | NFR-02 | Audit records, supervision events, and transaction history traceable to participants | Partial: unit tests not in run artifact |
| Layer separation | NFR-03 | Client, API, off-chain database, and chaincode separated for modular access control | Architecture and config inspection |
| Caliper measurement | NFR-04 | Throughput, latency, and success rate measured with Hyperledger Caliper | Caliper benchmark artifacts |
| Repeatability | NFR-05 | Config, seed, artifact hashes, topology, and documented scenarios allow repeat runs | Partial: manifest only |

Rule: show a requirement on screen only when its evidence is complete. Limited or partial evidence stays hidden until it is complete. Evidence shown on screen names its run ID.

## Product Principles

1. Thesis flows first: issuance, conversion, wallet funding, participant lifecycle, transfer, and supervision are the primary work on every screen.
2. Scope honesty: KYC is visibly labeled. Partial evidence is never shown as complete.
3. One vocabulary: `CONTEXT.md` terms in UI labels, headings, and code. Requirements are named, not coded.
4. No implied authority: the UI never suggests that a client-side check is access control, that a Payment Contact proves identity, or that a Restriction reason is a screening result.
5. Traceable numbers: every figure on screen comes from the ledger, the API, or a captured benchmark artifact, and names its source run.

## Accessibility & Inclusion

WCAG 2.2 AA baseline. Desktop-first, with narrow-screen reflow down to 390px. Semantic navigation with active-state attributes, live status regions for mutation outcomes, and visible focus styling. Labels must stay legible when projected.
