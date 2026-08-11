import React from "react";
import Head from "next/head";
import { generateNextSeo } from "next-seo/pages";
import { buildSeo, SITE_URL } from "../constants/seo";
import { EditorialHome } from "../layout/Landing/EditorialHome";
import Layout from "../layout/PageLayout";

export const HomePage = () => {
  return (
    <Layout hideGithubLink>
      <Head>
        {generateNextSeo(buildSeo({ canonical: SITE_URL }))}
        <link rel="preload" href="/assets/editor.webp" as="image" />
      </Head>
      <EditorialHome />
    </Layout>
  );
};

export default HomePage;
