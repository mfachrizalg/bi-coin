# Simulated Peer Review — Round 2 (Full Mode)

- **Date:** 2026-07-25
- **Manuscript:** `paper/main.tex` (IEEE conference format, 1149 lines, builds clean: 0 undefined references, 0 undefined citations, 1 overfull vbox of 6.9pt)
- **Title:** *A Retail Digital Rupiah Prototype on Hyperledger Fabric: Two-Tier Business Processes, Risk-Based KYC Tiers, and a Reproducible Benchmark*
- **Review mode:** `full` (5-seat panel), academic-paper-reviewer v1.10
- **Prior round:** `academic-review-2026-07-02.md`; the 2026-07-24 revision cycle addressed that round. This is a fresh full review of the revised manuscript, not a re-review.

## Review Panel Provenance

All five reviewer personas in this round were simulated by a single model family
(claude-fable-5, session model). Cross-model verification was not active for this
session. Reviewer judgments therefore share a common error profile: a blind spot
of the underlying model is likely to be a blind spot of all five personas
simultaneously (correlated-error caveat, Ren et al. 2026, arXiv:2607.13104 §5.2).
Treat convergent findings as one strong signal, not five independent ones.

---

# Phase 0 — Field Analysis and Reviewer Configuration

| Attribute | Assessment |
|---|---|
| Primary field | Applied distributed-ledger systems / financial technology |
| Secondary field | Central-bank digital currency (CBDC) policy and design |
| Paper type | Systems prototype + benchmark (engineering evaluation paper) |
| Methodology | Design-and-implementation with quantitative benchmark (Hyperledger Caliper) |
| Target venue tier | IEEE international conference (ICBC / ICITEE class) |
| Maturity | Late-stage revised draft; internally coherent; publication-ready pending revision items below |

**Panel configuration:**

| Seat | Persona |
|---|---|
| EIC | Program-committee chair of an IEEE blockchain conference; distributed-systems generalist; judges fit, originality, claim calibration |
| Reviewer 1 (Methodology) | Blockchain benchmarking specialist; deep Fabric internals (endorsement, Raft ordering, VSCC/MVCC, block cutting, CouchDB); Caliper expert; knows Thakkar et al. 2018 |
| Reviewer 2 (Domain) | CBDC researcher spanning BIS/IMF policy literature and national deployments (e-CNY, eNaira, Sand Dollar, OpenCBDC, Aurum, Drex); AML/KYC regulation |
| Reviewer 3 (Perspective) | Payments-infrastructure engineer from production financial rails; reads for operational realism, trust boundaries, governance |
| Devil's Advocate | Adversarial systems researcher; attacks causal claims, universal negatives, and prediction/observation conflation |

---

# Reviewer 0 — Editor-in-Chief Assessment

## Summary
The manuscript presents an openly available retail Digital Rupiah prototype on a
five-organization Fabric network, formalizes tier derivation and transfer
validity, and evaluates it with a documented Caliper protocol including
negative-path and adversarial workloads. The revision since the last round is
substantial: the concurrency sweep with confidence intervals, the conformance
and adversarial workloads, and the resource-based bottleneck discussion are all
new strengths. The paper is a good fit for an IEEE blockchain/applied-systems
venue and is the kind of nationally grounded systems contribution such venues
want.

## Strengths
1. Clear, honest scoping: "auditable testbed... not a production-ready system"
   appears in the abstract and conclusion; limitations are concrete
   (single host, single orderer, no eKYC, no privacy layer).
2. The three contributions are crisply stated and each is actually delivered in
   the body (Sections III–VI map cleanly onto them).
3. Claims-testing workloads (negative-path, single-key adversarial) are a
   methodological cut above the typical "throughput-only" Fabric prototype
   paper.
4. Artifact availability section with public repository supports the
   reproducibility claim.

## Weaknesses
1. **[MAJOR — claim calibration]** Universal negatives are stated without
   hedge: Abstract "No publicly available system provides..." and §I "no openly
   available, testable system implements...". These are unverifiable survey
   claims. Add "to our knowledge" (once in the abstract, once in §I). The
   Devil's Advocate report expands on why this matters.
2. **[MINOR — abstract length/density]** The abstract runs ≈280 words and reads
   as a compressed results section (two confidence intervals, four latency
   numbers, two percentages). IEEE conference norm is 150–250 words. Cut the
   per-metric detail; keep saturation TPS, the two claim-testing outcomes, and
   the bottleneck attribution (as revised per R1).
3. **[MINOR — front matter]** Third author affiliation reads "Department
   Electrical and Information Engineering" (missing "of", `main.tex:37`).
   Authors 1–2 have the correct form.

## Scores (0–100)
| Dimension | Score |
|---|---|
| Venue fit | 85 |
| Originality | 78 |
| Significance | 74 |
| Clarity | 80 |
| Overall (EIC) | 72 |

**EIC recommendation:** Accept-track after revision; final decision deferred to synthesis.

---

# Reviewer 1 — Methodology Report

## Summary
The evaluation design is unusually complete for a prototype paper: seeded
population, concurrency sweep, repetition rounds with a confidence interval,
separated contention-free vs. single-key workloads, and container-level
resource monitoring. The efficiency metric η is well used. However, the
manuscript contains one numeric inconsistency in reported results, omits the
test environment entirely, and rests its headline bottleneck claim on an
inference that its own numbers strain against. These must be fixed before the
results section can be trusted as written.

## Strengths
1. Separation of the contention-free ceiling from the single-key conflict
   workload is exactly right, and the paper explains *why* they are separate
   (§VI-A, "The two designs are deliberately separate...").
2. Reporting failures (2/816) with cause (seed exhaustion) rather than hiding
   them.
3. The repeated-peak protocol (n=5) with CI is correct practice; the arithmetic
   checks out (±0.32 = t₀.₉₇₅,₄ × 0.26/√5).
4. η-vs-offered-load presentation (Fig. 5a) makes the saturation argument
   legible at a glance.

## Weaknesses

1. **[MAJOR — data integrity] Conformance transaction count contradicts itself.**
   Table VIII (Seeded Test Population) reports "Conformance / adversarial:
   42 / 200" (`main.tex:851`), but §VI-C states "Across 34 attempts spanning
   the seven rule classes" (`main.tex:1017`) and Table X's note repeats
   "34 submissions across the seven classes" (`main.tex:1053`). One of these
   numbers is wrong. *Fix:* recover the authoritative count from the Caliper
   report/logs and make all three sites agree. A results-count contradiction,
   however small, undermines confidence in every other reported number.

2. **[MAJOR — reproducibility] The test environment is absent from the paper.**
   Contribution 3 claims an "open, reproducible retail-CBDC benchmark," yet
   §VI-A never states: host CPU model, core count, RAM, OS, Docker version,
   Caliper version, or the orderer batch parameters. BatchTimeout (2 s) appears
   only in a figure caption (Fig. 5b) and MaxMessageCount (10) only in
   Discussion prose (`main.tex:1070-1071`). *Fix:* add a short testbed
   paragraph or table to §VI-A: hardware, OS, Docker, Fabric 2.5.16 (already
   stated), Gateway SDK v1.8 (currently only in Fig. 2), Caliper version,
   BatchTimeout, MaxMessageCount, and block size limits. The thesis companion
   already contains this table; the paper must too, since TPS numbers are
   meaningless without the host.

3. **[MAJOR — causal validity] The block-cutting attribution is asserted, not
   demonstrated — and the stated parameters strain against it.**
   The argument (§VI-D) is: no container approaches saturation, and max latency
   sits just above the 2 s batch timeout, therefore block-cutting parameters
   govern the 14.5 TPS plateau. Two problems:
   - *The arithmetic:* at 14.5 TPS with MaxMessageCount = 10, blocks fill in
     ≈0.69 s, so the 2 s timeout is not binding at peak — blocks are cut on
     fill, and fill-based cutting does not by itself cap throughput at
     14.5 TPS. The "max latency just above the timeout" observation therefore
     does not identify the mechanism it is claimed to identify; something else
     produces the ~2.2 s tail (plausibly first-block effects, the Gateway
     commit-status wait, or validation/commit queueing).
   - *The logic:* "no monitored container is saturated" does not exclude the
     sequential commit path. Fabric validation and ledger commit are serialized
     per channel, and per-key CouchDB round-trips bound commit rate without any
     container showing high aggregate CPU. Thakkar et al. (2018) localized
     Fabric bottlenecks in exactly this regime (low CPU, serialized
     validation/commit) — that work should be engaged.
   *Fix (either):* (a) provide direct evidence — extract block timestamps from
   the ledger and report the block-interval distribution, and/or sweep
   MaxMessageCount (e.g., 10 → 50) in one extra run to show the plateau moves;
   or (b) soften the claim throughout (abstract, contribution 3, §VI-D,
   conclusion) to "consistent with a block-formation constraint rather than
   resource exhaustion; a parameter sweep is left to future work." Option (b)
   requires no new experiments but weakens contribution 3's "localizes it"
   phrasing accordingly.

4. **[MAJOR — measurement validity] Resource-monitor numbers need their
   normalization stated.** "Normalized processor use stays below 0.09% on the
   peers" (`main.tex:1065`) is not plausible as a fraction of one core while
   endorsing ~14.5 signed transactions per second (ECDSA verification alone
   costs more). If this is Caliper's Docker monitor output normalized over all
   host cores and averaged over the sampling window, say so and give the
   sampling interval; otherwise the numbers on which Weakness 3's premise rests
   are unconvincing. One sentence of measurement semantics resolves this.

5. **[MINOR] Round length.** Every transfer round is 40 transactions
   (Table VII note), i.e., ≈3–6 s of wall clock at the achieved rates. That is
   short for steady-state throughput measurement; per-round numbers are noisy
   and only the peak round has n=5. State round durations explicitly and
   acknowledge the short-round caveat, or lengthen rounds in future work.

6. **[MINOR] CI method unstated.** Report that the ±0.32 is a t-based 95% CI
   with n=5 (df=4). One clause in §VI-A.

7. **[MINOR] Determinism of window totals — key design unstated.** §V-C says
   the chaincode "sums the wallet's earlier incoming and outgoing transfers
   within those windows." How is the history read — composite-key range reads
   or CouchDB rich queries? Rich-query results are not part of the validated
   read set in Fabric (phantom risk); range reads are. The paper's determinism
   argument holds either way *because* every transfer writes both wallet keys
   (forcing MVCC conflicts on the balance keys), but the text should state the
   key design and this reasoning in one or two sentences.

8. **[MINOR] Warmup efficiency.** η ≈ 0.75 already at ~10 TPS offered — the
   system is not keeping pace even at the lightest load. Likely a short-round /
   cold-start artifact; one sentence of explanation would pre-empt the
   question.

## Scores (0–100)
| Dimension | Score |
|---|---|
| Research design | 78 |
| Technical rigor | 58 |
| Reproducibility | 62 |
| Statistical reporting | 70 |
| Overall (R1) | 60 |

**R1 recommendation:** Major revision (Weaknesses 1–4 mandatory; 3 may be resolved by softening).

---

# Reviewer 2 — Domain Report

## Summary
The paper is well grounded in the two-tier CBDC literature and unusually
faithful to the Indonesian institutional setting (BI, OJK, HIMBARA, PJP, PBI
AML regulation). The gap claim against Project Garuda's wholesale-only public
experiments is accurate as of the cited documents. The comparison table,
however, misstates the public record for e-CNY and eNaira, and the tier-limit
values are presented without their regulatory provenance, which is a missed
opportunity because the provenance appears to exist.

## Strengths
1. Correct institutional mapping: issuer (BI), validator banks, PJP as
   customer-facing distributors, OJK as supervisor — this matches the Garuda
   White Paper's intermediated design and is explained accessibly for
   non-Indonesian readers.
2. The Garuda gap claim (§I) is precise: it targets the *publicly documented
   experiments* (wholesale cash ledger), not the project as a whole.
3. Citations to primary sources (BI White Paper, PoC report, PBI 10/2024,
   PBOC/IMF/CBB design papers) rather than secondary summaries.

## Weaknesses

1. **[MAJOR — factual accuracy of Table I]** The "KYC+lim." column marks e-CNY
   and eNaira as "n/r" (not publicly reported). This is contestable on the
   plain reading: the PBOC e-CNY white paper publicly documents tiered wallets
   with per-tier balance and transaction limits (four wallet categories,
   least-privileged anonymous small-value tier), and eNaira's tier structure
   (tiers 0–3 with daily transaction and balance limits) is publicly documented
   by the CBN and described in the cited IMF paper (ree2023enaira). If the
   column means "integrated KYC-and-limit policy in an openly testable
   implementation," then the entries are defensible but the column header is
   not — it currently reads as a claim about public reporting. *Fix:* either
   (a) split/rename the column (e.g., "Open impl." vs. "Tiered limits
   documented") so e-CNY and eNaira get ✓ for documentation and ✗ for open
   implementation, or (b) correct the entries. As it stands the table
   understates prior systems, and a CBDC-literate reviewer will catch it —
   as this one did.

2. **[MINOR→MAJOR if unaddressed] Tier-limit provenance.** Table IV's values
   (BASIC max balance Rp 2,000,000; STANDARD Rp 20,000,000) mirror Indonesia's
   long-standing e-money limits for unregistered vs. registered instruments
   under Bank Indonesia e-money regulation. If the values were chosen to
   mirror that regulation, cite it — it converts an apparently arbitrary
   parameter table into a regulatorily grounded design decision and
   strengthens the realism claim. If they were not, state how they were
   chosen.

3. **[MINOR] Missing engagement with Fabric performance literature.** The
   bottleneck discussion (§VI-D) proceeds as if Fabric performance analysis
   were uncharted. Thakkar et al. 2018 (performance characterization of
   Fabric, block size and CouchDB effects) is the canonical reference and
   directly supports/nuances the block-parameter discussion; Blockbench
   (dinh2017blockbench — already in your `.bib`, uncited) frames permissioned
   benchmarking generally. Both belong in §II-B or §VI-D.

4. **[MINOR] Missing recent CBDC prototypes.** BIS Project Aurum (two-tier
   retail CBDC prototype) and Brazil's Drex pilot (permissioned-DLT retail
   two-tier with compliance controls) are the closest recent relatives and
   deserve a sentence each in §II — their absence slightly weakens the
   novelty framing, though neither publishes a reproducible benchmark, so the
   gap claim survives.

5. **[MINOR — hygiene] Bibliography file.** `references.bib` holds 173
   entries; only 20 are cited. ~100 carry machine-generated placeholder keys
   (`unknown2024f`, `unknownnodatec`, ...). BibTeX only emits cited entries so
   the PDF is unaffected, but prune before submission: placeholder keys are an
   accident waiting to happen (key collisions, accidental cites) and some
   venues request source files.

## Scores (0–100)
| Dimension | Score |
|---|---|
| Literature coverage | 68 |
| Theoretical/regulatory grounding | 72 |
| Domain accuracy | 66 |
| Incremental contribution | 78 |
| Overall (R2) | 68 |

**R2 recommendation:** Major revision (Weakness 1 mandatory; others strengthen).

---

# Reviewer 3 — Perspective Report (Payments Infrastructure / Operations)

## Summary
Read as an infrastructure blueprint rather than an academic artifact, the
prototype is coherent and its business-process framing (Section III) is the
paper's most transferable asset — a policy reader can follow money from Mint to
Burn without knowing Fabric. The main gap from an operator's viewpoint is that
the paper never states where its trust boundary actually sits: a single Go
backend with RBAC in front of a five-organization ledger is a familiar pattern,
and a dangerous one to leave unexplained.

## Strengths
1. The six-process decomposition (issuance → distribution → onboarding →
   payment → redemption → supervision) with Table II's
   process-to-transaction mapping is exactly how central-bank IT departments
   structure requirements; this framing gives the paper practical reach beyond
   its venue.
2. Off-chain PII / on-chain anchor split (hash-anchored KYC, PostgreSQL for
   identity) follows current regulated-DLT practice and is honestly diagrammed
   (Fig. 4 legend distinguishes constrained FKs from soft references).
3. `SetTierLimit`/`SetSystemLimit` as chaincode transactions means limit
   policy is itself auditable — worth one sentence of emphasis, since
   parameter governance is a live CBDC policy question.

## Weaknesses

1. **[MAJOR — trust boundary] Backend vs. chaincode enforcement is
   unspecified.** §IV states the backend "enforces role-based access control
   over seven roles... before any transaction reaches the chaincode." If
   authorization lives only in one backend, then the five-organization
   MAJORITY endorsement provides integrity and availability but *not*
   decentralized authorization — any party controlling that backend (and its
   JWT secret) can act in any role, and the single PostgreSQL instance is a
   correlated failure and censorship point. The chaincode clearly has *some*
   internal guards (the validator-to-PJP issuance guard, §III), so the split
   exists but is never stated. *Fix:* one paragraph specifying (a) which rules
   the chaincode enforces from the submitting MSP identity vs. which only the
   backend enforces, and (b) the intended deployment (one backend per
   organization? per PJP?). Without this, the two-tier decentralization
   narrative overstates what the implementation guarantees.

2. **[MINOR — governance] The endorsing "observer."** OJK "initiates no
   business transactions but... still participates in endorsement under the
   majority policy" (§IV-A). Operationally that makes the supervisor a
   co-author of every state change it will later audit — a governance tension
   worth two sentences: either justify it (supervisory veto by
   endorsement-withholding may be a feature) or note that excluding OJK's peer
   from the endorsement policy while keeping full ledger visibility is the
   alternative.

3. **[MINOR — ops realism] Single-orderer recovery.** The no-CFT caveat is
   stated; add its operational consequence in one clause (orderer loss halts
   the payment system until restart — an RTO conversation any central bank
   would open with).

4. **[MINOR — realism of MERCHANT caps]** Rp 500M monthly outgoing/incoming
   for MERCHANT wallets is small for even a mid-size Indonesian retailer
   (≈USD 30k). Fine for a testbed; flag it as a seeded test parameter rather
   than a policy proposal so practitioners don't read Table IV as recommended
   calibration.

## Scores (0–100)
| Dimension | Score |
|---|---|
| Practical relevance | 80 |
| Architectural soundness (as described) | 65 |
| Policy usefulness | 78 |
| Overall (R3) | 70 |

**R3 recommendation:** Minor-to-major revision (Weakness 1 is the load-bearing item).

---

# Reviewer 4 — Devil's Advocate Report

## Strongest Counter-Argument

The paper's third contribution promises a benchmark that "identifies the
throughput saturation point" and "localizes it with container-level resource
metrics." What the experiments actually establish is narrower: the prototype
saturates at ~14.5 TPS, and no monitored container shows high utilization. The
*localization* — "the block-cutting parameters govern the plateau" — is an
inference the paper never tests, and its own numbers push back: with a
10-message block limit, a 14.5 TPS steady state fills blocks in ~0.7 s, so the
2-second batch timeout the argument leans on ("maximum latency sits just above
the two-second batch timeout") is not the binding constraint at peak load. The
observation and the mechanism don't connect. Meanwhile, the resource numbers
underwriting "nothing else is saturated" (processor use below 0.09%) are
presented without measurement semantics, and the well-known Fabric bottleneck
in this regime — the serialized validation/commit path, which throttles
throughput while showing low aggregate CPU — is never considered. Strip the
untested attribution and the benchmark contribution reduces to: a reproducible
protocol that measures a ceiling it cannot yet explain. That is still
publishable — reproducible protocols for retail-CBDC workloads are genuinely
scarce — but it is a smaller claim than the abstract, contribution list, and
conclusion currently sell, and the paper repeats the strong version in all
three places. Similarly, "94% of concurrent transfers rejected... which is the
outcome the double-spend argument predicts" converts a timing-dependent
statistic into a validated prediction; the argument predicts *serialization*,
not any particular percentage.

## Issue List

| # | Severity | Dimension | Location | Issue |
|---|---|---|---|---|
| DA-1 | MAJOR | Logic chain | Abstract; §I contribution 3; §VI-D ¶2; §VII ¶2 | "No component approaches saturation → block-cutting governs the ceiling" is a false dilemma: only two candidate causes (endorsement CPU, CouchDB) are eliminated; the serialized commit path, Gateway commit-status wait, and single-node Raft fsync are never considered. The attribution repeats in four load-bearing places. |
| DA-2 | MAJOR | Prediction/observation conflation | Abstract; §VI-C ¶2; §VII | The double-spend argument predicts that conflicting transfers are rejected at validation (mechanism), not that 94% are (rate). The 12 commits are a function of Caliper pacing and endorsement latency; a different pacing yields a different percentage. Reword to claim the mechanism ("every committed transfer serialized correctly; all version conflicts were rejected") and, if possible, verify conservation (final sender balance = initial − Σ committed amounts) as the actual safety check. |
| DA-3 | MINOR | Unfalsifiable universal | Abstract ¶1; §I ¶1 | "No publicly available system provides..." — unverifiable universal negative; hedge with "to our knowledge." (EIC concurs; flagged here for the logical form.) |
| DA-4 | MINOR | Scope inflation | §II-C last sentence | "this prototype is the only one with two-tier intermediation, an integrated KYC-and-limit policy, and an openly reproducible benchmark" — scoped to Table I's five rows, but reads absolute. Add "among the systems in Table I." |
| DA-5 | MINOR | Asymmetric evidence standard | §VI-C ¶1 | Conformance workload: 34 (or 42) hand-picked violations across 7 classes, ~5–6 per class, all rejected. This demonstrates each rule fires on one exemplar, not that rule boundaries are correct (no boundary-value cases: amount exactly at cap, expiry at the window edge, month rollover). Claim "each rule rejects exactly the input it is meant to exclude" overreaches — "rejects the tested violation class" is what was shown. |

## Cherry-Picking Check
**Negative.** The paper reports its failures (2/816 with cause), reports η
degradation honestly, and separates workloads in a way that exposes rather than
hides contention behavior. No selective reporting detected.

## Ignored Alternative Explanations
1. Serialized per-channel validation/commit pipeline (low CPU, hard ceiling) — the standard Fabric explanation for this exact symptom pattern.
2. Fabric Gateway SDK commit-status wait contributing the ~2.2 s latency tail independent of block cutting.
3. Single-node Raft write/fsync latency on the same host disk as five CouchDB instances.

## Missing Stakeholder Perspectives
1. **End users:** authorized peers see all transaction data; the surveillance implication of a fully supervisor-visible retail ledger gets one limitation sentence. A retail CBDC paper claiming policy relevance should acknowledge the privacy-vs-supervision tension as a design tension, not only as a missing feature.
2. **Merchants:** Table IV caps are far below real merchant turnover (see R3-4); no merchant-scale analysis.

## Observations (Non-Defects)
- The τ-function edge case (high-risk subject under standard due diligence) is correctly closed by the approval-time enforcement sentence in §V-A — checked, sound.
- The 816-transaction arithmetic is internally consistent (9 sweep rounds × 40 + 5 repetition rounds × 40 + 256 functionality = 816).
- The ±0.32 CI is arithmetically correct for n=5, SD 0.26.

## CRITICAL Issues
**None.** No finding invalidates the soundness of the implementation or the
honesty of the measurements. All MAJOR findings are claim-calibration and
reporting-integrity issues that revision can resolve.

---

# Phase 2 — Editorial Synthesis and Decision

## Consensus Map

| Issue | Raised by | Converges |
|---|---|---|
| Conformance count 42 vs 34 contradiction | R1-1 | — (single-seat, but objective/verifiable) |
| Testbed environment absent from §VI-A | R1-2 | — (objective) |
| Block-cutting attribution untested / oversold | R1-3, DA-1 | **Strong convergence** — the panel's central finding |
| Resource-number normalization unstated | R1-4, (DA-1 premise) | Convergence |
| Universal-negative claims need hedging | EIC-1, DA-3, DA-4 | Convergence |
| Table I misstates e-CNY/eNaira public record | R2-1 | — (objective, checkable) |
| Backend/chaincode trust boundary unspecified | R3-1 | — (single-seat, load-bearing) |
| 94% framed as validated prediction | DA-2 | — |

## Disagreement and Arbitration
- **Severity of the resource-number issue:** R1 rates it MAJOR (it underpins the
  bottleneck premise); no other reviewer flagged it. Arbitration: required
  clarification of measurement semantics (one sentence), not re-measurement —
  MAJOR stands but is cheap to fix.
- **R3's trust-boundary finding vs. paper scope:** one could argue deployment
  topology is out of scope for a testbed paper. Arbitration: the paper's own
  narrative ("five-organization," "each organization can validate
  independently") makes the claim; one clarifying paragraph is owed. MAJOR
  stands.
- **Decision severity:** R3 leaned minor-to-major; R1/R2 major. Arbitration
  below.

## Devil's Advocate CRITICAL Check
DA reported **no CRITICAL issues** → Accept is not blocked by Checkpoint
Rule #4; decision is determined by the MAJOR set.

## Editorial Decision: **MAJOR REVISION**

Rationale: none of the findings requires new experiments *if* the
block-cutting claim is softened (R1-3 option b), and most fixes are localized.
The decision is nonetheless Major, not Minor, on two grounds: (1) a numeric
contradiction inside the reported results (42 vs 34) must be resolved against
the primary logs, and reviewers must be able to re-verify; (2) the
block-cutting attribution is a headline claim appearing in the abstract,
contribution list, discussion, and conclusion — revising it changes what the
paper claims to have found, which requires re-review. If the authors instead
choose R1-3 option (a) (block-interval evidence or a MaxMessageCount sweep),
the claim survives at full strength and the revision is stronger still.

The panel emphasizes: this is a *positive* major revision. The system,
workloads, and honesty of reporting are all sound; every mandatory item is a
reporting or claim-calibration fix.

## Revision Roadmap (prioritized)

### P0 — Mandatory, blocking
1. **Resolve 42 vs 34** conformance count from the Caliper logs; align
   Table VIII (`main.tex:851`), §VI-C text (`:1017`), and Table X note
   (`:1053`). [R1-1]
2. **Add testbed specification to §VI-A**: host CPU/cores/RAM/OS, Docker,
   Caliper version, Gateway SDK v1.8, BatchTimeout 2 s, MaxMessageCount 10.
   ~6 lines or a small table. [R1-2]
3. **Fix or substantiate the block-cutting attribution** in all four sites
   (abstract, contribution 3, §VI-D, conclusion): either add block-interval
   evidence / one MaxMessageCount sweep run, or soften to "consistent with
   block formation rather than resource exhaustion" and downgrade
   contribution 3's "localizes" to "characterizes." Address the serialized
   commit path as an alternative (cite Thakkar et al. 2018). [R1-3, DA-1, R2-3]
4. **Correct Table I** semantics or entries for e-CNY/eNaira tiered-limit
   documentation (split "documented" vs "open implementation"). [R2-1]
5. **Reword the 94% claim** (abstract, §VI-C, conclusion) from "the outcome
   the argument predicts" to the mechanism claim; add balance-conservation
   check if available from logs. [DA-2]

### P1 — Strongly recommended
6. Add "to our knowledge" hedges (abstract, §I) and "among the systems in
   Table I" (§II-C). [EIC-1, DA-3, DA-4]
7. State resource-monitor normalization semantics and sampling interval
   (one–two sentences, §VI-A or §VI-D). [R1-4]
8. Add backend-vs-chaincode enforcement paragraph + intended deployment
   topology (§IV). [R3-1]
9. Cite the regulatory provenance of Table IV limit values (BI e-money limit
   structure) or state the selection method. [R2-2]
10. State CI method (t-based, n=5) and round durations; acknowledge
    short-round caveat. [R1-5, R1-6]

### P2 — Optional polish
11. Trim abstract to ≤250 words. [EIC-2]
12. Fix author-3 affiliation "Department *of* Electrical..." (`main.tex:37`). [EIC-3]
13. One sentence: window-total key design (range read vs rich query) and why
    wallet-key MVCC suffices. [R1-7]
14. Two sentences: OJK-as-endorser governance rationale; single-orderer
    recovery consequence; MERCHANT caps are test parameters. [R3-2/3/4]
15. Add Aurum + Drex to §II; cite Blockbench; explain warmup η≈0.75. [R2-4, R1-8]
16. Prune `references.bib` placeholder entries (~100 `unknown*` keys). [R2-5]
17. Boundary-value conformance cases (amount exactly at cap, expiry edge,
    month rollover) — or scope the §VI-C claim to tested classes. [DA-5]

## Score Summary

| Reviewer | Overall (0–100) | Recommendation |
|---|---|---|
| EIC | 72 | Revision, accept-track |
| R1 Methodology | 60 | Major revision |
| R2 Domain | 68 | Major revision |
| R3 Perspective | 70 | Minor–major revision |
| Devil's Advocate | (no score; 0 CRITICAL, 2 MAJOR) | — |
| **Panel decision** | — | **Major Revision** |

---

*Produced by the simulated review panel (academic-paper-reviewer, full mode).
The manuscript file was not modified. For revision execution, feed the P0/P1
roadmap to `academic-paper` revision mode; for verification afterward, run
`re-review` mode against this roadmap.*
