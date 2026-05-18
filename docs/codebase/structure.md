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
├── package.json            # Root Bun scripts and dependencies
├── skills-lock.json        # Pinned upstream skill sources and hashes
├── biome.json              # Linter/formatter config
├── README.md
└── README.vi.md
```

## Key Entry Points

| Path                                       | Role                                                                    |
| ------------------------------------------ | ----------------------------------------------------------------------- |
| `skills/*/SKILL.md`                        | Skill definitions loaded by agent skill CLIs                            |
| `plugins/cobrew/.codex-plugin/plugin.json` | Source plugin metadata edited by maintainers                            |
| `scripts/syncPluginBundle.mjs`             | Generates the self-contained plugin bundle and marketplace JSON files   |
| `plugins/cobrew/`                          | Self-contained bundle used by the Codex and Claude Code plugin paths    |
| `.agents/plugins/marketplace.json`         | Codex marketplace catalog pointing at `./plugins/cobrew`                |
| `.claude-plugin/marketplace.json`          | Claude Code marketplace catalog pointing at `./plugins/cobrew`          |
| `docs/SUMMARY.md`                          | Documentation entry point used by repo instructions and workflow skills |

## Key Config Files

| File                  | Purpose                                 |
| --------------------- | --------------------------------------- |
| `package.json` (root) | Bun scripts and repo-level dependencies |
| `biome.json`          | Linter + formatter configuration        |
| `skills-lock.json`    | Locked source hashes for pinned skills  |

## Documentation Layout

- `docs/architecture/`, `docs/codebase/`, `docs/code-standard/`, and `docs/project-pdr/` are the standard documentation sections maintained by the `docs` skill.
- `docs/brainstorms/<timestamp-slug>/SUMMARY.md` stores dated exploration artifacts.
- `docs/plans/<timestamp-slug>/` stores plan summaries, phase files, and `EXECUTION-REPORT.md` files.
- The root instructions tell agents to read `docs/SUMMARY.md` first, then load only the detail files needed for the current task.

## Workspace Notes

- `skills/` contains first-party authored skills, while `skills-lock.json` references additional upstream skills resolved by the direct skills CLI path.
- `plugins/cobrew/` is generated output, except for the current plugin metadata source at `plugins/cobrew/.codex-plugin/plugin.json`; run `bun run sync:plugin` after changing the plugin manifest, assets, or skill content.
- User-facing docs should recommend `codex plugin marketplace add buiducnhat/cobrew` and `claude plugin marketplace add buiducnhat/cobrew` first, then document `npx skills add buiducnhat/cobrew` for other agents and plugin-unavailable environments.
