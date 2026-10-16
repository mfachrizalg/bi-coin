# Compliance benchmark attempt ledger

Failed and inconclusive runs are not capacity evidence. This ledger retains the outcomes observed during implementation.

| Run | Outcome | Evidence |
|---|---|---|
| `run-20261012-01` | No capacity probes. | Caliper 0.6 rejected network schema `1.0.0` in all 31 preflights. Three fixture setups also returned HTTP 500. |
| `run-20261012-02` | No capacity probes. | Ledger smoke passed 17/17. API authorization and malformed-request checks passed 207/207 and 27/27, but six bodyless API actions returned HTTP 500. Preflight passed 28/31; transfer-retail, transfer-merchant, and fund-reserve fixture setup hit `MVCC_READ_CONFLICT` on shared key `reserve::pjp-demo`. |
| `run-20261012-03` | Stopped before preflight. | The initialization-state assertion queried treasury before initializing monetary state. |
| `run-20261012-04` | Stopped before preflight. | The initialization-state assertion queried reserve state before `pjp-demo` existed. |
| `run-20261012-05` | Inconclusive; no accepted boundary or confirmation. | Correctness passed 20/20; API authorization 207/207, validation 27/27, and action outcomes 15/15. Preflight passed 31/31. The first `create-pending` probe targeted 64 operations/s and delivered 641 (64.1/s); all 641 verified with zero failures, timeouts, or unresolved results. At cutoff, backlog and late completions were 41; drain was 2.233 seconds and drain-adjusted verified throughput was 52.399/s. Resource sampling was incomplete with five samples, five sample errors, and no Caliper-client component. The run stopped during fixture preparation after this probe. |
| `run-20261012-06` | No accepted capacity result. | Correctness passed 20/20; preflight passed 31/31. The streaming resource sampler produced complete one-second windows. `create-pending` probes narrowed to 1/s passing and 1.75/s failing, but confirmation aborted before rounds with `ReferenceError: execute is not defined`; the runner was stopped during a follow-up probe. |
| `run-20261012-07` | Stopped before correctness and preflight. | `study-network-up.sh` failed during peer channel setup with a TLS connection reset at `localhost:17051` while the peers had been up for about 21 seconds. The partial network logs remain in the persistent workspace. |
| `run-20261012-06` | Stopped before confirmation completed. | Correctness passed 20/20; preflight passed 31/31. All 16 `create-pending` probes recorded complete resource windows with no sample errors. Search narrowed to 1/s passing and 1.75/s failing when the first confirmation failed before creating rounds with `ReferenceError: execute is not defined`. The runner resumed search and was stopped at 1.375/s; no capacity claim is accepted. |

## Raw artifact retention

The original Oct 10 archive and runs 01–05 were under `/tmp`. Temporary-directory cleanup removed those workspaces; a search under `/home/mfachrizalg` found no full copies. The Oct 10 Docker volumes remain: `bi-coin-compliance-20261010_daemon-data`, `bi-coin-compliance-20261010_go-cache`, and `bi-coin-compliance-20261010_go-build-cache`. This file reconstructs observed outcomes; it does not replace the missing raw archives.
