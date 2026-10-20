---
type: meta
title: "Hot Cache"
updated: 2026-10-17
---

# Recent Context

## Last Updated
2026-10-17. Consistency-fix Phase 7: project memory notes and the bi-coin-fabric wiki page now match the bi-coin network and the benchmark decision.

## Key Recent Facts
- Benchmark source for thesis and paper: `compliance-run-20261014-01` only (run `run-20261014-01`), resolved 2026-10-16. Older numbers are retired: 9.0 / 45.9 / 57.7 TPS, the 113543 sweep, and the September statistical study. The correctness re-run after the rename is pending.
- One network, named bi-coin: four MSPs, orderer under CentralBankMSP, channel `bi-coin`, domains `*.bi-coin`. The legacy demo `network/` stack is removed.
- One Fabric CA per org (`ca.centralbank`, `ca.distributor`, `ca.validator`, `ca.enduser`) replaces cryptogen. `network/bootstrap-org.sh <org>` enrolls each org.
- Auditor replaces supervisor. The Observer institution (OJK, PPATK) acts through the Auditor role. The MSP ID stays `ValidatorMSP`.
- Garuda is a literature name only (Proyek Garuda). Prototype product strings are bi-coin.
- Source-balanced, source-by-source deep ingestion is active.
- Raw PDF text preserves page boundaries and SHA-256 provenance.
- Writing precedence: current EYD/PUEBI, then current KBBI Daring, with the 2008 local dictionary as an offline lexical fallback.
- Current vault (2026-07-23 count): 185 source pages, 221 entities, 37 concepts.

## Recent Changes
- Updated source, entity, concept, and domain indexes.
- `bi-coin-fabric` domain page: network, CA, and benchmark-source facts updated.
- Project memory: `caliper-canonical-results` rewritten. `bi-coin-network-rename` and `per-org-fabric-ca` added.
- 2026-07-23: Kamus Bahasa Indonesia 2008 added as a page-addressable lexical reference. Centralized Bahasa Indonesia guidance links to it.
- Metadata-only references remain explicitly separated from full-text evidence.

## Active Threads
- Consistency-fix verification pending: network up, 3 chaincodes deployed, smoke test, per-peer issuer check, and the correctness suite on `bi-coin` (20/20 scenarios, 207/207 authorization cells, 27/27 validation, 15/15 actions).
- `domains/thesis.md` line 25 still lists the retired 9.0 / 45.9 / 57.7 TPS. Not yet updated.
- Page-level OCR recovery: 7 recovered, 0 retained native, 21 unresolved of 28 candidate pages.
- Final contradiction and comparison synthesis runs after all sources.
- Refresh Graphify after the KBI vault and governance changes land.
