import React, { useEffect, useRef, useState } from "react";
import Head from "next/head";
import { Flex } from "@mantine/core";
import { Editor } from "@monaco-editor/react";
import { generateNextSeo } from "next-seo/pages";
import { LuCheck, LuCircleX, LuCopy, LuCopyCheck } from "react-icons/lu";
import { toast } from "sonner";
import { ArrowButton } from "src/components/ArrowButton";
import { type FileFormat, formats } from "src/constants/enumData";
import { SEO } from "src/constants/seo";
import { contentToJson, jsonToContent } from "src/lib/utils/jsonAdapter";
import Layout from "../PageLayout";
import {
  PublicContainer,
  PublicEyebrow,
  PublicPrimaryLink,
  PublicToolGrid,
  PublicToolHeader,
  PublicToolPanel,
  PublicToolPanelHeader,
} from "../PageLayout/PublicPage";
import { PageLinks } from "./PageLinks";
import { editorOptions } from "./options";
import { StyledCopyButton, StyledEditorWrapper, StyledToolFooter } from "./styles";

export interface ToolPageProps {
  from: FileFormat;
  to: FileFormat;
}

export const ToolPage: React.FC<ToolPageProps> = ({ from, to }) => {
  const editorRef = useRef<any>(null);
  const [contentHasError, setContentHasError] = useState(false);
  const [originalContent, setOriginalContent] = useState("");
  const [convertedContent, setConvertedContent] = useState("");
  const [scrollPosition, setScrollPosition] = useState(0);
  const [editorHeight, setEditorHeight] = useState(0);
  const [copiedFrom, setCopiedFrom] = useState(false);
  const [copiedTo, setCopiedTo] = useState(false);

  const handleCopy = (content: string, setCopied: (v: boolean) => void) => {
    navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    toast.success("Copied to clipboard!");
  };

  const fromLabel = formats.find(({ value }) => value === from)?.label;
  const toLabel = formats.find(({ value }) => value === to)?.label;

  useEffect(() => {
    if (!originalContent.length) return;

    (async () => {
      try {
        const json = await contentToJson(originalContent, from);
        const content = await jsonToContent(JSON.stringify(json), to);
        setConvertedContent(content);
        setContentHasError(false);
      } catch {
        setContentHasError(true);
        setConvertedContent("");
      }
    })();
  }, [from, originalContent, to]);

  useEffect(() => {
    const scrollPositionRatio =
      (scrollPosition / editorHeight) * (editorRef.current?.getContentHeight() || 0);

    editorRef.current?.setScrollTop(scrollPositionRatio);
  }, [editorHeight, scrollPosition]);

  return (
    <Layout>
      <Head>
        {generateNextSeo({
          ...SEO,
          title: `${fromLabel} to ${toLabel} | JSON Visualization`,
          canonical: `https://jsonviz.online/converter/${from}-to-${to}`,
          description: `Convert ${fromLabel} to ${toLabel} using this free online tool. Paste your ${fromLabel} data and get the converted ${toLabel} instantly.`,
        })}
      </Head>
      <PublicContainer $wide>
        <PublicToolHeader>
          <div>
            <PublicEyebrow>Format converter · Runs in your browser</PublicEyebrow>
            <h1>
              {fromLabel} to {toLabel}
            </h1>
            <p>
              Paste {fromLabel} on the left. The converted {toLabel} appears immediately on the
              right, ready to copy.
            </p>
          </div>
          <PublicPrimaryLink href="/editor">Open visual editor</PublicPrimaryLink>
        </PublicToolHeader>

        <PublicToolGrid>
          <PublicToolPanel>
            <PublicToolPanelHeader>
              <Flex justify="space-between" align="center">
                <span>{fromLabel}</span>
                <Flex align="center" gap="xs">
                  {contentHasError && !!originalContent ? (
                    <LuCircleX color="red" />
                  ) : (
                    <LuCheck color="lightgreen" />
                  )}
                  <StyledCopyButton onClick={() => handleCopy(originalContent, setCopiedFrom)}>
                    {copiedFrom ? <LuCopyCheck color="#37ff8b" /> : <LuCopy />}
                  </StyledCopyButton>
                </Flex>
              </Flex>
            </PublicToolPanelHeader>
            <StyledEditorWrapper>
              <Editor
                value={originalContent}
                onChange={value => setOriginalContent(value || "")}
                language={from}
                height={500}
                options={editorOptions}
                onMount={editor => {
                  editor.onDidContentSizeChange(() => {
                    setEditorHeight(editor.getContentHeight());
                  });

                  editor.onDidScrollChange(e => {
                    setScrollPosition(e.scrollTop);
                  });
                }}
              />
            </StyledEditorWrapper>
          </PublicToolPanel>

          <div data-tool-arrow>
            <ArrowButton />
          </div>

          <PublicToolPanel>
            <PublicToolPanelHeader>
              <Flex justify="space-between" align="center">
                <span>{toLabel}</span>
                <StyledCopyButton onClick={() => handleCopy(convertedContent, setCopiedTo)}>
                  {copiedTo ? <LuCopyCheck color="#37ff8b" /> : <LuCopy />}
                </StyledCopyButton>
              </Flex>
            </PublicToolPanelHeader>
            <StyledEditorWrapper>
              <Editor
                value={convertedContent}
                language={to}
                height={500}
                options={{
                  ...editorOptions,
                  readOnly: true,
                }}
                onMount={editor => {
                  editorRef.current = editor;
                }}
              />
            </StyledEditorWrapper>
          </PublicToolPanel>
        </PublicToolGrid>
        <StyledToolFooter>
          <PageLinks />
        </StyledToolFooter>
      </PublicContainer>
    </Layout>
  );
};
