# Repository guide

This repository is a local Hyperledger Fabric prototype for a two-tier retail Digital Rupiah. Read this guide first, then the nearest subsystem guide. The code and configuration describe current behavior; the thesis and ADRs describe claims and intended boundaries. Record mismatches instead of presenting one as proof of the other.

## System at a glance

| Part | Responsibility | Integration |
|---|---|---|
| frontend/ | React and TypeScript experiences for institutional operators, Retail Customers, and Merchants | Vite serves port 5173 and proxies /api to the Go API on port 8080. |
| backend/ | Go REST API, authentication, role checks, request-scoped Fabric access, and off-chain services | Reads PostgreSQL for application data and uses Fabric Gateway to submit or evaluate chaincode transactions. |
| chaincode/ | Go Fabric contract and authoritative ledger rules | Runs on Fabric peers; checks caller MSP and ledger state for protected operations. |
| network/, scripts/ | Local network, channel, chaincode deployment, ledger initialization, and smoke workflows | start.sh coordinates network and deployment, PostgreSQL, backend, and frontend startup. |
| benchmark/ | Caliper workloads, observers, isolated transaction studies, and result analysis | Measures direct Fabric workloads. The Go/PostgreSQL/KYC demonstration is a separate end-to-end path. |

The main request path is:

1. A screen calls the shared client in frontend/src/lib/api.ts.
2. Vite forwards /api/... to the backend and removes the /api prefix.
3. The backend authenticates the request, checks its role, and resolves the request principal to its configured Fabric gateway.
4. backend/services/ledger.go translates the service operation into a named chaincode transaction and argument list.
5. Chaincode validates the Fabric caller and ledger rules, then reads or updates world state.
6. PostgreSQL stores application data that belongs off the shared ledger, including authentication, KYC records, and private payment contacts.

For local startup and exact environment settings, follow start.sh, README.md, .env.example, backend/config/, and docker-compose.postgres.yaml. Do not copy values from the local backend/.env into documentation.

## Change path

Trace the full path before changing an interface:

| Change | Follow through |
|---|---|
| Screen, role, or route | frontend/src/App.tsx and pages → frontend/src/lib/api.ts → backend route and role middleware |
| REST request or response | frontend API types → backend handler DTO/model → service → chaincode call if ledger-backed |
| Chaincode transaction name or arguments | backend service call → chaincode/digital_rupiah.go → tests and Caliper workloads |
| Access rule | backend middleware and route groups → request-principal gateway selection → chaincode MSP checks and network endorsement policy |
| Stored data | PostgreSQL models/store and migrations for private application data; Fabric world state for shared monetary and institutional state |
| Benchmark result or thesis claim | workload/configuration → captured source snapshot and manifest → validation and summary → matching thesis result |

Keep the diff focused. Reuse existing patterns, inspect callers and tests before changing a shared contract, and preserve unrelated working-tree changes. Run the smallest relevant checks, then a cross-layer check when the contract crosses subsystem boundaries. A passing unit suite does not by itself establish that thesis claims and captured benchmark evidence agree.

## Product and thesis boundaries

- The thesis acceptance path centers on participant lifecycle, issuance into the Bank Indonesia Treasury, distribution to institutional Custodians, retail transfer, and supervision.
- KYC is implementation-only and QRIS is code-only; neither is a thesis acceptance criterion. They still have real API, database, and chaincode contracts.
- This is a local prototype. Do not describe local benchmark results as production capacity or generalize them beyond the measured host, network, workload, and run conditions.
- Use CONTEXT.md for canonical institutional and wallet terms. Use existing ADRs for architectural decisions: Fabric trust and endorsement, public API projections and money, thesis scope, frontend boundaries, and benchmark measurement.
- The source tree, tests, config, and captured source snapshots establish observed behavior. The thesis and ADRs establish the requirements or claims to compare against that behavior.

## Thesis requirement traceability

Requirement IDs and descriptions come from the thesis Chapter 3 SRS table. Chapter 4 contains reported implementation and performance evidence. Follow subsystem guides for local details.

| Thesis item | Repository implementation | Verification or evidence |
|---|---|---|
| FR-01 participant lifecycle | chaincode/digital_rupiah.go; backend/handlers/handlers.go; backend/services/ledger.go | chaincode/digital_rupiah_v3_test.go, chaincode/authorization_test.go, backend/handlers/routes_test.go, backend/services/ledger_test.go; thesis Chapter 4 functional results |
| FR-02 Treasury issuance and direct distribution | Chaincode Mint, RequestIssuanceRtgs, and DistributeToParticipant; backend issuance and distribution routes/services | chaincode/digital_rupiah_v3_test.go, backend/services/ledger_test.go; thesis Chapter 4 issuance/distribution result |
| FR-03 authorized, valid, atomic transfer | Chaincode Transfer; backend transfer handler and service; authenticated wallet ownership checks | chaincode/digital_rupiah_test.go, chaincode/authorization_test.go, backend/services/ledger_test.go, backend/handlers/authorization_test.go; thesis Chapter 4 transfer result |
| FR-04 audit and oversight reports | Chaincode transaction history, audit, supervision, reconciliation, and metrics operations; backend read routes | chaincode/digital_rupiah_v3_test.go, backend/handlers/routes_test.go; thesis Chapter 4 oversight result |
| FR-05 API role separation | backend/middleware/, backend/handlers/handlers.go route groups, frontend/src/App.tsx | backend/handlers/authorization_test.go, backend/handlers/routes_test.go, frontend/tests/contracts.test.mjs; thesis Chapter 4 access-control result |
| NFR-01 permissioned network and endorsement | network/crypto-config.yaml, network/configtx.yaml, network/docker-compose.yaml, scripts/network-up.sh, scripts/deploy-chaincode.sh | Network/config inspection and scripts/deploy-chaincode.test.js; thesis Chapter 3 architecture and Chapter 4 network result |
| NFR-02 auditability and traceability | Chaincode audit/history/supervision records; PostgreSQL KYC audit records | chaincode/digital_rupiah_v3_test.go, chaincode/offchain_kyc_test.go, backend/services/kyc_service_test.go; thesis Chapter 4 functional evidence |
| NFR-03 separated system layers | frontend/, backend/, chaincode/, docker-compose.postgres.yaml, backend stores and Fabric gateway | Architecture and backend/integration_test.go; thesis Chapter 3 architecture |
| NFR-04 quantitative performance evaluation | benchmark/workloads/, benchmark/observers/, benchmark/benchconfigs/, scripts/run-benchmark-study.sh | benchmark/results/*/validation.json, summary.json, REPORT.md, and manifest.json; thesis Chapter 4 performance section |
| NFR-05 repeatable experiment evidence | Study configuration, source capture, manifest, and artifact validation under scripts/ | scripts/generate-study-config.test.js, scripts/write-study-manifest.test.js, scripts/validate-study-artifacts.test.js; captured result manifests |

The thesis source files are ../thesis/contents/chapter-1/chapter-1.tex, ../thesis/contents/chapter-3/chapter-3.tex, ../thesis/contents/chapter-4/chapter-4.tex, and ../thesis/contents/chapter-5/chapter-5.tex. Treat their current working-tree contents as the thesis claims for this checkout.

## Thesis performance claims and evidence status

Chapter 4 reports the following sustainable rates using five repetitions, at least 99% success, and successful-transaction p95 at most 2.5 seconds. These are thesis claims, not permanent system guarantees.

| Thesis result | Reported value | Evidence to inspect |
|---|---:|---|
| Balance query | 190 TPS | benchmark/results/statistical-20260917-pilot6/summary.json |
| Wallet freeze / unfreeze | 50 / 65 TPS | Same pilot summary |
| Redemption | 25 TPS | Pilot summary and the newer Rp1,000 replacement summary below |
| Low-contention retail transfer / merchant payment | 20 / 20 TPS | Pilot summary and the newer Rp100 transfer replacement below |
| Issuance, distribution, and high-contention transfer | No sustainable rate in the tested range | Pilot summary, run rows, and newer targeted replacements |

Evidence checkpoint for this checkout (2026-09-24):

- The pilot has 380 runs and 140 scenarios, and its validation.json says valid. Its manifest also marks the captured worktree dirty and records 340 changed paths. Do not describe this run as clean-source evidence.
- statistical-review-replacements-20260920T173457Z-rp100 and statistical-review-replacements-20260920T173457Z-rp1000 each have valid validation output and a captured source/ snapshot based on commit d959f8252efde79405c5e1bb6a8793250cba5c96.
- The Rp100 replacement supports low-contention transfer at 20 TPS. Its high-contention 20 TPS row averages 2.005 achieved TPS and 10.02% success; reconcile the precise percentage with the thesis Chapter 5 value before repeating it.
- The Rp1,000 replacement tests distribution at 75 TPS and redemption at 20 TPS. Distribution fails that tested rate; redemption sustains 20 TPS. The thesis currently reports redemption at 25 TPS, so reconcile that claim against the replacement run before treating it as current.
- For a new result, inspect the exact amount, workload, source snapshot, manifest, validation, and summary. Do not select a result directory only because its name contains “final”; benchmark/README-P1-benchmarks.md defines the study workflow and evidence rules.

## Checks

Run commands from the owning directory:

| Area | Check |
|---|---|
| Frontend | npm test, npm run build, and npm run test:e2e when UI behavior changes |
| Backend | go test ./... |
| Chaincode | go test ./... |
| Benchmark scripts | npm run test:benchmarks; read the study guide before starting a live Fabric benchmark |
| Full local smoke flow | ./scripts/run-full-suite.sh after reviewing its network and ledger preconditions |

For benchmark interpretation and operational preconditions, read benchmark/README-P1-benchmarks.md. For terminology, read CONTEXT.md; for architecture decisions, read docs/adr/.
