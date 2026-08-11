import React from "react";
import { Paper, SimpleGrid, Table, Text, Title } from "@mantine/core";
import { CodeBlock } from "src/components/CodeBlock";
import { StyledContentBody, StyledLink } from "src/features/docs/components/DocPrimitives/styles";
import { DocsLayout } from "src/features/docs/components/DocsLayout";
import { useDocsTranslation } from "src/features/docs/hooks/useDocsTranslation";

export const FormatConversionView: React.FC = () => {
  const { t, getLocalizedLink } = useDocsTranslation();

  return (
    <DocsLayout
      slug="format-conversion"
      title={t("formatConversion.title")}
      subtitle={t("formatConversion.subtitle")}
      alertText={t("formatConversion.alert")}
      previous={{
        title: t("visualization.title"),
        href: getLocalizedLink("/docs/visualization"),
      }}
      next={{
        title: t("formatValidate.title"),
        href: getLocalizedLink("/docs/format-validate"),
      }}
    >
      {/* Overview */}
      <Paper p="xl" radius="md">
        <Title order={2} mb="md">
          {t("formatConversion.whatIsTitle")}
        </Title>
        <StyledContentBody>
          <Text>{t("formatConversion.whatIsDesc")}</Text>
          <Text fw={600}>Use Cases:</Text>
          <Text>• {t("formatConversion.useCase1")}</Text>
          <Text>• {t("formatConversion.useCase2")}</Text>
          <Text>• {t("formatConversion.useCase3")}</Text>
          <Text>• {t("formatConversion.useCase4")}</Text>
          <Text>• {t("formatConversion.useCase5")}</Text>
        </StyledContentBody>
      </Paper>

      {/* Supported Formats Table */}
      <Paper p="xl" radius="md">
        <Title order={2} mb="md">
          {t("formatConversion.supportedTitle")}
        </Title>
        <Table highlightOnHover withTableBorder>
          <Table.Thead>
            <Table.Tr>
              <Table.Th>{t("formatConversion.tableFormat")}</Table.Th>
              <Table.Th>{t("formatConversion.tableBestFor")}</Table.Th>
              <Table.Th>{t("formatConversion.tableCharacteristics")}</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            <Table.Tr>
              <Table.Td fw={700}>JSON</Table.Td>
              <Table.Td>{t("formatConversion.jsonBestFor")}</Table.Td>
              <Table.Td>{t("formatConversion.jsonChar")}</Table.Td>
            </Table.Tr>
            <Table.Tr>
              <Table.Td fw={700}>YAML</Table.Td>
              <Table.Td>{t("formatConversion.yamlBestFor")}</Table.Td>
              <Table.Td>{t("formatConversion.yamlChar")}</Table.Td>
            </Table.Tr>
            <Table.Tr>
              <Table.Td fw={700}>XML</Table.Td>
              <Table.Td>{t("formatConversion.xmlBestFor")}</Table.Td>
              <Table.Td>{t("formatConversion.xmlChar")}</Table.Td>
            </Table.Tr>
            <Table.Tr>
              <Table.Td fw={700}>CSV</Table.Td>
              <Table.Td>{t("formatConversion.csvBestFor")}</Table.Td>
              <Table.Td>{t("formatConversion.csvChar")}</Table.Td>
            </Table.Tr>
          </Table.Tbody>
        </Table>
      </Paper>

      {/* Conversion Methods */}
      <Paper p="xl" radius="md">
        <Title order={2} mb="md">
          {t("formatConversion.howToConvertTitle")}
        </Title>
        <StyledContentBody>
          <Title order={3} size="h4">
            {t("formatConversion.method1Title")}
          </Title>
          <Text component="div">
            {t("formatConversion.method1Step1")}{" "}
            <StyledLink href={getLocalizedLink("/editor")}>{t("common.editor")}</StyledLink>.
            <br />
            {t("formatConversion.method1Step2")}
            <br />
            {t("formatConversion.method1Step3")}
            <br />
            {t("formatConversion.method1Step4")}
            <br />
            {t("formatConversion.method1Step5")}
          </Text>

          <Title order={3} size="h4" mt="md">
            {t("formatConversion.method2Title")}
          </Title>
          <Text component="div">
            {t("formatConversion.method2Step1")}{" "}
            <StyledLink href={getLocalizedLink("/converter/json-to-yaml")}>JSON to YAML</StyledLink>
            ).
            <br />
            {t("formatConversion.method2Step2")}
            <br />
            {t("formatConversion.method2Step3")}
            <br />
            {t("formatConversion.method2Step4")}
          </Text>
        </StyledContentBody>
      </Paper>

      {/* Popular Converter Tools */}
      <Paper p="xl" radius="md">
        <Title order={2} mb="md">
          {t("formatConversion.converterTools")}
        </Title>
        <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="md">
          <Paper p="md" withBorder radius="sm">
            <Title order={4} mb="xs">
              <StyledLink href={getLocalizedLink("/converter/json-to-yaml")}>
                {t("formatConversion.toYaml")}
              </StyledLink>
            </Title>
          </Paper>

          <Paper p="md" withBorder radius="sm">
            <Title order={4} mb="xs">
              <StyledLink href={getLocalizedLink("/converter/yaml-to-json")}>
                {t("formatConversion.yamlToJson")}
              </StyledLink>
            </Title>
          </Paper>

          <Paper p="md" withBorder radius="sm">
            <Title order={4} mb="xs">
              <StyledLink href={getLocalizedLink("/converter/json-to-xml")}>
                {t("formatConversion.toXml")}
              </StyledLink>
            </Title>
          </Paper>

          <Paper p="md" withBorder radius="sm">
            <Title order={4} mb="xs">
              <StyledLink href={getLocalizedLink("/converter/xml-to-json")}>
                {t("formatConversion.xmlToJson")}
              </StyledLink>
            </Title>
          </Paper>

          <Paper p="md" withBorder radius="sm">
            <Title order={4} mb="xs">
              <StyledLink href={getLocalizedLink("/converter/json-to-csv")}>
                {t("formatConversion.toCsv")}
              </StyledLink>
            </Title>
          </Paper>

          <Paper p="md" withBorder radius="sm">
            <Title order={4} mb="xs">
              <StyledLink href={getLocalizedLink("/converter/csv-to-json")}>
                {t("formatConversion.csvToJson")}
              </StyledLink>
            </Title>
          </Paper>
        </SimpleGrid>
      </Paper>

      {/* Examples */}
      <Paper p="xl" radius="md">
        <Title order={2} mb="md">
          {t("formatConversion.conversionExamplesTitle")}
        </Title>
        <StyledContentBody>
          <Title order={3} size="h4">
            {t("formatConversion.example1Title")}
          </Title>
          <Text size="xs" fw={600} c="dimmed">
            {t("formatConversion.inputLabel")} (JSON)
          </Text>
          <CodeBlock
            code={
              '{\n  "name": "JSON Viz",\n  "features": ["Graph", "Tree", "Converter"],\n  "active": true\n}'
            }
          />
          <Text size="xs" fw={600} c="dimmed" mt="xs">
            {t("formatConversion.outputLabel")} (YAML)
          </Text>
          <CodeBlock
            code={"name: JSON Viz\nfeatures:\n  - Graph\n  - Tree\n  - Converter\nactive: true"}
          />

          <Title order={3} size="h4" mt="lg">
            {t("formatConversion.example3Title")}
          </Title>
          <Text size="xs" fw={600} c="dimmed">
            {t("formatConversion.inputLabel")} (JSON)
          </Text>
          <CodeBlock code={'{\n  "user": {\n    "name": "Alex",\n    "role": "admin"\n  }\n}'} />
          <Text size="xs" fw={600} c="dimmed" mt="xs">
            {t("formatConversion.outputLabel")} (XML)
          </Text>
          <CodeBlock
            code={
              '<?xml version="1.0" encoding="UTF-8"?>\n<user>\n  <name>Alex</name>\n  <role>admin</role>\n</user>'
            }
          />
        </StyledContentBody>
      </Paper>

      {/* Troubleshooting / Limitations */}
      <Paper p="xl" radius="md">
        <Title order={2} mb="md">
          {t("formatConversion.limitationsTitle")}
        </Title>
        <StyledContentBody>
          <Text>{t("formatConversion.limitationsDesc")}</Text>

          <Title order={3} size="h4">
            {t("formatConversion.csvLimitationsTitle")}
          </Title>
          <Text>• {t("formatConversion.csvLimit1")}</Text>
          <Text>• {t("formatConversion.csvLimit2")}</Text>
          <Text>• {t("formatConversion.csvLimit3")}</Text>

          <Title order={3} size="h4" mt="md">
            {t("formatConversion.xmlLimitationsTitle")}
          </Title>
          <Text>• {t("formatConversion.xmlLimit1")}</Text>
          <Text>• {t("formatConversion.xmlLimit2")}</Text>
          <Text>• {t("formatConversion.xmlLimit3")}</Text>
        </StyledContentBody>
      </Paper>
    </DocsLayout>
  );
};

export default FormatConversionView;
