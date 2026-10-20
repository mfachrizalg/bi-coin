# Repository guide

This repository is a local Hyperledger Fabric prototype for a two-tier retail Digital Rupiah. Read this guide first, then the nearest subsystem guide. The code and configuration describe current behavior; the thesis and ADRs describe claims and intended boundaries. Record mismatches instead of presenting one as proof of the other.

## System at a glance

| Part | Responsibility | Integration |
|---|---|---|
| frontend/ | React and TypeScript experiences for institutional operators, Retail Customers, and Merchants | Vite serves port 5173 and proxies /api to the Go API on port 8080. |
| backend/ | Go REST API, authentication, role checks, request-scoped Fabric access, and off-chain services | Reads PostgreSQL for application data and uses Fabric Gateway to submit or evaluate chaincode transactions. |
| chaincode/ | Go Fabric contract and authoritative ledger rules | Runs on Fabric peers; checks caller MSP and ledger state for protected operations. |
| network/, scripts/ | Local four-organization network (CentralBankMSP with the orderer, DistributorMSP, Observer (MSP ID: ValidatorMSP), EndUserMSP), channel, chaincode deployment, and smoke workflows | start.sh starts PostgreSQL, backend, and frontend; scripts/network-up.sh and scripts/deploy-chaincodes.sh set up the network and chaincodes. |
| benchmark/ | Caliper workloads, observers, and the compliance benchmark for the four-organization bi-coin network (network/, chaincode/) | Measures direct Fabric workloads. The Go/PostgreSQL/KYC demonstration is a separate end-to-end path. |

The main request path is:

1. A screen calls the shared client in frontend/src/lib/api.ts.
2. Vite forwards /api/... to the backend and removes the /api prefix.
3. The backend authenticates the request, checks its role, and resolves the request principal to its configured Fabric gateway.
4. backend/services/study_ledger.go translates the service operation into a named chaincode transaction and argument list.
5. Chaincode validates the Fabric caller and ledger rules, then reads or updates world state.
6. PostgreSQL stores application data that belongs off the shared ledger, including authentication and KYC records.

For local startup and exact environment settings, follow start.sh, README.md, .env.example, backend/config/, and docker-compose.postgres.yaml. Do not copy values from the local backend/.env into documentation.

## Change path

Trace the full path before changing an interface:

| Change | Follow through |
|---|---|
| Screen, role, or route | frontend/src/App.tsx and pages → frontend/src/lib/api.ts → backend route and role middleware |
| REST request or response | frontend API types → backend handler DTO/model → service → chaincode call if ledger-backed |
| Chaincode transaction name or arguments | backend service call → chaincode/controls, chaincode/monetary, or chaincode/payments → their tests and benchmark/workloads |
| Access rule | backend middleware and route groups → request-principal gateway selection → chaincode MSP checks and network endorsement policy |
| Stored data | PostgreSQL models/store and migrations for private application data; Fabric world state for shared monetary and institutional state |
| Benchmark result or thesis claim | workload/configuration → captured source snapshot and manifest → validation and summary → matching thesis result |

Keep the diff focused. Reuse existing patterns, inspect callers and tests before changing a shared contract, and preserve unrelated working-tree changes. Run the smallest relevant checks, then a cross-layer check when the contract crosses subsystem boundaries. A passing unit suite does not by itself establish that thesis claims and captured benchmark evidence agree.

## Product and thesis boundaries

- The thesis acceptance path centers on participant lifecycle, Issuance to Distributor Banks, Conversion and Wallet funding by the Retail Bank Custodian, retail transfer, and supervision.
- KYC is implementation-only and is not a thesis acceptance criterion. It still has real API, database, and chaincode contracts.
- This is a local prototype. Do not describe local benchmark results as production capacity or generalize them beyond the measured host, network, workload, and run conditions.
- Use CONTEXT.md for canonical institutional and wallet terms. Use existing ADRs for architectural decisions: Fabric trust and endorsement, public API projections and money, thesis scope, frontend boundaries, and benchmark measurement.
- The source tree, tests, config, and captured source snapshots establish observed behavior. The thesis and ADRs establish the requirements or claims to compare against that behavior.

## Thesis requirement traceability

Requirement IDs and descriptions come from the thesis Chapter 3 SRS table. Chapter 4 contains reported implementation and performance evidence. Follow subsystem guides for local details.

| Thesis item | Repository implementation | Verification or evidence |
|---|---|---|
| FR-01 participant lifecycle | chaincode/controls/controls.go; backend/handlers/handlers.go; backend/services/study_ledger.go | chaincode/controls/controls_test.go, backend/handlers/routes_test.go; thesis Chapter 4 functional results |
| FR-02 Issuance and interbank transfer | Chaincode Issue and TransferReserve (monetary) and ConvertToRetail (payments); backend issuance, transfer and conversion routes/services | chaincode/monetary/monetary_test.go; thesis Chapter 4 issuance/conversion result |
| FR-03 authorized, valid, atomic transfer | Chaincode Transfer (payments); backend transfer handler and service; authenticated wallet ownership checks | chaincode/payments/payments_test.go; thesis Chapter 4 transfer result |
| FR-04 audit and oversight reports | Chaincode read-only oversight queries (controls GetSubject and GetLimits; monetary GetReserve, GetWholesaleSupply, GetRetailSupply, and GetTotalSupply); backend read routes | chaincode/controls/controls_test.go, backend/handlers/routes_test.go; thesis Chapter 4 oversight result |
| FR-05 API role separation | backend/middleware/, backend/handlers/handlers.go route groups, frontend/src/App.tsx | backend/handlers/routes_test.go, frontend/tests/contracts.test.mjs; thesis Chapter 4 access-control result |
| NFR-01 permissioned network and endorsement | network/configtx.yaml, network/docker-compose.yaml, scripts/network-up.sh, scripts/deploy-chaincodes.sh | Network/config inspection and scripts/deploy-chaincodes.test.js; thesis Chapter 3 architecture and Chapter 4 network result |
| NFR-02 auditability and traceability | Chaincode receipts and subject records (payments GetReceipt, controls GetSubject); PostgreSQL KYC audit events (kyc_audit_events) | chaincode/controls/controls_test.go, chaincode/payments/payments_test.go; thesis Chapter 4 functional evidence |
| NFR-03 separated system layers | frontend/, backend/, chaincode/, docker-compose.postgres.yaml, backend stores and Fabric gateway | Architecture and backend/services/study_ledger.go; thesis Chapter 3 architecture |
| NFR-04 quantitative performance evaluation | benchmark/compliance/, benchmark/workloads/, benchmark/observers/, scripts/run-compliance-benchmark.sh, network/, chaincode/ | benchmark/results/compliance-*/correctness.json, capacity.json, summary.json, REPORT.md, and manifest.json; thesis Chapter 4 performance section |
| NFR-05 repeatable experiment evidence | Protocol hash, source capture, and manifest (benchmark/compliance/runner.js, scripts/write-study-manifest.js) | scripts/write-study-manifest.test.js; captured result manifests; thesis Chapter 4 limits this item to the configuration manifest |

The thesis source files are ../thesis/contents/chapter-1/chapter-1.tex, ../thesis/contents/chapter-3/chapter-3.tex, ../thesis/contents/chapter-4/chapter-4.tex, and ../thesis/contents/chapter-5/chapter-5.tex. Treat their current working-tree contents as the thesis claims for this checkout.

## Thesis performance claims and evidence status

Chapter 4 reports capacity from the four-organization compliance benchmark: one Caliper worker on one local host, channel bi-coin, and the chaincodes rupiah-controls, rupiah-monetary, and rupiah-payments. A rate passes only after three 30-second confirmation rounds. These are thesis claims, not permanent system guarantees.

| Thesis result | Reported value | Evidence to inspect |
|---|---:|---|
| Verified read operations (run-20261014-01) | 272 to 296 ops/s, a lower bound limited by client delivery | compliance-run-20261014-01 summary.json and REPORT.md |
| Highest passing write rate (run-20261014-01) | 0.184 to 4.75 TPS | Same summary |
| Correctness checks (run-20261014-01) | 20/20 scenarios, 207/207 API authorization cells, 27/27 validation cases, 15/15 action outcomes | correctness.json in the same directory |

Evidence checkpoint for this checkout (2026-10-16):

- The result directory is in a git-ignored disposable workspace under benchmark/results/runtime-workspaces/. The run-20261014-01 manifest records the four MSPs, three chaincodes, protocol hash, runtime versions, and a source/ snapshot, but no source commit; do not describe it as clean-source evidence.
- The run-20261014-01 summary.json lists all 31 workloads as bracketed, including fund-reserve (0.183594 passing, 0.195313 failing). Thesis Chapter 4 reports 30 of 31 and treats fund-reserve as inconclusive (0.183594 to 0.21875); reconcile the two before repeating either.
- Thesis Chapter 4 limits NFR-05 to the configuration manifest.
- Result files outside runtime-workspaces/ (statistical-*, statistical-review-replacements-*, e2e-*, and the dated Caliper logs) were produced between June and September 2026, before the four-organization network. ADR 0008 keeps that evidence separate; do not cite it as four-organization evidence.
- For a new result, inspect the stamp, source snapshot, manifest, correctness.json, capacity.json, and summary.json. benchmark/compliance/README.md defines the workflow and evidence rules; benchmark/README-P1-benchmarks.md lists the benchmark npm commands and which of them apply to compliance results.

## Fabric toolchain

Always use Hyperledger Fabric 2.5.16 for peer, orderer, configtxgen, osnadmin, and the CA client. Set `FABRIC_SAMPLES=$HOME/fabric-tools-2.5.16` before running network scripts. Do not use the Fabric 3.1.4 tools in `~/fabric-samples`. See [ADR 0012](docs/adr/0012-fabric-2-5-16-toolchain.md).

## Benchmark integrity

Before any compliance benchmark run, and before changing benchmarked code, follow [ADR 0013](docs/adr/0013-benchmark-integrity-and-change-impact.md) and [the benchmark runbook](docs/benchmark-runbook.md). Only a clean, committed tree produces valid results. After a run, any edit to `scripts/`, `chaincode/`, `backend/`, `network/`, or `benchmark/{workloads,observers,isolated,compliance}/` requires a new stamp. Edits elsewhere do not.

## Checks

Run commands from the owning directory:

| Area | Check |
|---|---|
| Frontend | npm test, npm run build, and npm run test:e2e when UI behavior changes |
| Backend | go test ./... |
| Chaincode | go test ./... |
| Benchmark scripts | npm run test:benchmarks; read benchmark/compliance/README.md before starting a live Fabric benchmark |
| Full local smoke flow | bash scripts/network-up.sh, then bash scripts/deploy-chaincodes.sh, then node scripts/smoke-test.js. ./start.sh separately starts PostgreSQL, backend, and frontend and keeps them running |

For benchmark interpretation and operational preconditions, read benchmark/compliance/README.md. For terminology, read CONTEXT.md; for architecture decisions, read docs/adr/.
