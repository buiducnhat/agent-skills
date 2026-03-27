## Context Loading Protocol

Before planning or implementing any features that need gathering details context, read these project documentation files:

1. `docs/architecture.md` — system design, system components and data flow
2. `docs/codebase.md` — key files, entry points, and modules
3. `docs/code-standard.md` — code convention, guidelines, style
4. `docs/project-pdr.md` — product requirements, business context, and scope

The `code-standard` is very important to keep the code consistent, maintainable. Only read what is relevant to the current task. Skip files that don't exist. Let documentation guide implementation — if docs conflict with implementation needs, clarify with the user instead of guessing.

## Question Tool Mandate

`Question Tool` is the common method for asking users questions with interactive options. Always use it when asking a question during task execution. Do not ask questions in plain text unless the interface does not support interactive tools. The table below shows which tool to use for each agent:

| Agent       | Tool                     |
| ----------- | ------------------------ |
| Claude Code | `AskUserQuestion`        |
| OpenCode    | `question`               |
| Gemini CLI  | `ask_user`               |
| Cursor      | `ask questions`          |
| Others      | Based on available tools |

Guidelines:

- Prefer selectable options (2–5 choices) over open-ended text when practical.
- Ask exactly one question per message; do not bundle multiple questions.
- Use open-ended plain-text questions only when the answer genuinely requires free-form input or external context.
- Pause for a full user response when the question requires detailed explanation.
- Never interupt the session/flow, the users should not input a new prompt, only respond to the question asked.

## General Principles

- Follow every step in each workflow skill; do not skip required steps.
- Apply YAGNI, KISS, DRY, SOLID, and the principle of least surprise.
- Ask clarifying questions when documentation is unclear or when critical context is missing.
- Generate timestamps with inline bash commands:
  - Folder name: `` `date +%y%m%d-%H%M` ``
  - Document timestamp: `` `date "+%Y-%m-%d %H:%M:%S"` ``
