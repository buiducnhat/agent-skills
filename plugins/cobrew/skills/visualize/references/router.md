# Template Router

Choose the smallest template that fits the requested source and planned block set.

## Routes

| Source                                                                             | Template                          | Output                                                                                                                                   |
| ---------------------------------------------------------------------------------- | --------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| Standard plan folder with `SUMMARY.md` and `phase-XX-*.md` files                   | `templates/plan.html`             | `visualize.html` plus `visualize-assets/` in the plan folder                                                                             |
| Standard brainstorm folder with `SUMMARY.md` and `section-XX-*.md` files           | `templates/context.html`          | `visualize.html` plus `visualize-assets/` in the brainstorm folder                                                                       |
| Current context tied to an active plan or brainstorm artifact folder               | matching plan or context template | `visualize.html` plus `visualize-assets/` in the active artifact folder                                                                  |
| Single markdown or document file                                                   | `templates/document.html`         | `<source-base>.visualize.html` plus `<source-base>.visualize-assets/` beside the source                                                  |
| Conversation, pasted text, or arbitrary context with no associated artifact folder | `templates/context.html`          | `docs/.visualizations/<slug>-YYMMDD-HHmm/visualize.html` plus `docs/.visualizations/<slug>-YYMMDD-HHmm/visualize-assets/` unless specified |

## Fallbacks

- Mixed inputs: use the dominant source type and add a source list, decision trail, dependency map, or source-audit gap block only when the combined sources support it.
- Review or source-audit requests: keep the dominant source template, but route the page toward warnings, source-audit gaps, decisions, risks, and recommendation evidence instead of forcing a neutral summary.
- Directory without plan files: treat as mixed context only if the user supplied enough content; otherwise ask.
- Missing requested file: stop and report the missing path.
- Multiple possible output locations: prefer source-adjacent output when a source path exists.
- Active plan or brainstorm context: prefer the active artifact folder over `docs/.visualizations/`.
- Existing output file: overwrite only when that is the obvious user request or the file was generated in the current task; otherwise ask.

## Asset Paths

- Plan outputs always use `./visualize-assets/visualize-theme.css`.
- Brainstorm and active artifact folder outputs always use `./visualize-assets/visualize-theme.css`.
- Document outputs must link `./<source-base>.visualize-assets/visualize-theme.css`.
- Source-less context outputs under `docs/.visualizations/<slug>-YYMMDD-HHmm/` must link `./visualize-assets/visualize-theme.css`.
- Copy the CSS into the adjacent generated assets folder before writing HTML, and update any template default path that does not already match the chosen output contract.
