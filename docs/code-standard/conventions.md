# Code Standard — Conventions

## Language & Runtime

- **TypeScript** (strict) across all packages
- **Bun** as runtime and package manager (v1.3.9+)
- **Node.js 18+** required for CLI consumers (ESM, no CJS)
- `"type": "module"` — all source is ES Module

## Tooling

| Tool | Role | Config |
|------|------|--------|
| Biome 2.4.5 | Lint + format | `biome.json` |
| tsdown | Bundle CLI package | `tsdown.config.ts` |
| Turbo | Monorepo task orchestration | `turbo.json` |

## Formatting (Biome)

- Indent style: **tabs**
- Quotes: **double** (JS/TS)
- Import organization: **auto-sorted** (`organizeImports: "on"`)
- Linter: `recommended` ruleset enabled

Run via: `bun run check` (root) or `bun run check` inside a package.

## Naming Conventions

- **Files**: camelCase for modules (`constants.ts`, `fetch.ts`, `rules.ts`)
- **Functions**: camelCase (`injectRules`, `runSkillsAdd`, `fetchTemplates`)
- **Interfaces**: PascalCase (`AgentInfo`, `CliArgs`, `RulesInjectionResult`)
- **Constants**: SCREAMING_SNAKE_CASE for primitive exports (`REPO_URL`, `RULES_MARKER_START`)
- **Records/Maps**: camelCase (`AGENT_RULES_MAP`, `AGENT_SKILLS_DIRS` are screaming because exported constants)

## Module Structure

Each source module has a single clear responsibility (see `src/` split). No barrel `index.ts` re-exports within `src/` — modules are imported directly.

## Commit & PR Convention

Commits follow: `feat:`, `fix:`, `chore:` prefixes (conventional commits style, evident from `git log`).

## Skills Authoring

- Each skill lives in `skills/<name>/SKILL.md` with YAML frontmatter (`name`, `description`)
- Reference assets go in `skills/<name>/references/`
- Skill names use kebab-case

## Ignored by Biome

`dist/`, `.turbo/`, `.claude/`, `.agents/`, `.cursor/`, `.qwen/`, `bun.lock`
