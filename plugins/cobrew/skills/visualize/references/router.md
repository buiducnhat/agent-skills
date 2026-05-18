# Template Router

Choose the smallest template that fits the requested source.

## Routes

| Source                                                           | Template                  | Output                                                                                                     |
| ---------------------------------------------------------------- | ------------------------- | ---------------------------------------------------------------------------------------------------------- |
| Standard plan folder with `SUMMARY.md` and `phase-XX-*.md` files | `templates/plan.html`     | `visualize.html` plus `visualize-assets/` in the plan folder                                               |
| Single markdown or document file                                 | `templates/document.html` | `<source-base>.visualize.html` plus `<source-base>.visualize-assets/` beside the source                    |
| Conversation, pasted text, or arbitrary context                  | `templates/context.html`  | `visualize-YYMMDD-HHmm-<slug>.html` plus matching assets in the current working directory unless specified |

## Fallbacks

- Mixed inputs: use the dominant source type and add a source list block.
- Directory without plan files: treat as mixed context only if the user supplied enough content; otherwise ask.
- Missing requested file: stop and report the missing path.
- Multiple possible output locations: prefer source-adjacent output when a source path exists.
- Existing output file: overwrite only when that is the obvious user request or the file was generated in the current task; otherwise ask.

## Asset Paths

Plan templates link `./visualize-assets/visualize-theme.css`. Document and context outputs may need the asset folder name adjusted to `<source-base>.visualize-assets/` or `visualize-YYMMDD-HHmm-<slug>.visualize-assets/`.
