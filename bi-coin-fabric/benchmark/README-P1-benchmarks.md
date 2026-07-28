# P1 evidence benchmarks (negative-path, adversarial, repetition)

These three benchmarks close the evidence gaps the paper's peer review flagged for
the three headline claims. They are **scaffolds**: they run against the deployed
chaincode and print the metric you need, but you must run them and paste the real
numbers into the paper. Do not cite any figure that has not been measured.

Prerequisite: the five-organization network is up and the `digital-rupiah`
chaincode (v2.0) is deployed, exactly as for the existing transfer benchmarks
(`npm run benchmark:transfer:w2`). All commands run from `bi-coin-fabric/`.

## 1. Negative-path conformance — proves rules actually reject

```
npm run benchmark:negative
```

Workload: `benchmark/workloads/negative-path.js`. Every submission violates one
policy rule (per-transaction cap, insufficient balance, receiver max-balance,
frozen sender, expired KYC, prohibited-risk approval, high-risk approval without
senior sign-off) and must be rejected.

Read the `[negative-path] worker N: enforced=.../..., gaps=...` lines at the end.
`gaps=0` on every worker means each rule rejected as required. Because rejection
is the intended outcome, Caliper's own report counts these as failed transactions;
that is expected — the verdict is the enforced/gap summary, not the success ratio.

Paper use: replace the standalone "zero policy or limit rejections" framing with a
negative-path conformance table (rule -> expected vs observed rejection). This
turns "nothing was rejected" into "every rule rejected exactly the disallowed
input."

## 2. Adversarial double-spend — tests the MVCC claim under contention

```
npm run benchmark:adversarial
```

Workload: `benchmark/workloads/adversarial-double-spend.js`. All four workers
transfer from one shared sender wallet, so concurrent transfers read the same
balance version. Fabric MVCC commits one per block and rejects the rest.

Read `[double-spend] worker N: committed=..., rejected=...`. A nonzero aggregate
`rejected` under contention is the evidence that concurrent same-wallet spends are
rejected "even after passing the balance check." If `rejected` is 0, increase
`workers` / `tps` in `benchconfigs/adversarial.yaml` until submissions overlap
within a block.

Paper use: report the committed/rejected split as the adversarial test the current
Limitations section says is absent.

## 3. Repetition with confidence interval — replaces single-run point values

```
npm run benchmark:transfer:repeat
```

Five identical peak rounds of the contention-free transfer workload. Take the five
per-round throughput / latency values from the Caliper report and report
mean +/- 95% CI instead of a single number, so "saturates near 14.5 TPS" carries
an uncertainty bound.

## 4. Resource metrics — localizes the throughput bottleneck

All benchconfigs previously used the Caliper 0.4 monitor schema
(`monitor: {type: docker, docker: {name: [...]}}`). Caliper 0.6 reads
`monitors.resource[].module` (`monitor-orchestrator.js:42`), so the old block was
silently ignored and every run logged `No resource monitors specified`. No CPU,
memory, network, or disk data was ever collected.

All seven configs now use the 0.6 schema and monitor all 11 containers (5 peers,
5 CouchDB instances, the orderer). The previous list omitted every CouchDB
container, which is the prime suspect for the commit-path bottleneck.

Each run now also produces a resource table per container: Memory(max),
Memory(avg), CPU%(max), CPU%(avg), Traffic In, Traffic Out, Disc Read,
Disc Write.

Paper use: the Discussion currently says throughput saturation "points to a
server-side bottleneck in endorsement, ordering, or CouchDB commit" and concedes
that concurrency scaling alone cannot say which. Read the resource table at peak
load and name the component: CouchDB containers saturating CPU or disk implicate
the commit path; busy peers with an idle orderer implicate endorsement. That
converts the open question in the Discussion into a measured result.

Note: Caliper reports minimum, average, and maximum latency only. It has no
percentile (p95/p99) output. Tail latency requires the `prometheus` monitor
module instead of `docker`. State this as a measurement limitation rather than
omitting it silently.

## Results

Caliper writes its HTML/JSON report per the workspace config (see existing files
in `benchmark/results/`). Record raw outputs there and cite the derived numbers in
`paper/main.tex` (Performance Evaluation + Limitations).
