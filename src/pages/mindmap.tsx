import React, { useEffect } from "react";
import dynamic from "next/dynamic";
import Head from "next/head";
import { useMantineColorScheme } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import styled, { ThemeProvider } from "styled-components";
import { Allotment } from "allotment";
import "allotment/dist/style.css";
import { generateNextSeo } from "next-seo/pages";
import { MONO_FONT_FAMILY } from "../constants/globalStyle";
import { SEO } from "../constants/seo";
import { darkTheme, lightTheme } from "../constants/theme";
import { Toolbar } from "../features/editor/Toolbar";
import useMindmap from "../features/mindmap/stores/useMindmap";
import useConfig from "../store/useConfig";

const ModalController = dynamic(() => import("../features/modals/ModalController"));

const MindmapCanvas = dynamic(
  () => import("../features/mindmap/components/MindmapCanvas").then(mod => mod.MindmapCanvas),
  { ssr: false }
);

const MindmapTextEditor = dynamic(
  () =>
    import("../features/mindmap/components/MindmapTextEditor").then(mod => mod.MindmapTextEditor),
  { ssr: false }
);

const MindmapBottomBar = dynamic(
  () => import("../features/mindmap/components/MindmapBottomBar").then(mod => mod.MindmapBottomBar),
  { ssr: false }
);

const MindmapHeader = dynamic(
  () => import("../features/mindmap/components/MindmapHeader").then(mod => mod.MindmapHeader),
  { ssr: false }
);

const StyledPageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100%;
  background: ${({ theme }) => theme.EDITOR_BG};
  color: ${({ theme }) => theme.TEXT_NORMAL};
  font-family: ${MONO_FONT_FAMILY} !important;
  --editor-border: ${({ theme }) => theme.EDITOR_BORDER};
  --editor-panel-muted: ${({ theme }) => theme.EDITOR_PANEL_MUTED};

  * {
    font-family: ${MONO_FONT_FAMILY} !important;
  }

  @media only screen and (max-width: 320px) {
    height: 100vh;
  }
`;

const StyledEditorWrapper = styled.div`
  width: 100%;
  height: 100%;
  overflow: hidden;
`;

const StyledEditor = styled(Allotment)`
  position: relative !important;
  display: flex;
  padding: 10px;
  background: ${({ theme }) => theme.EDITOR_BG};
  --focus-border: ${({ theme }) => theme.EDITOR_ACCENT};
  --separator-border: transparent;

  .sash-container .sash {
    transition: background 140ms ease;
  }

  .sash-container .sash:hover,
  .sash-container .sash.active {
    background: ${({ theme }) => theme.EDITOR_ACCENT_SOFT};
  }

  @media only screen and (max-width: 820px) {
    padding: 6px;
  }
`;

const StyledPanel = styled.section`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  overflow: hidden;
  border: 1px solid ${({ theme }) => theme.EDITOR_BORDER};
  border-radius: 8px;
  background: ${({ theme }) => theme.EDITOR_PANEL};
`;

const StyledPanelHeader = styled.header`
  display: flex;
  min-height: 46px;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  padding: 7px 10px 7px 14px;
  border-bottom: 1px solid ${({ theme }) => theme.EDITOR_BORDER};
  background: ${({ theme }) => theme.EDITOR_PANEL};
  flex: 0 0 auto;
`;

const StyledPanelIdentity = styled.div`
  display: flex;
  min-width: 0;
  align-items: baseline;
  gap: 10px;

  strong {
    color: ${({ theme }) => theme.TEXT_NORMAL};
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 0.1em;
    text-transform: uppercase;
  }

  span {
    overflow: hidden;
    color: ${({ theme }) => theme.EDITOR_TEXT_MUTED};
    font-size: 10px;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
`;

const MindmapPage: React.FC = () => {
  const darkmodeEnabled = useConfig(state => state.darkmodeEnabled);
  const stackPanes = useMediaQuery("(max-width: 820px)");
  const { setColorScheme } = useMantineColorScheme();

  const isSourceCollapsed = useMindmap(state => state.isSourceCollapsed);
  const format = useMindmap(state => state.format);

  useEffect(() => {
    setColorScheme(darkmodeEnabled ? "dark" : "light");
    return () => {
      setColorScheme("light");
    };
  }, [darkmodeEnabled, setColorScheme]);

  return (
    <>
      <Head>
        {generateNextSeo({
          ...SEO,
          title: "Mind Map | JSON Visualization",
          description:
            "Create, edit, and explore mind maps and hierarchical note trees on an interactive visual canvas.",
          canonical: "https://jsonviz.online/mindmap",
        })}
      </Head>
      <ThemeProvider theme={darkmodeEnabled ? darkTheme : lightTheme}>
        <ModalController />
        <StyledPageWrapper>
          <Toolbar />
          <StyledEditorWrapper>
            <StyledEditor proportionalLayout={false} vertical={stackPanes}>
              <Allotment.Pane
                preferredSize={420}
                minSize={isSourceCollapsed ? 0 : stackPanes ? 180 : 300}
                maxSize={700}
                visible={!isSourceCollapsed}
              >
                <StyledPanel>
                  <StyledPanelHeader>
                    <StyledPanelIdentity>
                      <strong>Source</strong>
                      <span>{format.toUpperCase()} · Editable input</span>
                    </StyledPanelIdentity>
                  </StyledPanelHeader>
                  <MindmapTextEditor />
                  <MindmapBottomBar />
                </StyledPanel>
              </Allotment.Pane>
              <Allotment.Pane minSize={0}>
                <StyledPanel>
                  <MindmapHeader />
                  <MindmapCanvas />
                </StyledPanel>
              </Allotment.Pane>
            </StyledEditor>
          </StyledEditorWrapper>
        </StyledPageWrapper>
      </ThemeProvider>
    </>
  );
};

export default MindmapPage;
