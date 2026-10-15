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

The route groups below are registered in handlers/handlers.go; confirm exact methods and middleware there before changing access.

| Capability | Route family | Main role boundary |
|---|---|---|
| Health and session | /health, /auth/login, /auth/me | Health and login are entry points; /auth/me returns the authenticated principal |
| Wallet reads | /wallets | Authenticated application roles |
| Private contacts | /payment-contacts | Retail Customer and Merchant roles; records are private PostgreSQL shortcuts |
| Retail onboarding and KYC | /retail/customers, /kyc/... | Bank/PJP roles write; bank/PJP and oversight roles read |
| Transfer and balance reads | /transfers, /balances | Custodian roles transfer; approved retail customers and Merchants read their balances |

QRIS routes are disabled in the current prototype. Their backend code and data remain for a future restoration; do not treat QRIS payment behavior as currently available.
| Limits | /limits | Bank Indonesia writes; Bank Indonesia and Supervisor read |
| Participant lifecycle | /participants/... | Banks/PJP and Bank Indonesia can submit; Bank Indonesia owns lifecycle changes; configured institutional roles read |
| Treasury operations | /issuance-requests, /redemption-requests, /distribute, /rtgs/issuance-notification, /ledger/init | Bank Indonesia |
| Oversight | /transactions, /supervision/events, /reports/... | Bank Indonesia and Supervisor |

The role gate belongs on the server. Frontend role selection controls presentation only. Retail wallet ownership is checked against the authenticated subject on protected actions.

## Data and API contracts

- config/ owns environment parsing and Fabric gateway configuration. Gateways are selected by the principal's custodian MSP; do not add a shared default signer.
- services/ledger.go owns chaincode calls and business orchestration. Keep transaction names and argument order aligned with ../chaincode/digital_rupiah.go.
- services/ and models/ own PostgreSQL-backed application data, including authentication, off-chain KYC, private payment contacts, and operation receipts.
- handlers/ owns HTTP routing, request parsing, role grouping, and response writing. middleware/ owns authenticated role and subject context.
- Keep public JSON models stable and follow the money parser/serializer used by existing models. Do not introduce JavaScript floating-point amounts or expose database records directly.
- KYC documents remain off chain; chaincode receives the required hashes and status anchor.
- Idempotency keys and operation receipts protect supported mutation paths. Check the handler and service together before changing a mutation's replay behavior.

## Thesis traceability

The root [AGENTS.md](../AGENTS.md) contains the full FR/NFR matrix and performance evidence checkpoint. Backend responsibilities:

| Thesis item | Backend responsibility | Evidence |
|---|---|---|
| FR-01 | Route participant application and Bank Indonesia lifecycle actions to matching ledger methods | handlers/routes_test.go, handlers/authorization_test.go, services/ledger_test.go; thesis Chapter 4 functional results |
| FR-02 | Enforce Bank Indonesia route access and call Treasury issuance/distribution methods | handlers/authorization_test.go, services/ledger_test.go; thesis Chapter 4 issuance/distribution result |
| FR-03 | Authenticate transfer requests, check retail ownership, and map transfer to chaincode | handlers/authorization_test.go, services/ledger_test.go; thesis Chapter 4 transfer result |
| FR-04 | Expose permitted history, reconciliation, metrics, and supervision reads | handlers/routes_test.go; thesis Chapter 4 oversight result |
| FR-05 | Enforce role groups and request-principal context at HTTP boundary | handlers/authorization_test.go, handlers/routes_test.go; thesis Chapter 4 access-control result |
| NFR-02 | Persist off-chain KYC checks and audit events while linking ledger anchors | services/kyc_service_test.go, services/retail_customer_receipt_test.go; thesis Chapter 4 functional evidence |
| NFR-03 | Keep REST, services, PostgreSQL, and Fabric Gateway as separate integration layers | integration_test.go, main_test.go; thesis Chapter 3 architecture |

## Checks

Run go test ./... from this directory. Relevant tests include handlers/routes_test.go, handlers/authorization_test.go, services/ledger_test.go, services/kyc_service_test.go, services/payment_contacts_test.go, models/money_json_test.go, and integration_test.go.

For cross-layer changes, also run the matching frontend and chaincode checks from the root guide. Consult [CONTEXT.md](../CONTEXT.md) for canonical domain terms and [docs/adr/](../docs/adr/) for public API, money, and trust boundaries.
