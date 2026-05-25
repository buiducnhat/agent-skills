# Verification

Run these checks before delivering a visualization.

## Required Checks

- HTML file exists and opens as text without malformed template markers.
- CSS link resolves to a copied local `visualize-theme.css`.
- CSS link path matches the chosen output contract (`visualize-assets/`, `<source-base>.visualize-assets/`, or `visualize-YYMMDD-HHmm-<slug>.visualize-assets/`).
- Mermaid CDN script is present when Mermaid blocks are used.
- `mermaid.initialize({ startOnLoad: true })` is present.
- Diagram containers are not empty and Mermaid source remains readable before render.
- Mermaid is omitted when it would only mirror headings, repeat nearby prose, or add decorative noise.
- Source metadata is visible.
- Each major panel has enough source-backed content to justify its presence, or the panel is removed or converted into a warning or gap block.
- No empty panels, placeholder prose, or leftover instruction comments remain in the delivered HTML.
- No repeated summary content appears across hero text, takeaways, and panel bodies unless repetition is clearly purposeful.
- Recommendations cite a supporting fact, risk, blocker, or missing evidence from the source.
- Review or critique outputs surface the relevant gaps, risks, decisions, or unsupported claims instead of defaulting to a neutral summary.
- Source-derived text is HTML-escaped unless it is intentional generated markup authored by the agent.
- Low-value boilerplate is pruned; sections that add nothing beyond headings or file names are removed.
- Text does not overlap at desktop width.
- Missing source content is shown as an assumption or warning, not silently filled in.

## Optional Browser Check

When browser or Playwright tooling is available:

1. Open the generated HTML.
2. Capture a screenshot at desktop width.
3. Confirm the page is not blank.
4. Confirm the primary layout, Mermaid blocks, and warning/assumption blocks render without overlap.
