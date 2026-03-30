# Documentation Summary

agent-skills — A CLI installer and skill repository for standardizing coding-agent workflows across many local agent environments with one command.
Monorepo built with TypeScript, Bun, and Turbo; publishes `@buiducnhat/agent-skills` and ships repo-owned workflow skills plus shared agent instructions.

## Architecture

System design, component interactions, data flows, deployment, and external integrations.

| File                                                     | Description                                                                                                    |
| -------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------- |
| [architecture/components.md](architecture/components.md) | Installer components, skill inventory, rules injection flow, docs archive roles, and monorepo responsibilities |

## Codebase

Directory structure, entry points, API patterns, and key modules.

| File                                           | Description                                                                              |
| ---------------------------------------------- | ---------------------------------------------------------------------------------------- |
| [codebase/structure.md](codebase/structure.md) | Repository tree, key entry points, generated docs layout, config files, and build output |

## Code Standard

Conventions, naming rules, tech stack versions, and development workflows.

| File                                                         | Description                                                                                                        |
| ------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------ |
| [code-standard/conventions.md](code-standard/conventions.md) | Docs-first workflow, question-tool expectations, tooling commands, naming, and documentation authoring conventions |

## Project PDR

Product goals, use cases, business rules, and constraints.

| File                                                 | Description                                                                                                  |
| ---------------------------------------------------- | ------------------------------------------------------------------------------------------------------------ |
| [project-pdr/goals.md](project-pdr/goals.md)         | Problem statement, product purpose, supported workflows, scope boundaries, and success criteria              |
| [project-pdr/use-cases.md](project-pdr/use-cases.md) | Installation scenarios, workflow-skill usage patterns, and operational constraints for users and maintainers |

## Other

Historical design notes and execution records that document why major installer and skill changes were made.

| File                                                                                                                                 | Description                                                                      |
| ------------------------------------------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------- |
| [brainstorms/260227-1653-skill-preservation/SUMMARY.md](brainstorms/260227-1653-skill-preservation/SUMMARY.md)                       | Brainstorm summary for preserving skill content during installer changes         |
| [brainstorms/260301-0001-replace-ruler-with-skills-cli/SUMMARY.md](brainstorms/260301-0001-replace-ruler-with-skills-cli/SUMMARY.md) | Brainstorm summary for replacing the previous ruler workflow with the skills CLI |
| [brainstorms/260301-0051-own-tui-agent-selection/SUMMARY.md](brainstorms/260301-0051-own-tui-agent-selection/SUMMARY.md)             | Brainstorm summary for moving agent selection into the local TUI flow            |
| [brainstorms/260305-2309-simplify-skills/SUMMARY.md](brainstorms/260305-2309-simplify-skills/SUMMARY.md)                             | Brainstorm summary for simplifying the skill set and shared instructions         |
| [brainstorms/260309-1610-cursor-skills-fix/SUMMARY.md](brainstorms/260309-1610-cursor-skills-fix/SUMMARY.md)                         | Brainstorm summary for fixing Cursor-specific skill handling                     |
| [plans/260227-1241-ci-tag-npm-publish/SUMMARY.md](plans/260227-1241-ci-tag-npm-publish/SUMMARY.md)                                   | Plan entry point for npm publishing on `v*` tags                                 |
| [plans/260227-1540-skill-preservation/SUMMARY.md](plans/260227-1540-skill-preservation/SUMMARY.md)                                   | Plan entry point for preserving skill content during installer refactors         |
| [plans/260227-1655-skill-preservation-output/SUMMARY.md](plans/260227-1655-skill-preservation-output/SUMMARY.md)                     | Plan entry point for improving skill-preservation output and verification        |
| [plans/260301-0003-replace-ruler-with-skills-cli/SUMMARY.md](plans/260301-0003-replace-ruler-with-skills-cli/SUMMARY.md)             | Plan entry point for replacing ruler integration with the skills CLI             |
| [plans/260301-0054-own-tui-agent-selection/SUMMARY.md](plans/260301-0054-own-tui-agent-selection/SUMMARY.md)                         | Plan entry point for local TUI-based agent selection                             |
| [plans/260302-0913-add-copy-flag/SUMMARY.md](plans/260302-0913-add-copy-flag/SUMMARY.md)                                             | Plan entry point for adding the `--copy` install mode                            |
| [plans/260305-2312-simplify-skills/SUMMARY.md](plans/260305-2312-simplify-skills/SUMMARY.md)                                         | Plan entry point for simplifying shipped skills and AGENTS content               |
| [plans/260305-2358-copy-symlink-install-mode/SUMMARY.md](plans/260305-2358-copy-symlink-install-mode/SUMMARY.md)                     | Plan entry point for interactive copy-versus-symlink selection                   |
| [plans/260306-1317-global-flag/SUMMARY.md](plans/260306-1317-global-flag/SUMMARY.md)                                                 | Plan entry point for adding home-directory global installation                   |
| [plans/260309-1610-cursor-skills-fix/SUMMARY.md](plans/260309-1610-cursor-skills-fix/SUMMARY.md)                                     | Plan entry point for the Cursor skills installation fix                          |
