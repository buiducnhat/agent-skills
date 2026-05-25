# Visualization Workflow

Use a content-first workflow for documentation visualization. The output should make source structure easier to inspect without changing the source material, and layout choices come only after the useful source-backed content is known.

## Checkpoints

- Small docs and standard plan folders: proceed in one pass, then verify.
- Ambiguous, mixed, or high-volume sources: ask once with the question tool before generating output.
- Missing source files: stop unless a safe fallback source was explicitly provided.

## Source Inventory Checklist

Build a compact inventory before choosing a template block layout. Capture only source-backed content:

- Title or inferred title
- Source path
- Created or updated metadata when present
- Section or hierarchy map
- Entities, files, systems, or actors named in the source
- Phases, tasks, statuses, owners, and dependencies when present
- Decisions, rationale, and recommendation evidence
- Risks, mitigations, blockers, and open questions
- Verification steps, expected results, and acceptance criteria
- Missing evidence, missing verification, or source gaps that the visualization should expose
- Explicit assumptions only when the source leaves unavoidable gaps

## Block Selection Rules

- Treat templates as shells, not required panel lists.
- Include a block only when it adds source-backed value, clarifies a relationship, or exposes a meaningful gap.
- Omit blocks that would be empty, repeat nearby content, or only restate headings.
- Convert missing but important content into a warning or gap block instead of silently inventing filler.
- Escape source-derived text before inserting it into HTML unless the text is intentional generated markup authored by the agent.

## Composition Steps

1. Read the source and build the inventory above.
2. Choose the route in `router.md`.
3. Copy the matching HTML template.
4. Copy `templates/visualize-theme.css` into the output assets folder.
5. Replace every `VISUALIZE:` marker with factual content, or remove or convert the block when the source does not support it.
6. Add Mermaid only where it clarifies a process, timeline, state, dependency, or recommendation.
7. Run the checks in `verification.md`.
