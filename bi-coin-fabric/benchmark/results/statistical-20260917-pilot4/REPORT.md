# Benchmark Statistical Report

## 1. Offered TPS vs Achieved TPS

Offered TPS is submitted transactions divided by the measured duration. Achieved TPS is successful completions divided by the same duration.

| Scenario | Target TPS | Repetitions | Offered TPS mean±SD | Achieved TPS mean±SD | Success mean±SD | Sustainable |
| --- | --- | --- | --- | --- | --- | --- |
| retail-transfer/retail-transfer/low | 5 | 1 | 7.1667 ± 0.0000 | 7.1667 ± 0.0000 | 100.0000% ± 0.0000% | NO |
| retail-transfer/retail-transfer/low | 10 | 1 | 10.0333 ± 0.0000 | 10.0333 ± 0.0000 | 100.0000% ± 0.0000% | NO |
| retail-transfer/retail-transfer/low | 20 | 1 | 20.0333 ± 0.0000 | 20.0333 ± 0.0000 | 100.0000% ± 0.0000% | NO |
| retail-transfer/retail-transfer/low | 40 | 1 | 265.9333 ± 0.0000 | 265.9333 ± 0.0000 | 100.0000% ± 0.0000% | NO |
| retail-transfer/retail-transfer/low | 60 | 1 | 0.0000 ± 0.0000 | 0.0000 ± 0.0000 | 0.0000% ± 0.0000% | NO |
| retail-transfer/retail-transfer/low | 80 | 1 | 0.0000 ± 0.0000 | 0.0000 ± 0.0000 | 0.0000% ± 0.0000% | NO |
| retail-transfer/retail-transfer/low | 100 | 1 | 0.0000 ± 0.0000 | 0.0000 ± 0.0000 | 0.0000% ± 0.0000% | NO |
| retail-transfer/retail-transfer/low | 150 | 1 | 0.0000 ± 0.0000 | 0.0000 ± 0.0000 | 0.0000% ± 0.0000% | NO |

## 2. Transaction Completion Counts

| Scenario | Submitted | Successful | Failed | Timed out | Success rate |
| --- | --- | --- | --- | --- | --- |
| retail-transfer/retail-transfer/low | 215 | 215 | 0 | 0 | 100.0000% |
| retail-transfer/retail-transfer/low | 301 | 301 | 0 | 0 | 100.0000% |
| retail-transfer/retail-transfer/low | 601 | 601 | 0 | 0 | 100.0000% |
| retail-transfer/retail-transfer/low | 7978 | 7978 | 0 | 0 | 100.0000% |
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
| retail-transfer/retail-transfer/low | 0.6284 | 0.2880 | 2.1522 | 2.2144 | 0.6264 | 0.1200 | 2.2250 |
| retail-transfer/retail-transfer/low | 0.6247 | 0.6270 | 1.0600 | 1.2230 | 0.3069 | 0.1060 | 2.1850 |
| retail-transfer/retail-transfer/low | 0.4180 | 0.4120 | 0.6510 | 0.7650 | 0.1705 | 0.1260 | 2.2370 |
| retail-transfer/retail-transfer/low | 2.3026 | 2.3320 | 2.9921 | 3.4369 | 0.4979 | 0.1760 | 3.8880 |
| retail-transfer/retail-transfer/low | 0.0000 | 0.0000 | 0.0000 | 0.0000 | 0.0000 | 0.0000 | 0.0000 |
| retail-transfer/retail-transfer/low | 0.0000 | 0.0000 | 0.0000 | 0.0000 | 0.0000 | 0.0000 | 0.0000 |
| retail-transfer/retail-transfer/low | 0.0000 | 0.0000 | 0.0000 | 0.0000 | 0.0000 | 0.0000 | 0.0000 |
| retail-transfer/retail-transfer/low | 0.0000 | 0.0000 | 0.0000 | 0.0000 | 0.0000 | 0.0000 | 0.0000 |

## 5. Saturation Point

The sustainable gate is at least 99% successful completions and p95 latency at most 2.5 seconds in all five repetitions. The highest load passing that gate is the maximum sustainable offered load; its successful throughput is reported separately as Achieved TPS.

## 6. Resource Metrics

Resource rows are emitted from the synchronized Prometheus capture. Missing telemetry is invalid evidence, not zero usage.

| scenarioId | component | metric | unit | mean | max | p95 |
| --- | --- | --- | --- | --- | --- | --- |
| retail-transfer-low | bi-coin-fabric-postgres | container_cpu_percent | % | 0.8592170383990362 | 1.059161376051954 | 1.0164697813932537 |
| retail-transfer-low | bi-coin-fabric-cadvisor | container_cpu_percent | % | 85.35291006654835 | 92.23230993618964 | 91.26045193796456 |
| retail-transfer-low | bi-coin-fabric-node-exporter | container_cpu_percent | % | 2.748133084797479 | 3.0467128662047056 | 2.9776554670565587 |
| retail-transfer-low | bi-coin-fabric-prometheus | container_cpu_percent | % | 10.129243556949838 | 11.283524669809655 | 11.24202903817961 |
| retail-transfer-low | couchdb0.pjp.paynet | container_cpu_percent | % | 12.32105258327693 | 20.55125675624598 | 19.623201783871874 |
| retail-transfer-low | orderer.paynet | container_cpu_percent | % | 0.8082889290958576 | 1.4105806832435617 | 1.381233249117741 |
| retail-transfer-low | couchdb0.himbara.paynet | container_cpu_percent | % | 11.479715239488876 | 18.96700726197862 | 18.58290143858034 |
| retail-transfer-low | couchdb0.bi.paynet | container_cpu_percent | % | 12.485759666759275 | 20.634182073139236 | 20.281750751864585 |
| retail-transfer-low | peer0.himbara.paynet | container_cpu_percent | % | 5.176080576016503 | 8.239568640620917 | 8.047715756799176 |
| retail-transfer-low | peer0.pjp.paynet | container_cpu_percent | % | 2.473248252546684 | 3.3062139561707014 | 3.2887461652916943 |
| retail-transfer-low | couchdb0.ojk.paynet | container_cpu_percent | % | 11.941048880944663 | 19.246954270000096 | 18.98937181623992 |
| retail-transfer-low | couchdb0.commercial.paynet | container_cpu_percent | % | 12.106044272598703 | 20.30970105076218 | 19.667246587332773 |
| retail-transfer-low | peer0.ojk.paynet | container_cpu_percent | % | 2.4695659381671513 | 3.390862664413257 | 3.3081037187297113 |
| retail-transfer-low | peer0.bi.paynet | container_cpu_percent | % | 2.5001758334107804 | 3.371204629527891 | 3.3460030962788836 |
| retail-transfer-low | peer0.commercial.paynet | container_cpu_percent | % | 2.3758601898984355 | 3.310139834806548 | 3.251189113635409 |
| retail-transfer-low | dev-peer0.pjp.paynet-digital-rupiah_3.0-6577345e5a476eadebff5403f2756125454311a1ea7739a34dbea5999be18074 | container_cpu_percent | % | 0.014688688263437055 | 0.036335962956611255 | 0.03270180583423372 |
| retail-transfer-low | dev-peer0.commercial.paynet-digital-rupiah_3.0-6577345e5a476eadebff5403f2756125454311a1ea7739a34dbea5999be18074 | container_cpu_percent | % | 0.011892041496796547 | 0.03974278824685192 | 0.03791267305644311 |
| retail-transfer-low | dev-peer0.bi.paynet-digital-rupiah_3.0-6577345e5a476eadebff5403f2756125454311a1ea7739a34dbea5999be18074 | container_cpu_percent | % | 0.019490532431903324 | 0.04629276456622422 | 0.0449508235626533 |
| retail-transfer-low | dev-peer0.himbara.paynet-digital-rupiah_3.0-6577345e5a476eadebff5403f2756125454311a1ea7739a34dbea5999be18074 | container_cpu_percent | % | 1.2423609294562716 | 2.1384710188228273 | 2.0702516665479003 |
| retail-transfer-low | bi-coin-fabric-postgres | container_memory_working_set_bytes | bytes | 14496220.279069768 | 15163392 | 14499020.8 |
| retail-transfer-low | bi-coin-fabric-cadvisor | container_memory_working_set_bytes | bytes | 152920826.04651162 | 172167168 | 171728896 |
| retail-transfer-low | bi-coin-fabric-node-exporter | container_memory_working_set_bytes | bytes | 13329050.790697675 | 14684160 | 14629273.6 |
| retail-transfer-low | bi-coin-fabric-prometheus | container_memory_working_set_bytes | bytes | 430061329.8604651 | 442605568 | 442417152 |
| retail-transfer-low | orderer.paynet | container_memory_working_set_bytes | bytes | 55984032.744186044 | 65712128 | 65712128 |
| retail-transfer-low | couchdb0.himbara.paynet | container_memory_working_set_bytes | bytes | 55559001.302325584 | 58232832 | 57016320 |
| retail-transfer-low | couchdb0.commercial.paynet | container_memory_working_set_bytes | bytes | 54794430.511627905 | 57561088 | 56320000 |
| retail-transfer-low | couchdb0.bi.paynet | container_memory_working_set_bytes | bytes | 56630010.04651163 | 60637184 | 58595328 |
| retail-transfer-low | peer0.pjp.paynet | container_memory_working_set_bytes | bytes | 109110581.58139534 | 116551680 | 115769344 |
| retail-transfer-low | couchdb0.ojk.paynet | container_memory_working_set_bytes | bytes | 54927169.488372095 | 59613184 | 56248320 |
| retail-transfer-low | couchdb0.pjp.paynet | container_memory_working_set_bytes | bytes | 51089598.511627905 | 56934400 | 56743936 |
| retail-transfer-low | peer0.bi.paynet | container_memory_working_set_bytes | bytes | 110033086.51162791 | 113696768 | 113180672 |
| retail-transfer-low | peer0.himbara.paynet | container_memory_working_set_bytes | bytes | 116549632 | 117821440 | 117821440 |
| retail-transfer-low | peer0.commercial.paynet | container_memory_working_set_bytes | bytes | 111973209.30232558 | 122081280 | 121877504 |
| retail-transfer-low | peer0.ojk.paynet | container_memory_working_set_bytes | bytes | 105032442.04651164 | 112087040 | 111507456 |
| retail-transfer-low | dev-peer0.pjp.paynet-digital-rupiah_3.0-6577345e5a476eadebff5403f2756125454311a1ea7739a34dbea5999be18074 | container_memory_working_set_bytes | bytes | 17533070.88372093 | 19152896 | 19152896 |
| retail-transfer-low | dev-peer0.bi.paynet-digital-rupiah_3.0-6577345e5a476eadebff5403f2756125454311a1ea7739a34dbea5999be18074 | container_memory_working_set_bytes | bytes | 19709570.976744186 | 19779584 | 19779584 |
| retail-transfer-low | dev-peer0.himbara.paynet-digital-rupiah_3.0-6577345e5a476eadebff5403f2756125454311a1ea7739a34dbea5999be18074 | container_memory_working_set_bytes | bytes | 25773222.69767442 | 26599424 | 26599424 |
| retail-transfer-low | dev-peer0.commercial.paynet-digital-rupiah_3.0-6577345e5a476eadebff5403f2756125454311a1ea7739a34dbea5999be18074 | container_memory_working_set_bytes | bytes | 17817838.139534883 | 18812928 | 18812928 |
| retail-transfer-low | bi-coin-fabric-postgres | container_network_receive_bytes_per_second | bytes_per_second | 0 | 0 | 0 |
| retail-transfer-low | bi-coin-fabric-cadvisor | container_network_receive_bytes_per_second | bytes_per_second | 7421.024444221887 | 8159.16347942033 | 8001.0611702426895 |
| retail-transfer-low | bi-coin-fabric-node-exporter | container_network_receive_bytes_per_second | bytes_per_second | 665.6221135550677 | 714.5528544714554 | 707.8518861863517 |
| retail-transfer-low | bi-coin-fabric-prometheus | container_network_receive_bytes_per_second | bytes_per_second | 492955.8867556005 | 549118.1131244957 | 543969.3485928808 |
| retail-transfer-low | couchdb0.pjp.paynet | container_network_receive_bytes_per_second | bytes_per_second | 28646.68914928579 | 50820.27440752921 | 48384.47696369673 |
| retail-transfer-low | orderer.paynet | container_network_receive_bytes_per_second | bytes_per_second | 41313.12518217673 | 73880.10034678671 | 72320.14298194693 |
| retail-transfer-low | couchdb0.himbara.paynet | container_network_receive_bytes_per_second | bytes_per_second | 26805.321416257335 | 47390.687151041864 | 46456.87792250033 |
| retail-transfer-low | couchdb0.bi.paynet | container_network_receive_bytes_per_second | bytes_per_second | 27915.078226303063 | 49377.984427469644 | 48175.74237509974 |
| retail-transfer-low | peer0.himbara.paynet | container_network_receive_bytes_per_second | bytes_per_second | 155142.7499526565 | 272633.3445277809 | 265849.84424925304 |
| retail-transfer-low | peer0.pjp.paynet | container_network_receive_bytes_per_second | bytes_per_second | 76971.65441554655 | 126297.93829296425 | 125366.5380584183 |
| retail-transfer-low | couchdb0.ojk.paynet | container_network_receive_bytes_per_second | bytes_per_second | 28677.907602007203 | 49206.914268937166 | 48677.66747750092 |
| retail-transfer-low | couchdb0.commercial.paynet | container_network_receive_bytes_per_second | bytes_per_second | 27495.439078221538 | 49618.39573775344 | 48113.19135426604 |
| retail-transfer-low | peer0.ojk.paynet | container_network_receive_bytes_per_second | bytes_per_second | 77508.93621429744 | 129627.47776014174 | 126315.06522000753 |
| retail-transfer-low | peer0.bi.paynet | container_network_receive_bytes_per_second | bytes_per_second | 77399.12619081653 | 128855.65688752153 | 126819.70019183813 |
| retail-transfer-low | peer0.commercial.paynet | container_network_receive_bytes_per_second | bytes_per_second | 75825.85536521324 | 129796.62525496016 | 127986.74827518707 |
| retail-transfer-low | dev-peer0.pjp.paynet-digital-rupiah_3.0-6577345e5a476eadebff5403f2756125454311a1ea7739a34dbea5999be18074 | container_network_receive_bytes_per_second | bytes_per_second | 13.389426045933526 | 28.751999375804626 | 27.193309990823593 |
| retail-transfer-low | dev-peer0.commercial.paynet-digital-rupiah_3.0-6577345e5a476eadebff5403f2756125454311a1ea7739a34dbea5999be18074 | container_network_receive_bytes_per_second | bytes_per_second | 11.09782108626 | 37.462947751866004 | 23.42323855418465 |
| retail-transfer-low | dev-peer0.bi.paynet-digital-rupiah_3.0-6577345e5a476eadebff5403f2756125454311a1ea7739a34dbea5999be18074 | container_network_receive_bytes_per_second | bytes_per_second | 532.7979950255781 | 1782.824091338211 | 1572.5830667694524 |
| retail-transfer-low | dev-peer0.himbara.paynet-digital-rupiah_3.0-6577345e5a476eadebff5403f2756125454311a1ea7739a34dbea5999be18074 | container_network_receive_bytes_per_second | bytes_per_second | 40507.191692980596 | 71237.07798028085 | 69020.6920620481 |
| retail-transfer-low | bi-coin-fabric-postgres | container_network_transmit_bytes_per_second | bytes_per_second | 0 | 0 | 0 |
| retail-transfer-low | bi-coin-fabric-cadvisor | container_network_transmit_bytes_per_second | bytes_per_second | 472454.6553602778 | 522178.95364749647 | 508978.652987072 |
| retail-transfer-low | bi-coin-fabric-node-exporter | container_network_transmit_bytes_per_second | bytes_per_second | 15569.526024700554 | 16707.69625637077 | 16558.19823467173 |
| retail-transfer-low | bi-coin-fabric-prometheus | container_network_transmit_bytes_per_second | bytes_per_second | 50185.67791425587 | 53772.33958325836 | 53002.042575331645 |
| retail-transfer-low | couchdb0.pjp.paynet | container_network_transmit_bytes_per_second | bytes_per_second | 32387.364950299587 | 56275.88164068412 | 54593.45789318351 |
| retail-transfer-low | orderer.paynet | container_network_transmit_bytes_per_second | bytes_per_second | 196182.98956234884 | 349698.9714455461 | 345445.13742399594 |
| retail-transfer-low | couchdb0.himbara.paynet | container_network_transmit_bytes_per_second | bytes_per_second | 13684.518557334957 | 23658.06642772024 | 22766.874591099422 |
| retail-transfer-low | couchdb0.bi.paynet | container_network_transmit_bytes_per_second | bytes_per_second | 32224.358478958697 | 54450.533230008485 | 54171.62072239867 |
| retail-transfer-low | peer0.himbara.paynet | container_network_transmit_bytes_per_second | bytes_per_second | 152693.2131701339 | 269954.9236911825 | 263018.86556602275 |
| retail-transfer-low | peer0.pjp.paynet | container_network_transmit_bytes_per_second | bytes_per_second | 33852.62280862625 | 54410.2869088812 | 53837.57153967681 |
| retail-transfer-low | couchdb0.ojk.paynet | container_network_transmit_bytes_per_second | bytes_per_second | 32447.534890808376 | 54439.73869641808 | 53852.29829894678 |
| retail-transfer-low | couchdb0.commercial.paynet | container_network_transmit_bytes_per_second | bytes_per_second | 31175.979536155086 | 54867.32277638005 | 53239.471251894756 |
| retail-transfer-low | peer0.ojk.paynet | container_network_transmit_bytes_per_second | bytes_per_second | 33965.16957550183 | 55618.083621133075 | 53821.410468581686 |
| retail-transfer-low | peer0.bi.paynet | container_network_transmit_bytes_per_second | bytes_per_second | 35056.28344454428 | 55803.8310808336 | 54717.30765795216 |
| retail-transfer-low | peer0.commercial.paynet | container_network_transmit_bytes_per_second | bytes_per_second | 33221.961905354714 | 55788.57778601893 | 54322.865676021924 |
| retail-transfer-low | dev-peer0.pjp.paynet-digital-rupiah_3.0-6577345e5a476eadebff5403f2756125454311a1ea7739a34dbea5999be18074 | container_network_transmit_bytes_per_second | bytes_per_second | 6.431506867982662 | 11.961927628194136 | 11.32663760572544 |
| retail-transfer-low | dev-peer0.commercial.paynet-digital-rupiah_3.0-6577345e5a476eadebff5403f2756125454311a1ea7739a34dbea5999be18074 | container_network_transmit_bytes_per_second | bytes_per_second | 5.31148908758318 | 11.135057471264366 | 11.135057471264366 |
| retail-transfer-low | dev-peer0.bi.paynet-digital-rupiah_3.0-6577345e5a476eadebff5403f2756125454311a1ea7739a34dbea5999be18074 | container_network_transmit_bytes_per_second | bytes_per_second | 121.6537526438883 | 402.24265072247135 | 354.99442472122763 |
| retail-transfer-low | dev-peer0.himbara.paynet-digital-rupiah_3.0-6577345e5a476eadebff5403f2756125454311a1ea7739a34dbea5999be18074 | container_network_transmit_bytes_per_second | bytes_per_second | 44080.913022813416 | 77708.54496564087 | 75330.98254887425 |
| retail-transfer-low | bi-coin-fabric-postgres | container_read_iops | operations_per_second | 0 | 0 | 0 |
| retail-transfer-low | bi-coin-fabric-cadvisor | container_read_iops | operations_per_second | 0 | 0 | 0 |
| retail-transfer-low | bi-coin-fabric-node-exporter | container_read_iops | operations_per_second | 0 | 0 | 0 |
| retail-transfer-low | bi-coin-fabric-prometheus | container_read_iops | operations_per_second | 0.11141093292050316 | 0.9903895532242682 | 0.9565121941966304 |
| retail-transfer-low | couchdb0.pjp.paynet | container_read_iops | operations_per_second | 0 | 0 | 0 |
| retail-transfer-low | orderer.paynet | container_read_iops | operations_per_second | 0 | 0 | 0 |
| retail-transfer-low | couchdb0.himbara.paynet | container_read_iops | operations_per_second | 0.028827834440165567 | 0.1066216567125422 | 0.10540019860744497 |
| retail-transfer-low | couchdb0.bi.paynet | container_read_iops | operations_per_second | 0 | 0 | 0 |
| retail-transfer-low | peer0.himbara.paynet | container_read_iops | operations_per_second | 0 | 0 | 0 |
| retail-transfer-low | peer0.pjp.paynet | container_read_iops | operations_per_second | 0 | 0 | 0 |
| retail-transfer-low | couchdb0.ojk.paynet | container_read_iops | operations_per_second | 0 | 0 | 0 |
| retail-transfer-low | couchdb0.commercial.paynet | container_read_iops | operations_per_second | 0 | 0 | 0 |
| retail-transfer-low | peer0.ojk.paynet | container_read_iops | operations_per_second | 0 | 0 | 0 |
| retail-transfer-low | peer0.bi.paynet | container_read_iops | operations_per_second | 0 | 0 | 0 |
| retail-transfer-low | peer0.commercial.paynet | container_read_iops | operations_per_second | 0 | 0 | 0 |
| retail-transfer-low | dev-peer0.bi.paynet-digital-rupiah_3.0-6577345e5a476eadebff5403f2756125454311a1ea7739a34dbea5999be18074 | container_read_iops | operations_per_second | 0 | 0 | 0 |
| retail-transfer-low | dev-peer0.pjp.paynet-digital-rupiah_3.0-6577345e5a476eadebff5403f2756125454311a1ea7739a34dbea5999be18074 | container_read_iops | operations_per_second | 0 | 0 | 0 |
| retail-transfer-low | dev-peer0.commercial.paynet-digital-rupiah_3.0-6577345e5a476eadebff5403f2756125454311a1ea7739a34dbea5999be18074 | container_read_iops | operations_per_second | 0 | 0 | 0 |
| retail-transfer-low | dev-peer0.himbara.paynet-digital-rupiah_3.0-6577345e5a476eadebff5403f2756125454311a1ea7739a34dbea5999be18074 | container_read_iops | operations_per_second | 0 | 0 | 0 |
| retail-transfer-low | bi-coin-fabric-postgres | container_write_iops | operations_per_second | 0 | 0 | 0 |
| retail-transfer-low | bi-coin-fabric-cadvisor | container_write_iops | operations_per_second | 0 | 0 | 0 |
| retail-transfer-low | bi-coin-fabric-node-exporter | container_write_iops | operations_per_second | 0 | 0 | 0 |
| retail-transfer-low | bi-coin-fabric-prometheus | container_write_iops | operations_per_second | 0.40545003319555256 | 2.0908223901401217 | 0.8675215222411997 |
| retail-transfer-low | couchdb0.pjp.paynet | container_write_iops | operations_per_second | 25.651340617579066 | 96.5717957440375 | 91.69695494423837 |
| retail-transfer-low | orderer.paynet | container_write_iops | operations_per_second | 5.361538621784162 | 18.85200806895287 | 17.17051036864489 |
| retail-transfer-low | couchdb0.himbara.paynet | container_write_iops | operations_per_second | 14.704653956541835 | 56.062090272021706 | 54.29186241966106 |
| retail-transfer-low | couchdb0.bi.paynet | container_write_iops | operations_per_second | 32.48199109028169 | 120.890069744271 | 117.98900602575729 |
| retail-transfer-low | peer0.himbara.paynet | container_write_iops | operations_per_second | 6.2946446440194785 | 22.075786722950898 | 20.69718474806214 |
| retail-transfer-low | peer0.pjp.paynet | container_write_iops | operations_per_second | 5.937899506274357 | 19.631569414475567 | 19.21594301180044 |
| retail-transfer-low | couchdb0.ojk.paynet | container_write_iops | operations_per_second | 10.3174321450236 | 34.49771961408299 | 33.92579972809152 |
| retail-transfer-low | couchdb0.commercial.paynet | container_write_iops | operations_per_second | 9.398989371929806 | 33.1138079029155 | 31.903592112544118 |
| retail-transfer-low | peer0.ojk.paynet | container_write_iops | operations_per_second | 6.18258757029593 | 20.92945996825514 | 19.68467182433797 |
| retail-transfer-low | peer0.bi.paynet | container_write_iops | operations_per_second | 6.104621296552917 | 20.636042402826856 | 19.616310499193307 |
| retail-transfer-low | peer0.commercial.paynet | container_write_iops | operations_per_second | 6.218169029261438 | 21.249768218060453 | 20.67171783626181 |
| retail-transfer-low | dev-peer0.bi.paynet-digital-rupiah_3.0-6577345e5a476eadebff5403f2756125454311a1ea7739a34dbea5999be18074 | container_write_iops | operations_per_second | 0 | 0 | 0 |
| retail-transfer-low | dev-peer0.pjp.paynet-digital-rupiah_3.0-6577345e5a476eadebff5403f2756125454311a1ea7739a34dbea5999be18074 | container_write_iops | operations_per_second | 0 | 0 | 0 |
| retail-transfer-low | dev-peer0.commercial.paynet-digital-rupiah_3.0-6577345e5a476eadebff5403f2756125454311a1ea7739a34dbea5999be18074 | container_write_iops | operations_per_second | 0 | 0 | 0 |
| retail-transfer-low | dev-peer0.himbara.paynet-digital-rupiah_3.0-6577345e5a476eadebff5403f2756125454311a1ea7739a34dbea5999be18074 | container_write_iops | operations_per_second | 0 | 0 | 0 |
| retail-transfer-low | bi-coin-fabric-postgres | container_read_bytes_per_second | bytes_per_second | 0 | 0 | 0 |
| retail-transfer-low | bi-coin-fabric-cadvisor | container_read_bytes_per_second | bytes_per_second | 0 | 0 | 0 |
| retail-transfer-low | bi-coin-fabric-node-exporter | container_read_bytes_per_second | bytes_per_second | 0 | 0 | 0 |
| retail-transfer-low | bi-coin-fabric-prometheus | container_read_bytes_per_second | bytes_per_second | 4494.868141228303 | 19982.686523365857 | 19490.694282577188 |
| retail-transfer-low | orderer.paynet | container_read_bytes_per_second | bytes_per_second | 0 | 0 | 0 |
| retail-transfer-low | couchdb0.bi.paynet | container_read_bytes_per_second | bytes_per_second | 0 | 0 | 0 |
| retail-transfer-low | peer0.himbara.paynet | container_read_bytes_per_second | bytes_per_second | 0 | 0 | 0 |
| retail-transfer-low | couchdb0.pjp.paynet | container_read_bytes_per_second | bytes_per_second | 0 | 0 | 0 |
| retail-transfer-low | couchdb0.commercial.paynet | container_read_bytes_per_second | bytes_per_second | 0 | 0 | 0 |
| retail-transfer-low | peer0.pjp.paynet | container_read_bytes_per_second | bytes_per_second | 0 | 0 | 0 |
| retail-transfer-low | couchdb0.ojk.paynet | container_read_bytes_per_second | bytes_per_second | 0 | 0 | 0 |
| retail-transfer-low | peer0.bi.paynet | container_read_bytes_per_second | bytes_per_second | 0 | 0 | 0 |
| retail-transfer-low | couchdb0.himbara.paynet | container_read_bytes_per_second | bytes_per_second | 944.7459329949434 | 1747.7401194494932 | 1741.7367146283095 |
| retail-transfer-low | peer0.commercial.paynet | container_read_bytes_per_second | bytes_per_second | 0 | 0 | 0 |
| retail-transfer-low | peer0.ojk.paynet | container_read_bytes_per_second | bytes_per_second | 0 | 0 | 0 |
| retail-transfer-low | dev-peer0.bi.paynet-digital-rupiah_3.0-6577345e5a476eadebff5403f2756125454311a1ea7739a34dbea5999be18074 | container_read_bytes_per_second | bytes_per_second | 0 | 0 | 0 |
| retail-transfer-low | bi-coin-fabric-postgres | container_write_bytes_per_second | bytes_per_second | 0 | 0 | 0 |
| retail-transfer-low | bi-coin-fabric-cadvisor | container_write_bytes_per_second | bytes_per_second | 0 | 0 | 0 |
| retail-transfer-low | bi-coin-fabric-node-exporter | container_write_bytes_per_second | bytes_per_second | 0 | 0 | 0 |
| retail-transfer-low | bi-coin-fabric-prometheus | container_write_bytes_per_second | bytes_per_second | 99047.77851198791 | 259624.67904042258 | 233409.6512299666 |
| retail-transfer-low | orderer.paynet | container_write_bytes_per_second | bytes_per_second | 145499.93158038703 | 257192.44452594907 | 246894.8057617205 |
| retail-transfer-low | couchdb0.bi.paynet | container_write_bytes_per_second | bytes_per_second | 987884.8550395798 | 1851127.7906933834 | 1828696.6572387358 |
| retail-transfer-low | peer0.himbara.paynet | container_write_bytes_per_second | bytes_per_second | 131524.35655065833 | 230907.90996934517 | 223793.75415623485 |
| retail-transfer-low | couchdb0.pjp.paynet | container_write_bytes_per_second | bytes_per_second | 765117.9966998593 | 1454662.8869486337 | 1407081.4506004094 |
| retail-transfer-low | couchdb0.commercial.paynet | container_write_bytes_per_second | bytes_per_second | 239139.81892733774 | 426148.88264022494 | 412954.6123588257 |
| retail-transfer-low | peer0.pjp.paynet | container_write_bytes_per_second | bytes_per_second | 124971.18545669432 | 206938.0446793859 | 204354.39318618376 |
| retail-transfer-low | couchdb0.ojk.paynet | container_write_bytes_per_second | bytes_per_second | 262496.40755403927 | 442851.4386376981 | 437936.77851688623 |
| retail-transfer-low | peer0.bi.paynet | container_write_bytes_per_second | bytes_per_second | 129259.17665271793 | 218984.02826855125 | 216103.12025154222 |
| retail-transfer-low | couchdb0.himbara.paynet | container_write_bytes_per_second | bytes_per_second | 404846.397456533 | 787656.6950493557 | 764922.2566584732 |
| retail-transfer-low | peer0.commercial.paynet | container_write_bytes_per_second | bytes_per_second | 132170.91250134358 | 225572.40867791587 | 222246.67638534427 |
| retail-transfer-low | peer0.ojk.paynet | container_write_bytes_per_second | bytes_per_second | 130729.16888273897 | 221801.77918866044 | 214733.5033306566 |
| retail-transfer-low | dev-peer0.bi.paynet-digital-rupiah_3.0-6577345e5a476eadebff5403f2756125454311a1ea7739a34dbea5999be18074 | container_write_bytes_per_second | bytes_per_second | 0 | 0 | 0 |
| retail-transfer-low | bi-coin-fabric-postgres | container_read_service_ms | milliseconds_per_operation | 0 | 0 | 0 |
| retail-transfer-low | bi-coin-fabric-cadvisor | container_read_service_ms | milliseconds_per_operation | 0 | 0 | 0 |
| retail-transfer-low | bi-coin-fabric-node-exporter | container_read_service_ms | milliseconds_per_operation | 0 | 0 | 0 |
| retail-transfer-low | bi-coin-fabric-prometheus | container_read_service_ms | milliseconds_per_operation | 0 | 0 | 0 |
| retail-transfer-low | couchdb0.pjp.paynet | container_read_service_ms | milliseconds_per_operation | 0 | 0 | 0 |
| retail-transfer-low | orderer.paynet | container_read_service_ms | milliseconds_per_operation | 0 | 0 | 0 |
| retail-transfer-low | couchdb0.himbara.paynet | container_read_service_ms | milliseconds_per_operation | 0 | 0 | 0 |
| retail-transfer-low | couchdb0.bi.paynet | container_read_service_ms | milliseconds_per_operation | 0 | 0 | 0 |
| retail-transfer-low | peer0.himbara.paynet | container_read_service_ms | milliseconds_per_operation | 0 | 0 | 0 |
| retail-transfer-low | peer0.pjp.paynet | container_read_service_ms | milliseconds_per_operation | 0 | 0 | 0 |
| retail-transfer-low | couchdb0.ojk.paynet | container_read_service_ms | milliseconds_per_operation | 0 | 0 | 0 |
| retail-transfer-low | couchdb0.commercial.paynet | container_read_service_ms | milliseconds_per_operation | 0 | 0 | 0 |
| retail-transfer-low | peer0.ojk.paynet | container_read_service_ms | milliseconds_per_operation | 0 | 0 | 0 |
| retail-transfer-low | peer0.bi.paynet | container_read_service_ms | milliseconds_per_operation | 0 | 0 | 0 |
| retail-transfer-low | peer0.commercial.paynet | container_read_service_ms | milliseconds_per_operation | 0 | 0 | 0 |
| retail-transfer-low | dev-peer0.pjp.paynet-digital-rupiah_3.0-6577345e5a476eadebff5403f2756125454311a1ea7739a34dbea5999be18074 | container_read_service_ms | milliseconds_per_operation | 0 | 0 | 0 |
| retail-transfer-low | dev-peer0.commercial.paynet-digital-rupiah_3.0-6577345e5a476eadebff5403f2756125454311a1ea7739a34dbea5999be18074 | container_read_service_ms | milliseconds_per_operation | 0 | 0 | 0 |
| retail-transfer-low | dev-peer0.bi.paynet-digital-rupiah_3.0-6577345e5a476eadebff5403f2756125454311a1ea7739a34dbea5999be18074 | container_read_service_ms | milliseconds_per_operation | 0 | 0 | 0 |
| retail-transfer-low | dev-peer0.himbara.paynet-digital-rupiah_3.0-6577345e5a476eadebff5403f2756125454311a1ea7739a34dbea5999be18074 | container_read_service_ms | milliseconds_per_operation | 0 | 0 | 0 |
| retail-transfer-low | bi-coin-fabric-postgres | container_write_service_ms | milliseconds_per_operation | 0 | 0 | 0 |
| retail-transfer-low | bi-coin-fabric-cadvisor | container_write_service_ms | milliseconds_per_operation | 0 | 0 | 0 |
| retail-transfer-low | bi-coin-fabric-node-exporter | container_write_service_ms | milliseconds_per_operation | 0 | 0 | 0 |
| retail-transfer-low | bi-coin-fabric-prometheus | container_write_service_ms | milliseconds_per_operation | 0 | 0 | 0 |
| retail-transfer-low | couchdb0.pjp.paynet | container_write_service_ms | milliseconds_per_operation | 0 | 0 | 0 |
| retail-transfer-low | orderer.paynet | container_write_service_ms | milliseconds_per_operation | 0 | 0 | 0 |
| retail-transfer-low | couchdb0.himbara.paynet | container_write_service_ms | milliseconds_per_operation | 0 | 0 | 0 |
| retail-transfer-low | couchdb0.bi.paynet | container_write_service_ms | milliseconds_per_operation | 0 | 0 | 0 |
| retail-transfer-low | peer0.himbara.paynet | container_write_service_ms | milliseconds_per_operation | 0 | 0 | 0 |
| retail-transfer-low | peer0.pjp.paynet | container_write_service_ms | milliseconds_per_operation | 0 | 0 | 0 |
| retail-transfer-low | couchdb0.ojk.paynet | container_write_service_ms | milliseconds_per_operation | 0 | 0 | 0 |
| retail-transfer-low | couchdb0.commercial.paynet | container_write_service_ms | milliseconds_per_operation | 0 | 0 | 0 |
| retail-transfer-low | peer0.ojk.paynet | container_write_service_ms | milliseconds_per_operation | 0 | 0 | 0 |
| retail-transfer-low | peer0.bi.paynet | container_write_service_ms | milliseconds_per_operation | 0 | 0 | 0 |
| retail-transfer-low | peer0.commercial.paynet | container_write_service_ms | milliseconds_per_operation | 0 | 0 | 0 |
| retail-transfer-low | dev-peer0.pjp.paynet-digital-rupiah_3.0-6577345e5a476eadebff5403f2756125454311a1ea7739a34dbea5999be18074 | container_write_service_ms | milliseconds_per_operation | 0 | 0 | 0 |
| retail-transfer-low | dev-peer0.commercial.paynet-digital-rupiah_3.0-6577345e5a476eadebff5403f2756125454311a1ea7739a34dbea5999be18074 | container_write_service_ms | milliseconds_per_operation | 0 | 0 | 0 |
| retail-transfer-low | dev-peer0.bi.paynet-digital-rupiah_3.0-6577345e5a476eadebff5403f2756125454311a1ea7739a34dbea5999be18074 | container_write_service_ms | milliseconds_per_operation | 0 | 0 | 0 |
| retail-transfer-low | dev-peer0.himbara.paynet-digital-rupiah_3.0-6577345e5a476eadebff5403f2756125454311a1ea7739a34dbea5999be18074 | container_write_service_ms | milliseconds_per_operation | 0 | 0 | 0 |
| retail-transfer-low | node-exporter:9100 | host_cpu_busy_percent | % | 32.67940339851248 | 40.906618303561885 | 39.00948275861899 |
| retail-transfer-low | node-exporter:9100 | host_memory_used_bytes | bytes | 6032436295.44186 | 6377521152 | 6163344179.2 |
| retail-transfer-low | node-exporter:9100 | host_read_iops | operations_per_second | 0.3252542120135944 | 1.3448275862068966 | 1.3186576354679802 |
| retail-transfer-low | node-exporter:9100 | host_write_iops | operations_per_second | 291.3957240634666 | 935.2413793103448 | 871.4741379310345 |
| retail-transfer-low | node-exporter:9100 | host_read_await_ms | milliseconds_per_operation | 0.7827820803000216 | 2.384615384611467 | 2.2467105263187572 |
| retail-transfer-low | node-exporter:9100 | host_write_await_ms | milliseconds_per_operation | 4.610951683724486 | 14.34717629943217 | 12.596897363621888 |
| retail-transfer-low | /peer0.bi.paynet | caliper_client_cpu_avg | percent | 0.035 | 0.035 |  |
| retail-transfer-low | /peer0.bi.paynet | caliper_client_cpu_max | percent | 0.17125 | 0.17125 |  |
| retail-transfer-low | /peer0.bi.paynet | caliper_client_memory_avg | bytes | 107 | 107 |  |
| retail-transfer-low | /peer0.bi.paynet | caliper_client_memory_max | bytes | 108 | 108 |  |
| retail-transfer-low | /peer0.ojk.paynet | caliper_client_cpu_avg | percent | 0.0375 | 0.0375 |  |
| retail-transfer-low | /peer0.ojk.paynet | caliper_client_cpu_max | percent | 0.17875 | 0.17875 |  |
| retail-transfer-low | /peer0.ojk.paynet | caliper_client_memory_avg | bytes | 103 | 103 |  |
| retail-transfer-low | /peer0.ojk.paynet | caliper_client_memory_max | bytes | 110 | 110 |  |
| retail-transfer-low | /peer0.pjp.paynet | caliper_client_cpu_avg | percent | 0.0375 | 0.0375 |  |
| retail-transfer-low | /peer0.pjp.paynet | caliper_client_cpu_max | percent | 0.18125 | 0.18125 |  |
| retail-transfer-low | /peer0.pjp.paynet | caliper_client_memory_avg | bytes | 108 | 108 |  |
| retail-transfer-low | /peer0.pjp.paynet | caliper_client_memory_max | bytes | 112 | 112 |  |
| retail-transfer-low | /peer0.commercial.paynet | caliper_client_cpu_avg | percent | 0.03625 | 0.03625 |  |
| retail-transfer-low | /peer0.commercial.paynet | caliper_client_cpu_max | percent | 0.18375 | 0.18375 |  |
| retail-transfer-low | /peer0.commercial.paynet | caliper_client_memory_avg | bytes | 116 | 116 |  |
| retail-transfer-low | /peer0.commercial.paynet | caliper_client_memory_max | bytes | 116 | 116 |  |
| retail-transfer-low | /peer0.himbara.paynet | caliper_client_cpu_avg | percent | 0.07875 | 0.07875 |  |
| retail-transfer-low | /peer0.himbara.paynet | caliper_client_cpu_max | percent | 0.52625 | 0.52625 |  |
| retail-transfer-low | /peer0.himbara.paynet | caliper_client_memory_avg | bytes | 111 | 111 |  |
| retail-transfer-low | /peer0.himbara.paynet | caliper_client_memory_max | bytes | 113 | 113 |  |
| retail-transfer-low | /couchdb0.ojk.paynet | caliper_client_cpu_avg | percent | 0.1725 | 0.1725 |  |
| retail-transfer-low | /couchdb0.ojk.paynet | caliper_client_cpu_max | percent | 1.48125 | 1.48125 |  |
| retail-transfer-low | /couchdb0.ojk.paynet | caliper_client_memory_avg | bytes | 52.5 | 52.5 |  |
| retail-transfer-low | /couchdb0.ojk.paynet | caliper_client_memory_max | bytes | 57 | 57 |  |
| retail-transfer-low | /couchdb0.commercial.paynet | caliper_client_cpu_avg | percent | 0.17625 | 0.17625 |  |
| retail-transfer-low | /couchdb0.commercial.paynet | caliper_client_cpu_max | percent | 1.5175 | 1.5175 |  |
| retail-transfer-low | /couchdb0.commercial.paynet | caliper_client_memory_avg | bytes | 52.7 | 52.7 |  |
| retail-transfer-low | /couchdb0.commercial.paynet | caliper_client_memory_max | bytes | 55.2 | 55.2 |  |
| retail-transfer-low | /couchdb0.himbara.paynet | caliper_client_cpu_avg | percent | 0.16 | 0.16 |  |
| retail-transfer-low | /couchdb0.himbara.paynet | caliper_client_cpu_max | percent | 1.17875 | 1.17875 |  |
| retail-transfer-low | /couchdb0.himbara.paynet | caliper_client_memory_avg | bytes | 53.8 | 53.8 |  |
| retail-transfer-low | /couchdb0.himbara.paynet | caliper_client_memory_max | bytes | 56.6 | 56.6 |  |
| retail-transfer-low | /couchdb0.bi.paynet | caliper_client_cpu_avg | percent | 0.1725 | 0.1725 |  |
| retail-transfer-low | /couchdb0.bi.paynet | caliper_client_cpu_max | percent | 1.3125 | 1.3125 |  |
| retail-transfer-low | /couchdb0.bi.paynet | caliper_client_memory_avg | bytes | 54.4 | 54.4 |  |
| retail-transfer-low | /couchdb0.bi.paynet | caliper_client_memory_max | bytes | 56.8 | 56.8 |  |
| retail-transfer-low | /couchdb0.pjp.paynet | caliper_client_cpu_avg | percent | 0.18125 | 0.18125 |  |
| retail-transfer-low | /couchdb0.pjp.paynet | caliper_client_cpu_max | percent | 1.63875 | 1.63875 |  |
| retail-transfer-low | /couchdb0.pjp.paynet | caliper_client_memory_avg | bytes | 52.3 | 52.3 |  |
| retail-transfer-low | /couchdb0.pjp.paynet | caliper_client_memory_max | bytes | 54.4 | 54.4 |  |
| retail-transfer-low | /orderer.paynet | caliper_client_cpu_avg | percent | 0.01125 | 0.01125 |  |
| retail-transfer-low | /orderer.paynet | caliper_client_cpu_max | percent | 0.10875 | 0.10875 |  |
| retail-transfer-low | /orderer.paynet | caliper_client_memory_avg | bytes | 44.6 | 44.6 |  |
| retail-transfer-low | /orderer.paynet | caliper_client_memory_max | bytes | 46.8 | 46.8 |  |
| retail-transfer-low | node caliper(sum) | caliper_client_cpu_avg | percent | 16.42 | 16.42 |  |
| retail-transfer-low | node caliper(sum) | caliper_client_cpu_max | percent | 64.52 | 64.52 |  |
| retail-transfer-low | bi-coin-fabric-postgres | container_cpu_percent | % | 0.8802970697762409 | 1.0359700657434483 | 0.9978659386328834 |
| retail-transfer-low | bi-coin-fabric-cadvisor | container_cpu_percent | % | 86.70138060851156 | 91.49965191264795 | 90.3191753723652 |
| retail-transfer-low | bi-coin-fabric-node-exporter | container_cpu_percent | % | 2.7040240622321963 | 2.8836244078342754 | 2.8500687217720495 |
| retail-transfer-low | bi-coin-fabric-prometheus | container_cpu_percent | % | 10.899568275184416 | 11.447089665922668 | 11.381186861904 |
| retail-transfer-low | couchdb0.bi.paynet | container_cpu_percent | % | 13.763710215007334 | 23.42475028538812 | 22.81229194374029 |
| retail-transfer-low | couchdb0.pjp.paynet | container_cpu_percent | % | 13.10247050228047 | 23.015056443858843 | 21.802103429408977 |
| retail-transfer-low | orderer.paynet | container_cpu_percent | % | 0.8747507457335917 | 1.5810030119388907 | 1.505809274145347 |
| retail-transfer-low | couchdb0.himbara.paynet | container_cpu_percent | % | 13.04242216583584 | 22.399370682483994 | 21.798386745547536 |
| retail-transfer-low | couchdb0.commercial.paynet | container_cpu_percent | % | 13.361241505889996 | 23.475519687832563 | 22.23448713723716 |
| retail-transfer-low | couchdb0.ojk.paynet | container_cpu_percent | % | 13.633737461539807 | 24.443502120229486 | 23.080675880043135 |
| retail-transfer-low | peer0.himbara.paynet | container_cpu_percent | % | 6.834091461266226 | 11.702959042307558 | 11.280843386838905 |
| retail-transfer-low | peer0.commercial.paynet | container_cpu_percent | % | 2.620366058856556 | 3.7990052832938606 | 3.6195219177069182 |
| retail-transfer-low | peer0.ojk.paynet | container_cpu_percent | % | 2.6091601644329296 | 3.807307692307693 | 3.681159116681911 |
| retail-transfer-low | peer0.pjp.paynet | container_cpu_percent | % | 2.683126878046236 | 3.9306020611101062 | 3.7099001815590817 |
| retail-transfer-low | peer0.bi.paynet | container_cpu_percent | % | 2.7846634485459743 | 3.95863378944036 | 3.8109550866632627 |
| retail-transfer-low | dev-peer0.pjp.paynet-digital-rupiah_3.0-6577345e5a476eadebff5403f2756125454311a1ea7739a34dbea5999be18074 | container_cpu_percent | % | 0.0006155429145245107 | 0.0009320578857002942 | 0.0009289491889865734 |
| retail-transfer-low | dev-peer0.himbara.paynet-digital-rupiah_3.0-6577345e5a476eadebff5403f2756125454311a1ea7739a34dbea5999be18074 | container_cpu_percent | % | 1.981511747145987 | 3.6998593327321907 | 3.46972665206849 |
| retail-transfer-low | dev-peer0.bi.paynet-digital-rupiah_3.0-6577345e5a476eadebff5403f2756125454311a1ea7739a34dbea5999be18074 | container_cpu_percent | % | 0.01974851091302089 | 0.030686081461873335 | 0.03035885662610548 |
| retail-transfer-low | dev-peer0.commercial.paynet-digital-rupiah_3.0-6577345e5a476eadebff5403f2756125454311a1ea7739a34dbea5999be18074 | container_cpu_percent | % | 0.0004717616103971374 | 0.001057243929892207 | 0.0010134662795607547 |
| retail-transfer-low | bi-coin-fabric-postgres | container_memory_working_set_bytes | bytes | 14578210.133333333 | 14630912 | 14589952 |
| retail-transfer-low | bi-coin-fabric-cadvisor | container_memory_working_set_bytes | bytes | 154956322.13333333 | 174268416 | 172010496 |
| retail-transfer-low | bi-coin-fabric-node-exporter | container_memory_working_set_bytes | bytes | 13251925.333333334 | 14372864 | 14356275.2 |
| retail-transfer-low | bi-coin-fabric-prometheus | container_memory_working_set_bytes | bytes | 421072759.46666664 | 442007552 | 438566502.4 |
| retail-transfer-low | couchdb0.pjp.paynet | container_memory_working_set_bytes | bytes | 53089143.46666667 | 59371520 | 57970688 |
| retail-transfer-low | orderer.paynet | container_memory_working_set_bytes | bytes | 46846976 | 48320512 | 48320512 |
| retail-transfer-low | couchdb0.himbara.paynet | container_memory_working_set_bytes | bytes | 54420821.333333336 | 62881792 | 61241753.6 |
| retail-transfer-low | couchdb0.bi.paynet | container_memory_working_set_bytes | bytes | 57206579.2 | 61005824 | 60497920 |
| retail-transfer-low | peer0.himbara.paynet | container_memory_working_set_bytes | bytes | 118889745.06666666 | 122847232 | 122781696 |
| retail-transfer-low | peer0.pjp.paynet | container_memory_working_set_bytes | bytes | 112601292.8 | 115257344 | 115257344 |
| retail-transfer-low | couchdb0.ojk.paynet | container_memory_working_set_bytes | bytes | 57861802.666666664 | 61550592 | 60902809.6 |
| retail-transfer-low | couchdb0.commercial.paynet | container_memory_working_set_bytes | bytes | 56658602.666666664 | 59760640 | 58719232 |
| retail-transfer-low | peer0.ojk.paynet | container_memory_working_set_bytes | bytes | 115551914.66666667 | 116535296 | 116393779.2 |
| retail-transfer-low | peer0.bi.paynet | container_memory_working_set_bytes | bytes | 109984768 | 113188864 | 113188864 |
| retail-transfer-low | peer0.commercial.paynet | container_memory_working_set_bytes | bytes | 116292812.8 | 120750080 | 120750080 |
| retail-transfer-low | dev-peer0.pjp.paynet-digital-rupiah_3.0-6577345e5a476eadebff5403f2756125454311a1ea7739a34dbea5999be18074 | container_memory_working_set_bytes | bytes | 17272832 | 17354752 | 17354752 |
| retail-transfer-low | dev-peer0.commercial.paynet-digital-rupiah_3.0-6577345e5a476eadebff5403f2756125454311a1ea7739a34dbea5999be18074 | container_memory_working_set_bytes | bytes | 18495488 | 18812928 | 18812928 |
| retail-transfer-low | dev-peer0.bi.paynet-digital-rupiah_3.0-6577345e5a476eadebff5403f2756125454311a1ea7739a34dbea5999be18074 | container_memory_working_set_bytes | bytes | 19460096 | 19779584 | 19779584 |
| retail-transfer-low | dev-peer0.himbara.paynet-digital-rupiah_3.0-6577345e5a476eadebff5403f2756125454311a1ea7739a34dbea5999be18074 | container_memory_working_set_bytes | bytes | 26409233.066666666 | 27275264 | 27037696 |
| retail-transfer-low | bi-coin-fabric-postgres | container_network_receive_bytes_per_second | bytes_per_second | 0 | 0 | 0 |
| retail-transfer-low | bi-coin-fabric-cadvisor | container_network_receive_bytes_per_second | bytes_per_second | 7863.857198490223 | 8313.315257218233 | 8213.182616001424 |
| retail-transfer-low | bi-coin-fabric-node-exporter | container_network_receive_bytes_per_second | bytes_per_second | 672.7615069751633 | 716.1764184082602 | 709.2454002094344 |
| retail-transfer-low | bi-coin-fabric-prometheus | container_network_receive_bytes_per_second | bytes_per_second | 519165.0189656175 | 549079.4274984944 | 543409.0543998688 |
| retail-transfer-low | couchdb0.bi.paynet | container_network_receive_bytes_per_second | bytes_per_second | 33417.92093975376 | 63490.8319063927 | 61236.76716914123 |
| retail-transfer-low | couchdb0.pjp.paynet | container_network_receive_bytes_per_second | bytes_per_second | 33467.02361329447 | 63462.19863964958 | 60216.93003343597 |
| retail-transfer-low | orderer.paynet | container_network_receive_bytes_per_second | bytes_per_second | 50107.766850661035 | 95258.01066879558 | 89792.5255829757 |
| retail-transfer-low | couchdb0.himbara.paynet | container_network_receive_bytes_per_second | bytes_per_second | 32279.21972567658 | 59771.492639878474 | 58093.19087695551 |
| retail-transfer-low | couchdb0.commercial.paynet | container_network_receive_bytes_per_second | bytes_per_second | 33415.64478351456 | 63322.91592763391 | 60352.41988955561 |
| retail-transfer-low | couchdb0.ojk.paynet | container_network_receive_bytes_per_second | bytes_per_second | 33421.72357857706 | 63516.97965292377 | 60340.52882110477 |
| retail-transfer-low | peer0.himbara.paynet | container_network_receive_bytes_per_second | bytes_per_second | 199960.43574920532 | 372087.74111044017 | 351521.98043638765 |
| retail-transfer-low | peer0.commercial.paynet | container_network_receive_bytes_per_second | bytes_per_second | 89780.52438817726 | 161476.5895427218 | 153742.0489544391 |
| retail-transfer-low | peer0.ojk.paynet | container_network_receive_bytes_per_second | bytes_per_second | 90726.54291983905 | 164832.5363825364 | 161688.8999702547 |
| retail-transfer-low | peer0.pjp.paynet | container_network_receive_bytes_per_second | bytes_per_second | 89516.75441566792 | 166064.328331224 | 156464.96071123067 |
| retail-transfer-low | peer0.bi.paynet | container_network_receive_bytes_per_second | bytes_per_second | 93357.81472630575 | 167403.5667804003 | 161152.09682981286 |
| retail-transfer-low | dev-peer0.pjp.paynet-digital-rupiah_3.0-6577345e5a476eadebff5403f2756125454311a1ea7739a34dbea5999be18074 | container_network_receive_bytes_per_second | bytes_per_second | 6.693019434337922 | 8.70738287956831 | 8.553322956251554 |
| retail-transfer-low | dev-peer0.himbara.paynet-digital-rupiah_3.0-6577345e5a476eadebff5403f2756125454311a1ea7739a34dbea5999be18074 | container_network_receive_bytes_per_second | bytes_per_second | 56934.654855693436 | 107003.93146979263 | 100254.58563370064 |
| retail-transfer-low | dev-peer0.bi.paynet-digital-rupiah_3.0-6577345e5a476eadebff5403f2756125454311a1ea7739a34dbea5999be18074 | container_network_receive_bytes_per_second | bytes_per_second | 1534.8922127664555 | 2375.7002662004843 | 2351.807116415326 |
| retail-transfer-low | dev-peer0.commercial.paynet-digital-rupiah_3.0-6577345e5a476eadebff5403f2756125454311a1ea7739a34dbea5999be18074 | container_network_receive_bytes_per_second | bytes_per_second | 7.131268502484887 | 9.980430528375733 | 9.037886946710612 |
| retail-transfer-low | bi-coin-fabric-postgres | container_network_transmit_bytes_per_second | bytes_per_second | 0 | 0 | 0 |
| retail-transfer-low | bi-coin-fabric-cadvisor | container_network_transmit_bytes_per_second | bytes_per_second | 499014.2885039607 | 527771.6913381211 | 522165.63671253296 |
| retail-transfer-low | bi-coin-fabric-node-exporter | container_network_transmit_bytes_per_second | bytes_per_second | 15711.046041549967 | 16753.9296739169 | 16511.484320647607 |
| retail-transfer-low | bi-coin-fabric-prometheus | container_network_transmit_bytes_per_second | bytes_per_second | 50728.00564986299 | 53423.5482721767 | 53281.259647088074 |
| retail-transfer-low | couchdb0.bi.paynet | container_network_transmit_bytes_per_second | bytes_per_second | 40305.779199968136 | 69614.4763127854 | 67171.49870883809 |
| retail-transfer-low | couchdb0.pjp.paynet | container_network_transmit_bytes_per_second | bytes_per_second | 38584.68775724512 | 69814.60774188954 | 66245.56404781928 |
| retail-transfer-low | orderer.paynet | container_network_transmit_bytes_per_second | bytes_per_second | 231250.4013751779 | 436956.27245346014 | 414981.3310636753 |
| retail-transfer-low | couchdb0.himbara.paynet | container_network_transmit_bytes_per_second | bytes_per_second | 17414.3232875357 | 28396.54237042931 | 27723.24940647807 |
| retail-transfer-low | couchdb0.commercial.paynet | container_network_transmit_bytes_per_second | bytes_per_second | 38626.7559476552 | 70079.38985455835 | 66545.17294734232 |
| retail-transfer-low | couchdb0.ojk.paynet | container_network_transmit_bytes_per_second | bytes_per_second | 38811.13269664081 | 69864.16277660978 | 66388.50119474245 |
| retail-transfer-low | peer0.himbara.paynet | container_network_transmit_bytes_per_second | bytes_per_second | 195566.97829382858 | 364847.1812724237 | 346085.7994885921 |
| retail-transfer-low | peer0.commercial.paynet | container_network_transmit_bytes_per_second | bytes_per_second | 38737.5830176646 | 69306.68609947167 | 65925.17915514157 |
| retail-transfer-low | peer0.ojk.paynet | container_network_transmit_bytes_per_second | bytes_per_second | 38989.54528036319 | 70467.04781704783 | 68542.04015803082 |
| retail-transfer-low | peer0.pjp.paynet | container_network_transmit_bytes_per_second | bytes_per_second | 38693.46777716959 | 71007.41276441872 | 66942.54026117262 |
| retail-transfer-low | peer0.bi.paynet | container_network_transmit_bytes_per_second | bytes_per_second | 41647.04854750624 | 71727.17999226142 | 68972.4067298152 |
| retail-transfer-low | dev-peer0.pjp.paynet-digital-rupiah_3.0-6577345e5a476eadebff5403f2756125454311a1ea7739a34dbea5999be18074 | container_network_transmit_bytes_per_second | bytes_per_second | 8.444418649991555 | 11.405445180279616 | 11.203648379315418 |
| retail-transfer-low | dev-peer0.himbara.paynet-digital-rupiah_3.0-6577345e5a476eadebff5403f2756125454311a1ea7739a34dbea5999be18074 | container_network_transmit_bytes_per_second | bytes_per_second | 61234.042439225705 | 115210.31559963932 | 107973.95663844909 |
| retail-transfer-low | dev-peer0.bi.paynet-digital-rupiah_3.0-6577345e5a476eadebff5403f2756125454311a1ea7739a34dbea5999be18074 | container_network_transmit_bytes_per_second | bytes_per_second | 228.62251013773883 | 345.9017044777305 | 340.2134433707721 |
| retail-transfer-low | dev-peer0.commercial.paynet-digital-rupiah_3.0-6577345e5a476eadebff5403f2756125454311a1ea7739a34dbea5999be18074 | container_network_transmit_bytes_per_second | bytes_per_second | 8.958674579175863 | 12.563600782778867 | 11.574401054511052 |
| retail-transfer-low | bi-coin-fabric-postgres | container_read_iops | operations_per_second | 0 | 0 | 0 |
| retail-transfer-low | bi-coin-fabric-cadvisor | container_read_iops | operations_per_second | 0 | 0 | 0 |
| retail-transfer-low | bi-coin-fabric-node-exporter | container_read_iops | operations_per_second | 0 | 0 | 0 |
| retail-transfer-low | bi-coin-fabric-prometheus | container_read_iops | operations_per_second | 0 | 0 | 0 |
| retail-transfer-low | couchdb0.bi.paynet | container_read_iops | operations_per_second | 0.0832190268379898 | 0.3200277354744188 | 0.21784257710899108 |
| retail-transfer-low | couchdb0.pjp.paynet | container_read_iops | operations_per_second | 0.08170904597774872 | 0.29548644455935585 | 0.22045534266435643 |
| retail-transfer-low | orderer.paynet | container_read_iops | operations_per_second | 0 | 0 | 0 |
| retail-transfer-low | couchdb0.himbara.paynet | container_read_iops | operations_per_second | 0.08628774312091146 | 0.32616029983229483 | 0.28410831788641017 |
| retail-transfer-low | couchdb0.commercial.paynet | container_read_iops | operations_per_second | 0.0986378167038499 | 0.2815874738013283 | 0.25509608393555294 |
| retail-transfer-low | couchdb0.ojk.paynet | container_read_iops | operations_per_second | 0.11990430002438757 | 0.36021378400412396 | 0.2939998624220631 |
| retail-transfer-low | peer0.himbara.paynet | container_read_iops | operations_per_second | 0 | 0 | 0 |
| retail-transfer-low | peer0.commercial.paynet | container_read_iops | operations_per_second | 0 | 0 | 0 |
| retail-transfer-low | peer0.ojk.paynet | container_read_iops | operations_per_second | 0 | 0 | 0 |
| retail-transfer-low | peer0.pjp.paynet | container_read_iops | operations_per_second | 0 | 0 | 0 |
| retail-transfer-low | peer0.bi.paynet | container_read_iops | operations_per_second | 0 | 0 | 0 |
| retail-transfer-low | dev-peer0.pjp.paynet-digital-rupiah_3.0-6577345e5a476eadebff5403f2756125454311a1ea7739a34dbea5999be18074 | container_read_iops | operations_per_second | 0 | 0 | 0 |
| retail-transfer-low | dev-peer0.himbara.paynet-digital-rupiah_3.0-6577345e5a476eadebff5403f2756125454311a1ea7739a34dbea5999be18074 | container_read_iops | operations_per_second | 0 | 0 | 0 |
| retail-transfer-low | dev-peer0.bi.paynet-digital-rupiah_3.0-6577345e5a476eadebff5403f2756125454311a1ea7739a34dbea5999be18074 | container_read_iops | operations_per_second | 0 | 0 | 0 |
| retail-transfer-low | dev-peer0.commercial.paynet-digital-rupiah_3.0-6577345e5a476eadebff5403f2756125454311a1ea7739a34dbea5999be18074 | container_read_iops | operations_per_second | 0 | 0 | 0 |
| retail-transfer-low | bi-coin-fabric-postgres | container_write_iops | operations_per_second | 0 | 0 | 0 |
| retail-transfer-low | bi-coin-fabric-cadvisor | container_write_iops | operations_per_second | 0 | 0 | 0 |
| retail-transfer-low | bi-coin-fabric-node-exporter | container_write_iops | operations_per_second | 0 | 0 | 0 |
| retail-transfer-low | bi-coin-fabric-prometheus | container_write_iops | operations_per_second | 0.563782628551155 | 2.1867483052700636 | 2.1331821023845854 |
| retail-transfer-low | couchdb0.bi.paynet | container_write_iops | operations_per_second | 49.104547785458074 | 125.64605703242471 | 124.32731568219904 |
| retail-transfer-low | couchdb0.pjp.paynet | container_write_iops | operations_per_second | 11.03552051277948 | 39.136782878102636 | 36.827496005263 |
| retail-transfer-low | orderer.paynet | container_write_iops | operations_per_second | 6.306427960444102 | 21.555321696846537 | 19.690458138190532 |
| retail-transfer-low | couchdb0.himbara.paynet | container_write_iops | operations_per_second | 21.339774875322227 | 128.57607870085718 | 123.16657002846505 |
| retail-transfer-low | couchdb0.commercial.paynet | container_write_iops | operations_per_second | 11.584547379222675 | 42.85207520397304 | 37.6730559152562 |
| retail-transfer-low | couchdb0.ojk.paynet | container_write_iops | operations_per_second | 11.402119918797784 | 41.086127641378326 | 37.24389437749277 |
| retail-transfer-low | peer0.himbara.paynet | container_write_iops | operations_per_second | 7.86973262511836 | 27.281446485027175 | 24.76036427697434 |
| retail-transfer-low | peer0.commercial.paynet | container_write_iops | operations_per_second | 7.670236015706633 | 27.035889961741663 | 25.10410466222345 |
| retail-transfer-low | peer0.ojk.paynet | container_write_iops | operations_per_second | 6.7025531801452365 | 24.65075154730327 | 22.2499355615565 |
| retail-transfer-low | peer0.pjp.paynet | container_write_iops | operations_per_second | 7.38739731942265 | 27.734586873983005 | 25.43536172766552 |
| retail-transfer-low | peer0.bi.paynet | container_write_iops | operations_per_second | 7.6113301704739085 | 27.647824404657214 | 23.987996224858577 |
| retail-transfer-low | dev-peer0.pjp.paynet-digital-rupiah_3.0-6577345e5a476eadebff5403f2756125454311a1ea7739a34dbea5999be18074 | container_write_iops | operations_per_second | 0 | 0 | 0 |
| retail-transfer-low | dev-peer0.himbara.paynet-digital-rupiah_3.0-6577345e5a476eadebff5403f2756125454311a1ea7739a34dbea5999be18074 | container_write_iops | operations_per_second | 0 | 0 | 0 |
| retail-transfer-low | dev-peer0.bi.paynet-digital-rupiah_3.0-6577345e5a476eadebff5403f2756125454311a1ea7739a34dbea5999be18074 | container_write_iops | operations_per_second | 0 | 0 | 0 |
| retail-transfer-low | dev-peer0.commercial.paynet-digital-rupiah_3.0-6577345e5a476eadebff5403f2756125454311a1ea7739a34dbea5999be18074 | container_write_iops | operations_per_second | 0 | 0 | 0 |
| retail-transfer-low | bi-coin-fabric-postgres | container_read_bytes_per_second | bytes_per_second | 0 | 0 | 0 |
| retail-transfer-low | bi-coin-fabric-cadvisor | container_read_bytes_per_second | bytes_per_second | 0 | 0 | 0 |
| retail-transfer-low | bi-coin-fabric-node-exporter | container_read_bytes_per_second | bytes_per_second | 0 | 0 | 0 |
| retail-transfer-low | bi-coin-fabric-prometheus | container_read_bytes_per_second | bytes_per_second | 0 | 0 | 0 |
| retail-transfer-low | orderer.paynet | container_read_bytes_per_second | bytes_per_second | 0 | 0 | 0 |
| retail-transfer-low | couchdb0.himbara.paynet | container_read_bytes_per_second | bytes_per_second | 1054.7250383679032 | 1780.765819842615 | 1748.14104733939 |
| retail-transfer-low | couchdb0.bi.paynet | container_read_bytes_per_second | bytes_per_second | 680.576591465532 | 1310.4545938234955 | 1115.5158920323647 |
| retail-transfer-low | couchdb0.pjp.paynet | container_read_bytes_per_second | bytes_per_second | 670.1204991804836 | 1210.3124769151216 | 1144.0828246925466 |
| retail-transfer-low | couchdb0.commercial.paynet | container_read_bytes_per_second | bytes_per_second | 1216.3062487870784 | 2820.7017877731914 | 2786.246976741603 |
| retail-transfer-low | peer0.himbara.paynet | container_read_bytes_per_second | bytes_per_second | 0 | 0 | 0 |
| retail-transfer-low | peer0.commercial.paynet | container_read_bytes_per_second | bytes_per_second | 0 | 0 | 0 |
| retail-transfer-low | couchdb0.ojk.paynet | container_read_bytes_per_second | bytes_per_second | 1883.913431487341 | 2856.765288892152 | 2817.369975702184 |
| retail-transfer-low | peer0.bi.paynet | container_read_bytes_per_second | bytes_per_second | 0 | 0 | 0 |
| retail-transfer-low | peer0.ojk.paynet | container_read_bytes_per_second | bytes_per_second | 0 | 0 | 0 |
| retail-transfer-low | peer0.pjp.paynet | container_read_bytes_per_second | bytes_per_second | 0 | 0 | 0 |
| retail-transfer-low | dev-peer0.commercial.paynet-digital-rupiah_3.0-6577345e5a476eadebff5403f2756125454311a1ea7739a34dbea5999be18074 | container_read_bytes_per_second | bytes_per_second | 0 | 0 | 0 |
| retail-transfer-low | bi-coin-fabric-postgres | container_write_bytes_per_second | bytes_per_second | 0 | 0 | 0 |
| retail-transfer-low | bi-coin-fabric-cadvisor | container_write_bytes_per_second | bytes_per_second | 0 | 0 | 0 |
| retail-transfer-low | bi-coin-fabric-node-exporter | container_write_bytes_per_second | bytes_per_second | 0 | 0 | 0 |
| retail-transfer-low | bi-coin-fabric-prometheus | container_write_bytes_per_second | bytes_per_second | 136140.24257057795 | 275276.04052773525 | 271889.8229630199 |
| retail-transfer-low | orderer.paynet | container_write_bytes_per_second | bytes_per_second | 173844.78317239333 | 316069.99239213124 | 300115.3728683577 |
| retail-transfer-low | couchdb0.himbara.paynet | container_write_bytes_per_second | bytes_per_second | 610532.5267003067 | 1951484.97233173 | 1885840.1610792272 |
| retail-transfer-low | couchdb0.bi.paynet | container_write_bytes_per_second | bytes_per_second | 1522460.8660748643 | 2003322.1684337691 | 1990399.3305280057 |
| retail-transfer-low | couchdb0.pjp.paynet | container_write_bytes_per_second | bytes_per_second | 277717.8500237008 | 502208.8956945978 | 487226.61930196406 |
| retail-transfer-low | couchdb0.commercial.paynet | container_write_bytes_per_second | bytes_per_second | 290090.3953377596 | 546762.965590635 | 521391.9263172179 |
| retail-transfer-low | peer0.himbara.paynet | container_write_bytes_per_second | bytes_per_second | 167847.21451481382 | 297191.2556458898 | 285698.6903571705 |
| retail-transfer-low | peer0.commercial.paynet | container_write_bytes_per_second | bytes_per_second | 163429.38969904222 | 295195.19780140306 | 284044.02907273365 |
| retail-transfer-low | couchdb0.ojk.paynet | container_write_bytes_per_second | bytes_per_second | 286058.5209781838 | 522965.04293910135 | 501466.954820074 |
| retail-transfer-low | peer0.bi.paynet | container_write_bytes_per_second | bytes_per_second | 161046.5782035872 | 295216.2932217102 | 283772.9602626881 |
| retail-transfer-low | peer0.ojk.paynet | container_write_bytes_per_second | bytes_per_second | 142615.19332844406 | 265968.3819628647 | 259211.05330500024 |
| retail-transfer-low | peer0.pjp.paynet | container_write_bytes_per_second | bytes_per_second | 156573.14083833405 | 296813.74073404446 | 279752.0040390852 |
| retail-transfer-low | dev-peer0.commercial.paynet-digital-rupiah_3.0-6577345e5a476eadebff5403f2756125454311a1ea7739a34dbea5999be18074 | container_write_bytes_per_second | bytes_per_second | 0 | 0 | 0 |
| retail-transfer-low | bi-coin-fabric-postgres | container_read_service_ms | milliseconds_per_operation | 0 | 0 | 0 |
| retail-transfer-low | bi-coin-fabric-cadvisor | container_read_service_ms | milliseconds_per_operation | 0 | 0 | 0 |
| retail-transfer-low | bi-coin-fabric-node-exporter | container_read_service_ms | milliseconds_per_operation | 0 | 0 | 0 |
| retail-transfer-low | bi-coin-fabric-prometheus | container_read_service_ms | milliseconds_per_operation | 0 | 0 | 0 |
| retail-transfer-low | couchdb0.bi.paynet | container_read_service_ms | milliseconds_per_operation | 0 | 0 | 0 |
| retail-transfer-low | couchdb0.pjp.paynet | container_read_service_ms | milliseconds_per_operation | 0 | 0 | 0 |
| retail-transfer-low | orderer.paynet | container_read_service_ms | milliseconds_per_operation | 0 | 0 | 0 |
| retail-transfer-low | couchdb0.himbara.paynet | container_read_service_ms | milliseconds_per_operation | 0 | 0 | 0 |
| retail-transfer-low | couchdb0.commercial.paynet | container_read_service_ms | milliseconds_per_operation | 0 | 0 | 0 |
| retail-transfer-low | couchdb0.ojk.paynet | container_read_service_ms | milliseconds_per_operation | 0 | 0 | 0 |
| retail-transfer-low | peer0.himbara.paynet | container_read_service_ms | milliseconds_per_operation | 0 | 0 | 0 |
| retail-transfer-low | peer0.commercial.paynet | container_read_service_ms | milliseconds_per_operation | 0 | 0 | 0 |
| retail-transfer-low | peer0.ojk.paynet | container_read_service_ms | milliseconds_per_operation | 0 | 0 | 0 |
| retail-transfer-low | peer0.pjp.paynet | container_read_service_ms | milliseconds_per_operation | 0 | 0 | 0 |
| retail-transfer-low | peer0.bi.paynet | container_read_service_ms | milliseconds_per_operation | 0 | 0 | 0 |
| retail-transfer-low | dev-peer0.pjp.paynet-digital-rupiah_3.0-6577345e5a476eadebff5403f2756125454311a1ea7739a34dbea5999be18074 | container_read_service_ms | milliseconds_per_operation | 0 | 0 | 0 |
| retail-transfer-low | dev-peer0.himbara.paynet-digital-rupiah_3.0-6577345e5a476eadebff5403f2756125454311a1ea7739a34dbea5999be18074 | container_read_service_ms | milliseconds_per_operation | 0 | 0 | 0 |
| retail-transfer-low | dev-peer0.bi.paynet-digital-rupiah_3.0-6577345e5a476eadebff5403f2756125454311a1ea7739a34dbea5999be18074 | container_read_service_ms | milliseconds_per_operation | 0 | 0 | 0 |
| retail-transfer-low | dev-peer0.commercial.paynet-digital-rupiah_3.0-6577345e5a476eadebff5403f2756125454311a1ea7739a34dbea5999be18074 | container_read_service_ms | milliseconds_per_operation | 0 | 0 | 0 |
| retail-transfer-low | bi-coin-fabric-postgres | container_write_service_ms | milliseconds_per_operation | 0 | 0 | 0 |
| retail-transfer-low | bi-coin-fabric-cadvisor | container_write_service_ms | milliseconds_per_operation | 0 | 0 | 0 |
| retail-transfer-low | bi-coin-fabric-node-exporter | container_write_service_ms | milliseconds_per_operation | 0 | 0 | 0 |
| retail-transfer-low | bi-coin-fabric-prometheus | container_write_service_ms | milliseconds_per_operation | 0 | 0 | 0 |
| retail-transfer-low | couchdb0.bi.paynet | container_write_service_ms | milliseconds_per_operation | 0 | 0 | 0 |
| retail-transfer-low | couchdb0.pjp.paynet | container_write_service_ms | milliseconds_per_operation | 0 | 0 | 0 |
| retail-transfer-low | orderer.paynet | container_write_service_ms | milliseconds_per_operation | 0 | 0 | 0 |
| retail-transfer-low | couchdb0.himbara.paynet | container_write_service_ms | milliseconds_per_operation | 0 | 0 | 0 |
| retail-transfer-low | couchdb0.commercial.paynet | container_write_service_ms | milliseconds_per_operation | 0 | 0 | 0 |
| retail-transfer-low | couchdb0.ojk.paynet | container_write_service_ms | milliseconds_per_operation | 0 | 0 | 0 |
| retail-transfer-low | peer0.himbara.paynet | container_write_service_ms | milliseconds_per_operation | 0 | 0 | 0 |
| retail-transfer-low | peer0.commercial.paynet | container_write_service_ms | milliseconds_per_operation | 0 | 0 | 0 |
| retail-transfer-low | peer0.ojk.paynet | container_write_service_ms | milliseconds_per_operation | 0 | 0 | 0 |
| retail-transfer-low | peer0.pjp.paynet | container_write_service_ms | milliseconds_per_operation | 0 | 0 | 0 |
| retail-transfer-low | peer0.bi.paynet | container_write_service_ms | milliseconds_per_operation | 0 | 0 | 0 |
| retail-transfer-low | dev-peer0.pjp.paynet-digital-rupiah_3.0-6577345e5a476eadebff5403f2756125454311a1ea7739a34dbea5999be18074 | container_write_service_ms | milliseconds_per_operation | 0 | 0 | 0 |
| retail-transfer-low | dev-peer0.himbara.paynet-digital-rupiah_3.0-6577345e5a476eadebff5403f2756125454311a1ea7739a34dbea5999be18074 | container_write_service_ms | milliseconds_per_operation | 0 | 0 | 0 |
| retail-transfer-low | dev-peer0.bi.paynet-digital-rupiah_3.0-6577345e5a476eadebff5403f2756125454311a1ea7739a34dbea5999be18074 | container_write_service_ms | milliseconds_per_operation | 0 | 0 | 0 |
| retail-transfer-low | dev-peer0.commercial.paynet-digital-rupiah_3.0-6577345e5a476eadebff5403f2756125454311a1ea7739a34dbea5999be18074 | container_write_service_ms | milliseconds_per_operation | 0 | 0 | 0 |
| retail-transfer-low | node-exporter:9100 | host_cpu_busy_percent | % | 34.171269499178784 | 42.03571428571584 | 41.66810344827511 |
| retail-transfer-low | node-exporter:9100 | host_memory_used_bytes | bytes | 5902399897.6 | 6011371520 | 5964323635.2 |
| retail-transfer-low | node-exporter:9100 | host_read_iops | operations_per_second | 0.5789408866995073 | 1.9310344827586206 | 1.6258620689655168 |
| retail-transfer-low | node-exporter:9100 | host_write_iops | operations_per_second | 298.43889860426924 | 932 | 875.8999999999999 |
| retail-transfer-low | node-exporter:9100 | host_read_await_ms | milliseconds_per_operation | 0.5006898806762466 | 1.6363636363662821 | 1.5475324675349693 |
| retail-transfer-low | node-exporter:9100 | host_write_await_ms | milliseconds_per_operation | 4.768442818407193 | 17.37854511181661 | 16.885823280392938 |
| retail-transfer-low | /peer0.himbara.paynet | caliper_client_cpu_avg | percent | 0.1425 | 0.1425 |  |
| retail-transfer-low | /peer0.himbara.paynet | caliper_client_cpu_max | percent | 0.2325 | 0.2325 |  |
| retail-transfer-low | /peer0.himbara.paynet | caliper_client_memory_avg | bytes | 116 | 116 |  |
| retail-transfer-low | /peer0.himbara.paynet | caliper_client_memory_max | bytes | 117 | 117 |  |
| retail-transfer-low | /peer0.bi.paynet | caliper_client_cpu_avg | percent | 0.05125 | 0.05125 |  |
| retail-transfer-low | /peer0.bi.paynet | caliper_client_cpu_max | percent | 0.08625 | 0.08625 |  |
| retail-transfer-low | /peer0.bi.paynet | caliper_client_memory_avg | bytes | 103 | 103 |  |
| retail-transfer-low | /peer0.bi.paynet | caliper_client_memory_max | bytes | 106 | 106 |  |
| retail-transfer-low | /peer0.pjp.paynet | caliper_client_cpu_avg | percent | 0.05 | 0.05 |  |
| retail-transfer-low | /peer0.pjp.paynet | caliper_client_cpu_max | percent | 0.1025 | 0.1025 |  |
| retail-transfer-low | /peer0.pjp.paynet | caliper_client_memory_avg | bytes | 106 | 106 |  |
| retail-transfer-low | /peer0.pjp.paynet | caliper_client_memory_max | bytes | 109 | 109 |  |
| retail-transfer-low | /peer0.commercial.paynet | caliper_client_cpu_avg | percent | 0.05375 | 0.05375 |  |
| retail-transfer-low | /peer0.commercial.paynet | caliper_client_cpu_max | percent | 0.10125 | 0.10125 |  |
| retail-transfer-low | /peer0.commercial.paynet | caliper_client_memory_avg | bytes | 108 | 108 |  |
| retail-transfer-low | /peer0.commercial.paynet | caliper_client_memory_max | bytes | 113 | 113 |  |
| retail-transfer-low | /peer0.ojk.paynet | caliper_client_cpu_avg | percent | 0.0525 | 0.0525 |  |
| retail-transfer-low | /peer0.ojk.paynet | caliper_client_cpu_max | percent | 0.08625 | 0.08625 |  |
| retail-transfer-low | /peer0.ojk.paynet | caliper_client_memory_avg | bytes | 111 | 111 |  |
| retail-transfer-low | /peer0.ojk.paynet | caliper_client_memory_max | bytes | 112 | 112 |  |
| retail-transfer-low | /couchdb0.pjp.paynet | caliper_client_cpu_avg | percent | 0.2725 | 0.2725 |  |
| retail-transfer-low | /couchdb0.pjp.paynet | caliper_client_cpu_max | percent | 0.52 | 0.52 |  |
| retail-transfer-low | /couchdb0.pjp.paynet | caliper_client_memory_avg | bytes | 54.3 | 54.3 |  |
| retail-transfer-low | /couchdb0.pjp.paynet | caliper_client_memory_max | bytes | 55.8 | 55.8 |  |
| retail-transfer-low | /couchdb0.ojk.paynet | caliper_client_cpu_avg | percent | 0.2925 | 0.2925 |  |
| retail-transfer-low | /couchdb0.ojk.paynet | caliper_client_cpu_max | percent | 0.84375 | 0.84375 |  |
| retail-transfer-low | /couchdb0.ojk.paynet | caliper_client_memory_avg | bytes | 57.6 | 57.6 |  |
| retail-transfer-low | /couchdb0.ojk.paynet | caliper_client_memory_max | bytes | 60.7 | 60.7 |  |
| retail-transfer-low | /orderer.paynet | caliper_client_cpu_avg | percent | 0.0175 | 0.0175 |  |
| retail-transfer-low | /orderer.paynet | caliper_client_cpu_max | percent | 0.035 | 0.035 |  |
| retail-transfer-low | /orderer.paynet | caliper_client_memory_avg | bytes | 43.5 | 43.5 |  |
| retail-transfer-low | /orderer.paynet | caliper_client_memory_max | bytes | 44.7 | 44.7 |  |
| retail-transfer-low | /couchdb0.bi.paynet | caliper_client_cpu_avg | percent | 0.2775 | 0.2775 |  |
| retail-transfer-low | /couchdb0.bi.paynet | caliper_client_cpu_max | percent | 0.6725 | 0.6725 |  |
| retail-transfer-low | /couchdb0.bi.paynet | caliper_client_memory_avg | bytes | 55.4 | 55.4 |  |
| retail-transfer-low | /couchdb0.bi.paynet | caliper_client_memory_max | bytes | 57.7 | 57.7 |  |
| retail-transfer-low | /couchdb0.commercial.paynet | caliper_client_cpu_avg | percent | 0.29 | 0.29 |  |
| retail-transfer-low | /couchdb0.commercial.paynet | caliper_client_cpu_max | percent | 0.75875 | 0.75875 |  |
| retail-transfer-low | /couchdb0.commercial.paynet | caliper_client_memory_avg | bytes | 54.9 | 54.9 |  |
| retail-transfer-low | /couchdb0.commercial.paynet | caliper_client_memory_max | bytes | 57.6 | 57.6 |  |
| retail-transfer-low | /couchdb0.himbara.paynet | caliper_client_cpu_avg | percent | 0.2825 | 0.2825 |  |
| retail-transfer-low | /couchdb0.himbara.paynet | caliper_client_cpu_max | percent | 0.7075 | 0.7075 |  |
| retail-transfer-low | /couchdb0.himbara.paynet | caliper_client_memory_avg | bytes | 57.1 | 57.1 |  |
| retail-transfer-low | /couchdb0.himbara.paynet | caliper_client_memory_max | bytes | 60.4 | 60.4 |  |
| retail-transfer-low | node caliper(sum) | caliper_client_cpu_avg | percent | 23.22 | 23.22 |  |
| retail-transfer-low | node caliper(sum) | caliper_client_cpu_max | percent | 34.65 | 34.65 |  |
| retail-transfer-low | bi-coin-fabric-postgres | container_cpu_percent | % | 0.8677564306995893 | 1.0474236771897245 | 1.0139560980570226 |
| retail-transfer-low | bi-coin-fabric-cadvisor | container_cpu_percent | % | 88.78954131326259 | 99.22411483253708 | 94.31968074534838 |
| retail-transfer-low | bi-coin-fabric-node-exporter | container_cpu_percent | % | 2.7665618747088283 | 3.021755271220038 | 2.963207776807218 |
| retail-transfer-low | bi-coin-fabric-prometheus | container_cpu_percent | % | 11.367288218722907 | 12.593987553180327 | 12.39787548157978 |
| retail-transfer-low | couchdb0.ojk.paynet | container_cpu_percent | % | 24.712528443450683 | 47.037178072111864 | 45.700926046525474 |
| retail-transfer-low | peer0.pjp.paynet | container_cpu_percent | % | 3.7299798260332957 | 6.081985836529951 | 5.956354581343714 |
| retail-transfer-low | orderer.paynet | container_cpu_percent | % | 1.9103812125829955 | 3.6547865231764773 | 3.5152736478966577 |
| retail-transfer-low | couchdb0.commercial.paynet | container_cpu_percent | % | 23.893365649487155 | 45.57049974315697 | 43.79400323477305 |
| retail-transfer-low | couchdb0.pjp.paynet | container_cpu_percent | % | 23.22458751857921 | 45.91509394205443 | 43.18999666576264 |
| retail-transfer-low | peer0.ojk.paynet | container_cpu_percent | % | 3.6824912786431594 | 6.009534135675306 | 5.732081024185841 |
| retail-transfer-low | couchdb0.himbara.paynet | container_cpu_percent | % | 21.503732466621095 | 39.863448246699434 | 38.15184296203182 |
| retail-transfer-low | couchdb0.bi.paynet | container_cpu_percent | % | 23.96159905787462 | 46.43021779228151 | 44.66215214673839 |
| retail-transfer-low | peer0.bi.paynet | container_cpu_percent | % | 3.80109580514876 | 6.116959705663849 | 5.87130555540237 |
| retail-transfer-low | peer0.himbara.paynet | container_cpu_percent | % | 11.437292607038293 | 20.267116257484613 | 19.669518337163517 |
| retail-transfer-low | peer0.commercial.paynet | container_cpu_percent | % | 3.7247056528203166 | 6.019083615617754 | 5.975105708253471 |
| retail-transfer-low | dev-peer0.himbara.paynet-digital-rupiah_3.0-6577345e5a476eadebff5403f2756125454311a1ea7739a34dbea5999be18074 | container_cpu_percent | % | 3.1481916242818335 | 6.0467391609829395 | 5.63356462352941 |
| retail-transfer-low | dev-peer0.commercial.paynet-digital-rupiah_3.0-6577345e5a476eadebff5403f2756125454311a1ea7739a34dbea5999be18074 | container_cpu_percent | % | 0.0006733434698166671 | 0.0034681158302150798 | 0.0031024987213609826 |
| retail-transfer-low | dev-peer0.pjp.paynet-digital-rupiah_3.0-6577345e5a476eadebff5403f2756125454311a1ea7739a34dbea5999be18074 | container_cpu_percent | % | 0.0007465961421319029 | 0.0018879719929981711 | 0.001793521152529503 |
| retail-transfer-low | dev-peer0.bi.paynet-digital-rupiah_3.0-6577345e5a476eadebff5403f2756125454311a1ea7739a34dbea5999be18074 | container_cpu_percent | % | 0.03928316374718434 | 0.07226823409600891 | 0.07129610712908423 |
| retail-transfer-low | bi-coin-fabric-postgres | container_memory_working_set_bytes | bytes | 14605516.8 | 14618624 | 14614937.6 |
| retail-transfer-low | bi-coin-fabric-cadvisor | container_memory_working_set_bytes | bytes | 153813265.06666666 | 172929024 | 169897984 |
| retail-transfer-low | bi-coin-fabric-node-exporter | container_memory_working_set_bytes | bytes | 13211511.466666667 | 14462976 | 14335795.2 |
| retail-transfer-low | bi-coin-fabric-prometheus | container_memory_working_set_bytes | bytes | 444044765.8666667 | 465866752 | 465833984 |
| retail-transfer-low | couchdb0.ojk.paynet | container_memory_working_set_bytes | bytes | 59462997.333333336 | 68550656 | 66172927.999999985 |
| retail-transfer-low | peer0.pjp.paynet | container_memory_working_set_bytes | bytes | 119586542.93333334 | 121503744 | 121485312 |
| retail-transfer-low | orderer.paynet | container_memory_working_set_bytes | bytes | 62511377.06666667 | 75309056 | 72965939.19999999 |
| retail-transfer-low | couchdb0.commercial.paynet | container_memory_working_set_bytes | bytes | 58659498.666666664 | 63471616 | 63106662.4 |
| retail-transfer-low | couchdb0.pjp.paynet | container_memory_working_set_bytes | bytes | 57277917.86666667 | 61775872 | 60338176 |
| retail-transfer-low | peer0.ojk.paynet | container_memory_working_set_bytes | bytes | 117264110.93333334 | 118325248 | 117915648 |
| retail-transfer-low | couchdb0.himbara.paynet | container_memory_working_set_bytes | bytes | 57704038.4 | 62148608 | 61444096 |
| retail-transfer-low | couchdb0.bi.paynet | container_memory_working_set_bytes | bytes | 58482961.06666667 | 64827392 | 63459737.599999994 |
| retail-transfer-low | peer0.bi.paynet | container_memory_working_set_bytes | bytes | 115984110.93333334 | 124882944 | 124678348.8 |
| retail-transfer-low | peer0.himbara.paynet | container_memory_working_set_bytes | bytes | 123774702.93333334 | 126754816 | 126352998.4 |
| retail-transfer-low | peer0.commercial.paynet | container_memory_working_set_bytes | bytes | 108432588.8 | 112324608 | 112291840 |
| retail-transfer-low | dev-peer0.himbara.paynet-digital-rupiah_3.0-6577345e5a476eadebff5403f2756125454311a1ea7739a34dbea5999be18074 | container_memory_working_set_bytes | bytes | 26128657.066666666 | 26894336 | 26873856 |
| retail-transfer-low | dev-peer0.commercial.paynet-digital-rupiah_3.0-6577345e5a476eadebff5403f2756125454311a1ea7739a34dbea5999be18074 | container_memory_working_set_bytes | bytes | 17203200 | 17203200 | 17203200 |
| retail-transfer-low | dev-peer0.pjp.paynet-digital-rupiah_3.0-6577345e5a476eadebff5403f2756125454311a1ea7739a34dbea5999be18074 | container_memory_working_set_bytes | bytes | 16842752 | 16842752 | 16842752 |
| retail-transfer-low | dev-peer0.bi.paynet-digital-rupiah_3.0-6577345e5a476eadebff5403f2756125454311a1ea7739a34dbea5999be18074 | container_memory_working_set_bytes | bytes | 17801216 | 17801216 | 17801216 |
| retail-transfer-low | bi-coin-fabric-postgres | container_network_receive_bytes_per_second | bytes_per_second | 0 | 0 | 0 |
| retail-transfer-low | bi-coin-fabric-cadvisor | container_network_receive_bytes_per_second | bytes_per_second | 7706.1961966192275 | 8231.933368775475 | 8173.3497956864 |
| retail-transfer-low | bi-coin-fabric-node-exporter | container_network_receive_bytes_per_second | bytes_per_second | 669.6303614699917 | 708.0366225839268 | 701.327974530128 |
| retail-transfer-low | bi-coin-fabric-prometheus | container_network_receive_bytes_per_second | bytes_per_second | 514544.7471976314 | 544835.6294536818 | 540642.5766144128 |
| retail-transfer-low | couchdb0.ojk.paynet | container_network_receive_bytes_per_second | bytes_per_second | 64533.415806791745 | 126305.37159676234 | 121673.96061862282 |
| retail-transfer-low | peer0.pjp.paynet | container_network_receive_bytes_per_second | bytes_per_second | 168638.933755882 | 320245.46326349955 | 313722.2551730305 |
| retail-transfer-low | orderer.paynet | container_network_receive_bytes_per_second | bytes_per_second | 97908.88988983483 | 189195.9977491735 | 186126.61853275954 |
| retail-transfer-low | couchdb0.commercial.paynet | container_network_receive_bytes_per_second | bytes_per_second | 64868.57423877546 | 127936.77674287326 | 124361.76290429632 |
| retail-transfer-low | couchdb0.pjp.paynet | container_network_receive_bytes_per_second | bytes_per_second | 63499.306351016705 | 127299.8068481124 | 122220.09461883799 |
| retail-transfer-low | peer0.ojk.paynet | container_network_receive_bytes_per_second | bytes_per_second | 168815.31360574797 | 319958.2203910514 | 314546.1133488759 |
| retail-transfer-low | couchdb0.himbara.paynet | container_network_receive_bytes_per_second | bytes_per_second | 62321.973403556774 | 118054.56299604898 | 115615.9183993492 |
| retail-transfer-low | couchdb0.bi.paynet | container_network_receive_bytes_per_second | bytes_per_second | 63975.24690493931 | 126205.94494892168 | 121305.1906554882 |
| retail-transfer-low | peer0.bi.paynet | container_network_receive_bytes_per_second | bytes_per_second | 174042.46203109043 | 324288.1451869672 | 316728.94752834016 |
| retail-transfer-low | peer0.himbara.paynet | container_network_receive_bytes_per_second | bytes_per_second | 372885.1134888872 | 713885.7183519534 | 685493.4353346658 |
| retail-transfer-low | peer0.commercial.paynet | container_network_receive_bytes_per_second | bytes_per_second | 170784.6334450572 | 321400.4278772935 | 316166.4937331182 |
| retail-transfer-low | dev-peer0.himbara.paynet-digital-rupiah_3.0-6577345e5a476eadebff5403f2756125454311a1ea7739a34dbea5999be18074 | container_network_receive_bytes_per_second | bytes_per_second | 91512.50081544931 | 176796.9699715854 | 169249.31249999997 |
| retail-transfer-low | dev-peer0.commercial.paynet-digital-rupiah_3.0-6577345e5a476eadebff5403f2756125454311a1ea7739a34dbea5999be18074 | container_network_receive_bytes_per_second | bytes_per_second | 7.624913886186559 | 20.872865275142313 | 19.881527156438533 |
| retail-transfer-low | dev-peer0.pjp.paynet-digital-rupiah_3.0-6577345e5a476eadebff5403f2756125454311a1ea7739a34dbea5999be18074 | container_network_receive_bytes_per_second | bytes_per_second | 7.762333627512198 | 21.08860548470451 | 19.48852256971191 |
| retail-transfer-low | dev-peer0.bi.paynet-digital-rupiah_3.0-6577345e5a476eadebff5403f2756125454311a1ea7739a34dbea5999be18074 | container_network_receive_bytes_per_second | bytes_per_second | 2833.4314826884597 | 4208.144426745089 | 4103.25117752557 |
| retail-transfer-low | bi-coin-fabric-postgres | container_network_transmit_bytes_per_second | bytes_per_second | 0 | 0 | 0 |
| retail-transfer-low | bi-coin-fabric-cadvisor | container_network_transmit_bytes_per_second | bytes_per_second | 489932.58355670626 | 523283.5249042146 | 517374.6572213188 |
| retail-transfer-low | bi-coin-fabric-node-exporter | container_network_transmit_bytes_per_second | bytes_per_second | 15610.478396355333 | 16570.629269001598 | 16434.42272200545 |
| retail-transfer-low | bi-coin-fabric-prometheus | container_network_transmit_bytes_per_second | bytes_per_second | 50123.81163123935 | 52705.97478530971 | 52403.073394911655 |
| retail-transfer-low | couchdb0.ojk.paynet | container_network_transmit_bytes_per_second | bytes_per_second | 74927.09739583725 | 139102.72259013983 | 133777.63156259907 |
| retail-transfer-low | peer0.pjp.paynet | container_network_transmit_bytes_per_second | bytes_per_second | 69465.89470192374 | 131793.70758335793 | 130106.55672867713 |
| retail-transfer-low | orderer.paynet | container_network_transmit_bytes_per_second | bytes_per_second | 458783.54789837386 | 888877.719097389 | 873958.7798319384 |
| retail-transfer-low | couchdb0.commercial.paynet | container_network_transmit_bytes_per_second | bytes_per_second | 75067.48510472807 | 140773.14422805535 | 137424.80660575282 |
| retail-transfer-low | couchdb0.pjp.paynet | container_network_transmit_bytes_per_second | bytes_per_second | 73516.56587259834 | 140100.1229148376 | 135110.28462043172 |
| retail-transfer-low | peer0.ojk.paynet | container_network_transmit_bytes_per_second | bytes_per_second | 69374.24093002583 | 133208.46434638044 | 131023.04735965822 |
| retail-transfer-low | couchdb0.himbara.paynet | container_network_transmit_bytes_per_second | bytes_per_second | 33279.998102298974 | 56119.155375108414 | 54887.69593718073 |
| retail-transfer-low | couchdb0.bi.paynet | container_network_transmit_bytes_per_second | bytes_per_second | 77127.70716306094 | 138448.85073779794 | 133021.8358490432 |
| retail-transfer-low | peer0.bi.paynet | container_network_transmit_bytes_per_second | bytes_per_second | 74057.98536264573 | 134058.5842148088 | 132040.36678086413 |
| retail-transfer-low | peer0.himbara.paynet | container_network_transmit_bytes_per_second | bytes_per_second | 364408.8443322839 | 705427.8090087526 | 677373.3177890874 |
| retail-transfer-low | peer0.commercial.paynet | container_network_transmit_bytes_per_second | bytes_per_second | 70580.07682066999 | 133910.92886432516 | 132373.35848814575 |
| retail-transfer-low | dev-peer0.himbara.paynet-digital-rupiah_3.0-6577345e5a476eadebff5403f2756125454311a1ea7739a34dbea5999be18074 | container_network_transmit_bytes_per_second | bytes_per_second | 99048.65836342573 | 191589.22176676683 | 183379.99555147055 |
| retail-transfer-low | dev-peer0.commercial.paynet-digital-rupiah_3.0-6577345e5a476eadebff5403f2756125454311a1ea7739a34dbea5999be18074 | container_network_transmit_bytes_per_second | bytes_per_second | 5.205801753866328 | 11.177884615384617 | 10.81442886673986 |
| retail-transfer-low | dev-peer0.pjp.paynet-digital-rupiah_3.0-6577345e5a476eadebff5403f2756125454311a1ea7739a34dbea5999be18074 | container_network_transmit_bytes_per_second | bytes_per_second | 4.802727832896463 | 7.25181295323831 | 6.701586812509629 |
| retail-transfer-low | dev-peer0.bi.paynet-digital-rupiah_3.0-6577345e5a476eadebff5403f2756125454311a1ea7739a34dbea5999be18074 | container_network_transmit_bytes_per_second | bytes_per_second | 275.08867076477145 | 404.60727851978925 | 395.65442691760614 |
| retail-transfer-low | bi-coin-fabric-postgres | container_read_iops | operations_per_second | 0 | 0 | 0 |
| retail-transfer-low | bi-coin-fabric-cadvisor | container_read_iops | operations_per_second | 0 | 0 | 0 |
| retail-transfer-low | bi-coin-fabric-node-exporter | container_read_iops | operations_per_second | 0 | 0 | 0 |
| retail-transfer-low | bi-coin-fabric-prometheus | container_read_iops | operations_per_second | 0 | 0 | 0 |
| retail-transfer-low | couchdb0.ojk.paynet | container_read_iops | operations_per_second | 0.031920649676250065 | 0.11075832533412093 | 0.10758099126455674 |
| retail-transfer-low | peer0.pjp.paynet | container_read_iops | operations_per_second | 0 | 0 | 0 |
| retail-transfer-low | orderer.paynet | container_read_iops | operations_per_second | 0 | 0 | 0 |
| retail-transfer-low | couchdb0.commercial.paynet | container_read_iops | operations_per_second | 0.03200428370224131 | 0.11007558523519481 | 0.1083633036956614 |
| retail-transfer-low | couchdb0.pjp.paynet | container_read_iops | operations_per_second | 0.050540037668306274 | 0.18107286919168109 | 0.1792362965754038 |
| retail-transfer-low | peer0.ojk.paynet | container_read_iops | operations_per_second | 0 | 0 | 0 |
| retail-transfer-low | couchdb0.himbara.paynet | container_read_iops | operations_per_second | 0.021295102315143467 | 0.07370283018867924 | 0.07227434034613443 |
| retail-transfer-low | couchdb0.bi.paynet | container_read_iops | operations_per_second | 0.03187214334912216 | 0.10970525853872595 | 0.1080137640229133 |
| retail-transfer-low | peer0.bi.paynet | container_read_iops | operations_per_second | 0 | 0 | 0 |
| retail-transfer-low | peer0.himbara.paynet | container_read_iops | operations_per_second | 0 | 0 | 0 |
| retail-transfer-low | peer0.commercial.paynet | container_read_iops | operations_per_second | 0 | 0 | 0 |
| retail-transfer-low | dev-peer0.himbara.paynet-digital-rupiah_3.0-6577345e5a476eadebff5403f2756125454311a1ea7739a34dbea5999be18074 | container_read_iops | operations_per_second | 0 | 0 | 0 |
| retail-transfer-low | dev-peer0.commercial.paynet-digital-rupiah_3.0-6577345e5a476eadebff5403f2756125454311a1ea7739a34dbea5999be18074 | container_read_iops | operations_per_second | 0 | 0 | 0 |
| retail-transfer-low | dev-peer0.pjp.paynet-digital-rupiah_3.0-6577345e5a476eadebff5403f2756125454311a1ea7739a34dbea5999be18074 | container_read_iops | operations_per_second | 0 | 0 | 0 |
| retail-transfer-low | dev-peer0.bi.paynet-digital-rupiah_3.0-6577345e5a476eadebff5403f2756125454311a1ea7739a34dbea5999be18074 | container_read_iops | operations_per_second | 0 | 0 | 0 |
| retail-transfer-low | bi-coin-fabric-postgres | container_write_iops | operations_per_second | 0 | 0 | 0 |
| retail-transfer-low | bi-coin-fabric-cadvisor | container_write_iops | operations_per_second | 0 | 0 | 0 |
| retail-transfer-low | bi-coin-fabric-node-exporter | container_write_iops | operations_per_second | 0 | 0 | 0 |
| retail-transfer-low | bi-coin-fabric-prometheus | container_write_iops | operations_per_second | 0.4365334994346834 | 2.7439359016573373 | 0.9760687912164163 |
| retail-transfer-low | couchdb0.ojk.paynet | container_write_iops | operations_per_second | 38.499984473740554 | 154.52538631346582 | 144.3218989219399 |
| retail-transfer-low | peer0.pjp.paynet | container_write_iops | operations_per_second | 13.473595020925615 | 51.748303334316915 | 50.406737874175676 |
| retail-transfer-low | orderer.paynet | container_write_iops | operations_per_second | 11.990973824393372 | 44.87203161354655 | 41.3016880289257 |
| retail-transfer-low | couchdb0.commercial.paynet | container_write_iops | operations_per_second | 20.582939018008982 | 80.83217142437806 | 77.72447100691775 |
| retail-transfer-low | couchdb0.pjp.paynet | container_write_iops | operations_per_second | 51.559783752885565 | 210.42731819392262 | 204.14702190509806 |
| retail-transfer-low | peer0.ojk.paynet | container_write_iops | operations_per_second | 13.894900913830334 | 53.12804944161336 | 49.29618279399728 |
| retail-transfer-low | couchdb0.himbara.paynet | container_write_iops | operations_per_second | 25.468383785168996 | 94.08613664835694 | 90.69896314760344 |
| retail-transfer-low | couchdb0.bi.paynet | container_write_iops | operations_per_second | 21.771905815680345 | 83.9599886492622 | 80.38604173966007 |
| retail-transfer-low | peer0.bi.paynet | container_write_iops | operations_per_second | 13.961919389640862 | 52.605511727456054 | 48.91561993593437 |
| retail-transfer-low | peer0.himbara.paynet | container_write_iops | operations_per_second | 14.514378630716752 | 54.36561588272968 | 51.465125099572546 |
| retail-transfer-low | peer0.commercial.paynet | container_write_iops | operations_per_second | 14.49222813707464 | 54.59083615617757 | 50.46420772740975 |
| retail-transfer-low | dev-peer0.himbara.paynet-digital-rupiah_3.0-6577345e5a476eadebff5403f2756125454311a1ea7739a34dbea5999be18074 | container_write_iops | operations_per_second | 0 | 0 | 0 |
| retail-transfer-low | dev-peer0.commercial.paynet-digital-rupiah_3.0-6577345e5a476eadebff5403f2756125454311a1ea7739a34dbea5999be18074 | container_write_iops | operations_per_second | 0 | 0 | 0 |
| retail-transfer-low | dev-peer0.pjp.paynet-digital-rupiah_3.0-6577345e5a476eadebff5403f2756125454311a1ea7739a34dbea5999be18074 | container_write_iops | operations_per_second | 0 | 0 | 0 |
| retail-transfer-low | dev-peer0.bi.paynet-digital-rupiah_3.0-6577345e5a476eadebff5403f2756125454311a1ea7739a34dbea5999be18074 | container_write_iops | operations_per_second | 0 | 0 | 0 |
| retail-transfer-low | bi-coin-fabric-postgres | container_read_bytes_per_second | bytes_per_second | 0 | 0 | 0 |
| retail-transfer-low | bi-coin-fabric-cadvisor | container_read_bytes_per_second | bytes_per_second | 0 | 0 | 0 |
| retail-transfer-low | bi-coin-fabric-node-exporter | container_read_bytes_per_second | bytes_per_second | 0 | 0 | 0 |
| retail-transfer-low | bi-coin-fabric-prometheus | container_read_bytes_per_second | bytes_per_second | 0 | 0 | 0 |
| retail-transfer-low | peer0.pjp.paynet | container_read_bytes_per_second | bytes_per_second | 0 | 0 | 0 |
| retail-transfer-low | orderer.paynet | container_read_bytes_per_second | bytes_per_second | 0 | 0 | 0 |
| retail-transfer-low | couchdb0.ojk.paynet | container_read_bytes_per_second | bytes_per_second | 348.594028552434 | 604.8881340914124 | 598.82516667484 |
| retail-transfer-low | peer0.ojk.paynet | container_read_bytes_per_second | bytes_per_second | 0 | 0 | 0 |
| retail-transfer-low | couchdb0.bi.paynet | container_read_bytes_per_second | bytes_per_second | 349.83231844249565 | 608.4147201901297 | 604.00380606846 |
| retail-transfer-low | couchdb0.pjp.paynet | container_read_bytes_per_second | bytes_per_second | 963.2196283994629 | 1779.503756089895 | 1765.1948442426467 |
| retail-transfer-low | peer0.bi.paynet | container_read_bytes_per_second | bytes_per_second | 0 | 0 | 0 |
| retail-transfer-low | couchdb0.himbara.paynet | container_read_bytes_per_second | bytes_per_second | 261.19385578456644 | 452.83018867924534 | 447.0784217565111 |
| retail-transfer-low | couchdb0.commercial.paynet | container_read_bytes_per_second | bytes_per_second | 349.49550485846834 | 601.159462831144 | 593.5355185770095 |
| retail-transfer-low | peer0.himbara.paynet | container_read_bytes_per_second | bytes_per_second | 0 | 0 | 0 |
| retail-transfer-low | peer0.commercial.paynet | container_read_bytes_per_second | bytes_per_second | 0 | 0 | 0 |
| retail-transfer-low | dev-peer0.bi.paynet-digital-rupiah_3.0-6577345e5a476eadebff5403f2756125454311a1ea7739a34dbea5999be18074 | container_read_bytes_per_second | bytes_per_second | 0 | 0 | 0 |
| retail-transfer-low | bi-coin-fabric-postgres | container_write_bytes_per_second | bytes_per_second | 0 | 0 | 0 |
| retail-transfer-low | bi-coin-fabric-cadvisor | container_write_bytes_per_second | bytes_per_second | 0 | 0 | 0 |
| retail-transfer-low | bi-coin-fabric-node-exporter | container_write_bytes_per_second | bytes_per_second | 0 | 0 | 0 |
| retail-transfer-low | bi-coin-fabric-prometheus | container_write_bytes_per_second | bytes_per_second | 107058.79928403487 | 341220.94171880145 | 235353.04058540918 |
| retail-transfer-low | peer0.pjp.paynet | container_write_bytes_per_second | bytes_per_second | 286569.6571575357 | 553697.2558276779 | 545461.5536351908 |
| retail-transfer-low | orderer.paynet | container_write_bytes_per_second | bytes_per_second | 334315.92921933124 | 638217.8232448202 | 625724.4327182723 |
| retail-transfer-low | couchdb0.ojk.paynet | container_write_bytes_per_second | bytes_per_second | 1088284.17204469 | 2203220.014716704 | 2108017.6837024353 |
| retail-transfer-low | peer0.ojk.paynet | container_write_bytes_per_second | bytes_per_second | 294962.1885147582 | 568457.1180743793 | 551985.099979712 |
| retail-transfer-low | couchdb0.bi.paynet | container_write_bytes_per_second | bytes_per_second | 523443.516350436 | 1032862.6560726447 | 997364.449736998 |
| retail-transfer-low | couchdb0.pjp.paynet | container_write_bytes_per_second | bytes_per_second | 1517317.5049930916 | 3130326.7785643153 | 3112046.6421964783 |
| retail-transfer-low | peer0.bi.paynet | container_write_bytes_per_second | bytes_per_second | 295144.46803887095 | 561213.0045636256 | 549254.3618637093 |
| retail-transfer-low | couchdb0.himbara.paynet | container_write_bytes_per_second | bytes_per_second | 652354.5027105242 | 1220694.3013819023 | 1196409.8872684836 |
| retail-transfer-low | couchdb0.commercial.paynet | container_write_bytes_per_second | bytes_per_second | 492799.5904489645 | 998676.157628238 | 985561.1030965887 |
| retail-transfer-low | peer0.himbara.paynet | container_write_bytes_per_second | bytes_per_second | 309424.341056049 | 578564.0076851918 | 555905.6736387602 |
| retail-transfer-low | peer0.commercial.paynet | container_write_bytes_per_second | bytes_per_second | 307871.17834865226 | 583619.7539668389 | 567910.8294812787 |
| retail-transfer-low | dev-peer0.bi.paynet-digital-rupiah_3.0-6577345e5a476eadebff5403f2756125454311a1ea7739a34dbea5999be18074 | container_write_bytes_per_second | bytes_per_second | 0 | 0 | 0 |
| retail-transfer-low | bi-coin-fabric-postgres | container_read_service_ms | milliseconds_per_operation | 0 | 0 | 0 |
| retail-transfer-low | bi-coin-fabric-cadvisor | container_read_service_ms | milliseconds_per_operation | 0 | 0 | 0 |
| retail-transfer-low | bi-coin-fabric-node-exporter | container_read_service_ms | milliseconds_per_operation | 0 | 0 | 0 |
| retail-transfer-low | bi-coin-fabric-prometheus | container_read_service_ms | milliseconds_per_operation | 0 | 0 | 0 |
| retail-transfer-low | couchdb0.ojk.paynet | container_read_service_ms | milliseconds_per_operation | 0 | 0 | 0 |
| retail-transfer-low | peer0.pjp.paynet | container_read_service_ms | milliseconds_per_operation | 0 | 0 | 0 |
| retail-transfer-low | orderer.paynet | container_read_service_ms | milliseconds_per_operation | 0 | 0 | 0 |
| retail-transfer-low | couchdb0.commercial.paynet | container_read_service_ms | milliseconds_per_operation | 0 | 0 | 0 |
| retail-transfer-low | couchdb0.pjp.paynet | container_read_service_ms | milliseconds_per_operation | 0 | 0 | 0 |
| retail-transfer-low | peer0.ojk.paynet | container_read_service_ms | milliseconds_per_operation | 0 | 0 | 0 |
| retail-transfer-low | couchdb0.himbara.paynet | container_read_service_ms | milliseconds_per_operation | 0 | 0 | 0 |
| retail-transfer-low | couchdb0.bi.paynet | container_read_service_ms | milliseconds_per_operation | 0 | 0 | 0 |
| retail-transfer-low | peer0.bi.paynet | container_read_service_ms | milliseconds_per_operation | 0 | 0 | 0 |
| retail-transfer-low | peer0.himbara.paynet | container_read_service_ms | milliseconds_per_operation | 0 | 0 | 0 |
| retail-transfer-low | peer0.commercial.paynet | container_read_service_ms | milliseconds_per_operation | 0 | 0 | 0 |
| retail-transfer-low | dev-peer0.himbara.paynet-digital-rupiah_3.0-6577345e5a476eadebff5403f2756125454311a1ea7739a34dbea5999be18074 | container_read_service_ms | milliseconds_per_operation | 0 | 0 | 0 |
| retail-transfer-low | dev-peer0.commercial.paynet-digital-rupiah_3.0-6577345e5a476eadebff5403f2756125454311a1ea7739a34dbea5999be18074 | container_read_service_ms | milliseconds_per_operation | 0 | 0 | 0 |
| retail-transfer-low | dev-peer0.pjp.paynet-digital-rupiah_3.0-6577345e5a476eadebff5403f2756125454311a1ea7739a34dbea5999be18074 | container_read_service_ms | milliseconds_per_operation | 0 | 0 | 0 |
| retail-transfer-low | dev-peer0.bi.paynet-digital-rupiah_3.0-6577345e5a476eadebff5403f2756125454311a1ea7739a34dbea5999be18074 | container_read_service_ms | milliseconds_per_operation | 0 | 0 | 0 |
| retail-transfer-low | bi-coin-fabric-postgres | container_write_service_ms | milliseconds_per_operation | 0 | 0 | 0 |
| retail-transfer-low | bi-coin-fabric-cadvisor | container_write_service_ms | milliseconds_per_operation | 0 | 0 | 0 |
| retail-transfer-low | bi-coin-fabric-node-exporter | container_write_service_ms | milliseconds_per_operation | 0 | 0 | 0 |
| retail-transfer-low | bi-coin-fabric-prometheus | container_write_service_ms | milliseconds_per_operation | 0 | 0 | 0 |
| retail-transfer-low | couchdb0.ojk.paynet | container_write_service_ms | milliseconds_per_operation | 0 | 0 | 0 |
| retail-transfer-low | peer0.pjp.paynet | container_write_service_ms | milliseconds_per_operation | 0 | 0 | 0 |
| retail-transfer-low | orderer.paynet | container_write_service_ms | milliseconds_per_operation | 0 | 0 | 0 |
| retail-transfer-low | couchdb0.commercial.paynet | container_write_service_ms | milliseconds_per_operation | 0 | 0 | 0 |
| retail-transfer-low | couchdb0.pjp.paynet | container_write_service_ms | milliseconds_per_operation | 0 | 0 | 0 |
| retail-transfer-low | peer0.ojk.paynet | container_write_service_ms | milliseconds_per_operation | 0 | 0 | 0 |
| retail-transfer-low | couchdb0.himbara.paynet | container_write_service_ms | milliseconds_per_operation | 0 | 0 | 0 |
| retail-transfer-low | couchdb0.bi.paynet | container_write_service_ms | milliseconds_per_operation | 0 | 0 | 0 |
| retail-transfer-low | peer0.bi.paynet | container_write_service_ms | milliseconds_per_operation | 0 | 0 | 0 |
| retail-transfer-low | peer0.himbara.paynet | container_write_service_ms | milliseconds_per_operation | 0 | 0 | 0 |
| retail-transfer-low | peer0.commercial.paynet | container_write_service_ms | milliseconds_per_operation | 0 | 0 | 0 |
| retail-transfer-low | dev-peer0.himbara.paynet-digital-rupiah_3.0-6577345e5a476eadebff5403f2756125454311a1ea7739a34dbea5999be18074 | container_write_service_ms | milliseconds_per_operation | 0 | 0 | 0 |
| retail-transfer-low | dev-peer0.commercial.paynet-digital-rupiah_3.0-6577345e5a476eadebff5403f2756125454311a1ea7739a34dbea5999be18074 | container_write_service_ms | milliseconds_per_operation | 0 | 0 | 0 |
| retail-transfer-low | dev-peer0.pjp.paynet-digital-rupiah_3.0-6577345e5a476eadebff5403f2756125454311a1ea7739a34dbea5999be18074 | container_write_service_ms | milliseconds_per_operation | 0 | 0 | 0 |
| retail-transfer-low | dev-peer0.bi.paynet-digital-rupiah_3.0-6577345e5a476eadebff5403f2756125454311a1ea7739a34dbea5999be18074 | container_write_service_ms | milliseconds_per_operation | 0 | 0 | 0 |
| retail-transfer-low | node-exporter:9100 | host_cpu_busy_percent | % | 44.83791050903215 | 63.0948275862089 | 62.67715517240739 |
| retail-transfer-low | node-exporter:9100 | host_memory_used_bytes | bytes | 5998491238.4 | 6048641024 | 6018497331.2 |
| retail-transfer-low | node-exporter:9100 | host_read_iops | operations_per_second | 0.2924671592775041 | 1.3103448275862069 | 0.7862068965517225 |
| retail-transfer-low | node-exporter:9100 | host_write_iops | operations_per_second | 541.1007389162562 | 1801.4137931034481 | 1687.0809729064038 |
| retail-transfer-low | node-exporter:9100 | host_read_await_ms | milliseconds_per_operation | 0.5314481390630278 | 2.199999999993452 | 2.199999999993451 |
| retail-transfer-low | node-exporter:9100 | host_write_await_ms | milliseconds_per_operation | 3.9993972206575674 | 13.373769513771503 | 11.21596578258746 |
| retail-transfer-low | /peer0.commercial.paynet | caliper_client_cpu_avg | percent | 0.0725 | 0.0725 |  |
| retail-transfer-low | /peer0.commercial.paynet | caliper_client_cpu_max | percent | 0.12125 | 0.12125 |  |
| retail-transfer-low | /peer0.commercial.paynet | caliper_client_memory_avg | bytes | 104 | 104 |  |
| retail-transfer-low | /peer0.commercial.paynet | caliper_client_memory_max | bytes | 108 | 108 |  |
| retail-transfer-low | /peer0.ojk.paynet | caliper_client_cpu_avg | percent | 0.075 | 0.075 |  |
| retail-transfer-low | /peer0.ojk.paynet | caliper_client_cpu_max | percent | 0.1075 | 0.1075 |  |
| retail-transfer-low | /peer0.ojk.paynet | caliper_client_memory_avg | bytes | 112 | 112 |  |
| retail-transfer-low | /peer0.ojk.paynet | caliper_client_memory_max | bytes | 113 | 113 |  |
| retail-transfer-low | /peer0.pjp.paynet | caliper_client_cpu_avg | percent | 0.0775 | 0.0775 |  |
| retail-transfer-low | /peer0.pjp.paynet | caliper_client_cpu_max | percent | 0.115 | 0.115 |  |
| retail-transfer-low | /peer0.pjp.paynet | caliper_client_memory_avg | bytes | 114 | 114 |  |
| retail-transfer-low | /peer0.pjp.paynet | caliper_client_memory_max | bytes | 116 | 116 |  |
| retail-transfer-low | /peer0.bi.paynet | caliper_client_cpu_avg | percent | 0.07375 | 0.07375 |  |
| retail-transfer-low | /peer0.bi.paynet | caliper_client_cpu_max | percent | 0.115 | 0.115 |  |
| retail-transfer-low | /peer0.bi.paynet | caliper_client_memory_avg | bytes | 112 | 112 |  |
| retail-transfer-low | /peer0.bi.paynet | caliper_client_memory_max | bytes | 119 | 119 |  |
| retail-transfer-low | /peer0.himbara.paynet | caliper_client_cpu_avg | percent | 0.245 | 0.245 |  |
| retail-transfer-low | /peer0.himbara.paynet | caliper_client_cpu_max | percent | 0.36875 | 0.36875 |  |
| retail-transfer-low | /peer0.himbara.paynet | caliper_client_memory_avg | bytes | 118 | 118 |  |
| retail-transfer-low | /peer0.himbara.paynet | caliper_client_memory_max | bytes | 121 | 121 |  |
| retail-transfer-low | /couchdb0.pjp.paynet | caliper_client_cpu_avg | percent | 0.53 | 0.53 |  |
| retail-transfer-low | /couchdb0.pjp.paynet | caliper_client_cpu_max | percent | 1.24125 | 1.24125 |  |
| retail-transfer-low | /couchdb0.pjp.paynet | caliper_client_memory_avg | bytes | 54.7 | 54.7 |  |
| retail-transfer-low | /couchdb0.pjp.paynet | caliper_client_memory_max | bytes | 58.2 | 58.2 |  |
| retail-transfer-low | /orderer.paynet | caliper_client_cpu_avg | percent | 0.04125 | 0.04125 |  |
| retail-transfer-low | /orderer.paynet | caliper_client_cpu_max | percent | 0.06625 | 0.06625 |  |
| retail-transfer-low | /orderer.paynet | caliper_client_memory_avg | bytes | 62.6 | 62.6 |  |
| retail-transfer-low | /orderer.paynet | caliper_client_memory_max | bytes | 71.6 | 71.6 |  |
| retail-transfer-low | /couchdb0.himbara.paynet | caliper_client_cpu_avg | percent | 0.47375 | 0.47375 |  |
| retail-transfer-low | /couchdb0.himbara.paynet | caliper_client_cpu_max | percent | 1.0475 | 1.0475 |  |
| retail-transfer-low | /couchdb0.himbara.paynet | caliper_client_memory_avg | bytes | 54.4 | 54.4 |  |
| retail-transfer-low | /couchdb0.himbara.paynet | caliper_client_memory_max | bytes | 58.6 | 58.6 |  |
| retail-transfer-low | /couchdb0.ojk.paynet | caliper_client_cpu_avg | percent | 0.53625 | 0.53625 |  |
| retail-transfer-low | /couchdb0.ojk.paynet | caliper_client_cpu_max | percent | 1.22 | 1.22 |  |
| retail-transfer-low | /couchdb0.ojk.paynet | caliper_client_memory_avg | bytes | 55.5 | 55.5 |  |
| retail-transfer-low | /couchdb0.ojk.paynet | caliper_client_memory_max | bytes | 59.7 | 59.7 |  |
| retail-transfer-low | /couchdb0.commercial.paynet | caliper_client_cpu_avg | percent | 0.5175 | 0.5175 |  |
| retail-transfer-low | /couchdb0.commercial.paynet | caliper_client_cpu_max | percent | 1.25 | 1.25 |  |
| retail-transfer-low | /couchdb0.commercial.paynet | caliper_client_memory_avg | bytes | 55.6 | 55.6 |  |
| retail-transfer-low | /couchdb0.commercial.paynet | caliper_client_memory_max | bytes | 60 | 60 |  |
| retail-transfer-low | /couchdb0.bi.paynet | caliper_client_cpu_avg | percent | 0.53 | 0.53 |  |
| retail-transfer-low | /couchdb0.bi.paynet | caliper_client_cpu_max | percent | 1.17125 | 1.17125 |  |
| retail-transfer-low | /couchdb0.bi.paynet | caliper_client_memory_avg | bytes | 55.5 | 55.5 |  |
| retail-transfer-low | /couchdb0.bi.paynet | caliper_client_memory_max | bytes | 60.2 | 60.2 |  |
| retail-transfer-low | node caliper(sum) | caliper_client_cpu_avg | percent | 34.96 | 34.96 |  |
| retail-transfer-low | node caliper(sum) | caliper_client_cpu_max | percent | 65.05 | 65.05 |  |
| retail-transfer-low | bi-coin-fabric-postgres | container_cpu_percent | % | 0.550585036734922 | 0.891322376357129 | 0.8497321709131956 |
| retail-transfer-low | bi-coin-fabric-cadvisor | container_cpu_percent | % | 44.31684575867849 | 84.06484123269068 | 79.3665078603368 |
| retail-transfer-low | bi-coin-fabric-node-exporter | container_cpu_percent | % | 1.3655722957810166 | 2.5491768873818565 | 2.388442001199416 |
| retail-transfer-low | bi-coin-fabric-prometheus | container_cpu_percent | % | 5.760110544513983 | 10.588513776444945 | 10.085313429249952 |
| retail-transfer-low | orderer.paynet | container_cpu_percent | % | 0.0962721929417094 | 0.3095897742889637 | 0.2749332891639825 |
| retail-transfer-low | couchdb0.commercial.paynet | container_cpu_percent | % | 2.4125983865884075 | 6.7739928227201 | 6.0950096361067425 |
| retail-transfer-low | peer0.commercial.paynet | container_cpu_percent | % | 0.8495077184876432 | 1.7869921783526037 | 1.6472392382147 |
| retail-transfer-low | couchdb0.pjp.paynet | container_cpu_percent | % | 2.8100885672671128 | 6.782392999140393 | 6.520893156972454 |
| retail-transfer-low | peer0.pjp.paynet | container_cpu_percent | % | 0.9414644677811796 | 1.8832398195086193 | 1.6874747853045993 |
| retail-transfer-low | couchdb0.ojk.paynet | container_cpu_percent | % | 2.4452627725946128 | 6.49697963092563 | 6.096942188839416 |
| retail-transfer-low | couchdb0.himbara.paynet | container_cpu_percent | % | 2.6581302660869413 | 6.691064577793913 | 6.015853004972913 |
| retail-transfer-low | couchdb0.bi.paynet | container_cpu_percent | % | 2.897677023638155 | 6.851064453393967 | 6.683620151503651 |
| retail-transfer-low | peer0.ojk.paynet | container_cpu_percent | % | 0.9747312610135879 | 1.9563105919193013 | 1.778494849209248 |
| retail-transfer-low | peer0.bi.paynet | container_cpu_percent | % | 1.032084981905154 | 1.9507789888753406 | 1.7960265399242268 |
| retail-transfer-low | peer0.himbara.paynet | container_cpu_percent | % | 1.1201640328825413 | 3.215209559479229 | 2.6789890266152296 |
| retail-transfer-low | dev-peer0.commercial.paynet-digital-rupiah_3.0-6577345e5a476eadebff5403f2756125454311a1ea7739a34dbea5999be18074 | container_cpu_percent | % | 0 | 0 | 0 |
| retail-transfer-low | dev-peer0.himbara.paynet-digital-rupiah_3.0-6577345e5a476eadebff5403f2756125454311a1ea7739a34dbea5999be18074 | container_cpu_percent | % | 0.2334923432634255 | 0.5844647706671007 | 0.5656422888644627 |
| retail-transfer-low | dev-peer0.bi.paynet-digital-rupiah_3.0-6577345e5a476eadebff5403f2756125454311a1ea7739a34dbea5999be18074 | container_cpu_percent | % | 0.054765484539699566 | 0.06856102276055419 | 0.06387045062968098 |
| retail-transfer-low | dev-peer0.pjp.paynet-digital-rupiah_3.0-6577345e5a476eadebff5403f2756125454311a1ea7739a34dbea5999be18074 | container_cpu_percent | % | 0.00013162411004663752 | 0.0004142740998838365 | 0.00040380952380950476 |
| retail-transfer-low | bi-coin-fabric-postgres | container_memory_working_set_bytes | bytes | 15188155.03196347 | 15638528 | 15638528 |
| retail-transfer-low | bi-coin-fabric-cadvisor | container_memory_working_set_bytes | bytes | 170305339.61643836 | 206254080 | 206254080 |
| retail-transfer-low | bi-coin-fabric-node-exporter | container_memory_working_set_bytes | bytes | 12987200.292237444 | 13041664 | 13041664 |
| retail-transfer-low | bi-coin-fabric-prometheus | container_memory_working_set_bytes | bytes | 421071755.10502285 | 438931456 | 438931456 |
| retail-transfer-low | orderer.paynet | container_memory_working_set_bytes | bytes | 63885910.502283104 | 86056960 | 86056960 |
| retail-transfer-low | couchdb0.commercial.paynet | container_memory_working_set_bytes | bytes | 66256241.388127856 | 77492224 | 77492224 |
| retail-transfer-low | peer0.commercial.paynet | container_memory_working_set_bytes | bytes | 116508625.24200913 | 126656512 | 126656512 |
| retail-transfer-low | couchdb0.pjp.paynet | container_memory_working_set_bytes | bytes | 65956859.32420091 | 77012992 | 77012992 |
| retail-transfer-low | peer0.pjp.paynet | container_memory_working_set_bytes | bytes | 120901519.78082192 | 131641344 | 131641344 |
| retail-transfer-low | couchdb0.ojk.paynet | container_memory_working_set_bytes | bytes | 66868340.89497717 | 78888960 | 78888960 |
| retail-transfer-low | couchdb0.himbara.paynet | container_memory_working_set_bytes | bytes | 65619939.94520548 | 77299712 | 77299712 |
| retail-transfer-low | couchdb0.bi.paynet | container_memory_working_set_bytes | bytes | 63769801.05936073 | 70115328 | 70115328 |
| retail-transfer-low | peer0.ojk.paynet | container_memory_working_set_bytes | bytes | 115843951.05022831 | 128872448 | 128872448 |
| retail-transfer-low | peer0.bi.paynet | container_memory_working_set_bytes | bytes | 126526861.44292237 | 137859072 | 137859072 |
| retail-transfer-low | peer0.himbara.paynet | container_memory_working_set_bytes | bytes | 128577891.36073059 | 142131200 | 142131200 |
| retail-transfer-low | dev-peer0.commercial.paynet-digital-rupiah_3.0-6577345e5a476eadebff5403f2756125454311a1ea7739a34dbea5999be18074 | container_memory_working_set_bytes | bytes | 16977321.497716896 | 16982016 | 16982016 |
| retail-transfer-low | dev-peer0.himbara.paynet-digital-rupiah_3.0-6577345e5a476eadebff5403f2756125454311a1ea7739a34dbea5999be18074 | container_memory_working_set_bytes | bytes | 26816642.92237443 | 27881472 | 27881472 |
| retail-transfer-low | dev-peer0.bi.paynet-digital-rupiah_3.0-6577345e5a476eadebff5403f2756125454311a1ea7739a34dbea5999be18074 | container_memory_working_set_bytes | bytes | 19623655.452054795 | 19636224 | 19636224 |
| retail-transfer-low | dev-peer0.pjp.paynet-digital-rupiah_3.0-6577345e5a476eadebff5403f2756125454311a1ea7739a34dbea5999be18074 | container_memory_working_set_bytes | bytes | 17317289.497716896 | 17321984 | 17321984 |
| retail-transfer-low | bi-coin-fabric-postgres | container_network_receive_bytes_per_second | bytes_per_second | 0 | 0 | 0 |
| retail-transfer-low | bi-coin-fabric-cadvisor | container_network_receive_bytes_per_second | bytes_per_second | 4144.145107139652 | 7834.964903197016 | 7381.164786842114 |
| retail-transfer-low | bi-coin-fabric-node-exporter | container_network_receive_bytes_per_second | bytes_per_second | 350.06106976360536 | 632.7533069186223 | 597.5872142494121 |
| retail-transfer-low | bi-coin-fabric-prometheus | container_network_receive_bytes_per_second | bytes_per_second | 292916.4165330415 | 514483.4786631688 | 500546.2576636358 |
| retail-transfer-low | orderer.paynet | container_network_receive_bytes_per_second | bytes_per_second | 3327.2160098739987 | 15819.817908029387 | 13743.029049573775 |
| retail-transfer-low | couchdb0.commercial.paynet | container_network_receive_bytes_per_second | bytes_per_second | 2611.5663421784575 | 12009.828313732995 | 9819.944851526783 |
| retail-transfer-low | peer0.commercial.paynet | container_network_receive_bytes_per_second | bytes_per_second | 16923.460164399014 | 42820.84926897962 | 36213.517640053906 |
| retail-transfer-low | couchdb0.pjp.paynet | container_network_receive_bytes_per_second | bytes_per_second | 2761.5645000159443 | 10060.238036444143 | 9708.454613906968 |
| retail-transfer-low | peer0.pjp.paynet | container_network_receive_bytes_per_second | bytes_per_second | 19177.332828499853 | 43616.23402679047 | 37319.26109912641 |
| retail-transfer-low | couchdb0.ojk.paynet | container_network_receive_bytes_per_second | bytes_per_second | 2442.6658017249215 | 10181.700983461638 | 9725.276028106313 |
| retail-transfer-low | couchdb0.himbara.paynet | container_network_receive_bytes_per_second | bytes_per_second | 2518.4101173520116 | 11239.276897802078 | 8934.294217523007 |
| retail-transfer-low | couchdb0.bi.paynet | container_network_receive_bytes_per_second | bytes_per_second | 3205.6532411822086 | 10592.285855615486 | 10387.578225549243 |
| retail-transfer-low | peer0.ojk.paynet | container_network_receive_bytes_per_second | bytes_per_second | 18525.77510309836 | 43463.15129896519 | 38412.537120290544 |
| retail-transfer-low | peer0.bi.paynet | container_network_receive_bytes_per_second | bytes_per_second | 29156.96727161252 | 55109.56515233612 | 49223.66229134856 |
| retail-transfer-low | peer0.himbara.paynet | container_network_receive_bytes_per_second | bytes_per_second | 22673.335677837338 | 78189.29909042268 | 61990.667762753976 |
| retail-transfer-low | dev-peer0.commercial.paynet-digital-rupiah_3.0-6577345e5a476eadebff5403f2756125454311a1ea7739a34dbea5999be18074 | container_network_receive_bytes_per_second | bytes_per_second | 2.3379363102554094 | 4.493678632262948 | 4.257796984417387 |
| retail-transfer-low | dev-peer0.himbara.paynet-digital-rupiah_3.0-6577345e5a476eadebff5403f2756125454311a1ea7739a34dbea5999be18074 | container_network_receive_bytes_per_second | bytes_per_second | 6809.4900956840165 | 17566.173038683526 | 17000.09336080126 |
| retail-transfer-low | dev-peer0.bi.paynet-digital-rupiah_3.0-6577345e5a476eadebff5403f2756125454311a1ea7739a34dbea5999be18074 | container_network_receive_bytes_per_second | bytes_per_second | 8643.95427881941 | 10861.629921342203 | 10118.96010522572 |
| retail-transfer-low | dev-peer0.pjp.paynet-digital-rupiah_3.0-6577345e5a476eadebff5403f2756125454311a1ea7739a34dbea5999be18074 | container_network_receive_bytes_per_second | bytes_per_second | 2.0599830715782366 | 4.872053353854047 | 4.8326076908855615 |
| retail-transfer-low | bi-coin-fabric-postgres | container_network_transmit_bytes_per_second | bytes_per_second | 0 | 0 | 0 |
| retail-transfer-low | bi-coin-fabric-cadvisor | container_network_transmit_bytes_per_second | bytes_per_second | 264515.9233494248 | 499272.24618057866 | 469958.30627887795 |
| retail-transfer-low | bi-coin-fabric-node-exporter | container_network_transmit_bytes_per_second | bytes_per_second | 8237.851077191925 | 14782.481446205424 | 13958.659012494367 |
| retail-transfer-low | bi-coin-fabric-prometheus | container_network_transmit_bytes_per_second | bytes_per_second | 27879.65722075592 | 49773.12644155524 | 46934.053173301385 |
| retail-transfer-low | orderer.paynet | container_network_transmit_bytes_per_second | bytes_per_second | 17834.237757084487 | 80315.12330986989 | 66603.5280166627 |
| retail-transfer-low | couchdb0.commercial.paynet | container_network_transmit_bytes_per_second | bytes_per_second | 11908.145035852809 | 22340.85208165359 | 20007.21833884719 |
| retail-transfer-low | peer0.commercial.paynet | container_network_transmit_bytes_per_second | bytes_per_second | 5035.9116549906175 | 16721.684749514174 | 13896.245670204402 |
| retail-transfer-low | couchdb0.pjp.paynet | container_network_transmit_bytes_per_second | bytes_per_second | 12732.342827371005 | 20538.748063529907 | 19819.277043706108 |
| retail-transfer-low | peer0.pjp.paynet | container_network_transmit_bytes_per_second | bytes_per_second | 5696.044066868058 | 17134.219926618684 | 14428.322688818216 |
| retail-transfer-low | couchdb0.ojk.paynet | container_network_transmit_bytes_per_second | bytes_per_second | 11252.351631481148 | 20749.972374673103 | 19819.396203212862 |
| retail-transfer-low | couchdb0.himbara.paynet | container_network_transmit_bytes_per_second | bytes_per_second | 10822.679533862316 | 14623.682319383637 | 13689.809534790471 |
| retail-transfer-low | couchdb0.bi.paynet | container_network_transmit_bytes_per_second | bytes_per_second | 20533.909361592927 | 29786.151937256145 | 29208.441720819457 |
| retail-transfer-low | peer0.ojk.paynet | container_network_transmit_bytes_per_second | bytes_per_second | 5464.12841425344 | 17131.336287015805 | 14675.27236700917 |
| retail-transfer-low | peer0.bi.paynet | container_network_transmit_bytes_per_second | bytes_per_second | 13764.947474862838 | 26238.332071014935 | 23599.490549306633 |
| retail-transfer-low | peer0.himbara.paynet | container_network_transmit_bytes_per_second | bytes_per_second | 13165.797604700254 | 64525.47866350535 | 50881.866504530946 |
| retail-transfer-low | dev-peer0.commercial.paynet-digital-rupiah_3.0-6577345e5a476eadebff5403f2756125454311a1ea7739a34dbea5999be18074 | container_network_transmit_bytes_per_second | bytes_per_second | 2.337378196223954 | 4.4920888272033315 | 4.256002775850103 |
| retail-transfer-low | dev-peer0.himbara.paynet-digital-rupiah_3.0-6577345e5a476eadebff5403f2756125454311a1ea7739a34dbea5999be18074 | container_network_transmit_bytes_per_second | bytes_per_second | 7351.573032619805 | 18972.729837250536 | 18358.367388138016 |
| retail-transfer-low | dev-peer0.bi.paynet-digital-rupiah_3.0-6577345e5a476eadebff5403f2756125454311a1ea7739a34dbea5999be18074 | container_network_transmit_bytes_per_second | bytes_per_second | 486.2206530778864 | 606.9298041922932 | 565.2655610643906 |
| retail-transfer-low | dev-peer0.pjp.paynet-digital-rupiah_3.0-6577345e5a476eadebff5403f2756125454311a1ea7739a34dbea5999be18074 | container_network_transmit_bytes_per_second | bytes_per_second | 2.059326790364191 | 4.871300927707237 | 4.8315908670733965 |
| retail-transfer-low | bi-coin-fabric-postgres | container_read_iops | operations_per_second | 0 | 0 | 0 |
| retail-transfer-low | bi-coin-fabric-cadvisor | container_read_iops | operations_per_second | 0 | 0 | 0 |
| retail-transfer-low | bi-coin-fabric-node-exporter | container_read_iops | operations_per_second | 0 | 0 | 0 |
| retail-transfer-low | bi-coin-fabric-prometheus | container_read_iops | operations_per_second | 0 | 0 | 0 |
| retail-transfer-low | orderer.paynet | container_read_iops | operations_per_second | 0 | 0 | 0 |
| retail-transfer-low | couchdb0.commercial.paynet | container_read_iops | operations_per_second | 0 | 0 | 0 |
| retail-transfer-low | peer0.commercial.paynet | container_read_iops | operations_per_second | 0 | 0 | 0 |
| retail-transfer-low | couchdb0.pjp.paynet | container_read_iops | operations_per_second | 0 | 0 | 0 |
| retail-transfer-low | peer0.pjp.paynet | container_read_iops | operations_per_second | 0 | 0 | 0 |
| retail-transfer-low | couchdb0.ojk.paynet | container_read_iops | operations_per_second | 0 | 0 | 0 |
| retail-transfer-low | couchdb0.himbara.paynet | container_read_iops | operations_per_second | 0.03712382946184344 | 0.1851059728549399 | 0.18101769826355602 |
| retail-transfer-low | couchdb0.bi.paynet | container_read_iops | operations_per_second | 0.02022353133179632 | 0.11323284506059814 | 0.10869631860366666 |
| retail-transfer-low | peer0.ojk.paynet | container_read_iops | operations_per_second | 0 | 0 | 0 |
| retail-transfer-low | peer0.bi.paynet | container_read_iops | operations_per_second | 0 | 0 | 0 |
| retail-transfer-low | peer0.himbara.paynet | container_read_iops | operations_per_second | 0 | 0 | 0 |
| retail-transfer-low | dev-peer0.commercial.paynet-digital-rupiah_3.0-6577345e5a476eadebff5403f2756125454311a1ea7739a34dbea5999be18074 | container_read_iops | operations_per_second | 0 | 0 | 0 |
| retail-transfer-low | dev-peer0.himbara.paynet-digital-rupiah_3.0-6577345e5a476eadebff5403f2756125454311a1ea7739a34dbea5999be18074 | container_read_iops | operations_per_second | 0 | 0 | 0 |
| retail-transfer-low | dev-peer0.bi.paynet-digital-rupiah_3.0-6577345e5a476eadebff5403f2756125454311a1ea7739a34dbea5999be18074 | container_read_iops | operations_per_second | 0 | 0 | 0 |
| retail-transfer-low | dev-peer0.pjp.paynet-digital-rupiah_3.0-6577345e5a476eadebff5403f2756125454311a1ea7739a34dbea5999be18074 | container_read_iops | operations_per_second | 0 | 0 | 0 |
| retail-transfer-low | bi-coin-fabric-postgres | container_write_iops | operations_per_second | 0 | 0 | 0 |
| retail-transfer-low | bi-coin-fabric-cadvisor | container_write_iops | operations_per_second | 0 | 0 | 0 |
| retail-transfer-low | bi-coin-fabric-node-exporter | container_write_iops | operations_per_second | 0 | 0 | 0 |
| retail-transfer-low | bi-coin-fabric-prometheus | container_write_iops | operations_per_second | 0.22807647432158004 | 0.8336150552174892 | 0.7949953387621468 |
| retail-transfer-low | orderer.paynet | container_write_iops | operations_per_second | 1.2602446892829269 | 5.689236874728936 | 4.958341157835955 |
| retail-transfer-low | couchdb0.commercial.paynet | container_write_iops | operations_per_second | 1.5483246206457826 | 9.907309473587052 | 7.669988522261003 |
| retail-transfer-low | peer0.commercial.paynet | container_write_iops | operations_per_second | 1.1109735226957054 | 5.857986425211186 | 4.85030298746978 |
| retail-transfer-low | couchdb0.pjp.paynet | container_write_iops | operations_per_second | 12.548928168694424 | 64.79379087193462 | 62.480291230927534 |
| retail-transfer-low | peer0.pjp.paynet | container_write_iops | operations_per_second | 1.0944846718682704 | 5.697086369290919 | 4.358972100491669 |
| retail-transfer-low | couchdb0.ojk.paynet | container_write_iops | operations_per_second | 1.4334448057811686 | 9.024273453902538 | 7.993337594131391 |
| retail-transfer-low | couchdb0.himbara.paynet | container_write_iops | operations_per_second | 1.9257758653931685 | 10.538219549964632 | 9.119995930520684 |
| retail-transfer-low | couchdb0.bi.paynet | container_write_iops | operations_per_second | 1.8372879258613197 | 9.389365452783515 | 8.763999806430423 |
| retail-transfer-low | peer0.ojk.paynet | container_write_iops | operations_per_second | 1.4413215397720942 | 6.3427730465480225 | 5.300257599781661 |
| retail-transfer-low | peer0.bi.paynet | container_write_iops | operations_per_second | 1.4901490266029704 | 6.758751284048451 | 5.696837397565354 |
| retail-transfer-low | peer0.himbara.paynet | container_write_iops | operations_per_second | 1.3272697295484548 | 6.826134768514146 | 5.321731945133036 |
| retail-transfer-low | dev-peer0.commercial.paynet-digital-rupiah_3.0-6577345e5a476eadebff5403f2756125454311a1ea7739a34dbea5999be18074 | container_write_iops | operations_per_second | 0 | 0 | 0 |
| retail-transfer-low | dev-peer0.himbara.paynet-digital-rupiah_3.0-6577345e5a476eadebff5403f2756125454311a1ea7739a34dbea5999be18074 | container_write_iops | operations_per_second | 0 | 0 | 0 |
| retail-transfer-low | dev-peer0.bi.paynet-digital-rupiah_3.0-6577345e5a476eadebff5403f2756125454311a1ea7739a34dbea5999be18074 | container_write_iops | operations_per_second | 0 | 0 | 0 |
| retail-transfer-low | dev-peer0.pjp.paynet-digital-rupiah_3.0-6577345e5a476eadebff5403f2756125454311a1ea7739a34dbea5999be18074 | container_write_iops | operations_per_second | 0 | 0 | 0 |
| retail-transfer-low | bi-coin-fabric-postgres | container_read_bytes_per_second | bytes_per_second | 0 | 0 | 0 |
| retail-transfer-low | bi-coin-fabric-cadvisor | container_read_bytes_per_second | bytes_per_second | 0 | 0 | 0 |
| retail-transfer-low | bi-coin-fabric-node-exporter | container_read_bytes_per_second | bytes_per_second | 0 | 0 | 0 |
| retail-transfer-low | bi-coin-fabric-prometheus | container_read_bytes_per_second | bytes_per_second | 0 | 0 | 0 |
| retail-transfer-low | couchdb0.pjp.paynet | container_read_bytes_per_second | bytes_per_second | 0 | 0 | 0 |
| retail-transfer-low | orderer.paynet | container_read_bytes_per_second | bytes_per_second | 0 | 0 | 0 |
| retail-transfer-low | couchdb0.himbara.paynet | container_read_bytes_per_second | bytes_per_second | 1215.521440006658 | 3028.4368165177575 | 2987.0501871713186 |
| retail-transfer-low | couchdb0.commercial.paynet | container_read_bytes_per_second | bytes_per_second | 0 | 0 | 0 |
| retail-transfer-low | couchdb0.bi.paynet | container_read_bytes_per_second | bytes_per_second | 662.1748340234177 | 1854.2640927718198 | 1798.5778311805768 |
| retail-transfer-low | peer0.commercial.paynet | container_read_bytes_per_second | bytes_per_second | 0 | 0 | 0 |
| retail-transfer-low | peer0.pjp.paynet | container_read_bytes_per_second | bytes_per_second | 0 | 0 | 0 |
| retail-transfer-low | couchdb0.ojk.paynet | container_read_bytes_per_second | bytes_per_second | 0 | 0 | 0 |
| retail-transfer-low | peer0.bi.paynet | container_read_bytes_per_second | bytes_per_second | 0 | 0 | 0 |
| retail-transfer-low | peer0.ojk.paynet | container_read_bytes_per_second | bytes_per_second | 0 | 0 | 0 |
| retail-transfer-low | peer0.himbara.paynet | container_read_bytes_per_second | bytes_per_second | 0 | 0 | 0 |
| retail-transfer-low | bi-coin-fabric-postgres | container_write_bytes_per_second | bytes_per_second | 0 | 0 | 0 |
| retail-transfer-low | bi-coin-fabric-cadvisor | container_write_bytes_per_second | bytes_per_second | 0 | 0 | 0 |
| retail-transfer-low | bi-coin-fabric-node-exporter | container_write_bytes_per_second | bytes_per_second | 0 | 0 | 0 |
| retail-transfer-low | bi-coin-fabric-prometheus | container_write_bytes_per_second | bytes_per_second | 57957.64949070392 | 105941.25832769889 | 103395.91341625972 |
| retail-transfer-low | couchdb0.pjp.paynet | container_write_bytes_per_second | bytes_per_second | 396100.5004364763 | 1033451.8119735307 | 1009496.2683034774 |
| retail-transfer-low | orderer.paynet | container_write_bytes_per_second | bytes_per_second | 27523.353901123464 | 71137.42899361727 | 65450.16988003176 |
| retail-transfer-low | couchdb0.himbara.paynet | container_write_bytes_per_second | bytes_per_second | 48015.68045261411 | 135410.81644292353 | 127271.10836327971 |
| retail-transfer-low | couchdb0.commercial.paynet | container_write_bytes_per_second | bytes_per_second | 39963.72502190254 | 129620.88229752878 | 118262.73150439742 |
| retail-transfer-low | couchdb0.bi.paynet | container_write_bytes_per_second | bytes_per_second | 46675.60973063333 | 125372.9841838166 | 122878.75469440491 |
| retail-transfer-low | peer0.commercial.paynet | container_write_bytes_per_second | bytes_per_second | 22211.39070445475 | 59176.29999301242 | 54045.32687386954 |
| retail-transfer-low | peer0.pjp.paynet | container_write_bytes_per_second | bytes_per_second | 20153.732490908245 | 56005.36673419821 | 49563.46855422387 |
| retail-transfer-low | couchdb0.ojk.paynet | container_write_bytes_per_second | bytes_per_second | 37648.67285240019 | 121903.86386238904 | 116274.21033150818 |
| retail-transfer-low | peer0.bi.paynet | container_write_bytes_per_second | bytes_per_second | 29643.291411403123 | 67864.33744003071 | 62201.723633164016 |
| retail-transfer-low | peer0.ojk.paynet | container_write_bytes_per_second | bytes_per_second | 28679.999808471413 | 63699.0534920115 | 58176.30425610493 |
| retail-transfer-low | peer0.himbara.paynet | container_write_bytes_per_second | bytes_per_second | 26575.79599232337 | 69301.29752822976 | 63906.3648392684 |
| retail-transfer-low | bi-coin-fabric-postgres | container_read_service_ms | milliseconds_per_operation | 0 | 0 | 0 |
| retail-transfer-low | bi-coin-fabric-cadvisor | container_read_service_ms | milliseconds_per_operation | 0 | 0 | 0 |
| retail-transfer-low | bi-coin-fabric-node-exporter | container_read_service_ms | milliseconds_per_operation | 0 | 0 | 0 |
| retail-transfer-low | bi-coin-fabric-prometheus | container_read_service_ms | milliseconds_per_operation | 0 | 0 | 0 |
| retail-transfer-low | orderer.paynet | container_read_service_ms | milliseconds_per_operation | 0 | 0 | 0 |
| retail-transfer-low | couchdb0.commercial.paynet | container_read_service_ms | milliseconds_per_operation | 0 | 0 | 0 |
| retail-transfer-low | peer0.commercial.paynet | container_read_service_ms | milliseconds_per_operation | 0 | 0 | 0 |
| retail-transfer-low | couchdb0.pjp.paynet | container_read_service_ms | milliseconds_per_operation | 0 | 0 | 0 |
| retail-transfer-low | peer0.pjp.paynet | container_read_service_ms | milliseconds_per_operation | 0 | 0 | 0 |
| retail-transfer-low | couchdb0.ojk.paynet | container_read_service_ms | milliseconds_per_operation | 0 | 0 | 0 |
| retail-transfer-low | couchdb0.himbara.paynet | container_read_service_ms | milliseconds_per_operation | 0 | 0 | 0 |
| retail-transfer-low | couchdb0.bi.paynet | container_read_service_ms | milliseconds_per_operation | 0 | 0 | 0 |
| retail-transfer-low | peer0.ojk.paynet | container_read_service_ms | milliseconds_per_operation | 0 | 0 | 0 |
| retail-transfer-low | peer0.bi.paynet | container_read_service_ms | milliseconds_per_operation | 0 | 0 | 0 |
| retail-transfer-low | peer0.himbara.paynet | container_read_service_ms | milliseconds_per_operation | 0 | 0 | 0 |
| retail-transfer-low | dev-peer0.commercial.paynet-digital-rupiah_3.0-6577345e5a476eadebff5403f2756125454311a1ea7739a34dbea5999be18074 | container_read_service_ms | milliseconds_per_operation | 0 | 0 | 0 |
| retail-transfer-low | dev-peer0.himbara.paynet-digital-rupiah_3.0-6577345e5a476eadebff5403f2756125454311a1ea7739a34dbea5999be18074 | container_read_service_ms | milliseconds_per_operation | 0 | 0 | 0 |
| retail-transfer-low | dev-peer0.bi.paynet-digital-rupiah_3.0-6577345e5a476eadebff5403f2756125454311a1ea7739a34dbea5999be18074 | container_read_service_ms | milliseconds_per_operation | 0 | 0 | 0 |
| retail-transfer-low | dev-peer0.pjp.paynet-digital-rupiah_3.0-6577345e5a476eadebff5403f2756125454311a1ea7739a34dbea5999be18074 | container_read_service_ms | milliseconds_per_operation | 0 | 0 | 0 |
| retail-transfer-low | bi-coin-fabric-postgres | container_write_service_ms | milliseconds_per_operation | 0 | 0 | 0 |
| retail-transfer-low | bi-coin-fabric-cadvisor | container_write_service_ms | milliseconds_per_operation | 0 | 0 | 0 |
| retail-transfer-low | bi-coin-fabric-node-exporter | container_write_service_ms | milliseconds_per_operation | 0 | 0 | 0 |
| retail-transfer-low | bi-coin-fabric-prometheus | container_write_service_ms | milliseconds_per_operation | 0 | 0 | 0 |
| retail-transfer-low | orderer.paynet | container_write_service_ms | milliseconds_per_operation | 0 | 0 | 0 |
| retail-transfer-low | couchdb0.commercial.paynet | container_write_service_ms | milliseconds_per_operation | 0 | 0 | 0 |
| retail-transfer-low | peer0.commercial.paynet | container_write_service_ms | milliseconds_per_operation | 0 | 0 | 0 |
| retail-transfer-low | couchdb0.pjp.paynet | container_write_service_ms | milliseconds_per_operation | 0 | 0 | 0 |
| retail-transfer-low | peer0.pjp.paynet | container_write_service_ms | milliseconds_per_operation | 0 | 0 | 0 |
| retail-transfer-low | couchdb0.ojk.paynet | container_write_service_ms | milliseconds_per_operation | 0 | 0 | 0 |
| retail-transfer-low | couchdb0.himbara.paynet | container_write_service_ms | milliseconds_per_operation | 0 | 0 | 0 |
| retail-transfer-low | couchdb0.bi.paynet | container_write_service_ms | milliseconds_per_operation | 0 | 0 | 0 |
| retail-transfer-low | peer0.ojk.paynet | container_write_service_ms | milliseconds_per_operation | 0 | 0 | 0 |
| retail-transfer-low | peer0.bi.paynet | container_write_service_ms | milliseconds_per_operation | 0 | 0 | 0 |
| retail-transfer-low | peer0.himbara.paynet | container_write_service_ms | milliseconds_per_operation | 0 | 0 | 0 |
| retail-transfer-low | dev-peer0.commercial.paynet-digital-rupiah_3.0-6577345e5a476eadebff5403f2756125454311a1ea7739a34dbea5999be18074 | container_write_service_ms | milliseconds_per_operation | 0 | 0 | 0 |
| retail-transfer-low | dev-peer0.himbara.paynet-digital-rupiah_3.0-6577345e5a476eadebff5403f2756125454311a1ea7739a34dbea5999be18074 | container_write_service_ms | milliseconds_per_operation | 0 | 0 | 0 |
| retail-transfer-low | dev-peer0.bi.paynet-digital-rupiah_3.0-6577345e5a476eadebff5403f2756125454311a1ea7739a34dbea5999be18074 | container_write_service_ms | milliseconds_per_operation | 0 | 0 | 0 |
| retail-transfer-low | dev-peer0.pjp.paynet-digital-rupiah_3.0-6577345e5a476eadebff5403f2756125454311a1ea7739a34dbea5999be18074 | container_write_service_ms | milliseconds_per_operation | 0 | 0 | 0 |
| retail-transfer-low | node-exporter:9100 | host_cpu_busy_percent | % | 93.7176470349754 | 98.8620689655175 | 98.75431034482502 |
| retail-transfer-low | node-exporter:9100 | host_memory_used_bytes | bytes | 6126485504 | 6495678464 | 6374334464 |
| retail-transfer-low | node-exporter:9100 | host_read_iops | operations_per_second | 5.278213684352827 | 25.068965517241377 | 21.548275862068962 |
| retail-transfer-low | node-exporter:9100 | host_write_iops | operations_per_second | 1440.6442492568146 | 3768.7586206896553 | 3373.444827586207 |
| retail-transfer-low | node-exporter:9100 | host_read_await_ms | milliseconds_per_operation | 0.08616152520074477 | 0.3571428571506528 | 0.19141079767117503 |
| retail-transfer-low | node-exporter:9100 | host_write_await_ms | milliseconds_per_operation | 1.5086999174395512 | 13.411861329645484 | 5.201872849130962 |
| retail-transfer-low | /peer0.commercial.paynet | caliper_client_cpu_avg | percent | 0.1375 | 0.1375 |  |
| retail-transfer-low | /peer0.commercial.paynet | caliper_client_cpu_max | percent | 0.35375 | 0.35375 |  |
| retail-transfer-low | /peer0.commercial.paynet | caliper_client_memory_avg | bytes | 120 | 120 |  |
| retail-transfer-low | /peer0.commercial.paynet | caliper_client_memory_max | bytes | 129 | 129 |  |
| retail-transfer-low | /peer0.pjp.paynet | caliper_client_cpu_avg | percent | 0.13875 | 0.13875 |  |
| retail-transfer-low | /peer0.pjp.paynet | caliper_client_cpu_max | percent | 0.2 | 0.2 |  |
| retail-transfer-low | /peer0.pjp.paynet | caliper_client_memory_avg | bytes | 123 | 123 |  |
| retail-transfer-low | /peer0.pjp.paynet | caliper_client_memory_max | bytes | 132 | 132 |  |
| retail-transfer-low | /peer0.ojk.paynet | caliper_client_cpu_avg | percent | 0.13875 | 0.13875 |  |
| retail-transfer-low | /peer0.ojk.paynet | caliper_client_cpu_max | percent | 0.2025 | 0.2025 |  |
| retail-transfer-low | /peer0.ojk.paynet | caliper_client_memory_avg | bytes | 118 | 118 |  |
| retail-transfer-low | /peer0.ojk.paynet | caliper_client_memory_max | bytes | 127 | 127 |  |
| retail-transfer-low | /peer0.himbara.paynet | caliper_client_cpu_avg | percent | 0.41125 | 0.41125 |  |
| retail-transfer-low | /peer0.himbara.paynet | caliper_client_cpu_max | percent | 0.63875 | 0.63875 |  |
| retail-transfer-low | /peer0.himbara.paynet | caliper_client_memory_avg | bytes | 137 | 137 |  |
| retail-transfer-low | /peer0.himbara.paynet | caliper_client_memory_max | bytes | 157 | 157 |  |
| retail-transfer-low | /peer0.bi.paynet | caliper_client_cpu_avg | percent | 0.13625 | 0.13625 |  |
| retail-transfer-low | /peer0.bi.paynet | caliper_client_cpu_max | percent | 0.21 | 0.21 |  |
| retail-transfer-low | /peer0.bi.paynet | caliper_client_memory_avg | bytes | 127 | 127 |  |
| retail-transfer-low | /peer0.bi.paynet | caliper_client_memory_max | bytes | 134 | 134 |  |
| retail-transfer-low | /couchdb0.commercial.paynet | caliper_client_cpu_avg | percent | 1.47125 | 1.47125 |  |
| retail-transfer-low | /couchdb0.commercial.paynet | caliper_client_cpu_max | percent | 2.52 | 2.52 |  |
| retail-transfer-low | /couchdb0.commercial.paynet | caliper_client_memory_avg | bytes | 71.3 | 71.3 |  |
| retail-transfer-low | /couchdb0.commercial.paynet | caliper_client_memory_max | bytes | 89.5 | 89.5 |  |
| retail-transfer-low | /couchdb0.pjp.paynet | caliper_client_cpu_avg | percent | 1.46125 | 1.46125 |  |
| retail-transfer-low | /couchdb0.pjp.paynet | caliper_client_cpu_max | percent | 2.2475 | 2.2475 |  |
| retail-transfer-low | /couchdb0.pjp.paynet | caliper_client_memory_avg | bytes | 71.9 | 71.9 |  |
| retail-transfer-low | /couchdb0.pjp.paynet | caliper_client_memory_max | bytes | 89.8 | 89.8 |  |
| retail-transfer-low | /couchdb0.ojk.paynet | caliper_client_cpu_avg | percent | 1.47625 | 1.47625 |  |
| retail-transfer-low | /couchdb0.ojk.paynet | caliper_client_cpu_max | percent | 2.74125 | 2.74125 |  |
| retail-transfer-low | /couchdb0.ojk.paynet | caliper_client_memory_avg | bytes | 70.8 | 70.8 |  |
| retail-transfer-low | /couchdb0.ojk.paynet | caliper_client_memory_max | bytes | 85 | 85 |  |
| retail-transfer-low | /orderer.paynet | caliper_client_cpu_avg | percent | 0.08125 | 0.08125 |  |
| retail-transfer-low | /orderer.paynet | caliper_client_cpu_max | percent | 0.27875 | 0.27875 |  |
| retail-transfer-low | /orderer.paynet | caliper_client_memory_avg | bytes | 66.8 | 66.8 |  |
| retail-transfer-low | /orderer.paynet | caliper_client_memory_max | bytes | 90.7 | 90.7 |  |
| retail-transfer-low | /couchdb0.himbara.paynet | caliper_client_cpu_avg | percent | 1.38875 | 1.38875 |  |
| retail-transfer-low | /couchdb0.himbara.paynet | caliper_client_cpu_max | percent | 2.47375 | 2.47375 |  |
| retail-transfer-low | /couchdb0.himbara.paynet | caliper_client_memory_avg | bytes | 71.6 | 71.6 |  |
| retail-transfer-low | /couchdb0.himbara.paynet | caliper_client_memory_max | bytes | 89.1 | 89.1 |  |
| retail-transfer-low | /couchdb0.bi.paynet | caliper_client_cpu_avg | percent | 1.42625 | 1.42625 |  |
| retail-transfer-low | /couchdb0.bi.paynet | caliper_client_cpu_max | percent | 2.0575 | 2.0575 |  |
| retail-transfer-low | /couchdb0.bi.paynet | caliper_client_memory_avg | bytes | 71.2 | 71.2 |  |
| retail-transfer-low | /couchdb0.bi.paynet | caliper_client_memory_max | bytes | 93.1 | 93.1 |  |
| retail-transfer-low | node caliper(sum) | caliper_client_cpu_avg | percent | 50.47 | 50.47 |  |
| retail-transfer-low | node caliper(sum) | caliper_client_cpu_max | percent | 90 | 90 |  |
| retail-transfer-low | bi-coin-fabric-postgres | container_cpu_percent | % | 0.8654858879210465 | 1.0723542737961835 | 0.997661518152591 |
| retail-transfer-low | bi-coin-fabric-cadvisor | container_cpu_percent | % | 86.30129307238175 | 93.16073890564458 | 90.92783662689193 |
| retail-transfer-low | bi-coin-fabric-node-exporter | container_cpu_percent | % | 2.691311475442962 | 3.009331041498599 | 2.855889928963816 |
| retail-transfer-low | bi-coin-fabric-prometheus | container_cpu_percent | % | 10.873173651483079 | 12.201572807443926 | 11.632245467690488 |
| retail-transfer-low | orderer.paynet | container_cpu_percent | % | 0.5475756734619199 | 0.7098078760216536 | 0.6581336798026403 |
| retail-transfer-low | couchdb0.commercial.paynet | container_cpu_percent | % | 5.999739487611504 | 7.7354359082004 | 7.19940865099387 |
| retail-transfer-low | couchdb0.pjp.paynet | container_cpu_percent | % | 5.910791043485095 | 7.916634101382488 | 7.087038561122568 |
| retail-transfer-low | peer0.ojk.paynet | container_cpu_percent | % | 1.9788027310482335 | 4.579931543865971 | 2.1326135313630523 |
| retail-transfer-low | couchdb0.ojk.paynet | container_cpu_percent | % | 5.9026918405502355 | 7.73242287569908 | 7.12752094993783 |
| retail-transfer-low | couchdb0.himbara.paynet | container_cpu_percent | % | 7.839851267968463 | 10.437983223273248 | 9.747900440734162 |
| retail-transfer-low | peer0.pjp.paynet | container_cpu_percent | % | 2.0668737951295975 | 5.222686567164179 | 2.211205190886139 |
| retail-transfer-low | couchdb0.bi.paynet | container_cpu_percent | % | 6.045783888409698 | 7.683047522162484 | 7.187799024696394 |
| retail-transfer-low | peer0.commercial.paynet | container_cpu_percent | % | 2.136417771279843 | 5.701612271770899 | 2.2964284426548183 |
| retail-transfer-low | peer0.bi.paynet | container_cpu_percent | % | 2.1105265238970023 | 4.898082388699547 | 2.2528116827129154 |
| retail-transfer-low | peer0.himbara.paynet | container_cpu_percent | % | 3.447433611436408 | 5.932195701044524 | 3.875470907541795 |
| retail-transfer-low | dev-peer0.himbara.paynet-digital-rupiah_3.0-6577345e5a476eadebff5403f2756125454311a1ea7739a34dbea5999be18074 | container_cpu_percent | % | 0.37162019604588686 | 0.7650311098749353 | 0.45848010587774574 |
| retail-transfer-low | dev-peer0.bi.paynet-digital-rupiah_3.0-6577345e5a476eadebff5403f2756125454311a1ea7739a34dbea5999be18074 | container_cpu_percent | % | 0.04050162404886954 | 0.7450001577849551 | 0.04198729328634337 |
| retail-transfer-low | dev-peer0.commercial.paynet-digital-rupiah_3.0-6577345e5a476eadebff5403f2756125454311a1ea7739a34dbea5999be18074 | container_cpu_percent | % | 0.03583218973158461 | 0.6638133333333333 | 0.037844652970112955 |
| retail-transfer-low | dev-peer0.pjp.paynet-digital-rupiah_3.0-6577345e5a476eadebff5403f2756125454311a1ea7739a34dbea5999be18074 | container_cpu_percent | % | 0.03737185750029624 | 0.744301761956131 | 0.04243367901004014 |
| retail-transfer-low | bi-coin-fabric-postgres | container_memory_working_set_bytes | bytes | 15762515.027027028 | 20623360 | 16076800 |
| retail-transfer-low | bi-coin-fabric-cadvisor | container_memory_working_set_bytes | bytes | 152626369.72972974 | 173490176 | 170392576 |
| retail-transfer-low | bi-coin-fabric-node-exporter | container_memory_working_set_bytes | bytes | 13454773.275675675 | 14520320 | 14245888 |
| retail-transfer-low | bi-coin-fabric-prometheus | container_memory_working_set_bytes | bytes | 431468134.4 | 476336128 | 457052364.8 |
| retail-transfer-low | orderer.paynet | container_memory_working_set_bytes | bytes | 57833415.38861789 | 77996032 | 77996032 |
| retail-transfer-low | couchdb0.commercial.paynet | container_memory_working_set_bytes | bytes | 70641657.35064936 | 93466624 | 93466624 |
| retail-transfer-low | peer0.commercial.paynet | container_memory_working_set_bytes | bytes | 124496009.05544934 | 237412352 | 126656512 |
| retail-transfer-low | couchdb0.pjp.paynet | container_memory_working_set_bytes | bytes | 69328316.56585366 | 92164096 | 92164096 |
| retail-transfer-low | peer0.pjp.paynet | container_memory_working_set_bytes | bytes | 123284008.1376673 | 243204096 | 241157734.4 |
| retail-transfer-low | couchdb0.ojk.paynet | container_memory_working_set_bytes | bytes | 64978265.766233765 | 79671296 | 79671296 |
| retail-transfer-low | couchdb0.himbara.paynet | container_memory_working_set_bytes | bytes | 57831058.28571428 | 61853696 | 61853696 |
| retail-transfer-low | couchdb0.bi.paynet | container_memory_working_set_bytes | bytes | 67438296.58346839 | 86269952 | 86269952 |
| retail-transfer-low | peer0.ojk.paynet | container_memory_working_set_bytes | bytes | 127770631.83173996 | 232476672 | 230592102.4 |
| retail-transfer-low | peer0.bi.paynet | container_memory_working_set_bytes | bytes | 130086745.2247557 | 235917312 | 134549504 |
| retail-transfer-low | peer0.himbara.paynet | container_memory_working_set_bytes | bytes | 137008571.62214983 | 249446400 | 156811264 |
| retail-transfer-low | dev-peer0.commercial.paynet-digital-rupiah_3.0-6577345e5a476eadebff5403f2756125454311a1ea7739a34dbea5999be18074 | container_memory_working_set_bytes | bytes | 17783453.53846154 | 19185664 | 18735104 |
| retail-transfer-low | dev-peer0.himbara.paynet-digital-rupiah_3.0-6577345e5a476eadebff5403f2756125454311a1ea7739a34dbea5999be18074 | container_memory_working_set_bytes | bytes | 25990208.611854684 | 27881472 | 27881472 |
| retail-transfer-low | dev-peer0.bi.paynet-digital-rupiah_3.0-6577345e5a476eadebff5403f2756125454311a1ea7739a34dbea5999be18074 | container_memory_working_set_bytes | bytes | 19105823.38697318 | 19652608 | 19636224 |
| retail-transfer-low | dev-peer0.pjp.paynet-digital-rupiah_3.0-6577345e5a476eadebff5403f2756125454311a1ea7739a34dbea5999be18074 | container_memory_working_set_bytes | bytes | 17851592.091954023 | 19795968 | 19759104 |
| retail-transfer-low | bi-coin-fabric-postgres | container_network_receive_bytes_per_second | bytes_per_second | 0 | 0 | 0 |
| retail-transfer-low | bi-coin-fabric-cadvisor | container_network_receive_bytes_per_second | bytes_per_second | 7747.044993662914 | 8266.492896214986 | 8111.188170236786 |
| retail-transfer-low | bi-coin-fabric-node-exporter | container_network_receive_bytes_per_second | bytes_per_second | 677.4587039421737 | 749.6306718255364 | 712.6412816715025 |
| retail-transfer-low | bi-coin-fabric-prometheus | container_network_receive_bytes_per_second | bytes_per_second | 517313.4020373856 | 547671.0545614549 | 541905.5504650812 |
| retail-transfer-low | orderer.paynet | container_network_receive_bytes_per_second | bytes_per_second | 16496.916313709517 | 21309.940265407597 | 20369.61513566656 |
| retail-transfer-low | couchdb0.commercial.paynet | container_network_receive_bytes_per_second | bytes_per_second | 6645.73372935763 | 8392.482172931523 | 7954.648852493475 |
| retail-transfer-low | couchdb0.pjp.paynet | container_network_receive_bytes_per_second | bytes_per_second | 6622.365409325155 | 8389.744686920554 | 7833.164988593536 |
| retail-transfer-low | peer0.ojk.paynet | container_network_receive_bytes_per_second | bytes_per_second | 30868.832858728747 | 387153.3963189816 | 33330.3855319668 |
| retail-transfer-low | couchdb0.ojk.paynet | container_network_receive_bytes_per_second | bytes_per_second | 6600.365664507944 | 8445.27114036343 | 7856.770645197421 |
| retail-transfer-low | couchdb0.himbara.paynet | container_network_receive_bytes_per_second | bytes_per_second | 8294.023684474163 | 10565.479930191972 | 10092.472998063122 |
| retail-transfer-low | peer0.pjp.paynet | container_network_receive_bytes_per_second | bytes_per_second | 31805.418434957646 | 378364.90801804926 | 33447.22134305779 |
| retail-transfer-low | couchdb0.bi.paynet | container_network_receive_bytes_per_second | bytes_per_second | 6618.015101113802 | 8400.51165434906 | 7889.830694063147 |
| retail-transfer-low | peer0.commercial.paynet | container_network_receive_bytes_per_second | bytes_per_second | 29015.933356563284 | 381426.3925925926 | 33034.95858393679 |
| retail-transfer-low | peer0.bi.paynet | container_network_receive_bytes_per_second | bytes_per_second | 28694.046018655084 | 35410.22021456804 | 33606.73303367456 |
| retail-transfer-low | peer0.himbara.paynet | container_network_receive_bytes_per_second | bytes_per_second | 63082.783128290816 | 382886.1784313726 | 75604.04797423552 |
| retail-transfer-low | dev-peer0.himbara.paynet-digital-rupiah_3.0-6577345e5a476eadebff5403f2756125454311a1ea7739a34dbea5999be18074 | container_network_receive_bytes_per_second | bytes_per_second | 10645.8466278046 | 14095.3135452977 | 13330.16686822879 |
| retail-transfer-low | dev-peer0.bi.paynet-digital-rupiah_3.0-6577345e5a476eadebff5403f2756125454311a1ea7739a34dbea5999be18074 | container_network_receive_bytes_per_second | bytes_per_second | 112.31122725816374 | 1633.59974219346 | 1019.3555523160588 |
| retail-transfer-low | dev-peer0.commercial.paynet-digital-rupiah_3.0-6577345e5a476eadebff5403f2756125454311a1ea7739a34dbea5999be18074 | container_network_receive_bytes_per_second | bytes_per_second | 52.20280549443721 | 782.8347434032081 | 211.21577778266433 |
| retail-transfer-low | dev-peer0.pjp.paynet-digital-rupiah_3.0-6577345e5a476eadebff5403f2756125454311a1ea7739a34dbea5999be18074 | container_network_receive_bytes_per_second | bytes_per_second | 39.72449420106502 | 524.6052763508623 | 177.9407373083943 |
| retail-transfer-low | bi-coin-fabric-postgres | container_network_transmit_bytes_per_second | bytes_per_second | 0 | 0 | 0 |
| retail-transfer-low | bi-coin-fabric-cadvisor | container_network_transmit_bytes_per_second | bytes_per_second | 495758.1160042484 | 526993.4689241472 | 519698.86392322043 |
| retail-transfer-low | bi-coin-fabric-node-exporter | container_network_transmit_bytes_per_second | bytes_per_second | 15760.19484643621 | 16816.2647383607 | 16557.433266617936 |
| retail-transfer-low | bi-coin-fabric-prometheus | container_network_transmit_bytes_per_second | bytes_per_second | 48173.47033958371 | 53053.17787080925 | 52267.920588217035 |
| retail-transfer-low | orderer.paynet | container_network_transmit_bytes_per_second | bytes_per_second | 75166.2530827642 | 96799.72336501633 | 92991.58871035857 |
| retail-transfer-low | couchdb0.commercial.paynet | container_network_transmit_bytes_per_second | bytes_per_second | 7466.183554534023 | 9897.194252338122 | 9049.61372848872 |
| retail-transfer-low | couchdb0.pjp.paynet | container_network_transmit_bytes_per_second | bytes_per_second | 7464.52677940267 | 9743.592455490922 | 9038.642542835436 |
| retail-transfer-low | peer0.ojk.paynet | container_network_transmit_bytes_per_second | bytes_per_second | 12380.92330240175 | 14612.738359592542 | 13965.567004820807 |
| retail-transfer-low | couchdb0.ojk.paynet | container_network_transmit_bytes_per_second | bytes_per_second | 7427.251717893407 | 9937.558415414482 | 9057.809460494796 |
| retail-transfer-low | couchdb0.himbara.paynet | container_network_transmit_bytes_per_second | bytes_per_second | 9146.69936047214 | 12047.97421386005 | 11511.949760689446 |
| retail-transfer-low | peer0.pjp.paynet | container_network_transmit_bytes_per_second | bytes_per_second | 12414.37010200214 | 14635.807300932185 | 13899.636603465584 |
| retail-transfer-low | couchdb0.bi.paynet | container_network_transmit_bytes_per_second | bytes_per_second | 7407.979900045828 | 9709.761327287426 | 9057.901006156328 |
| retail-transfer-low | peer0.commercial.paynet | container_network_transmit_bytes_per_second | bytes_per_second | 12570.542172859588 | 14774.679000414191 | 13966.433403106752 |
| retail-transfer-low | peer0.bi.paynet | container_network_transmit_bytes_per_second | bytes_per_second | 13292.688323230863 | 15705.256268944611 | 14755.98943512694 |
| retail-transfer-low | peer0.himbara.paynet | container_network_transmit_bytes_per_second | bytes_per_second | 55597.78770242943 | 69997.35803860787 | 67625.05622812928 |
| retail-transfer-low | dev-peer0.himbara.paynet-digital-rupiah_3.0-6577345e5a476eadebff5403f2756125454311a1ea7739a34dbea5999be18074 | container_network_transmit_bytes_per_second | bytes_per_second | 8108.619999599637 | 10510.193303052709 | 9941.448169211126 |
| retail-transfer-low | dev-peer0.bi.paynet-digital-rupiah_3.0-6577345e5a476eadebff5403f2756125454311a1ea7739a34dbea5999be18074 | container_network_transmit_bytes_per_second | bytes_per_second | 86.5159635514853 | 1265.4907978849342 | 887.5782855689113 |
| retail-transfer-low | dev-peer0.commercial.paynet-digital-rupiah_3.0-6577345e5a476eadebff5403f2756125454311a1ea7739a34dbea5999be18074 | container_network_transmit_bytes_per_second | bytes_per_second | 25.11011526429397 | 403.7699735948699 | 13.26939770989211 |
| retail-transfer-low | dev-peer0.pjp.paynet-digital-rupiah_3.0-6577345e5a476eadebff5403f2756125454311a1ea7739a34dbea5999be18074 | container_network_transmit_bytes_per_second | bytes_per_second | 12.75795986945887 | 138.7156066303024 | 14.447745071563599 |
| retail-transfer-low | bi-coin-fabric-postgres | container_read_iops | operations_per_second | 0 | 0 | 0 |
| retail-transfer-low | bi-coin-fabric-cadvisor | container_read_iops | operations_per_second | 0 | 0 | 0 |
| retail-transfer-low | bi-coin-fabric-node-exporter | container_read_iops | operations_per_second | 0 | 0 | 0 |
| retail-transfer-low | bi-coin-fabric-prometheus | container_read_iops | operations_per_second | 0 | 0 | 0 |
| retail-transfer-low | orderer.paynet | container_read_iops | operations_per_second | 0 | 0 | 0 |
| retail-transfer-low | couchdb0.commercial.paynet | container_read_iops | operations_per_second | 0.0011660040300992209 | 0.035260905527385186 | 0 |
| retail-transfer-low | couchdb0.pjp.paynet | container_read_iops | operations_per_second | 0.012086730390412916 | 0.25338416389606044 | 0.10497215217667366 |
| retail-transfer-low | peer0.ojk.paynet | container_read_iops | operations_per_second | 0 | 0 | 0 |
| retail-transfer-low | couchdb0.ojk.paynet | container_read_iops | operations_per_second | 0.01686873805910285 | 0.2933626696002934 | 0.10662369061776808 |
| retail-transfer-low | couchdb0.himbara.paynet | container_read_iops | operations_per_second | 0.008380478708799172 | 0.24546756549867893 | 0.03985518428759185 |
| retail-transfer-low | peer0.pjp.paynet | container_read_iops | operations_per_second | 0 | 0 | 0 |
| retail-transfer-low | couchdb0.bi.paynet | container_read_iops | operations_per_second | 0.012445310949029304 | 0.27912728969781825 | 0.10565026092258202 |
| retail-transfer-low | peer0.commercial.paynet | container_read_iops | operations_per_second | 0 | 0 | 0 |
| retail-transfer-low | peer0.bi.paynet | container_read_iops | operations_per_second | 0 | 0 | 0 |
| retail-transfer-low | peer0.himbara.paynet | container_read_iops | operations_per_second | 0 | 0 | 0 |
| retail-transfer-low | dev-peer0.himbara.paynet-digital-rupiah_3.0-6577345e5a476eadebff5403f2756125454311a1ea7739a34dbea5999be18074 | container_read_iops | operations_per_second | 0 | 0 | 0 |
| retail-transfer-low | dev-peer0.bi.paynet-digital-rupiah_3.0-6577345e5a476eadebff5403f2756125454311a1ea7739a34dbea5999be18074 | container_read_iops | operations_per_second | 0 | 0 | 0 |
| retail-transfer-low | dev-peer0.commercial.paynet-digital-rupiah_3.0-6577345e5a476eadebff5403f2756125454311a1ea7739a34dbea5999be18074 | container_read_iops | operations_per_second | 0 | 0 | 0 |
| retail-transfer-low | dev-peer0.pjp.paynet-digital-rupiah_3.0-6577345e5a476eadebff5403f2756125454311a1ea7739a34dbea5999be18074 | container_read_iops | operations_per_second | 0 | 0 | 0 |
| retail-transfer-low | bi-coin-fabric-postgres | container_write_iops | operations_per_second | 0 | 0 | 0 |
| retail-transfer-low | bi-coin-fabric-cadvisor | container_write_iops | operations_per_second | 0 | 0 | 0 |
| retail-transfer-low | bi-coin-fabric-node-exporter | container_write_iops | operations_per_second | 0 | 0 | 0 |
| retail-transfer-low | bi-coin-fabric-prometheus | container_write_iops | operations_per_second | 0.41337682186253555 | 2.1235281736076987 | 1.001226292380593 |
| retail-transfer-low | orderer.paynet | container_write_iops | operations_per_second | 4.9730174413678405 | 58.30862124406017 | 10.39063627768801 |
| retail-transfer-low | couchdb0.commercial.paynet | container_write_iops | operations_per_second | 6.796409577647627 | 23.608162090186056 | 15.680613616632236 |
| retail-transfer-low | couchdb0.pjp.paynet | container_write_iops | operations_per_second | 6.526552952010514 | 25.73714944848966 | 14.808620858637987 |
| retail-transfer-low | peer0.ojk.paynet | container_write_iops | operations_per_second | 4.569317309208256 | 12.166756128108783 | 10.751724625543075 |
| retail-transfer-low | couchdb0.ojk.paynet | container_write_iops | operations_per_second | 9.123736413247137 | 91.61570765490312 | 15.778027991656348 |
| retail-transfer-low | couchdb0.himbara.paynet | container_write_iops | operations_per_second | 9.082843274580586 | 74.35220640172497 | 36.49341645172726 |
| retail-transfer-low | peer0.pjp.paynet | container_write_iops | operations_per_second | 4.5640624495962205 | 12.219886707755888 | 10.810044557426814 |
| retail-transfer-low | couchdb0.bi.paynet | container_write_iops | operations_per_second | 6.47943846532365 | 27.757981755986318 | 15.531670231075417 |
| retail-transfer-low | peer0.commercial.paynet | container_write_iops | operations_per_second | 4.500661037608099 | 12.563854756316442 | 10.828694855528726 |
| retail-transfer-low | peer0.bi.paynet | container_write_iops | operations_per_second | 4.400830071625368 | 11.171378282265884 | 10.164072261160861 |
| retail-transfer-low | peer0.himbara.paynet | container_write_iops | operations_per_second | 8.40949756975873 | 112.80893887820038 | 11.403930970363522 |
| retail-transfer-low | dev-peer0.himbara.paynet-digital-rupiah_3.0-6577345e5a476eadebff5403f2756125454311a1ea7739a34dbea5999be18074 | container_write_iops | operations_per_second | 0 | 0 | 0 |
| retail-transfer-low | dev-peer0.bi.paynet-digital-rupiah_3.0-6577345e5a476eadebff5403f2756125454311a1ea7739a34dbea5999be18074 | container_write_iops | operations_per_second | 0 | 0 | 0 |
| retail-transfer-low | dev-peer0.commercial.paynet-digital-rupiah_3.0-6577345e5a476eadebff5403f2756125454311a1ea7739a34dbea5999be18074 | container_write_iops | operations_per_second | 0 | 0 | 0 |
| retail-transfer-low | dev-peer0.pjp.paynet-digital-rupiah_3.0-6577345e5a476eadebff5403f2756125454311a1ea7739a34dbea5999be18074 | container_write_iops | operations_per_second | 0 | 0 | 0 |
| retail-transfer-low | bi-coin-fabric-postgres | container_read_bytes_per_second | bytes_per_second | 0 | 0 | 0 |
| retail-transfer-low | bi-coin-fabric-cadvisor | container_read_bytes_per_second | bytes_per_second | 0 | 0 | 0 |
| retail-transfer-low | bi-coin-fabric-node-exporter | container_read_bytes_per_second | bytes_per_second | 0 | 0 | 0 |
| retail-transfer-low | bi-coin-fabric-prometheus | container_read_bytes_per_second | bytes_per_second | 0 | 0 | 0 |
| retail-transfer-low | orderer.paynet | container_read_bytes_per_second | bytes_per_second | 0 | 0 | 0 |
| retail-transfer-low | couchdb0.commercial.paynet | container_read_bytes_per_second | bytes_per_second | 38.118278987182876 | 577.6641251221896 | 560.5052631578948 |
| retail-transfer-low | couchdb0.pjp.paynet | container_read_bytes_per_second | bytes_per_second | 279.91905163597414 | 3704.7622231715545 | 2162.230018244115 |
| retail-transfer-low | peer0.ojk.paynet | container_read_bytes_per_second | bytes_per_second | 0 | 0 | 0 |
| retail-transfer-low | peer0.pjp.paynet | container_read_bytes_per_second | bytes_per_second | 0 | 0 | 0 |
| retail-transfer-low | couchdb0.ojk.paynet | container_read_bytes_per_second | bytes_per_second | 466.15166752545156 | 4806.453978731207 | 2883.1897344155263 |
| retail-transfer-low | couchdb0.himbara.paynet | container_read_bytes_per_second | bytes_per_second | 184.26924000882966 | 2729.903034792701 | 2312.824330344091 |
| retail-transfer-low | peer0.commercial.paynet | container_read_bytes_per_second | bytes_per_second | 0 | 0 | 0 |
| retail-transfer-low | peer0.bi.paynet | container_read_bytes_per_second | bytes_per_second | 0 | 0 | 0 |
| retail-transfer-low | peer0.himbara.paynet | container_read_bytes_per_second | bytes_per_second | 0 | 0 | 0 |
| retail-transfer-low | couchdb0.bi.paynet | container_read_bytes_per_second | bytes_per_second | 284.9609418150891 | 3685.1765213948975 | 2200.011796417406 |
| retail-transfer-low | bi-coin-fabric-postgres | container_write_bytes_per_second | bytes_per_second | 0 | 0 | 0 |
| retail-transfer-low | bi-coin-fabric-cadvisor | container_write_bytes_per_second | bytes_per_second | 0 | 0 | 0 |
| retail-transfer-low | bi-coin-fabric-node-exporter | container_write_bytes_per_second | bytes_per_second | 0 | 0 | 0 |
| retail-transfer-low | bi-coin-fabric-prometheus | container_write_bytes_per_second | bytes_per_second | 100323.13324720923 | 255567.61619641207 | 247997.2013448267 |
| retail-transfer-low | orderer.paynet | container_write_bytes_per_second | bytes_per_second | 118546.47327160748 | 893186.7161433296 | 126457.56462244799 |
| retail-transfer-low | couchdb0.commercial.paynet | container_write_bytes_per_second | bytes_per_second | 141601.52624596926 | 235851.29736927344 | 175540.60773640772 |
| retail-transfer-low | couchdb0.pjp.paynet | container_write_bytes_per_second | bytes_per_second | 134527.1955645071 | 260595.48698723956 | 162177.92620569747 |
| retail-transfer-low | peer0.ojk.paynet | container_write_bytes_per_second | bytes_per_second | 109787.38379338577 | 420110.27495319553 | 122063.21677785953 |
| retail-transfer-low | peer0.pjp.paynet | container_write_bytes_per_second | bytes_per_second | 110132.45155758758 | 424171.32692991814 | 127585.26434458453 |
| retail-transfer-low | couchdb0.ojk.paynet | container_write_bytes_per_second | bytes_per_second | 219437.9058416955 | 1406274.2208796875 | 1349134.6788399767 |
| retail-transfer-low | couchdb0.himbara.paynet | container_write_bytes_per_second | bytes_per_second | 220316.9524485053 | 1123624.818766497 | 1041623.1235179261 |
| retail-transfer-low | peer0.commercial.paynet | container_write_bytes_per_second | bytes_per_second | 108222.65300842588 | 428826.3684520306 | 130505.23505890934 |
| retail-transfer-low | peer0.bi.paynet | container_write_bytes_per_second | bytes_per_second | 105845.21079043059 | 432948.68197592854 | 115437.9733024919 |
| retail-transfer-low | peer0.himbara.paynet | container_write_bytes_per_second | bytes_per_second | 232774.84529078897 | 1783854.3732425633 | 1689250.2669313513 |
| retail-transfer-low | couchdb0.bi.paynet | container_write_bytes_per_second | bytes_per_second | 134170.26608969053 | 285190.42189281643 | 175279.0171937622 |
| retail-transfer-low | bi-coin-fabric-postgres | container_read_service_ms | milliseconds_per_operation | 0 | 0 | 0 |
| retail-transfer-low | bi-coin-fabric-cadvisor | container_read_service_ms | milliseconds_per_operation | 0 | 0 | 0 |
| retail-transfer-low | bi-coin-fabric-node-exporter | container_read_service_ms | milliseconds_per_operation | 0 | 0 | 0 |
| retail-transfer-low | bi-coin-fabric-prometheus | container_read_service_ms | milliseconds_per_operation | 0 | 0 | 0 |
| retail-transfer-low | orderer.paynet | container_read_service_ms | milliseconds_per_operation | 0 | 0 | 0 |
| retail-transfer-low | couchdb0.commercial.paynet | container_read_service_ms | milliseconds_per_operation | 0 | 0 | 0 |
| retail-transfer-low | couchdb0.pjp.paynet | container_read_service_ms | milliseconds_per_operation | 0 | 0 | 0 |
| retail-transfer-low | peer0.ojk.paynet | container_read_service_ms | milliseconds_per_operation | 0 | 0 | 0 |
| retail-transfer-low | couchdb0.ojk.paynet | container_read_service_ms | milliseconds_per_operation | 0 | 0 | 0 |
| retail-transfer-low | couchdb0.himbara.paynet | container_read_service_ms | milliseconds_per_operation | 0 | 0 | 0 |
| retail-transfer-low | peer0.pjp.paynet | container_read_service_ms | milliseconds_per_operation | 0 | 0 | 0 |
| retail-transfer-low | couchdb0.bi.paynet | container_read_service_ms | milliseconds_per_operation | 0 | 0 | 0 |
| retail-transfer-low | peer0.commercial.paynet | container_read_service_ms | milliseconds_per_operation | 0 | 0 | 0 |
| retail-transfer-low | peer0.bi.paynet | container_read_service_ms | milliseconds_per_operation | 0 | 0 | 0 |
| retail-transfer-low | peer0.himbara.paynet | container_read_service_ms | milliseconds_per_operation | 0 | 0 | 0 |
| retail-transfer-low | dev-peer0.himbara.paynet-digital-rupiah_3.0-6577345e5a476eadebff5403f2756125454311a1ea7739a34dbea5999be18074 | container_read_service_ms | milliseconds_per_operation | 0 | 0 | 0 |
| retail-transfer-low | dev-peer0.bi.paynet-digital-rupiah_3.0-6577345e5a476eadebff5403f2756125454311a1ea7739a34dbea5999be18074 | container_read_service_ms | milliseconds_per_operation | 0 | 0 | 0 |
| retail-transfer-low | dev-peer0.commercial.paynet-digital-rupiah_3.0-6577345e5a476eadebff5403f2756125454311a1ea7739a34dbea5999be18074 | container_read_service_ms | milliseconds_per_operation | 0 | 0 | 0 |
| retail-transfer-low | dev-peer0.pjp.paynet-digital-rupiah_3.0-6577345e5a476eadebff5403f2756125454311a1ea7739a34dbea5999be18074 | container_read_service_ms | milliseconds_per_operation | 0 | 0 | 0 |
| retail-transfer-low | bi-coin-fabric-postgres | container_write_service_ms | milliseconds_per_operation | 0 | 0 | 0 |
| retail-transfer-low | bi-coin-fabric-cadvisor | container_write_service_ms | milliseconds_per_operation | 0 | 0 | 0 |
| retail-transfer-low | bi-coin-fabric-node-exporter | container_write_service_ms | milliseconds_per_operation | 0 | 0 | 0 |
| retail-transfer-low | bi-coin-fabric-prometheus | container_write_service_ms | milliseconds_per_operation | 0 | 0 | 0 |
| retail-transfer-low | orderer.paynet | container_write_service_ms | milliseconds_per_operation | 0 | 0 | 0 |
| retail-transfer-low | couchdb0.commercial.paynet | container_write_service_ms | milliseconds_per_operation | 0 | 0 | 0 |
| retail-transfer-low | couchdb0.pjp.paynet | container_write_service_ms | milliseconds_per_operation | 0 | 0 | 0 |
| retail-transfer-low | peer0.ojk.paynet | container_write_service_ms | milliseconds_per_operation | 0 | 0 | 0 |
| retail-transfer-low | couchdb0.ojk.paynet | container_write_service_ms | milliseconds_per_operation | 0 | 0 | 0 |
| retail-transfer-low | couchdb0.himbara.paynet | container_write_service_ms | milliseconds_per_operation | 0 | 0 | 0 |
| retail-transfer-low | peer0.pjp.paynet | container_write_service_ms | milliseconds_per_operation | 0 | 0 | 0 |
| retail-transfer-low | couchdb0.bi.paynet | container_write_service_ms | milliseconds_per_operation | 0 | 0 | 0 |
| retail-transfer-low | peer0.commercial.paynet | container_write_service_ms | milliseconds_per_operation | 0 | 0 | 0 |
| retail-transfer-low | peer0.bi.paynet | container_write_service_ms | milliseconds_per_operation | 0 | 0 | 0 |
| retail-transfer-low | peer0.himbara.paynet | container_write_service_ms | milliseconds_per_operation | 0 | 0 | 0 |
| retail-transfer-low | dev-peer0.himbara.paynet-digital-rupiah_3.0-6577345e5a476eadebff5403f2756125454311a1ea7739a34dbea5999be18074 | container_write_service_ms | milliseconds_per_operation | 0 | 0 | 0 |
| retail-transfer-low | dev-peer0.bi.paynet-digital-rupiah_3.0-6577345e5a476eadebff5403f2756125454311a1ea7739a34dbea5999be18074 | container_write_service_ms | milliseconds_per_operation | 0 | 0 | 0 |
| retail-transfer-low | dev-peer0.commercial.paynet-digital-rupiah_3.0-6577345e5a476eadebff5403f2756125454311a1ea7739a34dbea5999be18074 | container_write_service_ms | milliseconds_per_operation | 0 | 0 | 0 |
| retail-transfer-low | dev-peer0.pjp.paynet-digital-rupiah_3.0-6577345e5a476eadebff5403f2756125454311a1ea7739a34dbea5999be18074 | container_write_service_ms | milliseconds_per_operation | 0 | 0 | 0 |
| retail-transfer-low | node-exporter:9100 | host_cpu_busy_percent | % | 27.857502197459606 | 37.349137931031976 | 35.55538793103457 |
| retail-transfer-low | node-exporter:9100 | host_memory_used_bytes | bytes | 5850775718.054054 | 6863900672 | 6349977190.4 |
| retail-transfer-low | node-exporter:9100 | host_read_iops | operations_per_second | 4.679927531363418 | 71.25 | 26.791071428571424 |
| retail-transfer-low | node-exporter:9100 | host_write_iops | operations_per_second | 183.7839451728416 | 1867.9655172413793 | 451.88448275862066 |
| retail-transfer-low | node-exporter:9100 | host_read_await_ms | milliseconds_per_operation | 0.9424250666127477 | 8.000000000265572 | 5.842789968652212 |
| retail-transfer-low | node-exporter:9100 | host_write_await_ms | milliseconds_per_operation | 3.1548303758050134 | 12.716469479634299 | 11.55949890167511 |
| retail-transfer-low | bi-coin-fabric-postgres | container_cpu_percent | % | 0.9642270784515572 | 1.0657041222013683 | 1.0651571924548118 |
| retail-transfer-low | bi-coin-fabric-cadvisor | container_cpu_percent | % | 78.9547229846764 | 81.65265345802283 | 81.40875207949202 |
| retail-transfer-low | bi-coin-fabric-node-exporter | container_cpu_percent | % | 2.807953255737441 | 2.9703618630291886 | 2.966393555220344 |
| retail-transfer-low | bi-coin-fabric-prometheus | container_cpu_percent | % | 9.054008377940251 | 10.149416484317936 | 10.043970745667211 |
| retail-transfer-low | couchdb0.ojk.paynet | container_cpu_percent | % | 6.833562508339477 | 12.13724589382855 | 10.70537784666729 |
| retail-transfer-low | couchdb0.commercial.paynet | container_cpu_percent | % | 7.5686553614075684 | 11.075166747076022 | 10.507708387722827 |
| retail-transfer-low | couchdb0.bi.paynet | container_cpu_percent | % | 7.375768449364794 | 12.56844863863864 | 10.843710804054053 |
| retail-transfer-low | couchdb0.pjp.paynet | container_cpu_percent | % | 6.916709434217824 | 10.837867140928271 | 10.21510646341772 |
| retail-transfer-low | orderer.paynet | container_cpu_percent | % | 0.3451660568243444 | 0.7001675686785642 | 0.6800334059053538 |
| retail-transfer-low | peer0.bi.paynet | container_cpu_percent | % | 2.3732233333874833 | 4.751927751099941 | 3.728379648500617 |
| retail-transfer-low | couchdb0.himbara.paynet | container_cpu_percent | % | 6.519622158133291 | 11.142454441645675 | 11.034611725855697 |
| retail-transfer-low | peer0.ojk.paynet | container_cpu_percent | % | 1.7921145280450248 | 3.876363524268899 | 3.849054049529861 |
| retail-transfer-low | peer0.pjp.paynet | container_cpu_percent | % | 2.7170991385196435 | 5.066359788083701 | 5.060958887237089 |
| retail-transfer-low | peer0.commercial.paynet | container_cpu_percent | % | 2.2363964319084224 | 5.259192369867112 | 5.2199547885805675 |
| retail-transfer-low | peer0.himbara.paynet | container_cpu_percent | % | 2.126556404284062 | 4.89171574006801 | 3.6720114600057756 |
| retail-transfer-low | dev-peer0.commercial.paynet-digital-rupiah_3.0-6577345e5a476eadebff5403f2756125454311a1ea7739a34dbea5999be18074 | container_cpu_percent | % | 0.652825 | 0.652825 | 0.652825 |
| retail-transfer-low | dev-peer0.himbara.paynet-digital-rupiah_3.0-6577345e5a476eadebff5403f2756125454311a1ea7739a34dbea5999be18074 | container_cpu_percent | % | 0.7171666666666666 | 0.7171666666666667 | 0.7171666666666667 |
| retail-transfer-low | dev-peer0.pjp.paynet-digital-rupiah_3.0-6577345e5a476eadebff5403f2756125454311a1ea7739a34dbea5999be18074 | container_cpu_percent | % | 0.68556 | 0.6855600000000001 | 0.6855600000000001 |
| retail-transfer-low | dev-peer0.bi.paynet-digital-rupiah_3.0-6577345e5a476eadebff5403f2756125454311a1ea7739a34dbea5999be18074 | container_cpu_percent | % | 0.7502541666666664 | 0.7502541666666666 | 0.7502541666666666 |
| retail-transfer-low | bi-coin-fabric-postgres | container_memory_working_set_bytes | bytes | 15860882.285714285 | 16949248 | 16568320 |
| retail-transfer-low | bi-coin-fabric-cadvisor | container_memory_working_set_bytes | bytes | 148996096 | 157290496 | 156388556.8 |
| retail-transfer-low | bi-coin-fabric-node-exporter | container_memory_working_set_bytes | bytes | 13232420.57142857 | 13381632 | 13375488 |
| retail-transfer-low | bi-coin-fabric-prometheus | container_memory_working_set_bytes | bytes | 435709659.4285714 | 442425344 | 442231193.6 |
| retail-transfer-low | orderer.paynet | container_memory_working_set_bytes | bytes | 22691536.592592593 | 54349824 | 54349824 |
| retail-transfer-low | couchdb0.commercial.paynet | container_memory_working_set_bytes | bytes | 46200685.71428572 | 55267328 | 55267328 |
| retail-transfer-low | couchdb0.pjp.paynet | container_memory_working_set_bytes | bytes | 50830601.481481485 | 56180736 | 56180736 |
| retail-transfer-low | peer0.ojk.paynet | container_memory_working_set_bytes | bytes | 88787574.15384616 | 194240512 | 194240512 |
| retail-transfer-low | couchdb0.ojk.paynet | container_memory_working_set_bytes | bytes | 49835273.481481485 | 54030336 | 53612544 |
| retail-transfer-low | couchdb0.himbara.paynet | container_memory_working_set_bytes | bytes | 51527522.461538464 | 57085952 | 57085952 |
| retail-transfer-low | peer0.pjp.paynet | container_memory_working_set_bytes | bytes | 108887433.84615384 | 265052160 | 265052160 |
| retail-transfer-low | couchdb0.bi.paynet | container_memory_working_set_bytes | bytes | 52115771.07692308 | 54874112 | 54874112 |
| retail-transfer-low | peer0.commercial.paynet | container_memory_working_set_bytes | bytes | 130205696 | 242102272 | 242102272 |
| retail-transfer-low | peer0.bi.paynet | container_memory_working_set_bytes | bytes | 92092888.61538461 | 208285696 | 208285696 |
| retail-transfer-low | peer0.himbara.paynet | container_memory_working_set_bytes | bytes | 143572536.8888889 | 240971776 | 240971776 |
| retail-transfer-low | dev-peer0.himbara.paynet-digital-rupiah_3.0-6577345e5a476eadebff5403f2756125454311a1ea7739a34dbea5999be18074 | container_memory_working_set_bytes | bytes | 22865920 | 26947584 | 26947584 |
| retail-transfer-low | dev-peer0.bi.paynet-digital-rupiah_3.0-6577345e5a476eadebff5403f2756125454311a1ea7739a34dbea5999be18074 | container_memory_working_set_bytes | bytes | 18440192 | 19533824 | 19533824 |
| retail-transfer-low | dev-peer0.commercial.paynet-digital-rupiah_3.0-6577345e5a476eadebff5403f2756125454311a1ea7739a34dbea5999be18074 | container_memory_working_set_bytes | bytes | 18071552 | 19103744 | 19103744 |
| retail-transfer-low | dev-peer0.pjp.paynet-digital-rupiah_3.0-6577345e5a476eadebff5403f2756125454311a1ea7739a34dbea5999be18074 | container_memory_working_set_bytes | bytes | 17977344 | 18788352 | 18788352 |
| retail-transfer-low | bi-coin-fabric-postgres | container_network_receive_bytes_per_second | bytes_per_second | 0 | 0 | 0 |
| retail-transfer-low | bi-coin-fabric-cadvisor | container_network_receive_bytes_per_second | bytes_per_second | 6924.407628913054 | 7113.995504034396 | 7081.8538253078905 |
| retail-transfer-low | bi-coin-fabric-node-exporter | container_network_receive_bytes_per_second | bytes_per_second | 680.5278719586786 | 713.2659551911796 | 708.4073189718449 |
| retail-transfer-low | bi-coin-fabric-prometheus | container_network_receive_bytes_per_second | bytes_per_second | 456635.9887927162 | 478252.36288128304 | 476034.9581744474 |
| retail-transfer-low | couchdb0.ojk.paynet | container_network_receive_bytes_per_second | bytes_per_second | 1864.9196446164672 | 2790.8833333333337 | 2775.206041666667 |
| retail-transfer-low | couchdb0.commercial.paynet | container_network_receive_bytes_per_second | bytes_per_second | 2163.795453468558 | 3175.6143469785575 | 3107.291707951982 |
| retail-transfer-low | couchdb0.bi.paynet | container_network_receive_bytes_per_second | bytes_per_second | 2205.0208201505907 | 2990.3742292069996 | 2981.5793261719878 |
| retail-transfer-low | couchdb0.pjp.paynet | container_network_receive_bytes_per_second | bytes_per_second | 2002.6688071748943 | 2882.8877001671754 | 2852.246189615953 |
| retail-transfer-low | orderer.paynet | container_network_receive_bytes_per_second | bytes_per_second | 1938.270015557995 | 2940.6625000000004 | 2889.4942709795473 |
| retail-transfer-low | peer0.bi.paynet | container_network_receive_bytes_per_second | bytes_per_second | 15975.35620250682 | 21195.2129278498 | 21023.3750782169 |
| retail-transfer-low | couchdb0.himbara.paynet | container_network_receive_bytes_per_second | bytes_per_second | 2341.8046944454395 | 3346.013528066681 | 3195.146010298342 |
| retail-transfer-low | peer0.ojk.paynet | container_network_receive_bytes_per_second | bytes_per_second | 73007.08616558561 | 379697.65256410255 | 379214.461996337 |
| retail-transfer-low | peer0.pjp.paynet | container_network_receive_bytes_per_second | bytes_per_second | 107939.33757030884 | 382995.4476190476 | 381294.6851163957 |
| retail-transfer-low | peer0.commercial.paynet | container_network_receive_bytes_per_second | bytes_per_second | 68720.83028871693 | 382185.41777777777 | 381778.41430208326 |
| retail-transfer-low | peer0.himbara.paynet | container_network_receive_bytes_per_second | bytes_per_second | 44474.830009278834 | 378699.0900000001 | 212411.73663338213 |
| retail-transfer-low | dev-peer0.commercial.paynet-digital-rupiah_3.0-6577345e5a476eadebff5403f2756125454311a1ea7739a34dbea5999be18074 | container_network_receive_bytes_per_second | bytes_per_second | 619.5000000000001 | 619.5000000000001 | 619.5000000000001 |
| retail-transfer-low | dev-peer0.himbara.paynet-digital-rupiah_3.0-6577345e5a476eadebff5403f2756125454311a1ea7739a34dbea5999be18074 | container_network_receive_bytes_per_second | bytes_per_second | 626.3000000000001 | 626.3000000000001 | 626.3000000000001 |
| retail-transfer-low | dev-peer0.pjp.paynet-digital-rupiah_3.0-6577345e5a476eadebff5403f2756125454311a1ea7739a34dbea5999be18074 | container_network_receive_bytes_per_second | bytes_per_second | 464.6766666666667 | 464.6766666666666 | 464.6766666666666 |
| retail-transfer-low | dev-peer0.bi.paynet-digital-rupiah_3.0-6577345e5a476eadebff5403f2756125454311a1ea7739a34dbea5999be18074 | container_network_receive_bytes_per_second | bytes_per_second | 634.9250000000001 | 634.9250000000001 | 634.9250000000001 |
| retail-transfer-low | bi-coin-fabric-postgres | container_network_transmit_bytes_per_second | bytes_per_second | 0 | 0 | 0 |
| retail-transfer-low | bi-coin-fabric-cadvisor | container_network_transmit_bytes_per_second | bytes_per_second | 439064.68386140134 | 452793.9793502678 | 449641.0903852397 |
| retail-transfer-low | bi-coin-fabric-node-exporter | container_network_transmit_bytes_per_second | bytes_per_second | 15927.09237571811 | 16695.455509223266 | 16581.228127837334 |
| retail-transfer-low | bi-coin-fabric-prometheus | container_network_transmit_bytes_per_second | bytes_per_second | 10900.573178645504 | 17125.346462436177 | 15937.631539887478 |
| retail-transfer-low | couchdb0.ojk.paynet | container_network_transmit_bytes_per_second | bytes_per_second | 1723.5695636688436 | 2442.831728376555 | 2434.879611102783 |
| retail-transfer-low | couchdb0.commercial.paynet | container_network_transmit_bytes_per_second | bytes_per_second | 2255.3840421725567 | 3565.594599046685 | 3558.23872404749 |
| retail-transfer-low | couchdb0.bi.paynet | container_network_transmit_bytes_per_second | bytes_per_second | 2278.5906471165486 | 3527.541828948867 | 3523.52039178845 |
| retail-transfer-low | couchdb0.pjp.paynet | container_network_transmit_bytes_per_second | bytes_per_second | 2175.191886712871 | 3539.623668338423 | 3515.1441699576785 |
| retail-transfer-low | orderer.paynet | container_network_transmit_bytes_per_second | bytes_per_second | 4301.487942068841 | 7293.308426679308 | 7221.8227994963245 |
| retail-transfer-low | peer0.bi.paynet | container_network_transmit_bytes_per_second | bytes_per_second | 9023.533329017866 | 11235.669522101696 | 10994.513909700448 |
| retail-transfer-low | couchdb0.himbara.paynet | container_network_transmit_bytes_per_second | bytes_per_second | 2397.332470151528 | 3661.3825593294678 | 3614.4924758793777 |
| retail-transfer-low | peer0.ojk.paynet | container_network_transmit_bytes_per_second | bytes_per_second | 3891.324536335472 | 6511.236937634599 | 6292.30913524405 |
| retail-transfer-low | peer0.pjp.paynet | container_network_transmit_bytes_per_second | bytes_per_second | 6260.273020234201 | 10592.08562678681 | 10269.653911389509 |
| retail-transfer-low | peer0.commercial.paynet | container_network_transmit_bytes_per_second | bytes_per_second | 5764.628288531872 | 10739.97823219759 | 10489.60804031464 |
| retail-transfer-low | peer0.himbara.paynet | container_network_transmit_bytes_per_second | bytes_per_second | 5783.866102099986 | 7938.7496027204115 | 7551.06775128252 |
| retail-transfer-low | dev-peer0.commercial.paynet-digital-rupiah_3.0-6577345e5a476eadebff5403f2756125454311a1ea7739a34dbea5999be18074 | container_network_transmit_bytes_per_second | bytes_per_second | 401.4500000000001 | 401.45000000000005 | 401.45000000000005 |
| retail-transfer-low | dev-peer0.himbara.paynet-digital-rupiah_3.0-6577345e5a476eadebff5403f2756125454311a1ea7739a34dbea5999be18074 | container_network_transmit_bytes_per_second | bytes_per_second | 379.02500000000003 | 379.02500000000003 | 379.02500000000003 |
| retail-transfer-low | dev-peer0.pjp.paynet-digital-rupiah_3.0-6577345e5a476eadebff5403f2756125454311a1ea7739a34dbea5999be18074 | container_network_transmit_bytes_per_second | bytes_per_second | 138.23999999999998 | 138.23999999999998 | 138.23999999999998 |
| retail-transfer-low | dev-peer0.bi.paynet-digital-rupiah_3.0-6577345e5a476eadebff5403f2756125454311a1ea7739a34dbea5999be18074 | container_network_transmit_bytes_per_second | bytes_per_second | 376.1 | 376.1000000000001 | 376.1000000000001 |
| retail-transfer-low | bi-coin-fabric-postgres | container_read_iops | operations_per_second | 0 | 0 | 0 |
| retail-transfer-low | bi-coin-fabric-cadvisor | container_read_iops | operations_per_second | 0 | 0 | 0 |
| retail-transfer-low | bi-coin-fabric-node-exporter | container_read_iops | operations_per_second | 0 | 0 | 0 |
| retail-transfer-low | bi-coin-fabric-prometheus | container_read_iops | operations_per_second | 0 | 0 | 0 |
| retail-transfer-low | couchdb0.ojk.paynet | container_read_iops | operations_per_second | 0 | 0 | 0 |
| retail-transfer-low | couchdb0.commercial.paynet | container_read_iops | operations_per_second | 0 | 0 | 0 |
| retail-transfer-low | couchdb0.bi.paynet | container_read_iops | operations_per_second | 0 | 0 | 0 |
| retail-transfer-low | couchdb0.pjp.paynet | container_read_iops | operations_per_second | 0 | 0 | 0 |
| retail-transfer-low | orderer.paynet | container_read_iops | operations_per_second | 0 | 0 | 0 |
| retail-transfer-low | peer0.bi.paynet | container_read_iops | operations_per_second | 0 | 0 | 0 |
| retail-transfer-low | couchdb0.himbara.paynet | container_read_iops | operations_per_second | 0 | 0 | 0 |
| retail-transfer-low | peer0.ojk.paynet | container_read_iops | operations_per_second | 0 | 0 | 0 |
| retail-transfer-low | peer0.pjp.paynet | container_read_iops | operations_per_second | 0 | 0 | 0 |
| retail-transfer-low | peer0.commercial.paynet | container_read_iops | operations_per_second | 0 | 0 | 0 |
| retail-transfer-low | peer0.himbara.paynet | container_read_iops | operations_per_second | 0 | 0 | 0 |
| retail-transfer-low | dev-peer0.commercial.paynet-digital-rupiah_3.0-6577345e5a476eadebff5403f2756125454311a1ea7739a34dbea5999be18074 | container_read_iops | operations_per_second | 0 | 0 | 0 |
| retail-transfer-low | dev-peer0.himbara.paynet-digital-rupiah_3.0-6577345e5a476eadebff5403f2756125454311a1ea7739a34dbea5999be18074 | container_read_iops | operations_per_second | 0 | 0 | 0 |
| retail-transfer-low | dev-peer0.pjp.paynet-digital-rupiah_3.0-6577345e5a476eadebff5403f2756125454311a1ea7739a34dbea5999be18074 | container_read_iops | operations_per_second | 0 | 0 | 0 |
| retail-transfer-low | dev-peer0.bi.paynet-digital-rupiah_3.0-6577345e5a476eadebff5403f2756125454311a1ea7739a34dbea5999be18074 | container_read_iops | operations_per_second | 0 | 0 | 0 |
| retail-transfer-low | bi-coin-fabric-postgres | container_write_iops | operations_per_second | 0 | 0 | 0 |
| retail-transfer-low | bi-coin-fabric-cadvisor | container_write_iops | operations_per_second | 0 | 0 | 0 |
| retail-transfer-low | bi-coin-fabric-node-exporter | container_write_iops | operations_per_second | 0 | 0 | 0 |
| retail-transfer-low | bi-coin-fabric-prometheus | container_write_iops | operations_per_second | 0.49283113362329756 | 1.0211524434719186 | 1.008985769650228 |
| retail-transfer-low | couchdb0.ojk.paynet | container_write_iops | operations_per_second | 8.171471607363033 | 20.44486283915455 | 20.33415155087714 |
| retail-transfer-low | couchdb0.commercial.paynet | container_write_iops | operations_per_second | 10.132949375126126 | 26.10318239170055 | 25.96476454677501 |
| retail-transfer-low | couchdb0.bi.paynet | container_write_iops | operations_per_second | 8.359401060000245 | 24.225358244270744 | 23.755600164880892 |
| retail-transfer-low | couchdb0.pjp.paynet | container_write_iops | operations_per_second | 8.866148868481188 | 23.767330045856564 | 23.451395661116926 |
| retail-transfer-low | orderer.paynet | container_write_iops | operations_per_second | 1.7569910951975818 | 4.461021704216201 | 4.299889306657274 |
| retail-transfer-low | peer0.bi.paynet | container_write_iops | operations_per_second | 2.559697860653011 | 7.1602189059643235 | 7.0792417091588895 |
| retail-transfer-low | couchdb0.himbara.paynet | container_write_iops | operations_per_second | 9.024208703922334 | 24.13762660370797 | 23.73968536296152 |
| retail-transfer-low | peer0.ojk.paynet | container_write_iops | operations_per_second | 2.480924346789144 | 6.684255921016143 | 6.656454572976737 |
| retail-transfer-low | peer0.pjp.paynet | container_write_iops | operations_per_second | 2.330131238817649 | 6.846058850501737 | 6.7613236502627805 |
| retail-transfer-low | peer0.commercial.paynet | container_write_iops | operations_per_second | 2.4874875856146983 | 6.70511761284632 | 6.637068035231224 |
| retail-transfer-low | peer0.himbara.paynet | container_write_iops | operations_per_second | 2.890508779180313 | 6.87259447869204 | 6.856854320665874 |
| retail-transfer-low | dev-peer0.commercial.paynet-digital-rupiah_3.0-6577345e5a476eadebff5403f2756125454311a1ea7739a34dbea5999be18074 | container_write_iops | operations_per_second | 0 | 0 | 0 |
| retail-transfer-low | dev-peer0.himbara.paynet-digital-rupiah_3.0-6577345e5a476eadebff5403f2756125454311a1ea7739a34dbea5999be18074 | container_write_iops | operations_per_second | 0 | 0 | 0 |
| retail-transfer-low | dev-peer0.pjp.paynet-digital-rupiah_3.0-6577345e5a476eadebff5403f2756125454311a1ea7739a34dbea5999be18074 | container_write_iops | operations_per_second | 0 | 0 | 0 |
| retail-transfer-low | dev-peer0.bi.paynet-digital-rupiah_3.0-6577345e5a476eadebff5403f2756125454311a1ea7739a34dbea5999be18074 | container_write_iops | operations_per_second | 0 | 0 | 0 |
| retail-transfer-low | bi-coin-fabric-postgres | container_read_bytes_per_second | bytes_per_second | 0 | 0 | 0 |
| retail-transfer-low | bi-coin-fabric-cadvisor | container_read_bytes_per_second | bytes_per_second | 0 | 0 | 0 |
| retail-transfer-low | bi-coin-fabric-node-exporter | container_read_bytes_per_second | bytes_per_second | 0 | 0 | 0 |
| retail-transfer-low | bi-coin-fabric-prometheus | container_read_bytes_per_second | bytes_per_second | 0 | 0 | 0 |
| retail-transfer-low | couchdb0.ojk.paynet | container_read_bytes_per_second | bytes_per_second | 0 | 0 | 0 |
| retail-transfer-low | couchdb0.pjp.paynet | container_read_bytes_per_second | bytes_per_second | 0 | 0 | 0 |
| retail-transfer-low | peer0.bi.paynet | container_read_bytes_per_second | bytes_per_second | 0 | 0 | 0 |
| retail-transfer-low | couchdb0.commercial.paynet | container_read_bytes_per_second | bytes_per_second | 0 | 0 | 0 |
| retail-transfer-low | couchdb0.bi.paynet | container_read_bytes_per_second | bytes_per_second | 0 | 0 | 0 |
| retail-transfer-low | peer0.ojk.paynet | container_read_bytes_per_second | bytes_per_second | 0 | 0 | 0 |
| retail-transfer-low | peer0.pjp.paynet | container_read_bytes_per_second | bytes_per_second | 0 | 0 | 0 |
| retail-transfer-low | orderer.paynet | container_read_bytes_per_second | bytes_per_second | 0 | 0 | 0 |
| retail-transfer-low | couchdb0.himbara.paynet | container_read_bytes_per_second | bytes_per_second | 0 | 0 | 0 |
| retail-transfer-low | peer0.himbara.paynet | container_read_bytes_per_second | bytes_per_second | 0 | 0 | 0 |
| retail-transfer-low | peer0.commercial.paynet | container_read_bytes_per_second | bytes_per_second | 0 | 0 | 0 |
| retail-transfer-low | bi-coin-fabric-postgres | container_write_bytes_per_second | bytes_per_second | 0 | 0 | 0 |
| retail-transfer-low | bi-coin-fabric-cadvisor | container_write_bytes_per_second | bytes_per_second | 0 | 0 | 0 |
| retail-transfer-low | bi-coin-fabric-node-exporter | container_write_bytes_per_second | bytes_per_second | 0 | 0 | 0 |
| retail-transfer-low | bi-coin-fabric-prometheus | container_write_bytes_per_second | bytes_per_second | 116781.54443742467 | 120848.43180160469 | 120183.87791628581 |
| retail-transfer-low | couchdb0.ojk.paynet | container_write_bytes_per_second | bytes_per_second | 180873.71235766757 | 206139.64148903207 | 205717.02681896763 |
| retail-transfer-low | couchdb0.pjp.paynet | container_write_bytes_per_second | bytes_per_second | 197221.91354423744 | 239767.23326081125 | 239281.2768097108 |
| retail-transfer-low | peer0.bi.paynet | container_write_bytes_per_second | bytes_per_second | 328298.48660167016 | 432111.1905274489 | 430170.55578440765 |
| retail-transfer-low | couchdb0.commercial.paynet | container_write_bytes_per_second | bytes_per_second | 215235.18540205352 | 266039.74122155237 | 265437.340302079 |
| retail-transfer-low | couchdb0.bi.paynet | container_write_bytes_per_second | bytes_per_second | 184853.39341999247 | 245073.06122188544 | 242829.26491016475 |
| retail-transfer-low | peer0.ojk.paynet | container_write_bytes_per_second | bytes_per_second | 330261.23458586936 | 435333.8373509346 | 434599.7120230252 |
| retail-transfer-low | peer0.pjp.paynet | container_write_bytes_per_second | bytes_per_second | 294557.19801074883 | 429913.6792339029 | 427445.27005409804 |
| retail-transfer-low | orderer.paynet | container_write_bytes_per_second | bytes_per_second | 39242.55227695219 | 47394.71396504822 | 46531.53758145077 |
| retail-transfer-low | couchdb0.himbara.paynet | container_write_bytes_per_second | bytes_per_second | 209092.19631948962 | 239800.56475996997 | 237712.56068472777 |
| retail-transfer-low | peer0.himbara.paynet | container_write_bytes_per_second | bytes_per_second | 336316.94258952304 | 430519.22308585723 | 430019.8772014274 |
| retail-transfer-low | peer0.commercial.paynet | container_write_bytes_per_second | bytes_per_second | 255579.19739718156 | 426000.82350793266 | 424451.7829398496 |
| retail-transfer-low | bi-coin-fabric-postgres | container_read_service_ms | milliseconds_per_operation | 0 | 0 | 0 |
| retail-transfer-low | bi-coin-fabric-cadvisor | container_read_service_ms | milliseconds_per_operation | 0 | 0 | 0 |
| retail-transfer-low | bi-coin-fabric-node-exporter | container_read_service_ms | milliseconds_per_operation | 0 | 0 | 0 |
| retail-transfer-low | bi-coin-fabric-prometheus | container_read_service_ms | milliseconds_per_operation | 0 | 0 | 0 |
| retail-transfer-low | couchdb0.ojk.paynet | container_read_service_ms | milliseconds_per_operation | 0 | 0 | 0 |
| retail-transfer-low | couchdb0.commercial.paynet | container_read_service_ms | milliseconds_per_operation | 0 | 0 | 0 |
| retail-transfer-low | couchdb0.bi.paynet | container_read_service_ms | milliseconds_per_operation | 0 | 0 | 0 |
| retail-transfer-low | couchdb0.pjp.paynet | container_read_service_ms | milliseconds_per_operation | 0 | 0 | 0 |
| retail-transfer-low | orderer.paynet | container_read_service_ms | milliseconds_per_operation | 0 | 0 | 0 |
| retail-transfer-low | peer0.bi.paynet | container_read_service_ms | milliseconds_per_operation | 0 | 0 | 0 |
| retail-transfer-low | couchdb0.himbara.paynet | container_read_service_ms | milliseconds_per_operation | 0 | 0 | 0 |
| retail-transfer-low | peer0.ojk.paynet | container_read_service_ms | milliseconds_per_operation | 0 | 0 | 0 |
| retail-transfer-low | peer0.pjp.paynet | container_read_service_ms | milliseconds_per_operation | 0 | 0 | 0 |
| retail-transfer-low | peer0.commercial.paynet | container_read_service_ms | milliseconds_per_operation | 0 | 0 | 0 |
| retail-transfer-low | peer0.himbara.paynet | container_read_service_ms | milliseconds_per_operation | 0 | 0 | 0 |
| retail-transfer-low | dev-peer0.commercial.paynet-digital-rupiah_3.0-6577345e5a476eadebff5403f2756125454311a1ea7739a34dbea5999be18074 | container_read_service_ms | milliseconds_per_operation | 0 | 0 | 0 |
| retail-transfer-low | dev-peer0.himbara.paynet-digital-rupiah_3.0-6577345e5a476eadebff5403f2756125454311a1ea7739a34dbea5999be18074 | container_read_service_ms | milliseconds_per_operation | 0 | 0 | 0 |
| retail-transfer-low | dev-peer0.pjp.paynet-digital-rupiah_3.0-6577345e5a476eadebff5403f2756125454311a1ea7739a34dbea5999be18074 | container_read_service_ms | milliseconds_per_operation | 0 | 0 | 0 |
| retail-transfer-low | dev-peer0.bi.paynet-digital-rupiah_3.0-6577345e5a476eadebff5403f2756125454311a1ea7739a34dbea5999be18074 | container_read_service_ms | milliseconds_per_operation | 0 | 0 | 0 |
| retail-transfer-low | bi-coin-fabric-postgres | container_write_service_ms | milliseconds_per_operation | 0 | 0 | 0 |
| retail-transfer-low | bi-coin-fabric-cadvisor | container_write_service_ms | milliseconds_per_operation | 0 | 0 | 0 |
| retail-transfer-low | bi-coin-fabric-node-exporter | container_write_service_ms | milliseconds_per_operation | 0 | 0 | 0 |
| retail-transfer-low | bi-coin-fabric-prometheus | container_write_service_ms | milliseconds_per_operation | 0 | 0 | 0 |
| retail-transfer-low | couchdb0.ojk.paynet | container_write_service_ms | milliseconds_per_operation | 0 | 0 | 0 |
| retail-transfer-low | couchdb0.commercial.paynet | container_write_service_ms | milliseconds_per_operation | 0 | 0 | 0 |
| retail-transfer-low | couchdb0.bi.paynet | container_write_service_ms | milliseconds_per_operation | 0 | 0 | 0 |
| retail-transfer-low | couchdb0.pjp.paynet | container_write_service_ms | milliseconds_per_operation | 0 | 0 | 0 |
| retail-transfer-low | orderer.paynet | container_write_service_ms | milliseconds_per_operation | 0 | 0 | 0 |
| retail-transfer-low | peer0.bi.paynet | container_write_service_ms | milliseconds_per_operation | 0 | 0 | 0 |
| retail-transfer-low | couchdb0.himbara.paynet | container_write_service_ms | milliseconds_per_operation | 0 | 0 | 0 |
| retail-transfer-low | peer0.ojk.paynet | container_write_service_ms | milliseconds_per_operation | 0 | 0 | 0 |
| retail-transfer-low | peer0.pjp.paynet | container_write_service_ms | milliseconds_per_operation | 0 | 0 | 0 |
| retail-transfer-low | peer0.commercial.paynet | container_write_service_ms | milliseconds_per_operation | 0 | 0 | 0 |
| retail-transfer-low | peer0.himbara.paynet | container_write_service_ms | milliseconds_per_operation | 0 | 0 | 0 |
| retail-transfer-low | dev-peer0.commercial.paynet-digital-rupiah_3.0-6577345e5a476eadebff5403f2756125454311a1ea7739a34dbea5999be18074 | container_write_service_ms | milliseconds_per_operation | 0 | 0 | 0 |
| retail-transfer-low | dev-peer0.himbara.paynet-digital-rupiah_3.0-6577345e5a476eadebff5403f2756125454311a1ea7739a34dbea5999be18074 | container_write_service_ms | milliseconds_per_operation | 0 | 0 | 0 |
| retail-transfer-low | dev-peer0.pjp.paynet-digital-rupiah_3.0-6577345e5a476eadebff5403f2756125454311a1ea7739a34dbea5999be18074 | container_write_service_ms | milliseconds_per_operation | 0 | 0 | 0 |
| retail-transfer-low | dev-peer0.bi.paynet-digital-rupiah_3.0-6577345e5a476eadebff5403f2756125454311a1ea7739a34dbea5999be18074 | container_write_service_ms | milliseconds_per_operation | 0 | 0 | 0 |
| retail-transfer-low | node-exporter:9100 | host_cpu_busy_percent | % | 36.8639602483699 | 39.14224137930934 | 38.9249999999999 |
| retail-transfer-low | node-exporter:9100 | host_memory_used_bytes | bytes | 5019692470.857142 | 5302120448 | 5252216422.4 |
| retail-transfer-low | node-exporter:9100 | host_read_iops | operations_per_second | 1.1009510810023972 | 6.931034482758621 | 6.930723802639058 |
| retail-transfer-low | node-exporter:9100 | host_write_iops | operations_per_second | 709.8756007314596 | 1501.3793103448277 | 1497.8603448275862 |
| retail-transfer-low | node-exporter:9100 | host_read_await_ms | milliseconds_per_operation | 0.656953328598115 | 1.7777777777862664 | 1.7777777777862664 |
| retail-transfer-low | node-exporter:9100 | host_write_await_ms | milliseconds_per_operation | 0.6743172151183714 | 1.4933546132464577 | 1.4448953283292494 |

## 7. Results by Transaction Type

Each row is isolated: Issuance, Distribution, Retail Transfer, Merchant Payment, Redemption, Balance Query, and Wallet Status Change. Freeze and Unfreeze are preserved as separate operations.

## 8. Repetition and Uncertainty

Every confirmatory scenario is repeated five times. Tables report the mean and sample standard deviation across repetitions. Raw traces and Prometheus responses remain beside this report for reanalysis.

## Measurement Boundary

The primary benchmark measures direct Fabric traffic. Backend API, PostgreSQL, and KYC are evaluated separately by the end-to-end demonstration and are not mixed into these Fabric latency or throughput values.
