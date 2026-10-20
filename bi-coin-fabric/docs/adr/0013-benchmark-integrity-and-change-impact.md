# Benchmark integrity and change impact

## Status

Accepted (2026-10-20)

## Decision

1. A compliance benchmark run is valid only when it executes a clean, committed tree. The run uses a `git archive` of one commit in a disposable workspace, with `BENCHMARK_SOURCE_COMMIT=<40-hex commit>` and `BENCHMARK_SOURCE_DIRTY=false`. The runner refuses to start otherwise, and it requires `peer version` to report Fabric v2.5.16.
2. The measured surface is `scripts/`, `chaincode/`, `backend/`, `network/`, `benchmark/workloads/`, `benchmark/observers/`, `benchmark/isolated/`, `benchmark/compliance/`, `package.json`, and `package-lock.json`. Edits outside the surface (frontend, docs, ADRs, thesis, paper, wiki, graph output) do not invalidate a run. Edits inside it do: resume fails, and the work needs a new stamp.
3. Capacity numbers are produced only when `correctness.json` reports `overall_conformance_claim_allowed: true`. The runner refuses the capacity search otherwise. Preflight still runs.
4. Every API principal that creates or acts on subjects has its own Fabric identity. The API refuses to start if two principals share the same MSP and certificate.
5. Results are write-once. A stamp directory is never overwritten or edited. Any change needs a new stamp. The manifest hashes every artifact and the source snapshot.
6. Before a number is cited, its source snapshot is checked against the commit: each `source/<path>` must have the same SHA-256 as `git show <commit>:<path>`.

## Rationale

- The manifest hashes the executed source, but the commit identity came only from an operator-typed variable. Archiving one commit binds the snapshot to that commit.
- The first surface also hashed the frontend and the ADRs. Unrelated edits blocked resumes, which pushed people toward re-runs or workarounds. The narrower surface keeps the rule strict where results depend on code.
- Two API principals shared one Fabric identity (`authenticated` and `retail_two`, both EndUser User5). Chaincode records each subject's applicant from the caller identity (`ApplicantID`). A denial test could then pass or fail for the wrong reason.
- Capacity numbers without a complete correctness run mix unverified behavior into the performance result.
- Wrong toolchains and stale identity material produced silent failures during the 2026-10-20 rebuilds. See `docs/benchmark-runbook.md`.

## Consequences

- Editing the surface after a run requires a new stamp. Editing anything else does not.
- The procedure, the checks, and the list of past mistakes are in `docs/benchmark-runbook.md`. Agents follow that runbook.
- The manifest now records the Fabric and database image IDs and the Fabric tool versions. The surface excludes docs and frontend.
