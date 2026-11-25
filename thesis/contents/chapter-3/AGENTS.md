# AGENTS.md: BAB III: Metode Penelitian

## Chapter identity

- **Chapter:** BAB III: Metode Penelitian
- **File:** `contents/chapter-3/chapter-3.tex`
- **Purpose:** Method: prototyping approach, requirements (SRS), architecture and design, implementation toolchain, and the test plan with metric definitions.
- **Position:** Bridge between theory (Ch2) and results (Ch4).

Shared rules, Bahasa policy, and the supervisor persona: `../../AGENTS.md`.

---

## Current structure

`chapter-3.tex`, in order:
1. `\section{Metode yang Digunakan}`
   - Metode Perancangan: Analisis Kebutuhan with SRS tables (`tab:srs-fungsional`, `tab:srs-nonfungsional`, `tab:srs-verifikasi`); Activity Diagram AD 01–07 (`fig:ch3-ad-01` to `fig:ch3-ad-07`); Arsitektur Sistem Blockchain (`fig:arsitektur-dua-jenjang` and related figures; `tab:jaringan`); Perancangan Basis Data Luring (`fig:ch3-erd-offchain`, `tab:model-data`).
   - Metode Implementasi: SDLC (`fig:sdlc-proto`); Fabric 2.5, Raft, CouchDB (`tab:state-database`); PostgreSQL rationale (`tab:ch3-db-comparison`); Go; Basis Data Luring.
   - Metode Pengujian: capacity protocol, metrics, equations `eq:benchmark-offered`, `eq:benchmark-throughput`, `eq:benchmark-latency`; justification paragraphs.
2. `\section{Alur Tugas Akhir}` (`fig:alur-penelitian`)
   - Mempelajari Proses Bisnis & Sistem Blockchain
   - Melakukan Studi Literatur
   - Menentukan Metode Penelitian
   - Pengembangan Sistem Blockchain bi-coin: installation, configuration, chaincode deploy, gateway, backend.
   - Pengujian Sistem Blockchain bi-coin: unit test, Caliper configuration, running Caliper, control experiments (`tab:uji-fungsional`, `tab:skenario`).

Other labels: `tab:ch3-chaincode-fungsi`, `tab:lingkungan-uji`, `lst:routes`, `fig:ch3-study-controls`.

## Chapter rules

Code facts the chapter must match. Read them from the source, not from older specs:
- Three chaincodes, deployed as `rupiah-monetary`, `rupiah-controls`, `rupiah-payments`. Function names in `tab:ch3-chaincode-fungsi` must match `bi-coin-fabric/chaincode/{monetary,controls,payments}`.
- Four MSPs: CentralBankMSP, DistributorMSP, ValidatorMSP (human role: Auditor), EndUserMSP. Channel `bi-coin`. Orderer: etcdraft with one consenter. State database: CouchDB.
- No KYC tiers and no risk level. Limits are set per subject via `SetLimits` (per_transaction, daily, monthly, holdings) by the KYC reviewer.
- Backend: Go 1.23, gorilla/mux. Role names come from `backend/middleware/auth.go`. Routes have no `/api` prefix.
- Caliper 0.6.0 with one worker. 42 performance workloads in `bi-coin-fabric/benchmark/compliance/case-catalog.json`. The capacity protocol follows ADR 0015.
- Metrics need a formula or an explicit start and end point. Ch4 refers back to these definitions.
- Do not include Caliper results. Ch4 holds them.
- Never copy `network/.env.study` values into the thesis or appendix. It holds plaintext credentials.

## Writing guideline

Shared patterns: `../../AGENTS.md` § Reference-thesis patterns. The rules below are for Bab III only (deren p38–66, grandiv p47–75).

- Length: both references give 29 pages. Bi-coin has 43 pages and 7,056 words. Before adding text, check whether figure size or repetition causes the extra pages.
- Opening: one paragraph names the RM and Tujuan this chapter serves (deren p38, grandiv p47).
- Method: name the approach in one sentence ("Penelitian ini menggunakan pendekatan eksperimental kuantitatif ...", deren p40). Justify it by elimination: each rejected alternative gets one sentence (grandiv p47: "Pendekatan sains perilaku murni tidak memadai ...; pendekatan rekayasa murni tanpa evaluasi rigor tidak memvalidasinya.").
- Mapping table: each process step links to the place in the thesis that carries it, with a chapter pointer (grandiv Tabel 3.1, p48).
- Alat and Bahan: a numbered list, one tool per item, with exact version and role (grandiv p48–49). List only tools that affect a result. Deren lists Zotero and Canva (p38); neither affects a result.
- Datasets: name the source and say how the datasets are combined and seeded (deren p39, "seeded random number generator").
- Architecture: one subsection per layer. Each layer lists its roles as bold, numbered items (deren p43). A responsibility table has four columns: Lapisan, Komponen, Tanggung jawab utama, Ancaman yang dimitigasi (grandiv Tabel 3.2, p51). Use it to split "Arsitektur Sistem Blockchain".
- Architecture figures show horizontal bands with the layer name at the side (deren Gambar 3.6, p43; grandiv Gambar 3.13, p51).
- Equations: introduce each with a sentence that ends in a colon. The next sentence defines each symbol: "Dalam persamaan di atas, ... merepresentasikan ..., dan ..." (deren p48–49).
- Algorithms: name each before it appears ("Algoritma 1 mendeskripsikan ...", grandiv p57). Give its Require and Ensure lines, and its complexity when it matters.
- Evaluation: each dimension is a numbered, bold-labelled item that says what is measured and how (grandiv p72–73). A methodology subsection then gives the timing tool, run structure, statistics, and reliability definition (grandiv §3.4.1, p73).
- A structural result needs no confidence interval. Say so (grandiv p73: "estimasi interval kepercayaan tidak diperlukan").
- Flow figures: Mulai and Selesai terminals, decision diamonds with Ya and Tidak branches, and a feedback loop when the process repeats (deren Gambar 3.8, p52).
- Group flow stages into named phases in dashed frames, and describe each phase in one paragraph (grandiv Gambar 3.20 and text, p75). Bi-coin's "Alur Tugas Akhir" is a bullet list; phase grouping is optional.
- Not adopted: limitations at the end of Bab III (deren §3.4, p66). Limitations go to Bab IV, as grandiv does (§4.5.2, p92).

## Supervisor checks

From `thesis_deren.pdf` (Bab III) and `thesis_grandiv.pdf` (Bab III, §3.2–3.4):
- The opening paragraph ties the chapter to the RM and Tujuan it serves. Present.
- Alat and Bahan with exact versions. There is no such section now. `tab:lingkungan-uji` has hardware and Docker, but Fabric is "2.5 (patch not recorded)" and Go has no version. ADR 0012 pins Fabric 2.5.16; record it. Record Go 1.22 (chaincode) and 1.23 (backend).
- Every metric has a formula or an explicit start and end point. Throughput, offered rate, and latency have equations. Sent count, failures, timeouts, and CPU and memory peaks do not. Define them or cut them.
- Parameter values carry a justification. Examples: capacity search bounds, 10 s probes, 3 × 30 s confirmation runs, the 25–150% load curve.
- Add an RM ↔ Tujuan ↔ evaluation dimension ↔ result-location table (`thesis_grandiv.pdf`, Tabel 3.10). Missing today.
- Split "Arsitektur Sistem Blockchain". It currently covers two-tier issuance, access control, the account model, network, use cases, and ledger objects.
- Two headings cover offline storage: "Perancangan Basis Data Luring" and "Basis Data Luring". Merge them or differentiate them.
- Scenario count: the thesis says 30 functional scenarios (`tab:uji-fungsional`). `case-catalog.json` lists 31 correctness scenarios. Reconcile before Ch3 or Ch4 cites either.
- Prototype limitations go to Bab IV (Keterbatasan), as in `thesis_grandiv.pdf` §4.5.2. The chapter spec removed the optional Bab III section, and that stays removed.

## Constraints

- Cite only keys in `references.bib`. Never invent one.
- Chaincode and API names come from the source. No `CreateWallet`, `QueryWallet`, or `QueryTransactionHistory`; those do not exist.
- Diagrams: TikZ sources sit in this chapter; `fig:ch3-study-controls` is adapted from `bi-coin-fabric/docs/diagrams/latex/`. Cite the source.
- Cross-chapter references use the "Bab II" or "Bab IV" style.
- No Iroha or Garuda implementation detail.
