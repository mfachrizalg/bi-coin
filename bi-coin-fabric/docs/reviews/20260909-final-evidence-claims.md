# Final evidence claim map

> **Four-organization restatement (2026-10-16):** five-organization evidence in this document is superseded by the four-organization network (CentralBankMSP, DistributorMSP, ValidatorMSP, EndUserMSP). The role `validator_bank` and participant type `validator` were removed; banks are `distributor`. Terms are kept as recorded at review time and are not evidence for the four-organization prototype.

This map is the citation boundary for the revised thesis, paper, and defense
briefs. Performance values are local measurements; `PASS` rows are semantic
oracles, not production-capacity claims.

| Claim | Source of truth | Evidence artifact |
|---|---|---|
| Two-tier custody is BI Treasury → distributor bank/PJP custodian → retail wallet. | `chaincode/digital_rupiah.go`; `docs/diagrams/plantuml/activity-diagrams.puml` | `benchmark/results/20260909-final-08-functionality.log` |
| Direct retail `Mint` is rejected; issuance credits `bi_treasury`. | `chaincode/digital_rupiah.go`; `chaincode/digital_rupiah_v3_test.go` | `benchmark/results/20260909-final-08-functionality.html` |
| Functional flows complete 168/168 transactions. | `benchmark/benchconfigs/functionality.yaml` | `benchmark/results/20260909-final-08-functionality.log` and `.html` |
| Boundary oracle passes all eight exact-limit cases. | `scripts/validate-boundary-log.js` | `benchmark/results/20260909-final-boundary.log` and `.html` |
| Unauthorized custodian mismatch is rejected without infrastructure error. | `benchmark/workloads/custody-authorization.js` | `benchmark/results/20260909-final-08-authorization.log` and `.html` |
| Negative-path oracle enforces seven expected policy rejections. | `benchmark/workloads/negative-path.js` | `benchmark/results/20260909-final-08-negative-path.log` and `.html` |
| Aggregate overspend commits 10 of 200 requests and ends at Rp40,000. | `benchmark/workloads/adversarial-double-spend.js` | `benchmark/results/20260909-final-08-aggregate-overspend.log` and `.html` |
| Write confirmed passing throughput on the four-organization network is 0.184 to 4.75 TPS across 21 write workloads. The five-organization transfer sweep at 30 and 60 TPS offered load has no four-organization equivalent in this map. | `benchmark/results/runtime-workspaces/compliance-run-20261012-06/workspace/benchmark/results/compliance-run-20261014-01/REPORT.md` | Per-workload rows in that `REPORT.md` |
| No four-organization peak-repetition claim is made; the five-organization repetition average is removed from this map. | None | None |
| Final transfer failures are classified as status 11 or gateway concurrency-limit messages. | Final transfer logs and runner diagnostics | `benchmark/results/20260909-final-08-transfer-w{1,2,4}.log`, `...-transfer-repeat.log` |
| Monitored resources remain below host capacity in this run. | Final resource summary in thesis/paper | `benchmark/results/20260909-final-evidence-manifest.json` |
| The 20260909 evidence ran on one host with five organizations (superseded), one peer per organization, one Raft orderer, and CouchDB. The four-organization network runs one peer per organization, with CentralBankMSP as the orderer organization; this map records no orderer or state-database count for it. | `benchmark/results/20260909-final-evidence-manifest.json` | Manifest runtime/topology metadata and input hashes (five-organization record) |

Every row that cites a 20260909 artifact was produced on the five-organization topology; no four-organization rerun of those artifacts is recorded in this map.

The combined status ledger is
`benchmark/results/20260909-final-evidence-status.tsv`. The manifest includes
the `20260909-final-08` sweep and the separately rerun
`20260909-final-boundary` artifacts. Historical `20260824-*` and
`20260908-*` files remain preserved for review provenance but are not current
manuscript evidence.

The manifest's `seed` field (`20260909`) controls suite/profile ordering. The
transfer YAML files retain their deterministic workload seed (`20260725`); both
values are part of the reproducibility context.
