# Visualization Workflow

Use an HTML-first workflow for documentation visualization. The output should make source structure easier to inspect without changing the source material.

## Checkpoints

- Small docs and standard plan folders: proceed in one pass, then verify.
- Ambiguous, mixed, or high-volume sources: ask once with the question tool before generating output.
- Missing source files: stop unless a safe fallback source was explicitly provided.

## Source Extraction Checklist

Capture only source-backed content:

- Title or inferred title
- Source path
- Created or updated metadata when present
- Section map
- Tasks, statuses, owners, and dependencies when present
- Risks, mitigations, blockers, and open questions
- Decisions and recommendations
- Verification steps and expected results
- Explicit assumptions when the source leaves gaps

## Composition Steps

1. Choose the route in `router.md`.
2. Copy the matching HTML template.
3. Copy `templates/visualize-theme.css` into the output assets folder.
4. Replace every `VISUALIZE:` marker with factual content or remove the unused block.
5. Add Mermaid only where it clarifies a process, timeline, state, dependency, or recommendation.
6. Run the checks in `verification.md`.
