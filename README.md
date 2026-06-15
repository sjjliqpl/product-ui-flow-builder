# Product UI Flow Builder

[中文 README](./README.zh-CN.md)

Product UI Flow Builder is a Codex skill for creating product UI flow design documents as maintainable React projects. It turns a product-flow request into a Vite + React + TypeScript + Tailwind design board with a persistent page tree, a compact product explanation panel, and one active page sketch at a time.

The project is meant for design exploration and product review, not production app implementation. Generated output should live in a `ui-flow-design/` directory in the user's workspace, while this repository keeps the skill instructions, reusable architecture references, scaffolding script, and neutral React template.

## What It Creates

- A left navigation tree organized by chapters and pages.
- One active page rendered at a time for focused review.
- A description panel for intent, page logic, states, and notes.
- A large sketch canvas for the current product page design.
- A mobile drawer that exposes the same navigation on narrow screens.
- A componentized structure that keeps page sketches independent.

## Repository Layout

```text
.
├── SKILL.md
├── agents/openai.yaml
├── assets/react-tailwind-flow-template/
├── references/
│   ├── component-architecture.md
│   └── visual-design-rules.md
└── scripts/create_flow_project.py
```

`assets/react-tailwind-flow-template/` is the neutral runnable template. It is also the source for the GitHub Pages demo. The template intentionally includes only one sample page so generated projects do not inherit product-specific demos.

## Quick Start

Create a new UI flow design project from the template:

```bash
python3 scripts/create_flow_project.py
```

The script creates `ui-flow-design/` in the current working directory. If that directory already exists and looks like a React project, the script leaves it in place. If it exists but is not a recognized React project, the script refuses to overwrite it.

Run the template locally:

```bash
cd assets/react-tailwind-flow-template
npm install
npm run dev
```

Build the template:

```bash
cd assets/react-tailwind-flow-template
npm install
npm run build
```

## GitHub Pages Demo

This repository includes a GitHub Actions workflow that builds `assets/react-tailwind-flow-template/` and publishes its `dist/` output to GitHub Pages.

After the repository is pushed to GitHub:

1. Open the repository settings.
2. Go to **Pages**.
3. Set the source to **GitHub Actions** if it is not already selected.
4. Push to `main` or run the `Deploy template demo to Pages` workflow manually.

The workflow sets `VITE_BASE_PATH` to `/${{ github.event.repository.name }}/`, so the built assets work correctly under the repository Pages path.

## Generated Project Architecture

Generated UI flow projects should follow this structure:

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

Key rules:

- `App.tsx` stays thin and passes `chapters` into `FlowShell`.
- `designStructure.ts` owns chapter order, page order, explanation text, and component mapping.
- `FlowShell` owns active page selection and defaults to the first page.
- `FlowNavigation` and `MobileNavigationDrawer` render the same chapter/page tree.
- `PageDesignBlock` renders only the active page, with explanation and sketch side by side on desktop.
- Individual product page sketches live in `src/design-pages/`.

## Editing Guidelines

- Modify a single product page sketch in `src/design-pages/<PageName>.tsx`.
- Modify page explanation text in `src/data/designStructure.ts`.
- Add a page by creating one page component and one `designStructure.ts` record.
- Change navigation behavior in `components/frame/FlowShell.tsx`, `FlowNavigation.tsx`, or `MobileNavigationDrawer.tsx`.
- Avoid rewriting unrelated pages or the full flow when only one page needs iteration.

See [component architecture](./references/component-architecture.md) and [visual design rules](./references/visual-design-rules.md) for the complete guidance.

## Requirements

- Python 3.9+
- Node.js 20+ recommended for the React template
- npm or a compatible package manager

## License

Open source under the MIT License.
