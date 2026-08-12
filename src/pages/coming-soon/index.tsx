import React from "react";
import Head from "next/head";
import { generateNextSeo } from "next-seo/pages";
import { SEO } from "src/constants/seo";
import Layout from "src/layout/PageLayout";
import {
  PublicActions,
  PublicContainer,
  PublicDisplay,
  PublicEyebrow,
  PublicLead,
  PublicPageHeader,
  PublicPrimaryLink,
  PublicSecondaryLink,
  PublicSection,
  PublicSectionHeading,
} from "src/layout/PageLayout/PublicPage";
import {
  StyledHighlight,
  StyledHighlights,
  StyledHighlightText,
  StyledHighlightTitle,
} from "./styles";

const ComingSoon: React.FC = () => {
  return (
    <Layout>
      <Head>
        {generateNextSeo({ ...SEO, title: "Coming Soon | JSON Visualization", noindex: true })}
      </Head>
      <PublicPageHeader>
        <PublicContainer>
          <PublicEyebrow>In development</PublicEyebrow>
          <PublicDisplay>Coming soon</PublicDisplay>
          <PublicLead>
            We are building this area with new features and content. In the meantime, you can keep
            exploring the editor or head back to the homepage.
          </PublicLead>
          <PublicActions>
            <PublicPrimaryLink href="/editor">Go to Editor</PublicPrimaryLink>
            <PublicSecondaryLink href="/">Go home</PublicSecondaryLink>
          </PublicActions>
        </PublicContainer>
      </PublicPageHeader>
      <PublicSection>
        <PublicContainer>
          <PublicEyebrow>What to expect</PublicEyebrow>
          <PublicSectionHeading>Focus areas before launch</PublicSectionHeading>
          <StyledHighlights>
            <StyledHighlight>
              <StyledHighlightTitle>Feature updates</StyledHighlightTitle>
              <StyledHighlightText>Roadmap, release notes, and announcements.</StyledHighlightText>
            </StyledHighlight>
            <StyledHighlight>
              <StyledHighlightTitle>Contextual docs</StyledHighlightTitle>
              <StyledHighlightText>
                Focused guides that match the current feature set.
              </StyledHighlightText>
            </StyledHighlight>
            <StyledHighlight>
              <StyledHighlightTitle>Workflow tips</StyledHighlightTitle>
              <StyledHighlightText>
                Practical shortcuts and best practices for the editor.
              </StyledHighlightText>
            </StyledHighlight>
          </StyledHighlights>
        </PublicContainer>
      </PublicSection>
    </Layout>
  );
};

export default ComingSoon;
