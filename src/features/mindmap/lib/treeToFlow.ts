import type { Node, Edge } from "reactflow";
import type { NoteNode, NoteCardData, MindmapDirection } from "../types";

const VERTICAL_GAP = 28;
const NODE_HEIGHT = 44;
const HORIZONTAL_MARGIN = 90;
const VERTICAL_LEVEL_GAP = 120;
const HORIZONTAL_SIBLING_GAP = 28;

/**
 * Calculates dynamic width for a node based on its label.
 */
export function estimateNodeWidth(text: string): number {
  const charWidth = 8.5;
  const padding = 54;
  return Math.min(380, Math.max(150, Math.ceil(text.length * charWidth + padding)));
}

function createFlowNode(
  node: NoteNode,
  x: number,
  y: number,
  direction: MindmapDirection,
  hasChildren: boolean,
  isExpanded: boolean
): Node<NoteCardData> {
  return {
    id: node.id,
    type: "noteCard",
    position: { x, y },
    data: {
      label: node.text,
      depth: node.depth,
      direction,
      isRoot: node.depth === 0,
      hasChildren,
      isExpanded,
      childCount: node.children.length,
    },
  };
}

function createFlowEdge(sourceId: string, targetId: string): Edge {
  return {
    id: `e-${sourceId}-${targetId}`,
    source: sourceId,
    target: targetId,
    type: "default",
    animated: false,
    style: {
      stroke: "#9ba7f5",
      strokeWidth: 2,
    },
  };
}

/**
 * Converts NoteNode tree to reactflow nodes and edges with auto-layout,
 * direction (RIGHT or DOWN), and expand/collapse support.
 */
export function treeToFlowElements(
  roots: NoteNode[],
  collapsedIds: Set<string> = new Set(),
  direction: MindmapDirection = "RIGHT"
): { nodes: Node<NoteCardData>[]; edges: Edge[] } {
  const nodes: Node<NoteCardData>[] = [];
  const edges: Edge[] = [];

  if (direction === "DOWN") {
    // Top-to-bottom layout
    let currentX = 50;

    function layoutNodeDown(node: NoteNode, xOffset: number): number {
      const hasChildren = node.children.length > 0;
      const isExpanded = !collapsedIds.has(node.id) && node.isExpanded !== false;
      const nodeW = estimateNodeWidth(node.text);

      let childX = xOffset;
      if (hasChildren && isExpanded) {
        for (const child of node.children) {
          const childSubtreeWidth = layoutNodeDown(child, childX);
          childX += childSubtreeWidth;
        }
      }

      const totalChildrenWidth =
        hasChildren && isExpanded
          ? Math.max(childX - xOffset, nodeW + HORIZONTAL_SIBLING_GAP)
          : nodeW + HORIZONTAL_SIBLING_GAP;

      const xPos =
        hasChildren && isExpanded ? xOffset + (childX - xOffset) / 2 - nodeW / 2 : xOffset;

      const yPos = 50 + node.depth * VERTICAL_LEVEL_GAP;

      nodes.push(createFlowNode(node, xPos, yPos, "DOWN", hasChildren, isExpanded));

      if (hasChildren && isExpanded) {
        for (const child of node.children) {
          edges.push(createFlowEdge(node.id, child.id));
        }
      }

      return totalChildrenWidth;
    }

    for (const root of roots) {
      const treeWidth = layoutNodeDown(root, currentX);
      currentX += treeWidth + HORIZONTAL_SIBLING_GAP;
    }

    return { nodes, edges };
  }

  // Horizontal (RIGHT) layout
  const maxLevelWidth: Record<number, number> = {};

  function scanWidths(node: NoteNode) {
    const w = estimateNodeWidth(node.text);
    maxLevelWidth[node.depth] = Math.max(maxLevelWidth[node.depth] || 0, w);

    const isExpanded = !collapsedIds.has(node.id) && node.isExpanded !== false;
    if (isExpanded) {
      for (const child of node.children) {
        scanWidths(child);
      }
    }
  }

  for (const root of roots) {
    scanWidths(root);
  }

  const levelX: Record<number, number> = { 0: 50 };
  const maxDepth = Math.max(0, ...Object.keys(maxLevelWidth).map(Number));
  for (let d = 1; d <= maxDepth + 1; d++) {
    const prevX = levelX[d - 1] ?? 50;
    const prevW = maxLevelWidth[d - 1] ?? 180;
    levelX[d] = prevX + prevW + HORIZONTAL_MARGIN;
  }

  let currentY = 50;

  function layoutNodeRight(node: NoteNode, yOffset: number): number {
    const hasChildren = node.children.length > 0;
    const isExpanded = !collapsedIds.has(node.id) && node.isExpanded !== false;

    let childY = yOffset;
    if (hasChildren && isExpanded) {
      for (const child of node.children) {
        const childSubtreeHeight = layoutNodeRight(child, childY);
        childY += childSubtreeHeight;
      }
    }

    const totalChildrenHeight =
      hasChildren && isExpanded
        ? Math.max(childY - yOffset, NODE_HEIGHT + VERTICAL_GAP)
        : NODE_HEIGHT + VERTICAL_GAP;

    const yPos =
      hasChildren && isExpanded ? yOffset + (childY - yOffset) / 2 - NODE_HEIGHT / 2 : yOffset;

    const xPos = levelX[node.depth] ?? node.depth * 280;

    nodes.push(createFlowNode(node, xPos, yPos, "RIGHT", hasChildren, isExpanded));

    if (hasChildren && isExpanded) {
      for (const child of node.children) {
        edges.push(createFlowEdge(node.id, child.id));
      }
    }

    return totalChildrenHeight;
  }

  for (const root of roots) {
    const treeHeight = layoutNodeRight(root, currentY);
    currentY += treeHeight + VERTICAL_GAP;
  }

  return { nodes, edges };
}
