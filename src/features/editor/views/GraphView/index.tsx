import React from "react";
import { Box, useComputedColorScheme } from "@mantine/core";
import { useDebouncedValue } from "@mantine/hooks";
import styled from "styled-components";
import { HamsterLoader } from "@jsondraw-runtime";
import debounce from "lodash.debounce";
import { Space } from "react-zoomable-ui";
import { Canvas } from "reaflow";
import type { ElkRoot } from "reaflow";
import { useLongPress } from "use-long-press";
import useConfig from "../../../../store/useConfig";
import { CustomEdge } from "./CustomEdge";
import { CustomNode } from "./CustomNode";
import { NotSupported } from "./NotSupported";
import { OptionsMenu } from "./OptionsMenu";
import { SecureInfo } from "./SecureInfo";
import { ZoomControl } from "./ZoomControl";
import useGraph from "./stores/useGraph";

const StyledEditorWrapper = styled.div<{
  $widget: boolean;
  $showRulers: boolean;
  $showGrid: boolean;
}>`
  width: 100%;
  height: 100vh;

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

  .jsoncrack-space {
    cursor: url("/assets/cursor.svg"), auto;
  }

  :active {
    cursor: move;
  }

  .dragging,
  .dragging button {
    pointer-events: none;
  }

  text {
    fill: ${({ theme }) => theme.INTERACTIVE_NORMAL} !important;
  }

  rect {
    fill: ${({ theme }) => theme.BACKGROUND_NODE};
  }

  @media only screen and (max-width: 320px) {
    height: 100vh;
  }
`;

const layoutOptions = {
  "elk.layered.compaction.postCompaction.strategy": "EDGE_LENGTH",
  "elk.layered.nodePlacement.strategy": "NETWORK_SIMPLEX",
  "elk.spacing.edgeLabel": "15",
};

interface GraphProps {
  isWidget?: boolean;
}

const GraphCanvas = ({ isWidget }: GraphProps) => {
  const setLoading = useGraph(state => state.setLoading);
  const centerView = useGraph(state => state.centerView);
  const direction = useGraph(state => state.direction);
  const nodes = useGraph(state => state.nodes);
  const edges = useGraph(state => state.edges);
  const colorScheme = useComputedColorScheme();
  const [paneWidth, setPaneWidth] = React.useState(2000);
  const [paneHeight, setPaneHeight] = React.useState(2000);

  const onLayoutChange = React.useCallback(
    (layout: ElkRoot) => {
      if (layout.width && layout.height) {
        const areaSize = layout.width * layout.height;
        const changeRatio = Math.abs((areaSize * 100) / (paneWidth * paneHeight) - 100);

        setPaneWidth(layout.width + 50);
        setPaneHeight((layout.height as number) + 50);

        setTimeout(() => {
          window.requestAnimationFrame(() => {
            if (changeRatio > 70 || isWidget) centerView();
            setLoading(false);
          });
        });
      }
    },
    [isWidget, paneHeight, paneWidth, centerView, setLoading]
  );

  return (
    <Canvas
      className="jsoncrack-canvas"
      onLayoutChange={onLayoutChange}
      node={p => <CustomNode {...p} />}
      edge={p => <CustomEdge {...p} />}
      nodes={nodes}
      edges={edges}
      arrow={null}
      maxHeight={paneHeight}
      maxWidth={paneWidth}
      height={paneHeight}
      width={paneWidth}
      direction={direction}
      layoutOptions={layoutOptions}
      key={[direction, colorScheme].join("-")}
      pannable={false}
      zoomable={false}
      animated={false}
      readonly={true}
      dragEdge={null}
      dragNode={null}
      fit={true}
    />
  );
};

export const GraphView = ({ isWidget = false }: GraphProps) => {
  const setViewPort = useGraph(state => state.setViewPort);
  const viewPort = useGraph(state => state.viewPort);
  const centerView = useGraph(state => state.centerView);
  const aboveSupportedLimit = useGraph(state => state.aboveSupportedLimit);
  const loading = useGraph(state => state.loading);
  const gesturesEnabled = useConfig(state => state.gesturesEnabled);
  const rulersEnabled = useConfig(state => state.rulersEnabled);
  const [showGrid, setShowGrid] = React.useState(isWidget);
  const [debouncedLoading] = useDebouncedValue(loading, 300);
  const didInitialCenter = React.useRef(false);

  const callback = React.useCallback(() => {
    const canvas = document.querySelector(".jsoncrack-canvas") as HTMLDivElement | null;
    canvas?.classList.add("dragging");
  }, []);

  const bindLongPress = useLongPress(callback, {
    threshold: 150,
    onFinish: () => {
      const canvas = document.querySelector(".jsoncrack-canvas") as HTMLDivElement | null;
      canvas?.classList.remove("dragging");
    },
  });

  const blurOnClick = React.useCallback(() => {
    if ("activeElement" in document) (document.activeElement as HTMLElement)?.blur();
  }, []);

  const debouncedOnZoomChangeHandler = debounce(() => {
    setViewPort(viewPort!);
  }, 300);

  React.useEffect(() => {
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

  React.useEffect(() => {
    if (didInitialCenter.current || loading || !viewPort) return;
    didInitialCenter.current = true;
    const timer = window.setTimeout(() => {
      centerView();
    }, 200);

    return () => window.clearTimeout(timer);
  }, [centerView, loading, viewPort]);

  return (
    <Box pos="relative" h="100%" w="100%">
      {aboveSupportedLimit && <NotSupported />}
      {debouncedLoading && (
        <Box pos="absolute" inset={0} style={{ display: "grid", placeItems: "center" }}>
          <HamsterLoader />
        </Box>
      )}
      {!isWidget && <OptionsMenu />}
      {!isWidget && <SecureInfo />}
      <ZoomControl />
      <StyledEditorWrapper
        $widget={isWidget}
        onContextMenu={e => e.preventDefault()}
        onClick={blurOnClick}
        key={String(gesturesEnabled)}
        $showRulers={rulersEnabled}
        $showGrid={showGrid}
        {...bindLongPress()}
      >
        <Space
          onUpdated={() => debouncedOnZoomChangeHandler()}
          onCreate={setViewPort}
          onContextMenu={e => e.preventDefault()}
          treatTwoFingerTrackPadGesturesLikeTouch={gesturesEnabled}
          pollForElementResizing
          className="jsoncrack-space"
        >
          <GraphCanvas isWidget={isWidget} />
        </Space>
      </StyledEditorWrapper>
    </Box>
  );
};
