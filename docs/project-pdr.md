# Project Requirements Document

> Last Updated: 2026-02-23 00:03:59 +07:00  
> Status: Active

## Documentation Maintenance Contract

This document is a source-of-truth artifact and must be kept in sync with project intent and delivery scope.

### Update Triggers

Update this file whenever any of the following changes:

1. Project purpose, vision, or problem statement
2. Target users or use cases
3. Core workflow definitions or expected outcomes
4. Feature scope (additions, removals, major reprioritization)
5. Success criteria or constraints

### Required Companion Updates

When this file changes, review and update (if needed):

- `docs/architecture.md` (system impact)
- `docs/codebase.md` (structure impact)
- `docs/code-standard.md` (process/convention impact)
- `CLAUDE.md` (workflow/policy impact)

### Quality Rules

- Keep requirements factual and implementation-agnostic where possible.
- Avoid stale numeric claims unless they are explicitly date-stamped.
- Use concise language and explicit scope boundaries.
- If uncertain, mark assumptions and open questions clearly.

---

## Project Overview

**Project Name:** Agent Skills  
**Repository:** https://github.com/buiducnhat/agent-skills.git  
**Type:** Claude Code Skills Collection

## Purpose

Agent Skills is a curated collection of reusable skills for Claude Code (claude.ai/code). It provides a standardized `.claude/` directory structure and `CLAUDE.md` workflow configuration that can be copied into other projects to enhance Claude Code's capabilities.

## Problem Statement

When working with Claude Code across multiple projects:

1. Developers need consistent workflows (brainstorm → plan → execute)
2. Common skills (documentation, planning, reviewing) are duplicated across projects
3. There's no standardized way to share and update skills between projects

## Target Users

- Developers using Claude Code for software development
- Teams wanting consistent AI-assisted workflows
- Projects requiring specialized Claude Code capabilities

## Key Features

### Core Workflow Skills

- **brainstorm**: Explore ideas and break down complex problems
- **write-plan**: Create detailed implementation plans
- **execute-plan**: Execute written plans systematically
- **quick-implement**: Rapid implementation for simple tasks
- **fix**: Diagnose and resolve bugs
- **review**: Review uncommitted changes
- **docs**: Initialize or update project documentation

### Specialized Skills

- Framework-specific skills (Next.js, React, TanStack, Vite, etc.)
- Document creation skills (PDF, DOCX, PPTX, XLSX)
- Design skills (UI/UX, canvas design, algorithmic art)
- Development tools (MCP builder, SEO audit, webapp testing)

## Success Criteria

1. Skills can be easily copied to new projects via one-liner installer
2. Updates to this repository can be pulled while preserving local skills
3. User-created skills in target projects are preserved during updates
4. Manifest system tracks upstream vs local skills
5. Clear documentation enables quick adoption

## Constraints

- Must work with Claude Code's skill loading mechanism
- Skills must follow YAML frontmatter format for discovery
- Directory structure must match `.claude/skills/<skill-name>/SKILL.md` pattern
