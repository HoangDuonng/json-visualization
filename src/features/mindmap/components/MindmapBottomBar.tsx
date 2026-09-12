import React from "react";
import { Flex, Menu, Popover, Text } from "@mantine/core";
import styled from "styled-components";
import { BiSolidDockLeft } from "react-icons/bi";
import { IoMdCheckmark } from "react-icons/io";
import { MdArrowUpward } from "react-icons/md";
import { VscCheck, VscError, VscSync, VscSyncIgnored } from "react-icons/vsc";
import useMindmap, { type MindmapFormat } from "../stores/useMindmap";

const StyledBottomBar = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-top: 1px solid ${({ theme }) => theme.EDITOR_BORDER};
  background: ${({ theme }) => theme.EDITOR_PANEL_MUTED};
  min-height: 36px;
  height: 36px;
  z-index: 35;
  padding: 0 8px;

  @media screen and (max-width: 320px) {
    display: none;
  }
`;

const StyledLeft = styled.div`
  display: flex;
  align-items: center;
  justify-content: left;
  gap: 4px;
  padding-left: 8px;

  @media screen and (max-width: 480px) {
    display: none;
  }
`;

const StyledRight = styled.div`
  display: flex;
  align-items: center;
  justify-content: right;
  gap: 4px;
`;

const StyledBottomBarItem = styled.button<{ $bg?: string }>`
  display: flex;
  align-items: center;
  gap: 4px;
  width: fit-content;
  margin: 0;
  height: 28px;
  padding: 4px 7px;
  border: 1px solid transparent;
  border-radius: 4px;
  font-size: 11px;
  font-weight: 500;
  color: ${({ theme }) => theme.INTERACTIVE_NORMAL};
  background: ${({ $bg }) => $bg};
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;

  &:hover:not(&:disabled) {
    border-color: ${({ theme }) => theme.EDITOR_BORDER_STRONG};
    background: ${({ theme }) => theme.EDITOR_PANEL};
    color: ${({ theme }) => theme.INTERACTIVE_HOVER};
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.EDITOR_ACCENT};
    outline-offset: 1px;
  }

  &:disabled {
    opacity: 0.6;
    cursor: default;
  }
`;

const SUPPORTED_FORMATS: { label: string; value: MindmapFormat; hint: string }[] = [
  { label: "MARKDOWN", value: "markdown", hint: "Nested bullet lists (- / *) & # headings" },
  { label: "JSON", value: "json", hint: "Hierarchical JSON object or { children }" },
  { label: "MERMAID", value: "mermaid", hint: "mindmap root((Title)) syntax" },
];

export const MindmapBottomBar: React.FC = () => {
  const error = useMindmap(state => state.error);
  const liveTransformEnabled = useMindmap(state => state.liveTransformEnabled);
  const toggleLiveTransform = useMindmap(state => state.toggleLiveTransform);
  const toggleSourceCollapsed = useMindmap(state => state.toggleSourceCollapsed);
  const format = useMindmap(state => state.format);
  const setFormat = useMindmap(state => state.setFormat);

  return (
    <StyledBottomBar>
      <StyledLeft>
        <StyledBottomBarItem onClick={toggleSourceCollapsed} title="Toggle source panel">
          <BiSolidDockLeft />
        </StyledBottomBarItem>
        <StyledBottomBarItem>
          {error ? (
            <Popover width="auto" shadow="md" position="top" withArrow>
              <Popover.Target>
                <Flex align="center" gap={2}>
                  <VscError color="red" />
                  <Text c="red" fw={500} fz="xs">
                    Invalid
                  </Text>
                </Flex>
              </Popover.Target>
              <Popover.Dropdown style={{ pointerEvents: "none" }}>
                <Text size="xs">{error}</Text>
              </Popover.Dropdown>
            </Popover>
          ) : (
            <Flex align="center" gap={2}>
              <VscCheck />
              <Text size="xs">Valid</Text>
            </Flex>
          )}
        </StyledBottomBarItem>
        <StyledBottomBarItem onClick={toggleLiveTransform} title="Toggle live transform">
          {liveTransformEnabled ? <VscSync /> : <VscSyncIgnored />}
          <Text fz="xs">Live Transform</Text>
        </StyledBottomBarItem>
      </StyledLeft>

      <StyledRight>
        <Menu offset={8} position="top-end">
          <Menu.Target>
            <StyledBottomBarItem title="Select or view supported formats">
              <Flex align="center" gap={2}>
                <MdArrowUpward />
                <Text size="xs" fw={600}>
                  {format.toUpperCase()}
                </Text>
              </Flex>
            </StyledBottomBarItem>
          </Menu.Target>
          <Menu.Dropdown>
            <Menu.Label>Supported Formats</Menu.Label>
            {SUPPORTED_FORMATS.map(f => (
              <Menu.Item
                key={f.value}
                fz={12}
                onClick={() => setFormat(f.value)}
                rightSection={format === f.value && <IoMdCheckmark />}
              >
                <div>
                  <Text size="xs" fw={600}>
                    {f.label}
                  </Text>
                  <Text size="10px" c="dimmed">
                    {f.hint}
                  </Text>
                </div>
              </Menu.Item>
            ))}
          </Menu.Dropdown>
        </Menu>
      </StyledRight>
    </StyledBottomBar>
  );
};

export default MindmapBottomBar;
