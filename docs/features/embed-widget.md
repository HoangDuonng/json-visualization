# Embeddable Widget Feature

The Embeddable Widget feature (`/widget`) allows developers to embed JSON Visualization interactive graphs into external websites, blogs, documentation, and web applications.

---

## Technical Details

- **Route**: `/widget`
- **Isolation**: Minimalist layout without top navigation bar, footer, or sidebars.
- **Messaging**: Communicates with host applications via standard Web API `window.postMessage`.
- **Privacy**: All graph rendering is client-side. No data is stored or transmitted to external servers.

---

## Capabilities

1. **Theme Switching**: Seamlessly supports `dark` and `light` themes to match host site design systems.
2. **Direction Alignment**: Configurable graph layout orientation (`RIGHT`, `DOWN`, `LEFT`, `UP`).
3. **Interactive Control**: Users can zoom, pan, click nodes to view detail modals, and inspect nested structures directly inside the iframe.

For step-by-step setup instructions, see the [Embed Widget How-To Guide](../how-to/embed-widget.md).
