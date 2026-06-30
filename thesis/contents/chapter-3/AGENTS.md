# AGENTS.md: BAB III: Metode Penelitian

## Chapter Identity

- **Chapter:** BAB III: Metode Penelitian
- **File:** `contents/chapter-3/chapter-3.tex`
- **Purpose:** Research methodology: tools, approach, system design, testing plan
- **Position:** Bridge chapter: connects theory (Ch2) to implementation results (Ch4)

---

## DTETI Template Rules

Primary guides: `contents/appendix/appendix-latex.tex` and
`contents/appendix/appendix-penulisan-referensi.tex`. Template behavior remains
defined by `thesisdtetiugm.cls`.

- Chapter title: `\chapter{Metode Penelitian}`.
- Use `\section{}` and `\subsection{}` directly; do not add `\textbf{}` inside them.
- Let the class control paragraph spacing, font, margins, and chapter pagination.
- Do not add `\clearpage` inside the chapter body.

### Figures

```latex
\begin{figure}[htbp]
  \centering
  \includegraphics[width=10cm]{contents/chapter-3/filename}
  \caption{Full caption.}
  \label{fig:ch3-unique-label}
\end{figure}
```

- Use `[htbp]` so LaTeX can prevent clipping; use `[p]` for a full-page figure.
- Keep captions below figures and within page margins.
- Use unique lowercase labels with prefix `fig:ch3-`.
- Refer in prose with `Gambar \ref{fig:ch3-label}`.
- Cite an external figure source with `\cite{key}` in the caption or adjacent prose.
- System architecture diagrams, flowcharts, UML diagrams are primary figure types here
- Use `draw.io` or `mermaid` for diagrams; render to PNG for inclusion

### Tables

```latex
\begin{table}[htbp]
  \caption{Caption above table.}
  \vspace{0.5em}
  \centering
  \begin{tabular}{...}
  ...
  \end{tabular}
  \label{tab:ch3-unique-label}
\end{table}
```

- Use `table` + `tabular` for a table that fits one page.
- Use `longtable` only when the table must continue across pages; define repeated
  headers and keep the caption above the first segment.
- Use unique lowercase labels with prefix `tab:ch3-` and refer with
  `Tabel \ref{tab:ch3-label}`.
- Never allow a table to extend beyond the text width.
- Spec tables: hardware spec, software spec, test scenario matrices

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
- Cite tool/framework documentation where relevant (Fabric docs, Caliper docs)

### Verification

- Build bibliography changes with `rtk pdflatex`, `rtk bibtex main`, then two more
  `rtk pdflatex` passes.
- Reject undefined citations/references, `??`, overfull boxes, clipped figures or
  tables, overlapping text, and warning text embedded in images.
- Render and inspect affected PDF pages; a successful compile alone is insufficient.

### Language

- `babel[english,bahasa]`: bahasa primary
- English technical terms: `\textit{term}` on first occurrence only, roman after
- Examples: `\textit{Hyperledger Fabric}`, `\textit{Hyperledger Caliper}`, `\textit{chaincode}`, `\textit{Docker}`, `\textit{throughput}`, `\textit{latency}`, `\textit{Go}`, `\textit{REST API}`
- Full term on first use, abbreviation consistently after

---

## Writing Style

Referenced from `thesis/Skripsi Luthfi Izzudin.pdf` (format/tone model, different topic).

- Passive voice for methodology: "sistem dirancang menggunakan", "pengujian dilakukan dengan"
- Procedural tone: "tahap pertama adalah", "selanjutnya dilakukan"
- No first-person: use "penelitian ini" not "penulis"
- Decimal separator: **comma**: "50,3" not "50.3"
- Thousands separator: **period**: "1.000" not "1,000"
- Technical specifications: include minimum and actual specs used
- Flowchart descriptions: explain each node/decision after diagram
- Testing methodology: define metrics with formulas before presenting results

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

### 1. `\section{Alat dan Bahan Tugas Akhir (Opsional)}`

Hardware and software specifications. Two subsections:

#### `\subsection{Alat Tugas Akhir}`

**Hardware:**

- Development machine: OS, CPU, RAM, storage specs (minimum and actual)
- If multi-node Fabric network: separate node specs or VM specs

**Software:**

- Hyperledger Fabric version, Docker/Docker Compose version
- Go version for chaincode development
- Node.js/React version for frontend
- Hyperledger Caliper version for benchmarking
- Any additional tools (VS Code, Postman, Git)

#### `\subsection{Bahan Tugas Akhir}`

- Fabric network topology specification (peer/orderer/CA count and roles)
- Test datasets: transaction payload templates, simulated user accounts
- Reference standards: BI regulatory documents, ISO 20022 (if applicable)

**Remove template examples** (notebook/stencyl/construct2/coreldraw). Replace with CBDC-specific specs.

### 2. `\section{Alur Tugas Akhir}`

SDLC approach with flowchart figure required:

- **Figure required:** flowchart showing research phases (Gambar 3.1)
- Phases: Studi Literatur → Analisis Kebutuhan → Perancangan Sistem → Implementasi → Pengujian → Analisis Hasil → Penulisan Laporan
- Explain each phase in dedicated subsection or paragraph after diagram
- Timing/schedule: approximate duration per phase (optional table)
- Flowchart reference: `\textcolor{blue}{http://ugm.id/flowcharttutorial}`

### 3. `\section{Metode yang Digunakan}`

Three method categories:

1. **Metode Perancangan**: system design approach (architectural patterns, design decisions)
2. **Metode Implementasi**: development approach (Agile/Waterfall, toolchain, version control)
3. **Metode Pengujian**: testing approach (unit tests, integration tests, performance benchmarks)

Explain how data will be analyzed: comparing Caliper metrics against baseline, comparing Fabric configurations, comparing KYC-tier performance.

### 4. `\section{Perancangan Sistem Retail CBDC}`

System architecture subsections. **Multiple figures required:**

#### `\subsection{Arsitektur Jaringan Blockchain}`

- Fabric network topology: peer orgs, orderer org, CA, channel configuration
- Node roles and counts
- Figure: network architecture diagram (Gambar 3.2)

#### `\subsection{Perancangan Chaincode}`

- Smart contract design: data structures (wallet, transaction, KYC record)
- Chaincode functions: `CreateWallet`, `QueryWallet`, `Transfer`, `QueryTransactionHistory`
- Endorsement policy definition
- KYC tier logic: BASIC (Rp 1M max), STANDARD (Rp 50M), MERCHANT (Rp 200M)
- Per-wallet limits: per-tx, daily, monthly caps
- Figure: chaincode class/sequence diagram (Gambar 3.3)

#### `\subsection{Perancangan API Gateway}`

- REST API architecture (Go + gorilla/mux)
- Role-based access: public, authenticated, kyc_verified, bank_pjp, bank_indonesia, merchant, supervisor
- API endpoint design (table format)
- Middleware: auth, rate limiting
- Figure: API gateway architecture diagram (Gambar 3.4)

#### `\subsection{Perancangan Manajemen Pengguna}`

- Wallet lifecycle: creation, KYC verification, tier upgrade
- Role hierarchy and access control
- Audit trail design

### 5. `\section{Pengujian Sistem}`

Testing methodology and scenarios:

#### Metrics definition (with formulas):

- **Success rate:** `(successful_tx / total_tx) × 100%`
- **Throughput (TPS):** transactions per second
- **Latency:** min / avg / max (in seconds)
- **Resource consumption:** CPU %, memory MB

#### Test scenarios:

- **Skenario 1:** CreateWallet throughput (varying concurrent users)
- **Skenario 2:** Transfer throughput (varying transaction sizes)
- **Skenario 3:** Query performance (LevelDB vs CouchDB comparison)
- **Skenario 4:** Multi-org endorsement latency
- **Skenario 5:** System stability under sustained load

Present as table: Skenario | Function | Concurrent Users | Duration | Metrics Collected

#### Caliper configuration:

- Benchmark config file structure
- Workload module design (Go chaincode interaction via Fabric SDK)
- Network configuration (connection profile)

---

## Knowledge Graph

**Authoritative communities from `graphify-out/`:**

| Community | Nodes | Relevance |
|-----------|-------|-----------|
| Chaincode Smart Contracts | varies | Chaincode design patterns, data structures |
| Blockchain Performance Research | 34 | Benchmarking methodology, Caliper config |
| Garuda Iroha Backend | varies | Architecture patterns (back-reference only: NOT to be confused with Retail CBDC scope) |

**Key nodes for Ch3 context:**

- `SmartContract` (83 edges): chaincode architecture reference
- `GarudaWorkflowService` (66 edges): architecture pattern reference only (Iroha/wholesale, different scope)
- `InMemorySimulationRepository` (67 edges): simulation methodology pattern

**Important:** Garuda Iroha nodes are Wholesale CBDC references. This thesis is Retail CBDC (Fabric). Use only architectural/design patterns, not Iroha-specific implementation details.

---

## Constraints

- Do NOT invent `\cite{key}` keys: only keys from `references.bib`
- Do NOT change `\section{}` title strings
- Remove ALL template examples: notebook/stencyl/construct2/coreldraw specs, TE/TB/TIF examples
- Remove `\textcolor{red}{...}` and `\textcolor{blue}{...}` instructional comments (keep `http://ugm.id/flowcharttutorial` if useful)
- Remove or repurpose `\section{Etika, Masalah, dan Keterbatasan Penelitian (Opsional)}`: not needed for this engineering thesis unless human subjects involved
- This is Retail CBDC on **Fabric**, not Wholesale CBDC on Iroha: do not reference Iroha/Garuda implementation
- Chaincode functions: use actual names from `bi-coin-fabric/chaincode/digital_rupiah.go`
- API endpoints: use actual routes from `bi-coin-fabric/backend/`
- Do NOT include Caliper results: Ch4 handles results
- All diagrams: use `\includegraphics` from `contents/chapter-3/` directory
- Cross-chapter references: use "Bab II" or "Bab IV" format
- Metrics formulas: define here, reference in Ch4 when presenting results

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
