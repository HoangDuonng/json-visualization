import React from "react";
import { Divider, Paper, SimpleGrid, Text, Title } from "@mantine/core";
import { CodeBlock } from "src/components/CodeBlock";
import {
  StyledContentBody,
  StyledInlineCode,
} from "src/features/docs/components/DocPrimitives/styles";
import { DocsLayout } from "src/features/docs/components/DocsLayout";
import { useDocsTranslation } from "src/features/docs/hooks/useDocsTranslation";

export const TypeGenerationView: React.FC = () => {
  const { t, getLocalizedLink } = useDocsTranslation();

  return (
    <DocsLayout
      slug="type-generation"
      title={t("typeGeneration.title")}
      subtitle={t("typeGeneration.subtitle")}
      alertText={t("typeGeneration.alert")}
      previous={{
        title: t("formatValidate.title"),
        href: getLocalizedLink("/docs/format-validate"),
      }}
      next={{
        title: t("jsonSchema.title"),
        href: getLocalizedLink("/docs/json-schema"),
      }}
    >
      <Paper bg="white" c="black" p="xl" radius="md" withBorder>
        <Title mb="md" order={2} c="dark">
          {t("typeGeneration.whatIsTitle")}
        </Title>
        <StyledContentBody>
          <Text>{t("typeGeneration.whatIsDesc")}</Text>
          <Text fw={600} mt="md" mb="xs">
            {t("typeGeneration.benefitsTitle")}
          </Text>
          <Text>• {t("typeGeneration.benefit1")}</Text>
          <Text>• {t("typeGeneration.benefit2")}</Text>
          <Text>• {t("typeGeneration.benefit3")}</Text>
          <Text>• {t("typeGeneration.benefit4")}</Text>
          <Text>• {t("typeGeneration.benefit5")}</Text>
        </StyledContentBody>
      </Paper>

      <Paper bg="white" c="black" p="xl" radius="md" withBorder>
        <Title mb="md" order={2} c="dark">
          {t("typeGeneration.supportedTitle")}
        </Title>
        <StyledContentBody>
          <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="lg">
            <div>
              <Text fw={600} mb="xs">
                {t("typeGeneration.typescript")}
              </Text>
              <Text size="sm" c="dimmed">
                {t("typeGeneration.typescriptDesc")}
              </Text>
            </div>
            <div>
              <Text fw={600} mb="xs">
                {t("typeGeneration.go")}
              </Text>
              <Text size="sm" c="dimmed">
                {t("typeGeneration.goDesc")}
              </Text>
            </div>
            <div>
              <Text fw={600} mb="xs">
                {t("typeGeneration.rust")}
              </Text>
              <Text size="sm" c="dimmed">
                {t("typeGeneration.rustDesc")}
              </Text>
            </div>
            <div>
              <Text fw={600} mb="xs">
                {t("typeGeneration.kotlin")}
              </Text>
              <Text size="sm" c="dimmed">
                {t("typeGeneration.kotlinDesc")}
              </Text>
            </div>
          </SimpleGrid>
        </StyledContentBody>
      </Paper>

      <Paper bg="white" c="black" p="xl" radius="md" withBorder>
        <Title mb="md" order={2} c="dark">
          {t("typeGeneration.howToTitle")}
        </Title>
        <StyledContentBody>
          <div>
            <Text fw={600} mb="xs">
              {t("typeGeneration.step1")}
            </Text>
            <Text>{t("typeGeneration.step1Desc")}</Text>
          </div>
          <div>
            <Text fw={600} mb="xs">
              {t("typeGeneration.step2")}
            </Text>
            <Text>{t("typeGeneration.step2Desc")}</Text>
          </div>
          <div>
            <Text fw={600} mb="xs">
              {t("typeGeneration.step3")}
            </Text>
            <Text>{t("typeGeneration.step3Desc")}</Text>
          </div>
          <div>
            <Text fw={600} mb="xs">
              {t("typeGeneration.step4")}
            </Text>
            <Text>{t("typeGeneration.step4Desc")}</Text>
          </div>
        </StyledContentBody>
      </Paper>

      <Paper bg="white" c="black" p="xl" radius="md" withBorder>
        <Title mb="md" order={2} c="dark">
          {t("typeGeneration.examplesTitle")}
        </Title>
        <StyledContentBody>
          <Text fw={600} mb="xs">
            {t("typeGeneration.inputLabel")}
          </Text>
          <CodeBlock
            code={
              '{\n  "user": {\n    "id": 1,\n    "name": "John Doe",\n    "email": "john@example.com",\n    "isActive": true,\n    "roles": ["admin", "user"],\n    "profile": {\n      "age": 30,\n      "city": "New York"\n    }\n  }\n}'
            }
          />

          <Divider my="md" />

          <div>
            <Text fw={600} mb="xs">
              TypeScript Output:
            </Text>
            <CodeBlock
              code={
                "export interface Root {\n  user: User;\n}\n\nexport interface User {\n  id: number;\n  name: string;\n  email: string;\n  isActive: boolean;\n  roles: string[];\n  profile: Profile;\n}\n\nexport interface Profile {\n  age: number;\n  city: string;\n}"
              }
            />
          </div>

          <Divider my="md" />

          <div>
            <Text fw={600} mb="xs">
              Go Output:
            </Text>
            <CodeBlock
              code={
                'type Root struct {\n    User User `json:"user"`\n}\n\ntype User struct {\n    ID       int      `json:"id"`\n    Name     string   `json:"name"`\n    Email    string   `json:"email"`\n    IsActive bool     `json:"isActive"`\n    Roles    []string `json:"roles"`\n    Profile  Profile  `json:"profile"`\n}\n\ntype Profile struct {\n    Age  int    `json:"age"`\n    City string `json:"city"`\n}'
              }
            />
          </div>

          <Divider my="md" />

          <div>
            <Text fw={600} mb="xs">
              Rust Output:
            </Text>
            <CodeBlock
              code={
                'use serde::{Deserialize, Serialize};\n\n#[derive(Serialize, Deserialize)]\npub struct Root {\n    pub user: User,\n}\n\n#[derive(Serialize, Deserialize)]\npub struct User {\n    pub id: i32,\n    pub name: String,\n    pub email: String,\n    #[serde(rename = "isActive")]\n    pub is_active: bool,\n    pub roles: Vec<String>,\n    pub profile: Profile,\n}\n\n#[derive(Serialize, Deserialize)]\npub struct Profile {\n    pub age: i32,\n    pub city: String,\n}'
              }
            />
          </div>

          <Divider my="md" />

          <div>
            <Text fw={600} mb="xs">
              Kotlin Output:
            </Text>
            <CodeBlock
              code={
                "data class Root(\n    val user: User\n)\n\ndata class User(\n    val id: Int,\n    val name: String,\n    val email: String,\n    val isActive: Boolean,\n    val roles: List<String>,\n    val profile: Profile\n)\n\ndata class Profile(\n    val age: Int,\n    val city: String\n)"
              }
            />
          </div>
        </StyledContentBody>
      </Paper>

      <Paper bg="white" c="black" p="xl" radius="md" withBorder>
        <Title mb="md" order={2} c="dark">
          Type Mapping
        </Title>
        <StyledContentBody>
          <Text mb="md">{t("typeGeneration.typeMappingDesc")}</Text>
          <div>
            <Text fw={600} mb="xs">
              String
            </Text>
            <Text>
              • TypeScript: <StyledInlineCode>string</StyledInlineCode>
            </Text>
            <Text>
              • Go: <StyledInlineCode>string</StyledInlineCode>
            </Text>
            <Text>
              • Rust: <StyledInlineCode>String</StyledInlineCode>
            </Text>
            <Text>
              • Kotlin: <StyledInlineCode>String</StyledInlineCode>
            </Text>
          </div>
          <div>
            <Text fw={600} mt="md" mb="xs">
              Number
            </Text>
            <Text>
              • TypeScript: <StyledInlineCode>number</StyledInlineCode>
            </Text>
            <Text>
              • Go: <StyledInlineCode>int</StyledInlineCode> or{" "}
              <StyledInlineCode>float64</StyledInlineCode>
            </Text>
            <Text>
              • Rust: <StyledInlineCode>i32</StyledInlineCode> or{" "}
              <StyledInlineCode>f64</StyledInlineCode>
            </Text>
            <Text>
              • Kotlin: <StyledInlineCode>Int</StyledInlineCode> or{" "}
              <StyledInlineCode>Double</StyledInlineCode>
            </Text>
          </div>
          <div>
            <Text fw={600} mt="md" mb="xs">
              Boolean
            </Text>
            <Text>
              • TypeScript: <StyledInlineCode>boolean</StyledInlineCode>
            </Text>
            <Text>
              • Go: <StyledInlineCode>bool</StyledInlineCode>
            </Text>
            <Text>
              • Rust: <StyledInlineCode>bool</StyledInlineCode>
            </Text>
            <Text>
              • Kotlin: <StyledInlineCode>Boolean</StyledInlineCode>
            </Text>
          </div>
          <div>
            <Text fw={600} mt="md" mb="xs">
              Array
            </Text>
            <Text>
              • TypeScript: <StyledInlineCode>Type[]</StyledInlineCode>
            </Text>
            <Text>
              • Go: <StyledInlineCode>[]Type</StyledInlineCode>
            </Text>
            <Text>
              • Rust: <StyledInlineCode>Vec&lt;Type&gt;</StyledInlineCode>
            </Text>
            <Text>
              • Kotlin: <StyledInlineCode>List&lt;Type&gt;</StyledInlineCode>
            </Text>
          </div>
          <div>
            <Text fw={600} mt="md" mb="xs">
              Object
            </Text>
            <Text>
              • TypeScript: <StyledInlineCode>interface</StyledInlineCode>
            </Text>
            <Text>
              • Go: <StyledInlineCode>struct</StyledInlineCode>
            </Text>
            <Text>
              • Rust: <StyledInlineCode>struct</StyledInlineCode>
            </Text>
            <Text>
              • Kotlin: <StyledInlineCode>data class</StyledInlineCode>
            </Text>
          </div>
          <div>
            <Text fw={600} mt="md" mb="xs">
              Null
            </Text>
            <Text>
              • TypeScript: <StyledInlineCode>null</StyledInlineCode> or{" "}
              <StyledInlineCode>Type | null</StyledInlineCode>
            </Text>
            <Text>
              • Go: <StyledInlineCode>*Type</StyledInlineCode> (pointer)
            </Text>
            <Text>
              • Rust: <StyledInlineCode>Option&lt;Type&gt;</StyledInlineCode>
            </Text>
            <Text>
              • Kotlin: <StyledInlineCode>Type?</StyledInlineCode>
            </Text>
          </div>
        </StyledContentBody>
      </Paper>

      <Paper bg="white" c="black" p="xl" radius="md" withBorder>
        <Title mb="md" order={2} c="dark">
          {t("typeGeneration.tipsTitle")}
        </Title>
        <StyledContentBody>
          <div>
            <Text fw={600}>{t("typeGeneration.tip1")}</Text>
            <Text>{t("typeGeneration.tip1Desc")}</Text>
          </div>
          <div>
            <Text fw={600}>{t("typeGeneration.tip2")}</Text>
            <Text>{t("typeGeneration.tip2Desc")}</Text>
          </div>
          <div>
            <Text fw={600}>{t("typeGeneration.tip3")}</Text>
            <Text>{t("typeGeneration.tip3Desc")}</Text>
          </div>
          <div>
            <Text fw={600}>{t("typeGeneration.tip4")}</Text>
            <Text>{t("typeGeneration.tip4Desc")}</Text>
          </div>
        </StyledContentBody>
      </Paper>
    </DocsLayout>
  );
};

export default TypeGenerationView;
