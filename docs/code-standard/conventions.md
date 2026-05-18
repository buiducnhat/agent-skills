# Code Standard — Conventions

## Working Style

- Follow a docs-first workflow: read `docs/SUMMARY.md` before planning or implementing, then load only the detail files needed for the current task.
- Treat the `Code Standard` docs as the primary source for repository conventions. If code and docs conflict, clarify the intended behavior before making broad changes.
- Keep workflow skills self-contained for context loading: when a skill needs project context, it should state how to read `docs/SUMMARY.md`, load only relevant detail docs, prioritize `Code Standard`, and use the available question tool when docs conflict with code or user intent.
- Apply YAGNI, KISS, DRY, SOLID, and the principle of least surprise.

## Question Handling

- Use the environment's question tool when clarification is required.
- Ask exactly one question per message.
- Prefer 2-5 selectable options when practical.
- Do not interrupt execution with unnecessary questions if the answer can be inferred safely from the repository.

## Runtime

- **Bun** as package manager and script runner (v1.3.9+)
- `"type": "module"` — scripts use ES Module syntax

## Tooling

| Tool         | Role          | Config       |
| ------------ | ------------- | ------------ |
| Biome 2.4.12 | Lint + format | `biome.json` |

Primary repository commands:

- `bun run build` — regenerates the plugin bundle
- `bun run sync:plugin` — regenerates `plugins/cobrew/` plus Codex and Claude Code marketplace metadata from the root plugin source
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

## Commit & PR Convention

Commits follow: `feat:`, `fix:`, `chore:` prefixes (conventional commits style, evident from `git log`).

## Skills Authoring

- Each skill lives in `skills/<name>/SKILL.md` with YAML frontmatter (`name`, `description`)
- Reference assets go in `skills/<name>/references/`
- Skill names use kebab-case
- The `description` field is the discovery surface for skill invocation, so trigger phrases belong there
- Skill instructions should include self-contained context-loading guidance.

## Documentation Authoring

- Standard reference docs live in `docs/architecture/`, `docs/codebase/`, `docs/code-standard/`, and `docs/project-pdr/`.
- Historical artifacts live in dated folders under `docs/brainstorms/` and `docs/plans/`.
- Brainstorm and plan folders use timestamped slugs such as `260306-1317-global-flag`.
- Plan folders use `SUMMARY.md`, `phase-01-*.md`, and `EXECUTION-REPORT.md` naming patterns.
- Documentation should stay factual and implementation-backed; avoid invented requirements.
- User-facing docs should position `codex plugin marketplace add buiducnhat/cobrew` and `claude plugin marketplace add buiducnhat/cobrew` as the recommended setup path, with `npx skills add buiducnhat/cobrew` for other agents and plugin-unavailable environments.

## Ignored by Biome

`dist/`, `.claude/`, `.agents/`, `.cursor/`, `.qwen/`, `bun.lock`
