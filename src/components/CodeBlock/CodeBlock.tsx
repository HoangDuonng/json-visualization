import React from "react";
import styled from "styled-components";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneLight } from "react-syntax-highlighter/dist/cjs/styles/prism";
import { MONO_FONT_FAMILY } from "src/constants/globalStyle";

const StyledCodeBlockContainer = styled.div`
  pre {
    font-family: ${MONO_FONT_FAMILY} !important;
    border-radius: 8px;
    margin: 0;
    background: #fefcf7 !important;
    border: 1px solid #e8e4db;

    * {
      font-family: ${MONO_FONT_FAMILY} !important;
    }
  }
`;

export interface CodeBlockProps {
  code: string;
  language?: string;
}

export const CodeBlock: React.FC<CodeBlockProps> = ({ code, language = "json" }) => {
  return (
    <StyledCodeBlockContainer>
      <SyntaxHighlighter language={language} style={oneLight} customStyle={{ padding: "1rem" }}>
        {code}
      </SyntaxHighlighter>
    </StyledCodeBlockContainer>
  );
};
