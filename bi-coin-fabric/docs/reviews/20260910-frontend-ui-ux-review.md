# Frontend UI/UX review — 2026-09-10

## Scope

Read-only baseline review of the current dirty `frontend/` snapshot, followed by a mocked-read browser pass at 1280×720 and 390×844. No backend, Fabric, or Docker process was running, so live role mutations were not exercised.

## Findings

1. **P0 — narrow screens unusable.** `body` enforced a 1280px minimum width; at 390px the login form and authenticated workspace were off-screen.
2. **P1 — retail recipient dead end.** Transfer loaded both sender and recipient choices from the authenticated actor's own wallet list, while the backend scopes retail wallet reads to the current subject.
3. **P1 — demo role handoff dead end.** Demo steps supplied a role but `handleDemoStep` ignored it; later steps targeted `supply` and `worldstate`, which were not rendered tabs.
4. **P1 — mutation feedback misleading.** Participant issuance, distribution, approval, and freeze errors were shown through a temporary success-style notification and controls lacked a shared busy state.
5. **P1/P2 — accessibility and copy gaps.** The shell lacked semantic navigation/active-state attributes, live status semantics, explicit focus styling, and consistent Indonesian canonical terminology. Empty login exposed raw server wording.

## Accepted direction

- One bundle with separate institutional and retail shells; desktop-first, with narrow-screen reflow and WCAG 2.2 AA baseline.
- Goal-based institutional navigation; one retail Pay workspace; thesis-critical flows remain primary.
- Retail recipients use Wallet ID plus saved Payment Contacts; no global directory. Contacts are authenticated, account-scoped PostgreSQL data.
- Sensitive operations use review → submit → receipt states with duplicate-submit protection and stable idempotency keys.
- Guided demo persists non-secret progress and requires explicit re-login for role changes.
