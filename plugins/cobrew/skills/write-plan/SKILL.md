---
name: write-plan
description: Create detailed, execution-ready implementation plans for complex or high-risk changes without coding. Use for ExecPlan-style work, multi-hour changes, significant refactors, migrations, resumable phase checklists, and work that should be handed off to execute-plan with clear validation.
argument-hint: "[--non-visualize] [brief description of the change to plan]"
license: MIT
---

# Write Plan

## Overview

Produce a complete, self-contained implementation plan that can be executed by `execute-plan` with minimal ambiguity, even after `/clear` or by another agent.

This skill is for planning only:

- Do not implement code
- Do not modify production files (except plan artifacts)

## Workflow

### Step 1: Contextualize

Load only the project context relevant to the requested change:

- If `docs/SUMMARY.md` exists, read it first.
- Load only task-relevant detail docs.
- Prioritize `Code Standard` docs for implementation conventions.
- If docs conflict with code or user intent, use the available input/question tool before broad changes.

Then inspect only the code areas relevant to the requested change.

Capture:

- User-visible purpose and expected outcome
- Existing patterns to follow
- Constraints and dependencies
- Files, modules, commands, and docs that orient the executor
- Risks, assumptions, and unknowns

### Step 2: Initialize Plan Artifacts

1. Create: `docs/.plans/YYMMDD-HHmm-<plan-slug>/`
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
- Use input/question tool for gathering answers, context.
- State assumptions explicitly in `SUMMARY.md`. If multiple interpretations of the request exist, list them and ask — never pick silently.

### Step 4: Define Strategy and Phases

Design a phased strategy that is safe and verifiable.

Each phase should have:

- A clear objective
- The complexity and risk level appropriate to the phase with values: `S`, `M`, `L`, `XL`
- Ordered tasks
- Verification commands
- Observable acceptance criteria and exit criteria

Granularity rule:

- Tasks should be small, concrete each.
- Prefer phases that can be resumed safely. Document idempotency, recovery notes, or rollback constraints for risky work.

### Step 5: Research (Only if Needed)

Research is optional and should be proportional to uncertainty.

Preferred order:

1. Existing project docs and code
2. Existing skills and local references
3. External references (only if available in the current environment)

If external research capability is unavailable, proceed with local evidence and explicitly list assumptions and open questions.

Document findings in:

- `docs/.plans/YYMMDD-HHmm-<plan-slug>/research/<topic>.md`

### Step 6: Write Plan artifacts

- `SUMMARY.md` format
  Follow the template inside `references/summary-template.md`

- `phase-XX-<name>.md` format
  Follow the template inside `references/phase-template.md`

- Use skill `visualize` to visualize the plan, otherwise, skip visualization if `--non-visualize` is present.

### Step 7: Review and Refine

Before presenting the plan, verify:

- Paths are exact and consistent
- Phase order is logical
- Tasks are actionable (no vague steps)
- Verification is defined for each phase
- Acceptance criteria are observable
- Risks/assumptions are explicit
- Plan is executable without hidden context from the current chat

Then present for user review.

If multiple viable approaches exist, present options and ask for one of: (use input/question tool for selection)

- **Confirm**: approve current plan for execution
- **Validate**: refine via additional clarifying questions

### Step 8: Handoff

End with:

```md
Plan `<relative_path_to_plan>/SUMMARY.md` is ready.
```

If visualization was created, also include:

```md
Visualization `<relative_path_to_plan>/visualize.html` is ready.
```

## Rules

- Never automatically implement or execute the code change in the same session. Optional plan visualization is allowed only after user selection and only for the plan artifacts.
- Prefer explicit file paths and concrete commands
- Align with project standards and existing architecture
- Keep plans self-contained, deterministic, and resumable. A fresh agent should be able to continue from the plan folder alone.
- **Plan the minimum viable change:** No speculative phases, no "just in case" abstractions, no flexibility that wasn't requested. If a plan can be 3 phases instead of 6, make it 3. Every task should trace directly to a stated requirement.
- Write artifacts in language same with the current session.
