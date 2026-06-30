# AGENTS.md: BAB II: Tinjauan Pustaka dan Dasar Teori

## Chapter Identity

- **Chapter:** BAB II: Tinjauan Pustaka dan Dasar Teori
- **File:** `contents/chapter-2/chapter-2.tex`
- **Purpose:** Literature review, framework comparisons, theoretical foundation for Retail CBDC
- **Position:** Foundation chapter: all Ch3-5 work builds on concepts established here

---

## DTETI Template Rules

Primary guides: `contents/appendix/appendix-latex.tex` and
`contents/appendix/appendix-penulisan-referensi.tex`. Template behavior remains
defined by `thesisdtetiugm.cls`.

- Chapter title: `\chapter{Tinjauan Pustaka dan Dasar Teori}`.
- Use `\section{}` and `\subsection{}` directly; do not add `\textbf{}` inside them.
- Let the class control paragraph spacing, font, margins, and chapter pagination.
- Do not add `\clearpage` inside the chapter body.

### Figures

```latex
\begin{figure}[htbp]
  \centering
  \includegraphics[width=10cm]{contents/chapter-2/filename}
  \caption{Full caption.}
  \label{fig:ch2-unique-label}
\end{figure}
```

- Use `[htbp]` so LaTeX can prevent clipping; use `[p]` for a full-page figure.
- Keep captions below figures and within page margins.
- Use unique lowercase labels with prefix `fig:ch2-`.
- Refer in prose with `Gambar \ref{fig:ch2-label}`.
- Cite an external figure source with `\cite{key}` in the caption or adjacent prose.

### Tables

```latex
\begin{table}[htbp]
  \caption{Caption above table.}
  \vspace{0.5em}
  \centering
  \begin{tabular}{...}
  ...
  \end{tabular}
  \label{tab:ch2-unique-label}
\end{table}
```

- Use `table` + `tabular` for a table that fits one page.
- Use `longtable` only when the table must continue across pages; define repeated
  headers and keep the caption above the first segment.
- Use unique lowercase labels with prefix `tab:ch2-` and refer with
  `Tabel \ref{tab:ch2-label}`.
- Never allow a table to extend beyond the text width.

### Equations, Lists, and Algorithms

- Use `equation` for numbered display equations and `$...$` for inline equations.
- Use `\mathit{...}` for multi-letter mathematical expressions that must not be
  spaced as separate variables.
- Use `align`/`align*` for equation sequences; `\allowdisplaybreaks` permits a long
  sequence to continue across pages.
- Use `enumerate` for ordered items and `itemize` for unordered items.
- Split a multipage algorithm with `\algstore{name}` and `\algrestore{name}`.
  Put `\caption` and `\label` only on the first algorithm block.

### Citations

- Use numeric IEEE citations through `\cite{key}` or `\cite{key1,key2}`.
- `main.tex` uses `\bibliography{references}` and `thesisdtetiugm.cls` uses
  `IEEEtran`; `references.bib` is the only active bibliography database.
- Never invent a citation key or cite an entry absent from `references.bib`.
- Manage sources in Mendeley when practical, export as BibTeX, then verify the
  exported fields before committing them.
- Match entry fields to source type: books need publisher/year; conference papers
  need booktitle/year/pages and DOI when available; online sources need a canonical
  public URL; theses need degree type, department, institution, location, and year.
- Never store institutional proxy URLs. Prefer a verified DOI; otherwise use the
  publisher, institution, or project canonical URL.
- Preserve corporate authors with braces, for example `author = {{Bank Indonesia}}`.

### Verification

- Build bibliography changes with `rtk pdflatex`, `rtk bibtex main`, then two more
  `rtk pdflatex` passes.
- Reject undefined citations/references, `??`, overfull boxes, clipped figures or
  tables, overlapping text, and warning text embedded in images.
- Render and inspect affected PDF pages; a successful compile alone is insufficient.

### Language

- `babel[english,bahasa]`: bahasa primary
- English technical terms: `\textit{term}` on first occurrence only, roman after
- Examples: `\textit{Central Bank Digital Currency} (CBDC)`, `\textit{Hyperledger Fabric}`, `\textit{smart contract}`, `\textit{chaincode}`, `\textit{Execute-Order-Validate}`, `\textit{Proof of Stake} (PoS)`, `\textit{Practical Byzantine Fault Tolerance} (PBFT)`, `\textit{Raft}`
- Full term on first use, abbreviation consistently after

---

## Writing Style

Referenced from `thesis/Skripsi Luthfi Izzudin.pdf` (format/tone model, different topic).

- Passive voice for descriptions: "metode diusulkan", "kerangka dibandingkan"
- Active voice for analysis: "analisis menunjukkan", "perbandingan mengidentifikasi"
- No first-person: use "penelitian ini" not "penulis"
- Decimal separator: **comma**: "50,3" not "50.3"
- Thousands separator: **period**: "1.000" not "1,000"
- Table/figure captions: sentence-case, end with period
- Section transitions: one sentence linking previous section to next
- When citing prior works, describe: author, year, method, contribution, limitation

---

## Hyphenation

Globally handled in `main.tex` lines 56–59:

```latex
\tolerance=1
\emergencystretch=\maxdimen
\hyphenpenalty=10000
\hbadness=10000
```

No per-chapter hyphenation action needed.

---

## Sections

### 1. `\section{Tinjauan Pustaka}`

Systematic review of prior works. Must include **Tabel 2.1** with columns:

| Penulis/Tahun | Metode | Kontribusi | Keterbatasan |
|---------------|--------|-----------|--------------|

Prior works to cover:

- CBDC adoption studies (global trends, user acceptance factors)
- Blockchain-for-CBDC implementations (Fabric, Iroha, Ethereum, Corda comparisons)
- AML/KYC/privacy papers in DLT context
- Indonesian CBDC, KYC, and payment-settlement research
- Performance benchmarking of blockchain-based payment systems
- End with summary paragraph identifying research gap that this thesis fills

**Remove existing template example** (`\subsection{Pengenalan Aplikasi Permainan}` + game design content). That is unrelated to CBDC thesis.

### 2. `\section{Dasar Teori}`

Theoretical foundation subsections:

- `\subsection{CBDC}`: definition, classification (Retail vs Wholesale), design choices (token-based vs account-based), global implementations
- `\subsection{Blockchain dan Distributed Ledger Technology}`: DLT fundamentals, blocks, transactions, immutability, decentralization
- `\subsection{Hyperledger Fabric}`: architecture (peer, orderer, CA), Execute-Order-Validate model, channel, chaincode, endorsement policy, MSP, private data collections
- `\subsection{Mekanisme Konsensus}`: rationale for selecting consensus mechanism; compare PoW, PoS, PBFT, Raft; justify Fabric's pluggable consensus
- `\subsection{KYC dan AML}`: regulatory requirements for CBDC; KYC tiers (BASIC, STANDARD, MERCHANT); AML transaction monitoring; Indonesia OJK/BI regulatory context
- `\subsection{Transfer Ritel Langsung}`: shared ledger policy for customer-to-customer and customer-to-merchant transfers

**Remove** `\subsection{Dasar Teori Lainnya}` (empty placeholder). Remove `\subsection{Pengenalan Aplikasi Permainan}` (template example).

### 3. `\section{Analisis Perbandingan Metode}`

Comparative tables with qualitative/quantitative analysis:

- **Tabel 2.2**: Blockchain frameworks comparison: Hyperledger Fabric vs Iroha vs Ethereum vs Corda vs Besu (columns: consensus, smart contract lang, privacy, permissioning, throughput, CBDC suitability)
- **Tabel 2.3**: Consensus mechanisms: PoW vs PoS vs PBFT vs Raft (columns: throughput, latency, fault tolerance, energy, finality, CBDC suitability)
- **Tabel 2.4**: State databases: LevelDB vs CouchDB (columns: query capability, rich queries, indexing, performance, CBDC use case)
- **Tabel 2.5**: Testing/benchmarking tools: Hyperledger Caliper vs Blockbench (columns: supported platforms, metrics, ease of use, reporting)

#### Tabel 2.4 Content: LevelDB vs CouchDB

| Kriteria | LevelDB | CouchDB |
|---|---|---|
| Tipe | Embedded key-value store | Basis data dokumen JSON (eksternal) |
| Query | Key/composite-key only | Mango Query (ad-hoc JSON) |
| Rich query | Tidak didukung | Didukung natively |
| Indeks | Tidak ada | Index definition via JSON |
| Performa lookup sederhana | **Lebih cepat** (~10–30% lebih rendah latensi) | Overhead TCP ke proses eksternal |
| Performa query kompleks | Tidak dapat dilakukan | Didukung dengan indeks |
| Format penyimpanan | Bytes biner | Dokumen JSON native |
| Ketergantungan deployment | In-process, tidak ada container tambahan | Container terpisah per peer |
| Konsumsi memori | ~50 MB per peer | ~200–400 MB per instance |
| CBDC suitability | Rendah (tidak mendukung query supervisi) | **Tinggi** (mendukung pelaporan regulatori) |

Sumber: \cite{thakkar2018performance}, \cite{androulaki2018hyperledger}, dokumentasi resmi Hyperledger Fabric \cite{hyperledger2024couchdb}.

#### Justifikasi Pemilihan CouchDB untuk Retail CBDC

CouchDB dipilih sebagai basis data world state karena tiga alasan utama:

**1. Rich query merupakan kebutuhan mutlak, bukan opsional.**
State CBDC ritel (dompet, profil KYC, peserta, batas tier) bersifat JSON semantik yang kaya. Query supervisi dan kepatuhan tidak dapat diekspresikan sebagai key lookup:
- "Semua peserta dengan `status = frozen`"
- "Semua dompet dengan `balance > threshold` untuk rekonsiliasi"
- "Semua profil KYC dengan `risk_level = high` dan `expires_at < now`"

LevelDB memaksa chaincode mempertahankan composite key buatan tangan (mis. `STATUS~PARTICIPANT_ID`) sebagai solusi alternatif: rapuh, sulit diaudit, dan melanggar separation of concerns \cite{androulaki2018hyperledger}.

**2. Pelaporan regulatori CBDC memerlukan fleksibilitas query.**
BIS menyatakan bahwa bank sentral membutuhkan alat pengawasan yang memungkinkan query real-time dan historis pada ledger \cite{auer2020technology}. Framework regulasi OJK untuk AML/KYC mengharuskan pemantauan transaksi lintas tier pelanggan (BASIC/STANDARD/MERCHANT), yang tidak mungkin dilakukan dengan LevelDB saja.

**3. Overhead performa dapat diterima untuk konteks CBDC.**
Thakkar et al. \cite{thakkar2018performance} mengukur overhead CouchDB sebesar ~10–30\% pada operasi state sederhana dibandingkan LevelDB. Untuk sistem CBDC dengan volume transaksi yang tidak setara HFT (\textit{High-Frequency Trading}), overhead ini dapat diterima dan diimbangi oleh kemampuan query regulatori yang wajib dipenuhi.

End with justification: why Fabric + Raft + CouchDB + Caliper chosen for this thesis.

### 4. `\section{Pertanyaan Tugas Akhir (Jika Perlu)}` (Optional)

Only include if Research Questions (RQ) complement Research Objectives (RO) from Ch1. One RO can have multiple RQs. Keep RQs distinct from Rumusan Masalah: RQs are more specific, testable sub-questions.

---

## Knowledge Graph

**Authoritative communities from `graphify-out/`:**

| Community | Nodes | Relevance |
|-----------|-------|-----------|
| CBDC Adoption Research | 117 | Adoption factors, CBDC papers for Tinjauan Pustaka |
| Privacy AML Compliance | 80 | Privacy-compliance tension, KYC tier justification |
| Chaincode Smart Contracts | varies | Smart contract design patterns, chaincode lifecycle |
| Blockchain Performance Research | 34 | Consensus comparison, benchmarking methodology |

**Key nodes for Ch2 context:**

- `SmartContract` (83 edges): chaincode architecture, endorsement policies
- `Execute-Order-Validate`: Fabric transaction flow
- Raft consensus: ordering service design
- Privacy-AML tension nodes: KYC tier rationale
- CBDC global implementation nodes: e-Krona, Sand Dollar, e-CNY, Digital Rupee

---

## Constraints

- Do NOT invent `\cite{key}` keys: only keys from `references.bib`; add new entries to `references.bib` first
- Do NOT change `\section{}` title strings
- Do NOT reference MeetCoin: irrelevant
- Remove ALL template example content: game design subsection, `gambar-buatan-sendiri.png`, template citations (`ferdiana2012agile`, `lukito2016`, `wibirama2013dual`)
- Remove `\textcolor{red}{...}` instructional comments
- Table numbers: Tabel 2.1, Tabel 2.2, etc. (not generic)
- Cross-chapter references: use "Bab I" or "Bab III" format, never "chapter-3.tex"
- Dasar Teori subsections: cover Retail CBDC concepts only (not wholesale/Iroha)
- Add and verify every cited source directly in the active `references.bib` database.
- Performance data citations: prefer peer-reviewed sources over vendor benchmarks

---

## Bahasa Indonesia Grammar (PUEBI / EYD)

Reference: KBBI (Pusat Bahasa, 2008), Pedoman Umum Ejaan Bahasa Indonesia yang Disempurnakan.

### Kata dan Penulisan

**Kata Depan ("di", "ke", "dari") vs Awalan:**
- Kata depan: ditulis terpisah: `di dalam`, `ke atas`, `dari Jakarta`
- Awalan (imbuhan): ditulis serangkai: `dilakukan`, `menggunakan`, `diterapkan`
- BEDA: `di uji` (kata depan, salah) → `diuji` (awalan, benar)
- BEDA: `dilakukan di sistem` (kata depan, benar) vs `disistem` (salah)

**Partikel "pun":**
- Ditulis terpisah: `apa pun`, `siapa pun`, `di mana pun`
- Ditulis serangkai (pengecualian): `adapun`, `andaipun`, `bagaimanapun`, `biarpun`, `kalaupun`, `maupun`, `meskipun`, `sekalipun`, `walaupun`

**Kata Ulang:**
- Gunakan tanda hubung: `sistem-sistem`, `data-data`
- Angka tidak boleh diulang: `dua` bukan `dua-dua` (kecuali idiom)

**Gabungan Kata:**
- Serangkai: `daripada`, `kepada`, `apabila`, `bagaimana`
- Terpisah: `penanggung jawab`, `mata uang`, `uji coba`, `terima kasih`
- Jika dapat awalan/akhiran → serangkai: `dipertanggungjawabkan`, `mengujicobakan`

### Huruf Kapital

- Awal kalimat
- Nama orang, lembaga, negara: `Bank Indonesia`, `Hyperledger Fabric`
- Judul bab/section (di-handle otomatis oleh .cls)
- TIDAK kapital: nama bidang ilmu (`teknologi informasi`), istilah umum (`blockchain`)
- TIDAK kapital setelah tanda koma

### Huruf Miring / Italic (`\textit{}`)

- Istilah asing pertama kali muncul: `\textit{Central Bank Digital Currency} (CBDC)`
- Kata/istilah Latin: `\textit{et al.}`, `\textit{ad hoc}`
- Judul buku/jurnal dalam daftar pustaka
- Setelah didefinisikan: gunakan roman (tidak miring)

### Angka dan Bilangan

- 1–10: tulis huruf (`satu`, `tiga node`)
- >10: tulis angka (`100 transaksi`, `25 peer`)
- Awal kalimat: harus ditulis huruf (`Seratus transaksi diuji...`)
- Satuan: `50 TPS`, `200 ms`: angka diikuti spasi, satuan sesuai standar
- Desimal: koma: `50,3` bukan `50.3`
- Ribuan: titik: `1.000` bukan `1,000`
- Rumus: boleh angka

### Tanda Baca

- Koma sebelum konjungsi antar-kalimat: `...diuji, sedangkan...`, `...valid, tetapi...`
- Koma sebelum `yaitu` dan `adalah` (opsional, konsisten per dokumen)
- Titik koma: pisahkan klausa setara dalam kalimat majemuk
- Tanda hubung (-): kata ulang, perangkai
- Tanda pisah (—): hanya bila benar-benar diperlukan; lebih pilih koma, tanda kurung, atau titik koma
- Kurung: penjelasan, singkatan pertama

### Kalimat Akademik

- Struktur: SPOK (Subjek-Predikat-Objek-Keterangan): kalimat lengkap
- Hindari: `di mana` sebagai pengganti "tempat" → gunakan `tempat` atau `dalam hal ini`
- Hindari: `daripada` untuk perbandingan → gunakan `dibandingkan dengan`
- Hindari: awalan `ke-` untuk membentuk kata kerja → bukan `ketimbang`, gunakan `dibandingkan`
- Kalimat efektif: satu gagasan per kalimat, hindari kalimat terlalu panjang (>25 kata)
- Paragraf: satu gagasan utama, 3–8 kalimat

### Kata Baku

- Gunakan kata baku, hindari bentuk lisan:
  - `tidak` bukan `enggak`
  - `tetapi` bukan `tapi`
  - `sudah` bukan `udah`
  - `melakukan` bukan `ngelakuin`
  - `memberikan` bukan `ngasih`
- Hindari singkatan tidak baku: `yg` → `yang`, `dg` → `dengan`, `ttg` → `tentang`
- Singkatan umum boleh setelah didefinisikan: `dkk.`, `dsb.`, `dst.`

### Pengecekan

- KBBI daring: `https://kbbi.kemdikbud.go.id/`
- Jika ragu ejaan kata baku: cek KBBI daring, bukan Google Translate

---
