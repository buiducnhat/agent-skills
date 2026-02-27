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
│       ├── prompts.ts            # Interactive prompts and cancellation handling
│       ├── fetch.ts              # Git clone + temp directory lifecycle
│       ├── utils.ts              # Arg parsing, copy logic, help/summary output
│       ├── configure.ts          # `ruler.toml` default agent injection/rewrite
│       ├── apply.ts              # Executes `ruler apply` via npx
│       └── constants.ts          # Repository constants + supported agent list
├── templates/
│   ├── .ruler/                   # Agent instructions, scripts, and skills
│   └── .claude/settings.json     # Claude Code status line command
└── docs/                         # Project documentation
```

## Directory responsibilities

- `cli/`: publishable npm package (`@buiducnhat/agent-skills`) containing executable logic.
- `templates/`: canonical template payload copied into consumer repositories.
- `docs/`: product, standards, codebase, and architecture documentation.

## Key entry points and modules

- `cli/src/index.ts`: main flow (`parse args → resolve mode → select agents → fetch templates → copy → configure → apply → summary`).
- `cli/src/utils.ts`: shared utilities for argument parsing, template copy, help text, and install summary.
- `cli/src/fetch.ts`: clones this repository into a temp directory and validates `templates/` exists.
- `cli/src/configure.ts`: ensures `.ruler/ruler.toml` has `default_agents = [...]`.
- `cli/src/apply.ts`: executes `npx --yes @intellectronica/ruler apply --agents ...` with timeout and warning fallback.

## Important scripts and config files

- Root `install.sh`: validates Node 18+ and forwards args to `npx --yes @buiducnhat/agent-skills`.
- `cli/package.json` scripts:
  - `bun run dev` → run CLI from source with `tsx`
  - `bun run build` → build with `tsdown`
  - `bun run check` → Biome check/write
  - `prepublishOnly` → Bun build before publish
- `.gitignore`: ignores local `.claude/`, generated plans/brainstorms docs subfolders, and CLI build artifacts.
