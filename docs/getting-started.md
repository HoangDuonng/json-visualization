# Getting Started with JSON Visualization

Welcome to JSON Visualization! This guide will help you get started with visualizing and manipulating your JSON data.

## What is JSON Visualization?

JSON Visualization is a free, open-source web application that transforms JSON, YAML, CSV, and XML data into interactive graphs, trees, and a drawing canvas. It runs entirely in your browser - no data is sent to any server.

## Quick Start

### 1. Open the Editor

Visit [jsonviz.online](https://jsonviz.online) and click **"Open Editor"** or navigate to `/editor`.

### 2. Add Your Data

You have three ways to add data:

**Option A: Paste directly**

1. Click in the text editor on the left
2. Paste your JSON, YAML, CSV, or XML data
3. The graph updates automatically

**Option B: Upload a file**

1. Click **File** → **Import**
2. Choose **"From File"**
3. Select your data file
4. Click **Open**

**Option C: Load from URL**

1. Click **File** → **Import**
2. Choose **"From URL"**
3. Enter the URL to your data file
4. Click **Load**

### 3. Explore Your Data

The graph view shows your data structure:

- **Nodes** represent objects, arrays, and values
- **Edges** show relationships between nodes
- **Colors** indicate data types:
  - Blue: Objects
  - Green: Arrays
  - Orange: Strings
  - Purple: Numbers
  - Red: Booleans
  - Gray: Null values

**Navigation:**

- **Zoom**: Mouse wheel or pinch gesture
- **Pan**: Click and drag the canvas
- **Focus**: Click a node to highlight it
- **Collapse/Expand**: Click the arrow icon on nodes

### 4. Switch Views

Toggle between visualization modes:

- **Graph View**: Interactive node-edge diagram (default)
- **Tree View**: Hierarchical tree structure
- **JsonDraw View**: Freeform drawing canvas built from your JSON graph

Click **View** → **Tree View**, **Graph View**, or **JsonDraw** to switch.

## Your First Visualization

Let's visualize a simple JSON object:

```json
{
  "name": "John Doe",
  "age": 30,
  "email": "john@example.com",
  "address": {
    "street": "123 Main St",
    "city": "New York",
    "country": "USA"
  },
  "hobbies": ["reading", "coding", "hiking"]
}
```

**Steps:**

1. Copy the JSON above
2. Open the editor
3. Paste into the text editor
4. See the graph appear instantly!

You should see:

- A root node for the main object
- Child nodes for each property
- A nested object for `address`
- An array node for `hobbies` with three items

## Common Tasks

### Convert Between Formats

Convert your data to different formats:

1. Click **Tools** → **Convert**
2. Select source and target formats
3. Your data is converted automatically

Supported conversions:

- JSON ↔ YAML ↔ CSV ↔ XML

### Generate Code Types

Generate TypeScript, Go, Rust, or Kotlin types:

1. Click **Tools** → **Generate Types**
2. Select your target language
3. Copy the generated code

### Validate Your Data

The editor validates your data automatically:

- ✅ Green indicator: Valid
- ❌ Red indicator: Invalid (check error message at bottom)

### Export as Image

Save your visualization:

1. Click **File** → **Download**
2. Choose format: PNG, JPEG, or SVG
3. Click **Download**

## Keyboard Shortcuts

Speed up your workflow:

| Shortcut               | Action         |
| ---------------------- | -------------- |
| `Ctrl/Cmd + S`         | Save/Download  |
| `Ctrl/Cmd + O`         | Open file      |
| `Ctrl/Cmd + F`         | Search         |
| `Ctrl/Cmd + Z`         | Undo           |
| `Ctrl/Cmd + Shift + Z` | Redo           |
| `Ctrl/Cmd + /`         | Toggle comment |

See [Keyboard Shortcuts](reference/keyboard-shortcuts.md) for the complete list.

## Tips for Better Visualizations

### Large Files

For files with many nodes:

- Use **Collapse** to hide nested structures
- Use **Search** to find specific nodes
- Consider the node limit (default: 1000 nodes)

### Complex Data

For complex structures:

- Start with **Tree View** for overview
- Switch to **Graph View** for relationships
- Use **Focus** to highlight specific paths

### Performance

For best performance:

- Keep files under 5MB
- Collapse large arrays/objects
- Use search instead of scrolling

## Privacy & Security

**Your data never leaves your browser:**

- All processing happens locally
- No data is sent to any server
- No tracking or analytics on your data
- Safe for sensitive information

## Next Steps

Now that you know the basics:

- **Learn Features**: Explore [Features](features/) for detailed capabilities
- **How-to Guides**: See [How-to Guides](how-to/) for specific tasks
- **FAQ**: Check [FAQ](faq.md) for common questions
- **Troubleshooting**: Visit [Troubleshooting](troubleshooting.md) if you encounter issues

## Need Help?

- **Issues**: Report bugs on [GitHub Issues](https://github.com/HoangDuonng/Json_Visualization/issues)
- **Questions**: Check our [FAQ](faq.md)
- **Contributing**: See [Contributing Guide](../CONTRIBUTING.md)

---

**Ready to dive deeper?** Check out our [Features Guide](features/) to learn about advanced capabilities like JSON Schema, jq queries, and more!
