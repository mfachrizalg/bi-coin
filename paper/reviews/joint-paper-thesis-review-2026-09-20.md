# Joint paper and thesis review

> **Four-organization restatement (2026-10-16):** five-organization evidence in this document is superseded by the four-organization network (CentralBankMSP, DistributorMSP, ValidatorMSP, EndUserMSP). The role `validator_bank` and participant type `validator` were removed; banks are `distributor`. Terms are kept as recorded at review time and are not evidence for the four-organization prototype.

Follow-on work: [additional findings R10–R21 and all-page review](remaining-review-audit-2026-09-20.md), with [coverage of all 59 active cited sources](citation-coverage-2026-09-20.md). These documents identify the remaining full-text and experimental verification gaps explicitly.

Reviewed 19–20 September 2026 against working-tree snapshot `e32c768b7f33c8dae16824990dec23d0bf659018` and the existing uncommitted work. Standards: general IEEE paper expectations and the repository's DTETI thesis guidance. Deliverable: findings and revision roadmap, with manuscripts unchanged.

## Assessment

**Major revision is needed before treating the performance study as submission-ready evidence.** Updating the September 9 manifest reference alone would leave material measurement errors unresolved. Seven run records combine separate execution attempts, distribution measures an unfunded treasury, and the high-contention workload is dominated by receiver-balance-limit rejections. The failure classifier discards details that explain many supposedly unknown failures.

The work still has usable evidence. All six reported highest-passing-load rows reproduce from their underlying successful transaction traces. The separate service demonstration matches its newer summary. Both manuscripts limit national-scale, privacy, fault-tolerance, and security claims appropriately. Their research questions and principal conclusions broadly align.

This is a source-grounded technical and manuscript review, not a completed ARS five-seat peer-review panel or an official examination verdict. External citation verification was targeted; it was not an exhaustive source-by-source audit of every bibliography entry.

### Five priorities

| Priority | Finding | Minimum remedy |
|---|---|---|
| 1 | R1: Separate attempts are merged into seven nominal runs. | Isolate attempts, validate measurement windows, replace affected evidence. |
| 2 | R2: Distribution and high-contention fixtures do not isolate capacity. | Correct funding/headroom and rerun those profiles. |
| 3 | R3: Explicit rejection reasons become “Unknown failure.” | Parse complete error records and regenerate diagnostics. |
| 4 | R4: Methods and evidence provenance describe incompatible snapshots. | Separate the three evidence sources and synchronize methods with the recorded experiment. |
| 5 | R5: OpenCBDC's data model is misrepresented. | Correct the comparator to the cited UTXO-based Project Hamilton design. |

## Evidence that survives the audit

The primary study is [statistical-20260917-pilot6](../../bi-coin-fabric/benchmark/results/statistical-20260917-pilot6/manifest.json), whose manifest was created on September 19. It contains 380 recorded runs, including 240 primary runs grouped into 48 conditions with five repetitions each. The saved validator reports `valid: true`; R1–R3 show why that status does not establish experimental validity.

For the highest-passing-load rows, the audit independently recalculated successful counts and interpolated p95/p99 from all five raw traces per condition. The resulting means match both manuscripts:

| Operation | Highest passing tested load | Mean p95 | Mean p99 |
|---|---:|---:|---:|
| Balance query | 190 TPS | 0.01 s | 0.01 s |
| Wallet freeze / unfreeze | 50 / 65 TPS | 0.28 / 0.27 s | 0.37 / 0.35 s |
| Redemption | 25 TPS | 0.53 s | 0.60 s |
| Retail transfer, low contention | 20 TPS | 0.72 s | 0.89 s |
| Merchant payment | 20 TPS | 0.66 s | 0.75 s |

None of these 30 selected runs was among the seven mixed-window records. This verifies these observations, not a universal capacity limit or the integrity of the entire study. Query, freeze, and redemption pass at their highest tested load, so their actual saturation limits have not been established.

The [e2e-20260917-kyc4 summary](../../bi-coin-fabric/benchmark/results/e2e-20260917-kyc4/summary.json) reproduces all six service-stage means and standard deviations in the paper and thesis, subject to their displayed rounding. It is a different experiment from the direct-Fabric study.

The older [September 9 manifest](../../bi-coin-fabric/benchmark/results/20260909-final-evidence-manifest.json) supports the reported authorization 2/1, boundary 4/4, negative-path 0/7, and aggregate-overspend 10/190 conformance counts. Retain that provenance for those historical observations; do not relabel them as September 17 statistical runs.

## Major findings

### R1 — Seven run records contain multiple execution attempts

**Impact:** offered/achieved TPS, repetition statistics, calibration comparisons, failure totals, and some resource windows are computed from events that do not belong to one declared measurement window.

The audit parsed all measured trace files for all 380 run records. Submission and completion counts agree with the saved summary, but seven records span far longer than their configured duration. This is not a duplicate-transaction-ID issue: separate attempts contribute different transactions under the same round label.

Primary records:

| Run suffix | Declared window | First-to-last measured submission span | Consequence |
|---|---:|---:|---|
| `primary-redemption-low-1w-20tps-r5` | 120 s | 68,090.762 s | 3,242 submissions become 27.0167 TPS at a 20 TPS target. |
| `primary-retail-transfer-high-1w-75tps-r3` | 120 s | 19,995.749 s | 18,002 submissions become 150.0167 TPS at a 75 TPS target. |
| `primary-retail-transfer-high-1w-150tps-r3` | 120 s | 14,250.244 s | 36,002 submissions become 300.0167 TPS at a 150 TPS target. |

Calibration and pilot records:

| Run suffix | Declared window | First-to-last measured submission span |
|---|---:|---:|
| `calibration-retail-transfer-low-2w-30tps-r4` | 60 s | 662.735 s |
| `calibration-retail-transfer-low-2w-40tps-r5` | 60 s | 18,612.367 s |
| `calibration-retail-transfer-low-2w-50tps-r3` | 60 s | 13,440.460 s |
| `scenario-pilot-distribution-low-1w-60tps-r1` | 30 s | 24,189.704 s |

For example, [the 75 TPS high-contention trace](../../bi-coin-fabric/benchmark/results/statistical-20260917-pilot6/runs/primary-retail-transfer-high-1w-75tps-r3/transactions-worker-0.jsonl) contains warmup at line 1, measurement at line 303, a second warmup at line 18,305, and another measurement at line 18,607. The measured sessions begin at `2026-09-19T00:01:15.773Z` and `2026-09-19T05:32:31.523Z`.

**Cause:** [the observer](../../bi-coin-fabric/benchmark/observers/jsonl-transaction-observer.js#L27) opens the worker trace with append mode. [The runner](../../bi-coin-fabric/scripts/run-benchmark-study.sh#L151) reuses the run directory and removes `report.html`, but does not isolate the old worker traces. [The analyzer](../../bi-coin-fabric/scripts/analyze-benchmark-results.js#L137) groups all events by round label, then divides by the configured duration.

**Minimum correction:** preserve the original evidence; use a new directory for each actual attempt, or archive an incomplete attempt before reusing its nominal run key. Validate one warmup/measurement sequence per attempt, measurement timestamps, expected worker coverage, and matching log/trace provenance. Replace the seven affected records with controlled reruns and recompute calibration and downstream results. Do not silently select whichever old segment produces the best result. Timestamp segmentation is suitable for forensic diagnosis; a recovered segment should become evidence only if its matching configuration, log, resources, and completion boundary can also be established.

Affected manuscript claims include [paper methodology](../main.tex#L612), [thesis repeatability protocol](../../thesis/contents/chapter-3/chapter-3.tex#L580), and the repetition summaries in both documents.

### R2 — Two workload fixtures confound the performance interpretation

**Distribution:** all 497,849 failed transactions across its 30 primary runs have measured-round log records reporting `insufficient balance: have 0, need 1000`. This is a business precondition rejection, not evidence that distribution cannot meet a load because of capacity. A representative measured request and its detail are at lines 602–604 of [the 75 TPS run log](../../bi-coin-fabric/benchmark/results/statistical-20260917-pilot6/runs/primary-distribution-low-1w-75tps-r1/caliper.log).

The distribution workload calls `ensureBenchmarkCustodian` before measurement. [That helper](../../bi-coin-fabric/benchmark/workloads/retail-base.js#L285) issues liquidity and immediately distributes that amount into the custodian wallet. It does not reserve Treasury funds for the subsequent measured distribution requests.

**High-contention retail transfers:** the measured logs contain 488,059 explicit receiver-max-balance rejections. A representative detail is at lines 595–597 of [the 75 TPS run log](../../bi-coin-fabric/benchmark/results/statistical-20260917-pilot6/runs/primary-retail-transfer-high-1w-75tps-r1/caliper.log). Two mixed-attempt records have more trace failures than the retained log, so these counts must not be treated as a complete corrected taxonomy.

[The high-contention plan](../../bi-coin-fabric/benchmark/workloads/transaction-types.js#L137) uses the first STANDARD wallet as the shared sender and the next wallets as receivers. [Population funding](../../bi-coin-fabric/benchmark/workloads/retail-base.js#L393) treats the first `transactionSlots` STANDARD wallets as senders. Consequently, many high-contention receivers begin at the Rp20,000,000 STANDARD limit instead of with receiving headroom.

**Minimum correction:** explicitly fund the source of measured distribution and construct high-contention receiver balances from their actual role. Check sender funding, receiver headroom, transaction caps, and cumulative limits against the entire warmup plus measurement budget. Keep production policy checks enabled. If a parameter combination is financially impossible, reject it before measurement; do not turn off policy checks or add unreported replenishment inside the measured interval.

Until controlled reruns exist, [paper result interpretation](../main.tex#L647), [thesis Chapter 4](../../thesis/contents/chapter-4/chapter-4.tex#L258), both abstracts, and the conclusions must distinguish these fixture-confounded results from genuine observed saturation. The literal statement “no passing load in the tested range” is numerically true, but is not a sufficient explanation of these failures.

### R3 — “Unknown failure” is partly a parser limitation, not missing evidence

[The paper](../main.tex#L670) and [thesis](../../thesis/contents/chapter-4/chapter-4.tex#L282) say that unknown failures are retained when the available log cannot support a more specific reason. The raw logs above contradict that explanation.

[`readCaliperFailureReasons`](../../bi-coin-fabric/scripts/analyze-benchmark-results.js#L119) classifies the first error line only. It ignores the subsequent `Details:` and peer response lines, which contain insufficient-funds and receiver-cap reasons. Some raw trace results also have an empty `error_messages` array, so trace-only classification cannot recover those details.

**Minimum correction:** parse each complete error record, preserve explicit business reasons separately from endorsement/MVCC/timeout failures, and retain an unknown category only for genuinely unresolved records. Require agreement between the selected attempt's trace and log before substituting classifications. The current 358,413 MVCC and 1,013,243 unknown totals reproduce the saved summary, but should not survive unchanged after R1–R3 are corrected.

This finding does not establish the cause of every unresolved transaction or justify assigning all unknown failures to one category.

### R4 — Provenance and method descriptions mix different studies

The [paper](../main.tex#L584) and [thesis Chapter 4](../../thesis/contents/chapter-4/chapter-4.tex#L196) cite the September 9 manifest as the source of the final study, although their updated statistical tables derive from `statistical-20260917-pilot6`. Git blame places the old paragraph in `30d562be` and the newer tables in `e32c768b`: this was an incomplete synchronization.

| Claim | Current manuscript | Recorded/newer evidence |
|---|---|---|
| Runtime | npm 10.9.1; Docker 27.5.1; Chapter 3 separately says Docker 29.6.2 | New manifest records npm 10.9.8 and Docker 29.8.1. |
| Worker coverage | Chapter 1 still describes 1/2/4 workers | New calibration contains 1/2/4/8 workers; primary runs use one. |
| Profile ordering | Chapter 3 claims deterministic shuffling with suite seed 20260909 | Current statistical runner uses nested worker/rate/repetition loops and workload seed 20260725. |
| Endorsement | Chapter 3's testbed table says majority | Current application endorsement is institutional OR; lifecycle endorsement and majority administration are different policies. |
| Evidence scope | One historical manifest appears to describe all results | Primary statistics, service demonstration, and historical conformance have different evidence locations and dates. |

Anchors: [paper runtime](../main.tex#L602), [thesis scope](../../thesis/contents/chapter-1/chapter-1.tex#L171), [thesis shuffle claim](../../thesis/contents/chapter-3/chapter-3.tex#L580), [thesis testbed](../../thesis/contents/chapter-3/chapter-3.tex#L851), [current runner](../../bi-coin-fabric/scripts/run-benchmark-study.sh#L242), and [application policies](../../bi-coin-fabric/network/configtx.yaml#L142). Do not “correct” the thesis channel name `mychannel` merely because an illustrative diagram calls its channel `digital-rupiah`; distinguish the deployed channel identifier from a conceptual label.

The new manifest also records a dirty `scripts/study-control.js` at commit `30d562be`, but its artifact list contains no `.js`, `.go`, or `.sh` source snapshots. A changed-path list is not a source patch. Recover and archive the actual workload/controller source or patch used for the run before claiming complete reproducibility; do not invent a clean historical source state.

The artifact hash audit found all 4,737 listed files present and 4,736 matching hashes. `manifest-path.txt` is the exception: its recorded hash is the empty-file hash, while its current contents are nonempty. [The runner redirects manifest-writer stdout into that file](../../bi-coin-fabric/scripts/run-benchmark-study.sh#L318), making inclusion of the output pointer in its own generation pass unsafe. Exclude that administrative pointer from the hashed payload or create it before computing the manifest. This small hash defect does not explain or invalidate the raw transaction observations by itself.

**Minimum correction:** add an explicit evidence map for the statistical study, the KYC service demonstration, and historical conformance; reconcile runtime and protocol claims against each source. Preserve the old manifest where it still supports a historical result. Describe actual sequential execution instead of inventing randomization. Keep workload seed and experiment-order seed distinct.

### R5 — The OpenCBDC comparison contradicts its primary source

The [paper introduction](../main.tex#L102), [comparison row and note](../main.tex#L185), and [thesis literature table](../../thesis/contents/chapter-2/chapter-2.tex#L123) call the cited OpenCBDC design account-based. The Project Hamilton Phase 1 design uses an unspent transaction output data model.

The [MIT DCI project FAQ](https://www.dci.mit.edu/project-hamilton-and-opencbdc-faqs) explicitly distinguishes its implemented UTXO model from a possible account-balance alternative. The [official OpenCBDC repository](https://github.com/mit-dci/opencbdc-tx) describes both explored architectures as UTXO-based. The [Boston Fed executive summary](https://www.bostonfed.org/publications/one-time-pubs/project-hamilton-phase-1-executive-summary.aspx) also explains why a wallet's account-balance view does not determine the processor's underlying data model.

**Minimum correction:** name the cited system/version precisely and describe it as the Project Hamilton/OpenCBDC UTXO-based transaction processor. Do not infer its ledger data model from a balance-style user interface or conflate technical UTXOs with every policy meaning of “token-based.” Keep public availability, intermediation, and controlled performance comparison as separate dimensions.

Targeted checks support the basic Garuda wholesale-PoC and Aurum two-tier context: [Bank Indonesia's PoC announcement](https://www.bi.go.id/en/publikasi/ruang-media/news-release/Pages/sp_2627024.aspx) and [BIS Project Aurum](https://www.bis.org/project/aurum). These checks do not prove the broader absence of all competing retail implementations. Keep novelty bounded to the studied Indonesian integration and openly inspectable implementation, with an explicit literature-search cutoff if making absence claims.

## Further manuscript corrections

### R6 — Show uncertainty and resource results, not duplicate means

[Paper Tables VII and IX](../main.tex#L676) repeat essentially the same passing-load means. [The thesis repetition table](../../thesis/contents/chapter-4/chapter-4.tex#L290) likewise omits the across-repetition SD, while both documents defer it to a generically named summary file. Resource tables list metric names without measured values, although the surrounding prose says resources inform the interpretation.

**Remedy:** replace the duplicate means-only table with mean and across-run SD, or compact per-run success/p95 ranges. Add actual resource summaries for representative valid conditions, with their workload and measurement window identified. Distinguish within-run latency SD from across-run SD of p95. Do not attribute a bottleneck from a list of monitored metrics alone. Identify cells whose highest tested load still passes rather than implying their saturation point was found.

This is an evidence-presentation weakness, not proof that the six passing-load means are wrong.

### R7 — Thesis test counts are not tied to their evidence snapshot

[Chapter 4](../../thesis/contents/chapter-4/chapter-4.tex#L161) reports 57 backend tests across six packages and 53 chaincode tests. Current `go test -json ./...` succeeds but gives different counts:

| Module | Top-level tests passed | Subtests passed | Packages |
|---|---:|---:|---|
| Backend | 56 | 20 | Five passing test packages; middleware has no tests. |
| Chaincode | 36 | 22 | One passing package. |

**Remedy:** either cite the dated historical test log that produced 57/53 or update the claim to a new verified snapshot and specify whether subtests are counted. Do not mix top-level tests, subtests, and packages without tests into one unexplained count. These current suite results are not a fresh ledger experiment or an end-to-end security validation.

### R8 — The transfer pseudocode omits a required input and blurs commit stages

[The paper algorithm](../main.tex#L556) declares `Transfer(sender, receiver, amount)` but checks an undeclared `reference`. It also places “validated by Fabric MVCC” beside `PutState` and returns `commit` from the chaincode pseudocode.

**Remedy:** include `reference` in the input list and distinguish chaincode simulation/write-set construction from Fabric's later validation and commit. Preserve the surrounding discussion's boundary that the tests are not a formal security proof. This makes the algorithm agree with its prose without claiming new protocol properties.

### R9 — The thesis testbed table is visibly clipped

[Chapter 3's testbed table](../../thesis/contents/chapter-3/chapter-3.tex#L847) uses two unbounded `l` columns. The saved build log reports an overfull box of 77.94473 pt. Rendering PDF page 74, printed page 59, confirms that its right edge and long chaincode specification extend beyond the page.

**Remedy:** use a wrapping specification column constrained to `\textwidth`; preserve normal readable type rather than shrinking the whole table. Re-render that page after correction. The paper's semantic-conformance table has a smaller 2.15135 pt overflow warning; inspect its corrected rendering too.

Paper PDF pages 5–6 were visually checked. They contain the newer numbers, readable result tables, and explicit limitations. This was a targeted visual inspection, not a page-by-page approval of all 101 thesis pages.

## Revision roadmap

These are proposed changes, not edits performed by this review. Preserve existing manuscripts and raw evidence until their replacement is verified.

1. **Repair evidence collection before collecting more data.** Isolate benchmark attempts; enforce measured-window and log/trace alignment; parse multiline errors; add regression cases for resumed attempts, zero Treasury balance, and receiver-cap contamination. Capture the actual source snapshot/patch and fix the manifest-pointer hashing order.
2. **Run targeted replacement experiments in a disposable environment.** Replace the seven mixed-window records and re-evaluate calibration. Correct the distribution and high-contention fixtures, run fresh pilots, then run five repetitions at the resulting primary loads. If corrected calibration changes the selected worker count, regenerate the dependent primary study; otherwise retain unaffected evidence with explicit provenance. Preserve the original study as historical evidence.
3. **Synchronize both documents from an explicit evidence map.** Update methodology, runtime, seeds/order, policy descriptions, test counts, tables, abstracts, and conclusions together. Keep the separate service and conformance boundaries. Correct OpenCBDC and the transfer algorithm. Retain the existing research questions and institutional glossary; no new domain model or ADR is necessary for these factual corrections.
4. **Improve the analysis and presentation.** Replace duplicate tables with uncertainty, show selected resource measurements, distinguish fixture rejection from saturation, qualify highest-tested loads, and repair clipped tables. Apply the required academic-writing workflow and final humanizer pass only when manuscript prose is actually revised, preserving citations and numeric evidence.
5. **Verify the revised handoff.** Require one execution attempt per record, five valid repetitions per confirmatory condition, matching raw-derived statistics, complete provenance, and no unexplained failure-count mismatch. Compile both documents without undefined citations/references; render affected pages and eliminate clipping. Publish a findings-to-fix checklist rather than silently replacing old evidence.

### Fresh-experiment boundary

No new ledger benchmark was launched. [The current runner](../../bi-coin-fabric/scripts/run-benchmark-study.sh#L62) invokes `NETWORK_DOWN_REMOVE_VOLUMES=true` for each run. Running it against the existing Garuda network would delete its ledger volumes. A unique result stamp protects output names, not those volumes or fixed container/port names. A disposable environment must isolate containers, volumes, ports, and monitoring before the proposed reruns can proceed without resetting current data.

The earlier full study spans about 58 hours of recorded timestamps, including possible pauses. A full rerun is not the default remedy. Targeted wall-clock estimates should come from the corrected pilot; quoting only the 120-second measurement duration would omit network rebuild, deployment, fixture setup, and drain time.

## Verification record and limits

| Check | Result |
|---|---|
| All 380 measured trace records | Counts checked against summary; seven mixed execution windows identified. |
| Six headline conditions, five runs each | Successful counts and raw-derived p95/p99 match displayed means. |
| Primary error logs and provenance | Distribution funding and high-contention receiver-cap failures confirmed; retained-log/trace mismatches identified in two mixed records. |
| Focused benchmark and Go checks | Seven benchmark tests pass; backend and chaincode suites exit 0. These do not catch all observed evidence defects. |
| Citation/build/visual checks | All 19 paper and 54 thesis compiled citation keys exist; active references resolve in saved aux files. Saved builds produced 7 and 101 pages. Selected rendered pages inspected; thesis clipping confirmed. |

Commands used for current test verification:

```sh
# In bi-coin-fabric/
rtk proxy node --test scripts/analyze-benchmark-results.test.js benchmark/observers/jsonl-transaction-observer.test.js scripts/study-control.test.js

# In bi-coin-fabric/backend/ and then bi-coin-fabric/chaincode/
rtk proxy go test -json ./...
```

The audit also used read-only trace/log parsing, manifest hashing, Git blame, saved LaTeX logs/aux files, and Poppler rendering. Bibliography-key resolution is not proof that every citation supports its sentence. No fresh LaTeX compilation was needed because no manuscript was edited; saved build output and selected current PDFs were inspected. Full literature verification, every-page typography review, and fresh ledger reproduction remain distinct follow-up checks. No source code, manuscript, existing result artifact, network configuration, or ledger was changed by this review.
