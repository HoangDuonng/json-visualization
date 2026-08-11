import React from "react";
import { Alert, Divider, Paper, Text, Title } from "@mantine/core";
import { VscError, VscPass } from "react-icons/vsc";
import { CodeBlock } from "src/components/CodeBlock";
import { DocsToc } from "src/components/DocsToc";
import { StyledContentBody, StyledLink } from "src/features/docs/components/DocPrimitives/styles";
import { DocsLayout } from "src/features/docs/components/DocsLayout";
import { useDocsTranslation } from "src/features/docs/hooks/useDocsTranslation";

export const FormatValidateView: React.FC = () => {
  const { t, getLocalizedLink } = useDocsTranslation();

  const tocItems = [
    { id: "what-is", label: t("formatValidate.whatIsTitle") },
    { id: "supported-formats", label: t("formatValidate.supportedFormatsTitle") },
    { id: "how-to-use", label: t("formatValidate.howToUseTitle") },
    { id: "common-errors", label: t("formatValidate.commonErrorsTitle") },
    { id: "formatting-options", label: t("formatValidate.formattingOptionsTitle") },
    { id: "tips", label: t("formatValidate.tipsTitle") },
  ];

  return (
    <DocsLayout
      slug="format-validate"
      title={t("formatValidate.title")}
      subtitle={t("formatValidate.subtitle")}
      alertText={t("formatValidate.alert")}
      previous={{
        title: t("formatConversion.title"),
        href: getLocalizedLink("/docs/format-conversion"),
      }}
      next={{
        title: t("typeGeneration.title"),
        href: getLocalizedLink("/docs/type-generation"),
      }}
    >
      <DocsToc title={t("common.onThisPage")} items={tocItems} />

      <Paper bg="white" c="black" p="xl" radius="md" withBorder>
        <Title id="what-is" mb="md" order={2} c="dark">
          {t("formatValidate.whatIsTitle")}
        </Title>
        <StyledContentBody>
          <Text>{t("formatValidate.whatIsDesc")}</Text>
          <div>
            <Text fw={600} mt="md" mb="xs">
              {t("formatValidate.formattingTitle")}
            </Text>
            <Text>{t("formatValidate.formattingDesc")}</Text>
          </div>
          <div>
            <Text fw={600} mt="md" mb="xs">
              {t("formatValidate.validationTitle")}
            </Text>
            <Text>{t("formatValidate.validationDesc")}</Text>
          </div>
        </StyledContentBody>
      </Paper>

      <Paper bg="white" c="black" p="xl" radius="md" withBorder>
        <Title id="supported-formats" mb="md" order={2} c="dark">
          {t("formatValidate.supportedFormatsTitle")}
        </Title>
        <StyledContentBody>
          <Text>{t("formatValidate.supportedFormatsDesc")}</Text>
          <div>
            <Text fw={600} mt="md" mb="xs">
              {t("formatValidate.jsonTitle")}
            </Text>
            <Text>• {t("formatValidate.jsonFeature1")}</Text>
            <Text>• {t("formatValidate.jsonFeature2")}</Text>
            <Text>• {t("formatValidate.jsonFeature3")}</Text>
            <Text>• {t("formatValidate.jsonFeature4")}</Text>
          </div>
          <div>
            <Text fw={600} mt="md" mb="xs">
              {t("formatValidate.yamlTitle")}
            </Text>
            <Text>• {t("formatValidate.yamlFeature1")}</Text>
            <Text>• {t("formatValidate.yamlFeature2")}</Text>
            <Text>• {t("formatValidate.yamlFeature3")}</Text>
            <Text>• {t("formatValidate.yamlFeature4")}</Text>
          </div>
          <div>
            <Text fw={600} mt="md" mb="xs">
              {t("formatValidate.csvTitle")}
            </Text>
            <Text>• {t("formatValidate.csvFeature1")}</Text>
            <Text>• {t("formatValidate.csvFeature2")}</Text>
            <Text>• {t("formatValidate.csvFeature3")}</Text>
            <Text>• {t("formatValidate.csvFeature4")}</Text>
          </div>
        </StyledContentBody>
      </Paper>

      <Paper bg="white" c="black" p="xl" radius="md" withBorder>
        <Title id="how-to-use" mb="md" order={2} c="dark">
          {t("formatValidate.howToUseTitle")}
        </Title>
        <StyledContentBody>
          <div>
            <Text fw={600} mb="xs">
              {t("formatValidate.autoFormattingTitle")}
            </Text>
            <Text>
              {t("formatValidate.autoFormatStep1")}{" "}
              <StyledLink href={getLocalizedLink("/editor")}>{t("common.editor")}</StyledLink>
            </Text>
            <Text>{t("formatValidate.autoFormatStep2")}</Text>
            <Text>{t("formatValidate.autoFormatStep3")}</Text>
            <Text>{t("formatValidate.autoFormatStep4")}</Text>
          </div>

          <Divider my="md" />

          <div>
            <Text fw={600} mb="xs">
              {t("formatValidate.realtimeValidationTitle")}
            </Text>
            <Text>{t("formatValidate.realtimeStep1")}</Text>
            <Text>{t("formatValidate.realtimeStep2")}</Text>
            <Text>{t("formatValidate.realtimeStep3")}</Text>
            <Text>{t("formatValidate.realtimeStep4")}</Text>
          </div>

          <Divider my="md" />

          <div>
            <Text fw={600} mb="xs">
              {t("formatValidate.errorNavigationTitle")}
            </Text>
            <Text>{t("formatValidate.errorNavStep1")}</Text>
            <Text>{t("formatValidate.errorNavStep2")}</Text>
            <Text>{t("formatValidate.errorNavStep3")}</Text>
          </div>
        </StyledContentBody>
      </Paper>

      <Paper bg="white" c="black" p="xl" radius="md" withBorder>
        <Title id="common-errors" mb="md" order={2} c="dark">
          {t("formatValidate.commonErrorsTitle")}
        </Title>
        <StyledContentBody>
          <div>
            <Text fw={600} mb="md">
              JSON Errors
            </Text>

            <div>
              <Alert icon={<VscError size={20} />} color="red" variant="light" mb="md">
                <Text fw={600}>{t("formatValidate.missingComma")}</Text>
              </Alert>
              <Text mb="xs">{t("formatValidate.invalid")}</Text>
              <CodeBlock code={'{\n  "name": "John"\n  "age": 30\n}'} />
              <Alert icon={<VscPass size={20} />} color="green" variant="light" mt="md" mb="md">
                <Text fw={600}>{t("formatValidate.valid")}</Text>
              </Alert>
              <CodeBlock code={'{\n  "name": "John",\n  "age": 30\n}'} />
            </div>

            <Divider my="md" />

            <div>
              <Alert icon={<VscError size={20} />} color="red" variant="light" mb="md">
                <Text fw={600}>{t("formatValidate.trailingComma")}</Text>
              </Alert>
              <Text mb="xs">{t("formatValidate.invalid")}</Text>
              <CodeBlock code={'{\n  "name": "John",\n  "age": 30,\n}'} />
              <Alert icon={<VscPass size={20} />} color="green" variant="light" mt="md" mb="md">
                <Text fw={600}>{t("formatValidate.valid")}</Text>
              </Alert>
              <CodeBlock code={'{\n  "name": "John",\n  "age": 30\n}'} />
            </div>

            <Divider my="md" />

            <div>
              <Alert icon={<VscError size={20} />} color="red" variant="light" mb="md">
                <Text fw={600}>{t("formatValidate.unquotedKeys")}</Text>
              </Alert>
              <Text mb="xs">{t("formatValidate.invalid")}</Text>
              <CodeBlock code={'{\n  name: "John",\n  age: 30\n}'} />
              <Alert icon={<VscPass size={20} />} color="green" variant="light" mt="md" mb="md">
                <Text fw={600}>{t("formatValidate.valid")}</Text>
              </Alert>
              <CodeBlock code={'{\n  "name": "John",\n  "age": 30\n}'} />
            </div>

            <Divider my="md" />

            <div>
              <Alert icon={<VscError size={20} />} color="red" variant="light" mb="md">
                <Text fw={600}>{t("formatValidate.singleQuotes")}</Text>
              </Alert>
              <Text mb="xs">{t("formatValidate.invalid")}</Text>
              <CodeBlock code={"{\n  'name': 'John',\n  'age': 30\n}"} />
              <Alert icon={<VscPass size={20} />} color="green" variant="light" mt="md" mb="md">
                <Text fw={600}>{t("formatValidate.valid")}</Text>
              </Alert>
              <CodeBlock code={'{\n  "name": "John",\n  "age": 30\n}'} />
            </div>
          </div>

          <Divider my="xl" />

          <div>
            <Text fw={600} mb="md">
              YAML Errors
            </Text>

            <div>
              <Alert icon={<VscError size={20} />} color="red" variant="light" mb="md">
                <Text fw={600}>{t("formatValidate.inconsistentIndentation")}</Text>
              </Alert>
              <Text mb="xs">{t("formatValidate.invalid")}</Text>
              <CodeBlock code={"person:\n  name: John\n   age: 30"} />
              <Alert icon={<VscPass size={20} />} color="green" variant="light" mt="md" mb="md">
                <Text fw={600}>{t("formatValidate.valid")}</Text>
              </Alert>
              <CodeBlock code={"person:\n  name: John\n  age: 30"} />
            </div>

            <Divider my="md" />

            <div>
              <Alert icon={<VscError size={20} />} color="red" variant="light" mb="md">
                <Text fw={600}>{t("formatValidate.missingSpaceAfterColon")}</Text>
              </Alert>
              <Text mb="xs">{t("formatValidate.invalid")}</Text>
              <CodeBlock code={"name:John\nage:30"} />
              <Alert icon={<VscPass size={20} />} color="green" variant="light" mt="md" mb="md">
                <Text fw={600}>{t("formatValidate.valid")}</Text>
              </Alert>
              <CodeBlock code={"name: John\nage: 30"} />
            </div>
          </div>

          <Divider my="xl" />

          <div>
            <Text fw={600} mb="md">
              CSV Errors
            </Text>

            <div>
              <Alert icon={<VscError size={20} />} color="red" variant="light" mb="md">
                <Text fw={600}>{t("formatValidate.inconsistentColumnCount")}</Text>
              </Alert>
              <Text mb="xs">{t("formatValidate.invalid")}</Text>
              <CodeBlock code={"name,age,city\nJohn,30,New York\nJane,25"} />
              <Alert icon={<VscPass size={20} />} color="green" variant="light" mt="md" mb="md">
                <Text fw={600}>{t("formatValidate.valid")}</Text>
              </Alert>
              <CodeBlock code={"name,age,city\nJohn,30,New York\nJane,25,Boston"} />
            </div>
          </div>
        </StyledContentBody>
      </Paper>

      <Paper bg="white" c="black" p="xl" radius="md" withBorder>
        <Title id="formatting-options" mb="md" order={2} c="dark">
          {t("formatValidate.formattingOptionsTitle")}
        </Title>
        <StyledContentBody>
          <Text>{t("formatValidate.formattingOptionsDesc")}</Text>
          <div>
            <Text fw={600} mt="md" mb="xs">
              {t("formatValidate.indentationTitle")}
            </Text>
            <Text>• {t("formatValidate.indentOption1")}</Text>
            <Text>• {t("formatValidate.indentOption2")}</Text>
            <Text>• {t("formatValidate.indentOption3")}</Text>
          </div>
          <div>
            <Text fw={600} mt="md" mb="xs">
              {t("formatValidate.lineBreaksTitle")}
            </Text>
            <Text>• {t("formatValidate.lineBreak1")}</Text>
            <Text>• {t("formatValidate.lineBreak2")}</Text>
          </div>
          <div>
            <Text fw={600} mt="md" mb="xs">
              {t("formatValidate.sortingTitle")}
            </Text>
            <Text>• {t("formatValidate.sorting1")}</Text>
            <Text>• {t("formatValidate.sorting2")}</Text>
          </div>
        </StyledContentBody>
      </Paper>

      <Paper bg="white" c="black" p="xl" radius="md" withBorder>
        <Title id="tips" mb="md" order={2} c="dark">
          {t("formatValidate.tipsTitle")}
        </Title>
        <StyledContentBody>
          <div>
            <Text fw={600}>{t("formatValidate.tip1")}</Text>
            <Text>{t("formatValidate.tip1Desc")}</Text>
          </div>
          <div>
            <Text fw={600}>{t("formatValidate.tip2")}</Text>
            <Text>{t("formatValidate.tip2Desc")}</Text>
          </div>
          <div>
            <Text fw={600}>{t("formatValidate.tip3")}</Text>
            <Text>{t("formatValidate.tip3Desc")}</Text>
          </div>
          <div>
            <Text fw={600}>{t("formatValidate.tip4")}</Text>
            <Text>{t("formatValidate.tip4Desc")}</Text>
          </div>
          <div>
            <Text fw={600}>{t("formatValidate.tip5")}</Text>
            <Text>
              {t("formatValidate.tip5Desc")}{" "}
              <StyledLink href={getLocalizedLink("/docs/json-schema")}>JSON Schema</StyledLink>{" "}
              {t("formatValidate.tip5Desc2")}
            </Text>
          </div>
        </StyledContentBody>
      </Paper>
    </DocsLayout>
  );
};

export default FormatValidateView;
