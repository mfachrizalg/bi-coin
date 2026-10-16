# Four-organization compliance benchmark guide

This guide covers the benchmark commands for the four-organization `rupiah-study` network. The channel joins CentralBankMSP (Bank Indonesia), DistributorMSP (banks and PJPs), ValidatorMSP (OJK and PPATK observers), and EndUserMSP (retail, merchant, and business end users), and runs the chaincodes `rupiah-controls`, `rupiah-monetary`, and `rupiah-payments`. Network files are in `network/study/` and the chaincode is in `study/chaincode/`.

The protocol, workload catalog, capacity search, and evidence rules are in [`compliance/README.md`](compliance/README.md). Every run needs the disposable Docker daemon described in [`isolated/README.md`](isolated/README.md). A result is local observed capacity for one worker on one host, not production capacity.

All commands run from `bi-coin-fabric/`.

## Commands

| Command | What it does |
|---|---|
| `npm run test:benchmarks` | Runs the Node unit tests for `benchmark/workloads/`, `benchmark/observers/`, `benchmark/compliance/`, and `scripts/`. |
| `npm run benchmark:compliance -- <mode>` | Runs `bash scripts/run-compliance-benchmark.sh <mode>`. The modes are `new`, `resume`, `correctness`, `preflight`, `performance`, and `all`. |
| `npm run benchmark:manifest -- <result-directory>` | Writes `manifest.json` with runtime versions, source revision, and a SHA-256 hash of every artifact. The compliance runner already calls it. By hand, run it only from the same unchanged workspace: it refuses a source tree that differs from the captured `source/` snapshot. |
| `npm run benchmark:metrics:up`, `npm run benchmark:metrics:down` | Start and stop the Prometheus, cAdvisor, and node-exporter stack in `benchmark/monitoring/`. The compliance runner does not use it; its resource samples come from one-second `docker stats` readings. |
| `npm run benchmark:analyze`, `npm run benchmark:validate`, `npm run benchmark:compress` | Tools for per-run result directories. They do not apply to compliance results; see [Per-run tools](#per-run-tools). |

## Run a compliance benchmark

Run only inside the disposable Docker-in-Docker environment. The wrapper script refuses a Docker daemon whose ID differs from `BENCHMARK_DISPOSABLE_DAEMON_ID`, and the runner refuses to run outside a `/workspace` copy that has no `.git` directory.

```sh
export BENCHMARK_DISPOSABLE_DAEMON_ID=<ID of the verified disposable daemon>
export BENCHMARK_SOURCE_COMMIT=<base commit of the source copy>
export BENCHMARK_COMPLIANCE_STAMP=<new unique stamp>
npm run benchmark:compliance -- new
npm run benchmark:compliance -- performance
```

`new` captures the source, resets the disposable study network, deploys the three chaincodes, runs the correctness checks, and runs one readiness transaction for each workload. `performance` runs the capacity search and the confirmation rounds. After an interruption, run `resume` with the same stamp. A stamp is 1 to 64 letters, digits, `_`, or `-`, and starts with a letter or digit.

The manifest records the source revision only when `BENCHMARK_SOURCE_COMMIT` is set. Also set `BENCHMARK_SOURCE_DIRTY=true` when the source copy has uncommitted changes.

## Result directory

Each run writes `benchmark/results/compliance-<stamp>/` inside the disposable workspace.

| File | Content |
|---|---|
| `metadata.json` | Stamp, channel, MSPs, chaincodes, and protocol hash. |
| `source/` | Source snapshot captured before network setup. |
| `correctness.json` | Correctness outcomes. `overall_conformance_claim_allowed` is true only when every catalogued correctness scenario passes and every API check is resolved and correct. |
| `preflight.json`, `capacity.json` | Readiness checks, and capacity search and confirmation results. `resume` continues from these two files. |
| `progress.json` | Latest checkpoint: phase, workload, current rate, and elapsed time. |
| `summary.json`, `REPORT.md` | Written by `benchmark/compliance/write-report.js`. |
| `manifest.json` | Written by `scripts/write-study-manifest.js`. |

Before citing a result, check that `study.msps` in `manifest.json` lists the four MSPs and `study.chaincodes` lists the three chaincodes. The evidence checkpoint in [`../AGENTS.md`](../AGENTS.md) describes the existing runs and their limits.

## Per-run tools

`benchmark:analyze` and `benchmark:compress` read per-run entries in `metadata.json` (`traceFiles`, `reportFile`, `logFile`, `metricsFile`, `runDirectory`). `benchmark:validate` reads the `runs` array of the `summary.json` that `benchmark:analyze` writes. The compliance runner records only phase entries (`phase`, `completed_at`, `artifact`) in `metadata.json`, and its `summary.json` has no `runs` array. On a compliance result directory:

- `benchmark:analyze` rewrites `summary.json` and `REPORT.md` from zero runs, which replaces the compliance report with an empty one.
- `benchmark:validate` reports `valid` for zero runs, which is not evidence.
- `benchmark:compress` fails because the entries have no `runDirectory`.

Run these tools only on a directory whose `metadata.json` carries per-run entries.

## Superseded evidence

The dated Caliper logs, `statistical-*`, `statistical-review-replacements-*`, and `e2e-*` files in `benchmark/results/` were produced before the four-organization network. [ADR 0008](../docs/adr/0008-compliance-study-evaluation-protocol.md) keeps them separate; do not cite them as four-organization results. The `20260909-final-*` files are reproducibility evidence for that earlier run only. The scripts of that pipeline were removed in commit 9769cf2; they remain at `9769cf2^`.
