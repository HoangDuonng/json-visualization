import React from "react";
import { useComputedColorScheme } from "@mantine/core";
import type { NodeProps } from "reaflow";
import { Node } from "reaflow";
import { useModal } from "../../../../../store/useModal";
import type { NodeData } from "../../../../../types/graph";
import useGraph from "../stores/useGraph";
import { ObjectNode } from "./ObjectNode";
import { TextNode } from "./TextNode";

export interface CustomNodeProps {
  node: NodeData;
  x: number;
  y: number;
  hasCollapse?: boolean;
}

const CustomNodeWrapper = (nodeProps: NodeProps<NodeData>) => {
  const setSelectedNode = useGraph(state => state.setSelectedNode);
  const setVisible = useModal(state => state.setVisible);
  const colorScheme = useComputedColorScheme();

  const handleNodeClick = React.useCallback(
    (_: React.MouseEvent<SVGGElement, MouseEvent>, data: NodeData) => {
      if (setSelectedNode) setSelectedNode(data);
      setVisible("NodeModal", true);
    },
    [setSelectedNode, setVisible]
  );

  return (
    <Node
      {...nodeProps}
      onClick={handleNodeClick as any}
      animated={false}
      label={null as any}
      rx={8}
      ry={8}
      onEnter={ev => {
        ev.currentTarget.style.stroke = "#3b82f6";
        ev.currentTarget.style.strokeWidth = "2px";
      }}
      onLeave={ev => {
        ev.currentTarget.style.stroke = colorScheme === "dark" ? "#3f3f46" : "#e2e8f0";
        ev.currentTarget.style.strokeWidth = "1px";
      }}
      style={{
        fill: colorScheme === "dark" ? "#18181b" : "#ffffff",
        stroke: colorScheme === "dark" ? "#3f3f46" : "#e2e8f0",
        strokeWidth: 1,
        filter: "drop-shadow(0 4px 6px rgba(0, 0, 0, 0.05))",
      }}
    >
      {({ node, x, y }) => {
        const hasKey = nodeProps.properties.text[0].key;
        if (!hasKey) return <TextNode node={nodeProps.properties as NodeData} x={x} y={y} />;

        return <ObjectNode node={node as NodeData} x={x} y={y} />;
      }}
    </Node>
  );
};

export const CustomNode = React.memo(CustomNodeWrapper);
