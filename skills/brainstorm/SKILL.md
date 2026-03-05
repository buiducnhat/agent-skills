---
name: brainstorm
description: Collaborative discovery and design framing for ambiguous or high-risk work. Use when requirements are unclear, multiple approaches are possible, or you need to turn an idea into a validated design brief before planning or coding.
---

# Brainstorm

## Overview

Use this skill to convert rough ideas into clear, reviewable design outputs through structured dialogue.

The goal is to:

1. Clarify requirements and constraints
2. Explore alternatives with trade-offs
3. Produce a concrete, validated design brief in `docs/brainstorms/...`
4. Hand off cleanly to `write-plan` when the user is ready

This skill is for exploration and specification only. Do not implement code changes.

## Workflow

### Step 1: Gather Project Context

Load project context per the shared Context Loading Protocol. Also check key implementation files relevant to the idea and note constraints from existing architecture, dependencies, and conventions.

Keep this pass focused. Only gather what is needed for the current idea.

### Step 2: Clarify Requirements (One Question at a Time)

Ask targeted questions sequentially to remove ambiguity. Follow the AskUserQuestion mandate.

- Focus on:
  - Objective and user value
  - Scope boundaries
  - Constraints (technical, UX, performance, timeline)
  - Success criteria
  - Non-goals

Do not jump to implementation details too early.

### Step 3: Explore Approaches

Propose 2-5 viable approaches.

For each approach, include:

- Short summary
- Pros
- Cons / risks
- Complexity estimate
- Recommended use conditions

Lead with your recommended option and explain why it best fits the project context and constraints.

After presenting all approaches, use `AskUserQuestion` to let the user pick their preferred approach (e.g., "Approach A — recommended", "Approach B", "Approach C", "Need more details before deciding").

### Step 4: Present the Design Incrementally

Once requirements are clear, present the design in small sections (about 200-300 words each), validating after each section.

Suggested section order:

1. Problem framing and goals
2. Proposed architecture / flow
3. Data model and interfaces
4. Error handling and edge cases
5. Testing and verification strategy
6. Rollout considerations (if applicable)

After each section, use `AskUserQuestion` to ask whether to proceed, adjust, or revisit. Provide concrete options (e.g., "Proceed to next section", "Adjust this section", "Go back to a previous section").

### Step 5: Write Brainstorm Artifacts

Persist results to the standardized location:

- Directory: `docs/brainstorms/YYMMDD-HHmm-<topic-slug>/`
- Main file (required): `docs/brainstorms/YYMMDD-HHmm-<topic-slug>/SUMMARY.md`
- Optional supporting files:
  - `docs/brainstorms/YYMMDD-HHmm-<topic-slug>/section-01-<slug>.md`
  - `docs/brainstorms/YYMMDD-HHmm-<topic-slug>/section-02-<slug>.md`
  - etc.

`SUMMARY.md` should contain:

- Title
- Created timestamp
- Context
- Goals / non-goals
- Chosen approach and rationale
- Alternatives considered
- Risks and mitigations
- Open questions
- Next step recommendation

### Step 6: Close the Loop

After writing artifacts:

1. Use `AskUserQuestion` to ask the user to review — options: "Looks good", "I have feedback", "Need major changes"
2. If feedback exists, revise artifacts and re-ask
3. If approved, use `AskUserQuestion` to ask whether to proceed to planning — options: "Proceed to write-plan", "Not yet, keep brainstorming", "Done for now"
4. If approved, hand off to `write-plan` using the brainstorm output as source context

## Rules

- Do not write production code or make implementation changes in this skill in the brainstorm session
- Keep interaction lightweight and iterative, every steps should be run in the same session, do not break the flow by asking the user to run separate commands
- Prefer clarity over completeness when uncertain; ask a follow-up question
- Apply YAGNI: remove unnecessary features from proposals
- Align all recommendations with project documentation and standards
- Keep assumptions explicit; do not guess silently

## Output Quality Checklist

Before finalizing `SUMMARY.md`, confirm:

- Requirements are explicit and testable
- Scope and non-goals are clear
- Recommended approach is justified with trade-offs
- Risks and unknowns are documented
- Handoff to planning is actionable
