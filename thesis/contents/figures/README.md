# Figure source policy

- Internally generated thesis figures use TikZ or monochrome PlantUML.
- LaTeX captions provide figure numbering. PlantUML titles remain unnumbered.
- Activity PNG files are generated from named blocks in
  `bi-coin-fabric/docs/diagrams/plantuml/activity-diagrams.puml` by running
  `rtk python render-activity-diagrams.py` from the repository root.
- Controls-study class, activity, and use-case PNG files are rendered from the
  corresponding `.puml` files in `bi-coin-fabric/docs/diagrams/plantuml/` using
  `plantuml -tpng` and stored under `thesis/contents/chapter-3/`.
- External reference figures retain the source image and citation. Wide figures
  are rotated at inclusion time so embedded text remains legible.
- Figures excluded from the active manuscript are stored under
  `thesis/reviews/excluded-figures/` with their exclusion rationale.
