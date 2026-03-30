# Codebase — Structure

## Directory Tree

```
agent-skills/
├── packages/
│   ├── cli/               # Published npm package (@buiducnhat/agent-skills)
│   │   ├── src/
│   │   │   ├── index.ts       # Entry point — CLI flow
│   │   │   ├── constants.ts   # Agent registry, rules-file map, dir map
│   │   │   ├── fetch.ts       # Git clone templates to temp dir
│   │   │   ├── rules.ts       # Inject AGENTS.md into agent rules files
│   │   │   ├── skills.ts      # Shell out to npx skills add
│   │   │   └── utils.ts       # Arg parsing, agent detection, output
│   │   ├── package.json
│   │   ├── tsconfig.json
│   │   └── tsdown.config.ts
│   └── config/            # Shared TS config (tsconfig.base.json)
├── skills/                # First-party skill definitions
│   ├── as-fix/SKILL.md
│   ├── as-review/SKILL.md
│   ├── ask/SKILL.md
│   ├── brainstorm/SKILL.md
│   ├── docs/
│   │   ├── SKILL.md
│   │   └── references/
│   │       └── summary-template.md
│   ├── execute-plan/SKILL.md
│   ├── quick-implement/SKILL.md
│   └── write-plan/SKILL.md
├── templates/
│   └── AGENTS.md          # Shared rules injected into agent config files
├── CLAUDE.md              # Claude Code instructions (Context Loading Protocol)
├── biome.json             # Linter/formatter config
├── turbo.json             # Turbo task pipeline
├── package.json           # Root workspace (Bun)
├── skills-lock.json       # Pinned skill source hashes
├── install.sh             # Shell-script installer (curl | bash)
└── README.md
```

## Key Entry Points

| Path | Role |
|------|------|
| `packages/cli/src/index.ts` | Main CLI entry — `main()` function |
| `packages/cli/src/constants.ts` | Agent configuration registry |
| `skills/*/SKILL.md` | Skill definitions loaded by agent skill CLIs |
| `templates/AGENTS.md` | Shared agent rules template |
| `install.sh` | Curl-pipe installer for environments without npx |

## Key Config Files

| File | Purpose |
|------|---------|
| `package.json` (root) | Bun workspace definition, dev scripts |
| `turbo.json` | Build/lint/dev task pipeline |
| `biome.json` | Linter + formatter (tabs, double quotes, import organization) |
| `skills-lock.json` | Locked source hashes for pinned skills |
| `packages/config/tsconfig.base.json` | Shared TS compiler config |

## Build Output

`packages/cli` compiles to `packages/cli/dist/index.js` via `tsdown`. The `dist/` directory is the only published artifact (see `files` in `packages/cli/package.json`).
