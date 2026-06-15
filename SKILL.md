---
name: product-ui-flow-builder
description: Define and generate UI flow design documents as componentized Vite React TypeScript Tailwind projects. Use when the user wants product UI design drafts, user-flow design pages, UX architecture boards, or HTML UI-flow prototypes converted into a maintainable React structure with a left tree navigation, one active page sketch at a time, a compact description panel beside the sketch, and a fixed ui-flow-design output directory.
---

# Product UI Flow Builder

## Core Idea

Use this skill to create a **UI flow design document**, not the product application itself.

The generated artifact is a design-board style React project where product pages are organized in a left tree navigation:

- left navigation: chapters and their product pages
- active page content: compact description, logic, notes, assumptions, and product-manager style explanation
- main sketch area: the concrete page sketch for the currently selected product page

The skill defines the architecture and modification rules. It must not carry reusable business demos. The actual product pages are generated from the user's request each time.

## Workflow

1. Inspect the current project root and look for `ui-flow-design/`.
2. If `ui-flow-design/package.json` and `ui-flow-design/src/App.tsx` exist, update that React project in place.
3. If `ui-flow-design/` does not exist, run:

```bash
python3 /Users/viper/.codex/skills/product-ui-flow-builder/scripts/create_flow_project.py
```

4. If `ui-flow-design/` exists but is not a recognizable React project, stop and report the directory conflict. Do not overwrite it.
5. Treat `assets/react-tailwind-flow-template/` as a minimal runnable React shell only. It may include one neutral sample page that proves navigation, active-page rendering, and the mobile drawer. It must not contain product examples, demo flows, or business-specific mockups.
6. Generate the actual UI flow design structure inside `ui-flow-design/src/` according to the current user request.
7. Keep all later iterations inside `ui-flow-design/`. Do not create dated, versioned, or alternate output directories.

## Required Output Architecture

Read `references/component-architecture.md` before creating or restructuring a project.

The generated `ui-flow-design/src/` should use this shape:

```text
src/
  App.tsx
  data/designStructure.ts
  components/
    frame/
      FlowShell.tsx
      FlowNavigation.tsx
      MobileNavigationDrawer.tsx
      DescriptionPanel.tsx
      SketchCanvas.tsx
    flow/
      PageDesignBlock.tsx
  design-pages/
    One React component per product page sketch
```

Rules:
- `App.tsx` composes the UI flow design document and should stay thin: pass `chapters` into `FlowShell` and avoid product-page logic.
- `designStructure.ts` owns chapter order, page order, left-side description content, and component mapping.
- `FlowShell` owns or delegates the active page selection state. Default to the first page in the first chapter.
- `FlowNavigation` renders the chapter/page tree and changes the active page when a page node is clicked.
- `MobileNavigationDrawer` exposes the same chapter/page tree in a drawer on narrow screens.
- `PageDesignBlock` renders only the active page: compact description on the left and sketch canvas on the right.
- Every concrete product page sketch lives in `src/design-pages/` as an independent component.
- Do not render every page block by default. The document should show one active page at a time.

## Modification Rules

- To modify one page sketch, edit only `src/design-pages/<PageName>.tsx` unless shared frame behavior is involved.
- To modify left-side explanation text, edit `src/data/designStructure.ts`.
- To insert a page between two pages, add one `src/design-pages/*` component and insert one record in `designStructure.ts`.
- To remove a page, remove its design structure record first; delete the component only when no record references it.
- To change navigation or active-page behavior, edit `components/frame/FlowShell.tsx`, `FlowNavigation.tsx`, or `MobileNavigationDrawer.tsx`.
- Do not rewrite the whole flow, `App.tsx`, or unrelated pages because one page is unsatisfactory.

## Visual Scope

Read `references/visual-design-rules.md` before large visual redesigns.

The skill controls the visual style of the **UI flow design document**:
- overall canvas
- left tree navigation
- compact description panel
- main sketch container
- typography, rhythm, and scanability

The skill does not impose the visual style of the product app inside the right-side sketch. Generate the product app's style from the user's request.

## Handling Existing HTML

When converting an existing single HTML prototype:
- Preserve the user-flow logic and important page order.
- Convert each meaningful page/mockup into its own `design-pages/*` component.
- Convert explanatory copy into `designStructure.ts`.
- Preserve the converted page order in the tree navigation, but render only the active page.
- Preserve the source HTML unless the user explicitly asks to replace it.

## Validation

After creating or updating a project:
- Run install if dependencies are missing.
- Run `npm run build`.
- Start the Vite dev server when the user needs to view or compare the result.
- For visual work, use the browser to verify desktop and mobile layouts when feasible.
