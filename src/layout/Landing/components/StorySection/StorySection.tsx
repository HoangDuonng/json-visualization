import React from "react";
import { Image } from "@mantine/core";
import {
  PublicContainer,
  PublicEyebrow,
  PublicSection,
  PublicSectionHeading,
} from "src/layout/PageLayout/PublicPage";
import {
  StyledEditorialGrid,
  StyledSectionIntro,
  StyledStoryItem,
  StyledStoryList,
} from "./styles";

export const StorySection: React.FC = () => {
  return (
    <PublicSection>
      <PublicContainer>
        <StyledEditorialGrid>
          <StyledSectionIntro>
            <PublicEyebrow>From payload to picture</PublicEyebrow>
            <PublicSectionHeading>Less time parsing. More time understanding.</PublicSectionHeading>
            <p>
              Start with raw structured data and move directly to the representation your task
              needs—without switching between disconnected utilities.
            </p>
          </StyledSectionIntro>
          <StyledStoryList>
            <StyledStoryItem>
              <div>
                <h3>Bring data in</h3>
                <p>Paste content, open a file, or load a URL in the visual editor.</p>
              </div>
              <Image
                src="/assets/step1-visual.png"
                alt="Bring data in step visual"
                className="step-visual"
              />
            </StyledStoryItem>
            <StyledStoryItem>
              <div>
                <h3>Read relationships</h3>
                <p>Navigate nested objects and arrays as a graph or compact tree.</p>
              </div>
              <Image
                src="/assets/step2-visual.png"
                alt="Read relationships step visual"
                className="step-visual"
              />
            </StyledStoryItem>
            <StyledStoryItem>
              <div>
                <h3>Ship the result</h3>
                <p>Export a diagram, convert formats, validate structure, or generate types.</p>
              </div>
              <Image
                src="/assets/step3-visual.png"
                alt="Ship the result step visual"
                className="step-visual"
              />
            </StyledStoryItem>
          </StyledStoryList>
        </StyledEditorialGrid>
      </PublicContainer>
    </PublicSection>
  );
};
