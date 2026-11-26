# CDD-path performance scope

## Status

Accepted (2026-11-26). Amends ADR 0015: the capacity search and load curve run on four CDD-path workloads, not on every catalogued method. The pass rule, probes, confirmations, and drain cap of ADR 0015 are unchanged.

## Context

The thesis contribution is the set of CDD Sederhana gates the ledger enforces (ADR 0020). The performance question is therefore: how does the retail CBDC architecture perform when those gates run on every payment?

The catalog measured 31 workloads, one per chaincode method. Most of them (staff setup, supply reads, reserve issuance, distributor registration) never touch a CDD gate. They lengthen the run without answering the question. Two CDD lifecycle writes the question does need, `VerifySubject` and the approval itself, were either unmeasured or measured among 30 others.

A retail transfer runs five CDD checks before it writes (`chaincode/payments/payments.go:98-139`): `CanActFor`, `CanPay`, `GetLimits` with the per-transaction limit, the payee status and holdings ceiling in `checkPayee`, and the daily and monthly usage in `addUsage`.

## Decision

1. **Scope.** Report CDD-gated performance only. There is no CDD-free baseline.
2. **Workloads.** Four: `transfer-retail` (five CDD checks per transaction), `can-pay` (the payer gate as a read), `approve-subject` (the onboarding decision), and `verify-subject` (the move from the unverified to the verified holdings ceiling). The other 27 performance workloads are removed from the catalog. Their methods keep their correctness checks.
3. **No comparison.** Results are this system's own numbers. They are not compared with other architectures, other CBDC prototypes, national payment systems, or prior papers.
4. **Repeats.** Three independent repeats, each on a fresh network with its own stamp (ADR 0013). Report the median and the min-max range per workload.
5. **Procedure.** The same ADR 0015 binary search for all four: 10 s probes over 0.1 to 4096 ops/s, 10% bracket. The maximum is the highest rate with zero failures, zero timeouts, drain ≤ 3 s, confirmed by 3 × 30 s rounds. The first failing rate and its cause (MVCC, endorsement, timeout, or backlog/drain) are reported with it.
6. **Curve.** All four workloads run the load curve at 25, 50, 75, 100, 125, and 150% of the confirmed maximum, 60 s per level.
7. **Metrics.** Throughput, latency (minimum, median, p95, maximum), success, failure causes per rate, CPU and memory per container, disk and network I/O per container. All are already collected by `resource-sampler.js` and `outcome-analysis.js`.
8. **Workers.** One Caliper worker. A client-bound result is reported as "at least X TPS".

## Consequences

- The overhead of CDD cannot be separated from the cost of Fabric itself. This is a stated limitation, not a defect.
- `verify-subject` uses the existing `active-subject` fixture profile: one fresh active, unverified subject per measured transaction, so a repeat verification never occurs.
- Pooled transfer senders stay unverified (the Rp2.000.000 ceiling). The measured amount `'1'` never reaches the amount-only limits, so business rejections cannot inflate the failure count.
- The protocol hash changes, so every run under this ADR needs a new stamp.
- `benchmark/compliance/performance.js` and `timing-run.js` still read catalog keys that no longer exist. They are dead code and are left in place.

## Verification

- `case-catalog.test.js`: four performance workloads, the curve lists the same four, and every other contract method is correctness-only.
- `prepare-fixtures.test.js`: the `verify-subject` fixture sends a SHA-256 evidence reference as body and transient payload.
- `aggregate-repeats.test.js`: the median and min-max over three `capacity.json` files match a hand-computed fixture.
- Pilot (one repeat) before the evidence run: wall-clock time per workload and whether `transfer-retail` is client-bound.
