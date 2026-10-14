# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Primary: thesis examiners (penguji) and supervisors at the upcoming undergraduate thesis defense (sidang pendadaran), DTETI FT UGM, Teknologi Informasi. Their job: judge in a short session whether the prototype meets its stated requirements and whether the evidence is sound.

Secondary: supervisors reviewing drafts; later readers of the final naskah.

## Product Purpose

Defense and manuscript materials for the thesis "Rancang Bangun Rupiah Digital Ritel Berbasis Hyperledger Fabric" by Muhammad Fachrizal Giffari (22/504570/TK/55192). Supervisors: Teguh Bharata Adji, S.T., M.T., M.Eng., Ph.D.; Dr. Ir. Guntur Dharma Putra, S.T., M.Sc.

Success: examiners can trace each requirement (FR-01..FR-05, NFR-01..NFR-05) to a working demonstration or a measured result without confusion about scope.

## Positioning

A working two-tier retail Digital Rupiah prototype on a permissioned Hyperledger Fabric network, built against the Proyek Garuda design documents, with reproducible Caliper benchmark evidence. Scope is a research prototype, not a production or official Bank Indonesia system.

## Operating Context

- Defense: projected slide deck (UGM template, built via Claude for PowerPoint from `../powerpoint/thesis-defense-deck-brief.md`) plus a live guided demo of the frontend.
- Manuscript: LaTeX with `thesisdtetiugm.cls`, compiled to `main.pdf`. Figures are TikZ sources in `contents/figures/`, rendered to 300 dpi PNG for slides.
- Demonstrated system: `../bi-coin-fabric/` (React/TypeScript frontend, Go backend, Go chaincode, PostgreSQL off-chain KYC, 5-org Garuda Fabric network).

## Capabilities and Constraints

- Thesis acceptance covers participant lifecycle, treasury issuance, two-tier distribution, retail transfer, participant freeze, and supervision. KYC is implementation-only and QRIS is code-only; both are excluded from acceptance criteria and must be labeled so.
- Monetary flow: Bank Indonesia Treasury -> Validator Bank/PJP Custodian -> Retail Customer/Merchant wallet.
- Terminology is binding: `../bi-coin-fabric/CONTEXT.md` terms and their Avoid lists (for example, Issuance not Minting; Participant roles are Validator Bank, Observer, and PJP).
- Frontend interface decisions live in `../bi-coin-fabric/docs/adr/0004-frontend-experience-boundaries.md` and `0005-frontend-language-and-interface-design.md`.
- Benchmark numbers come only from the canonical 113543 worker-sweep run (transfer 7.8–14.5 TPS, functional 3.7–19.9 TPS, 616 tx, 0 failures). The 9.0/45.9/57.7 single-run figures are retired.
- Undecided: final defense date (`main.tex` still reads 8–13 Juli 2026) and examiner names.

## Brand Commitments

- DTETI UGM thesis class structure and formatting are fixed for the naskah.
- The defense deck keeps the existing UGM template layout, the `www.ugm.ac.id` header, and the "Locally Rooted, Globally Respected" tagline.
- Visible thesis and deck text is formal Bahasa Indonesia (EYD/PUEBI, per `AGENTS.md`); English technical terms stay in English.

## Evidence on Hand

- Manuscript: `main.pdf`, `contents/chapter-1` through `contents/chapter-5`.
- Figures: `contents/figures/*.tex` (TikZ), `contents/figures/activity/AD*.png`, `contents/figures/reference/` (cited third-party figures; keep attribution).
- Charts: `contents/chapter-4/generated/throughput-vs-sendrate.png`, `contents/chapter-4/generated/transfer-repeat-ci.png`.
- Deck: `../powerpoint/Powerpoint Skripsi Muhammad Fachrizal Giffari.pptx`, `../powerpoint/slide_figures/`, the deck brief, and slide prompts.
- Benchmark artifacts: `../bi-coin-fabric/benchmark/results/`.
- Absent, never fabricate: production deployment, real users, Bank Indonesia endorsement, benchmark numbers outside the canonical run.

## Product Principles

1. Traceability first: every visual claim maps to a requirement, a figure source, or a benchmark artifact.
2. Scope honesty: prototype limits (KYC implementation-only, QRIS code-only) stay visible.
3. One vocabulary: CONTEXT.md terms everywhere, from slides to code.
4. Template fidelity: DTETI and UGM templates win over new visual invention.
