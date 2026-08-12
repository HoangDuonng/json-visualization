import React from "react";
import Head from "next/head";
import { generateNextSeo } from "next-seo/pages";
import { SEO } from "src/constants/seo";
import privacy from "src/data/privacy.json";
import Layout from "src/layout/PageLayout";
import { PublicContainer, PublicEyebrow, PublicPageHeader } from "src/layout/PageLayout/PublicPage";
import { StyledDocument, StyledTitle, StyledUpdated } from "src/layout/PageLayout/legalStyles";

const Privacy: React.FC = () => {
  return (
    <Layout>
      <Head>
        {generateNextSeo({
          ...SEO,
          title: "Privacy Policy - JSON Visualization",
          description: "JSON Visualization Privacy Policy",
          canonical: "https://jsonviz.online/legal/privacy",
        })}
      </Head>
      <PublicPageHeader>
        <PublicContainer $narrow>
          <PublicEyebrow>Legal</PublicEyebrow>
          <StyledTitle>Privacy Policy</StyledTitle>
          <StyledUpdated>Last updated: February 9, 2026</StyledUpdated>
        </PublicContainer>
      </PublicPageHeader>
      <PublicContainer $narrow>
        <StyledDocument>
          {Object.keys(privacy).map(term => (
            <section key={term}>
              <h2>{term}</h2>
              {(privacy as Record<string, string[]>)[term].map(text => (
                <p key={text} data-list-item={text.startsWith("•")}>
                  {text}
                </p>
              ))}
            </section>
          ))}
        </StyledDocument>
      </PublicContainer>
    </Layout>
  );
};

export default Privacy;
