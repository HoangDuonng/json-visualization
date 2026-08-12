import React, { useEffect, useRef, useState } from "react";
import Head from "next/head";
import { Flex } from "@mantine/core";
import styled from "styled-components";
import { Editor } from "@monaco-editor/react";
import { generateNextSeo } from "next-seo/pages";
import { LuCheck, LuCircleX, LuCopy, LuCopyCheck } from "react-icons/lu";
import { toast } from "sonner";
import { ArrowButton } from "src/components/ArrowButton";
import { type FileFormat, formats, type TypeLanguage, typeOptions } from "src/constants/enumData";
import { MONO_FONT_FAMILY } from "src/constants/globalStyle";
import { SEO } from "src/constants/seo";
import { editorOptions } from "src/layout/ConverterLayout/options";
import Layout from "src/layout/PageLayout";
import { generateType } from "src/lib/utils/generateType";
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

const StyledEditorWrapper = styled.div`
  * {
    font-family: ${MONO_FONT_FAMILY} !important;
  }
`;

const StyledCopyButton = styled.button`
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 4px;
  display: flex;
  align-items: center;
  color: #666;
  transition: color 0.2s ease;

  &:hover {
    color: var(--public-text);
  }

  &:focus-visible {
    outline: 2px solid var(--public-accent);
    outline-offset: 2px;
  }
`;

const StyledToolFooter = styled.section`
  padding-block: 1rem var(--public-section-space);
  border-top: 1px solid var(--public-border);
`;

export interface TypegenWrapperProps {
  from: FileFormat;
  to: TypeLanguage;
}

export const TypegenWrapper: React.FC<TypegenWrapperProps> = ({ from, to }) => {
  const editorRef = useRef<any>(null);
  const [contentHasError, setContentHasError] = useState(false);
  const [originalContent, setOriginalContent] = useState("");
  const [convertedContent, setConvertedContent] = useState("");
  const [copiedFrom, setCopiedFrom] = useState(false);
  const [copiedTo, setCopiedTo] = useState(false);

  const handleCopy = (content: string, setCopied: (v: boolean) => void) => {
    navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    toast.success("Copied to clipboard!");
  };

  const fromLabel = formats.find(({ value }) => value === from)?.label;
  const toLabel = typeOptions.find(({ value }) => value === to)?.label;

  useEffect(() => {
    if (!originalContent.length) return;

    (async () => {
      try {
        const type = await generateType(originalContent, from, to);
        setConvertedContent(type);
        setContentHasError(false);
      } catch {
        setContentHasError(true);
        setConvertedContent("");
      }
    })();
  }, [from, originalContent, to]);

  return (
    <Layout>
      <Head>
        {generateNextSeo({
          ...SEO,
          title: `${fromLabel} to ${toLabel} | JSON Visualization`,
          canonical: `https://jsonviz.online/type/${from}-to-${to}`,
          description: `Instantly generate ${toLabel} from ${fromLabel} using this free online tool. Paste your ${fromLabel} and get the generated ${toLabel} instantly.`,
        })}
      </Head>
      <PublicContainer $wide>
        <PublicToolHeader>
          <div>
            <PublicEyebrow>Type generator · Runs in your browser</PublicEyebrow>
            <h1>
              {fromLabel} to {toLabel}
            </h1>
            <p>
              Paste {fromLabel} and generate a ready-to-use {toLabel} definition while keeping your
              data in the browser.
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
