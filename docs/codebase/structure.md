# Codebase — Structure

## Directory Tree

```
cobrew/
├── .claude-plugin/        # Generated Claude Code marketplace catalog
├── assets/                # Source plugin assets copied into the generated bundle
├── docs/
│   ├── architecture/       # System/component docs
│   ├── code-standard/      # Conventions and authoring rules
│   ├── codebase/           # Repository structure docs
│   ├── project-pdr/        # Product goals and use cases
│   ├── brainstorms/        # Dated design exploration records
│   ├── plans/              # Dated implementation plans and reports
│   └── SUMMARY.md          # Docs entry point for context loading
├── plugins/
│   └── cobrew/            # Generated self-contained Codex and Claude Code plugin bundle
├── packages/
│   ├── cli/                # Published npm package (cobrew)
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
│   ├── ask/SKILL.md
│   ├── fix/SKILL.md
│   ├── review/SKILL.md
│   ├── brainstorm/SKILL.md
│   ├── docs/
│   │   ├── SKILL.md
│   │   └── references/
│   │       └── summary-template.md
│   ├── execute-plan/SKILL.md
│   ├── git-commit/SKILL.md
│   ├── quick-implement/SKILL.md
│   ├── visualize/
│   │   ├── SKILL.md
│   │   └── references/
│   │       ├── content-patterns.md
│   │       ├── mermaid-recipes.md
│   │       ├── router.md
│   │       ├── verification.md
│   │       ├── workflow.md
│   │       └── templates/
│   │           ├── context.html
│   │           ├── document.html
│   │           ├── plan.html
│   │           └── visualize-theme.css
│   └── write-plan/SKILL.md
├── scripts/
│   └── syncPluginBundle.mjs # Generates plugin bundle and marketplace entries
├── templates/
│   └── AGENTS.md           # Shared rules injected by CLI into agent config files
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

| Path                                       | Role                                                                                                   |
| ------------------------------------------ | ------------------------------------------------------------------------------------------------------ |
| `packages/cli/src/index.ts`                | Main CLI entry — `main()` function                                                                     |
| `packages/cli/src/constants.ts`            | Agent configuration registry and filesystem maps                                                       |
| `packages/cli/src/rules.ts`                | Rules-file creation and idempotent marker replacement                                                  |
| `packages/cli/src/skills.ts`               | Wrapper around `npx skills add` for fallback and multi-agent CLI installs                              |
| `skills/*/SKILL.md`                        | Skill definitions loaded by agent skill CLIs                                                           |
| `plugins/cobrew/.codex-plugin/plugin.json` | Source plugin metadata edited by maintainers                                                           |
| `scripts/syncPluginBundle.mjs`             | Generates the self-contained plugin bundle and marketplace JSON files                                  |
| `plugins/cobrew/`                          | Self-contained bundle used by the Codex and Claude Code plugin paths                                   |
| `.agents/plugins/marketplace.json`         | Codex marketplace catalog pointing at `./plugins/cobrew`                                               |
| `.claude-plugin/marketplace.json`          | Claude Code marketplace catalog pointing at `./plugins/cobrew`                                         |
| `docs/SUMMARY.md`                          | Documentation entry point used by repo instructions and workflow skills                                |
| `templates/AGENTS.md`                      | Shared agent rules template                                                                            |
| `AGENTS.md` / `CLAUDE.md`                  | Repository-level instructions that mirror distributed agent rules                                      |
| `install.sh`                               | Curl-pipe CLI installer for environments without direct `npx` usage                                    |

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
- `skills/` contains first-party authored skills, while `skills-lock.json` references additional upstream skills resolved by the CLI install path.
- `plugins/cobrew/` is generated output, except for the current plugin metadata source at `plugins/cobrew/.codex-plugin/plugin.json`; run `bun run sync:plugin` after changing the plugin manifest, assets, or skill content.
- User-facing docs should recommend the plugin path for Codex and Claude Code first, then document `npx cobrew` as the fallback for other agents and automation.
