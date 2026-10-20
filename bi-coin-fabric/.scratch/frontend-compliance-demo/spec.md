# Frontend → compliance defense demo

Status: draft. OQ1–OQ4 open. No code changed.
Source: plan `~/.claude/plans/check-if-bi-coin-fabric-frontend-already-squishy-backus.md`, corrected 2026-10-14.

## Context

Question: is `bi-coin-fabric/frontend/` in sync with the study chaincodes (`rupiah-controls`, `rupiah-monetary`, `rupiah-payments`) and the compliance-framed thesis?

Verdict:
- Study API layer (`src/lib/api.ts`) matches `backend/handlers/study_handlers.go`: paths, methods, decimal amounts, `Idempotency-Key`, restriction reason codes.
- UI is not demo-ready for the thesis story:
  - No staff-role UI. `POST /staff`, `POST /staff/{client_id}/endorsement-policies` and `PUT /staff/{client_id}/role` have no api function or page. Maker-checker setup is impossible from the UI.
  - Legacy KYC refresh sends fake screening. `CreateWallet.tsx:117` hardcodes `checks: { sanctions: 'pass', aml: 'pass' }`. The thesis says sanctions screening is not implemented.
  - `DemoPanel` script covers 20 legacy steps only.
  - Vocabulary drift: UI says Freeze/Unfreeze. Glossary has no Subject, Restriction or Auditor.

## Decisions

| # | Decision | Status |
|---|---|---|
| Q1 | Frontend is a defense demo aid, not thesis evidence. Ch3 SRS says so in one line. | Decided |
| Q2 / Q10 | ValidatorMSP read-only actor labelled "Auditor". Backend role id `supervisor` unchanged. | **Open (OQ1):** Q2 said keep "Supervisor"; Q10 said use "Auditor" only |
| Q3 / Q11 | Staff roles seeded by script and set in new BI tab "Staff roles" (`study-staff`). | Decided |
| Q4 | Hide all legacy tabs from nav; keep page code. Also guard hash routes (F3). | Decided |
| Q5 / Q9 | Canonical terms Subject and Restriction. Freeze = legacy wallet/participant only. Rename UI labels and api.ts functions. | Decided |
| Q6 | Remove DemoPanel. | Decided |
| Q7 | Drop `overview`; each role lands on its first compliance tab. | Decided |
| Q8 | `validator_bank` has no study tabs; legacy tabs hidden; empty-state message. | Decided |

Why `validator_bank` has no study tabs: `studyMSPForRole` (`study_handlers.go:423-437`) has no `validator_bank` case, so it returns "". No study MSP, no study tabs. Only `supervisor` maps to ValidatorMSP.

## Facts checked (2026-10-14)

- **F1** `GET /identities/me` and `POST /subjects` allow only `authenticated`, `kyc_verified`, `merchant` (`study_handlers.go:34-36`). BI and both banks cannot read their own client ID there. → OQ2.
- **F2** Client `checks` are stored unvalidated and never reach the ledger. The UI sends hardcoded passes (`CreateWallet.tsx:117`, via `refreshKycProfile`, `api.ts:247`). `validateKycDecision` (`backend/services/ledger.go:1097`) checks status, risk, due diligence and approval rules, not `Checks`. `PostgresStore.RefreshKycProfile` (`postgres_store.go:330`; body read from the benchmark copy, live body not read) writes `req.Checks` into `kyc_provider_checks`. The chaincode call (`ledger.go:1084-1085`) sends profile, status, risk, due diligence, senior approval, hashes and expiry only. → OQ3.
- **F3** Hiding nav does not block routes. The hashchange handler (`App.tsx:149-156`) sets any tab from `tabFromHash` with no `ROLES[role].tabs` check. As BI, `#/institutional/kyc` renders `CreateWallet`. Login and role switch (`App.tsx:172-173, 196-197`) do check. Backend RBAC still enforces access.
- **F4** Unverified: whether `decodeJSON` (`handlers.go:29`) rejects unknown fields. It checks JSON shape and duplicate keys (`validateJSONShape`). Affects contract tests only.
- **F5** Unverified: thesis build command. `latexmk` is assumed.
- **F6** Unverified: `RequestRedemption` role (`digital_rupiah.go:2213`). Matters only if a redemption UI returns.

## Steps

### Frontend (`bi-coin-fabric/frontend/src`)
Follow `frontend/AGENTS.md`: change roles, routes, screen selection and contract tests together.

1. `App.tsx`
   - ROLES (:28-38): remove legacy tabs (`overview, participants, wallets, create, transfer, contacts, activity, supervision, prototype`). Add `study_staff` to `bank_indonesia`. Set `validator_bank.tabs = []`. Relabel `supervisor` per OQ1.
   - TAB_META: `study_wallet: 'Wallet'`, `study_transfer: 'Pay'`, `study_staff: 'Staff roles'`.
   - Routing (:88-108): add `study-staff` slug. Fallback tab = `tabs[0]`, not `overview`.
   - Hash guard (:149-156): set tab only if it is in `ROLES[role].tabs`. The effect has `[]` deps, so add `role` to deps.
   - Empty tabs: one-line empty state.
   - Screen selection (:290-299): `study_staff` goes to `OrganizationWorkspace` via the existing `study_` prefix. Confirm only.
   - Remove `DemoPanel` render (:301) and import.
2. `lib/api.ts`
   - Rename `freezeStudySubject` → `restrictSubject`, `requestStudyUnfreeze` → `requestSubjectRelease`, `approveStudyUnfreeze` → `approveSubjectRelease`.
   - Add `createStudyStaff(client_id)` → `POST /staff`; `protectStudyStaff(client_id)` → `POST /staff/{client_id}/endorsement-policies`; `setStudyStaffRole(client_id, role)` → `PUT /staff/{client_id}/role`. Roles: `kyc_reviewer | senior_approver | compliance_officer`. Reuse `studyPost` / `request`.
3. `pages/StudyConsole.tsx`
   - Labels: Freeze subject → Restrict subject; Request unfreeze → Request release; Approve unfreeze → Approve release.
   - New `study_staff` section (BI only): client ID input (source per OQ2), role select, buttons Create staff, Protect staff, Set role. Add to `permitted` (:66-70).
4. Delete `pages/DemoPanel.tsx` (it lives in `pages/`, not `components/`) and its imports.
5. Remove hardcoded `checks` from `CreateWallet.tsx:117` (per OQ3).
6. `tests/contracts.test.mjs`
   - Drop DemoPanel aria test.
   - Update study path test (:299) for renamed functions and 3 staff routes.
   - Update tab-visibility test (:335): no legacy tabs; BI has `study_staff`; supervisor label per OQ1.
   - Add: a legacy hash does not render for BI.

### Glossary: `bi-coin-fabric/CONTEXT.md` (glossary only)
- Add **Subject**: party under customer due diligence; category retail, merchant or business.
- Add **Restriction**: subject-level hold with a Restriction reason; lifted only by an approved release with a Release evidence reference. _Avoid_: Freeze.
- Add **Freeze**: legacy wallet/participant hold. _Avoid_: Restriction.
- Add **Auditor** (scope per OQ1): read-only actor in the compliance study, ValidatorMSP identity.
- Add **Staff role**: KYC reviewer, senior approver, compliance officer. Reviewer and senior approver must be different people.
- Add **Control** (per OQ4).
- Observer `_Avoid_`: remove "Auditor".
- Validator Bank note: not the ValidatorMSP audit identity.

### Thesis
- `thesis/contents/chapter-3/chapter-3.tex:40-42`: one line. The client app ("aplikasi klien") is a demonstration aid, not evaluated. Matches Ch2 `:440`.
- No naming change if OQ1 = a: the use-case figure (`chapter-3/controls-study-use-case.png`) already labels ValidatorMSP "Auditor".

### Demo prep (no code)
- Before any Fabric call, check benchmark run `20261014-01`. Last recorded running at 10:12 WIB. Do not touch the study network while it runs.
- Run backend with `FABRIC_IDENTITIES_JSON` and `AUTH_BOOTSTRAP_USERS_JSON`. Map reviewer, senior and compliance users to `User1`, `User2`, `User3` (`network/README.md:36-52`).
- Seed staff via `scripts/smoke-test.js` (`setupStaff`, :202-244), or the Staff roles tab.

## Verification
1. `cd bi-coin-fabric/frontend && rtk npm test && rtk npm run build`
2. `rtk npm run test:e2e`: login smoke; update nav expectations that name legacy tabs.
3. Manual study flow:
   1. BI: Staff roles → create, protect, set role for each client ID.
   2. Reviewer: record high-risk review, apply decision. Expect rejection.
   3. Senior: approve.
   4. Compliance officer: Restrict subject with `dttot`.
   5. Reviewer: Request release with 64-hex reference.
   6. Senior: Approve release.
   7. Auditor: Controls audit reads subject.
4. Thesis build: confirm command first (F5), then 0 undefined references.

Estimate: about 1.5–2 h frontend; 15 min glossary and thesis line.

## Open questions

- **OQ1 Auditor scope.** Q2 keeps "Supervisor". Q10 says use "Auditor".
  - a. Study tabs say "Auditor". Legacy `supervisor` keeps "Supervisor". **Recommended.** The thesis figure already says Auditor for ValidatorMSP.
  - b. Rename legacy "Supervisor" too. Conflicts with Observer (OJK) and the CONTEXT.md term "Supervisor".
  - c. Keep "Supervisor" everywhere (revert Q10).
- **OQ2 Staff client_id source.** `/identities/me` is unavailable to BI (F1).
  - a. Operator types the client IDs the script computes (`getClientID`). No backend change. **Recommended.**
  - b. New BI-only route listing mapped identities. Backend change.
  - c. Drop the Staff roles tab (reverses Q11). Seed by script only. Saves about 1 h.
- **OQ3 Client `checks` on KYC refresh.** Fake passes reach PostgreSQL unvalidated (F2).
  - a. Backend rejects `checks`; UI stops sending them. Small backend change. **Recommended.**
  - b. UI only: remove hardcoded passes. Backend still accepts client values.
  - c. Keep; label as manual attestation.
- **OQ4 Glossary term for the thesis topic.**
  - a. "Control" (selected KYC/AML/CFT controls). Do not define "Compliance". **Recommended.** Thesis disclaims full compliance.
  - b. "Compliance" as a defined term.

## Lazier cuts (not decided)
- Rename UI labels only; keep `api.ts` function names. Saves about 20 min.
- Drop the Staff roles tab (OQ2c).

## Known gaps, not in scope
- `StudyConsole.tsx:247` prints raw last-response JSON.
- Eleven unused `api.ts` functions and two stubs stay.
- KYC tiers are legacy only; study uses per-subject limits.
- E2E test uses default login `bi` / `bi-password`. Demo only.
