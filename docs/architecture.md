# Architecture

## System overview

The project is a Node.js CLI that installs standardized agent configuration assets into a target repository. It combines:

- A runtime installer (`cli`) for orchestration and user interaction
- A versioned template payload (`templates`) copied into consumer projects
- External command integration (`git`, `npx @intellectronica/ruler`)

## Main components

1. **CLI entrypoint (`index.ts`)**
   - Coordinates end-to-end install/update flow
   - Chooses interactive vs non-interactive behavior
2. **Prompt layer (`prompts.ts`)**
   - Captures user choices (fresh/update, selected agents)
3. **Template acquisition (`fetch.ts`)**
   - Clones repository branch into temporary directory
   - Validates template availability
4. **Template deployment (`utils.ts`)**
   - Copies `.ruler` and `.claude` templates to project
   - Handles backup behavior for fresh install mode
5. **Configuration mutator (`configure.ts`)**
   - Updates `default_agents` in `.ruler/ruler.toml`
6. **Post-process generator (`apply.ts`)**
   - Runs `ruler apply` for selected agents
   - Emits fallback guidance on failure

## Data flow

1. User runs CLI (`npx @buiducnhat/agent-skills [flags]`).
2. CLI resolves execution mode and selected agents.
3. CLI clones `https://github.com/buiducnhat/agent-skills.git` (branch `main`) to temp dir.
4. Template files are copied from temp clone into current working repository.
5. `.ruler/ruler.toml` is updated with selected `default_agents`.
6. CLI invokes `ruler apply` to generate agent-specific output files.
7. CLI prints summary and cleans temporary clone directory.

## Integration boundaries

- **Internal boundary**: `templates/` acts as declarative content; `cli/` acts as imperative installer.
- **External dependencies**:
  - GitHub repository availability for clone step
  - Local `git` executable
  - Local Node.js + npm/npx environment
  - `@intellectronica/ruler` execution via `npx`

## Runtime and deployment assumptions

- Distributed as a public npm package with executable `agent-skills` bin.
- Intended runtime: developer machine or CI environment with Node.js 18+.
- Installer operates against the current working directory as the target project.
- Temporary clone directories are ephemeral and removed after execution.
