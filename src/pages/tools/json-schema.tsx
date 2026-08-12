import React, { useEffect, useRef, useState } from "react";
import Head from "next/head";
import { Flex, Paper } from "@mantine/core";
import styled from "styled-components";
import { Editor, type OnMount } from "@monaco-editor/react";
import { generateNextSeo } from "next-seo/pages";
import { LuCheck, LuCircleX, LuCopy, LuCopyCheck } from "react-icons/lu";
import { toast } from "sonner";
import { ArrowButton } from "src/components/ArrowButton";
import { GenerateButton } from "src/components/GenerateButton";
import { Tooltip } from "src/components/Tooltip";
import { FileFormat, TypeLanguage } from "src/constants/enumData";
import { MONO_FONT_FAMILY } from "src/constants/globalStyle";
import { SEO } from "src/constants/seo";
import { editorOptions } from "src/layout/ConverterLayout/options";
import Layout from "src/layout/PageLayout";
import {
  PublicContainer,
  PublicEyebrow,
  PublicPrimaryLink,
  PublicToolGrid,
  PublicToolHeader,
  PublicToolPanelHeader,
} from "src/layout/PageLayout/PublicPage";
import { generateType } from "src/lib/utils/generateType";
import { jsonToContent } from "src/lib/utils/jsonAdapter";

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
    color: #1a1a1a;
  }
`;

const StyledPaper = styled(Paper)<any>`
  min-width: 0;
  overflow: hidden;
  border: 1px solid var(--public-border-strong);
  border-radius: var(--public-radius-md);
  background: var(--public-surface);
  transition: outline 0.3s ease;

  &[data-tooltip] {
    position: relative;
  }

  &[data-tooltip]::before {
    content: attr(data-tooltip);
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: rgba(26, 26, 26, 0.95);
    color: #fff;
    padding: 16px 20px;
    border-radius: var(--public-radius-sm);
    font-size: 0.95rem;
    white-space: normal;
    max-width: 280px;
    text-align: center;
    z-index: 1000;
    pointer-events: none;
    font-family: inherit;
  }
`;

const StyledActions = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  padding-block: 1.5rem 0;
`;

const JSONSchemaTool: React.FC = () => {
  const monacoRef = useRef<Parameters<OnMount>[1] | null>(null);
  const [jsonError, setJsonError] = useState(false);
  const [jsonSchemaError, setJsonSchemaError] = useState(false);
  const [json, setJson] = useState("");
  const [jsonSchema, setJsonSchema] = useState("");
  const [copiedJson, setCopiedJson] = useState(false);
  const [copiedSchema, setCopiedSchema] = useState(false);

  const handleCopy = (content: string, setCopied: (v: boolean) => void) => {
    navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    toast.success("Copied to clipboard!");
  };

  useEffect(() => {
    monacoRef.current?.languages.json.jsonDefaults.setDiagnosticsOptions({
      validate: true,
      allowComments: true,
      enableSchemaRequest: true,
      ...(jsonSchema && {
        schemas: [
          {
            uri: "",
            fileMatch: ["*"],
            schema: jsonSchema,
          },
        ],
      }),
    });
  }, [jsonSchema]);

  const generateJsonSchema = async () => {
    if (jsonError) {
      toast.error("Please fix JSON syntax errors first!");
      return;
    }
    try {
      const resultSchema = await generateType(json, FileFormat.JSON, TypeLanguage.JSON_SCHEMA);
      setJsonSchema(resultSchema);
      toast.success("JSON Schema generated successfully!");
    } catch {
      toast.error("Failed to generate JSON Schema!");
    }
  };

  const generateJson = async () => {
    if (jsonSchemaError) {
      toast.error("Please fix JSON Schema syntax errors first!");
      return;
    }
    try {
      if (!jsonSchema || !jsonSchema.trim()) {
        return;
      }
      const { JSONSchemaFaker } = await import("json-schema-faker");
      const randomJson = await JSONSchemaFaker.resolve(JSON.parse(jsonSchema));
      const contents = await jsonToContent(JSON.stringify(randomJson, null, 2), FileFormat.JSON);
      setJson(contents);
      toast.success("Mock JSON generated successfully!");
    } catch {
      toast.error("Failed to generate JSON!");
    }
  };

  return (
    <Layout>
      <Head>
        {generateNextSeo({
          ...SEO,
          title: "JSON Schema Validator & Generator",
          description:
            "Use our JSON Schema Validator & Generator tool to easily validate and generate JSON schemas, and generate data from JSON schemas. Simply input your JSON data, generate the corresponding schema, and validate your data with ease.",
          canonical: "https://jsonviz.online/tools/json-schema",
        })}
      </Head>
      <PublicContainer $wide>
        <PublicToolHeader>
          <div>
            <PublicEyebrow>Schema workspace · Runs in your browser</PublicEyebrow>
            <h1>JSON Schema validator & generator</h1>
            <p>
              Move between JSON and JSON Schema, validate structure as you type, and generate mock
              data from a schema.
            </p>
          </div>
          <PublicPrimaryLink href="/editor">Open visual editor</PublicPrimaryLink>
        </PublicToolHeader>

        <StyledActions>
          <Tooltip
            content={
              jsonError
                ? "Please fix JSON syntax errors first"
                : !json.length
                  ? "Please enter JSON data first"
                  : ""
            }
            targetId="json-editor"
          >
            <GenerateButton onClick={generateJsonSchema} disabled={!json.length || jsonError}>
              Generate JSON Schema
            </GenerateButton>
          </Tooltip>
          <Tooltip
            content={
              jsonSchemaError
                ? "Please fix JSON Schema syntax errors first"
                : !jsonSchema.length
                  ? "Please enter JSON Schema first"
                  : ""
            }
            targetId="schema-editor"
          >
            <GenerateButton onClick={generateJson} disabled={!jsonSchema.length || jsonSchemaError}>
              Generate JSON
            </GenerateButton>
          </Tooltip>
        </StyledActions>

        <PublicToolGrid>
          <StyledPaper id="json-editor" mah="600px">
            <PublicToolPanelHeader>
              <Flex justify="space-between" align="center">
                <span>JSON</span>
                <Flex align="center" gap="xs">
                  {jsonError ? <LuCircleX color="red" /> : <LuCheck color="lightgreen" />}
                  <StyledCopyButton onClick={() => handleCopy(json, setCopiedJson)}>
                    {copiedJson ? <LuCopyCheck color="#37ff8b" /> : <LuCopy />}
                  </StyledCopyButton>
                </Flex>
              </Flex>
            </PublicToolPanelHeader>
            <StyledEditorWrapper>
              <Editor
                value={json}
                onChange={value => setJson(value || "")}
                onValidate={errors => setJsonError(!!errors.length)}
                language="json"
                height={500}
                options={editorOptions}
                onMount={(_editor, monaco) => (monacoRef.current = monaco)}
              />
            </StyledEditorWrapper>
          </StyledPaper>

          <div data-tool-arrow>
            <ArrowButton />
          </div>

          <StyledPaper id="schema-editor" mah="600px">
            <PublicToolPanelHeader>
              <Flex justify="space-between" align="center">
                <span>JSON Schema</span>
                <Flex align="center" gap="xs">
                  {jsonSchemaError ? <LuCircleX color="red" /> : <LuCheck color="lightgreen" />}
                  <StyledCopyButton onClick={() => handleCopy(jsonSchema, setCopiedSchema)}>
                    {copiedSchema ? <LuCopyCheck color="#37ff8b" /> : <LuCopy />}
                  </StyledCopyButton>
                </Flex>
              </Flex>
            </PublicToolPanelHeader>
            <StyledEditorWrapper>
              <Editor
                value={jsonSchema}
                onChange={value => setJsonSchema(value || "")}
                onValidate={errors => setJsonSchemaError(!!errors.length)}
                language="json"
                height={500}
                options={editorOptions}
              />
            </StyledEditorWrapper>
          </StyledPaper>
        </PublicToolGrid>
      </PublicContainer>
    </Layout>
  );
};

export default JSONSchemaTool;
