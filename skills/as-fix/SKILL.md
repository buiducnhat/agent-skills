---
name: as-fix
description: Diagnose and fix bugs with root-cause analysis and verification. Use when you have a concrete issue report, failing behavior, runtime error, or test regression that should be resolved safely. Stop and escalate to brainstorm when scope or risk grows.
argument-hint: "[bug report or issue description]"
license: MIT
---

# Fix

## Purpose

Resolve concrete bugs safely through structured diagnosis, minimal fixes, and verification.

This skill is for bug-fix execution when scope is clear and risk is manageable.

## Scope Gate (Required Before Starting)

Use this skill only when all conditions below are true:

1. **Concrete issue signal exists**
   - Clear failing behavior, error, or regression is identified
   - Enough evidence exists to begin diagnosis (logs, stack trace, failing test, or reproducible steps)

2. **Likely localized fix path**
   - Issue appears constrained to a small area
   - No expected cross-system redesign or migration

3. **Low-to-moderate architectural risk**
   - Fix can be made without foundational changes
   - No phased rollout/feature-flag strategy is expected

4. **Straightforward verification path**
   - Reproduction and post-fix checks can be run in practical scope
   - Success criteria can be validated directly

If any condition fails, escalate to `brainstorm` or `write-plan`.

## Hard Stop Escalation Criteria

Immediately stop and switch to planning if any of these occur:

- Root cause remains unclear after focused investigation
- Fix requires cross-cutting architectural or data-model changes
- Scope expands into large refactor or multi-module migration
- Security/compliance-sensitive behavior is involved
- Verification reveals broad regressions requiring phased mitigation
- Multiple fix attempts fail without converging on a root cause

Escalation action:

1. Stop all implementation activities.
2. Output the exact message: "This fix exceeds safe single-pass debugging limits. Ask, Recommend `brainstorm` or `write-plan` first to define phased diagnosis, implementation, and risk controls."

## Workflow

### Step 1: Intake and Contextualize

1. Understand the reported bug and define explicit expected behavior.
2. Collect/confirm minimum bug report fields:
   - Title
   - Expected behavior
   - Actual behavior
   - Reproduction steps
   - Evidence (logs, trace, screenshot, failing test output)
   - Environment (branch/OS/runtime/version if relevant)
   - Impact/severity
3. Load project context per the shared Context Loading Protocol.

### Step 2: Reproduce and Diagnose

1. Reproduce the issue consistently.
2. Locate the failure point (file/function/line range/subsystem).
3. Trace control/data flow to identify the **root cause**.
4. Form a fix hypothesis and confirm it explains observed behavior.

Guidelines:

- Read surrounding code, not only the failing line.
- Prefer root-cause correction over symptom patching.
- Add temporary diagnostics only when needed; remove them after use.

### Step 3: Decide Small vs Bigger Fix

Classify the work before coding:

#### Small fix (continue in this skill)

Most are true:

- Root cause is clear and validated
- Change surface is narrow (typically a few files)
- Regression risk is limited and testable quickly

#### Bigger/risky fix (escalate to `brainstorm` or `write-plan`)

Any are true:

- Root cause is uncertain
- Multiple subsystems must change together
- Requires migration, rollout sequencing, or broad refactor
- Risk cannot be reasonably controlled in a single pass

If it is a bigger fix, follow **Hard Stop Escalation Criteria**.

### Step 4: Implement (Small Fix Path)

1. State a brief 1-3 bullet implementation plan.
2. Apply the smallest targeted change that resolves the root cause.
3. Keep scope strict; avoid unrelated refactors.
4. Add/update regression tests when applicable.

### Step 5: Verify

Run validation in increasing scope:

1. Focused checks for the changed behavior/module
2. Nearby regression checks
3. Relevant project checks (lint/typecheck/tests/build) as needed

Fix is complete only when:

- Reproduction no longer fails
- Expected behavior is confirmed
- No critical regressions are introduced

If verification indicates broader impact, escalate to `brainstorm` or `write-plan`.

### Step 6: Complete and Report

Provide a concise completion report with:

- **Root cause**
- **What changed**
- **Why this fix works**
- **Verification performed and results**
- **Residual risks / follow-ups**

If behavior or documentation-relevant rules changed, update the minimal relevant docs. If architecture changed, this should have been escalated.

## Rules

- Do not guess when key context is missing; ask via `Question Tool`.
- Always prioritize root-cause fixes.
- Keep blast radius minimal.
- Do not mark done without verification.
- Escalate early when scope/risk exceeds this skill.

## Optional Bug Report Template

Use when the report is incomplete:

- Title:
- Expected behavior:
- Actual behavior:
- Reproduction steps:
- Error logs/stack trace:
- Environment:
- Impact/severity:
- Additional context:
