import React from "react";
import { Image } from "@mantine/core";
import { PublicContainer } from "src/layout/PageLayout/PublicPage";
import { StyledPreview, StyledPreviewMeta, StyledPreviewSection } from "./styles";

export const PreviewSection: React.FC = () => {
  return (
    <StyledPreviewSection>
      <PublicContainer $wide>
        <StyledPreviewMeta>
          <span>Product view</span>
          <span>Graph · Tree · Code</span>
        </StyledPreviewMeta>
        <StyledPreview>
          <Image
            src="/assets/editor.webp"
            loading="eager"
            alt="JSON Visualization editor showing structured data as an interactive graph"
          />
        </StyledPreview>
      </PublicContainer>
    </StyledPreviewSection>
  );
};
