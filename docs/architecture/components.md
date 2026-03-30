# Architecture — Components

## System Overview

`agent-skills` is a CLI tool + skill library. The CLI installer (`packages/cli`) is the runtime entry point; the skill library (`skills/`) contains the workflow definitions installed into agent environments.

## Components

### CLI Installer (`packages/cli`)

The published npm package (`@buiducnhat/agent-skills`). Handles the end-to-end install flow:

| Module | Responsibility |
|--------|---------------|
| `src/index.ts` | CLI entry point: orchestrates prompts, installs, and rules injection |
| `src/constants.ts` | Agent registry (40 agents), rules-file map, skills-dir detection map |
| `src/skills.ts` | Shells out to `npx skills add` to install skills into agent dirs |
| `src/fetch.ts` | Clones the repo via `git clone --depth 1` to a temp dir for template access |
| `src/rules.ts` | Injects `AGENTS.md` content into agent rules files using idempotent markers |
| `src/utils.ts` | CLI arg parsing, filesystem agent detection, summary printing |

### Skill Library (`skills/`)

Eight first-party workflow skill definitions, each containing a `SKILL.md` (frontmatter + instructions) and optional `references/` subdirectory:

| Skill | Purpose |
|-------|---------|
| `ask` | Requirements gathering |
| `as-fix` | Bug diagnosis and fix |
| `as-review` | Uncommitted-changes code review |
| `brainstorm` | Ambiguous problem exploration |
| `docs` | Documentation init/update |
| `execute-plan` | Phase-by-phase plan execution |
| `quick-implement` | Small, low-risk changes |
| `write-plan` | Phased implementation planning |

### Shared Agent Rules (`templates/AGENTS.md`)

A single shared instructions file injected into each agent's rules file. Fetched at install time via `fetch.ts`.

### Config Package (`packages/config`)

Shared TypeScript and tooling config (`tsconfig.base.json`) used by workspace packages.

## Data Flow — Install

```
CLI invoked
  → parse args (utils.ts)
  → interactive or non-interactive mode
  → runSkillsAdd() → npx skills add buiducnhat/agent-skills (skills.ts)
  → fetchTemplates() → git clone → tempDir (fetch.ts)
  → injectRules() → write/update rules files (rules.ts)
  → printSummary()
  → cleanupTemp()
```

## Rules Injection Mechanism

`injectRules()` uses idempotent HTML comment markers in each agent's rules file:

```
<!-- BEGIN agent-skills rules -->
...AGENTS.md content...
<!-- END agent-skills rules -->
```

On re-run, the block between markers is replaced without duplication.

## Monorepo Layout

Built with **Turbo** (task orchestration) and **Bun** (runtime/package manager). Two workspace packages: `packages/cli` (published) and `packages/config` (internal shared config).
