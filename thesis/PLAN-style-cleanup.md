# Plan: Em-dash cleanup + Lampiran code trim + selective inline code

## Context

`thesis/main.pdf` (UGM skripsi, retail CBDC on Hyperledger Fabric) has two style problems flagged by the user:

1. **Em-dash overuse.** Body prose uses the AI-signature appositive pattern `X---explanation---Y` ~15 times across abstract + ch1-4. Source uses LaTeX `---` (em-dash ligature). The chapters' own `AGENTS.md` permits em dash as explanatory aside, but the user wants them reduced to only where necessary.
2. **Lampiran dumps too much code.** `appendix-code.tex` pulls 28 *full* source files (~4,266 LOC) via `\lstinputlisting`, including ~1,700 LOC of backend REST plumbing and standard Fabric network/script boilerplate, none of it the thesis's contribution. Reference thesis `thesis_luthfi.pdf` is selective: representative functions, each with a one-line intro, code as the artifact.

User decisions (confirmed):
- **Lampiran scope:** keep core chaincode (L.1-L.8) + Caliper (L.22-L.28, benchmark reproducibility); cut network config/crypto/docker, scripts, and all backend listings (L.9-L.21).
- **Inline code:** add 2-4 short captioned chaincode excerpts to a body chapter (Luthfi style), keeping the 3 existing ones.

Outcome: leaner prose, a focused Lampiran centered on the novel CBDC logic + reproducible benchmark, and the most important chaincode logic visible inline in Ch3.

## Files & wiring (verified)

- Appendix included in `thesis/main.tex:205-206`: `appendix-isi-lampiran` (intro) then `appendix-code` (28 `\section` + `\lstinputlisting`).
- Listings live in `thesis/listings/*.go|*.yaml|*.sh|*.js`.
- Existing inline snippets: `thesis/contents/chapter-3/chapter-3.tex` figures `lst:mint` (≈371), `lst:transfer` (≈403), `lst:routes` (≈458), all `\begin{figure}`+`lstlisting`+`\caption`+`\label`.

---

## Task 1 — Em-dash cleanup (body prose)

Edit `---` in body prose only. **Ignore** all `AGENTS.md` and `.log` matches (Task 4 handles AGENTS.md). Rule:
- **Paired appositive** (`X---aside---Y`) wrap aside in parentheses `(aside)`.
- **List aside** with internal commas parentheses (clearer than nested commas).
- **Single connective** `---` joining two clauses `,` or `;` per flow.
- **Keep** table N/A placeholder `PoW & --- &` (`chapter-2.tex:557`, standard "not applicable").
- Diagram labels `figures/two-tier-cbdc.tex:31,53` `Jenjang 1 --- Wholesale` `Jenjang 1: Wholesale` (colon).

Exact edit sites (file:line, all `---` to parentheses unless noted):
- `contents/abstract/intisari.tex:23,25` fungsional list parentheses
- `contents/abstract/abstract.tex:28-29` flows list parentheses
- `contents/chapter-1/chapter-1.tex:105-106` (pilot examples), `125-127` (aktor list)
- `contents/chapter-2/chapter-2.tex:274-275` (validasi aside), `567` (`mencukupi---risiko` comma/`sehingga`), `654-655` (prinsip list)
- `contents/chapter-3/chapter-3.tex:24-25` (aktor list), `174-175` (komponen list), `262` (`;`/comma), `272` (comma), `295` (`BI->bank->PJP->pelanggan` flow parentheses), `500-501` (transaksi list)
- `contents/chapter-4/chapter-4.tex:281` (`sekitar 77 TPS` parentheses), `484-485` (aspek list)

After edits: `grep -rn -- '---' contents/{abstract,chapter-*}/*.tex` should return only `chapter-2.tex:557` (table N/A).

## Task 2 — Trim Lampiran

In `thesis/contents/appendix/appendix-code.tex`, **delete sections L.9-L.21** (lines ~38-88): `net-configtx`, `net-crypto-config`, `net-docker-compose`, `scr-network-up`, `scr-deploy-chaincode`, `scr-init-ledger`, `scr-smoke-test`, `be-main`, `be-config`, `be-auth`, `be-models`, `be-ledger`, `be-handlers`. **Keep** L.1-L.8 (chaincode) and L.22-L.28 (Caliper); these renumber automatically to L.1-L.15.

Update intro `thesis/contents/appendix/appendix-isi-lampiran.tex` (lines 4-13): scope sentence currently lists "konfigurasi jaringan ... skrip otomasi ... lapisan backend REST API ... modul pengujian Caliper." Rewrite to: chaincode `digital-rupiah` core functions + Caliper benchmark modules. State that network config, automation scripts, and backend REST layer are omitted as standard/boilerplate and available in the system repository (mirrors existing "Kode sumber lengkap tersedia pada repositori" line).

Remove obsolete listing files when they describe features no longer in thesis scope. The active appendix should keep chaincode core, KYC compliance policy, benchmark configuration, and transfer workload listings only.

## Task 3 — Add inline chaincode excerpts (Ch3)

Current Ch3 scope is direct retail transfer plus risk-based KYC tiering. Do not reintroduce payment-intent or queue-settlement flows. Add or keep excerpts that support the active research claims:

1. **`lst:tier-derivation`** KYC tier derivation excerpt from `compliance_policy.go`: map approved retail customer and merchant KYC profiles into BASIC, STANDARD, or MERCHANT without user-selected `wallet_class`.
2. **Transfer policy excerpt**: show the shared `Transfer` validation path for frozen wallets, approved KYC, per-transaction limit, daily/monthly outgoing limit, monthly incoming limit, receiver maximum balance, and balance sufficiency.
3. **Route/RBAC excerpt**: show backend route grouping that keeps bank/PJP KYC mutation separate from BI/supervisor read/supervision operations and customer/merchant transfer operations.

Each excerpt should have 1-2 sentence intro + `\begin{figure}[htbp]` + `lstlisting[language=Go]` + descriptive `\caption` + `\label`. Keep excerpts short enough for thesis readability.

## Task 4 — Em-dash cleanup in thesis AGENTS.md

User wants em dash removed from AGENTS.md too (unless required). Scope = the 5 thesis chapter guides only:
`thesis/contents/chapter-{1,2,3,4,5}/AGENTS.md` (literal `—`, U+2014; counts 25/32/25/29/29 = 140 total).

**Exclude** vendored `bi-coin-iroha/**/AGENTS.md` (third-party, not thesis content).

Rules (these are markdown, not LaTeX):
- **Do NOT touch markdown horizontal rules** `---` (three hyphens on their own line); those are section dividers, not em dashes. Editing only targets the literal `—` character, which grep isolates cleanly.
- Prose `label — description` (bullets/headers, e.g. `babel[english,bahasa] — bahasa primary`) colon `:` or restructure.
- Parenthetical/list asides parentheses or commas.
- Markdown table separator rows (`|---|---|`) are hyphens, not `—`; untouched.
- Style-rule line `Tanda pisah (—): sisipan penjelas — bukan tanda hubung`: keep the `(—)` token (names the character) and rewrite the policy to match the new preference, em dash only when required, else comma/parentheses/colon.

After: `grep -c '—' thesis/contents/chapter-*/AGENTS.md` 0 (or only the one `(—)` character-naming token if retained).

---

## Verification

1. `grep -rn -- '---' thesis/contents/{abstract,chapter-*}/*.tex` only `chapter-2.tex:557`.
2. `grep -c lstinputlisting thesis/contents/appendix/appendix-code.tex` 15 (was 28).
3. Build: from `thesis/`, run the project's build (`latexmk -pdf main.tex` or documented script) 0 errors, appendix renumbers L.1-L.15, no broken `\ref`.
4. Open rebuilt `main.pdf`: spot-check abstract + ch1/ch3/ch4 read cleanly; Ch3 shows KYC/tier/transfer/RBAC logic; Lampiran no longer contains obsolete payment-intent/queue listings, backend dump, network config, or script dump listings.
5. `grep -c '—' thesis/contents/chapter-*/AGENTS.md` 0 (or only retained `(—)` token). AGENTS.md are docs (not compiled); no build impact.
