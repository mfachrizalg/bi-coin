# Revision Response — Round 2

- **Date:** 2026-07-27
- **Manuscript:** `paper/main.tex`
- **Against:** `paper/reviews/academic-review-2026-07-25.md` (P0/P1 roadmap)
- **Mode:** `academic-paper` revision mode, followed by `humanizer` final prose pass
- **Build:** 11 pages, 0 errors, 0 undefined references, 0 undefined citations, 0 overfull boxes

Format below is Reviewer point → Action → Change (R/A/C). Every claim added to the
manuscript was checked against the benchmark artifacts, chaincode, and network
config rather than against the prior draft.

---

## P0 — Mandatory items

### P0-1 — Conformance count 42 vs 34

**R:** Table VIII said 42, §VI-C and Table X said 34; resolve against the logs.

**A:** Resolved, but not as a typo. The two numbers measure different things, and
both are correct.

- `benchconfigs/negative-path.yaml` sets `txNumber: 42` for the round.
- `results/res-20260725-185547-negative-path.log:226-227` records the workload's
  own verdict: `enforced=17/17, gaps=0` for each of two workers, so **34
  policy-violating assertions, zero enforcement gaps**.
- Caliper's raw ratio for that round is 4 success / 38 failure. The four
  successes are `trySeedProfile` fixture-seeding calls issued inside the measured
  round (one per worker for each of the two `RefreshKycProfile` cases); the
  workload's `gaps=0` counter proves no violating submission committed.

This mattered more than a number mismatch: a reviewer opening the artifact would
have seen "Succ 4" and concluded four violations slipped through.

**C:** Table VIII now reports 34 with a note distinguishing it from the 42-transaction
round size. A new paragraph in §VI-A explains why Caliper's success ratio is not the
conformance metric and how the workload counts enforced-versus-gap. Table X's note
now reads "34 policy-violating submissions across the seven classes; 0 committed,
0 enforcement gaps."

### P0-2 — Testbed absent

**R:** No host, OS, Docker, Caliper version, or ordering parameters stated.

**A:** Accepted. All values read from the running system and configs, not from memory.

**C:** New Table V (Testbed Configuration) in §VI-A: Intel Core i7-7700HQ @ 2.80 GHz
(4 cores, 8 threads), 16 GB, Fedora Linux 44 (kernel 7.1.3), Docker 29.6.2, Fabric
2.5.16 with CouchDB 3.2, `fabric-contract-api-go` v2.0.0, Go 1.23 backend with
`fabric-gateway` v1.8.0, Caliper 0.6.0, and the ordering parameters from
`network/configtx.yaml:163-167` (`BatchTimeout` 2 s, `MaxMessageCount` 10,
`PreferredMaxBytes` 2 MB, `AbsoluteMaxBytes` 10 MB). Accompanying text states that
all eleven containers, the Caliper workers, and the backend share one host.

### P0-3 — Block-cutting attribution untested

**R:** Either substantiate or soften; the 2 s timeout is not binding at 14.5 TPS
with 10-message blocks, and the serialized commit path was never considered.

**A:** Accepted in full. The objection is arithmetically correct and the claim did
not survive it. Took option (b), softening, since option (a) needs a new experiment.

Working through it also produced a better explanation for the latency tail. A peak
round offers its 40 transactions in about 0.6 s and drains at 14.5 TPS over about
2.8 s, which puts the last transaction near 2.2 s. Measured maxima are 2.12 to
2.63 s. The near-coincidence with the 2 s timeout was a red herring; the tail is
queueing in a short fixed-rate round.

**C:** The §VI-D bottleneck discussion is rewritten into three paragraphs: what the
resource envelope rules out, the two candidate mechanisms that remain (block
formation versus serialized validation and commit) with the 0.7 s block-cycle
arithmetic, and an explicit statement that the latency data does not discriminate
and that the attribution is left open pending a `MaxMessageCount`/`BatchTimeout`
sweep with block-interval timestamps. `fabric_perf2023` and `dinh2017blockbench`
are now cited (both were already in the bibliography, uncited). The claim was also
removed or softened at its other three sites: abstract, contribution 3
("localizes it" became "bounds the resource envelope at that point"), and the
conclusion. Fig. 5(b)'s caption and its in-plot annotation now present the 2 s line
as a reference rather than as the mechanism.

### P0-4 — Table I misstates the public record for e-CNY and eNaira

**R:** Tiered, KYC-linked limits are publicly documented for both; "n/r" understates them.

**A:** Accepted. The column conflated "documented" with "openly implemented."

**C:** Table I restructured from three mark columns to four: 2-tier, Limits, Open,
Bench. e-CNY, eNaira, and Sand Dollar now carry ✓ for tiered limits and ✗ for open
implementation. The footnote defines each column. The §II-C sentence was rewritten
to concede the point explicitly (deployed retail CBDCs do document tiered limits,
with citations) and to relocate the distinguishing claim to the combination of
public implementation plus reproducible benchmark, scoped to Table I.

### P0-5 — 94% framed as a validated prediction

**R:** The argument predicts serialization, not a rate; 12 commits is a pacing artifact.

**A:** Accepted.

**C:** Abstract, §VI-C, and the conclusion now claim the mechanism: concurrent
transfers from one wallet were serialized, with every losing transaction rejected at
MVCC validation. §VI-C adds that the split between outcomes depends on offered rate
and endorsement latency, so the 94% share characterizes the run rather than the
protocol. Balance conservation was not asserted, since the logs do not record a
post-round sender balance to verify it against.

---

## P1 — Strongly recommended

### P1-6 — Hedge the universal negatives

**C:** Abstract now opens the gap claim with "To our knowledge." §I uses "we are not
aware of an openly available, testable system that…". The §II-C superlative is scoped
to Table I.

### P1-7 — Resource-monitor semantics, and a corrected figure

**R:** State the normalization; 0.09% is implausible as a fraction of one core.

**A:** Accepted, and it exposed a wrong number. Caliper's docker monitor computes
`cpuDelta / sysDelta * coresInUse * 100`, then divides by `os.cpus().length` when
`cpuUsageNormalization` is set, which it is in all bench configs
(`monitor-docker.js:196,327-331`). On 8 logical cores the reported value is a
percentage of total host capacity. The peer and orderer figures survived that
reading; the CouchDB figure did not. The draft said CouchDB stays below 0.05%, but
in the four-worker run CouchDB averages run 0.096 to 0.126% with peaks to 0.331%.

**C:** §VI-A now states the sampling interval (1 s) and the normalization semantics
explicitly. §VI-D reports means of ≤0.08% (peers), ≤0.13% (CouchDB), and 0.01%
(orderer) with per-sample peaks of 0.20%, 0.34%, and 0.03%, plus memory of 123 to
127 MB and peer disk writes near 1 MB per round.

### P1-8 — Backend versus chaincode trust boundary

**R:** If authorization lives only in the backend, the five-org narrative overstates it.

**A:** Accepted, and the situation is more clear-cut than the review assumed. The
chaincode contains no MSP or client-identity checks at all: no `GetMSPID`,
`GetCreator`, or `ClientIdentity` call appears in `digital_rupiah.go`. Role-to-function
authorization is entirely backend-side.

**C:** A new paragraph closes §IV, separating what the chaincode enforces (tier
derivation, transfer limits, KYC validity, freezing, system caps, the
validator-to-PJP guard, all re-evaluated at every endorser) from what only the
backend enforces (caller authorization), and stating the consequence: the endorsement
policy secures what may be written, not who asked for it, and the single backend and
database concentrate trust the topology otherwise distributes. §VIII expands this into
the prototype's clearest architectural limitation, with per-organization backends and
certificate-attribute checks inside chaincode named as the fix. Future work updated
to match.

### P1-9 — Tier-limit provenance — **resolved in round 2b**

**R:** If the values mirror Indonesian e-money limits, cite the regulation.

**A:** Accepted, and the regulation was located and verified against Bank
Indonesia's own page: PBI No. 20/6/PBI/2018 tentang Uang Elektronik, status
*Berlaku*. Point 13 of the official summary sets the ceilings directly.

Checking the paper against the actual article changed the claim. The
correspondence is partial, not general:

| Table IV value | PBI 20/6/2018 |
|---|---|
| BASIC max balance Rp2,000,000 | unregistered ceiling Rp2,000,000 — exact match |
| BASIC monthly incoming Rp20,000,000 | monthly incoming transaction cap Rp20,000,000 — exact match |
| STANDARD max balance Rp20,000,000 | registered ceiling is Rp10,000,000 — **no match** |
| MERCHANT Rp200,000,000 | no regulatory analogue |

Claiming the table "mirrors Indonesian e-money limits" in general would have been
wrong.

**C:** The paragraph after Table IV now anchors only the BASIC tier to
`bi2018pbi206`, reproducing both exact figures and explaining that this lets the
lowest tier stand in for the regulated no-KYC instrument. STANDARD and MERCHANT
are stated explicitly as non-regulatory values scaled above the electronic-money
ceilings, still marked as test parameters rather than a calibration proposal.

### P1-10 — CI method and round durations

**C:** §VI-A now states that rounds are 40 transactions lasting roughly three to six
seconds, that this is why the peak round is the one repeated, and that ± values are
two-sided 95% Student's *t* intervals with n=5 and four degrees of freedom. Verified
against the repetition data: throughput 14.1/14.8/14.6/14.5/14.5 gives mean 14.50,
SD 0.26, and a t-interval of ±0.32, matching the reported figures.

---

## Issues found during revision that the review did not raise

These are factual errors in the prior draft, caught by checking the manuscript
against the source rather than against the review.

**N1 — §V-C misdescribed the limit mechanism.** The draft said the chaincode "sums
the wallet's earlier incoming and outgoing transfers within those windows."
It does not. `applyRetailTransferPolicy` and `resetRetailCounters`
(`compliance_policy.go:60`) read running counters stored on the wallet record and
zero them when the day or month stamp derived from the transaction timestamp has
rolled over. No history scan occurs. Corrected, and the correction strengthens the
argument: because counters share a key with the balance, one MVCC version check
covers both and no range or rich query enters the read set where a phantom read
could arise. The algorithm figure was updated to match.

**N2 — Supervision-read latency was attributed to CouchDB rich queries.** The
chaincode issues no rich queries; `GetQueryResult` appears only in the test mock.
Reconciliation and metrics use `GetStateByPartialCompositeKey` range scans over the
whole transaction index. Corrected in §VI-B, with the scaling consequence stated.

**N3 — The CouchDB processor figure was wrong.** See P1-7.

**N4 — Overclaiming in the conformance result.** "Each rule rejects exactly the
input it is meant to exclude" was not supported by fixtures that sit well inside the
violating region. §VI-C now states what the run establishes and what it does not,
and names boundary cases as future work. Echoed in §VI-D and §VIII.

---

## Round 2b — remaining items

### P2-17 — Boundary-value conformance — **new experiment, now in the paper**

The claim was previously scoped in prose because the fixtures sat well inside the
violating region. That is now tested rather than conceded.

New artifacts: `benchmark/workloads/boundary-path.js`,
`benchmark/benchconfigs/boundary-path.yaml`, npm script `benchmark:boundary`.
Each numeric cap is probed from both sides, one submission exactly at the limit
that must commit and one a single rupiah past it that must be rejected. An
off-by-one comparison passes the negative-path suite and fails this one.

Two design problems surfaced during the run and are worth recording, since both
would have produced a false result:

1. Caliper issues `submitTransaction` calls **concurrently**, not in sequence. The
   first design accumulated a daily counter across three ordered submissions from
   one wallet; they raced and were rejected by MVCC, which looks identical to a
   policy rejection. Every assertion now has its own sender and receiver, and all
   accumulated state (partial daily spend, receiver pre-filled to its ceiling,
   drained sender) is established during seeding, outside the measured round.
2. Fixture keys are namespaced per scenario and worker, so a rerun on a persistent
   ledger collides with the previous run. Cases 3 and 4 depend on exact seeded
   balances, so a per-run nonce was added.

**Result: 8 of 8 assertions matched, 0 mismatches.** The per-transaction,
daily-outgoing, and receiver-balance caps and the sender-balance check are all
inclusive and placed exactly where §V specifies. Caliper's own tally (4 success,
4 failure) matches the 4 accept and 4 reject assertions.

Artifacts: `benchmark/results/bnd-20260727-200644-boundary-path.{html,log}`.

**C:** New Table XI and a paragraph in §VI-C; the workload is described in §VI-A;
"two dedicated workloads" became "three" in the abstract, contribution 3, §VI-A,
and the conclusion; the boundary caveat was removed from §VI-D and §VIII and
replaced with the remaining honest gap (temporal edges — expiry exactly at the
transaction timestamp, and daily/monthly window rollover — are still untested,
since those depend on timestamp handling rather than an integer comparison).

### P2-15 — Aurum added, Drex not

Aurum is verified from the BIS publication page: *Project Aurum: A Prototype for
Two-Tier Central Bank Digital Currency (CBDC)*, BIS Innovation Hub Hong Kong
Centre with the HKMA and ASTRI, 21 October 2022, 38 pages. It is the closest
published relative and it sharpens the gap claim rather than weakening it: Aurum
publishes no reproducible benchmark, and its source code and technical manuals go
only to BIS member central banks, not to the public. Added to §II with
`bis2022aurum`.

**Drex was deliberately not added.** The Banco Central do Brasil discontinued the
blockchain component in August 2025 after the pilot concluded it needed major
adaptation, and the sources available for that are news outlets rather than a BCB
primary document. Citing a moving target through secondary reporting would weaken
§II, not strengthen it. If you have the BCB pilot report, I will add it.

### P2-16 — Bibliography — **split, nothing deleted**

`references.bib` held 175 entries; the paper cites 24. Rather than delete, the
file was split:

- `references.bib` — the 24 cited entries.
- `references-unused.bib` — the other 151, verbatim, with a header noting that
  many carry `unknown*` placeholder keys and institution-proxy (ezproxy) URLs
  that will not resolve for anyone outside UGM, so metadata needs checking before
  any of them is cited.

Verified before the split: all 175 keys unique, every cited key present, no
cited entry moved. `thesis/` has its own `references.bib` and does not read this
one. Rebuild after the split emits 24 `\bibitem`s with 0 BibTeX warnings.

### P0-3 option (a) — block-parameter sweep — **attempted, not completed**

I set this up to run: backed up `network/configtx.yaml`, rebuilt the network
clean, and started a baseline `benchmark:transfer:repeat` at
`MaxMessageCount: 10` before sweeping to a larger block.

It was abandoned deliberately. The host is under heavy load right now (load
average 5.96 / 6.91 / 8.90 on 8 threads, ~0 GB free memory of 15 GB). Under that
load, seeding ran at roughly 0.7 transactions per second and the Fabric Gateway
returned `CommitStatusError: 1 CANCELLED` partway through every round. Throughput
collected in this state would not be comparable to the numbers already in the
paper, so a sweep run now would produce misleading evidence rather than resolving
the attribution question, in either direction.

`network/configtx.yaml` was **never modified** (verified by diff against the
backup); `MaxMessageCount` is still 10 and `BatchTimeout` still 2s. Nothing needs
restoring.

The paper's current claim is correct as written and does not depend on this
experiment. To run the sweep on an idle machine:

```
# arm A (baseline)
docker ps -aq --filter name=paynet | xargs -r docker rm -f
NETWORK_MODE=garuda ./scripts/network-up.sh && \
NETWORK_MODE=garuda ./scripts/deploy-chaincode.sh && \
NETWORK_MODE=garuda ./scripts/init-ledger.sh
npm run benchmark:transfer:repeat      # record plateau + CI

# arm B: set BatchSize.MaxMessageCount to 50 in network/configtx.yaml,
# then repeat the four commands above and compare plateaus.
```

Interpretation is already framed in §VI-D: if the plateau rises with larger
blocks, block formation was the constraint; if it stays near 14.5 TPS, the
serialized validation and commit path is.

---

## Flag for your decision

The manuscript is now **11 pages**, up from 8 at `HEAD` and roughly 10 before this
revision. Most IEEE conference tracks cap at 6 or 8 pages with overlength charges
beyond. The revision added a testbed table and about five paragraphs, all of them
responses to mandatory items, so I did not cut elsewhere to compensate. If you have
a page limit, the compressible material is most likely the architecture figures
(Figs. 2 and 3 overlap substantially in content) and Table III, not the new prose.
Tell me the target and I will do a length pass.

---

## Verification

```
latexmk -g -pdf -interaction=nonstopmode main.tex   → exit 0
main.log:  0 errors, 0 undefined references, 0 undefined citations, 0 overfull boxes
main.bbl:  24 bibitems, 0 BibTeX warnings
main.pdf:  11 pages
prose scan: 0 em/en dashes, 0 curly quotes, 0 filler phrases, 0 AI-vocabulary terms
boundary benchmark: 8/8 assertions matched, 0 mismatches
```

Every number added to the manuscript in this cycle traces to a primary artifact:
the Caliper HTML reports and worker logs under `benchmark/results/`, the chaincode
and `network/configtx.yaml`, the running host, or the cited regulation and BIS
publication pages.
