import React from "react";
import { Image } from "@mantine/core";
import {
  PublicActions,
  PublicContainer,
  PublicDisplay,
  PublicEyebrow,
  PublicLead,
  PublicPrimaryLink,
  PublicSecondaryLink,
} from "src/layout/PageLayout/PublicPage";
import {
  StyledHero,
  StyledHeroAside,
  StyledHeroGrid,
  StyledHeroVisual,
  StyledMeta,
} from "./styles";

export const HeroSection: React.FC = () => {
  return (
    <StyledHero>
      <PublicContainer>
        <StyledHeroGrid>
          <div>
            <PublicEyebrow>Open-source · Structured data workspace</PublicEyebrow>
            <PublicDisplay>See the shape of your data.</PublicDisplay>
            <PublicLead>
              JSON Visualization turns JSON, YAML, XML, and CSV into readable graphs—then helps you
              inspect, convert, validate, and generate code from the same data.
            </PublicLead>
            <PublicActions>
              <PublicPrimaryLink href="/editor">Open the visual editor</PublicPrimaryLink>
              <PublicSecondaryLink href="/docs">Read the docs</PublicSecondaryLink>
            </PublicActions>
          </div>
          <StyledHeroAside>
            <p>
              Built for developers who need to understand unfamiliar payloads quickly. Your data
              stays in the browser while you work.
            </p>
            <StyledHeroVisual>
              <Image src="/assets/bf2-image.png" alt="JSON Payload to Graph transformation" />
            </StyledHeroVisual>
            <StyledMeta>
              <dt>Input formats</dt>
              <dd>4</dd>
              <dt>Type targets</dt>
              <dd>5</dd>
            </StyledMeta>
          </StyledHeroAside>
        </StyledHeroGrid>
      </PublicContainer>
    </StyledHero>
  );
};
