# Remaining paper and thesis review

Date: 20 September 2026. This supplements, rather than replaces, the [initial nine findings](joint-paper-thesis-review-2026-09-20.md). Manuscripts and application code remain unchanged.

## Coverage and assessment

**The additional review confirms material literature, implementation-description, and reproducibility defects.** The recommendation remains major revision. The benchmark defects in the first report remain unresolved; this pass did not reinterpret them as corrected evidence.

| Workstream | Completed in this pass | Limit |
|---|---|---|
| Citations | Inventoried all 59 distinct active sources; checked available primary passages, metadata, and author/publisher abstracts; documented contradictions and unavailable originals. | Seven source identities/routes still need usable original text, and abstract-only rows have explicit limits. See [coverage ledger](citation-coverage-2026-09-20.md). |
| Document structure and layout | Inspected all 7 paper and 101 thesis pages as rendered contact sheets; checked selected problem pages at higher resolution and read relevant source prose, figures, tables, and listings. | This is a layout and substantive-writing review, not a claim of exhaustive character-by-character proofreading or official DTETI acceptance. |
| Implementation claims | Cross-checked issuance, custodian funding, transfer roles, timestamps, benchmark appendices, and distribution descriptions against current code and tests. | This is not a new whole-repository security audit or live multi-organization integration test. |
| Fresh experiments | Existing diagnostic checks and raw-artifact analysis support the findings. A targeted replacement protocol is specified in the original roadmap. | No new ledger benchmark ran. Harness/fixture repairs and a disposable network are prerequisites. |

The review deliberately does not mark inaccessible original papers as verified, treat a green unit suite as evidence that the benchmark dataset is sound, or change manuscript claims to fit assumptions.

## Additional findings

### R10 — Prior-work performance evaluations are understated

**Major: literature comparison and contribution positioning.** [Thesis Chapter 2:116](../../thesis/contents/chapter-2/chapter-2.tex#L116) assigns Islam/In “Tidak” under performance benchmarking, and [line 120](../../thesis/contents/chapter-2/chapter-2.tex#L120) does the same for PayOff.

The [original PayOff paper](../../.raw/papers/payoff-a-regulated-central-bank-digital-currency-with-private-offline-payments.md), PDF pp.11–13, contains a prototype, evaluation setup, measured operation timings, and throughput analysis. The [Islam/In author-institution record](https://pure.korea.ac.kr/en/publications/a-privacy-preserving-transparent-central-bank-digital-currency-sy/) reports a Python-Flask implementation and measured verification performance. These are not the same experiments as this project's Caliper study, but they are performance evaluations.

**Remedy:** define the comparison column precisely. Separate an implemented prototype, operation-level microbenchmarks, network throughput, publicly reproducible artifacts, and direct comparability. Replace the unqualified “no evaluation” entries. Do not weaken the legitimate Indonesia/Fabric integration contribution by making an unnecessary absence claim about prior work.

### R11 — The local SoK source is not the cited 2025 publication

**Major: source identity and traceability.** `sethaput2025` cites DOI `10.1109/BCCA66705.2025.11229667`, whose registered title is the 2025 BCCA SoK paper. However, [the local extraction with that filename/title](../../.raw/papers/sok-blockchain-applications-in-central-bank-digital-currencies-cbdcs.md#L20) opens with *Blockchain application for central bank digital currencies (CBDC)*, *Cluster Computing* 26 (2023), DOI `10.1007/s10586-022-03962-z`.

The two records share authors and topic, but are different publications. A filename, frontmatter title, or knowledge-graph node cannot establish that the cited version was read.

**Remedy:** obtain the actual 2025 paper and verify its cited claims, or cite the 2023 article actually used and reassess the affected statements. Keep `.raw/` immutable; do not rewrite its extracted content to hide the mismatch. This finding is not a claim that the 2025 publication is fabricated—its DOI identity was verified.

### R12 — Platform-performance tables present inadequately sourced numbers

**Major: technical selection rationale.** [Chapter 2:554](../../thesis/contents/chapter-2/chapter-2.tex#L554) attributes approximately 170 TPS for Corda to *Blockchain Platforms: A Compendium*. That numerical result could not be located in the [six-page original extraction](../../.raw/papers/blockchain-platforms-a-compendium.md); its Corda discussion is qualitative. Adjacent approximately 300 and 1,000 TPS values are labeled “indicative” without identifying an experiment. [The general architecture table](../../thesis/contents/chapter-2/chapter-2.tex#L479) similarly supplies >50,000 and 7–50 TPS category-wide values without a reproducible basis.

The Fabric >3,500 TPS figure does appear in Androulaki et al., but it belongs to that specific configuration and workload. Combining it with unsupported or differently measured values does not form a controlled platform ranking.

**Remedy:** remove untraceable numbers or supply original experiment citations with version, workload, topology, and measurement boundary. Preserve qualitative selection arguments. The reproduced Urbančok asset-transfer Figure 8.6 is traceable to PDF p.81 of its [original thesis](../../.raw/papers/blockchain-open-source-software-comparison.md); do not discard that correctly attributed figure simply because its experiment differs from this study.

### R13 — The database comparison contains factual and conceptual errors

**Major: correctness of the design justification.** [Chapter 3:369](../../thesis/contents/chapter-3/chapter-3.tex#L369) and its [comparison table](../../thesis/contents/chapter-3/chapter-3.tex#L405) need correction:

| Statement | Evidence | Correction |
|---|---|---|
| SQL Server RLS is Enterprise-only. | [Microsoft's SQL Server 2022 edition matrix](https://learn.microsoft.com/en-us/sql/sql-server/editions-and-components-of-sql-server-2022?view=sql-server-ver16) lists RLS for Standard, Web, and Express too. | Remove the Enterprise-only restriction. PostgreSQL documentation is not a source for SQL Server licensing/features. |
| MySQL ACID is partial because DDL is non-atomic. | [MySQL 8.4 documentation](https://dev.mysql.com/doc/refman/8.4/en/atomic-ddl.html) distinguishes atomic DDL from transactional DDL. | Separate transaction guarantees from whether DDL can be grouped inside an application transaction. |
| MVCC implies no read skew and ensures an audit event is stored before commit. | [PostgreSQL isolation documentation](https://www.postgresql.org/docs/18/transaction-iso.html) describes statement snapshots under default Read Committed. | Name the isolation level and transaction boundary. MVCC alone neither establishes application audit-write ordering nor gives every transaction a fixed snapshot. |
| Current NoSQL alternatives can be discounted using the historical consistency trade-off. | [The cited Ispirer article](https://www.ispirer.com/blog/nosql-databases-financial-services) acknowledges modern ACID transactions; [MongoDB's primary documentation](https://www.mongodb.com/docs/manual/core/transactions/) describes distributed atomic transactions. | Keep any historical qualifier and compare current requirements/capabilities accurately. |

The claim that PostgreSQL is more widely adopted in Fabric than the alternatives also lacks comparative adoption evidence. Private-data-collection documentation describes authorized peers' private state and public hashes; it does not establish that market-share comparison.

**Remedy:** retain PostgreSQL if it meets the actual project requirements. Rewrite the rationale around those requirements and verified capabilities, not incorrect limitations of other products. Distinguish a database capability from a control enabled in this application; this audit does not claim that merely choosing PostgreSQL enables RLS automatically.

### R14 — Version-specific and algorithm-specific claims need appropriate sources

**Moderate: theoretical accuracy.** [Chapter 3:301](../../thesis/contents/chapter-3/chapter-3.tex#L301) cites the 2018 Fabric paper for the implemented Raft choice and asserts lower ordering latency than Kafka. The [original paper](../../.raw/papers/hyperledger-fabric-a-distributed-operating-system-for-permissioned-blockchains.md) evaluates Kafka ordering. [Fabric's own release notes](https://hyperledger-fabric.readthedocs.io/en/release-1.4/whatsnew.html) say its Raft ordering service was introduced in v1.4.1. Architectural pluggability in the earlier paper is not a performance comparison of those later implementations.

Two related generalizations need narrowing: [Chapter 2:267](../../thesis/contents/chapter-2/chapter-2.tex#L267) groups PoW and PoS as computationally expensive, and [line 627](../../thesis/contents/chapter-2/chapter-2.tex#L627) assigns one complexity/finality classification to combined PoS/PoA. [Ethereum's primary energy documentation](https://ethereum.org/en/energy-consumption/) illustrates why the PoW energy property cannot be generalized to PoS. Consensus families do not have one protocol-independent message complexity and finality rule.

**Remedy:** cite the selected Fabric release for Raft support; remove the unmeasured Kafka latency superiority claim or provide a comparable study. Identify individual consensus protocols and versions instead of universal family-wide performance claims. In the CouchDB table, describe JSON indexes as supporting efficient/sorted queries, not as independently guaranteeing transaction determinism.

### R15 — Custodian funding is described as creating value rather than transferring it

**Major: monetary-flow description.** [Chapter 3:728](../../thesis/contents/chapter-3/chapter-3.tex#L728) says custodian-to-retail funding “only credits the receiver.” The actual [funding policy](../../bi-coin-fabric/chaincode/compliance_policy.go#L123) subtracts the amount from the sender and credits the receiver. [The regression assertion](../../bi-coin-fabric/chaincode/digital_rupiah_v3_test.go#L545) verifies both balances.

**Remedy:** correct the explanation and excerpt to show conservation of value. This is a manuscript defect; the inspected implementation already performs the debit. Do not change the implementation to match the erroneous comment.

### R16 — The Mint illustration omits the controls named in its caption

**Major: implementation evidence.** [Chapter 3:690](../../thesis/contents/chapter-3/chapter-3.tex#L690) presents a Mint implementation, while its prose/caption say authorization is verified. The excerpt omits the Bank Indonesia authorization check and the `putWallet` persistence call. Both exist in the real [Mint function](../../bi-coin-fabric/chaincode/digital_rupiah.go#L751), at lines 752 and 789 respectively.

**Remedy:** include those essential operations in the abbreviated listing, or label it explicitly as incomplete pseudocode and describe the omitted checks accurately. A diagram claimed as implementation evidence should not omit the operations that establish its stated invariant. No missing-Mint-authorization vulnerability was found in the inspected real function.

### R17 — The transfer-route illustration states the wrong access boundary

**Major: role contract.** [Chapter 3:783](../../thesis/contents/chapter-3/chapter-3.tex#L783) permits `RoleAuthenticated` in the illustrated transfer route. The actual [route](../../bi-coin-fabric/backend/handlers/handlers.go#L96) allows `RoleKycVerified`, merchants, and custodian roles. An authenticated-only retail actor is not equivalent to an approved retail actor.

**Remedy:** synchronize the listing and role explanation with the actual boundary, including custodian funding access. Keeping KYC outside the main thesis contribution does not justify an inaccurate literal middleware example. Distinguish grouped role categories in tables from the actual role constants instead of relying on inconsistent six/seven-role counts.

### R18 — The appendix points readers to a different benchmark suite

**Major: reproducibility instructions.** [Appendix L.4](../../thesis/contents/appendix/appendix-code.tex#L20) says it includes the configurations used by the current thesis, but includes the older worker-1/2/4 retail-transfer files and `retail-transfer-repeat.yaml`. The current primary statistical study uses generated per-operation configurations, calibration including eight workers, and five repetitions per selected load.

Loading a file directly with `lstinputlisting` prevents copying drift; it does not make the selected file the correct experiment.

**Remedy:** identify the exact primary-study manifest and generated configuration locations. Replace or relabel the historical suite listings. Keep the network-configuration schema version distinct from Fabric and chaincode versions, as the appendix already explains correctly. This extends R4's evidence-map correction.

### R19 — One remaining distribution description contradicts the selected prototype

**Major: internal consistency.** [Chapter 3:607](../../thesis/contents/chapter-3/chapter-3.tex#L607) describes `BI → bank → PJP → retail customer`. The active research questions, conclusions, glossary, and implementation describe direct distribution from Bank Indonesia to a validator bank **or** PJP custodian, followed by retail service.

**Remedy:** use one accurate representation of the implemented route throughout the thesis and figures. Keep policy-roadmap alternatives explicitly distinguished from the simplified prototype; do not change the implementation or invent an intermediate bank-to-PJP hop to reconcile an old sentence.

### R20 — Several bibliographic dates and locations need correction

**Moderate: source identification.** [The paper's MeetCoin entry](../references.bib#L77) uses 2024, while [UGM's catalog](https://etd.repository.ugm.ac.id/penelitian/detail/249698) identifies the work as a 2025 thesis. [The Sand Dollar entry](../references.bib#L207) does not match the linked report's title/date; the [central bank publication record](https://www.centralbankbahamas.com/publications/main-publications/project-sanddollar-a-bahamian-payments-system-modernization-initiative) identifies *A Bahamian Payments System Modernization Initiative*, dated 24 December 2019. The [Ispirer entry](../../thesis/references.bib#L1399) uses 2024, while the fetched article is dated December 17, 2025.

The old Caliper homepage in both bibliographies returns 404; the current official documentation is under [hyperledger-caliper.github.io](https://hyperledger-caliper.github.io/caliper/0.7.1/). Pin the relevant version when citing version-specific behavior instead of silently substituting current documentation for Caliper 0.6.0.

**Remedy:** correct verified identity/location mismatches and consistently choose online-first versus issue-year conventions. Barrdear's article was online in 2021 and printed in volume 142 (2022), so that difference is not evidence of fabrication. Likewise, chapter/book titles and unusual citation-key names were checked literally and are not defects by themselves.

### R21 — Final presentation and administrative readiness remain uneven

**Moderate: handoff readiness.** The all-page scan confirms the clipped Chapter 3 testbed table already reported as R9. Several large figures are sideways while surrounding pages and captions remain portrait, particularly PDF pages 26, 28, 47, 52, and 54. Review them at normal reading scale and choose a consistent landscape treatment where the template permits it. This is a readability improvement, not evidence of incorrect figure content.

The front matter still has a TODO for the examination date and an `8 - 13 Juli 2026` range in [main.tex:38](../../thesis/main.tex#L38), a July 1 statement date, and a June preface, while the evaluated evidence now extends into September. Those may be historical dates; the reviewer must not invent replacement dates or signatures. Have the author distinguish original examination dates from the revision/submission date and resolve actual placeholders before final submission.

The prose is generally structured around the two research questions and preserves the single-host, privacy, and production-readiness limitations. The main writing problem is inconsistent technical content across prose, listings, and tables, rather than a need for wholesale stylistic rewriting. Stabilize those facts first. Preserve Indonesian decimal formatting and original technical terms during any later language pass.

## Positive checks and rejected false alarms

1. **All pages were included in the layout scan:** paper 1–7 and thesis 1–101. Existing numbered headings, references, and appendix sequence are present. The contact-sheet scan is not a substitute for checking fine print on each affected final page after revision.
2. **Current monetary code conserves custodian funds and authorizes Mint.** The erroneous snippets do not justify changing correct code. `txNow` uses the proposal timestamp and a deterministic fallback, consistent with the no-peer-local-clock claim.
3. **Several apparent bibliography issues were not defects.** `fabric_perf2023` has a correct 2019 bibliographic year; the Urbančok thesis really is from 2019; `unknown2022f` and `unknown2025p` correctly separate chapter and book titles.
4. **The cited historical comparison numbers have different statuses.** Garuda's 37/39 TPS and Urbančok Figure 8.6 are traceable. The uncited/incorrectly attributed platform-wide throughput numbers require separate repair.
5. **The six primary passing-load rows remain reproducible observations.** Their survival does not rehabilitate the mixed execution windows, invalid fixtures, or incorrect failure explanations established in the first report.

## Remaining work that cannot be called verified

The [coverage ledger](citation-coverage-2026-09-20.md) identifies the inaccessible/mismatched originals and every abstract-only limitation. A registry record verifies a publication's identity, not all statements attributed to it. These gaps need the actual source text; no fabricated quotations, page numbers, or support verdicts were substituted.

Fresh ledger measurements remain a separate unfinished workstream. Their current runner deletes Garuda volumes, and rerunning it unchanged would reproduce the identified harness/fixture problems. The concrete next execution scope is: repair attempt isolation and failure parsing, repair financially invalid fixtures, establish a disposable network, rerun the affected records/profiles, and update the evidence map. No full-study rerun or existing-ledger reset is implied by this review.

Only review artifacts and temporary rendering files were added. No manuscript, bibliography, application source, benchmark result, or network state was changed.
