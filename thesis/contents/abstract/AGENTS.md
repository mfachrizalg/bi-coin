# AGENTS.md: Intisari and Abstract

## Chapter identity

- **Files:** `intisari.tex` (Bahasa Indonesia) and `abstract.tex` (English). Both hold body text only. Headings come from `thesisdtetiugm.cls` (`\chapterintisari` and `\chapterabstract`, lines 667 to 684), loaded at `main.tex:151` and `main.tex:155`.
- **Position:** front matter. Written after every chapter is final.
- **Shared rules:** `../../AGENTS.md` (thesis-wide style, Bahasa policy, supervisor persona).

## Gate (user decision 2026-11-05)

Write or rewrite either file only if all four checks pass:
1. `grep -nE 'TBD|TODO|\?\?' ../chapter-*/chapter-*.tex` returns nothing.
2. Bab IV has the final functional and Caliper numbers.
3. Bab V answers RM 1 and 2.
4. The build is clean.

If any check fails, report `file:count` and stop. On 2026-11-05 check 1 fails (chapter-3 4, chapter-4 108, chapter-5 1), check 2 fails (performance TBD in Bab IV), and checks 3 and 4 are not verified. Both files stay unedited.

## Structure: six moves in one paragraph

Reference pattern: deren Intisari p13 and Abstract p14; grandiv Intisari p15 and Abstract p16 (PDF pages).

| # | Move | Sentences | Source |
|---|---|---|---|
| 1 | Latar Belakang | 2–3 | Bab I |
| 2 | Rumusan Masalah | 1–2 | Bab I |
| 3 | Related work and gap | 2–3 | Bab II, § Posisi dan Celah |
| 4 | Method | 3–4 | Bab III |
| 5 | Results and discussion | 3–5 | Bab IV |
| 6 | Conclusion | 1–2 | Bab V |

Anchors:
- Move 3: "penelitian terdahulu ..., tetapi ..." (deren Intisari, sentences 4–5).
- Move 4: "Penelitian ini mengusulkan ..., diimplementasikan pada ..., dievaluasi pada ..." (grandiv Intisari, sentences 6–8).
- Move 5: each number paired with its condition or baseline (deren: 21,0%, 76% vs 70%; grandiv: 22 ms, 0%).
- Move 6: "Hasil ini menegaskan ..." (grandiv Intisari, sentence 12).

Gap: Move 3 restates only the Bab II gap, with "dalam korpus yang ditinjau". The abstract summarizes the whole thesis, so Bab I's no-gap rule does not bind it.

## Form

- **Length:** 280 to 350 words per file, counted without the keyword line. Measured 2026-11-05: deren 298 (Intisari) and 324 (Abstract); grandiv 291 and 294.
- **Keywords:** five per file. "Customer Due Diligence" is the first keyword in both files.
- **Excluded:** citations; figure, table, or section references; `\texttt`; MSP IDs; repo URL; run ID.
- **Punctuation:** no semicolon and no em dash.
- **Intisari:** decimal commas; English terms in `\textit{}`.
- **Abstract:** decimal points; English terms keep their `\textit{}` wrapper.
- **Order:** write Intisari first, then translate it.

## Claims

- Every number equals its Bab IV value.
- State the scope: synthetic scenarios, one host.
- No claim of identity authenticity, screening, PPATK reporting, institutional compliance, or production capacity.
- Use the term set in `../chapter-1/AGENTS.md`: CDD is the central concept. KYC only where a cited source uses it.

## Supervisor checks

- Six moves in order, each traced to its chapter.
- Intisari and Abstract match in content and in every number.
