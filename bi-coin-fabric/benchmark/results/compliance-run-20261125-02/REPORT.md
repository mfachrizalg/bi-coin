# compliance-run-20261125-02 compliance benchmark

Generated: 2026-11-25T12:49:44.490Z

One Caliper Fabric worker ran on the captured local host. Backend routes are covered by correctness checks and are excluded from performance measurements. Worker comparisons are future research.

## Functional correctness

Classification: **pass**. Executed 29/29 catalogued correctness scenarios; API authorization 222/222 cells passed; malformed-request validation 20/20 cells passed; bodyless action outcomes 38/38 passed; unresolved API checks 0. Overall conformance claim allowed: **true**.

## Capacity boundaries

Capacity measurements are not present yet.

The 10-second probes establish a passing/failing bracket. The final rate is accepted only when all three 30-second confirmation rounds pass. A ceiling without a failing bound is reported as “at least”; inconsistent confirmation is reported as an unstable boundary.

## Tested rates

No probes completed yet.

Read-only methods report verified operations per second. Write methods report verified achieved TPS. Latencies include median, p95, maximum, and sample count. Backlog and late completions are reported separately.

## Load curves

No load curves were run.

Each level runs 60 seconds at a fixed rate relative to the confirmed reference. Levels are descriptive: they show where delivered load, verified throughput, and latency depart from offered load. A plateau in delivered load with zero failures is the single client limit (client-bound); failures or drain above the cap are ledger limits.

## Per-component resources

Resource samples are not present yet.

CPU and memory are summarized as per-component mean/peak values. Network and disk I/O are deltas over each measured window. Samples are collected once per second.

## Failures

No transaction failures recorded.

Local observed capacity for the captured single-host, one-worker workload. A passing ceiling is a lower bound; mixed confirmation results are unstable.

The experiment is single-host, one-worker, and short-duration. It does not establish production capacity, cross-worker scaling, geographically distributed latency, or live sanctions effectiveness.
