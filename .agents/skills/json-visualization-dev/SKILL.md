---
name: json-visualization-dev
description: Develop and maintain the JSON Visualization web application - a Next.js tool for visualizing JSON/YAML/CSV/XML data as interactive graphs. Use when working with this codebase, adding features, fixing bugs, or understanding the graph visualization, data conversion, or type generation systems.
license: See LICENSE.md in project root
compatibility: Requires Node.js >=24.x, pnpm package manager
metadata:
  author: json-visualization
  version: "1.0"
  tech-stack: "Next.js 16, React 19, TypeScript, Zustand, styled-components, Mantine v8"
---

# JSON Visualization Development Skill

This skill helps you work with the JSON Visualization codebase - an open-source web application for visualizing and manipulating JSON data.

## When to use this skill

- Adding new features to the editor, graph visualization, JsonDraw view, or converters
- Fixing bugs in data parsing, rendering, or state management
- Understanding the codebase architecture and data flow
- Creating new data format converters or type generators
- Modifying UI components or styling

## Project overview

**What it does**: Converts JSON, YAML, CSV, and XML into interactive graphs/trees with features like format conversion, validation, code generation, JsonDraw editing, and image export.

**Tech stack**:

- Next.js 16 (React 19) + TypeScript
- Zustand for state management
- styled-components + Mantine v8 for UI
- Monaco Editor for text editing
- Reaflow for graph visualization
- React Flow (reactflow) for interactive mind map canvas
- Embedded JsonDraw packages under `src/jsondraw/`

## Quick start

```bash
# Install dependencies
pnpm install

# Start dev server
pnpm dev  # http://localhost:3979

# Lint and format
pnpm lint
pnpm lint:fix
```

## Architecture

### Core directories

```text
src/
|-- pages/              # Next.js routes (index, editor, draw, mindmap, docs, converters)
|-- features/
|   |-- editor/         # Main editor (TextEditor, GraphView, TreeView, JsonDrawView, Toolbar)
|   |-- mindmap/        # Mind Map (NoteCardNode, canvas, useMindmap, formatConverters, exportPng)
|   |-- docs/           # Docs views (MindmapDocsView, JsonDrawDocsView, etc.)
|   `-- modals/         # Modal components and ModalController
|-- store/              # Zustand stores (useFile, useConfig, useJson, useModal)
|-- components/         # Reusable UI (buttons, animations, effects)
|-- layout/             # Page layouts (Navbar, Footer, converter/type layouts)
|-- lib/utils/          # Utilities (jsonAdapter, json2go, json2dart, generateType, search)
|-- hooks/              # Custom hooks
|-- constants/          # Theme, global styles, graph config, enums in enumData.ts
|-- data/               # Static data
|-- assets/             # Imported images and static assets
|-- jsondraw/           # Embedded JsonDraw packages
`-- types/              # TypeScript type definitions
```

### Data flow

1. **Input** -> `useFile` store -> `contentToJson()` -> `useJson` store
2. **Graph render** -> `useGraph.setGraph(json)` -> `jsonParser.ts` -> Reaflow canvas
3. **View render** -> `GraphView`, `TreeView`, or `JsonDrawView` selected via `viewMode` session storage
4. **Mind Map flow** -> Markdown outline / JSON / Mermaid -> `useMindmap.parseAndLayout()` -> `treeToFlowElements()` -> React Flow canvas with node CRUD and bi-directional text sync
5. **Actions** -> Toolbar -> Modals -> Store updates -> Re-render

### Key files

- `src/store/useFile.ts` - File operations, content management, parsing, session persistence
- `src/store/useJson.ts` - Pretty-printed JSON string and graph update trigger
- `src/features/editor/views/GraphView/stores/useGraph.ts` - Graph nodes, edges, viewport, loading, fullscreen, selection
- `src/features/editor/views/GraphView/lib/jsonParser.ts` - JSON string to graph nodes/edges
- `src/features/mindmap/stores/useMindmap.ts` - Mind map state, immutable tree CRUD, format switching, layout, and search
- `src/features/mindmap/lib/treeToFlow.ts` - Converts NoteNode tree into React Flow nodes and edges (horizontal/vertical)
- `src/features/mindmap/lib/formatConverters.ts` - Lossless data conversions across Markdown, JSON, and Mermaid
- `src/lib/utils/jsonAdapter.ts` - JSON/YAML/XML/CSV parsing and conversion
- `src/constants/enumData.ts` - `FileFormat`, `TypeLanguage`, `ViewMode`, and option lists

## Code style guidelines

### TypeScript

```typescript
// Good: use type imports
import type { MenuItemProps } from "@mantine/core";
// Avoid regular imports for types
import { MenuItemProps } from "@mantine/core";
```

### Import order

The order is enforced by `@trivago/prettier-plugin-sort-imports` in `.prettierrc`:

1. React (`react`, `react/*`)
2. Next.js (`next`, `next/*`)
3. `@mantine/core`
4. Other `@mantine` packages
5. `styled-components`
6. Third-party modules
7. Internal `src/` imports
8. Relative imports (`./`, `../`)

### Naming conventions

- **Components**: PascalCase (`Navbar.tsx`, `GraphView.tsx`)
- **Hooks**: camelCase with `use` prefix (`useFocusNode.ts`)
- **Stores**: camelCase with `use` prefix, default export except `useModal`
- **Styled components**: Prefix with `Styled` (`StyledButton`)
- **Functions**: camelCase (`fetchUrl`, `setContents`)

### Formatting

- Double quotes only
- Semicolons required
- Max 100 chars per line
- No multiple empty lines
- Avoid parens for single arrow function params: `x => x * 2`

## Common tasks

### Adding a new converter

1. Create route in `src/pages/converter/[format1]-to-[format2].tsx`.
2. Use `src/layout/ConverterLayout/ToolPage.tsx`.
3. Use `FileFormat` from `src/constants/enumData.ts`.
4. Keep conversion logic in `src/lib/utils/jsonAdapter.ts`.
5. Update `src/layout/ConverterLayout/PageLinks.tsx` if navigation should expose it.

### Adding a new type generator

1. Create route in `src/pages/type/[format]-to-[language].tsx`.
2. Use `src/layout/TypeLayout/TypegenWrapper.tsx`.
3. Use `TypeLanguage` from `src/constants/enumData.ts`.
4. Generation logic lives in `src/lib/utils/generateType.ts`, `json2go.js`, or `json2dart.ts`.
5. Update `src/layout/TypeLayout/PageLinks.tsx` if navigation should expose it.

### Creating a Zustand store

```typescript
import { create } from "zustand";

interface MyState {
  value: string;
}

interface MyActions {
  setValue: (value: string) => void;
}

const useMyStore = create<MyState & MyActions>()(set => ({
  value: "",
  setValue: value => set({ value }),
}));

export default useMyStore;
```

### Creating a styled component

```typescript
import styled from "styled-components";

const StyledButton = styled.button`
  background-color: #f7c948;
  color: #1a1a1a;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  transition: all 0.3s ease;

  &:hover {
    background-color: #37ff8b;
  }
`;
```

## Design system

**Colors**:

- Background: `#f7f3e6` (warm beige)
- Primary text: `#1a1a1a`
- Accent: `#37ff8b` (neon green)
- Yellow: `#f7c948`

**Fonts**:

- Global: Playfair Display (serif)
- Code/editor: JetBrains Mono / `MONO_FONT_FAMILY`

## Important notes

- **No tests**: Project has no automated test suite - do not create tests unless requested.
- **Package manager**: Use `pnpm` only, not npm or yarn.
- **Node version**: `>=24.x` required.
- **Dev port**: `pnpm dev` serves on `http://localhost:3979`.
- **Supported conversion formats**: JSON, YAML, XML, CSV.
- **Enums**: Current app enums live in `src/constants/enumData.ts`.
- **ESLint**: `src/enums` is ignored by config, but the current project does not use it for app enums.

## Getting help

- See [references/ARCHITECTURE.md](references/ARCHITECTURE.md) for detailed architecture.
- See [references/COMPONENTS.md](references/COMPONENTS.md) for component catalog.
- See [references/STATE.md](references/STATE.md) for state management patterns.
- Check `AGENTS.md` in project root for full guidelines.
