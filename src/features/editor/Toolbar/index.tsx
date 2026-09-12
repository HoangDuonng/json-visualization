import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { Flex, Group } from "@mantine/core";
import { useSessionStorage } from "@mantine/hooks";
import styled from "styled-components";
import { AiOutlineFullscreen, AiOutlineFullscreenExit, AiOutlineLayout } from "react-icons/ai";
import { FaGithub } from "react-icons/fa6";
import { toast } from "sonner";
import { ViewMode } from "../../../constants/enumData";
import useMindmap from "../../../features/mindmap/stores/useMindmap";
import { JSONVizLogo } from "../../../layout/JsonVizLogo";
import { useModal } from "../../../store/useModal";
import useGraph from "../views/GraphView/stores/useGraph";
import { ThemeToggle } from "./ThemeToggle";
import { ToolsMenu } from "./ToolsMenu";
import { StyledToolElement } from "./styles";

const StyledTools = styled.div`
  position: relative;
  display: flex;
  width: 100%;
  align-items: center;
  gap: 12px;
  justify-content: space-between;
  height: 58px;
  padding: 8px 14px;
  background: ${({ theme }) => theme.EDITOR_PANEL};
  color: ${({ theme }) => theme.SILVER};
  z-index: 36;
  border-bottom: 1px solid ${({ theme }) => theme.EDITOR_BORDER};

  @media only screen and (max-width: 320px) {
    display: none;
  }
`;

const StyledBrand = styled.div`
  display: flex;
  align-items: center;
  padding-right: 14px;
  margin-right: 4px;
  border-right: 1px solid ${({ theme }) => theme.EDITOR_BORDER};
`;

const StyledToolbarGroup = styled(Group)`
  flex-wrap: nowrap;
`;

function fullscreenBrowser() {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen().catch(() => {
      toast.error("Unable to enter fullscreen mode.");
    });
  } else if (document.exitFullscreen) {
    document.exitFullscreen();
  }
}

export const Toolbar = () => {
  const router = useRouter();
  const isDrawView = router.pathname === "/draw";
  const isMindmapView = router.pathname === "/mindmap";
  const [isFullscreen, setIsFullscreen] = React.useState(false);
  const [, setViewMode] = useSessionStorage({
    key: "viewMode",
    defaultValue: ViewMode.Graph,
  });

  React.useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(Boolean(document.fullscreenElement));
    };

    handleFullscreenChange();
    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () => document.removeEventListener("fullscreenchange", handleFullscreenChange);
  }, []);

  React.useEffect(() => {
    const handleRouteChange = () => {
      useModal.getState().closeAll();
    };

    router.events?.on("routeChangeStart", handleRouteChange);
    return () => {
      router.events?.off("routeChangeStart", handleRouteChange);
    };
  }, [router.events]);

  const handleEditorClick = () => {
    useModal.getState().closeAll();
    setViewMode(ViewMode.Graph);
    router.push("/editor");
  };

  const handleDrawClick = () => {
    useModal.getState().closeAll();
    setViewMode(ViewMode.JsonDraw);
    router.push("/draw");
  };

  const handleMindmapClick = () => {
    useModal.getState().closeAll();
    router.push("/mindmap");
  };

  const handleToggleSource = () => {
    if (isMindmapView) {
      useMindmap.getState().toggleSourceCollapsed();
    } else {
      useGraph.getState().toggleFullscreen(!useGraph.getState().fullscreen);
    }
  };

  return (
    <StyledTools>
      <StyledToolbarGroup gap="xs" justify="left" w="100%">
        <StyledBrand>
          <Flex gap="xs" align="center" justify="center">
            <JSONVizLogo fontSize="14px" />
          </Flex>
        </StyledBrand>
        <StyledToolElement
          title="Editor"
          $highlight={!isDrawView && !isMindmapView}
          onClick={handleEditorClick}
        >
          Editor
        </StyledToolElement>
        <StyledToolElement title="Draw" $highlight={isDrawView} onClick={handleDrawClick}>
          Draw
        </StyledToolElement>
        <StyledToolElement title="Mind Map" $highlight={isMindmapView} onClick={handleMindmapClick}>
          Mind Map
        </StyledToolElement>
        <ToolsMenu />
        <StyledToolElement title="Toggle source panel" onClick={handleToggleSource}>
          <AiOutlineLayout size="20" />
          <span>Source</span>
        </StyledToolElement>
      </StyledToolbarGroup>
      <StyledToolbarGroup gap="xs" justify="right" w="100%">
        <ThemeToggle />
        <Link href="https://github.com/HoangDuonng" rel="noopener" target="_blank">
          <StyledToolElement title="GitHub">
            <FaGithub size="20" />
          </StyledToolElement>
        </Link>
        <StyledToolElement
          title={isFullscreen ? "Exit fullscreen" : "Fullscreen"}
          onClick={fullscreenBrowser}
        >
          {isFullscreen ? <AiOutlineFullscreenExit size="20" /> : <AiOutlineFullscreen size="20" />}
        </StyledToolElement>
      </StyledToolbarGroup>
    </StyledTools>
  );
};
