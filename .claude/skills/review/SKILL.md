---
name: review
description: Review current git diffs with codebase context.
---

# Review

## Overview

Review uncommitted changes in the current git workspace.

## Workflow

### Step 1: Gather Context

1.  **Get Diff:** Run `git diff` (and `git diff --cached` if applicable) to see changes.
2.  **Contextualize:**
    - Read the modified files to see the _surrounding_ code, not just the diff.
    - Check for lint/type errors in modified files.

### Step 2: Analyze

1.  **Correctness:** Does the code do what it's supposed to?
2.  **Safety:** Are there security risks or potential bugs?
3.  **Style:** Does it match the project's style and patterns?
4.  **Performance:** Are there obvious inefficiencies?
5.  **Tests:** Are there tests for the changes?

### Step 3: Report

1.  **Summary:** Brief overview of changes.
2.  **Feedback:**
    - **Issue:** Specific problem found (line number if possible).
    - **Suggestion:** How to fix it.
    - **Praise:** Good practices observed.
3.  **Verdict:** Approve or Request Changes.

## Rules

- **Be Specific:** pointing to specific lines of code.
- **Context Matters:** Do not judge a diff in isolation; read the file.
- **Follow documentations:** Always follow the documentations of the current project, usually in `docs/` directory. Especially follow the `code-standard.md` for coding standards, convensions,....
