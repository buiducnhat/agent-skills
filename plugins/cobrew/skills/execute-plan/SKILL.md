---
name: execute-plan
description: Execute an approved implementation plan exactly and safely. Use for ExecPlan-style plan execution, resumable phase checklists, multi-hour implementation work, migrations, significant refactors, and plans that require verification checkpoints, status tracking, and final reporting.
argument-hint: "[plan path, e.g. docs/.plans/YYMMDD-HHmm-<plan-slug>/SUMMARY.md]"
license: MIT
---

# Execute Plan

## Overview

Execute a pre-approved plan with strict adherence to scope, sequence, and verification. Treat the plan as a living document that records progress, findings, decisions, and outcomes as execution proceeds.

The input is typically: `execute-plan docs/.plans/YYMMDD-HHmm-<plan-slug>/SUMMARY.md`

Do not redesign the plan during execution. If ambiguity or blockers appear, stop and ask.

## Workflow

### Step 1: Initialize

1. **Locate Plan**
   - Confirm the plan path exists and is readable.
   - If a directory is provided, locate `SUMMARY.md` inside it.

2. **Load Execution Context**
   - Load only the project context relevant to the plan:
     - If `docs/SUMMARY.md` exists, read it first.
     - Load only task-relevant detail docs.
     - Prioritize `Code Standard` docs for implementation conventions.
     - If docs conflict with code or user intent, use the available input/question before broad changes.
   - Review the plan’s phase files, context/orientation notes, dependencies, acceptance criteria, idempotence/recovery notes, decision log, and open questions.
   - If an older plan is missing living-plan sections (`Progress`, `Surprises & Discoveries`, `Decision Log`, `Outcomes & Retrospective`), add those sections before execution when the plan is otherwise clear.

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
     - observable acceptance criteria
   - If observable acceptance criteria are missing but can be inferred from explicit phase verification and exit criteria, add them to the phase before execution.
   - If essential details are missing or contradictory, stop and request clarification.

### Step 2: Execute Per-Phase Loop

For each phase in order:

1. **Skip Completed**
   - If status is `[x]`, continue to next phase.

2. **Mark In Progress**
   - Update phase status to `[-]` before making changes.
   - Add a timestamped `Progress` entry in `SUMMARY.md` describing the phase start.

3. **Execute Exactly**
   - Implement only the tasks defined in that phase.
   - Do not expand scope without approval.
   - Write the minimum code that satisfies the phase. No speculative features, no abstractions for single-use code, no error handling for impossible scenarios. See **Simplicity first** and **Surgical changes** rules below.
   - If implementation reveals a material surprise, record it under `Surprises & Discoveries` in `SUMMARY.md`.
   - If a decision is needed to stay within scope, record the decision and rationale under `Decision Log` before continuing.

4. **Verify Phase**
   - Run the phase-specific verification commands from the plan.
   - At minimum, run relevant tests/checks tied to touched files.
   - Record concise verification evidence in `SUMMARY.md` under `Progress` or the phase's requested evidence location.

5. **Handle Failures**
   - If verification fails:
     - Attempt focused fixes within phase scope.
     - Re-run verification.
   - If still failing or root cause is outside scope, stop and report blocker.

6. **Mark Complete**
   - Update phase status to `[x]` only after verification passes.
   - Add a timestamped `Progress` entry with the verification result and changed files for that phase.

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

4. **Update Outcomes**
   - Complete `Outcomes & Retrospective` in `SUMMARY.md` with final result, verification summary, approved deviations, and follow-ups.

### Step 4: Completion Artifacts

1. **Documentation Sync**
   - If behavior/architecture/codebase expectations changed, update the `docs` artifacts.
2. **Create Execution Report**
   - File: `docs/.plans/YYMMDD-HHmm-<plan-slug>/EXECUTION-REPORT.md`
   - Include all required sections below.

3. **Prepare Final Gate**
   - Do not archive before final user confirmation. The user may choose `Need verify`, and execution must continue against the same plan path.

### Step 5: Final Confirmation Gate

After completion artifacts are done, ask the user for a final confirmation using the input/question with exactly these options:

- `Confirm: End session`
- `Need verify`

Handle the selected option as follows:

1. **`Confirm: End session`**
   - Archive the plan folder to `docs/.plans/archived/`.
   - Announce: `Execution complete. Report archived at docs/.plans/archived/YYMMDD-HHmm-<plan-slug>/EXECUTION-REPORT.md.`
   - End the execution session.

2. **`Need verify`**
   - Allow the user to provide verification feedback/details.
   - Do not archive.
   - Continue the execution loop to address feedback, then re-run verification and completion steps as needed.

## Execution Report Standard

`EXECUTION-REPORT.md` must use the following template: `references/execution-report-template.md`

## Rules

- **Respect project standards**: follow `docs/` and related project docs.
- **Follow the plan strictly**: no silent scope changes.
- **Stop on blocker**: missing dependency, contradictory instructions, or unexplained failures.
- **No guessing**: ask for clarification when uncertain.
- **Verify before complete**: never mark phase done without passing checks.
- **Keep the plan alive**: update progress, discoveries, decisions, and outcomes in `SUMMARY.md` as execution proceeds. Do not rely on chat history for important execution state.
- **Idempotency**: prefer safe/re-runnable operations.
- **Simplicity first**: Implement the minimum code that satisfies the phase's exit criteria. No features beyond what the plan asks for. No abstractions for single-use code. No configurability that wasn't requested. If you write 200 lines and it could be 50, rewrite it.
- **Surgical changes**: Touch only what the phase requires. Don't "improve" adjacent code, comments, or formatting. Don't refactor things that aren't broken. Match existing style even if you'd do it differently. Only remove imports/variables/functions that _your_ changes orphaned — don't delete pre-existing dead code unless the plan asks for it. Every changed line should trace to a phase task.
- Write artifacts in language same with the current session.
