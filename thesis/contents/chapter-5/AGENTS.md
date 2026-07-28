# AGENTS.md: BAB V: Kesimpulan dan Saran

## Chapter Identity

- **Chapter:** BAB V: Kesimpulan dan Saran
- **File:** `contents/chapter-5/chapter-5.tex`
- **Purpose:** Conclude research; give forward-looking recommendations
- **Position:** Final chapter: closes the thesis arc
- **WARNING:** Current `chapter-5.tex` is template stub `\chapter{Tambahan (Opsional)}`. **Rewrite as `\chapter{Kesimpulan dan Saran}`.** This is the final chapter of a 5-chapter thesis.

---

## DTETI Template Rules

Primary guides: `contents/appendix/appendix-latex.tex` and
`contents/appendix/appendix-penulisan-referensi.tex`. Template behavior remains
defined by `thesisdtetiugm.cls`.

- Chapter title: `\chapter{Kesimpulan dan Saran}`.
- Use `\section{}` and `\subsection{}` directly; do not add `\textbf{}` inside them.
- Let the class control paragraph spacing, font, margins, and chapter pagination.
- Do not add `\clearpage` inside the chapter body.

### Figures

```latex
\begin{figure}[htbp]
  \centering
  \includegraphics[width=10cm]{contents/chapter-5/filename}
  \caption{Full caption.}
  \label{fig:ch5-unique-label}
\end{figure}
```

- Use `[htbp]` so LaTeX can prevent clipping; use `[p]` for a full-page figure.
- Keep captions below figures and within page margins.
- Use unique lowercase labels with prefix `fig:ch5-`.
- Refer in prose with `Gambar \ref{fig:ch5-label}`.
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
  \label{tab:ch5-unique-label}
\end{table}
```

- Use `table` + `tabular` for a table that fits one page.
- Use `longtable` only when the table must continue across pages; define repeated
  headers and keep the caption above the first segment.
- Use unique lowercase labels with prefix `tab:ch5-` and refer with
  `Tabel \ref{tab:ch5-label}`.
- Never allow a table to extend beyond the text width.
- Optional: summary table mapping Rumusan Masalah → Tujuan → Hasil → Kesimpulan

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
- Ch5 typically has few or no citations: conclusions stand on Ch4 evidence
- Saran may cite future-work direction papers

### Verification

- Build bibliography changes with `rtk pdflatex`, `rtk bibtex main`, then two more
  `rtk pdflatex` passes.
- Reject undefined citations/references, `??`, overfull boxes, clipped figures or
  tables, overlapping text, and warning text embedded in images.
- Render and inspect affected PDF pages; a successful compile alone is insufficient.

### Language

- `babel[english,bahasa]`: bahasa primary
- English technical terms: `\textit{term}` on first occurrence only, roman after
- Most Ch5 terms already introduced in Ch1-4: use roman (non-italic) form

---

## Writing Style

Referenced from `thesis/Skripsi Luthfi Izzudin.pdf` (format/tone model, different topic).

- Active voice for conclusions: "penelitian ini berhasil merancang", "sistem mampu menangani", "hasil menunjukkan"
- Forward-looking for Saran: "penelitian selanjutnya dapat", "direkomendasikan untuk"
- No first-person: use "penelitian ini" not "penulis"
- Decimal separator: **comma**: "50,3" not "50.3"
- Thousands separator: **period**: "1.000" not "1,000"
- Kesimpulan: past tense (what was achieved/was found)
- Saran: future tense or passive recommendation

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

### 1. `\section{Kesimpulan}`

Numbered list format: `\begin{enumerate} \item ... \item ... \end{enumerate}`

Each conclusion must:

- Answer one Rumusan Masalah from Ch1 directly
- Be traceable to specific data in Ch4 (implicitly, not with `\ref{}` to every table)
- Contain no new claims beyond what was demonstrated in Ch4
- Be concise: one paragraph per conclusion item

**Structure per item:**

1. Restate the problem → "Berdasarkan rumusan masalah pertama mengenai..."
2. State what was done → "penelitian ini merancang dan mengimplementasikan..."
3. State the key finding → "hasil pengujian menunjukkan throughput sebesar X TPS..."
4. Conclude → "dengan demikian, arsitektur Retail CBDC berbasis Hyperledger Fabric layak untuk..."

**Expected conclusions (map to Ch1 Rumusan Masalah):**

| RM # | Expected Conclusion Theme |
|------|--------------------------|
| 1 | Feasibility of Retail CBDC architecture on Hyperledger Fabric |
| 2 | Performance metrics (throughput, latency) under test scenarios |
| 3 | KYC-tiered wallet system effectiveness |
| 4 | Comparison position against prior CBDC implementations |

**Optional summary table**: Rumusan Masalah → Hasil Utama → Kesimpulan (Tabel 5.1)

### 2. `\section{Saran}`

2–4 forward-looking recommendations. Format: `\begin{enumerate} \item ... \end{enumerate}`

**Guidelines:**

- Based on limitations identified during research (not just generic future work)
- Specific and actionable: next researcher should know exactly what to do
- Tie to Ch3 Batasan Penelitian and Ch4 observed bottlenecks

**Expected recommendations:**

1. **Scale up deployment**: multi-org production topology with more peers, larger transaction volumes
2. **Advanced test scenarios**: Byzantine fault injection, network partition testing, long-duration soak tests
3. **Real-world integration**: connect to actual BI-RTGS/BI-FAST sandbox and validate payment-instrument interoperability separately
4. **Security audit**: formal verification of chaincode, penetration testing of API gateway
5. **Privacy enhancements**: zero-knowledge proofs, confidential transactions for CBDC

---

## Knowledge Graph

**Authoritative communities from `graphify-out/`:**

| Community | Nodes | Relevance |
|-----------|-------|-----------|
| CBDC Adoption Research | 117 | Future research directions, adoption barriers to address |
| Blockchain Performance Research | 34 | Performance ceiling context for Saran |

**Key nodes for Ch5 context:**

- CBDC Bank Stability (8 nodes): disintermediation risk as future research direction
- Retail CBDC Implementations (6 nodes): e-Krona, Sand Dollar as comparison baselines for future work

**Note:** Ch5 draws from graphify communities primarily for Saran section (future work context). Kesimpulan section is self-contained: conclusions derive from Ch4 evidence.

---

## Constraints

- **Rewrite `chapter-5.tex` from scratch**: current content is `\chapter{Tambahan (Opsional)}` stub; replace with `\chapter{Kesimpulan dan Saran}`
- Every conclusion must map to evidence in Ch4: no speculation beyond observed data
- No new claims, no new data, no new methodology
- No `\cite{}` in Kesimpulan unless referencing external standard/comparison
- Saran must be specific to this thesis, not generic "future research" templates
- Do NOT reference MeetCoin
- Do NOT reference Iroha/Garuda prototype (wholesale CBDC, different scope)
- Cross-chapter references: "seperti dirumuskan pada Bab I", "sesuai dengan hasil pengujian pada Bab IV"
- Do not add a "Bab VI": this is the final chapter
- Remove ALL template instructional text
- If using summary table: Tabel 5.1, caption above

---

---

## Bahasa Indonesia

Follow the canonical thesis-wide Bahasa Indonesia authority, grammar, and project-style policy in `../../AGENTS.md`. This chapter defines no local language override; apply only the chapter-specific rules above in addition to the parent policy.
