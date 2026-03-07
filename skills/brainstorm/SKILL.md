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
3. Produce a concrete, validated design brief in artifacts or a handoff to planning

## Workflow

### Step 1: Gather Project Context

Load project context per the shared Context Loading Protocol. Also check key implementation files relevant to the idea and note constraints from existing architecture, dependencies, and conventions.

Keep this pass focused. Only gather what is needed for the current idea.

### Step 2: Clarify Requirements

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

_(Only perform this step after the user has explicitly chosen “Write artifacts” during Step 6.)_

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

After you and the user have worked through requirements and any clarifying questions, it's time to decide what to do with the information.

1. Use `AskUserQuestion` to present the user with three high‑level next actions:
   - "Write artifacts" – continue by authoring the brainstorm documents described in Step 5.
   - "Write plan immediately (in current context)" – skip the artifact step and move straight to a `write-plan` handoff.
   - "End session (already provided enough information for user)" – stop; the conversation has produced enough insight for now.

2. If the user picks **Write artifacts**, create the appropriate files under `docs/brainstorms/...` per Step 5. Once the draft artifacts exist, use `AskUserQuestion` again to validate them with options:
   - "Write plan with current artifacts, context"
   - "End session - artifacts are sufficient for now"
   - "Need changes" (free‑form text) – collect the feedback, revise the artifacts, and re‑ask.

3. If the user picked **Write plan immediately**, initiate a handoff to `write-plan` using the current brainstorming context; no additional artifact validation is required.

4. If the user picked **End session**, simply stop. The information collected so far is considered sufficient.

(For all questions above, follow the AskUserQuestion mandate: ask one question at a time with selectable options.)

## Rules

- Do not write production code or make implementation changes in this skill in the brainstorm session
- Keep interaction lightweight and iterative, every steps should be run in the same session, do not break the flow by asking the user to run separate commands
- Prefer clarity over completeness when uncertain; ask a follow-up question
- Align all recommendations with project documentation and standards
- Keep assumptions explicit; do not guess silently

## Output Quality Checklist

Before finalizing `SUMMARY.md`, confirm:

- Requirements are explicit and testable
- Scope and non-goals are clear
- Recommended approach is justified with trade-offs
- Risks and unknowns are documented
- Handoff to planning is actionable
