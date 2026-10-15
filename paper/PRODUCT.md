# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Primary: thesis examiners (penguji) and supervisors at the DTETI FT UGM undergraduate thesis defense. They read the makalah skripsi as the short companion to the naskah. Their job: check quickly that the paper's claims, figures, and numbers match the thesis and the prototype.

The paper is the DTETI makalah only. It is not currently prepared for an external IEEE venue.

## Product Purpose

IEEE-format makalah for "A Retail Digital Rupiah Prototype on Hyperledger Fabric: Two-Tier Business Processes and a Reproducible Benchmark". Authors: Muhammad Fachrizal Giffari, Teguh Bharata Adji, and Guntur Dharma Putra (DTETI UGM).

Success: an examiner can read the paper by itself, see the two-tier model, the authorization boundaries, and the benchmark method, and find no contradiction with the thesis.

## Positioning

A working retail Digital Rupiah research prototype on a permissioned Hyperledger Fabric 2.5 network. It complements the wholesale focus of Bank Indonesia's Proyek Garuda with two-tier distribution, institutional oversight, and benchmark artifacts that can be validated. It is not a production system and not an official Bank Indonesia system.

## Operating Context

- Source: `main.tex` with `IEEEtran.cls` (conference mode), bibliography `references.bib`, built to `main.pdf` with latexmk. The output is a printed or PDF document, not a screen UI.
- Visual surfaces: inline TikZ diagrams (`positioning`, `arrows.meta`, `fit`, `backgrounds`), inline pgfplots charts (`compat=1.18`), booktabs tables, and float and two-column layout inside IEEEtran.
- Review trail: `reviews/` (academic reviews, citation coverage, joint paper–thesis review, replacement study).
- Companion: `../thesis/` (naskah) and `../bi-coin-fabric/` (system and benchmark artifacts).
- Prose workflow: `AGENTS.md`. The academic-research-suite skill runs first, then humanizer, for all manuscript prose.

## Capabilities and Constraints

- The paper's claims must stay consistent with the thesis: same scope, same terminology, same numbers.
- Terminology follows `../bi-coin-fabric/CONTEXT.md` (for example, Issuance not Minting; Participant roles are Distributor Bank, Observer, and PJP).
- Monetary flow: Bank Indonesia Treasury -> Distributor Bank/PJP Custodian -> Retail Customer/Merchant wallet.
- The shared Fabric channel gives no transaction privacy. The paper must keep stating this.
- Measurements describe a single-host prototype. They do not establish production capacity or cross-machine reproducibility.
- OPEN: which benchmark evidence is binding.
  - Option A, used by the current abstract: statistical study with sustainable loads of 190 TPS (balance query), 50 TPS (freeze), 65 TPS (unfreeze), 25 TPS (redemption), and 20 TPS (low-contention transfer and merchant payment). Rp100 paired control: low contention passes 20 TPS; high contention reaches 2.01 TPS and 10.04% success. Artifacts: `../bi-coin-fabric/benchmark/results/statistical-*`, `statistical-review-replacements-20260920T173457Z-rp100`, and `reviews/replacement-study-2026-09-21.md`.
  - Option B, used by `../thesis/PRODUCT.md`: 113543 worker-sweep run (transfer 7.8–14.5 TPS, functional 3.7–19.9 TPS, 616 tx, 0 failures).
  - Until this is decided, do not add, change, or restyle benchmark numbers in figures or tables. The 9.0/45.9/57.7 single-run figures are retired under both options.

## Brand Commitments

- IEEEtran conference template structure and DTETI makalah conventions are fixed. Do not change the document class or override the template's fonts.
- Manuscript language is formal academic English. English technical terms stay as they are.
- Protected content (per `AGENTS.md`): citations, numbers, equations, labels, and cross-references keep their meaning through any edit.

## Evidence on Hand

- Manuscript: `main.tex`, `main.pdf`, `references.bib` (`references-unused.bib` is not active).
- Benchmark artifacts: `../bi-coin-fabric/benchmark/results/` (manifests, `summary.json`, `validation.json`).
- Reviews: `reviews/*.md`.
- Absent, never fabricate: production deployment, real users, Bank Indonesia endorsement, cross-machine results, and benchmark numbers outside the recorded studies.

## Product Principles

1. Consistency with the thesis: every figure, table, and number agrees with the naskah and a named artifact.
2. Evidence before style: fix claims and numbers first, then presentation.
3. Scope honesty: the single-host, prototype, and no-privacy limits stay visible.
4. Template fidelity: IEEEtran wins over new visual invention.
