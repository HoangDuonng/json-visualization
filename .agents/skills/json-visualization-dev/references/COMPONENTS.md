# Component Reference

Catalog of reusable components in JSON Visualization.

## Button components

### EditorButton

**File**: `src/components/EditorButton/EditorButton.tsx`

Purple animated button with gradient border for editor navigation.

```typescript
import { EditorButton } from "src/components/EditorButton";

<EditorButton onClick={() => router.push("/editor")}>
  Open Editor
</EditorButton>
```

**Features**:

- Gradient border animation
- Hover effects
- Purple theme

### GithubButton

**File**: `src/components/GithubButton/GithubButton.tsx`

Button with GitHub star count and gradient border.

```typescript
import { GithubButton } from "src/components/GithubButton";

<GithubButton />
```

**Features**:

- Fetches star count from GitHub API
- Gradient border animation
- Links to GitHub repo

### ExploreButton

**File**: `src/components/ExploreButton/ExploreButton.tsx`

Neumorphic style button for CTAs.

```typescript
import { ExploreButton } from "src/components/ExploreButton";

<ExploreButton onClick={handleClick}>
  Explore Features
</ExploreButton>
```

**Features**:

- Neumorphic shadow effect
- Smooth hover transition

### AnimatedLinkButton

**File**: `src/components/AnimatedLinkButton/AnimatedLinkButton.tsx`

Link with animated underline effect.

```typescript
import { AnimatedLinkButton } from "src/components/AnimatedLinkButton";

<AnimatedLinkButton href="/docs">
  Learn More
</AnimatedLinkButton>
```

**Features**:

- Animated underline on hover
- Supports Next.js Link

### ArrowButton

**File**: `src/components/ArrowButton/ArrowButton.tsx`

Circular button with arrow icon.

```typescript
import { ArrowButton } from "src/components/ArrowButton";

<ArrowButton onClick={handleNext} />
```

**Features**:

- Yellow → neon green on hover
- Circular shape
- Arrow icon

### GenerateButton

**File**: `src/components/GenerateButton/GenerateButton.tsx`

Button with sparkle animation effect.

```typescript
import { GenerateButton } from "src/components/GenerateButton";

<GenerateButton onClick={handleGenerate}>
  Generate
</GenerateButton>
```

**Features**:

- Sparkle particle animation
- Warm yellow color
- Hover effects

## Visual effect components

### Cursor

**File**: `src/components/Cursor/Cursor.tsx` (1,391 LOC)

Custom animated cursor with fluid simulation.

```typescript
import { Cursor } from "src/components/Cursor";

<Cursor />
```

**Features**:

- WebGL fluid simulation
- Follows mouse movement
- Color splat effects
- Performance optimized

**Note**: Very large component, use sparingly.

### DotGrid

**File**: `src/components/DotGrid/DotGrid.tsx`

Animated dot grid background.

```typescript
import { DotGrid } from "src/components/DotGrid";

<DotGrid />
```

**Features**:

- Canvas-based rendering
- Animated dots
- Responsive to container size

### RippleGrid

**File**: `src/components/RippleGrid/RippleGrid.tsx`

Grid with ripple wave animation.

```typescript
import { RippleGrid } from "src/components/RippleGrid";

<RippleGrid />
```

**Features**:

- Wave propagation effect
- Interactive on hover
- Canvas-based

### SplashCursor

**File**: `src/components/Cursor/Cursor.tsx` (modularized with `shaders.ts` and `webgl.ts`)

Interactive WebGL fluid simulation cursor effect.

```typescript
import SplashCursor from "src/components/Cursor/Cursor";

<SplashCursor />
```

**Features**:
- 2D Navier-Stokes fluid animation
- Separated GLSL shader sources in `shaders.ts`
- WebGL helpers and Framebuffer FBO utilities in `webgl.ts`

### GlassSurface

**File**: `src/components/GlassSurface/GlassSurface.tsx`

Glassmorphism container component.

```typescript
import { GlassSurface } from "src/components/GlassSurface";

<GlassSurface>
  <p>Content here</p>
</GlassSurface>
```

**Features**:

- Frosted glass effect
- Backdrop blur
- Semi-transparent background

## Utility components

### Tooltip

**File**: `src/components/Tooltip/Tooltip.tsx`

Custom tooltip wrapper using Mantine.

```typescript
import { Tooltip } from "src/components/Tooltip";

<Tooltip label="Helpful text">
  <button>Hover me</button>
</Tooltip>
```

**Props**:

- `label`: Tooltip text
- `children`: Element to attach tooltip to
- All Mantine Tooltip props

### JsonVizLogo

**File**: `src/layout/JsonVizLogo/JsonVizLogo.tsx`

Animated logo component.

```typescript
import { JsonVizLogo } from "src/layout/JsonVizLogo";

<JsonVizLogo />
```

**Features**:

- SVG-based
- Animated on hover

## Layout components

### PageLayout

**File**: `src/layout/PageLayout/index.tsx`

Main page wrapper with Navbar and Footer.

```typescript
import PageLayout from "src/layout/PageLayout";

<PageLayout>
  <YourContent />
</PageLayout>
```

**Includes**:

- Navbar with navigation
- Footer with links
- Responsive layout

### Navbar

**File**: `src/layout/PageLayout/Navbar.tsx`

Top navigation bar.

**Features**:

- Logo
- Navigation links
- Theme toggle
- Mobile responsive

### Footer

**File**: `src/layout/PageLayout/Footer.tsx`

Footer with links and info.

**Features**:

- Social links
- Navigation links
- Copyright info

## Landing page components

### HeroSection

**File**: `src/layout/Landing/HeroSection.tsx`

Hero section with CTA.

```typescript
import HeroSection from "src/layout/Landing/HeroSection";

<HeroSection />
```

### Features

**File**: `src/layout/Landing/Features.tsx`

Feature showcase grid.

```typescript
import Features from "src/layout/Landing/Features";

<Features />
```

### FAQ

**File**: `src/layout/Landing/FAQ.tsx`

FAQ accordion.

```typescript
import FAQ from "src/layout/Landing/FAQ";

<FAQ />
```

### Section1, Section2, Section3

**Files**: `src/layout/Landing/Section[1-3].tsx`

Additional landing page sections with different content and layouts.

## Editor components

### TextEditor

**File**: `src/features/editor/TextEditor.tsx`

Monaco editor wrapper.

```typescript
import TextEditor from "src/features/editor/TextEditor";

<TextEditor />
```

**Features**:

- Syntax highlighting
- Auto-completion
- Format validation
- Integrates with useFile store

### LiveEditor

**File**: `src/features/editor/LiveEditor.tsx`

Real-time preview editor.

```typescript
import LiveEditor from "src/features/editor/LiveEditor";

<LiveEditor />
```

### Toolbar

**File**: `src/features/editor/Toolbar/index.tsx`

Editor toolbar with menus.

**Sub-components**:

- `FileMenu` - File operations
- `ViewMenu` - View options
- `ToolsMenu` - Tools and utilities
- `SearchInput` - Search functionality
- `ThemeToggle` - Dark/light mode

### BottomBar

**File**: `src/features/editor/BottomBar.tsx`

Status bar at bottom of editor.

**Shows**:

- Node count
- File format
- Error messages

### GraphView

**File**: `src/features/editor/views/GraphView/index.tsx`

Main graph visualization view.

```typescript
import GraphView from "src/features/editor/views/GraphView";

<GraphView />
```

**Features**:

- Reaflow canvas
- Custom nodes/edges
- Zoom controls
- Options menu

### TreeView

**File**: `src/features/editor/views/TreeView/index.tsx`

Alternative tree view.

```typescript
import TreeView from "src/features/editor/views/TreeView";

<TreeView />
```

### JsonDrawView

**Files**:

- `src/features/editor/views/JsonDrawView/index.tsx`
- `src/features/editor/views/JsonDrawView/jsonToJsonDraw.ts`

JsonDraw-based whiteboard view for drawing on top of JSON-derived nodes.

```typescript
import { JsonDrawView } from "src/features/editor/views/JsonDrawView";

<JsonDrawView />
```

**Features**:

- Converts graph nodes/edges to JsonDraw elements
- Auto-saves drawing state to `localStorage`
- Restores saved drawing session on load

## Styled component patterns

### Basic styled component

```typescript
import styled from "styled-components";

const StyledContainer = styled.div`
  padding: 1rem;
  background: ${props => props.theme.background};
`;
```

### With props

```typescript
interface ButtonProps {
  variant|: "primary" | "secondary";
}

const StyledButton = styled.button<ButtonProps>`
  background: ${props => (props.variant === "primary" | "#f7c948" : "#37ff8b")};
`;
```

### Extending Mantine components

```typescript
import { Button } from "@mantine/core";
import type { ButtonProps } from "@mantine/core";
import styled from "styled-components";

const StyledMantineButton = styled(Button)<ButtonProps>`
  border-radius: 8px;
  &:hover {
    transform: scale(1.05);
  }
`;
```

## Component creation checklist

When creating a new component:

1. Create directory: `src/components/ComponentName/`
2. Create component file: `ComponentName.tsx`
3. Create barrel export: `index.ts`
4. Use TypeScript for props
5. Use styled-components for styling
6. Follow naming conventions (PascalCase)
7. Add JSDoc comments if complex
8. Export as named export (or default for pages)

Example structure:

```
src/components/MyComponent/
├── MyComponent.tsx
└── index.ts
```

```typescript
// MyComponent.tsx
import React from "react";
import styled from "styled-components";

const StyledWrapper = styled.div`
  /* styles */
`;

interface MyComponentProps {
  title: string;
  onClick|: () => void;
}

export const MyComponent: React.FC<MyComponentProps> = ({ title, onClick }) => {
  return (
    <StyledWrapper onClick={onClick}>
      <h2>{title}</h2>
    </StyledWrapper>
  );
};
```

```typescript
// index.ts
export { MyComponent } from "./MyComponent";
```
