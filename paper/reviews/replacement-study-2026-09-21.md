# Replacement benchmark study — 2026-09-21

## Decision implemented

The contaminated Rp1,000 high-contention retail-transfer window was replaced with a fixed-amount paired study at **Rp100 per transfer**. Rp100 is a controlled synthetic amount: it keeps the workload below the Rp10,000,000 STANDARD-wallet daily cap while preserving the low-contention/high-contention comparison. It is not a claim about a typical retail payment amount.

## Evidence

- Rp1,000 replacement study: [`statistical-review-replacements-20260920T173457Z-rp1000`](../../bi-coin-fabric/benchmark/results/statistical-review-replacements-20260920T173457Z-rp1000/)
- Rp100 paired study: [`statistical-review-replacements-20260920T173457Z-rp100`](../../bi-coin-fabric/benchmark/results/statistical-review-replacements-20260920T173457Z-rp100/)
- Each directory contains `metadata.json`, raw transaction traces, compressed Prometheus traces, Caliper reports/logs, `summary.json`, `validation.json`, `manifest.json`, and a source snapshot.

Both studies passed artifact validation:

| Study | Runs | Repetitions | Validation |
| --- | ---: | --- | --- |
| Rp1,000 | 26 | distribution pilot 1; calibration 3×5; redemption 5; distribution 5 | `valid: true` |
| Rp100 | 30 | low/high contention × 20/75/150 TPS × 5 | `valid: true` |

The runs used a disposable Docker-in-Docker daemon (`2b78d110-1d60-44e2-8000-3e417d8eb5c0`) with no host Docker socket mounted. The manifests record Node v22.23.2, npm 10.9.8, Docker client 29.5.3, Docker Engine 29.8.1, Go 1.26.8, Caliper 0.6.0, and source base `d959f8252efde79405c5e1bb6a8793250cba5c96`.

## Raw-derived results

Values below are medians across the five primary repetitions. Failure counts are summed across those repetitions.

### Rp1,000 replacements

| Scenario | Offered TPS | Achieved TPS | Success rate | p95 (s) | Failure evidence |
| --- | ---: | ---: | ---: | ---: | --- |
| Retail transfer, calibration 30 TPS | 30.03 | 30.03 | 100% | 0.477 | none |
| Retail transfer, calibration 40 TPS | 40.03 | 39.10 | 97.67% | 1.981 | 246 MVCC read conflicts |
| Retail transfer, calibration 50 TPS | 50.03 | 37.05 | 74.05% | 2.815 | 3,940 MVCC read conflicts |
| Redemption, 20 TPS | 20.01 | 20.01 | 100% | 0.569 | none |
| Distribution, 75 TPS | 75.00 | 4.11 | 5.48% | 0.523 | 42,530 MVCC read conflicts |

The 30-second distribution scenario pilot is retained in the artifact set but is not used as a sustainability verdict.

### Rp100 paired contention study

| Contention | Target | Achieved TPS | Success rate | p95 (s) | Failure evidence |
| --- | ---: | ---: | ---: | ---: | --- |
| Low | 20 TPS | 20.01 | 100% | 0.631 | none |
| High | 20 TPS | 2.01 | 10.04% | 0.592 | 10,802 MVCC read conflicts |
| Low | 75 TPS | 8.88 | 11.85% | 7.772 | 37,318 MVCC conflicts; 2,295 gateway-concurrency failures |
| High | 75 TPS | 4.82 | 6.42% | 0.455 | 42,112 MVCC read conflicts |
| Low | 150 TPS | 5.57 | 4.29% | 10.168 | 31,604 MVCC conflicts; 43,479 gateway-concurrency failures |
| High | 150 TPS | 0.99 | 1.00% | 4.620 | 57,656 MVCC conflicts; 1,501 gateway-concurrency failures |

## Interpretation

1. The Rp100 runs remove the Rp10 million funding-cap confounder. The observed failures are dominated by MVCC conflicts and gateway concurrency limits, not insufficient balance.
2. Shared-key contention is visible even at 20 TPS: the high-contention case reaches only 10.04% success while the paired low-contention case reaches 100%.
3. Higher offered rates overload the prototype in both contention modes. These rows are stress results, not sustainable-throughput claims.
4. The replacement evidence does not by itself justify changing the paper or thesis wording; the manuscript still needs an explicit decision about which rows to present and how to label the synthetic Rp100 amount.

## Reproducibility note

One high-contention 150 TPS deployment attempt failed before measurement because Fabric chaincode commit endorsements produced a proposal-response-payload mismatch. The failed directory is preserved as `runs/primary-retail-transfer-high-1w-150tps-r4.IPaF1J`; the same repetition was rerun with a fresh network and is represented by the successful `runs/primary-retail-transfer-high-1w-150tps-r4.dvB4j4` entry in `metadata.json`. The final study validation points to the successful run.

The manuscript sources were not edited in this execution. This report and the benchmark implementation/evidence are the completed plan outputs; integration into `paper/` and `thesis/` remains a separate editorial change.
