# Code Standard

## Stack and tools

- Language: TypeScript (ESM), targeting Node.js 18+
- Runtime/packaging: Node.js, npm/npx (with Bun used in `prepublishOnly` script)
- Build: `tsdown`
- Lint/format: Biome (`biome check --write`)
- CLI UX: `@clack/prompts` + `picocolors`

## Repository conventions

- Source code lives in `cli/src`
- Distributed CLI artifact is emitted to `cli/dist`
- Templates to be installed into user projects are stored under `templates/`
- `templates/AGENTS.md` and `templates/.claude/` are first-class project assets

## TypeScript conventions

- `strict` mode enabled in `tsconfig.json`
- ESM import style with explicit `.js` extensions for local runtime imports
- Avoid unnecessary abstractions; keep command flow linear and explicit
- Use descriptive identifiers (no single-letter variables outside short local contexts)

## Formatting and linting

- Use tabs for indentation
- Prefer double quotes in JavaScript/TypeScript
- Run:
  - `npm run check` (Biome fix + checks)
  - `npm run build` (tsdown)

## CLI behavior conventions

- Parse and handle CLI flags before interactive prompts
- Non-interactive mode must avoid prompt dependencies
- On recoverable external tool failures (for example skills CLI failure), warn and provide manual command fallback
- Always clean temporary clone directories in `finally` blocks

## Testing and quality expectations

- No dedicated automated test suite is currently defined in `cli/package.json`
- Quality gate is currently lint/format + successful build + manual CLI verification

## Commit and PR expectations (inferred)

- Keep changes scoped and task-focused
- Update `docs/` when behavior, architecture, or workflow changes
- Ensure generated documentation remains aligned with current CLI behavior
