# Benchmark Statistical Report

## 1. Offered TPS vs Achieved TPS

Offered TPS is submitted transactions divided by the measured duration. Achieved TPS is successful completions divided by the same duration.

| Scenario | Target TPS | Repetitions | Offered TPS mean±SD | Achieved TPS mean±SD | Success mean±SD | Sustainable |
| --- | --- | --- | --- | --- | --- | --- |
| primary/retail-transfer/retail-transfer/high | 20 | 5 | 20.0083 ± 0.0000 | 2.0050 ± 0.0046 | 10.0208% ± 0.0228% | NO |
| primary/retail-transfer/retail-transfer/high | 75 | 5 | 75.0033 ± 0.0075 | 4.8167 ± 0.0586 | 6.4219% ± 0.0782% | NO |
| primary/retail-transfer/retail-transfer/high | 150 | 5 | 99.5933 ± 1.4747 | 0.9983 ± 0.1268 | 1.0036% ± 0.1375% | NO |
| primary/retail-transfer/retail-transfer/low | 20 | 5 | 20.0083 ± 0.0000 | 20.0083 ± 0.0000 | 100.0000% ± 0.0000% | YES |
| primary/retail-transfer/retail-transfer/low | 75 | 5 | 75.0017 ± 0.0109 | 8.9800 ± 0.4445 | 11.9731% ± 0.5927% | NO |
| primary/retail-transfer/retail-transfer/low | 150 | 5 | 130.7233 ± 1.2827 | 5.5850 ± 0.1596 | 4.2732% ± 0.1485% | NO |

## 2. Transaction Completion Counts

    | Scenario | Submitted | Successful | Failed | Timed out | Success rate |
| --- | --- | --- | --- | --- | --- |
| primary/retail-transfer/retail-transfer/high | 12005 | 1203 | 10802 | 0 | 10.0208% |
| primary/retail-transfer/retail-transfer/high | 45002 | 2890 | 42112 | 0 | 6.4219% |
| primary/retail-transfer/retail-transfer/high | 59756 | 599 | 59157 | 0 | 1.0036% |
| primary/retail-transfer/retail-transfer/low | 12005 | 12005 | 0 | 0 | 100.0000% |
| primary/retail-transfer/retail-transfer/low | 45001 | 5388 | 39613 | 0 | 11.9731% |
| primary/retail-transfer/retail-transfer/low | 78434 | 3351 | 75083 | 0 | 4.2732% |

## 3. Failure Reasons

| phase | transactionFamily | operation | contention | category | count |
| --- | --- | --- | --- | --- | --- |
| primary | retail-transfer | retail-transfer | high | MVCC read conflict | 110570 |
| primary | retail-transfer | retail-transfer | high | Gateway concurrency limit | 1501 |
| primary | retail-transfer | retail-transfer | low | MVCC read conflict | 68922 |
| primary | retail-transfer | retail-transfer | low | Gateway concurrency limit | 45774 |

## 4. Latency Measurements

Latency is Caliper-observed Fabric end-to-final-status latency (time_final - time_create) for successful completions. Percentiles use Type-7 interpolation; latency SD is the population SD within each run.

| Scenario | Mean (s) | p50 (s) | p95 (s) | p99 (s) | SD (s) | Min (s) | Max (s) |
| --- | --- | --- | --- | --- | --- | --- | --- |
| primary/retail-transfer/retail-transfer/high | 0.5387 | 0.5376 | 0.5942 | 0.6661 | 0.0817 | 0.3728 | 1.5608 |
| primary/retail-transfer/retail-transfer/high | 0.2602 | 0.2293 | 0.4673 | 0.6535 | 0.1122 | 0.1066 | 1.1594 |
| primary/retail-transfer/retail-transfer/high | 1.0899 | 0.6271 | 4.2852 | 5.1710 | 1.2412 | 0.1778 | 5.5712 |
| primary/retail-transfer/retail-transfer/low | 0.3999 | 0.3996 | 0.6288 | 0.6972 | 0.1540 | 0.1016 | 2.1182 |
| primary/retail-transfer/retail-transfer/low | 5.4165 | 6.1921 | 7.5976 | 8.0221 | 2.1605 | 0.1580 | 8.2824 |
| primary/retail-transfer/retail-transfer/low | 7.2465 | 8.5620 | 10.1438 | 10.6037 | 2.9607 | 0.2374 | 10.8958 |

## 5. Saturation Point

The sustainable gate is at least 99% successful completions and p95 latency at most 2.5 seconds in all five repetitions. The highest load passing that gate is the maximum sustainable offered load; its successful throughput is reported separately as Achieved TPS.

## 6. Resource Metrics

Resource rows are emitted from the synchronized Prometheus capture. Missing telemetry is invalid evidence, not zero usage.

| phase | scenarioId | component | metric | unit | mean | max | p95 |
| --- | --- | --- | --- | --- | --- | --- | --- |
| primary | retail-transfer-high | node-exporter:9100 | host_cpu_busy_percent | % | 29.003120769520148 | 35.70287633927096 | 34.77746305419571 |
| primary | retail-transfer-high | node-exporter:9100 | host_memory_used_bytes | bytes | 5564565766.564102 | 5934981120 | 5623561420.8 |
| primary | retail-transfer-high | node-exporter:9100 | host_read_iops | operations_per_second | 0.012423691283174044 | 0.07142857142857142 | 0.06896551724137931 |
| primary | retail-transfer-high | node-exporter:9100 | host_write_iops | operations_per_second | 603.548099165649 | 1667.5714285714284 | 1565.1172413793104 |
| primary | retail-transfer-high | node-exporter:9100 | host_read_await_ms | milliseconds_per_operation | 0.05982905982764506 | 0.4999999999881766 | 0.4999999999881766 |
| primary | retail-transfer-high | node-exporter:9100 | host_write_await_ms | milliseconds_per_operation | 3.4554696153066025 | 16.398702639612164 | 14.299470431701677 |
| primary | retail-transfer-high | /peer0.himbara.paynet | caliper_client_cpu_avg | percent | 0.29625 | 0.29625 |  |
| primary | retail-transfer-high | /peer0.himbara.paynet | caliper_client_cpu_max | percent | 0.36375 | 0.36375 |  |
| primary | retail-transfer-high | /peer0.himbara.paynet | caliper_client_memory_avg | bytes | 114 | 114 |  |
| primary | retail-transfer-high | /peer0.himbara.paynet | caliper_client_memory_max | bytes | 117 | 117 |  |
| primary | retail-transfer-high | /peer0.bi.paynet | caliper_client_cpu_avg | percent | 0.0725 | 0.0725 |  |
| primary | retail-transfer-high | /peer0.bi.paynet | caliper_client_cpu_max | percent | 0.1075 | 0.1075 |  |
| primary | retail-transfer-high | /peer0.bi.paynet | caliper_client_memory_avg | bytes | 112 | 112 |  |
| primary | retail-transfer-high | /peer0.bi.paynet | caliper_client_memory_max | bytes | 118 | 118 |  |
| primary | retail-transfer-high | /peer0.commercial.paynet | caliper_client_cpu_avg | percent | 0.075 | 0.075 |  |
| primary | retail-transfer-high | /peer0.commercial.paynet | caliper_client_cpu_max | percent | 0.13875 | 0.13875 |  |
| primary | retail-transfer-high | /peer0.commercial.paynet | caliper_client_memory_avg | bytes | 119 | 119 |  |
| primary | retail-transfer-high | /peer0.commercial.paynet | caliper_client_memory_max | bytes | 121 | 121 |  |
| primary | retail-transfer-high | /peer0.ojk.paynet | caliper_client_cpu_avg | percent | 0.0725 | 0.0725 |  |
| primary | retail-transfer-high | /peer0.ojk.paynet | caliper_client_cpu_max | percent | 0.105 | 0.105 |  |
| primary | retail-transfer-high | /peer0.ojk.paynet | caliper_client_memory_avg | bytes | 110 | 110 |  |
| primary | retail-transfer-high | /peer0.ojk.paynet | caliper_client_memory_max | bytes | 114 | 114 |  |
| primary | retail-transfer-high | /peer0.pjp.paynet | caliper_client_cpu_avg | percent | 0.07375 | 0.07375 |  |
| primary | retail-transfer-high | /peer0.pjp.paynet | caliper_client_cpu_max | percent | 0.1025 | 0.1025 |  |
| primary | retail-transfer-high | /peer0.pjp.paynet | caliper_client_memory_avg | bytes | 111 | 111 |  |
| primary | retail-transfer-high | /peer0.pjp.paynet | caliper_client_memory_max | bytes | 112 | 112 |  |
| primary | retail-transfer-high | /couchdb0.himbara.paynet | caliper_client_cpu_avg | percent | 0.41625 | 0.41625 |  |
| primary | retail-transfer-high | /couchdb0.himbara.paynet | caliper_client_cpu_max | percent | 0.69 | 0.69 |  |
| primary | retail-transfer-high | /couchdb0.himbara.paynet | caliper_client_memory_avg | bytes | 54.2 | 54.2 |  |
| primary | retail-transfer-high | /couchdb0.himbara.paynet | caliper_client_memory_max | bytes | 56.8 | 56.8 |  |
| primary | retail-transfer-high | /couchdb0.bi.paynet | caliper_client_cpu_avg | percent | 0.35 | 0.35 |  |
| primary | retail-transfer-high | /couchdb0.bi.paynet | caliper_client_cpu_max | percent | 0.66 | 0.66 |  |
| primary | retail-transfer-high | /couchdb0.bi.paynet | caliper_client_memory_avg | bytes | 52.6 | 52.6 |  |
| primary | retail-transfer-high | /couchdb0.bi.paynet | caliper_client_memory_max | bytes | 54.5 | 54.5 |  |
| primary | retail-transfer-high | /couchdb0.pjp.paynet | caliper_client_cpu_avg | percent | 0.3575 | 0.3575 |  |
| primary | retail-transfer-high | /couchdb0.pjp.paynet | caliper_client_cpu_max | percent | 0.67125 | 0.67125 |  |
| primary | retail-transfer-high | /couchdb0.pjp.paynet | caliper_client_memory_avg | bytes | 52.7 | 52.7 |  |
| primary | retail-transfer-high | /couchdb0.pjp.paynet | caliper_client_memory_max | bytes | 55.2 | 55.2 |  |
| primary | retail-transfer-high | /couchdb0.ojk.paynet | caliper_client_cpu_avg | percent | 0.3575 | 0.3575 |  |
| primary | retail-transfer-high | /couchdb0.ojk.paynet | caliper_client_cpu_max | percent | 0.64625 | 0.64625 |  |
| primary | retail-transfer-high | /couchdb0.ojk.paynet | caliper_client_memory_avg | bytes | 53.9 | 53.9 |  |
| primary | retail-transfer-high | /couchdb0.ojk.paynet | caliper_client_memory_max | bytes | 55.7 | 55.7 |  |
| primary | retail-transfer-high | /couchdb0.commercial.paynet | caliper_client_cpu_avg | percent | 0.34875 | 0.34875 |  |
| primary | retail-transfer-high | /couchdb0.commercial.paynet | caliper_client_cpu_max | percent | 0.6025 | 0.6025 |  |
| primary | retail-transfer-high | /couchdb0.commercial.paynet | caliper_client_memory_avg | bytes | 51.6 | 51.6 |  |
| primary | retail-transfer-high | /couchdb0.commercial.paynet | caliper_client_memory_max | bytes | 53.7 | 53.7 |  |
| primary | retail-transfer-high | /orderer.paynet | caliper_client_cpu_avg | percent | 0.045 | 0.045 |  |
| primary | retail-transfer-high | /orderer.paynet | caliper_client_cpu_max | percent | 0.06 | 0.06 |  |
| primary | retail-transfer-high | /orderer.paynet | caliper_client_memory_avg | bytes | 51.6 | 51.6 |  |
| primary | retail-transfer-high | /orderer.paynet | caliper_client_memory_max | bytes | 66.1 | 66.1 |  |
| primary | retail-transfer-high | node caliper(sum) | caliper_client_cpu_avg | percent | 20.58 | 20.58 |  |
| primary | retail-transfer-high | node caliper(sum) | caliper_client_cpu_max | percent | 51 | 51 |  |
| primary | retail-transfer-high | node-exporter:9100 | host_cpu_busy_percent | % | 28.69043455121989 | 33.642241379317866 | 32.41896551723867 |
| primary | retail-transfer-high | node-exporter:9100 | host_memory_used_bytes | bytes | 5545202189.128205 | 5819437056 | 5625789644.8 |
| primary | retail-transfer-high | node-exporter:9100 | host_read_iops | operations_per_second | 0.14582376899920022 | 1.0357142857142856 | 0.5172413793103449 |
| primary | retail-transfer-high | node-exporter:9100 | host_write_iops | operations_per_second | 593.5930772020125 | 1589.1379310344828 | 1479.9431034482757 |
| primary | retail-transfer-high | node-exporter:9100 | host_read_await_ms | milliseconds_per_operation | 0.4875149116513774 | 8.000000000038199 | 1.1333333333368503 |
| primary | retail-transfer-high | node-exporter:9100 | host_write_await_ms | milliseconds_per_operation | 3.5571982038273404 | 13.583600208535223 | 9.659409625069557 |
| primary | retail-transfer-high | /peer0.commercial.paynet | caliper_client_cpu_avg | percent | 0.07375 | 0.07375 |  |
| primary | retail-transfer-high | /peer0.commercial.paynet | caliper_client_cpu_max | percent | 0.105 | 0.105 |  |
| primary | retail-transfer-high | /peer0.commercial.paynet | caliper_client_memory_avg | bytes | 112 | 112 |  |
| primary | retail-transfer-high | /peer0.commercial.paynet | caliper_client_memory_max | bytes | 116 | 116 |  |
| primary | retail-transfer-high | /peer0.ojk.paynet | caliper_client_cpu_avg | percent | 0.0725 | 0.0725 |  |
| primary | retail-transfer-high | /peer0.ojk.paynet | caliper_client_cpu_max | percent | 0.12375 | 0.12375 |  |
| primary | retail-transfer-high | /peer0.ojk.paynet | caliper_client_memory_avg | bytes | 113 | 113 |  |
| primary | retail-transfer-high | /peer0.ojk.paynet | caliper_client_memory_max | bytes | 116 | 116 |  |
| primary | retail-transfer-high | /peer0.himbara.paynet | caliper_client_cpu_avg | percent | 0.285 | 0.285 |  |
| primary | retail-transfer-high | /peer0.himbara.paynet | caliper_client_cpu_max | percent | 0.36 | 0.36 |  |
| primary | retail-transfer-high | /peer0.himbara.paynet | caliper_client_memory_avg | bytes | 112 | 112 |  |
| primary | retail-transfer-high | /peer0.himbara.paynet | caliper_client_memory_max | bytes | 115 | 115 |  |
| primary | retail-transfer-high | /peer0.bi.paynet | caliper_client_cpu_avg | percent | 0.07375 | 0.07375 |  |
| primary | retail-transfer-high | /peer0.bi.paynet | caliper_client_cpu_max | percent | 0.1275 | 0.1275 |  |
| primary | retail-transfer-high | /peer0.bi.paynet | caliper_client_memory_avg | bytes | 117 | 117 |  |
| primary | retail-transfer-high | /peer0.bi.paynet | caliper_client_memory_max | bytes | 121 | 121 |  |
| primary | retail-transfer-high | /peer0.pjp.paynet | caliper_client_cpu_avg | percent | 0.0725 | 0.0725 |  |
| primary | retail-transfer-high | /peer0.pjp.paynet | caliper_client_cpu_max | percent | 0.11375 | 0.11375 |  |
| primary | retail-transfer-high | /peer0.pjp.paynet | caliper_client_memory_avg | bytes | 111 | 111 |  |
| primary | retail-transfer-high | /peer0.pjp.paynet | caliper_client_memory_max | bytes | 114 | 114 |  |
| primary | retail-transfer-high | /couchdb0.himbara.paynet | caliper_client_cpu_avg | percent | 0.3975 | 0.3975 |  |
| primary | retail-transfer-high | /couchdb0.himbara.paynet | caliper_client_cpu_max | percent | 0.85 | 0.85 |  |
| primary | retail-transfer-high | /couchdb0.himbara.paynet | caliper_client_memory_avg | bytes | 52.3 | 52.3 |  |
| primary | retail-transfer-high | /couchdb0.himbara.paynet | caliper_client_memory_max | bytes | 55.6 | 55.6 |  |
| primary | retail-transfer-high | /couchdb0.commercial.paynet | caliper_client_cpu_avg | percent | 0.35125 | 0.35125 |  |
| primary | retail-transfer-high | /couchdb0.commercial.paynet | caliper_client_cpu_max | percent | 0.71375 | 0.71375 |  |
| primary | retail-transfer-high | /couchdb0.commercial.paynet | caliper_client_memory_avg | bytes | 54.8 | 54.8 |  |
| primary | retail-transfer-high | /couchdb0.commercial.paynet | caliper_client_memory_max | bytes | 57.3 | 57.3 |  |
| primary | retail-transfer-high | /orderer.paynet | caliper_client_cpu_avg | percent | 0.04875 | 0.04875 |  |
| primary | retail-transfer-high | /orderer.paynet | caliper_client_cpu_max | percent | 0.06875 | 0.06875 |  |
| primary | retail-transfer-high | /orderer.paynet | caliper_client_memory_avg | bytes | 51.8 | 51.8 |  |
| primary | retail-transfer-high | /orderer.paynet | caliper_client_memory_max | bytes | 69.4 | 69.4 |  |
| primary | retail-transfer-high | /couchdb0.bi.paynet | caliper_client_cpu_avg | percent | 0.34375 | 0.34375 |  |
| primary | retail-transfer-high | /couchdb0.bi.paynet | caliper_client_cpu_max | percent | 0.82625 | 0.82625 |  |
| primary | retail-transfer-high | /couchdb0.bi.paynet | caliper_client_memory_avg | bytes | 54.2 | 54.2 |  |
| primary | retail-transfer-high | /couchdb0.bi.paynet | caliper_client_memory_max | bytes | 56.5 | 56.5 |  |
| primary | retail-transfer-high | /couchdb0.ojk.paynet | caliper_client_cpu_avg | percent | 0.36125 | 0.36125 |  |
| primary | retail-transfer-high | /couchdb0.ojk.paynet | caliper_client_cpu_max | percent | 0.93125 | 0.93125 |  |
| primary | retail-transfer-high | /couchdb0.ojk.paynet | caliper_client_memory_avg | bytes | 54.4 | 54.4 |  |
| primary | retail-transfer-high | /couchdb0.ojk.paynet | caliper_client_memory_max | bytes | 57.8 | 57.8 |  |
| primary | retail-transfer-high | /couchdb0.pjp.paynet | caliper_client_cpu_avg | percent | 0.3425 | 0.3425 |  |
| primary | retail-transfer-high | /couchdb0.pjp.paynet | caliper_client_cpu_max | percent | 0.7125 | 0.7125 |  |
| primary | retail-transfer-high | /couchdb0.pjp.paynet | caliper_client_memory_avg | bytes | 53.6 | 53.6 |  |
| primary | retail-transfer-high | /couchdb0.pjp.paynet | caliper_client_memory_max | bytes | 55.8 | 55.8 |  |
| primary | retail-transfer-high | node caliper(sum) | caliper_client_cpu_avg | percent | 20.28 | 20.28 |  |
| primary | retail-transfer-high | node caliper(sum) | caliper_client_cpu_max | percent | 52 | 52 |  |
| primary | retail-transfer-high | node-exporter:9100 | host_cpu_busy_percent | % | 28.415148395857248 | 33.25869494047238 | 32.268103448280684 |
| primary | retail-transfer-high | node-exporter:9100 | host_memory_used_bytes | bytes | 5556247945.846154 | 5626003456 | 5612513689.6 |
| primary | retail-transfer-high | node-exporter:9100 | host_read_iops | operations_per_second | 0.015487898053415309 | 0.24137931034482757 | 0.06896551724137931 |
| primary | retail-transfer-high | node-exporter:9100 | host_write_iops | operations_per_second | 575.5408095090733 | 1537.896551724138 | 1441.396551724138 |
| primary | retail-transfer-high | node-exporter:9100 | host_read_await_ms | milliseconds_per_operation | 0.04273504273500387 | 1.4285714285701294 | 0 |
| primary | retail-transfer-high | node-exporter:9100 | host_write_await_ms | milliseconds_per_operation | 2.657428928705746 | 8.454836960365954 | 7.504212375725736 |
| primary | retail-transfer-high | /peer0.himbara.paynet | caliper_client_cpu_avg | percent | 0.28125 | 0.28125 |  |
| primary | retail-transfer-high | /peer0.himbara.paynet | caliper_client_cpu_max | percent | 0.34625 | 0.34625 |  |
| primary | retail-transfer-high | /peer0.himbara.paynet | caliper_client_memory_avg | bytes | 117 | 117 |  |
| primary | retail-transfer-high | /peer0.himbara.paynet | caliper_client_memory_max | bytes | 120 | 120 |  |
| primary | retail-transfer-high | /peer0.commercial.paynet | caliper_client_cpu_avg | percent | 0.07125 | 0.07125 |  |
| primary | retail-transfer-high | /peer0.commercial.paynet | caliper_client_cpu_max | percent | 0.17 | 0.17 |  |
| primary | retail-transfer-high | /peer0.commercial.paynet | caliper_client_memory_avg | bytes | 110 | 110 |  |
| primary | retail-transfer-high | /peer0.commercial.paynet | caliper_client_memory_max | bytes | 113 | 113 |  |
| primary | retail-transfer-high | /peer0.pjp.paynet | caliper_client_cpu_avg | percent | 0.06625 | 0.06625 |  |
| primary | retail-transfer-high | /peer0.pjp.paynet | caliper_client_cpu_max | percent | 0.1175 | 0.1175 |  |
| primary | retail-transfer-high | /peer0.pjp.paynet | caliper_client_memory_avg | bytes | 109 | 109 |  |
| primary | retail-transfer-high | /peer0.pjp.paynet | caliper_client_memory_max | bytes | 112 | 112 |  |
| primary | retail-transfer-high | /peer0.ojk.paynet | caliper_client_cpu_avg | percent | 0.0675 | 0.0675 |  |
| primary | retail-transfer-high | /peer0.ojk.paynet | caliper_client_cpu_max | percent | 0.11875 | 0.11875 |  |
| primary | retail-transfer-high | /peer0.ojk.paynet | caliper_client_memory_avg | bytes | 114 | 114 |  |
| primary | retail-transfer-high | /peer0.ojk.paynet | caliper_client_memory_max | bytes | 117 | 117 |  |
| primary | retail-transfer-high | /peer0.bi.paynet | caliper_client_cpu_avg | percent | 0.07375 | 0.07375 |  |
| primary | retail-transfer-high | /peer0.bi.paynet | caliper_client_cpu_max | percent | 0.275 | 0.275 |  |
| primary | retail-transfer-high | /peer0.bi.paynet | caliper_client_memory_avg | bytes | 115 | 115 |  |
| primary | retail-transfer-high | /peer0.bi.paynet | caliper_client_memory_max | bytes | 119 | 119 |  |
| primary | retail-transfer-high | /couchdb0.pjp.paynet | caliper_client_cpu_avg | percent | 0.34 | 0.34 |  |
| primary | retail-transfer-high | /couchdb0.pjp.paynet | caliper_client_cpu_max | percent | 0.66875 | 0.66875 |  |
| primary | retail-transfer-high | /couchdb0.pjp.paynet | caliper_client_memory_avg | bytes | 53.4 | 53.4 |  |
| primary | retail-transfer-high | /couchdb0.pjp.paynet | caliper_client_memory_max | bytes | 54.7 | 54.7 |  |
| primary | retail-transfer-high | /couchdb0.bi.paynet | caliper_client_cpu_avg | percent | 0.33875 | 0.33875 |  |
| primary | retail-transfer-high | /couchdb0.bi.paynet | caliper_client_cpu_max | percent | 0.68625 | 0.68625 |  |
| primary | retail-transfer-high | /couchdb0.bi.paynet | caliper_client_memory_avg | bytes | 50.6 | 50.6 |  |
| primary | retail-transfer-high | /couchdb0.bi.paynet | caliper_client_memory_max | bytes | 53 | 53 |  |
| primary | retail-transfer-high | /couchdb0.himbara.paynet | caliper_client_cpu_avg | percent | 0.39875 | 0.39875 |  |
| primary | retail-transfer-high | /couchdb0.himbara.paynet | caliper_client_cpu_max | percent | 0.78625 | 0.78625 |  |
| primary | retail-transfer-high | /couchdb0.himbara.paynet | caliper_client_memory_avg | bytes | 52.6 | 52.6 |  |
| primary | retail-transfer-high | /couchdb0.himbara.paynet | caliper_client_memory_max | bytes | 54.8 | 54.8 |  |
| primary | retail-transfer-high | /orderer.paynet | caliper_client_cpu_avg | percent | 0.05 | 0.05 |  |
| primary | retail-transfer-high | /orderer.paynet | caliper_client_cpu_max | percent | 0.06375 | 0.06375 |  |
| primary | retail-transfer-high | /orderer.paynet | caliper_client_memory_avg | bytes | 51.8 | 51.8 |  |
| primary | retail-transfer-high | /orderer.paynet | caliper_client_memory_max | bytes | 67.9 | 67.9 |  |
| primary | retail-transfer-high | /couchdb0.commercial.paynet | caliper_client_cpu_avg | percent | 0.3425 | 0.3425 |  |
| primary | retail-transfer-high | /couchdb0.commercial.paynet | caliper_client_cpu_max | percent | 0.6825 | 0.6825 |  |
| primary | retail-transfer-high | /couchdb0.commercial.paynet | caliper_client_memory_avg | bytes | 52.2 | 52.2 |  |
| primary | retail-transfer-high | /couchdb0.commercial.paynet | caliper_client_memory_max | bytes | 54 | 54 |  |
| primary | retail-transfer-high | /couchdb0.ojk.paynet | caliper_client_cpu_avg | percent | 0.3425 | 0.3425 |  |
| primary | retail-transfer-high | /couchdb0.ojk.paynet | caliper_client_cpu_max | percent | 0.615 | 0.615 |  |
| primary | retail-transfer-high | /couchdb0.ojk.paynet | caliper_client_memory_avg | bytes | 52.5 | 52.5 |  |
| primary | retail-transfer-high | /couchdb0.ojk.paynet | caliper_client_memory_max | bytes | 55.2 | 55.2 |  |
| primary | retail-transfer-high | node caliper(sum) | caliper_client_cpu_avg | percent | 20.48 | 20.48 |  |
| primary | retail-transfer-high | node caliper(sum) | caliper_client_cpu_max | percent | 54.9 | 54.9 |  |
| primary | retail-transfer-high | node-exporter:9100 | host_cpu_busy_percent | % | 29.212841084035865 | 35.15948275861116 | 34.94396551724282 |
| primary | retail-transfer-high | node-exporter:9100 | host_memory_used_bytes | bytes | 5556019729.655172 | 5977186304 | 5656285184 |
| primary | retail-transfer-high | node-exporter:9100 | host_read_iops | operations_per_second | 0.15652562567238548 | 1.103448275862069 | 0.5714285714285714 |
| primary | retail-transfer-high | node-exporter:9100 | host_write_iops | operations_per_second | 573.7253367161401 | 1644.5172413793102 | 1501.7844827586207 |
| primary | retail-transfer-high | node-exporter:9100 | host_read_await_ms | milliseconds_per_operation | 0.444795070804441 | 4.000000000019099 | 2.2499999999752163 |
| primary | retail-transfer-high | node-exporter:9100 | host_write_await_ms | milliseconds_per_operation | 2.900225936701889 | 14.114484597155244 | 12.196597960839197 |
| primary | retail-transfer-high | /peer0.commercial.paynet | caliper_client_cpu_avg | percent | 0.07125 | 0.07125 |  |
| primary | retail-transfer-high | /peer0.commercial.paynet | caliper_client_cpu_max | percent | 0.1025 | 0.1025 |  |
| primary | retail-transfer-high | /peer0.commercial.paynet | caliper_client_memory_avg | bytes | 110 | 110 |  |
| primary | retail-transfer-high | /peer0.commercial.paynet | caliper_client_memory_max | bytes | 113 | 113 |  |
| primary | retail-transfer-high | /peer0.bi.paynet | caliper_client_cpu_avg | percent | 0.075 | 0.075 |  |
| primary | retail-transfer-high | /peer0.bi.paynet | caliper_client_cpu_max | percent | 0.12125 | 0.12125 |  |
| primary | retail-transfer-high | /peer0.bi.paynet | caliper_client_memory_avg | bytes | 114 | 114 |  |
| primary | retail-transfer-high | /peer0.bi.paynet | caliper_client_memory_max | bytes | 116 | 116 |  |
| primary | retail-transfer-high | /peer0.himbara.paynet | caliper_client_cpu_avg | percent | 0.29 | 0.29 |  |
| primary | retail-transfer-high | /peer0.himbara.paynet | caliper_client_cpu_max | percent | 0.4175 | 0.4175 |  |
| primary | retail-transfer-high | /peer0.himbara.paynet | caliper_client_memory_avg | bytes | 114 | 114 |  |
| primary | retail-transfer-high | /peer0.himbara.paynet | caliper_client_memory_max | bytes | 117 | 117 |  |
| primary | retail-transfer-high | /peer0.pjp.paynet | caliper_client_cpu_avg | percent | 0.07125 | 0.07125 |  |
| primary | retail-transfer-high | /peer0.pjp.paynet | caliper_client_cpu_max | percent | 0.09625 | 0.09625 |  |
| primary | retail-transfer-high | /peer0.pjp.paynet | caliper_client_memory_avg | bytes | 111 | 111 |  |
| primary | retail-transfer-high | /peer0.pjp.paynet | caliper_client_memory_max | bytes | 116 | 116 |  |
| primary | retail-transfer-high | /peer0.ojk.paynet | caliper_client_cpu_avg | percent | 0.07125 | 0.07125 |  |
| primary | retail-transfer-high | /peer0.ojk.paynet | caliper_client_cpu_max | percent | 0.1125 | 0.1125 |  |
| primary | retail-transfer-high | /peer0.ojk.paynet | caliper_client_memory_avg | bytes | 111 | 111 |  |
| primary | retail-transfer-high | /peer0.ojk.paynet | caliper_client_memory_max | bytes | 114 | 114 |  |
| primary | retail-transfer-high | /couchdb0.himbara.paynet | caliper_client_cpu_avg | percent | 0.3925 | 0.3925 |  |
| primary | retail-transfer-high | /couchdb0.himbara.paynet | caliper_client_cpu_max | percent | 0.675 | 0.675 |  |
| primary | retail-transfer-high | /couchdb0.himbara.paynet | caliper_client_memory_avg | bytes | 55.1 | 55.1 |  |
| primary | retail-transfer-high | /couchdb0.himbara.paynet | caliper_client_memory_max | bytes | 56.9 | 56.9 |  |
| primary | retail-transfer-high | /couchdb0.bi.paynet | caliper_client_cpu_avg | percent | 0.32625 | 0.32625 |  |
| primary | retail-transfer-high | /couchdb0.bi.paynet | caliper_client_cpu_max | percent | 0.63125 | 0.63125 |  |
| primary | retail-transfer-high | /couchdb0.bi.paynet | caliper_client_memory_avg | bytes | 57.4 | 57.4 |  |
| primary | retail-transfer-high | /couchdb0.bi.paynet | caliper_client_memory_max | bytes | 60.4 | 60.4 |  |
| primary | retail-transfer-high | /couchdb0.pjp.paynet | caliper_client_cpu_avg | percent | 0.3375 | 0.3375 |  |
| primary | retail-transfer-high | /couchdb0.pjp.paynet | caliper_client_cpu_max | percent | 0.6525 | 0.6525 |  |
| primary | retail-transfer-high | /couchdb0.pjp.paynet | caliper_client_memory_avg | bytes | 54.9 | 54.9 |  |
| primary | retail-transfer-high | /couchdb0.pjp.paynet | caliper_client_memory_max | bytes | 58.1 | 58.1 |  |
| primary | retail-transfer-high | /couchdb0.commercial.paynet | caliper_client_cpu_avg | percent | 0.3375 | 0.3375 |  |
| primary | retail-transfer-high | /couchdb0.commercial.paynet | caliper_client_cpu_max | percent | 0.63375 | 0.63375 |  |
| primary | retail-transfer-high | /couchdb0.commercial.paynet | caliper_client_memory_avg | bytes | 54.7 | 54.7 |  |
| primary | retail-transfer-high | /couchdb0.commercial.paynet | caliper_client_memory_max | bytes | 56.4 | 56.4 |  |
| primary | retail-transfer-high | /orderer.paynet | caliper_client_cpu_avg | percent | 0.05 | 0.05 |  |
| primary | retail-transfer-high | /orderer.paynet | caliper_client_cpu_max | percent | 0.07 | 0.07 |  |
| primary | retail-transfer-high | /orderer.paynet | caliper_client_memory_avg | bytes | 52.4 | 52.4 |  |
| primary | retail-transfer-high | /orderer.paynet | caliper_client_memory_max | bytes | 71.7 | 71.7 |  |
| primary | retail-transfer-high | /couchdb0.ojk.paynet | caliper_client_cpu_avg | percent | 0.33375 | 0.33375 |  |
| primary | retail-transfer-high | /couchdb0.ojk.paynet | caliper_client_cpu_max | percent | 0.6425 | 0.6425 |  |
| primary | retail-transfer-high | /couchdb0.ojk.paynet | caliper_client_memory_avg | bytes | 55.4 | 55.4 |  |
| primary | retail-transfer-high | /couchdb0.ojk.paynet | caliper_client_memory_max | bytes | 57.8 | 57.8 |  |
| primary | retail-transfer-high | node caliper(sum) | caliper_client_cpu_avg | percent | 20.51 | 20.51 |  |
| primary | retail-transfer-high | node caliper(sum) | caliper_client_cpu_max | percent | 54 | 54 |  |
| primary | retail-transfer-high | node-exporter:9100 | host_cpu_busy_percent | % | 29.41445481577671 | 35.68759642857448 | 34.54913793103985 |
| primary | retail-transfer-high | node-exporter:9100 | host_memory_used_bytes | bytes | 5579385129.57265 | 6025551872 | 5713738137.599999 |
| primary | retail-transfer-high | node-exporter:9100 | host_read_iops | operations_per_second | 0.020524934915021126 | 0.17857142857142855 | 0.1724137931034483 |
| primary | retail-transfer-high | node-exporter:9100 | host_write_iops | operations_per_second | 570.1992709878796 | 1544.896551724138 | 1450.6896551724135 |
| primary | retail-transfer-high | node-exporter:9100 | host_read_await_ms | milliseconds_per_operation | 0.025641025640419316 | 0.2499999999940883 | 0.19999999999527066 |
| primary | retail-transfer-high | node-exporter:9100 | host_write_await_ms | milliseconds_per_operation | 3.1055669695277874 | 9.443533612063678 | 8.740850532171907 |
| primary | retail-transfer-high | /peer0.pjp.paynet | caliper_client_cpu_avg | percent | 0.07625 | 0.07625 |  |
| primary | retail-transfer-high | /peer0.pjp.paynet | caliper_client_cpu_max | percent | 0.20375 | 0.20375 |  |
| primary | retail-transfer-high | /peer0.pjp.paynet | caliper_client_memory_avg | bytes | 113 | 113 |  |
| primary | retail-transfer-high | /peer0.pjp.paynet | caliper_client_memory_max | bytes | 117 | 117 |  |
| primary | retail-transfer-high | /peer0.commercial.paynet | caliper_client_cpu_avg | percent | 0.075 | 0.075 |  |
| primary | retail-transfer-high | /peer0.commercial.paynet | caliper_client_cpu_max | percent | 0.115 | 0.115 |  |
| primary | retail-transfer-high | /peer0.commercial.paynet | caliper_client_memory_avg | bytes | 114 | 114 |  |
| primary | retail-transfer-high | /peer0.commercial.paynet | caliper_client_memory_max | bytes | 117 | 117 |  |
| primary | retail-transfer-high | /peer0.bi.paynet | caliper_client_cpu_avg | percent | 0.07625 | 0.07625 |  |
| primary | retail-transfer-high | /peer0.bi.paynet | caliper_client_cpu_max | percent | 0.105 | 0.105 |  |
| primary | retail-transfer-high | /peer0.bi.paynet | caliper_client_memory_avg | bytes | 110 | 110 |  |
| primary | retail-transfer-high | /peer0.bi.paynet | caliper_client_memory_max | bytes | 114 | 114 |  |
| primary | retail-transfer-high | /peer0.ojk.paynet | caliper_client_cpu_avg | percent | 0.07625 | 0.07625 |  |
| primary | retail-transfer-high | /peer0.ojk.paynet | caliper_client_cpu_max | percent | 0.15125 | 0.15125 |  |
| primary | retail-transfer-high | /peer0.ojk.paynet | caliper_client_memory_avg | bytes | 113 | 113 |  |
| primary | retail-transfer-high | /peer0.ojk.paynet | caliper_client_memory_max | bytes | 116 | 116 |  |
| primary | retail-transfer-high | /peer0.himbara.paynet | caliper_client_cpu_avg | percent | 0.28625 | 0.28625 |  |
| primary | retail-transfer-high | /peer0.himbara.paynet | caliper_client_cpu_max | percent | 0.335 | 0.335 |  |
| primary | retail-transfer-high | /peer0.himbara.paynet | caliper_client_memory_avg | bytes | 116 | 116 |  |
| primary | retail-transfer-high | /peer0.himbara.paynet | caliper_client_memory_max | bytes | 118 | 118 |  |
| primary | retail-transfer-high | /couchdb0.pjp.paynet | caliper_client_cpu_avg | percent | 0.35 | 0.35 |  |
| primary | retail-transfer-high | /couchdb0.pjp.paynet | caliper_client_cpu_max | percent | 0.785 | 0.785 |  |
| primary | retail-transfer-high | /couchdb0.pjp.paynet | caliper_client_memory_avg | bytes | 52.7 | 52.7 |  |
| primary | retail-transfer-high | /couchdb0.pjp.paynet | caliper_client_memory_max | bytes | 55.7 | 55.7 |  |
| primary | retail-transfer-high | /couchdb0.commercial.paynet | caliper_client_cpu_avg | percent | 0.35375 | 0.35375 |  |
| primary | retail-transfer-high | /couchdb0.commercial.paynet | caliper_client_cpu_max | percent | 0.65875 | 0.65875 |  |
| primary | retail-transfer-high | /couchdb0.commercial.paynet | caliper_client_memory_avg | bytes | 53.1 | 53.1 |  |
| primary | retail-transfer-high | /couchdb0.commercial.paynet | caliper_client_memory_max | bytes | 55.3 | 55.3 |  |
| primary | retail-transfer-high | /orderer.paynet | caliper_client_cpu_avg | percent | 0.045 | 0.045 |  |
| primary | retail-transfer-high | /orderer.paynet | caliper_client_cpu_max | percent | 0.0575 | 0.0575 |  |
| primary | retail-transfer-high | /orderer.paynet | caliper_client_memory_avg | bytes | 52.7 | 52.7 |  |
| primary | retail-transfer-high | /orderer.paynet | caliper_client_memory_max | bytes | 67.5 | 67.5 |  |
| primary | retail-transfer-high | /couchdb0.himbara.paynet | caliper_client_cpu_avg | percent | 0.41375 | 0.41375 |  |
| primary | retail-transfer-high | /couchdb0.himbara.paynet | caliper_client_cpu_max | percent | 0.75375 | 0.75375 |  |
| primary | retail-transfer-high | /couchdb0.himbara.paynet | caliper_client_memory_avg | bytes | 52.1 | 52.1 |  |
| primary | retail-transfer-high | /couchdb0.himbara.paynet | caliper_client_memory_max | bytes | 55.5 | 55.5 |  |
| primary | retail-transfer-high | /couchdb0.ojk.paynet | caliper_client_cpu_avg | percent | 0.35875 | 0.35875 |  |
| primary | retail-transfer-high | /couchdb0.ojk.paynet | caliper_client_cpu_max | percent | 0.76625 | 0.76625 |  |
| primary | retail-transfer-high | /couchdb0.ojk.paynet | caliper_client_memory_avg | bytes | 53.6 | 53.6 |  |
| primary | retail-transfer-high | /couchdb0.ojk.paynet | caliper_client_memory_max | bytes | 55.8 | 55.8 |  |
| primary | retail-transfer-high | /couchdb0.bi.paynet | caliper_client_cpu_avg | percent | 0.35 | 0.35 |  |
| primary | retail-transfer-high | /couchdb0.bi.paynet | caliper_client_cpu_max | percent | 0.68375 | 0.68375 |  |
| primary | retail-transfer-high | /couchdb0.bi.paynet | caliper_client_memory_avg | bytes | 53 | 53 |  |
| primary | retail-transfer-high | /couchdb0.bi.paynet | caliper_client_memory_max | bytes | 54.7 | 54.7 |  |
| primary | retail-transfer-high | node caliper(sum) | caliper_client_cpu_avg | percent | 20.52 | 20.52 |  |
| primary | retail-transfer-high | node caliper(sum) | caliper_client_cpu_max | percent | 50 | 50 |  |
| primary | retail-transfer-high | node-exporter:9100 | host_cpu_busy_percent | % | 80.7544955516548 | 92.08188437501067 | 91.86530172414678 |
| primary | retail-transfer-high | node-exporter:9100 | host_memory_used_bytes | bytes | 5557524372.210526 | 5877592064 | 5708783820.799999 |
| primary | retail-transfer-high | node-exporter:9100 | host_read_iops | operations_per_second | 0.023190663700780684 | 0.31036623215394166 | 0.13793103448275862 |
| primary | retail-transfer-high | node-exporter:9100 | host_write_iops | operations_per_second | 2061.417370801322 | 5271.137931034483 | 5001.58275862069 |
| primary | retail-transfer-high | node-exporter:9100 | host_read_await_ms | milliseconds_per_operation | 0.0024366471734316598 | 0.11111111110848369 | 0 |
| primary | retail-transfer-high | node-exporter:9100 | host_write_await_ms | milliseconds_per_operation | 1.8121621488117714 | 7.301033853638437 | 4.866227999353392 |
| primary | retail-transfer-high | /peer0.bi.paynet | caliper_client_cpu_avg | percent | 0.2175 | 0.2175 |  |
| primary | retail-transfer-high | /peer0.bi.paynet | caliper_client_cpu_max | percent | 0.2975 | 0.2975 |  |
| primary | retail-transfer-high | /peer0.bi.paynet | caliper_client_memory_avg | bytes | 116 | 116 |  |
| primary | retail-transfer-high | /peer0.bi.paynet | caliper_client_memory_max | bytes | 120 | 120 |  |
| primary | retail-transfer-high | /peer0.himbara.paynet | caliper_client_cpu_avg | percent | 0.7875 | 0.7875 |  |
| primary | retail-transfer-high | /peer0.himbara.paynet | caliper_client_cpu_max | percent | 1.05375 | 1.05375 |  |
| primary | retail-transfer-high | /peer0.himbara.paynet | caliper_client_memory_avg | bytes | 122 | 122 |  |
| primary | retail-transfer-high | /peer0.himbara.paynet | caliper_client_memory_max | bytes | 128 | 128 |  |
| primary | retail-transfer-high | /peer0.ojk.paynet | caliper_client_cpu_avg | percent | 0.2125 | 0.2125 |  |
| primary | retail-transfer-high | /peer0.ojk.paynet | caliper_client_cpu_max | percent | 0.275 | 0.275 |  |
| primary | retail-transfer-high | /peer0.ojk.paynet | caliper_client_memory_avg | bytes | 112 | 112 |  |
| primary | retail-transfer-high | /peer0.ojk.paynet | caliper_client_memory_max | bytes | 117 | 117 |  |
| primary | retail-transfer-high | /peer0.pjp.paynet | caliper_client_cpu_avg | percent | 0.2125 | 0.2125 |  |
| primary | retail-transfer-high | /peer0.pjp.paynet | caliper_client_cpu_max | percent | 0.2675 | 0.2675 |  |
| primary | retail-transfer-high | /peer0.pjp.paynet | caliper_client_memory_avg | bytes | 115 | 115 |  |
| primary | retail-transfer-high | /peer0.pjp.paynet | caliper_client_memory_max | bytes | 120 | 120 |  |
| primary | retail-transfer-high | /peer0.commercial.paynet | caliper_client_cpu_avg | percent | 0.2175 | 0.2175 |  |
| primary | retail-transfer-high | /peer0.commercial.paynet | caliper_client_cpu_max | percent | 0.3075 | 0.3075 |  |
| primary | retail-transfer-high | /peer0.commercial.paynet | caliper_client_memory_avg | bytes | 113 | 113 |  |
| primary | retail-transfer-high | /peer0.commercial.paynet | caliper_client_memory_max | bytes | 117 | 117 |  |
| primary | retail-transfer-high | /couchdb0.himbara.paynet | caliper_client_cpu_avg | percent | 1.315 | 1.315 |  |
| primary | retail-transfer-high | /couchdb0.himbara.paynet | caliper_client_cpu_max | percent | 1.79875 | 1.79875 |  |
| primary | retail-transfer-high | /couchdb0.himbara.paynet | caliper_client_memory_avg | bytes | 61.7 | 61.7 |  |
| primary | retail-transfer-high | /couchdb0.himbara.paynet | caliper_client_memory_max | bytes | 76.8 | 76.8 |  |
| primary | retail-transfer-high | /couchdb0.commercial.paynet | caliper_client_cpu_avg | percent | 1.165 | 1.165 |  |
| primary | retail-transfer-high | /couchdb0.commercial.paynet | caliper_client_cpu_max | percent | 1.61 | 1.61 |  |
| primary | retail-transfer-high | /couchdb0.commercial.paynet | caliper_client_memory_avg | bytes | 63.4 | 63.4 |  |
| primary | retail-transfer-high | /couchdb0.commercial.paynet | caliper_client_memory_max | bytes | 80.8 | 80.8 |  |
| primary | retail-transfer-high | /couchdb0.pjp.paynet | caliper_client_cpu_avg | percent | 1.1425 | 1.1425 |  |
| primary | retail-transfer-high | /couchdb0.pjp.paynet | caliper_client_cpu_max | percent | 1.545 | 1.545 |  |
| primary | retail-transfer-high | /couchdb0.pjp.paynet | caliper_client_memory_avg | bytes | 59.9 | 59.9 |  |
| primary | retail-transfer-high | /couchdb0.pjp.paynet | caliper_client_memory_max | bytes | 74.5 | 74.5 |  |
| primary | retail-transfer-high | /couchdb0.bi.paynet | caliper_client_cpu_avg | percent | 1.15375 | 1.15375 |  |
| primary | retail-transfer-high | /couchdb0.bi.paynet | caliper_client_cpu_max | percent | 1.61375 | 1.61375 |  |
| primary | retail-transfer-high | /couchdb0.bi.paynet | caliper_client_memory_avg | bytes | 61.5 | 61.5 |  |
| primary | retail-transfer-high | /couchdb0.bi.paynet | caliper_client_memory_max | bytes | 77.4 | 77.4 |  |
| primary | retail-transfer-high | /couchdb0.ojk.paynet | caliper_client_cpu_avg | percent | 1.16 | 1.16 |  |
| primary | retail-transfer-high | /couchdb0.ojk.paynet | caliper_client_cpu_max | percent | 1.635 | 1.635 |  |
| primary | retail-transfer-high | /couchdb0.ojk.paynet | caliper_client_memory_avg | bytes | 62.9 | 62.9 |  |
| primary | retail-transfer-high | /couchdb0.ojk.paynet | caliper_client_memory_max | bytes | 80.1 | 80.1 |  |
| primary | retail-transfer-high | /orderer.paynet | caliper_client_cpu_avg | percent | 0.18875 | 0.18875 |  |
| primary | retail-transfer-high | /orderer.paynet | caliper_client_cpu_max | percent | 0.25375 | 0.25375 |  |
| primary | retail-transfer-high | /orderer.paynet | caliper_client_memory_avg | bytes | 59.1 | 59.1 |  |
| primary | retail-transfer-high | /orderer.paynet | caliper_client_memory_max | bytes | 78.4 | 78.4 |  |
| primary | retail-transfer-high | node caliper(sum) | caliper_client_cpu_avg | percent | 76.55 | 76.55 |  |
| primary | retail-transfer-high | node caliper(sum) | caliper_client_cpu_max | percent | 117.17 | 117.17 |  |
| primary | retail-transfer-high | node-exporter:9100 | host_cpu_busy_percent | % | 80.74342344767574 | 92.62946428572312 | 92.16681034482556 |
| primary | retail-transfer-high | node-exporter:9100 | host_memory_used_bytes | bytes | 5567952249.263158 | 5940568064 | 5750683033.599999 |
| primary | retail-transfer-high | node-exporter:9100 | host_read_iops | operations_per_second | 0.0857424373632939 | 2.103448275862069 | 0.24137931034482757 |
| primary | retail-transfer-high | node-exporter:9100 | host_write_iops | operations_per_second | 2049.6580589786554 | 5131.714285714285 | 4939.603448275862 |
| primary | retail-transfer-high | node-exporter:9100 | host_read_await_ms | milliseconds_per_operation | 0.04019274998313929 | 0.5000000000450199 | 0.2499999999940883 |
| primary | retail-transfer-high | node-exporter:9100 | host_write_await_ms | milliseconds_per_operation | 2.3103096931625897 | 9.757086167800425 | 8.000225720592708 |
| primary | retail-transfer-high | /peer0.ojk.paynet | caliper_client_cpu_avg | percent | 0.215 | 0.215 |  |
| primary | retail-transfer-high | /peer0.ojk.paynet | caliper_client_cpu_max | percent | 0.40375 | 0.40375 |  |
| primary | retail-transfer-high | /peer0.ojk.paynet | caliper_client_memory_avg | bytes | 112 | 112 |  |
| primary | retail-transfer-high | /peer0.ojk.paynet | caliper_client_memory_max | bytes | 116 | 116 |  |
| primary | retail-transfer-high | /peer0.pjp.paynet | caliper_client_cpu_avg | percent | 0.2175 | 0.2175 |  |
| primary | retail-transfer-high | /peer0.pjp.paynet | caliper_client_cpu_max | percent | 0.31125 | 0.31125 |  |
| primary | retail-transfer-high | /peer0.pjp.paynet | caliper_client_memory_avg | bytes | 119 | 119 |  |
| primary | retail-transfer-high | /peer0.pjp.paynet | caliper_client_memory_max | bytes | 124 | 124 |  |
| primary | retail-transfer-high | /peer0.commercial.paynet | caliper_client_cpu_avg | percent | 0.21875 | 0.21875 |  |
| primary | retail-transfer-high | /peer0.commercial.paynet | caliper_client_cpu_max | percent | 0.295 | 0.295 |  |
| primary | retail-transfer-high | /peer0.commercial.paynet | caliper_client_memory_avg | bytes | 114 | 114 |  |
| primary | retail-transfer-high | /peer0.commercial.paynet | caliper_client_memory_max | bytes | 119 | 119 |  |
| primary | retail-transfer-high | /peer0.himbara.paynet | caliper_client_cpu_avg | percent | 0.73875 | 0.73875 |  |
| primary | retail-transfer-high | /peer0.himbara.paynet | caliper_client_cpu_max | percent | 0.9375 | 0.9375 |  |
| primary | retail-transfer-high | /peer0.himbara.paynet | caliper_client_memory_avg | bytes | 118 | 118 |  |
| primary | retail-transfer-high | /peer0.himbara.paynet | caliper_client_memory_max | bytes | 124 | 124 |  |
| primary | retail-transfer-high | /peer0.bi.paynet | caliper_client_cpu_avg | percent | 0.2175 | 0.2175 |  |
| primary | retail-transfer-high | /peer0.bi.paynet | caliper_client_cpu_max | percent | 0.3425 | 0.3425 |  |
| primary | retail-transfer-high | /peer0.bi.paynet | caliper_client_memory_avg | bytes | 118 | 118 |  |
| primary | retail-transfer-high | /peer0.bi.paynet | caliper_client_memory_max | bytes | 122 | 122 |  |
| primary | retail-transfer-high | /orderer.paynet | caliper_client_cpu_avg | percent | 0.19125 | 0.19125 |  |
| primary | retail-transfer-high | /orderer.paynet | caliper_client_cpu_max | percent | 0.245 | 0.245 |  |
| primary | retail-transfer-high | /orderer.paynet | caliper_client_memory_avg | bytes | 58.9 | 58.9 |  |
| primary | retail-transfer-high | /orderer.paynet | caliper_client_memory_max | bytes | 78.4 | 78.4 |  |
| primary | retail-transfer-high | /couchdb0.himbara.paynet | caliper_client_cpu_avg | percent | 1.3725 | 1.3725 |  |
| primary | retail-transfer-high | /couchdb0.himbara.paynet | caliper_client_cpu_max | percent | 2.07 | 2.07 |  |
| primary | retail-transfer-high | /couchdb0.himbara.paynet | caliper_client_memory_avg | bytes | 62.1 | 62.1 |  |
| primary | retail-transfer-high | /couchdb0.himbara.paynet | caliper_client_memory_max | bytes | 79.6 | 79.6 |  |
| primary | retail-transfer-high | /couchdb0.commercial.paynet | caliper_client_cpu_avg | percent | 1.1625 | 1.1625 |  |
| primary | retail-transfer-high | /couchdb0.commercial.paynet | caliper_client_cpu_max | percent | 1.73125 | 1.73125 |  |
| primary | retail-transfer-high | /couchdb0.commercial.paynet | caliper_client_memory_avg | bytes | 62.5 | 62.5 |  |
| primary | retail-transfer-high | /couchdb0.commercial.paynet | caliper_client_memory_max | bytes | 86.7 | 86.7 |  |
| primary | retail-transfer-high | /couchdb0.ojk.paynet | caliper_client_cpu_avg | percent | 1.175 | 1.175 |  |
| primary | retail-transfer-high | /couchdb0.ojk.paynet | caliper_client_cpu_max | percent | 1.605 | 1.605 |  |
| primary | retail-transfer-high | /couchdb0.ojk.paynet | caliper_client_memory_avg | bytes | 62.8 | 62.8 |  |
| primary | retail-transfer-high | /couchdb0.ojk.paynet | caliper_client_memory_max | bytes | 78.8 | 78.8 |  |
| primary | retail-transfer-high | /couchdb0.bi.paynet | caliper_client_cpu_avg | percent | 1.19625 | 1.19625 |  |
| primary | retail-transfer-high | /couchdb0.bi.paynet | caliper_client_cpu_max | percent | 1.87 | 1.87 |  |
| primary | retail-transfer-high | /couchdb0.bi.paynet | caliper_client_memory_avg | bytes | 63.1 | 63.1 |  |
| primary | retail-transfer-high | /couchdb0.bi.paynet | caliper_client_memory_max | bytes | 79.5 | 79.5 |  |
| primary | retail-transfer-high | /couchdb0.pjp.paynet | caliper_client_cpu_avg | percent | 1.16625 | 1.16625 |  |
| primary | retail-transfer-high | /couchdb0.pjp.paynet | caliper_client_cpu_max | percent | 1.6625 | 1.6625 |  |
| primary | retail-transfer-high | /couchdb0.pjp.paynet | caliper_client_memory_avg | bytes | 63.2 | 63.2 |  |
| primary | retail-transfer-high | /couchdb0.pjp.paynet | caliper_client_memory_max | bytes | 79.2 | 79.2 |  |
| primary | retail-transfer-high | node caliper(sum) | caliper_client_cpu_avg | percent | 76.75 | 76.75 |  |
| primary | retail-transfer-high | node caliper(sum) | caliper_client_cpu_max | percent | 122.77 | 122.77 |  |
| primary | retail-transfer-high | node-exporter:9100 | host_cpu_busy_percent | % | 80.56554234015411 | 93.24999999999223 | 92.98320696994216 |
| primary | retail-transfer-high | node-exporter:9100 | host_memory_used_bytes | bytes | 5638772500.38938 | 6141718528 | 5914705100.8 |
| primary | retail-transfer-high | node-exporter:9100 | host_read_iops | operations_per_second | 0.2884394193939114 | 1.9642857142857142 | 1.896551724137931 |
| primary | retail-transfer-high | node-exporter:9100 | host_write_iops | operations_per_second | 2077.3186587203045 | 5337.0344827586205 | 5120.310344827586 |
| primary | retail-transfer-high | node-exporter:9100 | host_read_await_ms | milliseconds_per_operation | 0.05231237529522374 | 0.3636363636360329 | 0.3636363636360329 |
| primary | retail-transfer-high | node-exporter:9100 | host_write_await_ms | milliseconds_per_operation | 1.6645598962990122 | 6.309588305088394 | 5.2848904294670795 |
| primary | retail-transfer-high | /peer0.pjp.paynet | caliper_client_cpu_avg | percent | 0.22 | 0.22 |  |
| primary | retail-transfer-high | /peer0.pjp.paynet | caliper_client_cpu_max | percent | 0.28125 | 0.28125 |  |
| primary | retail-transfer-high | /peer0.pjp.paynet | caliper_client_memory_avg | bytes | 115 | 115 |  |
| primary | retail-transfer-high | /peer0.pjp.paynet | caliper_client_memory_max | bytes | 121 | 121 |  |
| primary | retail-transfer-high | /peer0.commercial.paynet | caliper_client_cpu_avg | percent | 0.22 | 0.22 |  |
| primary | retail-transfer-high | /peer0.commercial.paynet | caliper_client_cpu_max | percent | 0.2975 | 0.2975 |  |
| primary | retail-transfer-high | /peer0.commercial.paynet | caliper_client_memory_avg | bytes | 118 | 118 |  |
| primary | retail-transfer-high | /peer0.commercial.paynet | caliper_client_memory_max | bytes | 122 | 122 |  |
| primary | retail-transfer-high | /peer0.himbara.paynet | caliper_client_cpu_avg | percent | 0.7575 | 0.7575 |  |
| primary | retail-transfer-high | /peer0.himbara.paynet | caliper_client_cpu_max | percent | 0.9925 | 0.9925 |  |
| primary | retail-transfer-high | /peer0.himbara.paynet | caliper_client_memory_avg | bytes | 122 | 122 |  |
| primary | retail-transfer-high | /peer0.himbara.paynet | caliper_client_memory_max | bytes | 129 | 129 |  |
| primary | retail-transfer-high | /peer0.ojk.paynet | caliper_client_cpu_avg | percent | 0.2175 | 0.2175 |  |
| primary | retail-transfer-high | /peer0.ojk.paynet | caliper_client_cpu_max | percent | 0.2875 | 0.2875 |  |
| primary | retail-transfer-high | /peer0.ojk.paynet | caliper_client_memory_avg | bytes | 117 | 117 |  |
| primary | retail-transfer-high | /peer0.ojk.paynet | caliper_client_memory_max | bytes | 126 | 126 |  |
| primary | retail-transfer-high | /peer0.bi.paynet | caliper_client_cpu_avg | percent | 0.21875 | 0.21875 |  |
| primary | retail-transfer-high | /peer0.bi.paynet | caliper_client_cpu_max | percent | 0.2925 | 0.2925 |  |
| primary | retail-transfer-high | /peer0.bi.paynet | caliper_client_memory_avg | bytes | 118 | 118 |  |
| primary | retail-transfer-high | /peer0.bi.paynet | caliper_client_memory_max | bytes | 123 | 123 |  |
| primary | retail-transfer-high | /couchdb0.bi.paynet | caliper_client_cpu_avg | percent | 1.18625 | 1.18625 |  |
| primary | retail-transfer-high | /couchdb0.bi.paynet | caliper_client_cpu_max | percent | 1.8225 | 1.8225 |  |
| primary | retail-transfer-high | /couchdb0.bi.paynet | caliper_client_memory_avg | bytes | 63 | 63 |  |
| primary | retail-transfer-high | /couchdb0.bi.paynet | caliper_client_memory_max | bytes | 78.1 | 78.1 |  |
| primary | retail-transfer-high | /couchdb0.commercial.paynet | caliper_client_cpu_avg | percent | 1.185 | 1.185 |  |
| primary | retail-transfer-high | /couchdb0.commercial.paynet | caliper_client_cpu_max | percent | 1.7325 | 1.7325 |  |
| primary | retail-transfer-high | /couchdb0.commercial.paynet | caliper_client_memory_avg | bytes | 61.4 | 61.4 |  |
| primary | retail-transfer-high | /couchdb0.commercial.paynet | caliper_client_memory_max | bytes | 79.6 | 79.6 |  |
| primary | retail-transfer-high | /couchdb0.pjp.paynet | caliper_client_cpu_avg | percent | 1.2025 | 1.2025 |  |
| primary | retail-transfer-high | /couchdb0.pjp.paynet | caliper_client_cpu_max | percent | 1.98125 | 1.98125 |  |
| primary | retail-transfer-high | /couchdb0.pjp.paynet | caliper_client_memory_avg | bytes | 61.4 | 61.4 |  |
| primary | retail-transfer-high | /couchdb0.pjp.paynet | caliper_client_memory_max | bytes | 80.7 | 80.7 |  |
| primary | retail-transfer-high | /couchdb0.ojk.paynet | caliper_client_cpu_avg | percent | 1.19125 | 1.19125 |  |
| primary | retail-transfer-high | /couchdb0.ojk.paynet | caliper_client_cpu_max | percent | 1.815 | 1.815 |  |
| primary | retail-transfer-high | /couchdb0.ojk.paynet | caliper_client_memory_avg | bytes | 62.2 | 62.2 |  |
| primary | retail-transfer-high | /couchdb0.ojk.paynet | caliper_client_memory_max | bytes | 84 | 84 |  |
| primary | retail-transfer-high | /couchdb0.himbara.paynet | caliper_client_cpu_avg | percent | 1.37 | 1.37 |  |
| primary | retail-transfer-high | /couchdb0.himbara.paynet | caliper_client_cpu_max | percent | 2.0625 | 2.0625 |  |
| primary | retail-transfer-high | /couchdb0.himbara.paynet | caliper_client_memory_avg | bytes | 62.5 | 62.5 |  |
| primary | retail-transfer-high | /couchdb0.himbara.paynet | caliper_client_memory_max | bytes | 82.3 | 82.3 |  |
| primary | retail-transfer-high | /orderer.paynet | caliper_client_cpu_avg | percent | 0.17375 | 0.17375 |  |
| primary | retail-transfer-high | /orderer.paynet | caliper_client_cpu_max | percent | 0.3625 | 0.3625 |  |
| primary | retail-transfer-high | /orderer.paynet | caliper_client_memory_avg | bytes | 60.9 | 60.9 |  |
| primary | retail-transfer-high | /orderer.paynet | caliper_client_memory_max | bytes | 78.6 | 78.6 |  |
| primary | retail-transfer-high | node caliper(sum) | caliper_client_cpu_avg | percent | 78.22 | 78.22 |  |
| primary | retail-transfer-high | node caliper(sum) | caliper_client_cpu_max | percent | 123 | 123 |  |
| primary | retail-transfer-high | node-exporter:9100 | host_cpu_busy_percent | % | 80.63329190341356 | 92.61851666665827 | 92.11293103448355 |
| primary | retail-transfer-high | node-exporter:9100 | host_memory_used_bytes | bytes | 5595439211.789474 | 5983608832 | 5813223628.799999 |
| primary | retail-transfer-high | node-exporter:9100 | host_read_iops | operations_per_second | 0.08620494591056986 | 1.3214285714285714 | 0.6960233579638749 |
| primary | retail-transfer-high | node-exporter:9100 | host_write_iops | operations_per_second | 2027.545050290469 | 5084.857142857142 | 4889.805172413792 |
| primary | retail-transfer-high | node-exporter:9100 | host_read_await_ms | milliseconds_per_operation | 0.1397990095332735 | 0.9999999999763532 | 0.9999999999763532 |
| primary | retail-transfer-high | node-exporter:9100 | host_write_await_ms | milliseconds_per_operation | 1.5081442657714568 | 6.687811539016676 | 5.497101377561297 |
| primary | retail-transfer-high | /peer0.commercial.paynet | caliper_client_cpu_avg | percent | 0.21875 | 0.21875 |  |
| primary | retail-transfer-high | /peer0.commercial.paynet | caliper_client_cpu_max | percent | 0.39625 | 0.39625 |  |
| primary | retail-transfer-high | /peer0.commercial.paynet | caliper_client_memory_avg | bytes | 118 | 118 |  |
| primary | retail-transfer-high | /peer0.commercial.paynet | caliper_client_memory_max | bytes | 124 | 124 |  |
| primary | retail-transfer-high | /peer0.bi.paynet | caliper_client_cpu_avg | percent | 0.215 | 0.215 |  |
| primary | retail-transfer-high | /peer0.bi.paynet | caliper_client_cpu_max | percent | 0.29125 | 0.29125 |  |
| primary | retail-transfer-high | /peer0.bi.paynet | caliper_client_memory_avg | bytes | 118 | 118 |  |
| primary | retail-transfer-high | /peer0.bi.paynet | caliper_client_memory_max | bytes | 122 | 122 |  |
| primary | retail-transfer-high | /peer0.ojk.paynet | caliper_client_cpu_avg | percent | 0.2125 | 0.2125 |  |
| primary | retail-transfer-high | /peer0.ojk.paynet | caliper_client_cpu_max | percent | 0.2725 | 0.2725 |  |
| primary | retail-transfer-high | /peer0.ojk.paynet | caliper_client_memory_avg | bytes | 117 | 117 |  |
| primary | retail-transfer-high | /peer0.ojk.paynet | caliper_client_memory_max | bytes | 123 | 123 |  |
| primary | retail-transfer-high | /peer0.himbara.paynet | caliper_client_cpu_avg | percent | 0.715 | 0.715 |  |
| primary | retail-transfer-high | /peer0.himbara.paynet | caliper_client_cpu_max | percent | 0.89 | 0.89 |  |
| primary | retail-transfer-high | /peer0.himbara.paynet | caliper_client_memory_avg | bytes | 119 | 119 |  |
| primary | retail-transfer-high | /peer0.himbara.paynet | caliper_client_memory_max | bytes | 128 | 128 |  |
| primary | retail-transfer-high | /peer0.pjp.paynet | caliper_client_cpu_avg | percent | 0.21375 | 0.21375 |  |
| primary | retail-transfer-high | /peer0.pjp.paynet | caliper_client_cpu_max | percent | 0.2725 | 0.2725 |  |
| primary | retail-transfer-high | /peer0.pjp.paynet | caliper_client_memory_avg | bytes | 122 | 122 |  |
| primary | retail-transfer-high | /peer0.pjp.paynet | caliper_client_memory_max | bytes | 128 | 128 |  |
| primary | retail-transfer-high | /couchdb0.ojk.paynet | caliper_client_cpu_avg | percent | 1.13875 | 1.13875 |  |
| primary | retail-transfer-high | /couchdb0.ojk.paynet | caliper_client_cpu_max | percent | 1.49125 | 1.49125 |  |
| primary | retail-transfer-high | /couchdb0.ojk.paynet | caliper_client_memory_avg | bytes | 62.3 | 62.3 |  |
| primary | retail-transfer-high | /couchdb0.ojk.paynet | caliper_client_memory_max | bytes | 77.9 | 77.9 |  |
| primary | retail-transfer-high | /couchdb0.commercial.paynet | caliper_client_cpu_avg | percent | 1.18625 | 1.18625 |  |
| primary | retail-transfer-high | /couchdb0.commercial.paynet | caliper_client_cpu_max | percent | 1.7325 | 1.7325 |  |
| primary | retail-transfer-high | /couchdb0.commercial.paynet | caliper_client_memory_avg | bytes | 63.8 | 63.8 |  |
| primary | retail-transfer-high | /couchdb0.commercial.paynet | caliper_client_memory_max | bytes | 78.8 | 78.8 |  |
| primary | retail-transfer-high | /couchdb0.bi.paynet | caliper_client_cpu_avg | percent | 1.1375 | 1.1375 |  |
| primary | retail-transfer-high | /couchdb0.bi.paynet | caliper_client_cpu_max | percent | 1.61625 | 1.61625 |  |
| primary | retail-transfer-high | /couchdb0.bi.paynet | caliper_client_memory_avg | bytes | 61 | 61 |  |
| primary | retail-transfer-high | /couchdb0.bi.paynet | caliper_client_memory_max | bytes | 76.4 | 76.4 |  |
| primary | retail-transfer-high | /couchdb0.pjp.paynet | caliper_client_cpu_avg | percent | 1.1575 | 1.1575 |  |
| primary | retail-transfer-high | /couchdb0.pjp.paynet | caliper_client_cpu_max | percent | 1.63625 | 1.63625 |  |
| primary | retail-transfer-high | /couchdb0.pjp.paynet | caliper_client_memory_avg | bytes | 61.5 | 61.5 |  |
| primary | retail-transfer-high | /couchdb0.pjp.paynet | caliper_client_memory_max | bytes | 79.9 | 79.9 |  |
| primary | retail-transfer-high | /couchdb0.himbara.paynet | caliper_client_cpu_avg | percent | 1.365 | 1.365 |  |
| primary | retail-transfer-high | /couchdb0.himbara.paynet | caliper_client_cpu_max | percent | 1.83625 | 1.83625 |  |
| primary | retail-transfer-high | /couchdb0.himbara.paynet | caliper_client_memory_avg | bytes | 61.5 | 61.5 |  |
| primary | retail-transfer-high | /couchdb0.himbara.paynet | caliper_client_memory_max | bytes | 75.7 | 75.7 |  |
| primary | retail-transfer-high | /orderer.paynet | caliper_client_cpu_avg | percent | 0.18625 | 0.18625 |  |
| primary | retail-transfer-high | /orderer.paynet | caliper_client_cpu_max | percent | 0.23875 | 0.23875 |  |
| primary | retail-transfer-high | /orderer.paynet | caliper_client_memory_avg | bytes | 60.3 | 60.3 |  |
| primary | retail-transfer-high | /orderer.paynet | caliper_client_memory_max | bytes | 75.6 | 75.6 |  |
| primary | retail-transfer-high | node caliper(sum) | caliper_client_cpu_avg | percent | 76.94 | 76.94 |  |
| primary | retail-transfer-high | node caliper(sum) | caliper_client_cpu_max | percent | 128.71 | 128.71 |  |
| primary | retail-transfer-high | node-exporter:9100 | host_cpu_busy_percent | % | 80.36727329568983 | 92.24568965517015 | 92.045258620682 |
| primary | retail-transfer-high | node-exporter:9100 | host_memory_used_bytes | bytes | 5576442826.105263 | 6047797248 | 5743057100.8 |
| primary | retail-transfer-high | node-exporter:9100 | host_read_iops | operations_per_second | 0.18129042542021204 | 1.357142857142857 | 1.3103448275862069 |
| primary | retail-transfer-high | node-exporter:9100 | host_write_iops | operations_per_second | 2048.7560521701334 | 5230.517241379311 | 5091.582553846078 |
| primary | retail-transfer-high | node-exporter:9100 | host_read_await_ms | milliseconds_per_operation | 0.16929201659084497 | 1.2857142857163648 | 1.2105263157907662 |
| primary | retail-transfer-high | node-exporter:9100 | host_write_await_ms | milliseconds_per_operation | 1.5313422522275688 | 4.720939458325478 | 4.04001479041106 |
| primary | retail-transfer-high | /peer0.himbara.paynet | caliper_client_cpu_avg | percent | 0.73625 | 0.73625 |  |
| primary | retail-transfer-high | /peer0.himbara.paynet | caliper_client_cpu_max | percent | 0.87375 | 0.87375 |  |
| primary | retail-transfer-high | /peer0.himbara.paynet | caliper_client_memory_avg | bytes | 124 | 124 |  |
| primary | retail-transfer-high | /peer0.himbara.paynet | caliper_client_memory_max | bytes | 131 | 131 |  |
| primary | retail-transfer-high | /peer0.bi.paynet | caliper_client_cpu_avg | percent | 0.21625 | 0.21625 |  |
| primary | retail-transfer-high | /peer0.bi.paynet | caliper_client_cpu_max | percent | 0.41 | 0.41 |  |
| primary | retail-transfer-high | /peer0.bi.paynet | caliper_client_memory_avg | bytes | 119 | 119 |  |
| primary | retail-transfer-high | /peer0.bi.paynet | caliper_client_memory_max | bytes | 123 | 123 |  |
| primary | retail-transfer-high | /peer0.pjp.paynet | caliper_client_cpu_avg | percent | 0.21375 | 0.21375 |  |
| primary | retail-transfer-high | /peer0.pjp.paynet | caliper_client_cpu_max | percent | 0.29125 | 0.29125 |  |
| primary | retail-transfer-high | /peer0.pjp.paynet | caliper_client_memory_avg | bytes | 114 | 114 |  |
| primary | retail-transfer-high | /peer0.pjp.paynet | caliper_client_memory_max | bytes | 118 | 118 |  |
| primary | retail-transfer-high | /peer0.ojk.paynet | caliper_client_cpu_avg | percent | 0.21625 | 0.21625 |  |
| primary | retail-transfer-high | /peer0.ojk.paynet | caliper_client_cpu_max | percent | 0.41 | 0.41 |  |
| primary | retail-transfer-high | /peer0.ojk.paynet | caliper_client_memory_avg | bytes | 112 | 112 |  |
| primary | retail-transfer-high | /peer0.ojk.paynet | caliper_client_memory_max | bytes | 118 | 118 |  |
| primary | retail-transfer-high | /peer0.commercial.paynet | caliper_client_cpu_avg | percent | 0.215 | 0.215 |  |
| primary | retail-transfer-high | /peer0.commercial.paynet | caliper_client_cpu_max | percent | 0.29125 | 0.29125 |  |
| primary | retail-transfer-high | /peer0.commercial.paynet | caliper_client_memory_avg | bytes | 118 | 118 |  |
| primary | retail-transfer-high | /peer0.commercial.paynet | caliper_client_memory_max | bytes | 123 | 123 |  |
| primary | retail-transfer-high | /couchdb0.ojk.paynet | caliper_client_cpu_avg | percent | 1.16 | 1.16 |  |
| primary | retail-transfer-high | /couchdb0.ojk.paynet | caliper_client_cpu_max | percent | 1.855 | 1.855 |  |
| primary | retail-transfer-high | /couchdb0.ojk.paynet | caliper_client_memory_avg | bytes | 64.2 | 64.2 |  |
| primary | retail-transfer-high | /couchdb0.ojk.paynet | caliper_client_memory_max | bytes | 84.1 | 84.1 |  |
| primary | retail-transfer-high | /couchdb0.himbara.paynet | caliper_client_cpu_avg | percent | 1.31875 | 1.31875 |  |
| primary | retail-transfer-high | /couchdb0.himbara.paynet | caliper_client_cpu_max | percent | 1.7675 | 1.7675 |  |
| primary | retail-transfer-high | /couchdb0.himbara.paynet | caliper_client_memory_avg | bytes | 62.9 | 62.9 |  |
| primary | retail-transfer-high | /couchdb0.himbara.paynet | caliper_client_memory_max | bytes | 81.7 | 81.7 |  |
| primary | retail-transfer-high | /couchdb0.pjp.paynet | caliper_client_cpu_avg | percent | 1.1775 | 1.1775 |  |
| primary | retail-transfer-high | /couchdb0.pjp.paynet | caliper_client_cpu_max | percent | 1.805 | 1.805 |  |
| primary | retail-transfer-high | /couchdb0.pjp.paynet | caliper_client_memory_avg | bytes | 62.3 | 62.3 |  |
| primary | retail-transfer-high | /couchdb0.pjp.paynet | caliper_client_memory_max | bytes | 81 | 81 |  |
| primary | retail-transfer-high | /couchdb0.bi.paynet | caliper_client_cpu_avg | percent | 1.13625 | 1.13625 |  |
| primary | retail-transfer-high | /couchdb0.bi.paynet | caliper_client_cpu_max | percent | 1.65375 | 1.65375 |  |
| primary | retail-transfer-high | /couchdb0.bi.paynet | caliper_client_memory_avg | bytes | 62.4 | 62.4 |  |
| primary | retail-transfer-high | /couchdb0.bi.paynet | caliper_client_memory_max | bytes | 78.7 | 78.7 |  |
| primary | retail-transfer-high | /couchdb0.commercial.paynet | caliper_client_cpu_avg | percent | 1.1525 | 1.1525 |  |
| primary | retail-transfer-high | /couchdb0.commercial.paynet | caliper_client_cpu_max | percent | 1.62625 | 1.62625 |  |
| primary | retail-transfer-high | /couchdb0.commercial.paynet | caliper_client_memory_avg | bytes | 62.8 | 62.8 |  |
| primary | retail-transfer-high | /couchdb0.commercial.paynet | caliper_client_memory_max | bytes | 78.1 | 78.1 |  |
| primary | retail-transfer-high | /orderer.paynet | caliper_client_cpu_avg | percent | 0.18625 | 0.18625 |  |
| primary | retail-transfer-high | /orderer.paynet | caliper_client_cpu_max | percent | 0.23125 | 0.23125 |  |
| primary | retail-transfer-high | /orderer.paynet | caliper_client_memory_avg | bytes | 60.1 | 60.1 |  |
| primary | retail-transfer-high | /orderer.paynet | caliper_client_memory_max | bytes | 78.8 | 78.8 |  |
| primary | retail-transfer-high | node caliper(sum) | caliper_client_cpu_avg | percent | 76.34 | 76.34 |  |
| primary | retail-transfer-high | node caliper(sum) | caliper_client_cpu_max | percent | 122.77 | 122.77 |  |
| primary | retail-transfer-high | node-exporter:9100 | host_cpu_busy_percent | % | 83.20984325555618 | 95.34821428572157 | 95.25431034483204 |
| primary | retail-transfer-high | node-exporter:9100 | host_memory_used_bytes | bytes | 5635347509.894737 | 6022111232 | 5772704563.2 |
| primary | retail-transfer-high | node-exporter:9100 | host_read_iops | operations_per_second | 0.07352619041139963 | 1.2758620689655171 | 0.24137931034482757 |
| primary | retail-transfer-high | node-exporter:9100 | host_write_iops | operations_per_second | 1982.9157551093738 | 4855.793103448275 | 4767.263115763547 |
| primary | retail-transfer-high | node-exporter:9100 | host_read_await_ms | milliseconds_per_operation | 0.2553530346384672 | 4.000000000019099 | 3.0000000000048503 |
| primary | retail-transfer-high | node-exporter:9100 | host_write_await_ms | milliseconds_per_operation | 1.9321972847155628 | 6.9850000000001895 | 5.3411096120372585 |
| primary | retail-transfer-high | /peer0.bi.paynet | caliper_client_cpu_avg | percent | 0.26625 | 0.26625 |  |
| primary | retail-transfer-high | /peer0.bi.paynet | caliper_client_cpu_max | percent | 0.35375 | 0.35375 |  |
| primary | retail-transfer-high | /peer0.bi.paynet | caliper_client_memory_avg | bytes | 119 | 119 |  |
| primary | retail-transfer-high | /peer0.bi.paynet | caliper_client_memory_max | bytes | 123 | 123 |  |
| primary | retail-transfer-high | /peer0.pjp.paynet | caliper_client_cpu_avg | percent | 0.2675 | 0.2675 |  |
| primary | retail-transfer-high | /peer0.pjp.paynet | caliper_client_cpu_max | percent | 0.35625 | 0.35625 |  |
| primary | retail-transfer-high | /peer0.pjp.paynet | caliper_client_memory_avg | bytes | 114 | 114 |  |
| primary | retail-transfer-high | /peer0.pjp.paynet | caliper_client_memory_max | bytes | 120 | 120 |  |
| primary | retail-transfer-high | /peer0.commercial.paynet | caliper_client_cpu_avg | percent | 0.26875 | 0.26875 |  |
| primary | retail-transfer-high | /peer0.commercial.paynet | caliper_client_cpu_max | percent | 0.37625 | 0.37625 |  |
| primary | retail-transfer-high | /peer0.commercial.paynet | caliper_client_memory_avg | bytes | 119 | 119 |  |
| primary | retail-transfer-high | /peer0.commercial.paynet | caliper_client_memory_max | bytes | 126 | 126 |  |
| primary | retail-transfer-high | /peer0.himbara.paynet | caliper_client_cpu_avg | percent | 0.88375 | 0.88375 |  |
| primary | retail-transfer-high | /peer0.himbara.paynet | caliper_client_cpu_max | percent | 1.17125 | 1.17125 |  |
| primary | retail-transfer-high | /peer0.himbara.paynet | caliper_client_memory_avg | bytes | 141 | 141 |  |
| primary | retail-transfer-high | /peer0.himbara.paynet | caliper_client_memory_max | bytes | 160 | 160 |  |
| primary | retail-transfer-high | /peer0.ojk.paynet | caliper_client_cpu_avg | percent | 0.265 | 0.265 |  |
| primary | retail-transfer-high | /peer0.ojk.paynet | caliper_client_cpu_max | percent | 0.34625 | 0.34625 |  |
| primary | retail-transfer-high | /peer0.ojk.paynet | caliper_client_memory_avg | bytes | 117 | 117 |  |
| primary | retail-transfer-high | /peer0.ojk.paynet | caliper_client_memory_max | bytes | 122 | 122 |  |
| primary | retail-transfer-high | /couchdb0.ojk.paynet | caliper_client_cpu_avg | percent | 1.08125 | 1.08125 |  |
| primary | retail-transfer-high | /couchdb0.ojk.paynet | caliper_client_cpu_max | percent | 1.36375 | 1.36375 |  |
| primary | retail-transfer-high | /couchdb0.ojk.paynet | caliper_client_memory_avg | bytes | 62.9 | 62.9 |  |
| primary | retail-transfer-high | /couchdb0.ojk.paynet | caliper_client_memory_max | bytes | 82.5 | 82.5 |  |
| primary | retail-transfer-high | /couchdb0.bi.paynet | caliper_client_cpu_avg | percent | 1.09 | 1.09 |  |
| primary | retail-transfer-high | /couchdb0.bi.paynet | caliper_client_cpu_max | percent | 1.40625 | 1.40625 |  |
| primary | retail-transfer-high | /couchdb0.bi.paynet | caliper_client_memory_avg | bytes | 64 | 64 |  |
| primary | retail-transfer-high | /couchdb0.bi.paynet | caliper_client_memory_max | bytes | 83.9 | 83.9 |  |
| primary | retail-transfer-high | /couchdb0.himbara.paynet | caliper_client_cpu_avg | percent | 1.26125 | 1.26125 |  |
| primary | retail-transfer-high | /couchdb0.himbara.paynet | caliper_client_cpu_max | percent | 1.625 | 1.625 |  |
| primary | retail-transfer-high | /couchdb0.himbara.paynet | caliper_client_memory_avg | bytes | 63.4 | 63.4 |  |
| primary | retail-transfer-high | /couchdb0.himbara.paynet | caliper_client_memory_max | bytes | 83.6 | 83.6 |  |
| primary | retail-transfer-high | /couchdb0.commercial.paynet | caliper_client_cpu_avg | percent | 1.09875 | 1.09875 |  |
| primary | retail-transfer-high | /couchdb0.commercial.paynet | caliper_client_cpu_max | percent | 1.36125 | 1.36125 |  |
| primary | retail-transfer-high | /couchdb0.commercial.paynet | caliper_client_memory_avg | bytes | 65 | 65 |  |
| primary | retail-transfer-high | /couchdb0.commercial.paynet | caliper_client_memory_max | bytes | 82.1 | 82.1 |  |
| primary | retail-transfer-high | /couchdb0.pjp.paynet | caliper_client_cpu_avg | percent | 1.09875 | 1.09875 |  |
| primary | retail-transfer-high | /couchdb0.pjp.paynet | caliper_client_cpu_max | percent | 1.3575 | 1.3575 |  |
| primary | retail-transfer-high | /couchdb0.pjp.paynet | caliper_client_memory_avg | bytes | 62.8 | 62.8 |  |
| primary | retail-transfer-high | /couchdb0.pjp.paynet | caliper_client_memory_max | bytes | 81.4 | 81.4 |  |
| primary | retail-transfer-high | /orderer.paynet | caliper_client_cpu_avg | percent | 0.2475 | 0.2475 |  |
| primary | retail-transfer-high | /orderer.paynet | caliper_client_cpu_max | percent | 0.3075 | 0.3075 |  |
| primary | retail-transfer-high | /orderer.paynet | caliper_client_memory_avg | bytes | 61.6 | 61.6 |  |
| primary | retail-transfer-high | /orderer.paynet | caliper_client_memory_max | bytes | 79.9 | 79.9 |  |
| primary | retail-transfer-high | node caliper(sum) | caliper_client_cpu_avg | percent | 98.63 | 98.63 |  |
| primary | retail-transfer-high | node caliper(sum) | caliper_client_cpu_max | percent | 133.33 | 133.33 |  |
| primary | retail-transfer-high | node-exporter:9100 | host_cpu_busy_percent | % | 83.59488190485963 | 95.24568965517291 | 95.15969827586152 |
| primary | retail-transfer-high | node-exporter:9100 | host_memory_used_bytes | bytes | 5695250000.842105 | 6057463808 | 5827383910.4 |
| primary | retail-transfer-high | node-exporter:9100 | host_read_iops | operations_per_second | 0.5491552205220703 | 4.448275862068965 | 4.172413793103448 |
| primary | retail-transfer-high | node-exporter:9100 | host_write_iops | operations_per_second | 2000.8635598375906 | 5040.964285714285 | 4859.486206896552 |
| primary | retail-transfer-high | node-exporter:9100 | host_read_await_ms | milliseconds_per_operation | 0.14020715107106083 | 0.6666666666761659 | 0.6666666666761658 |
| primary | retail-transfer-high | node-exporter:9100 | host_write_await_ms | milliseconds_per_operation | 1.841826419417803 | 7.376916624727272 | 6.089133647039733 |
| primary | retail-transfer-high | /peer0.pjp.paynet | caliper_client_cpu_avg | percent | 0.26875 | 0.26875 |  |
| primary | retail-transfer-high | /peer0.pjp.paynet | caliper_client_cpu_max | percent | 0.375 | 0.375 |  |
| primary | retail-transfer-high | /peer0.pjp.paynet | caliper_client_memory_avg | bytes | 117 | 117 |  |
| primary | retail-transfer-high | /peer0.pjp.paynet | caliper_client_memory_max | bytes | 122 | 122 |  |
| primary | retail-transfer-high | /peer0.himbara.paynet | caliper_client_cpu_avg | percent | 0.87 | 0.87 |  |
| primary | retail-transfer-high | /peer0.himbara.paynet | caliper_client_cpu_max | percent | 1.045 | 1.045 |  |
| primary | retail-transfer-high | /peer0.himbara.paynet | caliper_client_memory_avg | bytes | 132 | 132 |  |
| primary | retail-transfer-high | /peer0.himbara.paynet | caliper_client_memory_max | bytes | 154 | 154 |  |
| primary | retail-transfer-high | /peer0.commercial.paynet | caliper_client_cpu_avg | percent | 0.2675 | 0.2675 |  |
| primary | retail-transfer-high | /peer0.commercial.paynet | caliper_client_cpu_max | percent | 0.3575 | 0.3575 |  |
| primary | retail-transfer-high | /peer0.commercial.paynet | caliper_client_memory_avg | bytes | 119 | 119 |  |
| primary | retail-transfer-high | /peer0.commercial.paynet | caliper_client_memory_max | bytes | 124 | 124 |  |
| primary | retail-transfer-high | /peer0.bi.paynet | caliper_client_cpu_avg | percent | 0.265 | 0.265 |  |
| primary | retail-transfer-high | /peer0.bi.paynet | caliper_client_cpu_max | percent | 0.35875 | 0.35875 |  |
| primary | retail-transfer-high | /peer0.bi.paynet | caliper_client_memory_avg | bytes | 123 | 123 |  |
| primary | retail-transfer-high | /peer0.bi.paynet | caliper_client_memory_max | bytes | 128 | 128 |  |
| primary | retail-transfer-high | /peer0.ojk.paynet | caliper_client_cpu_avg | percent | 0.2675 | 0.2675 |  |
| primary | retail-transfer-high | /peer0.ojk.paynet | caliper_client_cpu_max | percent | 0.35 | 0.35 |  |
| primary | retail-transfer-high | /peer0.ojk.paynet | caliper_client_memory_avg | bytes | 117 | 117 |  |
| primary | retail-transfer-high | /peer0.ojk.paynet | caliper_client_memory_max | bytes | 122 | 122 |  |
| primary | retail-transfer-high | /couchdb0.pjp.paynet | caliper_client_cpu_avg | percent | 1.10875 | 1.10875 |  |
| primary | retail-transfer-high | /couchdb0.pjp.paynet | caliper_client_cpu_max | percent | 1.41375 | 1.41375 |  |
| primary | retail-transfer-high | /couchdb0.pjp.paynet | caliper_client_memory_avg | bytes | 64 | 64 |  |
| primary | retail-transfer-high | /couchdb0.pjp.paynet | caliper_client_memory_max | bytes | 84.5 | 84.5 |  |
| primary | retail-transfer-high | /couchdb0.himbara.paynet | caliper_client_cpu_avg | percent | 1.265 | 1.265 |  |
| primary | retail-transfer-high | /couchdb0.himbara.paynet | caliper_client_cpu_max | percent | 1.62625 | 1.62625 |  |
| primary | retail-transfer-high | /couchdb0.himbara.paynet | caliper_client_memory_avg | bytes | 64.7 | 64.7 |  |
| primary | retail-transfer-high | /couchdb0.himbara.paynet | caliper_client_memory_max | bytes | 86.1 | 86.1 |  |
| primary | retail-transfer-high | /couchdb0.ojk.paynet | caliper_client_cpu_avg | percent | 1.115 | 1.115 |  |
| primary | retail-transfer-high | /couchdb0.ojk.paynet | caliper_client_cpu_max | percent | 1.365 | 1.365 |  |
| primary | retail-transfer-high | /couchdb0.ojk.paynet | caliper_client_memory_avg | bytes | 63.3 | 63.3 |  |
| primary | retail-transfer-high | /couchdb0.ojk.paynet | caliper_client_memory_max | bytes | 83 | 83 |  |
| primary | retail-transfer-high | /orderer.paynet | caliper_client_cpu_avg | percent | 0.245 | 0.245 |  |
| primary | retail-transfer-high | /orderer.paynet | caliper_client_cpu_max | percent | 0.31375 | 0.31375 |  |
| primary | retail-transfer-high | /orderer.paynet | caliper_client_memory_avg | bytes | 61.7 | 61.7 |  |
| primary | retail-transfer-high | /orderer.paynet | caliper_client_memory_max | bytes | 81.7 | 81.7 |  |
| primary | retail-transfer-high | /couchdb0.bi.paynet | caliper_client_cpu_avg | percent | 1.0775 | 1.0775 |  |
| primary | retail-transfer-high | /couchdb0.bi.paynet | caliper_client_cpu_max | percent | 1.3925 | 1.3925 |  |
| primary | retail-transfer-high | /couchdb0.bi.paynet | caliper_client_memory_avg | bytes | 64.9 | 64.9 |  |
| primary | retail-transfer-high | /couchdb0.bi.paynet | caliper_client_memory_max | bytes | 86.1 | 86.1 |  |
| primary | retail-transfer-high | /couchdb0.commercial.paynet | caliper_client_cpu_avg | percent | 1.10625 | 1.10625 |  |
| primary | retail-transfer-high | /couchdb0.commercial.paynet | caliper_client_cpu_max | percent | 1.44125 | 1.44125 |  |
| primary | retail-transfer-high | /couchdb0.commercial.paynet | caliper_client_memory_avg | bytes | 64.8 | 64.8 |  |
| primary | retail-transfer-high | /couchdb0.commercial.paynet | caliper_client_memory_max | bytes | 82.7 | 82.7 |  |
| primary | retail-transfer-high | node caliper(sum) | caliper_client_cpu_avg | percent | 98.68 | 98.68 |  |
| primary | retail-transfer-high | node caliper(sum) | caliper_client_cpu_max | percent | 134.34 | 134.34 |  |
| primary | retail-transfer-high | node-exporter:9100 | host_cpu_busy_percent | % | 83.77420093579515 | 94.91379310346584 | 94.77155172413404 |
| primary | retail-transfer-high | node-exporter:9100 | host_memory_used_bytes | bytes | 5639227427.929825 | 6050484224 | 5876205363.2 |
| primary | retail-transfer-high | node-exporter:9100 | host_read_iops | operations_per_second | 3.256369868461307 | 28.642857142857142 | 27.620689655172413 |
| primary | retail-transfer-high | node-exporter:9100 | host_write_iops | operations_per_second | 1995.9851350773663 | 4862.068965517241 | 4769.478017241378 |
| primary | retail-transfer-high | node-exporter:9100 | host_read_await_ms | milliseconds_per_operation | 0.21784163885298777 | 1.4999999999929516 | 1.4999999999929516 |
| primary | retail-transfer-high | node-exporter:9100 | host_write_await_ms | milliseconds_per_operation | 1.6949627361140513 | 4.90901885340535 | 4.402968516690883 |
| primary | retail-transfer-high | /peer0.himbara.paynet | caliper_client_cpu_avg | percent | 0.9275 | 0.9275 |  |
| primary | retail-transfer-high | /peer0.himbara.paynet | caliper_client_cpu_max | percent | 1.10875 | 1.10875 |  |
| primary | retail-transfer-high | /peer0.himbara.paynet | caliper_client_memory_avg | bytes | 135 | 135 |  |
| primary | retail-transfer-high | /peer0.himbara.paynet | caliper_client_memory_max | bytes | 159 | 159 |  |
| primary | retail-transfer-high | /peer0.pjp.paynet | caliper_client_cpu_avg | percent | 0.26625 | 0.26625 |  |
| primary | retail-transfer-high | /peer0.pjp.paynet | caliper_client_cpu_max | percent | 0.37375 | 0.37375 |  |
| primary | retail-transfer-high | /peer0.pjp.paynet | caliper_client_memory_avg | bytes | 117 | 117 |  |
| primary | retail-transfer-high | /peer0.pjp.paynet | caliper_client_memory_max | bytes | 122 | 122 |  |
| primary | retail-transfer-high | /peer0.ojk.paynet | caliper_client_cpu_avg | percent | 0.26 | 0.26 |  |
| primary | retail-transfer-high | /peer0.ojk.paynet | caliper_client_cpu_max | percent | 0.34 | 0.34 |  |
| primary | retail-transfer-high | /peer0.ojk.paynet | caliper_client_memory_avg | bytes | 117 | 117 |  |
| primary | retail-transfer-high | /peer0.ojk.paynet | caliper_client_memory_max | bytes | 122 | 122 |  |
| primary | retail-transfer-high | /peer0.bi.paynet | caliper_client_cpu_avg | percent | 0.26375 | 0.26375 |  |
| primary | retail-transfer-high | /peer0.bi.paynet | caliper_client_cpu_max | percent | 0.3425 | 0.3425 |  |
| primary | retail-transfer-high | /peer0.bi.paynet | caliper_client_memory_avg | bytes | 120 | 120 |  |
| primary | retail-transfer-high | /peer0.bi.paynet | caliper_client_memory_max | bytes | 125 | 125 |  |
| primary | retail-transfer-high | /peer0.commercial.paynet | caliper_client_cpu_avg | percent | 0.2675 | 0.2675 |  |
| primary | retail-transfer-high | /peer0.commercial.paynet | caliper_client_cpu_max | percent | 0.3825 | 0.3825 |  |
| primary | retail-transfer-high | /peer0.commercial.paynet | caliper_client_memory_avg | bytes | 117 | 117 |  |
| primary | retail-transfer-high | /peer0.commercial.paynet | caliper_client_memory_max | bytes | 122 | 122 |  |
| primary | retail-transfer-high | /couchdb0.ojk.paynet | caliper_client_cpu_avg | percent | 1.07875 | 1.07875 |  |
| primary | retail-transfer-high | /couchdb0.ojk.paynet | caliper_client_cpu_max | percent | 1.4125 | 1.4125 |  |
| primary | retail-transfer-high | /couchdb0.ojk.paynet | caliper_client_memory_avg | bytes | 63.2 | 63.2 |  |
| primary | retail-transfer-high | /couchdb0.ojk.paynet | caliper_client_memory_max | bytes | 80.9 | 80.9 |  |
| primary | retail-transfer-high | /couchdb0.bi.paynet | caliper_client_cpu_avg | percent | 1.085 | 1.085 |  |
| primary | retail-transfer-high | /couchdb0.bi.paynet | caliper_client_cpu_max | percent | 1.48625 | 1.48625 |  |
| primary | retail-transfer-high | /couchdb0.bi.paynet | caliper_client_memory_avg | bytes | 63.5 | 63.5 |  |
| primary | retail-transfer-high | /couchdb0.bi.paynet | caliper_client_memory_max | bytes | 83.9 | 83.9 |  |
| primary | retail-transfer-high | /orderer.paynet | caliper_client_cpu_avg | percent | 0.24 | 0.24 |  |
| primary | retail-transfer-high | /orderer.paynet | caliper_client_cpu_max | percent | 0.3125 | 0.3125 |  |
| primary | retail-transfer-high | /orderer.paynet | caliper_client_memory_avg | bytes | 62.5 | 62.5 |  |
| primary | retail-transfer-high | /orderer.paynet | caliper_client_memory_max | bytes | 82.5 | 82.5 |  |
| primary | retail-transfer-high | /couchdb0.himbara.paynet | caliper_client_cpu_avg | percent | 1.26625 | 1.26625 |  |
| primary | retail-transfer-high | /couchdb0.himbara.paynet | caliper_client_cpu_max | percent | 1.645 | 1.645 |  |
| primary | retail-transfer-high | /couchdb0.himbara.paynet | caliper_client_memory_avg | bytes | 63.3 | 63.3 |  |
| primary | retail-transfer-high | /couchdb0.himbara.paynet | caliper_client_memory_max | bytes | 86.4 | 86.4 |  |
| primary | retail-transfer-high | /couchdb0.commercial.paynet | caliper_client_cpu_avg | percent | 1.07125 | 1.07125 |  |
| primary | retail-transfer-high | /couchdb0.commercial.paynet | caliper_client_cpu_max | percent | 1.3425 | 1.3425 |  |
| primary | retail-transfer-high | /couchdb0.commercial.paynet | caliper_client_memory_avg | bytes | 62.2 | 62.2 |  |
| primary | retail-transfer-high | /couchdb0.commercial.paynet | caliper_client_memory_max | bytes | 80.5 | 80.5 |  |
| primary | retail-transfer-high | /couchdb0.pjp.paynet | caliper_client_cpu_avg | percent | 1.08625 | 1.08625 |  |
| primary | retail-transfer-high | /couchdb0.pjp.paynet | caliper_client_cpu_max | percent | 1.385 | 1.385 |  |
| primary | retail-transfer-high | /couchdb0.pjp.paynet | caliper_client_memory_avg | bytes | 63.5 | 63.5 |  |
| primary | retail-transfer-high | /couchdb0.pjp.paynet | caliper_client_memory_max | bytes | 84.3 | 84.3 |  |
| primary | retail-transfer-high | node caliper(sum) | caliper_client_cpu_avg | percent | 98.51 | 98.51 |  |
| primary | retail-transfer-high | node caliper(sum) | caliper_client_cpu_max | percent | 130.3 | 130.3 |  |
| primary | retail-transfer-high | node-exporter:9100 | host_cpu_busy_percent | % | 83.88125842668478 | 94.82589285715092 | 94.73275862068915 |
| primary | retail-transfer-high | node-exporter:9100 | host_memory_used_bytes | bytes | 5614835730.123894 | 6011662336 | 5778980864 |
| primary | retail-transfer-high | node-exporter:9100 | host_read_iops | operations_per_second | 0.0021361000915471468 | 0.13793103448275862 | 0 |
| primary | retail-transfer-high | node-exporter:9100 | host_write_iops | operations_per_second | 1995.9450410324228 | 4824.413793103448 | 4699.913793103448 |
| primary | retail-transfer-high | node-exporter:9100 | host_read_await_ms | milliseconds_per_operation | 0 | 0 | 0 |
| primary | retail-transfer-high | node-exporter:9100 | host_write_await_ms | milliseconds_per_operation | 1.600426923565662 | 5.062917531609676 | 4.655409527813378 |
| primary | retail-transfer-high | /peer0.bi.paynet | caliper_client_cpu_avg | percent | 0.27 | 0.27 |  |
| primary | retail-transfer-high | /peer0.bi.paynet | caliper_client_cpu_max | percent | 0.33875 | 0.33875 |  |
| primary | retail-transfer-high | /peer0.bi.paynet | caliper_client_memory_avg | bytes | 115 | 115 |  |
| primary | retail-transfer-high | /peer0.bi.paynet | caliper_client_memory_max | bytes | 120 | 120 |  |
| primary | retail-transfer-high | /peer0.himbara.paynet | caliper_client_cpu_avg | percent | 0.8975 | 0.8975 |  |
| primary | retail-transfer-high | /peer0.himbara.paynet | caliper_client_cpu_max | percent | 1.07125 | 1.07125 |  |
| primary | retail-transfer-high | /peer0.himbara.paynet | caliper_client_memory_avg | bytes | 138 | 138 |  |
| primary | retail-transfer-high | /peer0.himbara.paynet | caliper_client_memory_max | bytes | 158 | 158 |  |
| primary | retail-transfer-high | /peer0.commercial.paynet | caliper_client_cpu_avg | percent | 0.27 | 0.27 |  |
| primary | retail-transfer-high | /peer0.commercial.paynet | caliper_client_cpu_max | percent | 0.345 | 0.345 |  |
| primary | retail-transfer-high | /peer0.commercial.paynet | caliper_client_memory_avg | bytes | 118 | 118 |  |
| primary | retail-transfer-high | /peer0.commercial.paynet | caliper_client_memory_max | bytes | 123 | 123 |  |
| primary | retail-transfer-high | /peer0.pjp.paynet | caliper_client_cpu_avg | percent | 0.27 | 0.27 |  |
| primary | retail-transfer-high | /peer0.pjp.paynet | caliper_client_cpu_max | percent | 0.3275 | 0.3275 |  |
| primary | retail-transfer-high | /peer0.pjp.paynet | caliper_client_memory_avg | bytes | 118 | 118 |  |
| primary | retail-transfer-high | /peer0.pjp.paynet | caliper_client_memory_max | bytes | 124 | 124 |  |
| primary | retail-transfer-high | /peer0.ojk.paynet | caliper_client_cpu_avg | percent | 0.2675 | 0.2675 |  |
| primary | retail-transfer-high | /peer0.ojk.paynet | caliper_client_cpu_max | percent | 0.3575 | 0.3575 |  |
| primary | retail-transfer-high | /peer0.ojk.paynet | caliper_client_memory_avg | bytes | 116 | 116 |  |
| primary | retail-transfer-high | /peer0.ojk.paynet | caliper_client_memory_max | bytes | 122 | 122 |  |
| primary | retail-transfer-high | /couchdb0.ojk.paynet | caliper_client_cpu_avg | percent | 1.1125 | 1.1125 |  |
| primary | retail-transfer-high | /couchdb0.ojk.paynet | caliper_client_cpu_max | percent | 1.54375 | 1.54375 |  |
| primary | retail-transfer-high | /couchdb0.ojk.paynet | caliper_client_memory_avg | bytes | 64.4 | 64.4 |  |
| primary | retail-transfer-high | /couchdb0.ojk.paynet | caliper_client_memory_max | bytes | 82.2 | 82.2 |  |
| primary | retail-transfer-high | /couchdb0.bi.paynet | caliper_client_cpu_avg | percent | 1.0825 | 1.0825 |  |
| primary | retail-transfer-high | /couchdb0.bi.paynet | caliper_client_cpu_max | percent | 1.355 | 1.355 |  |
| primary | retail-transfer-high | /couchdb0.bi.paynet | caliper_client_memory_avg | bytes | 63.1 | 63.1 |  |
| primary | retail-transfer-high | /couchdb0.bi.paynet | caliper_client_memory_max | bytes | 80 | 80 |  |
| primary | retail-transfer-high | /couchdb0.pjp.paynet | caliper_client_cpu_avg | percent | 1.0725 | 1.0725 |  |
| primary | retail-transfer-high | /couchdb0.pjp.paynet | caliper_client_cpu_max | percent | 1.44375 | 1.44375 |  |
| primary | retail-transfer-high | /couchdb0.pjp.paynet | caliper_client_memory_avg | bytes | 63.8 | 63.8 |  |
| primary | retail-transfer-high | /couchdb0.pjp.paynet | caliper_client_memory_max | bytes | 83.6 | 83.6 |  |
| primary | retail-transfer-high | /couchdb0.himbara.paynet | caliper_client_cpu_avg | percent | 1.26375 | 1.26375 |  |
| primary | retail-transfer-high | /couchdb0.himbara.paynet | caliper_client_cpu_max | percent | 1.56625 | 1.56625 |  |
| primary | retail-transfer-high | /couchdb0.himbara.paynet | caliper_client_memory_avg | bytes | 63.6 | 63.6 |  |
| primary | retail-transfer-high | /couchdb0.himbara.paynet | caliper_client_memory_max | bytes | 85.5 | 85.5 |  |
| primary | retail-transfer-high | /orderer.paynet | caliper_client_cpu_avg | percent | 0.24375 | 0.24375 |  |
| primary | retail-transfer-high | /orderer.paynet | caliper_client_cpu_max | percent | 0.31125 | 0.31125 |  |
| primary | retail-transfer-high | /orderer.paynet | caliper_client_memory_avg | bytes | 62.5 | 62.5 |  |
| primary | retail-transfer-high | /orderer.paynet | caliper_client_memory_max | bytes | 84.9 | 84.9 |  |
| primary | retail-transfer-high | /couchdb0.commercial.paynet | caliper_client_cpu_avg | percent | 1.09875 | 1.09875 |  |
| primary | retail-transfer-high | /couchdb0.commercial.paynet | caliper_client_cpu_max | percent | 1.54 | 1.54 |  |
| primary | retail-transfer-high | /couchdb0.commercial.paynet | caliper_client_memory_avg | bytes | 65.3 | 65.3 |  |
| primary | retail-transfer-high | /couchdb0.commercial.paynet | caliper_client_memory_max | bytes | 86.2 | 86.2 |  |
| primary | retail-transfer-high | node caliper(sum) | caliper_client_cpu_avg | percent | 99.39 | 99.39 |  |
| primary | retail-transfer-high | node caliper(sum) | caliper_client_cpu_max | percent | 138 | 138 |  |
| primary | retail-transfer-high | node-exporter:9100 | host_cpu_busy_percent | % | 83.85237142065402 | 94.92348583134807 | 94.83067091544305 |
| primary | retail-transfer-high | node-exporter:9100 | host_memory_used_bytes | bytes | 5642781570.245614 | 6040698880 | 5905159577.599999 |
| primary | retail-transfer-high | node-exporter:9100 | host_read_iops | operations_per_second | 0.055485838803975465 | 0.8571428571428571 | 0.42857142857142855 |
| primary | retail-transfer-high | node-exporter:9100 | host_write_iops | operations_per_second | 1948.4715669869938 | 4823.724137931034 | 4675.405172413793 |
| primary | retail-transfer-high | node-exporter:9100 | host_read_await_ms | milliseconds_per_operation | 0.040013984236084536 | 0.5652173913058108 | 0.333333333334925 |
| primary | retail-transfer-high | node-exporter:9100 | host_write_await_ms | milliseconds_per_operation | 1.5306560054179583 | 5.438311094863274 | 4.8834329886277015 |
| primary | retail-transfer-high | /peer0.commercial.paynet | caliper_client_cpu_avg | percent | 0.265 | 0.265 |  |
| primary | retail-transfer-high | /peer0.commercial.paynet | caliper_client_cpu_max | percent | 0.34875 | 0.34875 |  |
| primary | retail-transfer-high | /peer0.commercial.paynet | caliper_client_memory_avg | bytes | 114 | 114 |  |
| primary | retail-transfer-high | /peer0.commercial.paynet | caliper_client_memory_max | bytes | 120 | 120 |  |
| primary | retail-transfer-high | /peer0.pjp.paynet | caliper_client_cpu_avg | percent | 0.26375 | 0.26375 |  |
| primary | retail-transfer-high | /peer0.pjp.paynet | caliper_client_cpu_max | percent | 0.3475 | 0.3475 |  |
| primary | retail-transfer-high | /peer0.pjp.paynet | caliper_client_memory_avg | bytes | 118 | 118 |  |
| primary | retail-transfer-high | /peer0.pjp.paynet | caliper_client_memory_max | bytes | 124 | 124 |  |
| primary | retail-transfer-high | /peer0.bi.paynet | caliper_client_cpu_avg | percent | 0.265 | 0.265 |  |
| primary | retail-transfer-high | /peer0.bi.paynet | caliper_client_cpu_max | percent | 0.34 | 0.34 |  |
| primary | retail-transfer-high | /peer0.bi.paynet | caliper_client_memory_avg | bytes | 119 | 119 |  |
| primary | retail-transfer-high | /peer0.bi.paynet | caliper_client_memory_max | bytes | 127 | 127 |  |
| primary | retail-transfer-high | /peer0.himbara.paynet | caliper_client_cpu_avg | percent | 0.945 | 0.945 |  |
| primary | retail-transfer-high | /peer0.himbara.paynet | caliper_client_cpu_max | percent | 1.11375 | 1.11375 |  |
| primary | retail-transfer-high | /peer0.himbara.paynet | caliper_client_memory_avg | bytes | 136 | 136 |  |
| primary | retail-transfer-high | /peer0.himbara.paynet | caliper_client_memory_max | bytes | 159 | 159 |  |
| primary | retail-transfer-high | /peer0.ojk.paynet | caliper_client_cpu_avg | percent | 0.26125 | 0.26125 |  |
| primary | retail-transfer-high | /peer0.ojk.paynet | caliper_client_cpu_max | percent | 0.35375 | 0.35375 |  |
| primary | retail-transfer-high | /peer0.ojk.paynet | caliper_client_memory_avg | bytes | 117 | 117 |  |
| primary | retail-transfer-high | /peer0.ojk.paynet | caliper_client_memory_max | bytes | 122 | 122 |  |
| primary | retail-transfer-high | /couchdb0.commercial.paynet | caliper_client_cpu_avg | percent | 1.055 | 1.055 |  |
| primary | retail-transfer-high | /couchdb0.commercial.paynet | caliper_client_cpu_max | percent | 1.40625 | 1.40625 |  |
| primary | retail-transfer-high | /couchdb0.commercial.paynet | caliper_client_memory_avg | bytes | 63.2 | 63.2 |  |
| primary | retail-transfer-high | /couchdb0.commercial.paynet | caliper_client_memory_max | bytes | 81.4 | 81.4 |  |
| primary | retail-transfer-high | /couchdb0.himbara.paynet | caliper_client_cpu_avg | percent | 1.2525 | 1.2525 |  |
| primary | retail-transfer-high | /couchdb0.himbara.paynet | caliper_client_cpu_max | percent | 3.2025 | 3.2025 |  |
| primary | retail-transfer-high | /couchdb0.himbara.paynet | caliper_client_memory_avg | bytes | 64.7 | 64.7 |  |
| primary | retail-transfer-high | /couchdb0.himbara.paynet | caliper_client_memory_max | bytes | 92.4 | 92.4 |  |
| primary | retail-transfer-high | /couchdb0.pjp.paynet | caliper_client_cpu_avg | percent | 1.06125 | 1.06125 |  |
| primary | retail-transfer-high | /couchdb0.pjp.paynet | caliper_client_cpu_max | percent | 1.35625 | 1.35625 |  |
| primary | retail-transfer-high | /couchdb0.pjp.paynet | caliper_client_memory_avg | bytes | 63.2 | 63.2 |  |
| primary | retail-transfer-high | /couchdb0.pjp.paynet | caliper_client_memory_max | bytes | 83.8 | 83.8 |  |
| primary | retail-transfer-high | /couchdb0.bi.paynet | caliper_client_cpu_avg | percent | 1.05875 | 1.05875 |  |
| primary | retail-transfer-high | /couchdb0.bi.paynet | caliper_client_cpu_max | percent | 1.455 | 1.455 |  |
| primary | retail-transfer-high | /couchdb0.bi.paynet | caliper_client_memory_avg | bytes | 62.6 | 62.6 |  |
| primary | retail-transfer-high | /couchdb0.bi.paynet | caliper_client_memory_max | bytes | 80.3 | 80.3 |  |
| primary | retail-transfer-high | /orderer.paynet | caliper_client_cpu_avg | percent | 0.24125 | 0.24125 |  |
| primary | retail-transfer-high | /orderer.paynet | caliper_client_cpu_max | percent | 0.3 | 0.3 |  |
| primary | retail-transfer-high | /orderer.paynet | caliper_client_memory_avg | bytes | 61.4 | 61.4 |  |
| primary | retail-transfer-high | /orderer.paynet | caliper_client_memory_max | bytes | 78.8 | 78.8 |  |
| primary | retail-transfer-high | /couchdb0.ojk.paynet | caliper_client_cpu_avg | percent | 1.06625 | 1.06625 |  |
| primary | retail-transfer-high | /couchdb0.ojk.paynet | caliper_client_cpu_max | percent | 1.39875 | 1.39875 |  |
| primary | retail-transfer-high | /couchdb0.ojk.paynet | caliper_client_memory_avg | bytes | 64.9 | 64.9 |  |
| primary | retail-transfer-high | /couchdb0.ojk.paynet | caliper_client_memory_max | bytes | 84.8 | 84.8 |  |
| primary | retail-transfer-high | node caliper(sum) | caliper_client_cpu_avg | percent | 98.99 | 98.99 |  |
| primary | retail-transfer-high | node caliper(sum) | caliper_client_cpu_max | percent | 137 | 137 |  |
| primary | retail-transfer-low | node-exporter:9100 | host_cpu_busy_percent | % | 43.69382945411092 | 52.84051724138408 | 51.48706896551724 |
| primary | retail-transfer-low | node-exporter:9100 | host_memory_used_bytes | bytes | 5541103003.350428 | 5652226048 | 5603670425.6 |
| primary | retail-transfer-low | node-exporter:9100 | host_read_iops | operations_per_second | 0.036660514995859844 | 0.24137931034482757 | 0.1724137931034483 |
| primary | retail-transfer-low | node-exporter:9100 | host_write_iops | operations_per_second | 765.8070595073192 | 2061.0344827586205 | 1933.1 |
| primary | retail-transfer-low | node-exporter:9100 | host_read_await_ms | milliseconds_per_operation | 0.23190883191126951 | 2.0000000000284976 | 2.0000000000284976 |
| primary | retail-transfer-low | node-exporter:9100 | host_write_await_ms | milliseconds_per_operation | 3.723741861546063 | 13.005190177395475 | 11.553375387380934 |
| primary | retail-transfer-low | /peer0.commercial.paynet | caliper_client_cpu_avg | percent | 0.0925 | 0.0925 |  |
| primary | retail-transfer-low | /peer0.commercial.paynet | caliper_client_cpu_max | percent | 0.15 | 0.15 |  |
| primary | retail-transfer-low | /peer0.commercial.paynet | caliper_client_memory_avg | bytes | 112 | 112 |  |
| primary | retail-transfer-low | /peer0.commercial.paynet | caliper_client_memory_max | bytes | 116 | 116 |  |
| primary | retail-transfer-low | /peer0.ojk.paynet | caliper_client_cpu_avg | percent | 0.08875 | 0.08875 |  |
| primary | retail-transfer-low | /peer0.ojk.paynet | caliper_client_cpu_max | percent | 0.13875 | 0.13875 |  |
| primary | retail-transfer-low | /peer0.ojk.paynet | caliper_client_memory_avg | bytes | 111 | 111 |  |
| primary | retail-transfer-low | /peer0.ojk.paynet | caliper_client_memory_max | bytes | 117 | 117 |  |
| primary | retail-transfer-low | /peer0.himbara.paynet | caliper_client_cpu_avg | percent | 0.285 | 0.285 |  |
| primary | retail-transfer-low | /peer0.himbara.paynet | caliper_client_cpu_max | percent | 0.34375 | 0.34375 |  |
| primary | retail-transfer-low | /peer0.himbara.paynet | caliper_client_memory_avg | bytes | 123 | 123 |  |
| primary | retail-transfer-low | /peer0.himbara.paynet | caliper_client_memory_max | bytes | 128 | 128 |  |
| primary | retail-transfer-low | /peer0.pjp.paynet | caliper_client_cpu_avg | percent | 0.09 | 0.09 |  |
| primary | retail-transfer-low | /peer0.pjp.paynet | caliper_client_cpu_max | percent | 0.135 | 0.135 |  |
| primary | retail-transfer-low | /peer0.pjp.paynet | caliper_client_memory_avg | bytes | 116 | 116 |  |
| primary | retail-transfer-low | /peer0.pjp.paynet | caliper_client_memory_max | bytes | 122 | 122 |  |
| primary | retail-transfer-low | /peer0.bi.paynet | caliper_client_cpu_avg | percent | 0.09625 | 0.09625 |  |
| primary | retail-transfer-low | /peer0.bi.paynet | caliper_client_cpu_max | percent | 0.35125 | 0.35125 |  |
| primary | retail-transfer-low | /peer0.bi.paynet | caliper_client_memory_avg | bytes | 112 | 112 |  |
| primary | retail-transfer-low | /peer0.bi.paynet | caliper_client_memory_max | bytes | 117 | 117 |  |
| primary | retail-transfer-low | /couchdb0.ojk.paynet | caliper_client_cpu_avg | percent | 0.74625 | 0.74625 |  |
| primary | retail-transfer-low | /couchdb0.ojk.paynet | caliper_client_cpu_max | percent | 1.92375 | 1.92375 |  |
| primary | retail-transfer-low | /couchdb0.ojk.paynet | caliper_client_memory_avg | bytes | 55.8 | 55.8 |  |
| primary | retail-transfer-low | /couchdb0.ojk.paynet | caliper_client_memory_max | bytes | 66.1 | 66.1 |  |
| primary | retail-transfer-low | /couchdb0.commercial.paynet | caliper_client_cpu_avg | percent | 0.77 | 0.77 |  |
| primary | retail-transfer-low | /couchdb0.commercial.paynet | caliper_client_cpu_max | percent | 2.115 | 2.115 |  |
| primary | retail-transfer-low | /couchdb0.commercial.paynet | caliper_client_memory_avg | bytes | 55.7 | 55.7 |  |
| primary | retail-transfer-low | /couchdb0.commercial.paynet | caliper_client_memory_max | bytes | 67.2 | 67.2 |  |
| primary | retail-transfer-low | /couchdb0.himbara.paynet | caliper_client_cpu_avg | percent | 0.695 | 0.695 |  |
| primary | retail-transfer-low | /couchdb0.himbara.paynet | caliper_client_cpu_max | percent | 2.10375 | 2.10375 |  |
| primary | retail-transfer-low | /couchdb0.himbara.paynet | caliper_client_memory_avg | bytes | 55.1 | 55.1 |  |
| primary | retail-transfer-low | /couchdb0.himbara.paynet | caliper_client_memory_max | bytes | 71.8 | 71.8 |  |
| primary | retail-transfer-low | /couchdb0.pjp.paynet | caliper_client_cpu_avg | percent | 0.7775 | 0.7775 |  |
| primary | retail-transfer-low | /couchdb0.pjp.paynet | caliper_client_cpu_max | percent | 1.975 | 1.975 |  |
| primary | retail-transfer-low | /couchdb0.pjp.paynet | caliper_client_memory_avg | bytes | 54.7 | 54.7 |  |
| primary | retail-transfer-low | /couchdb0.pjp.paynet | caliper_client_memory_max | bytes | 63.5 | 63.5 |  |
| primary | retail-transfer-low | /couchdb0.bi.paynet | caliper_client_cpu_avg | percent | 0.77875 | 0.77875 |  |
| primary | retail-transfer-low | /couchdb0.bi.paynet | caliper_client_cpu_max | percent | 2.04 | 2.04 |  |
| primary | retail-transfer-low | /couchdb0.bi.paynet | caliper_client_memory_avg | bytes | 56.3 | 56.3 |  |
| primary | retail-transfer-low | /couchdb0.bi.paynet | caliper_client_memory_max | bytes | 66.4 | 66.4 |  |
| primary | retail-transfer-low | /orderer.paynet | caliper_client_cpu_avg | percent | 0.05 | 0.05 |  |
| primary | retail-transfer-low | /orderer.paynet | caliper_client_cpu_max | percent | 0.06875 | 0.06875 |  |
| primary | retail-transfer-low | /orderer.paynet | caliper_client_memory_avg | bytes | 54.1 | 54.1 |  |
| primary | retail-transfer-low | /orderer.paynet | caliper_client_memory_max | bytes | 71 | 71 |  |
| primary | retail-transfer-low | node caliper(sum) | caliper_client_cpu_avg | percent | 21.38 | 21.38 |  |
| primary | retail-transfer-low | node caliper(sum) | caliper_client_cpu_max | percent | 53 | 53 |  |
| primary | retail-transfer-low | node-exporter:9100 | host_cpu_busy_percent | % | 44.063572879230726 | 52.57758620690107 | 52.20822160612093 |
| primary | retail-transfer-low | node-exporter:9100 | host_memory_used_bytes | bytes | 5553950229.880342 | 5960663040 | 5671259340.8 |
| primary | retail-transfer-low | node-exporter:9100 | host_read_iops | operations_per_second | 0.03342504075921841 | 0.17857142857142855 | 0.1724137931034483 |
| primary | retail-transfer-low | node-exporter:9100 | host_write_iops | operations_per_second | 780.9793447772373 | 2048.4137931034484 | 1899.8379310344826 |
| primary | retail-transfer-low | node-exporter:9100 | host_read_await_ms | milliseconds_per_operation | 0.034401709400895916 | 0.4999999999881766 | 0.2499999999940883 |
| primary | retail-transfer-low | node-exporter:9100 | host_write_await_ms | milliseconds_per_operation | 4.493483696055821 | 17.298312130718447 | 15.020041850282412 |
| primary | retail-transfer-low | /peer0.himbara.paynet | caliper_client_cpu_avg | percent | 0.29125 | 0.29125 |  |
| primary | retail-transfer-low | /peer0.himbara.paynet | caliper_client_cpu_max | percent | 0.35875 | 0.35875 |  |
| primary | retail-transfer-low | /peer0.himbara.paynet | caliper_client_memory_avg | bytes | 118 | 118 |  |
| primary | retail-transfer-low | /peer0.himbara.paynet | caliper_client_memory_max | bytes | 124 | 124 |  |
| primary | retail-transfer-low | /peer0.pjp.paynet | caliper_client_cpu_avg | percent | 0.09125 | 0.09125 |  |
| primary | retail-transfer-low | /peer0.pjp.paynet | caliper_client_cpu_max | percent | 0.1475 | 0.1475 |  |
| primary | retail-transfer-low | /peer0.pjp.paynet | caliper_client_memory_avg | bytes | 113 | 113 |  |
| primary | retail-transfer-low | /peer0.pjp.paynet | caliper_client_memory_max | bytes | 116 | 116 |  |
| primary | retail-transfer-low | /peer0.commercial.paynet | caliper_client_cpu_avg | percent | 0.08875 | 0.08875 |  |
| primary | retail-transfer-low | /peer0.commercial.paynet | caliper_client_cpu_max | percent | 0.13875 | 0.13875 |  |
| primary | retail-transfer-low | /peer0.commercial.paynet | caliper_client_memory_avg | bytes | 116 | 116 |  |
| primary | retail-transfer-low | /peer0.commercial.paynet | caliper_client_memory_max | bytes | 120 | 120 |  |
| primary | retail-transfer-low | /peer0.bi.paynet | caliper_client_cpu_avg | percent | 0.09 | 0.09 |  |
| primary | retail-transfer-low | /peer0.bi.paynet | caliper_client_cpu_max | percent | 0.12875 | 0.12875 |  |
| primary | retail-transfer-low | /peer0.bi.paynet | caliper_client_memory_avg | bytes | 116 | 116 |  |
| primary | retail-transfer-low | /peer0.bi.paynet | caliper_client_memory_max | bytes | 122 | 122 |  |
| primary | retail-transfer-low | /peer0.ojk.paynet | caliper_client_cpu_avg | percent | 0.08875 | 0.08875 |  |
| primary | retail-transfer-low | /peer0.ojk.paynet | caliper_client_cpu_max | percent | 0.1375 | 0.1375 |  |
| primary | retail-transfer-low | /peer0.ojk.paynet | caliper_client_memory_avg | bytes | 112 | 112 |  |
| primary | retail-transfer-low | /peer0.ojk.paynet | caliper_client_memory_max | bytes | 117 | 117 |  |
| primary | retail-transfer-low | /couchdb0.pjp.paynet | caliper_client_cpu_avg | percent | 0.76875 | 0.76875 |  |
| primary | retail-transfer-low | /couchdb0.pjp.paynet | caliper_client_cpu_max | percent | 2.24 | 2.24 |  |
| primary | retail-transfer-low | /couchdb0.pjp.paynet | caliper_client_memory_avg | bytes | 55.3 | 55.3 |  |
| primary | retail-transfer-low | /couchdb0.pjp.paynet | caliper_client_memory_max | bytes | 65.8 | 65.8 |  |
| primary | retail-transfer-low | /couchdb0.himbara.paynet | caliper_client_cpu_avg | percent | 0.66625 | 0.66625 |  |
| primary | retail-transfer-low | /couchdb0.himbara.paynet | caliper_client_cpu_max | percent | 1.94625 | 1.94625 |  |
| primary | retail-transfer-low | /couchdb0.himbara.paynet | caliper_client_memory_avg | bytes | 56.8 | 56.8 |  |
| primary | retail-transfer-low | /couchdb0.himbara.paynet | caliper_client_memory_max | bytes | 67.2 | 67.2 |  |
| primary | retail-transfer-low | /couchdb0.ojk.paynet | caliper_client_cpu_avg | percent | 0.7275 | 0.7275 |  |
| primary | retail-transfer-low | /couchdb0.ojk.paynet | caliper_client_cpu_max | percent | 1.6825 | 1.6825 |  |
| primary | retail-transfer-low | /couchdb0.ojk.paynet | caliper_client_memory_avg | bytes | 57.1 | 57.1 |  |
| primary | retail-transfer-low | /couchdb0.ojk.paynet | caliper_client_memory_max | bytes | 66.5 | 66.5 |  |
| primary | retail-transfer-low | /couchdb0.bi.paynet | caliper_client_cpu_avg | percent | 0.75875 | 0.75875 |  |
| primary | retail-transfer-low | /couchdb0.bi.paynet | caliper_client_cpu_max | percent | 2.905 | 2.905 |  |
| primary | retail-transfer-low | /couchdb0.bi.paynet | caliper_client_memory_avg | bytes | 55.4 | 55.4 |  |
| primary | retail-transfer-low | /couchdb0.bi.paynet | caliper_client_memory_max | bytes | 67.9 | 67.9 |  |
| primary | retail-transfer-low | /orderer.paynet | caliper_client_cpu_avg | percent | 0.05 | 0.05 |  |
| primary | retail-transfer-low | /orderer.paynet | caliper_client_cpu_max | percent | 0.06625 | 0.06625 |  |
| primary | retail-transfer-low | /orderer.paynet | caliper_client_memory_avg | bytes | 53.9 | 53.9 |  |
| primary | retail-transfer-low | /orderer.paynet | caliper_client_memory_max | bytes | 70.8 | 70.8 |  |
| primary | retail-transfer-low | /couchdb0.commercial.paynet | caliper_client_cpu_avg | percent | 0.7175 | 0.7175 |  |
| primary | retail-transfer-low | /couchdb0.commercial.paynet | caliper_client_cpu_max | percent | 1.465 | 1.465 |  |
| primary | retail-transfer-low | /couchdb0.commercial.paynet | caliper_client_memory_avg | bytes | 54.6 | 54.6 |  |
| primary | retail-transfer-low | /couchdb0.commercial.paynet | caliper_client_memory_max | bytes | 65 | 65 |  |
| primary | retail-transfer-low | node caliper(sum) | caliper_client_cpu_avg | percent | 21.22 | 21.22 |  |
| primary | retail-transfer-low | node caliper(sum) | caliper_client_cpu_max | percent | 63 | 63 |  |
| primary | retail-transfer-low | node-exporter:9100 | host_cpu_busy_percent | % | 44.51425628243805 | 54.637931034467954 | 53.37844827586603 |
| primary | retail-transfer-low | node-exporter:9100 | host_memory_used_bytes | bytes | 5570210334.632479 | 5940785152 | 5659475968 |
| primary | retail-transfer-low | node-exporter:9100 | host_read_iops | operations_per_second | 0.7851196085652843 | 5.206896551724138 | 4.689655172413793 |
| primary | retail-transfer-low | node-exporter:9100 | host_write_iops | operations_per_second | 754.9215969298954 | 1996.7931034482758 | 1917.8413793103448 |
| primary | retail-transfer-low | node-exporter:9100 | host_read_await_ms | milliseconds_per_operation | 0.10040466680384245 | 1.00000000009004 | 0.3162484700130583 |
| primary | retail-transfer-low | node-exporter:9100 | host_write_await_ms | milliseconds_per_operation | 2.923287416256615 | 10.26950104759592 | 9.354544685459356 |
| primary | retail-transfer-low | /peer0.pjp.paynet | caliper_client_cpu_avg | percent | 0.0875 | 0.0875 |  |
| primary | retail-transfer-low | /peer0.pjp.paynet | caliper_client_cpu_max | percent | 0.12875 | 0.12875 |  |
| primary | retail-transfer-low | /peer0.pjp.paynet | caliper_client_memory_avg | bytes | 116 | 116 |  |
| primary | retail-transfer-low | /peer0.pjp.paynet | caliper_client_memory_max | bytes | 121 | 121 |  |
| primary | retail-transfer-low | /peer0.ojk.paynet | caliper_client_cpu_avg | percent | 0.0875 | 0.0875 |  |
| primary | retail-transfer-low | /peer0.ojk.paynet | caliper_client_cpu_max | percent | 0.11875 | 0.11875 |  |
| primary | retail-transfer-low | /peer0.ojk.paynet | caliper_client_memory_avg | bytes | 116 | 116 |  |
| primary | retail-transfer-low | /peer0.ojk.paynet | caliper_client_memory_max | bytes | 122 | 122 |  |
| primary | retail-transfer-low | /peer0.commercial.paynet | caliper_client_cpu_avg | percent | 0.0875 | 0.0875 |  |
| primary | retail-transfer-low | /peer0.commercial.paynet | caliper_client_cpu_max | percent | 0.13125 | 0.13125 |  |
| primary | retail-transfer-low | /peer0.commercial.paynet | caliper_client_memory_avg | bytes | 116 | 116 |  |
| primary | retail-transfer-low | /peer0.commercial.paynet | caliper_client_memory_max | bytes | 119 | 119 |  |
| primary | retail-transfer-low | /peer0.himbara.paynet | caliper_client_cpu_avg | percent | 0.29 | 0.29 |  |
| primary | retail-transfer-low | /peer0.himbara.paynet | caliper_client_cpu_max | percent | 0.35625 | 0.35625 |  |
| primary | retail-transfer-low | /peer0.himbara.paynet | caliper_client_memory_avg | bytes | 121 | 121 |  |
| primary | retail-transfer-low | /peer0.himbara.paynet | caliper_client_memory_max | bytes | 129 | 129 |  |
| primary | retail-transfer-low | /peer0.bi.paynet | caliper_client_cpu_avg | percent | 0.08875 | 0.08875 |  |
| primary | retail-transfer-low | /peer0.bi.paynet | caliper_client_cpu_max | percent | 0.13125 | 0.13125 |  |
| primary | retail-transfer-low | /peer0.bi.paynet | caliper_client_memory_avg | bytes | 116 | 116 |  |
| primary | retail-transfer-low | /peer0.bi.paynet | caliper_client_memory_max | bytes | 122 | 122 |  |
| primary | retail-transfer-low | /couchdb0.himbara.paynet | caliper_client_cpu_avg | percent | 0.71 | 0.71 |  |
| primary | retail-transfer-low | /couchdb0.himbara.paynet | caliper_client_cpu_max | percent | 1.85875 | 1.85875 |  |
| primary | retail-transfer-low | /couchdb0.himbara.paynet | caliper_client_memory_avg | bytes | 55.6 | 55.6 |  |
| primary | retail-transfer-low | /couchdb0.himbara.paynet | caliper_client_memory_max | bytes | 67.5 | 67.5 |  |
| primary | retail-transfer-low | /couchdb0.commercial.paynet | caliper_client_cpu_avg | percent | 0.785 | 0.785 |  |
| primary | retail-transfer-low | /couchdb0.commercial.paynet | caliper_client_cpu_max | percent | 1.82875 | 1.82875 |  |
| primary | retail-transfer-low | /couchdb0.commercial.paynet | caliper_client_memory_avg | bytes | 55.5 | 55.5 |  |
| primary | retail-transfer-low | /couchdb0.commercial.paynet | caliper_client_memory_max | bytes | 65.6 | 65.6 |  |
| primary | retail-transfer-low | /couchdb0.bi.paynet | caliper_client_cpu_avg | percent | 0.74125 | 0.74125 |  |
| primary | retail-transfer-low | /couchdb0.bi.paynet | caliper_client_cpu_max | percent | 1.69375 | 1.69375 |  |
| primary | retail-transfer-low | /couchdb0.bi.paynet | caliper_client_memory_avg | bytes | 56.8 | 56.8 |  |
| primary | retail-transfer-low | /couchdb0.bi.paynet | caliper_client_memory_max | bytes | 69.3 | 69.3 |  |
| primary | retail-transfer-low | /orderer.paynet | caliper_client_cpu_avg | percent | 0.05 | 0.05 |  |
| primary | retail-transfer-low | /orderer.paynet | caliper_client_cpu_max | percent | 0.2325 | 0.2325 |  |
| primary | retail-transfer-low | /orderer.paynet | caliper_client_memory_avg | bytes | 53.3 | 53.3 |  |
| primary | retail-transfer-low | /orderer.paynet | caliper_client_memory_max | bytes | 68 | 68 |  |
| primary | retail-transfer-low | /couchdb0.pjp.paynet | caliper_client_cpu_avg | percent | 0.75125 | 0.75125 |  |
| primary | retail-transfer-low | /couchdb0.pjp.paynet | caliper_client_cpu_max | percent | 1.75375 | 1.75375 |  |
| primary | retail-transfer-low | /couchdb0.pjp.paynet | caliper_client_memory_avg | bytes | 55.8 | 55.8 |  |
| primary | retail-transfer-low | /couchdb0.pjp.paynet | caliper_client_memory_max | bytes | 69.4 | 69.4 |  |
| primary | retail-transfer-low | /couchdb0.ojk.paynet | caliper_client_cpu_avg | percent | 0.7625 | 0.7625 |  |
| primary | retail-transfer-low | /couchdb0.ojk.paynet | caliper_client_cpu_max | percent | 1.72875 | 1.72875 |  |
| primary | retail-transfer-low | /couchdb0.ojk.paynet | caliper_client_memory_avg | bytes | 56.5 | 56.5 |  |
| primary | retail-transfer-low | /couchdb0.ojk.paynet | caliper_client_memory_max | bytes | 69.3 | 69.3 |  |
| primary | retail-transfer-low | node caliper(sum) | caliper_client_cpu_avg | percent | 21.05 | 21.05 |  |
| primary | retail-transfer-low | node caliper(sum) | caliper_client_cpu_max | percent | 51 | 51 |  |
| primary | retail-transfer-low | node-exporter:9100 | host_cpu_busy_percent | % | 44.09920928489121 | 54.560344827593234 | 53.99676724137579 |
| primary | retail-transfer-low | node-exporter:9100 | host_memory_used_bytes | bytes | 5553609163.034483 | 5805514752 | 5638508544 |
| primary | retail-transfer-low | node-exporter:9100 | host_read_iops | operations_per_second | 1.1000434088528381 | 16.344827586206897 | 15.586206896551724 |
| primary | retail-transfer-low | node-exporter:9100 | host_write_iops | operations_per_second | 746.241636563261 | 1881.6896551724137 | 1794.2827586206897 |
| primary | retail-transfer-low | node-exporter:9100 | host_read_await_ms | milliseconds_per_operation | 0.11856147836156487 | 1.1349557522122122 | 1.08860759493663 |
| primary | retail-transfer-low | node-exporter:9100 | host_write_await_ms | milliseconds_per_operation | 3.4698907242209773 | 19.761689291101163 | 10.693787744758493 |
| primary | retail-transfer-low | /peer0.himbara.paynet | caliper_client_cpu_avg | percent | 0.2975 | 0.2975 |  |
| primary | retail-transfer-low | /peer0.himbara.paynet | caliper_client_cpu_max | percent | 0.37125 | 0.37125 |  |
| primary | retail-transfer-low | /peer0.himbara.paynet | caliper_client_memory_avg | bytes | 120 | 120 |  |
| primary | retail-transfer-low | /peer0.himbara.paynet | caliper_client_memory_max | bytes | 127 | 127 |  |
| primary | retail-transfer-low | /peer0.pjp.paynet | caliper_client_cpu_avg | percent | 0.0925 | 0.0925 |  |
| primary | retail-transfer-low | /peer0.pjp.paynet | caliper_client_cpu_max | percent | 0.2475 | 0.2475 |  |
| primary | retail-transfer-low | /peer0.pjp.paynet | caliper_client_memory_avg | bytes | 112 | 112 |  |
| primary | retail-transfer-low | /peer0.pjp.paynet | caliper_client_memory_max | bytes | 116 | 116 |  |
| primary | retail-transfer-low | /peer0.ojk.paynet | caliper_client_cpu_avg | percent | 0.0925 | 0.0925 |  |
| primary | retail-transfer-low | /peer0.ojk.paynet | caliper_client_cpu_max | percent | 0.24625 | 0.24625 |  |
| primary | retail-transfer-low | /peer0.ojk.paynet | caliper_client_memory_avg | bytes | 113 | 113 |  |
| primary | retail-transfer-low | /peer0.ojk.paynet | caliper_client_memory_max | bytes | 117 | 117 |  |
| primary | retail-transfer-low | /peer0.bi.paynet | caliper_client_cpu_avg | percent | 0.09 | 0.09 |  |
| primary | retail-transfer-low | /peer0.bi.paynet | caliper_client_cpu_max | percent | 0.1375 | 0.1375 |  |
| primary | retail-transfer-low | /peer0.bi.paynet | caliper_client_memory_avg | bytes | 113 | 113 |  |
| primary | retail-transfer-low | /peer0.bi.paynet | caliper_client_memory_max | bytes | 118 | 118 |  |
| primary | retail-transfer-low | /peer0.commercial.paynet | caliper_client_cpu_avg | percent | 0.09125 | 0.09125 |  |
| primary | retail-transfer-low | /peer0.commercial.paynet | caliper_client_cpu_max | percent | 0.1325 | 0.1325 |  |
| primary | retail-transfer-low | /peer0.commercial.paynet | caliper_client_memory_avg | bytes | 117 | 117 |  |
| primary | retail-transfer-low | /peer0.commercial.paynet | caliper_client_memory_max | bytes | 122 | 122 |  |
| primary | retail-transfer-low | /couchdb0.ojk.paynet | caliper_client_cpu_avg | percent | 0.7625 | 0.7625 |  |
| primary | retail-transfer-low | /couchdb0.ojk.paynet | caliper_client_cpu_max | percent | 2.01125 | 2.01125 |  |
| primary | retail-transfer-low | /couchdb0.ojk.paynet | caliper_client_memory_avg | bytes | 56.4 | 56.4 |  |
| primary | retail-transfer-low | /couchdb0.ojk.paynet | caliper_client_memory_max | bytes | 67 | 67 |  |
| primary | retail-transfer-low | /couchdb0.commercial.paynet | caliper_client_cpu_avg | percent | 0.75625 | 0.75625 |  |
| primary | retail-transfer-low | /couchdb0.commercial.paynet | caliper_client_cpu_max | percent | 1.5525 | 1.5525 |  |
| primary | retail-transfer-low | /couchdb0.commercial.paynet | caliper_client_memory_avg | bytes | 56.1 | 56.1 |  |
| primary | retail-transfer-low | /couchdb0.commercial.paynet | caliper_client_memory_max | bytes | 66 | 66 |  |
| primary | retail-transfer-low | /couchdb0.himbara.paynet | caliper_client_cpu_avg | percent | 0.6725 | 0.6725 |  |
| primary | retail-transfer-low | /couchdb0.himbara.paynet | caliper_client_cpu_max | percent | 1.6175 | 1.6175 |  |
| primary | retail-transfer-low | /couchdb0.himbara.paynet | caliper_client_memory_avg | bytes | 56.1 | 56.1 |  |
| primary | retail-transfer-low | /couchdb0.himbara.paynet | caliper_client_memory_max | bytes | 68.3 | 68.3 |  |
| primary | retail-transfer-low | /couchdb0.pjp.paynet | caliper_client_cpu_avg | percent | 0.76375 | 0.76375 |  |
| primary | retail-transfer-low | /couchdb0.pjp.paynet | caliper_client_cpu_max | percent | 1.96 | 1.96 |  |
| primary | retail-transfer-low | /couchdb0.pjp.paynet | caliper_client_memory_avg | bytes | 56.4 | 56.4 |  |
| primary | retail-transfer-low | /couchdb0.pjp.paynet | caliper_client_memory_max | bytes | 66 | 66 |  |
| primary | retail-transfer-low | /couchdb0.bi.paynet | caliper_client_cpu_avg | percent | 0.77375 | 0.77375 |  |
| primary | retail-transfer-low | /couchdb0.bi.paynet | caliper_client_cpu_max | percent | 1.9475 | 1.9475 |  |
| primary | retail-transfer-low | /couchdb0.bi.paynet | caliper_client_memory_avg | bytes | 56.4 | 56.4 |  |
| primary | retail-transfer-low | /couchdb0.bi.paynet | caliper_client_memory_max | bytes | 64.8 | 64.8 |  |
| primary | retail-transfer-low | /orderer.paynet | caliper_client_cpu_avg | percent | 0.05 | 0.05 |  |
| primary | retail-transfer-low | /orderer.paynet | caliper_client_cpu_max | percent | 0.0675 | 0.0675 |  |
| primary | retail-transfer-low | /orderer.paynet | caliper_client_memory_avg | bytes | 57.9 | 57.9 |  |
| primary | retail-transfer-low | /orderer.paynet | caliper_client_memory_max | bytes | 72 | 72 |  |
| primary | retail-transfer-low | node caliper(sum) | caliper_client_cpu_avg | percent | 21.59 | 21.59 |  |
| primary | retail-transfer-low | node caliper(sum) | caliper_client_cpu_max | percent | 54.46 | 54.46 |  |
| primary | retail-transfer-low | node-exporter:9100 | host_cpu_busy_percent | % | 44.342031985582906 | 60.32758620689304 | 59.95948275862058 |
| primary | retail-transfer-low | node-exporter:9100 | host_memory_used_bytes | bytes | 5587696193.641026 | 5909495808 | 5742635417.6 |
| primary | retail-transfer-low | node-exporter:9100 | host_read_iops | operations_per_second | 0.049692380302754365 | 0.6896076132680505 | 0.36859605911329796 |
| primary | retail-transfer-low | node-exporter:9100 | host_write_iops | operations_per_second | 751.9727120708661 | 2132.5862068965516 | 1960.0534482758621 |
| primary | retail-transfer-low | node-exporter:9100 | host_read_await_ms | milliseconds_per_operation | 0.3887614334979303 | 4.9999999999954525 | 2.4999999999977263 |
| primary | retail-transfer-low | node-exporter:9100 | host_write_await_ms | milliseconds_per_operation | 3.6017680518080235 | 16.438793103447402 | 10.611950179470599 |
| primary | retail-transfer-low | /peer0.himbara.paynet | caliper_client_cpu_avg | percent | 0.29 | 0.29 |  |
| primary | retail-transfer-low | /peer0.himbara.paynet | caliper_client_cpu_max | percent | 0.36125 | 0.36125 |  |
| primary | retail-transfer-low | /peer0.himbara.paynet | caliper_client_memory_avg | bytes | 120 | 120 |  |
| primary | retail-transfer-low | /peer0.himbara.paynet | caliper_client_memory_max | bytes | 127 | 127 |  |
| primary | retail-transfer-low | /peer0.commercial.paynet | caliper_client_cpu_avg | percent | 0.09125 | 0.09125 |  |
| primary | retail-transfer-low | /peer0.commercial.paynet | caliper_client_cpu_max | percent | 0.2325 | 0.2325 |  |
| primary | retail-transfer-low | /peer0.commercial.paynet | caliper_client_memory_avg | bytes | 117 | 117 |  |
| primary | retail-transfer-low | /peer0.commercial.paynet | caliper_client_memory_max | bytes | 121 | 121 |  |
| primary | retail-transfer-low | /peer0.bi.paynet | caliper_client_cpu_avg | percent | 0.09125 | 0.09125 |  |
| primary | retail-transfer-low | /peer0.bi.paynet | caliper_client_cpu_max | percent | 0.1375 | 0.1375 |  |
| primary | retail-transfer-low | /peer0.bi.paynet | caliper_client_memory_avg | bytes | 114 | 114 |  |
| primary | retail-transfer-low | /peer0.bi.paynet | caliper_client_memory_max | bytes | 120 | 120 |  |
| primary | retail-transfer-low | /peer0.pjp.paynet | caliper_client_cpu_avg | percent | 0.09375 | 0.09375 |  |
| primary | retail-transfer-low | /peer0.pjp.paynet | caliper_client_cpu_max | percent | 0.29 | 0.29 |  |
| primary | retail-transfer-low | /peer0.pjp.paynet | caliper_client_memory_avg | bytes | 120 | 120 |  |
| primary | retail-transfer-low | /peer0.pjp.paynet | caliper_client_memory_max | bytes | 124 | 124 |  |
| primary | retail-transfer-low | /peer0.ojk.paynet | caliper_client_cpu_avg | percent | 0.0875 | 0.0875 |  |
| primary | retail-transfer-low | /peer0.ojk.paynet | caliper_client_cpu_max | percent | 0.12875 | 0.12875 |  |
| primary | retail-transfer-low | /peer0.ojk.paynet | caliper_client_memory_avg | bytes | 114 | 114 |  |
| primary | retail-transfer-low | /peer0.ojk.paynet | caliper_client_memory_max | bytes | 120 | 120 |  |
| primary | retail-transfer-low | /couchdb0.ojk.paynet | caliper_client_cpu_avg | percent | 0.78375 | 0.78375 |  |
| primary | retail-transfer-low | /couchdb0.ojk.paynet | caliper_client_cpu_max | percent | 2.43375 | 2.43375 |  |
| primary | retail-transfer-low | /couchdb0.ojk.paynet | caliper_client_memory_avg | bytes | 56.8 | 56.8 |  |
| primary | retail-transfer-low | /couchdb0.ojk.paynet | caliper_client_memory_max | bytes | 75.6 | 75.6 |  |
| primary | retail-transfer-low | /couchdb0.pjp.paynet | caliper_client_cpu_avg | percent | 0.81625 | 0.81625 |  |
| primary | retail-transfer-low | /couchdb0.pjp.paynet | caliper_client_cpu_max | percent | 2.44125 | 2.44125 |  |
| primary | retail-transfer-low | /couchdb0.pjp.paynet | caliper_client_memory_avg | bytes | 57.8 | 57.8 |  |
| primary | retail-transfer-low | /couchdb0.pjp.paynet | caliper_client_memory_max | bytes | 78 | 78 |  |
| primary | retail-transfer-low | /couchdb0.bi.paynet | caliper_client_cpu_avg | percent | 0.76625 | 0.76625 |  |
| primary | retail-transfer-low | /couchdb0.bi.paynet | caliper_client_cpu_max | percent | 1.8 | 1.8 |  |
| primary | retail-transfer-low | /couchdb0.bi.paynet | caliper_client_memory_avg | bytes | 55.9 | 55.9 |  |
| primary | retail-transfer-low | /couchdb0.bi.paynet | caliper_client_memory_max | bytes | 71.4 | 71.4 |  |
| primary | retail-transfer-low | /orderer.paynet | caliper_client_cpu_avg | percent | 0.04375 | 0.04375 |  |
| primary | retail-transfer-low | /orderer.paynet | caliper_client_cpu_max | percent | 0.0625 | 0.0625 |  |
| primary | retail-transfer-low | /orderer.paynet | caliper_client_memory_avg | bytes | 55 | 55 |  |
| primary | retail-transfer-low | /orderer.paynet | caliper_client_memory_max | bytes | 71 | 71 |  |
| primary | retail-transfer-low | /couchdb0.himbara.paynet | caliper_client_cpu_avg | percent | 0.7175 | 0.7175 |  |
| primary | retail-transfer-low | /couchdb0.himbara.paynet | caliper_client_cpu_max | percent | 2.04 | 2.04 |  |
| primary | retail-transfer-low | /couchdb0.himbara.paynet | caliper_client_memory_avg | bytes | 56.6 | 56.6 |  |
| primary | retail-transfer-low | /couchdb0.himbara.paynet | caliper_client_memory_max | bytes | 73 | 73 |  |
| primary | retail-transfer-low | /couchdb0.commercial.paynet | caliper_client_cpu_avg | percent | 0.78125 | 0.78125 |  |
| primary | retail-transfer-low | /couchdb0.commercial.paynet | caliper_client_cpu_max | percent | 1.93125 | 1.93125 |  |
| primary | retail-transfer-low | /couchdb0.commercial.paynet | caliper_client_memory_avg | bytes | 56.7 | 56.7 |  |
| primary | retail-transfer-low | /couchdb0.commercial.paynet | caliper_client_memory_max | bytes | 72.5 | 72.5 |  |
| primary | retail-transfer-low | node caliper(sum) | caliper_client_cpu_avg | percent | 21.24 | 21.24 |  |
| primary | retail-transfer-low | node caliper(sum) | caliper_client_cpu_max | percent | 53.54 | 53.54 |  |
| primary | retail-transfer-low | node-exporter:9100 | host_cpu_busy_percent | % | 84.63448806054119 | 96.95322448800376 | 96.71558518917294 |
| primary | retail-transfer-low | node-exporter:9100 | host_memory_used_bytes | bytes | 5731117143.521367 | 5854916608 | 5837031833.6 |
| primary | retail-transfer-low | node-exporter:9100 | host_read_iops | operations_per_second | 0.1622576856898613 | 0.896551724137931 | 0.8275862068965517 |
| primary | retail-transfer-low | node-exporter:9100 | host_write_iops | operations_per_second | 1748.271261829708 | 4252.973830293418 | 4132.31724137931 |
| primary | retail-transfer-low | node-exporter:9100 | host_read_await_ms | milliseconds_per_operation | 0.4018215094496817 | 4.000000000019099 | 2.6666666666793994 |
| primary | retail-transfer-low | node-exporter:9100 | host_write_await_ms | milliseconds_per_operation | 2.018014146686353 | 7.086818701408214 | 6.0169863682952185 |
| primary | retail-transfer-low | /peer0.commercial.paynet | caliper_client_cpu_avg | percent | 0.2075 | 0.2075 |  |
| primary | retail-transfer-low | /peer0.commercial.paynet | caliper_client_cpu_max | percent | 0.2775 | 0.2775 |  |
| primary | retail-transfer-low | /peer0.commercial.paynet | caliper_client_memory_avg | bytes | 124 | 124 |  |
| primary | retail-transfer-low | /peer0.commercial.paynet | caliper_client_memory_max | bytes | 128 | 128 |  |
| primary | retail-transfer-low | /peer0.bi.paynet | caliper_client_cpu_avg | percent | 0.20375 | 0.20375 |  |
| primary | retail-transfer-low | /peer0.bi.paynet | caliper_client_cpu_max | percent | 0.355 | 0.355 |  |
| primary | retail-transfer-low | /peer0.bi.paynet | caliper_client_memory_avg | bytes | 120 | 120 |  |
| primary | retail-transfer-low | /peer0.bi.paynet | caliper_client_memory_max | bytes | 125 | 125 |  |
| primary | retail-transfer-low | /peer0.himbara.paynet | caliper_client_cpu_avg | percent | 0.735 | 0.735 |  |
| primary | retail-transfer-low | /peer0.himbara.paynet | caliper_client_cpu_max | percent | 0.9275 | 0.9275 |  |
| primary | retail-transfer-low | /peer0.himbara.paynet | caliper_client_memory_avg | bytes | 146 | 146 |  |
| primary | retail-transfer-low | /peer0.himbara.paynet | caliper_client_memory_max | bytes | 161 | 161 |  |
| primary | retail-transfer-low | /peer0.ojk.paynet | caliper_client_cpu_avg | percent | 0.205 | 0.205 |  |
| primary | retail-transfer-low | /peer0.ojk.paynet | caliper_client_cpu_max | percent | 0.30625 | 0.30625 |  |
| primary | retail-transfer-low | /peer0.ojk.paynet | caliper_client_memory_avg | bytes | 123 | 123 |  |
| primary | retail-transfer-low | /peer0.ojk.paynet | caliper_client_memory_max | bytes | 129 | 129 |  |
| primary | retail-transfer-low | /peer0.pjp.paynet | caliper_client_cpu_avg | percent | 0.20875 | 0.20875 |  |
| primary | retail-transfer-low | /peer0.pjp.paynet | caliper_client_cpu_max | percent | 0.28875 | 0.28875 |  |
| primary | retail-transfer-low | /peer0.pjp.paynet | caliper_client_memory_avg | bytes | 125 | 125 |  |
| primary | retail-transfer-low | /peer0.pjp.paynet | caliper_client_memory_max | bytes | 131 | 131 |  |
| primary | retail-transfer-low | /couchdb0.ojk.paynet | caliper_client_cpu_avg | percent | 1.4825 | 1.4825 |  |
| primary | retail-transfer-low | /couchdb0.ojk.paynet | caliper_client_cpu_max | percent | 2.47125 | 2.47125 |  |
| primary | retail-transfer-low | /couchdb0.ojk.paynet | caliper_client_memory_avg | bytes | 60.4 | 60.4 |  |
| primary | retail-transfer-low | /couchdb0.ojk.paynet | caliper_client_memory_max | bytes | 75.7 | 75.7 |  |
| primary | retail-transfer-low | /couchdb0.bi.paynet | caliper_client_cpu_avg | percent | 1.4675 | 1.4675 |  |
| primary | retail-transfer-low | /couchdb0.bi.paynet | caliper_client_cpu_max | percent | 2.3575 | 2.3575 |  |
| primary | retail-transfer-low | /couchdb0.bi.paynet | caliper_client_memory_avg | bytes | 60 | 60 |  |
| primary | retail-transfer-low | /couchdb0.bi.paynet | caliper_client_memory_max | bytes | 76.7 | 76.7 |  |
| primary | retail-transfer-low | /couchdb0.himbara.paynet | caliper_client_cpu_avg | percent | 1.22 | 1.22 |  |
| primary | retail-transfer-low | /couchdb0.himbara.paynet | caliper_client_cpu_max | percent | 2.03125 | 2.03125 |  |
| primary | retail-transfer-low | /couchdb0.himbara.paynet | caliper_client_memory_avg | bytes | 62 | 62 |  |
| primary | retail-transfer-low | /couchdb0.himbara.paynet | caliper_client_memory_max | bytes | 79.4 | 79.4 |  |
| primary | retail-transfer-low | /couchdb0.commercial.paynet | caliper_client_cpu_avg | percent | 1.4825 | 1.4825 |  |
| primary | retail-transfer-low | /couchdb0.commercial.paynet | caliper_client_cpu_max | percent | 2.47 | 2.47 |  |
| primary | retail-transfer-low | /couchdb0.commercial.paynet | caliper_client_memory_avg | bytes | 57.8 | 57.8 |  |
| primary | retail-transfer-low | /couchdb0.commercial.paynet | caliper_client_memory_max | bytes | 77.1 | 77.1 |  |
| primary | retail-transfer-low | /orderer.paynet | caliper_client_cpu_avg | percent | 0.18 | 0.18 |  |
| primary | retail-transfer-low | /orderer.paynet | caliper_client_cpu_max | percent | 0.23125 | 0.23125 |  |
| primary | retail-transfer-low | /orderer.paynet | caliper_client_memory_avg | bytes | 74.4 | 74.4 |  |
| primary | retail-transfer-low | /orderer.paynet | caliper_client_memory_max | bytes | 93.4 | 93.4 |  |
| primary | retail-transfer-low | /couchdb0.pjp.paynet | caliper_client_cpu_avg | percent | 1.49 | 1.49 |  |
| primary | retail-transfer-low | /couchdb0.pjp.paynet | caliper_client_cpu_max | percent | 2.97625 | 2.97625 |  |
| primary | retail-transfer-low | /couchdb0.pjp.paynet | caliper_client_memory_avg | bytes | 59.4 | 59.4 |  |
| primary | retail-transfer-low | /couchdb0.pjp.paynet | caliper_client_memory_max | bytes | 76.8 | 76.8 |  |
| primary | retail-transfer-low | node caliper(sum) | caliper_client_cpu_avg | percent | 74.89 | 74.89 |  |
| primary | retail-transfer-low | node caliper(sum) | caliper_client_cpu_max | percent | 119.8 | 119.8 |  |
| primary | retail-transfer-low | node-exporter:9100 | host_cpu_busy_percent | % | 85.60340626469903 | 96.70689655172438 | 96.5624573825298 |
| primary | retail-transfer-low | node-exporter:9100 | host_memory_used_bytes | bytes | 5662761842.75862 | 5973946368 | 5781444608 |
| primary | retail-transfer-low | node-exporter:9100 | host_read_iops | operations_per_second | 0.1460172429741019 | 2.142857142857143 | 2.0689655172413794 |
| primary | retail-transfer-low | node-exporter:9100 | host_write_iops | operations_per_second | 1858.0515698381894 | 4620.275862068966 | 4475.677586206896 |
| primary | retail-transfer-low | node-exporter:9100 | host_read_await_ms | milliseconds_per_operation | 0.11168176505212674 | 0.6666666666887977 | 0.6666666666887977 |
| primary | retail-transfer-low | node-exporter:9100 | host_write_await_ms | milliseconds_per_operation | 1.490335258543854 | 4.017582454210547 | 3.8077499831163504 |
| primary | retail-transfer-low | /peer0.himbara.paynet | caliper_client_cpu_avg | percent | 0.71875 | 0.71875 |  |
| primary | retail-transfer-low | /peer0.himbara.paynet | caliper_client_cpu_max | percent | 0.96625 | 0.96625 |  |
| primary | retail-transfer-low | /peer0.himbara.paynet | caliper_client_memory_avg | bytes | 152 | 152 |  |
| primary | retail-transfer-low | /peer0.himbara.paynet | caliper_client_memory_max | bytes | 163 | 163 |  |
| primary | retail-transfer-low | /peer0.commercial.paynet | caliper_client_cpu_avg | percent | 0.2125 | 0.2125 |  |
| primary | retail-transfer-low | /peer0.commercial.paynet | caliper_client_cpu_max | percent | 0.37125 | 0.37125 |  |
| primary | retail-transfer-low | /peer0.commercial.paynet | caliper_client_memory_avg | bytes | 128 | 128 |  |
| primary | retail-transfer-low | /peer0.commercial.paynet | caliper_client_memory_max | bytes | 134 | 134 |  |
| primary | retail-transfer-low | /peer0.ojk.paynet | caliper_client_cpu_avg | percent | 0.2075 | 0.2075 |  |
| primary | retail-transfer-low | /peer0.ojk.paynet | caliper_client_cpu_max | percent | 0.28625 | 0.28625 |  |
| primary | retail-transfer-low | /peer0.ojk.paynet | caliper_client_memory_avg | bytes | 122 | 122 |  |
| primary | retail-transfer-low | /peer0.ojk.paynet | caliper_client_memory_max | bytes | 127 | 127 |  |
| primary | retail-transfer-low | /peer0.bi.paynet | caliper_client_cpu_avg | percent | 0.2125 | 0.2125 |  |
| primary | retail-transfer-low | /peer0.bi.paynet | caliper_client_cpu_max | percent | 0.3125 | 0.3125 |  |
| primary | retail-transfer-low | /peer0.bi.paynet | caliper_client_memory_avg | bytes | 121 | 121 |  |
| primary | retail-transfer-low | /peer0.bi.paynet | caliper_client_memory_max | bytes | 126 | 126 |  |
| primary | retail-transfer-low | /peer0.pjp.paynet | caliper_client_cpu_avg | percent | 0.20625 | 0.20625 |  |
| primary | retail-transfer-low | /peer0.pjp.paynet | caliper_client_cpu_max | percent | 0.295 | 0.295 |  |
| primary | retail-transfer-low | /peer0.pjp.paynet | caliper_client_memory_avg | bytes | 124 | 124 |  |
| primary | retail-transfer-low | /peer0.pjp.paynet | caliper_client_memory_max | bytes | 130 | 130 |  |
| primary | retail-transfer-low | /couchdb0.commercial.paynet | caliper_client_cpu_avg | percent | 1.48875 | 1.48875 |  |
| primary | retail-transfer-low | /couchdb0.commercial.paynet | caliper_client_cpu_max | percent | 2.09 | 2.09 |  |
| primary | retail-transfer-low | /couchdb0.commercial.paynet | caliper_client_memory_avg | bytes | 61.8 | 61.8 |  |
| primary | retail-transfer-low | /couchdb0.commercial.paynet | caliper_client_memory_max | bytes | 72.2 | 72.2 |  |
| primary | retail-transfer-low | /couchdb0.himbara.paynet | caliper_client_cpu_avg | percent | 1.325 | 1.325 |  |
| primary | retail-transfer-low | /couchdb0.himbara.paynet | caliper_client_cpu_max | percent | 2.14875 | 2.14875 |  |
| primary | retail-transfer-low | /couchdb0.himbara.paynet | caliper_client_memory_avg | bytes | 60.4 | 60.4 |  |
| primary | retail-transfer-low | /couchdb0.himbara.paynet | caliper_client_memory_max | bytes | 81.1 | 81.1 |  |
| primary | retail-transfer-low | /orderer.paynet | caliper_client_cpu_avg | percent | 0.1875 | 0.1875 |  |
| primary | retail-transfer-low | /orderer.paynet | caliper_client_cpu_max | percent | 0.37875 | 0.37875 |  |
| primary | retail-transfer-low | /orderer.paynet | caliper_client_memory_avg | bytes | 73.5 | 73.5 |  |
| primary | retail-transfer-low | /orderer.paynet | caliper_client_memory_max | bytes | 91.6 | 91.6 |  |
| primary | retail-transfer-low | /couchdb0.ojk.paynet | caliper_client_cpu_avg | percent | 1.54875 | 1.54875 |  |
| primary | retail-transfer-low | /couchdb0.ojk.paynet | caliper_client_cpu_max | percent | 2.8075 | 2.8075 |  |
| primary | retail-transfer-low | /couchdb0.ojk.paynet | caliper_client_memory_avg | bytes | 59.2 | 59.2 |  |
| primary | retail-transfer-low | /couchdb0.ojk.paynet | caliper_client_memory_max | bytes | 80.1 | 80.1 |  |
| primary | retail-transfer-low | /couchdb0.pjp.paynet | caliper_client_cpu_avg | percent | 1.52125 | 1.52125 |  |
| primary | retail-transfer-low | /couchdb0.pjp.paynet | caliper_client_cpu_max | percent | 2.58375 | 2.58375 |  |
| primary | retail-transfer-low | /couchdb0.pjp.paynet | caliper_client_memory_avg | bytes | 59.8 | 59.8 |  |
| primary | retail-transfer-low | /couchdb0.pjp.paynet | caliper_client_memory_max | bytes | 71.4 | 71.4 |  |
| primary | retail-transfer-low | /couchdb0.bi.paynet | caliper_client_cpu_avg | percent | 1.51 | 1.51 |  |
| primary | retail-transfer-low | /couchdb0.bi.paynet | caliper_client_cpu_max | percent | 2.79875 | 2.79875 |  |
| primary | retail-transfer-low | /couchdb0.bi.paynet | caliper_client_memory_avg | bytes | 60 | 60 |  |
| primary | retail-transfer-low | /couchdb0.bi.paynet | caliper_client_memory_max | bytes | 82.3 | 82.3 |  |
| primary | retail-transfer-low | node caliper(sum) | caliper_client_cpu_avg | percent | 75.73 | 75.73 |  |
| primary | retail-transfer-low | node caliper(sum) | caliper_client_cpu_max | percent | 121 | 121 |  |
| primary | retail-transfer-low | node-exporter:9100 | host_cpu_busy_percent | % | 85.49769408559173 | 97.31034482759023 | 97.0293103448264 |
| primary | retail-transfer-low | node-exporter:9100 | host_memory_used_bytes | bytes | 5674003055.304348 | 6098489344 | 5948546252.8 |
| primary | retail-transfer-low | node-exporter:9100 | host_read_iops | operations_per_second | 0.1800174659969624 | 1.1379310344827587 | 1.0196428571428564 |
| primary | retail-transfer-low | node-exporter:9100 | host_write_iops | operations_per_second | 1737.0543130070782 | 4372.310344827586 | 4274.035818140748 |
| primary | retail-transfer-low | node-exporter:9100 | host_read_await_ms | milliseconds_per_operation | 0.11375518793684672 | 0.5600000000004003 | 0.5600000000004003 |
| primary | retail-transfer-low | node-exporter:9100 | host_write_await_ms | milliseconds_per_operation | 1.3833991880106769 | 5.135968752104548 | 3.999427469207285 |
| primary | retail-transfer-low | /peer0.himbara.paynet | caliper_client_cpu_avg | percent | 0.6875 | 0.6875 |  |
| primary | retail-transfer-low | /peer0.himbara.paynet | caliper_client_cpu_max | percent | 0.89125 | 0.89125 |  |
| primary | retail-transfer-low | /peer0.himbara.paynet | caliper_client_memory_avg | bytes | 145 | 145 |  |
| primary | retail-transfer-low | /peer0.himbara.paynet | caliper_client_memory_max | bytes | 158 | 158 |  |
| primary | retail-transfer-low | /peer0.commercial.paynet | caliper_client_cpu_avg | percent | 0.20375 | 0.20375 |  |
| primary | retail-transfer-low | /peer0.commercial.paynet | caliper_client_cpu_max | percent | 0.32 | 0.32 |  |
| primary | retail-transfer-low | /peer0.commercial.paynet | caliper_client_memory_avg | bytes | 124 | 124 |  |
| primary | retail-transfer-low | /peer0.commercial.paynet | caliper_client_memory_max | bytes | 130 | 130 |  |
| primary | retail-transfer-low | /peer0.pjp.paynet | caliper_client_cpu_avg | percent | 0.2125 | 0.2125 |  |
| primary | retail-transfer-low | /peer0.pjp.paynet | caliper_client_cpu_max | percent | 0.32875 | 0.32875 |  |
| primary | retail-transfer-low | /peer0.pjp.paynet | caliper_client_memory_avg | bytes | 124 | 124 |  |
| primary | retail-transfer-low | /peer0.pjp.paynet | caliper_client_memory_max | bytes | 127 | 127 |  |
| primary | retail-transfer-low | /peer0.bi.paynet | caliper_client_cpu_avg | percent | 0.20125 | 0.20125 |  |
| primary | retail-transfer-low | /peer0.bi.paynet | caliper_client_cpu_max | percent | 0.3075 | 0.3075 |  |
| primary | retail-transfer-low | /peer0.bi.paynet | caliper_client_memory_avg | bytes | 123 | 123 |  |
| primary | retail-transfer-low | /peer0.bi.paynet | caliper_client_memory_max | bytes | 128 | 128 |  |
| primary | retail-transfer-low | /peer0.ojk.paynet | caliper_client_cpu_avg | percent | 0.21375 | 0.21375 |  |
| primary | retail-transfer-low | /peer0.ojk.paynet | caliper_client_cpu_max | percent | 0.3025 | 0.3025 |  |
| primary | retail-transfer-low | /peer0.ojk.paynet | caliper_client_memory_avg | bytes | 119 | 119 |  |
| primary | retail-transfer-low | /peer0.ojk.paynet | caliper_client_memory_max | bytes | 123 | 123 |  |
| primary | retail-transfer-low | /couchdb0.himbara.paynet | caliper_client_cpu_avg | percent | 1.2425 | 1.2425 |  |
| primary | retail-transfer-low | /couchdb0.himbara.paynet | caliper_client_cpu_max | percent | 1.9125 | 1.9125 |  |
| primary | retail-transfer-low | /couchdb0.himbara.paynet | caliper_client_memory_avg | bytes | 61.3 | 61.3 |  |
| primary | retail-transfer-low | /couchdb0.himbara.paynet | caliper_client_memory_max | bytes | 79.9 | 79.9 |  |
| primary | retail-transfer-low | /couchdb0.bi.paynet | caliper_client_cpu_avg | percent | 1.4075 | 1.4075 |  |
| primary | retail-transfer-low | /couchdb0.bi.paynet | caliper_client_cpu_max | percent | 2.4525 | 2.4525 |  |
| primary | retail-transfer-low | /couchdb0.bi.paynet | caliper_client_memory_avg | bytes | 58.7 | 58.7 |  |
| primary | retail-transfer-low | /couchdb0.bi.paynet | caliper_client_memory_max | bytes | 73.7 | 73.7 |  |
| primary | retail-transfer-low | /couchdb0.ojk.paynet | caliper_client_cpu_avg | percent | 1.5125 | 1.5125 |  |
| primary | retail-transfer-low | /couchdb0.ojk.paynet | caliper_client_cpu_max | percent | 2.34375 | 2.34375 |  |
| primary | retail-transfer-low | /couchdb0.ojk.paynet | caliper_client_memory_avg | bytes | 58.6 | 58.6 |  |
| primary | retail-transfer-low | /couchdb0.ojk.paynet | caliper_client_memory_max | bytes | 70.5 | 70.5 |  |
| primary | retail-transfer-low | /couchdb0.pjp.paynet | caliper_client_cpu_avg | percent | 1.50125 | 1.50125 |  |
| primary | retail-transfer-low | /couchdb0.pjp.paynet | caliper_client_cpu_max | percent | 2.76 | 2.76 |  |
| primary | retail-transfer-low | /couchdb0.pjp.paynet | caliper_client_memory_avg | bytes | 59 | 59 |  |
| primary | retail-transfer-low | /couchdb0.pjp.paynet | caliper_client_memory_max | bytes | 72.8 | 72.8 |  |
| primary | retail-transfer-low | /couchdb0.commercial.paynet | caliper_client_cpu_avg | percent | 1.445 | 1.445 |  |
| primary | retail-transfer-low | /couchdb0.commercial.paynet | caliper_client_cpu_max | percent | 2.4475 | 2.4475 |  |
| primary | retail-transfer-low | /couchdb0.commercial.paynet | caliper_client_memory_avg | bytes | 58.1 | 58.1 |  |
| primary | retail-transfer-low | /couchdb0.commercial.paynet | caliper_client_memory_max | bytes | 71.8 | 71.8 |  |
| primary | retail-transfer-low | /orderer.paynet | caliper_client_cpu_avg | percent | 0.1825 | 0.1825 |  |
| primary | retail-transfer-low | /orderer.paynet | caliper_client_cpu_max | percent | 0.2375 | 0.2375 |  |
| primary | retail-transfer-low | /orderer.paynet | caliper_client_memory_avg | bytes | 73.8 | 73.8 |  |
| primary | retail-transfer-low | /orderer.paynet | caliper_client_memory_max | bytes | 96.2 | 96.2 |  |
| primary | retail-transfer-low | node caliper(sum) | caliper_client_cpu_avg | percent | 75.98 | 75.98 |  |
| primary | retail-transfer-low | node caliper(sum) | caliper_client_cpu_max | percent | 112 | 112 |  |
| primary | retail-transfer-low | node-exporter:9100 | host_cpu_busy_percent | % | 85.55442974209053 | 96.90481785714846 | 96.80818965518233 |
| primary | retail-transfer-low | node-exporter:9100 | host_memory_used_bytes | bytes | 5649371100.689655 | 6079713280 | 5778308096 |
| primary | retail-transfer-low | node-exporter:9100 | host_read_iops | operations_per_second | 0.3659224113229453 | 2.4996429081559777 | 2.4349892857142854 |
| primary | retail-transfer-low | node-exporter:9100 | host_write_iops | operations_per_second | 1813.5517631351718 | 4491.310344827586 | 4389.63448275862 |
| primary | retail-transfer-low | node-exporter:9100 | host_read_await_ms | milliseconds_per_operation | 0.44053292522110254 | 8.000000000038199 | 0.7333333333311505 |
| primary | retail-transfer-low | node-exporter:9100 | host_write_await_ms | milliseconds_per_operation | 1.59088285268067 | 6.735326424375463 | 5.077847006113369 |
| primary | retail-transfer-low | /peer0.bi.paynet | caliper_client_cpu_avg | percent | 0.21375 | 0.21375 |  |
| primary | retail-transfer-low | /peer0.bi.paynet | caliper_client_cpu_max | percent | 0.3025 | 0.3025 |  |
| primary | retail-transfer-low | /peer0.bi.paynet | caliper_client_memory_avg | bytes | 123 | 123 |  |
| primary | retail-transfer-low | /peer0.bi.paynet | caliper_client_memory_max | bytes | 128 | 128 |  |
| primary | retail-transfer-low | /peer0.pjp.paynet | caliper_client_cpu_avg | percent | 0.2025 | 0.2025 |  |
| primary | retail-transfer-low | /peer0.pjp.paynet | caliper_client_cpu_max | percent | 0.26625 | 0.26625 |  |
| primary | retail-transfer-low | /peer0.pjp.paynet | caliper_client_memory_avg | bytes | 125 | 125 |  |
| primary | retail-transfer-low | /peer0.pjp.paynet | caliper_client_memory_max | bytes | 128 | 128 |  |
| primary | retail-transfer-low | /peer0.ojk.paynet | caliper_client_cpu_avg | percent | 0.20625 | 0.20625 |  |
| primary | retail-transfer-low | /peer0.ojk.paynet | caliper_client_cpu_max | percent | 0.27125 | 0.27125 |  |
| primary | retail-transfer-low | /peer0.ojk.paynet | caliper_client_memory_avg | bytes | 119 | 119 |  |
| primary | retail-transfer-low | /peer0.ojk.paynet | caliper_client_memory_max | bytes | 125 | 125 |  |
| primary | retail-transfer-low | /peer0.himbara.paynet | caliper_client_cpu_avg | percent | 0.70125 | 0.70125 |  |
| primary | retail-transfer-low | /peer0.himbara.paynet | caliper_client_cpu_max | percent | 0.92625 | 0.92625 |  |
| primary | retail-transfer-low | /peer0.himbara.paynet | caliper_client_memory_avg | bytes | 149 | 149 |  |
| primary | retail-transfer-low | /peer0.himbara.paynet | caliper_client_memory_max | bytes | 160 | 160 |  |
| primary | retail-transfer-low | /peer0.commercial.paynet | caliper_client_cpu_avg | percent | 0.2075 | 0.2075 |  |
| primary | retail-transfer-low | /peer0.commercial.paynet | caliper_client_cpu_max | percent | 0.30875 | 0.30875 |  |
| primary | retail-transfer-low | /peer0.commercial.paynet | caliper_client_memory_avg | bytes | 125 | 125 |  |
| primary | retail-transfer-low | /peer0.commercial.paynet | caliper_client_memory_max | bytes | 130 | 130 |  |
| primary | retail-transfer-low | /couchdb0.commercial.paynet | caliper_client_cpu_avg | percent | 1.48875 | 1.48875 |  |
| primary | retail-transfer-low | /couchdb0.commercial.paynet | caliper_client_cpu_max | percent | 2.60625 | 2.60625 |  |
| primary | retail-transfer-low | /couchdb0.commercial.paynet | caliper_client_memory_avg | bytes | 59.8 | 59.8 |  |
| primary | retail-transfer-low | /couchdb0.commercial.paynet | caliper_client_memory_max | bytes | 71.9 | 71.9 |  |
| primary | retail-transfer-low | /couchdb0.ojk.paynet | caliper_client_cpu_avg | percent | 1.4775 | 1.4775 |  |
| primary | retail-transfer-low | /couchdb0.ojk.paynet | caliper_client_cpu_max | percent | 2.51125 | 2.51125 |  |
| primary | retail-transfer-low | /couchdb0.ojk.paynet | caliper_client_memory_avg | bytes | 58.7 | 58.7 |  |
| primary | retail-transfer-low | /couchdb0.ojk.paynet | caliper_client_memory_max | bytes | 76.1 | 76.1 |  |
| primary | retail-transfer-low | /orderer.paynet | caliper_client_cpu_avg | percent | 0.19 | 0.19 |  |
| primary | retail-transfer-low | /orderer.paynet | caliper_client_cpu_max | percent | 0.36375 | 0.36375 |  |
| primary | retail-transfer-low | /orderer.paynet | caliper_client_memory_avg | bytes | 74.2 | 74.2 |  |
| primary | retail-transfer-low | /orderer.paynet | caliper_client_memory_max | bytes | 94.4 | 94.4 |  |
| primary | retail-transfer-low | /couchdb0.pjp.paynet | caliper_client_cpu_avg | percent | 1.47625 | 1.47625 |  |
| primary | retail-transfer-low | /couchdb0.pjp.paynet | caliper_client_cpu_max | percent | 2.58625 | 2.58625 |  |
| primary | retail-transfer-low | /couchdb0.pjp.paynet | caliper_client_memory_avg | bytes | 60 | 60 |  |
| primary | retail-transfer-low | /couchdb0.pjp.paynet | caliper_client_memory_max | bytes | 73.3 | 73.3 |  |
| primary | retail-transfer-low | /couchdb0.bi.paynet | caliper_client_cpu_avg | percent | 1.53875 | 1.53875 |  |
| primary | retail-transfer-low | /couchdb0.bi.paynet | caliper_client_cpu_max | percent | 2.44375 | 2.44375 |  |
| primary | retail-transfer-low | /couchdb0.bi.paynet | caliper_client_memory_avg | bytes | 59.9 | 59.9 |  |
| primary | retail-transfer-low | /couchdb0.bi.paynet | caliper_client_memory_max | bytes | 79.4 | 79.4 |  |
| primary | retail-transfer-low | /couchdb0.himbara.paynet | caliper_client_cpu_avg | percent | 1.30375 | 1.30375 |  |
| primary | retail-transfer-low | /couchdb0.himbara.paynet | caliper_client_cpu_max | percent | 2.245 | 2.245 |  |
| primary | retail-transfer-low | /couchdb0.himbara.paynet | caliper_client_memory_avg | bytes | 60.6 | 60.6 |  |
| primary | retail-transfer-low | /couchdb0.himbara.paynet | caliper_client_memory_max | bytes | 78 | 78 |  |
| primary | retail-transfer-low | node caliper(sum) | caliper_client_cpu_avg | percent | 77.25 | 77.25 |  |
| primary | retail-transfer-low | node caliper(sum) | caliper_client_cpu_max | percent | 108 | 108 |  |
| primary | retail-transfer-low | node-exporter:9100 | host_cpu_busy_percent | % | 85.38711960088617 | 96.91071428572157 | 96.81969673644744 |
| primary | retail-transfer-low | node-exporter:9100 | host_memory_used_bytes | bytes | 5640402025.931034 | 6068551680 | 5806236672 |
| primary | retail-transfer-low | node-exporter:9100 | host_read_iops | operations_per_second | 0.02776513783618164 | 0.17857142857142855 | 0.10714285714285714 |
| primary | retail-transfer-low | node-exporter:9100 | host_write_iops | operations_per_second | 1812.6159483711322 | 4561.0344827586205 | 4446.884482758621 |
| primary | retail-transfer-low | node-exporter:9100 | host_read_await_ms | milliseconds_per_operation | 0.033979885056667755 | 0.3333333333254511 | 0.33333333332545106 |
| primary | retail-transfer-low | node-exporter:9100 | host_write_await_ms | milliseconds_per_operation | 1.5313406558365275 | 5.732048083465858 | 4.794683177470909 |
| primary | retail-transfer-low | /peer0.himbara.paynet | caliper_client_cpu_avg | percent | 0.69875 | 0.69875 |  |
| primary | retail-transfer-low | /peer0.himbara.paynet | caliper_client_cpu_max | percent | 0.90875 | 0.90875 |  |
| primary | retail-transfer-low | /peer0.himbara.paynet | caliper_client_memory_avg | bytes | 151 | 151 |  |
| primary | retail-transfer-low | /peer0.himbara.paynet | caliper_client_memory_max | bytes | 162 | 162 |  |
| primary | retail-transfer-low | /peer0.bi.paynet | caliper_client_cpu_avg | percent | 0.21125 | 0.21125 |  |
| primary | retail-transfer-low | /peer0.bi.paynet | caliper_client_cpu_max | percent | 0.32125 | 0.32125 |  |
| primary | retail-transfer-low | /peer0.bi.paynet | caliper_client_memory_avg | bytes | 123 | 123 |  |
| primary | retail-transfer-low | /peer0.bi.paynet | caliper_client_memory_max | bytes | 130 | 130 |  |
| primary | retail-transfer-low | /peer0.commercial.paynet | caliper_client_cpu_avg | percent | 0.20875 | 0.20875 |  |
| primary | retail-transfer-low | /peer0.commercial.paynet | caliper_client_cpu_max | percent | 0.3025 | 0.3025 |  |
| primary | retail-transfer-low | /peer0.commercial.paynet | caliper_client_memory_avg | bytes | 119 | 119 |  |
| primary | retail-transfer-low | /peer0.commercial.paynet | caliper_client_memory_max | bytes | 124 | 124 |  |
| primary | retail-transfer-low | /peer0.ojk.paynet | caliper_client_cpu_avg | percent | 0.2075 | 0.2075 |  |
| primary | retail-transfer-low | /peer0.ojk.paynet | caliper_client_cpu_max | percent | 0.29125 | 0.29125 |  |
| primary | retail-transfer-low | /peer0.ojk.paynet | caliper_client_memory_avg | bytes | 120 | 120 |  |
| primary | retail-transfer-low | /peer0.ojk.paynet | caliper_client_memory_max | bytes | 125 | 125 |  |
| primary | retail-transfer-low | /peer0.pjp.paynet | caliper_client_cpu_avg | percent | 0.2075 | 0.2075 |  |
| primary | retail-transfer-low | /peer0.pjp.paynet | caliper_client_cpu_max | percent | 0.39125 | 0.39125 |  |
| primary | retail-transfer-low | /peer0.pjp.paynet | caliper_client_memory_avg | bytes | 125 | 125 |  |
| primary | retail-transfer-low | /peer0.pjp.paynet | caliper_client_memory_max | bytes | 130 | 130 |  |
| primary | retail-transfer-low | /couchdb0.ojk.paynet | caliper_client_cpu_avg | percent | 1.49875 | 1.49875 |  |
| primary | retail-transfer-low | /couchdb0.ojk.paynet | caliper_client_cpu_max | percent | 2.57875 | 2.57875 |  |
| primary | retail-transfer-low | /couchdb0.ojk.paynet | caliper_client_memory_avg | bytes | 59.9 | 59.9 |  |
| primary | retail-transfer-low | /couchdb0.ojk.paynet | caliper_client_memory_max | bytes | 77.1 | 77.1 |  |
| primary | retail-transfer-low | /couchdb0.bi.paynet | caliper_client_cpu_avg | percent | 1.52 | 1.52 |  |
| primary | retail-transfer-low | /couchdb0.bi.paynet | caliper_client_cpu_max | percent | 2.43125 | 2.43125 |  |
| primary | retail-transfer-low | /couchdb0.bi.paynet | caliper_client_memory_avg | bytes | 58.3 | 58.3 |  |
| primary | retail-transfer-low | /couchdb0.bi.paynet | caliper_client_memory_max | bytes | 78.9 | 78.9 |  |
| primary | retail-transfer-low | /couchdb0.himbara.paynet | caliper_client_cpu_avg | percent | 1.2775 | 1.2775 |  |
| primary | retail-transfer-low | /couchdb0.himbara.paynet | caliper_client_cpu_max | percent | 2.54625 | 2.54625 |  |
| primary | retail-transfer-low | /couchdb0.himbara.paynet | caliper_client_memory_avg | bytes | 59.9 | 59.9 |  |
| primary | retail-transfer-low | /couchdb0.himbara.paynet | caliper_client_memory_max | bytes | 78.1 | 78.1 |  |
| primary | retail-transfer-low | /orderer.paynet | caliper_client_cpu_avg | percent | 0.18375 | 0.18375 |  |
| primary | retail-transfer-low | /orderer.paynet | caliper_client_cpu_max | percent | 0.2625 | 0.2625 |  |
| primary | retail-transfer-low | /orderer.paynet | caliper_client_memory_avg | bytes | 74.3 | 74.3 |  |
| primary | retail-transfer-low | /orderer.paynet | caliper_client_memory_max | bytes | 92.8 | 92.8 |  |
| primary | retail-transfer-low | /couchdb0.commercial.paynet | caliper_client_cpu_avg | percent | 1.51375 | 1.51375 |  |
| primary | retail-transfer-low | /couchdb0.commercial.paynet | caliper_client_cpu_max | percent | 2.70625 | 2.70625 |  |
| primary | retail-transfer-low | /couchdb0.commercial.paynet | caliper_client_memory_avg | bytes | 59 | 59 |  |
| primary | retail-transfer-low | /couchdb0.commercial.paynet | caliper_client_memory_max | bytes | 77.1 | 77.1 |  |
| primary | retail-transfer-low | /couchdb0.pjp.paynet | caliper_client_cpu_avg | percent | 1.52625 | 1.52625 |  |
| primary | retail-transfer-low | /couchdb0.pjp.paynet | caliper_client_cpu_max | percent | 2.36375 | 2.36375 |  |
| primary | retail-transfer-low | /couchdb0.pjp.paynet | caliper_client_memory_avg | bytes | 59.2 | 59.2 |  |
| primary | retail-transfer-low | /couchdb0.pjp.paynet | caliper_client_memory_max | bytes | 75.6 | 75.6 |  |
| primary | retail-transfer-low | node caliper(sum) | caliper_client_cpu_avg | percent | 77.18 | 77.18 |  |
| primary | retail-transfer-low | node caliper(sum) | caliper_client_cpu_max | percent | 116 | 116 |  |
| primary | retail-transfer-low | node-exporter:9100 | host_cpu_busy_percent | % | 86.033505593982 | 97.48275862069116 | 97.38620689655613 |
| primary | retail-transfer-low | node-exporter:9100 | host_memory_used_bytes | bytes | 5649547018.940171 | 6054043648 | 5717340160 |
| primary | retail-transfer-low | node-exporter:9100 | host_read_iops | operations_per_second | 0.005922845880173467 | 0.10714285714285714 | 0.03465004310344827 |
| primary | retail-transfer-low | node-exporter:9100 | host_write_iops | operations_per_second | 1724.2248892369314 | 4304.620689655172 | 4186.5948275862065 |
| primary | retail-transfer-low | node-exporter:9100 | host_read_await_ms | milliseconds_per_operation | 0 | 0 | 0 |
| primary | retail-transfer-low | node-exporter:9100 | host_write_await_ms | milliseconds_per_operation | 1.6301500853558284 | 6.564444210378579 | 4.600732981074769 |
| primary | retail-transfer-low | /peer0.himbara.paynet | caliper_client_cpu_avg | percent | 0.7725 | 0.7725 |  |
| primary | retail-transfer-low | /peer0.himbara.paynet | caliper_client_cpu_max | percent | 1.01125 | 1.01125 |  |
| primary | retail-transfer-low | /peer0.himbara.paynet | caliper_client_memory_avg | bytes | 155 | 155 |  |
| primary | retail-transfer-low | /peer0.himbara.paynet | caliper_client_memory_max | bytes | 163 | 163 |  |
| primary | retail-transfer-low | /peer0.pjp.paynet | caliper_client_cpu_avg | percent | 0.2125 | 0.2125 |  |
| primary | retail-transfer-low | /peer0.pjp.paynet | caliper_client_cpu_max | percent | 0.30875 | 0.30875 |  |
| primary | retail-transfer-low | /peer0.pjp.paynet | caliper_client_memory_avg | bytes | 121 | 121 |  |
| primary | retail-transfer-low | /peer0.pjp.paynet | caliper_client_memory_max | bytes | 125 | 125 |  |
| primary | retail-transfer-low | /peer0.ojk.paynet | caliper_client_cpu_avg | percent | 0.21375 | 0.21375 |  |
| primary | retail-transfer-low | /peer0.ojk.paynet | caliper_client_cpu_max | percent | 0.27625 | 0.27625 |  |
| primary | retail-transfer-low | /peer0.ojk.paynet | caliper_client_memory_avg | bytes | 121 | 121 |  |
| primary | retail-transfer-low | /peer0.ojk.paynet | caliper_client_memory_max | bytes | 128 | 128 |  |
| primary | retail-transfer-low | /peer0.bi.paynet | caliper_client_cpu_avg | percent | 0.21625 | 0.21625 |  |
| primary | retail-transfer-low | /peer0.bi.paynet | caliper_client_cpu_max | percent | 0.30125 | 0.30125 |  |
| primary | retail-transfer-low | /peer0.bi.paynet | caliper_client_memory_avg | bytes | 126 | 126 |  |
| primary | retail-transfer-low | /peer0.bi.paynet | caliper_client_memory_max | bytes | 131 | 131 |  |
| primary | retail-transfer-low | /peer0.commercial.paynet | caliper_client_cpu_avg | percent | 0.2125 | 0.2125 |  |
| primary | retail-transfer-low | /peer0.commercial.paynet | caliper_client_cpu_max | percent | 0.325 | 0.325 |  |
| primary | retail-transfer-low | /peer0.commercial.paynet | caliper_client_memory_avg | bytes | 124 | 124 |  |
| primary | retail-transfer-low | /peer0.commercial.paynet | caliper_client_memory_max | bytes | 129 | 129 |  |
| primary | retail-transfer-low | /couchdb0.bi.paynet | caliper_client_cpu_avg | percent | 1.445 | 1.445 |  |
| primary | retail-transfer-low | /couchdb0.bi.paynet | caliper_client_cpu_max | percent | 2.265 | 2.265 |  |
| primary | retail-transfer-low | /couchdb0.bi.paynet | caliper_client_memory_avg | bytes | 58 | 58 |  |
| primary | retail-transfer-low | /couchdb0.bi.paynet | caliper_client_memory_max | bytes | 72.6 | 72.6 |  |
| primary | retail-transfer-low | /couchdb0.himbara.paynet | caliper_client_cpu_avg | percent | 1.2175 | 1.2175 |  |
| primary | retail-transfer-low | /couchdb0.himbara.paynet | caliper_client_cpu_max | percent | 1.85125 | 1.85125 |  |
| primary | retail-transfer-low | /couchdb0.himbara.paynet | caliper_client_memory_avg | bytes | 61.2 | 61.2 |  |
| primary | retail-transfer-low | /couchdb0.himbara.paynet | caliper_client_memory_max | bytes | 81.1 | 81.1 |  |
| primary | retail-transfer-low | /couchdb0.pjp.paynet | caliper_client_cpu_avg | percent | 1.4525 | 1.4525 |  |
| primary | retail-transfer-low | /couchdb0.pjp.paynet | caliper_client_cpu_max | percent | 2.5725 | 2.5725 |  |
| primary | retail-transfer-low | /couchdb0.pjp.paynet | caliper_client_memory_avg | bytes | 60 | 60 |  |
| primary | retail-transfer-low | /couchdb0.pjp.paynet | caliper_client_memory_max | bytes | 72.5 | 72.5 |  |
| primary | retail-transfer-low | /couchdb0.ojk.paynet | caliper_client_cpu_avg | percent | 1.45625 | 1.45625 |  |
| primary | retail-transfer-low | /couchdb0.ojk.paynet | caliper_client_cpu_max | percent | 2.47 | 2.47 |  |
| primary | retail-transfer-low | /couchdb0.ojk.paynet | caliper_client_memory_avg | bytes | 59.4 | 59.4 |  |
| primary | retail-transfer-low | /couchdb0.ojk.paynet | caliper_client_memory_max | bytes | 81.3 | 81.3 |  |
| primary | retail-transfer-low | /couchdb0.commercial.paynet | caliper_client_cpu_avg | percent | 1.43375 | 1.43375 |  |
| primary | retail-transfer-low | /couchdb0.commercial.paynet | caliper_client_cpu_max | percent | 2.535 | 2.535 |  |
| primary | retail-transfer-low | /couchdb0.commercial.paynet | caliper_client_memory_avg | bytes | 58.8 | 58.8 |  |
| primary | retail-transfer-low | /couchdb0.commercial.paynet | caliper_client_memory_max | bytes | 76.6 | 76.6 |  |
| primary | retail-transfer-low | /orderer.paynet | caliper_client_cpu_avg | percent | 0.17625 | 0.17625 |  |
| primary | retail-transfer-low | /orderer.paynet | caliper_client_cpu_max | percent | 0.29625 | 0.29625 |  |
| primary | retail-transfer-low | /orderer.paynet | caliper_client_memory_avg | bytes | 77.1 | 77.1 |  |
| primary | retail-transfer-low | /orderer.paynet | caliper_client_memory_max | bytes | 93 | 93 |  |
| primary | retail-transfer-low | node caliper(sum) | caliper_client_cpu_avg | percent | 95.09 | 95.09 |  |
| primary | retail-transfer-low | node caliper(sum) | caliper_client_cpu_max | percent | 120 | 120 |  |
| primary | retail-transfer-low | node-exporter:9100 | host_cpu_busy_percent | % | 86.4263766640824 | 97.20703750000662 | 96.99469361658885 |
| primary | retail-transfer-low | node-exporter:9100 | host_memory_used_bytes | bytes | 5682543239.658119 | 6088642560 | 5769099673.599998 |
| primary | retail-transfer-low | node-exporter:9100 | host_read_iops | operations_per_second | 0 | 0 | 0 |
| primary | retail-transfer-low | node-exporter:9100 | host_write_iops | operations_per_second | 1746.153346585998 | 4499.103448275862 | 4147.603448275861 |
| primary | retail-transfer-low | node-exporter:9100 | host_read_await_ms | milliseconds_per_operation | 0 | 0 | 0 |
| primary | retail-transfer-low | node-exporter:9100 | host_write_await_ms | milliseconds_per_operation | 1.396108381392232 | 6.488938882639704 | 4.214397433518801 |
| primary | retail-transfer-low | /peer0.ojk.paynet | caliper_client_cpu_avg | percent | 0.21 | 0.21 |  |
| primary | retail-transfer-low | /peer0.ojk.paynet | caliper_client_cpu_max | percent | 0.3875 | 0.3875 |  |
| primary | retail-transfer-low | /peer0.ojk.paynet | caliper_client_memory_avg | bytes | 123 | 123 |  |
| primary | retail-transfer-low | /peer0.ojk.paynet | caliper_client_memory_max | bytes | 127 | 127 |  |
| primary | retail-transfer-low | /peer0.bi.paynet | caliper_client_cpu_avg | percent | 0.21125 | 0.21125 |  |
| primary | retail-transfer-low | /peer0.bi.paynet | caliper_client_cpu_max | percent | 0.3025 | 0.3025 |  |
| primary | retail-transfer-low | /peer0.bi.paynet | caliper_client_memory_avg | bytes | 125 | 125 |  |
| primary | retail-transfer-low | /peer0.bi.paynet | caliper_client_memory_max | bytes | 130 | 130 |  |
| primary | retail-transfer-low | /peer0.pjp.paynet | caliper_client_cpu_avg | percent | 0.21 | 0.21 |  |
| primary | retail-transfer-low | /peer0.pjp.paynet | caliper_client_cpu_max | percent | 0.28125 | 0.28125 |  |
| primary | retail-transfer-low | /peer0.pjp.paynet | caliper_client_memory_avg | bytes | 120 | 120 |  |
| primary | retail-transfer-low | /peer0.pjp.paynet | caliper_client_memory_max | bytes | 128 | 128 |  |
| primary | retail-transfer-low | /peer0.commercial.paynet | caliper_client_cpu_avg | percent | 0.215 | 0.215 |  |
| primary | retail-transfer-low | /peer0.commercial.paynet | caliper_client_cpu_max | percent | 0.33375 | 0.33375 |  |
| primary | retail-transfer-low | /peer0.commercial.paynet | caliper_client_memory_avg | bytes | 124 | 124 |  |
| primary | retail-transfer-low | /peer0.commercial.paynet | caliper_client_memory_max | bytes | 129 | 129 |  |
| primary | retail-transfer-low | /peer0.himbara.paynet | caliper_client_cpu_avg | percent | 0.75625 | 0.75625 |  |
| primary | retail-transfer-low | /peer0.himbara.paynet | caliper_client_cpu_max | percent | 0.9825 | 0.9825 |  |
| primary | retail-transfer-low | /peer0.himbara.paynet | caliper_client_memory_avg | bytes | 151 | 151 |  |
| primary | retail-transfer-low | /peer0.himbara.paynet | caliper_client_memory_max | bytes | 159 | 159 |  |
| primary | retail-transfer-low | /couchdb0.pjp.paynet | caliper_client_cpu_avg | percent | 1.43125 | 1.43125 |  |
| primary | retail-transfer-low | /couchdb0.pjp.paynet | caliper_client_cpu_max | percent | 2.86125 | 2.86125 |  |
| primary | retail-transfer-low | /couchdb0.pjp.paynet | caliper_client_memory_avg | bytes | 58.4 | 58.4 |  |
| primary | retail-transfer-low | /couchdb0.pjp.paynet | caliper_client_memory_max | bytes | 72.1 | 72.1 |  |
| primary | retail-transfer-low | /couchdb0.himbara.paynet | caliper_client_cpu_avg | percent | 1.2375 | 1.2375 |  |
| primary | retail-transfer-low | /couchdb0.himbara.paynet | caliper_client_cpu_max | percent | 2.0775 | 2.0775 |  |
| primary | retail-transfer-low | /couchdb0.himbara.paynet | caliper_client_memory_avg | bytes | 61.1 | 61.1 |  |
| primary | retail-transfer-low | /couchdb0.himbara.paynet | caliper_client_memory_max | bytes | 84 | 84 |  |
| primary | retail-transfer-low | /orderer.paynet | caliper_client_cpu_avg | percent | 0.17375 | 0.17375 |  |
| primary | retail-transfer-low | /orderer.paynet | caliper_client_cpu_max | percent | 0.24375 | 0.24375 |  |
| primary | retail-transfer-low | /orderer.paynet | caliper_client_memory_avg | bytes | 75.7 | 75.7 |  |
| primary | retail-transfer-low | /orderer.paynet | caliper_client_memory_max | bytes | 94.1 | 94.1 |  |
| primary | retail-transfer-low | /couchdb0.ojk.paynet | caliper_client_cpu_avg | percent | 1.42625 | 1.42625 |  |
| primary | retail-transfer-low | /couchdb0.ojk.paynet | caliper_client_cpu_max | percent | 2.3125 | 2.3125 |  |
| primary | retail-transfer-low | /couchdb0.ojk.paynet | caliper_client_memory_avg | bytes | 59.9 | 59.9 |  |
| primary | retail-transfer-low | /couchdb0.ojk.paynet | caliper_client_memory_max | bytes | 71.7 | 71.7 |  |
| primary | retail-transfer-low | /couchdb0.bi.paynet | caliper_client_cpu_avg | percent | 1.47125 | 1.47125 |  |
| primary | retail-transfer-low | /couchdb0.bi.paynet | caliper_client_cpu_max | percent | 2.63625 | 2.63625 |  |
| primary | retail-transfer-low | /couchdb0.bi.paynet | caliper_client_memory_avg | bytes | 59 | 59 |  |
| primary | retail-transfer-low | /couchdb0.bi.paynet | caliper_client_memory_max | bytes | 75.6 | 75.6 |  |
| primary | retail-transfer-low | /couchdb0.commercial.paynet | caliper_client_cpu_avg | percent | 1.47125 | 1.47125 |  |
| primary | retail-transfer-low | /couchdb0.commercial.paynet | caliper_client_cpu_max | percent | 3.1125 | 3.1125 |  |
| primary | retail-transfer-low | /couchdb0.commercial.paynet | caliper_client_memory_avg | bytes | 60.9 | 60.9 |  |
| primary | retail-transfer-low | /couchdb0.commercial.paynet | caliper_client_memory_max | bytes | 77.1 | 77.1 |  |
| primary | retail-transfer-low | node caliper(sum) | caliper_client_cpu_avg | percent | 95.23 | 95.23 |  |
| primary | retail-transfer-low | node caliper(sum) | caliper_client_cpu_max | percent | 126.26 | 126.26 |  |
| primary | retail-transfer-low | node-exporter:9100 | host_cpu_busy_percent | % | 85.84623990967803 | 97.04290238095467 | 96.93017241379933 |
| primary | retail-transfer-low | node-exporter:9100 | host_memory_used_bytes | bytes | 5717077385.846154 | 6194622464 | 5907002982.4 |
| primary | retail-transfer-low | node-exporter:9100 | host_read_iops | operations_per_second | 0.003985958101338581 | 0.03571428571428571 | 0.034482758620689655 |
| primary | retail-transfer-low | node-exporter:9100 | host_write_iops | operations_per_second | 1777.3639838841 | 4474.137931034483 | 4389.062068965517 |
| primary | retail-transfer-low | node-exporter:9100 | host_read_await_ms | milliseconds_per_operation | 0 | 0 | 0 |
| primary | retail-transfer-low | node-exporter:9100 | host_write_await_ms | milliseconds_per_operation | 2.1996986065696755 | 14.234504004929917 | 7.6730274232834565 |
| primary | retail-transfer-low | /peer0.commercial.paynet | caliper_client_cpu_avg | percent | 0.21875 | 0.21875 |  |
| primary | retail-transfer-low | /peer0.commercial.paynet | caliper_client_cpu_max | percent | 0.29625 | 0.29625 |  |
| primary | retail-transfer-low | /peer0.commercial.paynet | caliper_client_memory_avg | bytes | 124 | 124 |  |
| primary | retail-transfer-low | /peer0.commercial.paynet | caliper_client_memory_max | bytes | 129 | 129 |  |
| primary | retail-transfer-low | /peer0.ojk.paynet | caliper_client_cpu_avg | percent | 0.21125 | 0.21125 |  |
| primary | retail-transfer-low | /peer0.ojk.paynet | caliper_client_cpu_max | percent | 0.3875 | 0.3875 |  |
| primary | retail-transfer-low | /peer0.ojk.paynet | caliper_client_memory_avg | bytes | 120 | 120 |  |
| primary | retail-transfer-low | /peer0.ojk.paynet | caliper_client_memory_max | bytes | 125 | 125 |  |
| primary | retail-transfer-low | /peer0.bi.paynet | caliper_client_cpu_avg | percent | 0.215 | 0.215 |  |
| primary | retail-transfer-low | /peer0.bi.paynet | caliper_client_cpu_max | percent | 0.3275 | 0.3275 |  |
| primary | retail-transfer-low | /peer0.bi.paynet | caliper_client_memory_avg | bytes | 125 | 125 |  |
| primary | retail-transfer-low | /peer0.bi.paynet | caliper_client_memory_max | bytes | 130 | 130 |  |
| primary | retail-transfer-low | /peer0.pjp.paynet | caliper_client_cpu_avg | percent | 0.21 | 0.21 |  |
| primary | retail-transfer-low | /peer0.pjp.paynet | caliper_client_cpu_max | percent | 0.33375 | 0.33375 |  |
| primary | retail-transfer-low | /peer0.pjp.paynet | caliper_client_memory_avg | bytes | 124 | 124 |  |
| primary | retail-transfer-low | /peer0.pjp.paynet | caliper_client_memory_max | bytes | 132 | 132 |  |
| primary | retail-transfer-low | /peer0.himbara.paynet | caliper_client_cpu_avg | percent | 0.73125 | 0.73125 |  |
| primary | retail-transfer-low | /peer0.himbara.paynet | caliper_client_cpu_max | percent | 0.99375 | 0.99375 |  |
| primary | retail-transfer-low | /peer0.himbara.paynet | caliper_client_memory_avg | bytes | 151 | 151 |  |
| primary | retail-transfer-low | /peer0.himbara.paynet | caliper_client_memory_max | bytes | 161 | 161 |  |
| primary | retail-transfer-low | /couchdb0.himbara.paynet | caliper_client_cpu_avg | percent | 1.21125 | 1.21125 |  |
| primary | retail-transfer-low | /couchdb0.himbara.paynet | caliper_client_cpu_max | percent | 1.975 | 1.975 |  |
| primary | retail-transfer-low | /couchdb0.himbara.paynet | caliper_client_memory_avg | bytes | 60.1 | 60.1 |  |
| primary | retail-transfer-low | /couchdb0.himbara.paynet | caliper_client_memory_max | bytes | 83.1 | 83.1 |  |
| primary | retail-transfer-low | /orderer.paynet | caliper_client_cpu_avg | percent | 0.15875 | 0.15875 |  |
| primary | retail-transfer-low | /orderer.paynet | caliper_client_cpu_max | percent | 0.31375 | 0.31375 |  |
| primary | retail-transfer-low | /orderer.paynet | caliper_client_memory_avg | bytes | 78.1 | 78.1 |  |
| primary | retail-transfer-low | /orderer.paynet | caliper_client_memory_max | bytes | 93.7 | 93.7 |  |
| primary | retail-transfer-low | /couchdb0.commercial.paynet | caliper_client_cpu_avg | percent | 1.5225 | 1.5225 |  |
| primary | retail-transfer-low | /couchdb0.commercial.paynet | caliper_client_cpu_max | percent | 2.505 | 2.505 |  |
| primary | retail-transfer-low | /couchdb0.commercial.paynet | caliper_client_memory_avg | bytes | 58.1 | 58.1 |  |
| primary | retail-transfer-low | /couchdb0.commercial.paynet | caliper_client_memory_max | bytes | 78 | 78 |  |
| primary | retail-transfer-low | /couchdb0.pjp.paynet | caliper_client_cpu_avg | percent | 1.42125 | 1.42125 |  |
| primary | retail-transfer-low | /couchdb0.pjp.paynet | caliper_client_cpu_max | percent | 2.49 | 2.49 |  |
| primary | retail-transfer-low | /couchdb0.pjp.paynet | caliper_client_memory_avg | bytes | 58.5 | 58.5 |  |
| primary | retail-transfer-low | /couchdb0.pjp.paynet | caliper_client_memory_max | bytes | 81.3 | 81.3 |  |
| primary | retail-transfer-low | /couchdb0.ojk.paynet | caliper_client_cpu_avg | percent | 1.4775 | 1.4775 |  |
| primary | retail-transfer-low | /couchdb0.ojk.paynet | caliper_client_cpu_max | percent | 2.75375 | 2.75375 |  |
| primary | retail-transfer-low | /couchdb0.ojk.paynet | caliper_client_memory_avg | bytes | 59.7 | 59.7 |  |
| primary | retail-transfer-low | /couchdb0.ojk.paynet | caliper_client_memory_max | bytes | 83.5 | 83.5 |  |
| primary | retail-transfer-low | /couchdb0.bi.paynet | caliper_client_cpu_avg | percent | 1.42 | 1.42 |  |
| primary | retail-transfer-low | /couchdb0.bi.paynet | caliper_client_cpu_max | percent | 2.335 | 2.335 |  |
| primary | retail-transfer-low | /couchdb0.bi.paynet | caliper_client_memory_avg | bytes | 59.9 | 59.9 |  |
| primary | retail-transfer-low | /couchdb0.bi.paynet | caliper_client_memory_max | bytes | 77.2 | 77.2 |  |
| primary | retail-transfer-low | node caliper(sum) | caliper_client_cpu_avg | percent | 94.76 | 94.76 |  |
| primary | retail-transfer-low | node caliper(sum) | caliper_client_cpu_max | percent | 129 | 129 |  |
| primary | retail-transfer-low | node-exporter:9100 | host_cpu_busy_percent | % | 86.02002311053852 | 97.34821428571324 | 97.21298347830245 |
| primary | retail-transfer-low | node-exporter:9100 | host_memory_used_bytes | bytes | 5647457633.103448 | 5948293120 | 5719522304 |
| primary | retail-transfer-low | node-exporter:9100 | host_read_iops | operations_per_second | 0.015667067106713468 | 0.1724137931034483 | 0.10344827586206896 |
| primary | retail-transfer-low | node-exporter:9100 | host_write_iops | operations_per_second | 1758.5457733248252 | 4455.068965517241 | 4211.090886699507 |
| primary | retail-transfer-low | node-exporter:9100 | host_read_await_ms | milliseconds_per_operation | 0 | 0 | 0 |
| primary | retail-transfer-low | node-exporter:9100 | host_write_await_ms | milliseconds_per_operation | 1.5062470852570449 | 17.70095861585444 | 4.594706387347872 |
| primary | retail-transfer-low | /peer0.himbara.paynet | caliper_client_cpu_avg | percent | 0.7275 | 0.7275 |  |
| primary | retail-transfer-low | /peer0.himbara.paynet | caliper_client_cpu_max | percent | 0.9025 | 0.9025 |  |
| primary | retail-transfer-low | /peer0.himbara.paynet | caliper_client_memory_avg | bytes | 147 | 147 |  |
| primary | retail-transfer-low | /peer0.himbara.paynet | caliper_client_memory_max | bytes | 160 | 160 |  |
| primary | retail-transfer-low | /peer0.bi.paynet | caliper_client_cpu_avg | percent | 0.2125 | 0.2125 |  |
| primary | retail-transfer-low | /peer0.bi.paynet | caliper_client_cpu_max | percent | 0.2975 | 0.2975 |  |
| primary | retail-transfer-low | /peer0.bi.paynet | caliper_client_memory_avg | bytes | 127 | 127 |  |
| primary | retail-transfer-low | /peer0.bi.paynet | caliper_client_memory_max | bytes | 134 | 134 |  |
| primary | retail-transfer-low | /peer0.ojk.paynet | caliper_client_cpu_avg | percent | 0.215 | 0.215 |  |
| primary | retail-transfer-low | /peer0.ojk.paynet | caliper_client_cpu_max | percent | 0.365 | 0.365 |  |
| primary | retail-transfer-low | /peer0.ojk.paynet | caliper_client_memory_avg | bytes | 119 | 119 |  |
| primary | retail-transfer-low | /peer0.ojk.paynet | caliper_client_memory_max | bytes | 124 | 124 |  |
| primary | retail-transfer-low | /peer0.commercial.paynet | caliper_client_cpu_avg | percent | 0.2175 | 0.2175 |  |
| primary | retail-transfer-low | /peer0.commercial.paynet | caliper_client_cpu_max | percent | 0.3425 | 0.3425 |  |
| primary | retail-transfer-low | /peer0.commercial.paynet | caliper_client_memory_avg | bytes | 121 | 121 |  |
| primary | retail-transfer-low | /peer0.commercial.paynet | caliper_client_memory_max | bytes | 127 | 127 |  |
| primary | retail-transfer-low | /peer0.pjp.paynet | caliper_client_cpu_avg | percent | 0.21375 | 0.21375 |  |
| primary | retail-transfer-low | /peer0.pjp.paynet | caliper_client_cpu_max | percent | 0.33875 | 0.33875 |  |
| primary | retail-transfer-low | /peer0.pjp.paynet | caliper_client_memory_avg | bytes | 127 | 127 |  |
| primary | retail-transfer-low | /peer0.pjp.paynet | caliper_client_memory_max | bytes | 133 | 133 |  |
| primary | retail-transfer-low | /orderer.paynet | caliper_client_cpu_avg | percent | 0.1725 | 0.1725 |  |
| primary | retail-transfer-low | /orderer.paynet | caliper_client_cpu_max | percent | 0.285 | 0.285 |  |
| primary | retail-transfer-low | /orderer.paynet | caliper_client_memory_avg | bytes | 77.4 | 77.4 |  |
| primary | retail-transfer-low | /orderer.paynet | caliper_client_memory_max | bytes | 94.5 | 94.5 |  |
| primary | retail-transfer-low | /couchdb0.pjp.paynet | caliper_client_cpu_avg | percent | 1.45375 | 1.45375 |  |
| primary | retail-transfer-low | /couchdb0.pjp.paynet | caliper_client_cpu_max | percent | 2.43875 | 2.43875 |  |
| primary | retail-transfer-low | /couchdb0.pjp.paynet | caliper_client_memory_avg | bytes | 56.3 | 56.3 |  |
| primary | retail-transfer-low | /couchdb0.pjp.paynet | caliper_client_memory_max | bytes | 73.1 | 73.1 |  |
| primary | retail-transfer-low | /couchdb0.himbara.paynet | caliper_client_cpu_avg | percent | 1.21625 | 1.21625 |  |
| primary | retail-transfer-low | /couchdb0.himbara.paynet | caliper_client_cpu_max | percent | 1.72125 | 1.72125 |  |
| primary | retail-transfer-low | /couchdb0.himbara.paynet | caliper_client_memory_avg | bytes | 61 | 61 |  |
| primary | retail-transfer-low | /couchdb0.himbara.paynet | caliper_client_memory_max | bytes | 75.3 | 75.3 |  |
| primary | retail-transfer-low | /couchdb0.ojk.paynet | caliper_client_cpu_avg | percent | 1.42625 | 1.42625 |  |
| primary | retail-transfer-low | /couchdb0.ojk.paynet | caliper_client_cpu_max | percent | 2.3125 | 2.3125 |  |
| primary | retail-transfer-low | /couchdb0.ojk.paynet | caliper_client_memory_avg | bytes | 57.7 | 57.7 |  |
| primary | retail-transfer-low | /couchdb0.ojk.paynet | caliper_client_memory_max | bytes | 75 | 75 |  |
| primary | retail-transfer-low | /couchdb0.bi.paynet | caliper_client_cpu_avg | percent | 1.46 | 1.46 |  |
| primary | retail-transfer-low | /couchdb0.bi.paynet | caliper_client_cpu_max | percent | 2.2475 | 2.2475 |  |
| primary | retail-transfer-low | /couchdb0.bi.paynet | caliper_client_memory_avg | bytes | 60.3 | 60.3 |  |
| primary | retail-transfer-low | /couchdb0.bi.paynet | caliper_client_memory_max | bytes | 77.2 | 77.2 |  |
| primary | retail-transfer-low | /couchdb0.commercial.paynet | caliper_client_cpu_avg | percent | 1.4875 | 1.4875 |  |
| primary | retail-transfer-low | /couchdb0.commercial.paynet | caliper_client_cpu_max | percent | 2.6575 | 2.6575 |  |
| primary | retail-transfer-low | /couchdb0.commercial.paynet | caliper_client_memory_avg | bytes | 58 | 58 |  |
| primary | retail-transfer-low | /couchdb0.commercial.paynet | caliper_client_memory_max | bytes | 77.8 | 77.8 |  |
| primary | retail-transfer-low | node caliper(sum) | caliper_client_cpu_avg | percent | 95.48 | 95.48 |  |
| primary | retail-transfer-low | node caliper(sum) | caliper_client_cpu_max | percent | 118.81 | 118.81 |  |
| primary | retail-transfer-low | node-exporter:9100 | host_cpu_busy_percent | % | 85.7834817965907 | 97.17020714285893 | 96.96551724137423 |
| primary | retail-transfer-low | node-exporter:9100 | host_memory_used_bytes | bytes | 5662796093.793103 | 5970554880 | 5729801216 |
| primary | retail-transfer-low | node-exporter:9100 | host_read_iops | operations_per_second | 0.0044735501444631955 | 0.03571428571428571 | 0.034482758620689655 |
| primary | retail-transfer-low | node-exporter:9100 | host_write_iops | operations_per_second | 1754.746162567958 | 4656.172413793103 | 4214.482758620689 |
| primary | retail-transfer-low | node-exporter:9100 | host_read_await_ms | milliseconds_per_operation | 0.012931034482452844 | 0.9999999999763532 | 0 |
| primary | retail-transfer-low | node-exporter:9100 | host_write_await_ms | milliseconds_per_operation | 1.4495976829353965 | 10.063597819501217 | 3.443501635402134 |
| primary | retail-transfer-low | /peer0.ojk.paynet | caliper_client_cpu_avg | percent | 0.20875 | 0.20875 |  |
| primary | retail-transfer-low | /peer0.ojk.paynet | caliper_client_cpu_max | percent | 0.27125 | 0.27125 |  |
| primary | retail-transfer-low | /peer0.ojk.paynet | caliper_client_memory_avg | bytes | 118 | 118 |  |
| primary | retail-transfer-low | /peer0.ojk.paynet | caliper_client_memory_max | bytes | 124 | 124 |  |
| primary | retail-transfer-low | /peer0.commercial.paynet | caliper_client_cpu_avg | percent | 0.20875 | 0.20875 |  |
| primary | retail-transfer-low | /peer0.commercial.paynet | caliper_client_cpu_max | percent | 0.32 | 0.32 |  |
| primary | retail-transfer-low | /peer0.commercial.paynet | caliper_client_memory_avg | bytes | 119 | 119 |  |
| primary | retail-transfer-low | /peer0.commercial.paynet | caliper_client_memory_max | bytes | 124 | 124 |  |
| primary | retail-transfer-low | /peer0.himbara.paynet | caliper_client_cpu_avg | percent | 0.7725 | 0.7725 |  |
| primary | retail-transfer-low | /peer0.himbara.paynet | caliper_client_cpu_max | percent | 1.085 | 1.085 |  |
| primary | retail-transfer-low | /peer0.himbara.paynet | caliper_client_memory_avg | bytes | 151 | 151 |  |
| primary | retail-transfer-low | /peer0.himbara.paynet | caliper_client_memory_max | bytes | 160 | 160 |  |
| primary | retail-transfer-low | /peer0.bi.paynet | caliper_client_cpu_avg | percent | 0.2075 | 0.2075 |  |
| primary | retail-transfer-low | /peer0.bi.paynet | caliper_client_cpu_max | percent | 0.30375 | 0.30375 |  |
| primary | retail-transfer-low | /peer0.bi.paynet | caliper_client_memory_avg | bytes | 124 | 124 |  |
| primary | retail-transfer-low | /peer0.bi.paynet | caliper_client_memory_max | bytes | 128 | 128 |  |
| primary | retail-transfer-low | /peer0.pjp.paynet | caliper_client_cpu_avg | percent | 0.215 | 0.215 |  |
| primary | retail-transfer-low | /peer0.pjp.paynet | caliper_client_cpu_max | percent | 0.3525 | 0.3525 |  |
| primary | retail-transfer-low | /peer0.pjp.paynet | caliper_client_memory_avg | bytes | 125 | 125 |  |
| primary | retail-transfer-low | /peer0.pjp.paynet | caliper_client_memory_max | bytes | 131 | 131 |  |
| primary | retail-transfer-low | /couchdb0.himbara.paynet | caliper_client_cpu_avg | percent | 1.19625 | 1.19625 |  |
| primary | retail-transfer-low | /couchdb0.himbara.paynet | caliper_client_cpu_max | percent | 1.94 | 1.94 |  |
| primary | retail-transfer-low | /couchdb0.himbara.paynet | caliper_client_memory_avg | bytes | 60.4 | 60.4 |  |
| primary | retail-transfer-low | /couchdb0.himbara.paynet | caliper_client_memory_max | bytes | 75 | 75 |  |
| primary | retail-transfer-low | /couchdb0.commercial.paynet | caliper_client_cpu_avg | percent | 1.40125 | 1.40125 |  |
| primary | retail-transfer-low | /couchdb0.commercial.paynet | caliper_client_cpu_max | percent | 2.4025 | 2.4025 |  |
| primary | retail-transfer-low | /couchdb0.commercial.paynet | caliper_client_memory_avg | bytes | 59.1 | 59.1 |  |
| primary | retail-transfer-low | /couchdb0.commercial.paynet | caliper_client_memory_max | bytes | 76.7 | 76.7 |  |
| primary | retail-transfer-low | /couchdb0.ojk.paynet | caliper_client_cpu_avg | percent | 1.41 | 1.41 |  |
| primary | retail-transfer-low | /couchdb0.ojk.paynet | caliper_client_cpu_max | percent | 2.3425 | 2.3425 |  |
| primary | retail-transfer-low | /couchdb0.ojk.paynet | caliper_client_memory_avg | bytes | 60.7 | 60.7 |  |
| primary | retail-transfer-low | /couchdb0.ojk.paynet | caliper_client_memory_max | bytes | 76.6 | 76.6 |  |
| primary | retail-transfer-low | /couchdb0.bi.paynet | caliper_client_cpu_avg | percent | 1.45 | 1.45 |  |
| primary | retail-transfer-low | /couchdb0.bi.paynet | caliper_client_cpu_max | percent | 2.275 | 2.275 |  |
| primary | retail-transfer-low | /couchdb0.bi.paynet | caliper_client_memory_avg | bytes | 60.7 | 60.7 |  |
| primary | retail-transfer-low | /couchdb0.bi.paynet | caliper_client_memory_max | bytes | 79.2 | 79.2 |  |
| primary | retail-transfer-low | /orderer.paynet | caliper_client_cpu_avg | percent | 0.1725 | 0.1725 |  |
| primary | retail-transfer-low | /orderer.paynet | caliper_client_cpu_max | percent | 0.255 | 0.255 |  |
| primary | retail-transfer-low | /orderer.paynet | caliper_client_memory_avg | bytes | 76.7 | 76.7 |  |
| primary | retail-transfer-low | /orderer.paynet | caliper_client_memory_max | bytes | 95.6 | 95.6 |  |
| primary | retail-transfer-low | /couchdb0.pjp.paynet | caliper_client_cpu_avg | percent | 1.44375 | 1.44375 |  |
| primary | retail-transfer-low | /couchdb0.pjp.paynet | caliper_client_cpu_max | percent | 2.29 | 2.29 |  |
| primary | retail-transfer-low | /couchdb0.pjp.paynet | caliper_client_memory_avg | bytes | 58.1 | 58.1 |  |
| primary | retail-transfer-low | /couchdb0.pjp.paynet | caliper_client_memory_max | bytes | 71 | 71 |  |
| primary | retail-transfer-low | node caliper(sum) | caliper_client_cpu_avg | percent | 95.73 | 95.73 |  |
| primary | retail-transfer-low | node caliper(sum) | caliper_client_cpu_max | percent | 137 | 137 |  |

## 7. Results by Transaction Type

Each row is isolated: Issuance, Distribution, Retail Transfer, Merchant Payment, Redemption, Balance Query, and Wallet Status Change. Freeze and Unfreeze are preserved as separate operations.

## 8. Repetition and Uncertainty

Every confirmatory scenario is repeated five times. Tables report the mean and sample standard deviation across repetitions. Raw traces and Prometheus responses remain beside this report for reanalysis.

## Measurement Boundary

The primary benchmark measures direct Fabric traffic. Backend API, PostgreSQL, and KYC are evaluated separately by the end-to-end demonstration and are not mixed into these Fabric latency or throughput values.
