# Superseded five-organization benchmark guide

This guide described the five-organization Caliper study: statistical study, negative-path, custody authorization, adversarial double-spend, repetition, and resource metrics. That network and its runners were removed in commit 9769cf2. The former `benchmark:study`, `benchmark:negative`, `benchmark:authorization`, `benchmark:adversarial`, and `benchmark:transfer:*` commands no longer exist.

- Results under `benchmark/results/` are kept as superseded evidence. Do not cite them as four-organization results. The `20260909-final-*` files are reproducibility evidence for the old run only.
- Current four-organization compliance evidence and procedure: [`compliance/README.md`](compliance/README.md).
- Commands that remain in `bi-coin-fabric/package.json`: `npm run test:benchmarks`, `npm run benchmark:compliance`, `npm run benchmark:analyze`, `npm run benchmark:compress`, `npm run benchmark:validate`, `npm run benchmark:manifest`, `npm run benchmark:metrics:up`, `npm run benchmark:metrics:down`
