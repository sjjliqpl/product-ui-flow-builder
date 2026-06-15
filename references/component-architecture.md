# Component Architecture

This skill creates a UI flow design document. The structure is about editing and reviewing product page designs, not about implementing the product app.

## Navigation Model

1. Chapter layer
   - A chapter groups related product pages.
   - Chapters render as parent nodes in the left tree navigation.
   - Chapters are organizational; avoid putting page-specific UI directly in chapter components or navigation nodes.

2. Page layer
   - A product page renders as a clickable leaf node under a chapter.
   - One product page maps to one `PageDesignBlock`.
   - One page sketch maps to one independent component in `src/design-pages/`.
   - Only the active page maps to a rendered `PageDesignBlock`.
   - A `PageDesignBlock` always has a compact description panel and a larger sketch canvas.

## Required Files

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
    SamplePage.tsx
```

Use product-specific names for `design-pages/*`; `SamplePage.tsx` is only the neutral template example.

`ChapterSection` is not required in the navigation model. If a generated project keeps it for local reasons, it must not render all pages in a chapter.

## Data Shape

`designStructure.ts` should export:

- page components mapping, or imports used by page records
- `chapters`, an ordered array
- each chapter record includes `id`, `title`, optional `description`, and ordered `pages`
- each page record includes:
  - `id`
  - `title`
  - `intent`
  - `logic`
  - optional `states`
  - optional `notes`
  - `component`

Page ids must be stable because `FlowShell` uses them for active selection. Default the active page to the first page of the first chapter.

## Rendering Rules

- `App.tsx` stays thin and passes `chapters` into `FlowShell`.
- `FlowShell` owns active page state, finds the active page record, and renders one `PageDesignBlock`.
- `FlowNavigation` renders the desktop chapter/page tree and calls `onSelectPage(page.id)`.
- `MobileNavigationDrawer` renders the same tree in a drawer and closes after selecting a page.
- `PageDesignBlock` receives one page record and renders `DescriptionPanel`, `SketchCanvas`, and the page component.
- Never map over every page to render every `PageDesignBlock` in the main content area.

## Edit Rules

- Page sketch change: edit `src/design-pages/<PageName>.tsx`.
- Explanation change: edit `src/data/designStructure.ts`.
- Page insertion: create one page component, then add one page record in the correct array position.
- Shared design-board layout change: edit `components/frame/*` or `components/flow/*`.
- Navigation behavior change: edit `FlowShell.tsx`, `FlowNavigation.tsx`, or `MobileNavigationDrawer.tsx`.
- Avoid broad rewrites when only one page or one description changes.
