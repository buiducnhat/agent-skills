---
name: docs
description: Initialize or update project documentation. Use when setting up docs for a new project (`--init`) or syncing docs to current codebase and architecture changes (`--update`).
---

# Docs

Create and maintain project documentation in `docs/` with a consistent, lightweight structure.

## Parameters

- `--init`: Create documentation for the first time.
- `--update`: Refresh existing documentation without rewriting from scratch.

## Outputs

Maintain these outputs:

1. `docs/SUMMARY.md` — documentation entry point (always regenerated on init/update)
2. `docs/architecture/` — topic-specific detail files
3. `docs/codebase/` — topic-specific detail files
4. `docs/code-standard/` — topic-specific detail files
5. `docs/project-pdr/` — topic-specific detail files

Also keep README.md aligned with current docs links and project summary.


## Workflow

### Step 1: Context Scan

Scan the project to understand what needs documenting:

1. Read existing docs if any (`docs/SUMMARY.md` and topic folders)
2. Read `README.md` and key config files (`package.json`, `tsconfig.json`, `Cargo.toml`, etc.)
3. Scan source directories to understand project structure, entry points, and major components
4. Check `git log --oneline -20` for recent changes (useful for `--update` mode)

Focus on facts: features, architecture, stack, directory structure, and workflows. Do not invent requirements or assume business logic that is not evident from the code.

### Step 2: Choose Mode

- If docs do not exist or are incomplete: run `--init` behavior.
- If docs exist: run `--update` behavior.
- If mode is unspecified, infer from repository state and state your assumption.

If mode is explicitly provided (`--init` or `--update`), use that mode. Otherwise, infer from the repository state and state your assumption.

### Step 3: Produce Documentation

#### `--init` (new project)

1. Create `docs/` and 4 topic folders: `architecture/`, `codebase/`, `code-standard/`, `project-pdr/`
2. For each topic folder:
   a. Scan codebase for relevant information
   b. Generate content based on codebase scan
   c. Create topic-specific files based on content found in the codebase. Name each file by its content (e.g., `components.md`, `conventions.md`). Do NOT use generic names (`overview.md`, `index.md`, `main.md`). Split into multiple files when content covers 2+ clearly distinct sub-topics or exceeds ~100 lines total. Minimum 1 file per folder.
3. Create `docs/SUMMARY.md` using the format specified in Content Requirements
4. Update `README.md` with link to `docs/SUMMARY.md`

Populate each file with concrete, project-specific content. Avoid placeholders and generic templates.

#### `--update`

1. Detect what changed: compare current code against existing docs. Use `git log --oneline` and source file scanning to identify new/modified/removed components.
2. Preserve useful existing content and section structure.
3. Update stale or inaccurate sections in-place — do not rewrite from scratch.
4. Add newly discovered features, components, or conventions.
5. Remove clearly obsolete statements.
6. Add, modify, or remove detail files as needed based on content changes.
7. Regenerate `docs/SUMMARY.md` to match current files — only list files that actually exist on disk.
8. Update `README.md` if documentation links changed.

**Important**: The goal is an incremental, surgical update — not a full rewrite.

### Step 4: Sync README

Ensure `README.md` includes:

- Short project overview
- Quick start (if present in project)
- Documentation link pointing to `docs/SUMMARY.md`

### Step 5: Validate Quality

Before finishing, verify:

- `docs/SUMMARY.md` exists and lists every detail file that actually exists on disk (no phantom entries)
- Each topic folder has at least 1 topic-specific file
- No generic file names (`overview.md`, `index.md`, `main.md`) in topic folders
- `README.md` links point to `docs/SUMMARY.md`
- `SUMMARY.md` is ~30-50 lines, concise, and contains file tables for all sections
- Terminology is consistent across files
- No contradictions between docs and code
- Paths and component names are accurate
- Content is concise, specific, and actionable

## Content Requirements

### `SUMMARY.md` format

~30-50 lines. Contains project overview and file tables for each documentation section.

Strictly follow the template in `references/summary-template.md`.

### Topic file rules

- Each file focuses on 1 specific sub-topic within its folder
- Named by content slug: `components.md`, `conventions.md`, `product-goals.md`
- Do NOT use generic names: `overview.md`, `index.md`, `main.md`, `general.md`
- Target ~40-120 lines per file, adjust based on content depth
- No hard size limit but should stay focused and concise

## Edge Cases

- **Minimal/empty project**: If the codebase has very little code, keep topic files short and factual. Do not pad content to reach line targets. Mark sections as "TBD — to be documented as the project grows" when there is genuinely nothing to document yet. Even with 1 file per folder, name it by its content.
- **Custom files in `docs/`**: Preserve any user-created files outside the 4 standard topic folders (e.g., `docs/API.md`, `docs/deployment.md`). List them under "Other" in `SUMMARY.md`. Do not move or rename them.
- **Monorepo**: If the project contains multiple packages/apps, document the overall structure in `architecture/components.md` and note each package's purpose. Each package does not need its own full docs set — keep it proportional.

## Rules

- Keep documentation factual; do not invent requirements.
- Prefer concise updates over verbose prose.
- Keep docs aligned with current implementation.
- Follow project conventions from `docs/code-standard/` topic files.
- When uncertain, mark assumptions explicitly and request confirmation.
- Ask targeted questions only when information cannot be reliably inferred (business goals, ambiguous module ownership, conflicting conventions, unclear architecture decisions).
