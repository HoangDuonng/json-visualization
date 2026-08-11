import React from "react";
import { Accordion } from "@mantine/core";
import Questions from "src/data/faq.json";
import {
  PublicActions,
  PublicContainer,
  PublicEyebrow,
  PublicPrimaryLink,
  PublicSection,
  PublicSectionHeading,
} from "src/layout/PageLayout/PublicPage";
import { StyledEditorialGrid, StyledSectionIntro } from "../StorySection/styles";
import { StyledFAQ } from "./styles";

export const FAQSection: React.FC = () => {
  return (
    <PublicSection>
      <PublicContainer>
        <StyledEditorialGrid>
          <StyledSectionIntro>
            <PublicEyebrow>Documentation</PublicEyebrow>
            <PublicSectionHeading>Go deeper when the workflow demands it.</PublicSectionHeading>
            <p>
              Learn the visual editor, JsonDraw, format validation, jq, JSONPath, schema tools, and
              image export with focused guides.
            </p>
            <PublicActions>
              <PublicPrimaryLink href="/docs">Explore documentation</PublicPrimaryLink>
            </PublicActions>
          </StyledSectionIntro>
          <StyledFAQ id="faq">
            <PublicEyebrow>Frequently asked</PublicEyebrow>
            <Accordion>
              {Questions.map(({ title, content }) => (
                <Accordion.Item key={title} value={title}>
                  <Accordion.Control>{title}</Accordion.Control>
                  <Accordion.Panel>{content}</Accordion.Panel>
                </Accordion.Item>
              ))}
            </Accordion>
          </StyledFAQ>
        </StyledEditorialGrid>
      </PublicContainer>
    </PublicSection>
  );
};
