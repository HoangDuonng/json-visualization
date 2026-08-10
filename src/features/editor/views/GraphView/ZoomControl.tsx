import React from "react";
import { ActionIcon, Flex, Tooltip, Text } from "@mantine/core";
import { useHotkeys } from "@mantine/hooks";
import styled from "styled-components";
import { event as gaEvent } from "nextjs-google-analytics";
import { LuFocus, LuMaximize, LuMinus, LuPlus } from "react-icons/lu";
import useGraph from "./stores/useGraph";

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

export const ZoomControl = () => {
  const zoomIn = useGraph(state => state.zoomIn);
  const zoomOut = useGraph(state => state.zoomOut);
  const centerView = useGraph(state => state.centerView);
  const focusFirstNode = useGraph(state => state.focusFirstNode);

  useHotkeys(
    [
      ["mod+[plus]", zoomIn, { usePhysicalKeys: true }],
      ["mod+[minus]", zoomOut, { usePhysicalKeys: true }],
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
            onClick={() => {
              focusFirstNode();
              gaEvent("focus_first_node");
            }}
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
            onClick={() => {
              centerView();
              gaEvent("center_view");
            }}
          >
            <LuMaximize />
          </ActionIcon>
        </Tooltip>
        <ActionIcon
          size="lg"
          variant="light"
          color="gray"
          onClick={() => {
            zoomOut();
            gaEvent("zoom_out");
          }}
        >
          <LuMinus />
        </ActionIcon>
        <ActionIcon
          size="lg"
          variant="light"
          color="gray"
          onClick={() => {
            zoomIn();
            gaEvent("zoom_in");
          }}
        >
          <LuPlus />
        </ActionIcon>
      </ActionIcon.Group>
    </StyledZoomControls>
  );
};
