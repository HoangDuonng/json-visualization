import React from "react";
import { Paper, SimpleGrid, Text, Title } from "@mantine/core";
import {
  StyledContentBody,
  StyledInlineCode,
  StyledLink,
} from "src/features/docs/components/DocPrimitives/styles";
import { DocsLayout } from "src/features/docs/components/DocsLayout";
import { useDocsTranslation } from "src/features/docs/hooks/useDocsTranslation";

export const VisualizationView: React.FC = () => {
  const { t, getLocalizedLink } = useDocsTranslation();

  return (
    <DocsLayout
      slug="visualization"
      title={t("visualization.title")}
      subtitle={t("visualization.subtitle")}
      alertText={t("visualization.alert")}
      next={{
        title: t("formatConversion.title"),
        href: getLocalizedLink("/docs/format-conversion"),
      }}
    >
      <Paper bg="white" c="black" p="xl" radius="md" withBorder>
        <Title mb="md" order={2} c="dark">
          {t("visualization.whatIsTitle")}
        </Title>
        <StyledContentBody>
          <Text>{t("visualization.whatIsDesc1")}</Text>
          <Text>{t("visualization.whatIsDesc2")}</Text>
          <Text>• {t("visualization.benefit1")}</Text>
          <Text>• {t("visualization.benefit2")}</Text>
          <Text>• {t("visualization.benefit3")}</Text>
          <Text>• {t("visualization.benefit4")}</Text>
          <Text>• {t("visualization.benefit5")}</Text>
        </StyledContentBody>
      </Paper>

      <Paper bg="white" c="black" p="xl" radius="md" withBorder>
        <Title mb="md" order={2} c="dark">
          {t("visualization.supportedFormatsTitle")}
        </Title>
        <StyledContentBody>
          <Text>{t("visualization.supportedFormatsDesc")}</Text>
          <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="md" mt="md">
            <div>
              <Text fw={600} mb="xs">
                JSON
              </Text>
              <Text size="sm" c="dimmed">
                {t("visualization.formatJsonDesc")}
              </Text>
            </div>
            <div>
              <Text fw={600} mb="xs">
                YAML
              </Text>
              <Text size="sm" c="dimmed">
                {t("visualization.formatYamlDesc")}
              </Text>
            </div>
            <div>
              <Text fw={600} mb="xs">
                CSV
              </Text>
              <Text size="sm" c="dimmed">
                {t("visualization.formatCsvDesc")}
              </Text>
            </div>
            <div>
              <Text fw={600} mb="xs">
                XML
              </Text>
              <Text size="sm" c="dimmed">
                {t("visualization.formatXmlDesc")}
              </Text>
            </div>
          </SimpleGrid>
        </StyledContentBody>
      </Paper>

      <Paper bg="white" c="black" p="xl" radius="md" withBorder>
        <Title mb="md" order={2} c="dark">
          {t("common.howToUse")}
        </Title>
        <StyledContentBody>
          <div>
            <Text fw={600} mb="xs">
              {t("visualization.step1Title")}
            </Text>
            <Text>
              {t("visualization.step1Desc")}{" "}
              <StyledLink href={getLocalizedLink("/editor")}>{t("common.editor")}</StyledLink>.
            </Text>
          </div>
          <div>
            <Text fw={600} mb="xs">
              {t("visualization.step2Title")}
            </Text>
            <Text>{t("visualization.step2Desc")}</Text>
            <Text ml="md">• {t("visualization.step2Option1")}</Text>
            <Text ml="md">• {t("visualization.step2Option2")}</Text>
            <Text ml="md">• {t("visualization.step2Option3")}</Text>
            <Text ml="md">• {t("visualization.step2Option4")}</Text>
          </div>
          <div>
            <Text fw={600} mb="xs">
              {t("visualization.step3Title")}
            </Text>
            <Text>
              {t("visualization.step3Desc")} <StyledInlineCode>Graph View</StyledInlineCode>{" "}
              {t("visualization.step3And")} <StyledInlineCode>Tree View</StyledInlineCode>{" "}
              {t("visualization.step3Using")}
            </Text>
          </div>
          <div>
            <Text fw={600} mb="xs">
              {t("visualization.step4Title")}
            </Text>
            <Text>• {t("visualization.step4Option1")}</Text>
            <Text>• {t("visualization.step4Option2")}</Text>
            <Text>• {t("visualization.step4Option3")}</Text>
            <Text>• {t("visualization.step4Option4")}</Text>
          </div>
        </StyledContentBody>
      </Paper>

      <Paper bg="white" c="black" p="xl" radius="md" withBorder>
        <Title mb="md" order={2} c="dark">
          {t("common.tipsAndBestPractices")}
        </Title>
        <StyledContentBody>
          <div>
            <Text fw={600}>• {t("visualization.tip1")}</Text>
            <Text>{t("visualization.tip1Desc")}</Text>
          </div>
          <div>
            <Text fw={600}>• {t("visualization.tip2")}</Text>
            <Text>{t("visualization.tip2Desc")}</Text>
          </div>
          <div>
            <Text fw={600}>• {t("visualization.tip3")}</Text>
            <Text>{t("visualization.tip3Desc")}</Text>
          </div>
          <div>
            <Text fw={600}>• {t("visualization.tip4")}</Text>
            <Text>{t("visualization.tip4Desc")}</Text>
          </div>
          <div>
            <Text fw={600}>• {t("visualization.tip5")}</Text>
            <Text>{t("visualization.tip5Desc")}</Text>
          </div>
        </StyledContentBody>
      </Paper>
    </DocsLayout>
  );
};

export default VisualizationView;
