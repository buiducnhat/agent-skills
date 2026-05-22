# Template Router

Choose the smallest template that fits the requested source.

## Routes

| Source                                                           | Template                  | Output                                                                                              |
| ---------------------------------------------------------------- | ------------------------- | --------------------------------------------------------------------------------------------------- |
| Standard plan folder with `SUMMARY.md` and `phase-XX-*.md` files | `templates/plan.html`     | `visualize.html` plus `visualize-assets/` in the plan folder                                        |
| Brainstorm folder with `SUMMARY.md`                              | `templates/plan.html`     | `visualize.html` plus `visualize-assets/` in the brainstorm folder                                  |
| Single markdown or document file in a subfolder                  | `templates/document.html` | `<source-base>.visualize.html` plus `<source-base>.visualize-assets/` beside the source             |
| Root-level document file                                         | `templates/document.html` | `visualize.html` plus `visualize-assets/` in `docs/visualizes/YYMMDD-HHmm-<slug>/` unless specified |
| Conversation, pasted text, or arbitrary context                  | `templates/context.html`  | `visualize.html` plus `visualize-assets/` in `docs/visualizes/YYMMDD-HHmm-<slug>/` unless specified |

## Fallbacks

- Mixed inputs: use the dominant source type and add a source list block.
- Directory without plan files: treat as mixed context only if the user supplied enough content; otherwise ask.
- Missing requested file: stop and report the missing path.
- Multiple possible output locations: prefer source-adjacent output only when the source lives in a subfolder; route root-level sources and source-less context to `docs/visualizes/YYMMDD-HHmm-<slug>/`. Never write generated HTML to the project root.
- Existing output file: overwrite only when that is the obvious user request or the file was generated in the current task; otherwise ask.

## Asset Paths

Plan, brainstorm, root-level document, and context outputs all use `visualize.html` next to a `visualize-assets/` folder, so the default `./visualize-assets/visualize-theme.css` href needs no change. Only subfolder document outputs adjust the asset folder name to `<source-base>.visualize-assets/`.
