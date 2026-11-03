# AGENTS.md: BAB IV: Hasil dan Pembahasan

## Chapter identity

- **Chapter:** BAB IV: Hasil dan Pembahasan
- **File:** `contents/chapter-4/chapter-4.tex`
- **Purpose:** Present and discuss implementation results and performance; compare with prior work.
- **Position:** Core evidence chapter. Every conclusion in Bab V must trace to data here.

Shared rules, Bahasa policy, and the supervisor persona: `../../AGENTS.md`.

---

## Current structure

`chapter-4.tex`, in order:
1. `\section{Hasil Implementasi Sistem}`
   - Jaringan Hyperledger Fabric
   - Chaincode Studi Rupiah Digital
   - Backend API (`tab:peran`: role access table)
   - Hasil Pengujian Fungsional (30/30 scenarios, 296/296 API cells, 28/28 validation, 45/45 actions; SRS mapping FR-01..05, NFR-02)
2. `\section{Hasil Evaluasi Kinerja Final}`: environment (`tab:lingkungan-kinerja-final`), binary-search protocol, NFR-04 (TBD), NFR-05 (manifest only).
3. `\section{Perbandingan Hasil Penelitian dengan Hasil Terdahulu}`: `tab:perbandingan-cbdc` (Aryani 2023, PoC Proyek Garuda 2024, Penelitian ini), Rohmalia paragraph, scope caveat.
4. `\section{Hasil Uji Kontrol pada Lingkungan Terisolasi}`: test conditions; `tab:ch4-kapasitas-kontrol` (43 workloads), `tab:ch4-latensi-kinerja` (43 rows), `tab:ch4-sumber-daya-kontrol`. Subsection `Pembahasan`.

Ch4 refers to `fig:ch3-study-sequence-*`, which live in Bab III. This chapter has no figure environments of its own.

## Chapter rules

- Open by restating T1 and T2 in order, by name.
- Each result follows this pattern: table or figure, then "Hasil pada Tabel X menunjukkan bahwa ...", then interpretation, then baseline comparison.
- Numbers come only from the canonical Caliper run. Never alter a reported number. Never estimate. Keep TBD cells until that run lands.
- Every number must be reproducible from the Caliper output. State units: TPS, s, ms, % CPU, MB.
- Decimal comma, thousands dot. Round to 1 decimal for TPS and 2 decimals for latency in ms.
- Report failures and negative results in the text.
- Ch4 does not redefine metrics. Ch3 holds the definitions.

## Supervisor checks

From `thesis_deren.pdf` and `thesis_grandiv.pdf`, Bab IV:
- The opening restates T1 and T2 in order. Today it names "tujuan pertama" and "kedua" and does not quote them.
- Each result follows the table, then interpretation, then comparison pattern above.
- A dedicated Keterbatasan section is required. Limitation prose is scattered across the chapter, and Bab V has a separate limitations paragraph. Consolidate.
- Ancaman Validitas is optional. None today.
- Prior-work comparisons carry the caveat "konteks, bukan kesetaraan langsung" (`thesis_grandiv.pdf`, Tabel 4.9). `tab:perbandingan-cbdc` already has the caveats: keep them.
- State the run count or random seed for every benchmark. `thesis_deren.pdf` and `thesis_grandiv.pdf` both do this. Missing today.
- Unit tests vs correctness: the functional section counts unit tests (around line 108), but a later section excludes them (around lines 129 and 259). Pick one definition.
- Scenario count: "30 dari 30 skenario fungsional" against 32 correctness scenarios in `case-catalog.json`. Reconcile.
- Environment: `tab:lingkungan-kinerja-final` says the patch was not recorded. Record the Fabric patch (ADR 0012 pins 2.5.16).
- Performance tables are TBD: `tab:ch4-kapasitas-kontrol`, `tab:ch4-latensi-kinerja`, `tab:ch4-sumber-daya-kontrol`, and the TBD row of `tab:perbandingan-cbdc`. Leave them until the canonical run.
- If code listings are added, explain each line or move the listing to the Lampiran.

## Constraints

- Cite only keys in `references.bib`.
- Do not change section title strings unless the user asks.
- Do not claim a result the Caliper output does not show. Report unexpected results honestly.
- Cross-chapter references: "sesuai dengan skenario pengujian pada Bab III", "seperti dijelaskan pada Bab II".
- Every table and figure has a `\label{}` and a `\caption`.
- Never put `network/.env.study` values in the thesis.
