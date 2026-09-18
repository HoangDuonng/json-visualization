/**
 * Semantic Architecture Parser for JsonDraw
 *
 * Extracts faithful, structured context from raw JsonDraw/Excalidraw canvas elements.
 * Generates Mermaid diagrams, component inventories, and token-optimized AI prompts
 * without hallucinating any non-existent components.
 */

export interface DiagramNode {
  id: string;
  type: string; // rectangle, ellipse, diamond, text, etc.
  label: string;
  rawText: string;
  frameId?: string | null;
  groupIds?: string[];
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface DiagramConnection {
  id: string;
  fromId: string;
  toId: string;
  fromLabel: string;
  toLabel: string;
  label?: string;
  isBidirectional?: boolean;
}

export interface DiagramFrame {
  id: string;
  name: string;
}

export interface DiagramSemantics {
  nodes: DiagramNode[];
  connections: DiagramConnection[];
  annotations: string[];
  frames: DiagramFrame[];
  stats: {
    nodeCount: number;
    connectionCount: number;
    annotationCount: number;
    frameCount: number;
    estimatedTokens: number;
  };
  mermaid: string;
  aiPrompt: string;
}

/**
 * Sanitize an element ID for safe use in Mermaid diagrams
 */
const sanitizeMermaidId = (id: string): string => {
  return id.replace(/[^a-zA-Z0-9_]/g, "_");
};

/**
 * Sanitize label text for Mermaid node syntax
 */
const sanitizeMermaidLabel = (text: string): string => {
  if (!text) return "Untitled";
  return text
    .replace(/"/g, "'")
    .replace(/[\n\r]+/g, " ")
    .trim();
};

/**
 * Approximate token count (roughly ~4 characters per token for English & Markdown)
 */
export const estimateTokenCount = (text: string): number => {
  if (!text) return 0;
  return Math.ceil(text.length / 4);
};

/**
 * Extracts faithful semantic architecture data from JsonDraw canvas elements
 */
export const extractDiagramSemantics = (elements: any[]): DiagramSemantics => {
  const activeElements = (elements || []).filter(el => el && !el.isDeleted);

  // Separate elements by type
  const shapes: any[] = [];
  const textElements: any[] = [];
  const arrowElements: any[] = [];
  const frames: DiagramFrame[] = [];

  for (const el of activeElements) {
    if (el.type === "frame") {
      frames.push({
        id: el.id,
        name: el.name || `Frame_${el.id.slice(0, 5)}`,
      });
    } else if (el.type === "text") {
      textElements.push(el);
    } else if (el.type === "arrow" || el.type === "line") {
      arrowElements.push(el);
    } else if (["rectangle", "ellipse", "diamond"].includes(el.type)) {
      shapes.push(el);
    }
  }

  // Maps for fast lookup
  const textById = new Map<string, any>(textElements.map(t => [t.id, t]));
  const textByContainerId = new Map<string, any>();
  const usedTextIds = new Set<string>();

  for (const text of textElements) {
    if (text.containerId) {
      textByContainerId.set(text.containerId, text);
    }
  }

  // 1. Resolve Shapes into DiagramNodes
  const nodes: DiagramNode[] = [];
  const shapeNodeMap = new Map<string, DiagramNode>();

  for (const shape of shapes) {
    let boundText = textByContainerId.get(shape.id);

    // Also check shape.boundElements
    if (!boundText && Array.isArray(shape.boundElements)) {
      for (const b of shape.boundElements) {
        if (b.type === "text" && textById.has(b.id)) {
          boundText = textById.get(b.id);
          break;
        }
      }
    }

    const rawText = boundText?.text?.trim() || "";
    if (boundText) {
      usedTextIds.add(boundText.id);
    }

    const label =
      rawText ||
      `${shape.type.charAt(0).toUpperCase() + shape.type.slice(1)} [${shape.id.slice(0, 6)}]`;

    const node: DiagramNode = {
      id: shape.id,
      type: shape.type,
      label,
      rawText,
      frameId: shape.frameId || null,
      groupIds: shape.groupIds || [],
      x: Math.round(shape.x),
      y: Math.round(shape.y),
      width: Math.round(shape.width),
      height: Math.round(shape.height),
    };

    nodes.push(node);
    shapeNodeMap.set(shape.id, node);
  }

  // 2. Identify remaining Standalone Texts
  const standaloneTexts: any[] = [];
  for (const text of textElements) {
    // Check if bound to an arrow
    let isBoundToArrow = false;
    if (text.containerId) {
      const parent = arrowElements.find(a => a.id === text.containerId);
      if (parent) isBoundToArrow = true;
    }

    if (!usedTextIds.has(text.id) && !isBoundToArrow) {
      standaloneTexts.push(text);
    }
  }

  // If standalone text has no container, check if it's acting as a standalone node or general annotation
  const annotations: string[] = [];
  for (const text of standaloneTexts) {
    const content = text.text?.trim();
    if (!content) continue;

    // Check if any arrow connects directly to this standalone text
    const isArrowConnected = arrowElements.some(
      a => a.startBinding?.elementId === text.id || a.endBinding?.elementId === text.id
    );

    if (isArrowConnected) {
      // Treat as a node
      const node: DiagramNode = {
        id: text.id,
        type: "text-card",
        label: content,
        rawText: content,
        frameId: text.frameId || null,
        groupIds: text.groupIds || [],
        x: Math.round(text.x),
        y: Math.round(text.y),
        width: Math.round(text.width),
        height: Math.round(text.height),
      };
      nodes.push(node);
      shapeNodeMap.set(text.id, node);
    } else {
      annotations.push(content);
    }
  }

  // 3. Resolve Arrows into DiagramConnections
  const connections: DiagramConnection[] = [];

  for (const arrow of arrowElements) {
    const fromTargetId = arrow.startBinding?.elementId;
    const toTargetId = arrow.endBinding?.elementId;

    if (!fromTargetId || !toTargetId) continue;

    // Find source & target (could be shape or standalone text node)
    let fromNode = shapeNodeMap.get(fromTargetId);
    let toNode = shapeNodeMap.get(toTargetId);

    // If binding was to a bound text element, redirect to its container
    if (!fromNode) {
      const maybeText = textById.get(fromTargetId);
      if (maybeText?.containerId) {
        fromNode = shapeNodeMap.get(maybeText.containerId);
      }
    }

    if (!toNode) {
      const maybeText = textById.get(toTargetId);
      if (maybeText?.containerId) {
        toNode = shapeNodeMap.get(maybeText.containerId);
      }
    }

    if (!fromNode || !toNode) continue;

    // Find label on arrow
    let arrowLabel = "";
    if (Array.isArray(arrow.boundElements)) {
      for (const b of arrow.boundElements) {
        if (b.type === "text" && textById.has(b.id)) {
          arrowLabel = textById.get(b.id)?.text?.trim() || "";
          break;
        }
      }
    }

    if (!arrowLabel) {
      const boundText = textElements.find(t => t.containerId === arrow.id);
      if (boundText) {
        arrowLabel = boundText.text?.trim() || "";
      }
    }

    const isBidirectional = Boolean(arrow.startArrowhead && arrow.endArrowhead);

    connections.push({
      id: arrow.id,
      fromId: fromNode.id,
      toId: toNode.id,
      fromLabel: fromNode.label.replace(/[\n\r]+/g, " ").slice(0, 40),
      toLabel: toNode.label.replace(/[\n\r]+/g, " ").slice(0, 40),
      label: arrowLabel,
      isBidirectional,
    });
  }

  // 4. Generate Mermaid Diagram
  const mermaid = generateMermaidFlowchart(nodes, connections, frames);

  // 5. Generate Structured AI Prompt
  const aiPrompt = generateAiMarkdownPrompt(nodes, connections, annotations, frames, mermaid);

  const estimatedTokens = estimateTokenCount(aiPrompt);

  return {
    nodes,
    connections,
    annotations,
    frames,
    stats: {
      nodeCount: nodes.length,
      connectionCount: connections.length,
      annotationCount: annotations.length,
      frameCount: frames.length,
      estimatedTokens,
    },
    mermaid,
    aiPrompt,
  };
};

/**
 * Generate faithful Mermaid flowchart syntax
 */
export const generateMermaidFlowchart = (
  nodes: DiagramNode[],
  connections: DiagramConnection[],
  frames: DiagramFrame[]
): string => {
  if (nodes.length === 0 && connections.length === 0) {
    return 'flowchart LR\n  empty["Empty Canvas"]';
  }

  const lines: string[] = ["flowchart LR"];

  // Helper to format a node representation based on its shape
  const formatNodeSyntax = (node: DiagramNode): string => {
    const sId = sanitizeMermaidId(node.id);
    const label = sanitizeMermaidLabel(node.label);

    switch (node.type) {
      case "diamond":
        return `    ${sId}{"${label}"}`;
      case "ellipse":
        return `    ${sId}(["${label}"])`;
      case "text-card":
        return `    ${sId}>"${label}"]`;
      case "rectangle":
      default:
        return `    ${sId}["${label}"]`;
    }
  };

  // Group nodes by frame
  const nodesByFrame = new Map<string, DiagramNode[]>();
  const unframedNodes: DiagramNode[] = [];

  for (const node of nodes) {
    if (node.frameId) {
      const group = nodesByFrame.get(node.frameId) || [];
      group.push(node);
      nodesByFrame.set(node.frameId, group);
    } else {
      unframedNodes.push(node);
    }
  }

  // Render framed subgraphs
  for (const frame of frames) {
    const framedNodes = nodesByFrame.get(frame.id);
    if (framedNodes && framedNodes.length > 0) {
      const frameId = sanitizeMermaidId(frame.id);
      const frameTitle = sanitizeMermaidLabel(frame.name);
      lines.push(`  subgraph ${frameId} ["${frameTitle}"]`);
      for (const node of framedNodes) {
        lines.push(formatNodeSyntax(node));
      }
      lines.push("  end");
    }
  }

  // Render unframed nodes
  for (const node of unframedNodes) {
    lines.push(formatNodeSyntax(node));
  }

  // Render connections
  for (const conn of connections) {
    const fromId = sanitizeMermaidId(conn.fromId);
    const toId = sanitizeMermaidId(conn.toId);
    const arrowType = conn.isBidirectional ? "<-->" : "-->";

    if (conn.label) {
      const label = sanitizeMermaidLabel(conn.label);
      lines.push(`  ${fromId} ${arrowType}|"${label}"| ${toId}`);
    } else {
      lines.push(`  ${fromId} ${arrowType} ${toId}`);
    }
  }

  return lines.join("\n");
};

/**
 * Generate full Markdown Prompt optimized for LLMs (Claude, ChatGPT, Cursor)
 */
export const generateAiMarkdownPrompt = (
  nodes: DiagramNode[],
  connections: DiagramConnection[],
  annotations: string[],
  frames: DiagramFrame[],
  mermaid: string
): string => {
  const sections: string[] = [];

  sections.push("# Visual Architecture Context\n");
  sections.push(
    "> **Context Overview**: This architecture model is faithfully extracted from a live visual whiteboard (JsonDraw). All components, connections, and annotations represent real user-drawn structures without synthetic hallucination.\n"
  );

  // Stats summary
  sections.push("## 1. System Inventory Summary");
  sections.push(`- **Total Components/Nodes**: ${nodes.length}`);
  sections.push(`- **Total Flows/Connections**: ${connections.length}`);
  if (frames.length > 0) {
    sections.push(`- **Boundaries / Subsystems (Frames)**: ${frames.length}`);
  }
  if (annotations.length > 0) {
    sections.push(`- **Standalone Annotations/Notes**: ${annotations.length}`);
  }
  sections.push("");

  // Mermaid section
  sections.push("## 2. Architecture Topology (Mermaid Diagram)");
  sections.push("```mermaid");
  sections.push(mermaid);
  sections.push("```\n");

  // Component breakdown
  if (nodes.length > 0) {
    sections.push("## 3. Component Details");
    nodes.forEach((node, idx) => {
      const typeStr = node.type.toUpperCase();
      sections.push(`### Component ${idx + 1}: ${node.label.replace(/[\n\r]+/g, " ")}`);
      sections.push(`- **Shape/Role**: \`${typeStr}\``);
      if (node.rawText && node.rawText.includes("\n")) {
        sections.push("- **Extended Specifications**:");
        sections.push("  ```text");
        node.rawText.split("\n").forEach(line => {
          sections.push(`  ${line}`);
        });
        sections.push("  ```");
      }
      sections.push(
        `- **Canvas Coordinates**: (x: ${node.x}, y: ${node.y}, w: ${node.width}, h: ${node.height})`
      );
      sections.push("");
    });
  }

  // Connections breakdown
  if (connections.length > 0) {
    sections.push("## 4. Connections & Data Flows");
    connections.forEach((conn, idx) => {
      const labelText = conn.label ? ` via "${conn.label}"` : "";
      const direction = conn.isBidirectional ? "<--->" : "--->";
      sections.push(
        `${idx + 1}. **[${conn.fromLabel}]** ${direction} **[${conn.toLabel}]**${labelText}`
      );
    });
    sections.push("");
  }

  // Annotations
  if (annotations.length > 0) {
    sections.push("## 5. Whiteboard Notes & Annotations");
    annotations.forEach((note, idx) => {
      sections.push(`- **Note ${idx + 1}**: ${note}`);
    });
    sections.push("");
  }

  // Instructions for AI
  sections.push("## 6. Prompt Directive for AI Assistant");
  sections.push(
    "Please use the visual architecture topology and component specifications above to assist the user. You can:\n" +
      "1. Analyze the system design, identifying potential bottlenecks, single points of failure (SPOF), and scaling risks.\n" +
      "2. Propose concrete tech stacks, communication protocols (REST, gRPC, Kafka), or security boundaries.\n" +
      "3. Generate boilerplate code, infrastructure as code (Terraform/Docker Compose), or database schemas that reflect this architecture.\n" +
      "4. Answer architectural questions strictly aligned with this topology."
  );

  return sections.join("\n");
};
