# Capacity and load test protocol ("uji kapasitas dan beban")

## Status

Accepted (2026-10-26). Supersedes the pass rule of the 2026-10-15 compliance protocol (drain-adjusted throughput ≥ 90% of delivered rate).

## Context

RQ2 asks for the behaviour of the study network under increasing load. The protocol of 2026-10-15 found only a capacity boundary, and its pass rule failed correct rounds:

- Its drain test required the last commit to land within D/9 of the window end. With a 2 s orderer `BatchTimeout` and 10 s probes, a fully verified round at 64 TPS (641 of 641 verified, drain 2.08 s) was rejected. In the 14 Oct run all 238 fully verified write rounds were classified by drain alone, so the reported write ceilings (0.18–4.75 TPS) describe the rule, not the ledger.
- It produced one point per workload and no load curve, so the knee and breakdown were not measured.
- Failure diagnostics were stored as `[object Object]`, hiding MVCC and endorsement causes.
- Setup wrote every fixture serially (about 2 s per write), and each round topped up reserves again.

## Decision

1. **Pass rule.** A probe at rate R over window D passes if: delivered count within max(5% of R·D, 1) of the target; zero failed, timeout, and unresolved events; and drain ≤ `max_drain_seconds` (3 s = BatchTimeout 2 s + 1 s). The 90% throughput test is removed. Verified throughput is still reported as verified ÷ (D + drain).
2. **Client-bound.** Zero failures, drain within the cap, but delivered below target beyond tolerance: classified `client-bound`. This is a lower bound set by the single Caliper client, not a ledger failure. The search records it as the boundary and stops expanding.
3. **Probes and confirmations** keep 10 s probes and 3 × 30 s confirmations at the highest passing rate.
4. **Load curve.** For six representative workloads (create-pending, transfer-retail, transfer-merchant, issue, fund-wallet, read-balance) run six fixed-rate levels (25, 50, 75, 100, 125, 150% of the confirmed reference), 60 s each, in one Caliper launch. Levels are descriptive, not pass/fail.
5. **Latency** reports minimum, median, p95, maximum, and sample count.
6. **Setup.**
   - Reserve top-up and participant configuration run once per run.
   - Independent subject setup runs 64 writes in parallel.
   - Transfer pairs and fund-wallet subjects come from a per-run pool, grown on demand and reused across rounds. Round k uses pool entries `[0, count)`; the next round reuses them only after the previous one ended, so no in-flight transaction shares a key with the next round.
   - Senders are funded by a heap-shaped fan-out tree from a bank subject (one transfer per parent-child edge, parents in parallel), so funding does not serialize on one key.
   - Float is prefilled once per run for fund-wallet.
7. **Workers.** One Caliper worker on one host. A `client-bound` class makes the client limit visible instead of counting it as a ledger failure.
8. **Diagnostics.** Fabric SDK errors are serialized with their details; validation codes are extracted from that text.

## Consequences

- Shared balance keys (`supply::*`, `reserve::<bank>`, `float::<bank>`, `policy::transfer-limit`, `threshold::pending::<bank>`) serialize their writes to about one commit per block. Operations on those keys (issue, redeem, interbank transfer, approve/reject transfer, convert, fund-wallet, participant status, transfer limit, threshold proposals) are measured as they are. The overload behaviour is an RQ2 finding, not a benchmark defect. Bucketed balances are future work (Ch5).
- The pool needs roughly one round's worth of subjects per workload at the highest rate measured. Setup time therefore scales with the largest rate reached; the pilot run measures it before the evidence run.
- Results before this ADR (run-20261014-01 and earlier) are not comparable with runs under this protocol.
- The protocol hash changes, so every run under this ADR needs a new stamp.

## Verification

- `outcome-analysis.test.js`: regression for 641 verified at 64 TPS with drain 2.08 s (pass); drain 3.5 s fails; shortfall without failures is client-bound.
- `capacity-search.test.js`: a client-bound probe stops the search at its delivered rate.
- `prepare-fixtures.test.js`: funding tree leaves each sender its own budget; pooled rounds are distinct and reuse entries; subjects are created once; top-up runs once.
- `case-catalog.test.js`: drain cap and load curve values.
- Pilot before the evidence run: ceilings, setup time per 1,000 pool entries, and curve durations for the four pilot workloads.
