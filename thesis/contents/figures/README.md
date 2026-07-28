# Figure source policy

- Internally generated thesis figures use TikZ or monochrome PlantUML.
- LaTeX captions provide figure numbering. PlantUML titles remain unnumbered.
- Activity PNG files are generated from named blocks in
  `bi-coin-fabric/docs/diagrams/plantuml/activity-diagrams.puml` by running
  `rtk python render-activity-diagrams.py` from the repository root.
- External reference figures retain the source image and citation. Wide figures
  are rotated at inclusion time so embedded text remains legible.
- Figures excluded from the active manuscript are stored under
  `thesis/reviews/excluded-figures/` with their exclusion rationale.
