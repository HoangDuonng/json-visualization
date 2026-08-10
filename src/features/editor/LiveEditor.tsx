import React from "react";
import { useRouter } from "next/router";
import { useSessionStorage } from "@mantine/hooks";
import styled from "styled-components";
import { ViewMode } from "../../constants/enumData";
import { GraphView } from "./views/GraphView";
import { JsonDrawView } from "./views/JsonDrawView";
import { TreeView } from "./views/TreeView";

const StyledLiveEditor = styled.div`
  position: relative;
  height: 100%;
  background: ${({ theme }) => theme.GRID_BG_COLOR};
  overflow: auto;
  cursor: url("/assets/cursor.svg"), auto;

  & > ul {
    margin-top: 0 !important;
    padding: 12px !important;
    font-family: monospace;
    font-size: 14px;
    font-weight: 500;
  }

  .tab-group {
    position: absolute;
    top: 10px;
    left: 10px;
    z-index: 2;
  }
`;

const View = () => {
  const router = useRouter();
  const [viewMode] = useSessionStorage({
    key: "viewMode",
    defaultValue: ViewMode.Graph,
  });

  if (router.pathname === "/draw") return <JsonDrawView />;
  if (viewMode === ViewMode.Tree) return <TreeView />;
  return <GraphView />;
};

const LiveEditor = () => {
  return (
    <StyledLiveEditor onContextMenuCapture={e => e.preventDefault()}>
      <View />
    </StyledLiveEditor>
  );
};

export default LiveEditor;
