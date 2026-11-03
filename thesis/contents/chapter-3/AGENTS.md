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
- No KYC tiers. Limits are set per subject via `SetLimits` (per_transaction, daily, monthly, holdings). Risk is standard or high, plus a PEP flag.
- Backend: Go 1.23, gorilla/mux. Role names come from `backend/middleware/auth.go`. Routes have no `/api` prefix.
- Caliper 0.6.0 with one worker. 43 performance workloads in `bi-coin-fabric/benchmark/compliance/case-catalog.json`. The capacity protocol follows ADR 0015.
- Metrics need a formula or an explicit start and end point. Ch4 refers back to these definitions.
- Do not include Caliper results. Ch4 holds them.
- Never copy `network/.env.study` values into the thesis or appendix. It holds plaintext credentials.

## Supervisor checks

From `thesis_deren.pdf` (Bab III) and `thesis_grandiv.pdf` (Bab III, §3.2–3.4):
- The opening paragraph ties the chapter to the RM and Tujuan it serves. Present.
- Alat and Bahan with exact versions. There is no such section now. `tab:lingkungan-uji` has hardware and Docker, but Fabric is "2.5 (patch not recorded)" and Go has no version. ADR 0012 pins Fabric 2.5.16; record it. Record Go 1.22 (chaincode) and 1.23 (backend).
- Every metric has a formula or an explicit start and end point. Throughput, offered rate, and latency have equations. Sent count, failures, timeouts, and CPU and memory peaks do not. Define them or cut them.
- Parameter values carry a justification. Examples: capacity search bounds, 10 s probes, 3 × 30 s confirmation runs, the 25–150% load curve.
- Add an RM ↔ Tujuan ↔ evaluation dimension ↔ result-location table (`thesis_grandiv.pdf`, Tabel 3.10). Missing today.
- Split "Arsitektur Sistem Blockchain". It currently covers two-tier issuance, access control, the account model, network, use cases, and ledger objects.
- Two headings cover offline storage: "Perancangan Basis Data Luring" and "Basis Data Luring". Merge them or differentiate them.
- Scenario count: the thesis says 30 functional scenarios (`tab:uji-fungsional`). `case-catalog.json` lists 32 correctness scenarios. Reconcile before Ch3 or Ch4 cites either.
- Prototype limitations go to Bab IV (Keterbatasan), as in `thesis_grandiv.pdf` §4.5.2. The chapter spec removed the optional Bab III section, and that stays removed.

## Constraints

- Cite only keys in `references.bib`. Never invent one.
- Chaincode and API names come from the source. No `CreateWallet`, `QueryWallet`, or `QueryTransactionHistory`; those do not exist.
- Diagrams: TikZ sources sit in this chapter; `fig:ch3-study-controls` is adapted from `bi-coin-fabric/docs/diagrams/latex/`. Cite the source.
- Cross-chapter references use the "Bab II" or "Bab IV" style.
- No Iroha or Garuda implementation detail.
