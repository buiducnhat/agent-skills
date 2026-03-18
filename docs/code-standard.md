# Code Standard

## Stack and tools

- Language: TypeScript (ESM), targeting Node.js 18+
- Runtime/packaging: Node.js, npm/npx (with Bun as package manager, `bun@1.3.9`)
- Build: `tsdown` (v0.21+)
- Lint/format: Biome v2.4+ (`biome check --write --unsafe`)
- CLI UX: `@clack/prompts` + `picocolors`
- Monorepo orchestration: Turbo

## Repository conventions

- CLI source code lives in `packages/cli/src`
- Distributed CLI artifact is emitted to `packages/cli/dist`
- Workflow skill definitions live in `skills/<skill-name>/SKILL.md` (distributed via Vercel skills CLI)
- Templates to be installed into user projects are stored under `templates/`
- `templates/AGENTS.md` and `templates/.claude/` are first-class project assets
- Monorepo workspaces: `apps/*` and `packages/*`

## TypeScript conventions

- `strict` mode enabled in `tsconfig.json`
- ESM import style with explicit `.js` extensions for local runtime imports
- Avoid unnecessary abstractions; keep command flow linear and explicit
- Use descriptive identifiers (no single-letter variables outside short local contexts)

## Formatting and linting

- Use tabs for indentation
- Prefer double quotes in JavaScript/TypeScript
- Run:
  - `bun run check` (Biome fix + checks with `--unsafe` at workspace root)
  - `bun run build` (Turbo build across packages)
  - `cd packages/cli && bun run build` (CLI-only build with tsdown)

## CLI behavior conventions

- Parse and handle CLI flags before interactive prompts
- Non-interactive mode must avoid prompt dependencies
- Supported flags are `--non-interactive`, `--copy`, `--global`/`-g`, `--help`, and `--version`
- On recoverable external tool failures (for example skills CLI failure), warn and provide manual command fallback
- Always clean temporary clone directories in `finally` blocks

## Testing and quality expectations

- No dedicated automated test suite is currently defined in `packages/cli/package.json`
- Quality gate is currently lint/format + successful build + manual CLI verification

## Commit and PR expectations (inferred)

- Keep changes scoped and task-focused
- Update `docs/` when behavior, architecture, or workflow changes
- Ensure generated documentation remains aligned with current CLI behavior
