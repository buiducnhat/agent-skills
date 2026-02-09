---
name: execute-plan
description: Strict execution of a written implementation plan with review checkpoints.
---

# Execute Plan

## Overview

Execute a pre-approved implementation plan with precision. Follow the plan strictly and do not deviate from it unless explicitly authorized. Always follow the best practices and coding standards of the project. The `execute-plan` skill usually need the path to the plan file as an argument. For example `execute-plan docs/plans/260209-1705-my-plan/SUMMARY.md` or `execute-plan docs/plans/260209-1705-my-plan` for shorthand.

## Workflow

### Step 1: Initialize

1.  **Locate Plan:** Confirm the plan file path (typically `docs/plans/YYMMDD-HHmm-<plan-name>`).
2.  **Identify the first pending phase**:
    - Look for the first `[ ]` phase.
    - If none found, check for `[-]` phases.
    - If still none, consider the plan complete or ask the user for further instructions.
3.  **Review Strategy:**
    - Assess phase complexity.
    - Confirm **Execution Mode** with the user if very necessary (for complex plans/phases or large code, the default mode should be `batch`):
      - **Interactive:** Pause for confirmation after each phase.
      - **Batch:** Execute all phases continuously; stop only on error.
4.  **Critical Review:** Identify missing details or ambiguities.
    - Issues found: Stop and clarify immediately.
    - Plan is solid: Proceed to Step 2.

### Step 2: Execution Loop (Per Phase)

Iterate through each phase of the plan:

1.  **Check Status:** Verify if the phase is already completed (`[x]`). Skip if done.
2.  **Mark In-Progress:** Update the phase status to `[-]` in the plan file.
3.  **Execute:** Implement the tasks defined in the phase exactly.
4.  **Verify:** Run relevant tests, linting, or type-checks for the specific changes.
5.  **Complete:**
    - Update phase status to `[x]` in the plan file.
    - **Interactive Mode:** Report progress (implemented features, verification results) and wait for user confirmation.
    - **Batch Mode:** Report progress briefly and immediately proceed to the next phase.

### Step 3: Final Verification

Once all phases are complete:

1.  **Project-Wide Scan:**
    - Run full linting and type-checking.
    - Run all test suites.
    - Verify build integrity.
2.  **Fix:** Resolve any regressions or issues discovered during the scan.
3.  If need manually verification from user, ask them and wait with the list questions: `Verified`, or type something to continue loop.

### Step 4: Completion

1.  **Documentation:** Update project documentation via the `docs` skill if architecture/features changed.
2.  **Final Report:** Create `docs/plans/YYMMDD-HHmm-<plan-name>/EXECUTION-REPORT.md`.
    - Summarize work completed.
    - Note deviations or outstanding issues.
3.  **Announce:** "Execution complete. Report created at `<path>`."

## Rules

- **Stop on Blocker:** If a dependency is missing, a test fails unexpectedly, or instructions are unclear, **STOP** and ask.
- **No Guessing:** Clarify intentions rather than assuming.
- **Idempotency:** Ensure steps are safe to run multiple times.
- **Follow documentations:** Always follow the documentations of the current project, usually in `docs/` directory. Especially follow the `code-standard.md` for coding standards, convensions,....

## Integration

- **write-plan**: Used to generate the plan this skill executes.
