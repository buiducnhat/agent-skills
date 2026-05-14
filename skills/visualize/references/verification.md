# Verification

Run these checks before delivering a visualization.

## Required Checks

- HTML file exists and opens as text without malformed template markers.
- CSS link resolves to a copied local `visualize-theme.css`.
- Mermaid CDN script is present when Mermaid blocks are used.
- `mermaid.initialize({ startOnLoad: true })` is present.
- Diagram containers are not empty and Mermaid source remains readable before render.
- Source metadata is visible.
- Text does not overlap at desktop width.
- Missing source content is shown as an assumption or warning, not silently filled in.

## Optional Browser Check

When browser or Playwright tooling is available:

1. Open the generated HTML.
2. Capture a screenshot at desktop width.
3. Confirm the page is not blank.
4. Confirm the primary layout, Mermaid blocks, and warning/assumption blocks render without overlap.
