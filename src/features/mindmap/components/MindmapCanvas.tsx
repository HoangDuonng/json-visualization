import React, { useMemo, useCallback, useState, useEffect } from "react";
import styled from "styled-components";
import ReactFlow, {
  ReactFlowProvider,
  addEdge,
  applyNodeChanges,
  applyEdgeChanges,
} from "reactflow";
import type { Connection, NodeChange, EdgeChange, ReactFlowInstance } from "reactflow";
import "reactflow/dist/style.css";
import { SecureInfo } from "src/features/editor/views/GraphView/SecureInfo";
import useMindmap from "../stores/useMindmap";
import { MindmapOptionsMenu } from "./MindmapOptionsMenu";
import { MindmapZoomControl } from "./MindmapZoomControl";
import { NoteCardNode } from "./NoteCardNode";

const StyledCanvasContainer = styled.div<{ $showGrid: boolean }>`
  position: relative;
  width: 100%;
  height: 100%;
  flex: 1;

  --bg-color: ${({ theme }) => theme.GRID_BG_COLOR};
  --dot-color: ${({ theme }) => (theme.BACKGROUND_PRIMARY === "#FFFFFF" ? "#cbd5e1" : "#3f3f46")};

  background-color: var(--bg-color);

  ${({ $showGrid }) =>
    $showGrid &&
    `
    background-image: radial-gradient(var(--dot-color) 1.25px, transparent 1.25px);
    background-size: 20px 20px;
    background-position: 0 0;
  `};

  .react-flow__edge-path {
    stroke: #9ba7f5 !important;
    stroke-width: 2px !important;
  }

  .react-flow__edge.selected .react-flow__edge-path {
    stroke: #37ff8b !important;
  }

  .react-flow__attribution {
    display: none;
  }
`;

const MindmapCanvasInner: React.FC = () => {
  const [showGrid, setShowGrid] = useState(false);
  const nodes = useMindmap(state => state.nodes);
  const edges = useMindmap(state => state.edges);
  const setNodes = useMindmap(state => state.setNodes);
  const setEdges = useMindmap(state => state.setEdges);
  const setReactFlowInstance = useMindmap(state => state.setReactFlowInstance);

  const nodeTypes = useMemo(() => ({ noteCard: NoteCardNode }), []);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;

      if (target) {
        const tagName = target.tagName;
        const isEditableInput =
          tagName === "INPUT" || tagName === "TEXTAREA" || target.isContentEditable;

        if (isEditableInput) {
          return;
        }
      }

      if ((event.metaKey || event.ctrlKey) && event.key === "'" && !event.repeat) {
        event.preventDefault();
        setShowGrid(prev => !prev);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const onNodesChange = useCallback(
    (changes: NodeChange[]) => {
      setNodes(applyNodeChanges(changes, nodes));
    },
    [nodes, setNodes]
  );

  const onEdgesChange = useCallback(
    (changes: EdgeChange[]) => {
      setEdges(applyEdgeChanges(changes, edges));
    },
    [edges, setEdges]
  );

  const onConnect = useCallback(
    (connection: Connection) => {
      setEdges(
        addEdge(
          {
            ...connection,
            type: "default",
            style: { stroke: "#9ba7f5", strokeWidth: 2 },
          },
          edges
        )
      );
    },
    [edges, setEdges]
  );

  const onInit = useCallback(
    (instance: ReactFlowInstance) => {
      setReactFlowInstance(instance);
      setTimeout(() => {
        instance.fitView({ padding: 0.2 });
      }, 100);
    },
    [setReactFlowInstance]
  );

  return (
    <StyledCanvasContainer $showGrid={showGrid}>
      <MindmapOptionsMenu />
      <MindmapZoomControl />
      <SecureInfo />

      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onInit={onInit}
        nodeTypes={nodeTypes}
        fitView
        nodesDraggable
        nodesConnectable
        defaultEdgeOptions={{
          type: "default",
          style: { stroke: "#9ba7f5", strokeWidth: 2 },
        }}
      />
    </StyledCanvasContainer>
  );
};

export const MindmapCanvas: React.FC = () => {
  return (
    <ReactFlowProvider>
      <MindmapCanvasInner />
    </ReactFlowProvider>
  );
};

export default MindmapCanvas;
