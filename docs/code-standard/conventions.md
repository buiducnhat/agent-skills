# Code Standard — Conventions

## Working Style

- Follow a docs-first workflow: read `docs/SUMMARY.md` before planning or implementing, then load only the detail files needed for the current task.
- Treat the `Code Standard` docs as the primary source for repository conventions. If code and docs conflict, clarify the intended behavior before making broad changes.
- Apply YAGNI, KISS, DRY, SOLID, and the principle of least surprise.

## Question Handling

- Use the environment's question tool when clarification is required.
- Ask exactly one question per message.
- Prefer 2-5 selectable options when practical.
- Do not interrupt execution with unnecessary questions if the answer can be inferred safely from the repository.

## Language & Runtime

- **TypeScript** (strict) across all packages
- **Bun** as runtime and package manager (v1.3.9+)
- **Node.js 18+** required for CLI consumers (ESM, no CJS)
- `"type": "module"` — all source is ES Module

## Tooling

| Tool        | Role                        | Config             |
| ----------- | --------------------------- | ------------------ |
| Biome 2.4.5 | Lint + format               | `biome.json`       |
| tsdown      | Bundle CLI package          | `tsdown.config.ts` |
| Turbo       | Monorepo task orchestration | `turbo.json`       |

Primary repository commands:

- `bun run build` — runs Turbo build tasks
- `bun run check-types` — runs Turbo type checks
- `bun run check` — runs `biome check --write --unsafe .` at the repo root

## Formatting (Biome)

- Indent style: **tabs**
- Quotes: **double** (JS/TS)
- Import organization: **auto-sorted** (`organizeImports: "on"`)
- Linter: `recommended` ruleset enabled

`bun run check` at the root is not read-only. It can rewrite files across the repository because it uses `--write --unsafe`, so review diffs after running it.

## Naming Conventions

- **Files**: camelCase for modules (`constants.ts`, `fetch.ts`, `rules.ts`)
- **Functions**: camelCase (`injectRules`, `runSkillsAdd`, `fetchTemplates`)
- **Interfaces**: PascalCase (`AgentInfo`, `CliArgs`, `RulesInjectionResult`)
- **Constants**: SCREAMING_SNAKE_CASE for primitive exports (`REPO_URL`, `RULES_MARKER_START`)
- **Records/Maps**: exported registries remain SCREAMING_SNAKE_CASE when they act like constant lookup tables (`AGENT_RULES_MAP`, `AGENT_SKILLS_DIRS`)
- **Skill folders**: kebab-case and matched to the `name` field in `SKILL.md`

## Module Structure

Each source module has a single clear responsibility (see `src/` split). No barrel `index.ts` re-exports within `src/` — modules are imported directly.

The CLI code is intentionally split by responsibility:

- `index.ts` orchestrates the flow
- `utils.ts` handles parsing and presentation helpers
- `skills.ts` handles the external skills CLI process
- `fetch.ts` handles template download and cleanup
- `rules.ts` handles file mutation

## Commit & PR Convention

Commits follow: `feat:`, `fix:`, `chore:` prefixes (conventional commits style, evident from `git log`).

## Skills Authoring

- Each skill lives in `skills/<name>/SKILL.md` with YAML frontmatter (`name`, `description`)
- Reference assets go in `skills/<name>/references/`
- Skill names use kebab-case
- The `description` field is the discovery surface for skill invocation, so trigger phrases belong there
- Skill instructions should follow the shared context-loading and question-tool mandates from the repository rules

## Documentation Authoring

- Standard reference docs live in `docs/architecture/`, `docs/codebase/`, `docs/code-standard/`, and `docs/project-pdr/`.
- Historical artifacts live in dated folders under `docs/brainstorms/` and `docs/plans/`.
- Brainstorm and plan folders use timestamped slugs such as `260306-1317-global-flag`.
- Plan folders use `SUMMARY.md`, `phase-01-*.md`, and `EXECUTION-REPORT.md` naming patterns.
- Documentation should stay factual and implementation-backed; avoid invented requirements.

## Ignored by Biome

`dist/`, `.turbo/`, `.claude/`, `.agents/`, `.cursor/`, `.qwen/`, `bun.lock`
