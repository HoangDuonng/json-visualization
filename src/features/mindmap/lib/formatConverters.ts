import type { NoteNode } from "../types";

export const NORTHSTAR_EXAMPLES = {
  markdown: `# northstar-platform
- workspace
  - name: northstar-platform
  - environment: production
  - region: ap-southeast-1
- services
  - api-gateway
    - status: healthy
    - latencyMs: 42
    - requestsPerMinute: 1280
    - endpoints: /v1/events, /v1/projects
    - dependencies: identity, event-store
  - event-worker
    - status: healthy
    - queueDepth: 18
    - processedToday: 48620
    - dependencies: event-store, notifications
- release
  - version: 2026.8.4
  - deployedAt: 2026-08-04T18:45:00Z
  - features: schema-validation, live-collaboration`,

  json: JSON.stringify(
    {
      workspace: {
        name: "northstar-platform",
        environment: "production",
        region: "ap-southeast-1",
      },
      services: [
        {
          name: "api-gateway",
          status: "healthy",
          metrics: {
            latencyMs: 42,
            requestsPerMinute: 1280,
          },
          endpoints: ["/v1/events", "/v1/projects"],
          dependencies: ["identity", "event-store"],
        },
        {
          name: "event-worker",
          status: "healthy",
          metrics: {
            queueDepth: 18,
            processedToday: 48620,
          },
          dependencies: ["event-store", "notifications"],
        },
      ],
      release: {
        version: "2026.8.4",
        deployedAt: "2026-08-04T18:45:00Z",
        features: ["schema-validation", "live-collaboration"],
      },
    },
    null,
    2
  ),

  mermaid: `mindmap
  root((northstar-platform))
    workspace
      name: northstar-platform
      environment: production
      region: ap-southeast-1
    services
      api-gateway
        status: healthy
        latencyMs: 42
        requestsPerMinute: 1280
        endpoints: /v1/events, /v1/projects
        dependencies: identity, event-store
      event-worker
        status: healthy
        queueDepth: 18
        processedToday: 48620
        dependencies: event-store, notifications
    release
      version: 2026.8.4
      deployedAt: 2026-08-04T18:45:00Z
      features: schema-validation, live-collaboration`,
};

function parsePrimitive(str: string): unknown {
  const s = str.trim();
  if (s === "true") return true;
  if (s === "false") return false;
  if (s === "null") return null;
  if (!isNaN(Number(s)) && s !== "") return Number(s);
  if (s.includes(",")) {
    return s.split(",").map(part => parsePrimitive(part.trim()));
  }
  return s;
}

export function treeToMarkdown(roots: NoteNode[]): string {
  if (roots.length === 0) return "";
  let output = "";

  function walk(node: NoteNode, depth: number) {
    if (depth === 0) {
      output += `# ${node.text}\n`;
    } else {
      const indent = "  ".repeat(depth - 1);
      output += `${indent}- ${node.text}\n`;
    }
    for (const child of node.children) {
      walk(child, depth + 1);
    }
  }

  for (const root of roots) {
    walk(root, 0);
  }

  return output.trim();
}

export function treeToMermaid(roots: NoteNode[]): string {
  if (roots.length === 0) return "mindmap\n  root((Mindmap))";
  let output = "mindmap\n";
  const root = roots[0];
  output += `  root((${root.text}))\n`;

  function walk(node: NoteNode, depth: number) {
    const indent = "  ".repeat(depth + 1);
    output += `${indent}${node.text}\n`;
    for (const child of node.children) {
      walk(child, depth + 1);
    }
  }

  for (const child of root.children) {
    walk(child, 1);
  }

  return output.trim();
}

export function treeToJson(roots: NoteNode[]): string {
  if (roots.length === 0) return "{}";

  function walk(node: NoteNode): unknown {
    if (node.children.length === 0) {
      const colonIdx = node.text.indexOf(":");
      if (colonIdx > 0) {
        const k = node.text.slice(0, colonIdx).trim();
        const v = node.text.slice(colonIdx + 1).trim();
        return { [k]: parsePrimitive(v) };
      }
      return parsePrimitive(node.text);
    }

    const obj: Record<string, unknown> = {};
    for (const child of node.children) {
      const colonIdx = child.text.indexOf(":");
      if (child.children.length === 0 && colonIdx > 0) {
        const k = child.text.slice(0, colonIdx).trim();
        const v = child.text.slice(colonIdx + 1).trim();
        obj[k] = parsePrimitive(v);
      } else {
        const childVal = walk(child);
        obj[child.text] = childVal;
      }
    }
    return obj;
  }

  const root = roots[0];
  const data = walk(root);
  return JSON.stringify(data, null, 2);
}

export function convertTreeToFormat(
  roots: NoteNode[],
  targetFormat: "markdown" | "json" | "mermaid"
): string {
  // If tree is empty, return default for format
  if (roots.length === 0) {
    return NORTHSTAR_EXAMPLES[targetFormat];
  }

  // Convert dynamically preserving all user edits
  if (targetFormat === "json") {
    return treeToJson(roots);
  }
  if (targetFormat === "mermaid") {
    return treeToMermaid(roots);
  }
  return treeToMarkdown(roots);
}
