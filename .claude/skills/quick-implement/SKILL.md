---
name: quick-implement
description: Rapid implementation of small features or bug fixes without a formal plan.
---

# Quick Implement

## Overview

Directly implement small-scope changes or fixes.

## Workflow

### Step 1: Analyze & Contextualize

1.  **Grasp Requirements:** Fully understand the user's request.
2.  **Scout:**
    - Review relevant codebase sections.
    - Check `docs/*.md` for project-specific guidelines.
3.  **Clarify:** If requirements are ambiguous, ask _before_ coding.

### Step 2: Implement

1.  **Execute:** Write the code to fulfill requirements.
2.  **Verify Locally:** Ensure changes work as expected (run specific tests, manual check).

### Step 3: Project Verification

1.  **Quality Check:**
    - Run project linters and type-checkers.
    - Run relevant test suites.
    - Ensure build passes (if applicable).
2.  **Fix:** Resolve any regressions or style violations.

### Step 4: Completion

1.  **Documentation:** Update `docs/` if features or logic changed using the `docs` skill.
2.  **Report:** Summarize changes and modified files for the user.

## Rules

- **Stop on Blocker:** If a dependency is missing, a test fails unexpectedly, or instructions are unclear, **STOP** and ask.
- **No Guessing:** Clarify intentions rather than assuming.
- **Idempotency:** Ensure steps are safe to run multiple times.
- **Follow documentations:** Always follow the documentations of the current project, usually in `docs/` directory. Especially follow the `code-standard.md` for coding standards, convensions,....
