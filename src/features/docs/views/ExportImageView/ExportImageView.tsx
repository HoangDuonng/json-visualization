import React from "react";
import { Paper, Stack, Text, Title } from "@mantine/core";
import { DocsLayout } from "src/features/docs/components/DocsLayout";
import { useDocsTranslation } from "src/features/docs/hooks/useDocsTranslation";

export const ExportImageView: React.FC = () => {
  const { t, getLocalizedLink } = useDocsTranslation();

  return (
    <DocsLayout
      slug="export-image"
      title={t("exportImage.title")}
      subtitle={t("exportImage.subtitle")}
      alertText={t("exportImage.alert")}
      previous={{
        title: t("jsonPath.title"),
        href: getLocalizedLink("/docs/json-path"),
      }}
      next={{
        title: t("jsonDraw.title"),
        href: getLocalizedLink("/docs/jsondraw"),
      }}
    >
      <Paper bg="white" c="black" p="xl" radius="md" withBorder>
        <Title mb="md" order={2} c="dark">
          {t("exportImage.whatIsTitle")}
        </Title>
        <Text>{t("exportImage.whatIsDesc")}</Text>
      </Paper>

      <Paper bg="white" c="black" p="xl" radius="md" withBorder>
        <Title mb="md" order={2} c="dark">
          {t("exportImage.supportedFormatsTitle")}
        </Title>
        <Stack gap="md">
          <div>
            <Text fw={600} mb="xs">
              {t("exportImage.pngTitle")}
            </Text>
            <Text>{t("exportImage.pngDesc")}</Text>
          </div>
          <div>
            <Text fw={600} mb="xs">
              {t("exportImage.jpegTitle")}
            </Text>
            <Text>{t("exportImage.jpegDesc")}</Text>
          </div>
          <div>
            <Text fw={600} mb="xs">
              {t("exportImage.svgTitle")}
            </Text>
            <Text>{t("exportImage.svgDesc")}</Text>
          </div>
        </Stack>
      </Paper>

      <Paper bg="white" c="black" p="xl" radius="md" withBorder>
        <Title mb="md" order={2} c="dark">
          {t("exportImage.howToExportTitle")}
        </Title>
        <Stack gap="md">
          <div>
            <Text fw={600} mb="xs">
              {t("exportImage.step1")}
            </Text>
            <Text>{t("exportImage.step1Desc")}</Text>
          </div>
          <div>
            <Text fw={600} mb="xs">
              {t("exportImage.step2")}
            </Text>
            <Text>{t("exportImage.step2Desc")}</Text>
          </div>
          <div>
            <Text fw={600} mb="xs">
              {t("exportImage.step3")}
            </Text>
            <Text>{t("exportImage.step3Desc")}</Text>
          </div>
          <div>
            <Text fw={600} mb="xs">
              {t("exportImage.step4")}
            </Text>
            <Text>{t("exportImage.step4Desc")}</Text>
          </div>
          <div>
            <Text fw={600} mb="xs">
              {t("exportImage.step5")}
            </Text>
            <Text>{t("exportImage.step5Desc")}</Text>
          </div>
        </Stack>
      </Paper>

      <Paper bg="white" c="black" p="xl" radius="md" withBorder>
        <Title mb="md" order={2} c="dark">
          {t("exportImage.tipsTitle")}
        </Title>
        <Stack gap="md">
          <div>
            <Text fw={600}>{t("exportImage.tip1")}</Text>
            <Text>{t("exportImage.tip1Desc")}</Text>
          </div>
          <div>
            <Text fw={600}>{t("exportImage.tip2")}</Text>
            <Text>{t("exportImage.tip2Desc")}</Text>
          </div>
          <div>
            <Text fw={600}>{t("exportImage.tip3")}</Text>
            <Text>{t("exportImage.tip3Desc")}</Text>
          </div>
          <div>
            <Text fw={600}>{t("exportImage.tip4")}</Text>
            <Text>{t("exportImage.tip4Desc")}</Text>
          </div>
        </Stack>
      </Paper>

      <Paper bg="white" c="black" p="xl" radius="md" withBorder>
        <Title mb="md" order={2} c="dark">
          {t("exportImage.useCasesTitle")}
        </Title>
        <Stack gap="md">
          <div>
            <Text fw={600} mb="xs">
              {t("exportImage.useCase1Title")}
            </Text>
            <Text>{t("exportImage.useCase1Desc")}</Text>
          </div>
          <div>
            <Text fw={600} mb="xs">
              {t("exportImage.useCase2Title")}
            </Text>
            <Text>{t("exportImage.useCase2Desc")}</Text>
          </div>
          <div>
            <Text fw={600} mb="xs">
              {t("exportImage.useCase3Title")}
            </Text>
            <Text>{t("exportImage.useCase3Desc")}</Text>
          </div>
          <div>
            <Text fw={600} mb="xs">
              {t("exportImage.useCase4Title")}
            </Text>
            <Text>{t("exportImage.useCase4Desc")}</Text>
          </div>
        </Stack>
      </Paper>
    </DocsLayout>
  );
};

export default ExportImageView;
