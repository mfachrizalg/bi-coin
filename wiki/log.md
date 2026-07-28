---
type: meta
title: "Operations Log"
created: 2026-07-21
updated: 2026-07-23
tags:
  - meta
status: seed
---

# Log

New entries go at the TOP. Never edit past entries.

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
