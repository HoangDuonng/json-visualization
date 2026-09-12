import type { Node, Edge, ReactFlowInstance } from "reactflow";
import { create } from "zustand";
import { exportFlowToMarkdown } from "../lib/flowToMarkdown";
import { NORTHSTAR_EXAMPLES, convertTreeToFormat } from "../lib/formatConverters";
import { generateNodeId, parseMarkdownToTree } from "../lib/markdownParser";
import { treeToFlowElements } from "../lib/treeToFlow";
import type { NoteNode, NoteCardData, MindmapDirection } from "../types";

export const DEFAULT_MINDMAP_TEXT = NORTHSTAR_EXAMPLES.markdown;

export type MindmapFormat = "markdown" | "json" | "mermaid";

interface MindmapState {
  inputText: string;
  format: MindmapFormat;
  direction: MindmapDirection;
  error: string | null;
  liveTransformEnabled: boolean;
  rawTree: NoteNode[];
  collapsedIds: Set<string>;
  nodes: Node<NoteCardData>[];
  edges: Edge[];
  reactFlowInstance: ReactFlowInstance | null;
  isSourceCollapsed: boolean;
  searchQuery: string;
  searchMatches: string[];
  searchIndex: number;
}

interface MindmapActions {
  setInputText: (text: string) => void;
  setFormat: (format: MindmapFormat) => void;
  setNodes: (nodes: Node<NoteCardData>[]) => void;
  setEdges: (edges: Edge[]) => void;
  setReactFlowInstance: (instance: ReactFlowInstance) => void;
  toggleLiveTransform: () => void;
  toggleSourceCollapsed: () => void;
  toggleDirection: () => void;
  setDirection: (dir: MindmapDirection) => void;
  parseAndLayout: (text?: string) => void;
  exportToMarkdown: () => string;
  toggleNodeExpand: (nodeId: string) => void;
  expandAllNodes: () => void;
  collapseToFirstLevel: () => void;
  addChildNode: (parentId: string) => void;
  deleteNode: (nodeId: string) => void;
  updateNodeLabel: (nodeId: string, label: string) => void;
  loadExampleForFormat: (fmt: MindmapFormat) => void;
  clearAll: () => void;
  setSearchQuery: (query: string) => void;
  skipSearchResult: () => void;
  focusFirstNode: () => void;
  centerView: () => void;
}

function findNodeInTree(nodes: NoteNode[], id: string): NoteNode | null {
  for (const node of nodes) {
    if (node.id === id) return node;
    const found = findNodeInTree(node.children, id);
    if (found) return found;
  }
  return null;
}

function addNodeToTree(nodes: NoteNode[], parentId: string, newNode: NoteNode): NoteNode[] {
  return nodes.map(node => {
    if (node.id === parentId) {
      return {
        ...node,
        children: [...node.children, newNode],
      };
    }
    if (node.children.length > 0) {
      return {
        ...node,
        children: addNodeToTree(node.children, parentId, newNode),
      };
    }
    return node;
  });
}

function updateNodeInTree(nodes: NoteNode[], nodeId: string, newText: string): NoteNode[] {
  return nodes.map(node => {
    if (node.id === nodeId) {
      return {
        ...node,
        text: newText,
      };
    }
    if (node.children.length > 0) {
      return {
        ...node,
        children: updateNodeInTree(node.children, nodeId, newText),
      };
    }
    return node;
  });
}

function removeNodeFromTree(nodes: NoteNode[], id: string): NoteNode[] {
  return nodes
    .filter(n => n.id !== id)
    .map(n => ({
      ...n,
      children: removeNodeFromTree(n.children, id),
    }));
}

function detectFormat(text: string): MindmapFormat {
  const trimmed = text.trim();
  if (
    (trimmed.startsWith("{") && trimmed.endsWith("}")) ||
    (trimmed.startsWith("[") && trimmed.endsWith("]"))
  ) {
    return "json";
  }
  if (trimmed.startsWith("mindmap")) {
    return "mermaid";
  }
  return "markdown";
}

const initialTree = parseMarkdownToTree(DEFAULT_MINDMAP_TEXT);
const initialCollapsed = new Set<string>();
const { nodes: initialNodes, edges: initialEdges } = treeToFlowElements(
  initialTree,
  initialCollapsed,
  "RIGHT"
);

const useMindmap = create<MindmapState & MindmapActions>((set, get) => ({
  inputText: DEFAULT_MINDMAP_TEXT,
  format: "markdown",
  direction: "RIGHT",
  error: null,
  liveTransformEnabled: true,
  rawTree: initialTree,
  collapsedIds: initialCollapsed,
  nodes: initialNodes,
  edges: initialEdges,
  reactFlowInstance: null,
  isSourceCollapsed: false,
  searchQuery: "",
  searchMatches: [],
  searchIndex: 0,

  setReactFlowInstance: instance => set({ reactFlowInstance: instance }),

  toggleLiveTransform: () => set(state => ({ liveTransformEnabled: !state.liveTransformEnabled })),

  toggleSourceCollapsed: () => set(state => ({ isSourceCollapsed: !state.isSourceCollapsed })),

  toggleDirection: () => {
    const nextDirection: MindmapDirection = get().direction === "RIGHT" ? "DOWN" : "RIGHT";
    const { rawTree, collapsedIds } = get();
    const { nodes, edges } = treeToFlowElements(rawTree, collapsedIds, nextDirection);
    set({ direction: nextDirection, nodes, edges });
  },

  setDirection: dir => {
    const { rawTree, collapsedIds } = get();
    const { nodes, edges } = treeToFlowElements(rawTree, collapsedIds, dir);
    set({ direction: dir, nodes, edges });
  },

  setFormat: targetFormat => {
    const { rawTree, format } = get();
    if (targetFormat === format) return;

    const convertedText = convertTreeToFormat(rawTree, targetFormat);
    set({
      format: targetFormat,
      inputText: convertedText,
      error: null,
    });
  },

  setInputText: text => {
    set({ inputText: text });
    if (!get().liveTransformEnabled) return;

    try {
      const detected = detectFormat(text);
      const rawTree = parseMarkdownToTree(text);
      if (rawTree.length === 0 && text.trim().length > 0) {
        set({ error: "No valid hierarchy detected in outline" });
        return;
      }
      const collapsedIds = new Set<string>();
      const { nodes, edges } = treeToFlowElements(rawTree, collapsedIds, get().direction);
      set({
        rawTree,
        collapsedIds,
        nodes,
        edges,
        error: null,
        format: detected,
      });
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Failed to parse content";
      set({ error: message });
    }
  },

  setNodes: nodes => set({ nodes }),

  setEdges: edges => set({ edges }),

  parseAndLayout: text => {
    const content = text !== undefined ? text : get().inputText;
    try {
      const detected = detectFormat(content);
      const rawTree = parseMarkdownToTree(content);
      const collapsedIds = new Set<string>();
      const { nodes, edges } = treeToFlowElements(rawTree, collapsedIds, get().direction);
      set({
        rawTree,
        collapsedIds,
        nodes,
        edges,
        error: null,
        format: detected,
      });
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Failed to parse content";
      set({ error: message });
    }
  },

  exportToMarkdown: () => {
    const { nodes, edges } = get();
    return exportFlowToMarkdown(nodes, edges);
  },

  toggleNodeExpand: nodeId => {
    const { rawTree, collapsedIds, direction } = get();
    const newCollapsed = new Set(collapsedIds);
    if (newCollapsed.has(nodeId)) {
      newCollapsed.delete(nodeId);
    } else {
      newCollapsed.add(nodeId);
    }
    const { nodes, edges } = treeToFlowElements(rawTree, newCollapsed, direction);
    set({ collapsedIds: newCollapsed, nodes, edges });
  },

  expandAllNodes: () => {
    const { rawTree, direction } = get();
    const newCollapsed = new Set<string>();
    const { nodes, edges } = treeToFlowElements(rawTree, newCollapsed, direction);
    set({ collapsedIds: newCollapsed, nodes, edges });
  },

  collapseToFirstLevel: () => {
    const { rawTree, direction } = get();
    const newCollapsed = new Set<string>();

    function collectSubbranches(nodes: NoteNode[]) {
      for (const node of nodes) {
        // Keep root (depth 0) open, but collapse any children at depth >= 1 that have descendants
        if (node.depth >= 1 && node.children.length > 0) {
          newCollapsed.add(node.id);
        }
        collectSubbranches(node.children);
      }
    }

    collectSubbranches(rawTree);
    const { nodes, edges } = treeToFlowElements(rawTree, newCollapsed, direction);
    set({ collapsedIds: newCollapsed, nodes, edges });
  },

  addChildNode: parentId => {
    const { rawTree, collapsedIds, format, direction } = get();
    const parent = findNodeInTree(rawTree, parentId);
    if (!parent) return;

    const newId = generateNodeId();
    const newNode: NoteNode = {
      id: newId,
      text: "New idea",
      depth: parent.depth + 1,
      children: [],
    };
    const updatedTree = addNodeToTree(rawTree, parentId, newNode);

    const newCollapsed = new Set(collapsedIds);
    newCollapsed.delete(parentId);

    const { nodes, edges } = treeToFlowElements(updatedTree, newCollapsed, direction);
    const updatedText = convertTreeToFormat(updatedTree, format);
    set({
      rawTree: updatedTree,
      collapsedIds: newCollapsed,
      nodes,
      edges,
      inputText: updatedText,
    });
  },

  deleteNode: nodeId => {
    const { rawTree, collapsedIds, format, direction } = get();
    const updatedTree = removeNodeFromTree(rawTree, nodeId);
    const newCollapsed = new Set(collapsedIds);
    newCollapsed.delete(nodeId);

    const { nodes, edges } = treeToFlowElements(updatedTree, newCollapsed, direction);
    const updatedText = convertTreeToFormat(updatedTree, format);
    set({
      rawTree: updatedTree,
      collapsedIds: newCollapsed,
      nodes,
      edges,
      inputText: updatedText,
    });
  },

  updateNodeLabel: (nodeId, label) => {
    const { rawTree, format } = get();
    const updatedTree = updateNodeInTree(rawTree, nodeId, label);
    const updatedNodes = get().nodes.map(node =>
      node.id === nodeId ? { ...node, data: { ...node.data, label, isEditing: false } } : node
    );
    const updatedText = convertTreeToFormat(updatedTree, format);
    set({
      rawTree: updatedTree,
      nodes: updatedNodes,
      inputText: updatedText,
    });
  },

  loadExampleForFormat: fmt => {
    const example = NORTHSTAR_EXAMPLES[fmt];
    get().setInputText(example);
  },

  clearAll: () => {
    get().setInputText("");
  },

  setSearchQuery: query => {
    const q = query.trim().toLowerCase();
    const { nodes, reactFlowInstance } = get();

    if (!q) {
      set({
        searchQuery: "",
        searchMatches: [],
        searchIndex: 0,
        nodes: nodes.map(n => ({ ...n, selected: false })),
      });
      return;
    }

    const matches = nodes
      .filter(n => (n.data.label || "").toLowerCase().includes(q))
      .map(n => n.id);

    const activeId = matches[0];
    const updatedNodes = nodes.map(n => ({
      ...n,
      selected: n.id === activeId,
    }));

    set({
      searchQuery: query,
      searchMatches: matches,
      searchIndex: 0,
      nodes: updatedNodes,
    });

    if (activeId && reactFlowInstance) {
      const targetNode = nodes.find(n => n.id === activeId);
      if (targetNode) {
        reactFlowInstance.setCenter(targetNode.position.x + 100, targetNode.position.y + 25, {
          zoom: 1.1,
          duration: 400,
        });
      }
    }
  },

  skipSearchResult: () => {
    const { searchMatches, searchIndex, nodes, reactFlowInstance } = get();
    if (searchMatches.length <= 1) return;

    const nextIndex = (searchIndex + 1) % searchMatches.length;
    const activeId = searchMatches[nextIndex];
    const updatedNodes = nodes.map(n => ({
      ...n,
      selected: n.id === activeId,
    }));

    set({ searchIndex: nextIndex, nodes: updatedNodes });

    if (activeId && reactFlowInstance) {
      const targetNode = nodes.find(n => n.id === activeId);
      if (targetNode) {
        reactFlowInstance.setCenter(targetNode.position.x + 100, targetNode.position.y + 25, {
          zoom: 1.1,
          duration: 400,
        });
      }
    }
  },

  focusFirstNode: () => {
    const { nodes, reactFlowInstance } = get();
    const rootNode = nodes.find(n => n.data.isRoot) || nodes[0];
    if (rootNode && reactFlowInstance) {
      reactFlowInstance.setCenter(rootNode.position.x + 80, rootNode.position.y + 20, {
        zoom: 1.2,
        duration: 400,
      });
    }
  },

  centerView: () => {
    get().reactFlowInstance?.fitView({ padding: 0.2, duration: 400 });
  },
}));

export default useMindmap;
