# Documentation Summary

CoBrew — A plugin-first workflow skill bundle for Codex and Claude Code, plus direct skills CLI installation guidance for other coding-agent environments.
Bun-managed repository that ships checked-in Codex and Claude Code plugin bundles and maintains repo-owned workflow skills in `plugins/cobrew/skills/`.

## Agent Context Guide

Before planning or implementing, read this `docs/SUMMARY.md` file first. Load only the detail docs relevant to the current task, and prioritize `Code Standard` docs for implementation conventions. If docs conflict with code or user intent, use the available input/question mechanism before making broad changes.

## Architecture

System design, component interactions, data flows, deployment, and external integrations.

| File                                                     | Description                                                                                                                 |
| -------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------- |
| [architecture/components.md](architecture/components.md) | Checked-in plugin bundles, direct skills CLI guidance, skill inventory, docs archive roles, and repository responsibilities |

## Codebase

Directory structure, entry points, API patterns, and key modules.

| File                                           | Description                                                                            |
| ---------------------------------------------- | -------------------------------------------------------------------------------------- |
| [codebase/structure.md](codebase/structure.md) | Repository tree, key entry points, docs layout, config files, and plugin bundle layout |

## Code Standard

Conventions, naming rules, tech stack versions, and development workflows.

| File                                                         | Description                                                                                                         |
| ------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------- |
| [code-standard/conventions.md](code-standard/conventions.md) | Docs-first workflow, input/question expectations, tooling commands, naming, and documentation authoring conventions |

## Project PDR

Product goals, use cases, business rules, and constraints.

| File                                                 | Description                                                                                                     |
| ---------------------------------------------------- | --------------------------------------------------------------------------------------------------------------- |
| [project-pdr/goals.md](project-pdr/goals.md)         | Problem statement, plugin-first product purpose, supported workflows, scope boundaries, and success criteria    |
| [project-pdr/use-cases.md](project-pdr/use-cases.md) | Plugin and direct skills CLI installation scenarios, workflow-skill usage patterns, and operational constraints |
