# Backend guide

This directory is a standalone Go REST API. It is the integration boundary between frontend HTTP requests, authenticated application data in PostgreSQL, and Fabric Gateway transactions. The backend validates human roles and request ownership; chaincode independently validates Fabric MSP and ledger rules.

## Request flow

1. main.go loads configuration, creates PostgreSQL and authentication services, constructs the ledger service, and starts the HTTP server.
2. Global middleware applies authentication context and request-body limits. Handler route groups apply role requirements.
3. principalLedger resolves the authenticated principal through LedgerService.ForPrincipal, selecting a request-local Fabric contract and signer.
4. A handler validates/maps an HTTP request and calls the ledger service or PostgreSQL-backed service.
5. Ledger service methods submit/evaluate named chaincode transactions; responses are projected through backend models and handlers.

The frontend development server proxies /api to port 8080 and removes that prefix. The API itself registers routes without the prefix. See ../frontend/vite.config.ts and handlers/handlers.go.

## Route ownership

The route groups below are registered in handlers/handlers.go and handlers/study_handlers.go; confirm exact methods and middleware there before changing access.

| Capability | Route family | Main role boundary |
|---|---|---|
| Health and session | /health, /auth/login, /auth/me | Health and login are entry points; /auth/me returns the authenticated principal |
| Identity and subject intake | GET /identities/me, POST /subjects | Authenticated, KYC-verified, and Merchant roles |
| Retail wallets and transfers | POST /customer-wallets, GET /customer-wallets/{subject_id}/balance, POST /retail-transfers | KYC-verified and Merchant roles |
| Retail bank operations | POST /conversions, POST /wallet-fundings; POST /subjects/{subject_id}/endorsement-policies, /reviews, /decisions, /restrictions, /restriction-release-requests, /restriction-release-decisions; PUT /subjects/{subject_id}/limits, /business-authority | Retail Bank role (`retail_bank`) |
| Staff, distributor, and issuance operations | POST /staff, POST /staff/{client_id}/endorsement-policies, PUT /staff/{client_id}/role, POST /monetary-initializations, POST /distributors, POST /issuances, POST /reserve-redemptions | Bank Indonesia (`bank_indonesia`) |
| Interbank transfers | POST /interbank-transfers | Retail Bank and Wholesale Bank roles (`retail_bank`, `wholesale_bank`) |
| Supply, reserve, and float reads | GET /supply/wholesale, GET /supply/retail, GET /supply/total, GET /distributors/{distributor_id}/reserve, GET /distributors/{distributor_id}/float | Retail Bank and Wholesale Bank roles, Bank Indonesia, and Auditor (`auditor`) |
| Subject read | GET /subjects/{subject_id} | Retail Bank and Wholesale Bank roles, Bank Indonesia, and Auditor (`auditor`) |

The role gate belongs on the server. Frontend role selection controls presentation only. Retail wallet ownership is checked against the authenticated subject on protected actions.

## Data and API contracts

- config/ owns environment parsing and Fabric gateway configuration. Gateways are selected by the principal's custodian MSP; do not add a shared default signer.
- services/study_ledger.go owns chaincode calls and business orchestration. Keep transaction names and argument order aligned with ../chaincode/controls, ../chaincode/monetary, and ../chaincode/payments.
- services/ and models/ own PostgreSQL-backed application data, including authentication, off-chain KYC, and operation receipts.
- handlers/ owns HTTP routing, request parsing, role grouping, and response writing. middleware/ owns authenticated role and subject context.
- Keep public JSON models stable and follow the money parser/serializer used by existing models. Do not introduce JavaScript floating-point amounts or expose database records directly.
- KYC documents remain off chain; chaincode receives the required hashes and status anchor.
- Idempotency keys and operation receipts protect supported mutation paths. Check the handler and service together before changing a mutation's replay behavior.

## Thesis traceability

The root [AGENTS.md](../AGENTS.md) contains the full FR/NFR matrix and performance evidence checkpoint. Backend responsibilities:

| Thesis item | Backend responsibility | Evidence |
|---|---|---|
| FR-01 | Route Bank Indonesia distributor registration, and distributor subject review and decision requests, to matching study ledger methods | handlers/request_validation_test.go; thesis Chapter 4 functional results |
| FR-02 | Enforce Bank Indonesia route access and call monetary issuance methods | handlers/request_validation_test.go; thesis Chapter 4 issuance result |
| FR-03 | Authenticate transfer requests, check retail ownership, and map transfer to chaincode | handlers/request_validation_test.go; thesis Chapter 4 transfer result |
| FR-04 | Expose the permitted subject read (`GET /subjects/{subject_id}`) to institutional and Auditor roles | thesis Chapter 4 oversight result |
| FR-05 | Enforce role groups and request-principal context at HTTP boundary | services/auth_test.go, handlers/routes_test.go; thesis Chapter 4 access-control result |
| NFR-02 | Persist off-chain KYC checks and audit events while linking ledger anchors | thesis Chapter 4 functional evidence; no backend test covers KYC storage |
| NFR-03 | Keep REST, services, PostgreSQL, and Fabric Gateway as separate integration layers | main_test.go; thesis Chapter 3 architecture |

## Checks

Run go test ./... from this directory. Relevant tests include handlers/routes_test.go, handlers/request_validation_test.go, services/auth_test.go, config/study_config_test.go, and main_test.go.

For cross-layer changes, also run the matching frontend and chaincode checks from the root guide. Consult [CONTEXT.md](../CONTEXT.md) for canonical domain terms and [docs/adr/](../docs/adr/) for public API, money, and trust boundaries.
