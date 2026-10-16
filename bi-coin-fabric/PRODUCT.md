# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Primary and only design audience: thesis examiners (penguji) at the undergraduate thesis defense, DTETI FT UGM, watching a guided live demonstration of the frontend. Their job: confirm in a short session that each requirement (FR-01..FR-05, NFR-01..NFR-05) either works on screen or is backed by measured evidence, without confusion about what the prototype does and does not cover.

The in-product roles (Institutional Operator acting for Bank Indonesia, a Validator Bank, a PJP, or as Supervisor; Retail Customer; Merchant) are demonstration roles, not real users. Design decisions serve the examiner watching the demo, not a production operator.

## Product Purpose

A local two-tier retail Digital Rupiah prototype: a React/TypeScript frontend calls a Go REST API, which uses PostgreSQL for private application data and Fabric Gateway for ledger transactions; Go chaincode enforces the shared ledger rules.

Success: an examiner can trace each thesis requirement to a demonstrated flow in the UI or to a captured benchmark artifact.

## Positioning

A working prototype on a permissioned five-organization Hyperledger Fabric network, built against the Proyek Garuda design documents, with reproducible Caliper benchmark evidence. It is a research prototype, not a production system and not an official Bank Indonesia product.

## Operating Context

- Local stack started by `./start.sh`: Fabric network and chaincode, PostgreSQL, Go API on port 8080, Vite frontend on port 5173 proxying `/api`.
- One frontend bundle with two role-selected experiences: an institutional shell (Bank Indonesia, Participants, Supervisor) and a retail shell (Retail Customer, Merchant). Native hash routes; no router dependency (`docs/adr/0004-frontend-experience-boundaries.md`).
- Guided thesis demonstration (`frontend/src/pages/DemoPanel.tsx`) uses real role handoffs with explicit re-login and stores only non-secret progress in session storage.
- Demonstrated desktop-first, typically projected during the defense.

## Capabilities and Constraints

- Thesis-critical flows stay primary: participant lifecycle, Treasury Issuance, Distribution to Custodians, retail transfer, participant freeze, and Supervision.
- KYC is implementation-only and QRIS is code-only; world-state inspection lives in Prototype Lab. These remain demonstrable but must be labeled as outside thesis acceptance (`docs/adr/0003-thesis-and-prototype-feature-boundaries.md`).
- Monetary flow: Bank Indonesia Treasury -> Validator Bank or PJP Custodian -> Retail Customer or Merchant Wallet.
- Terminology is binding: `CONTEXT.md` terms and their Avoid lists (for example, Issuance not Minting; Participant roles are Validator Bank, Observer, and Payment Service Provider (PJP)).
- Frontend role gates control navigation only; backend middleware and chaincode are the authorization boundaries.
- Money is represented as strings across the API. Sensitive operations follow review -> submit -> receipt with duplicate-submit protection and stable idempotency keys.
- Payment Contacts are private, account-scoped shortcuts stored in PostgreSQL, not a wallet directory or proof of ownership.

## Brand Commitments

- Authored UI copy is concise English; backend-provided error text is shown unchanged (`docs/adr/0005-frontend-language-and-interface-design.md`).
- Current product name: "Garuda Digital Rupiah — Retail CBDC" (`frontend/index.html`).

## Evidence on Hand

- Tests: `frontend/tests/contracts.test.mjs`, Playwright e2e (`frontend/playwright.config.ts`), backend and chaincode Go test suites.
- Benchmark evidence: `benchmark/results/`, interpreted per the "Evidence checkpoint" in `AGENTS.md` and `benchmark/README-P1-benchmarks.md`.
- Requirement traceability: FR/NFR matrix in `AGENTS.md` and `frontend/AGENTS.md`.
- Prior UI review: `docs/reviews/20260910-frontend-ui-ux-review.md`.
- Absent, never fabricate: real users, production capacity, Bank Indonesia endorsement, or benchmark numbers not present in captured artifacts.

## Product Principles

1. Thesis flows first: issuance, distribution, participant lifecycle, transfer, and supervision are the primary work on every screen.
2. Scope honesty: prototype-only capabilities (KYC, QRIS, world state) are visibly labeled as such.
3. One vocabulary: `CONTEXT.md` terms everywhere, from UI labels to code.
4. No implied authority: the UI never suggests a client-side check is access control or that a Payment Contact proves identity.
5. Traceable numbers: every figure on screen comes from the ledger, the API, or a captured benchmark artifact.

## Accessibility & Inclusion

WCAG 2.2 AA baseline. Desktop-first, with narrow-screen reflow down to 390px. Semantic navigation with active-state attributes, live status regions for mutation outcomes, and visible focus styling.
