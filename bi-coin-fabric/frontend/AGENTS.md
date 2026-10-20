# Frontend guide

This directory is a React and TypeScript client built with Vite. It presents institutional and retail experiences over one API. Frontend role selection controls navigation and visibility; backend middleware and chaincode remain the authorization boundaries.

## Integration

- Vite serves port 5173. Its /api proxy targets http://localhost:8080 and removes /api before forwarding.
- src/lib/api.ts owns the API base, access-token handling, shared request wrapper, error parsing, public response types, and endpoint functions.
- src/App.tsx owns login/session flow, role configuration, hash-route parsing, shell selection, and screen selection.
- VITE_API_URL overrides the default /api; keep environment examples free of credentials.
- API errors should preserve backend-provided text where the current client already displays it.
- Never put passwords, tokens, or private KYC material in demo state.

## Experiences and screens

| Experience | Main routes and screens |
|---|---|
| Institutional | Subject approval, Business authority, Restrictions, Reserve and float, Monetary operations, Controls audit, Staff roles (`#/institutional/study-*`) |
| Retail | Subject onboarding, Wallet, Pay (`#/retail/study-*`) |
| Shared or supporting | Login, role profile, demo handoff and prefill |

Hash routes are implemented in src/App.tsx; do not add a router dependency without a concrete need.

## Contract changes

Follow a UI action through its page to src/lib/api.ts, then the backend handler and service. Match request fields, response types, role gates, string money representation, error behavior, and idempotency headers to the backend contract. The API type is a client projection, not a ledger record.

When a role, route, screen, or demo step changes, update the role configuration, hash-route mapping, screen selection, and relevant contract test together. Do not treat hidden buttons or client route guards as access control.

## Thesis traceability

The full FR/NFR matrix and current benchmark evidence are in the root [AGENTS.md](../AGENTS.md). Frontend contributions:

| Thesis item | Frontend responsibility | Evidence |
|---|---|---|
| FR-01 | Expose participant lifecycle screens to the intended institutional role | src/App.tsx, src/pages/StudyConsole.tsx, tests/contracts.test.mjs; thesis Chapter 4 functional results |
| FR-02 | Present issuance and interbank transfer steps with explicit institutional handoffs | src/pages/StudyConsole.tsx, src/lib/api.ts; thesis Chapter 4 issuance and transfer result |
| FR-03 | Collect transfer/pay inputs and show backend outcomes without claiming client-side authorization | src/pages/StudyConsole.tsx, src/lib/api.ts, tests/contracts.test.mjs; thesis Chapter 4 transfer result |
| FR-04 | Present audit and oversight reads from backend projections | src/pages/StudyConsole.tsx; thesis Chapter 4 oversight result |
| FR-05 | Select the correct experience and navigation from the authenticated role | src/App.tsx, tests/contracts.test.mjs; backend role checks remain authoritative |
| NFR-03 | Keep browser requests behind the API client and Vite/backend boundary | vite.config.ts, src/lib/api.ts; thesis Chapter 3 architecture |

## Checks

From this directory, run npm test for API contract checks and npm run build for TypeScript and Vite output. Use npm run test:e2e when changing browser flows. For request or ledger changes, also run backend or chaincode checks listed in the root guide.

Use [CONTEXT.md](../CONTEXT.md) for canonical language, [docs/adr/0004-frontend-experience-boundaries.md](../docs/adr/0004-frontend-experience-boundaries.md) for experience boundaries, and [docs/adr/0005-frontend-language-and-interface-design.md](../docs/adr/0005-frontend-language-and-interface-design.md) for interface decisions.
