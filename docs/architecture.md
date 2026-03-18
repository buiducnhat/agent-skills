# Architecture

## System overview

The project is a Node.js CLI that installs standardized agent workflow skills and configuration assets into a target repository. It combines:

- A runtime installer (`packages/cli`) for orchestration and user interaction
- A set of workflow skill definitions (`skills/`) distributed via the Vercel skills CLI
- A versioned template payload (`templates/`) providing shared agent instructions and Claude Code settings
- External command integration (`git`, `npx skills`)

## Main components

1. **CLI entrypoint (`index.ts`)**
   - Coordinates end-to-end install flow
   - Handles `--help`, `--version`, `--non-interactive`, `--copy`, and `--global`/`-g` flags
   - Owns the interactive agent-selection experience via `@clack/prompts` `multiselect`
   - Auto-detects already-installed agents and pre-selects them in the prompt
2. **Skills CLI runner (`skills.ts`)**
   - Spawns `npx skills add buiducnhat/agent-skills --skill '*' -a <agent...> -y` (always non-interactive)
   - Accepts an explicit list of agent IDs; empty list means `--all`
   - Supports `--copy` passthrough for copy-based installs
   - Supports `-g` passthrough for global (home-directory) installs
3. **Rules injector (`rules.ts`)**
   - Maps agent identifiers to their rules file paths (`AGENT_RULES_MAP`)
   - Injects `templates/AGENTS.md` content using `<!-- BEGIN/END agent-skills rules -->` markers
   - Idempotent: replaces content between markers on re-run; appends on first run
   - Skips JSON-based rules files automatically
4. **Template acquisition (`fetch.ts`)**
   - Clones repository branch into temporary directory via shallow `git clone`
   - Validates `templates/AGENTS.md` availability
5. **Template utilities (`utils.ts`)**
   - Detects installed agents from filesystem (`detectAgentsFromFilesystem`)
   - Arg parsing, help text, and install summary output
6. **Constants (`constants.ts`)**
   - Defines 39 supported agents with display names
   - Maps filesystem directory prefixes to agent IDs for auto-detection
   - Maps agent IDs to their respective rules file paths
7. **Workflow skills (`skills/`)**
   - 9 SKILL.md files defining reusable workflow patterns (ask, bootstrap, brainstorm, docs, execute-plan, fix, quick-implement, review, write-plan)
   - Distributed to consumer projects by the Vercel skills CLI

## Data flow

1. User runs CLI (`npx @buiducnhat/agent-skills [flags]`).
2. `baseDir` is derived: `os.homedir()` when `--global` is passed, otherwise `process.cwd()`.
3. CLI scans `.<agent>/skills/` directories under `baseDir` to auto-detect currently installed agents.
4. **Interactive mode**: CLI shows `@clack/prompts` multiselect with all 39 supported agents; auto-detected agents are pre-selected. User confirms selection.
5. CLI spawns `npx skills add buiducnhat/agent-skills --skill '*' -a <agent1> -a <agent2> ... -y` (fully non-interactive), with `-g` appended when in global mode.
   - **Non-interactive mode** (`--non-interactive`): uses `--all` flag instead; then re-scans `baseDir` filesystem to determine which agents were installed.
6. CLI clones `https://github.com/buiducnhat/agent-skills.git` (branch `main`) to temp dir.
7. `templates/AGENTS.md` content is injected into each selected agent's rules file under `baseDir` with markers.
8. CLI prints summary and cleans up temporary clone directory.

## Integration boundaries

- **Internal boundary**: `templates/` and `skills/` act as declarative content; `packages/cli/` acts as imperative installer.
- **External dependencies**:
  - GitHub repository availability for clone step
  - Local `git` executable
  - Local Node.js + npm/npx environment
  - `skills` CLI (Vercel Labs) execution via `npx`

## Runtime and deployment assumptions

- Distributed as a public npm package (`@buiducnhat/agent-skills`) with executable `agent-skills` bin.
- Intended runtime: developer machine or CI environment with Node.js 18+.
- Installer operates against the current working directory as the target project.
- Temporary clone directories are ephemeral and removed after execution.
- Also installable via `install.sh` shell script for quick bootstrapping.
