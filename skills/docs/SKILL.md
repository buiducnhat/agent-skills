---
name: docs
description: Initialize or update project documentation with a hierarchical `docs/` structure. Use when setting up docs for a new project (`--init`), syncing docs to current codebase and architecture changes (`--update`), or migrating flat docs to hierarchical format. Triggers on: "generate documentation", "setup project docs", "update docs", "sync docs", "create documentation", "document this project", "docs are outdated", "project has no docs", or any request to create, refresh, reorganize, or migrate project documentation.
---

# Docs

Create and maintain project documentation in `docs/` with a consistent, lightweight, hierarchical structure.

## Parameters

- `--init`: Create documentation for the first time.
- `--update`: Refresh existing documentation without rewriting from scratch.

## Outputs

Maintain these outputs in a hierarchical folder structure:

1. `docs/_index.md` — documentation manifest (always regenerated on init/update)
2. `docs/architecture/summary.md` + optional detail files
3. `docs/codebase/summary.md` + optional detail files
4. `docs/code-standard/summary.md` + optional detail files
5. `docs/project-pdr/summary.md` + optional detail files
6. `README.md` — links updated to point to summary files

## Workflow

### Step 1: Context Scan

Scan the project to understand what needs documenting:

1. Read existing docs if any: `docs/_index.md`, `docs/*/summary.md`, or flat `docs/*.md` files
2. Read `README.md` and key config files (`package.json`, `tsconfig.json`, `Cargo.toml`, etc.)
3. Scan source directories to understand project structure, entry points, and major components
4. Check `git log --oneline -20` for recent changes (useful for `--update` mode)

Focus on facts: features, architecture, stack, directory structure, and workflows. Do not invent requirements or assume business logic that is not evident from the code.

### Step 2: Choose Mode

Detect the current documentation structure and select the appropriate mode:

1. **If `docs/_index.md` exists** → hierarchical structure detected → run `--update` in-place
2. **If flat files exist (`docs/architecture.md`, `docs/codebase.md`, etc.) but no `docs/_index.md`** → legacy structure detected → run `--update` with migration
3. **If neither exists** → no docs found → run `--init`

If mode is explicitly provided (`--init` or `--update`), use that mode. Otherwise, infer from the repository state and state your assumption.

### Step 3: Produce Documentation

#### `--init` (new project)

1. Create `docs/` and 4 topic folders: `architecture/`, `codebase/`, `code-standard/`, `project-pdr/`
2. For each topic folder:
   a. Scan codebase for relevant information
   b. Generate content based on codebase scan
   c. If total content for the topic is ≤ ~100 lines → write all content to `summary.md`, no detail files needed
   d. If total content for the topic is > ~100 lines → write `summary.md` (~60-100 lines, high-level overview) + split remaining content into detail files (one per sub-topic)
   e. If detail files exist, end `summary.md` with a "Detail Files" table
3. Create `docs/_index.md`: list every documentation file with a 1-line description, in markdown table format
4. Update `README.md` with links to summary files

#### `--update` (hierarchical structure exists)

1. Detect what changed: compare current code against existing docs. Use `git log --oneline` and source file scanning to identify new/modified/removed components, features, or conventions.
2. Update each `summary.md` by editing relevant sections in-place — do not rewrite from scratch. Add new information, correct inaccuracies, remove references to deleted components.
3. Add, modify, or remove detail files as needed based on content volume changes
4. Regenerate `docs/_index.md` to match current files — only list files that actually exist on disk
5. Update `README.md` if documentation links changed

**Important**: Do not create duplicate flat files alongside the hierarchical structure. Only modify files within the existing `docs/<topic>/` folders. The goal is an incremental, surgical update — not a full rewrite.

#### `--update` with migration (flat files detected)

1. For each legacy flat file (`docs/architecture.md`, `docs/codebase.md`, `docs/code-standard.md`, `docs/project-pdr.md`):
   a. Read the full content of the flat file
   b. Create the corresponding topic folder (`docs/architecture/`, etc.)
   c. Split content: `summary.md` (~60-100 lines, key information) + detail files (remaining content, organized by sub-topic)
   d. If detail files were created, end `summary.md` with a "Detail Files" table
2. Verify all content from flat files is preserved in the new structure
3. Delete flat files only after verification passes
4. Create `docs/_index.md`
5. Update `README.md` links to point to new summary file paths

### Step 4: Sync README

Ensure `README.md` includes:

- Short project overview
- Quick start (if present in project)
- Documentation links section pointing to summary files:
  - `docs/architecture/summary.md`
  - `docs/codebase/summary.md`
  - `docs/code-standard/summary.md`
  - `docs/project-pdr/summary.md`

### Step 5: Validate Quality

Before finishing, verify:

- Each topic folder has exactly 1 `summary.md`
- `docs/_index.md` lists every file that actually exists (no phantom entries)
- No documentation files exist outside the folder structure (except `_index.md`, `brainstorms/`, `plans/`)
- `README.md` links point to correct summary files
- Each summary is ~60-100 lines (±20 acceptable depending on project size) and self-contained for most tasks
- Terminology is consistent across files
- No contradictions between docs and code
- Paths and component names are accurate
- Content is concise, specific, and actionable

## Content Requirements

### `_index.md` format

Use a markdown table with columns: Folder, Summary description, Detail Files (file + 1-line description). Separate into "Core Documentation" and "Other Documentation" sections.

Example:

```markdown
# Documentation Index

## Core Documentation

| Folder | Summary | Detail Files |
|--------|---------|-------------|
| architecture/ | System design overview | data-flow.md — request lifecycle and data pipeline |
| | | components.md — detailed component descriptions |
| codebase/ | File structure & entry points | modules.md — module responsibilities |
| | | scripts.md — build/deploy scripts |
| code-standard/ | Key conventions | naming.md — naming conventions by layer |
| | | testing.md — testing standards and patterns |
| project-pdr/ | Product goals & scope | requirements.md — functional requirements detail |
| | | constraints.md — non-functional requirements |

## Other Documentation
- brainstorms/ — Design exploration sessions
- plans/ — Implementation plans
```

### `summary.md` rules (applies to all 4 topics)

- Target ~60-100 lines, but adjust based on project complexity. Small projects may need less (40-60 lines); large projects with many subsystems may justify up to ~120 lines. The goal is completeness without verbosity.
- Self-contained for 80% of tasks (80/20 rule): reading the summary alone should provide enough context for most work
- Contains high-level concepts, key decisions, and overall structure
- No deep implementation details (those go in detail files)
- If detail files exist, end with a "Detail Files" table listing each file and its purpose

Per-topic content requirements for summaries:

**`architecture/summary.md`** — include: main components/subsystems, data flow between components (high-level), integration boundaries, deployment/runtime assumptions

**`codebase/summary.md`** — include: high-level directory tree, directory responsibilities, key entry points and modules, important scripts/config files

**`code-standard/summary.md`** — include: languages/frameworks/tools in use, naming and structure conventions, testing/linting/formatting expectations, PR/commit expectations if discoverable

**`project-pdr/summary.md`** — include: problem statement, product purpose, target users, core use cases, feature scope and constraints, success criteria

### Detail file rules

- Named by sub-topic slug: `data-flow.md`, `naming.md`, `requirements.md`, etc.
- Each file focused on 1 specific topic
- Only created when content is substantial enough to warrant separation from summary (~100+ lines for the topic overall)
- No hard size limit but should stay focused and concise

## Edge Cases

- **Minimal/empty project**: If the codebase has very little code, keep summaries short and factual. Do not pad content to reach line targets. Mark sections as "TBD — to be documented as the project grows" when there is genuinely nothing to document yet.
- **Custom files in `docs/`**: Preserve any user-created files outside the 4 standard topic folders (e.g., `docs/API.md`, `docs/deployment.md`). List them under "Other Documentation" in `_index.md`. Do not move or rename them.
- **Monorepo**: If the project contains multiple packages/apps, document the overall structure in `architecture/summary.md` and note each package's purpose. Each package does not need its own full docs set — keep it proportional.
- **Conflicting info during migration**: If flat file content contradicts current code, trust the code. Update the content during migration rather than preserving stale information.

## Rules

- Keep documentation factual; do not invent requirements.
- Prefer concise updates over verbose prose.
- Keep docs aligned with current implementation.
- Follow project conventions from `docs/code-standard/summary.md`.
- When uncertain, mark assumptions explicitly and request confirmation.
- Ask targeted questions only when information cannot be reliably inferred (business goals, ambiguous module ownership, conflicting conventions, unclear architecture decisions).
