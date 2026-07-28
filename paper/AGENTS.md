# AGENTS.md: Paper academic writing

## Scope

These rules apply to manuscript prose under `paper/`. Root repository instructions also apply.

## Required skill workflow

For any task that drafts or revises natural-language manuscript prose:

1. Announce the academic workflow and mode before editing.
2. Apply the academic research suite first:
   - Codex: use `ars-codex:academic-research-suite` and route through its task-matched workflow.
   - Claude Code: use the matching plugin skill: `academic-research-skills:academic-paper`, `academic-research-skills:deep-research`, `academic-research-skills:academic-paper-reviewer`, or `academic-research-skills:academic-pipeline`.
3. Select the smallest applicable mode:
   - Drafting or revision: `academic-paper`.
   - Citation audit: `academic-paper` in `citation-check` mode.
   - Source discovery or fact-checking: `deep-research`.
   - Manuscript review: `academic-paper-reviewer`.
   - Full research-to-paper pipeline: only when the user explicitly requests it.
4. Stabilize claims, evidence, citations, and structure before style editing.
5. Apply `humanizer:humanizer` as the final prose pass.
6. Use humanizer's draft-audit-final process internally, but write only the final rewrite into manuscript files.

If either required skill is unavailable, report the exact missing skill. Never claim the combined workflow ran when it did not.

## Trigger boundary

Apply both skills to English or Indonesian academic prose in manuscript `.tex` files and directly related manuscript `.md` drafts.

Do not invoke both skills for changes limited to:

- BibTeX records or citation keys.
- LaTeX structure, commands, environments, or formatting.
- Equations, tables, figures, code, listings, generated files, or build artifacts.
- Review notes or response documents unless the user asks to draft or humanize them.

For mixed tasks, apply the workflow only to the natural-language prose portion.

## Protected content

Humanizer is a style editor, not a research or technical editor. It must preserve:

- Claim meaning, qualifications, uncertainty, and scope.
- Citations, citation keys, references, and source attribution.
- Numbers, units, benchmark results, equations, and statistical meaning.
- Proper names, technical terms, direct quotations, and defined terminology.
- Original English technical terms must stay in English unless the user explicitly asks to translate them.
- LaTeX commands, environments, labels, `\cite{...}`, `\ref{...}`, and cross-references.
- IEEE structure and formal academic register. Do not inject conversational voice, personality, or unsupported interpretation.

After humanization, recheck claim-citation alignment and protected tokens. Compile the paper when manuscript content changed.
