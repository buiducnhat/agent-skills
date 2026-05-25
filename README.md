# CoBrew

Install standardized AI workflow skills for coding agents.

Use the **CoBrew plugin** for the best Codex and Claude Code experience. For other agents or environments without plugin support, install the skills directly with the Vercel skills CLI.

---

**Languages:** English | [Tiếng Việt](README.vi.md)

---

## What it does

CoBrew ships first-party workflow skills through two supported paths:

1. **Plugin bundles for Codex and Claude Code** expose self-contained workflow skills directly through each agent's plugin system.
2. **Direct skills CLI install** uses the [Vercel skills CLI](https://github.com/vercel-labs/skills) to install the same skills into other supported agents.

## Installation

### Codex plugin (recommended for Codex)

Install the CoBrew plugin marketplace directly from GitHub:

```bash
codex plugin marketplace add buiducnhat/cobrew
```

### Claude Code plugin (recommended for Claude Code)

Install the CoBrew plugin marketplace directly from GitHub:

```bash
claude plugin marketplace add buiducnhat/cobrew
```

Inside an interactive Claude Code session, use the slash command form:

```text
/plugin marketplace add buiducnhat/cobrew
```

### Other agents

For agents outside the plugin path, install the CoBrew skills directly:

```bash
npx skills add buiducnhat/cobrew
```

## Plugin bundle maintenance

This repository maintains plugin-ready skill content directly under `plugins/cobrew/skills/`.

`plugins/cobrew/` is the checked-in plugin bundle for both Codex and Claude Code. It includes the Codex manifest (`.codex-plugin/plugin.json`), the Claude Code manifest (`.claude-plugin/plugin.json`), skill files, references, and plugin assets.

The Codex marketplace at `.agents/plugins/marketplace.json` and the Claude Code marketplace at `.claude-plugin/marketplace.json` both point at `./plugins/cobrew`. There is no separate root `skills/` source tree and no sync script.

Each workflow skill includes its own project context-loading guidance and uses `docs/SUMMARY.md` as the entry point when present.

## Repository workflow skills

This repository currently defines ten first-party workflow skills in `plugins/cobrew/skills/`:

| Skill             | Description                                                                                                         |
| ----------------- | ------------------------------------------------------------------------------------------------------------------- |
| `ask`             | Ask clarifying questions to gather requirements and context                                                         |
| `fix`             | Diagnose and resolve bugs with root-cause analysis and verification                                                 |
| `review`          | Review uncommitted changes with codebase context and severity levels                                                |
| `brainstorm`      | Explore ideas and break down complex problems before planning                                                       |
| `docs`            | Create or refresh project documentation based on the current repo                                                   |
| `execute-plan`    | Execute written plans systematically with checkpoints                                                               |
| `git-commit`      | Create conventional commit messages from staged or unstaged changes                                                 |
| `quick-implement` | Rapid implementation for small, well-scoped changes                                                                 |
| `visualize`       | Create source-adjacent HTML visualizations for docs, markdown, plans, and context using fixed templates and Mermaid |
| `write-plan`      | Create detailed implementation plans with phases and tasks                                                          |

### Recommended workflow sequences

---

#### Init documentations

```
/docs
```

#### Complex or ambiguous tasks

```
brainstorm → write-plan → execute-plan
```

Use when requirements are unclear or multiple approaches are possible.

```
# Step 1 — explore and define the design
/brainstorm add dark mode support

# Agent clarifies requirements, proposes approaches, writes:
#   docs/.brainstorms/260306-1430-dark-mode/SUMMARY.md
# Then prompts: "Proceed to write-plan?"

# Step 2 — create a phased implementation plan
/write-plan

# Agent reads the brainstorm, writes:
#   docs/.plans/260306-1445-dark-mode/SUMMARY.md
#   docs/.plans/260306-1445-dark-mode/phase-01-tokens.md
#   docs/.plans/260306-1445-dark-mode/phase-02-components.md
# Ends with: "Use /clear then /execute-plan docs/.plans/... to execute"

# Step 3 — execute the approved plan in a fresh context
/clear
/execute-plan docs/.plans/260306-1445-dark-mode/SUMMARY.md
```

---

#### Well-defined features or large refactors

```
write-plan → execute-plan
```

Use when the task is clear but too large or risky to implement without a plan.

```
# Step 1 — plan the work
/write-plan migrate auth to JWT

# Agent writes:
#   docs/.plans/260306-1020-jwt-auth/SUMMARY.md
#   docs/.plans/260306-1020-jwt-auth/phase-01-schema.md
#   docs/.plans/260306-1020-jwt-auth/phase-02-middleware.md
# Ends with: "Use /clear then /execute-plan docs/.plans/... to execute"

# Step 2 — execute in a fresh context
/clear
/execute-plan docs/.plans/260306-1020-jwt-auth/SUMMARY.md
```

---

#### Small tasks and quick fixes

```
quick-implement
```

Use for small, well-scoped changes where a formal plan would be overhead.

```
# Implement directly — no plan needed
/quick-implement add a tooltip to the submit button
```

---

#### Bug fixes

```
fix
```

Use when you have a concrete error, failing test, or unexpected behavior to diagnose.

```
/fix TypeError: Cannot read properties of undefined at checkout.ts:42

# For simple bugs: agent diagnoses, applies fix, verifies
# For complex bugs: agent stops and routes to write-plan
```

---

#### Visualizations

```
visualize
```

Use when docs, plans, markdown, or context would be easier to understand as a source-adjacent HTML diagram.

```
/visualize docs/.plans/260306-1020-jwt-auth/SUMMARY.md

# Agent creates:
#   docs/.plans/260306-1020-jwt-auth/visualize.html
#   docs/.plans/260306-1020-jwt-auth/visualize-assets/
```

## Supported agents

<details>
<summary>View all 40 supported agents</summary>

AdaL, Amp, Antigravity, Augment, Claude Code, Cline, CodeBuddy, Codex, Command Code, Continue, Cortex Code, Crush, Cursor, Droid, Gemini CLI, GitHub Copilot, Goose, iFlow CLI, Junie, Kilo Code, Kimi Code CLI, Kiro CLI, Kode, MCPJam, Mistral Vibe, Mux, Neovate, OpenClaw, OpenCode, OpenHands, Pi, Pochi, Qoder, Qwen Code, Replit, Roo Code, Trae, Trae CN, Windsurf, Zencoder

</details>

## Requirements

- Node.js 18+
- Network access for plugin marketplace or skills CLI installation

## Documentation

- [Documentation Summary](docs/SUMMARY.md)
