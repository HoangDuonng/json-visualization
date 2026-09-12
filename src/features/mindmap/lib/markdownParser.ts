import { nanoid } from "nanoid";
import type { NoteNode } from "../types";

/**
 * Generates a unique, collision-resistant node ID.
 */
export function generateNodeId(): string {
  return `node_${nanoid(8)}`;
}

/**
 * Parses generic JSON into NoteNode tree.
 */
function parseJsonToTree(jsonStr: string): NoteNode[] {
  const parsed: unknown = JSON.parse(jsonStr);

  if (Array.isArray(parsed)) {
    const root: NoteNode = {
      id: generateNodeId(),
      text: "Root Array",
      depth: 0,
      children: [],
    };
    for (let i = 0; i < parsed.length; i++) {
      const item = parsed[i];
      let itemTitle = `Item [${i}]`;
      if (typeof item === "object" && item !== null) {
        const record = item as Record<string, unknown>;
        itemTitle = String(record.name || record.title || record.label || `Item [${i}]`);
      } else if (item !== undefined && item !== null) {
        itemTitle = String(item);
      }
      root.children.push(buildJsonNode(item, itemTitle, 1));
    }
    return [root];
  }

  if (typeof parsed === "object" && parsed !== null) {
    const record = parsed as Record<string, unknown>;
    // Check if user passed an explicit mindmap tree with children
    if (Array.isArray(record.children) && (record.label || record.name || record.title)) {
      const rootTitle = String(record.label || record.name || record.title);
      return [buildJsonTreeDirect(record, rootTitle, 0)];
    }

    const workspace =
      typeof record.workspace === "object" && record.workspace !== null
        ? (record.workspace as Record<string, unknown>)
        : null;
    const rootName = record.name || record.title || workspace?.name || "Northstar Platform";
    const root: NoteNode = {
      id: generateNodeId(),
      text: String(rootName),
      depth: 0,
      children: [],
    };

    for (const [key, val] of Object.entries(record)) {
      if (key === "name" || key === "title") continue;
      root.children.push(buildJsonNode(val, key, 1));
    }
    return [root];
  }

  return [];
}

function buildJsonTreeDirect(
  item: Record<string, unknown>,
  label: string,
  depth: number
): NoteNode {
  const node: NoteNode = {
    id: generateNodeId(),
    text: String(label),
    depth,
    children: [],
  };
  if (Array.isArray(item.children)) {
    for (const child of item.children) {
      if (typeof child === "object" && child !== null) {
        const record = child as Record<string, unknown>;
        const childTitle = String(
          record.label || record.name || record.title || record.text || "Node"
        );
        node.children.push(buildJsonTreeDirect(record, childTitle, depth + 1));
      }
    }
  }
  return node;
}

function buildJsonNode(val: unknown, keyName: string, depth: number): NoteNode {
  const node: NoteNode = {
    id: generateNodeId(),
    text: keyName,
    depth,
    children: [],
  };

  if (val === null || val === undefined) {
    node.text = `${keyName}: null`;
    return node;
  }

  if (Array.isArray(val)) {
    for (let i = 0; i < val.length; i++) {
      const elem = val[i];
      if (typeof elem === "object" && elem !== null) {
        const record = elem as Record<string, unknown>;
        const itemLabel = String(record.name || record.title || record.label || `${keyName}[${i}]`);
        node.children.push(buildJsonNode(elem, itemLabel, depth + 1));
      } else {
        node.children.push({
          id: generateNodeId(),
          text: String(elem),
          depth: depth + 1,
          children: [],
        });
      }
    }
    return node;
  }

  if (typeof val === "object") {
    for (const [k, v] of Object.entries(val as Record<string, unknown>)) {
      if (typeof v === "object" && v !== null) {
        node.children.push(buildJsonNode(v, k, depth + 1));
      } else {
        node.children.push({
          id: generateNodeId(),
          text: `${k}: ${String(v)}`,
          depth: depth + 1,
          children: [],
        });
      }
    }
    return node;
  }

  node.text = `${keyName}: ${String(val)}`;
  return node;
}

/**
 * Parses Mermaid mindmap syntax:
 * mindmap
 *   root((Title))
 *     Branch 1
 *       Leaf
 */
function parseMermaidToTree(input: string): NoteNode[] {
  const lines = input.split("\n");
  const filtered = lines.filter(l => !l.trim().startsWith("mindmap"));
  const roots: NoteNode[] = [];
  const stack: { node: NoteNode; indent: number }[] = [];

  for (const line of filtered) {
    if (!line.trim()) continue;
    const match = line.match(/^(\s*)(.*)/);
    if (!match) continue;

    const [, indentStr, rawContent] = match;
    const indent = indentStr.length;
    // Clean mermaid shapes like root((title)), [title], (title)
    const cleanedText = rawContent
      .replace(/^[a-zA-Z0-9_-]+\(\((.*?)\)\)$/, "$1")
      .replace(/\(\((.*?)\)\)/g, "$1")
      .replace(/\[(.*?)\]/g, "$1")
      .replace(/\((.*?)\)/g, "$1")
      .trim();

    if (!cleanedText) continue;

    const node: NoteNode = {
      id: generateNodeId(),
      text: cleanedText,
      depth: 0,
      children: [],
    };

    if (stack.length === 0) {
      node.depth = 0;
      roots.push(node);
      stack.push({ node, indent });
      continue;
    }

    while (stack.length > 0 && stack[stack.length - 1].indent >= indent) {
      stack.pop();
    }

    if (stack.length === 0) {
      node.depth = 0;
      roots.push(node);
      stack.push({ node, indent });
    } else {
      const parent = stack[stack.length - 1].node;
      node.depth = parent.depth + 1;
      parent.children.push(node);
      stack.push({ node, indent });
    }
  }

  return roots;
}

/**
 * Universal mindmap parser supporting:
 * 1. Markdown outline (# Root, - Item, * Item)
 * 2. JSON structure ({ ... } or [{ ... }])
 * 3. Mermaid mindmap syntax (mindmap\n  ...)
 */
export function parseMarkdownToTree(input: string): NoteNode[] {
  const trimmed = input.trim();
  if (!trimmed) return [];

  // Check if input is JSON
  if (
    (trimmed.startsWith("{") && trimmed.endsWith("}")) ||
    (trimmed.startsWith("[") && trimmed.endsWith("]"))
  ) {
    try {
      return parseJsonToTree(trimmed);
    } catch {
      // Fall through to markdown parser if JSON.parse fails
    }
  }

  // Check if input is Mermaid mindmap
  if (trimmed.startsWith("mindmap")) {
    try {
      return parseMermaidToTree(trimmed);
    } catch {
      // Fall through
    }
  }

  // Default: Markdown outline parser
  const lines = input.split("\n");
  const roots: NoteNode[] = [];
  const stack: { node: NoteNode; indent: number }[] = [];

  for (const line of lines) {
    if (!line.trim()) continue;

    // Handle markdown headings (# Title, ## Subtitle)
    const headingMatch = line.match(/^(#{1,6})\s+(.*)/);
    if (headingMatch) {
      const [, hashes, headingText] = headingMatch;
      const headingDepth = hashes.length - 1;
      const node: NoteNode = {
        id: generateNodeId(),
        text: headingText.trim(),
        depth: headingDepth,
        children: [],
      };

      if (headingDepth === 0) {
        roots.push(node);
        stack.length = 0;
        stack.push({ node, indent: -1 });
      } else {
        while (stack.length > 0 && stack[stack.length - 1].node.depth >= headingDepth) {
          stack.pop();
        }
        if (stack.length === 0) {
          roots.push(node);
          stack.push({ node, indent: -1 });
        } else {
          const parent = stack[stack.length - 1].node;
          node.depth = parent.depth + 1;
          parent.children.push(node);
          stack.push({ node, indent: -1 });
        }
      }
      continue;
    }

    // Handle list items (- Item or * Item or 1. Item)
    const match = line.match(/^(\s*)([-*]|\d+\.)\s+(.*)/);
    if (match) {
      const [, indentStr, , text] = match;
      let indent = 0;
      for (let i = 0; i < indentStr.length; i++) {
        indent += indentStr[i] === "\t" ? 2 : 1;
      }

      const node: NoteNode = {
        id: generateNodeId(),
        text: text.trim(),
        depth: 0,
        children: [],
      };

      if (stack.length === 0) {
        node.depth = 0;
        roots.push(node);
        stack.push({ node, indent });
        continue;
      }

      while (stack.length > 0 && stack[stack.length - 1].indent >= indent) {
        stack.pop();
      }

      if (stack.length === 0) {
        node.depth = 0;
        roots.push(node);
        stack.push({ node, indent });
      } else {
        const parent = stack[stack.length - 1].node;
        node.depth = parent.depth + 1;
        parent.children.push(node);
        stack.push({ node, indent });
      }
      continue;
    }

    // Single line root without markdown prefix
    if (roots.length === 0 && stack.length === 0) {
      const node: NoteNode = {
        id: generateNodeId(),
        text: line.trim(),
        depth: 0,
        children: [],
      };
      roots.push(node);
      stack.push({ node, indent: 0 });
    }
  }

  return roots;
}
