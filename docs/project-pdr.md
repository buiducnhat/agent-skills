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

1. Fresh setup in a repository — run the CLI, select agents interactively via `@clack/prompts` multiselect (auto-detected agents pre-checked), get skills installed and rules files populated.
2. Updating an existing setup — re-run the CLI; marker-based injection replaces existing rules without duplication.
3. Non-interactive setup in automation using `--non-interactive` (installs all skills to all agents without prompts).
4. Force copy mode using `--copy` when symlinks are not desired.
5. Global install using `--global` / `-g` (installs skills to `~/<agent>/skills/` for cross-project availability).
6. Quick bootstrap using the shell installer script (`install.sh`) with Node.js version checks.

## Feature scope

### In scope

- Show a `@clack/prompts` multiselect prompt for agent selection; auto-detect installed agents and pre-select them
- Run `npx skills add buiducnhat/agent-skills --skill '*' -a <agents...> -y` non-interactively after selection
- Inject `templates/AGENTS.md` content into each agent's rules file using marker-based append/replace
- Mirror installed skills to Cursor IDE's expected path (`.cursor/skills/`) via per-file symlinks or copies when Cursor is selected
- Installation summary showing agents configured and rules files updated
- `--non-interactive` mode for automation (installs all agents, detects from filesystem)
- `--copy` passthrough to skills CLI for copy-based installs
- `--global` / `-g` mode for user-level (home directory) skill installation
- 39 supported agents across major AI coding assistant platforms

### Constraints

- Requires Node.js >= 18
- Requires network access and `git` for template clone
- Requires `npx` for running skills CLI
- External runtime dependency: `npx skills` (Vercel Labs skills CLI)
- Global mode (`--global`) is only meaningful for agents that follow the home-dir conventions of the Vercel skills CLI; it writes into `~/` and may modify user-level rules files (e.g., `~/.claude/CLAUDE.md`).

## Success criteria

- Running `npx @buiducnhat/agent-skills` completes without manual file edits
- Selected agent rules files contain `templates/AGENTS.md` content wrapped in markers
- User receives a clear post-install summary of updated rules files and agents configured
