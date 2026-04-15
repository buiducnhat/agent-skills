---
name: execute-plan
description: Execute an approved implementation plan exactly and safely. Use when a plan already exists and work must be carried out phase-by-phase with verification checkpoints, status tracking, and final execution reporting.
argument-hint: "[plan path, e.g. docs/plans/YYMMDD-HHmm-<plan-slug>/SUMMARY.md]"
license: MIT
---

# Execute Plan

## Overview

Execute a pre-approved plan with strict adherence to scope, sequence, and verification.

The input is typically: `execute-plan docs/plans/YYMMDD-HHmm-<plan-slug>/SUMMARY.md`

Do not redesign the plan during execution. If ambiguity or blockers appear, stop and ask.

## Workflow

### Step 1: Initialize

1. **Locate Plan**
   - Confirm the plan path exists and is readable.
   - If a directory is provided, locate `SUMMARY.md` inside it.

2. **Load Execution Context**
   - Load project context per the shared Context Loading Protocol.
   - Review the plan’s phase files and dependencies.

3. **Select Execution Mode (Explicit Rule)**
   - Default mode: **Batch**
   - Use **Interactive** when any of the following is true:
     - High-risk changes (auth, payments, migrations, security-critical logic)
     - Irreversible operations (data migrations, destructive scripts)
     - Unclear acceptance criteria
     - User explicitly requests checkpoints
   - If mode is unclear, ask once and proceed with user choice.

4. **Find Next Pending Phase**
   - First `[ ]` phase
   - If none, first `[-]` phase
   - If no pending/in-progress phases remain, go to final verification.

5. **Critical Plan Sanity Check**
   - Ensure each phase has:
     - clear objective
     - file targets
     - verification commands
   - If essential details are missing or contradictory, stop and request clarification.

### Step 2: Execute Per-Phase Loop

For each phase in order:

1. **Skip Completed**
   - If status is `[x]`, continue to next phase.

2. **Mark In Progress**
   - Update phase status to `[-]` before making changes.

3. **Execute Exactly**
   - Implement only the tasks defined in that phase.
   - Do not expand scope without approval.

4. **Verify Phase**
   - Run the phase-specific verification commands from the plan.
   - At minimum, run relevant tests/checks tied to touched files.

5. **Handle Failures**
   - If verification fails:
     - Attempt focused fixes within phase scope.
     - Re-run verification.
   - If still failing or root cause is outside scope, stop and report blocker.

6. **Mark Complete**
   - Update phase status to `[x]` only after verification passes.

7. **Progress Report**
   - **Interactive mode:** report and wait for confirmation before next phase.
   - **Batch mode:** report briefly and continue immediately.

### Step 3: Final Verification

After all phases are complete:

1. **Project-Wide Validation**
   - Run full lint/type-check suite
   - Run all relevant tests (or full test suite if required by the plan)
   - Run build verification if applicable

2. **Stabilize**
   - Fix regressions introduced during execution.
   - Re-run failed checks until green or blocked.

3. **Manual Validation Checkpoint**
   - If user/manual QA is required, ask explicitly and pause:
     - `Verified` to accept
     - or provide feedback for follow-up iteration

### Step 4: Completion Artifacts

1. **Documentation Sync**
   - If behavior/architecture/codebase expectations changed, update the `docs` artifacts.
2. **Create Execution Report**
   - File: `docs/plans/YYMMDD-HHmm-<plan-slug>/EXECUTION-REPORT.md`
   - Include all required sections below.

3. **Archive Plan Folder**
   - Move the plan folder to `docs/plans/archived/` after the execution report is created.
   - Command: `mkdir -p docs/plans/archived && mv docs/plans/YYMMDD-HHmm-<plan-slug> docs/plans/archived/`

4. **Announce Completion**
   - Output: `Execution complete. Report archived at docs/plans/archived/YYMMDD-HHmm-<plan-slug>/EXECUTION-REPORT.md.`

### Step 5: Final Confirmation Gate

After completion artifacts are done, ask the user for a final confirmation using the Question Tool with exactly these options:

- `Confirm: End session`
- `Confirm and Auto commit git`
- `Need verify`

Handle the selected option as follows:

1. **`Confirm: End session`**
   - End the execution session.

2. **`Confirm and Auto commit git`**
   - Trigger the `git-commit` skill and complete an automatic commit flow.
   - After commit succeeds, end the execution session.

3. **`Confirm and update documentation`**
   - Use skill `/docs` to update the relevant documentation files with any changes made during execution.
   - After documentation is updated, end the execution session.

4. **`Confirm and update documentation and auto commit git`**
   - Use skill `/docs` to update the relevant documentation files with any changes made during execution.
   - Trigger the `git-commit` skill and complete an automatic commit flow.
   - After commit succeeds, end the execution session.

5. **`Need verify`**
   - Allow the user to provide verification feedback/details.
   - Continue the execution loop to address feedback, then re-run verification and completion steps as needed.

## Execution Report Standard

`EXECUTION-REPORT.md` must use the following template: `references/execution-report-template.md`

## Rules

- **Respect project standards**: follow `docs/` and related project docs.
- **Follow the plan strictly**: no silent scope changes.
- **Stop on blocker**: missing dependency, contradictory instructions, or unexplained failures.
- **No guessing**: ask for clarification when uncertain.
- **Verify before complete**: never mark phase done without passing checks.
- **Idempotency**: prefer safe/re-runnable operations.
- **Do not skip workflow steps**: initialization, per-phase verification, final verification, and reporting are all mandatory.
