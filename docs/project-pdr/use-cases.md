# Project PDR — Use Cases

## Installation Scenarios

| Scenario                              | User Goal                                                                               | Expected Behavior                                                                                                     |
| ------------------------------------- | --------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------- |
| Project-local interactive install     | Configure a subset of agents for the current repository                                 | Prompt for agent selection, prompt for symlink or copy mode, install skills, then update local rules files            |
| Project-local non-interactive install | Bootstrap agent skills in CI or scripted setup                                          | Install all skills without prompts, detect any agent layouts that exist on disk, and inject rules only where possible |
| Global install                        | Make the skill set available across many repositories                                   | Use the home directory as the installation base and detect agent layouts there                                        |
| Copy-mode install                     | Support environments where symlinks are undesirable or unsupported                      | Pass the copy flag through to the skills CLI so independent copies are installed                                      |
| Shell bootstrap install               | Provide a one-line entry point for users who do not want to type the full `npx` command | Verify Node.js availability and version, then delegate to the npm package                                             |

## Workflow Skill Scenarios

| Situation                                                      | Expected Skill                    |
| -------------------------------------------------------------- | --------------------------------- |
| Requirements are incomplete and the user must answer questions | `as-ask`                          |
| The problem is exploratory or has multiple valid approaches    | `brainstorm`                      |
| The change is large enough to require phased execution         | `write-plan`, then `execute-plan` |
| The change is small, low-risk, and easy to verify              | `quick-implement`                 |
| A bug or failing behavior needs root-cause diagnosis           | `as-fix`                          |
| Current uncommitted changes need review                        | `as-review`                       |
| Repository documentation needs to be created or refreshed      | `docs`                            |
| Staged or unstaged changes need a conventional commit message  | `git-commit`                      |

## Maintainer Use Cases

- Publish new CLI versions to npm through the tag-driven release workflow.
- Add or refine first-party skills under `skills/` while keeping repository docs and README content aligned.
- Preserve design context for larger changes in `docs/brainstorms/` and `docs/plans/`.
- Update shared agent guidance once in `templates/AGENTS.md` and distribute it through rules injection.

## Key Requirements

- Installation must remain idempotent for text-based rules files.
- The skill set should be reusable across many supported agents without per-agent authoring forks in this repository.
- Documentation should be sufficient for agents working inside the repository to load context in a predictable order.
- Repository changes that affect workflow conventions should be reflected in `docs/` and `README.md`.
