# Project PDR — Use Cases

## Installation Scenarios

| Scenario                   | User Goal                                                              | Expected Behavior                                                                                                                                                                                                          |
| -------------------------- | ---------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Codex plugin install       | Use CoBrew workflows in Codex through the plugin path                  | Run `codex plugin marketplace add buiducnhat/cobrew`, then install or enable the `cobrew` plugin from that marketplace. Workflow skills load project context themselves from `docs/SUMMARY.md` when present                |
| Claude Code plugin install | Use CoBrew workflows in Claude Code through the plugin path            | Run `claude plugin marketplace add buiducnhat/cobrew` or `/plugin marketplace add buiducnhat/cobrew`, then install or enable `cobrew`. Workflow skills load project context themselves from `docs/SUMMARY.md` when present |
| Direct skills CLI install  | Use CoBrew workflows in a non-plugin agent or plugin-unavailable setup | Run `npx skills add buiducnhat/cobrew` and follow the skills CLI flow                                                                                                                                                      |

## Workflow Skill Scenarios

| Situation                                                      | Expected Skill                    |
| -------------------------------------------------------------- | --------------------------------- |
| Requirements are incomplete and the user must answer questions | `ask`                             |
| The problem is exploratory or has multiple valid approaches    | `brainstorm`                      |
| The change is large enough to require phased execution         | `write-plan`, then `execute-plan` |
| The change is small, low-risk, and easy to verify              | `quick-implement`                 |
| A bug or failing behavior needs root-cause diagnosis           | `fix`                             |
| Current uncommitted changes need review                        | `review`                          |
| Repository documentation needs to be created or refreshed      | `docs`                            |
| Docs, plans, markdown, or context need visual mapping          | `visualize`                       |
| Staged or unstaged changes need a conventional commit message  | `git-commit`                      |

## Maintainer Use Cases

- Keep Codex and Claude Code plugin metadata aligned with the first-party skills and README guidance.
- Add or refine first-party skills under `plugins/cobrew/skills/` while keeping repository docs and README content aligned.
- Preserve design context for larger changes in `docs/brainstorms/` and `docs/plans/`.
- Update first-party skill guidance once under `plugins/cobrew/skills/` and keep plugin bundle metadata aligned.

## Key Requirements

- Installation must remain idempotent.
- Codex and Claude Code user docs should recommend plugins before `npx`.
- Non-plugin user docs should recommend `npx skills add buiducnhat/cobrew`.
- Plugin workflow skills should be self-contained for project context loading.
- The skill set should be reusable across many supported agents without per-agent authoring forks in this repository.
- Documentation should be sufficient for agents working inside the repository to load context in a predictable order.
- Repository changes that affect workflow conventions should be reflected in `docs/` and `README.md`.
