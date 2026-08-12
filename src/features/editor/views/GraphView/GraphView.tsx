import React from "react";
import { Box } from "@mantine/core";
import { useDebouncedValue } from "@mantine/hooks";
import { HamsterLoader } from "@jsondraw-runtime";
import debounce from "lodash.debounce";
import { Space } from "react-zoomable-ui";
import { useLongPress } from "use-long-press";
import useConfig from "src/store/useConfig";
import { GraphCanvas } from "./GraphCanvas";
import { NotSupported } from "./NotSupported";
import { OptionsMenu } from "./OptionsMenu";
import { SecureInfo } from "./SecureInfo";
import { ZoomControl } from "./ZoomControl";
import useGraph from "./stores/useGraph";
import { StyledEditorWrapper } from "./styles";

export interface GraphProps {
  isWidget?: boolean;
}

export const GraphView: React.FC<GraphProps> = ({ isWidget = false }) => {
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
    const canvas = document.querySelector(".jsonviz-canvas") as HTMLDivElement | null;
    canvas?.classList.add("dragging");
  }, []);

  const bindLongPress = useLongPress(callback, {
    threshold: 150,
    onFinish: () => {
      const canvas = document.querySelector(".jsonviz-canvas") as HTMLDivElement | null;
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
          className="jsonviz-space"
        >
          <GraphCanvas isWidget={isWidget} />
        </Space>
      </StyledEditorWrapper>
    </Box>
  );
};

export default GraphView;
