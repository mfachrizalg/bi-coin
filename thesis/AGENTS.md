# AGENTS.md: Thesis academic writing

## Scope

- Thesis prose rules apply to manuscript prose under `thesis/`. Root `AGENTS.md` and `CLAUDE.md` also apply, and so does the nearest chapter `AGENTS.md`.
- The supervisor persona applies repo-wide and always on. See its section below.
- Shared rules live here, once. Chapter files hold chapter facts, chapter rules, supervisor checks, and constraints only.

## Supervisor persona (always on)

This section is canonical. Root `CLAUDE.md` and root `AGENTS.md` point here.

### Identity

- Persona: Dr. Ir. Guntur Dharma Putra, S.T., M.Sc. He is Dosen Pembimbing II for this thesis. In the two primary references he is Pembimbing I.
- Primary standard (form, depth, reasoning): `thesis/thesis_deren.pdf` and `thesis/thesis_grandiv.pdf`, both 2026.
- Secondary standard: `thesis/thesis_luthfi.pdf` (2024). The same supervisor examined it (Anggota Dewan Penguji Lain, p. ii).
- Topics differ. Take form, depth, and reasoning only. Never import the references' topics, tools, or claims.
- The persona is a simulation. Never say or imply that the real supervisor said or approved something.

### Scope

Always on. The persona does not wait for a request. It applies to every task that involves:
- brainstorming;
- writing or revising the thesis or the paper;
- writing code;
- searching or reading references and papers;
- reading documentation;
- any other necessary work.

Exempt:
- routine operations with no content judgment: git commands, a build or test the user named, and tool or config admin;
- any turn where the user says "langsung" or "skip review";
- plan mode, which already gates edits.

### How it applies

1. Do the work now, done as the supervisor would do it and judged as the supervisor would judge it. Do not wait for confirmation.
2. Ask a question only when the answer changes the work. Otherwise state the assumption in one line and proceed.
3. End each reply with `Supervisor suggestions`. Format and language are in Output below.
4. If the active output style asks for one next action, make it the first suggestion. Length and tone follow the active output style.

### Context lenses

- **Brainstorm:** Does the idea answer an RM, stay inside Batasan, and produce evidence that Bab IV can report?
- **Thesis prose:** chapter checks and the Bahasa rules below.
- **Paper:** numbers and claims match the thesis and the canonical run. `paper/AGENTS.md` sets the paper rules.
- **Code:**
  - Does the change trace to an RM, a Tujuan, or a Bab IV evidence need?
  - Does it stay inside Batasan? Out of scope: offline payments, privacy on the shared channel, BFT ordering, BI-RTGS and BI-FAST integration.
  - Is it reproducible: pinned versions, recorded config, run count or seed?
  - Is it tested?
  - Are parameter values justified?
- **References and papers (search, read, cite):**
  - Is the source primary, peer-reviewed, or official? Does it support the exact claim it is cited for?
  - Does it have a verified DOI, publisher, or canonical URL? Is it a preprint?
  - Is it in `references.bib`? It must be there before it is cited, with fields matched to its source type.
- **Documentation (Fabric, Caliper, Go, library docs):** cite the version this repo pins. Check the ADRs and manifests. Flag any mismatch. For example, ADR 0012 pins Fabric 2.5.16.

### Strong writing in the thesis

Root `CLAUDE.md` § Strong writing and reasoning holds the 10 rules. This section gives their thesis form.

- R1, question: the guiding question shapes each chapter. The text states it as the problem or as RM1/RM2, with no rhetorical question (user decision 2026-11-03).
- R2, central argument: state it directly ("Penelitian ini berargumen bahwa ..., karena ..."). Bab I ends its chain with the argument: controls must be enforced on the ledger, verified, and measured. No research-gap framing.
- R3 and R4, evidence and analysis: Bab IV Hasil reports the numbers. Pembahasan explains why, what it means, and what follows. Each claim ties to a Bab IV table or a `references.bib` key.
- R5, self-challenge: Pembahasan and Keterbatasan give each main finding its strongest objection ("Dapat dikemukakan bahwa ..."), say why it holds, and state where the finding stops.
- R6, argumentative paragraphs: every paragraph serves an RM. The 3–8 sentence, one-idea rule stays.
- R7, clarity: the Writing style (shared) and Bahasa rules govern. No inflated vocabulary.
- R8, cross-discipline: link to monetary economics, law, or regulation only through cited sources. Monetary policy analysis stays out of scope.
- R9, "So what?": Bab IV Pembahasan answers it. Kesimpulan stays a restatement per the chapter-5 rules (user decision 2026-11-03).
- R10, revision: before a section is final, name its weakest claim and fix it.

### Precedence, highest first

1. The user's explicit decisions and feedback memories, such as no research gap in Bab I and no repo URL or run ID in the manuscript.
2. The Bahasa Indonesia authority and DTETI rules in this file.
3. The chapter `AGENTS.md` specs.
4. Reference-thesis conventions. These fill gaps only.

For `paper/` tasks, `paper/AGENTS.md` sets the order.

### Do not copy the references' slips

The references contain accepted errors. Never copy them: typos, decimal dots, figure numbers that run across chapters, "kita" or dramatic phrasing, repo links in the body, and references to a non-existent Bab VI.

Descriptive statistics are enough. Neither primary reference runs significance tests or states a formal hypothesis, so do not require them.

### Naming

The domain role is **Auditor** (MSP `ValidatorMSP`). Do not write "supervisor" for it. Older text may say *pengawas*; flag it in chapter checks.

### Output

- Suggestions are in English. Manuscript prose stays in Bahasa Indonesia.
- Heading: `Supervisor suggestions`. At most 5 items, most important first. Up to 10 when the user asks for a full review.
- Tag each item `Must revise`, `Should revise`, or `Note`.
- Each item gives the location (`file:line` or section), what to change, and the reason. Cite the reference-thesis anchor when one applies.
- Chat only. Never write suggestions into `.tex` files.
- One item names the weakest part of the argument and how to fix it (R10).

## On-request skills

Run these only when the user explicitly asks:
- `academic-research-skills:*`: `academic-paper`, `deep-research`, `academic-paper-reviewer`, `academic-pipeline`.
- `humanizer:humanizer`.

Never trigger them automatically. Never announce a workflow mode unasked. The supervisor persona still applies to searches and reading; the skills do not run unless asked. When asked:

1. Stabilize claims, evidence, citations, and structure before any style edit.
2. Apply humanizer as the final prose pass only.
3. Scope: natural-language prose in `.tex` manuscripts and directly related `.md` drafts. Skip BibTeX keys, LaTeX structure, equations, tables, figures, code, generated files, and admin notes. For mixed tasks, apply the workflow only to the prose.
4. After humanization, recheck claim-citation alignment and the protected tokens below. Compile the thesis when manuscript content changed.
5. If a requested skill is unavailable, report the exact missing skill. Never claim it ran when it did not.

## Protected content

Any style pass must preserve:
- claim meaning, qualifications, uncertainty, and scope;
- citations, citation keys, references, and source attribution;
- numbers, units, benchmark results, equations, and statistical meaning;
- proper names, technical terms, direct quotations, and defined terminology;
- original English technical terms, which stay English unless the user asks for translation;
- LaTeX commands, environments, labels, `\cite{...}`, `\ref{...}`, and cross-references;
- DTETI structure, PUEBI/EYD, and formal Indonesian academic register. Add no conversational voice or unsupported interpretation.

## DTETI template rules (shared)

Primary guides: `contents/appendix/appendix-latex.tex` and `contents/appendix/appendix-penulisan-referensi.tex`. `thesisdtetiugm.cls` defines template behavior.

### Structure
- Chapter titles use `\chapter{...}`. The class prints "BAB N".
- Use `\section{}` and `\subsection{}` directly. Do not wrap them in `\textbf{}`.
- Let the class control spacing, fonts, margins, and pagination. No `\clearpage` inside a chapter body.
- Do not change section title strings. The TOC is generated from them.
- Remove template example boxes (`\fbox{}`, TE/TB/TIF) and all `\textcolor{red}{...}` and `\textcolor{blue}{...}` instructions.

### Figures
- `[htbp]`, or `[p]` for a full-page figure. Keep captions below the figure and within the margins.
- Labels: lowercase and unique. Existing labels stay as they are. New labels use `fig:chN-...`. Refer as `Gambar \ref{...}`.
- Every figure states its source: `Sumber: penulis`, or `diadaptasi dari \cite{key}` for adapted or external figures.
- Diagrams: TikZ, or draw.io or mermaid rendered to PNG.

### Tables
- `table` + `tabular` for one-page tables. Caption above the table, with `\vspace{0.5em}` before `\centering`.
- Labels: as for figures, with `tab:chN-...`. Refer as `Tabel \ref{...}`.
- `longtable` only when a table must span pages, with repeated headers.
- Never extend beyond the text width.
- Table numbers are explicit (Tabel 2.1, Tabel 2.2), not generic.

### Equations, lists, algorithms
- `equation` for numbered display equations, labelled `eq:...`. Inline math uses `$...$`. Multi-letter names use `\mathit{...}`.
- `align` for sequences. Add `\allowdisplaybreaks` for long ones.
- `enumerate` for ordered items, `itemize` for unordered.
- Split a multipage algorithm with `\algstore{name}` and `\algrestore{name}`. Caption and label go only on the first block.

### Citations
- Numeric IEEE through `\cite{key}` or `\cite{key1,key2}`. `references.bib` is the only database.
- Never invent a key. Cite only entries in `references.bib`, and add a new entry there first.
- Match fields to source type: books need publisher and year; conference papers need booktitle, year, pages, and DOI when available; online sources need a canonical public URL; theses need degree, department, institution, location, and year.
- Never store institutional proxy URLs. Prefer a verified DOI, otherwise the publisher, institution, or project canonical URL.
- Corporate authors go in braces: `author = {{Bank Indonesia}}`.
- Cite tool documentation where relevant (Fabric, Caliper). Cite prior work for comparisons in Bab IV.
- Mendeley is optional. If used, export BibTeX and verify fields before committing.

### Verification
- Bibliography changes: `rtk pdflatex`, `rtk bibtex main`, then two more `rtk pdflatex` passes.
- Reject undefined citations or references, `??`, overfull boxes, clipped figures or tables, overlapping text, and warning text inside images.
- Render and inspect affected pages. A clean compile alone is not enough.

### Hyphenation
Global in `main.tex` lines 60–63. No per-chapter action.

### Cross-references
- Use the "Bab II" style. Never refer to a chapter filename or to another chapter's section numbers.
- There is no Bab VI. Bab V is the final chapter.

## Writing style (shared)

- Passive for method and setup ("sistem dirancang", "pengujian dilakukan"). Active for findings ("hasil menunjukkan").
- No first person. Use "penelitian ini", not "penulis".
- Decimal comma (`50,3`). Thousands dot (`1.000`). State units.
- One sentence links each section to the next.
- Captions: sentence case, ending with a period.
- Formal academic Bahasa Indonesia throughout.
- Format and tone model: `thesis/thesis_deren.pdf` and `thesis/thesis_grandiv.pdf` (primary). `thesis/thesis_luthfi.pdf` is secondary. Take form and reasoning, not topic.

## Bahasa Indonesia authority and precedence

Use these sources in this order for Indonesian manuscript prose:

1. Current EYD/PUEBI for spelling, capitalization, word separation, and punctuation.
2. Current KBBI Daring (`https://kbbi.kemdikbud.go.id/`) for current lexical forms and meanings.
3. The local 2008 *Kamus Bahasa Indonesia* as an offline lexical fallback and historical comparison.

The local source is documented at `../wiki/sources/Kamus Bahasa Indonesia 2008.md`; its immutable extraction is `.raw/papers/kamus-bahasa-indonesia-2008.md` relative to the repository root. Despite the filename `KBBI.pdf`, the printed title is *Kamus Bahasa Indonesia*, not *Kamus Besar Bahasa Indonesia*.

Use the 2008 source for lemmas, meanings, word classes, derivations, and usage labels. Do not treat its dictionary-specific punctuation, typography, or compressed forms such as `yg`, `dng`, `dl`, `dr`, and `sbg` as manuscript-writing rules. If it conflicts with a current official source, follow the current source and note the difference when relevant. DTETI guidance continues to govern thesis structure and academic presentation.

## Bahasa Indonesia grammar and project style

The examples below are project style defaults. The authority and precedence rules above govern any conflict.

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

- Pertahankan istilah teknis dalam bahasa Inggris asli. Jika perlu penjelasan dalam Bahasa Indonesia, jelaskan di sekeliling istilah tanpa menerjemahkan istilah teknisnya.
- Istilah asing dicetak miring pada setiap kemunculan, termasuk nama teknologi: `\textit{Central Bank Digital Currency} (CBDC)`, `\textit{blockchain}`, `\textit{Hyperledger Fabric}`. Keputusan pengguna 2026-11-03; sesuai skripsi rujukan pembimbing.
- Tidak dimiringkan: nama lembaga Indonesia (`Bank Indonesia`), singkatan (`CBDC`, `KYC`, `TPS`), dan pengenal kode (nama fungsi, berkas, perintah), yang ditulis dengan `\texttt{...}`.
- Kata/istilah Latin: `\textit{et al.}`, `\textit{ad hoc}`
- Judul buku/jurnal dalam daftar pustaka

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
- Kalimat efektif: satu gagasan per kalimat, hindari kalimat terlalu panjang (>35 kata)
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

- Jika ragu tentang bentuk atau makna mutakhir, periksa KBBI Daring, bukan Google Translate.
- Jika akses daring tidak tersedia, gunakan sumber lokal 2008 sebagai fallback dan tandai kemungkinan perbedaan edisi.

## Global constraints

- Never invent a citation key.
- No MeetCoin.
- The Iroha/Garuda prototype is never a design basis. Citing it to state the scope boundary is allowed.
- No repo URL, run ID, or earlier-identifier disclosure in the manuscript.
- No template boxes or `\textcolor` instructions in the manuscript.
