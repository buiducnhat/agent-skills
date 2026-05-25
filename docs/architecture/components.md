# Architecture — Components

## System Overview

CoBrew combines checked-in plugin bundles, direct skills CLI installation guidance, workflow skills, and supporting documentation assets.

The recommended user path for Codex and Claude Code is the checked-in plugin bundle under `plugins/cobrew/`. Plugin-installed workflow skills are intended to be self-contained for project context loading. Other agents install CoBrew skills directly with `npx skills add buiducnhat/cobrew` when they use the direct skills CLI path. The maintained skill content lives in `plugins/cobrew/skills/`. Reference docs and archived execution plans live under `docs/`, so installation guidance, plugin packaging, and implementation history stay together.

## Components

### Plugin Bundle (`plugins/cobrew/`, `.agents/plugins/marketplace.json`, `.claude-plugin/marketplace.json`)

`plugins/cobrew/` is the maintained plugin bundle. It contains the Codex manifest, Claude Code manifest, bundled `skills/`, skill references, and plugin assets. There is no separate root `skills/` authoring tree or sync script.

Users install the marketplace directly from GitHub with `codex plugin marketplace add buiducnhat/cobrew` for Codex or `claude plugin marketplace add buiducnhat/cobrew` for Claude Code. The repository-owned marketplace files are distribution metadata consumed by those tools; users should not need to clone the repository just to install the plugin.

### Skill Library (`plugins/cobrew/skills/`)

Ten first-party workflow skill definitions live in `plugins/cobrew/skills/`. Each skill has a `SKILL.md` with YAML frontmatter and may include `references/` assets:

| Skill             | Purpose                                                         |
| ----------------- | --------------------------------------------------------------- |
| `ask`             | Structured clarification and requirements gathering             |
| `fix`             | Bug diagnosis and fix                                           |
| `review`          | Uncommitted-changes code review                                 |
| `brainstorm`      | Ambiguous problem exploration                                   |
| `docs`            | Documentation creation or refresh based on current repo state   |
| `execute-plan`    | Phase-by-phase plan execution                                   |
| `git-commit`      | Conventional commit message generation and intelligent staging  |
| `quick-implement` | Small, low-risk changes                                         |
| `visualize`       | Source-adjacent HTML visualization for docs, plans, and context |
| `write-plan`      | Phased implementation planning                                  |

First-party workflow skills load project context from `docs/SUMMARY.md` when present, then only task-relevant detail docs.

### Documentation Archive (`docs/`)

The repository can store more than reference docs. It also contains archived execution records when substantial workflow changes need to preserve implementation history:

- `docs/plans/` for phased implementation plans and execution reports
- the standard topic folders used by the `docs` skill (`architecture/`, `codebase/`, `code-standard/`, `project-pdr/`)

## Plugin Flow

```
Codex or Claude Code loads marketplace
  -> user adds buiducnhat/cobrew as a plugin marketplace
  -> agent reads repository marketplace metadata
  -> agent installs the cobrew plugin bundle
  -> agent discovers bundled skills
  -> user invokes CoBrew workflow skills from the agent's plugin/skill surface
```

This path is preferred for Codex and Claude Code because it avoids a separate `npx` installer step and keeps the workflow skills packaged with plugin metadata.

## Repository Layout

Built with **Bun** as the package manager and script runner. The root repository keeps shared docs, checked-in plugin bundle files, workflow skill definitions, and plugin metadata.
