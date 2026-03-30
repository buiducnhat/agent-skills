## Context Loading Protocol

Before planning or implementing any features, load project documentation:

### Step 1 — Load Entry Point
Read `docs/SUMMARY.md` to get the full documentation landscape. This single file contains the project overview and tables listing all detail files with descriptions.

The `Code Standard` section is very important to keep the code consistent, maintainable. Skip if the file doesn't exist. Let documentation guide implementation — if docs conflict with implementation needs, clarify with the user instead of guessing.

### Step 2 — Load on Demand
Based on the current task, use the file tables in `docs/SUMMARY.md` to identify and load only the detail files that are directly relevant. Do NOT load all detail files upfront.

### Fallback (legacy structure)
If `docs/SUMMARY.md` does not exist but flat files like `docs/architecture.md`, `docs/codebase.md` etc. exist, load them directly. Consider running `docs --update` to migrate to the new SUMMARY structure.

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
