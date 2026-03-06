## Context Loading Protocol

Before planning or implementing any feature, read these project documentation files in order:

1. `docs/project-pdr.md` — product goals, requirements, and scope
2. `docs/architecture.md` — system components and data flow
3. `docs/codebase.md` — key files, entry points, and modules
4. `docs/code-standard.md` — stack, conventions, and tooling

Only read what is relevant to the current task. Skip files that don't exist. Let documentation guide implementation — if docs conflict with implementation needs, clarify with the user instead of guessing.

## AskUserQuestion Mandate

**Always use `AskUserQuestion`** (or equivalent interactive tool) when asking the user a question during task execution. Do not ask questions in plain text unless the interface does not support interactive tools.

### 1. The Fallback Mechanism (Manual Emulation)

If a native tool is unavailable, output the question as the **LAST** part of your message using this exact Markdown structure:

> **[ASK_USER_QUESTION]**
>
> - **Context:** [Briefly explain why you are pausing]
> - **Options:**
>
> 1. [Option A] (Recommended: [Reason])
> 2. [Option B]
> 3. [Other/Custom Input]

The `ASK_USER_QUESTION` can be also multiple choices.

### 2. Execution Guidelines

- Prefer selectable options (2–5 choices) over open-ended text when practical.
- Ask exactly one question per message; do not bundle multiple questions.
- Use open-ended plain-text questions only when the answer genuinely requires free-form input or external context.
- Pause for a full user response when the question requires detailed explanation.
- Never interupt the session/flow, the users should not input a new prompt, only respond to the question asked.

## Documentation Structure

```text
docs/
├── brainstorms/      # Long-term memory for exploration outputs
├── plans/            # Long-term memory for implementation plans
├── architecture.md   # Project architecture and system design
├── code-standard.md  # Coding standards and conventions
├── codebase.md       # Codebase map and key files
└── project-pdr.md    # Product requirements and business context
```

## Core Workflow Skills

| Skill             | Description                                                               |
| ----------------- | ------------------------------------------------------------------------- |
| `ask`             | Ask clarifying questions to gather requirements and context               |
| `bootstrap`       | Set up project structure, documentation, and conventions for new projects |
| `brainstorm`      | Explore ideas and break down complex problems before planning             |
| `docs`            | Initialize (`--init`) or update (`--update`) project documentation        |
| `execute-plan`    | Execute written plans systematically with checkpoints                     |
| `fix`             | Diagnose and resolve bugs                                                 |
| `quick-implement` | Rapid implementation for simple tasks or bug fixes                        |
| `review`          | Review uncommitted changes with codebase context                          |
| `write-plan`      | Create detailed implementation plans with phases and tasks                |

## General Principles

- Follow every step in each workflow skill; do not skip required steps.
- Apply YAGNI, KISS, DRY, SOLID, and the principle of least surprise.
- Ask clarifying questions when documentation is unclear or when critical context is missing.
- Generate timestamps with inline bash commands (no external script required):
  - Folder name: `` `date +%y%m%d-%H%M` ``
  - Document timestamp: `` `date "+%Y-%m-%d %H:%M:%S"` ``
