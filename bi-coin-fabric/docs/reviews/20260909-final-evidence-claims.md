# Final evidence claim map

> **Four-organization restatement (2026-10-16):** five-organization evidence in this document is superseded by the four-organization network (CentralBankMSP, DistributorMSP, ValidatorMSP, EndUserMSP) and by its benchmark run `compliance-run-20261014-01`. The role `validator_bank` and participant type `validator` were removed; banks are the Distributor Bank participant type `distributor`. Role and participant names are restated in four-organization terms; claims, counts, and artifact names stay as recorded, and only rows whose Status is Current are evidence for the four-organization prototype.

This map is the citation boundary for the revised thesis, paper, and defense
briefs. Performance values are local measurements; `PASS` rows are semantic
oracles, not production-capacity claims. Cite only rows whose Status is Current;
Superseded rows keep the five-organization package for provenance and are not
citable.

| Claim | Source of truth | Evidence artifact | Status |
|---|---|---|---|
| All 20 catalogued correctness scenarios pass; API authorization passes 207 of 207 cells, malformed-request validation 27 of 27 cases, and bodyless action outcomes 15 of 15, with no unresolved API checks. | `benchmark/compliance/case-catalog.json` | `benchmark/results/runtime-workspaces/compliance-run-20261012-06/workspace/benchmark/results/compliance-run-20261014-01/REPORT.md` (Functional correctness) and `correctness.json` in the same directory | Current (four-organization) |
| Write confirmed passing throughput on the four-organization network is 0.184 to 4.75 TPS across 21 write workloads. The five-organization transfer sweep at 30 and 60 TPS offered load has no four-organization equivalent in this map. | `benchmark/results/runtime-workspaces/compliance-run-20261012-06/workspace/benchmark/results/compliance-run-20261014-01/REPORT.md` | Per-workload rows in that `REPORT.md` | Current (four-organization) |
| Read confirmed passing rate on the four-organization network is 272 to 296 operations per second offered across 10 read workloads; delivered load fell below target in the failing probes, so these are lower bounds on read capacity. | `benchmark/results/runtime-workspaces/compliance-run-20261012-06/workspace/benchmark/results/compliance-run-20261014-01/REPORT.md` | Per-workload rows in that `REPORT.md` | Current (four-organization) |
| No four-organization peak-repetition claim is made. | None | None | Current (four-organization) |
| The four-organization network runs one peer per organization, with CentralBankMSP as the orderer organization; this map records no orderer or state-database count for it. | `network/configtx.yaml`; `network/docker-compose.yaml` | `correctness.json` in the `compliance-run-20261014-01` directory (`ledger.peers` lists the four MSPs) | Current (four-organization) |
| Two-tier custody is BI Treasury → Distributor Bank/PJP Custodian → retail wallet. | `chaincode/digital_rupiah.go`; `docs/diagrams/plantuml/activity-diagrams.puml` | `benchmark/results/20260909-final-08-functionality.log` | Superseded (five-organization); replaced by `compliance-run-20261014-01` scenarios `conversion-*` and `redemption-conservation` |
| Direct retail `Mint` is rejected; issuance credits `bi_treasury`. | `chaincode/digital_rupiah.go`; `chaincode/digital_rupiah_v3_test.go` | `benchmark/results/20260909-final-08-functionality.html` | Superseded (five-organization); no four-organization counterpart is recorded |
| Functional flows complete 168/168 transactions. | None (the five-organization functionality config was deleted in 5cb19cb) | `benchmark/results/20260909-final-08-functionality.log` and `.html` | Superseded (five-organization); replaced by the `compliance-run-20261014-01` functional-correctness row above |
| Boundary oracle passes all eight exact-limit cases. | `scripts/validate-boundary-log.js` | `benchmark/results/20260909-final-boundary.log` and `.html` | Superseded (five-organization); replaced by `compliance-run-20261014-01` scenario `transaction-limits` |
| Unauthorized custodian mismatch is rejected without infrastructure error. | `benchmark/workloads/custody-authorization.js` | `benchmark/results/20260909-final-08-authorization.log` and `.html` | Superseded (five-organization); replaced by `compliance-run-20261014-01` scenarios `authorization-endorsement` and `api-route-authorization-matrix` |
| Negative-path oracle enforces seven expected policy rejections. | `benchmark/workloads/negative-path.js` | `benchmark/results/20260909-final-08-negative-path.log` and `.html` | Superseded (five-organization); replaced by the `compliance-run-20261014-01` functional-correctness row above, where expected denials are checked against unchanged ledger state |
| Aggregate overspend commits 10 of 200 requests and ends at Rp40,000. | `benchmark/workloads/adversarial-double-spend.js` | `benchmark/results/20260909-final-08-aggregate-overspend.log` and `.html` | Superseded (five-organization); no four-organization counterpart is recorded |
| Final transfer failures are classified as status 11 or gateway concurrency-limit messages. | Final transfer logs and runner diagnostics | `benchmark/results/20260909-final-08-transfer-w{1,2,4}.log`, `...-transfer-repeat.log` | Superseded (five-organization); no four-organization counterpart is recorded |
| Monitored resources remain below host capacity in this run. | Final resource summary in thesis/paper | `benchmark/results/20260909-final-evidence-manifest.json` | Superseded (five-organization); `compliance-run-20261014-01` records per-round resource samples, but this map makes no below-capacity claim for it |
| The 20260909 evidence ran on one host with five organizations (superseded), one peer per organization, one Raft orderer, and CouchDB. | `benchmark/results/20260909-final-evidence-manifest.json` | Manifest runtime/topology metadata and input hashes (five-organization record) | Superseded (five-organization topology) |

Every row that cites a 20260909 artifact was produced on the five-organization topology; no four-organization rerun of those artifacts is recorded in this map.

The combined status ledger of the superseded five-organization package is
`benchmark/results/20260909-final-evidence-status.tsv`. Its manifest includes
the `20260909-final-08` sweep and the separately rerun
`20260909-final-boundary` artifacts. Historical `20260824-*` and
`20260908-*` files remain preserved for review provenance but are not current
manuscript evidence.

The five-organization manifest's `seed` field (`20260909`) controlled
suite/profile ordering. The transfer YAML files (deleted in 5cb19cb) retained
their deterministic workload seed (`20260725`); both values were part of that
package's reproducibility context.
