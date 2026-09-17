# Final evidence claim map

This map is the citation boundary for the revised thesis, paper, and defense
briefs. Performance values are local measurements; `PASS` rows are semantic
oracles, not production-capacity claims.

| Claim | Source of truth | Evidence artifact |
|---|---|---|
| Two-tier custody is BI Treasury → validator bank/PJP custodian → retail wallet. | `chaincode/digital_rupiah.go`; `docs/diagrams/plantuml/activity-diagrams.puml` | `benchmark/results/20260909-final-08-functionality.log` |
| Direct retail `Mint` is rejected; issuance credits `bi_treasury`. | `chaincode/digital_rupiah.go`; `chaincode/digital_rupiah_v3_test.go` | `benchmark/results/20260909-final-08-functionality.html` |
| Functional flows complete 168/168 transactions. | `benchmark/benchconfigs/functionality.yaml` | `benchmark/results/20260909-final-08-functionality.log` and `.html` |
| Boundary oracle passes all eight exact-limit cases. | `scripts/validate-boundary-log.js` | `benchmark/results/20260909-final-boundary.log` and `.html` |
| Unauthorized custodian mismatch is rejected without infrastructure error. | `benchmark/workloads/custody-authorization.js` | `benchmark/results/20260909-final-08-authorization.log` and `.html` |
| Negative-path oracle enforces seven expected policy rejections. | `benchmark/workloads/negative-path.js` | `benchmark/results/20260909-final-08-negative-path.log` and `.html` |
| Aggregate overspend commits 10 of 200 requests and ends at Rp40,000. | `benchmark/workloads/adversarial-double-spend.js` | `benchmark/results/20260909-final-08-aggregate-overspend.log` and `.html` |
| Transfer completion throughput is 29.1–29.5 TPS at 30 TPS and 56.3–57.3 TPS at 60 TPS; success is reported separately. | `benchmark/benchconfigs/retail-transfer-workers-{1,2,4}.yaml` | `benchmark/results/20260909-final-08-transfer-w{1,2,4}.log` and `.html` |
| Five peak repetitions average 54.8 TPS and 16.33% success. | `benchmark/benchconfigs/retail-transfer-workers-2.yaml` | `benchmark/results/20260909-final-08-transfer-repeat.log` and `.html` |
| Final transfer failures are classified as status 11 or gateway concurrency-limit messages. | Final transfer logs and runner diagnostics | `benchmark/results/20260909-final-08-transfer-w{1,2,4}.log`, `...-transfer-repeat.log` |
| Monitored resources remain below host capacity in this run. | Final resource summary in thesis/paper | `benchmark/results/20260909-final-evidence-manifest.json` |
| Reproduction context is one host, five organizations, one peer per organization, one Raft orderer, and CouchDB. | `benchmark/results/20260909-final-evidence-manifest.json` | Manifest runtime/topology metadata and input hashes |

The combined status ledger is
`benchmark/results/20260909-final-evidence-status.tsv`. The manifest includes
the `20260909-final-08` sweep and the separately rerun
`20260909-final-boundary` artifacts. Historical `20260824-*` and
`20260908-*` files remain preserved for review provenance but are not current
manuscript evidence.

The manifest's `seed` field (`20260909`) controls suite/profile ordering. The
transfer YAML files retain their deterministic workload seed (`20260725`); both
values are part of the reproducibility context.
