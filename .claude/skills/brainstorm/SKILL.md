---
name: brainstorm
description: "You MUST use this before any creative work - creating features, building components, adding functionality, or modifying behavior. Explores user intent, requirements and design before implementation."
---

# Brainstorming Ideas Into Designs

## Overview

Help turn ideas into fully formed designs and specs through natural collaborative dialogue.

Start by understanding the current project context, then ask questions one at a time to refine the idea. Once you understand what you're building, present the design in small sections (200-300 words), checking after each section whether it looks right so far. The output should be stored in file markdown (long-memory).

## Workflow

### Step 1: Requirement Clarification (The Interrogation)

- Check out the current project state first (files, docs, recent commits, README.md, etc),
- **Important**: The documentations generated from the AI Agents usually stored inside `docs` directory, and there may have multiple documentation `.md` files.
- Scout the project codebase or even whole project files to understand the project context
- Always try to detect if the same necessary libraries or packages or dependencies are already installed or not to preventing redundant installations or over installing packages.
- Ask questions one at a time to refine the idea
- Prefer multiple choice questions when possible, but open-ended is fine too
- Only one question per message - if a topic needs more exploration, break it into multiple questions
- Focus on understanding: purpose, constraints, success criteria

### Step 2: Exploring approaches

- Propose 2-3 different approaches with trade-offs
- Present options conversationally with your recommendation and reasoning
- Lead with your recommended option and explain why

### Step 3: Presenting the design

- Once you believe you understand what you're building, present the design
- Break it into sections of 200-300 words
- Ask after each section whether it looks right so far
- Cover: architecture, components, data flow, error handling, testing
- Be ready to go back and clarify if something doesn't make sense

### Step 4: Documentation (The Output)

- Write the results for user to review to `docs/brainstorms/YYYY-MM-DD-<topic>/**.md` (The result can be separated into multiple files if needed) and the main file is `docs/brainstorms/YYYY-MM-DD-<topic>/SUMMARY.md`
- Ask the user to review the results and provide feedback, if there are no feedback, ask the user if they want to write the plan immediately
- If the user want to write the plan immediately, execute the skill `write-plan` to start writing the plan based on the inputs and the brainstorming results

## Key Principles

- **One question at a time** - Don't overwhelm with multiple questions
- **Multiple choice preferred** - Easier to answer than open-ended when possible
- **YAGNI ruthlessly** - Remove unnecessary features from all designs
- **Explore alternatives** - Always propose 2-3 approaches before settling
- **Incremental validation** - Present design in sections, validate each
- **Be flexible** - Go back and clarify when something doesn't make sense
- **Only brainstorming** - Must not write any code or commit any changes, just provide documentations or plans if needed.
