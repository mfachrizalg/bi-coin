# Comprehensive `bi-coin-fabric` Review

**Review window:** 24--25 August 2026  
**Baseline:** `master` at `0207584077575bc859f16f8be9811211890b3e0c`  
**Disposition:** Review complete; source remediations applied for F1--F12; final conformance evidence is captured in `benchmark/results/20260909-final-evidence-manifest.json`
**Overall gate:** **AMBER / CONDITIONAL**

## Executive verdict

- **Thesis/demo readiness: CONDITIONAL.** Corrected functionality and boundary profiles pass on fresh ledgers; performance profiles contain measured failures at peak load, so no zero-failure throughput claim is supported.
- **Production readiness: NO-GO.** The prototype still has a single orderer/peer topology and retains the legacy combined `bank_pjp` role alias; those are explicit hardening limits.
- **Documentation scope is now explicit.** KYC is implementation-only, QRIS is code-only, and both are excluded from thesis acceptance criteria. The core thesis path is participant lifecycle, BI Treasury issuance, two-tier distribution, retail transfer, freezing, and supervision.
- **The review itself is complete.** Failed and interrupted profiles are retained as evidence; no success is inferred from a Caliper exit code alone.

## Review contract

The review covered the frontend, backend, chaincode, Fabric topology, deployment and smoke scripts, Caliper workloads, tests, OpenAPI-facing models, and the alignment of implementation behavior with the thesis contract. `bi-coin-iroha`, generated diagrams, unrelated manuscript edits, and application remediation were excluded.

Findings are classified twice:

- **Thesis/demo:** whether the implemented core flow and its evidence are defensible in a supervisor demonstration or manuscript claim.
- **Production hardening:** whether the design is safe and operable beyond the single-host research prototype.

## 7--8 September 2026 source confirmation

The frontend, backend, chaincode, benchmark workloads, smoke script, and network helpers were rechecked after remediation. Frontend contracts, the TypeScript/Vite build, backend and chaincode race-enabled Go tests, benchmark/oracle tests, and `go vet` all pass.

**Thesis/demo verdict: CONDITIONAL.** The final Docker-in-Docker evidence package produced fresh reports for the performance and functional profiles; a separate clean-ledger boundary rerun produced `8/8`. The performance reports retain their success/failure counts and are reported as measured-with-failures rather than PASS.

**Code-correctness verdict: GREEN for thesis scope, AMBER for production hardening.** F1--F12 have source-level fixes and focused regressions; the legacy `bank_pjp` role remains only as a compatibility alias and the topology remains single-node per role. QRIS remains code-only and KYC implementation-only.

The accepted custody model is **Treasury -> Custodian -> Wallet Owner**: Bank Indonesia distributes directly from its treasury to either a Validator Bank or a Payment Service Provider. Observers cannot be Custodians. This corrects prior shorthand that implied a mandatory Validator Bank-to-PJP hop; the current source implements the clarified flow.

### Isolated live evidence

The fresh 7--8 September Docker-in-Docker ledger confirmed the remediated core path without changing the host environment:

- The upgraded chaincode rejected `Mint(wlt_live-retail-0908, 1)` with `issuance must credit bi_treasury`.
- `RequestIssuance(100000)` followed by `DistributeToParticipant(live-custodian-0908, 100000, ...)` committed; the Validator wallet received the funds while Treasury supply stayed constant.
- A Himbara-custodied wholesale wallet funded a KYC-approved STANDARD retail wallet; balances became `50000` and `50000`, with `monthly_received=50000` on the retail wallet.

The isolated environment also completed Vite browser login as the disposable BI user and rendered all three initialized system limits. It proves the bootstrap/read and core mutation paths; the corrected Caliper conformance artifacts below complete the relevant acceptance checks.

### 8 September 2026 remediation update

**F5 remediated.** `Mint` now rejects every destination except `bi_treasury`; amount-only issuance and RTGS issuance credit Treasury. Treasury distribution accepts an active Validator Bank or PJP Custodian and rejects all other participant types. The public API and BI workspace no longer accept an issuance target or a distribution sender. The isolated browser/backend/Fabric run verified Treasury issuance followed by successful direct distributions to both a Validator Bank and a PJP.

The distribution receipt now uses the shared settled money-operation shape, so a committed Treasury distribution returns HTTP 200 rather than committing on Fabric and then failing backend receipt validation.

**F6 and F7 remediated.** The shared operation journal now rejects an existing pending key before any second Fabric submission; submitted operations retain their recovery path and completed operations retain response replay. The Treasury distribution and QRIS UI generate one key per submission. QRIS now passes that operation reference to chaincode, so separate payments against one static code no longer deduplicate against the first settlement.

**F9 remediated.** REST-facing money responses now serialize whole-rupiah values as decimal strings, including wallets, participants, limits, balances, transfers, transactions, QRIS intents, reconciliation, and metrics. Distribution input is parsed from a validated decimal string at the handler boundary, and the frontend formats values with `BigInt`. The MaxInt64 regression preserves every digit; generated OpenAPI schemas declare money strings.

The isolated live API returned `{"wallet_id":"bi_treasury","balance":"200"}` with a string balance after the conversion, confirming the boundary behavior beyond unit serialization tests.

**F1--F4 remediated in source.** Benchmark fixture funding now uses a serialized Treasury/Custodian path, the runner fails closed on transaction failures, the boundary oracle requires all eight cases, and OJK is excluded from application writers/endorsement and chaincode approval. `configtxgen` validates the current channel policy. The full sweep confirmed multi-worker setup completes and emits reports.

**F8 remediated with compatibility alias.** JWT verification now reloads the auth user and rejects deactivated users; explicit `validator_bank` and `pjp` roles are accepted by backend routes and frontend workspace guards. The legacy `bank_pjp` role remains as a migration alias.

**F10--F12 remediated in source.** The full suite generates and validates Caliper assets, network/deploy scripts fail closed, smoke uses JWT plus current Treasury routes, manifests hash inputs and artifacts with runtime/image/topology metadata, and the single-node topology is explicitly recorded as a limitation.

## Verification summary

| Gate | Result | Evidence |
|---|---:|---|
| Backend Go tests | PASS | Four packages passed; two packages have no tests |
| Chaincode Go tests | PASS | One package passed |
| Frontend contracts | PASS | 7/7 tests |
| Frontend TypeScript/Vite build | PASS | 44 modules built |
| Benchmark/oracle unit tests | PASS | 7/7 test files/subtests |
| Thesis compile | PASS | 101 pages; zero undefined references/citations; final evidence tables visually checked on PDF pages 64--68 |
| Current isolated conformance/performance artifacts | **CAPTURED** | Combined final manifest `20260909-final-evidence-manifest.json`; see current evidence below |

Final evidence runtime: Node 22.23.2, npm 10.9.1, Docker 27.5.1, Caliper CLI 0.6.0, Fabric peer/orderer image 2.5, and CouchDB 3.2. The host verification environment is separate; host/image version drift must be recorded when reproducing the run.

## Confirmed findings

### F1 — P1 — Concurrent benchmark setup causes phantom-read conflicts and missing reports

**Status: SOURCE AND CLEAN-LEDGER EVIDENCE VERIFIED on 8 September 2026.**

**Trigger.** Run the two- or four-worker transfer profiles, or the two-worker repetition profile, on a fresh ledger.

**Evidence.** The three profiles repeatedly fail `Mint` with Fabric status code 12, then Caliper throws `TypeError: this.workers[workerId].phases[phase].reject is not a function`; see the `transfer-w2`, `transfer-w4`, and `transfer-repeat` logs under `benchmark/results/20260824-review-full-01-*`. Fabric protobufs installed with the project define code 11 as `MVCC_READ_CONFLICT` and code 12 as `PHANTOM_READ_CONFLICT`, so this is not evidence of ordinary MVCC failure. `Mint` calls the aggregate-limit path at `chaincode/digital_rupiah.go:750-775`; that path scans the wallet namespace through `listWalletsForParticipant` at `chaincode/digital_rupiah.go:1538-1562` and `sumParticipantBalances` at `chaincode/digital_rupiah.go:1567-1579`.

**Impact.** `w2`, `w4`, and repetition produce no HTML report. The full-suite performance claim is therefore incomplete.

**Remediation applied.** Each profile now creates a shared Custodian deterministically, serializes Treasury/Custodian setup funding, and leaves measured traffic concurrent. The historical logs below remain unchanged evidence; they must not be presented as post-remediation results.

**Regression.** The clean-ledger `w2` and `w4` runs emitted fresh reports without setup phantom-read failures; peak-load failures remain recorded as measurements.

### F2 — P1 — The suite can label a failure-heavy performance run PASS

**Status: SOURCE AND CLEAN-LEDGER EVIDENCE VERIFIED on 8 September 2026.**

**Trigger.** Run `benchmark:transfer:w1`.

**Evidence.** `scripts/run-full-suite.sh:101-145` primarily requires process success, a fresh report, and no failed-round marker. The resulting `transfer-w1` report records:

| Round | Success | Fail | Throughput |
|---|---:|---:|---:|
| Warmup, 10 TPS | 301 | 0 | 9.3 TPS |
| Sustained, 30 TPS | 2,997 | 599 | 29.4 TPS |
| Peak, 60 TPS | 1,654 | 5,543 | 58.8 TPS |

The runner recorded `PASS` despite 6,142 failed transactions.

**Impact.** A successful process and high offered-load throughput can be mistaken for a successful transaction workload. This can overstate the benchmark result in the thesis.

**Remediation applied.** `scripts/validate-caliper-report.js` parses every Caliper result row; zero-failure rows are `PASS`, while failure-bearing standard profiles are recorded as `MEASURED_WITH_FAILURES` and fail the suite exit status.

**Regression.** The clean-ledger sweep records failure-bearing standard profiles as `MEASURED_WITH_FAILURES`; the report parser regression rejects a report containing a failed transaction.

### F3 — P1 — Core functionality and boundary conformance are red

**Status: SOURCE AND CLEAN-LEDGER EVIDENCE VERIFIED on 8 September 2026.**

**Trigger.** Run the functionality and boundary profiles on clean ledgers.

**Evidence.** Functionality completes only KYC onboarding (56 success, zero fail); monetary operations, supervision reads, and admin policy fail during `Mint`/`Transfer` setup, yielding one successful round out of four. Boundary produces five successes and three failures, while its oracle reports `mismatches: 3`, `infrastructureErrors: 0`, and `verdict: FAIL`.

**Impact.** The current live run does not demonstrate the core thesis functionality or exact-limit behavior, even though unit tests pass.

**Remediation applied.** Functionality workloads now use Custodian-funded retail wallets and distinct-wallet redemption; boundary and negative fixtures use the same path. The boundary oracle now requires `passed=8`, `total=8`, `expected=8`, zero mismatches, and zero infrastructure errors.

**Regression.** Corrected functionality completed all four rounds with zero failures; corrected boundary reported `8/8` with zero mismatches and infrastructure errors.

### F4 — P1 — OJK is not cryptographically read-only

**Status: SOURCE REMEDIATED on 8 September 2026; policy generation validated.**

**Trigger.** Evaluate channel policy or deploy chaincode with the current Garuda configuration.

**Historical evidence.** The pre-remediation configuration granted OJK local writer/endorsement policies and included it in application-level authority. The current application writer/endorsement and lifecycle rules exclude OJK, and deployment skips OJK approval while retaining installation for read queries.

**Impact.** This contradicts the accepted observer-only trust boundary and allows the supervisor organization to participate in state-changing governance.

**Smallest remediation.** Remove OJK from writer and endorsement authority while retaining ledger-read access. Require BI participation for monetary-policy and participant-governance mutations; ordinary shared transactions may retain a separately documented participant policy.

**Regression.** An OJK identity can evaluate supervision queries but cannot submit a write, approve a definition, or satisfy endorsement.

### F5 — P1 — Treasury-only issuance is documented but not enforced

**Status: RESOLVED on 8 September 2026.**

**Trigger.** Invoke `Mint` as BI with any non-treasury wallet ID.

**Historical evidence.** `chaincode/digital_rupiah.go:750-781` authorized BI and validated the wallet/amount but did not require `walletID == "bi_treasury"`; the treasury wallet is initialized at `chaincode/digital_rupiah.go:390-403`.

**Impact.** BI can bypass the published treasury-to-Custodian distribution path, weakening the thesis's two-tier claim.

**Smallest remediation.** Reject `Mint` destinations other than the canonical BI Treasury wallet. Permit distribution only from that treasury to an eligible Validator Bank or PJP Custodian, and preserve redemption back to the treasury.

**Regression.** Treasury mint succeeds; otherwise-identical minting to validator, PJP, merchant, or retail wallets fails without changing supply.

### F6 — P1 — Idempotency is absent at two UI boundaries and non-exclusive in the journal

**Status: RESOLVED on 8 September 2026.**

**Trigger.** Click QRIS Pay or Distribute, or submit two concurrent identical requests with one idempotency key.

**Historical evidence.** `frontend/src/lib/api.ts:248-250,273-279` sent no `Idempotency-Key`; handlers read it at `backend/handlers/handlers.go:546,690`, and `backend/services/ledger.go:168-170` rejected blank keys. PostgreSQL elected one journal creator at `backend/services/postgres_store.go:620-644`, but `backend/services/ledger.go:196-203` let an existing `pending` operation continue, allowing duplicate Fabric submissions from the QRIS and distribution paths at `backend/services/ledger.go:475-490,1054-1061`.

**Impact.** The normal UI fails before submission, while concurrent retries can create duplicate Fabric work and race-dependent responses.

**Smallest remediation.** Reuse the frontend's existing UUID/header pattern for both calls. Preserve the journal's creator result: only the creator submits, `pending` duplicates return an in-progress response, and completed operations replay the saved result.

**Regression.** UI contract tests assert both headers. A blocked first submission plus a simultaneous duplicate must yield exactly one Fabric call.

### F7 — P2 — Static QRIS replays the first settlement reference

**Status: RESOLVED on 8 September 2026.**

**Trigger.** Pay one static QRIS intent twice using different payers, amounts, or request keys.

**Historical evidence.** Intent creation fixed one reference at `backend/services/ledger.go:315-324`; every payment sent it at `backend/services/ledger.go:490-491`. Chaincode deduplicated on that reference and returned the prior receipt before validating the new payment at `chaincode/digital_rupiah.go:840-855`.

**Impact.** A later caller may receive a successful old transaction while balances do not move. QRIS is code-only, so this does not block the thesis gate, but it is a correctness defect in the shipped prototype.

**Smallest remediation.** Give each static-code payment its operation reference; retain the QRIS intent reference as related metadata. Dynamic QRIS remains single-use.

**Regression.** Two unique keys against one static code produce two balance movements; replaying either key returns exactly its own receipt.

### F8 — P2 — Application roles and revocation do not enforce the accepted model

**Status: RESOLVED on 8 September 2026; `bank_pjp` remains a compatibility alias.**

**Trigger.** Sign in as Bank/PJP, or reuse a JWT after its user/participant is deactivated.

**Historical evidence.** The earlier frontend hid participant submission from `bank_pjp`, and JWT verification did not reload the active auth user. The current frontend exposes submission to `bank_pjp` and `bank_indonesia`, and `AuthService.Verify` rejects a missing or inactive user on every protected request.

**Impact.** An authorized submission workflow is hidden, capabilities cannot be separated cleanly, and deactivation does not immediately revoke an existing token.

**Remediation applied.** Explicit `validator_bank` and `pjp` roles now pass the same custodian route surface; `bank_pjp` remains accepted only for existing deployments. Lifecycle controls remain BI-only.

**Regression.** Role-matrix tests cover visible actions and routes. A token issued before deactivation must fail on its next protected request.

### F9 — P2 — Public money values are not precision-stable

**Status: RESOLVED on 8 September 2026.**

**Trigger.** Return or submit a whole-rupiah value above JavaScript's safe-integer limit.

**Historical evidence.** Requests mixed decimal strings and distribution `int64` at `backend/models/models.go:142-149,174-193`; participant, limit, balance, transaction, and QRIS responses exposed JSON numbers at `backend/models/models.go:247-257,308-351`. The frontend mirrored those as `number` at `frontend/src/lib/api.ts:33-40,72-74,96-102,273-278`.

**Impact.** Browser clients can silently lose monetary precision, and the public contract remains inconsistent.

**Smallest remediation.** Introduce explicit REST projections with whole-rupiah decimal strings at JSON boundaries and validated `int64` internally. Update generated OpenAPI and frontend types atomically; do not expose ledger structs directly.

**Regression.** Round-trip `math.MaxInt64` through backend JSON and the frontend parser without changing a digit.

### F10 — P2 — Clean-checkout benchmark orchestration is incomplete

**Status: SOURCE REMEDIATED on 8 September 2026.**

**Trigger.** Run the documented suite without previously generated Caliper identities.

**Historical evidence.** The earlier runner omitted the generator and trusted stale ignored identities. The current preflight invokes `bash benchmark/gen-network-assets.sh` and verifies every `path:` entry in `benchmark/networkconfig.yaml`; the three Caliper client organizations remain documented by the network configuration.

**Impact.** Old ignored files can mask a clean-checkout failure, and the setup contract is unclear.

**Smallest remediation.** Call the generator explicitly with `bash` during preflight, verify every path referenced by `benchmark/networkconfig.yaml`, and document that BI, Himbara, and Commercial Bank are the Caliper client identities.

**Regression.** Remove only generated network identities in an isolated test checkout, run preflight, and assert all referenced profile/cert/key files are recreated.

### F11 — P2 — Network and deployment scripts can report false success

**Status: SOURCE REMEDIATED on 8 September 2026.**

**Trigger.** Exhaust peer-join retries or fail a chaincode install for a reason other than "already installed."

**Historical evidence.** The earlier scripts could print global success after a failed join or install. The current network script checks orderer readiness, tolerates already-joined peers idempotently, and asserts every join; deployment tolerates only the exact already-installed response and skips OJK approval.

**Impact.** A partial network can proceed into a benchmark and contaminate evidence.

**Smallest remediation.** Track each peer's join/install result, allow only the exact idempotent already-installed condition, and exit nonzero if any expected peer is missing.

**Regression.** Inject one unreachable peer and one real install error; both scripts must fail and must not print global success.

### F12 — P2/P3 — Smoke, provenance, and topology remain prototype-grade

**Status: SOURCE REMEDIATED except topology hardening on 8 September 2026.**

**Trigger.** Use the smoke script as authentication evidence, reproduce an old run from its manifest, or lose one orderer/peer.

**Historical evidence.** The earlier smoke script used obsolete API keys and stale request shapes. The current smoke script logs in for a JWT, exercises current Treasury routes, and uses idempotency headers; the manifest now hashes lockfile, configs, scripts, reports/logs, and records installed Caliper/image/topology metadata. The one-orderer/one-peer topology remains a declared prototype limitation.

**Impact.** The smoke result is not current RBAC evidence, run provenance is incomplete, and the topology has no node-failure tolerance.

**Smallest remediation.** Replace API-key smoke calls with role-specific JWT login flows; hash every evidence input/output and exact runtime/image; retain the single-node topology only as an explicit thesis limitation.

**Regression.** Smoke exercises the current role matrix. A manifest verifier detects any changed report, log, lockfile, script, topology file, or image digest.

## Current isolated evidence (9 September 2026)

The final package uses fresh ledgers in `bi-coin-review-dind`. The manifest
suite seed is `20260909`; transfer workload files retain deterministic seed
`20260725`. The complete
performance/functional sweep is stamped `20260909-final-08`; the boundary
profile was rerun on a clean ledger as `20260909-final-boundary` after the
sweep's setup phase failed. The combined status and provenance files are
`benchmark/results/20260909-final-evidence-status.tsv` and
`benchmark/results/20260909-final-evidence-manifest.json`.

| Profile | Current result | Evidence |
|---|---|---|
| Transfer w1 | `MEASURED_WITH_FAILURES` | `4,304` successes, `6,796` failures; report emitted |
| Transfer w2 | `MEASURED_WITH_FAILURES` | `4,778` successes, `6,327` failures; report emitted |
| Transfer w4 | `MEASURED_WITH_FAILURES` | `4,658` successes, `6,454` failures; report emitted |
| Functionality | `PASS` | `168/168` transactions across KYC, monetary, supervision, and admin rounds |
| Boundary | `PASS` | `8/8` oracle cases, zero mismatches, zero infrastructure errors |
| Authorization | `PASS` | Expected custodian-mismatch rejection; no infrastructure error |
| Transfer repeat | `MEASURED_WITH_FAILURES` | `2,941` successes, `15,069` failures across five rounds |
| Negative path | `PASS` | `7/7` expected policy rejections |
| Aggregate overspend | `PASS` | `10` commits, `190` expected rejections; final balance Rp40,000 |

The full suite exits `1` because the evidence gate rejects failure-bearing
standard profiles. That exit is expected for the observed peak-load results,
not a setup or reporting failure. All failure-bearing reports remain in the
manifest instead of being relabeled as PASS.

Transfer diagnostics classify failures as Fabric status 11 or the gateway
message `too many requests for /gateway.Gateway`; no insufficient-balance or
transport failures were observed in these final logs. The boundary rerun's
oracle summary is recorded in
[the boundary log](../../benchmark/results/20260909-final-boundary.log).

## Historical live benchmark evidence (pre-remediation)

The table below is retained as the historical baseline that motivated F1--F3. It is not a result for the remediated workloads and must not be cited as current performance evidence.

| Profile | Process/report | Evidence-gate verdict | Key evidence |
|---|---|---|---|
| Transfer w2 | Exit 1; no report | FAIL | Phantom conflict during setup; Caliper secondary exception |
| Transfer w4 | Exit 1; no report | FAIL | Same failure class as w2 |
| Transfer w1 | Exit 0; report | **INVALID** | Runner says PASS; sustained and peak contain 599 and 5,543 failures |
| Functionality | Exit 0; report | FAIL | 1/4 rounds completed |
| Boundary | Exit 0; report | FAIL | Oracle 5/8, three mismatches, zero infrastructure errors |
| Authorization | Exit 0; report | PASS | Custody oracle confirms the expected unauthorized rejection |
| Transfer repeat | Exit 1; no report | FAIL | Same multi-worker setup failure |
| Negative path | Exit 0; report | PASS | 7/7 expected rejections; zero enforcement gaps/infrastructure errors |
| Aggregate overspend | Exit 0; supplemental report | PASS with diagnostic limitation | Invariant passes; 3 commits/197 rejects; final balance 47,000; connector classifies all rejects as `other` |

The interrupted original suite produced eight status rows. The missing aggregate profile was rerun alone with the original seed `20260725` on a fresh Garuda ledger. Its historical artifacts are:

- `benchmark/results/20260824-review-full-01-recovery2-aggregate-overspend.log`
- `benchmark/results/20260824-review-full-01-recovery2-aggregate-overspend.html`

The earlier `recovery-manifest.json` describes a sandbox Docker-permission setup failure and is not a valid combined suite manifest. No complete nine-profile manifest exists; this is reported as an evidence limitation rather than repaired by hand.

## Refuted and unconfirmed concerns

- **Refuted:** participant creation does not return an empty object; `backend/handlers/handlers.go:293-304` returns the created participant. Retain a regression test, but no fix is warranted.
- **Refuted:** current backend/chaincode participant enums align on `validator`, `observer`, and `pjp`; the remaining issue is loose frontend typing, not an enum contradiction.
- **Unconfirmed:** the earlier monitor-schema concern was not reverified in this review and is excluded from the finding count.
- **Hotspot only:** browser `sessionStorage` token storage is not labeled a vulnerability without a threat model.

## Ordered follow-up roadmap

1. **Use final evidence.** Cite the combined `20260909-final-evidence-manifest.json` and keep measured-with-failures performance results separate from PASS oracles.
2. **Finish F8 hardening.** Migrate the compatibility `bank_pjp` role to explicit validator-bank and PJP roles together with gateway/bootstrap configuration.
3. **Keep HA out of scope unless claimed.** The one-orderer/one-peer topology remains a prototype limitation, not a demonstrated fault-tolerant deployment.

## Completion criteria for the remediation run

- All local test/build/LaTeX gates remain green.
- All nine profiles are represented by fresh reports or an explicit expected-rejection oracle result in the combined status file; the boundary oracle is a separate clean-ledger rerun.
- Functionality is 4/4; boundary is 8/8; authorization, negative, and overspend oracles pass with zero infrastructure errors.
- Performance reports preserve success/failure counts and never label failure-heavy rounds unconditionally PASS.
- A combined manifest binds the exact commit, dirty paths, tool versions, images, configs, scripts, logs, reports, and hashes.

## Final environment state

The host checkout's unrelated dirty and untracked work was preserved. The
disposable Docker-in-Docker runtime used for the final evidence is not a
host-network deployment claim; final artifacts record chaincode
`digital-rupiah` v3.0 sequence 1 and the single-host topology.
