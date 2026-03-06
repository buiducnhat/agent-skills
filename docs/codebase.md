# Codebase Map

## High-level tree

```text
.
├── install.sh                    # Curl|bash installer wrapper
├── package.json                  # Workspace scripts (Turbo + Biome)
├── turbo.json                    # Monorepo task pipeline
├── biome.json                    # Biome formatter/linter config
├── skills-lock.json              # Skills CLI lock file
├── AGENTS.md                     # Root agent instructions (generated)
├── CLAUDE.md                     # Claude Code project instructions
├── packages/
│   └── cli/
│       ├── package.json          # Package metadata, scripts, dependencies, bin
│       ├── tsconfig.json         # TypeScript compiler options
│       ├── tsdown.config.ts      # Build/bundling config
│       └── src/
│           ├── index.ts          # CLI entrypoint and install orchestration
│           ├── skills.ts         # Skills CLI execution
│           ├── rules.ts          # Agent rules file mapping and marker-based injection
│           ├── fetch.ts          # Git clone + temp directory lifecycle
│           ├── utils.ts          # Arg parsing, detection, copy, help/summary output
│           └── constants.ts      # Repository constants, agent maps, marker strings
├── skills/                       # Workflow skill definitions (distributed via skills CLI)
│   ├── ask/SKILL.md
│   ├── bootstrap/SKILL.md
│   ├── brainstorm/SKILL.md
│   ├── docs/SKILL.md
│   ├── execute-plan/SKILL.md
│   ├── fix/SKILL.md
│   ├── quick-implement/SKILL.md
│   ├── review/SKILL.md
│   └── write-plan/SKILL.md
├── templates/
│   ├── AGENTS.md                 # Shared agent instructions injected into rules files
│   └── .claude/                  # Claude Code settings and scripts
│       ├── settings.json
│       └── scripts/context-bar.sh
└── docs/                         # Project documentation
```

## Directory responsibilities

- `packages/cli/`: publishable npm package (`@buiducnhat/agent-skills`) containing executable logic.
- `skills/`: workflow skill definitions (`SKILL.md` files) distributed to consumer projects via the Vercel skills CLI.
- `templates/`: canonical template payload (agent instructions and Claude Code settings) copied into consumer repositories.
- `docs/`: product, standards, codebase, and architecture documentation.

## Key entry points and modules

- `packages/cli/src/index.ts`: main flow (`parse args → detect/select agents → run skills CLI → fetch templates → inject rules → copy .claude/ → summary`). Handles `--help`, `--version`, `--non-interactive`, `--copy`, and `--global`/`-g` flags.
- `packages/cli/src/skills.ts`: spawns `npx skills add` using `--all` or explicit `-a <agent>` arguments, with optional `--copy` passthrough.
- `packages/cli/src/rules.ts`: maps agent identifiers to rules file paths, performs marker-based injection of `AGENTS.md` content.
- `packages/cli/src/fetch.ts`: clones this repository into a temp directory and validates `templates/AGENTS.md` and `templates/.claude/` exist.
- `packages/cli/src/utils.ts`: shared utilities — arg parsing, filesystem agent detection, `.claude/` template copy (excluding `skills/`), help text, install summary.
- `packages/cli/src/constants.ts`: `REPO_URL`, `REPO_BRANCH`, `SUPPORTED_AGENTS` (39 agents), `AGENT_SKILLS_DIRS`, `AGENT_RULES_MAP`, marker constants.

## Important scripts and config files

- Root `install.sh`: validates Node 18+ and forwards args to `npx --yes @buiducnhat/agent-skills`.
- Root `package.json` scripts:
  - `bun run dev` → `turbo dev`
  - `bun run build` → `turbo build`
  - `bun run check-types` → `turbo check-types`
  - `bun run check` → Biome check/write with `--unsafe` at workspace level
- `packages/cli/package.json` scripts:
  - `bun run dev` → run CLI from source with `tsx`
  - `bun run build` → build with `tsdown`
  - `bun run check` → Biome check/write
  - `prepublishOnly` → `bun run build` before publish
- `.gitignore`: ignores local `.claude/`, generated plans/brainstorms docs subfolders, and CLI build artifacts.
