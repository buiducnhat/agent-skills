---
name: visualize
description: Create source-adjacent HTML visualizations for /visualize requests, docs, markdown, standardized plans, process flows, charts, Mermaid diagrams, context maps, and recommendation diagrams.
argument-hint: "[doc path, plan path, or visualization request]"
license: MIT
---

# Visualize

## Overview

Create source-adjacent HTML visualizations from repository documentation, markdown files, standardized plan folders, and arbitrary user context. This skill is Huashu-derived in workflow discipline, but it is intentionally documentation-focused: it turns real source material into readable maps, timelines, flows, risk blocks, and recommendation diagrams.

## Scope

Use this skill for:

- Documentation and markdown visualization
- Standardized plan folder visualization
- Flow, chart, Mermaid, context map, and recommendation diagram requests
- Source-adjacent HTML summaries that help users inspect structure, risks, decisions, and next steps

Do not use this skill for:

- Brand sites or marketing pages
- Product prototypes or production web apps
- Slide decks, long motion demos, or broad visual design systems

## Output Conventions

- Plan folder: create `visualize.html` and `visualize-assets/` inside the plan folder.
- Brainstorm folder: create `visualize.html` and `visualize-assets/` inside the brainstorm folder.
- Current context tied to an active plan or brainstorm artifact folder: create `visualize.html` and `visualize-assets/` inside that artifact folder.
- Markdown or document file: create `<source-base>.visualize.html` and `<source-base>.visualize-assets/` beside the source file.
- Source-less context with no associated artifact folder: create `docs/.visualizations/<slug>-YYMMDD-HHmm/visualize.html` and `docs/.visualizations/<slug>-YYMMDD-HHmm/visualize-assets/` unless the user specifies a target. Generate the timestamp with `date +%y%m%d-%H%M`.

Always copy `references/templates/visualize-theme.css` into the adjacent assets folder and link the copied local CSS from the generated HTML. Mermaid CDN usage is allowed for diagrams.

## Workflow

1. Load project context when visualizing repository files (if the current session does not already have it).
   - If `docs/SUMMARY.md` exists, read it first.
   - Load only task-relevant detail docs.
   - Prioritize `Code Standard` docs for implementation conventions.
   - If docs conflict with code or user intent, use the available input/question tool before broad changes.
2. Load the source material.
   - For plan folders, read `SUMMARY.md` and relevant `phase-XX-*.md` files.
   - For brainstorm folders, read `SUMMARY.md` and relevant `section-XX-*.md` files.
   - For markdown or document files, read the requested source directly.
   - For current context tied to an active plan or brainstorm artifact folder, use the conversation/request content plus the artifact folder as the output target.
   - For source-less user context with no associated artifact folder, use only the provided conversation/request content.
3. Identify the visualization intent.
   - Determine whether the user needs a plan map, document map, process flow, decision view, recommendation view, or mixed visualization.
   - Ask with the input/question tool only when the source, target, or output ambiguity cannot be resolved safely.
4. Build a compact source inventory before choosing layout.
   - Use `references/workflow.md` and `references/content-patterns.md`.
   - Capture the source hierarchy, entities or files, phases or tasks, dependencies, decisions, risks, blockers, recommendations, verification steps, and missing evidence when present.
   - Treat templates as shells. A block belongs in the output only when it summarizes source-backed content, clarifies a relationship, or exposes a meaningful gap.
5. Choose the template with `references/router.md`.
   - Plan folders use `references/templates/plan.html`.
   - Brainstorm folders use `references/templates/context.html`.
   - Single documents use `references/templates/document.html`.
   - Source-less context uses `references/templates/context.html`.
6. Extract facts and assumptions into the selected block set.
   - Preserve source facts, file paths, statuses, risks, decisions, verification steps, and recommendations.
   - Label assumptions clearly when the source leaves gaps.
7. Compose the HTML.
   - Start from the selected template.
   - Replace `VISUALIZE:` marker regions with source-backed content and remove blocks that do not earn their place.
   - Escape source-derived text before inserting it into HTML unless the text is intentionally authored generated markup.
   - Copy `visualize-theme.css` beside the output before linking it.
8. Add Mermaid diagrams where they clarify structure.
   - Use `references/mermaid-recipes.md`.
   - Prefer several small diagrams over one dense diagram.
   - Skip Mermaid when a diagram would only restate headings or duplicate nearby prose.
   - Use readable HTML/CSS fallback blocks when Mermaid syntax is uncertain.
9. Verify the output with `references/verification.md`.

## Rules

- Do not invent facts, fake metrics, fake decisions, fake users, fake constraints, or unsupported recommendations.
- Do not hide missing source content. Add an assumption or warning block instead.
- Keep visualizations factual, source-adjacent, and easy to inspect.
- Keep templates and generated HTML focused on documentation visualization, not broad design/prototype work.
- Avoid large inline style blocks; use the copied fixed theme CSS.
- Escape source-derived text before writing it into HTML unless it is intentional generated markup authored by the agent.
- Preserve source links and paths when they help the user trace content back to origin.
