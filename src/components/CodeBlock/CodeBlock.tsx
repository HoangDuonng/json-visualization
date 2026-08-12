import React from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneLight } from "react-syntax-highlighter/dist/cjs/styles/prism";
import { StyledCodeBlockContainer } from "./styles";

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
