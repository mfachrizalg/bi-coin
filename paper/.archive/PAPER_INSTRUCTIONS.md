# PAPER_INSTRUCTIONS.md — Agent-Executable Writing Spec

> **STATUS 2026-06-30: SUPERSEDED — `paper/main.tex` is now authored and builds (5 pp).**
> This spec was written for an earlier **QRIS build that no longer exists**. It is
> retained for history only. Corrections, verified against the current codebase
> and thesis:
> - **No QRIS.** Chaincode + thesis use a Transfer rail (P2P + customer-to-merchant).
>   QRIS dropped from title and contributions.
> - **Hyperledger Fabric 2.5**, not v3.1.4 (`network/docker-compose.yaml` image pins).
> - Workload file is **`benchmark/workloads/retail-transfer.js`**, not `retail-mixed.js`;
>   no `PayQrisPaymentIntent`.
> - Canonical Caliper run = `benchmark/results/2026-06-30-caliper-zero-failure-run-1.html`
>   (9.0 / 45.9 / 57.7 TPS, 0 failures); numbers match thesis ch4 and the paper.
> Do not re-introduce QRIS, Fabric v3.1.4, or `retail-mixed.js` from the text below.

**Paper (original, superseded title):** A Two-Tier Retail Central Bank Digital Currency on Hyperledger Fabric with Integrated Compliance, QRIS Payments, and Reproducible Benchmarking.

## 0. How to use this file

- **Reader:** an LLM agent that will draft the conference paper section-by-section.
- **Target:** `paper/main.tex` (IEEEtran `[conference]`). Replace the boilerplate body; fill metadata.
- **Style anchors:** `paper/paper_deren.pdf` and `paper/paper_grandiv.pdf` — two finished papers from the same dept/venue. Both share one IEEE-conference skeleton; imitate their structure, sectioning, and rhetorical devices, **not** their content.
- **Execution loop:** for each Build Block (§5) in order → gather the named source → draft the section into `main.tex` → run the block's Traceability check → move on. Never invent data, citations, names, or features. If a required fact is missing, stop and consult the source files; do not fabricate.
- **Source of truth precedence (resolve conflicts in this order):** live source code (`bi-coin-fabric/chaincode`, `backend`, `network`) > Caliper configs/outputs > thesis chapters > this file's summarized facts.

---

## 1. Global hard constraints (apply to every section)

1. **No fabricated data or citations.** Every quantitative claim traces to a **fresh Caliper re-run** (§3); every feature claim traces to real `chaincode`/`network`/`backend` source. The old benchmark numbers are stale and forbidden (§3).
2. **Match current code only.** The paper claims **only what `chaincode/digital_rupiah.go` (HEAD) implements**. Gridlock resolution and offline NFC payment are **NOT implemented at HEAD** → present them strictly as future work / acknowledged limitation. Do **not** report gridlock benchmark numbers (37.7 TPS, 3.6 TPS) or the "30 queued" count. Do **not** add a `queued` QRIS state to any figure.
2b. **Benchmark numbers are PENDING a re-run.** Use `<<...>>` placeholder tokens everywhere a benchmark value appears; do not write Section V, Figs. 4–5, Tables IV–VI, or the abstract/conclusion numbers until a fresh `report.html` exists (procedure + tokens in §3).
3. **IEEE title/abstract rule** (`main.tex:39`): no symbols, special characters, footnotes, or math in the Title or Abstract.
4. **Bibliography swap:** replace `paper/references.bib` (power-electronics placeholders) with the CBDC keys in §7, copied verbatim from `thesis/references.bib`. Delete `2023Bhawal-SST` and `2023Chen-Phase-Shift-DAB`. No `\cite{}` may resolve to a non-existent key.
5. **Fill `main.tex` metadata:** title, three author blocks, emails/ORCID, NIM + dates in the first-page footnote — pulled from `thesis/main.tex` front matter. Never invent names.
6. **Figures:** `fig1.png` is a placeholder → replace with a real architecture diagram exported from `bi-coin-fabric/docs/diagrams/` or rendered from `thesis/contents/figures/`.
7. **Style devices to copy from the exemplars:** bold paragraph lead-ins (e.g. `\textbf{Our Approach.}`, `\textbf{The Baselines.}`); numbered contribution bullets (`enumerate`); every empirical claim bound to a figure (bar = throughput/latency); a reproducibility paragraph (HW, exact params, seed, repo URL); a gap-closing summary sentence ending each Related-Work subsection; soft cross-refs (`Fig.~\ref{}`, tables in roman numerals, `\eqref{}`). The word "data" is plural; use a zero before decimals.

---

## 2. Paper skeleton (1:1 with both exemplars)

| # | Section | Imitate (exemplar pattern) |
|---|---------|-----------------------------|
| 1 | Title + Authors | descriptive "X on Y with Z" title; UGM 3-author block |
| 2 | Abstract | problem → flaw → approach → contributions → bold headline numbers → impact |
| 3 | Index Terms | 6–8 keywords |
| 4 | I. Introduction | motivation → prior approaches → gaps → named central problem → **Our Approach.** → numbered Contributions → organization |
| 5 | II. Related Work | 3 labeled subsections, each closing on its gap → ✓/▲/✗ table + footnote → **Summary.** |
| 6 | III. System Model & Problem Formulation | actor/network model → threat model + formal bound → formal problem statement (numbered eqs) |
| 7 | IV. Proposed Framework | architecture + Fig. 1 → numbered lifecycle phases → per-mechanism subsections (numbered eqs) |
| 8 | V. Evaluation | Experimental Setup + reproducibility para → baselines → result subsections, each bound to a figure/table |
| 9 | VI. Discussion | implications → limitations/trade-offs → future work |
| 10 | VII. Conclusion | restate problem → contributions → key numbers → impact |
| 11 | References | IEEE (`\bibliographystyle{IEEEtran}`) |
| 12 | Appendix | extra tables/configs |

---

## 3. Canonical Facts Sheet (the ONLY facts the paper may state without re-deriving)

> Treat this as read-only ground truth. If a build block needs a value, cite it from here. Numbers not listed here must be verified against source before use.

**Topic.** Retail Digital Rupiah CBDC on Hyperledger Fabric (project "bi-coin-fabric"), two-tier model: Bank Indonesia → banks / payment service providers (PJP) → retail users. Thesis title (Indonesian, for provenance only — not the paper title): "Rancang Bangun Sistem Rupiah Digital Ritel Berbasis Hyperledger Fabric dengan Dukungan Pembayaran Luring dan Pengawasan Terdesentralisasi".

**Network.** 5-organization "garuda" network — `bi.paynet`, `himbara.paynet`, `commercial.paynet`, `pjp.paynet` + `orderer.paynet` (confirmed from `benchmark/benchconfig.yaml` monitor list; cross-check `network/configtx.yaml`), Hyperledger Fabric **v3.1.4** (verify against `network/`), CouchDB state DB, Raft ordering.

**Implemented & source-verified features (the ONLY ones the paper claims as built):**
- Tiered issuance / distribution — `RequestIssuance`, `DistributeToParticipant`, `Mint`/`Burn`.
- KYC profiles + approval gating; raw KYC fields not persisted on-chain — `SubmitKycProfile`, `requireApprovedKyc` (see lock-out test `offchain_kyc_test.go`).
- Wallet tiers + limits — `CreateWallet`, `SetTierLimit`, `SetSystemLimit`; daily / monthly / per-transaction caps.
- QRIS online payment intents — `CreateQrisPaymentIntent`, `PayQrisPaymentIntent`; statuses **`pending` / `settled` / `cancelled`** (no `queued`).
- Decentralized supervision — `emitSupervisionEvent`, `GetSupervisionEvents`, `GetReconciliationReport`, `GetMetrics`.
- Determinism — `txNow(ctx)` (transaction timestamp via `GetTxTimestamp`) used instead of `time.Now()` so multi-org endorsement produces identical write-sets (`digital_rupiah.go`, ~line 271).

**Double-spend.** Online double-spend fully prevented: balance check + MVCC read-set conflict detection + single-settlement QRIS intent state machine.

**NOT implemented (future work / limitation — never claim as built):**
- Gridlock queue + resolution (G3) → future work.
- Offline NFC payment (G5) → acknowledged limitation; no secure element / TEE; chaincode actively excludes it.

**Caliper numbers — STALE / PENDING RE-RUN (do NOT write these as facts).**
> The benchmark was produced by the now-removed gridlock build, with a workload (`PayQrisPaymentIntent` called with 3 args) that is **incompatible with current chaincode** (2 args). No `report.html` exists in the repo. The old values — warmup 8.4 TPS; sustained 49.7 TPS @ 96.5%, 0.29 s; peak 76.8 TPS @ 63%, 2.89 s, send-rate 133; 479 settled; 2001 wallets — are **stale and forbidden**. They are listed here ONLY so they can be recognized and rejected.

Use **placeholder tokens** until the benchmark is re-run against current chaincode (3 retail-mixed rounds). Fill them from a fresh `report.html`:

| Round | Target tps | Tx | Throughput | Success | Mean latency | Max latency |
|-------|-----------|----|-----------|---------|--------------|-------------|
| warmup | 10 | 100 | `<<TPS_WARMUP>>` | `<<SUCCESS_WARMUP>>` | `<<LAT_WARMUP>>` | `<<LATMAX_WARMUP>>` |
| sustained | 50 | 600 | `<<TPS_SUSTAINED>>` | `<<SUCCESS_SUSTAINED>>` | `<<LAT_SUSTAINED>>` | `<<LATMAX_SUSTAINED>>` |
| peak | 150 | 600 | `<<TPS_PEAK>>` | `<<SUCCESS_PEAK>>` | `<<LAT_PEAK>>` | `<<LATMAX_PEAK>>` |

Functional totals (from `GetMetrics` / report): `<<QRIS_SETTLED>>` QRIS settled, `<<WALLETS>>` wallets. Saturation send rate: `<<SEND_RATE_PEAK>>`. Stable operating region and saturation point: derive from the filled rows (do not assume).

**Re-run procedure (the USER runs this; this spec only documents it — do not execute, do not edit code yourself):**
1. Fix `benchmark/workloads/retail-mixed.js:53` → `return this.submit('PayQrisPaymentIntent', [intentId, payer.id]);` (drop the trailing `, 0`). This is the only blocker; all other workload calls already match current chaincode.
2. `NETWORK_MODE=garuda ./scripts/network-up.sh` → `NETWORK_MODE=garuda ./scripts/deploy-chaincode.sh` → `./scripts/init-ledger.sh`.
3. `npx caliper launch manager --caliper-bind-sut fabric:fabric-gateway --caliper-benchconfig benchmark/benchconfig.yaml --caliper-networkconfig benchmark/networkconfig.yaml --caliper-workspace .`
4. Read `report.html` for per-round throughput / success% / mean+max latency / send rate; `GetMetrics` for settled count + wallet total.
5. Replace every `<<...>>` token across the paper, then draft Section V.

**Caliper numbers — DROPPED entirely (gridlock build; never use, not even as placeholders):** 37.7 TPS, 3.6 TPS, "30 queued".

**External baselines (for contrast only):**
- Hamilton / OpenCBDC: ~1.7M TPS, **non-DLT** account-based — `Lovejoy2022A`.
- Nigeria eNaira: deployed Fabric CBDC, **no public throughput benchmark** — `ree2023enaira`.

**Research gaps:**
- G1 — incomplete published r-Digital-Rupiah design (Garuda PoC is wholesale-only). **FILLED.** Cite `aryani2023critlit` (p.31 incomplete r-design, p.58 pilot testing).
- G2 — no reproducible retail mixed-workload benchmark on Fabric. **FILLED** (this work's Caliper benchmark).
- G4 — no single integrated compliance + payments retail system. **FILLED.**
- G3 — gridlock resolution on permissioned DLT unproven → **discussed as open problem / future work.** (`bi_consultative`.)
- G5 — offline payment complexity → **limitation / future work.**
- G6 — "3i" integration / interoperability / interconnection not implemented → **limitation.** (`bi_whitepaper2022` §2.4.)

**Threats to validity (frame in Discussion):** external, construct, offline, privacy.

---

## 4. Title and contributions

**Title (final, English, IEEE-style):**
> A Two-Tier Retail Central Bank Digital Currency on Hyperledger Fabric with Integrated Compliance, QRIS Payments, and Reproducible Benchmarking

(No symbols/math. Descriptive noun phrase. Foregrounds only implemented + benchmarked work.)

**Contributions (exactly 3 — render as a numbered `enumerate` in Section I):**
1. **An integrated two-tier retail Digital Rupiah chaincode** unifying tiered issuance/distribution, KYC with wallet-tier limits, and QRIS settlement in a single artifact — closing the integrated-compliance-and-payments gap (G4) and completing a retail r-Digital-Rupiah design beyond the wholesale-only Project Garuda PoC (G1).
2. **A deterministic, double-spend-safe online settlement design** — balance check + MVCC + single-settlement QRIS state machine — with a determinism fix using the transaction timestamp (`txNow`) for consistent multi-organization endorsement.
3. **A reproducible open retail-CBDC benchmark with Hyperledger Caliper** (workloads, configs, seeds, hardware) reporting a stable operating region (`<<TPS_SUSTAINED>>` at `<<SUCCESS_SUSTAINED>>` success, `<<LAT_SUSTAINED>>` mean latency) and a saturation point (`<<TPS_PEAK>>`) — closing the reproducible-benchmark gap (G2). The methodology is the contribution and is valid now; the numbers are placeholders pending the re-run (§3).

State explicitly as limitations / future work (NOT contributions): gridlock resolution (G3), partial offline / no secure element (G5), 3i interoperability (G6).

---

## 5. Per-section build blocks

> Each block has six fields: **Goal · Imitate · Required content · Length · Figures/Tables · Drafting prompt · Trace.**

### Block 1 — Title & Author block
- **Goal:** final title + UGM 3-author block.
- **Imitate:** exemplar title style; "Department of Electrical and Information Engineering, Universitas Gadjah Mada, Yogyakarta, Indonesia".
- **Required content:** title from §4; first author + the two supervisors as co-authors; emails/ORCID; NIM and dates in the first-page footnote.
- **Length:** title ≤ ~15 words.
- **Figures/Tables:** none.
- **Drafting prompt:** "Fill `\title{}` and the three `\IEEEauthorblockN/A` slots. Pull author and supervisor identities from `thesis/main.tex` front matter and `thesis/contents/` statement/endorsement — do not invent names."
- **Trace:** names/NIM match thesis front matter.

### Block 2 — Abstract
- **Goal:** one paragraph, arc problem → existing-approach flaw → our approach → contributions → bold headline numbers → impact.
- **Imitate:** exemplar abstract arc; bold the headline numbers.
- **Required content:** problem (Indonesia needs a retail r-Digital-Rupiah; public Garuda work is wholesale-only); flaw (prior work integrates neither compliance + payments nor offers a reproducible retail benchmark); approach (integrated Fabric chaincode + Caliper evaluation on a 5-org network); results — embed `\textbf{<<TPS_SUSTAINED>>}` at `\textbf{<<SUCCESS_SUSTAINED>>}`, `\textbf{<<LAT_SUSTAINED>>}`, saturation `\textbf{<<TPS_PEAK>>}`; impact (evidence toward BI's retail roadmap).
- **Length:** 150–220 words.
- **Figures/Tables:** none.
- **Precondition:** BLOCKED until the re-run fills the tokens — write the abstract prose with `<<...>>` tokens in place; finalize numbers only after Section V.
- **Drafting prompt:** "Write a ~180-word abstract following the six-beat arc; bold the placeholder tokens; NO symbols/math/footnotes (IEEE rule); do not mention gridlock or offline as implemented."
- **Trace:** every number is a §3 placeholder token; the stale/dropped numbers never appear.

### Block 3 — Index Terms
- **Goal:** 6–8 keywords. **Imitate:** exemplar `\begin{IEEEkeywords}`.
- **Required content:** Central bank digital currency; retail CBDC; Hyperledger Fabric; permissioned blockchain; QRIS; performance benchmarking; Hyperledger Caliper; payment systems.
- **Length:** 6–8 terms. **Figures/Tables:** none.
- **Drafting prompt:** "Emit the index terms list."
- **Trace:** terms reflect actual paper content.

### Block 4 — I. Introduction
- **Goal:** motivation → prior approaches → gaps → named central problem → bold "Our Approach." → numbered contributions → organization paragraph.
- **Imitate:** exemplar Section I exactly, including the bold `\textbf{Our Approach.}` lead-in and the numbered contribution `enumerate`.
- **Required content:** CBDC motivation + Indonesia/Garuda two-tier context (`bi_whitepaper2022`, `bi_garuda_poc`); prior approaches and their gaps (G1, G2, G4 cited via `aryani2023critlit`, `ree2023enaira`, `Lovejoy2022A`, `hanif2025meetcoin`); central problem = "no integrated, benchmarked, compliance-aware retail CBDC on permissioned DLT"; the 3 contributions from §4; one paragraph mapping Sections II–VII.
- **Length:** ~700–900 words.
- **Figures/Tables:** none (may forward-reference Fig. 1).
- **Drafting prompt:** "Draft Section I in five moves (motivation, prior work + gaps, central problem, Our Approach, contributions + organization). End prose with bold `\textbf{Our Approach.}`, then the 3-item contribution `enumerate`, then the organization paragraph. Cite only §7-mapped keys."
- **Trace:** each gap cites its §3 source; contributions count = 3.

### Block 5 — II. Related Work
- **Goal:** 3 labeled subsections, each ending on the gap it leaves → positioning table → bold "Summary." bridge.
- **Imitate:** exemplar Section II (labeled subsections + ✓/▲/✗ comparison table + bold "Summary.").
- **Required content:**
  - **A. CBDC architectures and two-tier design** — `sethaput2025`, `bhawana2021`, `Auer2020The`, `Tsareva2024Retail`.
  - **B. CBDC implementations and performance** — `Lovejoy2022A` (OpenCBDC ≈1.7M TPS, non-DLT), `ree2023enaira` (eNaira, no public benchmark), `hanif2025meetcoin` (Fabric + Caliper).
  - **C. Retail payments, compliance, and security on DLT** — `payoff`, `hans2023`, `islam2023`, `bi_consultative`.
  - Reuse the 10-row positioning table from `thesis/contents/chapter-2/chapter-2.tex` (`tab:tinjauan`; cols Penelitian / Platform / Fokus utama / Integrasi fitur ritel / Tolok ukur kinerja) → translate to English, add ✓/▲/✗ + abbreviation footnote → **Table I**.
  - Close with bold `\textbf{Summary.}` naming the gap intersection this work fills (G1 ∩ G2 ∩ G4).
- **Length:** ~800–1000 words + Table I.
- **Figures/Tables:** **Table I** (positioning, 10 rows); optional **Table II** (baseline contrast: OpenCBDC vs eNaira vs This work).
- **Drafting prompt:** "Write three subsections, each ending with one gap-closing sentence; port `tab:tinjauan` to an English IEEE table with ✓/▲/✗; finish with a bold `\textbf{Summary.}`. Gridlock/offline may appear here only as open problems, not as this work's solved features."
- **Trace:** table rows = thesis table; baseline numbers = §3.

### Block 6 — III. System Model & Problem Formulation
- **Goal:** network/actor model, definitions, threat model (adversary classes + formal bound), formal problem statement.
- **Imitate:** exemplar Section III (actor model + threat model + formal problem statement with numbered equations).
- **Required content:** actors (Bank Indonesia, banks/PJP intermediaries, retail users, supervisor); two-tier trust model; permissioned-DLT assumptions (identified participants, Raft crash-fault tolerance); wallet / balance / tier-limit definitions; threat model (malicious or compromised participant, online double-spend attacker) with a **formal single-settlement invariant** (at most one settlement per QRIS intent under MVCC) as a numbered equation; a formal problem statement (maximize retail throughput subject to compliance + single-settlement invariants). Frame offline replay as design-level / out-of-scope.
- **Length:** ~700–900 words, 2–4 numbered equations (define each variable immediately).
- **Figures/Tables:** optional notation table (Appendix).
- **Drafting prompt:** "Define the participant set, wallet state, tier-limit predicates, and a settlement-uniqueness invariant as numbered equations; state the adversary classes and the online double-spend bound; close with a formal problem statement. Source threat framing from `thesis/contents/chapter-3` and `hans2023` (STRIDE)."
- **Trace:** invariants map to `Transfer` / `PayQrisPaymentIntent` balance + MVCC logic; offline bound labeled design-only.

### Block 7 — IV. Proposed Framework
- **Goal:** architecture overview + Fig. 1, numbered lifecycle phases, one subsection per mechanism with numbered equations.
- **Imitate:** exemplar Section IV (architecture figure + lifecycle phases + per-mechanism subsections).
- **Required content:** architecture (5-org garuda network, Raft orderer, CouchDB, chaincode, backend API, frontend) → **Fig. 1**; lifecycle phases (participant onboarding/KYC → issuance → distribution → retail wallet creation → QRIS settlement → supervision/reconciliation); subsections: (a) tiered issuance/distribution, (b) KYC + tier-limit enforcement with limit equations, (c) **QRIS intent state machine `pending → settled / cancelled` (NO `queued`)** → **Fig. 2**, (d) determinism via `txNow` (explain the endorsement-determinism problem and the fix), (e) decentralized supervision (events / reconciliation / metrics). Chaincode transaction set → **Table III**. **No gridlock subsection.**
- **Length:** ~1200–1500 words; 2–4 equations; figures Fig. 1 + Fig. 2.
- **Figures/Tables:** Fig. 1 (architecture), Fig. 2 (QRIS lifecycle, no queued), Table III (transaction set).
- **Drafting prompt:** "Describe the architecture (cite real org names from `network/configtx.yaml`), then numbered lifecycle phases, then one subsection per mechanism with variables defined at each equation. Give the `txNow` determinism rationale. Do NOT include gridlock; QRIS lifecycle has exactly three states."
- **Trace:** every mechanism ↔ a named chaincode function in §3; figures exported from `bi-coin-fabric/docs/diagrams/` or `thesis/contents/figures/`.

### Block 8 — V. Evaluation
- **Goal:** Experimental Setup (env + reproducibility + params + repo) → baselines → result subsections each bound to a figure/table, head-to-head vs baseline.
- **⛔ BLOCKED:** do not draft this section until the benchmark re-run produces a fresh `report.html` and the §3 `<<...>>` tokens are filled. The old numbers are stale (gridlock build, incompatible workload) and must not be transcribed.
- **Imitate:** exemplar Section V (reproducibility paragraph with HW/params/seed/repo; per-result figure binding; bold "The Baselines.").
- **Required content:** setup — Fabric v3.1.4, CouchDB, 2 workers, **3 fixed-rate rounds** (warmup tps10/100tx, sustained tps50/600tx, peak tps150/600tx), seeded population, hardware (from `benchmark/benchconfig.yaml` + the actual host) → **Table IV**; baselines (OpenCBDC ≈1.7M TPS non-DLT; eNaira no public benchmark) → bold `\textbf{The Baselines.}`; results — throughput by round → **Fig. 4** (bar: `<<TPS_WARMUP>>` / `<<TPS_SUSTAINED>>` / `<<TPS_PEAK>>`); success-rate + latency vs target rate → **Fig. 5** (`<<SUCCESS_SUSTAINED>>` @ `<<LAT_SUSTAINED>>` vs `<<SUCCESS_PEAK>>` @ `<<LAT_PEAK>>`; annotate send rate `<<SEND_RATE_PEAK>>`); per-round → **Table V**; functional results (`<<QRIS_SETTLED>>` settled, `<<WALLETS>>` wallets) → **Table VI**; analysis of the stable region vs saturation derived from the filled rows, attributing residual peak failures to genuine MVCC conflicts + endorsement saturation. Frame the OpenCBDC gap honestly as DLT vs non-DLT.
- **Length:** ~1300–1700 words; Fig. 4 + Fig. 5; Table IV + Table V + Table VI.
- **Figures/Tables:** Fig. 4, Fig. 5, Table IV, Table V, Table VI.
- **Drafting prompt:** "After the re-run fills the tokens: write Experimental Setup with a reproducibility paragraph (HW, exact params from `benchmark/benchconfig.yaml`, seed, repo URL). State baselines in a bold `\textbf{The Baselines.}` paragraph. One result subsection per figure/table; bind each empirical claim to a figure; use ONLY the filled token values. Do not report gridlock rounds."
- **Trace:** every number = a filled §3 token from the fresh `report.html`; no stale/dropped values; exactly 3 rounds.

### Block 9 — VI. Discussion
- **Goal:** broader implications → limitations & trade-offs → future directions.
- **Imitate:** exemplar Section VI.
- **Required content:** implications (a single integrated artifact validates a compliance-aware retail Fabric CBDC at realistic Indonesian retail rates); trade-offs (permissioned throughput ceiling vs non-DLT OpenCBDC; MVCC contention at peak); a `\textbf{Limitations.}` paragraph — gridlock resolution not implemented (G3, future work), offline only partial / no TEE (G5), 3i interoperability not implemented (G6), single-host benchmark (construct/external validity), on-chain KYC privacy; plus the four threats to validity (external/construct/offline/privacy); future directions (gridlock-on-DLT, TEE-backed offline, multi-host scale-out, 3i interoperability).
- **Length:** ~700–900 words.
- **Figures/Tables:** none.
- **Drafting prompt:** "Discuss implications, then a bold `\textbf{Limitations.}` paragraph covering G3/G5/G6 + the four threats to validity, then future directions. Be candid that gridlock and offline are not in the evaluated build."
- **Trace:** limitations map to §3 gaps.

### Block 10 — VII. Conclusion
- **Goal:** restate problem, contributions, key numbers, impact.
- **Imitate:** exemplar Section VII.
- **Required content:** restate the central problem; recap the 3 contributions; repeat headline numbers (`<<TPS_SUSTAINED>>` @ `<<SUCCESS_SUSTAINED>>`, `<<LAT_SUSTAINED>>`, saturation `<<TPS_PEAK>>`); impact for BI's retail Digital Rupiah roadmap.
- **Length:** ~200–300 words.
- **Figures/Tables:** none.
- **Drafting prompt:** "Write a single-arc conclusion reusing §3 KEPT numbers; no new claims or citations."
- **Trace:** numbers from §3 KEPT.

### Block 11 — References
- **Goal:** IEEE bibliography from CBDC keys.
- **Imitate:** exemplar `\bibliography{references}` + `\bibliographystyle{IEEEtran}`.
- **Required content:** swap `paper/references.bib` to the §7 keys, copied verbatim from `thesis/references.bib`; remove the two power-electronics entries.
- **Drafting prompt:** "Replace `references.bib` with the §7 keys from `thesis/references.bib`; verify every `\cite{}` in the body resolves; remove power-electronics entries."
- **Trace:** zero undefined citations on compile.

### Block 12 — Appendix
- **Goal:** extra tables/configs.
- **Imitate:** exemplar appendix.
- **Required content:** full tier-limit configuration (from `SetTierLimit` / `InitLedger` defaults); complete Caliper round config (from `benchconfig.yaml`); notation glossary; repo link.
- **Drafting prompt:** "Emit the tier-limit table, the full round-config table, and a notation glossary."
- **Trace:** values from source/config.

---

## 6. Master figure / table inventory (benchmark values = placeholders pending re-run)

**Figures**
- **Fig. 1 — System architecture** (Sec. IV): 5-org two-tier garuda network, Raft orderer, CouchDB, chaincode, backend, frontend. Source: `thesis/contents/figures/network-architecture.tex` or `two-tier-cbdc.tex`. **Replaces `fig1.png`.**
- **Fig. 2 — QRIS payment-intent lifecycle** (Sec. IV): `pending → settled / cancelled` only. Source: `thesis/contents/figures/qris-flow.tex` / activity diagram `AD06` — **trim the `queued` state**.
- **Fig. 4 — Throughput by round** (Sec. V, bar): `<<TPS_WARMUP>>` / `<<TPS_SUSTAINED>>` / `<<TPS_PEAK>>` (from re-run).
- **Fig. 5 — Success rate & latency vs target rate** (Sec. V): `<<SUCCESS_SUSTAINED>>` @ `<<LAT_SUSTAINED>>` (50 tps) vs `<<SUCCESS_PEAK>>` @ `<<LAT_PEAK>>` (150 tps); annotate send rate `<<SEND_RATE_PEAK>>`.

(No gridlock figure. Optional time-series figure only if raw per-tx Caliper data is found.)

**Tables**
- **Table I — Related-work positioning** (Sec. II): English port of `tab:tinjauan`, 10 rows, ✓/▲/✗ + footnote.
- **Table II — Baseline contrast** (Sec. II/V): OpenCBDC (≈1.7M TPS, non-DLT) vs eNaira (deployed, no public benchmark) vs This work.
- **Table III — Chaincode transaction set / system functions** (Sec. IV): issuance, distribution, KYC, tier limits, QRIS, supervision → function names.
- **Table IV — Experimental setup & Caliper params** (Sec. V): Fabric v3.1.4, CouchDB, 2 workers, 3 rounds, txNumber/target-tps per round, seed, HW.
- **Table V — Per-round results** (Sec. V, placeholders): round, target tps, send rate, throughput, success %, mean/max latency.
- **Table VI — Functional results** (Sec. V, placeholders): `<<QRIS_SETTLED>>` settled, `<<WALLETS>>` wallets.
- Appendix: tier-limit config; full round config; notation glossary.

---

## 7. Bibliography mapping (keys verified present in `thesis/references.bib`)

- **Foundations / Fabric / Caliper:** `androulaki2018`, `hlf_caliper`, `hlf_metrics`, `fabric_perf2023` — Sec. I/IV/V.
- **Indonesia / Garuda / BI:** `bi_whitepaper2022`, `bi_garuda_poc`, `bi_consultative`, `bi_bspi2025` — Sec. I/II/IV.
- **CBDC design & taxonomy:** `sethaput2025`, `bhawana2021`, `Auer2020The`, `Tsareva2024Retail`, `aryani2023critlit` — Sec. I/II.
- **Implementations / baselines:** `Lovejoy2022A` (OpenCBDC), `ree2023enaira` (eNaira), `hanif2025meetcoin` (Fabric+Caliper) — Sec. II/V.
- **Security / privacy / payments:** `hans2023`, `islam2023`, `payoff` — Sec. II/III/VI.
- **FLAG:** "G20 TechSprint" and "Public Consultation Report" have no confirmed keys — locate the exact `\cite` keys in `thesis/contents/chapter-1/chapter-1.tex` before citing; never cite a key that does not exist.

---

## 8. `main.tex` placeholder-fill map

- `\title{Paper Title}` → §4 title.
- Three `\IEEEauthorblockN/A` blocks → first author + two supervisors; emails/ORCID; NIM + dates in the first-page footnote (`\thanks` / `\IEEEoverridecommandlockouts`). Pull from `thesis/main.tex` — do not invent.
- `\begin{abstract}` → Block 2 output. `\begin{IEEEkeywords}` → Block 3 output.
- Replace the entire boilerplate body (Sections "Ease of Use" … "Some Common Mistakes", the sample table/figure, the boilerplate Acknowledgment) with Blocks 4–10 + the §6 floats.
- `\includegraphics{fig1.png}` → exported Fig. 1; add `\includegraphics` for Figs. 2, 4, 5.
- Keep `\bibliography{references}` + `\bibliographystyle{IEEEtran}`; swap the `.bib` per §7.

---

## 9. Risk register (verify before publishing — do not skip)

1. **[BLOCKING] Benchmark must be re-run.** Old numbers are stale (gridlock build, incompatible workload); no `report.html` in the repo. Before Sec. V / Figs. 4–5 / Tables IV–VI / abstract+conclusion numbers: apply the `retail-mixed.js:53` fix, run the 3-round benchmark (procedure in §3), then fill every `<<...>>` token from the fresh `report.html`. Never transcribe the old values.
2. **[MED] Network org list + Fabric version.** Orgs confirmed = `bi` / `himbara` / `commercial` / `pjp` + `orderer` (from `benchconfig.yaml`); confirm Fabric v3.1.4 from `network/` for Fig. 1 and Table IV.
3. **[MED] Missing citation keys.** Resolve the G20 TechSprint / Public Consultation keys (§7 FLAG) in `thesis/contents/chapter-1`.
4. **[MED] Author / supervisor identities.** Pull from thesis front matter; never invent.
5. **[LOW] Benchmark workloads still reference gridlock.** `benchmark/workloads/qris-gridlock.js` and `gridlock-resolve.js` call functions absent from current chaincode; they are out of scope and excluded from the reported `benchconfig.yaml` rounds. Do not cite their outputs.

---

## 10. Final QA checklist

- [ ] Title and abstract contain no symbols/math/footnotes (IEEE rule).
- [ ] Exactly **3** contributions; no gridlock contribution.
- [ ] Gridlock and offline appear **only** as future work / limitation — never as implemented or benchmarked.
- [ ] Dropped values absent: `37.7`, `3.6`, "30 queued", `ResolveGridlock`, any `queued` QRIS state in figures.
- [ ] **Benchmark re-run done**; every `<<...>>` token replaced with a value from the fresh `report.html`.
- [ ] **Stale numbers absent as facts** (`8.4`, `49.7`, `96.5`, `0.29`, `76.8`, `63`, `2.89`, `133`, `479`, `2001`) — they appear only inside the §3 "STALE / forbidden" warning; all reported values come from the re-run. Fabric `v3.1.4` confirmed.
- [ ] `paper/references.bib` swapped to CBDC keys; power-electronics entries removed; no undefined `\cite`.
- [ ] `main.tex` metadata filled (title, authors, NIM, supervisors, dates).
- [ ] `fig1.png` replaced by an exported architecture diagram; Figs. 2/4/5 present and cross-referenced with `Fig.~\ref{}`.
- [ ] Tables use roman numerals; each empirical claim bound to a figure.
- [ ] Each Related-Work subsection ends on its gap; bold `\textbf{Summary.}` present.
- [ ] Reproducibility paragraph includes HW, exact params, seed, repo link.
- [ ] Document compiles under IEEEtran with the `IEEEtran` bib style.
