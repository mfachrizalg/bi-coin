# Disposable replacement benchmarks

This environment runs its own Docker daemon. The runner shares that daemon's network namespace so the existing localhost endpoints work. No host Docker socket or host ports are exposed. Bind only a disposable source copy as `BENCHMARK_WORKSPACE`; never bind the active checkout or its crypto/ledger directories.

The source tree and transaction amount are frozen at study creation. Resumed attempts receive new directories; previous attempt evidence is retained. The validator rejects mixed windows, mismatched trace/log counts, malformed traces, missing telemetry, and incomplete repetition groups.

## Preparation

1. Copy the project to a disposable workspace, excluding `node_modules`, benchmark results, network organizations/channel artifacts, private environment files, and generated archives. Install dependencies there with `npm ci`.
2. Set `BENCHMARK_WORKSPACE` to that copy and `FABRIC_SAMPLES` to a separate Fabric **2.5.16** tools/config bundle. Verify the release checksum. The runner needs the supplied glibc compatibility package for those binaries. Set `BENCHMARK_IMAGE_BUNDLE` to a read-only tar made with `docker save` from the exact local Fabric 2.5, Fabric CA 1.5.9, CouchDB 3.3, and PostgreSQL 16 images. The compliance runner imports that tar only into the verified disposable daemon.
3. Start this Compose file under a new, explicit project name. Copy the exact local Fabric 2.5 and monitoring images into the disposable daemon. Verify that its daemon ID differs from the host's and that neither service mounts the host socket.
4. In the runner, set `BENCHMARK_DISPOSABLE_DAEMON_ID` to that verified ID, `BENCHMARK_SOURCE_COMMIT` to the source copy's base commit, and a unique `BENCHMARK_REPLACEMENT_STAMP`. Run `bash scripts/run-benchmark-replacements.sh`.
5. Preserve and validate the resulting study directories before removing only this disposable Compose project's containers and volumes. Keep historical results intact.

The revised compliance study uses the current 31-workload catalog. After the disposable workspace contains the current `bi-coin-fabric/` source, use one stamp for both commands:

```sh
export BENCHMARK_COMPLIANCE_STAMP=run-20261012-01
bash scripts/run-compliance-benchmark.sh new
bash scripts/run-compliance-benchmark.sh performance
```

The compliance runner checks the disposable daemon ID before any network reset. `new` captures source, checks correctness, and runs one Caliper readiness transaction for each workload; `performance` starts the binary search and grouped confirmations. Reuse the same stamp with `resume` after interruption; the runner verifies the source and protocol hashes and retains completed results. A new stamp resets only its own `rupiah-study` volumes inside its disposable daemon. Never remove the superseded run's containers or volumes when preparing a new study.

## Predeclared replacement matrix

| Amount | Operation / contention | Phase, load and duration | Runs |
|---|---|---|---:|
| Rp1,000 | Distribution / low | Scenario pilot, 60 TPS, 30 s | 1 |
| Rp1,000 | Retail transfer / low | 2-worker calibration, 30/40/50 TPS, 60 s | 15 |
| Rp1,000 | Redemption / low | 1 worker, 20 TPS, 120 s | 5 |
| Rp1,000 | Distribution / low | 1 worker, 75 TPS, 120 s | 5 |
| Rp100 | Retail transfer / low and high | Paired 1-worker conditions, 20/75/150 TPS, 120 s | 30 |

All primary/calibration conditions have five repetitions. These **56 runs** are a bounded validation/replacement study, not a full replication of the earlier 380-run study. Both Rp100 contention conditions use the same amount. Production wallet policies stay enabled. Rp100 is a controlled synthetic amount, not a claim about typical Indonesian payments.

The Rp1,000 and Rp100 runs use different study stamps and must not be pooled. Record the nested environment and actual runtime versions; do not silently merge fresh measurements into old repetition groups. Full worker reselection requires a complete same-environment calibration across 1/2/4/8 workers, beyond this targeted matrix.

For one condition, use:

```sh
bash scripts/run-benchmark-study.sh cell <operation> <low|high> <pilot|scenario-pilot|calibration|primary> <workers> <tps> [seconds]
```

The `cell` command runs one pilot repetition or five calibration/primary repetitions. `BENCHMARK_OPERATION_AMOUNT` defaults to 1000. A study stamp cannot be resumed with a different amount or source snapshot. High-contention configurations that exceed the STANDARD sender's declared daily budget are rejected before the network is reset.
