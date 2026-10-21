# Compliance benchmark runbook

Read `docs/adr/0013-benchmark-integrity-and-change-impact.md` first. This file is the procedure. Run the steps in order, and stop at the first failed check. Read each check's own output. A wrapper's "exit 0" or a background "completed" notice does not mean a step passed.

## 0. Rules

- Only a clean, committed tree produces valid results.
- Never edit files under `benchmark/results/` or a `compliance-<stamp>` folder. Make a new stamp instead.
- Never clear a benchmark project with `docker compose down -v`. Preserve results first (section 5).
- Never put API keys or passwords in dotfiles or in the repo.

## 1. Preflight (host, at the commit to benchmark)

```sh
cd bi-coin-fabric
git status --porcelain            # must print nothing
export COMMIT=$(git rev-parse HEAD)
```

Tests. Every line must pass:

```sh
node --test benchmark/compliance/*.test.js scripts/*.test.js
for m in chaincode/monetary chaincode/payments chaincode/controls backend; do (cd "$m" && go test -count=1 ./...) || echo "FAIL $m"; done
```

Toolchain. Fabric 2.5.16 only:

```sh
export FABRIC_SAMPLES=$HOME/bi-coin-runs/tools-2.5.16
$FABRIC_SAMPLES/bin/peer version | grep Version               # Version: v2.5.16
$FABRIC_SAMPLES/bin/fabric-ca-client version | grep Version   # Version: v1.5.9
```

Catalog counts. Expected: `43 43 41 41`.

```sh
node -e 'const c=require("./benchmark/compliance/case-catalog.json"); console.log(c.performance_scenarios.length, c.protocol.performance_workload_count, new Set(c.performance_scenarios.map(p=>p.chaincode+":"+p.transaction)).size, c.protocol.performance_method_count)'
```

Identity attributes. Expected: `User1`–`User3` and `Admin` are `retail-bank`; `User4` and `User5` are `wholesale-bank`. Four-eyes approval needs two officers per bank (ADR 0014).

```sh
for u in User1 User2 User3 User4 User5 Admin; do openssl x509 -in "network/organizations/peerOrganizations/distributor.bi-coin/users/$u@distributor.bi-coin/msp/signcerts/cert.pem" -outform DER | strings | /usr/bin/grep -o 'distributor_id.\{0,28\}'; done
```

Repeat this check inside the runner after `new` brings the network up. The network material is regenerated there.

Host load. Record `uptime`, `free -h`, and `docker ps --format '{{.Names}}'` into the run folder before starting. Stop unrelated containers before a `performance` run, and record what remains.

## 2. Run inputs (once per stamp)

- Tools: `~/bi-coin-runs/tools-2.5.16/{bin,config}`. This is the official Fabric 2.5.16 release (checksum verified against GitHub's digest) plus `fabric-ca-client` 1.5.9.
- Image bundle: `~/bi-coin-runs/images.tar`. It is a `docker save` of the images listed in `scripts/write-study-manifest.js`, stored read-only. Its SHA-256 and the image IDs are recorded in `~/bi-coin-runs/images.json`.
- Workspace: a `git archive` of `$COMMIT`, with results and graph output excluded. The workspace must have no `.git`, no `.env`, and no `network/.env.study`.

```sh
REPO=$HOME/2026/Skripsi/bi-coin
STAMP=run-20261020-01
W=$HOME/bi-coin-runs/$STAMP/workspace
mkdir -p "$W"
git -C "$REPO" archive "$COMMIT" -- bi-coin-fabric ':(exclude)bi-coin-fabric/benchmark/results' ':(exclude)bi-coin-fabric/graphify-out' | tar -x -C "$W"
cd "$W/bi-coin-fabric"
test ! -e .git && test ! -e backend/.env && test ! -e network/.env.study && echo "workspace clean"
```

## 3. Disposable daemon

Start it under a new explicit project name. Then verify its daemon ID differs from the host's. Verify that neither service mounts the host socket.

```sh
cd "$REPO/bi-coin-fabric/benchmark/isolated"
BENCHMARK_WORKSPACE="$W/bi-coin-fabric" BENCHMARK_IMAGE_BUNDLE="$HOME/bi-coin-runs/images.tar" FABRIC_SAMPLES="$FABRIC_SAMPLES" \
  docker compose -p "bi-coin-bench-$STAMP" -f compose.yaml up -d --build
docker info --format '{{.ID}}'                                                                   # host ID
export DAEMON_ID=$(docker compose -p "bi-coin-bench-$STAMP" -f compose.yaml exec -T daemon docker info --format '{{.ID}}')
test "$DAEMON_ID" != "$(docker info --format '{{.ID}}')" && echo "daemon isolated"
```

After the daemon loads the bundle, compare its image IDs with `~/bi-coin-runs/images.json`. Any mismatch stops the run.

## 4. Run inside the runner

Set the provenance variables. The runner refuses to start unless `BENCHMARK_SOURCE_COMMIT` is a 40-hex commit, `BENCHMARK_SOURCE_DIRTY` is `false`, and `peer` reports v2.5.16.

```sh
RUNNER_ENV="-e BENCHMARK_COMPLIANCE_STAMP=$STAMP -e BENCHMARK_SOURCE_COMMIT=$COMMIT -e BENCHMARK_SOURCE_DIRTY=false -e BENCHMARK_DISPOSABLE_DAEMON_ID=$DAEMON_ID"
docker compose -p "bi-coin-bench-$STAMP" -f compose.yaml exec $RUNNER_ENV runner sh -c 'npm ci && bash scripts/run-compliance-benchmark.sh new'
```

Gate. Stop unless `correctness.json` shows `"classification": "pass"` and `"overall_conformance_claim_allowed": true`. Do not run `performance` on an incomplete correctness result.

```sh
docker compose -p "bi-coin-bench-$STAMP" -f compose.yaml exec runner sh -c "node -e 'const c=require(\"/workspace/benchmark/results/compliance-$STAMP/correctness.json\"); console.log(c.classification, c.overall_conformance_claim_allowed)'"
```

Then run the capacity search with the same variables:

```sh
docker compose -p "bi-coin-bench-$STAMP" -f compose.yaml exec $RUNNER_ENV runner sh -c 'bash scripts/run-compliance-benchmark.sh performance'
```

## 5. After the run

1. Copy `benchmark/results/compliance-<stamp>` out of the workspace into the repository's `benchmark/results/`.
2. Recompute the SHA-256 of every artifact and compare it with `manifest.json`.
3. Check the source snapshot against the commit. Every tracked file must print `OK`. `UNTRACKED` is allowed only under `*/vendor/`: `go mod vendor` generates those files from the committed `go.mod` and `go.sum`, which must themselves print `OK`. Any `MISMATCH`, or any `UNTRACKED` outside `vendor/`, stops the procedure.

```sh
cd "$REPO/bi-coin-fabric/benchmark/results/compliance-$STAMP/source"
find . -type f | while read -r f; do p=${f#./}
  if git -C "$REPO" cat-file -e "$COMMIT:bi-coin-fabric/$p" 2>/dev/null; then
    [ "$(git -C "$REPO" show "$COMMIT:bi-coin-fabric/$p" | sha256sum | cut -d' ' -f1)" = "$(sha256sum "$f" | cut -d' ' -f1)" ] && echo "OK $p" || echo "MISMATCH $p"
  else echo "UNTRACKED $p"; fi
done | /usr/bin/grep -v -E '^OK |^UNTRACKED .*/vendor/'   # must print nothing
```

4. Only then remove the disposable project's containers: `docker compose -p "bi-coin-bench-$STAMP" -f compose.yaml down`. Keep its volumes until the results are verified.

## 6. Modifications after a run

These commands print the surface paths that changed since the run commit. Any output requires a new stamp.

```sh
SURFACE="bi-coin-fabric/scripts bi-coin-fabric/chaincode bi-coin-fabric/backend bi-coin-fabric/network bi-coin-fabric/benchmark/workloads bi-coin-fabric/benchmark/observers bi-coin-fabric/benchmark/isolated bi-coin-fabric/benchmark/compliance bi-coin-fabric/package.json bi-coin-fabric/package-lock.json"
git -C "$REPO" diff --name-only "$COMMIT" HEAD -- $SURFACE
git -C "$REPO" status --porcelain -- $SURFACE
```

Edits outside those paths (frontend, docs, ADRs, thesis, paper, wiki, graph output) do not affect the run.

## 7. Mistakes already made (do not repeat)

1. **Trusting a wrapper's exit code.** A background "completed (exit code 0)" notice came from the `echo` after a chain that had exited 1. Read each step's log and status fields: `status`, `failure`, `missing_scenarios`, `classification`.
2. **`|| true` on checks.** It hides failures. Verification commands must fail loudly.
3. **`grep` is wrapped by `rtk` here.** The wrapper rejects some flags, such as `-h`, and changes output. Use `/usr/bin/grep` in checks.
4. **Wrong Fabric version.** The default `FABRIC_SAMPLES` is `$HOME/fabric-samples` (3.x). The scripts fall back to it silently when the variable is unset. Set `FABRIC_SAMPLES=$HOME/bi-coin-runs/tools-2.5.16`. Shells that inherit an old PATH keep the stale entry. A new terminal starts clean.
5. **Fresh network, four CAs with the same name.** Every CA issued `CN=fabric-ca-server`, so the admin identities of two orgs collided. The `FABRIC_CA_SERVER_CSR_CN` environment variable did nothing. The `--csr.cn` flag works. Verify each CA's root CN after bring-up.
6. **CA bring-up race.** Bootstrap registered before the CA ports accepted connections. `network-up.sh` now waits for the four ports.
7. **Stale identity material.** Bootstrap skips any org whose MSP material already exists, so old certificates survived three rebuilds. A wipe now archives `network/organizations` and `network/ca-client`. Check the admin issuer after bring-up.
8. **Chaincode sequence on a fresh channel.** A new channel needs sequence 1. Sequence 2 is rejected.
9. **Shared identities.** Two API principals used one Fabric identity, so subject ownership was ambiguous. The API now refuses to start in that case.
10. **Wipe scope.** `network-down.sh` with `REMOVE_VOLUMES=true` also removes the study PostgreSQL volume. Its own message used to omit that. The message is corrected.
11. **zsh word splitting.** An unquoted `$(...)` list is one word in zsh. Use `while read` loops, and count items before any deletion.
12. **Volume deletion.** Filter by exact name, check the count, check each container's state, and only then delete. A guard that matches nothing must not default to deleting.
13. **Hook-generated graph output.** The graphify hook rewrites `graphify-out/graph.json` after commits. Do not hand-edit it. Check `git status` after each commit.
14. **Surface drift.** Edits to benchmarked code after a run invalidate it. Use section 6 before citing any number.
15. **Stale chaincode package.** `deploy-chaincodes.sh` reused any existing `network/packages/<name>.tar.gz`, so a host deploy after a code change installed the old chaincode. It now repackages when the chaincode source hash differs from `<name>.source-sha256`. A fresh `git archive` workspace has no packages.
