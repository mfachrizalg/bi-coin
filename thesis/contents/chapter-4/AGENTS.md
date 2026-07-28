# AGENTS.md: BAB IV: Hasil dan Pembahasan

## Chapter Identity

- **Chapter:** BAB IV: Hasil dan Pembahasan
- **File:** `contents/chapter-4/chapter-4.tex`
- **Purpose:** Present and discuss implementation results; compare against prior work
- **Position:** Core evidence chapter: every conclusion in Ch5 must trace to data here

---

## DTETI Template Rules

Primary guides: `contents/appendix/appendix-latex.tex` and
`contents/appendix/appendix-penulisan-referensi.tex`. Template behavior remains
defined by `thesisdtetiugm.cls`.

- Chapter title: `\chapter{Hasil dan Pembahasan}`.
- Use `\section{}` and `\subsection{}` directly; do not add `\textbf{}` inside them.
- Let the class control paragraph spacing, font, margins, and chapter pagination.
- Do not add `\clearpage` inside the chapter body.

### Figures

```latex
\begin{figure}[htbp]
  \centering
  \includegraphics[width=10cm]{contents/chapter-4/filename}
  \caption{Full caption.}
  \label{fig:ch4-unique-label}
\end{figure}
```

- Use `[htbp]` so LaTeX can prevent clipping; use `[p]` for a full-page figure.
- Keep captions below figures and within page margins.
- Use unique lowercase labels with prefix `fig:ch4-`.
- Refer in prose with `Gambar \ref{fig:ch4-label}`.
- Cite an external figure source with `\cite{key}` in the caption or adjacent prose.
- Primary figure types: Caliper result charts, performance graphs, UI screenshots, architecture screenshots

### Tables

```latex
\begin{table}[htbp]
  \caption{Caption above table.}
  \vspace{0.5em}
  \centering
  \begin{tabular}{...}
  ...
  \end{tabular}
  \label{tab:ch4-unique-label}
\end{table}
```

- Use `table` + `tabular` for a table that fits one page.
- Use `longtable` only when the table must continue across pages; define repeated
  headers and keep the caption above the first segment.
- Use unique lowercase labels with prefix `tab:ch4-` and refer with
  `Tabel \ref{tab:ch4-label}`.
- Never allow a table to extend beyond the text width.
- Primary table types: Caliper result tables, comparison tables

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
- Cite prior works for comparison in `Perbandingan Hasil Penelitian`

### Verification

- Build bibliography changes with `rtk pdflatex`, `rtk bibtex main`, then two more
  `rtk pdflatex` passes.
- Reject undefined citations/references, `??`, overfull boxes, clipped figures or
  tables, overlapping text, and warning text embedded in images.
- Render and inspect affected PDF pages; a successful compile alone is insufficient.

### Language

- `babel[english,bahasa]`: bahasa primary
- English technical terms: `\textit{term}` on first occurrence only, roman after
- Performance terms: `\textit{throughput}`, `\textit{latency}`, `\textit{send rate}` already defined in Ch2/Ch3: use roman after first use in Ch4

---

## Writing Style

Referenced from `thesis/Skripsi Luthfi Izzudin.pdf` (format/tone model, different topic).

- Active voice for findings: "hasil menunjukkan", "pengujian menghasilkan", "analisis mengidentifikasi"
- Passive voice for setup: "sistem diuji dengan", "data dikumpulkan menggunakan"
- No first-person: use "penelitian ini" not "penulis"
- Discuss numbers, not just present them: explain WHY each result occurred

### Data Discipline (CRITICAL)

- **Never alter** performance numbers after they appear: treat as canonical
- Every number must be reproducible from Caliper output
- Decimal separator: **comma**: "50,3 TPS" not "50.3 TPS"
- Thousands separator: **period**: "1.000 transaksi" not "1,000 transaksi"
- Always state units: TPS, detik (s), ms, % CPU, MB memori
- Present both raw data AND interpretation
- Round consistently: use 1 decimal place for TPS, 2 for latency (ms)

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

Section structure mirrors Ch1 Tujuan Penelitian 1:1. Replace placeholder titles with actual objective content.

### `\section{Pembahasan Tujuan N dengan Hasil Penelitian N}`

One section per research objective from Ch1. Format:

```latex
\section{Implementasi Arsitektur Retail CBDC pada Hyperledger Fabric}
```

```latex
\section{Evaluasi Performa Sistem CBDC dengan Hyperledger Caliper}
```

Each section should contain:

1. **Implementation results**: what was built/deployed
   - Chaincode functions implemented (CreateWallet, QueryWallet, Transfer, QueryTransactionHistory)
   - API endpoints operational
   - Network topology running
   - Supporting figures: UI screenshots, API response examples, Fabric network dashboard

2. **Performance evaluation**: Caliper benchmark results
   - Tables with raw Caliper output data
   - Graphs: TPS vs concurrent users, latency distribution, CPU/memory usage
   - Discuss each metric: what the number means in CBDC context
   - Compare across test scenarios (Skenario 1-5 defined in Ch3)

3. **Discussion**: interpret the numbers
   - Why did throughput plateau at N concurrent users?
   - Why is CouchDB query faster/slower than LevelDB for specific queries?
   - How do endorsement policies affect latency?
   - What are the bottlenecks?

### `\section{Perbandingan Hasil Penelitian dengan Hasil Terdahulu}`

Compare against Ch2 Tinjauan Pustaka works:

- **Tabel 4.X:** Comparison table: columns: Penelitian, Platform, Throughput (TPS), Latency (ms), Skala Pengujian, Keterbatasan
- Reference at least 3 prior CBDC/blockchain studies from Ch2
- Discuss advantages and limitations of this thesis approach
- Be honest about weaknesses: academic integrity

---

## Result Presentation Templates

### Caliper Result Table

```latex
\begin{table}[htbp]
  \caption{Hasil pengujian throughput dengan variasi send rate}
  \label{Tab:ch4-throughput}
  \centering
  \begin{tabular}{cccccc}
  \hline
  \textbf{Send Rate (TPS)} & \textbf{Sukses} & \textbf{Gagal} & \textbf{Throughput (TPS)} & \textbf{Latency Min (s)} & \textbf{Latency Max (s)} \\
  \hline
  50 & 500 & 0 & 48,7 & 0,12 & 0,45 \\
  100 & 980 & 20 & 95,3 & 0,15 & 0,89 \\
  ... & ... & ... & ... & ... & ... \\
  \hline
  \end{tabular}
\end{table}
```

### Performance Graph

```latex
\begin{figure}[htbp]
  \centering
  \includegraphics[width=14cm]{contents/chapter-4/throughput-vs-sendrate.png}
  \caption[Throughput terhadap send rate]{Grafik throughput terhadap send rate pada pengujian transfer}
  \label{Fig:ch4-throughput-graph}
\end{figure}
```

Generate graphs using ECharts/Matplotlib; export as PNG to `contents/chapter-4/`.

---

## Knowledge Graph

**Authoritative communities from `graphify-out/`:**

| Community | Nodes | Relevance |
|-----------|-------|-----------|
| Blockchain Performance Research | 34 | Benchmark interpretation, consensus performance context |
| CBDC Adoption Research | 117 | Comparison baseline: what prior CBDC studies achieved |

**Key nodes for Ch4 context:**

- `SmartContract` (83 edges): chaincode performance characteristics
- `InMemorySimulationRepository` (67 edges): simulation methodology patterns (Fabric counterpart context)

---

## Constraints

- Do NOT invent `\cite{key}` keys: only keys from `references.bib`
- Do NOT change `\section{}` title strings
- Replace ALL placeholder section titles with actual content-based titles
- Remove template instructional text (the `\begin{enumerate}` block at top)
- Every conclusion must map to evidence IN THIS CHAPTER: no claims from external sources without citation
- No new methodology discussion: that's Ch3
- No new theory: that's Ch2
- Performance numbers: derived from Caliper output only, not estimated
- If a test failed or produced unexpected results, report it honestly: don't hide negative results
- Cross-chapter references: "sesuai dengan skenario pengujian pada Bab III", "seperti dijelaskan pada Bab II"
- Treat Chapter 5 as the active `Kesimpulan dan Saran` source of truth.
- All figures and tables must have `\label{}` and `\caption[]`

---

## Bahasa Indonesia

Follow the canonical thesis-wide Bahasa Indonesia authority, grammar, and project-style policy in `../../AGENTS.md`. This chapter defines no local language override; apply only the chapter-specific rules above in addition to the parent policy.
