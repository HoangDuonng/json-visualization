---
name: public-editorial-redesign
description: Redesign and maintain the public-facing JSON Visualization UI with a restrained, editorial developer-tool aesthetic inspired by Amp's Models and Chronicle pages. Use for homepage, docs, converter, type-generation, tools, legal, shorten, and other non-editor public-page layout, typography, color, content, responsive, or component work. Protect /editor, /draw, /mindmap, /widget, editor code typography, and JsonDraw behavior.
---

# Public Editorial Redesign

Use this skill together with `json-visualization-dev` for repository conventions. This skill owns the public visual language; the development skill owns the application architecture and coding rules.

## Outcome

Create a coherent public site, not a collection of unrelated CSS tweaks. Preserve route behavior, SEO intent, accessibility, and technical functionality while making the public pages feel like a polished editorial developer product: quiet, typographic, precise, readable, and modern.

Use these as visual references, not as copied branding, assets, text, or implementation:

- https://ampcode.com/models/gpt-5.5
- https://ampcode.com/chronicle

## Scope gate

Before editing, classify every target file.

Never modify the visual structure or behavior of:

- `src/pages/editor.tsx`
- `src/pages/draw.tsx`
- `src/pages/mindmap.tsx`
- `src/pages/widget.tsx`
- `src/features/editor/**`
- `src/features/mindmap/**`
- `src/jsondraw/**`
- Monaco/editor code font rules
- graph/draw/mindmap themes, stores, or canvas behavior

Public redesign scope includes `/`, `/docs`, `/docs/**`, `/converter/**`, `/type/**`, `/tools/**`, `/shorten`, `/coming-soon`, `/legal/**`, and `/s`. Keep shared `_app.tsx` changes narrowly scoped and prove the protected routes are unaffected.

## Workflow

1. Read the repository `AGENTS.md`, `.agents/skills/json-visualization-dev/SKILL.md`, and [PUBLIC-PAGE-MAP.md](references/PUBLIC-PAGE-MAP.md).
2. Inspect the existing public layouts and page families before editing. Identify shared primitives before changing individual pages.
3. Read [EDITORIAL-DESIGN.md](references/EDITORIAL-DESIGN.md) and commit to its visual direction. Do not mix the old glass/neon SaaS language with the new system casually.
4. Establish or update shared public tokens and primitives first. Prefer `src/layout/PageLayout`, `src/layout/ConverterLayout`, `src/layout/TypeLayout`, and small public UI components over page-local style duplication.
5. Redesign the homepage composition and copy decisively. Reuse existing images when they fit; leave image replacement as a later task. Do not preserve the old section order merely because it exists.
6. Migrate related public page families to the same typography, spacing, navigation, metadata, links, dividers, and responsive rules.
7. Keep code blocks, JSON previews, Monaco, and editor-like content on `MONO_FONT_FAMILY`. Do not use broad `* { font-family: ... !important; }` rules in public layout code. Scope typography to semantic public elements and use `!important` only when overriding a known third-party code component is unavoidable.
8. Verify desktop and mobile behavior, keyboard focus, contrast, link destinations, image alt text, and protected-route isolation. Run `pnpm lint`; do not create or run tests because this repository has no test suite.

## Implementation rules

- Prefer CSS variables/tokens for color, type scale, widths, spacing, borders, and motion.
- Prefer semantic HTML (`main`, `header`, `nav`, `article`, `section`, `footer`) and readable component APIs.
- Keep public layout components independent from editor stores and JsonDraw imports.
- Use Mantine for behavior/accessibility where it is already used; use styled-components for shared visual composition consistent with this repository.
- Keep copy concise and developer-oriented. Rewrite repetitive or generic copy when it improves clarity, but do not invent unsupported capabilities.
- Preserve existing route links, SEO metadata, analytics behavior, format support, converter behavior, and legal meaning.
- Prefer thin rules, whitespace, typography, and restrained hover states over excessive cards, gradients, shadows, glassmorphism, or decorative effects.
- Use animation sparingly: one coherent page-load or reveal treatment is better than many unrelated effects. Respect `prefers-reduced-motion`.
- Keep components small and named clearly. Avoid adding an abstraction for one use case.
- Do not introduce a new font without checking loading, licensing, fallback behavior, and the protected editor pages.

## Homepage composition freedom

Treat the homepage structure as intentionally open-ended. You may replace the existing hero, section order, feature grid, preview placement, calls to action, and copy when that creates a stronger product story. Do not turn “freestyle” into unstructured decoration: the final composition must make the product purpose, primary action, proof/preview, supported workflows, and next-step navigation understandable without relying on the old layout. Keep the design contract, factual product claims, responsive behavior, accessibility, and protected-route boundaries as hard constraints.

## Completion report

Report the public routes and shared files changed, the protected files intentionally untouched, the visual system decisions, verification performed, and any remaining visual limitations caused by unavailable assets or browser inspection.
