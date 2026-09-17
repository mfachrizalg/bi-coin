# Benchmark Statistical Report

## 1. Offered TPS vs Achieved TPS

Offered TPS is submitted transactions divided by the measured duration. Achieved TPS is successful completions divided by the same duration.

| Scenario | Target TPS | Repetitions | Offered TPS mean±SD | Achieved TPS mean±SD | Success mean±SD | Sustainable |
| --- | --- | --- | --- | --- | --- | --- |
| retail-transfer/retail-transfer/low | 5 | 1 | 0.0000 ± 0.0000 | 0.0000 ± 0.0000 | 0.0000% ± 0.0000% | NO |
| retail-transfer/retail-transfer/low | 10 | 1 | 0.0000 ± 0.0000 | 0.0000 ± 0.0000 | 0.0000% ± 0.0000% | NO |
| retail-transfer/retail-transfer/low | 20 | 1 | 0.0000 ± 0.0000 | 0.0000 ± 0.0000 | 0.0000% ± 0.0000% | NO |
| retail-transfer/retail-transfer/low | 40 | 1 | 0.0000 ± 0.0000 | 0.0000 ± 0.0000 | 0.0000% ± 0.0000% | NO |
| retail-transfer/retail-transfer/low | 60 | 1 | 0.0000 ± 0.0000 | 0.0000 ± 0.0000 | 0.0000% ± 0.0000% | NO |
| retail-transfer/retail-transfer/low | 80 | 1 | 0.0000 ± 0.0000 | 0.0000 ± 0.0000 | 0.0000% ± 0.0000% | NO |
| retail-transfer/retail-transfer/low | 100 | 1 | 0.0000 ± 0.0000 | 0.0000 ± 0.0000 | 0.0000% ± 0.0000% | NO |
| retail-transfer/retail-transfer/low | 150 | 1 | 0.0000 ± 0.0000 | 0.0000 ± 0.0000 | 0.0000% ± 0.0000% | NO |

## 2. Transaction Completion Counts

| Scenario | Submitted | Successful | Failed | Timed out | Success rate |
| --- | --- | --- | --- | --- | --- |
| retail-transfer/retail-transfer/low | 0 | 0 | 0 | 0 | 0.0000% |
| retail-transfer/retail-transfer/low | 0 | 0 | 0 | 0 | 0.0000% |
| retail-transfer/retail-transfer/low | 0 | 0 | 0 | 0 | 0.0000% |
| retail-transfer/retail-transfer/low | 0 | 0 | 0 | 0 | 0.0000% |
| retail-transfer/retail-transfer/low | 0 | 0 | 0 | 0 | 0.0000% |
| retail-transfer/retail-transfer/low | 0 | 0 | 0 | 0 | 0.0000% |
| retail-transfer/retail-transfer/low | 0 | 0 | 0 | 0 | 0.0000% |
| retail-transfer/retail-transfer/low | 0 | 0 | 0 | 0 | 0.0000% |

## 3. Failure Reasons

_No rows._

## 4. Latency Measurements

Latency is Caliper-observed Fabric end-to-final-status latency (time_final - time_create) for successful completions. Percentiles use Type-7 interpolation; latency SD is the population SD within each run.

| Scenario | Mean (s) | p50 (s) | p95 (s) | p99 (s) | SD (s) | Min (s) | Max (s) |
| --- | --- | --- | --- | --- | --- | --- | --- |
| retail-transfer/retail-transfer/low | 0.0000 | 0.0000 | 0.0000 | 0.0000 | 0.0000 | 0.0000 | 0.0000 |
| retail-transfer/retail-transfer/low | 0.0000 | 0.0000 | 0.0000 | 0.0000 | 0.0000 | 0.0000 | 0.0000 |
| retail-transfer/retail-transfer/low | 0.0000 | 0.0000 | 0.0000 | 0.0000 | 0.0000 | 0.0000 | 0.0000 |
| retail-transfer/retail-transfer/low | 0.0000 | 0.0000 | 0.0000 | 0.0000 | 0.0000 | 0.0000 | 0.0000 |
| retail-transfer/retail-transfer/low | 0.0000 | 0.0000 | 0.0000 | 0.0000 | 0.0000 | 0.0000 | 0.0000 |
| retail-transfer/retail-transfer/low | 0.0000 | 0.0000 | 0.0000 | 0.0000 | 0.0000 | 0.0000 | 0.0000 |
| retail-transfer/retail-transfer/low | 0.0000 | 0.0000 | 0.0000 | 0.0000 | 0.0000 | 0.0000 | 0.0000 |
| retail-transfer/retail-transfer/low | 0.0000 | 0.0000 | 0.0000 | 0.0000 | 0.0000 | 0.0000 | 0.0000 |

## 5. Saturation Point

The sustainable gate is at least 99% successful completions and p95 latency at most 2.5 seconds in all five repetitions. The highest load passing that gate is the maximum sustainable offered load; its successful throughput is reported separately as Achieved TPS.

## 6. Resource Metrics

Resource rows are emitted from the synchronized Prometheus capture. Missing telemetry is invalid evidence, not zero usage.

_No rows._

## 7. Results by Transaction Type

Each row is isolated: Issuance, Distribution, Retail Transfer, Merchant Payment, Redemption, Balance Query, and Wallet Status Change. Freeze and Unfreeze are preserved as separate operations.

## 8. Repetition and Uncertainty

Every confirmatory scenario is repeated five times. Tables report the mean and sample standard deviation across repetitions. Raw traces and Prometheus responses remain beside this report for reanalysis.

## Measurement Boundary

The primary benchmark measures direct Fabric traffic. Backend API, PostgreSQL, and KYC are evaluated separately by the end-to-end demonstration and are not mixed into these Fabric latency or throughput values.
