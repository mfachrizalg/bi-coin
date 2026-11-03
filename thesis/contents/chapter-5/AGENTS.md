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
