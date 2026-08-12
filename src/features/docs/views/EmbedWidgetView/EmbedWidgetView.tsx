import React from "react";
import { Code, Paper, Stack, Text, Title } from "@mantine/core";
import { MONO_FONT_FAMILY } from "src/constants/globalStyle";
import { DocsLayout } from "src/features/docs/components/DocsLayout";
import { useDocsTranslation } from "src/features/docs/hooks/useDocsTranslation";

export const EmbedWidgetView: React.FC = () => {
  const { t, getLocalizedLink } = useDocsTranslation();

  return (
    <DocsLayout
      slug="embed-widget"
      title={t("embedWidget.title")}
      subtitle={t("embedWidget.subtitle")}
      alertText={t("embedWidget.alert")}
      previous={{
        title: t("jsonDraw.title"),
        href: getLocalizedLink("/docs/jsondraw"),
      }}
    >
      <Paper bg="white" c="black" p="xl" radius="md" withBorder>
        <Title mb="md" order={2} c="dark">
          {t("embedWidget.whatIsTitle")}
        </Title>
        <Text>{t("embedWidget.whatIsDesc")}</Text>
      </Paper>

      <Paper bg="white" c="black" p="xl" radius="md" withBorder>
        <Title mb="md" order={2} c="dark">
          {t("embedWidget.howToTitle")}
        </Title>
        <Stack gap="md">
          <div>
            <Text fw={600} mb="xs">
              {t("embedWidget.step1Title")}
            </Text>
            <Text mb="xs">{t("embedWidget.step1Desc")}</Text>
            <Code block style={{ fontFamily: `${MONO_FONT_FAMILY} !important` }}>
              {
                '<iframe id="json-viz-widget" src="https://jsonviz.online/widget" width="100%" height="500px"></iframe>'
              }
            </Code>
          </div>
          <div>
            <Text fw={600} mb="xs">
              {t("embedWidget.step2Title")}
            </Text>
            <Text mb="xs">{t("embedWidget.step2Desc")}</Text>
            <Code block style={{ fontFamily: `${MONO_FONT_FAMILY} !important` }}>
              {`const iframe = document.getElementById("json-viz-widget");
iframe.contentWindow.postMessage({
  json: JSON.stringify({ name: "Demo", active: true }),
  options: { theme: "dark", direction: "RIGHT" }
}, "*");`}
            </Code>
          </div>
        </Stack>
      </Paper>

      <Paper bg="white" c="black" p="xl" radius="md" withBorder>
        <Title mb="md" order={2} c="dark">
          {t("embedWidget.optionsTitle")}
        </Title>
        <Stack gap="xs">
          <Text fw={500}>• {t("embedWidget.optionTheme")}</Text>
          <Text fw={500}>• {t("embedWidget.optionDirection")}</Text>
        </Stack>
      </Paper>
    </DocsLayout>
  );
};
