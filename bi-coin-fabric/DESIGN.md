---
name: Garuda Digital Rupiah
description: Restrained central-bank utility interface for a two-tier retail Digital Rupiah prototype.
colors:
  reserve-navy: "#173a5e"
  reserve-navy-deep: "#102c49"
  ledger-blue: "#245d8f"
  focus-blue: "#2f6f9f"
  ink: "#172033"
  slate: "#5f6b7a"
  rule-line: "#d6dde6"
  control-edge: "#aab7c5"
  surface: "#ffffff"
  surface-soft: "#eef2f6"
  canvas: "#f4f6f8"
  chip-tint: "#e4ebf2"
  settled-green: "#18794e"
  caution-amber: "#9a6700"
  freeze-red: "#b42318"
  role-validator: "#285f8f"
  role-pjp: "#176b87"
  role-observer: "#667085"
  console-night: "#102033"
typography:
  display:
    fontFamily: "ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif"
    fontSize: "clamp(1.55rem, 2.6vw, 2.2rem)"
    fontWeight: 700
    lineHeight: 1.2
  headline:
    fontFamily: "ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif"
    fontSize: "clamp(1.35rem, 2vw, 1.8rem)"
    fontWeight: 700
    lineHeight: 1.2
  figure:
    fontFamily: "ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif"
    fontSize: "1.8rem"
    fontWeight: 700
    lineHeight: 1.2
    fontFeature: "tnum"
  title:
    fontFamily: "ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif"
    fontSize: "1rem"
    fontWeight: 750
    lineHeight: 1.3
  body:
    fontFamily: "ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.45
  body-dense:
    fontFamily: "ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif"
    fontSize: "0.84rem"
    fontWeight: 400
    lineHeight: 1.45
  label:
    fontFamily: "ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif"
    fontSize: "0.72rem"
    fontWeight: 800
    lineHeight: 1.2
    letterSpacing: "0.08em"
  mono:
    fontFamily: "ui-monospace, SFMono-Regular, Menlo, Consolas, monospace"
    fontSize: "0.84rem"
    fontWeight: 400
    lineHeight: 1.45
rounded:
  xs: "4px"
  sm: "6px"
  md: "8px"
  lg: "10px"
  pill: "999px"
spacing:
  xs: "4px"
  sm: "8px"
  md: "12px"
  lg: "16px"
  xl: "20px"
  2xl: "24px"
  3xl: "32px"
components:
  button-primary:
    backgroundColor: "{colors.reserve-navy}"
    textColor: "{colors.surface}"
    typography: "{typography.title}"
    rounded: "{rounded.sm}"
    padding: "10px 14px"
    height: "42px"
  button-primary-hover:
    backgroundColor: "{colors.reserve-navy-deep}"
  button-secondary:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.reserve-navy}"
    typography: "{typography.title}"
    rounded: "{rounded.sm}"
    padding: "10px 14px"
    height: "42px"
  button-secondary-hover:
    backgroundColor: "{colors.surface-soft}"
  button-secondary-danger:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.freeze-red}"
    rounded: "{rounded.sm}"
    padding: "10px 14px"
  input:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    typography: "{typography.body}"
    rounded: "{rounded.sm}"
    padding: "10px 12px"
  nav-tab:
    backgroundColor: "transparent"
    textColor: "{colors.slate}"
    padding: "9px 12px"
    height: "40px"
  nav-tab-active:
    textColor: "{colors.reserve-navy}"
  card:
    backgroundColor: "{colors.surface}"
    rounded: "{rounded.md}"
    padding: "20px"
  card-institutional:
    backgroundColor: "{colors.surface}"
    rounded: "{rounded.md}"
    padding: "16px"
  card-retail:
    backgroundColor: "{colors.surface}"
    rounded: "{rounded.md}"
    padding: "24px"
  participant-badge:
    backgroundColor: "{colors.reserve-navy}"
    textColor: "{colors.surface}"
    rounded: "{rounded.pill}"
    padding: "4px 8px"
  table-header:
    backgroundColor: "{colors.surface-soft}"
    textColor: "{colors.slate}"
    padding: "11px 12px"
---

# Design System: Garuda Digital Rupiah

## Overview

**Creative North Star: "The Settlement Ledger"**

The interface should read like a reconciled ledger page at a central-bank desk. It is quiet, ruled, and exact. Every screen is a set of bordered white sheets on a pale cool canvas. Navy carries authority, and figures sit in tabular columns so balances line up. Nothing decorates: no shadows, no gradients, no motion. Structure comes from 1px rules, tonal fills, and heavy uppercase labels.

One visual system serves two densities. The institutional shell (Bank Indonesia, Participants, Supervisor) is compact: 16px card padding, 0.84rem table text, 9–10px cells. The retail shell (Retail Customer, Merchant) uses the same tokens with more room: 24px card padding and 46px buttons. The guided-demo rail and the Prototype Lab console are the only surfaces that invert to navy or night.

Confirmed anti-reference: the crypto/Web3 dashboard. That means no neon, no glowing coins, no dark trading-terminal mood, and no gradient hero panels. This is a monetary authority's utility tool, not a token exchange.

**Key Characteristics:**
- Flat white sheets on a cool grey canvas, separated by 1px cool-grey rules.
- One navy voice for authority: primary actions, active navigation, and key figures.
- Tabular numerals on every monetary value.
- Heavy, tracked, uppercase micro-labels above data.
- System sans only; no web fonts.
- No shadows and no transitions.

## Colors

A cool, low-chroma navy-and-slate palette (hue about 250°), with three muted semantic states and nothing saturated.

### Primary
- **Reserve Navy** (`reserve-navy`): the system's single voice of authority. Used for primary buttons, the active nav-tab underline and text, the brand mark, headline figures (supply and summary values), participant badges, and the demo panel header. **Reserve Navy Deep** (`reserve-navy-deep`) is its hover state only.

### Secondary
- **Ledger Blue** (`ledger-blue`): the annotation color. Used for eyebrow labels above headings, Wallet IDs, callout left rules, links, and demo phase dots. It marks what to read, never what to press.
- **Focus Blue** (`focus-blue`): reserved for the 3px keyboard focus outline.

### Tertiary
- **Settled Green** (`settled-green`): active status, success banners, receipt cards, completed demo steps.
- **Caution Amber** (`caution-amber`): pending status, warning callouts, manual demo actions.
- **Freeze Red** (`freeze-red`): frozen status, error banners, destructive secondary buttons.
- **Role tints** (`role-validator`, `role-pjp`, `role-observer`): participant-badge fills that distinguish Validator Bank, PJP, and Observer. They are for badges only.

### Neutral
- **Ink** (`ink`): all headings and body text.
- **Slate** (`slate`): secondary text, labels, table headers, inactive nav tabs.
- **Rule Line** (`rule-line`): every card border, table row divider, and header underline.
- **Control Edge** (`control-edge`): input and secondary-button borders, which are one step darker than rules so controls read as interactive.
- **Surface** (`surface`): cards, header, inputs.
- **Surface Soft** (`surface-soft`): table header rows, hover fills, callouts, hero context blocks.
- **Canvas** (`canvas`): page background behind all sheets.
- **Chip Tint** (`chip-tint`): hero chips and demo role tags.
- **Console Night** (`console-night`): the Prototype Lab world-state console only.

### Named Rules
**The One Voice Rule.** Reserve Navy is the only filled accent. A screen should have one navy filled button per task area. Everything else is a white secondary button.

**The Status Is Text Rule.** Status (active, pending, frozen) is conveyed by colored text or a tinted banner, never by a saturated fill block.

## Typography

**Display Font:** system UI sans (`ui-sans-serif, system-ui, …`)
**Body Font:** same stack
**Label/Mono Font:** `ui-monospace, SFMono-Regular, Menlo, Consolas` for IDs, hashes, and keys

**Character:** Native system sans at firm weights (650–800) gives an operational feel without choosing a brand typeface. Hierarchy comes from weight and tracking more than from size.

### Hierarchy
- **Display** (700, `clamp(1.55rem, 2.6vw, 2.2rem)`, 1.2): hero panel title on Overview. One per screen.
- **Headline** (700, `clamp(1.35rem, 2vw, 1.8rem)`, 1.2): workspace heading for each tab.
- **Figure** (700, 1.8rem, tabular): metric-card values. Supply value scales to 2.5rem at 750.
- **Title** (750, 1rem): button text, demo titles, card titles.
- **Body** (400, 1rem, 1.45): default copy. Heading descriptions cap at 760px.
- **Body Dense** (400, 0.84rem): institutional table cells and dense forms.
- **Label** (800, 0.72rem, 0.08em tracking, uppercase): eyebrows, metric labels, table headers (0.74rem, 0.05em), header context captions (0.7rem).

### Named Rules
**The Tabular Money Rule.** Every monetary value, balance, and count uses `font-variant-numeric: tabular-nums`. Numeric table cells are right-aligned.

**The Label-Above Rule.** Data is introduced by a tracked uppercase label in Slate or Ledger Blue, never by a colon-suffixed inline label.

## Layout

The page is a centered column with a maximum width of 1600px and fluid side padding of `clamp(18px, 3vw, 40px)`. A sticky white header holds a three-column topbar: brand block, session context strip, and actions. Below it is a horizontally scrollable tab row. Main content starts 28px below the header and has 48px bottom padding.

Content is built from vertical stacks with 16px gaps. Grids are used for metrics (4 columns), panels (2 columns), and participant forms (3 columns). When the guided demo is active, the workspace becomes a two-column layout: fluid main content plus a 280–320px demo rail. Forms and transfer cards cap at 760px.

Responsive steps:
- **1100px:** the topbar drops the context strip to a second row, metrics become 2 columns, and the demo rail stacks below the content.
- **800px:** panel, form, and field grids collapse to 1 column, and the context strip scrolls horizontally.
- **480px:** side padding becomes 16px, metrics become 1 column, and buttons in rows stretch to full width.

Tables keep a 680px minimum width inside a horizontally scrolling shell, so they are never squeezed.

## Elevation & Depth

The system is flat by rule. There are no `box-shadow` values anywhere. Depth comes from three tonal layers (Canvas, Surface, Surface Soft) and 1px Rule Line borders. The sticky header separates from content with a bottom rule only. Inverted surfaces (the navy demo header and the Console Night world-state panel) mark tool chrome, not elevation.

### Named Rules
**The No-Shadow Rule.** Never add a shadow. If an element needs separation, give it a border or a different tonal layer.

## Shapes

Corners are gently rounded and consistent: 6px on controls (buttons and inputs), 8px on cards, banners, and panels, 10px only on the login card, and 4px on skeleton blocks and small console chips. Pills (999px) are reserved for participant badges, status chips, and demo role pills. Circles are used only for demo step numbers and phase dots. Borders are always 1px, except the 3px accent rules: the active nav-tab underline, the active demo-step left edge, and callout left edges.

## Components

### Buttons
Procedural and restrained, like forms at a bank counter.
- **Shape:** 6px radius, 42px minimum height (46px in the retail shell).
- **Primary:** Reserve Navy fill with a navy border, white 750-weight text, 10px × 14px padding.
- **Hover / Focus:** hover darkens to Reserve Navy Deep with no transition. Focus shows a 3px Focus Blue outline with a 2px offset.
- **Secondary:** white fill, Control Edge border, navy text. Hover changes the border to navy and the fill to Surface Soft. The `danger` variant uses Freeze Red text, and the `warning` variant uses Caution Amber text.
- **Disabled:** 0.62 opacity with a not-allowed cursor.

### Chips / Badges
- **Participant badge:** pill with white 700-weight 0.75rem text on a role tint (navy by default; `role-validator`, `role-pjp`, or `role-observer` by role).
- **Status:** plain colored text with no fill, using Settled Green, Caution Amber, or Freeze Red.

### Cards / Containers
- **Corner Style:** 8px.
- **Background:** Surface on Canvas.
- **Shadow Strategy:** none (see Elevation & Depth).
- **Border:** 1px Rule Line.
- **Internal Padding:** 20px by default, 16px in the institutional shell, 24px in the retail shell.
- **Variants:** review, contact, and intent cards use a near-white `#fbfcfd`. Receipt cards use a pale green `#f1faf5` fill with a `#a8d5bb` border. Warning cards use a `#e5a7a1` border.

### Inputs / Fields
- **Style:** white fill, 1px Control Edge border, 6px radius, 10px × 12px padding. The label sits above the field in 650-weight Ink, with a 6px gap.
- **Focus:** 3px Focus Blue outline with a 2px offset. There is no border color shift and no glow.
- **Help text:** 0.82rem Slate below the field.

### Navigation
- **Top tabs:** transparent, 0.85rem, 700-weight Slate text, with a 3px transparent bottom border. Hover changes the text to Ink on Surface Soft. The active tab uses navy text with a 3px navy underline. Tabs scroll horizontally on narrow screens.

### Banners and Callouts
- **Banner:** 8px radius, 1px tinted border, 650-weight text. Success uses a `#eef9f2` fill with `#11633f` text. Error uses a `#fff3f2` fill with `#9c2118` text.
- **Callout:** 3px Ledger Blue left rule on Surface Soft. The warning variant uses an amber rule on `#fff8e8`.

### Data Table (signature)
The ledger itself. Full width with collapsed borders. The header row uses Surface Soft with uppercase tracked Slate labels. Rows are divided by 1px Rule Line borders and cells are top-aligned. Numeric cells are right-aligned and tabular. Selectable rows hover to `#f7f9fb`. An empty state is a centered Slate line with 24px padding.

### Guided Demo Rail (signature)
A 320px white rail with a Reserve Navy header, pale-blue kicker text, and a thin progress bar. The current-step block sits on `#eef4f8`. Steps are grouped by phase. The active step has a 3px navy left edge and a filled navy number circle. Completed steps show a green number on a green tint. Manual actions appear in an amber box.

### World-State Console (signature, Prototype Lab only)
A Console Night panel with a navy toolbar, outlined small tabs (5px radius), and a white iframe frame. It is the only dark surface in the system and is clearly tool chrome.

### Loading Skeleton
Static `#dfe5eb` blocks with a 4px radius, arranged to match the final layout. There is no shimmer or pulse.

## Do's and Don'ts

### Do:
- **Do** use `var(--navy)`, `var(--line)`, and the other `:root` custom properties in `frontend/src/styles.css`. They are the live source of these tokens.
- **Do** keep one Reserve Navy filled button per task area. Every other action is a white secondary button.
- **Do** set `font-variant-numeric: tabular-nums` on every Rupiah amount and right-align numeric columns.
- **Do** introduce data with a 0.72rem, 800-weight, 0.08em-tracked uppercase label.
- **Do** separate surfaces with 1px Rule Line borders and tonal fills.
- **Do** keep the 3px Focus Blue outline with a 2px offset on every interactive element.
- **Do** keep institutional screens dense (16px padding, 0.84rem tables) and retail screens roomier (24px padding, 46px buttons).

### Don't:
- **Don't** add `box-shadow`, gradients, glows, or blur.
- **Don't** drift toward a crypto/Web3 dashboard: no neon accents, glowing coin imagery, dark trading-terminal themes, or gradient heroes.
- **Don't** hardcode hex values in components. `DemoPanel.tsx` currently sets inline `phaseColor` values (`#2563eb`, `#16a34a`, `#d97706`, `#374151`) that sit outside the palette. Replace them with tokens rather than copying them.
- **Don't** use saturated fills for status. Status is colored text or a tinted banner.
- **Don't** add web fonts. The system sans and system mono stacks are the typography.
- **Don't** use dark surfaces outside the demo rail header and the Prototype Lab console.
