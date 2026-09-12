import React from "react";
import { Paper, SimpleGrid, Stack, Table, Text, Title } from "@mantine/core";
import { CodeBlock } from "src/components/CodeBlock";
import { StyledContentBody, StyledLink } from "src/features/docs/components/DocPrimitives/styles";
import { DocsLayout } from "src/features/docs/components/DocsLayout";
import { useDocsTranslation } from "src/features/docs/hooks/useDocsTranslation";

const sampleMarkdownOutline = `# Project Architecture
- Frontend
  - Next.js 16 (Pages Router)
  - React 19 & TypeScript
  - React Flow Canvas
- Backend
  - API Gateway
  - Auth Service
  - Event Store
- Infrastructure
  - Docker Containers
  - Kubernetes Cluster
  - Edge CDN`;

const sampleMermaidOutline = `mindmap
  root((Project))
    Frontend
      Next.js 16
      React Flow
    Backend
      API Gateway
      Auth Service`;

export const MindmapDocsView: React.FC = () => {
  const { t, getLocalizedLink } = useDocsTranslation();

  return (
    <DocsLayout
      slug="mindmap"
      title={t("mindmap.title")}
      subtitle={t("mindmap.subtitle")}
      alertText={t("mindmap.alert")}
      previous={{
        title: t("jsonDraw.title"),
        href: getLocalizedLink("/docs/jsondraw"),
      }}
      next={{
        title: t("formatConversion.title"),
        href: getLocalizedLink("/docs/format-conversion"),
      }}
    >
      {/* Overview */}
      <Paper bg="white" c="black" p="xl" radius="md" withBorder>
        <Title mb="md" order={2} c="dark">
          {t("mindmap.whatIsTitle")}
        </Title>
        <StyledContentBody>
          <Text>
            {t("mindmap.whatIsDesc")}{" "}
            <StyledLink href="/mindmap">Open Mind Map Canvas →</StyledLink>
          </Text>
          <SimpleGrid cols={{ base: 1, md: 3 }} spacing="lg" mt="md">
            <div>
              <Text fw={600} mb="xs">
                {t("mindmap.feature1")}
              </Text>
              <Text size="sm" c="dimmed">
                {t("mindmap.feature1Desc")}
              </Text>
            </div>
            <div>
              <Text fw={600} mb="xs">
                {t("mindmap.feature2")}
              </Text>
              <Text size="sm" c="dimmed">
                {t("mindmap.feature2Desc")}
              </Text>
            </div>
            <div>
              <Text fw={600} mb="xs">
                {t("mindmap.feature3")}
              </Text>
              <Text size="sm" c="dimmed">
                {t("mindmap.feature3Desc")}
              </Text>
            </div>
          </SimpleGrid>
        </StyledContentBody>
      </Paper>

      {/* Multi-format Outline Support */}
      <Paper bg="white" c="black" p="xl" radius="md" withBorder>
        <Title mb="md" order={2} c="dark">
          {t("mindmap.outlineTitle")}
        </Title>
        <StyledContentBody>
          <Text mb="md">{t("mindmap.outlineDesc")}</Text>
          <SimpleGrid cols={{ base: 1, md: 2 }} spacing="md">
            <div>
              <Text fw={600} mb="xs">
                Markdown Outline Syntax
              </Text>
              <CodeBlock code={sampleMarkdownOutline} language="markdown" />
            </div>
            <div>
              <Text fw={600} mb="xs">
                Mermaid Mindmap Syntax
              </Text>
              <CodeBlock code={sampleMermaidOutline} language="markdown" />
            </div>
          </SimpleGrid>
        </StyledContentBody>
      </Paper>

      {/* Step by step guide */}
      <Paper bg="white" c="black" p="xl" radius="md" withBorder>
        <Title mb="md" order={2} c="dark">
          {t("mindmap.howToTitle")}
        </Title>
        <Stack gap="lg">
          <div>
            <Text fw={600} mb="xs">
              {t("mindmap.step1Title")}
            </Text>
            <Text>{t("mindmap.step1Desc")}</Text>
          </div>
          <div>
            <Text fw={600} mb="xs">
              {t("mindmap.step2Title")}
            </Text>
            <Text>{t("mindmap.step2Desc")}</Text>
          </div>
          <div>
            <Text fw={600} mb="xs">
              {t("mindmap.step3Title")}
            </Text>
            <Text>{t("mindmap.step3Desc")}</Text>
          </div>
          <div>
            <Text fw={600} mb="xs">
              {t("mindmap.step4Title")}
            </Text>
            <Text>{t("mindmap.step4Desc")}</Text>
          </div>
          <div>
            <Text fw={600} mb="xs">
              {t("mindmap.step5Title")}
            </Text>
            <Text>{t("mindmap.step5Desc")}</Text>
          </div>
        </Stack>
      </Paper>

      {/* Shortcuts Table */}
      <Paper bg="white" c="black" p="xl" radius="md" withBorder>
        <Title mb="md" order={2} c="dark">
          {t("mindmap.shortcutsTitle")}
        </Title>
        <StyledContentBody>
          <Text mb="md">{t("mindmap.shortcutsDesc")}</Text>
          <Table highlightOnHover withTableBorder>
            <Table.Thead>
              <Table.Tr>
                <Table.Th>{t("mindmap.tableShortcut")}</Table.Th>
                <Table.Th>{t("mindmap.tableAction")}</Table.Th>
                <Table.Th>{t("mindmap.tableScope")}</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              <Table.Tr>
                <Table.Td fw={700}>⌘ / Ctrl + ⇧ + D</Table.Td>
                <Table.Td>{t("mindmap.shortcutRotate")}</Table.Td>
                <Table.Td>Canvas</Table.Td>
              </Table.Tr>
              <Table.Tr>
                <Table.Td fw={700}>⇧ + 3</Table.Td>
                <Table.Td>{t("mindmap.shortcutExpandAll")}</Table.Td>
                <Table.Td>Canvas</Table.Td>
              </Table.Tr>
              <Table.Tr>
                <Table.Td fw={700}>⇧ + 4</Table.Td>
                <Table.Td>{t("mindmap.shortcutCollapseDeep")}</Table.Td>
                <Table.Td>Canvas</Table.Td>
              </Table.Tr>
              <Table.Tr>
                <Table.Td fw={700}>⇧ + 1</Table.Td>
                <Table.Td>{t("mindmap.shortcutCenterFirst")}</Table.Td>
                <Table.Td>Canvas</Table.Td>
              </Table.Tr>
              <Table.Tr>
                <Table.Td fw={700}>⇧ + 2</Table.Td>
                <Table.Td>{t("mindmap.shortcutFitCenter")}</Table.Td>
                <Table.Td>Canvas</Table.Td>
              </Table.Tr>
              <Table.Tr>
                <Table.Td fw={700}>⌘ / Ctrl + + / -</Table.Td>
                <Table.Td>{t("mindmap.shortcutZoom")}</Table.Td>
                <Table.Td>Canvas</Table.Td>
              </Table.Tr>
              <Table.Tr>
                <Table.Td fw={700}>⌘ / Ctrl + F</Table.Td>
                <Table.Td>{t("mindmap.shortcutSearch")}</Table.Td>
                <Table.Td>Canvas / Header</Table.Td>
              </Table.Tr>
            </Table.Tbody>
          </Table>
        </StyledContentBody>
      </Paper>
    </DocsLayout>
  );
};

export default MindmapDocsView;
