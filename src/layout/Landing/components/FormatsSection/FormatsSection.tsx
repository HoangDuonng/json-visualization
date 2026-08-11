import React from "react";
import Link from "next/link";
import { BsFiletypeCsv, BsFiletypeJson, BsFiletypeXml, BsFiletypeYml } from "react-icons/bs";
import {
  PublicContainer,
  PublicEyebrow,
  PublicSection,
  PublicSectionHeading,
} from "src/layout/PageLayout/PublicPage";
import { StyledEditorialGrid, StyledSectionIntro } from "../StorySection/styles";
import { StyledFormat, StyledFormats } from "./styles";

const formatsData = [
  {
    name: "JSON",
    use: "APIs & payloads",
    Icon: BsFiletypeJson,
    href: "/converter/json-to-yaml",
    code: '{\n  "id": 104,\n  "ok": true\n}',
  },
  {
    name: "YAML",
    use: "Configuration",
    Icon: BsFiletypeYml,
    href: "/converter/yaml-to-json",
    code: "id: 104\nok: true",
  },
  {
    name: "XML",
    use: "Integrations",
    Icon: BsFiletypeXml,
    href: "/converter/xml-to-json",
    code: '<user id="1">\n  <ok/>\n</user>',
  },
  {
    name: "CSV",
    use: "Tabular exports",
    Icon: BsFiletypeCsv,
    href: "/converter/csv-to-json",
    code: "id,status\n104,active",
  },
];

export const FormatsSection: React.FC = () => {
  return (
    <PublicSection>
      <PublicContainer>
        <StyledEditorialGrid>
          <StyledSectionIntro>
            <PublicEyebrow>Formats</PublicEyebrow>
            <PublicSectionHeading>Meet data where it already lives.</PublicSectionHeading>
            <p>
              Visualize and transform the formats that show up across APIs, configuration, exports,
              and integration work.
            </p>
          </StyledSectionIntro>
          <StyledFormats>
            {formatsData.map(({ name, use, Icon, href, code }) => (
              <StyledFormat key={name}>
                <div className="format-header">
                  <strong>{name}</strong>
                  <Icon size={26} className="format-icon" />
                </div>
                <div className="format-code">
                  <code>{code}</code>
                </div>
                <div className="format-footer">
                  <span>{use}</span>
                  <Link href={href} className="format-link">
                    Convert →
                  </Link>
                </div>
              </StyledFormat>
            ))}
          </StyledFormats>
        </StyledEditorialGrid>
      </PublicContainer>
    </PublicSection>
  );
};
