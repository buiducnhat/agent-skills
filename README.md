# agent-skills

Install standardized AI agent workflow skills and configuration assets into any repository with a single command.

Supports **39 AI coding agents** including Claude Code, Cursor, Windsurf, Copilot, Cline, Roo Code, and more.

---

**Languages:** English | [Tiếng Việt](README.vi.md)

---

## What it does

Running the installer:

1. Lets you **select which agents** to configure (auto-detects already-installed agents)
2. Installs **9 workflow skills** into each agent's skills directory via the [Vercel skills CLI](https://github.com/vercel-labs/skills)
3. Injects **shared agent instructions** (`AGENTS.md`) into each agent's rules file using idempotent markers
4. Copies **Claude Code settings** (`.claude/`) into your project

## Installation

### Interactive (recommended)

```bash
npx @buiducnhat/agent-skills
```

Walks you through agent selection and install mode (symlink or copy).

### Non-interactive (CI / automation)

```bash
npx @buiducnhat/agent-skills --non-interactive
```

Skips all prompts and installs skills for all agents.

### Via shell script

```bash
curl -fsSL https://raw.githubusercontent.com/buiducnhat/agent-skills/main/install.sh | bash
```

Checks for Node.js 18+ and runs the installer automatically.

### Global install

```bash
npx @buiducnhat/agent-skills --global
```

Installs skills to your home directory (`~/<agent>/skills/`) so they are available across all projects.

## Interactive walkthrough

```
┌  Agent Skills Installer
│
◇  Select agents to install skills for:
│  ◼ Claude Code  ◼ Cursor  ◻ Windsurf  ...
│
◇  How should the skills be installed?
│  ● Symlink (recommended)  ○ Copy
│
◇  Installing skills via skills CLI...
│
◇  Installation complete!
│
│  What was set up:
│    .claude/              - Claude Code settings
│    CLAUDE.md             - updated
│
│  Agent configurations updated for:
│    - claude-code
│    - cursor
│
└  Done! Your AI agent skills are ready.
```

## CLI options

| Flag                | Description                                      |
| ------------------- | ------------------------------------------------ |
| `--non-interactive` | Skip prompts; install all skills to all agents   |
| `--copy`            | Copy skill files instead of symlinking           |
| `-g, --global`      | Install to `~/` instead of the current directory |
| `-h, --help`        | Show help                                        |
| `-v, --version`     | Show version                                     |

## Workflow skills

Nine reusable workflow skills are installed into each agent:

| Skill             | Description                                                               |
| ----------------- | ------------------------------------------------------------------------- |
| `ask`             | Ask clarifying questions to gather requirements and context               |
| `bootstrap`       | Set up project structure, documentation, and conventions for new projects |
| `brainstorm`      | Explore ideas and break down complex problems before planning             |
| `docs`            | Initialize (`--init`) or update (`--update`) project documentation        |
| `execute-plan`    | Execute written plans systematically with checkpoints                     |
| `fix`             | Diagnose and resolve bugs                                                 |
| `quick-implement` | Rapid implementation for simple tasks or bug fixes                        |
| `review`          | Review uncommitted changes with codebase context                          |
| `write-plan`      | Create detailed implementation plans with phases and tasks                |

### Recommended workflow sequences

---

#### Init documentations

```
/docs --init # or /docs --update for updating existing docs
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
#   docs/brainstorms/260306-1430-dark-mode/SUMMARY.md
# Then prompts: "Proceed to write-plan?"

# Step 2 — create a phased implementation plan
/write-plan

# Agent reads the brainstorm, writes:
#   docs/plans/260306-1445-dark-mode/SUMMARY.md
#   docs/plans/260306-1445-dark-mode/phase-01-tokens.md
#   docs/plans/260306-1445-dark-mode/phase-02-components.md
# Ends with: "Use /clear then /execute-plan docs/plans/... to execute"

# Step 3 — execute the approved plan in a fresh context
/clear
/execute-plan docs/plans/260306-1445-dark-mode/SUMMARY.md
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
#   docs/plans/260306-1020-jwt-auth/SUMMARY.md
#   docs/plans/260306-1020-jwt-auth/phase-01-schema.md
#   docs/plans/260306-1020-jwt-auth/phase-02-middleware.md
# Ends with: "Use /clear then /execute-plan docs/plans/... to execute"

# Step 2 — execute in a fresh context
/clear
/execute-plan docs/plans/260306-1020-jwt-auth/SUMMARY.md
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

## Supported agents

<details>
<summary>View all 39 supported agents</summary>

AdaL, Amp, Antigravity, Augment, Claude Code, Cline, CodeBuddy, Codex, Command Code, Continue, Cortex Code, Crush, Cursor, Droid, Gemini CLI, GitHub Copilot, Goose, iFlow CLI, Junie, Kilo Code, Kimi Code CLI, Kiro CLI, Kode, MCPJam, Mistral Vibe, Mux, Neovate, OpenClaw, OpenCode, OpenHands, Pi, Pochi, Qoder, Qwen Code, Replit, Roo Code, Trae, Trae CN, Windsurf, Zencoder

</details>

## Requirements

- Node.js 18+
- `git` available in `PATH`
- Network access (to clone templates from GitHub)

## Re-running the installer

Re-running is safe. Rules injection is idempotent — the existing content between markers is replaced without duplication. New agents can be added to an existing setup at any time.

## Release

Tag pushes matching `v*` trigger the GitHub Actions workflow `.github/workflows/release.yml` to publish `@buiducnhat/agent-skills` to npm automatically.

## Documentation

- [Product PDR](docs/project-pdr.md)
- [Architecture](docs/architecture.md)
- [Codebase Map](docs/codebase.md)
- [Code Standard](docs/code-standard.md)
