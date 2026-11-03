# AGENTS.md: BAB II: Tinjauan Pustaka dan Dasar Teori

## Chapter identity

- **Chapter:** BAB II: Tinjauan Pustaka dan Dasar Teori
- **File:** `contents/chapter-2/chapter-2.tex`
- **Purpose:** Literature review, framework comparison, and the theory base for the Retail CBDC prototype. States the gap and novelty, limited to the reviewed corpus.
- **Position:** Foundation chapter. Ch3–5 build on its concepts.

Shared rules, Bahasa policy, and the supervisor persona: `../../AGENTS.md`.

---

## Current structure

`chapter-2.tex`, in order:
1. `\section{Tinjauan Pustaka}`
   - Penelitian Terdahulu tentang Desain dan Privasi CBDC
   - Penelitian Terdahulu Berbasis Hyperledger Fabric
   - Posisi dan Celah Penelitian: comparison table `tab:ch2-tinjauan` (prior works plus a "Penelitian ini" row), then **Kebaruan** and **Celah penelitian**, ending with the two research questions.
2. `\section{Dasar Teori}`
   - Central Bank Digital Currency (subsubsections: Model Akun/Token; Arsitektur Penerbitan)
   - Blockchain dan Distributed Ledger Technology (Struktur, Konsensus, Tipe)
   - Hyperledger Fabric (Arsitektur, Ledger, Alur Transaksi)
   - Hyperledger Caliper
   - Transfer Ritel Langsung
   - Application Programming Interface
   - Bahasa Pemrograman Go
3. `\section{Analisis Perbandingan Metode}`
   - Perbandingan Hyperledger Fabric dengan Kerangka Kerja Blockchain Lain: `tab:platform-dlt`, then Simpulan.
   - Pemilihan Alat Pengujian Blockchain: `tab:caliper-blockbench`, then Simpulan.

Other labels: `fig:cbdc-taxonomy`, `fig:akun-token`, `fig:arsitektur-cbdc-tipe`, `fig:block-structure`, `fig:merkle-tree`, `fig:raft-states`, `fig:fabric-arch`, `fig:fabric-ledger`, `fig:konsensus-raft`. No equations.

## Chapter rules

- Tinjauan Pustaka is organized by theme. Each prior work gives author and year, method, contribution, and limitation.
- The gap and novelty claims live here, not in Bab I. Limit the novelty claim to the reviewed corpus. Do not claim universal architectural novelty.
- Dasar Teori goes from general to specific. Each subsection ends with a sentence linking it to this research ("Dalam konteks penelitian ini, ...").
- Retail CBDC concepts only. Wholesale and Iroha appear only as a scope boundary.

## Supervisor checks

From `thesis_grandiv.pdf` (Tinjauan Pustaka, Tabel 2.1) and `thesis_deren.pdf` (Bab II, Tabel 2.2):
- Comparison tables carry a "Penelitian ini" column or row. `tab:ch2-tinjauan` has one; check `tab:platform-dlt` and `tab:caliper-blockbench`.
- The positioning paragraph at the end of Tinjauan Pustaka states what prior work leaves open. Present.
- Link-back sentences are missing in several Dasar Teori subsections: Struktur, Konsensus, Fabric Arsitektur, Ledger, and Alur Transaksi. Arsitektur Penerbitan, Tipe, and Caliper need checking; Tipe and Caliper end on generic CBDC suitability.
- The Kuzlu row in the Tinjauan table says "(2019)", but its key is `fabric_perf2023`. Check the year against `references.bib`.
- Every figure states its source: `Sumber: penulis` or `diadaptasi dari \cite{key}`.

## Constraints

- Add each cited source to `references.bib` first, then cite it. Never invent a key.
- Prefer peer-reviewed sources over vendor benchmarks for performance claims.
- No MeetCoin.
