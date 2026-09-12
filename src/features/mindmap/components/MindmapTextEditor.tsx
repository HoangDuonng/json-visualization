import React, { useCallback, useRef } from "react";
import styled from "styled-components";
import { HamsterLoader } from "@jsondraw-runtime";
import Editor, { type EditorProps, loader, type OnMount } from "@monaco-editor/react";
import debounce from "lodash.debounce";
import useConfig from "src/store/useConfig";
import useMindmap from "../stores/useMindmap";

loader.config({
  paths: {
    vs: "https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.52.2/min/vs",
  },
});

const editorOptions: EditorProps["options"] = {
  formatOnPaste: true,
  tabSize: 2,
  formatOnType: true,
  minimap: { enabled: false },
  stickyScroll: { enabled: false },
  scrollBeyondLastLine: false,
  fontSize: 13,
  lineHeight: 21,
  lineNumbersMinChars: 3,
  padding: { top: 14, bottom: 14 },
  placeholder: "Paste markdown outline, Mermaid, or bullet list here...",
  wordWrap: "on",
};

const StyledEditorWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  user-select: none;
`;

const StyledWrapper = styled.div`
  display: grid;
  height: 100%;
  grid-template-columns: 100%;
  grid-template-rows: minmax(0, 1fr);
`;

const LoadingFallback = styled.div`
  display: grid;
  place-items: center;
  height: 100%;
  width: 100%;
`;

export const MindmapTextEditor: React.FC = () => {
  const inputText = useMindmap(state => state.inputText);
  const setInputText = useMindmap(state => state.setInputText);
  const darkmodeEnabled = useConfig(state => state.darkmodeEnabled);
  const theme = darkmodeEnabled ? "vs-dark" : "light";
  const format = useMindmap(state => state.format);

  const debouncedSetInputText = useRef(
    debounce((val: string) => {
      setInputText(val);
    }, 200)
  ).current;

  const handleMount: OnMount = useCallback(editor => {
    editor.onDidPaste(() => {
      editor.getAction("editor.action.formatDocument")?.run();
    });
  }, []);

  const handleChange = useCallback(
    (value: string | undefined) => {
      debouncedSetInputText(value || "");
    },
    [debouncedSetInputText]
  );

  return (
    <StyledEditorWrapper>
      <StyledWrapper>
        <Editor
          height="100%"
          language={format === "json" ? "json" : "markdown"}
          theme={theme}
          value={inputText}
          options={editorOptions}
          onMount={handleMount}
          onChange={handleChange}
          loading={
            <LoadingFallback>
              <HamsterLoader />
            </LoadingFallback>
          }
        />
      </StyledWrapper>
    </StyledEditorWrapper>
  );
};

export default MindmapTextEditor;
