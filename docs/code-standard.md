# Code Standards

## Tech Stack

- **Language:** JavaScript (ES Modules)
- **Runtime:** Node.js
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
