---
type: domain
title: "bi-coin-fabric"
created: 2026-07-21
updated: 2026-10-17
tags:
  - domain
  - code
status: developing
subdomain_of: ""
page_count: 0
related:
  - "[[thesis]]"
  - "[[paper]]"
---

# bi-coin-fabric

Hyperledger Fabric implementation of the two-tier CBDC design. Four-org `bi-coin` network:
CentralBankMSP (issuer peer and single-node Raft orderer), DistributorMSP (Distributor Bank and PJP),
ValidatorMSP (Observer: OJK, PPATK), and EndUserMSP. Channel `bi-coin`, CouchDB state DB, and one
Fabric CA per org (`ca.centralbank`, `ca.distributor`, `ca.validator`, `ca.enduser`). Three chaincodes
under `chaincode/` (monetary, controls, payments). Backend in Go (`backend/handlers/`), frontend in
React/TypeScript (`frontend/src/`).

## Open threads
- Uncommitted consistency-fix work in the working tree as of 2026-10-17: network rename, per-org CA,
  legacy-stack removal, and doc rewrites. Rollback tag: `pre-consistency-fix`. Commit only when the user asks.
- Verification pending: network up, 3 chaincodes deployed, per-peer issuer check, and the correctness
  suite on `bi-coin` (20/20 scenarios, 207/207 authorization cells, 27/27 validation, 15/15 actions).

## Key facts
- Caliper benchmark source is `compliance-run-20261014-01` only (resolved 2026-10-16). Take numbers
  from `benchmark/results/compliance-run-20261014-01/derived-tables.json`. Older numbers are retired,
  including the 2026-06-30 9.0 / 45.9 / 57.7 TPS run. The correctness re-run after the rename is pending.
- Network identifiers: domains `*.bi-coin`, channel `bi-coin`. Study-era identifiers still in the working
  tree, not yet renamed, include `StudyChannelName` and `FabricStudyIdentitiesJSON`
  (`backend/config/config.go`), `.env.study` and the `study-` default prefix
  (`network/network-env.sh`), the `network/README.md` title, and the "study CA" and
  "study network" messages (`scripts/network-up.sh`). The D4 disclosure ("measured under
  earlier identifiers") is the only other place the old identifiers should remain; `.env.study` waits for user approval. Evaluation
  terms ("study") stay.
- Double-spend and MVCC conflict behavior under concurrent transfers verified.

## Related
- [[thesis]]
- [[paper]]

<!-- research-corpus-links:start -->
## Research corpus

- [[CBDC Design and Policy]]
- [[Digital Rupiah and Indonesian Payments]]
- [[DLT and Blockchain Architecture]]
- [[Privacy Security and Compliance]]
- [[Performance and Benchmarking]]
- [[Adoption Inclusion Banking and Macroeconomics]]
<!-- research-corpus-links:end -->
