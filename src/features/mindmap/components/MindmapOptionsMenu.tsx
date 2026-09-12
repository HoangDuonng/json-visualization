import React from "react";
import { ActionIcon, Button, Flex, Menu, Text, Tooltip } from "@mantine/core";
import { useHotkeys } from "@mantine/hooks";
import styled, { useTheme } from "styled-components";
import {
  LuCopy,
  LuDownload,
  LuFileText,
  LuFoldHorizontal,
  LuImageDown,
  LuLayoutGrid,
  LuMenu,
  LuRefreshCw,
  LuUnfoldHorizontal,
} from "react-icons/lu";
import { TiFlowMerge } from "react-icons/ti";
import { toast } from "sonner";
import { downloadMindmapPng, copyMindmapPngToClipboard } from "../lib/exportPng";
import useMindmap from "../stores/useMindmap";

const StyledFlowIcon = styled(TiFlowMerge)<{ $rotate: number }>`
  transform: rotate(${({ $rotate }) => `${$rotate}deg`});
  transition: transform 0.2s ease;
`;

const StyledOptions = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  gap: 8px;
  top: 12px;
  left: 12px;
  z-index: 100;

  > button {
    border: 1px solid ${({ theme }) => theme.EDITOR_BORDER};
    border-radius: 6px;
    background: ${({ theme }) => theme.EDITOR_PANEL};
    color: ${({ theme }) => theme.INTERACTIVE_NORMAL};
    box-shadow: 0 4px 14px rgba(0, 0, 0, 0.08);

    &:hover {
      background: ${({ theme }) => theme.EDITOR_PANEL_MUTED};
      color: ${({ theme }) => theme.INTERACTIVE_HOVER};
    }
  }
`;

export const MindmapOptionsMenu: React.FC = () => {
  const theme = useTheme();
  const direction = useMindmap(state => state.direction);
  const toggleDirection = useMindmap(state => state.toggleDirection);
  const expandAllNodes = useMindmap(state => state.expandAllNodes);
  const collapseToFirstLevel = useMindmap(state => state.collapseToFirstLevel);
  const centerView = useMindmap(state => state.centerView);
  const exportToMarkdown = useMindmap(state => state.exportToMarkdown);
  const nodes = useMindmap(state => state.nodes);
  const loadExampleForFormat = useMindmap(state => state.loadExampleForFormat);
  const format = useMindmap(state => state.format);

  const [coreKey, setCoreKey] = React.useState("⌘");

  React.useEffect(() => {
    if (typeof window !== "undefined") {
      setCoreKey(navigator.userAgent.indexOf("Mac OS X") !== -1 ? "⌘" : "Ctrl");
    }
  }, []);

  const handleToggleDirection = () => {
    toggleDirection();
    requestAnimationFrame(() => centerView());
  };

  const handleExpandAll = () => {
    expandAllNodes();
    requestAnimationFrame(() => centerView());
  };

  const handleCollapseDeep = () => {
    collapseToFirstLevel();
    requestAnimationFrame(() => centerView());
  };

  useHotkeys(
    [
      ["mod+shift+d", handleToggleDirection, { usePhysicalKeys: true }],
      ["shift+Digit3", handleExpandAll, { usePhysicalKeys: true }],
      ["shift+Digit4", handleCollapseDeep, { usePhysicalKeys: true }],
    ],
    []
  );

  const handleExportPng = () => {
    downloadMindmapPng(nodes, theme?.EDITOR_BG || "#121310");
  };

  const handleCopyPng = () => {
    copyMindmapPngToClipboard(nodes, theme?.EDITOR_BG || "#121310");
  };

  const handleDownloadMarkdown = () => {
    try {
      const md = exportToMarkdown();
      if (!md.trim()) {
        toast.error("Nothing to export");
        return;
      }
      const blob = new Blob([md], { type: "text/markdown;charset=utf-8" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "mindmap.md";
      a.click();
      URL.revokeObjectURL(url);
      toast.success("Downloaded mindmap.md");
    } catch {
      toast.error("Export failed");
    }
  };

  const handleDownloadJSON = () => {
    try {
      const data = {
        nodes: nodes.map(n => ({
          id: n.id,
          label: n.data.label ?? "",
          position: n.position,
        })),
      };
      const blob = new Blob([JSON.stringify(data, null, 2)], {
        type: "application/json;charset=utf-8",
      });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "mindmap.json";
      a.click();
      URL.revokeObjectURL(url);
      toast.success("Downloaded mindmap.json");
    } catch {
      toast.error("Export failed");
    }
  };

  const handleCopyMarkdown = () => {
    try {
      const md = exportToMarkdown();
      navigator.clipboard.writeText(md);
      toast.success("Copied outline to clipboard");
    } catch {
      toast.error("Copy failed");
    }
  };

  const handleToggleGrid = () => {
    window.dispatchEvent(
      new KeyboardEvent("keydown", {
        key: "'",
        metaKey: true,
        ctrlKey: true,
      })
    );
  };

  return (
    <StyledOptions>
      <Menu shadow="md" width={230} position="bottom-start">
        <Menu.Target>
          <Button
            leftSection={<LuMenu size={18} />}
            variant="default"
            size="xs"
            fw={500}
            aria-label="Options"
          >
            Menu
          </Button>
        </Menu.Target>

        <Menu.Dropdown>
          <Menu.Label>Tree Navigation</Menu.Label>
          <Menu.Item
            leftSection={<LuUnfoldHorizontal size={14} />}
            onClick={handleExpandAll}
            rightSection={<span style={{ fontSize: 10, opacity: 0.6 }}>⇧ 3</span>}
          >
            Expand All Nodes
          </Menu.Item>
          <Menu.Item
            leftSection={<LuFoldHorizontal size={14} />}
            onClick={handleCollapseDeep}
            rightSection={<span style={{ fontSize: 10, opacity: 0.6 }}>⇧ 4</span>}
          >
            Collapse Sub-branches
          </Menu.Item>

          <Menu.Divider />

          <Menu.Label>Export Image</Menu.Label>
          <Menu.Item leftSection={<LuImageDown size={14} />} onClick={handleExportPng}>
            Export Image (.png)
          </Menu.Item>
          <Menu.Item leftSection={<LuCopy size={14} />} onClick={handleCopyPng}>
            Copy Image to Clipboard
          </Menu.Item>

          <Menu.Divider />

          <Menu.Label>Export Data</Menu.Label>
          <Menu.Item leftSection={<LuDownload size={14} />} onClick={handleDownloadMarkdown}>
            Download Markdown (.md)
          </Menu.Item>
          <Menu.Item leftSection={<LuFileText size={14} />} onClick={handleDownloadJSON}>
            Download JSON (.json)
          </Menu.Item>
          <Menu.Item leftSection={<LuCopy size={14} />} onClick={handleCopyMarkdown}>
            Copy as Markdown
          </Menu.Item>

          <Menu.Divider />

          <Menu.Label>View</Menu.Label>
          <Menu.Item
            leftSection={<LuLayoutGrid size={14} />}
            onClick={handleToggleGrid}
            rightSection={<span style={{ fontSize: 10, opacity: 0.6 }}>{coreKey} + &apos;</span>}
          >
            Toggle Dot Grid
          </Menu.Item>
          <Menu.Item
            leftSection={<LuRefreshCw size={14} />}
            onClick={() => loadExampleForFormat(format)}
          >
            Reset to Example
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>

      <Tooltip
        label={
          <Flex fz="xs" gap="md">
            <Text fz="xs">Rotate layout</Text>
            <Text fz="xs" c="dimmed">
              {coreKey} ⇧ D
            </Text>
          </Flex>
        }
        withArrow
      >
        <ActionIcon
          variant="default"
          size="md"
          onClick={handleToggleDirection}
          aria-label="Rotate layout"
        >
          <StyledFlowIcon $rotate={direction === "DOWN" ? 90 : 0} size={16} />
        </ActionIcon>
      </Tooltip>

      <Tooltip
        label={
          <Flex fz="xs" gap="md">
            <Text fz="xs">Expand all nodes</Text>
            <Text fz="xs" c="dimmed">
              ⇧ 3
            </Text>
          </Flex>
        }
        withArrow
      >
        <ActionIcon
          variant="default"
          size="md"
          onClick={handleExpandAll}
          aria-label="Expand all nodes"
        >
          <LuUnfoldHorizontal size={16} />
        </ActionIcon>
      </Tooltip>

      <Tooltip
        label={
          <Flex fz="xs" gap="md">
            <Text fz="xs">Collapse sub-branches</Text>
            <Text fz="xs" c="dimmed">
              ⇧ 4
            </Text>
          </Flex>
        }
        withArrow
      >
        <ActionIcon
          variant="default"
          size="md"
          onClick={handleCollapseDeep}
          aria-label="Collapse sub-branches"
        >
          <LuFoldHorizontal size={16} />
        </ActionIcon>
      </Tooltip>
    </StyledOptions>
  );
};

export default MindmapOptionsMenu;
