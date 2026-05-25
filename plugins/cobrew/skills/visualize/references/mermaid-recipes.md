# Mermaid Recipes

Prefer several small diagrams over one dense diagram. Keep labels factual and short. Use Mermaid only when it reveals flow, timing, dependency, state, or interaction that the prose alone would make harder to inspect. If Mermaid syntax is uncertain, use a readable HTML/CSS block instead.

## Process Flow

```mermaid
flowchart TD
  A[Load source] --> B[Extract facts]
  B --> C[Choose template]
  C --> D[Verify output]
```

## Timeline

```mermaid
timeline
  title Plan Phases
  Phase 1 : Add shell
  Phase 2 : Add references
  Phase 3 : Align docs
```

## Journey

```mermaid
journey
  title User Review Journey
  section Inspect
    Open visualization: 4: User
    Trace source links: 5: User
```

## Status Transitions

```mermaid
stateDiagram-v2
  [*] --> Pending
  Pending --> InProgress
  InProgress --> Complete
  InProgress --> Blocked
```

## Actor Or System Interaction

```mermaid
sequenceDiagram
  participant User
  participant Agent
  participant Source
  User->>Agent: Request visualization
  Agent->>Source: Read source files
  Agent-->>User: HTML output
```

## Priority Or Risk Map

```mermaid
quadrantChart
  title Risk Priority
  x-axis Low likelihood --> High likelihood
  y-axis Low impact --> High impact
  Missing source detail: [0.6, 0.5]
```

Use a table fallback for risk maps when labels are long or quadrant placement is not source-backed.

Do not use Mermaid just to mirror the source heading tree, restate a bullet list, or decorate a panel that already reads clearly without a diagram.
