# Code Standards

## Tech Stack

- **Language:** JavaScript (ES Modules), Bash
- **Runtime:** Node.js, bash 3.2+ (macOS compatible)
- **Documentation:** Markdown with YAML frontmatter

## Skill File Structure

Each skill follows this structure:

```
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

```markdown
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

```markdown
## Core Workflow Skills

### skill-name

**Description**: What the skill does and when to use it.
**Parameters**: Optional parameters (if any)
```

## Documentation Patterns

### Workflow Documentation

Document workflows using sequences:

```markdown
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
