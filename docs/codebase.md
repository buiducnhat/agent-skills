# Codebase Overview

## Directory Structure

```
agent-skills/
├── .claude/                    # Claude Code configuration
│   ├── lib/                    # Shared utilities
│   │   └── skills-core.js      # Skill discovery and management
│   ├── scripts/                # Utility scripts
│   │   ├── context-bar.sh      # Visual status bar for Claude Code
│   │   ├── get-time.sh         # Time utility
│   │   └── update-skills.sh    # Manifest-based skill updater
│   └── skills/                 # Skill definitions (42 skills)
│       ├── ai-sdk/
│       ├── algorithmic-art/
│       ├── better-auth-best-practices/
│       ├── brainstorm/
│       ├── brand-guidelines/
│       ├── canvas-design/
│       ├── doc-coauthoring/
│       ├── docs/
│       ├── docx/
│       ├── execute-plan/
│       ├── find-skills/
│       ├── fix/
│       ├── frontend-design/
│       ├── internal-comms/
│       ├── mcp-builder/
│       ├── next-best-practices/
│       ├── nuqs/
│       ├── pdf/
│       ├── pptx/
│       ├── quick-implement/
│       ├── review/
│       ├── seo-audit/
│       ├── shadcn-ui/
│       ├── skill-creator/
│       ├── slack-gif-creator/
│       ├── tanstack-query/
│       ├── tanstack-start-best-practices/
│       ├── tanstack-table/
│       ├── template-skill/
│       ├── theme-factory/
│       ├── turborepo/
│       ├── ui-ux-pro-max/
│       ├── vercel-composition-patterns/
│       ├── vercel-react-best-practices/
│       ├── vercel-react-native-skills/
│       ├── vite/
│       ├── web-artifacts-builder/
│       ├── web-design-guidelines/
│       ├── webapp-testing/
│       ├── write-plan/
│       ├── write-skill/
│       └── xlsx/
├── tests/                      # Unit tests
│   └── test-update-skills.sh   # Tests for update-skills.sh
├── docs/                       # Project documentation
│   ├── brainstorms/            # Brainstorm artifacts
│   ├── plans/                  # Implementation plans
│   ├── architecture.md
│   ├── code-standard.md
│   ├── codebase.md
│   └── project-pdr.md
├── .gitignore
├── CLAUDE.md                   # Claude Code workflow configuration
└── README.md                   # Project overview
```

## Key Files

### CLAUDE.md

Root configuration file that defines:

- Core workflow skills and their descriptions
- Documentation rules and structure
- Workflow sequences (Complex → Standard → Rapid)
- Critical rules for Claude Code behavior

### .claude/lib/skills-core.js

JavaScript module providing skill management utilities:

| Function                                                   | Purpose                                        |
| ---------------------------------------------------------- | ---------------------------------------------- |
| `extractFrontmatter(filePath)`                             | Parse YAML frontmatter from SKILL.md           |
| `findSkillsInDir(dir, sourceType, maxDepth)`               | Recursively find all skills in directory       |
| `resolveSkillPath(skillName, superpowersDir, personalDir)` | Resolve skill name to file path with shadowing |
| `checkForUpdates(repoDir)`                                 | Check if git repository has updates            |
| `stripFrontmatter(content)`                                | Remove YAML frontmatter from content           |

### Skill Categories

| Category         | Skills                                                                                                    |
| ---------------- | --------------------------------------------------------------------------------------------------------- |
| **Workflow**     | brainstorm, write-plan, execute-plan, quick-implement, fix, review, docs                                  |
| **Frameworks**   | next-best-practices, tanstack-query, tanstack-table, tanstack-start-best-practices, vite, nuqs, turborepo |
| **React/Vercel** | vercel-react-best-practices, vercel-react-native-skills, vercel-composition-patterns                      |
| **Documents**    | pdf, docx, pptx, xlsx                                                                                     |
| **Design**       | ui-ux-pro-max, frontend-design, canvas-design, algorithmic-art, theme-factory, brand-guidelines           |
| **Tools**        | mcp-builder, webapp-testing, seo-audit, slack-gif-creator                                                 |
| **Auth**         | better-auth-best-practices                                                                                |
| **AI**           | ai-sdk                                                                                                    |
| **Meta**         | skill-creator, find-skills, template-skill, write-skill                                                   |

### .claude/scripts/

Utility scripts for project management:

| Script             | Purpose                                                                                                                                  |
| ------------------ | ---------------------------------------------------------------------------------------------------------------------------------------- |
| `update-skills.sh` | Manifest-based updater — fetches upstream, syncs files while preserving local skills, tracks file hashes in `.claude/.upstream-manifest` |
| `context-bar.sh`   | Visual status bar showing model, git branch, sync status, and context window usage                                                       |
| `get-time.sh`      | Time utility                                                                                                                             |

#### update-skills.sh Key Features

- **Manifest tracking:** File format `path:hash:version` in `.claude/.upstream-manifest`
- **Change counters:** Tracks `FILES_CREATED`, `FILES_UPDATED`, `FILES_UNCHANGED`, `FILES_SKIPPED` with summary reporting
- **Backup rotation:** Keeps last N backups in `.claude-backup_TIMESTAMP/` directories
- **Modes:** `--dry-run`, `--force`, `--status`, `--init-manifest`

### tests/

| File                    | Purpose                                                                                                            |
| ----------------------- | ------------------------------------------------------------------------------------------------------------------ |
| `test-update-skills.sh` | 36 unit tests for update-skills.sh core functions (hashing, manifest, sync, dry-run, backup rotation, arg parsing) |
