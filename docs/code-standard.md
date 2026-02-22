# Code Standards

> Last Updated: 2026-02-23
> Maintainers: Project contributors updating skills, scripts, and workflow docs

## Maintenance Contract

This document is the canonical source for coding and documentation conventions in this repository.

Update this file whenever any of the following changes occur:

1. Tech stack/runtime requirements change (Node/Bash/tooling).
2. Skill structure or frontmatter requirements change.
3. JavaScript or Bash style rules change.
4. Testing conventions or execution commands change.
5. Repository workflow or documentation conventions materially change.

### Update Rules

- Keep this document concise, actionable, and implementation-focused.
- Prefer updating existing sections over adding duplicate guidance.
- If standards change, align related docs in the same update:
  - `docs/codebase.md`
  - `docs/architecture.md`
  - `docs/project-pdr.md` (only if product/process implications exist)
  - `CLAUDE.md` (if workflow policy changes)
- Do not leave stale examples that conflict with current repository behavior.

### Validation Checklist (Before Finalizing Changes)

- Standards match current repository structure and scripts.
- Naming conventions are consistent with current skill folders/files.
- Example snippets are valid and up to date.
- Testing commands are executable in this repo.

## Tech Stack

- **Language:** JavaScript (ES Modules), Bash
- **Runtime:** Node.js, bash 3.2+ (macOS compatible)
- **Documentation:** Markdown with YAML frontmatter

## Skill File Structure

Each skill follows this structure:

```/dev/null/skill-structure.txt#L1-8
.claude/skills/<skill-name>/
├── SKILL.md              # Main skill definition (required)
├── references/           # Optional reference documents
│   └── *.md
├── templates/            # Optional templates
│   └── *
├── scripts/              # Optional helper scripts
│   └── *
└── LICENSE.txt           # Optional license file
```

## SKILL.md Format

Every skill must have a `SKILL.md` file with YAML frontmatter:

```/dev/null/skill-frontmatter-example.md#L1-9
---
name: skill-name
description: Use when [condition] - [what it does]
---

# Skill Title

[Skill content and instructions]
```

### Frontmatter Fields

| Field         | Required | Description                          |
| ------------- | -------- | ------------------------------------ |
| `name`        | Yes      | Unique skill identifier (kebab-case) |
| `description` | Yes      | When to use and what it does         |

## Naming Conventions

- **Skill names:** kebab-case (e.g., `write-plan`, `tanstack-query`)
- **File names:** kebab-case for folders, UPPERCASE for main files (`SKILL.md`)
- **Reference files:** kebab-case with `.md` extension

## CLAUDE.md Configuration

The root `CLAUDE.md` file configures Claude Code behavior:

```/dev/null/claude-config-example.md#L1-6
## Core Workflow Skills

### skill-name

**Description**: What the skill does and when to use it.
**Parameters**: Optional parameters (if any)
```

## Documentation Patterns

### Workflow Documentation

Document workflows using sequences:

```/dev/null/workflow-sequence-example.md#L1-2
**Sequence**: `skill1` → `skill2` → `skill3`
**Use Case**: When and why to use this sequence.
```

### Skill References

Reference skills using backticks: `` `skill-name` ``

## Code Style (JavaScript)

For `.claude/lib/` JavaScript files:

- Use ES Modules (`import`/`export`)
- Use JSDoc comments for functions
- Handle errors gracefully with try/catch
- Return meaningful default values on failure

## Code Style (Bash)

For `.claude/scripts/` bash files:

- Use `set -euo pipefail` at the top
- Compatible with bash 3.2+ (no associative arrays, no `mapfile`)
- Use `local` for function-scoped variables
- Use colored log functions (`log_info`, `log_warn`, `log_error`, `log_success`, `log_verbose`)
- Clean up temp files with `trap cleanup EXIT`
- Use `diff -q` for file comparison before copying

## Testing

- Tests live in `tests/` directory
- Bash tests use simple assert helpers (`assert_eq`, `assert_true`, `assert_false`, `assert_file_exists`)
- Test scripts source production functions without running `main`
- Each test uses `setup`/`teardown` with temp directories for isolation
- Run tests with `bash tests/<test-file>.sh`
