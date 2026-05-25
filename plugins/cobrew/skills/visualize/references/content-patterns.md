# Content Patterns

Use these blocks only when the source supports them. Keep labels factual and compact. Every block should either summarize source-backed content, clarify a relationship, or expose a meaningful gap.

## Source Header

- Use when: every visualization needs traceability.
- Omit when: never omit completely; reduce to the minimum available metadata if the source is sparse.
- Minimum content: title, source path or source label, source type, generated timestamp, and any explicit created or updated metadata present in the source.

## Section Map

- Use when: the source has headings, chapters, phases, or a hierarchy the reader needs to navigate.
- Omit when: the source is short enough that a map would just repeat the full content.
- Minimum content: top-level sections plus one factual note per section only when the source gives enough substance.

## Key Takeaways

- Use when: the source contains several important facts, shifts, risks, or outcomes that benefit from a fast scan.
- Omit when: the page is already dominated by a richer structured block that makes a takeaway list redundant.
- Minimum content: three source-backed points unless the source is truly smaller. Do not invent impact, urgency, or priority.

## Phase Timeline

- Use when: a plan or procedural source has ordered phases, milestones, or state changes.
- Omit when: there is no meaningful sequence beyond one isolated step.
- Minimum content: phase name, current status, objective, touched files or scope cue when present, and verification command or checkpoint when present. Preserve `[ ]`, `[-]`, and `[x]` states.

## Task Checklist

- Use when: the source already defines tasks, substeps, or acceptance checklists.
- Omit when: a checklist would duplicate a timeline or section map without adding actionable detail.
- Minimum content: source task wording grouped by phase or section, with statuses preserved when present.

## Dependency Map

- Use when: the source names file relationships, upstream or downstream dependencies, prerequisites, or sequencing constraints.
- Omit when: dependencies are obvious from a simple linear phase list and a dedicated map would add noise.
- Minimum content: at least two connected entities, files, systems, or phases with a factual relationship label.

## Risk Matrix

- Use when: the source lists risks, blockers, mitigations, constraints, or open questions with consequences.
- Omit when: there are no meaningful risks and a warning block covers the only gap.
- Minimum content: risk or blocker, trigger or condition, impact if present, and mitigation or missing-mitigation note.

## Decision Trail

- Use when: the source includes decisions, rationale, trade-offs, or a sequence of approved choices.
- Omit when: the source only contains one small decision that fits naturally inside another block.
- Minimum content: the decision, supporting rationale or source cue, and any resulting consequence or next action when present.

## Recommendation Block

- Use when: the source asks for next steps, follow-ups, critiques, or improvement options.
- Omit when: the source is purely descriptive and no supported recommendation can be made.
- Minimum content: each recommendation must cite the source fact, risk, blocker, or missing evidence that supports it.

## Source Audit Gap Block

- Use when: the visualization should highlight missing evidence, missing verification, unresolved ownership, empty plan sections, or unsupported claims.
- Omit when: there are no meaningful gaps worth surfacing.
- Minimum content: the missing item, why it matters, and the local source context where the gap appeared.

## Assumption Block

- Use when: output location, title, ordering, grouping, or interpretation is inferred.
- Omit when: there are no material inferences.
- Minimum content: clearly labeled assumption plus the reason the assumption was necessary.

## Warning Block

- Use when: files are missing, the source is ambiguous, verification could not be completed, Mermaid was unsuitable, or the page intentionally pruned unsupported panels.
- Omit when: the issue is already captured more precisely in a source audit gap or assumption block.
- Minimum content: the issue, its effect on the output, and what was done instead.
