# Project PDR — Goals

## Problem Statement

AI coding agents each have their own skills/rules systems with different directory conventions and file formats. Teams using multiple agents need to manually configure each one. There is no standard way to share workflow skills across agents or inject shared behavioral guidelines.

## Product Purpose

`agent-skills` provides a single installer that:
1. Installs consistent workflow skill definitions into any of 40 supported AI coding agents
2. Injects shared agent behavioral rules (`AGENTS.md`) into each agent's rules file

## Target Users

- Individual developers using 1+ AI coding agents who want standardized workflows
- Teams wanting to commit shared agent skill configurations to a repository
- CI/automation environments needing non-interactive agent setup (`--non-interactive`)

## Core Use Cases

| Use Case | Entry Point |
|----------|------------|
| Interactive install for a project | `npx @buiducnhat/agent-skills@latest` |
| Non-interactive CI install | `npx @buiducnhat/agent-skills@latest --non-interactive` |
| Global install across all projects | `npx @buiducnhat/agent-skills@latest --global` |
| Quick install via curl | `curl -fsSL .../install.sh \| bash` |

## Workflow Skills Provided

Eight workflow skills cover the full development lifecycle:

- **Planning**: `brainstorm`, `write-plan`, `ask`
- **Execution**: `execute-plan`, `quick-implement`
- **Quality**: `as-fix`, `as-review`
- **Documentation**: `docs`

## Feature Scope

**In scope:**
- Install skills to 40 supported agents via the Vercel skills CLI
- Inject shared `AGENTS.md` rules using idempotent markers
- Symlink (default) or copy install modes
- Auto-detect already-installed agents from filesystem
- Global vs. project-level install

**Out of scope:**
- Agent-specific skill customization per project
- Skill version pinning per-agent (all agents get the same version)
- Removing/uninstalling previously injected rules

## Success Criteria

- A single command installs skills for all desired agents in a project
- Re-running is safe (idempotent) — no duplicate rules injection
- Skills work across all 40 supported agent environments without modification
- Published to npm as `@buiducnhat/agent-skills` and auto-released on `v*` tag push
