import React from "react";
import { ActionIcon, Flex, Tooltip, Text } from "@mantine/core";
import { useHotkeys } from "@mantine/hooks";
import styled from "styled-components";
import { LuFocus, LuMaximize, LuMinus, LuPlus } from "react-icons/lu";
import useMindmap from "../stores/useMindmap";

const StyledZoomControls = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  left: 16px;
  bottom: 16px;
  z-index: 100;
  overflow: hidden;
  border: 1px solid
    ${({ theme }) => (theme.BACKGROUND_PRIMARY === "#FFFFFF" ? "#e2e8f0" : "#3f3f46")};
  border-radius: 8px;
  background: ${({ theme }) => (theme.BACKGROUND_PRIMARY === "#FFFFFF" ? "#ffffff" : "#27272a")};
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);

  button {
    border-radius: 0;
    background: transparent;
    color: ${({ theme }) => (theme.BACKGROUND_PRIMARY === "#FFFFFF" ? "#475569" : "#94a3b8")};
    transition: all 0.15s ease;

    &:hover {
      background: ${({ theme }) =>
        theme.BACKGROUND_PRIMARY === "#FFFFFF" ? "#f1f5f9" : "#3f3f46"};
      color: ${({ theme }) => (theme.BACKGROUND_PRIMARY === "#FFFFFF" ? "#0f172a" : "#f8fafc")};
    }
  }

  button + button {
    border-left: 1px solid
      ${({ theme }) => (theme.BACKGROUND_PRIMARY === "#FFFFFF" ? "#e2e8f0" : "#3f3f46")};
  }
`;

export const MindmapZoomControl: React.FC = () => {
  const reactFlowInstance = useMindmap(state => state.reactFlowInstance);
  const centerView = useMindmap(state => state.centerView);
  const focusFirstNode = useMindmap(state => state.focusFirstNode);
  const [coreKey, setCoreKey] = React.useState("⌘");

  React.useEffect(() => {
    if (typeof window !== "undefined") {
      setCoreKey(navigator.userAgent.indexOf("Mac OS X") !== -1 ? "⌘" : "Ctrl");
    }
  }, []);

  const handleZoomIn = () => {
    reactFlowInstance?.zoomIn({ duration: 300 });
  };

  const handleZoomOut = () => {
    reactFlowInstance?.zoomOut({ duration: 300 });
  };

  useHotkeys(
    [
      ["mod+[plus]", handleZoomIn, { usePhysicalKeys: true }],
      ["mod+[minus]", handleZoomOut, { usePhysicalKeys: true }],
      ["shift+Digit1", focusFirstNode, { usePhysicalKeys: true }],
      ["shift+Digit2", centerView, { usePhysicalKeys: true }],
    ],
    []
  );

  return (
    <StyledZoomControls>
      <ActionIcon.Group borderWidth={0}>
        <Tooltip
          label={
            <Flex fz="xs" gap="md">
              <Text fz="xs">Center first item</Text>
              <Text fz="xs" c="dimmed">
                ⇧ 1
              </Text>
            </Flex>
          }
          withArrow
        >
          <ActionIcon
            size="lg"
            variant="light"
            color="gray"
            onClick={focusFirstNode}
            aria-label="Center first item"
          >
            <LuFocus />
          </ActionIcon>
        </Tooltip>

        <Tooltip
          label={
            <Flex fz="xs" gap="md">
              <Text fz="xs">Fit to center</Text>
              <Text fz="xs" c="dimmed">
                ⇧ 2
              </Text>
            </Flex>
          }
          withArrow
        >
          <ActionIcon
            size="lg"
            variant="light"
            color="gray"
            onClick={centerView}
            aria-label="Fit to center"
          >
            <LuMaximize />
          </ActionIcon>
        </Tooltip>

        <Tooltip
          label={
            <Flex fz="xs" gap="md">
              <Text fz="xs">Zoom out</Text>
              <Text fz="xs" c="dimmed">
                {coreKey} −
              </Text>
            </Flex>
          }
          withArrow
        >
          <ActionIcon
            size="lg"
            variant="light"
            color="gray"
            onClick={handleZoomOut}
            aria-label="Zoom out"
          >
            <LuMinus />
          </ActionIcon>
        </Tooltip>

        <Tooltip
          label={
            <Flex fz="xs" gap="md">
              <Text fz="xs">Zoom in</Text>
              <Text fz="xs" c="dimmed">
                {coreKey} +
              </Text>
            </Flex>
          }
          withArrow
        >
          <ActionIcon
            size="lg"
            variant="light"
            color="gray"
            onClick={handleZoomIn}
            aria-label="Zoom in"
          >
            <LuPlus />
          </ActionIcon>
        </Tooltip>
      </ActionIcon.Group>
    </StyledZoomControls>
  );
};

export default MindmapZoomControl;
