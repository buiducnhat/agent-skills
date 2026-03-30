# Project PDR — Goals

## Problem Statement

AI coding agents each use different skills directories, rules-file names, and configuration conventions. Teams that switch between agents or support several agents in one repository would otherwise need to configure each environment manually and keep behavioral guidance in sync by hand.

## Product Purpose

`agent-skills` provides a single installer that:

1. Installs consistent workflow skill definitions into any of 40 supported AI coding agents
2. Injects shared agent behavioral rules (`AGENTS.md`) into each agent's rules file when that target is text-based
3. Keeps repository-owned workflow guidance close to the installer source so the skills, shared rules, and docs evolve together

## Target Users

- Individual developers using 1+ AI coding agents who want standardized workflows
- Teams wanting to commit shared agent skill configurations to a repository
- CI/automation environments needing non-interactive agent setup (`--non-interactive`)
- Maintainers who need a repeatable way to ship first-party skills and pinned upstream skills together

## Supported Workflows

| Workflow                                             | Entry Point                                             |
| ---------------------------------------------------- | ------------------------------------------------------- |
| Interactive project install                          | `npx @buiducnhat/agent-skills@latest`                   |
| Non-interactive CI install                           | `npx @buiducnhat/agent-skills@latest --non-interactive` |
| Global install across projects                       | `npx @buiducnhat/agent-skills@latest --global`          |
| Copy-based install for environments without symlinks | `npx @buiducnhat/agent-skills@latest --copy`            |
| Shell bootstrap install                              | `curl -fsSL .../install.sh \| bash`                     |

## Workflow Skills Provided

Eight workflow skills cover the full development lifecycle:

- **Clarification**: `as-ask`
- **Planning**: `brainstorm`, `write-plan`
- **Execution**: `execute-plan`, `quick-implement`
- **Quality**: `as-fix`, `as-review`
- **Documentation**: `docs`

The repository also tracks additional upstream skills in `skills-lock.json` so downstream installs can include externally maintained capabilities alongside the first-party set.

## Feature Scope

**In scope:**

- Install skills to 40 supported agents via the Vercel skills CLI
- Inject shared `AGENTS.md` rules using idempotent markers
- Symlink (default) or copy install modes
- Auto-detect already-installed agents from filesystem
- Global vs. project-level install
- Keep first-party skill definitions, shared rules, and repository guidance in the same monorepo
- Maintain historical brainstorms and execution plans for non-trivial repository changes

**Out of scope:**

- Agent-specific skill customization per project
- Skill version pinning per-agent (all agents get the same version)
- Removing/uninstalling previously injected rules
- Editing or merging JSON-based rules formats during rules injection

## Operational Constraints

- Node.js 18+ is required for CLI execution.
- `git` and network access are required because templates are fetched by cloning the repository.
- Non-interactive installs may complete skill installation even when no local agent rules files are detected; in that case, rules injection is skipped.
- Re-running the installer must remain idempotent for text-based rules files.

## Success Criteria

- A single command installs skills for all desired agents in a project
- Re-running is safe (idempotent) — no duplicate rules injection
- Skills work across all 40 supported agent environments without modification
- Published to npm as `@buiducnhat/agent-skills` and auto-released on `v*` tag push
- Repository docs stay aligned with the shipped skill set, installer flags, and workflow conventions
