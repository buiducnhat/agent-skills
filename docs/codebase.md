# Codebase Map

## High-level tree

```text
.
├── install.sh                    # Curl|bash installer wrapper
├── package.json                  # Workspace scripts (Turbo + Biome)
├── turbo.json                    # Monorepo task pipeline
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
├── config/
│   ├── package.json              # Shared config workspace package
│   └── tsconfig.base.json        # Base TypeScript config
├── templates/
│   ├── AGENTS.md                 # Shared agent instructions injected into rules files
│   └── .claude/                  # Claude Code settings and scripts
└── docs/                         # Project documentation
```

## Directory responsibilities

- `packages/cli/`: publishable npm package (`@buiducnhat/agent-skills`) containing executable logic.
- `config/`: shared workspace configuration package for TypeScript baselines.
- `templates/`: canonical template payload copied into consumer repositories.
- `docs/`: product, standards, codebase, and architecture documentation.

## Key entry points and modules

- `packages/cli/src/index.ts`: main flow (`parse args → detect/select agents → run skills CLI → fetch templates → inject rules → copy .claude/ → summary`).
- `packages/cli/src/skills.ts`: spawns `npx skills add` using `--all` or explicit `-a <agent>` arguments, with optional `--copy` passthrough.
- `packages/cli/src/rules.ts`: maps agent identifiers to rules file paths, performs marker-based injection of `AGENTS.md` content.
- `packages/cli/src/fetch.ts`: clones this repository into a temp directory and validates `templates/AGENTS.md` and `templates/.claude/` exist.
- `packages/cli/src/utils.ts`: shared utilities — arg parsing, filesystem agent detection, `.claude/` template copy (excluding `skills/`), help text, install summary.
- `packages/cli/src/constants.ts`: `REPO_URL`, `REPO_BRANCH`, `SUPPORTED_AGENTS`, `AGENT_SKILLS_DIRS`, `AGENT_RULES_MAP`, marker constants.

## Important scripts and config files

- Root `install.sh`: validates Node 18+ and forwards args to `npx --yes @buiducnhat/agent-skills`.
- Root `package.json` scripts:
  - `bun run dev` → `turbo dev`
  - `bun run build` → `turbo build`
  - `bun run check-types` → `turbo check-types`
  - `bun run check` → Biome check/write at workspace level
- `packages/cli/package.json` scripts:
  - `bun run dev` → run CLI from source with `tsx`
  - `bun run build` → build with `tsdown`
  - `bun run check` → Biome check/write
  - `prepublishOnly` → Bun build before publish
- `.gitignore`: ignores local `.claude/`, generated plans/brainstorms docs subfolders, and CLI build artifacts.
