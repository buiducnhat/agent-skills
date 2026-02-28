# Project PDR

## Problem statement

Teams using AI coding assistants often need a repeatable way to bootstrap shared agent instructions, reusable skills, and per-agent configuration files. Manual setup is inconsistent and error-prone across repositories.

## Product purpose

`@buiducnhat/agent-skills` provides a CLI installer that runs the Vercel Labs skills CLI to install curated workflow skills into a target project, detects which agents were selected, injects shared agent instructions into each agent's rules file, and copies Claude Code configuration templates.

## Target users

- Developers who use one or more AI coding agents in local repositories
- Teams that want standardized prompting/workflow skills across projects
- Maintainers who want a one-command install path (`npx` or `install.sh`)

## Core use cases

1. Fresh setup in a repository — run the CLI, select agents interactively via skills CLI, get skills installed and rules files populated.
2. Updating an existing setup — re-run the CLI; marker-based injection replaces existing rules without duplication.
3. Non-interactive setup in automation using `--non-interactive` (installs all skills to all agents without prompts).
4. Quick bootstrap using the shell installer script with Node.js version checks.

## Feature scope

### In scope

- Run `npx skills add buiducnhat/agent-skills --skill *` interactively or non-interactively
- Parse skills CLI output to detect which agents were selected; fallback to filesystem scan
- Inject `templates/AGENTS.md` content into each agent's rules file using marker-based append/replace
- Copy `templates/.claude/` into the project for Claude Code users
- Installation summary showing agents configured and rules files updated
- `--non-interactive` mode for automation

### Constraints

- Requires Node.js >= 18
- Requires network access and `git` for template clone
- Requires `npx` for running skills CLI
- External runtime dependency: `npx skills` (Vercel Labs skills CLI)

## Success criteria

- Running `npx @buiducnhat/agent-skills` completes without manual file edits
- Selected agent rules files contain `templates/AGENTS.md` content wrapped in markers
- `.claude/` settings are present and populated from templates
- User receives a clear post-install summary of updated rules files and agents configured
