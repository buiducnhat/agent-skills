# Architecture

> Last Updated: 2026-02-23 00:03:59 +07:00  
> Status: Active  
> Scope: `agent-skills` repository architecture and maintenance expectations

## System Overview

Agent Skills is a template repository containing Claude Code configurations and reusable skills that can be copied into other projects.

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

### 1. `CLAUDE.md` (Workflow Configuration)

**Purpose:** Define how Claude Code should behave in projects using this workflow.

**Responsibilities:**

- Document available workflow skills
- Define workflow sequences
- Set documentation-first rules
- Establish critical behavioral guardrails

### 2. Skills Library (`.claude/lib/`)

**Purpose:** Provide reusable utilities for skill management.

**Key module: `skills-core.js`**

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

### 3. Skills Directory (`.claude/skills/`)

**Purpose:** Store individual skill definitions.

**Structure per skill:**

```
skill-name/
├── SKILL.md          # Required: Skill definition
├── references/       # Optional: Reference docs loaded on demand
├── templates/        # Optional: Output templates
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

Personal skills override upstream/default skills:

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

1. Copy `.claude/` directory (skills + utilities)
2. Copy `CLAUDE.md` (workflow behavior)
3. Optionally add custom skills in `.claude/skills/`

### Update Strategy

The `update-skills.sh` script syncs upstream changes into target projects while preserving local customizations.

```
User's Project                    Agent Skills Repo
     │                                   │
     │    ┌───────────────────────┐      │
     └───►│   update-skills.sh    │◄─────┘
          │                       │
          │ 1. Backup .claude/    │
          │ 2. Clone latest repo  │
          │ 3. Diff files (only   │
          │    copy if changed)   │
          │ 4. Preserve local     │
          │    skills             │
          │ 5. Update manifest    │
          │ 6. Report summary     │
          └───────────────────────┘
```

**Manifest file** (`.claude/.upstream-manifest`):

- Stores `path:hash:version` entries
- Detects local edits by hash comparison
- Skips locally modified files unless forced

## Design Decisions

### 1. YAML Frontmatter for Skill Metadata

**Rationale:** Standard, parseable metadata colocated with skill behavior.

### 2. Flat Skills Directory

**Rationale:** Simpler discovery and lower naming complexity.

### 3. Optional Supporting Files

**Rationale:** Supports both minimal and advanced skills without forcing boilerplate.

### 4. Personal/Upstream Shadowing

**Rationale:** Enables local overrides without upstream forks.

---

## Maintenance Contract

This section defines when this architecture document must be updated and what consistency guarantees are expected.

### Update Triggers (Mandatory)

Update this file when any of the following changes:

1. Core repository layout (`.claude/`, `docs/`, `tests/`) materially changes
2. Skill discovery/resolution behavior changes (`skills-core.js` contract)
3. Skill folder contract changes (`SKILL.md`/resources structure)
4. Update workflow changes (`update-skills.sh` behavior or manifest format)
5. Workflow control source changes (major `CLAUDE.md` semantics)

### Required Cross-Document Sync

When architecture changes, review and sync:

- `docs/codebase.md` (tree + key file responsibilities)
- `docs/code-standard.md` (format/pattern standards affected by architecture)
- `docs/project-pdr.md` (if user/business-facing capabilities change)
- `README.md` (if onboarding or usage flow changes)

### Accuracy Rules

- Prefer stable descriptions over volatile counts
- If including counts/versions, mark them with “as of” date
- Avoid speculative statements; document only implemented behavior
- Keep diagrams and prose aligned with current repository reality

### Ownership and Review Cadence

- **Primary owner:** Maintainers updating workflow, scripts, or core skill infrastructure
- **Review cadence:** On every structural PR touching `.claude/`, `CLAUDE.md`, or updater scripts
- **Definition of done for structural changes:** this file and linked docs updated in the same change set
