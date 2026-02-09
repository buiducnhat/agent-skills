---
name: docs
description: Initialize or update project documentation. Use this skill when you need to set up documentation for the first time (--init) or update existing documentation (--update). It scouts the project structure, business requirements, tech stack, codebase, and architecture, then creates/updates comprehensive documentation files.
---

# Docs Skill

This skill helps you create and maintain comprehensive project documentation.

## Parameters

- `--init`: First-time setup - creates new documentation files from scratch
- `--update`: Update existing documentation files without recreating them

## Documentation Files

The skill creates/updates the following files in the `docs/` directory:

1. **project-pdr.md** - Project requirements and business logic
2. **code-standard.md** - Code conventions, tech stack, and development rules
3. **codebase.md** - File/code tree with explanations
4. **architecture.md** - Architecture components and their interactions

Additionally, it updates `README.md` with project overview and links to documentation.

## Execution Workflow

### 1. Initial Assessment

First, explore the project structure to understand:

- Root directory contents and organization
- Package managers (package.json, pnpm-lock.yaml, yarn.lock, etc.)
- Configuration files (tsconfig, next.config, vite.config, etc.)
- README files for existing documentation
- Source code structure (apps/, packages/, src/, etc.)
- Build tools and frameworks
- Database schemas or migrations
- API routes or backend structure
- Cloud/deployment configurations
- CI/CD pipelines

### 2. Parameter-Based Action

#### With `--init` (First-time setup)

- Scout the entire project structure comprehensively
- Ask clarifying questions about business requirements, tech stack decisions, and architectural choices
- Create the `docs/` directory if it doesn't exist
- Create all 4 documentation files with complete content
- Update `README.md` with project overview and documentation links

#### With `--update` (Update existing)

- Review existing documentation files
- Scout project changes since last update
- Update existing files with new information
- Preserve user modifications unless they conflict with new information
- Update `README.md` if necessary

### 3. Content Generation

For each documentation file, gather information:

#### project-pdr.md

- Project purpose and goals
- Target users and use cases
- Business requirements
- Features and functionality
- Problem being solved
- Success metrics

**Ask user if unclear:**

- What is the main business goal of this project?
- Who are the primary users?
- What key problems does it solve?

#### code-standard.md

- Tech stack details (frameworks, libraries, tools)
- Code conventions (naming, file structure, patterns)
- Development rules (linting, formatting, testing)
- Branching strategy
- Commit message conventions
- PR review guidelines

**Ask user if unclear:**

- What coding conventions are enforced?
- What are the development rules?
- Any specific patterns to follow?

#### codebase.md

- Complete file tree structure
- Key directories and their purposes
- Important files and their roles
- Entry points
- Shared utilities
- Configuration files

**Ask user if unclear:**

- What are the most important parts of the codebase?
- Any special patterns or organization to highlight?

#### architecture.md

- System components (frontend, backend, database, services)
- Monorepo structure if applicable
- Data flow between components
- API endpoints and contracts
- Database schemas
- External integrations
- Deployment architecture
- Cloud infrastructure

**Ask user if unclear:**

- What are the main architectural components?
- How do they interact?
- Any specific architectural patterns used?

### 4. README Update

Add or update:

- Project overview (what the project does)
- Key features
- Tech stack summary
- Quick start instructions
- Documentation links section:

  ```markdown
  ## Documentation

  - [Project Requirements](./docs/project-pdr.md)
  - [Code Standards](./docs/code-standard.md)
  - [Codebase Overview](./docs/codebase.md)
  - [Architecture](./docs/architecture.md)
  ```

## Best Practices

- **Be thorough but concise**: Include all relevant information without verbosity
- **Use code blocks**: For file paths, code snippets, and configuration examples
- **Include tree structures**: Use ASCII art or markdown lists for directory structures
- **Link references**: Cross-reference between documentation files where appropriate
- **Maintain consistency**: Use consistent formatting and terminology across all files
- **Ask smart questions**: When information is missing or ambiguous, ask targeted questions to the user

## When to Ask Questions

Ask the user for clarification when:

- Business requirements or goals are not clear from code/configuration
- Multiple tech stack options exist and usage is ambiguous
- Architectural decisions need context
- Code conventions are not enforced through tools
- The purpose of certain components is unclear
- Business logic or domain-specific knowledge is needed

## File Structure Example

```
cc-dev/
├── README.md                    # Updated with docs links
└── docs/
    ├── project-pdr.md           # Business requirements
    ├── code-standard.md        # Coding conventions
    ├── codebase.md             # File tree and explanations
    └── architecture.md         # Architecture overview
```

## Notes

- Always verify the project root path (use the provided root directories)
- Use `grep` to search for specific patterns in the codebase
- Use `find_path` to locate files when the path is unknown
- For monorepos, clearly distinguish between different apps/packages
- When updating, preserve user comments and custom sections unless they conflict with accurate information
