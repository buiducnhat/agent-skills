## Documentation Rules

Documentation structure:

```text
docs/
├── brainstorms/      # Long-term memory for exploration outputs
├── plans/            # Long-term memory for implementation plans
├── architecture.md   # Project architecture and system design
├── code-standard.md  # Coding standards and conventions
├── codebase.md       # Codebase map and key files
└── project-pdr.md    # Product requirements and business context
```

**CRITICAL**: Documentation is essential for project success. Always follow these rules:

1. **Always read project documentation first**  
   Before planning or implementing any feature, read project documentation to understand context, requirements, and existing patterns.

2. **Let documentation guide implementation**  
   Use documentation as the source of truth. If documentation conflicts with implementation needs, clarify with the user instead of guessing.

## Core Workflow Skills

| Skill             | Description                                                               |
| ----------------- | ------------------------------------------------------------------------- |
| `ask`             | Ask clarifying questions to gather requirements and context               |
| `bootstrap`       | Set up project structure, documentation, and conventions for new projects |
| `brainstorm`      | Explore ideas and break down complex problems before planning             |
| `docs`            | Initialize (`--init`) or update (`--update`) project documentation        |
| `execute-plan`    | Execute written plans systematically with checkpoints                     |
| `fix`             | Diagnose and resolve bugs (suggests `write-plan` for complex issues)      |
| `quick-implement` | Rapid implementation for simple tasks or bug fixes                        |
| `review`          | Review uncommitted changes with codebase context                          |
| `write-plan`      | Create detailed implementation plans with phases and tasks                |

## Important Reminders

### Interaction Preferences

When asking questions during task execution:

- Prefer interactive prompts with selectable options **when the current interface supports them**.
- For 2-5 choices, prefer concise option menus.
- If interactive options are not available, ask short, focused text questions.
- Pause for a full user response only when:
  - The question requires detailed explanation, or
  - The user needs external context to answer.

### Critical Rules

- Always read project documentation before planning or implementation.
- Ask clarifying questions when documentation is unclear or incomplete.
- Follow every step in each workflow skill; do not skip required steps.
- Follow rules: YAGNI, KISS, DRY, SOLID, and the principle of least surprise.
