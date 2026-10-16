# Issue tracker: Local Markdown

Issues and specs for this repo live as Markdown files in `.scratch/`.

## Conventions

- One feature per directory: `.scratch/<feature-slug>/`
- The spec is `.scratch/<feature-slug>/spec.md`
- Implementation issues are separate files at `.scratch/<feature-slug>/issues/<NN>-<slug>.md`, numbered from `01`
- Triage state is a `Status:` line near the top of each issue (see `triage-labels.md`)
- Append conversation under `## Comments`

## Skill operations

- Publish an issue: create a file under `.scratch/<feature-slug>/`.
- Fetch a ticket: read its referenced path or issue number.
- Wayfinder map: `.scratch/<effort>/map.md`, with one child file per ticket under `issues/`.
- Each child records `Type:` (`research`/`prototype`/`grilling`/`task`) and `Status:`.
- Record blockers as `Blocked by: NN, NN`; resolve them when the listed tickets are `resolved`.
- Claim the first numbered, open, unblocked, unclaimed child by setting `Status: claimed`.
- Resolve by appending `## Answer`, setting `Status: resolved`, and adding a context pointer to the map's Decisions-so-far.
