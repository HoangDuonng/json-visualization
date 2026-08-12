# Public Page Map

Use this map to plan changes without touching the editor application.

## Protected application routes

```text
src/pages/editor.tsx  -> /editor
src/pages/draw.tsx    -> /draw
src/pages/widget.tsx  -> /widget
src/features/editor/**
src/jsondraw/**
```

These routes share editor state, canvas rendering, and code typography. Treat them as a separate application surface.

## Public route families

```text
src/pages/index.tsx              -> /
src/pages/docs/index.tsx        -> /docs
src/pages/docs/**                -> /docs/**
src/pages/converter/**           -> /converter/**
src/pages/type/**                -> /type/**
src/pages/tools/**               -> /tools/**
src/pages/shorten/index.tsx      -> /shorten
src/pages/coming-soon/index.tsx  -> /coming-soon
src/pages/legal/**               -> /legal/**
src/pages/s/index.tsx            -> /s
```

## Shared public implementation

Inspect these before changing individual pages:

```text
src/layout/PageLayout/**
src/layout/Landing/**
src/layout/ConverterLayout/**
src/layout/TypeLayout/**
src/components/**
src/constants/globalStyle.ts
src/pages/_app.tsx
```

Prefer fixing the shared layout or adding a small public primitive when several page families need the same change. Keep page-specific content and composition local when it is genuinely unique.

## Safe verification matrix

At minimum, inspect one route from each family after shared changes:

```text
/
/docs
/docs/visualization
/converter/json-to-yaml
/type/json-to-rust
/tools/json-schema
/shorten
/legal/privacy
```

Also inspect `/editor`, `/draw`, and `/widget` for regressions without changing their design or behavior.
