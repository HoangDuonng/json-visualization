import React from "react";
import { ActionIcon, Button, Menu } from "@mantine/core";
import { useHotkeys } from "@mantine/hooks";
import styled from "styled-components";
import { event as gaEvent } from "nextjs-google-analytics";
import { BsCheck2 } from "react-icons/bs";
import { LuChevronRight, LuDownload, LuImageDown, LuMenu, LuUpload } from "react-icons/lu";
import { TiFlowMerge } from "react-icons/ti";
import useConfig from "src/store/useConfig";
import useFile from "src/store/useFile";
import { useModal } from "src/store/useModal";
import type { LayoutDirection } from "src/types/graph";
import useGraph from "./stores/useGraph";

const StyledFlowIcon = styled(TiFlowMerge)<{ rotate: number }>`
  transform: rotate(${({ rotate }) => `${rotate}deg`});
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
    box-shadow: 0 8px 24px rgb(0 0 0 / 8%);
  }
`;

const getNextDirection = (direction: LayoutDirection) => {
  if (direction === "RIGHT") return "DOWN";
  if (direction === "DOWN") return "LEFT";
  if (direction === "LEFT") return "UP";
  return "RIGHT";
};

const rotateLayout = (direction: LayoutDirection) => {
  if (direction === "LEFT") return 90;
  if (direction === "UP") return 180;
  if (direction === "RIGHT") return 270;
  return 360;
};

export const OptionsMenu = () => {
  const toggleGestures = useConfig(state => state.toggleGestures);
  const toggleRulers = useConfig(state => state.toggleRulers);
  const toggleImagePreview = useConfig(state => state.toggleImagePreview);
  const gesturesEnabled = useConfig(state => state.gesturesEnabled);
  const rulersEnabled = useConfig(state => state.rulersEnabled);
  const imagePreviewEnabled = useConfig(state => state.imagePreviewEnabled);
  const setDirection = useGraph(state => state.setDirection);
  const direction = useGraph(state => state.direction);
  const setVisible = useModal(state => state.setVisible);
  const getContents = useFile(state => state.getContents);
  const getFormat = useFile(state => state.getFormat);
  const [coreKey, setCoreKey] = React.useState("CTRL");

  const handleSave = () => {
    const a = document.createElement("a");
    const file = new Blob([getContents()], { type: "text/plain" });

    a.href = window.URL.createObjectURL(file);
    a.download = `json-visualization.${getFormat()}`;
    a.click();

    gaEvent("save_file", { label: getFormat() });
  };

  const toggleDirection = () => {
    const nextDirection = getNextDirection(direction || "RIGHT");
    if (setDirection) setDirection(nextDirection);
  };

  useHotkeys(
    [
      ["mod+shift+d", toggleDirection],
      [
        "mod+f",
        () => {
          const input = document.querySelector("#search-node") as HTMLInputElement;
          input.focus();
        },
      ],
    ],
    []
  );

  React.useEffect(() => {
    if (typeof window !== "undefined") {
      setCoreKey(navigator.userAgent.indexOf("Mac OS X") ? "⌘" : "CTRL");
    }
  }, []);

  return (
    <StyledOptions>
      <Menu shadow="md" width={200} position="bottom-start">
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
          <Menu.Item
            leftSection={<LuUpload size={14} />}
            onClick={() => setVisible("ImportModal", true)}
          >
            Import
          </Menu.Item>
          <Menu.Item leftSection={<LuDownload size={14} />} onClick={handleSave}>
            Download
          </Menu.Item>
          <Menu.Item
            leftSection={<LuImageDown size={14} />}
            onClick={() => setVisible("DownloadModal", true)}
          >
            Export Image
          </Menu.Item>

          <Menu.Divider />

          <Menu.Sub>
            <Menu.Sub.Target>
              <Menu.Item rightSection={<LuChevronRight size={14} />}>Preferences</Menu.Item>
            </Menu.Sub.Target>

            <Menu.Sub.Dropdown>
              <Menu.Item
                rightSection={gesturesEnabled && <BsCheck2 size={14} />}
                onClick={() => toggleGestures(!gesturesEnabled)}
              >
                Trackpad Gestures
              </Menu.Item>
              <Menu.Item
                rightSection={rulersEnabled && <BsCheck2 size={14} />}
                onClick={() => toggleRulers(!rulersEnabled)}
              >
                Show Rulers
              </Menu.Item>
              <Menu.Item
                rightSection={imagePreviewEnabled && <BsCheck2 size={14} />}
                onClick={() => toggleImagePreview(!imagePreviewEnabled)}
              >
                Image Nodes Preview
              </Menu.Item>
            </Menu.Sub.Dropdown>
          </Menu.Sub>
        </Menu.Dropdown>
      </Menu>

      <ActionIcon
        variant="default"
        size="md"
        onClick={toggleDirection}
        aria-label="Rotate Layout"
        title={`Rotate Layout (${coreKey} + SHIFT + D)`}
      >
        <StyledFlowIcon rotate={rotateLayout(direction || "RIGHT")} size={16} />
      </ActionIcon>
    </StyledOptions>
  );
};
