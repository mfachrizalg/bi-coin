# AGENTS.md: BAB V: Kesimpulan dan Saran

## Chapter identity

- **Chapter:** BAB V: Kesimpulan dan Saran
- **File:** `contents/chapter-5/chapter-5.tex`
- **Purpose:** Conclude the research and give forward-looking recommendations.
- **Position:** Final chapter. Closes the thesis arc.

Shared rules, Bahasa policy, and the supervisor persona: `../../AGENTS.md`.

---

## Current structure

`chapter-5.tex`, in order:
1. `\section{Kesimpulan}`: two numbered items. Item 1 answers RM1 and carries Bab IV numbers. Item 2 answers RM2 and is TBD until the performance run lands.
2. `\section{Saran}`: eight numbered items.

## Chapter rules

- Kesimpulan has one numbered point per RM and Tujuan, in order. Each point states numbers from Bab IV and reads "Rumusan Masalah N terjawab ...".
- Kesimpulan carries no citations.
- Saran has 4–7 numbered items. Each maps to one named limitation from Bab IV or Bab V, and says what the next researcher should do.
- Kesimpulan uses past tense. Saran uses future or passive recommendation ("penelitian selanjutnya dapat", "direkomendasikan untuk").
- No new claims, data, or methods beyond Bab IV.

## Writing guideline

Shared patterns: `../../AGENTS.md` § Reference-thesis patterns. The rules below are for Bab V only (deren p97–98, grandiv p95–98).

- Length: deren has 2 pages and 523 words. Grandiv has 4 pages and 1,217 words, including contributions. Bi-coin has 2 pages and 446 words, close to deren.
- Kesimpulan: the lead-in ends with a colon: "... dapat disimpulkan bahwa:" (deren p97).
- Each point opens with a bold answer sentence: "Rumusan Masalah 1 terjawab oleh Tujuan 1." (grandiv p95). Bi-coin's "Rumusan Masalah N terjawab ..." matches.
- Each point then gives its Bab IV numbers with units and the baseline, in past tense: "... dari 86% (baseline) menjadi 88% ..." (deren p97).
- No citations in Kesimpulan (deren p97, grandiv p95).
- Saran: the intro enumerates the limitations by number, and the items follow the same numbers: "Bab IV mengidentifikasi lima keterbatasan utama, yaitu: (1) ... (5) ..." (grandiv p96). This is the mapping the chapter spec requires.
- Each Saran item opens with a bold label that names its limitation, then the next step in future or passive form: "Penelitian lanjutan perlu ..." (grandiv p97), "Penelitian selanjutnya disarankan untuk ..." (deren p98).
- Saran may cite future-work sources: grandiv p97 cites [6] and [11]; deren p98 cites [18].
- Not adopted: grandiv's Kontribusi section (§5.2, p95–96). It adds claims beyond Bab IV. Ask the user if they want it.

## Supervisor checks

From `thesis_deren.pdf` (Bab V, 2 items) and `thesis_grandiv.pdf` (Bab V, 5 numbered points, 7 saran):
- Kesimpulan item 2 depends on the TBD performance run. Keep it TBD until then.
- Saran has 8 items now. Trim to 7 or fewer.
- Saran #3 (MVCC) and #4 (issuance and conversion failures) cite no evidence in Bab IV. Find the evidence or drop them.
- Saran #8 proposes a separate Caliper run "apabila diperlukan". T2 already uses Caliper. Reword.
- Bab V's limitations paragraph lists three limitations: no reverse flow, RTGS backing out of scope, and a single DistributorMSP. None has a matching Saran. Add one or merge them.
- Each Saran names a limitation explicitly. Only one does today.

## Constraints

- No `\cite{}` in Kesimpulan. Saran may cite future-work sources already in `references.bib`.
- No MeetCoin. Iroha/Garuda is not a design basis.
- Cross-chapter references: "seperti dirumuskan pada Bab I", "sesuai dengan hasil pengujian pada Bab IV".
- No Bab VI.
