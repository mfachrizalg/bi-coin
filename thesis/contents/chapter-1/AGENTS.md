# AGENTS.md: BAB I: Pendahuluan

## Chapter Identity

- **Chapter:** BAB I: Pendahuluan
- **File:** `contents/chapter-1/chapter-1.tex`
- **Purpose:** Establish research context, problem, objectives, scope, benefits
- **Position:** First content chapter; sets up entire thesis

---

## DTETI Template Rules

Primary guides: `contents/appendix/appendix-latex.tex` and
`contents/appendix/appendix-penulisan-referensi.tex`. Template behavior remains
defined by `thesisdtetiugm.cls`.

- Chapter title: `\chapter{Pendahuluan}`; the class generates "BAB I PENDAHULUAN".
- Use `\section{}` and `\subsection{}` directly; do not add `\textbf{}` inside them.
- Let the class control paragraph spacing, font, margins, and chapter pagination.
- Do not add `\clearpage` inside the chapter body.

### Figures

```latex
\begin{figure}[htbp]
  \centering
  \includegraphics[width=10cm]{contents/chapter-1/filename}
  \caption{Full caption.}
  \label{fig:ch1-unique-label}
\end{figure}
```

- Use `[htbp]` so LaTeX can prevent clipping; use `[p]` for a full-page figure.
- Keep captions below figures and within page margins.
- Use unique lowercase labels with prefix `fig:ch1-`.
- Refer in prose with `Gambar \ref{fig:ch1-label}`.
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
  \label{tab:ch1-unique-label}
\end{table}
```

- Use `table` + `tabular` for a table that fits one page.
- Use `longtable` only when the table must continue across pages; define repeated
  headers and keep the caption above the first segment.
- Use unique lowercase labels with prefix `tab:ch1-` and refer with
  `Tabel \ref{tab:ch1-label}`.
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
- Example: `\textit{blockchain}`, `\textit{Central Bank Digital Currency} (CBDC)`: first use only
- Full term on first use: "Mata Uang Digital Bank Sentral (CBDC)"
- Abbreviations defined at first use, then used consistently

---

## Writing Style

Referenced from `thesis/Skripsi Luthfi Izzudin.pdf` (format/tone model, different topic).

- Passive voice for descriptions: "sistem dirancang", "penelitian dilakukan"
- Active voice for findings: "hasil menunjukkan"
- No first-person: use "penelitian ini" not "penulis"
- Decimal separator: **comma**: "50,3" not "50.3"
- Thousands separator: **period**: "1.000" not "1,000"
- Section transitions: one sentence linking previous section to next
- Formal academic Bahasa Indonesia throughout

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

Sections must match `chapter-1.tex` exactly. Do NOT change section title strings: TOC auto-generates.

### 1. `\section{Latar Belakang}`

Retail CBDC context:

- Digital Rupiah policy under Bank Indonesia Project Garuda
- Financial inclusion challenges in Indonesia (unbanked population, geographic barriers)
- Limitations of current digital payment and settlement systems
- Global CBDC trends: e-Krona (Sweden), Sand Dollar (Bahamas), e-CNY (China)
- Rationale for blockchain-based Retail CBDC vs centralized alternatives
- Prior CBDC research gap in Indonesian context

**Remove all template example boxes** (`\fbox{}` blocks with TE/TB/TIF examples). Write original content.

### 2. `\section{Rumusan Masalah}`

Numbered problem statements (3–4 questions):

- Format: `\begin{enumerate} \item ... \item ... \end{enumerate}`
- Must map 1:1 to Tujuan Penelitian (next section)
- Focus: Retail CBDC design feasibility, chaincode implementation, performance under load, KYC/AML integration
- Each statement: clear, specific, answerable by Ch4 results
- No template example boxes: write original content

### 3. `\section{Tujuan Penelitian}`

Objectives mapped 1:1 to Rumusan Masalah:

- Format: `\begin{enumerate} \item ... \item ... \end{enumerate}`
- Each objective: measurable, achievable within thesis scope
- Examples: "Merancang arsitektur Retail CBDC berbasis Hyperledger Fabric", "Mengukur throughput dan latency sistem CBDC dengan Hyperledger Caliper"
- Remove all template examples (TE/TB/TIF boxes)

### 4. `\section{Batasan Penelitian}`

Scope limits:

- Platform: Hyperledger Fabric only (not Iroha, not Ethereum)
- CBDC type: Retail (individual wallets) not Wholesale (interbank)
- Geographic: Indonesia regulatory context
- Testing: simulated workload, not production deployment
- Wallet tiers: KYC-based limits as defined in chaincode
- Remove commented-out template examples

### 5. `\section{Manfaat Penelitian}`

Academic contribution + practical impact:

- Reference model for Indonesian Retail CBDC architecture
- Empirical performance data for Fabric-based CBDC
- Input for Bank Indonesia Digital Rupiah development
- Framework for KYC-tiered wallet limits in DLT context

### 6. `\section{Sistematika Penulisan}`

One paragraph per chapter (Bab I–V) summarizing content:

- `\textbf{Bab I Pendahuluan}`: (this chapter summary)
- `\textbf{Bab II Tinjauan Pustaka dan Dasar Teori}`: prior works, framework comparisons, CBDC/blockchain theory
- `\textbf{Bab III Metode Penelitian}`: tools, SDLC approach, system design, testing plan
- `\textbf{Bab IV Hasil dan Pembahasan}`: implementation results, performance evaluation, comparison
- `\textbf{Bab V Kesimpulan dan Saran}`: conclusions, recommendations

---

## Knowledge Graph

**Authoritative communities from `graphify-out/`:**

| Community | Nodes | Relevance |
|-----------|-------|-----------|
| CBDC Adoption Research | 117 | Adoption factors, CBDC papers, global trends |
| Indonesia Central Bank Policy | 70 | BI white paper, BI-RTGS, BI-FAST, Digital Rupiah |

**Key nodes for Ch1 context:**

- `SmartContract` (83 edges): core DLT concept for CBDC
- CBDC design concepts: token-based vs account-based models
- Financial inclusion metrics in Indonesian context

---

## Constraints

- Do NOT invent `\cite{key}` keys: only keys from `references.bib`
- Do NOT change `\section{}` title strings
- Do NOT reference MeetCoin: irrelevant
- Do NOT reference Iroha/Garuda prototype: that is wholesale CBDC, different scope
- Do NOT make claims about graphify communities without reading actual node data
- Remove ALL template example boxes (`\fbox{}`, TE/TB/TIF examples)
- Remove ALL `\textcolor{red}{...}` instructional comments
- Chapter 6 referenced in `main.tex` line 154 but does not exist: ignore; Ch1-5 is complete scope
- Cross-chapter references: use "Bab II" format, never section filenames or section numbers from other chapters

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
