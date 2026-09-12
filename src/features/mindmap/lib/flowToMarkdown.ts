import type { Node, Edge } from "reactflow";
import type { NoteCardData } from "../types";

/**
 * Converts reactflow nodes/edges back to a markdown string.
 */
export function exportFlowToMarkdown(nodes: Node[], edges: Edge[]): string {
  if (!nodes.length) return "";

  const adj = new Map<string, string[]>();
  const inDegree = new Map<string, number>();

  for (const node of nodes) {
    adj.set(node.id, []);
    inDegree.set(node.id, 0);
  }

  for (const edge of edges) {
    if (adj.has(edge.source) && inDegree.has(edge.target)) {
      adj.get(edge.source)!.push(edge.target);
      inDegree.set(edge.target, inDegree.get(edge.target)! + 1);
    }
  }

  const roots = nodes.filter(n => (inDegree.get(n.id) || 0) === 0);

  // Sort roots by Y position
  roots.sort((a, b) => a.position.y - b.position.y);

  let markdown = "";

  function traverse(nodeId: string, depth: number) {
    const node = nodes.find(n => n.id === nodeId);
    if (!node) return;

    const data = node.data as NoteCardData;
    const text = data?.label || "";

    if (depth === 0) {
      markdown += `# ${text}\n`;
    } else {
      const indent = "  ".repeat(depth - 1);
      markdown += `${indent}- ${text}\n`;
    }

    const children = adj.get(nodeId) || [];
    const childNodes = children
      .map(id => nodes.find(n => n.id === id))
      .filter((n): n is Node => !!n);

    // Sort children by Y position
    childNodes.sort((a, b) => a.position.y - b.position.y);

    for (const child of childNodes) {
      traverse(child.id, depth + 1);
    }
  }

  for (const root of roots) {
    traverse(root.id, 0);
  }

  return markdown.trim();
}
