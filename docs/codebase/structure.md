# Codebase — Structure

## Directory Tree

```
agent-skills/
├── docs/
│   ├── architecture/       # System/component docs
│   ├── code-standard/      # Conventions and authoring rules
│   ├── codebase/           # Repository structure docs
│   ├── project-pdr/        # Product goals and use cases
│   ├── brainstorms/        # Dated design exploration records
│   ├── plans/              # Dated implementation plans and reports
│   └── SUMMARY.md          # Docs entry point for context loading
├── packages/
│   ├── cli/                # Published npm package (@buiducnhat/agent-skills)
│   │   ├── src/
│   │   │   ├── index.ts        # Entry point — CLI flow
│   │   │   ├── constants.ts    # Agent registry, rules-file map, dir map
│   │   │   ├── fetch.ts        # Clone templates to a temp dir
│   │   │   ├── rules.ts        # Inject AGENTS.md into agent rules files
│   │   │   ├── skills.ts       # Shell out to npx skills add
│   │   │   └── utils.ts        # Arg parsing, agent detection, output
│   │   ├── package.json
│   │   ├── tsconfig.json
│   │   └── tsdown.config.ts
│   └── config/             # Shared TS config (tsconfig.base.json)
├── skills/                 # First-party workflow skill definitions
│   ├── as-ask/SKILL.md
│   ├── as-fix/SKILL.md
│   ├── as-review/SKILL.md
│   ├── brainstorm/SKILL.md
│   ├── docs/
│   │   ├── SKILL.md
│   │   └── references/
│   │       └── summary-template.md
│   ├── execute-plan/SKILL.md
│   ├── quick-implement/SKILL.md
│   └── write-plan/SKILL.md
├── templates/
│   └── AGENTS.md           # Shared rules injected into agent config files
├── tmp/                    # Local scratch files used during repository work
├── AGENTS.md               # Repository instruction file
├── CLAUDE.md               # Mirrored repository instruction file
├── install.sh              # Shell-script installer (curl | bash)
├── package.json            # Root Bun workspace
├── skills-lock.json        # Pinned upstream skill sources and hashes
├── turbo.json              # Turbo task pipeline
├── biome.json              # Linter/formatter config
├── README.md
└── README.vi.md
```

## Key Entry Points

| Path                            | Role                                                                    |
| ------------------------------- | ----------------------------------------------------------------------- |
| `packages/cli/src/index.ts`     | Main CLI entry — `main()` function                                      |
| `packages/cli/src/constants.ts` | Agent configuration registry and filesystem maps                        |
| `packages/cli/src/rules.ts`     | Rules-file creation and idempotent marker replacement                   |
| `packages/cli/src/skills.ts`    | Wrapper around `npx skills add`                                         |
| `skills/*/SKILL.md`             | Skill definitions loaded by agent skill CLIs                            |
| `docs/SUMMARY.md`               | Documentation entry point used by repo instructions and workflow skills |
| `templates/AGENTS.md`           | Shared agent rules template                                             |
| `AGENTS.md` / `CLAUDE.md`       | Repository-level instructions that mirror distributed agent rules       |
| `install.sh`                    | Curl-pipe installer for environments without npx                        |

## Key Config Files

| File                                 | Purpose                                                          |
| ------------------------------------ | ---------------------------------------------------------------- |
| `package.json` (root)                | Bun workspace definition and repo-level scripts                  |
| `packages/cli/package.json`          | Published package metadata, CLI binary, and runtime dependencies |
| `turbo.json`                         | Build/lint/dev task pipeline                                     |
| `biome.json`                         | Linter + formatter configuration                                 |
| `skills-lock.json`                   | Locked source hashes for pinned skills                           |
| `packages/config/tsconfig.base.json` | Shared TS compiler config                                        |

## Build Output

`packages/cli` compiles to `packages/cli/dist/index.js` via `tsdown`. The `dist/` directory is the only published artifact listed in `packages/cli/package.json`.

## Documentation Layout

- `docs/architecture/`, `docs/codebase/`, `docs/code-standard/`, and `docs/project-pdr/` are the standard documentation sections maintained by the `docs` skill.
- `docs/brainstorms/<timestamp-slug>/SUMMARY.md` stores dated exploration artifacts.
- `docs/plans/<timestamp-slug>/` stores plan summaries, phase files, and `EXECUTION-REPORT.md` files.
- The root instructions tell agents to read `docs/SUMMARY.md` first, then load only the detail files needed for the current task.

## Workspace Notes

- The workspace pattern allows `apps/*` and `packages/*`, but the current repository only uses `packages/cli` and `packages/config`.
- `skills/` contains first-party authored skills, while `skills-lock.json` references additional upstream skills resolved by the skills CLI.
