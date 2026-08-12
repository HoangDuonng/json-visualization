import React from "react";
import Head from "next/head";
import { Alert, Paper, Stack, Text, Title } from "@mantine/core";
import { generateNextSeo } from "next-seo/pages";
import { VscInfo } from "react-icons/vsc";
import { DocsNavigation } from "src/components/DocsNavigation";
import { LanguageSwitcher } from "src/components/LanguageSwitcher";
import { SEO } from "src/constants/seo";
import { useDocsTranslation } from "src/features/docs/hooks/useDocsTranslation";
import Layout from "src/layout/PageLayout";
import { StyledContentBody, StyledDocsContainer, StyledLink } from "../DocPrimitives/styles";

interface DocsNavItemProps {
  title: string;
  href: string;
}

interface DocsLayoutProps {
  slug: string;
  title: string;
  subtitle: string;
  alertText?: string;
  previous?: DocsNavItemProps;
  next?: DocsNavItemProps;
  children: React.ReactNode;
}

export const DocsLayout: React.FC<DocsLayoutProps> = ({
  slug,
  title,
  subtitle,
  alertText,
  previous,
  next,
  children,
}) => {
  const { t, locale, getLocalizedLink } = useDocsTranslation();

  const prevNav = previous
    ? {
        label: t("common.previous") || "Previous",
        title: previous.title,
        href: previous.href,
      }
    : undefined;

  const nextNav = next
    ? {
        label: t("common.next") || "Next",
        title: next.title,
        href: next.href,
      }
    : undefined;

  return (
    <Layout>
      <Head>
        {generateNextSeo({
          ...SEO,
          title: `${title} Documentation - JSON Visualization`,
          description: subtitle,
          canonical: `https://jsonviz.online/${locale === "vi" ? "vi/" : ""}docs/${slug}`,
        })}
      </Head>
      <StyledDocsContainer $narrow>
        <Stack gap="xl">
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
              gap: "1.5rem",
            }}
          >
            <div style={{ flex: 1, minWidth: 0 }}>
              <Title order={1} c="dark" mb="sm">
                {title}
              </Title>
              <Text size="lg" c="dimmed">
                {subtitle}
              </Text>
            </div>
            <div style={{ flexShrink: 0 }}>
              <LanguageSwitcher />
            </div>
          </div>

          {alertText && (
            <Alert
              icon={<VscInfo size={20} />}
              color="#236b4a"
              variant="light"
              styles={{ message: { color: "var(--public-accent-hover)" } }}
            >
              {alertText}
            </Alert>
          )}

          {children}

          {(prevNav || nextNav) && (
            <DocsNavigation
              title={t("common.relatedReading") || "Related Reading"}
              previous={prevNav}
              next={nextNav}
            />
          )}

          <Paper bg="white" c="black" p="xl" radius="md" withBorder>
            <Title mb="md" order={3} c="dark">
              {t("common.needHelp")}
            </Title>
            <StyledContentBody>
              <Text>
                {t("common.needHelpText")}{" "}
                <StyledLink href={getLocalizedLink("/docs")}>
                  {t("common.documentation")}
                </StyledLink>{" "}
                {t("common.orTry")}{" "}
                <StyledLink href={getLocalizedLink("/editor")}>{t("common.editor")}</StyledLink>{" "}
                {t("common.directly")}.
              </Text>
            </StyledContentBody>
          </Paper>
        </Stack>
      </StyledDocsContainer>
    </Layout>
  );
};
