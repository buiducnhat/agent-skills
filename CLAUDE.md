# CLAUDE.md

This file provides general guidance to Claude Code (claude.ai/code) for working with projects that follow this workflow.

## Core Workflow Skills

These skills form the essential development workflow:

| Skill             | Description                                                                                                                                            | Parameters           |
| :---------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------- | :------------------- |
| `docs`            | Initialize or update project documentation. Use with `--init` for first-time setup or `--update` to refresh existing documentation.                    | `--init`, `--update` |
| `brainstorm`      | Brainstorm complex tasks before making plans or coding. Use this when you need to explore ideas, identify approaches, and break down complex problems. |                      |
| `write-plan`      | Create detailed plans for implementing features. Use this after brainstorming to structure your approach, define tasks, and estimate effort.           |                      |
| `execute-plan`    | Execute the written plan. Use this to follow through with implementation based on plans created by `write-plan`.                                       |                      |
| `quick-implement` | Rapidly implement code for simple tasks or bug fixes without creating a formal plan file. Do not use for complex changes.                              |                      |
| `fix`             | Diagnose and resolve bugs or issues. Suggests `write-plan` for complex problems.                                                                       |                      |
| `review`          | Review uncommitted changes in the current git workspace with codebase context.                                                                         |                      |

## Documentation Rules

Documentation structure:

```
docs/
├── brainstorms/ # Long term memory of the project
├── plans/ # Long term memory of the project
├── architecture.md # Important for understanding the project architecture
├── code-standard.md # Important for understanding the code standard
├── codebase.md # Important for understanding the codebase
└── project-pdr.md # Important for understanding the project PDR
```

**CRITICAL**: Documentation is essential for project success. Always follow these rules:

1. **Always read project documentation first** - Before planning or implementing any feature, read the project's documentation to understand context, requirements, and existing patterns.

2. **Use the docs skill for documentation** - Never manually create or update documentation. Always use the `docs` skill:
   - First time: `docs --init` to set up documentation
   - Updates: `docs --update` to refresh documentation

3. **Keep documentation current** - After implementing features or making significant changes, always run `docs --update` to keep documentation in sync with code.

4. **Documentation guides implementation** - Let the documentation guide your decisions. If documentation conflicts with implementation needs, clarify with the user rather than guessing.

## Workflow Sequences

Select the appropriate workflow based on task complexity:

### 1. Complex Exploration

**Sequence**: `brainstorm` → `write-plan` → `execute-plan`
**Use Case**: For ambiguous, complex, or high-risk tasks requiring deep exploration and approach validation before planning.

### 2. Standard Development

**Sequence**: `write-plan` → `execute-plan`
**Use Case**: For well-defined but complex tasks, major features, or large refactors where a structured plan is necessary.

### 3. Rapid Implementation

**Sequence**: `quick-implement`
**Use Case**: For simple tasks, small bug fixes, or minor tweaks where a formal plan would be overhead. Direct implementation without plan files.

## Important Reminders

**Interaction Preferences:**

When asking questions during task execution:

- PREFER using interactive prompts with selectable options
- Use interactive selection menus for choices between 2-5 options
- Only pause and wait for full message response when:
  - Question requires detailed explanation
  - User needs external context

**CRITICAL RULES:**

- Always read project documentation before planning or implementing anything
- Choose the correct workflow sequence based on task complexity
- Use `quick-implement` ONLY for simple tasks; default to `write-plan` if unsure
- Never skip documentation updates: run `docs --update` after any implementation
- Ask clarifying questions when documentation is unclear or incomplete
- Follow documentation patterns consistently
- Every steps inside the workflow's skills are important
