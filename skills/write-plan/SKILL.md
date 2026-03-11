---
name: write-plan
description: Create detailed, execution-ready implementation plans for complex or high-risk changes without coding. Use when scope is large, requirements are mostly known, and work should be broken into validated phases before execution.
---

# Write Plan

## Overview

Produce a complete, self-contained implementation plan that can be executed by `execute-plan` with minimal ambiguity.

This skill is for planning only:

- Do not implement code
- Do not modify production files (except plan artifacts)

## Workflow

### Step 1: Contextualize

Load project context per the shared Context Loading Protocol. Then inspect only the code areas relevant to the requested change.

Capture:

- Existing patterns to follow
- Constraints and dependencies
- Risks, assumptions, and unknowns

### Step 2: Initialize Plan Artifacts

1. Create: `docs/plans/YYMMDD-HHmm-<plan-slug>/`
2. Create:
   - `SUMMARY.md`
   - one phase file per implementation phase with naming convention `phase-XX-<name>.md`
3. Add `research/` only if needed.

#### Rules:

- Use timestamp commands from the shared General Principles for folder and document timestamps.

### Step 3: Clarify Requirements

Ask clarifying questions to resolve any ambiguity in the request. Focus on:

- Scope and boundaries
- Success criteria
- Constraints and non-goals
- Priorities and trade-offs

#### Rules:

- If requirements are already clear or come from the brainstorm context, no need the confirmation step.
- Use `AskUserQuestion` tool is possible.

### Step 4: Define Strategy and Phases

Design a phased strategy that is safe and verifiable.

Each phase should have:

- A clear objective
- Ordered tasks
- Verification commands
- Exit criteria

Granularity rule:

- Tasks should be small, concrete, and typically 2-10 minutes each.

### Step 5: Research (Only if Needed)

Research is optional and should be proportional to uncertainty.

Preferred order:

1. Existing project docs and code
2. Existing skills and local references
3. External references (only if available in the current environment)

If external research capability is unavailable, proceed with local evidence and explicitly list assumptions and open questions.

Document findings in:

- `docs/plans/YYMMDD-HHmm-<plan-slug>/research/<topic>.md`

### Step 6: Write Plan Content

## `SUMMARY.md` format

Follow the template inside `references/summary-template.md`

## `phase-XX-<name>.md` format

Follow the template inside `references/phase-template.md`

### Step 7: Review and Refine

Before presenting the plan, verify:

- Paths are exact and consistent
- Phase order is logical
- Tasks are actionable (no vague steps)
- Verification is defined for each phase
- Risks/assumptions are explicit
- Plan is executable without hidden context

Then present for user review.

If multiple viable approaches exist, present options and ask for one of:

- **Validate**: refine via additional clarifying questions
- **Confirm**: approve current plan for execution

Iterate until confirmed.

### Step 8: Handoff

When approved, end with:

Plan `<relative_path_to_plan>/SUMMARY.md` is ready.  
Use `/clear` and then `/execute-plan <relative_path_to_plan>/SUMMARY.md` to execute it.

## Rules

- Never automatically implement or execute the code change in the same session, always finished when completed planning and ready for user review.
- Prefer explicit file paths and concrete commands
- Align with project standards and existing architecture
- Keep plans self-contained and deterministic
- If the write-plan request comes from a brainstorm session, we can skip many steps like gathering documents, clarifying requirements, and researching, because those should have been covered in the brainstorm session. In that case, we can directly start from Step 4: Define Strategy and Phases, using the information from the brainstorm session as context.
