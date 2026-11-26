---
type: meta
title: "Hot Cache"
created: 2026-07-28
updated: 2026-11-23
tags:
  - "meta"
  - "hot-cache"
status: developing
---

# Recent Context

## Last Updated
2026-11-23. Refreshed after the PDC major revision (Plan 1 committed, Plan 2 step 2.1 done) and the 2026-11-23 lint fix.

## Key Recent Facts
- Scope: retail CBDC for Indonesia, updating Rohmalia and Nugraha (2023). Two-tier is one design property, not the frame. CDD only: no EDD, PEP, risk level, or senior approver (decided 2026-11-06).
- PDC major revision (approved 2026-11-09, spec `.scratch/pdc-major-revision/spec.md`): CDD subject records live in a private data collection (`bi-coin-fabric/network/collections/rupiah-controls.json`). Distributor means a PJSP, bank or non-bank. CDD citations: POJK 8/2023 for banks, the BI CDD guideline (2023) for non-banks. PBI 10/2024 revokes PBI 19/10/PBI/2017.
- Network `bi-coin`: four MSPs (CentralBank, Distributor, Validator, EndUser), three Raft orderers (`orderer0..2.centralbank.bi-coin`), one Fabric CA per org. CA API runs without TLS.
- Auditor replaces supervisor. OJK and PPATK act through the Auditor role. The MSP ID stays `ValidatorMSP`.
- Payee check (2026-11-20): every payee rejection returns one opaque "transfer not permitted" error. A successful credit emits `TransferReceived`. Smoke test 21/21.
- Benchmark numbers: correctness comes from the 2026-10-21 run, and performance stays TBD (project memory `caliper-canonical-results`). Retired, never cite: 9.0 / 45.9 / 57.7 TPS, the 113543 sweep, the September statistical study, and the 2026-10-14 and 2026-10-15 runs.
- Thesis and paper carry no repo URL and no run ID.
- Garuda is a literature name only (Proyek Garuda). Prototype product strings are bi-coin.
- Reference corpus: the 2030 BI blueprints replaced the 2025 editions (2026-11-11).
- Writing precedence: current EYD/PUEBI, then KBBI Daring, then the 2008 dictionary as an offline fallback.
- Vault (2026-11-23 count): 193 source pages, 221 entities, 37 concepts.

## Recent Changes
- 2026-11-23: lint fix. Frontmatter added to this page and the ingest report. Eight empty source sections filled.
- 2026-11-20: commit `cd5a7c4`, retail-only CDD subject records in the PDC. Payee error hardening.
- 2026-11-17: commit `d944d53`, e2e specs aligned with the current backend.
- 2026-11-11: 8 source pages added for the 2030 blueprints. 2 pages superseded.

## Active Threads
- Plan 2 (`.scratch/pdc-major-revision/plan-2.md`): step 2.2 runs wait for a go or hold decision. Bab II to V and the paper follow.
- `TransferReceived` has no consumer. Decide between a listener or inbox and a documented gap.
- `wiki/domains/thesis.md` line 25 still lists the retired 9.0 / 45.9 / 57.7 TPS. Line 23 still says 5 peers and 5 CAs.
- Lint leftovers: 959 links into `.raw/` (policy question) and 4 template orphans.
- Graphify community names are stale (548 communities, 474 named). `graphify label` refreshes them.
- Page-level OCR recovery: 21 of 28 candidate pages unresolved.
