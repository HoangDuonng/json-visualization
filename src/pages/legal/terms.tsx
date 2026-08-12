import React from "react";
import Head from "next/head";
import { generateNextSeo } from "next-seo/pages";
import { SEO } from "src/constants/seo";
import terms from "src/data/terms.json";
import Layout from "src/layout/PageLayout";
import { PublicContainer, PublicEyebrow, PublicPageHeader } from "src/layout/PageLayout/PublicPage";
import { StyledDocument, StyledTitle, StyledUpdated } from "src/layout/PageLayout/legalStyles";

const Terms: React.FC = () => {
  return (
    <Layout>
      <Head>
        {generateNextSeo({
          ...SEO,
          title: "Terms of Service - JSON Visualization",
          description: "JSON Visualization Terms of Service",
          canonical: "https://jsonviz.online/legal/terms",
        })}
      </Head>
      <PublicPageHeader>
        <PublicContainer $narrow>
          <PublicEyebrow>Legal</PublicEyebrow>
          <StyledTitle>Terms of Service</StyledTitle>
          <StyledUpdated>Last updated: February 9, 2026</StyledUpdated>
        </PublicContainer>
      </PublicPageHeader>
      <PublicContainer $narrow>
        <StyledDocument>
          {Object.keys(terms).map(term => (
            <section key={term}>
              <h2>{term}</h2>
              {(terms as Record<string, string[]>)[term].map(text => (
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

export default Terms;
