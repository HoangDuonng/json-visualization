import React from "react";
import { Code, Divider, Paper, Table, Text, Title } from "@mantine/core";
import styled from "styled-components";
import { CodeBlock } from "src/components/CodeBlock";
import { DocsToc } from "src/components/DocsToc";
import { StyledContentBody, StyledLink } from "src/features/docs/components/DocPrimitives/styles";
import { DocsLayout } from "src/features/docs/components/DocsLayout";
import { useDocsTranslation } from "src/features/docs/hooks/useDocsTranslation";

const StyledCode = styled(Code)`
  display: block;
  margin: 8px 0;
  padding: 12px 16px;
  border: 1px solid #e9ecef;
  border-radius: 6px;
  background: #f8f9fa;
  font-family: var(--public-font-mono, monospace) !important;
  font-size: 14px;

  * {
    font-family: var(--public-font-mono, monospace) !important;
  }
`;

export const JqQueryView: React.FC = () => {
  const { t, getLocalizedLink } = useDocsTranslation();

  const tocItems = [
    { id: "what-is", label: t("jqQuery.whatIsTitle") },
    { id: "how-to-use", label: t("jqQuery.howToUseTitle") },
    { id: "basic-syntax", label: t("jqQuery.basicSyntaxTitle") },
    { id: "examples", label: t("jqQuery.examplesTitle") },
    { id: "common-ops", label: t("jqQuery.commonOpsTitle") },
    { id: "tips", label: t("jqQuery.tipsTitle") },
    { id: "limitations", label: t("jqQuery.limitationsTitle") },
  ];

  return (
    <DocsLayout
      slug="jq-query"
      title={t("jqQuery.title")}
      subtitle={t("jqQuery.subtitle")}
      alertText={t("jqQuery.alert")}
      previous={{
        title: t("jsonSchema.title"),
        href: getLocalizedLink("/docs/json-schema"),
      }}
      next={{
        title: t("jsonPath.title"),
        href: getLocalizedLink("/docs/json-path"),
      }}
    >
      <DocsToc title={t("common.onThisPage")} items={tocItems} />

      <Paper bg="white" c="black" p="xl" radius="md" withBorder>
        <Title id="what-is" mb="md" order={2} c="dark">
          {t("jqQuery.whatIsTitle")}
        </Title>
        <StyledContentBody>
          <Text>{t("jqQuery.whatIsDesc1")}</Text>
          <Text>{t("jqQuery.whatIsDesc2")}</Text>
        </StyledContentBody>
      </Paper>

      <Paper bg="white" c="black" p="xl" radius="md" withBorder>
        <Title id="how-to-use" mb="md" order={2} c="dark">
          {t("jqQuery.howToUseTitle")}
        </Title>
        <StyledContentBody>
          <div>
            <Text fw={600} mb="xs">
              {t("jqQuery.step1Title")}
            </Text>
            <Text>
              {t("jqQuery.step1Desc")}{" "}
              <StyledLink href={getLocalizedLink("/editor")}>{t("common.editor")}</StyledLink>.
            </Text>
          </div>
          <div>
            <Text fw={600} mb="xs">
              {t("jqQuery.step2Title")}
            </Text>
            <Text>{t("jqQuery.step2Desc")}</Text>
          </div>
          <div>
            <Text fw={600} mb="xs">
              {t("jqQuery.step3Title")}
            </Text>
            <Text>{t("jqQuery.step3Desc")}</Text>
          </div>
          <div>
            <Text fw={600} mb="xs">
              {t("jqQuery.step4Title")}
            </Text>
            <Text>{t("jqQuery.step4Desc")}</Text>
          </div>
        </StyledContentBody>
      </Paper>

      <Paper bg="white" c="black" p="xl" radius="md" withBorder>
        <Title id="basic-syntax" mb="md" order={2} c="dark">
          {t("jqQuery.basicSyntaxTitle")}
        </Title>
        <StyledContentBody>
          <Table striped highlightOnHover withTableBorder withColumnBorders>
            <Table.Thead>
              <Table.Tr>
                <Table.Th>{t("jqQuery.tableQuery")}</Table.Th>
                <Table.Th>{t("jqQuery.tableDescription")}</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              <Table.Tr>
                <Table.Td>
                  <StyledCode>.</StyledCode>
                </Table.Td>
                <Table.Td>{t("jqQuery.syntaxIdentity")}</Table.Td>
              </Table.Tr>
              <Table.Tr>
                <Table.Td>
                  <StyledCode>.field</StyledCode>
                </Table.Td>
                <Table.Td>{t("jqQuery.syntaxField")}</Table.Td>
              </Table.Tr>
              <Table.Tr>
                <Table.Td>
                  <StyledCode>.field1.field2</StyledCode>
                </Table.Td>
                <Table.Td>{t("jqQuery.syntaxNested")}</Table.Td>
              </Table.Tr>
              <Table.Tr>
                <Table.Td>
                  <StyledCode>.[]</StyledCode>
                </Table.Td>
                <Table.Td>{t("jqQuery.syntaxIterate")}</Table.Td>
              </Table.Tr>
              <Table.Tr>
                <Table.Td>
                  <StyledCode>.[0]</StyledCode>
                </Table.Td>
                <Table.Td>{t("jqQuery.syntaxIndex")}</Table.Td>
              </Table.Tr>
              <Table.Tr>
                <Table.Td>
                  <StyledCode>.field[]</StyledCode>
                </Table.Td>
                <Table.Td>{t("jqQuery.syntaxFieldArray")}</Table.Td>
              </Table.Tr>
            </Table.Tbody>
          </Table>
        </StyledContentBody>
      </Paper>

      <Paper bg="white" c="black" p="xl" radius="md" withBorder>
        <Title id="examples" mb="md" order={2} c="dark">
          {t("jqQuery.examplesTitle")}
        </Title>
        <StyledContentBody>
          <Text fw={600}>{t("jqQuery.sampleData")}</Text>
          <CodeBlock
            code={
              '{\n  "fruits": [\n    {\n      "name": "Apple",\n      "color": "#FF0000",\n      "details": {\n        "type": "Pome",\n        "season": "Fall"\n      },\n      "nutrients": {\n        "calories": 52,\n        "fiber": "2.4g",\n        "vitaminC": "4.6mg"\n      }\n    },\n    {\n      "name": "Banana",\n      "color": "#FFFF00",\n      "details": {\n        "type": "Berry",\n        "season": "Year-round"\n      },\n      "nutrients": {\n        "calories": 89,\n        "fiber": "2.6g",\n        "potassium": "358mg"\n      }\n    },\n    {\n      "name": "Orange",\n      "color": "#FFA500",\n      "details": {\n        "type": "Citrus",\n        "season": "Winter"\n      },\n      "nutrients": {\n        "calories": 47,\n        "fiber": "2.4g",\n        "vitaminC": "53.2mg"\n      }\n    }\n  ]\n}'
            }
          />

          <Divider my="md" />

          <div>
            <Text fw={600} mb="xs">
              {t("jqQuery.example1Title")}
            </Text>
            <Text mb="xs">{t("jqQuery.queryLabel")}</Text>
            <StyledCode>.fruits[].name</StyledCode>
            <Text mb="xs">{t("jqQuery.resultLabel")}</Text>
            <StyledCode>{'["Apple", "Banana", "Orange"]'}</StyledCode>
          </div>

          <Divider my="md" />

          <div>
            <Text fw={600} mb="xs">
              {t("jqQuery.example2Title")}
            </Text>
            <Text mb="xs">{t("jqQuery.queryLabel")}</Text>
            <StyledCode>.fruits[].color</StyledCode>
            <Text mb="xs">{t("jqQuery.resultLabel")}</Text>
            <StyledCode>{'["#FF0000", "#FFFF00", "#FFA500"]'}</StyledCode>
          </div>

          <Divider my="md" />

          <div>
            <Text fw={600} mb="xs">
              {t("jqQuery.example3Title")}
            </Text>
            <Text mb="xs">{t("jqQuery.queryLabel")}</Text>
            <StyledCode>.fruits[].nutrients.calories</StyledCode>
            <Text mb="xs">{t("jqQuery.resultLabel")}</Text>
            <StyledCode>[52, 89, 47]</StyledCode>
          </div>

          <Divider my="md" />

          <div>
            <Text fw={600} mb="xs">
              {t("jqQuery.example4Title")}
            </Text>
            <Text mb="xs">{t("jqQuery.queryLabel")}</Text>
            <StyledCode>{'.fruits[] | select(.details.type == "Citrus")'}</StyledCode>
            <Text mb="xs">{t("jqQuery.resultLabel")}</Text>
            <CodeBlock
              code={
                '{\n  "name": "Orange",\n  "color": "#FFA500",\n  "details": {\n    "type": "Citrus",\n    "season": "Winter"\n  },\n  "nutrients": {\n    "calories": 47,\n    "fiber": "2.4g",\n    "vitaminC": "53.2mg"\n  }\n}'
              }
            />
          </div>

          <Divider my="md" />

          <div>
            <Text fw={600} mb="xs">
              {t("jqQuery.example5Title")}
            </Text>
            <Text mb="xs">{t("jqQuery.queryLabel")}</Text>
            <StyledCode>.fruits[] | select(.nutrients.calories &lt; 50)</StyledCode>
            <Text mb="xs">{t("jqQuery.resultLabel")}</Text>
            <CodeBlock
              code={
                '[\n  {\n    "name": "Apple",\n    "color": "#FF0000",\n    ...\n  },\n  {\n    "name": "Orange",\n    "color": "#FFA500",\n    ...\n  }\n]'
              }
            />
          </div>

          <Divider my="md" />

          <div>
            <Text fw={600} mb="xs">
              {t("jqQuery.example6Title")}
            </Text>
            <Text mb="xs">{t("jqQuery.queryLabel")}</Text>
            <StyledCode>{".fruits[] | {name: .name, calories: .nutrients.calories}"}</StyledCode>
            <Text mb="xs">{t("jqQuery.resultLabel")}</Text>
            <CodeBlock
              code={
                '[\n  {"name": "Apple", "calories": 52},\n  {"name": "Banana", "calories": 89},\n  {"name": "Orange", "calories": 47}\n]'
              }
            />
          </div>

          <Divider my="md" />

          <div>
            <Text fw={600} mb="xs">
              {t("jqQuery.example7Title")}
            </Text>
            <Text mb="xs">{t("jqQuery.queryLabel")}</Text>
            <StyledCode>{'.fruits[] | select(.details.season == "Winter")'}</StyledCode>
            <Text mb="xs">{t("jqQuery.resultLabel")}</Text>
            <CodeBlock
              code={
                '{\n  "name": "Orange",\n  "color": "#FFA500",\n  "details": {\n    "type": "Citrus",\n    "season": "Winter"\n  },\n  ...\n}'
              }
            />
          </div>
        </StyledContentBody>
      </Paper>

      <Paper bg="white" c="black" p="xl" radius="md" withBorder>
        <Title id="common-ops" mb="md" order={2} c="dark">
          {t("jqQuery.commonOpsTitle")}
        </Title>
        <StyledContentBody>
          <Table striped highlightOnHover withTableBorder withColumnBorders>
            <Table.Thead>
              <Table.Tr>
                <Table.Th>{t("jqQuery.tableOperation")}</Table.Th>
                <Table.Th>{t("jqQuery.tableSyntax")}</Table.Th>
                <Table.Th>{t("jqQuery.tableExample")}</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              <Table.Tr>
                <Table.Td>{t("jqQuery.opFilter")}</Table.Td>
                <Table.Td>
                  <StyledCode>select(condition)</StyledCode>
                </Table.Td>
                <Table.Td>
                  <StyledCode>select(.age &gt; 18)</StyledCode>
                </Table.Td>
              </Table.Tr>
              <Table.Tr>
                <Table.Td>{t("jqQuery.opMap")}</Table.Td>
                <Table.Td>
                  <StyledCode>map(expression)</StyledCode>
                </Table.Td>
                <Table.Td>
                  <StyledCode>map(.name)</StyledCode>
                </Table.Td>
              </Table.Tr>
              <Table.Tr>
                <Table.Td>{t("jqQuery.opPipe")}</Table.Td>
                <Table.Td>
                  <StyledCode>|</StyledCode>
                </Table.Td>
                <Table.Td>
                  <StyledCode>.users[] | .name</StyledCode>
                </Table.Td>
              </Table.Tr>
              <Table.Tr>
                <Table.Td>{t("jqQuery.opObject")}</Table.Td>
                <Table.Td>
                  <StyledCode>{"{key: value}"}</StyledCode>
                </Table.Td>
                <Table.Td>
                  <StyledCode>{"{name: .name, age: .age}"}</StyledCode>
                </Table.Td>
              </Table.Tr>
              <Table.Tr>
                <Table.Td>{t("jqQuery.opArray")}</Table.Td>
                <Table.Td>
                  <StyledCode>[expression]</StyledCode>
                </Table.Td>
                <Table.Td>
                  <StyledCode>[.users[].name]</StyledCode>
                </Table.Td>
              </Table.Tr>
            </Table.Tbody>
          </Table>
        </StyledContentBody>
      </Paper>

      <Paper bg="white" c="black" p="xl" radius="md" withBorder>
        <Title id="tips" mb="md" order={2} c="dark">
          {t("jqQuery.tipsTitle")}
        </Title>
        <StyledContentBody>
          <div>
            <Text fw={600}>{t("jqQuery.tip1Title")}</Text>
            <Text>{t("jqQuery.tip1Desc")}</Text>
          </div>
          <div>
            <Text fw={600}>{t("jqQuery.tip2Title")}</Text>
            <Text>{t("jqQuery.tip2Desc")}</Text>
          </div>
          <div>
            <Text fw={600}>{t("jqQuery.tip3Title")}</Text>
            <Text>{t("jqQuery.tip3Desc")}</Text>
          </div>
          <div>
            <Text fw={600}>{t("jqQuery.tip4Title")}</Text>
            <Text>{t("jqQuery.tip4Desc")}</Text>
          </div>
        </StyledContentBody>
      </Paper>

      <Paper bg="white" c="black" p="xl" radius="md" withBorder>
        <Title id="limitations" mb="md" order={2} c="dark">
          {t("jqQuery.limitationsTitle")}
        </Title>
        <StyledContentBody>
          <Text>{t("jqQuery.limitationsDesc")}</Text>
          <Text>{t("jqQuery.limitation1")}</Text>
          <Text>{t("jqQuery.limitation2")}</Text>
          <Text>{t("jqQuery.limitation3")}</Text>
          <Text>{t("jqQuery.limitation4")}</Text>
          <Text mt="md">
            {t("jqQuery.limitationsFooter")}{" "}
            <StyledLink href="https://jqlang.org/" target="_blank" rel="noopener noreferrer">
              {t("jqQuery.jqTool")}
            </StyledLink>
            .
          </Text>
        </StyledContentBody>
      </Paper>
    </DocsLayout>
  );
};

export default JqQueryView;
