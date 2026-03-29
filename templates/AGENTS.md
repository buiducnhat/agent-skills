## Context Loading Protocol

Before planning or implementing any features, load project documentation in two tiers:

### Tier 1 — Always Load
Read these summary files to get project overview:
1. `docs/_index.md` — documentation manifest
2. `docs/architecture/summary.md` — system design overview
3. `docs/codebase/summary.md` — file structure and entry points
4. `docs/code-standard/summary.md` — key conventions and rules
5. `docs/project-pdr/summary.md` — product goals and scope

The `code-standard` summary is very important to keep the code consistent, maintainable. Skip files that don't exist. Let documentation guide implementation — if docs conflict with implementation needs, clarify with the user instead of guessing.

### Tier 2 — Load on Demand
Based on the current task, consult `docs/_index.md` to identify relevant detail files, then load only what is needed.

Do NOT load all detail files upfront. Only load detail files that are directly relevant to the task at hand.

### Fallback (legacy structure)
If `docs/_index.md` does not exist but flat files like `docs/architecture.md` exist, fall back to reading those flat files directly. Consider running `docs --update` to migrate to the new hierarchical structure.

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
