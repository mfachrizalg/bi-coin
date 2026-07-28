---
type: meta
title: "Graphify Corpus Graph"
created: 2026-07-21
updated: 2026-07-23
tags:
  - meta
  - graphify
status: developing
related:
  - "[[bi-coin-fabric]]"
  - "[[thesis]]"
  - "[[paper]]"
---

# Graphify Corpus Graph

Auto-generated knowledge graph over the whole repo, built by the `graphify` skill. Separate
pipeline from this manually-curated wiki — treat as a pointer, not a source of truth to merge in.

## Last run
2026-07-23 — focused incremental semantic refresh for the 2008 *Kamus Bahasa Indonesia*
source and thesis-wide Bahasa Indonesia policy.

## Stats
- 701 files in corpus
- 1952 nodes · 3277 edges · 100 communities
- This run: 11 focused nodes and 12 edges extracted; 12 stale or superseded nodes removed
  (net: -1 node, -19 edges)
- Corrected source node: `Kamus Bahasa Indonesia (2008)` with four incident relationships;
  removed the isolated, misidentified `KBBI (Kamus Besar Bahasa Indonesia)` node
- Top god nodes: `SmartContract` (94 edges), `Central Bank Digital Currency (CBDC)` (54),
  `Handler` (50), `writeJSON()` (50)

## Scope
`.graphifyignore` now excludes `bi-coin-iroha/` entirely (previously only its vendored
`iroha/`/`iroha-3-docs/` subfolders) — bi-coin-iroha is a parallel/abandoned Iroha
implementation, not part of the thesis corpus (thesis scope is bi-coin-fabric on Hyperledger
Fabric).

`wiki/meta/graphify.md` is also excluded so this generated status page does not feed back into
its own graph corpus.

> [!key-insight] Incremental prune had a bug
> The built-in `--update` prune step compares `deleted_files` (relative paths) against node
> `source_file` (stored as absolute paths in the existing graph) — the set membership check
> silently failed, only removing 29/45 flagged files. Caught it because bi-coin-iroha's
> `garuda_core` module was still the single largest community (282 nodes) after the "correct"
> prune ran. Fixed by manually filtering any node whose `source_file` contains `bi-coin-iroha`
> — removed 470 stale nodes total. Worth reporting upstream to the graphify skill maintainer.

## Artifacts
- [Graph report](../../graphify-out/GRAPH_REPORT.md)
- [Interactive graph (HTML)](../../graphify-out/graph.html)
- [Raw graph data (JSON)](../../graphify-out/graph.json)
- [Manifest](../../graphify-out/manifest.json)

> [!gap] Not yet merged
> Nodes/entities/concepts extracted by graphify have not been reviewed or promoted into
> `wiki/entities/` or `wiki/concepts/`. Do that selectively, not in bulk — graphify output is
> unreviewed AST/semantic extraction, the wiki is curated.
