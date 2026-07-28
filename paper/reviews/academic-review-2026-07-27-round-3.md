# Full Academic Paper Review — Round 3

## Manuscript metadata

| Item | Value |
|---|---|
| Title | *A Retail Digital Rupiah Prototype on Hyperledger Fabric: Two-Tier Business Processes, Risk-Based KYC Tiers, and a Reproducible Benchmark* |
| Author | Muhammad Fachrizal Giffari |
| Reviewed source | `paper/main.tex` |
| Format | IEEE-style LaTeX manuscript |
| Manuscript length supplied to the panel | 5,666 words |
| Review date | 2026-07-27 |
| Review mode | ARS-Codex academic-paper-reviewer, FULL contract (`reviewer/reviewer_full/v1`) |
| Submission status | Internal pre-submission review; no journal submission or named target journal |
| Human editorial recommendation | **Major Revision (repairable)** |

## Review scope and provenance

This synthesis consolidates five isolated reports: Editor-in-Chief, Methodology, Domain, Cross-disciplinary Perspective, and Devil's Advocate. The five seats were GPT-5-family/Codex personas. Their separation provides persona and task-angle diversity, not model-family independence; correlated model error remains possible. No cross-model reviewer was used, and this package is not a record of independent human peer review.

The synthesis uses only findings already present in those reports, the current manuscript for locator checks, and the separately verified build/citation/layout facts below. It does not add a sixth reviewer's findings. The reviewers assessed the paper-cited July 25 evidence set; later July 27 benchmark runs were outside scope.

## Field and panel configuration

**Primary field:** distributed-ledger systems and retail-CBDC systems engineering.

**Secondary interfaces:** payment-system operations, central-bank operating models, KYC/AML control design, reproducible systems benchmarking, and applied distributed-systems security.

**Study type:** implemented prototype plus descriptive systems evaluation using performance, functionality, negative-path, boundary, and adversarial workloads. It is not a production-readiness, national-capacity, legal-compliance, monetary-policy, or human-subject study.

| Seat | Configured perspective | Principal review responsibility |
|---|---|---|
| EIC | Systems-paper editor | Significance, scope discipline, claim-to-evidence alignment, and editorial disposition |
| R1 — Methodology | Experimental systems and reproducibility | Benchmark design, statistical interpretation, error taxonomy, and artifact reconstruction |
| R2 — Domain | Hyperledger Fabric and retail-CBDC engineering | Fabric semantics, two-tier processes, KYC/limit logic, implementation alignment, and domain claims |
| R3 — Perspective | Payments policy and central-bank operations | Institutional roles, operational boundaries, governance, privacy, settlement, and deployment implications |
| R4 — Devil's Advocate | Adversarial claim falsification | Strongest counterargument, internal contradictions, alternative explanations, and untested trust assumptions |

## Build, citation, and layout verification

These checks establish presentation integrity only; they do not validate empirical correctness, external citation accuracy, or reproducibility.

| Check | Verified result |
|---|---|
| Isolated build | `latexmk -pdf -interaction=nonstopmode -halt-on-error -output-directory=/tmp/bi-coin-paper-review-build main.tex` exited 0 |
| PDF | 11 pages |
| LaTeX diagnostics | 0 undefined references, 0 overfull boxes, 0 fatal errors |
| Citation-key integrity | 24 unique citation keys match 24 bibliography entries; no missing or duplicate keys |
| Label integrity | No unresolved or duplicate labels |
| Rendered inspection | All 11 pages reviewed; no clipping, overlap, or broken tables/figures |

## Contract score matrix

Legend: `block` = central evidence or validity barrier; `warn` = material but repairable defect; `pass` = meets the scoped review bar.

| Reviewer | D1 Methodology rigor | D2 Domain accuracy | D3 Argumentative coherence | D4 Cross-disciplinary relevance | D5 Writing and structure |
|---|---:|---:|---:|---:|---:|
| EIC | block | block | block | pass | pass |
| Methodology | block | warn | warn | pass | warn |
| Domain | block | warn | warn | warn | pass |
| Perspective | block | warn | warn | warn | pass |
| Devil's Advocate | warn | block | warn | warn | pass |

Panel arithmetic:

- F1 fires because at least one mandatory dimension is `block`; in fact, D1 is blocked by four reviewers, D2 by two, and D3 by one.
- F2 fires because all five reviewers individually have at least two mandatory dimensions at `warn` or worse, exceeding the five-seat majority threshold of three.
- F3 does not fire because no reviewer blocks D4.
- F0 does not fire because the mandatory dimensions are not unanimous passes.

fired_conditions: [F1, F2]

The highest-severity contract action is the combined reject-or-major-revision action. That mechanical result is preserved without averaging away any mandatory block. The separate human editorial choice within that action is **Major Revision**, not rejection, for the repairability reasons stated below.

## Consensus strengths

1. **Substantive integrated prototype.** The manuscript maps issuer, banks, PJP, holders, and supervisor to concrete ledger operations and combines issuance/distribution, KYC anchors, tier derivation, transfers, redemption, and supervisory records (`paper/main.tex:215-316`, `503-510`, `675-755`).
2. **Strong scope discipline in the limitations.** The paper identifies the single-host boundary, one-orderer availability limit, backend trust concentration, shared-ledger privacy, simulated eKYC, absent offline support, and integration stubs; it expressly rejects production-readiness and national-capacity inference (`paper/main.tex:1279-1362`).
3. **Useful workload decomposition.** Performance, functionality, negative-path, boundary, and adversarial cases are separated, and expected rule rejection is conceptually distinguished from ordinary benchmark failure (`paper/main.tex:836-926`, `1136-1218`).
4. **Several reported results remain supportable.** Five peak rows in `bi-coin-fabric/benchmark/results/res-20260725-185547-transfer-repeat.log:119,213,307,401,495` support the reported 14.50 TPS mean and approximately ±0.32 TPS interval (`paper/main.tex:979-987`). The four functionality rows at `bi-coin-fabric/benchmark/results/res-20260725-185547-functionality.log:448-454` align with `paper/main.tex:1107-1131`.
5. **Clear, reviewable presentation.** The paper has a coherent architecture-to-method-to-results-to-limitations progression, internally resolvable citations, and a clean 11-page rendering. This is a presentation strength, not evidence that the experimental claims are correct.

## Consensus blockers and required evidence repairs

### SC-1 — The open/reproducible contribution lacks an immutable, recoverable evidence snapshot

**Disposition:** [CONSENSUS-4] among the four non-DA reviewers; the Devil's Advocate independently required result-level provenance.

**Manuscript locators:** `paper/main.tex:61-73`, `132-140`, `184-186`, `1364-1367`.

**Git/artifact locators:** the reviewer audit reported that `git ls-files 'bi-coin-fabric/benchmark/**/res-20260725-185547-*'` returned no paths although 17 prefix-matched files existed locally; corresponding `.log`/`.html` results and several required configurations/workloads appeared as untracked, while other owning files were modified. The Domain report identified public `master` as `f4b0910ecc69002af7a2ef1e33e1fff3e86a56d5`, with no commit, tag, manifest, checksum set, or package hash binding that revision to the reported run.

**Editorial finding:** a moving repository URL cannot substantiate the named “open, reproducible” contribution when a fresh clone cannot locate the exact source, configuration, workloads, and outputs.

**Minimum repair:** publish an immutable bundle or release containing the evaluated commit, dirty-state declaration, chaincode package hash, exact configs/workloads, environment versions, lifecycle logs, raw and structured results, analysis procedure, checksums, and a fresh-clone reproduction command.

### SC-2 — The adversarial result is misclassified and cannot support the universal MVCC narrative

**Disposition:** [CONSENSUS-3] among EIC, Methodology, and Domain, with Perspective silent; independently DA-CRITICAL.

**Manuscript locators:** `paper/main.tex:66-71`, `790-800`, `1158-1170`, `1264-1269`, `1349-1354`.

**Log locators:** `bi-coin-fabric/benchmark/results/res-20260725-185547-adversarial.log:186-208` records endorsement-stage `ProposalResponsePayloads do not match`; `:523,531,534,547` contains worker summaries; `:559-562` reports 12 successes and 188 failures. The same log at `:108-110` records a Rp19,000,000 starting balance, while 200 attempts of Rp1,000 request only Rp200,000 in aggregate.

**Editorial finding:** not every losing submission reached MVCC validation, 12 commits contradict the statement that all 200 proposals read one version under the paper's own model, and the workload is a hot-key contention test rather than a true aggregate-overspend test.

**Minimum repair:** rerun with aggregate requested value greater than the starting balance; export per-submission endorsement/order/validation stage, exact diagnostic or validation code, read-version cohort, commit/block order, and transaction identifier; then verify initial balance, committed debit, final balance, non-negativity, and monetary conservation. Remove universal stage and same-version claims unless the new trace proves them.

### SC-3 — Negative-path fixture accounting and the enforcement oracle do not reconcile

**Disposition:** corroborated by EIC and Domain, with Methodology independently requiring machine-auditable outcome classes.

**Manuscript locator:** `paper/main.tex:903-911`.

**Log locators:** `bi-coin-fabric/benchmark/results/res-20260725-185547-negative-path.log:224-227` reports `17/17` enforced for each worker, while `:243-249` reports 4 successes and 38 failures. The stated design expects eight successful fixture calls and 34 expected rejections.

**Editorial finding:** the 34 intended rejections may be present, but four additional failures are unexplained. Counting any failure as enforcement is insufficient when the expected diagnostic and fixture state are part of the test oracle.

**Minimum repair:** separate fixture setup from measured transactions, fail fast on setup error, and emit one record per case containing case label, input, expected stage/diagnostic, actual stage/diagnostic, transaction ID, and verdict. Reconcile all 42 calls before retaining “no enforcement gap.”

### SC-4 — No paper-cited boundary artifact exists, and “every numeric cap” exceeds the reported coverage

**Disposition:** corroborated blocker from EIC and Domain; Methodology supports artifact-level auditability. The DA accepted only the enumerated in-manuscript cases, not an absent artifact.

**Manuscript locators:** `paper/main.tex:68-70`, `132-140`, `890-908`, `1136-1217`, `1264-1270`, `1349-1353`.

**Artifact locator:** reviewers found no `res-20260725-185547-boundary-path` log or HTML report among the 17 prefix-matched artifacts. No such boundary artifact should be represented as existing.

**Editorial finding:** Table `tab:boundary` reports four predicate pairs, while the model defines five retail limits plus three institutional limits. Exact sender-balance drain is an invariant, not one of those eight cap parameters.

**Minimum repair:** either publish same-snapshot boundary evidence for every cap retained in the universal claim, with expected/actual case records and checksums, or narrow the abstract, contribution, results, discussion, and conclusion to the exact four reported predicates and disclose the missing July 25 boundary artifact.

### SC-5 — Manuscript authorization claims do not identify the code revision that was evaluated

**Disposition:** corroborated by Domain and Perspective; the EIC and DA independently identify the backend authorization boundary as central to the safety claim.

**Manuscript locators:** `paper/main.tex:654-668`, `1301-1316`, `1333-1335`.

**Code locators reported by the panel:** current `bi-coin-fabric/chaincode/digital_rupiah.go:15-45` defines MSP guards, applied at `CreateWallet:566-568`, `Mint:606-608`, `Transfer:673-675`, and `SetTierLimit:840-842`. The manuscript instead says chaincode does not check the submitting MSP and that caller/function authorization exists only in the backend.

**Editorial finding:** without a pinned benchmarked commit, the review cannot determine whether the paper describes the measured chaincode or a stale version. Organization-MSP authorization also does not by itself establish backend-role or end-user/wallet ownership authorization.

**Minimum repair:** pin the evaluated revision, rerun affected claims if the chaincode changed, and document separately organization-MSP gates, backend portal roles, end-user/wallet ownership binding, and endorsement policy.

### SC-6 — Deterministic timestamps are not yet trustworthy timestamps

**Disposition:** DA-CRITICAL, corroborated by the EIC.

**Manuscript locators:** `paper/main.tex:654-668`, `775-788`, `803-830`.

**Editorial finding:** identical transaction time at each endorser proves deterministic agreement, not validity, freshness, acceptable skew, or monotonicity. A consistently wrong time can affect KYC expiry and daily/monthly windows. This weakens the categorical claim that no single organization can induce a policy-violating transition.

**Minimum repair:** define the timestamp source and trust boundary; enforce or document acceptable-time, future/backdated, monotonicity, expiry, and rollover rules; test those edges. If authority remains with a trusted backend, narrow the guarantee to deterministic enforcement under that honest-time assumption.

### SC-7 — Bottleneck, client-concurrency, latency, and confidence-interval wording exceeds the measurements

**Disposition:** corroborated across EIC, Methodology, Domain, Perspective, and DA, with disagreement only over severity.

**Manuscript locators:** `paper/main.tex:64-73`, `875-884`, `979-993`, `1227-1262`, `1292-1299`, `1347-1357`.

**Editorial finding:** low aggregate container CPU/memory/write volume does not exclude latency-bound endorsement, CouchDB, block formation, validation/commit, host I/O, or harness effects. One-, two-, and four-worker tests do not exclude every client limitation. The five-repeat interval is supported arithmetically but characterizes short within-session rounds unless independent deployment/reset units are demonstrated. A finite observed maximum is not a general latency bound.

**Minimum repair:** narrow the claims to the tested worker settings, monitored resource envelope, observed maximum, and within-session repeat variability. Retain causal bottleneck or broader uncertainty claims only after phase-level instrumentation and independently initialized repetitions support them.

### SC-8 — KYC, compliance, settlement, and operating-model language needs sharper boundaries

**Disposition:** corroborated by Domain, Perspective, and DA.

**Manuscript locators:** `paper/main.tex:49-57`, `165-172`, `675-701`, `760-773`, `836-847`, `1301-1328`, `1338-1362`.

**Code locator:** the reported current wallet-creation path checks the KYC profile at `bi-coin-fabric/chaincode/digital_rupiah.go:577-583`.

**Editorial finding:** BASIC is described as a no-KYC analogue although every benchmark account has an approved KYC anchor. Risk affects approval eligibility more clearly than the resulting subject-type tier. Implemented onboarding state, limits, and audit events do not establish full AML/CFT compliance, reserve settlement, reconciliation with external authoritative records, or an endorsed institutional operating model.

**Minimum repair:** classify every KYC, diligence, approval, expiry, and limit rule as statutory, sourced design guidance, or prototype parameter; reconcile BASIC with the approved-anchor requirement; use “KYC-derived subject tiers with risk-based approval” if that matches the implementation; and narrow “implements Bank Indonesia business processes” to selected prototype ledger workflows unless external legs are modeled and evidenced.

## Disagreements and editorial arbitration

| Issue | Panel disagreement | Arbitration |
|---|---|---|
| Reject versus Major Revision | The contract action combines both outcomes; several reviewers used blocking scores. | **Major Revision.** The defects require new evidence and claim repair, but the implemented prototype, supported throughput/functionality rows, candid limitations, and clean presentation remain usable. Rejection would be appropriate only if the P0 evidence cannot be produced or reveals that the central results do not survive. |
| D2 severity | EIC and DA: `block`; Methodology, Domain, Perspective: `warn`. | Preserve the block for contract arithmetic because the headline adversarial mechanism is factually inconsistent. Treat it as repairable through rerun and synchronized claim revision; do not average it down. |
| D3 severity | EIC: `block`; four reviewers: `warn`. | The overall architecture-to-evaluation argument remains coherent, but the abstract/conclusion safety claim depends on defective adversarial interpretation. Keep this as P0 even though the broader paper is salvageable. |
| D4 severity | EIC/Methodology: `pass`; Domain/Perspective/DA: `warn`. | D4 is a warning, not a block. The paper is accessible and candid, but KYC/compliance/governance/settlement implications need sharper boundaries. F3 remains false. |
| D5 severity | Methodology: `warn`; four reviewers: `pass`. | Overall presentation passes. Missing sample counts, variability columns, immutable run locators, and outcome classes are evidence-reporting repairs, not a global writing failure. The clean PDF does not resolve them. |
| Boundary evidence | DA accepted the enumerated manuscript cases; EIC/Domain found no matching run artifact. | Distinguish a reported result from an auditable result. No `res-20260725-185547-*` boundary artifact exists in the reviewed set; supply it or narrow the claim. |
| Five-repeat interval | EIC accepted the numeric calculation; Methodology challenged its experimental interpretation. | Retain 14.50±0.32 TPS as the reported five-round descriptive result, but label it within-session variability unless independent experimental units are established. |
| Authorization state | Manuscript-focused reviews reasoned from backend-only authorization; code-aware reviews found current MSP guards. | Do not choose either code history by inference. Pin the benchmarked commit, then align manuscript, tests, and artifact manifest to that revision. |

## Devil's Advocate critical check

1. **Timestamp trust:** the strongest counterargument is that multi-organization determinism can reproduce a wrong client-originated time consistently. EIC corroborates the trust-model gap. Required response: identify the trusted time authority and validation rules, add hostile/edge-time tests, or narrow the compliance guarantee.
2. **Contradictory MVCC account:** the paper's formal model permits at most one commit for proposals sharing one read version, yet the run reports 12 commits. EIC and Domain corroborate this contradiction, and EIC additionally identifies endorsement-stage payload mismatches. Required response: reconstruct actual read-version/endorsement waves and failure stages, then revise every affected abstract, results, discussion, and conclusion claim.

The DA also raises non-blocking but material challenges: risk may affect approval rather than the resulting tier, resource observations do not identify the bottleneck, and selected tests do not establish full compliance or all-cap coverage. These are included in SC-7 and SC-8 rather than treated as new synthesis findings.

## Editorial rationale

The mechanical contract outcome is controlled by F1 and F2. Mandatory blocks cannot be averaged away: four reviewers block methodological rigor, two block domain accuracy, and the EIC blocks argumentative coherence. The paper's central claims of an open reproducible benchmark, direct MVCC double-spend validation, and comprehensive boundary enforcement are not currently supported by a recoverable, internally reconciled artifact set. The negative-path totals do not match the stated fixture/assertion composition, the adversarial log mixes endorsement-stage and validation-stage failures, the “same version” narrative conflicts with twelve commits, and no paper-cited boundary artifact exists. Current code also appears to contain MSP gates that contradict the manuscript's authorization description, while timestamp trust remains unspecified.

These defects are serious but repairable. The underlying prototype is substantive; several functionality and throughput values trace to raw logs; the paper explicitly disclaims production and national-scale validity; and its build, citation-key integrity, structure, tables, and rendered layout are clean. The necessary work is therefore evidence repair, provenance freezing, targeted reruns, and claim calibration rather than abandonment of the system or wholesale replacement of the study. Major Revision is the proportionate human recommendation. Re-review should occur only after every P0 acceptance test passes and the revised abstract, contributions, results, discussion, limitations, and conclusion are audited against the immutable evidence bundle.

## Prioritized revision roadmap

### P0 — Must pass before re-review

| ID | Revision | Acceptance test |
|---|---|---|
| P0-1 / SC-1 | Freeze and publish the exact evaluated source and evidence bundle. | From a fresh clone or immutable archive, one manifest resolves the source commit, dirty-state declaration, chaincode package hash, configs, workloads, environment versions, commands, raw/structured outputs, analysis formulas, and checksums; every cited result table maps to named files. |
| P0-2 / SC-3 | Replace generic negative-path failure counting with an expected-diagnostic oracle and reconcile fixtures. | Setup is separate and fail-fast; all eight fixture calls have explicit successful outcomes; all 34 negative cases match their expected stage and diagnostic; every one of 42 calls has a transaction-level record; 4/38 versus 8/34 is fully explained or superseded by a clean rerun. |
| P0-3 / SC-2 | Rerun the adversarial workload as true aggregate overspend with stage-aware traces. | Aggregate requested value exceeds the sender's initial balance; each submission records read-version cohort, endorsement result, ordering/commit status, exact validation code, and transaction/block ID; final balance equals initial balance minus committed debit, remains nonnegative, and no endorsement mismatch is mislabeled MVCC. |
| P0-4 / SC-4 | Supply boundary evidence or narrow the claim everywhere. | Either a checksummed same-snapshot artifact tests all five retail and three institutional caps retained by “every cap,” or all universal wording is removed and the paper names only the four evidenced predicates plus the missing July 25 boundary artifact. |
| P0-5 / SC-5, SC-6 | Reconcile authorization code and timestamp trust with the manuscript. | The paper names the evaluated commit and accurately separates MSP, backend-role, wallet-owner, and endorsement controls. Tests cover unauthorized organizations and the stated future/backdated/expiry/rollover time model, or the guarantee explicitly assumes an honest trusted backend clock. |
| P0-6 / SC-2–SC-6 | Synchronize every headline claim with repaired evidence. | A locator-by-locator audit finds no unsupported “all 200 same version,” “every losing transaction at MVCC,” “every numeric cap,” achieved reproducibility, or categorical compliance guarantee in the title, abstract, contributions, results, discussion, or conclusion. |

### P1 — Required content and reporting repairs

| ID | Revision | Acceptance test |
|---|---|---|
| P1-1 / SC-7 | Narrow or re-evidence bottleneck, concurrency, latency, and CI claims. | Without new instrumentation, wording is limited to tested 1/2/4-worker settings, monitored resource observations, observed maximum latency, and within-session repeat variability. Any retained causal or stability claim is backed by phase-level timing and independently initialized repetitions with documented reset/order/seed policy. |
| P1-2 / SC-8 | Calibrate KYC, AML/CFT, settlement, and Bank Indonesia process language. | A rule-provenance table classifies each control; BASIC no longer conflicts with the approved-anchor flow; unimplemented AML/CFT and external settlement functions are enumerated; prototype workflow claims do not imply legal compliance or an official operating model. |
| P1-3 | Export machine-auditable outcome tables. | Every workload reports attempts, commits, endorsement rejections, validation codes, application rejections, timeouts/transport errors, per-rule sample counts, run ID, and direct artifact locator; expected enforcement rejection remains distinct from infrastructure failure. |
| P1-4 | Improve experimental-unit and latency reporting. | The manuscript defines reset/restart behavior, workload order, account-selection logic, and seeds. If broader performance inference is retained, longer independently initialized observations and transaction-level latency distributions replace reliance on five maxima and short 40-transaction rounds. |
| P1-5 | Add an explicit operating/trust model. | One compact matrix identifies initiation, endorsement, ordering, upgrade, revocation, emergency freeze, recovery, audit, data access, authoritative state, and external-system responsibilities for BI, banks, PJP, supervisor, identity provider, and rails. |

### P2 — Presentation, venue, and external-validation improvements

| ID | Revision | Acceptance test |
|---|---|---|
| P2-1 | Tighten terminology and captions. | “Bounded latency” becomes an observed finite-sample maximum; “regardless of client concurrency” becomes “across tested settings”; endorsement is distinguished from peer commit validation; OJK's observer/endorser role and the descriptive nature of the comparison table are explicit in captions. |
| P2-2 | Add immutable run identifiers to tables and captions. | Each quantitative table points directly to its run ID, structured source, sample count, and uncertainty definition without relying on a repository-root URL. |
| P2-3 | Verify or narrow novelty and field-wide comparison claims. | Claims such as “closest published prototype” or absence of an integrated open reference either cite a documented search date, databases, and inclusion criteria or are rewritten as bounded observations about the reviewed sources. |
| P2-4 | Prepare a traceable response and re-review package. | Each roadmap item receives an author response, changed-manuscript locator, evidence locator, and acceptance-test result; the next review verifies the immutable package rather than accepting narrative assurances. |

## Questions for the authors

1. Which exact commit, chaincode package hash, configuration hashes, and environment produced every `res-20260725-185547-*` result?
2. Why are the cited outputs and required workloads/configurations absent from the tracked snapshot identified by the reviewers?
3. Which four calls explain the negative-path difference between the expected 8-success/34-rejection design and the observed 4-success/38-failure result?
4. What caused `ProposalResponsePayloads do not match`, and why were endorsement-stage failures summarized as MVCC/version conflicts?
5. If all 200 adversarial proposals read one sender version, how could twelve commit under the formal model?
6. Was the adversarial workload meant to test hot-key serialization or aggregate overspend prevention, given Rp200,000 requested against Rp19,000,000 funded?
7. Where is the July 25 boundary artifact, and which of the five retail plus three institutional caps were actually tested?
8. Did the benchmarked chaincode include the MSP guards now reported in `digital_rupiah.go`, and how are organization, backend role, and wallet ownership authorization separated?
9. Who supplies transaction time, what skew/monotonicity rules apply, and how are forged, future, backdated, expiry, daily-rollover, and monthly-rollover cases handled?
10. Which KYC, diligence, approval, expiry, and limit rules are authoritative requirements, sourced design guidance, or prototype parameters?
11. What event constitutes issuance and settlement in the prototype, and which reserve, accounting, external-rail, reconciliation, and reversal legs remain outside it?

## Remaining verification boundaries

- No external bibliographic source, novelty search, legal requirement, journal policy, or field norm was authoritatively re-verified. Citation-key resolution is not semantic citation validation.
- No benchmark was rerun for this synthesis, and no later July 27 result was evaluated.
- No independent fresh-clone reproduction was completed. The Git, code, and log findings above are synthesized from the five isolated reports.
- The clean LaTeX build and rendered-page inspection establish presentation integrity only.
- The review does not establish production security, regulatory compliance, national capacity, privacy adequacy, monetary soundness, or institutional acceptability.
- No `res-20260725-185547-*` boundary artifact was found by the reviewers; this review does not imply that one exists.
- Current line locators are tied to the manuscript state reviewed on 2026-07-27 and must be refreshed after revision.

editorial_decision=reject_or_major_revision
