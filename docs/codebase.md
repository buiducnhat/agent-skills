# Codebase Map

## High-level tree

```text
.
├── install.sh                    # Curl|bash installer wrapper
├── cli/
│   ├── package.json              # Package metadata, scripts, dependencies, bin
│   ├── biome.json                # Formatting/lint configuration
│   ├── tsconfig.json             # TypeScript compiler options
│   ├── tsdown.config.ts          # Build/bundling config
│   └── src/
│       ├── index.ts              # CLI entrypoint and install orchestration
│       ├── skills.ts             # Skills CLI execution and agent detection
│       ├── rules.ts              # Agent rules file mapping and marker-based injection
│       ├── fetch.ts              # Git clone + temp directory lifecycle
│       ├── utils.ts              # Arg parsing, copy logic, help/summary output
│       └── constants.ts          # Repository constants, agent maps, marker strings
├── templates/
│   ├── AGENTS.md                 # Shared agent instructions injected into rules files
│   └── .claude/                  # Claude Code settings and scripts
└── docs/                         # Project documentation
```

## Directory responsibilities

- `cli/`: publishable npm package (`@buiducnhat/agent-skills`) containing executable logic.
- `templates/`: canonical template payload copied into consumer repositories.
- `docs/`: product, standards, codebase, and architecture documentation.

## Key entry points and modules

- `cli/src/index.ts`: main flow (`parse args → run skills CLI → detect agents → fetch templates → inject rules → copy .claude/ → summary`).
- `cli/src/skills.ts`: spawns `npx skills add`, captures output, detects agents via output parsing or filesystem scan.
- `cli/src/rules.ts`: maps agent identifiers to rules file paths, performs marker-based injection of `AGENTS.md` content.
- `cli/src/fetch.ts`: clones this repository into a temp directory and validates `templates/AGENTS.md` and `templates/.claude/` exist.
- `cli/src/utils.ts`: shared utilities — arg parsing, `.claude/` template copy, help text, install summary.
- `cli/src/constants.ts`: `REPO_URL`, `REPO_BRANCH`, `AGENT_SKILLS_DIRS`, `AGENT_RULES_MAP`, marker constants.

## Important scripts and config files

- Root `install.sh`: validates Node 18+ and forwards args to `npx --yes @buiducnhat/agent-skills`.
- `cli/package.json` scripts:
  - `bun run dev` → run CLI from source with `tsx`
  - `bun run build` → build with `tsdown`
  - `bun run check` → Biome check/write
  - `prepublishOnly` → Bun build before publish
- `.gitignore`: ignores local `.claude/`, generated plans/brainstorms docs subfolders, and CLI build artifacts.
