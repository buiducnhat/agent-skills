# Architecture — Components

## System Overview

CoBrew combines plugin bundles, a published installer CLI, workflow skills, shared agent instructions, and supporting documentation assets.

The recommended user path for Codex and Claude Code is the generated plugin bundle under `plugins/cobrew/`. The CLI runtime in `packages/cli` remains the fallback path for other agents, CI, global installs, and environments without plugin support. The content both paths distribute lives primarily in `skills/` and `templates/AGENTS.md`. Dated brainstorms and execution plans live under `docs/`, so installer behavior, plugin packaging, and implementation history stay together.

## Components

### Plugin Source and Bundles (`plugins/cobrew/`, `.agents/plugins/marketplace.json`, `.claude-plugin/marketplace.json`)

`plugins/cobrew/.codex-plugin/plugin.json` is the current authoring metadata source for generated plugin artifacts. The generated distribution bundle lives at `plugins/cobrew/` and contains Codex and Claude Code manifests, bundled `skills/`, and plugin assets.

Users install the marketplace directly from GitHub with `codex plugin marketplace add buiducnhat/cobrew` for Codex or `claude plugin marketplace add buiducnhat/cobrew` for Claude Code. The repository-owned marketplace files are distribution metadata consumed by those tools; users should not need to clone the repository just to install the plugin.

### CLI Installer (`packages/cli`)

The published npm package (`cobrew`). Handles argument parsing, interactive selection, skills installation, template fetching, and rules-file injection for agents that are not using the plugin bundle.

| Module             | Responsibility                                                                                                       |
| ------------------ | -------------------------------------------------------------------------------------------------------------------- |
| `src/index.ts`     | Main orchestration: parses flags, drives prompts, chooses install mode, and coordinates install plus rules injection |
| `src/constants.ts` | Supported agent registry, skills-directory detection map, rules-file mapping, and injection markers                  |
| `src/skills.ts`    | Runs `npx skills add buiducnhat/cobrew --skill '*'` with selected agent IDs and install flags for the CLI fallback   |
| `src/fetch.ts`     | Clones the repository to a temporary directory so the installer can read `templates/AGENTS.md`                       |
| `src/rules.ts`     | Creates or updates per-agent rules files with an idempotent marker block and skips JSON-based targets                |
| `src/utils.ts`     | Parses CLI flags, detects installed agents from filesystem layout, prints help text, and prints the install summary  |

### Skill Library (`skills/`)

Ten first-party workflow skill definitions live in `skills/`. Each skill has a `SKILL.md` with YAML frontmatter and may include `references/` assets:

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

`skills-lock.json` complements these first-party skills by pinning upstream skills from external repositories so installs remain reproducible.

### Shared Agent Rules (`templates/AGENTS.md`)

A single shared instructions file injected into agent-specific rules files. The content focuses on documentation-first context loading, question-tool usage, and general engineering principles, and is fetched at install time via `fetch.ts`.

### Repository Guidance (`AGENTS.md`, `CLAUDE.md`)

Root instruction files mirror the shared `AGENTS.md` rules so work inside this repository follows the same docs-first workflow that the installer distributes to downstream agent environments.

### Documentation Archive (`docs/`)

The repository stores more than reference docs. It also contains:

- `docs/brainstorms/` for dated design exploration summaries
- `docs/plans/` for phased implementation plans and execution reports
- the standard topic folders used by the `docs` skill (`architecture/`, `codebase/`, `code-standard/`, `project-pdr/`)

### Config Package (`packages/config`)

Shared TypeScript and tooling config (`tsconfig.base.json`) used by workspace packages.

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

## CLI Install Flow

```
CLI invoked
  → parse args (utils.ts)
  → choose base directory (`cwd` or home directory in `--global` mode)
  → interactive path:
      detect preinstalled agents
      prompt for agent selection
      prompt for symlink vs copy mode
      runSkillsAdd() with selected agent IDs
    or non-interactive path:
      runSkillsAdd() for all agents
      detect installed agents from filesystem for rules injection
  → fetchTemplates() clones the repo into a temp directory
  → read templates/AGENTS.md
  → injectRules() updates text rules files for the chosen agents
  → printSummary()
  → cleanupTemp()
```

If non-interactive installation succeeds but no agent filesystem layout is detected, the installer skips rules injection and exits after warning the user.

## Rules Injection Mechanism

`injectRules()` groups agents by target rules path so shared files are updated once, not once per agent. It uses idempotent HTML comment markers in each text rules file:

```
<!-- BEGIN cobrew rules -->
...AGENTS.md content...
<!-- END cobrew rules -->
```

On re-run, the marked block is replaced without duplication. If the file exists but has no markers, the block is appended. If the target rules file is JSON-based, the installer records it as skipped instead of trying to merge text into it.

## Monorepo Layout

Built with **Turbo** (task orchestration) and **Bun** (runtime/package manager). The workspace currently has two packages: `packages/cli` (published) and `packages/config` (internal shared config). The root workspace keeps shared docs, skill definitions, plugin-bundle generation scripts, templates, and installation scripts.
