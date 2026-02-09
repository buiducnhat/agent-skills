# Agent Skills

A curated collection of reusable skills for Claude Code (claude.ai/code). Copy the `.claude/` directory and `CLAUDE.md` to your project to enhance Claude Code with structured workflows and specialized capabilities.

## Installation

### One-liner Install (Recommended)

```bash
curl -fsSL https://raw.githubusercontent.com/buiducnhat/agent-skills/main/install.sh | bash
```

### Manual Install

```bash
# Clone this repository
git clone https://github.com/buiducnhat/agent-skills.git

# Copy to your project
cp -r agent-skills/.claude /path/to/your/project/
cp agent-skills/CLAUDE.md /path/to/your/project/
cp agent-skills/update-skills.sh /path/to/your/project/

# Initialize the manifest (tracks which skills are from upstream)
cd /path/to/your/project
./update-skills.sh --init-manifest
```

## Updating Skills

Once installed, you can update to the latest skills while preserving your custom skills:

```bash
# Preview changes
./update-skills.sh --dry-run

# Update skills
./update-skills.sh

# Check status (upstream vs local skills)
./update-skills.sh --status

# Force update (overwrite local modifications)
./update-skills.sh --force
```

### How Updates Work

The update script uses a manifest file (`.claude/.upstream-manifest`) to track which skills came from the repository:

- **Upstream skills**: Skills from this repository are updated automatically
- **Local skills**: Skills you create in `.claude/skills/` are preserved
- **Modified upstream skills**: If you modify an upstream skill, it won't be overwritten (use `--force` to override)

### Creating Custom Skills

Create your own skills in `.claude/skills/your-skill-name/SKILL.md`. These will never be overwritten by updates.

```bash
mkdir -p .claude/skills/my-custom-skill
cat > .claude/skills/my-custom-skill/SKILL.md << 'EOF'
---
name: my-custom-skill
description: Description of what this skill does
---

# My Custom Skill

Your skill instructions here...
EOF
```

## Core Workflow Skills

These skills form the essential development workflow:

| Skill             | Description                                                          |
| ----------------- | -------------------------------------------------------------------- |
| `brainstorm`      | Explore ideas and break down complex problems before planning        |
| `write-plan`      | Create detailed implementation plans with phases and tasks           |
| `execute-plan`    | Execute written plans systematically with checkpoints                |
| `quick-implement` | Rapid implementation for simple tasks or bug fixes                   |
| `fix`             | Diagnose and resolve bugs (suggests `write-plan` for complex issues) |
| `review`          | Review uncommitted changes with codebase context                     |
| `docs`            | Initialize (`--init`) or update (`--update`) project documentation   |

## Workflow Sequences

Choose the appropriate workflow based on task complexity:

### 1. Complex Exploration

```
brainstorm → write-plan → execute-plan
```

**Use Case:** Ambiguous, complex, or high-risk tasks requiring deep exploration and approach validation.

### 2. Standard Development

```
write-plan → execute-plan
```

**Use Case:** Well-defined but complex tasks, major features, or large refactors.

### 3. Rapid Implementation

```
quick-implement
```

**Use Case:** Simple tasks, small bug fixes, or minor tweaks where a formal plan would be overhead.

## Specialized Skills

### Frameworks & Libraries

- `next-best-practices` - Next.js file conventions, RSC, data patterns
- `tanstack-query` - TanStack Query v5 server state management
- `tanstack-table` - TanStack Table v8 headless data tables
- `tanstack-start-best-practices` - TanStack Start full-stack patterns
- `vite` - Vite configuration, plugins, SSR
- `nuqs` - Type-safe URL query state for Next.js
- `turborepo` - Turborepo monorepo build system
- `shadcn-ui` - shadcn/ui component documentation

### React & Vercel

- `vercel-react-best-practices` - React/Next.js performance optimization
- `vercel-react-native-skills` - React Native and Expo best practices
- `vercel-composition-patterns` - React composition patterns

### Documents

- `pdf` - PDF manipulation, extraction, merging
- `docx` - Word document creation and editing
- `pptx` - PowerPoint presentation creation
- `xlsx` - Spreadsheet creation and analysis

### Design

- `ui-ux-pro-max` - UI/UX design intelligence
- `frontend-design` - Production-grade frontend interfaces
- `canvas-design` - Visual art in PNG/PDF using canvas
- `algorithmic-art` - Generative art with p5.js
- `theme-factory` - Styling artifacts with themes
- `brand-guidelines` - Anthropic brand colors and typography

### Development Tools

- `ai-sdk` - AI SDK for building AI-powered features
- `mcp-builder` - MCP server creation guide
- `webapp-testing` - Playwright-based web app testing
- `seo-audit` - SEO diagnostics and auditing
- `slack-gif-creator` - Animated GIFs for Slack
- `better-auth-best-practices` - Better Auth TypeScript framework

### Meta Skills

- `skill-creator` - Guide for creating new skills
- `find-skills` - Discover and install agent skills
- `write-skill` - Create, edit, or verify skills

## Documentation Structure

After running `docs --init`, your project will have:

```
docs/
├── brainstorms/      # Brainstorm artifacts (long-term memory)
├── plans/            # Implementation plans (long-term memory)
├── architecture.md   # System architecture overview
├── code-standard.md  # Code conventions and standards
├── codebase.md       # File tree with explanations
└── project-pdr.md    # Project requirements document
```

## Usage Examples

```bash
# Start a new feature with brainstorming
/brainstorm Add user authentication

# Create a detailed plan
/write-plan Implement OAuth login flow

# Execute the plan
/execute-plan

# Quick fix for simple issues
/quick-implement Fix typo in header

# Review changes before committing
/review

# Initialize documentation
/docs --init

# Update documentation after changes
/docs --update
```

## Documentation

- [Project Requirements](./docs/project-pdr.md)
- [Code Standards](./docs/code-standard.md)
- [Codebase Overview](./docs/codebase.md)
- [Architecture](./docs/architecture.md)

## License

MIT
