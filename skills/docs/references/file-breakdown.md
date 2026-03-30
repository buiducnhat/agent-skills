# File Breakdown Guide

## When to split into multiple files

- Content for a folder exceeds ~100 lines total
- Two or more clearly distinct sub-topics exist (e.g., "components" vs "data-flow")
- Different tasks would need different files (e.g., "fix naming" → only `conventions.md`, "add deployment" → only `deployment.md`)

## When to keep a single file

- Content for a folder is ≤ ~100 lines
- All content is tightly related and cannot be logically separated

Even with 1 file per folder, name it by its content (e.g., `conventions.md`), not a generic name.

## File naming rules

- Use kebab-case slug describing the content: `data-flow.md`, `product-goals.md`, `directory-structure.md`
- Do NOT use generic names: `overview.md`, `index.md`, `main.md`, `general.md`, `misc.md`
- Keep names short but descriptive (2-3 words max)

## Suggested file breakdown per topic

These are suggestions. Create files based on actual content found in the codebase. Not all files are needed — only create what has real content.

### architecture/

| File | Content |
|------|---------|
| `components.md` | Subsystems, their responsibilities, boundaries |
| `data-flow.md` | Request lifecycle, data pipeline between components |
| `integrations.md` | External services, third-party APIs, auth providers |
| `deployment.md` | Runtime environment, infrastructure, CI/CD |

### codebase/

| File | Content |
|------|---------|
| `directory-structure.md` | Top-level tree, folder responsibilities |
| `entry-points.md` | Main files, bootstrapping, app initialization |
| `scripts.md` | Build, deploy, dev scripts and their usage |
| `database-schema.md` | Tables, relationships, migrations |

### code-standard/

| File | Content |
|------|---------|
| `conventions.md` | Naming rules, patterns, design principles |
| `tooling.md` | Linters, formatters, TypeScript/compiler config |
| `testing.md` | Test patterns, coverage expectations, test commands |
| `workflow.md` | PR/commit conventions, branch strategy |

### project-pdr/

| File | Content |
|------|---------|
| `product-goals.md` | Problem statement, purpose, target users |
| `requirements.md` | Feature scope, constraints, success criteria |
| `business-rules.md` | Domain logic, validation rules |
