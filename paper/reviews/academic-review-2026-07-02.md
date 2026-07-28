# Academic Peer-Review Package

## Manuscript

**Title:** *Blockchain-based Digital Money for Bank Indonesia Business Process*  
**Reviewed files:** `paper/makalah_muhammad_fachrizal_giffari.pdf` (8 pages) and `paper/main.tex`  
**Review date:** 2026-07-02  
**Review mode:** Full review: EIC, methodology, domain, cross-disciplinary/security, Devil's Advocate, and editorial synthesis  
**Manuscript status:** Working-tree version; source and PDF were inspected read-only.

## Editorial Decision

### Major Revision

The manuscript presents a coherent, bounded, and useful retail Digital Rupiah prototype. Its strongest contribution is integration: issuance, two-tier distribution, KYC-derived wallet tiers, limits, payment, redemption, and supervision are implemented within one auditable Hyperledger Fabric system. The paper also avoids a production-readiness claim and explicitly states important limitations.

Publication-grade evidence is not yet sufficient. The evaluation consists of one short run per configuration, only 40 transactions per transfer round, no repeated trials or dispersion statistics, no adversarial contention, and no negative policy-path workload. The claim of double-spend safety is therefore argued from Fabric MVCC but not directly tested. More seriously, the formal wallet-tier function excludes high-risk subjects while the chaincode and its passing unit test accept high-risk subjects after enhanced due diligence and senior approval. This manuscript-to-implementation contradiction affects a named core contribution.

**Weighted quality score: 59.9/100 — Major Revision.**

| Dimension | Weight | Score | Weighted score |
|---|---:|---:|---:|
| Originality | 20% | 68 | 13.6 |
| Methodological rigor | 25% | 45 | 11.25 |
| Evidence sufficiency | 25% | 50 | 12.5 |
| Argument coherence | 15% | 70 | 10.5 |
| Writing quality | 15% | 80 | 12.0 |
| **Total** | **100%** |  | **59.85** |

---

# Reviewer 1 — Editor-in-Chief

## Review Focus

Journal fit, contribution, significance, claim discipline, and overall manuscript readiness.

## Recommendation

**Major Revision**

## Strengths

### S1. Clear and relevant problem framing

The Introduction distinguishes Project Garuda's public wholesale proof of concept from the proposed retail implementation and defines a concrete technical gap (PDF pp. 1–2). The problem is relevant to CBDC engineering and Indonesian payment-system research.

### S2. Strong scope discipline

The abstract, Discussion, Limitations, and Conclusion consistently describe a prototype rather than a production system. The sentence that the result provides a technical basis “without claiming production readiness” is appropriately restrained.

### S3. Integrated artifact-level contribution

The work combines six business processes rather than presenting another isolated transfer benchmark. Table II and the system architecture make the end-to-end scope easy to understand.

### S4. Compact, readable structure

The eight-page IEEE-style paper has a logical sequence from policy context to system design, formal rules, evaluation, limitations, and conclusion. Tables and diagrams carry substantial technical detail efficiently.

## Weaknesses

### W1. Novelty is integration novelty, but parts of the paper imply field-level novelty

**Problem:** The manuscript states that the prototype is “the only entry” combining two-tier intermediation, KYC/limits, and an open benchmark ([main.tex:167](/home/mfachrizalg/2026/Skripsi/bi-coin/paper/main.tex:167)). This conclusion is based on a compact comparison table and 20 unique cited works, not a reproducible literature-search protocol.

**Why it matters:** A universal novelty claim is stronger than the presented evidence. Reviewers can reject the contribution framing even if the system itself is useful.

**Required fix:** Replace “the only entry” with a bounded phrase such as “among the systems reviewed” or “to the authors' knowledge,” state the search date and inclusion logic, and separate the contribution into (a) system integration, (b) deterministic policy enforcement, and (c) reproducible evaluation.

**Severity:** Major

### W2. Evidence level does not support journal readiness

**Problem:** Each transfer round contains 40 transactions, with one reported run per configuration and no run-to-run variability. The performance section presents exact TPS values as stable results.

**Why it matters:** The results can demonstrate that one deployment worked, but cannot establish robust performance characteristics or a reliable saturation point.

**Required fix:** Add independent repetitions, longer steady-state rounds, uncertainty statistics, environment details, and raw artifact availability. Reframe current values as one observed run until this is done.

**Severity:** Major

### W3. Reproducibility is asserted but not made available from the manuscript

**Problem:** The paper calls the protocol reproducible, but contains no code repository, immutable commit, dataset/report archive, environment manifest, or artifact-availability statement.

**Why it matters:** Readers cannot reproduce the work from the paper alone even though relevant artifacts exist in the repository.

**Required fix:** Add an artifact statement containing a public archival URL or anonymized review package, commit/tag, Fabric and Caliper versions, configuration paths, raw reports, and exact reproduction command.

**Severity:** Major

### W4. Title underspecifies the actual contribution

**Problem:** “Bank Indonesia Business Process” is grammatically singular and does not name Digital Rupiah, retail CBDC, or Hyperledger Fabric ([main.tex:19](/home/mfachrizalg/2026/Skripsi/bi-coin/paper/main.tex:19)).

**Required fix:** Use a specific plural title, for example: *A Hyperledger Fabric Prototype for Bank Indonesia's Retail Digital Rupiah Business Processes*.

**Severity:** Minor

---

# Reviewer 2 — Methodology and Distributed-Systems Evaluation

## Review Focus

Experimental design, benchmark validity, formal/implementation consistency, reproducibility, and inference from measurements.

## Recommendation

**Major Revision**

## Strengths

### S1. Workloads are explicitly defined

The manuscript reports the transaction mix, seeded population, worker counts, offered rates, transaction counts, throughput, efficiency, and latency. Table X makes the observed plateau visible rather than hiding low efficiency.

### S2. Limitations are unusually candid

The paper explicitly states that the workload is contention-free, that zero MVCC conflicts are produced by design, and that the results do not generalize to national scale (PDF p. 7; [main.tex:907](/home/mfachrizalg/2026/Skripsi/bi-coin/paper/main.tex:907), [main.tex:917](/home/mfachrizalg/2026/Skripsi/bi-coin/paper/main.tex:917)). This avoids a common benchmark overclaim.

### S3. Raw results match the paper's tables

The inspected summary artifact reports 616 successful requests, zero failures, and the same throughput and latency values used in Tables X–XI. Focused chaincode tests also pass.

## Weaknesses

### W1. Formal wallet-tier function contradicts the implementation

**Problem:** Equation (1) assigns STANDARD and MERCHANT only when `r <= 1` ([main.tex:641](/home/mfachrizalg/2026/Skripsi/bi-coin/paper/main.tex:641)–645), excluding high-risk `r = 2`. The prose says high-risk subjects may proceed after enhanced due diligence and senior approval. The chaincode explicitly allows `RiskHigh` after those controls ([compliance_policy.go:24](/home/mfachrizalg/2026/Skripsi/bi-coin/bi-coin-fabric/chaincode/compliance_policy.go:24), [compliance_policy.go:47](/home/mfachrizalg/2026/Skripsi/bi-coin/bi-coin-fabric/chaincode/compliance_policy.go:47)–54), and the passing test expects a high-risk retail customer to receive `TierStandard` ([compliance_policy_test.go:33](/home/mfachrizalg/2026/Skripsi/bi-coin/bi-coin-fabric/chaincode/compliance_policy_test.go:33)–35).

**Why it matters:** The equation is presented as a formalization of implemented policy and is one of three headline contributions. At present, it formalizes a different system.

**Required fix:** Define tier derivation over subject type, due-diligence level, risk, and senior approval. Add the high-risk/EDD/senior-approval branch or change the implementation, then add a table proving equation-to-test-case correspondence.

**Severity:** Critical

### W2. No repeated runs or uncertainty reporting

**Problem:** The paper reports one run for each worker/configuration pair, no standard deviation, confidence interval, percentile latency, or run-to-run distribution. Each transfer round has only 40 transactions.

**Why it matters:** Mean/max from one short run are sensitive to startup, batching, container scheduling, and host noise. A stable saturation claim cannot be distinguished from a run-specific observation.

**Required fix:** Run at least five independent repetitions per configuration after controlled warmup; use longer steady-state rounds; report mean, standard deviation or 95% CI, and p50/p95/p99 latency. Preserve per-run raw reports.

**Severity:** Major

### W3. Double-spend claim lacks its direct adversarial experiment

**Problem:** The benchmark deliberately gives workers disjoint wallets. It therefore never submits concurrent spends from one sender or concurrent credits to a receiver near its monthly/balance cap.

**Why it matters:** Fabric MVCC makes the core argument plausible, but the experiment does not verify the exact safety path being highlighted. It also does not expose whether retry/error handling reports invalidated transactions correctly.

**Required fix:** Add same-version competing transfers from one sender; show exactly one valid commit and at least one MVCC invalidation. Add a shared-receiver hot-key case and a near-limit case to verify that committed state cannot exceed outgoing, incoming, or balance limits.

**Severity:** Major

### W4. Happy-path success cannot validate policy enforcement

**Problem:** “Zero policy or limit rejections” means every benchmark request was designed to pass. No benchmark case tests expired KYC, frozen wallets, invalid roles, prohibited risk, per-transaction overflow, daily/monthly overflow, incoming overflow, or maximum-balance overflow.

**Why it matters:** The evaluation establishes executable happy paths, not correctness of the compliance policy.

**Required fix:** Add a negative-path conformance matrix with expected status for every rejection rule and role boundary. Report both expected rejections and unexpected failures separately.

**Severity:** Major

### W5. Bottleneck localization is not demonstrated

**Problem:** The paper infers a “server-side bottleneck” from unchanged throughput across 1–4 workers ([main.tex:832](/home/mfachrizalg/2026/Skripsi/bi-coin/paper/main.tex:832)). Hardware, OS, Docker, Caliper version, block-cutting settings, resource utilization, and per-stage timing are absent.

**Why it matters:** The result establishes saturation, but not whether endorsement, ordering, CouchDB, block cutting, CPU, disk, or network causes it.

**Required fix:** State only that the bottleneck is not removed by additional Caliper workers, or add CPU/memory/disk metrics and stage-level profiling before naming the subsystem.

**Severity:** Major

### Methodological reporting assessment

**Inadequate for inferential performance claims; adequate for a functional prototype report.** The work has clear descriptive metrics, but lacks replication, dispersion, confidence intervals, tail latency, controlled environment disclosure, and negative/adversarial trials.

---

# Reviewer 3 — CBDC and Bank Indonesia Domain

## Review Focus

CBDC architecture, Bank Indonesia/PJP/bank responsibilities, regulatory grounding, literature positioning, and domain contribution.

## Recommendation

**Major Revision**

## Strengths

### S1. Two-tier actor semantics are mostly correct

Customers provide identity and transact; banks/PJP perform onboarding and KYC; Bank Indonesia issues and controls system policy; supervisory actors inspect reconciliation. The manuscript does not imply customer self-approval.

### S2. Official Indonesian sources anchor the motivation

The paper uses the Project Garuda White Paper, wholesale PoC report, and Bank Indonesia AML/CFT regulation. This is the right source hierarchy for claims about the Indonesian design context.

### S3. Scope aligns with the public wholesale gap

The paper appropriately treats the prototype as a retail technical reference extending beyond the public wholesale experiment, not as an official Bank Indonesia implementation.

## Weaknesses

### W1. Wallet tiers and numerical limits lack policy traceability

**Problem:** BASIC/STANDARD/MERCHANT derivation and all rupiah limits are presented as system rules, but the section provides no source showing that these exact categories or numbers are Bank Indonesia requirements.

**Why it matters:** Readers may interpret prototype parameters as official Digital Rupiah policy. The distinction between regulatory requirements, research design choices, and test constants is currently unclear.

**Required fix:** Add a policy traceability table with columns: rule, source, source status, prototype interpretation, and assumption. Clearly label unsourced values as experimental parameters.

**Severity:** Major

### W2. BI and OJK governance boundaries need justification

**Problem:** The system includes OJK as a peer/observer while also using a generic 3-of-5 organization endorsement policy for all state-changing transactions ([main.tex:286](/home/mfachrizalg/2026/Skripsi/bi-coin/paper/main.tex:286), [main.tex:397](/home/mfachrizalg/2026/Skripsi/bi-coin/paper/main.tex:397)). The paper does not explain whether an observer can endorse, which institutions control monetary actions, or how BI and OJK supervisory mandates differ.

**Why it matters:** Governance is part of CBDC correctness. A technically valid majority can still encode an institutionally invalid authority model.

**Required fix:** Add a transaction-level authorization and endorsement matrix. Separate BI issuance authority, bank/PJP customer operations, BI payment-system supervision, and any OJK bank-supervision role. Explain whether the OJK peer is endorsement-capable or read-only by policy.

**Severity:** Major

### W3. Related-work coverage is too small for the breadth of the novelty claim

**Problem:** Only 20 unique works are cited: 8 technical/official reports, 5 conference papers, 4 articles, and 3 miscellaneous sources. Important CBDC governance, privacy-by-design, operational resilience, and production pilot evidence is only lightly represented.

**Why it matters:** The contribution is interdisciplinary. A narrow literature set can make integration appear novel because relevant systems are excluded by category.

**Required fix:** Expand the comparison protocol and include explicit selection criteria. Compare requirements and trust models, not only checkmarks for two-tier/KYC/benchmark features.

**Severity:** Major

### W4. “Business-process realization” needs acceptance criteria

**Problem:** Tables map processes to transactions, but do not define what constitutes correct issuance, distribution, redemption, or reconciliation from an institutional/accounting perspective.

**Why it matters:** A transaction existing in chaincode does not prove the corresponding central-bank process is correctly represented.

**Required fix:** For each process, state preconditions, authorized actor, ledger invariants, expected accounting effect, audit evidence, and failure conditions.

**Severity:** Major

---

# Reviewer 4 — Security, Privacy, and Operational Resilience

## Review Focus

Threat model, trust boundaries, ledger governance, privacy, off-chain integrity, and deployability.

## Recommendation

**Major Revision**

## Strengths

### S1. Raw identity data is kept off-chain

The design avoids placing full KYC documents and raw personal data on an immutable ledger. It stores selected status fields and document hashes on-chain while PostgreSQL holds detailed identity data.

### S2. Deterministic time source is correctly motivated

The paper recognizes that local peer clocks would break endorsement determinism and uses Fabric's transaction timestamp for policy-window calculations.

### S3. Security limitations are disclosed

The manuscript explicitly acknowledges lack of transaction privacy, private data collections, privacy-preserving cryptography, offline payments, and production integration ([main.tex:928](/home/mfachrizalg/2026/Skripsi/bi-coin/paper/main.tex:928)–935).

## Weaknesses

### W1. One orderer cannot provide Raft crash fault tolerance

**Problem:** The architecture shows one `orderer.paynet` and labels it “Raft CFT” ([main.tex:345](/home/mfachrizalg/2026/Skripsi/bi-coin/paper/main.tex:345), [main.tex:473](/home/mfachrizalg/2026/Skripsi/bi-coin/paper/main.tex:473)). Repository configuration also contains one orderer service.

**Why it matters:** Raft with one node tolerates zero orderer failures. The label overstates availability and can mislead readers about fault tolerance.

**Required fix:** Rename it a single-node Raft development deployment and state `f = 0`, or deploy at least three orderers across independent fault domains and evaluate failover.

**Severity:** Major

### W2. No explicit threat model

**Problem:** The paper does not enumerate trusted parties, compromised peers, malicious clients, key theft, colluding organizations, tampered PostgreSQL records, replay, denial of service, or administrator abuse.

**Why it matters:** “Permissioned” does not define security. The chosen 3-of-5 endorsement policy has different guarantees under one, two, or three compromised organizations.

**Required fix:** Add assets, actors, trust assumptions, attack surfaces, mitigations, and residual risks. State which threats are prevented, detected, or out of scope.

**Severity:** Major

### W3. Privacy is not only a future feature; it changes architecture validity

**Problem:** All authorized channel peers can see retail ledger data. Even without raw KYC, transaction graphs, wallet identifiers, risk flags, timestamps, and document hashes may be sensitive.

**Why it matters:** Retail CBDC privacy and data minimization are system requirements, not optional throughput enhancements.

**Required fix:** Define a privacy requirement and data-access matrix. Evaluate channels, private data collections, encrypted off-chain references, or zero-knowledge/selective-disclosure approaches. At minimum, explain why the current design is suitable only for functional study.

**Severity:** Major

### W4. Off-chain/on-chain consistency is underspecified

**Problem:** The manuscript does not define document canonicalization before hashing, hash salting, PostgreSQL transaction/ledger commit coordination, recovery after partial failure, erasure/correction handling, or audit reconciliation.

**Why it matters:** A hash anchor proves equality only when object encoding and lifecycle are defined. Dual writes can diverge.

**Required fix:** Specify canonical serialization, hashing algorithm, identifier binding, transaction sequencing, compensation/retry logic, and periodic reconciliation.

**Severity:** Major

### W5. Authorization evidence is too coarse

**Problem:** A role table lists permitted actions, but the paper does not show which checks execute in backend JWT/RBAC versus chaincode client-identity checks. Backend-only authorization would be bypassable by direct gateway access.

**Required fix:** Provide a trust-boundary diagram and transaction-by-transaction enforcement location. Treat chaincode authorization as the authoritative boundary for monetary state changes.

**Severity:** Major

---

# Reviewer 5 — Devil's Advocate

## Strongest Counter-Argument

The manuscript demonstrates that a retail-CBDC workflow can be implemented on Hyperledger Fabric, but it does not demonstrate that blockchain is necessary, preferable, or safer for that workflow. Every participating organization is regulated and identified. A conventional replicated database with signed audit logs, strict role-based authorization, and centralized Bank Indonesia governance could implement issuance, distribution, KYC status, limits, redemption, and supervision with less operational complexity, stronger transaction privacy, and much higher throughput. The paper provides no centralized baseline, governance-cost comparison, or explicit requirement that only a blockchain can satisfy. Its observed peak of approximately 14.5 TPS is therefore evidence of feasibility under a small single-host setup, not evidence of architectural advantage.

The strongest security claim also rests on evidence that was intentionally excluded from the benchmark. MVCC is invoked to argue double-spend safety, but all concurrent transfers use disjoint wallets, producing zero conflicts by construction. The benchmark therefore tests neither the double-spend race nor hot-key limit enforcement. Finally, the formal tier function does not match the executable policy for high-risk subjects. Until the authors reconcile the formal model, test the adversarial state transition, and explain why distributed endorsement is required by the trust model, the manuscript's core contribution is best described as an integrated Fabric case study—not a validated CBDC architecture.

## Issue List

### CRITICAL

| # | Dimension | Issue | Location |
|---|---|---|---|
| C1 | Formal correctness | Wallet-tier equation rejects high-risk subjects while chaincode accepts approved high-risk subjects with enhanced due diligence and senior approval. | Equation (1), PDF pp. 3–4; `main.tex` 641–655; `compliance_policy.go` 24, 47–54 |

### MAJOR

| # | Dimension | Issue | Location |
|---|---|---|---|
| M1 | Architectural necessity | No centralized/replicated-database alternative or trust-requirement comparison establishes why blockchain is needed. | Introduction, System Architecture |
| M2 | Empirical validity | Contention-free workload cannot test claimed double-spend rejection or concurrent limit safety. | Performance Evaluation, PDF pp. 6–7 |
| M3 | Fault tolerance | Single orderer is labeled Raft CFT although it tolerates no orderer failure. | Architecture figures and Table III |
| M4 | Novelty | “Only entry” claim is unsupported by a systematic search. | Background and Related Work |
| M5 | Policy validity | Wallet tiers and numerical limits are presented without official-source traceability. | Protocol and Determinism |

### MINOR

| # | Dimension | Issue | Location |
|---|---|---|---|
| N1 | Precision | Title uses singular “Business Process” and omits Digital Rupiah/Fabric. | Title |
| N2 | Interpretation | “Zero failures” can be read as robustness evidence although only happy paths were submitted. | Abstract, Results, Conclusion |

## Ignored Alternative Explanations

1. Throughput may be limited by single-host CPU/disk contention, CouchDB, block cutting, Docker scheduling, or the benchmark client—not necessarily the Fabric server path claimed.
2. Integration novelty may result from the selected comparison set rather than a real absence of comparable prototypes.
3. Zero policy rejections may indicate a non-discriminating workload, not correct enforcement.

## Missing Stakeholder Perspectives

1. Retail users whose transaction metadata is visible to channel peers.
2. Banks/PJP responsible for operational liability when off-chain KYC and on-chain state diverge.
3. BI and OJK governance owners deciding who may endorse monetary state changes.
4. Operators responsible for key custody, revocation, disaster recovery, and incident response.

---

# Editorial Synthesis

## Recommendation Matrix

| Reviewer | Recommendation | Primary reason |
|---|---|---|
| EIC | Major Revision | Useful contribution; insufficient evidence and overbroad novelty wording |
| Methodology | Major Revision | No repetitions/adversarial tests; formal-code mismatch |
| Domain | Major Revision | Policy and governance rules lack traceability |
| Security/Perspective | Major Revision | Threat model, privacy, authorization, and fault tolerance insufficient |
| Devil's Advocate | Critical issue present | Formal model contradicts implementation |

## Consensus

### CONSENSUS-4: Integrated prototype is valuable but not publication-ready

All four standard reviewers consider the integrated business-process scope a real strength. All also require substantial revision before publication.

### CONSENSUS-4: Claims need tighter boundaries

The novelty, reproducibility, policy-validity, and performance claims are stronger than their supporting evidence in different ways. Each reviewer requests clearer separation between demonstrated behavior, formal argument, prototype assumption, and future production requirement.

### CONSENSUS-3: Evaluation must be expanded

EIC, methodology, and security reviewers require stronger empirical evidence. The domain reviewer focuses on process acceptance criteria rather than performance statistics, but its requested conformance matrix supports the same revision direction.

### DA-CRITICAL: Formal tier function must match executable policy

The issue is corroborated by the methodology reviewer and verified directly against passing chaincode tests. It is valid and must be fixed before re-review.

## Disagreements and Resolution

### Is the double-spend argument invalid?

- **Methodology view:** The MVCC argument is plausible but empirically untested.
- **Devil's Advocate view:** Highlighting double-spend safety without an adversarial workload weakens the core claim substantially.
- **Resolution:** Do not call the argument disproven. Classify it as formally argued but experimentally unvalidated. Require a direct adversarial test.

### Is missing privacy fatal?

- **EIC/domain view:** The paper can remain a bounded functional prototype if privacy limits are explicit.
- **Security view:** Privacy affects architecture validity and needs a requirement/trust analysis now.
- **Resolution:** Privacy-preserving implementation is not mandatory for this revision, but a privacy requirement, access matrix, threat analysis, and clear prototype boundary are mandatory.

### Is a centralized baseline mandatory?

- **EIC view:** Not mandatory if the contribution is framed as a Fabric implementation case study.
- **Devil's Advocate view:** Mandatory if the paper implies blockchain advantage or necessity.
- **Resolution:** Authors may either add a baseline or remove comparative architectural-value claims and state that platform selection is assumed rather than proven.

---

# Required Revision Roadmap

## Priority 1 — Correctness and Core Evidence

| ID | Required revision | Source | Severity | Acceptance criterion | Effort |
|---|---|---|---|---|---:|
| R1 | Reconcile wallet-tier equation, prose, chaincode, and tests. | Methodology, DA | Critical | High-risk + enhanced due diligence + senior approval produces the same tier in formal definition, code, and test table. | 0.5–1 day |
| R2 | Add concurrent same-wallet and shared-receiver adversarial workloads. | Methodology, DA | Major | Show commit/MVCC-invalid counts; final balances and counters preserve all limits. | 2–4 days |
| R3 | Add independent benchmark repetitions and uncertainty. | EIC, Methodology | Major | At least 5 runs/configuration; longer rounds; mean, SD/95% CI, p50/p95/p99; raw reports archived. | 3–5 days |
| R4 | Add negative-path policy conformance evaluation. | Methodology, Domain | Major | Every KYC, freeze, role, amount, daily/monthly, incoming, and balance rule has expected rejection evidence. | 2–3 days |

## Priority 2 — Architecture and Domain Validity

| ID | Required revision | Source | Severity | Acceptance criterion | Effort |
|---|---|---|---|---|---:|
| R5 | Correct the single-orderer fault-tolerance claim. | Security, DA | Major | State single-node Raft has `f = 0`, or deploy/test a 3+ orderer cluster. | 0.5–3 days |
| R6 | Add transaction-level governance and authorization matrix. | Domain, Security | Major | Initiator, chaincode check, endorsement organizations, and BI/OJK role are explicit for every state change. | 1–2 days |
| R7 | Add policy traceability for tiers and limits. | Domain, DA | Major | Every rule is marked official requirement, derived interpretation, or prototype assumption with source/rationale. | 1–2 days |
| R8 | Add threat model and off-chain/on-chain integrity protocol. | Security | Major | Trust assumptions, attacks, enforcement boundaries, hash canonicalization, dual-write recovery, and residual risks documented. | 2–4 days |

## Priority 3 — Contribution and Reproducibility

| ID | Required revision | Source | Severity | Acceptance criterion | Effort |
|---|---|---|---|---|---:|
| R9 | Bound novelty claim and expand literature selection method. | EIC, Domain, DA | Major | “Only entry” removed or supported by documented search/inclusion method. | 1–3 days |
| R10 | Add artifact-availability statement. | EIC, Methodology | Major | Public/archive URL, immutable commit/tag, versions, configs, raw reports, and reproduction command included. | 0.5–1 day |
| R11 | Clarify blockchain necessity or narrow contribution. | EIC, DA | Major | Add alternative-architecture comparison, or explicitly frame work as a Fabric case study without superiority claim. | 1–3 days |
| R12 | Revise title and qualify “zero failures” language. | EIC, DA | Minor | Title names retail Digital Rupiah/Fabric; Results distinguish expected rejections, unexpected failures, and happy-path success. | 0.5 day |

## Re-Review Gate

Do not request re-review until R1–R10 are complete. R11 may be satisfied through either added evidence or narrower claims. R12 is editorial cleanup.

---

# Source-Audit Notes

1. `paper/main.tex` contains 34 citation occurrences covering 20 unique works; all citation keys resolve.
2. The benchmark summary artifact matches Tables X–XI: 616 successful requests, zero failed requests, and zero MVCC conflicts in a contention-free workload.
3. Focused chaincode tests passed on 2026-07-02: `go test -count=1 ./...`.
4. The manuscript contains no repository URL or artifact/data-availability statement.
5. The reviewer skill's referenced v3.6.2 `shared/contracts/reviewer/full.json` and schema are absent from the installed package. The review therefore used the skill's classic five-reviewer rubric and decision matrix rather than claiming sprint-contract validation.
6. No manuscript or implementation file was modified by the review. This report is the only added artifact.
