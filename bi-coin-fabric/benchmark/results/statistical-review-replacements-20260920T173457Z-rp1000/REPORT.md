# Benchmark Statistical Report

## 1. Offered TPS vs Achieved TPS

Offered TPS is submitted transactions divided by the measured duration. Achieved TPS is successful completions divided by the same duration.

| Scenario | Target TPS | Repetitions | Offered TPS mean±SD | Achieved TPS mean±SD | Success mean±SD | Sustainable |
| --- | --- | --- | --- | --- | --- | --- |
| scenario-pilot/distribution/distribution/low | 60 | 1 | 60.0333 ± 0.0000 | 5.7333 ± 0.0000 | 9.5502% ± 0.0000% | NO |
| primary/distribution/distribution/low | 75 | 5 | 75.0000 ± 0.0102 | 4.1167 ± 0.0517 | 5.4889% ± 0.0686% | NO |
| primary/redemption/redemption/low | 20 | 5 | 20.0083 ± 0.0000 | 20.0083 ± 0.0000 | 100.0000% ± 0.0000% | YES |
| calibration/retail-transfer/retail-transfer/low | 30 | 5 | 30.0333 ± 0.0000 | 30.0333 ± 0.0000 | 100.0000% ± 0.0000% | YES |
| calibration/retail-transfer/retail-transfer/low | 40 | 5 | 40.0333 ± 0.0000 | 39.2133 ± 0.8471 | 97.9517% ± 2.1160% | NO |
| calibration/retail-transfer/retail-transfer/low | 50 | 5 | 50.0333 ± 0.0000 | 36.9000 ± 1.3984 | 73.7508% ± 2.7949% | NO |

## 2. Transaction Completion Counts

    | Scenario | Submitted | Successful | Failed | Timed out | Success rate |
| --- | --- | --- | --- | --- | --- |
| scenario-pilot/distribution/distribution/low | 1801 | 172 | 1629 | 0 | 9.5502% |
| primary/distribution/distribution/low | 45000 | 2470 | 42530 | 0 | 5.4889% |
| primary/redemption/redemption/low | 12005 | 12005 | 0 | 0 | 100.0000% |
| calibration/retail-transfer/retail-transfer/low | 9010 | 9010 | 0 | 0 | 100.0000% |
| calibration/retail-transfer/retail-transfer/low | 12010 | 11764 | 246 | 0 | 97.9517% |
| calibration/retail-transfer/retail-transfer/low | 15010 | 11070 | 3940 | 0 | 73.7508% |

## 3. Failure Reasons

| phase | transactionFamily | operation | contention | category | count |
| --- | --- | --- | --- | --- | --- |
| scenario-pilot | distribution | distribution | low | MVCC read conflict | 1629 |
| primary | distribution | distribution | low | MVCC read conflict | 42530 |
| calibration | retail-transfer | retail-transfer | low | MVCC read conflict | 4186 |

## 4. Latency Measurements

Latency is Caliper-observed Fabric end-to-final-status latency (time_final - time_create) for successful completions. Percentiles use Type-7 interpolation; latency SD is the population SD within each run.

| Scenario | Mean (s) | p50 (s) | p95 (s) | p99 (s) | SD (s) | Min (s) | Max (s) |
| --- | --- | --- | --- | --- | --- | --- | --- |
| scenario-pilot/distribution/distribution/low | 0.2173 | 0.2070 | 0.3219 | 0.3826 | 0.0523 | 0.1380 | 0.4810 |
| primary/distribution/distribution/low | 0.2984 | 0.2686 | 0.5197 | 0.6742 | 0.1145 | 0.1194 | 0.9258 |
| primary/redemption/redemption/low | 0.3472 | 0.3486 | 0.5688 | 0.6192 | 0.1517 | 0.0754 | 2.1564 |
| calibration/retail-transfer/retail-transfer/low | 0.3094 | 0.3042 | 0.4730 | 0.5977 | 0.1269 | 0.1014 | 2.2156 |
| calibration/retail-transfer/retail-transfer/low | 0.6603 | 0.4927 | 1.6999 | 2.1878 | 0.4828 | 0.1012 | 2.7340 |
| calibration/retail-transfer/retail-transfer/low | 1.8933 | 1.9255 | 3.1397 | 3.5170 | 0.7866 | 0.1676 | 3.8330 |

## 5. Saturation Point

The sustainable gate is at least 99% successful completions and p95 latency at most 2.5 seconds in all five repetitions. The highest load passing that gate is the maximum sustainable offered load; its successful throughput is reported separately as Achieved TPS.

## 6. Resource Metrics

Resource rows are emitted from the synchronized Prometheus capture. Missing telemetry is invalid evidence, not zero usage.

| phase | scenarioId | component | metric | unit | mean | max | p95 |
| --- | --- | --- | --- | --- | --- | --- | --- |
| scenario-pilot | distribution-low | node-exporter:9100 | host_cpu_busy_percent | % | 48.035685025827355 | 81.93965517241003 | 80.89051724137569 |
| scenario-pilot | distribution-low | node-exporter:9100 | host_memory_used_bytes | bytes | 5783101030.4 | 5890437120 | 5888610508.8 |
| scenario-pilot | distribution-low | node-exporter:9100 | host_read_iops | operations_per_second | 15.00194384236453 | 64.37931034482759 | 62.43448275862068 |
| scenario-pilot | distribution-low | node-exporter:9100 | host_write_iops | operations_per_second | 956.141997590312 | 3728.344827586207 | 3513.6155172413787 |
| scenario-pilot | distribution-low | node-exporter:9100 | host_read_await_ms | milliseconds_per_operation | 0.28853533706685147 | 1.5104895104895677 | 1.3378524743230766 |
| scenario-pilot | distribution-low | node-exporter:9100 | host_write_await_ms | milliseconds_per_operation | 1.1004351027878438 | 2.9364986322779667 | 2.73863627634728 |
| scenario-pilot | distribution-low | /peer0.himbara.paynet | caliper_client_cpu_avg | percent | 0.16 | 0.16 |  |
| scenario-pilot | distribution-low | /peer0.himbara.paynet | caliper_client_cpu_max | percent | 0.2375 | 0.2375 |  |
| scenario-pilot | distribution-low | /peer0.himbara.paynet | caliper_client_memory_avg | bytes | 130 | 130 |  |
| scenario-pilot | distribution-low | /peer0.himbara.paynet | caliper_client_memory_max | bytes | 141 | 141 |  |
| scenario-pilot | distribution-low | /peer0.pjp.paynet | caliper_client_cpu_avg | percent | 0.1575 | 0.1575 |  |
| scenario-pilot | distribution-low | /peer0.pjp.paynet | caliper_client_cpu_max | percent | 0.2375 | 0.2375 |  |
| scenario-pilot | distribution-low | /peer0.pjp.paynet | caliper_client_memory_avg | bytes | 116 | 116 |  |
| scenario-pilot | distribution-low | /peer0.pjp.paynet | caliper_client_memory_max | bytes | 123 | 123 |  |
| scenario-pilot | distribution-low | /peer0.ojk.paynet | caliper_client_cpu_avg | percent | 0.1525 | 0.1525 |  |
| scenario-pilot | distribution-low | /peer0.ojk.paynet | caliper_client_cpu_max | percent | 0.215 | 0.215 |  |
| scenario-pilot | distribution-low | /peer0.ojk.paynet | caliper_client_memory_avg | bytes | 107 | 107 |  |
| scenario-pilot | distribution-low | /peer0.ojk.paynet | caliper_client_memory_max | bytes | 112 | 112 |  |
| scenario-pilot | distribution-low | /peer0.bi.paynet | caliper_client_cpu_avg | percent | 0.6175 | 0.6175 |  |
| scenario-pilot | distribution-low | /peer0.bi.paynet | caliper_client_cpu_max | percent | 0.8925 | 0.8925 |  |
| scenario-pilot | distribution-low | /peer0.bi.paynet | caliper_client_memory_avg | bytes | 117 | 117 |  |
| scenario-pilot | distribution-low | /peer0.bi.paynet | caliper_client_memory_max | bytes | 120 | 120 |  |
| scenario-pilot | distribution-low | /peer0.commercial.paynet | caliper_client_cpu_avg | percent | 0.16 | 0.16 |  |
| scenario-pilot | distribution-low | /peer0.commercial.paynet | caliper_client_cpu_max | percent | 0.2325 | 0.2325 |  |
| scenario-pilot | distribution-low | /peer0.commercial.paynet | caliper_client_memory_avg | bytes | 117 | 117 |  |
| scenario-pilot | distribution-low | /peer0.commercial.paynet | caliper_client_memory_max | bytes | 125 | 125 |  |
| scenario-pilot | distribution-low | /couchdb0.bi.paynet | caliper_client_cpu_avg | percent | 1.37875 | 1.37875 |  |
| scenario-pilot | distribution-low | /couchdb0.bi.paynet | caliper_client_cpu_max | percent | 2.0225 | 2.0225 |  |
| scenario-pilot | distribution-low | /couchdb0.bi.paynet | caliper_client_memory_avg | bytes | 55.7 | 55.7 |  |
| scenario-pilot | distribution-low | /couchdb0.bi.paynet | caliper_client_memory_max | bytes | 57.4 | 57.4 |  |
| scenario-pilot | distribution-low | /couchdb0.ojk.paynet | caliper_client_cpu_avg | percent | 0.7025 | 0.7025 |  |
| scenario-pilot | distribution-low | /couchdb0.ojk.paynet | caliper_client_cpu_max | percent | 1.09125 | 1.09125 |  |
| scenario-pilot | distribution-low | /couchdb0.ojk.paynet | caliper_client_memory_avg | bytes | 57 | 57 |  |
| scenario-pilot | distribution-low | /couchdb0.ojk.paynet | caliper_client_memory_max | bytes | 57.9 | 57.9 |  |
| scenario-pilot | distribution-low | /couchdb0.pjp.paynet | caliper_client_cpu_avg | percent | 0.70875 | 0.70875 |  |
| scenario-pilot | distribution-low | /couchdb0.pjp.paynet | caliper_client_cpu_max | percent | 1.09 | 1.09 |  |
| scenario-pilot | distribution-low | /couchdb0.pjp.paynet | caliper_client_memory_avg | bytes | 55.2 | 55.2 |  |
| scenario-pilot | distribution-low | /couchdb0.pjp.paynet | caliper_client_memory_max | bytes | 57.3 | 57.3 |  |
| scenario-pilot | distribution-low | /orderer.paynet | caliper_client_cpu_avg | percent | 0.10625 | 0.10625 |  |
| scenario-pilot | distribution-low | /orderer.paynet | caliper_client_cpu_max | percent | 0.15625 | 0.15625 |  |
| scenario-pilot | distribution-low | /orderer.paynet | caliper_client_memory_avg | bytes | 55.5 | 55.5 |  |
| scenario-pilot | distribution-low | /orderer.paynet | caliper_client_memory_max | bytes | 74.1 | 74.1 |  |
| scenario-pilot | distribution-low | /couchdb0.himbara.paynet | caliper_client_cpu_avg | percent | 0.70125 | 0.70125 |  |
| scenario-pilot | distribution-low | /couchdb0.himbara.paynet | caliper_client_cpu_max | percent | 1.125 | 1.125 |  |
| scenario-pilot | distribution-low | /couchdb0.himbara.paynet | caliper_client_memory_avg | bytes | 55 | 55 |  |
| scenario-pilot | distribution-low | /couchdb0.himbara.paynet | caliper_client_memory_max | bytes | 56.3 | 56.3 |  |
| scenario-pilot | distribution-low | /couchdb0.commercial.paynet | caliper_client_cpu_avg | percent | 0.71125 | 0.71125 |  |
| scenario-pilot | distribution-low | /couchdb0.commercial.paynet | caliper_client_cpu_max | percent | 1.055 | 1.055 |  |
| scenario-pilot | distribution-low | /couchdb0.commercial.paynet | caliper_client_memory_avg | bytes | 55.6 | 55.6 |  |
| scenario-pilot | distribution-low | /couchdb0.commercial.paynet | caliper_client_memory_max | bytes | 57 | 57 |  |
| scenario-pilot | distribution-low | node caliper(sum) | caliper_client_cpu_avg | percent | 57.91 | 57.91 |  |
| scenario-pilot | distribution-low | node caliper(sum) | caliper_client_cpu_max | percent | 99 | 99 |  |
| primary | distribution-low | node-exporter:9100 | host_cpu_busy_percent | % | 80.89283075663565 | 92.61485134854031 | 92.33391317733928 |
| primary | distribution-low | node-exporter:9100 | host_memory_used_bytes | bytes | 5589184116.77193 | 5702721536 | 5679365120 |
| primary | distribution-low | node-exporter:9100 | host_read_iops | operations_per_second | 0.6222210997114344 | 3.964285714285714 | 3.7241379310344827 |
| primary | distribution-low | node-exporter:9100 | host_write_iops | operations_per_second | 1963.2363481536665 | 5031.6551724137935 | 4920.403504252873 |
| primary | distribution-low | node-exporter:9100 | host_read_await_ms | milliseconds_per_operation | 0.1310778585700989 | 1.0000000000331966 | 0.6666666666887977 |
| primary | distribution-low | node-exporter:9100 | host_write_await_ms | milliseconds_per_operation | 1.436636561447754 | 6.409833538840866 | 4.513698346022328 |
| primary | distribution-low | /peer0.himbara.paynet | caliper_client_cpu_avg | percent | 0.215 | 0.215 |  |
| primary | distribution-low | /peer0.himbara.paynet | caliper_client_cpu_max | percent | 0.27875 | 0.27875 |  |
| primary | distribution-low | /peer0.himbara.paynet | caliper_client_memory_avg | bytes | 113 | 113 |  |
| primary | distribution-low | /peer0.himbara.paynet | caliper_client_memory_max | bytes | 123 | 123 |  |
| primary | distribution-low | /peer0.bi.paynet | caliper_client_cpu_avg | percent | 0.795 | 0.795 |  |
| primary | distribution-low | /peer0.bi.paynet | caliper_client_cpu_max | percent | 0.92125 | 0.92125 |  |
| primary | distribution-low | /peer0.bi.paynet | caliper_client_memory_avg | bytes | 120 | 120 |  |
| primary | distribution-low | /peer0.bi.paynet | caliper_client_memory_max | bytes | 126 | 126 |  |
| primary | distribution-low | /peer0.commercial.paynet | caliper_client_cpu_avg | percent | 0.21125 | 0.21125 |  |
| primary | distribution-low | /peer0.commercial.paynet | caliper_client_cpu_max | percent | 0.27375 | 0.27375 |  |
| primary | distribution-low | /peer0.commercial.paynet | caliper_client_memory_avg | bytes | 113 | 113 |  |
| primary | distribution-low | /peer0.commercial.paynet | caliper_client_memory_max | bytes | 121 | 121 |  |
| primary | distribution-low | /peer0.ojk.paynet | caliper_client_cpu_avg | percent | 0.21375 | 0.21375 |  |
| primary | distribution-low | /peer0.ojk.paynet | caliper_client_cpu_max | percent | 0.275 | 0.275 |  |
| primary | distribution-low | /peer0.ojk.paynet | caliper_client_memory_avg | bytes | 116 | 116 |  |
| primary | distribution-low | /peer0.ojk.paynet | caliper_client_memory_max | bytes | 119 | 119 |  |
| primary | distribution-low | /peer0.pjp.paynet | caliper_client_cpu_avg | percent | 0.21375 | 0.21375 |  |
| primary | distribution-low | /peer0.pjp.paynet | caliper_client_cpu_max | percent | 0.265 | 0.265 |  |
| primary | distribution-low | /peer0.pjp.paynet | caliper_client_memory_avg | bytes | 118 | 118 |  |
| primary | distribution-low | /peer0.pjp.paynet | caliper_client_memory_max | bytes | 123 | 123 |  |
| primary | distribution-low | /couchdb0.himbara.paynet | caliper_client_cpu_avg | percent | 0.96875 | 0.96875 |  |
| primary | distribution-low | /couchdb0.himbara.paynet | caliper_client_cpu_max | percent | 1.47375 | 1.47375 |  |
| primary | distribution-low | /couchdb0.himbara.paynet | caliper_client_memory_avg | bytes | 61.6 | 61.6 |  |
| primary | distribution-low | /couchdb0.himbara.paynet | caliper_client_memory_max | bytes | 77.1 | 77.1 |  |
| primary | distribution-low | /couchdb0.ojk.paynet | caliper_client_cpu_avg | percent | 1 | 1 |  |
| primary | distribution-low | /couchdb0.ojk.paynet | caliper_client_cpu_max | percent | 1.4425 | 1.4425 |  |
| primary | distribution-low | /couchdb0.ojk.paynet | caliper_client_memory_avg | bytes | 60.8 | 60.8 |  |
| primary | distribution-low | /couchdb0.ojk.paynet | caliper_client_memory_max | bytes | 76 | 76 |  |
| primary | distribution-low | /couchdb0.pjp.paynet | caliper_client_cpu_avg | percent | 0.995 | 0.995 |  |
| primary | distribution-low | /couchdb0.pjp.paynet | caliper_client_cpu_max | percent | 1.45125 | 1.45125 |  |
| primary | distribution-low | /couchdb0.pjp.paynet | caliper_client_memory_avg | bytes | 61.7 | 61.7 |  |
| primary | distribution-low | /couchdb0.pjp.paynet | caliper_client_memory_max | bytes | 79.9 | 79.9 |  |
| primary | distribution-low | /couchdb0.bi.paynet | caliper_client_cpu_avg | percent | 2.03875 | 2.03875 |  |
| primary | distribution-low | /couchdb0.bi.paynet | caliper_client_cpu_max | percent | 2.66375 | 2.66375 |  |
| primary | distribution-low | /couchdb0.bi.paynet | caliper_client_memory_avg | bytes | 61.3 | 61.3 |  |
| primary | distribution-low | /couchdb0.bi.paynet | caliper_client_memory_max | bytes | 79 | 79 |  |
| primary | distribution-low | /orderer.paynet | caliper_client_cpu_avg | percent | 0.1875 | 0.1875 |  |
| primary | distribution-low | /orderer.paynet | caliper_client_cpu_max | percent | 0.37 | 0.37 |  |
| primary | distribution-low | /orderer.paynet | caliper_client_memory_avg | bytes | 59.9 | 59.9 |  |
| primary | distribution-low | /orderer.paynet | caliper_client_memory_max | bytes | 78.9 | 78.9 |  |
| primary | distribution-low | /couchdb0.commercial.paynet | caliper_client_cpu_avg | percent | 1.01625 | 1.01625 |  |
| primary | distribution-low | /couchdb0.commercial.paynet | caliper_client_cpu_max | percent | 1.5875 | 1.5875 |  |
| primary | distribution-low | /couchdb0.commercial.paynet | caliper_client_memory_avg | bytes | 62.1 | 62.1 |  |
| primary | distribution-low | /couchdb0.commercial.paynet | caliper_client_memory_max | bytes | 78.8 | 78.8 |  |
| primary | distribution-low | node caliper(sum) | caliper_client_cpu_avg | percent | 77.41 | 77.41 |  |
| primary | distribution-low | node caliper(sum) | caliper_client_cpu_max | percent | 124 | 124 |  |
| primary | distribution-low | node-exporter:9100 | host_cpu_busy_percent | % | 80.3323911565484 | 92.11607142856987 | 91.7724137930976 |
| primary | distribution-low | node-exporter:9100 | host_memory_used_bytes | bytes | 5599883371.789474 | 5734223872 | 5724477644.8 |
| primary | distribution-low | node-exporter:9100 | host_read_iops | operations_per_second | 0.05210502076675336 | 0.3571428571428571 | 0.24137931034482757 |
| primary | distribution-low | node-exporter:9100 | host_write_iops | operations_per_second | 1970.6681154028672 | 5041.448275862069 | 4837.332758620689 |
| primary | distribution-low | node-exporter:9100 | host_read_await_ms | milliseconds_per_operation | 0.35695488721758234 | 9.000000000014552 | 0.2499999999940883 |
| primary | distribution-low | node-exporter:9100 | host_write_await_ms | milliseconds_per_operation | 1.9628734139250128 | 10.865069919667286 | 5.608850171924001 |
| primary | distribution-low | /peer0.ojk.paynet | caliper_client_cpu_avg | percent | 0.215 | 0.215 |  |
| primary | distribution-low | /peer0.ojk.paynet | caliper_client_cpu_max | percent | 0.29875 | 0.29875 |  |
| primary | distribution-low | /peer0.ojk.paynet | caliper_client_memory_avg | bytes | 116 | 116 |  |
| primary | distribution-low | /peer0.ojk.paynet | caliper_client_memory_max | bytes | 120 | 120 |  |
| primary | distribution-low | /peer0.commercial.paynet | caliper_client_cpu_avg | percent | 0.2175 | 0.2175 |  |
| primary | distribution-low | /peer0.commercial.paynet | caliper_client_cpu_max | percent | 0.28 | 0.28 |  |
| primary | distribution-low | /peer0.commercial.paynet | caliper_client_memory_avg | bytes | 113 | 113 |  |
| primary | distribution-low | /peer0.commercial.paynet | caliper_client_memory_max | bytes | 120 | 120 |  |
| primary | distribution-low | /peer0.himbara.paynet | caliper_client_cpu_avg | percent | 0.21375 | 0.21375 |  |
| primary | distribution-low | /peer0.himbara.paynet | caliper_client_cpu_max | percent | 0.28375 | 0.28375 |  |
| primary | distribution-low | /peer0.himbara.paynet | caliper_client_memory_avg | bytes | 117 | 117 |  |
| primary | distribution-low | /peer0.himbara.paynet | caliper_client_memory_max | bytes | 123 | 123 |  |
| primary | distribution-low | /peer0.bi.paynet | caliper_client_cpu_avg | percent | 0.8325 | 0.8325 |  |
| primary | distribution-low | /peer0.bi.paynet | caliper_client_cpu_max | percent | 1.07 | 1.07 |  |
| primary | distribution-low | /peer0.bi.paynet | caliper_client_memory_avg | bytes | 120 | 120 |  |
| primary | distribution-low | /peer0.bi.paynet | caliper_client_memory_max | bytes | 124 | 124 |  |
| primary | distribution-low | /peer0.pjp.paynet | caliper_client_cpu_avg | percent | 0.21875 | 0.21875 |  |
| primary | distribution-low | /peer0.pjp.paynet | caliper_client_cpu_max | percent | 0.345 | 0.345 |  |
| primary | distribution-low | /peer0.pjp.paynet | caliper_client_memory_avg | bytes | 115 | 115 |  |
| primary | distribution-low | /peer0.pjp.paynet | caliper_client_memory_max | bytes | 121 | 121 |  |
| primary | distribution-low | /orderer.paynet | caliper_client_cpu_avg | percent | 0.1875 | 0.1875 |  |
| primary | distribution-low | /orderer.paynet | caliper_client_cpu_max | percent | 0.3325 | 0.3325 |  |
| primary | distribution-low | /orderer.paynet | caliper_client_memory_avg | bytes | 58.8 | 58.8 |  |
| primary | distribution-low | /orderer.paynet | caliper_client_memory_max | bytes | 76 | 76 |  |
| primary | distribution-low | /couchdb0.ojk.paynet | caliper_client_cpu_avg | percent | 1.00125 | 1.00125 |  |
| primary | distribution-low | /couchdb0.ojk.paynet | caliper_client_cpu_max | percent | 1.55125 | 1.55125 |  |
| primary | distribution-low | /couchdb0.ojk.paynet | caliper_client_memory_avg | bytes | 62.9 | 62.9 |  |
| primary | distribution-low | /couchdb0.ojk.paynet | caliper_client_memory_max | bytes | 81.7 | 81.7 |  |
| primary | distribution-low | /couchdb0.pjp.paynet | caliper_client_cpu_avg | percent | 0.975 | 0.975 |  |
| primary | distribution-low | /couchdb0.pjp.paynet | caliper_client_cpu_max | percent | 1.4625 | 1.4625 |  |
| primary | distribution-low | /couchdb0.pjp.paynet | caliper_client_memory_avg | bytes | 64.2 | 64.2 |  |
| primary | distribution-low | /couchdb0.pjp.paynet | caliper_client_memory_max | bytes | 81.5 | 81.5 |  |
| primary | distribution-low | /couchdb0.commercial.paynet | caliper_client_cpu_avg | percent | 0.98 | 0.98 |  |
| primary | distribution-low | /couchdb0.commercial.paynet | caliper_client_cpu_max | percent | 1.64125 | 1.64125 |  |
| primary | distribution-low | /couchdb0.commercial.paynet | caliper_client_memory_avg | bytes | 62.6 | 62.6 |  |
| primary | distribution-low | /couchdb0.commercial.paynet | caliper_client_memory_max | bytes | 81.3 | 81.3 |  |
| primary | distribution-low | /couchdb0.himbara.paynet | caliper_client_cpu_avg | percent | 0.94875 | 0.94875 |  |
| primary | distribution-low | /couchdb0.himbara.paynet | caliper_client_cpu_max | percent | 1.42625 | 1.42625 |  |
| primary | distribution-low | /couchdb0.himbara.paynet | caliper_client_memory_avg | bytes | 62.9 | 62.9 |  |
| primary | distribution-low | /couchdb0.himbara.paynet | caliper_client_memory_max | bytes | 82.2 | 82.2 |  |
| primary | distribution-low | /couchdb0.bi.paynet | caliper_client_cpu_avg | percent | 1.94375 | 1.94375 |  |
| primary | distribution-low | /couchdb0.bi.paynet | caliper_client_cpu_max | percent | 2.5125 | 2.5125 |  |
| primary | distribution-low | /couchdb0.bi.paynet | caliper_client_memory_avg | bytes | 62.7 | 62.7 |  |
| primary | distribution-low | /couchdb0.bi.paynet | caliper_client_memory_max | bytes | 82.5 | 82.5 |  |
| primary | distribution-low | node caliper(sum) | caliper_client_cpu_avg | percent | 78.86 | 78.86 |  |
| primary | distribution-low | node caliper(sum) | caliper_client_cpu_max | percent | 126 | 126 |  |
| primary | distribution-low | node-exporter:9100 | host_cpu_busy_percent | % | 80.49850759062765 | 92.74111607143696 | 92.37650862068378 |
| primary | distribution-low | node-exporter:9100 | host_memory_used_bytes | bytes | 5614406494.315789 | 5760688128 | 5728590233.6 |
| primary | distribution-low | node-exporter:9100 | host_read_iops | operations_per_second | 0.04832840753218554 | 0.21428571428571427 | 0.20689655172413793 |
| primary | distribution-low | node-exporter:9100 | host_write_iops | operations_per_second | 1997.3990678405687 | 4978.413793103448 | 4826.444827586207 |
| primary | distribution-low | node-exporter:9100 | host_read_await_ms | milliseconds_per_operation | 0.22492690058338247 | 2.7499999999918145 | 2.7499999999918145 |
| primary | distribution-low | node-exporter:9100 | host_write_await_ms | milliseconds_per_operation | 1.758511289917074 | 5.422850279320653 | 5.026628579471366 |
| primary | distribution-low | /peer0.pjp.paynet | caliper_client_cpu_avg | percent | 0.21375 | 0.21375 |  |
| primary | distribution-low | /peer0.pjp.paynet | caliper_client_cpu_max | percent | 0.27625 | 0.27625 |  |
| primary | distribution-low | /peer0.pjp.paynet | caliper_client_memory_avg | bytes | 113 | 113 |  |
| primary | distribution-low | /peer0.pjp.paynet | caliper_client_memory_max | bytes | 117 | 117 |  |
| primary | distribution-low | /peer0.bi.paynet | caliper_client_cpu_avg | percent | 0.7725 | 0.7725 |  |
| primary | distribution-low | /peer0.bi.paynet | caliper_client_cpu_max | percent | 0.9425 | 0.9425 |  |
| primary | distribution-low | /peer0.bi.paynet | caliper_client_memory_avg | bytes | 120 | 120 |  |
| primary | distribution-low | /peer0.bi.paynet | caliper_client_memory_max | bytes | 126 | 126 |  |
| primary | distribution-low | /peer0.ojk.paynet | caliper_client_cpu_avg | percent | 0.21 | 0.21 |  |
| primary | distribution-low | /peer0.ojk.paynet | caliper_client_cpu_max | percent | 0.28125 | 0.28125 |  |
| primary | distribution-low | /peer0.ojk.paynet | caliper_client_memory_avg | bytes | 116 | 116 |  |
| primary | distribution-low | /peer0.ojk.paynet | caliper_client_memory_max | bytes | 123 | 123 |  |
| primary | distribution-low | /peer0.himbara.paynet | caliper_client_cpu_avg | percent | 0.21125 | 0.21125 |  |
| primary | distribution-low | /peer0.himbara.paynet | caliper_client_cpu_max | percent | 0.2725 | 0.2725 |  |
| primary | distribution-low | /peer0.himbara.paynet | caliper_client_memory_avg | bytes | 113 | 113 |  |
| primary | distribution-low | /peer0.himbara.paynet | caliper_client_memory_max | bytes | 118 | 118 |  |
| primary | distribution-low | /peer0.commercial.paynet | caliper_client_cpu_avg | percent | 0.21375 | 0.21375 |  |
| primary | distribution-low | /peer0.commercial.paynet | caliper_client_cpu_max | percent | 0.30125 | 0.30125 |  |
| primary | distribution-low | /peer0.commercial.paynet | caliper_client_memory_avg | bytes | 117 | 117 |  |
| primary | distribution-low | /peer0.commercial.paynet | caliper_client_memory_max | bytes | 125 | 125 |  |
| primary | distribution-low | /couchdb0.commercial.paynet | caliper_client_cpu_avg | percent | 0.99875 | 0.99875 |  |
| primary | distribution-low | /couchdb0.commercial.paynet | caliper_client_cpu_max | percent | 1.48875 | 1.48875 |  |
| primary | distribution-low | /couchdb0.commercial.paynet | caliper_client_memory_avg | bytes | 63 | 63 |  |
| primary | distribution-low | /couchdb0.commercial.paynet | caliper_client_memory_max | bytes | 80.5 | 80.5 |  |
| primary | distribution-low | /couchdb0.bi.paynet | caliper_client_cpu_avg | percent | 1.98375 | 1.98375 |  |
| primary | distribution-low | /couchdb0.bi.paynet | caliper_client_cpu_max | percent | 2.71625 | 2.71625 |  |
| primary | distribution-low | /couchdb0.bi.paynet | caliper_client_memory_avg | bytes | 64.3 | 64.3 |  |
| primary | distribution-low | /couchdb0.bi.paynet | caliper_client_memory_max | bytes | 85.9 | 85.9 |  |
| primary | distribution-low | /orderer.paynet | caliper_client_cpu_avg | percent | 0.1875 | 0.1875 |  |
| primary | distribution-low | /orderer.paynet | caliper_client_cpu_max | percent | 0.40375 | 0.40375 |  |
| primary | distribution-low | /orderer.paynet | caliper_client_memory_avg | bytes | 58.8 | 58.8 |  |
| primary | distribution-low | /orderer.paynet | caliper_client_memory_max | bytes | 80.8 | 80.8 |  |
| primary | distribution-low | /couchdb0.ojk.paynet | caliper_client_cpu_avg | percent | 1.0175 | 1.0175 |  |
| primary | distribution-low | /couchdb0.ojk.paynet | caliper_client_cpu_max | percent | 1.64625 | 1.64625 |  |
| primary | distribution-low | /couchdb0.ojk.paynet | caliper_client_memory_avg | bytes | 63.4 | 63.4 |  |
| primary | distribution-low | /couchdb0.ojk.paynet | caliper_client_memory_max | bytes | 83.4 | 83.4 |  |
| primary | distribution-low | /couchdb0.pjp.paynet | caliper_client_cpu_avg | percent | 0.98875 | 0.98875 |  |
| primary | distribution-low | /couchdb0.pjp.paynet | caliper_client_cpu_max | percent | 1.5725 | 1.5725 |  |
| primary | distribution-low | /couchdb0.pjp.paynet | caliper_client_memory_avg | bytes | 63.2 | 63.2 |  |
| primary | distribution-low | /couchdb0.pjp.paynet | caliper_client_memory_max | bytes | 79.5 | 79.5 |  |
| primary | distribution-low | /couchdb0.himbara.paynet | caliper_client_cpu_avg | percent | 0.99 | 0.99 |  |
| primary | distribution-low | /couchdb0.himbara.paynet | caliper_client_cpu_max | percent | 1.655 | 1.655 |  |
| primary | distribution-low | /couchdb0.himbara.paynet | caliper_client_memory_avg | bytes | 63.9 | 63.9 |  |
| primary | distribution-low | /couchdb0.himbara.paynet | caliper_client_memory_max | bytes | 78.5 | 78.5 |  |
| primary | distribution-low | node caliper(sum) | caliper_client_cpu_avg | percent | 77.61 | 77.61 |  |
| primary | distribution-low | node caliper(sum) | caliper_client_cpu_max | percent | 123 | 123 |  |
| primary | distribution-low | node-exporter:9100 | host_cpu_busy_percent | % | 80.64952472422718 | 92.67672413792877 | 92.25625000001102 |
| primary | distribution-low | node-exporter:9100 | host_memory_used_bytes | bytes | 5603635894.857142 | 5767667712 | 5716445593.6 |
| primary | distribution-low | node-exporter:9100 | host_read_iops | operations_per_second | 0.06975845369612341 | 2.413793103448276 | 0.4482758620689655 |
| primary | distribution-low | node-exporter:9100 | host_write_iops | operations_per_second | 2019.064118183492 | 5032.894283152887 | 4923.575862068965 |
| primary | distribution-low | node-exporter:9100 | host_read_await_ms | milliseconds_per_operation | 0.10392592655750867 | 0.9999999999763532 | 0.4999999999881766 |
| primary | distribution-low | node-exporter:9100 | host_write_await_ms | milliseconds_per_operation | 1.422538670419538 | 5.799246513720298 | 4.892670989017677 |
| primary | distribution-low | /peer0.bi.paynet | caliper_client_cpu_avg | percent | 0.79 | 0.79 |  |
| primary | distribution-low | /peer0.bi.paynet | caliper_client_cpu_max | percent | 0.995 | 0.995 |  |
| primary | distribution-low | /peer0.bi.paynet | caliper_client_memory_avg | bytes | 121 | 121 |  |
| primary | distribution-low | /peer0.bi.paynet | caliper_client_memory_max | bytes | 127 | 127 |  |
| primary | distribution-low | /peer0.pjp.paynet | caliper_client_cpu_avg | percent | 0.2175 | 0.2175 |  |
| primary | distribution-low | /peer0.pjp.paynet | caliper_client_cpu_max | percent | 0.29625 | 0.29625 |  |
| primary | distribution-low | /peer0.pjp.paynet | caliper_client_memory_avg | bytes | 116 | 116 |  |
| primary | distribution-low | /peer0.pjp.paynet | caliper_client_memory_max | bytes | 123 | 123 |  |
| primary | distribution-low | /peer0.himbara.paynet | caliper_client_cpu_avg | percent | 0.22 | 0.22 |  |
| primary | distribution-low | /peer0.himbara.paynet | caliper_client_cpu_max | percent | 0.28 | 0.28 |  |
| primary | distribution-low | /peer0.himbara.paynet | caliper_client_memory_avg | bytes | 118 | 118 |  |
| primary | distribution-low | /peer0.himbara.paynet | caliper_client_memory_max | bytes | 122 | 122 |  |
| primary | distribution-low | /peer0.commercial.paynet | caliper_client_cpu_avg | percent | 0.22125 | 0.22125 |  |
| primary | distribution-low | /peer0.commercial.paynet | caliper_client_cpu_max | percent | 0.2675 | 0.2675 |  |
| primary | distribution-low | /peer0.commercial.paynet | caliper_client_memory_avg | bytes | 118 | 118 |  |
| primary | distribution-low | /peer0.commercial.paynet | caliper_client_memory_max | bytes | 124 | 124 |  |
| primary | distribution-low | /peer0.ojk.paynet | caliper_client_cpu_avg | percent | 0.2175 | 0.2175 |  |
| primary | distribution-low | /peer0.ojk.paynet | caliper_client_cpu_max | percent | 0.26 | 0.26 |  |
| primary | distribution-low | /peer0.ojk.paynet | caliper_client_memory_avg | bytes | 115 | 115 |  |
| primary | distribution-low | /peer0.ojk.paynet | caliper_client_memory_max | bytes | 120 | 120 |  |
| primary | distribution-low | /couchdb0.bi.paynet | caliper_client_cpu_avg | percent | 2.0225 | 2.0225 |  |
| primary | distribution-low | /couchdb0.bi.paynet | caliper_client_cpu_max | percent | 2.8725 | 2.8725 |  |
| primary | distribution-low | /couchdb0.bi.paynet | caliper_client_memory_avg | bytes | 63.5 | 63.5 |  |
| primary | distribution-low | /couchdb0.bi.paynet | caliper_client_memory_max | bytes | 79.4 | 79.4 |  |
| primary | distribution-low | /orderer.paynet | caliper_client_cpu_avg | percent | 0.1675 | 0.1675 |  |
| primary | distribution-low | /orderer.paynet | caliper_client_cpu_max | percent | 0.36875 | 0.36875 |  |
| primary | distribution-low | /orderer.paynet | caliper_client_memory_avg | bytes | 58.8 | 58.8 |  |
| primary | distribution-low | /orderer.paynet | caliper_client_memory_max | bytes | 79.4 | 79.4 |  |
| primary | distribution-low | /couchdb0.commercial.paynet | caliper_client_cpu_avg | percent | 0.98375 | 0.98375 |  |
| primary | distribution-low | /couchdb0.commercial.paynet | caliper_client_cpu_max | percent | 1.52 | 1.52 |  |
| primary | distribution-low | /couchdb0.commercial.paynet | caliper_client_memory_avg | bytes | 61.3 | 61.3 |  |
| primary | distribution-low | /couchdb0.commercial.paynet | caliper_client_memory_max | bytes | 76.9 | 76.9 |  |
| primary | distribution-low | /couchdb0.himbara.paynet | caliper_client_cpu_avg | percent | 1.0125 | 1.0125 |  |
| primary | distribution-low | /couchdb0.himbara.paynet | caliper_client_cpu_max | percent | 1.6325 | 1.6325 |  |
| primary | distribution-low | /couchdb0.himbara.paynet | caliper_client_memory_avg | bytes | 61.7 | 61.7 |  |
| primary | distribution-low | /couchdb0.himbara.paynet | caliper_client_memory_max | bytes | 76.1 | 76.1 |  |
| primary | distribution-low | /couchdb0.pjp.paynet | caliper_client_cpu_avg | percent | 1.02375 | 1.02375 |  |
| primary | distribution-low | /couchdb0.pjp.paynet | caliper_client_cpu_max | percent | 1.5275 | 1.5275 |  |
| primary | distribution-low | /couchdb0.pjp.paynet | caliper_client_memory_avg | bytes | 63.5 | 63.5 |  |
| primary | distribution-low | /couchdb0.pjp.paynet | caliper_client_memory_max | bytes | 78.1 | 78.1 |  |
| primary | distribution-low | /couchdb0.ojk.paynet | caliper_client_cpu_avg | percent | 1.01625 | 1.01625 |  |
| primary | distribution-low | /couchdb0.ojk.paynet | caliper_client_cpu_max | percent | 1.67 | 1.67 |  |
| primary | distribution-low | /couchdb0.ojk.paynet | caliper_client_memory_avg | bytes | 62.5 | 62.5 |  |
| primary | distribution-low | /couchdb0.ojk.paynet | caliper_client_memory_max | bytes | 81.1 | 81.1 |  |
| primary | distribution-low | node caliper(sum) | caliper_client_cpu_avg | percent | 78.1 | 78.1 |  |
| primary | distribution-low | node caliper(sum) | caliper_client_cpu_max | percent | 123.23 | 123.23 |  |
| primary | distribution-low | node-exporter:9100 | host_cpu_busy_percent | % | 80.7036230129519 | 92.33620689655223 | 92.09287857450471 |
| primary | distribution-low | node-exporter:9100 | host_memory_used_bytes | bytes | 5605268004.571428 | 5770547200 | 5702300262.4 |
| primary | distribution-low | node-exporter:9100 | host_read_iops | operations_per_second | 0.23627918812738688 | 1.793103448275862 | 1.6206896551724137 |
| primary | distribution-low | node-exporter:9100 | host_write_iops | operations_per_second | 1924.8613460547833 | 4942.241379310345 | 4751.705172413793 |
| primary | distribution-low | node-exporter:9100 | host_read_await_ms | milliseconds_per_operation | 0.13580340055503606 | 0.7111111111094538 | 0.6808510638282005 |
| primary | distribution-low | node-exporter:9100 | host_write_await_ms | milliseconds_per_operation | 1.7014456065889585 | 9.446207497820238 | 5.422942098939379 |
| primary | distribution-low | /peer0.ojk.paynet | caliper_client_cpu_avg | percent | 0.2225 | 0.2225 |  |
| primary | distribution-low | /peer0.ojk.paynet | caliper_client_cpu_max | percent | 0.4125 | 0.4125 |  |
| primary | distribution-low | /peer0.ojk.paynet | caliper_client_memory_avg | bytes | 119 | 119 |  |
| primary | distribution-low | /peer0.ojk.paynet | caliper_client_memory_max | bytes | 124 | 124 |  |
| primary | distribution-low | /peer0.pjp.paynet | caliper_client_cpu_avg | percent | 0.21875 | 0.21875 |  |
| primary | distribution-low | /peer0.pjp.paynet | caliper_client_cpu_max | percent | 0.2775 | 0.2775 |  |
| primary | distribution-low | /peer0.pjp.paynet | caliper_client_memory_avg | bytes | 112 | 112 |  |
| primary | distribution-low | /peer0.pjp.paynet | caliper_client_memory_max | bytes | 118 | 118 |  |
| primary | distribution-low | /peer0.commercial.paynet | caliper_client_cpu_avg | percent | 0.22 | 0.22 |  |
| primary | distribution-low | /peer0.commercial.paynet | caliper_client_cpu_max | percent | 0.28625 | 0.28625 |  |
| primary | distribution-low | /peer0.commercial.paynet | caliper_client_memory_avg | bytes | 112 | 112 |  |
| primary | distribution-low | /peer0.commercial.paynet | caliper_client_memory_max | bytes | 118 | 118 |  |
| primary | distribution-low | /peer0.bi.paynet | caliper_client_cpu_avg | percent | 0.82125 | 0.82125 |  |
| primary | distribution-low | /peer0.bi.paynet | caliper_client_cpu_max | percent | 1.06375 | 1.06375 |  |
| primary | distribution-low | /peer0.bi.paynet | caliper_client_memory_avg | bytes | 120 | 120 |  |
| primary | distribution-low | /peer0.bi.paynet | caliper_client_memory_max | bytes | 128 | 128 |  |
| primary | distribution-low | /peer0.himbara.paynet | caliper_client_cpu_avg | percent | 0.22375 | 0.22375 |  |
| primary | distribution-low | /peer0.himbara.paynet | caliper_client_cpu_max | percent | 0.3775 | 0.3775 |  |
| primary | distribution-low | /peer0.himbara.paynet | caliper_client_memory_avg | bytes | 117 | 117 |  |
| primary | distribution-low | /peer0.himbara.paynet | caliper_client_memory_max | bytes | 126 | 126 |  |
| primary | distribution-low | /orderer.paynet | caliper_client_cpu_avg | percent | 0.19125 | 0.19125 |  |
| primary | distribution-low | /orderer.paynet | caliper_client_cpu_max | percent | 0.3725 | 0.3725 |  |
| primary | distribution-low | /orderer.paynet | caliper_client_memory_avg | bytes | 59.1 | 59.1 |  |
| primary | distribution-low | /orderer.paynet | caliper_client_memory_max | bytes | 75.1 | 75.1 |  |
| primary | distribution-low | /couchdb0.himbara.paynet | caliper_client_cpu_avg | percent | 1 | 1 |  |
| primary | distribution-low | /couchdb0.himbara.paynet | caliper_client_cpu_max | percent | 1.52875 | 1.52875 |  |
| primary | distribution-low | /couchdb0.himbara.paynet | caliper_client_memory_avg | bytes | 61.4 | 61.4 |  |
| primary | distribution-low | /couchdb0.himbara.paynet | caliper_client_memory_max | bytes | 76.3 | 76.3 |  |
| primary | distribution-low | /couchdb0.pjp.paynet | caliper_client_cpu_avg | percent | 1.0175 | 1.0175 |  |
| primary | distribution-low | /couchdb0.pjp.paynet | caliper_client_cpu_max | percent | 1.58875 | 1.58875 |  |
| primary | distribution-low | /couchdb0.pjp.paynet | caliper_client_memory_avg | bytes | 63.9 | 63.9 |  |
| primary | distribution-low | /couchdb0.pjp.paynet | caliper_client_memory_max | bytes | 81.2 | 81.2 |  |
| primary | distribution-low | /couchdb0.bi.paynet | caliper_client_cpu_avg | percent | 2.01125 | 2.01125 |  |
| primary | distribution-low | /couchdb0.bi.paynet | caliper_client_cpu_max | percent | 2.67625 | 2.67625 |  |
| primary | distribution-low | /couchdb0.bi.paynet | caliper_client_memory_avg | bytes | 62.7 | 62.7 |  |
| primary | distribution-low | /couchdb0.bi.paynet | caliper_client_memory_max | bytes | 78.3 | 78.3 |  |
| primary | distribution-low | /couchdb0.commercial.paynet | caliper_client_cpu_avg | percent | 1.02125 | 1.02125 |  |
| primary | distribution-low | /couchdb0.commercial.paynet | caliper_client_cpu_max | percent | 1.41 | 1.41 |  |
| primary | distribution-low | /couchdb0.commercial.paynet | caliper_client_memory_avg | bytes | 63 | 63 |  |
| primary | distribution-low | /couchdb0.commercial.paynet | caliper_client_memory_max | bytes | 76.7 | 76.7 |  |
| primary | distribution-low | /couchdb0.ojk.paynet | caliper_client_cpu_avg | percent | 1 | 1 |  |
| primary | distribution-low | /couchdb0.ojk.paynet | caliper_client_cpu_max | percent | 1.455 | 1.455 |  |
| primary | distribution-low | /couchdb0.ojk.paynet | caliper_client_memory_avg | bytes | 61.3 | 61.3 |  |
| primary | distribution-low | /couchdb0.ojk.paynet | caliper_client_memory_max | bytes | 74.6 | 74.6 |  |
| primary | distribution-low | node caliper(sum) | caliper_client_cpu_avg | percent | 78.4 | 78.4 |  |
| primary | distribution-low | node caliper(sum) | caliper_client_cpu_max | percent | 110 | 110 |  |
| primary | redemption-low | node-exporter:9100 | host_cpu_busy_percent | % | 30.325254324993526 | 36.176724137940575 | 34.51896551724248 |
| primary | redemption-low | node-exporter:9100 | host_memory_used_bytes | bytes | 5496962336.820513 | 5607661568 | 5573730304 |
| primary | redemption-low | node-exporter:9100 | host_read_iops | operations_per_second | 0.032089958668406915 | 0.2857142857142857 | 0.24137931034482757 |
| primary | redemption-low | node-exporter:9100 | host_write_iops | operations_per_second | 726.4484891283525 | 1851.3103448275863 | 1751.1172413793104 |
| primary | redemption-low | node-exporter:9100 | host_read_await_ms | milliseconds_per_operation | 0.24801587301462363 | 7.000000000061846 | 1.1428571428626 |
| primary | redemption-low | node-exporter:9100 | host_write_await_ms | milliseconds_per_operation | 5.158942251495996 | 18.014257313263048 | 14.577628598303344 |
| primary | redemption-low | /peer0.bi.paynet | caliper_client_cpu_avg | percent | 0.21125 | 0.21125 |  |
| primary | redemption-low | /peer0.bi.paynet | caliper_client_cpu_max | percent | 0.26125 | 0.26125 |  |
| primary | redemption-low | /peer0.bi.paynet | caliper_client_memory_avg | bytes | 114 | 114 |  |
| primary | redemption-low | /peer0.bi.paynet | caliper_client_memory_max | bytes | 121 | 121 |  |
| primary | redemption-low | /peer0.himbara.paynet | caliper_client_cpu_avg | percent | 0.06875 | 0.06875 |  |
| primary | redemption-low | /peer0.himbara.paynet | caliper_client_cpu_max | percent | 0.10625 | 0.10625 |  |
| primary | redemption-low | /peer0.himbara.paynet | caliper_client_memory_avg | bytes | 116 | 116 |  |
| primary | redemption-low | /peer0.himbara.paynet | caliper_client_memory_max | bytes | 121 | 121 |  |
| primary | redemption-low | /peer0.commercial.paynet | caliper_client_cpu_avg | percent | 0.07 | 0.07 |  |
| primary | redemption-low | /peer0.commercial.paynet | caliper_client_cpu_max | percent | 0.11125 | 0.11125 |  |
| primary | redemption-low | /peer0.commercial.paynet | caliper_client_memory_avg | bytes | 112 | 112 |  |
| primary | redemption-low | /peer0.commercial.paynet | caliper_client_memory_max | bytes | 116 | 116 |  |
| primary | redemption-low | /peer0.pjp.paynet | caliper_client_cpu_avg | percent | 0.0675 | 0.0675 |  |
| primary | redemption-low | /peer0.pjp.paynet | caliper_client_cpu_max | percent | 0.105 | 0.105 |  |
| primary | redemption-low | /peer0.pjp.paynet | caliper_client_memory_avg | bytes | 109 | 109 |  |
| primary | redemption-low | /peer0.pjp.paynet | caliper_client_memory_max | bytes | 113 | 113 |  |
| primary | redemption-low | /peer0.ojk.paynet | caliper_client_cpu_avg | percent | 0.0675 | 0.0675 |  |
| primary | redemption-low | /peer0.ojk.paynet | caliper_client_cpu_max | percent | 0.105 | 0.105 |  |
| primary | redemption-low | /peer0.ojk.paynet | caliper_client_memory_avg | bytes | 113 | 113 |  |
| primary | redemption-low | /peer0.ojk.paynet | caliper_client_memory_max | bytes | 117 | 117 |  |
| primary | redemption-low | /couchdb0.commercial.paynet | caliper_client_cpu_avg | percent | 0.43625 | 0.43625 |  |
| primary | redemption-low | /couchdb0.commercial.paynet | caliper_client_cpu_max | percent | 1.09125 | 1.09125 |  |
| primary | redemption-low | /couchdb0.commercial.paynet | caliper_client_memory_avg | bytes | 54.3 | 54.3 |  |
| primary | redemption-low | /couchdb0.commercial.paynet | caliper_client_memory_max | bytes | 63.5 | 63.5 |  |
| primary | redemption-low | /couchdb0.ojk.paynet | caliper_client_cpu_avg | percent | 0.45375 | 0.45375 |  |
| primary | redemption-low | /couchdb0.ojk.paynet | caliper_client_cpu_max | percent | 1.24375 | 1.24375 |  |
| primary | redemption-low | /couchdb0.ojk.paynet | caliper_client_memory_avg | bytes | 52.8 | 52.8 |  |
| primary | redemption-low | /couchdb0.ojk.paynet | caliper_client_memory_max | bytes | 61.6 | 61.6 |  |
| primary | redemption-low | /couchdb0.himbara.paynet | caliper_client_cpu_avg | percent | 0.38125 | 0.38125 |  |
| primary | redemption-low | /couchdb0.himbara.paynet | caliper_client_cpu_max | percent | 1.02125 | 1.02125 |  |
| primary | redemption-low | /couchdb0.himbara.paynet | caliper_client_memory_avg | bytes | 53.6 | 53.6 |  |
| primary | redemption-low | /couchdb0.himbara.paynet | caliper_client_memory_max | bytes | 65.4 | 65.4 |  |
| primary | redemption-low | /orderer.paynet | caliper_client_cpu_avg | percent | 0.04 | 0.04 |  |
| primary | redemption-low | /orderer.paynet | caliper_client_cpu_max | percent | 0.05875 | 0.05875 |  |
| primary | redemption-low | /orderer.paynet | caliper_client_memory_avg | bytes | 55.7 | 55.7 |  |
| primary | redemption-low | /orderer.paynet | caliper_client_memory_max | bytes | 65.8 | 65.8 |  |
| primary | redemption-low | /couchdb0.bi.paynet | caliper_client_cpu_avg | percent | 0.38625 | 0.38625 |  |
| primary | redemption-low | /couchdb0.bi.paynet | caliper_client_cpu_max | percent | 1.265 | 1.265 |  |
| primary | redemption-low | /couchdb0.bi.paynet | caliper_client_memory_avg | bytes | 56.3 | 56.3 |  |
| primary | redemption-low | /couchdb0.bi.paynet | caliper_client_memory_max | bytes | 64 | 64 |  |
| primary | redemption-low | /couchdb0.pjp.paynet | caliper_client_cpu_avg | percent | 0.455 | 0.455 |  |
| primary | redemption-low | /couchdb0.pjp.paynet | caliper_client_cpu_max | percent | 1.20625 | 1.20625 |  |
| primary | redemption-low | /couchdb0.pjp.paynet | caliper_client_memory_avg | bytes | 54.2 | 54.2 |  |
| primary | redemption-low | /couchdb0.pjp.paynet | caliper_client_memory_max | bytes | 64.9 | 64.9 |  |
| primary | redemption-low | node caliper(sum) | caliper_client_cpu_avg | percent | 19.56 | 19.56 |  |
| primary | redemption-low | node caliper(sum) | caliper_client_cpu_max | percent | 48 | 48 |  |
| primary | redemption-low | node-exporter:9100 | host_cpu_busy_percent | % | 30.984214925950848 | 38.59482758620414 | 37.643965517244986 |
| primary | redemption-low | node-exporter:9100 | host_memory_used_bytes | bytes | 5518594363.076923 | 5870620672 | 5638610943.999999 |
| primary | redemption-low | node-exporter:9100 | host_read_iops | operations_per_second | 0.02467174452303763 | 0.17857142857142855 | 0.1724137931034483 |
| primary | redemption-low | node-exporter:9100 | host_write_iops | operations_per_second | 709.6907758687355 | 1900.9655172413793 | 1734.35 |
| primary | redemption-low | node-exporter:9100 | host_read_await_ms | milliseconds_per_operation | 0.025641025640419316 | 0.2499999999940883 | 0.19999999999527066 |
| primary | redemption-low | node-exporter:9100 | host_write_await_ms | milliseconds_per_operation | 3.685839971173373 | 11.29891739412193 | 10.688086709999721 |
| primary | redemption-low | /peer0.pjp.paynet | caliper_client_cpu_avg | percent | 0.07375 | 0.07375 |  |
| primary | redemption-low | /peer0.pjp.paynet | caliper_client_cpu_max | percent | 0.1125 | 0.1125 |  |
| primary | redemption-low | /peer0.pjp.paynet | caliper_client_memory_avg | bytes | 112 | 112 |  |
| primary | redemption-low | /peer0.pjp.paynet | caliper_client_memory_max | bytes | 118 | 118 |  |
| primary | redemption-low | /peer0.himbara.paynet | caliper_client_cpu_avg | percent | 0.0725 | 0.0725 |  |
| primary | redemption-low | /peer0.himbara.paynet | caliper_client_cpu_max | percent | 0.11375 | 0.11375 |  |
| primary | redemption-low | /peer0.himbara.paynet | caliper_client_memory_avg | bytes | 113 | 113 |  |
| primary | redemption-low | /peer0.himbara.paynet | caliper_client_memory_max | bytes | 117 | 117 |  |
| primary | redemption-low | /peer0.commercial.paynet | caliper_client_cpu_avg | percent | 0.0775 | 0.0775 |  |
| primary | redemption-low | /peer0.commercial.paynet | caliper_client_cpu_max | percent | 0.1125 | 0.1125 |  |
| primary | redemption-low | /peer0.commercial.paynet | caliper_client_memory_avg | bytes | 110 | 110 |  |
| primary | redemption-low | /peer0.commercial.paynet | caliper_client_memory_max | bytes | 114 | 114 |  |
| primary | redemption-low | /peer0.ojk.paynet | caliper_client_cpu_avg | percent | 0.0725 | 0.0725 |  |
| primary | redemption-low | /peer0.ojk.paynet | caliper_client_cpu_max | percent | 0.1425 | 0.1425 |  |
| primary | redemption-low | /peer0.ojk.paynet | caliper_client_memory_avg | bytes | 110 | 110 |  |
| primary | redemption-low | /peer0.ojk.paynet | caliper_client_memory_max | bytes | 114 | 114 |  |
| primary | redemption-low | /peer0.bi.paynet | caliper_client_cpu_avg | percent | 0.215 | 0.215 |  |
| primary | redemption-low | /peer0.bi.paynet | caliper_client_cpu_max | percent | 0.27125 | 0.27125 |  |
| primary | redemption-low | /peer0.bi.paynet | caliper_client_memory_avg | bytes | 115 | 115 |  |
| primary | redemption-low | /peer0.bi.paynet | caliper_client_memory_max | bytes | 121 | 121 |  |
| primary | redemption-low | /couchdb0.commercial.paynet | caliper_client_cpu_avg | percent | 0.49125 | 0.49125 |  |
| primary | redemption-low | /couchdb0.commercial.paynet | caliper_client_cpu_max | percent | 1.41875 | 1.41875 |  |
| primary | redemption-low | /couchdb0.commercial.paynet | caliper_client_memory_avg | bytes | 53.5 | 53.5 |  |
| primary | redemption-low | /couchdb0.commercial.paynet | caliper_client_memory_max | bytes | 62.4 | 62.4 |  |
| primary | redemption-low | /couchdb0.bi.paynet | caliper_client_cpu_avg | percent | 0.40625 | 0.40625 |  |
| primary | redemption-low | /couchdb0.bi.paynet | caliper_client_cpu_max | percent | 1.40625 | 1.40625 |  |
| primary | redemption-low | /couchdb0.bi.paynet | caliper_client_memory_avg | bytes | 56 | 56 |  |
| primary | redemption-low | /couchdb0.bi.paynet | caliper_client_memory_max | bytes | 66.3 | 66.3 |  |
| primary | redemption-low | /orderer.paynet | caliper_client_cpu_avg | percent | 0.04 | 0.04 |  |
| primary | redemption-low | /orderer.paynet | caliper_client_cpu_max | percent | 0.0875 | 0.0875 |  |
| primary | redemption-low | /orderer.paynet | caliper_client_memory_avg | bytes | 55.1 | 55.1 |  |
| primary | redemption-low | /orderer.paynet | caliper_client_memory_max | bytes | 66.5 | 66.5 |  |
| primary | redemption-low | /couchdb0.ojk.paynet | caliper_client_cpu_avg | percent | 0.4825 | 0.4825 |  |
| primary | redemption-low | /couchdb0.ojk.paynet | caliper_client_cpu_max | percent | 1.40625 | 1.40625 |  |
| primary | redemption-low | /couchdb0.ojk.paynet | caliper_client_memory_avg | bytes | 54.1 | 54.1 |  |
| primary | redemption-low | /couchdb0.ojk.paynet | caliper_client_memory_max | bytes | 64.7 | 64.7 |  |
| primary | redemption-low | /couchdb0.pjp.paynet | caliper_client_cpu_avg | percent | 0.48375 | 0.48375 |  |
| primary | redemption-low | /couchdb0.pjp.paynet | caliper_client_cpu_max | percent | 1.36 | 1.36 |  |
| primary | redemption-low | /couchdb0.pjp.paynet | caliper_client_memory_avg | bytes | 54.5 | 54.5 |  |
| primary | redemption-low | /couchdb0.pjp.paynet | caliper_client_memory_max | bytes | 64.7 | 64.7 |  |
| primary | redemption-low | /couchdb0.himbara.paynet | caliper_client_cpu_avg | percent | 0.42 | 0.42 |  |
| primary | redemption-low | /couchdb0.himbara.paynet | caliper_client_cpu_max | percent | 1.3375 | 1.3375 |  |
| primary | redemption-low | /couchdb0.himbara.paynet | caliper_client_memory_avg | bytes | 55.4 | 55.4 |  |
| primary | redemption-low | /couchdb0.himbara.paynet | caliper_client_memory_max | bytes | 65.6 | 65.6 |  |
| primary | redemption-low | node caliper(sum) | caliper_client_cpu_avg | percent | 19.64 | 19.64 |  |
| primary | redemption-low | node caliper(sum) | caliper_client_cpu_max | percent | 45 | 45 |  |
| primary | redemption-low | node-exporter:9100 | host_cpu_busy_percent | % | 30.557905243726417 | 36.22555297619965 | 35.48965517240817 |
| primary | redemption-low | node-exporter:9100 | host_memory_used_bytes | bytes | 5483835917.128205 | 5606109184 | 5573553356.8 |
| primary | redemption-low | node-exporter:9100 | host_read_iops | operations_per_second | 0.1544373261476712 | 1.2857142857142856 | 1.206896551724138 |
| primary | redemption-low | node-exporter:9100 | host_write_iops | operations_per_second | 704.7744187125454 | 1868.2857142857142 | 1737.6431034482757 |
| primary | redemption-low | node-exporter:9100 | host_read_await_ms | milliseconds_per_operation | 0.9642687559375867 | 8.484848484847657 | 7.99999999999922 |
| primary | redemption-low | node-exporter:9100 | host_write_await_ms | milliseconds_per_operation | 4.8002453814822985 | 15.021961378265654 | 12.438045202552678 |
| primary | redemption-low | /peer0.bi.paynet | caliper_client_cpu_avg | percent | 0.22 | 0.22 |  |
| primary | redemption-low | /peer0.bi.paynet | caliper_client_cpu_max | percent | 0.26625 | 0.26625 |  |
| primary | redemption-low | /peer0.bi.paynet | caliper_client_memory_avg | bytes | 115 | 115 |  |
| primary | redemption-low | /peer0.bi.paynet | caliper_client_memory_max | bytes | 119 | 119 |  |
| primary | redemption-low | /peer0.ojk.paynet | caliper_client_cpu_avg | percent | 0.06875 | 0.06875 |  |
| primary | redemption-low | /peer0.ojk.paynet | caliper_client_cpu_max | percent | 0.0975 | 0.0975 |  |
| primary | redemption-low | /peer0.ojk.paynet | caliper_client_memory_avg | bytes | 105 | 105 |  |
| primary | redemption-low | /peer0.ojk.paynet | caliper_client_memory_max | bytes | 111 | 111 |  |
| primary | redemption-low | /peer0.pjp.paynet | caliper_client_cpu_avg | percent | 0.0675 | 0.0675 |  |
| primary | redemption-low | /peer0.pjp.paynet | caliper_client_cpu_max | percent | 0.09125 | 0.09125 |  |
| primary | redemption-low | /peer0.pjp.paynet | caliper_client_memory_avg | bytes | 110 | 110 |  |
| primary | redemption-low | /peer0.pjp.paynet | caliper_client_memory_max | bytes | 115 | 115 |  |
| primary | redemption-low | /peer0.himbara.paynet | caliper_client_cpu_avg | percent | 0.0675 | 0.0675 |  |
| primary | redemption-low | /peer0.himbara.paynet | caliper_client_cpu_max | percent | 0.09625 | 0.09625 |  |
| primary | redemption-low | /peer0.himbara.paynet | caliper_client_memory_avg | bytes | 116 | 116 |  |
| primary | redemption-low | /peer0.himbara.paynet | caliper_client_memory_max | bytes | 123 | 123 |  |
| primary | redemption-low | /peer0.commercial.paynet | caliper_client_cpu_avg | percent | 0.0675 | 0.0675 |  |
| primary | redemption-low | /peer0.commercial.paynet | caliper_client_cpu_max | percent | 0.10875 | 0.10875 |  |
| primary | redemption-low | /peer0.commercial.paynet | caliper_client_memory_avg | bytes | 107 | 107 |  |
| primary | redemption-low | /peer0.commercial.paynet | caliper_client_memory_max | bytes | 111 | 111 |  |
| primary | redemption-low | /couchdb0.pjp.paynet | caliper_client_cpu_avg | percent | 0.45125 | 0.45125 |  |
| primary | redemption-low | /couchdb0.pjp.paynet | caliper_client_cpu_max | percent | 1.43875 | 1.43875 |  |
| primary | redemption-low | /couchdb0.pjp.paynet | caliper_client_memory_avg | bytes | 54 | 54 |  |
| primary | redemption-low | /couchdb0.pjp.paynet | caliper_client_memory_max | bytes | 65.2 | 65.2 |  |
| primary | redemption-low | /orderer.paynet | caliper_client_cpu_avg | percent | 0.045 | 0.045 |  |
| primary | redemption-low | /orderer.paynet | caliper_client_cpu_max | percent | 0.05875 | 0.05875 |  |
| primary | redemption-low | /orderer.paynet | caliper_client_memory_avg | bytes | 54.3 | 54.3 |  |
| primary | redemption-low | /orderer.paynet | caliper_client_memory_max | bytes | 69.5 | 69.5 |  |
| primary | redemption-low | /couchdb0.bi.paynet | caliper_client_cpu_avg | percent | 0.3775 | 0.3775 |  |
| primary | redemption-low | /couchdb0.bi.paynet | caliper_client_cpu_max | percent | 1.1275 | 1.1275 |  |
| primary | redemption-low | /couchdb0.bi.paynet | caliper_client_memory_avg | bytes | 54.2 | 54.2 |  |
| primary | redemption-low | /couchdb0.bi.paynet | caliper_client_memory_max | bytes | 67 | 67 |  |
| primary | redemption-low | /couchdb0.ojk.paynet | caliper_client_cpu_avg | percent | 0.4475 | 0.4475 |  |
| primary | redemption-low | /couchdb0.ojk.paynet | caliper_client_cpu_max | percent | 1.2175 | 1.2175 |  |
| primary | redemption-low | /couchdb0.ojk.paynet | caliper_client_memory_avg | bytes | 55.8 | 55.8 |  |
| primary | redemption-low | /couchdb0.ojk.paynet | caliper_client_memory_max | bytes | 68 | 68 |  |
| primary | redemption-low | /couchdb0.himbara.paynet | caliper_client_cpu_avg | percent | 0.3875 | 0.3875 |  |
| primary | redemption-low | /couchdb0.himbara.paynet | caliper_client_cpu_max | percent | 1.255 | 1.255 |  |
| primary | redemption-low | /couchdb0.himbara.paynet | caliper_client_memory_avg | bytes | 55.1 | 55.1 |  |
| primary | redemption-low | /couchdb0.himbara.paynet | caliper_client_memory_max | bytes | 63 | 63 |  |
| primary | redemption-low | /couchdb0.commercial.paynet | caliper_client_cpu_avg | percent | 0.4625 | 0.4625 |  |
| primary | redemption-low | /couchdb0.commercial.paynet | caliper_client_cpu_max | percent | 1.10875 | 1.10875 |  |
| primary | redemption-low | /couchdb0.commercial.paynet | caliper_client_memory_avg | bytes | 52.8 | 52.8 |  |
| primary | redemption-low | /couchdb0.commercial.paynet | caliper_client_memory_max | bytes | 63.4 | 63.4 |  |
| primary | redemption-low | node caliper(sum) | caliper_client_cpu_avg | percent | 19.77 | 19.77 |  |
| primary | redemption-low | node caliper(sum) | caliper_client_cpu_max | percent | 53 | 53 |  |
| primary | redemption-low | node-exporter:9100 | host_cpu_busy_percent | % | 30.221604939528845 | 35.58711250000077 | 34.46465517241324 |
| primary | redemption-low | node-exporter:9100 | host_memory_used_bytes | bytes | 5519850819.82906 | 5716844544 | 5596006809.6 |
| primary | redemption-low | node-exporter:9100 | host_read_iops | operations_per_second | 0.21070227499193045 | 1.6785714285714284 | 1.5413177339901476 |
| primary | redemption-low | node-exporter:9100 | host_write_iops | operations_per_second | 688.458066849993 | 1755.6785714285713 | 1574.4473522167486 |
| primary | redemption-low | node-exporter:9100 | host_read_await_ms | milliseconds_per_operation | 0.09464526736195855 | 0.4999999999881766 | 0.39534883721052916 |
| primary | redemption-low | node-exporter:9100 | host_write_await_ms | milliseconds_per_operation | 2.9407987681097785 | 8.488469504107263 | 7.753550858733249 |
| primary | redemption-low | /peer0.himbara.paynet | caliper_client_cpu_avg | percent | 0.0675 | 0.0675 |  |
| primary | redemption-low | /peer0.himbara.paynet | caliper_client_cpu_max | percent | 0.10125 | 0.10125 |  |
| primary | redemption-low | /peer0.himbara.paynet | caliper_client_memory_avg | bytes | 115 | 115 |  |
| primary | redemption-low | /peer0.himbara.paynet | caliper_client_memory_max | bytes | 121 | 121 |  |
| primary | redemption-low | /peer0.commercial.paynet | caliper_client_cpu_avg | percent | 0.0675 | 0.0675 |  |
| primary | redemption-low | /peer0.commercial.paynet | caliper_client_cpu_max | percent | 0.10625 | 0.10625 |  |
| primary | redemption-low | /peer0.commercial.paynet | caliper_client_memory_avg | bytes | 110 | 110 |  |
| primary | redemption-low | /peer0.commercial.paynet | caliper_client_memory_max | bytes | 114 | 114 |  |
| primary | redemption-low | /peer0.pjp.paynet | caliper_client_cpu_avg | percent | 0.06875 | 0.06875 |  |
| primary | redemption-low | /peer0.pjp.paynet | caliper_client_cpu_max | percent | 0.11125 | 0.11125 |  |
| primary | redemption-low | /peer0.pjp.paynet | caliper_client_memory_avg | bytes | 111 | 111 |  |
| primary | redemption-low | /peer0.pjp.paynet | caliper_client_memory_max | bytes | 117 | 117 |  |
| primary | redemption-low | /peer0.bi.paynet | caliper_client_cpu_avg | percent | 0.215 | 0.215 |  |
| primary | redemption-low | /peer0.bi.paynet | caliper_client_cpu_max | percent | 0.26375 | 0.26375 |  |
| primary | redemption-low | /peer0.bi.paynet | caliper_client_memory_avg | bytes | 112 | 112 |  |
| primary | redemption-low | /peer0.bi.paynet | caliper_client_memory_max | bytes | 117 | 117 |  |
| primary | redemption-low | /peer0.ojk.paynet | caliper_client_cpu_avg | percent | 0.06875 | 0.06875 |  |
| primary | redemption-low | /peer0.ojk.paynet | caliper_client_cpu_max | percent | 0.115 | 0.115 |  |
| primary | redemption-low | /peer0.ojk.paynet | caliper_client_memory_avg | bytes | 111 | 111 |  |
| primary | redemption-low | /peer0.ojk.paynet | caliper_client_memory_max | bytes | 115 | 115 |  |
| primary | redemption-low | /orderer.paynet | caliper_client_cpu_avg | percent | 0.04375 | 0.04375 |  |
| primary | redemption-low | /orderer.paynet | caliper_client_cpu_max | percent | 0.06125 | 0.06125 |  |
| primary | redemption-low | /orderer.paynet | caliper_client_memory_avg | bytes | 55.3 | 55.3 |  |
| primary | redemption-low | /orderer.paynet | caliper_client_memory_max | bytes | 67.9 | 67.9 |  |
| primary | redemption-low | /couchdb0.commercial.paynet | caliper_client_cpu_avg | percent | 0.4625 | 0.4625 |  |
| primary | redemption-low | /couchdb0.commercial.paynet | caliper_client_cpu_max | percent | 1.2725 | 1.2725 |  |
| primary | redemption-low | /couchdb0.commercial.paynet | caliper_client_memory_avg | bytes | 55.1 | 55.1 |  |
| primary | redemption-low | /couchdb0.commercial.paynet | caliper_client_memory_max | bytes | 62.4 | 62.4 |  |
| primary | redemption-low | /couchdb0.pjp.paynet | caliper_client_cpu_avg | percent | 0.45625 | 0.45625 |  |
| primary | redemption-low | /couchdb0.pjp.paynet | caliper_client_cpu_max | percent | 1.21625 | 1.21625 |  |
| primary | redemption-low | /couchdb0.pjp.paynet | caliper_client_memory_avg | bytes | 54 | 54 |  |
| primary | redemption-low | /couchdb0.pjp.paynet | caliper_client_memory_max | bytes | 66.7 | 66.7 |  |
| primary | redemption-low | /couchdb0.bi.paynet | caliper_client_cpu_avg | percent | 0.38625 | 0.38625 |  |
| primary | redemption-low | /couchdb0.bi.paynet | caliper_client_cpu_max | percent | 1.2275 | 1.2275 |  |
| primary | redemption-low | /couchdb0.bi.paynet | caliper_client_memory_avg | bytes | 54.7 | 54.7 |  |
| primary | redemption-low | /couchdb0.bi.paynet | caliper_client_memory_max | bytes | 64.7 | 64.7 |  |
| primary | redemption-low | /couchdb0.ojk.paynet | caliper_client_cpu_avg | percent | 0.46125 | 0.46125 |  |
| primary | redemption-low | /couchdb0.ojk.paynet | caliper_client_cpu_max | percent | 1.2125 | 1.2125 |  |
| primary | redemption-low | /couchdb0.ojk.paynet | caliper_client_memory_avg | bytes | 55.2 | 55.2 |  |
| primary | redemption-low | /couchdb0.ojk.paynet | caliper_client_memory_max | bytes | 63.5 | 63.5 |  |
| primary | redemption-low | /couchdb0.himbara.paynet | caliper_client_cpu_avg | percent | 0.3825 | 0.3825 |  |
| primary | redemption-low | /couchdb0.himbara.paynet | caliper_client_cpu_max | percent | 1.1475 | 1.1475 |  |
| primary | redemption-low | /couchdb0.himbara.paynet | caliper_client_memory_avg | bytes | 54 | 54 |  |
| primary | redemption-low | /couchdb0.himbara.paynet | caliper_client_memory_max | bytes | 63.3 | 63.3 |  |
| primary | redemption-low | node caliper(sum) | caliper_client_cpu_avg | percent | 19.57 | 19.57 |  |
| primary | redemption-low | node caliper(sum) | caliper_client_cpu_max | percent | 47 | 47 |  |
| primary | redemption-low | node-exporter:9100 | host_cpu_busy_percent | % | 31.097730292759504 | 38.116379310348094 | 37.51847790640204 |
| primary | redemption-low | node-exporter:9100 | host_memory_used_bytes | bytes | 5530998766.495727 | 5821263872 | 5641698508.8 |
| primary | redemption-low | node-exporter:9100 | host_read_iops | operations_per_second | 0.09107726201002071 | 2.1724137931034484 | 0.10344827586206896 |
| primary | redemption-low | node-exporter:9100 | host_write_iops | operations_per_second | 686.4038863946079 | 1780.7586206896551 | 1666.7482758620688 |
| primary | redemption-low | node-exporter:9100 | host_read_await_ms | milliseconds_per_operation | 0.03398453398516474 | 0.698412698412424 | 0.33333333336334664 |
| primary | redemption-low | node-exporter:9100 | host_write_await_ms | milliseconds_per_operation | 4.042265180103545 | 11.244729691745471 | 10.473423923413131 |
| primary | redemption-low | /peer0.ojk.paynet | caliper_client_cpu_avg | percent | 0.0675 | 0.0675 |  |
| primary | redemption-low | /peer0.ojk.paynet | caliper_client_cpu_max | percent | 0.09875 | 0.09875 |  |
| primary | redemption-low | /peer0.ojk.paynet | caliper_client_memory_avg | bytes | 112 | 112 |  |
| primary | redemption-low | /peer0.ojk.paynet | caliper_client_memory_max | bytes | 116 | 116 |  |
| primary | redemption-low | /peer0.pjp.paynet | caliper_client_cpu_avg | percent | 0.06625 | 0.06625 |  |
| primary | redemption-low | /peer0.pjp.paynet | caliper_client_cpu_max | percent | 0.0875 | 0.0875 |  |
| primary | redemption-low | /peer0.pjp.paynet | caliper_client_memory_avg | bytes | 109 | 109 |  |
| primary | redemption-low | /peer0.pjp.paynet | caliper_client_memory_max | bytes | 112 | 112 |  |
| primary | redemption-low | /peer0.commercial.paynet | caliper_client_cpu_avg | percent | 0.06625 | 0.06625 |  |
| primary | redemption-low | /peer0.commercial.paynet | caliper_client_cpu_max | percent | 0.1 | 0.1 |  |
| primary | redemption-low | /peer0.commercial.paynet | caliper_client_memory_avg | bytes | 110 | 110 |  |
| primary | redemption-low | /peer0.commercial.paynet | caliper_client_memory_max | bytes | 114 | 114 |  |
| primary | redemption-low | /peer0.himbara.paynet | caliper_client_cpu_avg | percent | 0.07125 | 0.07125 |  |
| primary | redemption-low | /peer0.himbara.paynet | caliper_client_cpu_max | percent | 0.26375 | 0.26375 |  |
| primary | redemption-low | /peer0.himbara.paynet | caliper_client_memory_avg | bytes | 118 | 118 |  |
| primary | redemption-low | /peer0.himbara.paynet | caliper_client_memory_max | bytes | 123 | 123 |  |
| primary | redemption-low | /peer0.bi.paynet | caliper_client_cpu_avg | percent | 0.2075 | 0.2075 |  |
| primary | redemption-low | /peer0.bi.paynet | caliper_client_cpu_max | percent | 0.25125 | 0.25125 |  |
| primary | redemption-low | /peer0.bi.paynet | caliper_client_memory_avg | bytes | 111 | 111 |  |
| primary | redemption-low | /peer0.bi.paynet | caliper_client_memory_max | bytes | 115 | 115 |  |
| primary | redemption-low | /couchdb0.ojk.paynet | caliper_client_cpu_avg | percent | 0.4625 | 0.4625 |  |
| primary | redemption-low | /couchdb0.ojk.paynet | caliper_client_cpu_max | percent | 1.41 | 1.41 |  |
| primary | redemption-low | /couchdb0.ojk.paynet | caliper_client_memory_avg | bytes | 55.9 | 55.9 |  |
| primary | redemption-low | /couchdb0.ojk.paynet | caliper_client_memory_max | bytes | 65.4 | 65.4 |  |
| primary | redemption-low | /orderer.paynet | caliper_client_cpu_avg | percent | 0.04 | 0.04 |  |
| primary | redemption-low | /orderer.paynet | caliper_client_cpu_max | percent | 0.0525 | 0.0525 |  |
| primary | redemption-low | /orderer.paynet | caliper_client_memory_avg | bytes | 55.1 | 55.1 |  |
| primary | redemption-low | /orderer.paynet | caliper_client_memory_max | bytes | 67.2 | 67.2 |  |
| primary | redemption-low | /couchdb0.himbara.paynet | caliper_client_cpu_avg | percent | 0.38875 | 0.38875 |  |
| primary | redemption-low | /couchdb0.himbara.paynet | caliper_client_cpu_max | percent | 1.32625 | 1.32625 |  |
| primary | redemption-low | /couchdb0.himbara.paynet | caliper_client_memory_avg | bytes | 54.6 | 54.6 |  |
| primary | redemption-low | /couchdb0.himbara.paynet | caliper_client_memory_max | bytes | 64.5 | 64.5 |  |
| primary | redemption-low | /couchdb0.commercial.paynet | caliper_client_cpu_avg | percent | 0.4675 | 0.4675 |  |
| primary | redemption-low | /couchdb0.commercial.paynet | caliper_client_cpu_max | percent | 1.3725 | 1.3725 |  |
| primary | redemption-low | /couchdb0.commercial.paynet | caliper_client_memory_avg | bytes | 54.8 | 54.8 |  |
| primary | redemption-low | /couchdb0.commercial.paynet | caliper_client_memory_max | bytes | 62.4 | 62.4 |  |
| primary | redemption-low | /couchdb0.pjp.paynet | caliper_client_cpu_avg | percent | 0.46625 | 0.46625 |  |
| primary | redemption-low | /couchdb0.pjp.paynet | caliper_client_cpu_max | percent | 1.4425 | 1.4425 |  |
| primary | redemption-low | /couchdb0.pjp.paynet | caliper_client_memory_avg | bytes | 55.4 | 55.4 |  |
| primary | redemption-low | /couchdb0.pjp.paynet | caliper_client_memory_max | bytes | 66.6 | 66.6 |  |
| primary | redemption-low | /couchdb0.bi.paynet | caliper_client_cpu_avg | percent | 0.3925 | 0.3925 |  |
| primary | redemption-low | /couchdb0.bi.paynet | caliper_client_cpu_max | percent | 1.4625 | 1.4625 |  |
| primary | redemption-low | /couchdb0.bi.paynet | caliper_client_memory_avg | bytes | 54.8 | 54.8 |  |
| primary | redemption-low | /couchdb0.bi.paynet | caliper_client_memory_max | bytes | 63.6 | 63.6 |  |
| primary | redemption-low | node caliper(sum) | caliper_client_cpu_avg | percent | 19.88 | 19.88 |  |
| primary | redemption-low | node caliper(sum) | caliper_client_cpu_max | percent | 49 | 49 |  |
| calibration | retail-transfer-low | node-exporter:9100 | host_cpu_busy_percent | % | 54.664533178230876 | 72.33189655173568 | 71.89138272320254 |
| calibration | retail-transfer-low | node-exporter:9100 | host_memory_used_bytes | bytes | 5876869085.288136 | 5975277568 | 5957409996.8 |
| calibration | retail-transfer-low | node-exporter:9100 | host_read_iops | operations_per_second | 17.414108930565558 | 70.13793103448276 | 56.59655172413793 |
| calibration | retail-transfer-low | node-exporter:9100 | host_write_iops | operations_per_second | 914.9069952081991 | 2547.551724137931 | 2514.3189655172414 |
| calibration | retail-transfer-low | node-exporter:9100 | host_read_await_ms | milliseconds_per_operation | 0.10460505611066534 | 0.7118644067782428 | 0.28735619303725674 |
| calibration | retail-transfer-low | node-exporter:9100 | host_write_await_ms | milliseconds_per_operation | 1.937807077961769 | 7.416518298714122 | 5.094986868865399 |
| calibration | retail-transfer-low | /peer0.commercial.paynet | caliper_client_cpu_avg | percent | 0.11625 | 0.11625 |  |
| calibration | retail-transfer-low | /peer0.commercial.paynet | caliper_client_cpu_max | percent | 0.1625 | 0.1625 |  |
| calibration | retail-transfer-low | /peer0.commercial.paynet | caliper_client_memory_avg | bytes | 127 | 127 |  |
| calibration | retail-transfer-low | /peer0.commercial.paynet | caliper_client_memory_max | bytes | 139 | 139 |  |
| calibration | retail-transfer-low | /peer0.himbara.paynet | caliper_client_cpu_avg | percent | 0.37375 | 0.37375 |  |
| calibration | retail-transfer-low | /peer0.himbara.paynet | caliper_client_cpu_max | percent | 0.455 | 0.455 |  |
| calibration | retail-transfer-low | /peer0.himbara.paynet | caliper_client_memory_avg | bytes | 117 | 117 |  |
| calibration | retail-transfer-low | /peer0.himbara.paynet | caliper_client_memory_max | bytes | 121 | 121 |  |
| calibration | retail-transfer-low | /peer0.ojk.paynet | caliper_client_cpu_avg | percent | 0.11625 | 0.11625 |  |
| calibration | retail-transfer-low | /peer0.ojk.paynet | caliper_client_cpu_max | percent | 0.16125 | 0.16125 |  |
| calibration | retail-transfer-low | /peer0.ojk.paynet | caliper_client_memory_avg | bytes | 112 | 112 |  |
| calibration | retail-transfer-low | /peer0.ojk.paynet | caliper_client_memory_max | bytes | 115 | 115 |  |
| calibration | retail-transfer-low | /peer0.bi.paynet | caliper_client_cpu_avg | percent | 0.1175 | 0.1175 |  |
| calibration | retail-transfer-low | /peer0.bi.paynet | caliper_client_cpu_max | percent | 0.15875 | 0.15875 |  |
| calibration | retail-transfer-low | /peer0.bi.paynet | caliper_client_memory_avg | bytes | 117 | 117 |  |
| calibration | retail-transfer-low | /peer0.bi.paynet | caliper_client_memory_max | bytes | 120 | 120 |  |
| calibration | retail-transfer-low | /peer0.pjp.paynet | caliper_client_cpu_avg | percent | 0.12 | 0.12 |  |
| calibration | retail-transfer-low | /peer0.pjp.paynet | caliper_client_cpu_max | percent | 0.17 | 0.17 |  |
| calibration | retail-transfer-low | /peer0.pjp.paynet | caliper_client_memory_avg | bytes | 116 | 116 |  |
| calibration | retail-transfer-low | /peer0.pjp.paynet | caliper_client_memory_max | bytes | 118 | 118 |  |
| calibration | retail-transfer-low | /couchdb0.commercial.paynet | caliper_client_cpu_avg | percent | 1.0575 | 1.0575 |  |
| calibration | retail-transfer-low | /couchdb0.commercial.paynet | caliper_client_cpu_max | percent | 2.15875 | 2.15875 |  |
| calibration | retail-transfer-low | /couchdb0.commercial.paynet | caliper_client_memory_avg | bytes | 57.4 | 57.4 |  |
| calibration | retail-transfer-low | /couchdb0.commercial.paynet | caliper_client_memory_max | bytes | 68.4 | 68.4 |  |
| calibration | retail-transfer-low | /couchdb0.himbara.paynet | caliper_client_cpu_avg | percent | 0.9375 | 0.9375 |  |
| calibration | retail-transfer-low | /couchdb0.himbara.paynet | caliper_client_cpu_max | percent | 2.07 | 2.07 |  |
| calibration | retail-transfer-low | /couchdb0.himbara.paynet | caliper_client_memory_avg | bytes | 59.5 | 59.5 |  |
| calibration | retail-transfer-low | /couchdb0.himbara.paynet | caliper_client_memory_max | bytes | 68.3 | 68.3 |  |
| calibration | retail-transfer-low | /couchdb0.bi.paynet | caliper_client_cpu_avg | percent | 1.07375 | 1.07375 |  |
| calibration | retail-transfer-low | /couchdb0.bi.paynet | caliper_client_cpu_max | percent | 2.20125 | 2.20125 |  |
| calibration | retail-transfer-low | /couchdb0.bi.paynet | caliper_client_memory_avg | bytes | 61.9 | 61.9 |  |
| calibration | retail-transfer-low | /couchdb0.bi.paynet | caliper_client_memory_max | bytes | 72.4 | 72.4 |  |
| calibration | retail-transfer-low | /couchdb0.ojk.paynet | caliper_client_cpu_avg | percent | 1.0875 | 1.0875 |  |
| calibration | retail-transfer-low | /couchdb0.ojk.paynet | caliper_client_cpu_max | percent | 2.0875 | 2.0875 |  |
| calibration | retail-transfer-low | /couchdb0.ojk.paynet | caliper_client_memory_avg | bytes | 60.4 | 60.4 |  |
| calibration | retail-transfer-low | /couchdb0.ojk.paynet | caliper_client_memory_max | bytes | 68.8 | 68.8 |  |
| calibration | retail-transfer-low | /orderer.paynet | caliper_client_cpu_avg | percent | 0.06625 | 0.06625 |  |
| calibration | retail-transfer-low | /orderer.paynet | caliper_client_cpu_max | percent | 0.22125 | 0.22125 |  |
| calibration | retail-transfer-low | /orderer.paynet | caliper_client_memory_avg | bytes | 83 | 83 |  |
| calibration | retail-transfer-low | /orderer.paynet | caliper_client_memory_max | bytes | 104 | 104 |  |
| calibration | retail-transfer-low | /couchdb0.pjp.paynet | caliper_client_cpu_avg | percent | 1.055 | 1.055 |  |
| calibration | retail-transfer-low | /couchdb0.pjp.paynet | caliper_client_cpu_max | percent | 1.95625 | 1.95625 |  |
| calibration | retail-transfer-low | /couchdb0.pjp.paynet | caliper_client_memory_avg | bytes | 58.6 | 58.6 |  |
| calibration | retail-transfer-low | /couchdb0.pjp.paynet | caliper_client_memory_max | bytes | 65.2 | 65.2 |  |
| calibration | retail-transfer-low | node caliper(sum) | caliper_client_cpu_avg | percent | 34.69 | 34.69 |  |
| calibration | retail-transfer-low | node caliper(sum) | caliper_client_cpu_max | percent | 67.33 | 67.33 |  |
| calibration | retail-transfer-low | node-exporter:9100 | host_cpu_busy_percent | % | 54.444496531150634 | 76.37750416667126 | 74.45732758621332 |
| calibration | retail-transfer-low | node-exporter:9100 | host_memory_used_bytes | bytes | 5763943823.18644 | 5886230528 | 5871493120 |
| calibration | retail-transfer-low | node-exporter:9100 | host_read_iops | operations_per_second | 13.543997462731808 | 94.53571428571428 | 67.82586206896545 |
| calibration | retail-transfer-low | node-exporter:9100 | host_write_iops | operations_per_second | 891.6471570800301 | 2692.428571428571 | 2434.265517241379 |
| calibration | retail-transfer-low | node-exporter:9100 | host_read_await_ms | milliseconds_per_operation | 0.17884485927388782 | 1.277777777779142 | 0.491981132074594 |
| calibration | retail-transfer-low | node-exporter:9100 | host_write_await_ms | milliseconds_per_operation | 1.8031779222710953 | 6.482911955278878 | 4.609176274833603 |
| calibration | retail-transfer-low | /peer0.pjp.paynet | caliper_client_cpu_avg | percent | 0.12875 | 0.12875 |  |
| calibration | retail-transfer-low | /peer0.pjp.paynet | caliper_client_cpu_max | percent | 0.17125 | 0.17125 |  |
| calibration | retail-transfer-low | /peer0.pjp.paynet | caliper_client_memory_avg | bytes | 119 | 119 |  |
| calibration | retail-transfer-low | /peer0.pjp.paynet | caliper_client_memory_max | bytes | 123 | 123 |  |
| calibration | retail-transfer-low | /peer0.himbara.paynet | caliper_client_cpu_avg | percent | 0.3775 | 0.3775 |  |
| calibration | retail-transfer-low | /peer0.himbara.paynet | caliper_client_cpu_max | percent | 0.4775 | 0.4775 |  |
| calibration | retail-transfer-low | /peer0.himbara.paynet | caliper_client_memory_avg | bytes | 121 | 121 |  |
| calibration | retail-transfer-low | /peer0.himbara.paynet | caliper_client_memory_max | bytes | 127 | 127 |  |
| calibration | retail-transfer-low | /peer0.ojk.paynet | caliper_client_cpu_avg | percent | 0.12375 | 0.12375 |  |
| calibration | retail-transfer-low | /peer0.ojk.paynet | caliper_client_cpu_max | percent | 0.19 | 0.19 |  |
| calibration | retail-transfer-low | /peer0.ojk.paynet | caliper_client_memory_avg | bytes | 111 | 111 |  |
| calibration | retail-transfer-low | /peer0.ojk.paynet | caliper_client_memory_max | bytes | 113 | 113 |  |
| calibration | retail-transfer-low | /peer0.commercial.paynet | caliper_client_cpu_avg | percent | 0.125 | 0.125 |  |
| calibration | retail-transfer-low | /peer0.commercial.paynet | caliper_client_cpu_max | percent | 0.19125 | 0.19125 |  |
| calibration | retail-transfer-low | /peer0.commercial.paynet | caliper_client_memory_avg | bytes | 115 | 115 |  |
| calibration | retail-transfer-low | /peer0.commercial.paynet | caliper_client_memory_max | bytes | 121 | 121 |  |
| calibration | retail-transfer-low | /peer0.bi.paynet | caliper_client_cpu_avg | percent | 0.1275 | 0.1275 |  |
| calibration | retail-transfer-low | /peer0.bi.paynet | caliper_client_cpu_max | percent | 0.1825 | 0.1825 |  |
| calibration | retail-transfer-low | /peer0.bi.paynet | caliper_client_memory_avg | bytes | 115 | 115 |  |
| calibration | retail-transfer-low | /peer0.bi.paynet | caliper_client_memory_max | bytes | 119 | 119 |  |
| calibration | retail-transfer-low | /couchdb0.ojk.paynet | caliper_client_cpu_avg | percent | 1.0675 | 1.0675 |  |
| calibration | retail-transfer-low | /couchdb0.ojk.paynet | caliper_client_cpu_max | percent | 2.06125 | 2.06125 |  |
| calibration | retail-transfer-low | /couchdb0.ojk.paynet | caliper_client_memory_avg | bytes | 59.7 | 59.7 |  |
| calibration | retail-transfer-low | /couchdb0.ojk.paynet | caliper_client_memory_max | bytes | 69.9 | 69.9 |  |
| calibration | retail-transfer-low | /couchdb0.bi.paynet | caliper_client_cpu_avg | percent | 1.06875 | 1.06875 |  |
| calibration | retail-transfer-low | /couchdb0.bi.paynet | caliper_client_cpu_max | percent | 2.2525 | 2.2525 |  |
| calibration | retail-transfer-low | /couchdb0.bi.paynet | caliper_client_memory_avg | bytes | 59.3 | 59.3 |  |
| calibration | retail-transfer-low | /couchdb0.bi.paynet | caliper_client_memory_max | bytes | 67.7 | 67.7 |  |
| calibration | retail-transfer-low | /couchdb0.himbara.paynet | caliper_client_cpu_avg | percent | 1.01 | 1.01 |  |
| calibration | retail-transfer-low | /couchdb0.himbara.paynet | caliper_client_cpu_max | percent | 2.53375 | 2.53375 |  |
| calibration | retail-transfer-low | /couchdb0.himbara.paynet | caliper_client_memory_avg | bytes | 59.6 | 59.6 |  |
| calibration | retail-transfer-low | /couchdb0.himbara.paynet | caliper_client_memory_max | bytes | 73.8 | 73.8 |  |
| calibration | retail-transfer-low | /orderer.paynet | caliper_client_cpu_avg | percent | 0.06375 | 0.06375 |  |
| calibration | retail-transfer-low | /orderer.paynet | caliper_client_cpu_max | percent | 0.09125 | 0.09125 |  |
| calibration | retail-transfer-low | /orderer.paynet | caliper_client_memory_avg | bytes | 62.4 | 62.4 |  |
| calibration | retail-transfer-low | /orderer.paynet | caliper_client_memory_max | bytes | 82.1 | 82.1 |  |
| calibration | retail-transfer-low | /couchdb0.pjp.paynet | caliper_client_cpu_avg | percent | 1.0475 | 1.0475 |  |
| calibration | retail-transfer-low | /couchdb0.pjp.paynet | caliper_client_cpu_max | percent | 2.025 | 2.025 |  |
| calibration | retail-transfer-low | /couchdb0.pjp.paynet | caliper_client_memory_avg | bytes | 59.9 | 59.9 |  |
| calibration | retail-transfer-low | /couchdb0.pjp.paynet | caliper_client_memory_max | bytes | 69.8 | 69.8 |  |
| calibration | retail-transfer-low | /couchdb0.commercial.paynet | caliper_client_cpu_avg | percent | 1.0825 | 1.0825 |  |
| calibration | retail-transfer-low | /couchdb0.commercial.paynet | caliper_client_cpu_max | percent | 2.3775 | 2.3775 |  |
| calibration | retail-transfer-low | /couchdb0.commercial.paynet | caliper_client_memory_avg | bytes | 61.9 | 61.9 |  |
| calibration | retail-transfer-low | /couchdb0.commercial.paynet | caliper_client_memory_max | bytes | 72.2 | 72.2 |  |
| calibration | retail-transfer-low | node caliper(sum) | caliper_client_cpu_avg | percent | 34.98 | 34.98 |  |
| calibration | retail-transfer-low | node caliper(sum) | caliper_client_cpu_max | percent | 64 | 64 |  |
| calibration | retail-transfer-low | node-exporter:9100 | host_cpu_busy_percent | % | 55.88974230665862 | 74.43965517241254 | 73.60415183034715 |
| calibration | retail-transfer-low | node-exporter:9100 | host_memory_used_bytes | bytes | 5561580110.101695 | 5899497472 | 5655701913.599999 |
| calibration | retail-transfer-low | node-exporter:9100 | host_read_iops | operations_per_second | 3.8589128303050426 | 10.758620689655173 | 9.352032019704433 |
| calibration | retail-transfer-low | node-exporter:9100 | host_write_iops | operations_per_second | 911.033663871897 | 2541.8965517241377 | 2411.1155172413796 |
| calibration | retail-transfer-low | node-exporter:9100 | host_read_await_ms | milliseconds_per_operation | 0.24673002389368648 | 1.056338028168587 | 0.8480658967941499 |
| calibration | retail-transfer-low | node-exporter:9100 | host_write_await_ms | milliseconds_per_operation | 1.6266184426457055 | 9.963344441078497 | 5.462752655486188 |
| calibration | retail-transfer-low | /peer0.himbara.paynet | caliper_client_cpu_avg | percent | 0.36375 | 0.36375 |  |
| calibration | retail-transfer-low | /peer0.himbara.paynet | caliper_client_cpu_max | percent | 0.4575 | 0.4575 |  |
| calibration | retail-transfer-low | /peer0.himbara.paynet | caliper_client_memory_avg | bytes | 116 | 116 |  |
| calibration | retail-transfer-low | /peer0.himbara.paynet | caliper_client_memory_max | bytes | 121 | 121 |  |
| calibration | retail-transfer-low | /peer0.ojk.paynet | caliper_client_cpu_avg | percent | 0.12625 | 0.12625 |  |
| calibration | retail-transfer-low | /peer0.ojk.paynet | caliper_client_cpu_max | percent | 0.1925 | 0.1925 |  |
| calibration | retail-transfer-low | /peer0.ojk.paynet | caliper_client_memory_avg | bytes | 110 | 110 |  |
| calibration | retail-transfer-low | /peer0.ojk.paynet | caliper_client_memory_max | bytes | 116 | 116 |  |
| calibration | retail-transfer-low | /peer0.commercial.paynet | caliper_client_cpu_avg | percent | 0.12625 | 0.12625 |  |
| calibration | retail-transfer-low | /peer0.commercial.paynet | caliper_client_cpu_max | percent | 0.16875 | 0.16875 |  |
| calibration | retail-transfer-low | /peer0.commercial.paynet | caliper_client_memory_avg | bytes | 111 | 111 |  |
| calibration | retail-transfer-low | /peer0.commercial.paynet | caliper_client_memory_max | bytes | 115 | 115 |  |
| calibration | retail-transfer-low | /peer0.pjp.paynet | caliper_client_cpu_avg | percent | 0.1225 | 0.1225 |  |
| calibration | retail-transfer-low | /peer0.pjp.paynet | caliper_client_cpu_max | percent | 0.1775 | 0.1775 |  |
| calibration | retail-transfer-low | /peer0.pjp.paynet | caliper_client_memory_avg | bytes | 116 | 116 |  |
| calibration | retail-transfer-low | /peer0.pjp.paynet | caliper_client_memory_max | bytes | 123 | 123 |  |
| calibration | retail-transfer-low | /peer0.bi.paynet | caliper_client_cpu_avg | percent | 0.12625 | 0.12625 |  |
| calibration | retail-transfer-low | /peer0.bi.paynet | caliper_client_cpu_max | percent | 0.265 | 0.265 |  |
| calibration | retail-transfer-low | /peer0.bi.paynet | caliper_client_memory_avg | bytes | 113 | 113 |  |
| calibration | retail-transfer-low | /peer0.bi.paynet | caliper_client_memory_max | bytes | 119 | 119 |  |
| calibration | retail-transfer-low | /couchdb0.commercial.paynet | caliper_client_cpu_avg | percent | 1.06375 | 1.06375 |  |
| calibration | retail-transfer-low | /couchdb0.commercial.paynet | caliper_client_cpu_max | percent | 1.80375 | 1.80375 |  |
| calibration | retail-transfer-low | /couchdb0.commercial.paynet | caliper_client_memory_avg | bytes | 60 | 60 |  |
| calibration | retail-transfer-low | /couchdb0.commercial.paynet | caliper_client_memory_max | bytes | 69.4 | 69.4 |  |
| calibration | retail-transfer-low | /couchdb0.bi.paynet | caliper_client_cpu_avg | percent | 1.0875 | 1.0875 |  |
| calibration | retail-transfer-low | /couchdb0.bi.paynet | caliper_client_cpu_max | percent | 1.915 | 1.915 |  |
| calibration | retail-transfer-low | /couchdb0.bi.paynet | caliper_client_memory_avg | bytes | 60.3 | 60.3 |  |
| calibration | retail-transfer-low | /couchdb0.bi.paynet | caliper_client_memory_max | bytes | 69.8 | 69.8 |  |
| calibration | retail-transfer-low | /couchdb0.himbara.paynet | caliper_client_cpu_avg | percent | 0.97875 | 0.97875 |  |
| calibration | retail-transfer-low | /couchdb0.himbara.paynet | caliper_client_cpu_max | percent | 2.11 | 2.11 |  |
| calibration | retail-transfer-low | /couchdb0.himbara.paynet | caliper_client_memory_avg | bytes | 59.5 | 59.5 |  |
| calibration | retail-transfer-low | /couchdb0.himbara.paynet | caliper_client_memory_max | bytes | 70.5 | 70.5 |  |
| calibration | retail-transfer-low | /orderer.paynet | caliper_client_cpu_avg | percent | 0.07125 | 0.07125 |  |
| calibration | retail-transfer-low | /orderer.paynet | caliper_client_cpu_max | percent | 0.1 | 0.1 |  |
| calibration | retail-transfer-low | /orderer.paynet | caliper_client_memory_avg | bytes | 54.1 | 54.1 |  |
| calibration | retail-transfer-low | /orderer.paynet | caliper_client_memory_max | bytes | 67.2 | 67.2 |  |
| calibration | retail-transfer-low | /couchdb0.ojk.paynet | caliper_client_cpu_avg | percent | 1.06625 | 1.06625 |  |
| calibration | retail-transfer-low | /couchdb0.ojk.paynet | caliper_client_cpu_max | percent | 2.1575 | 2.1575 |  |
| calibration | retail-transfer-low | /couchdb0.ojk.paynet | caliper_client_memory_avg | bytes | 58.5 | 58.5 |  |
| calibration | retail-transfer-low | /couchdb0.ojk.paynet | caliper_client_memory_max | bytes | 67.4 | 67.4 |  |
| calibration | retail-transfer-low | /couchdb0.pjp.paynet | caliper_client_cpu_avg | percent | 1.09625 | 1.09625 |  |
| calibration | retail-transfer-low | /couchdb0.pjp.paynet | caliper_client_cpu_max | percent | 2.15 | 2.15 |  |
| calibration | retail-transfer-low | /couchdb0.pjp.paynet | caliper_client_memory_avg | bytes | 58.4 | 58.4 |  |
| calibration | retail-transfer-low | /couchdb0.pjp.paynet | caliper_client_memory_max | bytes | 67.6 | 67.6 |  |
| calibration | retail-transfer-low | node caliper(sum) | caliper_client_cpu_avg | percent | 34.53 | 34.53 |  |
| calibration | retail-transfer-low | node caliper(sum) | caliper_client_cpu_max | percent | 70 | 70 |  |
| calibration | retail-transfer-low | node-exporter:9100 | host_cpu_busy_percent | % | 54.00946318942442 | 72.04910714285688 | 70.32352216749028 |
| calibration | retail-transfer-low | node-exporter:9100 | host_memory_used_bytes | bytes | 5559241571.79661 | 5690744832 | 5673506406.4 |
| calibration | retail-transfer-low | node-exporter:9100 | host_read_iops | operations_per_second | 1.198252046977829 | 4.655172413793103 | 4.516579483917755 |
| calibration | retail-transfer-low | node-exporter:9100 | host_write_iops | operations_per_second | 888.1189467471338 | 2468.7241379310344 | 2379.7379310344827 |
| calibration | retail-transfer-low | node-exporter:9100 | host_read_await_ms | milliseconds_per_operation | 0.14030719728220054 | 0.9999999999990905 | 0.3935461956528693 |
| calibration | retail-transfer-low | node-exporter:9100 | host_write_await_ms | milliseconds_per_operation | 1.9725110338528022 | 6.633521468041634 | 5.748388165204665 |
| calibration | retail-transfer-low | /peer0.pjp.paynet | caliper_client_cpu_avg | percent | 0.12 | 0.12 |  |
| calibration | retail-transfer-low | /peer0.pjp.paynet | caliper_client_cpu_max | percent | 0.16375 | 0.16375 |  |
| calibration | retail-transfer-low | /peer0.pjp.paynet | caliper_client_memory_avg | bytes | 115 | 115 |  |
| calibration | retail-transfer-low | /peer0.pjp.paynet | caliper_client_memory_max | bytes | 120 | 120 |  |
| calibration | retail-transfer-low | /peer0.ojk.paynet | caliper_client_cpu_avg | percent | 0.12125 | 0.12125 |  |
| calibration | retail-transfer-low | /peer0.ojk.paynet | caliper_client_cpu_max | percent | 0.18 | 0.18 |  |
| calibration | retail-transfer-low | /peer0.ojk.paynet | caliper_client_memory_avg | bytes | 114 | 114 |  |
| calibration | retail-transfer-low | /peer0.ojk.paynet | caliper_client_memory_max | bytes | 119 | 119 |  |
| calibration | retail-transfer-low | /peer0.bi.paynet | caliper_client_cpu_avg | percent | 0.12 | 0.12 |  |
| calibration | retail-transfer-low | /peer0.bi.paynet | caliper_client_cpu_max | percent | 0.16 | 0.16 |  |
| calibration | retail-transfer-low | /peer0.bi.paynet | caliper_client_memory_avg | bytes | 116 | 116 |  |
| calibration | retail-transfer-low | /peer0.bi.paynet | caliper_client_memory_max | bytes | 122 | 122 |  |
| calibration | retail-transfer-low | /peer0.commercial.paynet | caliper_client_cpu_avg | percent | 0.11875 | 0.11875 |  |
| calibration | retail-transfer-low | /peer0.commercial.paynet | caliper_client_cpu_max | percent | 0.17125 | 0.17125 |  |
| calibration | retail-transfer-low | /peer0.commercial.paynet | caliper_client_memory_avg | bytes | 115 | 115 |  |
| calibration | retail-transfer-low | /peer0.commercial.paynet | caliper_client_memory_max | bytes | 122 | 122 |  |
| calibration | retail-transfer-low | /peer0.himbara.paynet | caliper_client_cpu_avg | percent | 0.36125 | 0.36125 |  |
| calibration | retail-transfer-low | /peer0.himbara.paynet | caliper_client_cpu_max | percent | 0.4675 | 0.4675 |  |
| calibration | retail-transfer-low | /peer0.himbara.paynet | caliper_client_memory_avg | bytes | 119 | 119 |  |
| calibration | retail-transfer-low | /peer0.himbara.paynet | caliper_client_memory_max | bytes | 123 | 123 |  |
| calibration | retail-transfer-low | /couchdb0.himbara.paynet | caliper_client_cpu_avg | percent | 0.97125 | 0.97125 |  |
| calibration | retail-transfer-low | /couchdb0.himbara.paynet | caliper_client_cpu_max | percent | 1.9625 | 1.9625 |  |
| calibration | retail-transfer-low | /couchdb0.himbara.paynet | caliper_client_memory_avg | bytes | 57 | 57 |  |
| calibration | retail-transfer-low | /couchdb0.himbara.paynet | caliper_client_memory_max | bytes | 65.7 | 65.7 |  |
| calibration | retail-transfer-low | /couchdb0.commercial.paynet | caliper_client_cpu_avg | percent | 1.08875 | 1.08875 |  |
| calibration | retail-transfer-low | /couchdb0.commercial.paynet | caliper_client_cpu_max | percent | 2.12375 | 2.12375 |  |
| calibration | retail-transfer-low | /couchdb0.commercial.paynet | caliper_client_memory_avg | bytes | 57.7 | 57.7 |  |
| calibration | retail-transfer-low | /couchdb0.commercial.paynet | caliper_client_memory_max | bytes | 67.1 | 67.1 |  |
| calibration | retail-transfer-low | /couchdb0.ojk.paynet | caliper_client_cpu_avg | percent | 1.095 | 1.095 |  |
| calibration | retail-transfer-low | /couchdb0.ojk.paynet | caliper_client_cpu_max | percent | 2.07 | 2.07 |  |
| calibration | retail-transfer-low | /couchdb0.ojk.paynet | caliper_client_memory_avg | bytes | 56.3 | 56.3 |  |
| calibration | retail-transfer-low | /couchdb0.ojk.paynet | caliper_client_memory_max | bytes | 66.8 | 66.8 |  |
| calibration | retail-transfer-low | /orderer.paynet | caliper_client_cpu_avg | percent | 0.06875 | 0.06875 |  |
| calibration | retail-transfer-low | /orderer.paynet | caliper_client_cpu_max | percent | 0.08625 | 0.08625 |  |
| calibration | retail-transfer-low | /orderer.paynet | caliper_client_memory_avg | bytes | 53.8 | 53.8 |  |
| calibration | retail-transfer-low | /orderer.paynet | caliper_client_memory_max | bytes | 71.1 | 71.1 |  |
| calibration | retail-transfer-low | /couchdb0.bi.paynet | caliper_client_cpu_avg | percent | 1.06625 | 1.06625 |  |
| calibration | retail-transfer-low | /couchdb0.bi.paynet | caliper_client_cpu_max | percent | 2.22375 | 2.22375 |  |
| calibration | retail-transfer-low | /couchdb0.bi.paynet | caliper_client_memory_avg | bytes | 56.3 | 56.3 |  |
| calibration | retail-transfer-low | /couchdb0.bi.paynet | caliper_client_memory_max | bytes | 65.4 | 65.4 |  |
| calibration | retail-transfer-low | /couchdb0.pjp.paynet | caliper_client_cpu_avg | percent | 1.04125 | 1.04125 |  |
| calibration | retail-transfer-low | /couchdb0.pjp.paynet | caliper_client_cpu_max | percent | 1.72125 | 1.72125 |  |
| calibration | retail-transfer-low | /couchdb0.pjp.paynet | caliper_client_memory_avg | bytes | 57.3 | 57.3 |  |
| calibration | retail-transfer-low | /couchdb0.pjp.paynet | caliper_client_memory_max | bytes | 67.6 | 67.6 |  |
| calibration | retail-transfer-low | node caliper(sum) | caliper_client_cpu_avg | percent | 34.83 | 34.83 |  |
| calibration | retail-transfer-low | node caliper(sum) | caliper_client_cpu_max | percent | 69 | 69 |  |
| calibration | retail-transfer-low | node-exporter:9100 | host_cpu_busy_percent | % | 54.10259292710298 | 72.44127857142959 | 71.82327586207411 |
| calibration | retail-transfer-low | node-exporter:9100 | host_memory_used_bytes | bytes | 5614871847.050847 | 5739118592 | 5715095961.6 |
| calibration | retail-transfer-low | node-exporter:9100 | host_read_iops | operations_per_second | 1.4412180926905624 | 6.0344827586206895 | 5.931034482758621 |
| calibration | retail-transfer-low | node-exporter:9100 | host_write_iops | operations_per_second | 942.4098004395863 | 2673.862068965517 | 2487.706896551724 |
| calibration | retail-transfer-low | node-exporter:9100 | host_read_await_ms | milliseconds_per_operation | 0.11230306165258334 | 1.2857142857163646 | 0.22161538461692587 |
| calibration | retail-transfer-low | node-exporter:9100 | host_write_await_ms | milliseconds_per_operation | 1.39215936257413 | 5.371658479250093 | 4.206024822450358 |
| calibration | retail-transfer-low | /peer0.himbara.paynet | caliper_client_cpu_avg | percent | 0.34625 | 0.34625 |  |
| calibration | retail-transfer-low | /peer0.himbara.paynet | caliper_client_cpu_max | percent | 0.42875 | 0.42875 |  |
| calibration | retail-transfer-low | /peer0.himbara.paynet | caliper_client_memory_avg | bytes | 123 | 123 |  |
| calibration | retail-transfer-low | /peer0.himbara.paynet | caliper_client_memory_max | bytes | 129 | 129 |  |
| calibration | retail-transfer-low | /peer0.bi.paynet | caliper_client_cpu_avg | percent | 0.11375 | 0.11375 |  |
| calibration | retail-transfer-low | /peer0.bi.paynet | caliper_client_cpu_max | percent | 0.16 | 0.16 |  |
| calibration | retail-transfer-low | /peer0.bi.paynet | caliper_client_memory_avg | bytes | 113 | 113 |  |
| calibration | retail-transfer-low | /peer0.bi.paynet | caliper_client_memory_max | bytes | 117 | 117 |  |
| calibration | retail-transfer-low | /peer0.commercial.paynet | caliper_client_cpu_avg | percent | 0.11125 | 0.11125 |  |
| calibration | retail-transfer-low | /peer0.commercial.paynet | caliper_client_cpu_max | percent | 0.155 | 0.155 |  |
| calibration | retail-transfer-low | /peer0.commercial.paynet | caliper_client_memory_avg | bytes | 114 | 114 |  |
| calibration | retail-transfer-low | /peer0.commercial.paynet | caliper_client_memory_max | bytes | 120 | 120 |  |
| calibration | retail-transfer-low | /peer0.ojk.paynet | caliper_client_cpu_avg | percent | 0.12 | 0.12 |  |
| calibration | retail-transfer-low | /peer0.ojk.paynet | caliper_client_cpu_max | percent | 0.1625 | 0.1625 |  |
| calibration | retail-transfer-low | /peer0.ojk.paynet | caliper_client_memory_avg | bytes | 117 | 117 |  |
| calibration | retail-transfer-low | /peer0.ojk.paynet | caliper_client_memory_max | bytes | 121 | 121 |  |
| calibration | retail-transfer-low | /peer0.pjp.paynet | caliper_client_cpu_avg | percent | 0.115 | 0.115 |  |
| calibration | retail-transfer-low | /peer0.pjp.paynet | caliper_client_cpu_max | percent | 0.16 | 0.16 |  |
| calibration | retail-transfer-low | /peer0.pjp.paynet | caliper_client_memory_avg | bytes | 115 | 115 |  |
| calibration | retail-transfer-low | /peer0.pjp.paynet | caliper_client_memory_max | bytes | 120 | 120 |  |
| calibration | retail-transfer-low | /couchdb0.bi.paynet | caliper_client_cpu_avg | percent | 1.0375 | 1.0375 |  |
| calibration | retail-transfer-low | /couchdb0.bi.paynet | caliper_client_cpu_max | percent | 1.94375 | 1.94375 |  |
| calibration | retail-transfer-low | /couchdb0.bi.paynet | caliper_client_memory_avg | bytes | 57.8 | 57.8 |  |
| calibration | retail-transfer-low | /couchdb0.bi.paynet | caliper_client_memory_max | bytes | 67.1 | 67.1 |  |
| calibration | retail-transfer-low | /couchdb0.ojk.paynet | caliper_client_cpu_avg | percent | 1.03 | 1.03 |  |
| calibration | retail-transfer-low | /couchdb0.ojk.paynet | caliper_client_cpu_max | percent | 2.06625 | 2.06625 |  |
| calibration | retail-transfer-low | /couchdb0.ojk.paynet | caliper_client_memory_avg | bytes | 55.7 | 55.7 |  |
| calibration | retail-transfer-low | /couchdb0.ojk.paynet | caliper_client_memory_max | bytes | 64.4 | 64.4 |  |
| calibration | retail-transfer-low | /couchdb0.commercial.paynet | caliper_client_cpu_avg | percent | 1.05625 | 1.05625 |  |
| calibration | retail-transfer-low | /couchdb0.commercial.paynet | caliper_client_cpu_max | percent | 2.0875 | 2.0875 |  |
| calibration | retail-transfer-low | /couchdb0.commercial.paynet | caliper_client_memory_avg | bytes | 56.3 | 56.3 |  |
| calibration | retail-transfer-low | /couchdb0.commercial.paynet | caliper_client_memory_max | bytes | 66.3 | 66.3 |  |
| calibration | retail-transfer-low | /couchdb0.pjp.paynet | caliper_client_cpu_avg | percent | 1.035 | 1.035 |  |
| calibration | retail-transfer-low | /couchdb0.pjp.paynet | caliper_client_cpu_max | percent | 1.84625 | 1.84625 |  |
| calibration | retail-transfer-low | /couchdb0.pjp.paynet | caliper_client_memory_avg | bytes | 56.1 | 56.1 |  |
| calibration | retail-transfer-low | /couchdb0.pjp.paynet | caliper_client_memory_max | bytes | 68.5 | 68.5 |  |
| calibration | retail-transfer-low | /orderer.paynet | caliper_client_cpu_avg | percent | 0.06125 | 0.06125 |  |
| calibration | retail-transfer-low | /orderer.paynet | caliper_client_cpu_max | percent | 0.1 | 0.1 |  |
| calibration | retail-transfer-low | /orderer.paynet | caliper_client_memory_avg | bytes | 54.9 | 54.9 |  |
| calibration | retail-transfer-low | /orderer.paynet | caliper_client_memory_max | bytes | 67.8 | 67.8 |  |
| calibration | retail-transfer-low | /couchdb0.himbara.paynet | caliper_client_cpu_avg | percent | 0.945 | 0.945 |  |
| calibration | retail-transfer-low | /couchdb0.himbara.paynet | caliper_client_cpu_max | percent | 2.125 | 2.125 |  |
| calibration | retail-transfer-low | /couchdb0.himbara.paynet | caliper_client_memory_avg | bytes | 57.3 | 57.3 |  |
| calibration | retail-transfer-low | /couchdb0.himbara.paynet | caliper_client_memory_max | bytes | 68.7 | 68.7 |  |
| calibration | retail-transfer-low | node caliper(sum) | caliper_client_cpu_avg | percent | 34.59 | 34.59 |  |
| calibration | retail-transfer-low | node caliper(sum) | caliper_client_cpu_max | percent | 70 | 70 |  |
| calibration | retail-transfer-low | node-exporter:9100 | host_cpu_busy_percent | % | 71.75862780698566 | 95.75891317840299 | 95.55107758620893 |
| calibration | retail-transfer-low | node-exporter:9100 | host_memory_used_bytes | bytes | 5622788166.620689 | 5873688576 | 5745714380.8 |
| calibration | retail-transfer-low | node-exporter:9100 | host_read_iops | operations_per_second | 1.3845901475172708 | 9.689655172413794 | 6.939655172413794 |
| calibration | retail-transfer-low | node-exporter:9100 | host_write_iops | operations_per_second | 1260.6197981943528 | 3525.206896551724 | 3486.75 |
| calibration | retail-transfer-low | node-exporter:9100 | host_read_await_ms | milliseconds_per_operation | 1.3251361857716175 | 9.000000000014552 | 9.000000000014552 |
| calibration | retail-transfer-low | node-exporter:9100 | host_write_await_ms | milliseconds_per_operation | 1.242033374977067 | 3.920141684108539 | 3.430553167274085 |
| calibration | retail-transfer-low | /peer0.ojk.paynet | caliper_client_cpu_avg | percent | 0.1525 | 0.1525 |  |
| calibration | retail-transfer-low | /peer0.ojk.paynet | caliper_client_cpu_max | percent | 0.2125 | 0.2125 |  |
| calibration | retail-transfer-low | /peer0.ojk.paynet | caliper_client_memory_avg | bytes | 113 | 113 |  |
| calibration | retail-transfer-low | /peer0.ojk.paynet | caliper_client_memory_max | bytes | 116 | 116 |  |
| calibration | retail-transfer-low | /peer0.bi.paynet | caliper_client_cpu_avg | percent | 0.155 | 0.155 |  |
| calibration | retail-transfer-low | /peer0.bi.paynet | caliper_client_cpu_max | percent | 0.22 | 0.22 |  |
| calibration | retail-transfer-low | /peer0.bi.paynet | caliper_client_memory_avg | bytes | 114 | 114 |  |
| calibration | retail-transfer-low | /peer0.bi.paynet | caliper_client_memory_max | bytes | 121 | 121 |  |
| calibration | retail-transfer-low | /peer0.pjp.paynet | caliper_client_cpu_avg | percent | 0.1525 | 0.1525 |  |
| calibration | retail-transfer-low | /peer0.pjp.paynet | caliper_client_cpu_max | percent | 0.23625 | 0.23625 |  |
| calibration | retail-transfer-low | /peer0.pjp.paynet | caliper_client_memory_avg | bytes | 115 | 115 |  |
| calibration | retail-transfer-low | /peer0.pjp.paynet | caliper_client_memory_max | bytes | 121 | 121 |  |
| calibration | retail-transfer-low | /peer0.commercial.paynet | caliper_client_cpu_avg | percent | 0.15125 | 0.15125 |  |
| calibration | retail-transfer-low | /peer0.commercial.paynet | caliper_client_cpu_max | percent | 0.20375 | 0.20375 |  |
| calibration | retail-transfer-low | /peer0.commercial.paynet | caliper_client_memory_avg | bytes | 113 | 113 |  |
| calibration | retail-transfer-low | /peer0.commercial.paynet | caliper_client_memory_max | bytes | 119 | 119 |  |
| calibration | retail-transfer-low | /peer0.himbara.paynet | caliper_client_cpu_avg | percent | 0.4475 | 0.4475 |  |
| calibration | retail-transfer-low | /peer0.himbara.paynet | caliper_client_cpu_max | percent | 0.575 | 0.575 |  |
| calibration | retail-transfer-low | /peer0.himbara.paynet | caliper_client_memory_avg | bytes | 121 | 121 |  |
| calibration | retail-transfer-low | /peer0.himbara.paynet | caliper_client_memory_max | bytes | 128 | 128 |  |
| calibration | retail-transfer-low | /couchdb0.commercial.paynet | caliper_client_cpu_avg | percent | 1.52125 | 1.52125 |  |
| calibration | retail-transfer-low | /couchdb0.commercial.paynet | caliper_client_cpu_max | percent | 2.51875 | 2.51875 |  |
| calibration | retail-transfer-low | /couchdb0.commercial.paynet | caliper_client_memory_avg | bytes | 59.7 | 59.7 |  |
| calibration | retail-transfer-low | /couchdb0.commercial.paynet | caliper_client_memory_max | bytes | 71.9 | 71.9 |  |
| calibration | retail-transfer-low | /couchdb0.bi.paynet | caliper_client_cpu_avg | percent | 1.5825 | 1.5825 |  |
| calibration | retail-transfer-low | /couchdb0.bi.paynet | caliper_client_cpu_max | percent | 2.585 | 2.585 |  |
| calibration | retail-transfer-low | /couchdb0.bi.paynet | caliper_client_memory_avg | bytes | 60.1 | 60.1 |  |
| calibration | retail-transfer-low | /couchdb0.bi.paynet | caliper_client_memory_max | bytes | 73.3 | 73.3 |  |
| calibration | retail-transfer-low | /couchdb0.ojk.paynet | caliper_client_cpu_avg | percent | 1.55875 | 1.55875 |  |
| calibration | retail-transfer-low | /couchdb0.ojk.paynet | caliper_client_cpu_max | percent | 2.82375 | 2.82375 |  |
| calibration | retail-transfer-low | /couchdb0.ojk.paynet | caliper_client_memory_avg | bytes | 60.5 | 60.5 |  |
| calibration | retail-transfer-low | /couchdb0.ojk.paynet | caliper_client_memory_max | bytes | 72 | 72 |  |
| calibration | retail-transfer-low | /couchdb0.pjp.paynet | caliper_client_cpu_avg | percent | 1.4925 | 1.4925 |  |
| calibration | retail-transfer-low | /couchdb0.pjp.paynet | caliper_client_cpu_max | percent | 2.47 | 2.47 |  |
| calibration | retail-transfer-low | /couchdb0.pjp.paynet | caliper_client_memory_avg | bytes | 59.6 | 59.6 |  |
| calibration | retail-transfer-low | /couchdb0.pjp.paynet | caliper_client_memory_max | bytes | 70.5 | 70.5 |  |
| calibration | retail-transfer-low | /couchdb0.himbara.paynet | caliper_client_cpu_avg | percent | 1.3575 | 1.3575 |  |
| calibration | retail-transfer-low | /couchdb0.himbara.paynet | caliper_client_cpu_max | percent | 2.5175 | 2.5175 |  |
| calibration | retail-transfer-low | /couchdb0.himbara.paynet | caliper_client_memory_avg | bytes | 60.9 | 60.9 |  |
| calibration | retail-transfer-low | /couchdb0.himbara.paynet | caliper_client_memory_max | bytes | 77 | 77 |  |
| calibration | retail-transfer-low | /orderer.paynet | caliper_client_cpu_avg | percent | 0.09875 | 0.09875 |  |
| calibration | retail-transfer-low | /orderer.paynet | caliper_client_cpu_max | percent | 0.14125 | 0.14125 |  |
| calibration | retail-transfer-low | /orderer.paynet | caliper_client_memory_avg | bytes | 63.2 | 63.2 |  |
| calibration | retail-transfer-low | /orderer.paynet | caliper_client_memory_max | bytes | 75.1 | 75.1 |  |
| calibration | retail-transfer-low | node caliper(sum) | caliper_client_cpu_avg | percent | 47.67 | 47.67 |  |
| calibration | retail-transfer-low | node caliper(sum) | caliper_client_cpu_max | percent | 102 | 102 |  |
| calibration | retail-transfer-low | node-exporter:9100 | host_cpu_busy_percent | % | 72.40949262256166 | 97.78017241379561 | 97.73316742610965 |
| calibration | retail-transfer-low | node-exporter:9100 | host_memory_used_bytes | bytes | 5603205120 | 5734805504 | 5726735974.4 |
| calibration | retail-transfer-low | node-exporter:9100 | host_read_iops | operations_per_second | 0.31139412517586024 | 2.206896551724138 | 1.0344827586206897 |
| calibration | retail-transfer-low | node-exporter:9100 | host_write_iops | operations_per_second | 1292.8689629190567 | 3657.344827586207 | 3552.0862068965516 |
| calibration | retail-transfer-low | node-exporter:9100 | host_read_await_ms | milliseconds_per_operation | 0.5343717304734367 | 7.000000000005002 | 1.749999999980501 |
| calibration | retail-transfer-low | node-exporter:9100 | host_write_await_ms | milliseconds_per_operation | 1.6384466570741953 | 6.268881033371145 | 5.5601883421594644 |
| calibration | retail-transfer-low | /peer0.himbara.paynet | caliper_client_cpu_avg | percent | 0.4225 | 0.4225 |  |
| calibration | retail-transfer-low | /peer0.himbara.paynet | caliper_client_cpu_max | percent | 0.53125 | 0.53125 |  |
| calibration | retail-transfer-low | /peer0.himbara.paynet | caliper_client_memory_avg | bytes | 125 | 125 |  |
| calibration | retail-transfer-low | /peer0.himbara.paynet | caliper_client_memory_max | bytes | 132 | 132 |  |
| calibration | retail-transfer-low | /peer0.bi.paynet | caliper_client_cpu_avg | percent | 0.15125 | 0.15125 |  |
| calibration | retail-transfer-low | /peer0.bi.paynet | caliper_client_cpu_max | percent | 0.22625 | 0.22625 |  |
| calibration | retail-transfer-low | /peer0.bi.paynet | caliper_client_memory_avg | bytes | 115 | 115 |  |
| calibration | retail-transfer-low | /peer0.bi.paynet | caliper_client_memory_max | bytes | 119 | 119 |  |
| calibration | retail-transfer-low | /peer0.commercial.paynet | caliper_client_cpu_avg | percent | 0.1475 | 0.1475 |  |
| calibration | retail-transfer-low | /peer0.commercial.paynet | caliper_client_cpu_max | percent | 0.21875 | 0.21875 |  |
| calibration | retail-transfer-low | /peer0.commercial.paynet | caliper_client_memory_avg | bytes | 114 | 114 |  |
| calibration | retail-transfer-low | /peer0.commercial.paynet | caliper_client_memory_max | bytes | 118 | 118 |  |
| calibration | retail-transfer-low | /peer0.pjp.paynet | caliper_client_cpu_avg | percent | 0.1575 | 0.1575 |  |
| calibration | retail-transfer-low | /peer0.pjp.paynet | caliper_client_cpu_max | percent | 0.22125 | 0.22125 |  |
| calibration | retail-transfer-low | /peer0.pjp.paynet | caliper_client_memory_avg | bytes | 115 | 115 |  |
| calibration | retail-transfer-low | /peer0.pjp.paynet | caliper_client_memory_max | bytes | 119 | 119 |  |
| calibration | retail-transfer-low | /peer0.ojk.paynet | caliper_client_cpu_avg | percent | 0.15 | 0.15 |  |
| calibration | retail-transfer-low | /peer0.ojk.paynet | caliper_client_cpu_max | percent | 0.20875 | 0.20875 |  |
| calibration | retail-transfer-low | /peer0.ojk.paynet | caliper_client_memory_avg | bytes | 115 | 115 |  |
| calibration | retail-transfer-low | /peer0.ojk.paynet | caliper_client_memory_max | bytes | 118 | 118 |  |
| calibration | retail-transfer-low | /couchdb0.ojk.paynet | caliper_client_cpu_avg | percent | 1.5 | 1.5 |  |
| calibration | retail-transfer-low | /couchdb0.ojk.paynet | caliper_client_cpu_max | percent | 2.47875 | 2.47875 |  |
| calibration | retail-transfer-low | /couchdb0.ojk.paynet | caliper_client_memory_avg | bytes | 60.7 | 60.7 |  |
| calibration | retail-transfer-low | /couchdb0.ojk.paynet | caliper_client_memory_max | bytes | 73.8 | 73.8 |  |
| calibration | retail-transfer-low | /orderer.paynet | caliper_client_cpu_avg | percent | 0.09625 | 0.09625 |  |
| calibration | retail-transfer-low | /orderer.paynet | caliper_client_cpu_max | percent | 0.13375 | 0.13375 |  |
| calibration | retail-transfer-low | /orderer.paynet | caliper_client_memory_avg | bytes | 61.8 | 61.8 |  |
| calibration | retail-transfer-low | /orderer.paynet | caliper_client_memory_max | bytes | 77.8 | 77.8 |  |
| calibration | retail-transfer-low | /couchdb0.himbara.paynet | caliper_client_cpu_avg | percent | 1.3825 | 1.3825 |  |
| calibration | retail-transfer-low | /couchdb0.himbara.paynet | caliper_client_cpu_max | percent | 2.09125 | 2.09125 |  |
| calibration | retail-transfer-low | /couchdb0.himbara.paynet | caliper_client_memory_avg | bytes | 61.1 | 61.1 |  |
| calibration | retail-transfer-low | /couchdb0.himbara.paynet | caliper_client_memory_max | bytes | 72.2 | 72.2 |  |
| calibration | retail-transfer-low | /couchdb0.commercial.paynet | caliper_client_cpu_avg | percent | 1.54 | 1.54 |  |
| calibration | retail-transfer-low | /couchdb0.commercial.paynet | caliper_client_cpu_max | percent | 2.56625 | 2.56625 |  |
| calibration | retail-transfer-low | /couchdb0.commercial.paynet | caliper_client_memory_avg | bytes | 62.5 | 62.5 |  |
| calibration | retail-transfer-low | /couchdb0.commercial.paynet | caliper_client_memory_max | bytes | 74 | 74 |  |
| calibration | retail-transfer-low | /couchdb0.pjp.paynet | caliper_client_cpu_avg | percent | 1.55375 | 1.55375 |  |
| calibration | retail-transfer-low | /couchdb0.pjp.paynet | caliper_client_cpu_max | percent | 2.76 | 2.76 |  |
| calibration | retail-transfer-low | /couchdb0.pjp.paynet | caliper_client_memory_avg | bytes | 59.7 | 59.7 |  |
| calibration | retail-transfer-low | /couchdb0.pjp.paynet | caliper_client_memory_max | bytes | 73.3 | 73.3 |  |
| calibration | retail-transfer-low | /couchdb0.bi.paynet | caliper_client_cpu_avg | percent | 1.47625 | 1.47625 |  |
| calibration | retail-transfer-low | /couchdb0.bi.paynet | caliper_client_cpu_max | percent | 2.6075 | 2.6075 |  |
| calibration | retail-transfer-low | /couchdb0.bi.paynet | caliper_client_memory_avg | bytes | 61.4 | 61.4 |  |
| calibration | retail-transfer-low | /couchdb0.bi.paynet | caliper_client_memory_max | bytes | 73.5 | 73.5 |  |
| calibration | retail-transfer-low | node caliper(sum) | caliper_client_cpu_avg | percent | 47.89 | 47.89 |  |
| calibration | retail-transfer-low | node caliper(sum) | caliper_client_cpu_max | percent | 120 | 120 |  |
| calibration | retail-transfer-low | node-exporter:9100 | host_cpu_busy_percent | % | 71.52978920004414 | 97.40699553571962 | 97.33502924876942 |
| calibration | retail-transfer-low | node-exporter:9100 | host_memory_used_bytes | bytes | 5574663556.413794 | 5681074176 | 5665417830.4 |
| calibration | retail-transfer-low | node-exporter:9100 | host_read_iops | operations_per_second | 21.013391905158308 | 91.78571428571428 | 90.58832801724137 |
| calibration | retail-transfer-low | node-exporter:9100 | host_write_iops | operations_per_second | 1346.4077414665865 | 3879.7586206896553 | 3760.3965517241377 |
| calibration | retail-transfer-low | node-exporter:9100 | host_read_await_ms | milliseconds_per_operation | 0.9926738798684989 | 5.9999999999718066 | 4.7499999999729425 |
| calibration | retail-transfer-low | node-exporter:9100 | host_write_await_ms | milliseconds_per_operation | 1.6721927771653302 | 6.047032057505436 | 5.821352065022823 |
| calibration | retail-transfer-low | /peer0.himbara.paynet | caliper_client_cpu_avg | percent | 0.45375 | 0.45375 |  |
| calibration | retail-transfer-low | /peer0.himbara.paynet | caliper_client_cpu_max | percent | 0.60375 | 0.60375 |  |
| calibration | retail-transfer-low | /peer0.himbara.paynet | caliper_client_memory_avg | bytes | 127 | 127 |  |
| calibration | retail-transfer-low | /peer0.himbara.paynet | caliper_client_memory_max | bytes | 136 | 136 |  |
| calibration | retail-transfer-low | /peer0.commercial.paynet | caliper_client_cpu_avg | percent | 0.15125 | 0.15125 |  |
| calibration | retail-transfer-low | /peer0.commercial.paynet | caliper_client_cpu_max | percent | 0.2425 | 0.2425 |  |
| calibration | retail-transfer-low | /peer0.commercial.paynet | caliper_client_memory_avg | bytes | 112 | 112 |  |
| calibration | retail-transfer-low | /peer0.commercial.paynet | caliper_client_memory_max | bytes | 120 | 120 |  |
| calibration | retail-transfer-low | /peer0.ojk.paynet | caliper_client_cpu_avg | percent | 0.15375 | 0.15375 |  |
| calibration | retail-transfer-low | /peer0.ojk.paynet | caliper_client_cpu_max | percent | 0.47125 | 0.47125 |  |
| calibration | retail-transfer-low | /peer0.ojk.paynet | caliper_client_memory_avg | bytes | 119 | 119 |  |
| calibration | retail-transfer-low | /peer0.ojk.paynet | caliper_client_memory_max | bytes | 125 | 125 |  |
| calibration | retail-transfer-low | /peer0.bi.paynet | caliper_client_cpu_avg | percent | 0.15375 | 0.15375 |  |
| calibration | retail-transfer-low | /peer0.bi.paynet | caliper_client_cpu_max | percent | 0.23625 | 0.23625 |  |
| calibration | retail-transfer-low | /peer0.bi.paynet | caliper_client_memory_avg | bytes | 116 | 116 |  |
| calibration | retail-transfer-low | /peer0.bi.paynet | caliper_client_memory_max | bytes | 124 | 124 |  |
| calibration | retail-transfer-low | /peer0.pjp.paynet | caliper_client_cpu_avg | percent | 0.15375 | 0.15375 |  |
| calibration | retail-transfer-low | /peer0.pjp.paynet | caliper_client_cpu_max | percent | 0.2175 | 0.2175 |  |
| calibration | retail-transfer-low | /peer0.pjp.paynet | caliper_client_memory_avg | bytes | 114 | 114 |  |
| calibration | retail-transfer-low | /peer0.pjp.paynet | caliper_client_memory_max | bytes | 122 | 122 |  |
| calibration | retail-transfer-low | /couchdb0.commercial.paynet | caliper_client_cpu_avg | percent | 1.55125 | 1.55125 |  |
| calibration | retail-transfer-low | /couchdb0.commercial.paynet | caliper_client_cpu_max | percent | 2.555 | 2.555 |  |
| calibration | retail-transfer-low | /couchdb0.commercial.paynet | caliper_client_memory_avg | bytes | 62.3 | 62.3 |  |
| calibration | retail-transfer-low | /couchdb0.commercial.paynet | caliper_client_memory_max | bytes | 74 | 74 |  |
| calibration | retail-transfer-low | /orderer.paynet | caliper_client_cpu_avg | percent | 0.09625 | 0.09625 |  |
| calibration | retail-transfer-low | /orderer.paynet | caliper_client_cpu_max | percent | 0.1475 | 0.1475 |  |
| calibration | retail-transfer-low | /orderer.paynet | caliper_client_memory_avg | bytes | 60.9 | 60.9 |  |
| calibration | retail-transfer-low | /orderer.paynet | caliper_client_memory_max | bytes | 76.7 | 76.7 |  |
| calibration | retail-transfer-low | /couchdb0.himbara.paynet | caliper_client_cpu_avg | percent | 1.33875 | 1.33875 |  |
| calibration | retail-transfer-low | /couchdb0.himbara.paynet | caliper_client_cpu_max | percent | 2.1725 | 2.1725 |  |
| calibration | retail-transfer-low | /couchdb0.himbara.paynet | caliper_client_memory_avg | bytes | 60.4 | 60.4 |  |
| calibration | retail-transfer-low | /couchdb0.himbara.paynet | caliper_client_memory_max | bytes | 71.5 | 71.5 |  |
| calibration | retail-transfer-low | /couchdb0.ojk.paynet | caliper_client_cpu_avg | percent | 1.4275 | 1.4275 |  |
| calibration | retail-transfer-low | /couchdb0.ojk.paynet | caliper_client_cpu_max | percent | 2.55125 | 2.55125 |  |
| calibration | retail-transfer-low | /couchdb0.ojk.paynet | caliper_client_memory_avg | bytes | 60.5 | 60.5 |  |
| calibration | retail-transfer-low | /couchdb0.ojk.paynet | caliper_client_memory_max | bytes | 72.6 | 72.6 |  |
| calibration | retail-transfer-low | /couchdb0.pjp.paynet | caliper_client_cpu_avg | percent | 1.4675 | 1.4675 |  |
| calibration | retail-transfer-low | /couchdb0.pjp.paynet | caliper_client_cpu_max | percent | 2.5325 | 2.5325 |  |
| calibration | retail-transfer-low | /couchdb0.pjp.paynet | caliper_client_memory_avg | bytes | 60.1 | 60.1 |  |
| calibration | retail-transfer-low | /couchdb0.pjp.paynet | caliper_client_memory_max | bytes | 71 | 71 |  |
| calibration | retail-transfer-low | /couchdb0.bi.paynet | caliper_client_cpu_avg | percent | 1.51375 | 1.51375 |  |
| calibration | retail-transfer-low | /couchdb0.bi.paynet | caliper_client_cpu_max | percent | 2.855 | 2.855 |  |
| calibration | retail-transfer-low | /couchdb0.bi.paynet | caliper_client_memory_avg | bytes | 61.5 | 61.5 |  |
| calibration | retail-transfer-low | /couchdb0.bi.paynet | caliper_client_memory_max | bytes | 74.4 | 74.4 |  |
| calibration | retail-transfer-low | node caliper(sum) | caliper_client_cpu_avg | percent | 48.05 | 48.05 |  |
| calibration | retail-transfer-low | node caliper(sum) | caliper_client_cpu_max | percent | 102.02 | 102.02 |  |
| calibration | retail-transfer-low | node-exporter:9100 | host_cpu_busy_percent | % | 73.5671780721931 | 97.73230982143392 | 97.58188115763177 |
| calibration | retail-transfer-low | node-exporter:9100 | host_memory_used_bytes | bytes | 5592236314.4827585 | 5824704512 | 5678496563.2 |
| calibration | retail-transfer-low | node-exporter:9100 | host_read_iops | operations_per_second | 0.10306699519003022 | 0.3793103448275862 | 0.3448275862068966 |
| calibration | retail-transfer-low | node-exporter:9100 | host_write_iops | operations_per_second | 1333.6870744047699 | 3868.344827586207 | 3736.8793103448274 |
| calibration | retail-transfer-low | node-exporter:9100 | host_read_await_ms | milliseconds_per_operation | 0.10785191819711505 | 0.5000000000071244 | 0.3750000000053433 |
| calibration | retail-transfer-low | node-exporter:9100 | host_write_await_ms | milliseconds_per_operation | 1.2004249858537899 | 5.787939447016471 | 2.911501683135686 |
| calibration | retail-transfer-low | /peer0.commercial.paynet | caliper_client_cpu_avg | percent | 0.15375 | 0.15375 |  |
| calibration | retail-transfer-low | /peer0.commercial.paynet | caliper_client_cpu_max | percent | 0.24375 | 0.24375 |  |
| calibration | retail-transfer-low | /peer0.commercial.paynet | caliper_client_memory_avg | bytes | 112 | 112 |  |
| calibration | retail-transfer-low | /peer0.commercial.paynet | caliper_client_memory_max | bytes | 116 | 116 |  |
| calibration | retail-transfer-low | /peer0.ojk.paynet | caliper_client_cpu_avg | percent | 0.15375 | 0.15375 |  |
| calibration | retail-transfer-low | /peer0.ojk.paynet | caliper_client_cpu_max | percent | 0.24625 | 0.24625 |  |
| calibration | retail-transfer-low | /peer0.ojk.paynet | caliper_client_memory_avg | bytes | 112 | 112 |  |
| calibration | retail-transfer-low | /peer0.ojk.paynet | caliper_client_memory_max | bytes | 117 | 117 |  |
| calibration | retail-transfer-low | /peer0.bi.paynet | caliper_client_cpu_avg | percent | 0.1525 | 0.1525 |  |
| calibration | retail-transfer-low | /peer0.bi.paynet | caliper_client_cpu_max | percent | 0.23125 | 0.23125 |  |
| calibration | retail-transfer-low | /peer0.bi.paynet | caliper_client_memory_avg | bytes | 114 | 114 |  |
| calibration | retail-transfer-low | /peer0.bi.paynet | caliper_client_memory_max | bytes | 118 | 118 |  |
| calibration | retail-transfer-low | /peer0.pjp.paynet | caliper_client_cpu_avg | percent | 0.1525 | 0.1525 |  |
| calibration | retail-transfer-low | /peer0.pjp.paynet | caliper_client_cpu_max | percent | 0.2125 | 0.2125 |  |
| calibration | retail-transfer-low | /peer0.pjp.paynet | caliper_client_memory_avg | bytes | 114 | 114 |  |
| calibration | retail-transfer-low | /peer0.pjp.paynet | caliper_client_memory_max | bytes | 120 | 120 |  |
| calibration | retail-transfer-low | /peer0.himbara.paynet | caliper_client_cpu_avg | percent | 0.425 | 0.425 |  |
| calibration | retail-transfer-low | /peer0.himbara.paynet | caliper_client_cpu_max | percent | 0.5425 | 0.5425 |  |
| calibration | retail-transfer-low | /peer0.himbara.paynet | caliper_client_memory_avg | bytes | 121 | 121 |  |
| calibration | retail-transfer-low | /peer0.himbara.paynet | caliper_client_memory_max | bytes | 133 | 133 |  |
| calibration | retail-transfer-low | /couchdb0.ojk.paynet | caliper_client_cpu_avg | percent | 1.49 | 1.49 |  |
| calibration | retail-transfer-low | /couchdb0.ojk.paynet | caliper_client_cpu_max | percent | 2.635 | 2.635 |  |
| calibration | retail-transfer-low | /couchdb0.ojk.paynet | caliper_client_memory_avg | bytes | 62.1 | 62.1 |  |
| calibration | retail-transfer-low | /couchdb0.ojk.paynet | caliper_client_memory_max | bytes | 71.7 | 71.7 |  |
| calibration | retail-transfer-low | /couchdb0.commercial.paynet | caliper_client_cpu_avg | percent | 1.53875 | 1.53875 |  |
| calibration | retail-transfer-low | /couchdb0.commercial.paynet | caliper_client_cpu_max | percent | 2.59 | 2.59 |  |
| calibration | retail-transfer-low | /couchdb0.commercial.paynet | caliper_client_memory_avg | bytes | 60.9 | 60.9 |  |
| calibration | retail-transfer-low | /couchdb0.commercial.paynet | caliper_client_memory_max | bytes | 71.7 | 71.7 |  |
| calibration | retail-transfer-low | /orderer.paynet | caliper_client_cpu_avg | percent | 0.085 | 0.085 |  |
| calibration | retail-transfer-low | /orderer.paynet | caliper_client_cpu_max | percent | 0.115 | 0.115 |  |
| calibration | retail-transfer-low | /orderer.paynet | caliper_client_memory_avg | bytes | 61.2 | 61.2 |  |
| calibration | retail-transfer-low | /orderer.paynet | caliper_client_memory_max | bytes | 73.8 | 73.8 |  |
| calibration | retail-transfer-low | /couchdb0.bi.paynet | caliper_client_cpu_avg | percent | 1.51125 | 1.51125 |  |
| calibration | retail-transfer-low | /couchdb0.bi.paynet | caliper_client_cpu_max | percent | 2.78875 | 2.78875 |  |
| calibration | retail-transfer-low | /couchdb0.bi.paynet | caliper_client_memory_avg | bytes | 60.9 | 60.9 |  |
| calibration | retail-transfer-low | /couchdb0.bi.paynet | caliper_client_memory_max | bytes | 71.7 | 71.7 |  |
| calibration | retail-transfer-low | /couchdb0.himbara.paynet | caliper_client_cpu_avg | percent | 1.3675 | 1.3675 |  |
| calibration | retail-transfer-low | /couchdb0.himbara.paynet | caliper_client_cpu_max | percent | 2.195 | 2.195 |  |
| calibration | retail-transfer-low | /couchdb0.himbara.paynet | caliper_client_memory_avg | bytes | 61.5 | 61.5 |  |
| calibration | retail-transfer-low | /couchdb0.himbara.paynet | caliper_client_memory_max | bytes | 78.4 | 78.4 |  |
| calibration | retail-transfer-low | /couchdb0.pjp.paynet | caliper_client_cpu_avg | percent | 1.54 | 1.54 |  |
| calibration | retail-transfer-low | /couchdb0.pjp.paynet | caliper_client_cpu_max | percent | 2.58625 | 2.58625 |  |
| calibration | retail-transfer-low | /couchdb0.pjp.paynet | caliper_client_memory_avg | bytes | 59 | 59 |  |
| calibration | retail-transfer-low | /couchdb0.pjp.paynet | caliper_client_memory_max | bytes | 67.4 | 67.4 |  |
| calibration | retail-transfer-low | node caliper(sum) | caliper_client_cpu_avg | percent | 48.02 | 48.02 |  |
| calibration | retail-transfer-low | node caliper(sum) | caliper_client_cpu_max | percent | 114 | 114 |  |
| calibration | retail-transfer-low | node-exporter:9100 | host_cpu_busy_percent | % | 71.8984287730619 | 97.98693013310711 | 97.94302647784335 |
| calibration | retail-transfer-low | node-exporter:9100 | host_memory_used_bytes | bytes | 5617874353.898305 | 5737730048 | 5717916467.2 |
| calibration | retail-transfer-low | node-exporter:9100 | host_read_iops | operations_per_second | 0.14040082253616532 | 0.5862068965517241 | 0.5172413793103449 |
| calibration | retail-transfer-low | node-exporter:9100 | host_write_iops | operations_per_second | 1296.8170872430173 | 3797.2413793103447 | 3638.1362068965514 |
| calibration | retail-transfer-low | node-exporter:9100 | host_read_await_ms | milliseconds_per_operation | 0.11194693337310038 | 0.40000000000190994 | 0.3333333333418725 |
| calibration | retail-transfer-low | node-exporter:9100 | host_write_await_ms | milliseconds_per_operation | 1.3791220102525659 | 4.476990810300863 | 3.759053671427695 |
| calibration | retail-transfer-low | /peer0.himbara.paynet | caliper_client_cpu_avg | percent | 0.465 | 0.465 |  |
| calibration | retail-transfer-low | /peer0.himbara.paynet | caliper_client_cpu_max | percent | 0.6975 | 0.6975 |  |
| calibration | retail-transfer-low | /peer0.himbara.paynet | caliper_client_memory_avg | bytes | 122 | 122 |  |
| calibration | retail-transfer-low | /peer0.himbara.paynet | caliper_client_memory_max | bytes | 130 | 130 |  |
| calibration | retail-transfer-low | /peer0.bi.paynet | caliper_client_cpu_avg | percent | 0.14875 | 0.14875 |  |
| calibration | retail-transfer-low | /peer0.bi.paynet | caliper_client_cpu_max | percent | 0.215 | 0.215 |  |
| calibration | retail-transfer-low | /peer0.bi.paynet | caliper_client_memory_avg | bytes | 115 | 115 |  |
| calibration | retail-transfer-low | /peer0.bi.paynet | caliper_client_memory_max | bytes | 119 | 119 |  |
| calibration | retail-transfer-low | /peer0.commercial.paynet | caliper_client_cpu_avg | percent | 0.14625 | 0.14625 |  |
| calibration | retail-transfer-low | /peer0.commercial.paynet | caliper_client_cpu_max | percent | 0.22125 | 0.22125 |  |
| calibration | retail-transfer-low | /peer0.commercial.paynet | caliper_client_memory_avg | bytes | 114 | 114 |  |
| calibration | retail-transfer-low | /peer0.commercial.paynet | caliper_client_memory_max | bytes | 121 | 121 |  |
| calibration | retail-transfer-low | /peer0.ojk.paynet | caliper_client_cpu_avg | percent | 0.15 | 0.15 |  |
| calibration | retail-transfer-low | /peer0.ojk.paynet | caliper_client_cpu_max | percent | 0.28125 | 0.28125 |  |
| calibration | retail-transfer-low | /peer0.ojk.paynet | caliper_client_memory_avg | bytes | 112 | 112 |  |
| calibration | retail-transfer-low | /peer0.ojk.paynet | caliper_client_memory_max | bytes | 121 | 121 |  |
| calibration | retail-transfer-low | /peer0.pjp.paynet | caliper_client_cpu_avg | percent | 0.155 | 0.155 |  |
| calibration | retail-transfer-low | /peer0.pjp.paynet | caliper_client_cpu_max | percent | 0.22625 | 0.22625 |  |
| calibration | retail-transfer-low | /peer0.pjp.paynet | caliper_client_memory_avg | bytes | 114 | 114 |  |
| calibration | retail-transfer-low | /peer0.pjp.paynet | caliper_client_memory_max | bytes | 117 | 117 |  |
| calibration | retail-transfer-low | /couchdb0.pjp.paynet | caliper_client_cpu_avg | percent | 1.5625 | 1.5625 |  |
| calibration | retail-transfer-low | /couchdb0.pjp.paynet | caliper_client_cpu_max | percent | 3.93375 | 3.93375 |  |
| calibration | retail-transfer-low | /couchdb0.pjp.paynet | caliper_client_memory_avg | bytes | 62.8 | 62.8 |  |
| calibration | retail-transfer-low | /couchdb0.pjp.paynet | caliper_client_memory_max | bytes | 84.4 | 84.4 |  |
| calibration | retail-transfer-low | /couchdb0.bi.paynet | caliper_client_cpu_avg | percent | 1.52 | 1.52 |  |
| calibration | retail-transfer-low | /couchdb0.bi.paynet | caliper_client_cpu_max | percent | 2.2425 | 2.2425 |  |
| calibration | retail-transfer-low | /couchdb0.bi.paynet | caliper_client_memory_avg | bytes | 61.5 | 61.5 |  |
| calibration | retail-transfer-low | /couchdb0.bi.paynet | caliper_client_memory_max | bytes | 70.9 | 70.9 |  |
| calibration | retail-transfer-low | /couchdb0.ojk.paynet | caliper_client_cpu_avg | percent | 1.5475 | 1.5475 |  |
| calibration | retail-transfer-low | /couchdb0.ojk.paynet | caliper_client_cpu_max | percent | 3.4075 | 3.4075 |  |
| calibration | retail-transfer-low | /couchdb0.ojk.paynet | caliper_client_memory_avg | bytes | 62.1 | 62.1 |  |
| calibration | retail-transfer-low | /couchdb0.ojk.paynet | caliper_client_memory_max | bytes | 72.4 | 72.4 |  |
| calibration | retail-transfer-low | /couchdb0.commercial.paynet | caliper_client_cpu_avg | percent | 1.55625 | 1.55625 |  |
| calibration | retail-transfer-low | /couchdb0.commercial.paynet | caliper_client_cpu_max | percent | 2.31 | 2.31 |  |
| calibration | retail-transfer-low | /couchdb0.commercial.paynet | caliper_client_memory_avg | bytes | 61.5 | 61.5 |  |
| calibration | retail-transfer-low | /couchdb0.commercial.paynet | caliper_client_memory_max | bytes | 77.8 | 77.8 |  |
| calibration | retail-transfer-low | /orderer.paynet | caliper_client_cpu_avg | percent | 0.1 | 0.1 |  |
| calibration | retail-transfer-low | /orderer.paynet | caliper_client_cpu_max | percent | 0.145 | 0.145 |  |
| calibration | retail-transfer-low | /orderer.paynet | caliper_client_memory_avg | bytes | 60.9 | 60.9 |  |
| calibration | retail-transfer-low | /orderer.paynet | caliper_client_memory_max | bytes | 73 | 73 |  |
| calibration | retail-transfer-low | /couchdb0.himbara.paynet | caliper_client_cpu_avg | percent | 1.45125 | 1.45125 |  |
| calibration | retail-transfer-low | /couchdb0.himbara.paynet | caliper_client_cpu_max | percent | 2.90375 | 2.90375 |  |
| calibration | retail-transfer-low | /couchdb0.himbara.paynet | caliper_client_memory_avg | bytes | 63.1 | 63.1 |  |
| calibration | retail-transfer-low | /couchdb0.himbara.paynet | caliper_client_memory_max | bytes | 82.5 | 82.5 |  |
| calibration | retail-transfer-low | node caliper(sum) | caliper_client_cpu_avg | percent | 48.23 | 48.23 |  |
| calibration | retail-transfer-low | node caliper(sum) | caliper_client_cpu_max | percent | 100 | 100 |  |
| calibration | retail-transfer-low | node-exporter:9100 | host_cpu_busy_percent | % | 75.85605451107757 | 97.43965517241278 | 97.37078727833399 |
| calibration | retail-transfer-low | node-exporter:9100 | host_memory_used_bytes | bytes | 5656854316.137931 | 5787402240 | 5775893504 |
| calibration | retail-transfer-low | node-exporter:9100 | host_read_iops | operations_per_second | 0.052677852109263415 | 1.3103448275862069 | 0.14932266009852216 |
| calibration | retail-transfer-low | node-exporter:9100 | host_write_iops | operations_per_second | 1391.6944776229577 | 3734.655172413793 | 3640.706896551724 |
| calibration | retail-transfer-low | node-exporter:9100 | host_read_await_ms | milliseconds_per_operation | 0.7822303603849131 | 9.000000000014552 | 9.000000000014552 |
| calibration | retail-transfer-low | node-exporter:9100 | host_write_await_ms | milliseconds_per_operation | 1.9871453195268574 | 9.365312733616335 | 5.964708785881008 |
| calibration | retail-transfer-low | /peer0.himbara.paynet | caliper_client_cpu_avg | percent | 0.495 | 0.495 |  |
| calibration | retail-transfer-low | /peer0.himbara.paynet | caliper_client_cpu_max | percent | 0.64125 | 0.64125 |  |
| calibration | retail-transfer-low | /peer0.himbara.paynet | caliper_client_memory_avg | bytes | 130 | 130 |  |
| calibration | retail-transfer-low | /peer0.himbara.paynet | caliper_client_memory_max | bytes | 139 | 139 |  |
| calibration | retail-transfer-low | /peer0.pjp.paynet | caliper_client_cpu_avg | percent | 0.17625 | 0.17625 |  |
| calibration | retail-transfer-low | /peer0.pjp.paynet | caliper_client_cpu_max | percent | 0.24625 | 0.24625 |  |
| calibration | retail-transfer-low | /peer0.pjp.paynet | caliper_client_memory_avg | bytes | 120 | 120 |  |
| calibration | retail-transfer-low | /peer0.pjp.paynet | caliper_client_memory_max | bytes | 127 | 127 |  |
| calibration | retail-transfer-low | /peer0.ojk.paynet | caliper_client_cpu_avg | percent | 0.1775 | 0.1775 |  |
| calibration | retail-transfer-low | /peer0.ojk.paynet | caliper_client_cpu_max | percent | 0.2375 | 0.2375 |  |
| calibration | retail-transfer-low | /peer0.ojk.paynet | caliper_client_memory_avg | bytes | 114 | 114 |  |
| calibration | retail-transfer-low | /peer0.ojk.paynet | caliper_client_memory_max | bytes | 123 | 123 |  |
| calibration | retail-transfer-low | /peer0.commercial.paynet | caliper_client_cpu_avg | percent | 0.18 | 0.18 |  |
| calibration | retail-transfer-low | /peer0.commercial.paynet | caliper_client_cpu_max | percent | 0.39875 | 0.39875 |  |
| calibration | retail-transfer-low | /peer0.commercial.paynet | caliper_client_memory_avg | bytes | 119 | 119 |  |
| calibration | retail-transfer-low | /peer0.commercial.paynet | caliper_client_memory_max | bytes | 128 | 128 |  |
| calibration | retail-transfer-low | /peer0.bi.paynet | caliper_client_cpu_avg | percent | 0.17875 | 0.17875 |  |
| calibration | retail-transfer-low | /peer0.bi.paynet | caliper_client_cpu_max | percent | 0.26 | 0.26 |  |
| calibration | retail-transfer-low | /peer0.bi.paynet | caliper_client_memory_avg | bytes | 119 | 119 |  |
| calibration | retail-transfer-low | /peer0.bi.paynet | caliper_client_memory_max | bytes | 124 | 124 |  |
| calibration | retail-transfer-low | /couchdb0.himbara.paynet | caliper_client_cpu_avg | percent | 1.45625 | 1.45625 |  |
| calibration | retail-transfer-low | /couchdb0.himbara.paynet | caliper_client_cpu_max | percent | 2.47 | 2.47 |  |
| calibration | retail-transfer-low | /couchdb0.himbara.paynet | caliper_client_memory_avg | bytes | 59.2 | 59.2 |  |
| calibration | retail-transfer-low | /couchdb0.himbara.paynet | caliper_client_memory_max | bytes | 69.5 | 69.5 |  |
| calibration | retail-transfer-low | /orderer.paynet | caliper_client_cpu_avg | percent | 0.1275 | 0.1275 |  |
| calibration | retail-transfer-low | /orderer.paynet | caliper_client_cpu_max | percent | 0.18125 | 0.18125 |  |
| calibration | retail-transfer-low | /orderer.paynet | caliper_client_memory_avg | bytes | 61 | 61 |  |
| calibration | retail-transfer-low | /orderer.paynet | caliper_client_memory_max | bytes | 77.1 | 77.1 |  |
| calibration | retail-transfer-low | /couchdb0.commercial.paynet | caliper_client_cpu_avg | percent | 1.6975 | 1.6975 |  |
| calibration | retail-transfer-low | /couchdb0.commercial.paynet | caliper_client_cpu_max | percent | 3.64 | 3.64 |  |
| calibration | retail-transfer-low | /couchdb0.commercial.paynet | caliper_client_memory_avg | bytes | 60.4 | 60.4 |  |
| calibration | retail-transfer-low | /couchdb0.commercial.paynet | caliper_client_memory_max | bytes | 70.8 | 70.8 |  |
| calibration | retail-transfer-low | /couchdb0.ojk.paynet | caliper_client_cpu_avg | percent | 1.64875 | 1.64875 |  |
| calibration | retail-transfer-low | /couchdb0.ojk.paynet | caliper_client_cpu_max | percent | 2.38875 | 2.38875 |  |
| calibration | retail-transfer-low | /couchdb0.ojk.paynet | caliper_client_memory_avg | bytes | 61.4 | 61.4 |  |
| calibration | retail-transfer-low | /couchdb0.ojk.paynet | caliper_client_memory_max | bytes | 70.3 | 70.3 |  |
| calibration | retail-transfer-low | /couchdb0.pjp.paynet | caliper_client_cpu_avg | percent | 1.71125 | 1.71125 |  |
| calibration | retail-transfer-low | /couchdb0.pjp.paynet | caliper_client_cpu_max | percent | 2.55125 | 2.55125 |  |
| calibration | retail-transfer-low | /couchdb0.pjp.paynet | caliper_client_memory_avg | bytes | 60.1 | 60.1 |  |
| calibration | retail-transfer-low | /couchdb0.pjp.paynet | caliper_client_memory_max | bytes | 68 | 68 |  |
| calibration | retail-transfer-low | /couchdb0.bi.paynet | caliper_client_cpu_avg | percent | 1.69375 | 1.69375 |  |
| calibration | retail-transfer-low | /couchdb0.bi.paynet | caliper_client_cpu_max | percent | 2.7425 | 2.7425 |  |
| calibration | retail-transfer-low | /couchdb0.bi.paynet | caliper_client_memory_avg | bytes | 59.9 | 59.9 |  |
| calibration | retail-transfer-low | /couchdb0.bi.paynet | caliper_client_memory_max | bytes | 70.2 | 70.2 |  |
| calibration | retail-transfer-low | node caliper(sum) | caliper_client_cpu_avg | percent | 58.72 | 58.72 |  |
| calibration | retail-transfer-low | node caliper(sum) | caliper_client_cpu_max | percent | 111 | 111 |  |
| calibration | retail-transfer-low | node-exporter:9100 | host_cpu_busy_percent | % | 75.55601195520569 | 97.97767857143559 | 97.87262931034374 |
| calibration | retail-transfer-low | node-exporter:9100 | host_memory_used_bytes | bytes | 5653117351.724138 | 5768499200 | 5747535872 |
| calibration | retail-transfer-low | node-exporter:9100 | host_read_iops | operations_per_second | 0.12215482948025895 | 0.39285714285714285 | 0.3793103448275862 |
| calibration | retail-transfer-low | node-exporter:9100 | host_write_iops | operations_per_second | 1324.3731314564088 | 3695.4827586206898 | 3536.2355668914156 |
| calibration | retail-transfer-low | node-exporter:9100 | host_read_await_ms | milliseconds_per_operation | 0.14176494004171245 | 0.5000000000071244 | 0.4325396825447931 |
| calibration | retail-transfer-low | node-exporter:9100 | host_write_await_ms | milliseconds_per_operation | 0.7447912610221055 | 1.9267510045292744 | 1.8238357339823748 |
| calibration | retail-transfer-low | /peer0.bi.paynet | caliper_client_cpu_avg | percent | 0.1775 | 0.1775 |  |
| calibration | retail-transfer-low | /peer0.bi.paynet | caliper_client_cpu_max | percent | 0.25625 | 0.25625 |  |
| calibration | retail-transfer-low | /peer0.bi.paynet | caliper_client_memory_avg | bytes | 122 | 122 |  |
| calibration | retail-transfer-low | /peer0.bi.paynet | caliper_client_memory_max | bytes | 129 | 129 |  |
| calibration | retail-transfer-low | /peer0.pjp.paynet | caliper_client_cpu_avg | percent | 0.17125 | 0.17125 |  |
| calibration | retail-transfer-low | /peer0.pjp.paynet | caliper_client_cpu_max | percent | 0.255 | 0.255 |  |
| calibration | retail-transfer-low | /peer0.pjp.paynet | caliper_client_memory_avg | bytes | 117 | 117 |  |
| calibration | retail-transfer-low | /peer0.pjp.paynet | caliper_client_memory_max | bytes | 126 | 126 |  |
| calibration | retail-transfer-low | /peer0.himbara.paynet | caliper_client_cpu_avg | percent | 0.51875 | 0.51875 |  |
| calibration | retail-transfer-low | /peer0.himbara.paynet | caliper_client_cpu_max | percent | 0.71375 | 0.71375 |  |
| calibration | retail-transfer-low | /peer0.himbara.paynet | caliper_client_memory_avg | bytes | 127 | 127 |  |
| calibration | retail-transfer-low | /peer0.himbara.paynet | caliper_client_memory_max | bytes | 133 | 133 |  |
| calibration | retail-transfer-low | /peer0.commercial.paynet | caliper_client_cpu_avg | percent | 0.17875 | 0.17875 |  |
| calibration | retail-transfer-low | /peer0.commercial.paynet | caliper_client_cpu_max | percent | 0.255 | 0.255 |  |
| calibration | retail-transfer-low | /peer0.commercial.paynet | caliper_client_memory_avg | bytes | 118 | 118 |  |
| calibration | retail-transfer-low | /peer0.commercial.paynet | caliper_client_memory_max | bytes | 131 | 131 |  |
| calibration | retail-transfer-low | /peer0.ojk.paynet | caliper_client_cpu_avg | percent | 0.1775 | 0.1775 |  |
| calibration | retail-transfer-low | /peer0.ojk.paynet | caliper_client_cpu_max | percent | 0.25375 | 0.25375 |  |
| calibration | retail-transfer-low | /peer0.ojk.paynet | caliper_client_memory_avg | bytes | 118 | 118 |  |
| calibration | retail-transfer-low | /peer0.ojk.paynet | caliper_client_memory_max | bytes | 126 | 126 |  |
| calibration | retail-transfer-low | /couchdb0.bi.paynet | caliper_client_cpu_avg | percent | 1.7275 | 1.7275 |  |
| calibration | retail-transfer-low | /couchdb0.bi.paynet | caliper_client_cpu_max | percent | 3.21125 | 3.21125 |  |
| calibration | retail-transfer-low | /couchdb0.bi.paynet | caliper_client_memory_avg | bytes | 61.4 | 61.4 |  |
| calibration | retail-transfer-low | /couchdb0.bi.paynet | caliper_client_memory_max | bytes | 77.8 | 77.8 |  |
| calibration | retail-transfer-low | /couchdb0.ojk.paynet | caliper_client_cpu_avg | percent | 1.725 | 1.725 |  |
| calibration | retail-transfer-low | /couchdb0.ojk.paynet | caliper_client_cpu_max | percent | 2.5825 | 2.5825 |  |
| calibration | retail-transfer-low | /couchdb0.ojk.paynet | caliper_client_memory_avg | bytes | 62.1 | 62.1 |  |
| calibration | retail-transfer-low | /couchdb0.ojk.paynet | caliper_client_memory_max | bytes | 77.1 | 77.1 |  |
| calibration | retail-transfer-low | /couchdb0.pjp.paynet | caliper_client_cpu_avg | percent | 1.69875 | 1.69875 |  |
| calibration | retail-transfer-low | /couchdb0.pjp.paynet | caliper_client_cpu_max | percent | 2.92125 | 2.92125 |  |
| calibration | retail-transfer-low | /couchdb0.pjp.paynet | caliper_client_memory_avg | bytes | 63.1 | 63.1 |  |
| calibration | retail-transfer-low | /couchdb0.pjp.paynet | caliper_client_memory_max | bytes | 82.4 | 82.4 |  |
| calibration | retail-transfer-low | /couchdb0.himbara.paynet | caliper_client_cpu_avg | percent | 1.40375 | 1.40375 |  |
| calibration | retail-transfer-low | /couchdb0.himbara.paynet | caliper_client_cpu_max | percent | 2.6125 | 2.6125 |  |
| calibration | retail-transfer-low | /couchdb0.himbara.paynet | caliper_client_memory_avg | bytes | 59 | 59 |  |
| calibration | retail-transfer-low | /couchdb0.himbara.paynet | caliper_client_memory_max | bytes | 72 | 72 |  |
| calibration | retail-transfer-low | /couchdb0.commercial.paynet | caliper_client_cpu_avg | percent | 1.77625 | 1.77625 |  |
| calibration | retail-transfer-low | /couchdb0.commercial.paynet | caliper_client_cpu_max | percent | 2.96 | 2.96 |  |
| calibration | retail-transfer-low | /couchdb0.commercial.paynet | caliper_client_memory_avg | bytes | 63.1 | 63.1 |  |
| calibration | retail-transfer-low | /couchdb0.commercial.paynet | caliper_client_memory_max | bytes | 83.2 | 83.2 |  |
| calibration | retail-transfer-low | /orderer.paynet | caliper_client_cpu_avg | percent | 0.12125 | 0.12125 |  |
| calibration | retail-transfer-low | /orderer.paynet | caliper_client_cpu_max | percent | 0.19125 | 0.19125 |  |
| calibration | retail-transfer-low | /orderer.paynet | caliper_client_memory_avg | bytes | 61.5 | 61.5 |  |
| calibration | retail-transfer-low | /orderer.paynet | caliper_client_memory_max | bytes | 83.2 | 83.2 |  |
| calibration | retail-transfer-low | node caliper(sum) | caliper_client_cpu_avg | percent | 59.03 | 59.03 |  |
| calibration | retail-transfer-low | node caliper(sum) | caliper_client_cpu_max | percent | 114 | 114 |  |
| calibration | retail-transfer-low | node-exporter:9100 | host_cpu_busy_percent | % | 74.940291906898 | 97.55529002975707 | 97.41676416255802 |
| calibration | retail-transfer-low | node-exporter:9100 | host_memory_used_bytes | bytes | 5632521719.322034 | 5726420992 | 5721889177.6 |
| calibration | retail-transfer-low | node-exporter:9100 | host_read_iops | operations_per_second | 0.02380558079059129 | 0.10714285714285714 | 0.10344934609045571 |
| calibration | retail-transfer-low | node-exporter:9100 | host_write_iops | operations_per_second | 1386.0494868211083 | 3921.642857142857 | 3759.3473332128547 |
| calibration | retail-transfer-low | node-exporter:9100 | host_read_await_ms | milliseconds_per_operation | 0.07909604519586975 | 0.4999999999881766 | 0.3333333333254511 |
| calibration | retail-transfer-low | node-exporter:9100 | host_write_await_ms | milliseconds_per_operation | 1.9241520700359769 | 6.749691434213064 | 5.4484429391569815 |
| calibration | retail-transfer-low | /peer0.himbara.paynet | caliper_client_cpu_avg | percent | 0.47625 | 0.47625 |  |
| calibration | retail-transfer-low | /peer0.himbara.paynet | caliper_client_cpu_max | percent | 0.66625 | 0.66625 |  |
| calibration | retail-transfer-low | /peer0.himbara.paynet | caliper_client_memory_avg | bytes | 125 | 125 |  |
| calibration | retail-transfer-low | /peer0.himbara.paynet | caliper_client_memory_max | bytes | 133 | 133 |  |
| calibration | retail-transfer-low | /peer0.commercial.paynet | caliper_client_cpu_avg | percent | 0.1825 | 0.1825 |  |
| calibration | retail-transfer-low | /peer0.commercial.paynet | caliper_client_cpu_max | percent | 0.25375 | 0.25375 |  |
| calibration | retail-transfer-low | /peer0.commercial.paynet | caliper_client_memory_avg | bytes | 113 | 113 |  |
| calibration | retail-transfer-low | /peer0.commercial.paynet | caliper_client_memory_max | bytes | 119 | 119 |  |
| calibration | retail-transfer-low | /peer0.bi.paynet | caliper_client_cpu_avg | percent | 0.17875 | 0.17875 |  |
| calibration | retail-transfer-low | /peer0.bi.paynet | caliper_client_cpu_max | percent | 0.2825 | 0.2825 |  |
| calibration | retail-transfer-low | /peer0.bi.paynet | caliper_client_memory_avg | bytes | 122 | 122 |  |
| calibration | retail-transfer-low | /peer0.bi.paynet | caliper_client_memory_max | bytes | 129 | 129 |  |
| calibration | retail-transfer-low | /peer0.pjp.paynet | caliper_client_cpu_avg | percent | 0.175 | 0.175 |  |
| calibration | retail-transfer-low | /peer0.pjp.paynet | caliper_client_cpu_max | percent | 0.2625 | 0.2625 |  |
| calibration | retail-transfer-low | /peer0.pjp.paynet | caliper_client_memory_avg | bytes | 117 | 117 |  |
| calibration | retail-transfer-low | /peer0.pjp.paynet | caliper_client_memory_max | bytes | 125 | 125 |  |
| calibration | retail-transfer-low | /peer0.ojk.paynet | caliper_client_cpu_avg | percent | 0.17625 | 0.17625 |  |
| calibration | retail-transfer-low | /peer0.ojk.paynet | caliper_client_cpu_max | percent | 0.25375 | 0.25375 |  |
| calibration | retail-transfer-low | /peer0.ojk.paynet | caliper_client_memory_avg | bytes | 118 | 118 |  |
| calibration | retail-transfer-low | /peer0.ojk.paynet | caliper_client_memory_max | bytes | 125 | 125 |  |
| calibration | retail-transfer-low | /couchdb0.himbara.paynet | caliper_client_cpu_avg | percent | 1.46875 | 1.46875 |  |
| calibration | retail-transfer-low | /couchdb0.himbara.paynet | caliper_client_cpu_max | percent | 2.095 | 2.095 |  |
| calibration | retail-transfer-low | /couchdb0.himbara.paynet | caliper_client_memory_avg | bytes | 60.4 | 60.4 |  |
| calibration | retail-transfer-low | /couchdb0.himbara.paynet | caliper_client_memory_max | bytes | 70 | 70 |  |
| calibration | retail-transfer-low | /couchdb0.commercial.paynet | caliper_client_cpu_avg | percent | 1.70375 | 1.70375 |  |
| calibration | retail-transfer-low | /couchdb0.commercial.paynet | caliper_client_cpu_max | percent | 3.16625 | 3.16625 |  |
| calibration | retail-transfer-low | /couchdb0.commercial.paynet | caliper_client_memory_avg | bytes | 58.5 | 58.5 |  |
| calibration | retail-transfer-low | /couchdb0.commercial.paynet | caliper_client_memory_max | bytes | 69 | 69 |  |
| calibration | retail-transfer-low | /couchdb0.ojk.paynet | caliper_client_cpu_avg | percent | 1.7175 | 1.7175 |  |
| calibration | retail-transfer-low | /couchdb0.ojk.paynet | caliper_client_cpu_max | percent | 4.14875 | 4.14875 |  |
| calibration | retail-transfer-low | /couchdb0.ojk.paynet | caliper_client_memory_avg | bytes | 59.6 | 59.6 |  |
| calibration | retail-transfer-low | /couchdb0.ojk.paynet | caliper_client_memory_max | bytes | 71.8 | 71.8 |  |
| calibration | retail-transfer-low | /couchdb0.pjp.paynet | caliper_client_cpu_avg | percent | 1.6525 | 1.6525 |  |
| calibration | retail-transfer-low | /couchdb0.pjp.paynet | caliper_client_cpu_max | percent | 2.16375 | 2.16375 |  |
| calibration | retail-transfer-low | /couchdb0.pjp.paynet | caliper_client_memory_avg | bytes | 58.7 | 58.7 |  |
| calibration | retail-transfer-low | /couchdb0.pjp.paynet | caliper_client_memory_max | bytes | 68.6 | 68.6 |  |
| calibration | retail-transfer-low | /couchdb0.bi.paynet | caliper_client_cpu_avg | percent | 1.65375 | 1.65375 |  |
| calibration | retail-transfer-low | /couchdb0.bi.paynet | caliper_client_cpu_max | percent | 3.09 | 3.09 |  |
| calibration | retail-transfer-low | /couchdb0.bi.paynet | caliper_client_memory_avg | bytes | 58 | 58 |  |
| calibration | retail-transfer-low | /couchdb0.bi.paynet | caliper_client_memory_max | bytes | 66.3 | 66.3 |  |
| calibration | retail-transfer-low | /orderer.paynet | caliper_client_cpu_avg | percent | 0.12125 | 0.12125 |  |
| calibration | retail-transfer-low | /orderer.paynet | caliper_client_cpu_max | percent | 0.15875 | 0.15875 |  |
| calibration | retail-transfer-low | /orderer.paynet | caliper_client_memory_avg | bytes | 60 | 60 |  |
| calibration | retail-transfer-low | /orderer.paynet | caliper_client_memory_max | bytes | 78.1 | 78.1 |  |
| calibration | retail-transfer-low | node caliper(sum) | caliper_client_cpu_avg | percent | 60.11 | 60.11 |  |
| calibration | retail-transfer-low | node caliper(sum) | caliper_client_cpu_max | percent | 118 | 118 |  |
| calibration | retail-transfer-low | node-exporter:9100 | host_cpu_busy_percent | % | 75.17829084517325 | 97.62946428570883 | 97.59181034482936 |
| calibration | retail-transfer-low | node-exporter:9100 | host_memory_used_bytes | bytes | 5733625856 | 5852311552 | 5829609472 |
| calibration | retail-transfer-low | node-exporter:9100 | host_read_iops | operations_per_second | 0.6031801613147497 | 2.2413793103448274 | 2.180260344827586 |
| calibration | retail-transfer-low | node-exporter:9100 | host_write_iops | operations_per_second | 1392.4781131334234 | 3792.178571428571 | 3703.9312142857143 |
| calibration | retail-transfer-low | node-exporter:9100 | host_read_await_ms | milliseconds_per_operation | 0.4717316692675798 | 1.8076923076932874 | 1.7999999999915417 |
| calibration | retail-transfer-low | node-exporter:9100 | host_write_await_ms | milliseconds_per_operation | 1.085994689297103 | 3.5213724362661294 | 3.014510250564679 |
| calibration | retail-transfer-low | /peer0.commercial.paynet | caliper_client_cpu_avg | percent | 0.17375 | 0.17375 |  |
| calibration | retail-transfer-low | /peer0.commercial.paynet | caliper_client_cpu_max | percent | 0.27125 | 0.27125 |  |
| calibration | retail-transfer-low | /peer0.commercial.paynet | caliper_client_memory_avg | bytes | 114 | 114 |  |
| calibration | retail-transfer-low | /peer0.commercial.paynet | caliper_client_memory_max | bytes | 120 | 120 |  |
| calibration | retail-transfer-low | /peer0.pjp.paynet | caliper_client_cpu_avg | percent | 0.175 | 0.175 |  |
| calibration | retail-transfer-low | /peer0.pjp.paynet | caliper_client_cpu_max | percent | 0.25125 | 0.25125 |  |
| calibration | retail-transfer-low | /peer0.pjp.paynet | caliper_client_memory_avg | bytes | 117 | 117 |  |
| calibration | retail-transfer-low | /peer0.pjp.paynet | caliper_client_memory_max | bytes | 124 | 124 |  |
| calibration | retail-transfer-low | /peer0.himbara.paynet | caliper_client_cpu_avg | percent | 0.49 | 0.49 |  |
| calibration | retail-transfer-low | /peer0.himbara.paynet | caliper_client_cpu_max | percent | 0.6575 | 0.6575 |  |
| calibration | retail-transfer-low | /peer0.himbara.paynet | caliper_client_memory_avg | bytes | 127 | 127 |  |
| calibration | retail-transfer-low | /peer0.himbara.paynet | caliper_client_memory_max | bytes | 134 | 134 |  |
| calibration | retail-transfer-low | /peer0.bi.paynet | caliper_client_cpu_avg | percent | 0.18125 | 0.18125 |  |
| calibration | retail-transfer-low | /peer0.bi.paynet | caliper_client_cpu_max | percent | 0.32875 | 0.32875 |  |
| calibration | retail-transfer-low | /peer0.bi.paynet | caliper_client_memory_avg | bytes | 118 | 118 |  |
| calibration | retail-transfer-low | /peer0.bi.paynet | caliper_client_memory_max | bytes | 123 | 123 |  |
| calibration | retail-transfer-low | /peer0.ojk.paynet | caliper_client_cpu_avg | percent | 0.18375 | 0.18375 |  |
| calibration | retail-transfer-low | /peer0.ojk.paynet | caliper_client_cpu_max | percent | 0.37125 | 0.37125 |  |
| calibration | retail-transfer-low | /peer0.ojk.paynet | caliper_client_memory_avg | bytes | 116 | 116 |  |
| calibration | retail-transfer-low | /peer0.ojk.paynet | caliper_client_memory_max | bytes | 121 | 121 |  |
| calibration | retail-transfer-low | /couchdb0.bi.paynet | caliper_client_cpu_avg | percent | 1.7 | 1.7 |  |
| calibration | retail-transfer-low | /couchdb0.bi.paynet | caliper_client_cpu_max | percent | 3.12125 | 3.12125 |  |
| calibration | retail-transfer-low | /couchdb0.bi.paynet | caliper_client_memory_avg | bytes | 60.2 | 60.2 |  |
| calibration | retail-transfer-low | /couchdb0.bi.paynet | caliper_client_memory_max | bytes | 69.6 | 69.6 |  |
| calibration | retail-transfer-low | /couchdb0.himbara.paynet | caliper_client_cpu_avg | percent | 1.3925 | 1.3925 |  |
| calibration | retail-transfer-low | /couchdb0.himbara.paynet | caliper_client_cpu_max | percent | 2.39375 | 2.39375 |  |
| calibration | retail-transfer-low | /couchdb0.himbara.paynet | caliper_client_memory_avg | bytes | 59.7 | 59.7 |  |
| calibration | retail-transfer-low | /couchdb0.himbara.paynet | caliper_client_memory_max | bytes | 71.7 | 71.7 |  |
| calibration | retail-transfer-low | /couchdb0.commercial.paynet | caliper_client_cpu_avg | percent | 1.68875 | 1.68875 |  |
| calibration | retail-transfer-low | /couchdb0.commercial.paynet | caliper_client_cpu_max | percent | 2.9825 | 2.9825 |  |
| calibration | retail-transfer-low | /couchdb0.commercial.paynet | caliper_client_memory_avg | bytes | 58.8 | 58.8 |  |
| calibration | retail-transfer-low | /couchdb0.commercial.paynet | caliper_client_memory_max | bytes | 68.1 | 68.1 |  |
| calibration | retail-transfer-low | /orderer.paynet | caliper_client_cpu_avg | percent | 0.105 | 0.105 |  |
| calibration | retail-transfer-low | /orderer.paynet | caliper_client_cpu_max | percent | 0.14875 | 0.14875 |  |
| calibration | retail-transfer-low | /orderer.paynet | caliper_client_memory_avg | bytes | 65.2 | 65.2 |  |
| calibration | retail-transfer-low | /orderer.paynet | caliper_client_memory_max | bytes | 83.3 | 83.3 |  |
| calibration | retail-transfer-low | /couchdb0.ojk.paynet | caliper_client_cpu_avg | percent | 1.7125 | 1.7125 |  |
| calibration | retail-transfer-low | /couchdb0.ojk.paynet | caliper_client_cpu_max | percent | 3.8425 | 3.8425 |  |
| calibration | retail-transfer-low | /couchdb0.ojk.paynet | caliper_client_memory_avg | bytes | 59.2 | 59.2 |  |
| calibration | retail-transfer-low | /couchdb0.ojk.paynet | caliper_client_memory_max | bytes | 71 | 71 |  |
| calibration | retail-transfer-low | /couchdb0.pjp.paynet | caliper_client_cpu_avg | percent | 1.6625 | 1.6625 |  |
| calibration | retail-transfer-low | /couchdb0.pjp.paynet | caliper_client_cpu_max | percent | 2.415 | 2.415 |  |
| calibration | retail-transfer-low | /couchdb0.pjp.paynet | caliper_client_memory_avg | bytes | 61.2 | 61.2 |  |
| calibration | retail-transfer-low | /couchdb0.pjp.paynet | caliper_client_memory_max | bytes | 72.5 | 72.5 |  |
| calibration | retail-transfer-low | node caliper(sum) | caliper_client_cpu_avg | percent | 58.71 | 58.71 |  |
| calibration | retail-transfer-low | node caliper(sum) | caliper_client_cpu_max | percent | 109 | 109 |  |
| calibration | retail-transfer-low | node-exporter:9100 | host_cpu_busy_percent | % | 75.51869441384805 | 97.91116845237511 | 97.80560344826881 |
| calibration | retail-transfer-low | node-exporter:9100 | host_memory_used_bytes | bytes | 5686103161.491526 | 5831270400 | 5813859942.4 |
| calibration | retail-transfer-low | node-exporter:9100 | host_read_iops | operations_per_second | 0.05880785777651845 | 0.5172413793103449 | 0.4482758620689655 |
| calibration | retail-transfer-low | node-exporter:9100 | host_write_iops | operations_per_second | 1357.0955534785137 | 3803.142857142857 | 3658.103448275862 |
| calibration | retail-transfer-low | node-exporter:9100 | host_read_await_ms | milliseconds_per_operation | 0.02939560439563787 | 0.4999999999881766 | 0.23076923077251896 |
| calibration | retail-transfer-low | node-exporter:9100 | host_write_await_ms | milliseconds_per_operation | 0.7303440129243768 | 1.957928461839314 | 1.8714069435290448 |
| calibration | retail-transfer-low | /peer0.commercial.paynet | caliper_client_cpu_avg | percent | 0.17375 | 0.17375 |  |
| calibration | retail-transfer-low | /peer0.commercial.paynet | caliper_client_cpu_max | percent | 0.31375 | 0.31375 |  |
| calibration | retail-transfer-low | /peer0.commercial.paynet | caliper_client_memory_avg | bytes | 114 | 114 |  |
| calibration | retail-transfer-low | /peer0.commercial.paynet | caliper_client_memory_max | bytes | 122 | 122 |  |
| calibration | retail-transfer-low | /peer0.bi.paynet | caliper_client_cpu_avg | percent | 0.165 | 0.165 |  |
| calibration | retail-transfer-low | /peer0.bi.paynet | caliper_client_cpu_max | percent | 0.25 | 0.25 |  |
| calibration | retail-transfer-low | /peer0.bi.paynet | caliper_client_memory_avg | bytes | 116 | 116 |  |
| calibration | retail-transfer-low | /peer0.bi.paynet | caliper_client_memory_max | bytes | 125 | 125 |  |
| calibration | retail-transfer-low | /peer0.pjp.paynet | caliper_client_cpu_avg | percent | 0.1675 | 0.1675 |  |
| calibration | retail-transfer-low | /peer0.pjp.paynet | caliper_client_cpu_max | percent | 0.32 | 0.32 |  |
| calibration | retail-transfer-low | /peer0.pjp.paynet | caliper_client_memory_avg | bytes | 121 | 121 |  |
| calibration | retail-transfer-low | /peer0.pjp.paynet | caliper_client_memory_max | bytes | 129 | 129 |  |
| calibration | retail-transfer-low | /peer0.ojk.paynet | caliper_client_cpu_avg | percent | 0.16625 | 0.16625 |  |
| calibration | retail-transfer-low | /peer0.ojk.paynet | caliper_client_cpu_max | percent | 0.3075 | 0.3075 |  |
| calibration | retail-transfer-low | /peer0.ojk.paynet | caliper_client_memory_avg | bytes | 115 | 115 |  |
| calibration | retail-transfer-low | /peer0.ojk.paynet | caliper_client_memory_max | bytes | 121 | 121 |  |
| calibration | retail-transfer-low | /peer0.himbara.paynet | caliper_client_cpu_avg | percent | 0.5 | 0.5 |  |
| calibration | retail-transfer-low | /peer0.himbara.paynet | caliper_client_cpu_max | percent | 0.66375 | 0.66375 |  |
| calibration | retail-transfer-low | /peer0.himbara.paynet | caliper_client_memory_avg | bytes | 129 | 129 |  |
| calibration | retail-transfer-low | /peer0.himbara.paynet | caliper_client_memory_max | bytes | 140 | 140 |  |
| calibration | retail-transfer-low | /couchdb0.pjp.paynet | caliper_client_cpu_avg | percent | 1.68 | 1.68 |  |
| calibration | retail-transfer-low | /couchdb0.pjp.paynet | caliper_client_cpu_max | percent | 3.01625 | 3.01625 |  |
| calibration | retail-transfer-low | /couchdb0.pjp.paynet | caliper_client_memory_avg | bytes | 60.2 | 60.2 |  |
| calibration | retail-transfer-low | /couchdb0.pjp.paynet | caliper_client_memory_max | bytes | 72.3 | 72.3 |  |
| calibration | retail-transfer-low | /couchdb0.commercial.paynet | caliper_client_cpu_avg | percent | 1.71625 | 1.71625 |  |
| calibration | retail-transfer-low | /couchdb0.commercial.paynet | caliper_client_cpu_max | percent | 2.9075 | 2.9075 |  |
| calibration | retail-transfer-low | /couchdb0.commercial.paynet | caliper_client_memory_avg | bytes | 62.9 | 62.9 |  |
| calibration | retail-transfer-low | /couchdb0.commercial.paynet | caliper_client_memory_max | bytes | 76.2 | 76.2 |  |
| calibration | retail-transfer-low | /couchdb0.ojk.paynet | caliper_client_cpu_avg | percent | 1.6425 | 1.6425 |  |
| calibration | retail-transfer-low | /couchdb0.ojk.paynet | caliper_client_cpu_max | percent | 3.19125 | 3.19125 |  |
| calibration | retail-transfer-low | /couchdb0.ojk.paynet | caliper_client_memory_avg | bytes | 60.8 | 60.8 |  |
| calibration | retail-transfer-low | /couchdb0.ojk.paynet | caliper_client_memory_max | bytes | 75.3 | 75.3 |  |
| calibration | retail-transfer-low | /couchdb0.bi.paynet | caliper_client_cpu_avg | percent | 1.535 | 1.535 |  |
| calibration | retail-transfer-low | /couchdb0.bi.paynet | caliper_client_cpu_max | percent | 2.27 | 2.27 |  |
| calibration | retail-transfer-low | /couchdb0.bi.paynet | caliper_client_memory_avg | bytes | 58.2 | 58.2 |  |
| calibration | retail-transfer-low | /couchdb0.bi.paynet | caliper_client_memory_max | bytes | 73.1 | 73.1 |  |
| calibration | retail-transfer-low | /couchdb0.himbara.paynet | caliper_client_cpu_avg | percent | 1.50125 | 1.50125 |  |
| calibration | retail-transfer-low | /couchdb0.himbara.paynet | caliper_client_cpu_max | percent | 2.515 | 2.515 |  |
| calibration | retail-transfer-low | /couchdb0.himbara.paynet | caliper_client_memory_avg | bytes | 63.3 | 63.3 |  |
| calibration | retail-transfer-low | /couchdb0.himbara.paynet | caliper_client_memory_max | bytes | 77.9 | 77.9 |  |
| calibration | retail-transfer-low | /orderer.paynet | caliper_client_cpu_avg | percent | 0.1025 | 0.1025 |  |
| calibration | retail-transfer-low | /orderer.paynet | caliper_client_cpu_max | percent | 0.14 | 0.14 |  |
| calibration | retail-transfer-low | /orderer.paynet | caliper_client_memory_avg | bytes | 63.6 | 63.6 |  |
| calibration | retail-transfer-low | /orderer.paynet | caliper_client_memory_max | bytes | 78.4 | 78.4 |  |
| calibration | retail-transfer-low | node caliper(sum) | caliper_client_cpu_avg | percent | 58.91 | 58.91 |  |
| calibration | retail-transfer-low | node caliper(sum) | caliper_client_cpu_max | percent | 109 | 109 |  |

## 7. Results by Transaction Type

Each row is isolated: Issuance, Distribution, Retail Transfer, Merchant Payment, Redemption, Balance Query, and Wallet Status Change. Freeze and Unfreeze are preserved as separate operations.

## 8. Repetition and Uncertainty

Every confirmatory scenario is repeated five times. Tables report the mean and sample standard deviation across repetitions. Raw traces and Prometheus responses remain beside this report for reanalysis.

## Measurement Boundary

The primary benchmark measures direct Fabric traffic. Backend API, PostgreSQL, and KYC are evaluated separately by the end-to-end demonstration and are not mixed into these Fabric latency or throughput values.
