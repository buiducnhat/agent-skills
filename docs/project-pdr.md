# Project PDR

## Problem statement

Teams using AI coding assistants often need a repeatable way to bootstrap shared agent instructions, reusable skills, and per-agent configuration files. Manual setup is inconsistent and error-prone across repositories.

## Product purpose

`@buiducnhat/agent-skills` provides a CLI installer that copies curated templates (`.ruler/`, `.claude/`) into a target project, configures selected AI agents, and runs `ruler apply` to generate agent-specific outputs.

## Target users

- Developers who use one or more AI coding agents in local repositories
- Teams that want standardized prompting/workflow skills across projects
- Maintainers who want a one-command install path (`npx` or `install.sh`)

## Core use cases

1. Fresh setup in a repository with no existing `.ruler/` directory.
2. Updating an existing setup while preserving a clear update/fresh-install choice.
3. Non-interactive setup in automation using `--agents` and/or `--non-interactive`.
4. Quick bootstrap using the shell installer script with Node.js version checks.

## Feature scope

### In scope

- Interactive prompts for update mode and agent selection
- Argument-based non-interactive mode
- Download templates from GitHub (`main` branch)
- Copy `.ruler/` and `.claude/` templates into current project
- Configure `.ruler/ruler.toml` `default_agents`
- Run `npx @intellectronica/ruler apply --agents ...`
- Installation summary and next-step guidance

### Constraints

- Requires Node.js >= 18
- Requires network access and `git` for template clone
- Requires `npx` for running `ruler apply`
- Current CLI version output is hardcoded to `0.1.0`

## Success criteria

- Running `npx @buiducnhat/agent-skills` completes without manual file edits
- Selected agents are written into `.ruler/ruler.toml`
- `.ruler/` and `.claude/` are present and populated from templates
- `ruler apply` is executed (or warning shown with manual fallback command)
- User receives a clear post-install summary of generated artifacts
