import React, { useState } from "react";
import Head from "next/head";
import Link from "next/link";
import { Group, SimpleGrid, Stack, Text, ThemeIcon, Title } from "@mantine/core";
import { generateNextSeo } from "next-seo/pages";
import { FaBolt, FaToolbox } from "react-icons/fa";
import { IoBrushOutline, IoImages } from "react-icons/io5";
import { MdOutlineFormatIndentIncrease, MdOutlineGeneratingTokens } from "react-icons/md";
import { TbTransformFilled } from "react-icons/tb";
import { VscJson } from "react-icons/vsc";
import { ChatBot } from "src/components/ChatBot";
import { ChatButton } from "src/components/ChatButton";
import { CodeBlock } from "src/components/CodeBlock";
import { LanguageSwitcher } from "src/components/LanguageSwitcher";
import { SEO } from "src/constants/seo";
import {
  sampleCsv,
  sampleJson,
  StyledContentBody,
  StyledDocsContainer,
  StyledDocsPaper,
  StyledFeatureCard,
  StyledLink,
} from "src/features/docs";
import { useTranslation } from "src/i18n";
import Layout from "src/layout/PageLayout";

const DocsPage: React.FC = () => {
  const { t, locale } = useTranslation("docs");
  const [chatOpened, setChatOpened] = useState(false);

  const getLocalizedLink = (path: string) => {
    return locale === "vi" ? `${path}?lang=vi` : path;
  };

  const features = [
    {
      title: t("index.visualizationTitle"),
      description: t("index.visualizationDesc"),
      icon: <FaBolt size={24} />,
      color: "#236b4a",
      link: getLocalizedLink("/docs/visualization"),
    },
    {
      title: t("index.jsonDrawTitle"),
      description: t("index.jsonDrawDesc"),
      icon: <IoBrushOutline size={24} />,
      color: "#236b4a",
      link: getLocalizedLink("/docs/jsondraw"),
    },
    {
      title: t("index.formatConversionTitle"),
      description: t("index.formatConversionDesc"),
      icon: <TbTransformFilled size={24} />,
      color: "#236b4a",
      link: getLocalizedLink("/docs/format-conversion"),
    },
    {
      title: t("index.formatValidateTitle"),
      description: t("index.formatValidateDesc"),
      icon: <MdOutlineFormatIndentIncrease size={24} />,
      color: "#236b4a",
      link: getLocalizedLink("/docs/format-validate"),
    },
    {
      title: t("index.typeGenerationTitle"),
      description: t("index.typeGenerationDesc"),
      icon: <MdOutlineGeneratingTokens size={24} />,
      color: "#236b4a",
      link: getLocalizedLink("/docs/type-generation"),
    },
    {
      title: t("index.jsonSchemaTitle"),
      description: t("index.jsonSchemaDesc"),
      icon: <VscJson size={24} />,
      color: "#236b4a",
      link: getLocalizedLink("/docs/json-schema"),
    },
    {
      title: t("index.jqQueryTitle"),
      description: t("index.jqQueryDesc"),
      icon: <FaToolbox size={24} />,
      color: "#236b4a",
      link: getLocalizedLink("/docs/jq-query"),
    },
    {
      title: t("index.jsonPathTitle"),
      description: t("index.jsonPathDesc"),
      icon: <FaToolbox size={24} />,
      color: "#236b4a",
      link: getLocalizedLink("/docs/json-path"),
    },
    {
      title: t("index.exportImageTitle"),
      description: t("index.exportImageDesc"),
      icon: <IoImages size={24} />,
      color: "#236b4a",
      link: getLocalizedLink("/docs/export-image"),
    },
    {
      title: t("index.embedWidgetTitle"),
      description: t("index.embedWidgetDesc"),
      icon: <FaToolbox size={24} />,
      color: "#236b4a",
      link: getLocalizedLink("/docs/embed-widget"),
    },
  ];

  const faqs = [
    {
      question: t("index.faq1Question"),
      answer: t("index.faq1Answer"),
    },
    {
      question: t("index.faq2Question"),
      answer: t("index.faq2Answer"),
    },
    {
      question: t("index.faq3Question"),
      answer: t("index.faq3Answer"),
    },
    {
      question: t("index.faq4Question"),
      answer: t("index.faq4Answer"),
    },
    {
      question: t("index.faq5Question"),
      answer: t("index.faq5Answer"),
    },
  ];

  return (
    <Layout>
      <Head>
        {generateNextSeo({
          ...SEO,
          title: "Documentation - JSON Visualization",
          description: "Learn about JSON Visualization features and how to use them.",
          canonical: "https://jsonviz.online/docs",
        })}
      </Head>
      <StyledDocsContainer>
        <Stack gap="xl">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <Title order={1} c="dark">
              {t("index.title")}
            </Title>
            <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
              <ChatButton onClick={() => setChatOpened(true)} />
              <LanguageSwitcher />
            </div>
          </div>

          <StyledDocsPaper p="xl" radius="md" withBorder>
            <Title mb="md" order={2} c="dark">
              {t("index.welcomeTitle")}
            </Title>
            <StyledContentBody>
              <Text size="lg">{t("index.welcomeDesc1")}</Text>
              <Text>
                {t("index.welcomeDesc2")}{" "}
                <StyledLink href={getLocalizedLink("/editor")}>Editor</StyledLink>.
              </Text>
            </StyledContentBody>
          </StyledDocsPaper>

          <div>
            <Title mb="lg" order={2} c="dark">
              {t("index.featuresTitle")}
            </Title>
            <SimpleGrid cols={{ base: 1, sm: 2, lg: 3 }} spacing="lg">
              {features.map(feature => (
                <Link
                  key={feature.title}
                  href={feature.link}
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  <StyledFeatureCard p="lg" radius="md" withBorder>
                    <Group mb="md">
                      <ThemeIcon size={48} radius="md" color={feature.color} variant="light">
                        {feature.icon}
                      </ThemeIcon>
                    </Group>
                    <Title order={4} mb="xs" c="dark">
                      {feature.title}
                    </Title>
                    <Text size="sm" c="dimmed">
                      {feature.description}
                    </Text>
                  </StyledFeatureCard>
                </Link>
              ))}
            </SimpleGrid>
          </div>

          <StyledDocsPaper p="xl" radius="md" withBorder>
            <Title mb="md" order={3} c="dark">
              {t("index.quickStartTitle")}
            </Title>
            <StyledContentBody>
              <div>
                <Text fw={600} mb="xs">
                  {t("index.quickStartStep1Title")}
                </Text>
                <Text>
                  {t("index.quickStartStep1Desc1")}{" "}
                  <StyledLink href={getLocalizedLink("/editor")}>Editor</StyledLink>{" "}
                  {t("index.quickStartStep1Desc2")}
                </Text>
              </div>
              <div>
                <Text fw={600} mb="xs">
                  {t("index.quickStartStep2Title")}
                </Text>
                <Text>{t("index.quickStartStep2Desc")}</Text>
              </div>
              <div>
                <Text fw={600} mb="xs">
                  {t("index.quickStartStep3Title")}
                </Text>
                <Text>{t("index.quickStartStep3Desc")}</Text>
              </div>
              <div>
                <Text fw={600} mb="xs">
                  {t("index.quickStartStep4Title")}
                </Text>
                <Text>{t("index.quickStartStep4Desc")}</Text>
              </div>
            </StyledContentBody>
          </StyledDocsPaper>

          <StyledDocsPaper p="xl" radius="md" withBorder>
            <Title mb="md" order={3} c="dark">
              {t("index.sampleDataTitle")}
            </Title>
            <StyledContentBody>
              <Text>{t("index.sampleDataDesc")}</Text>
              <SimpleGrid cols={{ base: 1, md: 2 }} spacing="lg">
                <div>
                  <Text fw={600} mb="xs">
                    {t("index.sampleJsonLabel")}
                  </Text>
                  <CodeBlock code={sampleJson} />
                </div>
                <div>
                  <Text fw={600} mb="xs">
                    {t("index.sampleCsvLabel")}
                  </Text>
                  <CodeBlock code={sampleCsv} />
                </div>
              </SimpleGrid>
              <Text size="sm" c="dimmed">
                {t("index.sampleDataHint")}{" "}
                <StyledLink href={getLocalizedLink("/editor")}>Editor</StyledLink>.
              </Text>
            </StyledContentBody>
          </StyledDocsPaper>

          <StyledDocsPaper p="xl" radius="md" withBorder>
            <Title mb="md" order={3} c="dark">
              {t("index.supportedFormatsTitle")}
            </Title>
            <StyledContentBody>
              <Text>{t("index.supportedFormatsDesc")}</Text>
              <SimpleGrid cols={{ base: 2, sm: 3 }} spacing="md">
                <Text>• JSON</Text>
                <Text>• YAML</Text>
                <Text>• CSV</Text>
                <Text>• XML</Text>
              </SimpleGrid>
              <Text size="sm" c="dimmed" mt="md">
                {t("index.supportedFormatsNote")}
              </Text>
            </StyledContentBody>
          </StyledDocsPaper>

          <StyledDocsPaper p="xl" radius="md" withBorder>
            <Title mb="md" order={3} c="dark">
              {t("index.helpTitle")}
            </Title>
            <StyledContentBody>
              <Text>{t("index.helpDesc")}</Text>
              <Text>
                • {t("index.helpItem1")}{" "}
                <StyledLink href={getLocalizedLink("/docs/jsondraw")}>JsonDraw</StyledLink>.
              </Text>
              <Text>
                • {t("index.helpItem2")}{" "}
                <StyledLink href={getLocalizedLink("/editor")}>Editor</StyledLink>.
              </Text>
              <Text>• {t("index.helpItem3")}</Text>
            </StyledContentBody>
          </StyledDocsPaper>

          <StyledDocsPaper p="xl" radius="md" withBorder>
            <Title mb="md" order={3} c="dark">
              {t("index.faqTitle")}
            </Title>
            <StyledContentBody>
              {faqs.map(faq => (
                <div key={faq.question}>
                  <Text fw={600} mb="xs">
                    {faq.question}
                  </Text>
                  <Text>{faq.answer}</Text>
                </div>
              ))}
            </StyledContentBody>
          </StyledDocsPaper>

          <StyledDocsPaper p="xl" radius="md" withBorder>
            <Title mb="md" order={3} c="dark">
              {t("index.privacyTitle")}
            </Title>
            <StyledContentBody>
              <Text>{t("index.privacyDesc1")}</Text>
              <Text size="sm" c="dimmed">
                {t("index.privacyDesc2")}
              </Text>
            </StyledContentBody>
          </StyledDocsPaper>
        </Stack>
      </StyledDocsContainer>

      <ChatBot opened={chatOpened} onClose={() => setChatOpened(false)} />
    </Layout>
  );
};

export default DocsPage;
