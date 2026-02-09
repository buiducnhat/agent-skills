---
name: write-plan
description: Create detailed, step-by-step implementation plans for complex features, no coding needed.
---

# Write Plan

## Overview

Create comprehensive, self-contained implementation plans without coding, just documentations. The progress should thinking about the approaches, architecture, components, data flow, error handling, testing, etc. For the complex features that need to research, use web search tool to find the best approaches and solutions.

## Workflow

### Step 1: Initialize Plan Artifacts

1.  **Contextualize:**
    - Scout the documentations of the codebase to understand existing patterns and dependencies.
    - Review `docs/` for project guidelines.
2.  **Initialize Plan:**
    - Create directory: `docs/plans/YYMMDD-HHmm-<plan-slug>/`.
    - Create main file: `docs/plans/YYMMDD-HHmm-<plan-slug>/SUMMARY.md`.

### Step 2: Define Phased Strategy (The Master Plan)

The plan must be structured for machine or human execution.

**File Structure:**

- `SUMMARY.md`: High-level overview, architecture, and phase list.
- `phase-N-<name>.md`: Detailed, bite-sized tasks for each phase.
- **Format for `SUMMARY.md`:**

  ```markdown
  # Implementation Plan: <Title>

  > Created Date: YYYY-MM-DD HH:mm:ss

  > Status: In Progress

  ## Objective

  - What are we building?

  ## Architecture

  - Approach and design decisions.

  ## Phases

  - [ ] **Phase 1: Database & Backend Setup**
    - Goal: Create migrations, update schema, define Zod schemas.
  - [ ] **Phase 2: API Implementation**
    - Goal: Build Controller, Service, and Route.
  - [ ] **Phase 3: Frontend Integration**
    - Goal: Build UI Components and hook up TanStack Query.

  ## Key Changes

  - What are the key changes we need to make to the codebase?

  ## Reference Files

  - What are the reference files we need to refer to?

  ## Dependencies

  - What are the dependencies we need to install?
  ```

**Granularity:**

- Break tasks down to 2-5 minute actions (e.g., "Create file", "Write test", "Implement function").

### Step 3: Detailed Specifications (The Blueprints)

#### Research (if needed)

- Only necessary when the plan is complex or need to research new approaches and solutions
- Use web search tool to find the best approaches and solutions, the output files will be stored in `docs/plans/YYYY-MM-DD-<plan-slug>/research/<title>.md`, after that the plan can be written with the additional research results context.

#### Main Summary (`SUMMARY.md`)

- **Objective:** What are we building?
- **Architecture:** Approach and design decisions.
- **Phases:** List of phases with links to phase files.
- **Key Changes:** What are the key changes we need to make to the codebase?
- **Reference Files:** What are the reference files we need to refer to?
- **Dependencies:** What are the dependencies we need to install?

#### Phase Files (`phase-N-<name>.md`)

- **Objective:** Specific objective of this phase.
- **Tasks:** Sequential steps:
  1.  **Context:** Files to create/modify.
  2.  **Test:** Code for the failing test.
  3.  **Implement:** Minimal code to pass.
  4.  **Verify:** Command to run tests.

### Step 4: Review & Refine

1.  **Self-Correction:** Ensure file paths are exact and commands are correct.
2.  **User Review:** Present the plan for feedback.
    - Iterate: Adjust based on user input.
    - Approval: Proceed only when confirmed.
    - For the complex plans or there are more than one approach, ask user for the validation with 2 options:
      - Validate: Ask more questions to clarify the plan, then loop until the plan is clear, updated
      - Confirm: The plan is clear and ready to execute
3.  **Announce:** Once finished, display the guide to the next step:
    ```
    Plan `<relative_path_to_plan>` is ready, use `/clear` and then `/execute-plan <relative_path_to_plan>` to execute it.
    ```

## Rules

- **Self-Contained:** The plan must possess all context needed for execution.
- **Exactness:** Use absolute or correct relative paths. No placeholders like `path/to/file`.
- **Verification First:** Always plan for testing/verification before marking a task complete.
- **Best Practices:** Always follow the best practices and coding standards of the project. If the techstack/issues can be found in the skill list, use them to ensure the best practices and coding standards are followed.
- **Follow documentations:** Always follow the documentations of the current project, usually in `docs/` directory. Especially follow the `code-standard.md` for coding standards, convensions,....

## Integration

- **execute-plan**: The skill used to execute these plans.
- **brainstorm**: The skill used to brainstorm ideas before writing the plan.
- Use script `.claude/scripts/get-time.sh` to get the current time with format `YYYY-MM-DD HH:mm:ss` and `YYMMDD-HHmm`.
