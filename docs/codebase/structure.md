# Codebase — Structure

## Directory Tree

```
cobrew/
├── .agents/
│   └── plugins/marketplace.json
├── .claude-plugin/
│   └── marketplace.json
├── docs/
│   ├── architecture/       # System/component docs
│   ├── code-standard/      # Conventions and authoring rules
│   ├── codebase/           # Repository structure docs
│   ├── project-pdr/        # Product goals and use cases
│   ├── plans/              # Archived implementation plans and reports
│   └── SUMMARY.md          # Docs entry point for context loading
├── plugins/
│   └── cobrew/             # Checked-in Codex and Claude Code plugin bundle
│       ├── .codex-plugin/
│       │   ├── plugin.json
│       │   └── assets/logo.png
│       ├── .claude-plugin/plugin.json
│       └── skills/         # First-party workflow skill definitions
│           ├── ask/SKILL.md
│           ├── brainstorm/SKILL.md
│           ├── docs/SKILL.md
│           ├── execute-plan/SKILL.md
│           ├── fix/SKILL.md
│           ├── git-commit/SKILL.md
│           ├── quick-implement/SKILL.md
│           ├── review/SKILL.md
│           ├── visualize/SKILL.md
│           └── write-plan/SKILL.md
├── package.json            # Root Bun scripts and dependencies
├── biome.json              # Linter/formatter config
├── README.md
└── README.vi.md
```

## Key Entry Points

| Path                                        | Role                                                                    |
| ------------------------------------------- | ----------------------------------------------------------------------- |
| `plugins/cobrew/skills/*/SKILL.md`          | Skill definitions loaded from the plugin bundle                         |
| `plugins/cobrew/.codex-plugin/plugin.json`  | Codex plugin metadata edited by maintainers                             |
| `plugins/cobrew/.claude-plugin/plugin.json` | Claude Code plugin metadata edited by maintainers                       |
| `plugins/cobrew/`                           | Self-contained bundle used by the Codex and Claude Code plugin paths    |
| `.agents/plugins/marketplace.json`          | Codex marketplace catalog pointing at `./plugins/cobrew`                |
| `.claude-plugin/marketplace.json`           | Claude Code marketplace catalog pointing at `./plugins/cobrew`          |
| `docs/SUMMARY.md`                           | Documentation entry point used by repo instructions and workflow skills |

## Key Config Files

| File                  | Purpose                                 |
| --------------------- | --------------------------------------- |
| `package.json` (root) | Bun scripts and repo-level dependencies |
| `biome.json`          | Linter + formatter configuration        |

## Documentation Layout

- `docs/architecture/`, `docs/codebase/`, `docs/code-standard/`, and `docs/project-pdr/` are the standard documentation sections maintained by the `docs` skill.
- `docs/plans/<timestamp-slug>/` stores plan summaries, phase files, and `EXECUTION-REPORT.md` files.
- The root instructions tell agents to read `docs/SUMMARY.md` first, then load only the detail files needed for the current task.

## Workspace Notes

- `plugins/cobrew/skills/` contains the maintained first-party workflow skills.
- `plugins/cobrew/` is checked-in plugin output and source; update the relevant manifest, asset, or skill file directly when plugin content changes.
- User-facing docs should recommend `codex plugin marketplace add buiducnhat/cobrew` and `claude plugin marketplace add buiducnhat/cobrew` first, then document `npx skills add buiducnhat/cobrew` for other agents and plugin-unavailable environments.
