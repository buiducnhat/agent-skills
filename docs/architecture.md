# Architecture

## System Overview

Agent Skills is a template repository containing Claude Code configurations and skills that can be copied to other projects.

```
┌─────────────────────────────────────────────────────────┐
│                    Target Project                       │
│  ┌─────────────────────────────────────────────────┐    │
│  │                   CLAUDE.md                     │    │
│  │         (Workflow configuration)                │    │
│  └─────────────────────────────────────────────────┘    │
│                         │                               │
│                         ▼                               │
│  ┌─────────────────────────────────────────────────┐    │
│  │                   .claude/                      │    │
│  │  ┌─────────────┐    ┌─────────────────────┐     │    │
│  │  │    lib/     │    │      skills/        │     │    │
│  │  │             │    │                     │     │    │
│  │  │ skills-core │◄───│  skill-1/SKILL.md   │     │    │
│  │  │    .js      │    │  skill-2/SKILL.md   │     │    │
│  │  │             │    │  skill-n/SKILL.md   │     │    │
│  │  └─────────────┘    └─────────────────────┘     │    │
│  └─────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────┘
```

## Component Details

### 1. CLAUDE.md (Workflow Configuration)

**Purpose:** Define how Claude Code should behave in the project.

**Responsibilities:**

- Document available workflow skills
- Define workflow sequences
- Set documentation rules
- Establish critical behavioral rules

### 2. Skills Library (.claude/lib/)

**Purpose:** Provide reusable utilities for skill management.

**Key Module: skills-core.js**

```
┌─────────────────────────────────────────┐
│           skills-core.js                │
├─────────────────────────────────────────┤
│ extractFrontmatter()                    │
│   └─ Parse YAML from SKILL.md           │
│                                         │
│ findSkillsInDir()                       │
│   └─ Discover skills recursively        │
│                                         │
│ resolveSkillPath()                      │
│   └─ Handle skill shadowing             │
│                                         │
│ checkForUpdates()                       │
│   └─ Git update detection               │
│                                         │
│ stripFrontmatter()                      │
│   └─ Extract content without metadata   │
└─────────────────────────────────────────┘
```

### 3. Skills Directory (.claude/skills/)

**Purpose:** Store individual skill definitions.

**Structure per skill:**

```
skill-name/
├── SKILL.md          # Required: Skill definition
├── references/       # Optional: Reference docs
├── templates/        # Optional: Code templates
├── scripts/          # Optional: Helper scripts
└── LICENSE.txt       # Optional: License
```

## Data Flow

### Skill Discovery Flow

```
Claude Code Start
       │
       ▼
┌─────────────────┐
│ Load CLAUDE.md  │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ Scan .claude/   │
│ skills/         │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ Extract YAML    │
│ frontmatter     │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ Register skills │
│ for invocation  │
└─────────────────┘
```

### Skill Resolution (Shadowing)

Personal skills override superpowers skills:

```
resolveSkillPath("my-skill")
         │
         ▼
┌─────────────────────┐
│ Check personal dir  │──► Found? Return personal
└─────────┬───────────┘
          │ Not found
          ▼
┌─────────────────────┐
│ Check superpowers   │──► Found? Return superpowers
└─────────┬───────────┘
          │ Not found
          ▼
       Return null
```

## Integration Points

### For Target Projects

1. **Copy `.claude/` directory** - Gets all skills
2. **Copy `CLAUDE.md`** - Gets workflow configuration
3. **Optionally add custom skills** - Add to `.claude/skills/`

### Update Strategy (Planned)

```
User's Project                    Agent Skills Repo
     │                                   │
     │    ┌───────────────────────┐      │
     └───►│   Update Script       │◄─────┘
          │                       │
          │ 1. Pull latest repo   │
          │ 2. Compare skills     │
          │ 3. Merge (preserve    │
          │    user skills)       │
          │ 4. Update lib/        │
          └───────────────────────┘
```

## Design Decisions

### 1. YAML Frontmatter for Skill Metadata

**Rationale:** Standard format, easily parseable, keeps metadata with content.

### 2. Flat Skills Directory

**Rationale:** Simple discovery, no nested namespacing complexity.

### 3. Optional Supporting Files

**Rationale:** Skills range from simple (single SKILL.md) to complex (with references, templates, scripts).

### 4. Personal/Superpowers Shadowing

**Rationale:** Allows users to override default skills without modifying source.
