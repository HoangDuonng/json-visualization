# Agent Guidelines for JSON Visualization

Project skills are maintained canonically in `.agents/skills/`. Each skill must contain a `SKILL.md` and may include only the references or scripts it actually needs.

This document provides guidelines for AI coding agents working in the JSON Visualization codebase.

> **💡 For comprehensive documentation**: See [`.agents/skills/json-visualization-dev/`](.agents/skills/json-visualization-dev/) for structured Agent Skills with detailed architecture, components, and state management references.

For public-page redesigns, also load [`.agents/skills/public-editorial-redesign/SKILL.md`](.agents/skills/public-editorial-redesign/SKILL.md) and its references. Keep `/editor`, `/draw`, and `/widget` outside that skill's modification scope.

## Project Overview

JSON Visualization is a Next.js 16 application for visualizing and manipulating JSON data. It uses React 19, TypeScript, Zustand for state management, styled-components for styling, and Mantine v8 for UI components.

## Build & Development Commands

### Development

```bash
pnpm dev              # Start development server on http://localhost:3000
pnpm build            # Build for production
pnpm start            # Start production server
```

### Linting & Formatting

```bash
pnpm lint             # Run TypeScript check, ESLint, and Prettier
pnpm lint:fix         # Auto-fix linting issues
```

### Testing

**Note**: This project currently has no test suite. Do not attempt to run tests.

### Other Commands

```bash
pnpm analyze          # Analyze bundle size
```

## Code Style Guidelines

### TypeScript

- **Strict mode enabled**: TypeScript strict mode is on, but `noImplicitAny` is disabled in `tsconfig.json`
- **Type imports**: Always use `import type` for type-only imports (enforced by ESLint)

  ```typescript
  // ✅ Correct
  import type { MenuItemProps } from "@mantine/core";
  // ❌ Wrong
  import { MenuItemProps } from "@mantine/core";
  ```

- **No implicit any**: `noImplicitAny` is off, but avoid `any` types when possible (and `@typescript-eslint/no-explicit-any` is off)
- **Type definitions**: Define interfaces for component props, store states, and function parameters

### Import Order

Imports must follow this specific order (enforced by Prettier plugin):

1. React imports (`react`, `react/*`)
2. Next.js imports (`next`, `next/*`)
3. `@mantine/core`
4. Other `@mantine` packages
5. `styled-components`
6. Third-party modules
7. Internal `src/` imports
8. Relative imports (`./`, `../`)

Example:

```typescript
import React from "react";
import Link from "next/link";
import { Button, Menu } from "@mantine/core";
import { useDebouncedValue } from "@mantine/hooks";
import styled from "styled-components";
import { toast } from "react-hot-toast";
import useGraph from "src/features/editor/views/GraphView/stores/useGraph";
import { isIframe } from "../lib/utils/helpers";
```

### Formatting Rules

- **Quotes**: Double quotes only (`"`)
- **Semicolons**: Required at end of statements
- **Line width**: 100 characters maximum
- **Trailing commas**: ES5 style (objects, arrays)
- **Arrow function parens**: Avoid for single parameters (`x => x * 2`)
- **Space in parens**: No spaces inside parentheses
- **No multiple empty lines**: Keep code compact

### Naming Conventions

- **Components**: PascalCase (`Navbar`, `JSONVizLogo`)
- **Files**:
  - ComponentCase (`Navbar.tsx`, `HeroSection.tsx`)
  - Utilities: camelCase (`helpers.ts`, `search.ts`)
  - Hooks: camelCase with `use` prefix (`useFocusNode.ts`, `useFile.ts`)
  - Stores: camelCase with `use` prefix (`useConfig.ts`, `useModal.ts`)
- **Functions**: camelCase (`fetchUrl`, `setContents`)
- **Constants**: camelCase or UPPER_SNAKE_CASE for true constants
- **Types/Interfaces**: PascalCase (`FileFormat`, `JsonActions`)

### React Patterns

- **Hooks**: Custom hooks must start with `use` prefix
- **State management**: Use Zustand stores for global state
- **Component structure**: Functional components with hooks
- **Exports**: Named exports for hooks, default exports for stores

  ```typescript
  // Hooks
  export const useFocusNode = () => { ... };

  // Stores
  const useFile = create<FileStates & JsonActions>()((set, get) => ({ ... }));
  export default useFile;
  ```

### Styled Components

- **Naming**: Prefix with `Styled` (`StyledNavbar`, `StyledMenuItem`)
- **Props typing**: Use proper TypeScript types
  ```typescript
  const StyledMenuItem = styled(Menu.Item)<MenuItemProps & any>`
    color: black;
  `;
  ```

### Font Usage

- **Global font**: Playfair Display (serif) - Loaded in `src/pages/_document.tsx` and applied via `src/constants/globalStyle.ts` and Mantine theme in `src/pages/_app.tsx`
- **Code/Monospace font**: Use `MONO_FONT_FAMILY` constant from `src/constants/globalStyle.ts`
- **Editor font**: JetBrains Mono via `next/font/google` in `src/pages/editor.tsx`
- **Jsondraw fonts**: Managed internally under `src/jsondraw/packages/jsondraw/fonts/`; do not override

  ```typescript
  import { MONO_FONT_FAMILY } from "src/constants/globalStyle";

  const StyledCodeBlock = styled.pre`
    font-family: ${MONO_FONT_FAMILY} !important;

    * {
      font-family: ${MONO_FONT_FAMILY} !important;
    }
  `;
  ```

- **Rule**: All code-related content (code blocks, inline code, examples, syntax) MUST use `MONO_FONT_FAMILY`
- **Important**: Always add `!important` to override global font styles and apply to all children elements with `* { font-family: ... !important; }`

### Error Handling

- **Try-catch blocks**: Use for async operations and data parsing
- **Error state**: Store errors in state for UI display
- **User feedback**: Use `react-hot-toast` for user notifications
  ```typescript
  try {
    const json = await contentToJson(contents, format);
    // ... process
  } catch (error: any) {
    if (error?.message) set({ error: error.message });
    toast.error("Failed to process data!");
  }
  ```

### State Management (Zustand)

- **Store structure**: Separate state and actions
- **Getters**: Provide getter functions for accessing state
- **Immutability**: Use `set()` to update state
  ```typescript
  const useFile = create<FileStates & JsonActions>()((set, get) => ({
    contents: "",
    getContents: () => get().contents,
    setContents: data => set({ contents: data }),
  }));
  ```

## Project Structure

```
src/
├── pages/           # Next.js pages (routing)
├── components/      # Reusable UI components
├── features/        # Feature modules (editor, modals, etc.)
├── layout/          # Layout components (Navbar, Footer, etc.)
├── hooks/           # Custom React hooks
├── store/           # Zustand stores (global state)
├── lib/             # Utility functions and helpers
├── types/           # TypeScript type definitions
├── constants/       # Application constants
├── data/            # Static data files
├── assets/          # Images and static assets
├── enums/           # Enumerations
└── jsondraw/        # Embedded jsondraw packages
```

### Component Organization

Most reusable components follow this structure (UI primitives may be single-file):

```
src/components/
├── ComponentName/
│   ├── ComponentName.tsx    # Component implementation
│   └── index.ts             # Barrel export
```

**Styled-components convention**: Keep styled-components in the same file as the component (project convention).

## Design System

### Typography

- **Global font**: Playfair Display (serif) - Loaded in `_document.tsx`, applied via GlobalStyle and Mantine theme
- **Code/Editor font**: JetBrains Mono (monospace) - Applied to editor pages; code blocks use `MONO_FONT_FAMILY`

### Color Palette

- **Background**: `#f7f3e6` (warm beige) - Used for footer and headers
- **Primary text**: `#1a1a1a` (dark)
- **Secondary text**: `#666666` (gray)
- **Accent**: `#37ff8b` (neon green) - Interactive elements and hover states
- **Yellow**: `#f7c948` (warm yellow) - Buttons and highlights
- **Border**: `#e8e4db` (light beige)

### Reusable Components

The project includes several reusable button components with animations:

- **EditorButton**: Purple animated button for editor navigation
- **GithubButton**: Gradient border button with star count
- **ExploreButton**: Neumorphic style button for CTAs
- **AnimatedLinkButton**: Link with underline animation
- **ArrowButton**: Circular button with arrow (yellow → neon green on hover)
- **GenerateButton**: Sparkle animation button with warm yellow color

## Best Practices

1. **Performance**: Use debouncing for expensive operations (see `useFocusNode.ts`)
2. **Session storage**: Store user data in sessionStorage for persistence
3. **Analytics**: Use `nextjs-google-analytics` for event tracking
4. **Accessibility**: Follow Mantine's accessibility guidelines
5. **Code organization**: Keep related code together in feature folders
6. **Type safety**: Leverage TypeScript's type system fully
7. **Component composition**: Break down complex components into smaller ones
8. **Avoid prop drilling**: Use Zustand stores for deeply nested state
9. **Consistent styling**: Use design system colors and fonts across all pages
10. **Error handling**: Always add try-catch blocks for async operations and validate inputs

## Common Patterns

### Creating a new Zustand store

```typescript
import { create } from "zustand";

interface MyState {
  value: string;
}

interface MyActions {
  setValue: (value: string) => void;
}

const useMyStore = create<MyState & MyActions>()((set, get) => ({
  value: "",
  setValue: value => set({ value }),
}));

export default useMyStore;
```

### Creating a custom hook

```typescript
import React from "react";
import { useDebouncedValue } from "@mantine/hooks";

export const useMyHook = () => {
  const [value, setValue] = React.useState("");
  const [debouncedValue] = useDebouncedValue(value, 600);

  return [value, setValue, debouncedValue] as const;
};
```

### Creating a reusable component

```typescript
import React from "react";
import styled from "styled-components";

const StyledButton = styled.button`
  background-color: #f7c948;
  color: #1a1a1a;
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background-color: #37ff8b;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

interface MyButtonProps {
  onClick?: () => void;
  children: React.ReactNode;
  disabled?: boolean;
}

export const MyButton: React.FC<MyButtonProps> = ({ onClick, children, disabled }) => {
  return (
    <StyledButton onClick={onClick} disabled={disabled}>
      {children}
    </StyledButton>
  );
};
```

## Notes for Agents

- This project uses **pnpm** as the package manager (not npm or yarn)
- Node.js version requirement: **>=24.x**
- No test suite exists - do not create test files unless explicitly requested
- The `src/enums` directory is ignored by ESLint
- All data processing is client-side (privacy-focused)
- The project uses Next.js with webpack (not Turbopack)
