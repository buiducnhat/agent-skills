# Project PDR — Goals

## Problem Statement

AI coding agents each use different skills directories and configuration conventions. Teams that switch between agents or support several agents in one repository would otherwise need to configure each workflow skill set manually.

## Product Purpose

CoBrew provides a plugin-first distribution model with direct skills CLI installation for non-plugin agents:

1. Ships Codex and Claude Code plugin bundles for the preferred user experience in those agents
2. Guides other agents to install consistent workflow skill definitions directly through the Vercel skills CLI
3. Keeps repository-owned workflow guidance close to the plugin bundle so the skills, plugin manifests, and docs evolve together

## Target Users

- Individual developers using 1+ AI coding agents who want standardized workflows
- Codex and Claude Code users who prefer installing workflow skills as plugins
- Teams wanting to commit shared agent skill workflows to a repository
- Users of non-plugin agents who can install skills through the Vercel skills CLI
- Maintainers who need a repeatable way to ship first-party skills with plugin metadata

## Supported Workflows

| Workflow                   | Entry Point                                       |
| -------------------------- | ------------------------------------------------- |
| Codex plugin install       | `codex plugin marketplace add buiducnhat/cobrew`  |
| Claude Code plugin install | `claude plugin marketplace add buiducnhat/cobrew` |
| Direct skills CLI install  | `npx skills add buiducnhat/cobrew`                |

## Workflow Skills Provided

Ten workflow skills cover the full development lifecycle:

- **Clarification**: `ask`
- **Planning**: `brainstorm`, `write-plan`
- **Execution**: `execute-plan`, `quick-implement`
- **Quality**: `fix`, `review`
- **Documentation**: `docs`
- **Visualization**: `visualize`
- **Version Control**: `git-commit`

The repository maintains the first-party skill set directly inside the checked-in plugin bundle.

## Feature Scope

**In scope:**

- Provide Codex and Claude Code plugin bundles as the recommended path for those agents
- Guide non-plugin users to install skills directly with `npx skills add buiducnhat/cobrew`
- Keep plugin-installed workflow skills self-contained for project context loading
- Keep first-party skill definitions, plugin metadata, and repository guidance together in this repository
- Maintain historical brainstorms and execution plans for non-trivial repository changes

**Out of scope:**

- Agent-specific skill customization per project
- Skill version pinning per-agent (all agents get the same version)
- Removing/uninstalling previously injected rules
- Editing or merging JSON-based rules formats

## Operational Constraints

- Node.js 18+ is required for direct skills CLI installation.
- Network access is required for plugin marketplace or skills CLI installation.
- Codex and Claude Code plugin installs use marketplace commands pointed at `buiducnhat/cobrew`.
- Plugin installs do not need to write extra project instruction files for workflow skills to load project context.

## Success Criteria

- Codex and Claude Code users can install CoBrew through plugin marketplace metadata
- Plugin-installed workflow skills can load project context from `docs/SUMMARY.md`
- A single `npx skills add buiducnhat/cobrew` command installs skills for non-plugin agents
- Skills work across all 40 supported agent environments without modification
- Repository docs stay aligned with the shipped skill set, installation guidance, and workflow conventions
