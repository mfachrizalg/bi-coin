# AGENTS.md

## Project Scope

This repository contains three active deliverables for the bi-coin retail CBDC thesis:

- `bi-coin-fabric/`: Hyperledger Fabric prototype, frontend, backend, chaincode, network, and benchmarks.
- `thesis/`: DTETI UGM LaTeX thesis.
- `paper/`: IEEE-style LaTeX paper.

`bi-coin-iroha/` is an abandoned parallel implementation and is outside current thesis scope. Do not modify it unless the user explicitly asks.

## Working Rules

- Preserve unrelated work. The repository may contain active uncommitted code, thesis, paper, and generated-artifact changes.
- Use the smallest complete change. Do not introduce speculative abstractions or unrelated cleanup.
- Find the owning layer before editing. Verify behavior at the relevant code, document, data, or runtime boundary.
- Treat source files as authoritative. `graphify-out/` is generated navigation material, not source of truth.
- Never use destructive Git commands or discard changes without explicit user approval.
- Never hardcode credentials, tokens, private keys, or personal data.

## Knowledge Base

The curated Obsidian knowledge base lives only in root `wiki/`.

1. For prior project decisions or cross-deliverable research context, read `wiki/hot.md` first.
2. If more context is needed, read `wiki/index.md`, then the relevant domain or note.
3. Do not crawl the whole vault or load it for self-contained coding questions.
4. Treat `.raw/` as immutable source material.
5. For wiki operations, preserve YAML frontmatter and wikilinks, update indexes, keep `wiki/log.md` append-only with newest entries at the top, and refresh `wiki/hot.md`.

Standalone `.obsidian/` directories under `bi-coin-fabric/`, `thesis/`, and `paper/` are editor configuration only. They do not contain separate knowledge bases.

## Area-Specific Guidance

### bi-coin-fabric

- Keep frontend, backend, chaincode, network, and benchmark contracts aligned.
- Prefer focused tests for the touched module; run broader checks only when the change crosses boundaries.
- Preserve explicit retail CBDC role and authorization boundaries.

### thesis

- Preserve DTETI template structure and Indonesian academic style.
- Verify citations against existing bibliography entries; never invent sources or citation keys.
- Follow any nearer `AGENTS.md` under `thesis/contents/` for chapter-specific rules.
- Compile the thesis after LaTeX changes when practical and report unrelated baseline failures separately.

### paper

- Preserve IEEE formatting, section structure, citations, and claim-to-evidence alignment.
- Keep claims consistent with implemented and benchmarked prototype scope.
- Compile the paper after LaTeX changes when practical.

## Verification and Handoff

- Prefer true red/green/refactor TDD for observable code behavior when practical.
- If TDD is not practical, state why and run the smallest relevant verification.
- Report changed files, verification commands and results, remaining limitations, and any environment work still required.
