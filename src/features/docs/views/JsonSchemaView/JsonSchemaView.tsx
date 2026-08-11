import React from "react";
import { Divider, Paper, Table, Text, Title } from "@mantine/core";
import { CodeBlock } from "src/components/CodeBlock";
import { DocsToc } from "src/components/DocsToc";
import {
  StyledContentBody,
  StyledInlineCode,
  StyledLink,
} from "src/features/docs/components/DocPrimitives/styles";
import { DocsLayout } from "src/features/docs/components/DocsLayout";
import { useDocsTranslation } from "src/features/docs/hooks/useDocsTranslation";

export const JsonSchemaView: React.FC = () => {
  const { t, getLocalizedLink } = useDocsTranslation();

  const tocItems = [
    { id: "what-is", label: t("jsonSchema.whatIsTitle") },
    { id: "how-to-use", label: t("jsonSchema.howToUseTitle") },
    { id: "basic-schema", label: t("jsonSchema.basicSchemaTitle") },
    { id: "common-keywords", label: t("jsonSchema.commonKeywordsTitle") },
    { id: "practical-examples", label: t("jsonSchema.practicalExamplesTitle") },
    { id: "definitions", label: t("jsonSchema.definitionsTitle") },
    { id: "data-types", label: t("jsonSchema.dataTypesTitle") },
    { id: "string-formats", label: t("jsonSchema.stringFormatsTitle") },
    { id: "tips", label: t("jsonSchema.tipsTitle") },
  ];

  return (
    <DocsLayout
      slug="json-schema"
      title={t("jsonSchema.title")}
      subtitle={t("jsonSchema.subtitle")}
      alertText={t("jsonSchema.alert")}
      previous={{
        title: t("typeGeneration.title"),
        href: getLocalizedLink("/docs/type-generation"),
      }}
      next={{
        title: t("jqQuery.title"),
        href: getLocalizedLink("/docs/jq-query"),
      }}
    >
      <DocsToc title={t("common.onThisPage")} items={tocItems} />

      <Paper bg="white" c="black" p="xl" radius="md" withBorder>
        <Title id="what-is" mb="md" order={2} c="dark">
          {t("jsonSchema.whatIsTitle")}
        </Title>
        <StyledContentBody>
          <Text>{t("jsonSchema.whatIsDesc")}</Text>
          <Text>{t("jsonSchema.whatIsUsage")}</Text>
          <Text>• {t("jsonSchema.usage1")}</Text>
          <Text>• {t("jsonSchema.usage2")}</Text>
          <Text>• {t("jsonSchema.usage3")}</Text>
          <Text>• {t("jsonSchema.usage4")}</Text>
        </StyledContentBody>
      </Paper>

      <Paper bg="white" c="black" p="xl" radius="md" withBorder>
        <Title id="how-to-use" mb="md" order={2} c="dark">
          {t("jsonSchema.howToUseTitle")}
        </Title>
        <StyledContentBody>
          <div>
            <Text fw={600} mb="xs">
              {t("jsonSchema.step1")}
            </Text>
            <Text>
              {t("jsonSchema.step1Desc")}{" "}
              <StyledLink href={getLocalizedLink("/editor")}>{t("common.editor")}</StyledLink>.
            </Text>
          </div>
          <div>
            <Text fw={600} mb="xs">
              {t("jsonSchema.step2")}
            </Text>
            <Text>{t("jsonSchema.step2Desc")}</Text>
          </div>
          <div>
            <Text fw={600} mb="xs">
              {t("jsonSchema.step3")}
            </Text>
            <Text>{t("jsonSchema.step3Desc")}</Text>
          </div>
          <div>
            <Text fw={600} mb="xs">
              {t("jsonSchema.step4")}
            </Text>
            <Text>{t("jsonSchema.step4Desc")}</Text>
          </div>
          <div>
            <Text fw={600} mb="xs">
              {t("jsonSchema.step5")}
            </Text>
            <Text>{t("jsonSchema.step5Desc")}</Text>
          </div>
        </StyledContentBody>
      </Paper>

      <Paper bg="white" c="black" p="xl" radius="md" withBorder>
        <Title id="basic-schema" mb="md" order={2} c="dark">
          {t("jsonSchema.basicSchemaTitle")}
        </Title>
        <StyledContentBody>
          <Text>{t("jsonSchema.basicSchemaDesc")}</Text>
          <CodeBlock
            code={
              '{\n  "$schema": "http://json-schema.org/draft-07/schema#",\n  "title": "Product",\n  "description": "A product from the catalog",\n  "type": "object",\n  "properties": {\n    "id": {\n      "description": "The unique identifier for a product",\n      "type": "integer"\n    },\n    "name": {\n      "description": "Name of the product",\n      "type": "string"\n    },\n    "price": {\n      "description": "The price of the product",\n      "type": "number",\n      "minimum": 0\n    }\n  },\n  "required": ["id", "name", "price"]\n}'
            }
          />
        </StyledContentBody>
      </Paper>

      <Paper bg="white" c="black" p="xl" radius="md" withBorder>
        <Title id="common-keywords" mb="md" order={2} c="dark">
          {t("jsonSchema.commonKeywordsTitle")}
        </Title>
        <StyledContentBody>
          <Table striped highlightOnHover withTableBorder withColumnBorders>
            <Table.Thead>
              <Table.Tr>
                <Table.Th>{t("jsonSchema.tableKeyword")}</Table.Th>
                <Table.Th>{t("jsonSchema.tableDescription")}</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              <Table.Tr>
                <Table.Td>
                  <StyledInlineCode>$schema</StyledInlineCode>
                </Table.Td>
                <Table.Td>{t("jsonSchema.schemaKeywordDesc")}</Table.Td>
              </Table.Tr>
              <Table.Tr>
                <Table.Td>
                  <StyledInlineCode>title</StyledInlineCode>
                </Table.Td>
                <Table.Td>{t("jsonSchema.titleKeywordDesc")}</Table.Td>
              </Table.Tr>
              <Table.Tr>
                <Table.Td>
                  <StyledInlineCode>description</StyledInlineCode>
                </Table.Td>
                <Table.Td>{t("jsonSchema.descriptionKeywordDesc")}</Table.Td>
              </Table.Tr>
              <Table.Tr>
                <Table.Td>
                  <StyledInlineCode>type</StyledInlineCode>
                </Table.Td>
                <Table.Td>{t("jsonSchema.typeKeywordDesc")}</Table.Td>
              </Table.Tr>
              <Table.Tr>
                <Table.Td>
                  <StyledInlineCode>properties</StyledInlineCode>
                </Table.Td>
                <Table.Td>{t("jsonSchema.propertiesKeywordDesc")}</Table.Td>
              </Table.Tr>
              <Table.Tr>
                <Table.Td>
                  <StyledInlineCode>required</StyledInlineCode>
                </Table.Td>
                <Table.Td>{t("jsonSchema.requiredKeywordDesc")}</Table.Td>
              </Table.Tr>
              <Table.Tr>
                <Table.Td>
                  <StyledInlineCode>enum</StyledInlineCode>
                </Table.Td>
                <Table.Td>{t("jsonSchema.enumKeywordDesc")}</Table.Td>
              </Table.Tr>
              <Table.Tr>
                <Table.Td>
                  <StyledInlineCode>minimum</StyledInlineCode>
                </Table.Td>
                <Table.Td>{t("jsonSchema.minimumKeywordDesc")}</Table.Td>
              </Table.Tr>
              <Table.Tr>
                <Table.Td>
                  <StyledInlineCode>maximum</StyledInlineCode>
                </Table.Td>
                <Table.Td>{t("jsonSchema.maximumKeywordDesc")}</Table.Td>
              </Table.Tr>
              <Table.Tr>
                <Table.Td>
                  <StyledInlineCode>minLength</StyledInlineCode>
                </Table.Td>
                <Table.Td>Minimum length for strings</Table.Td>
              </Table.Tr>
              <Table.Tr>
                <Table.Td>
                  <StyledInlineCode>maxLength</StyledInlineCode>
                </Table.Td>
                <Table.Td>Maximum length for strings</Table.Td>
              </Table.Tr>
              <Table.Tr>
                <Table.Td>
                  <StyledInlineCode>pattern</StyledInlineCode>
                </Table.Td>
                <Table.Td>Regular expression pattern for strings</Table.Td>
              </Table.Tr>
              <Table.Tr>
                <Table.Td>
                  <StyledInlineCode>items</StyledInlineCode>
                </Table.Td>
                <Table.Td>Schema for array items</Table.Td>
              </Table.Tr>
              <Table.Tr>
                <Table.Td>
                  <StyledInlineCode>minItems</StyledInlineCode>
                </Table.Td>
                <Table.Td>Minimum number of items in array</Table.Td>
              </Table.Tr>
              <Table.Tr>
                <Table.Td>
                  <StyledInlineCode>maxItems</StyledInlineCode>
                </Table.Td>
                <Table.Td>Maximum number of items in array</Table.Td>
              </Table.Tr>
            </Table.Tbody>
          </Table>
        </StyledContentBody>
      </Paper>

      <Paper bg="white" c="black" p="xl" radius="md" withBorder>
        <Title id="practical-examples" mb="md" order={2} c="dark">
          {t("jsonSchema.practicalExamplesTitle")}
        </Title>
        <StyledContentBody>
          <div>
            <Text fw={600} mb="xs">
              Example 1: Simple User Schema
            </Text>
            <CodeBlock
              code={
                '{\n  "$schema": "http://json-schema.org/draft-07/schema#",\n  "title": "User",\n  "type": "object",\n  "properties": {\n    "username": {\n      "type": "string",\n      "minLength": 3,\n      "maxLength": 20\n    },\n    "email": {\n      "type": "string",\n      "format": "email"\n    },\n    "age": {\n      "type": "integer",\n      "minimum": 0,\n      "maximum": 120\n    }\n  },\n  "required": ["username", "email"]\n}'
              }
            />
            <Text c="dimmed" size="sm" mt="xs">
              Valid JSON:
            </Text>
            <CodeBlock
              code={'{\n  "username": "john_doe",\n  "email": "john@example.com",\n  "age": 30\n}'}
            />
          </div>

          <Divider my="md" />

          <div>
            <Text fw={600} mb="xs">
              Example 2: Product with Enum
            </Text>
            <CodeBlock
              code={
                '{\n  "$schema": "http://json-schema.org/draft-07/schema#",\n  "title": "Product",\n  "type": "object",\n  "properties": {\n    "name": {\n      "type": "string"\n    },\n    "category": {\n      "type": "string",\n      "enum": ["electronics", "clothing", "food", "books"]\n    },\n    "price": {\n      "type": "number",\n      "minimum": 0\n    },\n    "inStock": {\n      "type": "boolean"\n    }\n  },\n  "required": ["name", "category", "price"]\n}'
              }
            />
          </div>

          <Divider my="md" />

          <div>
            <Text fw={600} mb="xs">
              Example 3: Array of Objects
            </Text>
            <CodeBlock
              code={
                '{\n  "$schema": "http://json-schema.org/draft-07/schema#",\n  "title": "Users List",\n  "type": "object",\n  "properties": {\n    "users": {\n      "type": "array",\n      "items": {\n        "type": "object",\n        "properties": {\n          "id": {\n            "type": "integer"\n          },\n          "name": {\n            "type": "string"\n          }\n        },\n        "required": ["id", "name"]\n      },\n      "minItems": 1\n    }\n  },\n  "required": ["users"]\n}'
              }
            />
            <Text c="dimmed" size="sm" mt="xs">
              Valid JSON:
            </Text>
            <CodeBlock
              code={
                '{\n  "users": [\n    { "id": 1, "name": "Alice" },\n    { "id": 2, "name": "Bob" }\n  ]\n}'
              }
            />
          </div>

          <Divider my="md" />

          <div>
            <Text fw={600} mb="xs">
              Example 4: Nested Objects
            </Text>
            <CodeBlock
              code={
                '{\n  "$schema": "http://json-schema.org/draft-07/schema#",\n  "title": "Person",\n  "type": "object",\n  "properties": {\n    "name": {\n      "type": "string"\n    },\n    "address": {\n      "type": "object",\n      "properties": {\n        "street": {\n          "type": "string"\n        },\n        "city": {\n          "type": "string"\n        },\n        "zipCode": {\n          "type": "string",\n          "pattern": "^[0-9]{5}$"\n        }\n      },\n      "required": ["street", "city", "zipCode"]\n    }\n  },\n  "required": ["name", "address"]\n}'
              }
            />
          </div>

          <Divider my="md" />

          <div>
            <Text fw={600} mb="xs">
              Example 5: String Pattern Validation
            </Text>
            <CodeBlock
              code={
                '{\n  "$schema": "http://json-schema.org/draft-07/schema#",\n  "title": "Contact",\n  "type": "object",\n  "properties": {\n    "phone": {\n      "type": "string",\n      "pattern": "^\\\\+?[1-9]\\\\d{1,14}$",\n      "description": "Phone number in E.164 format"\n    },\n    "website": {\n      "type": "string",\n      "format": "uri"\n    }\n  }\n}'
              }
            />
          </div>

          <Divider my="md" />

          <div>
            <Text fw={600} mb="xs">
              Example 6: Advanced Schema with Definitions
            </Text>
            <Text c="dimmed" size="sm" mb="xs">
              {t("jsonSchema.example6Desc")}
            </Text>
            <CodeBlock
              code={
                '{\n  "$schema": "http://json-schema.org/draft-04/schema#",\n  "title": "Vehicle",\n  "type": "object",\n  "properties": {\n    "vehicle": {\n      "$ref": "#/definitions/VehicleType"\n    }\n  },\n  "definitions": {\n    "VehicleType": {\n      "type": "object",\n      "description": "A conveyance designed to carry an operator, passengers and/or cargo",\n      "properties": {\n        "identification": {\n          "$ref": "#/definitions/IdentificationType"\n        },\n        "msrpAmount": {\n          "$ref": "#/definitions/AmountType"\n        },\n        "axleQuantity": {\n          "type": "integer",\n          "minimum": 0,\n          "description": "Number of axles"\n        }\n      },\n      "required": ["identification"]\n    },\n    "IdentificationType": {\n      "type": "object",\n      "description": "A unique identification",\n      "properties": {\n        "id": {\n          "type": "string",\n          "description": "An identifier"\n        }\n      },\n      "required": ["id"]\n    },\n    "AmountType": {\n      "type": "object",\n      "description": "An amount of money",\n      "properties": {\n        "amount": {\n          "type": "number",\n          "minimum": 0\n        },\n        "currency": {\n          "type": "string",\n          "enum": ["USD", "EUR", "GBP"],\n          "description": "Currency code"\n        }\n      },\n      "required": ["amount", "currency"]\n    }\n  }\n}'
              }
            />
            <Text c="dimmed" size="sm" mt="xs">
              Valid JSON:
            </Text>
            <CodeBlock
              code={
                '{\n  "vehicle": {\n    "identification": {\n      "id": "VIN123456789"\n    },\n    "msrpAmount": {\n      "amount": 25000,\n      "currency": "USD"\n    },\n    "axleQuantity": 2\n  }\n}'
              }
            />
          </div>
        </StyledContentBody>
      </Paper>

      <Paper bg="white" c="black" p="xl" radius="md" withBorder>
        <Title id="definitions" mb="md" order={2} c="dark">
          {t("jsonSchema.definitionsTitle")}
        </Title>
        <StyledContentBody>
          <Text>
            {t("jsonSchema.definitionsDesc1")} <StyledInlineCode>definitions</StyledInlineCode>{" "}
            {t("jsonSchema.definitionsDesc2")} <StyledInlineCode>$ref</StyledInlineCode>.
          </Text>
          <Text fw={600} mt="md" mb="xs">
            Benefits:
          </Text>
          <Text>• {t("jsonSchema.benefit1Def")}</Text>
          <Text>• {t("jsonSchema.benefit2Def")}</Text>
          <Text>• {t("jsonSchema.benefit3Def")}</Text>
          <Text>• {t("jsonSchema.benefit4Def")}</Text>
          <Text fw={600} mt="md" mb="xs">
            Example:
          </Text>
          <CodeBlock
            code={
              '{\n  "definitions": {\n    "Address": {\n      "type": "object",\n      "properties": {\n        "street": { "type": "string" },\n        "city": { "type": "string" }\n      }\n    }\n  },\n  "properties": {\n    "billingAddress": {\n      "$ref": "#/definitions/Address"\n    },\n    "shippingAddress": {\n      "$ref": "#/definitions/Address"\n    }\n  }\n}'
            }
          />
        </StyledContentBody>
      </Paper>

      <Paper bg="white" c="black" p="xl" radius="md" withBorder>
        <Title id="data-types" mb="md" order={2} c="dark">
          {t("jsonSchema.dataTypesTitle")}
        </Title>
        <StyledContentBody>
          <Table striped highlightOnHover withTableBorder withColumnBorders>
            <Table.Thead>
              <Table.Tr>
                <Table.Th>{t("jsonSchema.tableType")}</Table.Th>
                <Table.Th>{t("jsonSchema.tableDescription")}</Table.Th>
                <Table.Th>{t("jsonSchema.tableExample")}</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              <Table.Tr>
                <Table.Td>
                  <StyledInlineCode>string</StyledInlineCode>
                </Table.Td>
                <Table.Td>{t("jsonSchema.stringTypeDesc")}</Table.Td>
                <Table.Td>
                  <StyledInlineCode>&quot;hello&quot;</StyledInlineCode>
                </Table.Td>
              </Table.Tr>
              <Table.Tr>
                <Table.Td>
                  <StyledInlineCode>number</StyledInlineCode>
                </Table.Td>
                <Table.Td>{t("jsonSchema.numberTypeDesc")}</Table.Td>
                <Table.Td>
                  <StyledInlineCode>42</StyledInlineCode>, <StyledInlineCode>3.14</StyledInlineCode>
                </Table.Td>
              </Table.Tr>
              <Table.Tr>
                <Table.Td>
                  <StyledInlineCode>integer</StyledInlineCode>
                </Table.Td>
                <Table.Td>{t("jsonSchema.integerTypeDesc")}</Table.Td>
                <Table.Td>
                  <StyledInlineCode>42</StyledInlineCode>
                </Table.Td>
              </Table.Tr>
              <Table.Tr>
                <Table.Td>
                  <StyledInlineCode>boolean</StyledInlineCode>
                </Table.Td>
                <Table.Td>{t("jsonSchema.booleanTypeDesc")}</Table.Td>
                <Table.Td>
                  <StyledInlineCode>true</StyledInlineCode>,{" "}
                  <StyledInlineCode>false</StyledInlineCode>
                </Table.Td>
              </Table.Tr>
              <Table.Tr>
                <Table.Td>
                  <StyledInlineCode>object</StyledInlineCode>
                </Table.Td>
                <Table.Td>{t("jsonSchema.objectTypeDesc")}</Table.Td>
                <Table.Td>
                  <StyledInlineCode>{'{"key": "value"}'}</StyledInlineCode>
                </Table.Td>
              </Table.Tr>
              <Table.Tr>
                <Table.Td>
                  <StyledInlineCode>array</StyledInlineCode>
                </Table.Td>
                <Table.Td>{t("jsonSchema.arrayTypeDesc")}</Table.Td>
                <Table.Td>
                  <StyledInlineCode>[1, 2, 3]</StyledInlineCode>
                </Table.Td>
              </Table.Tr>
              <Table.Tr>
                <Table.Td>
                  <StyledInlineCode>null</StyledInlineCode>
                </Table.Td>
                <Table.Td>{t("jsonSchema.nullTypeDesc")}</Table.Td>
                <Table.Td>
                  <StyledInlineCode>null</StyledInlineCode>
                </Table.Td>
              </Table.Tr>
            </Table.Tbody>
          </Table>
        </StyledContentBody>
      </Paper>

      <Paper bg="white" c="black" p="xl" radius="md" withBorder>
        <Title id="string-formats" mb="md" order={2} c="dark">
          {t("jsonSchema.stringFormatsTitle")}
        </Title>
        <StyledContentBody>
          <Text mb="md">{t("jsonSchema.stringFormatsDesc")}</Text>
          <Table striped highlightOnHover withTableBorder withColumnBorders>
            <Table.Thead>
              <Table.Tr>
                <Table.Th>{t("jsonSchema.tableFormat")}</Table.Th>
                <Table.Th>{t("jsonSchema.tableDescription")}</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              <Table.Tr>
                <Table.Td>
                  <StyledInlineCode>date-time</StyledInlineCode>
                </Table.Td>
                <Table.Td>{t("jsonSchema.dateTimeFormatDesc")}</Table.Td>
              </Table.Tr>
              <Table.Tr>
                <Table.Td>
                  <StyledInlineCode>date</StyledInlineCode>
                </Table.Td>
                <Table.Td>{t("jsonSchema.dateFormatDesc")}</Table.Td>
              </Table.Tr>
              <Table.Tr>
                <Table.Td>
                  <StyledInlineCode>time</StyledInlineCode>
                </Table.Td>
                <Table.Td>{t("jsonSchema.timeFormatDesc")}</Table.Td>
              </Table.Tr>
              <Table.Tr>
                <Table.Td>
                  <StyledInlineCode>email</StyledInlineCode>
                </Table.Td>
                <Table.Td>{t("jsonSchema.emailFormatDesc")}</Table.Td>
              </Table.Tr>
              <Table.Tr>
                <Table.Td>
                  <StyledInlineCode>uri</StyledInlineCode>
                </Table.Td>
                <Table.Td>{t("jsonSchema.uriFormatDesc")}</Table.Td>
              </Table.Tr>
              <Table.Tr>
                <Table.Td>
                  <StyledInlineCode>hostname</StyledInlineCode>
                </Table.Td>
                <Table.Td>{t("jsonSchema.hostnameFormatDesc")}</Table.Td>
              </Table.Tr>
              <Table.Tr>
                <Table.Td>
                  <StyledInlineCode>ipv4</StyledInlineCode>
                </Table.Td>
                <Table.Td>{t("jsonSchema.ipv4FormatDesc")}</Table.Td>
              </Table.Tr>
              <Table.Tr>
                <Table.Td>
                  <StyledInlineCode>ipv6</StyledInlineCode>
                </Table.Td>
                <Table.Td>{t("jsonSchema.ipv6FormatDesc")}</Table.Td>
              </Table.Tr>
            </Table.Tbody>
          </Table>
        </StyledContentBody>
      </Paper>

      <Paper bg="white" c="black" p="xl" radius="md" withBorder>
        <Title id="tips" mb="md" order={2} c="dark">
          {t("jsonSchema.tipsTitle")}
        </Title>
        <StyledContentBody>
          <div>
            <Text fw={600}>{t("jsonSchema.tip0")}</Text>
            <Text>{t("jsonSchema.tip0Desc")}</Text>
          </div>
          <div>
            <Text fw={600}>{t("jsonSchema.tipUseDesc")}</Text>
            <Text>
              {t("jsonSchema.tipUseDescText1")} <StyledInlineCode>description</StyledInlineCode>{" "}
              {t("jsonSchema.tipUseDescText2")}
            </Text>
          </div>
          <div>
            <Text fw={600}>{t("jsonSchema.tip1")}</Text>
            <Text>{t("jsonSchema.tip1Desc")}</Text>
          </div>
          <div>
            <Text fw={600}>{t("jsonSchema.tip2")}</Text>
            <Text>{t("jsonSchema.tip2Desc")}</Text>
          </div>
          <div>
            <Text fw={600}>{t("jsonSchema.tip3")}</Text>
            <Text>{t("jsonSchema.tip3Desc")}</Text>
          </div>
          <div>
            <Text fw={600}>{t("jsonSchema.tip4")}</Text>
            <Text>{t("jsonSchema.tip4Desc")}</Text>
          </div>
        </StyledContentBody>
      </Paper>
    </DocsLayout>
  );
};

export default JsonSchemaView;
