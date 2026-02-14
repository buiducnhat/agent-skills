---
name: fix
description: Skill for fixing bugs or issues. Suggests write-plan for complex problems.
---

# Fix

## Overview

Diagnose and resolve bugs or issues.

## Workflow

### Step 1: Analyze & Diagnose

1.  **Reproduce/Understand:**
    - Read the error message or issue description.
    - Locate the relevant code.
    - Understand the expected vs. actual behavior.
2.  **Assess Complexity:**
    - **Simple:** Clear cause, localized fix. -> Proceed to Step 2.
    - **Complex:** Unclear cause, architectural impact, or multi-file changes needed. -> **STOP and recommend `write-plan`.**

### Step 2: Implement Fix (Simple Issues)

1.  **Plan:** Briefly outline the fix in your thought process.
2.  **Edit:** Apply the fix to the code.
3.  **Verify:**
    - Run tests to confirm the fix works.
    - Ensure no regressions.

### Step 3: Completion

1.  **Report:** specific what was fixed and why.
2.  **Documentation:** Update project documentation via the `docs` skill if pdr or codebase or architecture changed, normally update `docs/project-pdr.md`, `docs/codebase.md`, `docs/architecture.md`.

## Rules

- **Recommend Plan:** If the fix involves significant refactoring or is risky, ALWAYS suggest creating a plan first.
- **Verify:** Never consider a bug fixed until verification passes.
- **Root Cause Analysis (RCA):**
  - Do not guess. Read the error log/stack trace carefully.
  - Locate the file and line number.
  - Trace the variable values mentally.
- **Follow documentations:** Always follow the documentations of the current project, usually in `docs/` directory. Especially follow the `code-standard.md` for coding standards, convensions,....
- **Don't miss any step:** Every steps are important to follow, don't miss any, even the step 3 (completion).
