import React from "react";
import { Paper, Stack, Text, Title } from "@mantine/core";
import { DocsLayout } from "src/features/docs/components/DocsLayout";
import { useDocsTranslation } from "src/features/docs/hooks/useDocsTranslation";

export const JsonDrawDocsView: React.FC = () => {
  const { t, getLocalizedLink } = useDocsTranslation();

  return (
    <DocsLayout
      slug="jsondraw"
      title={t("jsonDraw.title")}
      subtitle={t("jsonDraw.subtitle")}
      alertText={t("jsonDraw.alert")}
      previous={{
        title: t("visualization.title"),
        href: getLocalizedLink("/docs/visualization"),
      }}
      next={{
        title: t("formatConversion.title"),
        href: getLocalizedLink("/docs/format-conversion"),
      }}
    >
      <Paper bg="white" c="black" p="xl" radius="md" withBorder>
        <Title mb="md" order={2} c="dark">
          {t("jsonDraw.whatIsTitle")}
        </Title>
        <Text>{t("jsonDraw.whatIsDesc")}</Text>
      </Paper>

      <Paper bg="white" c="black" p="xl" radius="md" withBorder>
        <Title mb="md" order={2} c="dark">
          {t("jsonDraw.howToTitle")}
        </Title>
        <Stack gap="md">
          <div>
            <Text fw={600} mb="xs">
              {t("jsonDraw.step1Title")}
            </Text>
            <Text>{t("jsonDraw.step1Desc")}</Text>
          </div>
          <div>
            <Text fw={600} mb="xs">
              {t("jsonDraw.step2Title")}
            </Text>
            <Text>{t("jsonDraw.step2Desc")}</Text>
          </div>
          <div>
            <Text fw={600} mb="xs">
              {t("jsonDraw.step3Title")}
            </Text>
            <Text>{t("jsonDraw.step3Desc")}</Text>
          </div>
        </Stack>
      </Paper>

      <Paper bg="white" c="black" p="xl" radius="md" withBorder>
        <Title mb="md" order={2} c="dark">
          {t("jsonDraw.sessionTitle")}
        </Title>
        <Stack gap="sm">
          <Text>• {t("jsonDraw.sessionDesc1")}</Text>
          <Text>• {t("jsonDraw.sessionDesc2")}</Text>
        </Stack>
      </Paper>

      <Paper bg="white" c="black" p="xl" radius="md" withBorder>
        <Title mb="md" order={2} c="dark">
          {t("jsonDraw.tipsTitle")}
        </Title>
        <Stack gap="md">
          <div>
            <Text fw={600}>{t("jsonDraw.tip1")}</Text>
            <Text>{t("jsonDraw.tip1Desc")}</Text>
          </div>
          <div>
            <Text fw={600}>{t("jsonDraw.tip2")}</Text>
            <Text>{t("jsonDraw.tip2Desc")}</Text>
          </div>
          <div>
            <Text fw={600}>{t("jsonDraw.tip3")}</Text>
            <Text>{t("jsonDraw.tip3Desc")}</Text>
          </div>
        </Stack>
      </Paper>
    </DocsLayout>
  );
};

export default JsonDrawDocsView;
