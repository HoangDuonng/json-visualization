import React from "react";
import Head from "next/head";
import Link from "next/link";
import { Text } from "@mantine/core";
import { generateNextSeo } from "next-seo/pages";
import { SEO } from "../../constants/seo";
import Layout from "../../layout/PageLayout";
import { ExploreButton } from "../ExploreButton";
import { GradientTitle, StyledActions, StyledCard, StyledCode, StyledWrapper } from "./styles";

interface ErrorLayoutProps {
  code: string;
  title: string;
  description: string;
  cardMessage: string;
  metaTitle: string;
  noindex?: boolean;
  onRefresh?: () => void;
}

export const ErrorLayout: React.FC<ErrorLayoutProps> = ({
  code,
  title,
  description,
  cardMessage,
  metaTitle,
  noindex = false,
  onRefresh,
}) => {
  return (
    <Layout>
      <Head>
        {generateNextSeo({
          ...SEO,
          title: `${metaTitle} | JSON Visualization`,
          noindex,
        })}
      </Head>
      <StyledWrapper>
        <StyledCode order={1}>{code}</StyledCode>
        <GradientTitle order={2} mt={12} fz={42}>
          {title}
        </GradientTitle>
        <Text mt={12} c="#666666" fz={18} maw={720} mx="auto">
          {description}
        </Text>
        <StyledCard>
          <Text c="#666666" fz={15}>
            {cardMessage}
          </Text>
          <StyledActions>
            {onRefresh && <ExploreButton onClick={onRefresh}>Refresh the page</ExploreButton>}
            <Link href="/" passHref legacyBehavior>
              <a>
                <ExploreButton>Go home</ExploreButton>
              </a>
            </Link>
            <Link href="/editor" passHref legacyBehavior>
              <a>
                <ExploreButton>Go to Editor</ExploreButton>
              </a>
            </Link>
          </StyledActions>
        </StyledCard>
      </StyledWrapper>
    </Layout>
  );
};
