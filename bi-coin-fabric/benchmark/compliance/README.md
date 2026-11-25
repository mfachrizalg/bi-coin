# Revised compliance benchmark

This benchmark evaluates the four-MSP `bi-coin` channel and its three chaincodes with Hyperledger Caliper's Fabric connector. It measures local observed capacity for the captured host and synthetic workload; it does not establish production capacity or institution-wide compliance.

## Capacity and load test ("uji kapasitas dan beban")

RQ2 uses this test on one Caliper worker and one host (ADR 0015).

- **Capacity boundary.** Search every catalogued workload: 10 s probes, then three 30 s confirmation rounds at the highest passing rate.
- **Load curve.** Six levels (25–150% of the confirmed reference, 60 s each) on six representative workloads: where delivered load, verified throughput, and latency depart from offered load.

Terms:
- **Drain:** seconds from the window end to the last commit. A rate passes only if drain ≤ 3 s (orderer BatchTimeout 2 s plus 1 s).
- **Verified throughput:** verified transactions ÷ (window + drain). Writes are TPS; reads are ops/s.
- **Client-bound:** no failures and drain within the cap, but the single client delivered less than the target. A lower bound, not a ledger limit.
- **Fixture pool:** subjects and wallets created once per run and reused across rounds.
- **Shared-key operation:** writes one balance key (for example `supply::*` or `reserve::<bank>`). Such operations commit about one per block and are reported as measured.

## Workloads and correctness

The catalog covers 40 contract methods. 31 are capacity-measured, one workload each. `Initialize`, the nested-only `DebitReserveForConversion` and `CheckPayee`, and the CDD lifecycle methods `SetCddCeilings`, `GetCddCeilings`, `VerifySubject`, `UpdateSubject`, `CloseSubject` and `RevokeLowRisk` receive correctness checks only. Reads report verified operations per second; writes report verified TPS.

The ledger smoke test records an outcome for every `correctness_scenarios` ID. It covers staff role separation, authorization and endorsement boundaries, all restriction reasons, fresh release evidence, end-user read denial, the retail transfer and replay, the CDD Sederhana gates (rejection of a DTTOT-listed or not-low-risk subject, the unverified and verified holdings ceilings, verification, the reset after a data update, terminal closure, and low-risk revocation), transaction limits, conversion and wallet-funding replay and failure atomicity, insufficient reserve and float, holdings limits, redemption replay and supply conservation, receipt and MSP read authorization, and initialization with the nested debit. The monetary, replay, and limit denials compare before/after ledger state. The API checks separately exercise 222 route-role authorization cells, 20 malformed-JSON validation cases, and 38 bodyless action outcomes. They use fresh subject/staff fixtures; an expected denial passes only when a follow-up ledger read confirms that state did not change. Backend validation, authorization, and action checks are excluded from performance measurements.

`correctness.json` lists the observed outcomes. It allows an overall conformance claim only when every catalogued executable correctness scenario passes and every API authorization, validation, and action check is resolved and correct. The method-level `cases` inventory remains a coverage reference and is never counted as executed test evidence.

## Capacity search

Each of the 31 workloads first runs one Caliper transaction as a readiness check. Caliper round initialization establishes the connection. There is no separate timed warmup.

Search spans 0.1–4096 operations per second. Matching historical direct-ledger results provide starting hints for 12 workloads; all other workloads start at 32. The old rates are hints only and are never merged into new measurements. An unbounded passing or failing rate expands by a factor of four. Once a passing and failing rate bracket exists, 10-second midpoint probes continue until the failing rate is within 10% of the passing rate.

The highest passing probe is confirmed with three separate 30-second Caliper rounds grouped in one benchmark configuration. Every confirmation must have verified outcomes, zero unexpected failures, zero timeouts, zero unresolved results, delivered load within 5% of target (allowing one-request rounding), and drain-adjusted verified throughput at least 90% of delivered load. If all confirmation rounds fail, the candidate is lowered and confirmed again. Mixed outcomes at the same candidate are reported as an unstable boundary. A passing ceiling is reported as “at least this measured capacity.”

The confirmation windows total 46.5 minutes (31 workloads × 3 × 30 seconds), excluding readiness checks, search probes, initialization, fixtures, and drain. Runtime depends on fixture preparation.

## Evidence and checkpoints

The orchestrator saves a checkpoint after fixture batches and completed probes in `progress.json`. Each workload retains its preflight, tested rates, search bounds, confirmation rounds, Caliper configuration and log, transaction IDs, diagnostics, validation codes, and resource samples.

Per round, results report offered load, verified achieved TPS or query rate, correctness counts, backlog, late completions, and latency median/p95/maximum/sample count. Component CPU and memory mean/peak values and network/disk I/O deltas are derived from one-second Docker samples. Failure causes are labeled as confirmed only when the Caliper/Gateway/peer diagnostic supports that classification; other causes remain hypotheses.

## Run and resume

Run only inside the disposable Docker-in-Docker environment described in [`../isolated/README.md`](../isolated/README.md). The runner refuses a host Docker daemon and captures the current source before network setup.

```sh
export BENCHMARK_COMPLIANCE_STAMP=run-20261012-01
bash scripts/run-compliance-benchmark.sh new        # correctness + one Caliper readiness round per workload
bash scripts/run-compliance-benchmark.sh performance # binary search + confirmation
```

Use a new unique stamp for each fresh run. Use the same stamp with `resume` after interruption; resume verifies that the source snapshot and protocol match. `preflight` runs any missing one-transaction readiness checks without starting the capacity search. `all` runs setup, preflight, search, and confirmation in one command.

The orchestrator resets only the disposable study volumes for a new stamp. Stopped-run volumes are retained; never use `docker compose down -v` to clear a benchmark project. The host workload is one worker on one machine with short confirmation windows. Worker comparisons, distributed deployment, production latency, live sanctions feeds, transaction monitoring, and PPATK submission are future work.
