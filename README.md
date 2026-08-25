# SDUI Report Editor

This application is a browser-based report builder for creating and previewing server-driven UI (SDUI) credit reports. It combines a live canvas, component tree, property inspector, and JSON editing tools so you can assemble report layouts and tweak metadata without leaving the editor.

## What the app does

The editor is designed around a credit health report experience with:

- A live report canvas that renders a dynamic SDUI document
- Edit mode and view mode toggle for previewing changes
- A left-side component outline for navigating the report structure
- A right-side property inspector for editing selected elements
- Built-in viewport modes for desktop, tablet, and mobile layouts
- Undo/redo history, reset, publish, and raw JSON access
- Sample financial report content using charts, progress bars, cards, and impact lists

This project uses React, TypeScript, Vite, MUI, Redux Toolkit, and Recharts.

## Getting started

### Prerequisites

- Node.js 18+
- npm or another Node package manager

### Install dependencies

```bash
npm install
```

### Run the app locally

```bash
npm run dev
```

Then open the local URL shown in the terminal, typically:

- http://localhost:5173

### Production build

```bash
npm run build
```

To preview the production bundle locally:

```bash
npm run preview
```

## How to use the app

### 1. Toggle edit mode

Use the Edit Mode / View Mode button in the top app bar to switch between the builder and a read-only preview.

- Edit mode shows the component tree and property editor
- View mode hides editing controls and focuses on the rendered report

### 2. Navigate the report structure

When edit mode is enabled, the left sidebar lists all report components in the current document tree.

- Click a component to select it
- Use the tree to understand the report hierarchy
- The canvas background click deselects the current item when editing

### 3. Add or adjust components

Open the component palette from the top toolbar. This allows you to insert report blocks into the document, such as:

- alert banners
- cards
- charts
- metrics
- progress bars
- impact lists
- typography blocks

Once selected, the property inspector lets you modify fields for the highlighted component.

### 4. Edit report metadata

The header includes a button to edit the report title. You can also inspect the document through the JSON modal for direct schema-level changes.

The report payload includes important metadata such as:

- report ID
- title and subtitle
- version
- update dates
- theme configuration

### 5. Review the live report canvas

The center pane renders the actual report as it would appear to users. The app comes with a sample credit report that demonstrates:

- a top warning banner
- summary metrics
- utilization progress bars
- score history chart
- debt distribution chart
- balance breakdown
- score impact factors
- action cards

### 6. Use viewport and history controls

The toolbar includes:

- desktop / tablet / mobile viewport toggles
- undo and redo actions
- a saved/unsaved status indicator

This helps you validate the document across different screen sizes and recover from changes quickly.

### 7. Publish, reset, or inspect JSON

From the header you can:

- publish the report
- reset the draft back to an earlier state
- open the raw JSON view of the report data

The Reset action prompts for confirmation before clearing document changes.

## Project structure

- src/App.tsx: main application layout and report canvas
- src/components/editor: editing UI, tree, inspector, and modal dialogs
- src/components/sdui: rendering layer for SDUI content blocks
- src/store: Redux state, history, and report actions
- src/data/defaultCreditReport.ts: starter report definition
- src/types: TypeScript models for report editor and SDUI payloads

## Notes for development

- The app state is managed centrally with Redux Toolkit.
- The report structure is driven by a JSON-like SDUI payload rather than hardcoded markup.
- The renderer dynamically maps component types to visual components, which makes it easy to extend with new report blocks.

## Typical workflow

1. Start the app with npm run dev.
2. Switch to Edit Mode.
3. Select a component from the outline or canvas.
4. Update its properties in the inspector.
5. Preview the result in the live report area.
6. Use the JSON modal or metadata tools to adjust the report payload.
7. Publish or reset as needed.

## Troubleshooting

If the app does not start:

```bash
npm install
npm run dev
```

If you need a clean production output, run:

```bash
npm run build
```

This project is intended as a flexible SDUI report authoring workspace and can be extended with new component types, editor actions, or API integrations.
