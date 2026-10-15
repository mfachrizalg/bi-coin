# Issue tracker: Local Markdown

Issues and specs for this repo live as Markdown files in `.scratch/`.

## Conventions

- One feature per directory: `.scratch/<feature-slug>/`.
- The spec is `.scratch/<feature-slug>/spec.md`.
- Implementation issues are separate files at `.scratch/<feature-slug>/issues/<NN>-<slug>.md`, numbered from `01`.
- Record the triage role in a `Status:` line near the top of each issue, using `docs/agents/triage-labels.md`.
- Append conversation history under `## Comments`.

## When a skill says "publish to the issue tracker"

Create a file under `.scratch/<feature-slug>/`, creating the directory if needed.

## When a skill says "fetch the relevant ticket"

Read the referenced issue file.

## Wayfinding operations

- Map: `.scratch/<effort>/map.md`, containing Notes, Decisions-so-far, and Fog.
- Child ticket: `.scratch/<effort>/issues/NN-<slug>.md`, with `Type:` (`research`, `prototype`, `grilling`, or `task`) and `Status:` (`claimed` or `resolved`).
- Blocking: `Blocked by: NN, NN` near the top. A ticket is unblocked when every listed ticket is resolved.
- Frontier: take the first numbered open, unblocked, unclaimed ticket.
- Claim: set `Status: claimed` before starting work.
- Resolve: append `## Answer`, set `Status: resolved`, and add a context pointer to the map's Decisions-so-far.
