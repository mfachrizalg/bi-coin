---
type: meta
title: "Operations Log"
created: 2026-07-21
updated: 2026-11-23
tags:
  - meta
status: seed
---

# Log

New entries go at the TOP. Never edit past entries.

## 2026-11-23 update | Hot cache refresh
- Trigger: the claude-obsidian SessionStart hook now loads [[wiki/hot|Hot Cache]] every session. The cache was dated 2026-11-11 and named the retired `compliance-run-20261014-01` as the benchmark source.
- Changed: [[wiki/hot|Hot Cache]] rewritten from project memory, `bi-coin-fabric/network/configtx.yaml`, git log, and a vault page count.
- Not changed: [[thesis]] still lists retired TPS at `wiki/domains/thesis.md:25`.

## 2026-11-23 lint-fix | Frontmatter gaps and empty source sections

- Trigger: `claude-obsidian lint` (engine 1.2.0) reported 2 missing_frontmatter and 12 empty_sections. 0 dead links, 0 ambiguous targets, 0 stale index entries.
- Frontmatter: [[wiki/hot|Hot Cache]] gained `created`, `tags`, `status`. `created: 2026-07-28` is the first git commit date (no earlier evidence). [[full-corpus-ingest-report]] gained full frontmatter. `created: 2026-07-23` is the file birth time, the full-corpus ingest day.
- Empty sections: 8 source pages. [[20200306-FAQ Blueprint SPI-2025]] Concepts now links [[Know Your Customer]] (raw extraction PDF p. 2, "Know Your Customer (KYC)"). The other 7 had no concept or entity page title or alias in their raw extraction, so the section now says so instead of staying blank.
- Not changed: the 4 `wiki/_templates/*` orphans and `{{title}}` empty sections (templates by design), and the 959 links into `.raw/` (policy question, targets exist).
- Not changed: [[Know Your Customer]] concept page does not list the FAQ source in its own `related`; the Obsidian backlink covers it.

## 2026-11-11 ingest | Reference swap: 2030 Blueprints in, 2025 Blueprints superseded

- Source: `thesis/reference/` changes. 11 PDFs were extracted to `.raw/papers/` with page anchors. Centralized and LimboCoin already had wiki pages.
- Pages created: [[Blueprint-Pengembangan-Pasar-Uang-2030]], [[Blueprint-Sistem-Pembayaran-Indonesia-2030]], [[Tanya-Jawab-BSPI-2030]], [[Blockchain-Based-KYC-CDD-and-Identity-Verification]], [[RegKYC-Supporting-Privacy-and-Compliance-Enforcement-for-KYC-in-Blockchains]], [[Central-Bank-Digital-Currencies-What-Are-They-Good-For]], [[Pedoman-CDD-PJSP-Selain-Bank-KUPVA-BB-2023]], [[Addressing-Legal-Risks-CBDC-Indonesia]].
- Pages superseded: [[Blueprint-Pengembangan-Pasar-Uang-2025]] and [[Blueprint Sistem Pembayaran Indonesia 2025]]. Status set to superseded. Raw extractions kept in place.
- Citations: 2025 links in wiki pages now carry the "(superseded)" label. Claims from the 2025 editions are NOT re-verified against the 2030 editions.
- Manifest: 2025 keys in `.raw/.manifest.json` have `status: retired`. Backup at `/home/mfachrizalg/wiki-ingest-20261111/manifest.before.json`.
- Limits: summaries come from heading and keyword excerpts and abstracts, not full reads. Pedoman A_B page 1 has no text. CBDC proceedings page 1 has no text. The 2023 Pedoman cites PBI 19/10/PBI/2017, which project memory says PBI 10/2024 revokes. Verify.
- Not changed: `thesis/reference/categories.md` still names the removed 2025 PDFs (user folder).
- Graphify: the semantic pass for this reference set is blocked (subagent calls denied by a hook). `graph.json` is unchanged.

## 2026-10-17 update | Consistency fix Phase 7: memory and bi-coin-fabric wiki

- Scope: project memory, [[bi-coin-fabric]], [[wiki/index|Wiki Index]], and [[wiki/hot|Hot Cache]]. No benchmark rerun, and no code, thesis, or paper edits.
- Memory: `caliper-canonical-results` rewritten. The benchmark source is `compliance-run-20261014-01` only (resolved 2026-10-16). Older numbers are retired and the correctness re-run is pending. Added `bi-coin-network-rename` and `per-org-fabric-ca`. `MEMORY.md` lists all three.
- Pages updated: [[bi-coin-fabric]] (four-org bi-coin network, one Fabric CA per org, canonical benchmark source), [[wiki/index|Wiki Index]] (bi-coin-fabric annotation), and [[wiki/hot|Hot Cache]].
- Open: [[thesis]] still lists the retired 9.0 / 45.9 / 57.7 TPS at `wiki/domains/thesis.md:25`. That page is outside this phase's list, so it is left for a follow-up.

## 2026-07-23 ingest | Kamus Bahasa Indonesia 2008

- Source: `thesis/KBBI.pdf`
- Raw extraction: [[.raw/papers/kamus-bahasa-indonesia-2008]]
- Summary: [[Kamus Bahasa Indonesia 2008]]
- Pages created: [[Kamus Bahasa Indonesia 2008]], [[Pusat Bahasa]], [[Kebakuan Leksikal Bahasa Indonesia]]
- Pages updated: [[wiki/sources/_index|Sources Index]], [[wiki/entities/_index|Entities Index]], [[wiki/concepts/_index|Concepts Index]], [[thesis]], [[wiki/hot|Hot Cache]]
- Key insight: the 2008 dictionary is a lexical fallback; current EYD/PUEBI and KBBI Daring retain precedence for thesis writing.

<!-- full-corpus-ingest-2026-07-23-ocr-recovery:start -->
## 2026-07-23 ingest | OCR recovery rerun

- OCR: 7 recovered, 0 retained native, 0 awaiting review, 20 no-text, 1 rejected, 0 tool failures of 28 candidate pages.
- 2026-07-23: processed 10/115 canonical PDFs; 22 entities; 30 concepts.
- 2026-07-23: processed 20/115 canonical PDFs; 42 entities; 33 concepts.
- 2026-07-23: processed 30/115 canonical PDFs; 55 entities; 34 concepts.
- 2026-07-23: processed 40/115 canonical PDFs; 66 entities; 36 concepts.
- 2026-07-23: processed 50/115 canonical PDFs; 72 entities; 36 concepts.
- 2026-07-23: processed 60/115 canonical PDFs; 84 entities; 36 concepts.
- 2026-07-23: processed 70/115 canonical PDFs; 100 entities; 36 concepts.
- 2026-07-23: processed 80/115 canonical PDFs; 119 entities; 36 concepts.
- 2026-07-23: processed 90/115 canonical PDFs; 134 entities; 36 concepts.
- 2026-07-23: processed 100/115 canonical PDFs; 142 entities; 36 concepts.
- 2026-07-23: processed 110/115 canonical PDFs; 149 entities; 36 concepts.
- 2026-07-23: processed 115/115 canonical PDFs; 152 entities; 36 concepts.
- 2026-07-23: merged 69 metadata-only sources and completed the cross-source synthesis pass.
<!-- full-corpus-ingest-2026-07-23-ocr-recovery:end -->

## 2026-07-21
Re-ran graphify --update after changing .graphifyignore to exclude bi-coin-iroha/ wholesale (was excluding only vendored iroha/ and iroha-3-docs/ subfolders). Found and fixed a bug in graphify's incremental prune step (path format mismatch: relative deleted_files vs absolute source_file on existing nodes caused 470 stale bi-coin-iroha nodes to survive silently). Graph now 1953 nodes / 3296 edges / 99 communities, labeled top 25 communities. wiki/meta/graphify.md updated with fresh stats.

## 2026-07-21
Wired graphify-out/ into wiki as wiki/meta/graphify.md (pointer only, not merged into entities/concepts).

## 2026-07-21
Vault scaffolded. Mode B (GitHub/Repository) + Mode E (Research) combined. Root vault at repo root, sub-vaults at bi-coin-fabric/, thesis/, paper/. MCP obsidian-vault pointed at repo root (was placeholder path).

<!-- full-corpus-ingest:start -->
## Full-corpus ingest checkpoints

- 2026-07-21: processed 10/115 canonical PDFs; 22 entities; 30 concepts.
- 2026-07-21: processed 20/115 canonical PDFs; 42 entities; 33 concepts.
- 2026-07-21: processed 30/115 canonical PDFs; 55 entities; 34 concepts.
- 2026-07-21: processed 40/115 canonical PDFs; 66 entities; 36 concepts.
- 2026-07-21: processed 50/115 canonical PDFs; 72 entities; 36 concepts.
- 2026-07-21: processed 60/115 canonical PDFs; 84 entities; 36 concepts.
- 2026-07-21: processed 70/115 canonical PDFs; 100 entities; 36 concepts.
- 2026-07-21: processed 80/115 canonical PDFs; 119 entities; 36 concepts.
- 2026-07-21: processed 90/115 canonical PDFs; 134 entities; 36 concepts.
- 2026-07-21: processed 100/115 canonical PDFs; 142 entities; 36 concepts.
- 2026-07-21: processed 110/115 canonical PDFs; 149 entities; 36 concepts.
- 2026-07-21: processed 115/115 canonical PDFs; 152 entities; 36 concepts.
- 2026-07-21: merged 69 metadata-only sources and completed the cross-source synthesis pass.
<!-- full-corpus-ingest:end -->
