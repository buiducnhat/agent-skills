---
name: ask
description: Structured clarification and requirements gathering through focused dialogue or with dry code. Use when a task is ambiguous, underspecified, or requires user input before any action can be taken. Do not plan or implement anything—only ask questions to collect the information needed.
argument-hint: "[question]"
license: MIT
---

# Ask

## Workflow

### Step 1: Gather Project Context

Load only the project context relevant to the current task:

- If `docs/SUMMARY.md` exists, read it first.
- Load only task-relevant detail docs.
- Prioritize `Code Standard` docs for implementation conventions.
- If docs conflict with code or user intent, use the available input/question before broad changes.

Skip this step if no project docs or useful repository files exist.

### Step 2: Identify Information Gaps

Determine exactly what is missing before a task can proceed:

- Objective and user value
- Scope boundaries and non-goals
- Constraints (technical, UX, performance, timeline)
- Success criteria
- Key decisions with multiple valid options

### Step 3: Ask Questions (One at a Time)

Ask targeted questions sequentially to close each gap.

Rules:

- Ask **exactly one question per message**
- Prefer **multiple-choice options** when practical (2–4 choices)
- Use open-ended questions only when no reasonable options exist
- Do not ask questions already answered by project documentation
- Do not ask about implementation details prematurely
- Do not bundle multiple questions into one message

## Rules

- Do not write code or modify any files, only support dry coding into output, not into artifacts
- Do not produce plans, designs, or implementation artifacts
- Do not make assumptions; ask instead
- Keep questions short and focused
- Apply YAGNI: only ask what is strictly necessary to proceed
