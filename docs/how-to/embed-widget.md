# How to Embed the JSON Visualization Widget

Learn how to embed an interactive JSON graph visualization widget into your own website, blog, or web application using HTML `<iframe>` and JavaScript `postMessage` API.

---

## Overview

JSON Visualization provides a lightweight, dedicated widget route at `/widget` designed specifically for embedding inside `<iframe>` elements.

Key Features of the Widget:
- **Zero Overhead**: Clean UI without navigation bars or footers.
- **Interactive**: Full pan, zoom, and node inspection modals.
- **Theme Support**: Seamless switching between **Dark** and **Light** themes.
- **Dynamic Updates**: Real-time JSON data updates via JavaScript `postMessage` API.
- **Custom Orientation**: Supports `RIGHT`, `DOWN`, `LEFT`, and `UP` graph directions.

---

## Method 1: URL Query Parameter (Simple Embed)

For static JSON data or quick iframe embeds:

```html
<iframe
  src="https://jsonviz.online/widget?json=%7B%22name%22%3A%22JSON%20Viz%22%2C%22version%22%3A%221.0%22%7D"
  width="100%"
  height="500px"
  style="border: 1px solid #e8e4db; border-radius: 8px;"
  title="JSON Visualization Widget"
></iframe>
```

---

## Method 2: JavaScript postMessage API (Dynamic Embed)

For dynamic web apps where JSON data updates programmatically:

### 1. Add the HTML `<iframe>`

```html
<iframe
  id="json-viz-widget"
  src="https://jsonviz.online/widget"
  width="100%"
  height="600px"
  style="border: 1px solid #333; border-radius: 8px;"
  title="Interactive JSON Graph Widget"
></iframe>
```

### 2. Send JSON Data & Options via JavaScript

```javascript
const iframe = document.getElementById("json-viz-widget");

// Function to update widget contents
function updateWidgetData(jsonData, theme = "dark", direction = "RIGHT") {
  if (!iframe || !iframe.contentWindow) return;

  iframe.contentWindow.postMessage(
    {
      json: typeof jsonData === "string" ? jsonData : JSON.stringify(jsonData, null, 2),
      options: {
        theme: theme, // "dark" | "light"
        direction: direction // "RIGHT" | "DOWN" | "LEFT" | "UP"
      }
    },
    "*"
  );
}

// Example usage when iframe finishes loading
iframe.addEventListener("load", () => {
  updateWidgetData(
    {
      appName: "My Cool App",
      status: "active",
      users: ["Alice", "Bob", "Charlie"],
      config: {
        notifications: true,
        maxRetries: 3
      }
    },
    "dark",
    "RIGHT"
  );
});
```

---

## Configuration Reference

### `postMessage` Data Protocol

| Property | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `json` | `string` | `""` | Valid JSON string to visualize as a graph |
| `options.theme` | `"dark" \| "light"` | `"dark"` | Widget background and node color theme |
| `options.direction` | `"RIGHT" \| "DOWN" \| "LEFT" \| "UP"` | `"RIGHT"` | Layout orientation of the graph nodes |

---

## Best Practices

1. **Security**: All JSON data passed to the widget stays 100% inside your browser and the iframe sandbox.
2. **Responsive Height**: Set appropriate CSS `width` and `height` (e.g. `height: 500px;`) on the iframe wrapper.
3. **Graceful Loading**: Call `postMessage` inside the iframe's `onload` handler to ensure the widget is ready to receive messages.
