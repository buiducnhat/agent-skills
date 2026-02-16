# CLAUDE.md

This file provides general guidance to Claude Code (claude.ai/code) for working with projects that follow this workflow.

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

2. **Documentation guides implementation** - Let the documentation guide your decisions. If documentation conflicts with implementation needs, clarify with the user rather than guessing.

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

- PREFER using interactive prompts with selectable options with `AskUserQuestion` tool.
- Use interactive selection menus for choices between 2-5 options.
- Only pause and wait for full message response when:
  - Question requires detailed explanation
  - User needs external context

**CRITICAL RULES:**

- Always read project documentation before planning or implementing anything
- Ask clarifying questions when documentation is unclear or incomplete
- Every steps inside the workflow's skills are important
