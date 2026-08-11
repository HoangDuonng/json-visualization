import React from "react";
import Link from "next/link";
import { Accordion, Image } from "@mantine/core";
import styled from "styled-components";
import { BsFiletypeCsv, BsFiletypeJson, BsFiletypeXml, BsFiletypeYml } from "react-icons/bs";
import Questions from "../../data/faq.json";
import {
  PublicActions,
  PublicContainer,
  PublicDisplay,
  PublicEyebrow,
  PublicLead,
  PublicPrimaryLink,
  PublicSecondaryLink,
  PublicSection,
  PublicSectionHeading,
} from "../PageLayout/PublicPage";

const StyledHero = styled.section`
  padding-block: clamp(5rem, 12vw, 10rem) clamp(3.5rem, 8vw, 7rem);
  border-bottom: 1px solid var(--public-border);
`;

const StyledHeroGrid = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1.55fr) minmax(16rem, 0.65fr);
  gap: clamp(3rem, 8vw, 8rem);
  align-items: end;

  @media (max-width: 820px) {
    grid-template-columns: 1fr;
  }
`;

const StyledHeroAside = styled.aside`
  padding-top: 1.25rem;
  border-top: 1px solid var(--public-border-strong);

  p {
    margin: 0;
    color: var(--public-text-muted);
    font-size: 0.9rem;
    line-height: 1.65;
  }
`;

const StyledHeroVisual = styled.div`
  margin-top: 1.25rem;
  overflow: hidden;
  border-radius: var(--public-radius-md);

  img {
    display: block;
    width: 100%;
    height: auto;
    object-fit: contain;
  }
`;

const StyledMeta = styled.dl`
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 0.7rem 1.5rem;
  margin: 1.5rem 0 0;
  font-size: 0.75rem;

  dt {
    color: var(--public-text-subtle);
  }

  dd {
    margin: 0;
    color: var(--public-text);
    font-weight: 650;
  }
`;

const StyledPreviewSection = styled.section`
  padding-block: clamp(2rem, 5vw, 4rem) var(--public-section-space);
  border-bottom: 1px solid var(--public-border);
`;

const StyledPreviewMeta = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 2rem;
  padding-bottom: 1rem;
  color: var(--public-text-subtle);
  font-size: var(--public-type-meta);
  font-weight: 650;
  letter-spacing: 0.1em;
  text-transform: uppercase;
`;

const StyledPreview = styled.div`
  overflow: hidden;
  border: 1px solid var(--public-border-strong);
  border-radius: var(--public-radius-md);
  background: var(--public-code-bg);

  img {
    display: block;
    width: 100%;
    height: auto;
  }
`;

const StyledEditorialGrid = styled.div`
  display: grid;
  grid-template-columns: minmax(14rem, 0.7fr) minmax(0, 1.3fr);
  gap: clamp(3rem, 10vw, 10rem);

  @media (max-width: 800px) {
    grid-template-columns: 1fr;
  }
`;

const StyledSectionIntro = styled.div`
  p {
    max-width: 31rem;
    margin: 1.5rem 0 0;
    color: var(--public-text-muted);
    font-size: var(--public-type-body-lg);
    line-height: 1.7;
  }
`;

const StyledStoryList = styled.ol`
  margin: 0;
  padding: 0;
  list-style: none;
  counter-reset: story;
`;

const StyledStoryItem = styled.li`
  display: grid;
  grid-template-columns: 3rem minmax(0, 1fr) 14rem;
  gap: 1.5rem;
  align-items: center;
  padding-block: 1.75rem;
  border-top: 1px solid var(--public-border);
  counter-increment: story;

  &::before {
    content: "0" counter(story);
    color: var(--public-text-subtle);
    font-size: var(--public-type-meta);
    font-weight: 650;
    letter-spacing: 0.08em;
  }

  &:last-child {
    border-bottom: 1px solid var(--public-border);
  }

  h3 {
    margin: 0;
    font-family: inherit;
    font-size: 1rem;
    font-weight: 700;
  }

  p {
    max-width: 37rem;
    margin: 0.6rem 0 0;
    color: var(--public-text-muted);
    font-size: 0.925rem;
    line-height: 1.65;
  }

  .step-visual {
    width: 100%;
    height: auto;
    border-radius: 6px;
    object-fit: contain;
    transition: transform 0.2s ease;

    &:hover {
      transform: translateY(-2px);
    }
  }

  @media (max-width: 768px) {
    grid-template-columns: 3rem minmax(0, 1fr);

    .step-visual {
      grid-column: 2 / -1;
      max-width: 18rem;
    }
  }
`;

const StyledWorkflowList = styled.div`
  border-top: 1px solid var(--public-border-strong);
`;

const StyledWorkflow = styled(Link)`
  display: grid;
  grid-template-columns: minmax(10rem, 0.75fr) minmax(0, 1fr) auto;
  gap: 2rem;
  align-items: start;
  padding-block: 1.75rem;
  border-bottom: 1px solid var(--public-border);
  color: inherit;
  text-decoration: none;
  transition: color var(--public-motion);

  h3 {
    margin: 0;
    font-family: inherit;
    font-size: 1rem;
    font-weight: 700;
  }

  p {
    margin: 0;
    color: var(--public-text-muted);
    font-size: 0.9rem;
    line-height: 1.6;
  }

  span {
    transition: transform var(--public-motion);
  }

  &:hover {
    color: var(--public-accent);

    span {
      transform: translateX(4px);
    }
  }

  &:focus-visible {
    outline: 2px solid var(--public-accent);
    outline-offset: 4px;
  }

  @media (max-width: 680px) {
    grid-template-columns: 1fr auto;
    gap: 0.75rem;

    p {
      grid-column: 1 / -1;
    }
  }
`;

const StyledFormats = styled.div`
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  border-top: 1px solid var(--public-border-strong);
  border-left: 1px solid var(--public-border);

  @media (max-width: 640px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
`;

const StyledFormat = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 15rem;
  padding: 1.25rem;
  border-right: 1px solid var(--public-border);
  border-bottom: 1px solid var(--public-border);
  background: var(--public-surface);
  transition:
    background var(--public-motion),
    border-color var(--public-motion);

  &:hover {
    background: var(--public-surface-raised, #ffffff);

    .format-icon {
      color: var(--public-accent);
      transform: translateY(-2px);
    }
  }

  .format-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  strong {
    display: block;
    font-family: var(--public-font-mono);
    font-size: 1.1rem;
    font-weight: 700;
    color: var(--public-text);
  }

  .format-icon {
    color: var(--public-text-subtle);
    transition:
      color var(--public-motion),
      transform var(--public-motion);
  }

  .format-code {
    margin-block: 0.75rem;
    padding: 0.5rem 0.6rem;
    border-radius: 6px;
    background: #f3f2ee;
    border: 1px solid #d9d9d3;
    font-family: var(--public-font-mono, monospace);
    font-size: 0.685rem;
    line-height: 1.4;
    letter-spacing: -0.01em;
    color: #1a1a1a;
    white-space: pre;
    overflow: hidden;
  }

  .format-footer {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 0.4rem;
    margin-top: 0.25rem;
  }

  span {
    display: block;
    color: var(--public-text-subtle);
    font-size: var(--public-type-meta);
    letter-spacing: 0.08em;
    text-transform: uppercase;
    line-height: 1.3;
  }

  .format-link {
    color: var(--public-accent);
    font-size: 0.75rem;
    font-weight: 650;
    text-decoration: none;
    transition: transform var(--public-motion);

    &:hover {
      text-decoration: underline;
    }
  }
`;

const StyledFAQ = styled.div`
  .mantine-Accordion-item {
    border: 0;
    border-bottom: 1px solid var(--public-border);
    border-radius: 0;
    background: transparent;
  }

  .mantine-Accordion-control {
    padding: 1.25rem 0;
    color: var(--public-text);
    font-size: 0.95rem;
    font-weight: 650;
  }

  .mantine-Accordion-content {
    max-width: 42rem;
    padding: 0 0 1.5rem;
    color: var(--public-text-muted);
    font-size: 0.9rem;
    line-height: 1.7;
  }
`;

const workflows = [
  {
    title: "Understand structure",
    description:
      "Turn nested data into an interactive graph or tree without tracing braces by hand.",
    href: "/docs/visualization",
  },
  {
    title: "Convert formats",
    description: "Move between JSON, YAML, XML, and CSV in a focused two-pane workspace.",
    href: "/converter/json-to-yaml",
  },
  {
    title: "Generate types",
    description: "Create TypeScript, Go, Rust, Kotlin, or Dart definitions from structured input.",
    href: "/type/json-to-typescript",
  },
  {
    title: "Work with schemas",
    description: "Generate JSON Schema, validate data, and produce representative mock JSON.",
    href: "/tools/json-schema",
  },
];

export const EditorialHome = () => {
  return (
    <>
      <StyledHero>
        <PublicContainer>
          <StyledHeroGrid>
            <div>
              <PublicEyebrow>Open-source · Structured data workspace</PublicEyebrow>
              <PublicDisplay>See the shape of your data.</PublicDisplay>
              <PublicLead>
                JSON Visualization turns JSON, YAML, XML, and CSV into readable graphs—then helps
                you inspect, convert, validate, and generate code from the same data.
              </PublicLead>
              <PublicActions>
                <PublicPrimaryLink href="/editor">Open the visual editor</PublicPrimaryLink>
                <PublicSecondaryLink href="/docs">Read the docs</PublicSecondaryLink>
              </PublicActions>
            </div>
            <StyledHeroAside>
              <p>
                Built for developers who need to understand unfamiliar payloads quickly. Your data
                stays in the browser while you work.
              </p>
              <StyledHeroVisual>
                <Image src="/assets/bf2-image.png" alt="JSON Payload to Graph transformation" />
              </StyledHeroVisual>
              <StyledMeta>
                <dt>Input formats</dt>
                <dd>4</dd>
                <dt>Type targets</dt>
                <dd>5</dd>
              </StyledMeta>
            </StyledHeroAside>
          </StyledHeroGrid>
        </PublicContainer>
      </StyledHero>

      <StyledPreviewSection>
        <PublicContainer $wide>
          <StyledPreviewMeta>
            <span>Product view</span>
            <span>Graph · Tree · Code</span>
          </StyledPreviewMeta>
          <StyledPreview>
            <Image
              src="/assets/editor.webp"
              loading="eager"
              alt="JSON Visualization editor showing structured data as an interactive graph"
            />
          </StyledPreview>
        </PublicContainer>
      </StyledPreviewSection>

      <PublicSection>
        <PublicContainer>
          <StyledEditorialGrid>
            <StyledSectionIntro>
              <PublicEyebrow>From payload to picture</PublicEyebrow>
              <PublicSectionHeading>
                Less time parsing. More time understanding.
              </PublicSectionHeading>
              <p>
                Start with raw structured data and move directly to the representation your task
                needs—without switching between disconnected utilities.
              </p>
            </StyledSectionIntro>
            <StyledStoryList>
              <StyledStoryItem>
                <div>
                  <h3>Bring data in</h3>
                  <p>Paste content, open a file, or load a URL in the visual editor.</p>
                </div>
                <Image
                  src="/assets/step1-visual.png"
                  alt="Bring data in step visual"
                  className="step-visual"
                />
              </StyledStoryItem>
              <StyledStoryItem>
                <div>
                  <h3>Read relationships</h3>
                  <p>Navigate nested objects and arrays as a graph or compact tree.</p>
                </div>
                <Image
                  src="/assets/step2-visual.png"
                  alt="Read relationships step visual"
                  className="step-visual"
                />
              </StyledStoryItem>
              <StyledStoryItem>
                <div>
                  <h3>Ship the result</h3>
                  <p>Export a diagram, convert formats, validate structure, or generate types.</p>
                </div>
                <Image
                  src="/assets/step3-visual.png"
                  alt="Ship the result step visual"
                  className="step-visual"
                />
              </StyledStoryItem>
            </StyledStoryList>
          </StyledEditorialGrid>
        </PublicContainer>
      </PublicSection>

      <PublicSection>
        <PublicContainer>
          <StyledEditorialGrid>
            <StyledSectionIntro>
              <PublicEyebrow>Workflows</PublicEyebrow>
              <PublicSectionHeading>One toolkit, several ways forward.</PublicSectionHeading>
            </StyledSectionIntro>
            <StyledWorkflowList>
              {workflows.map(workflow => (
                <StyledWorkflow key={workflow.title} href={workflow.href}>
                  <h3>{workflow.title}</h3>
                  <p>{workflow.description}</p>
                  <span aria-hidden="true">→</span>
                </StyledWorkflow>
              ))}
            </StyledWorkflowList>
          </StyledEditorialGrid>
        </PublicContainer>
      </PublicSection>

      <PublicSection>
        <PublicContainer>
          <StyledEditorialGrid>
            <StyledSectionIntro>
              <PublicEyebrow>Formats</PublicEyebrow>
              <PublicSectionHeading>Meet data where it already lives.</PublicSectionHeading>
              <p>
                Visualize and transform the formats that show up across APIs, configuration,
                exports, and integration work.
              </p>
            </StyledSectionIntro>
            <StyledFormats>
              {[
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
              ].map(({ name, use, Icon, href, code }) => (
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

      <PublicSection>
        <PublicContainer>
          <StyledEditorialGrid>
            <StyledSectionIntro>
              <PublicEyebrow>Documentation</PublicEyebrow>
              <PublicSectionHeading>Go deeper when the workflow demands it.</PublicSectionHeading>
              <p>
                Learn the visual editor, JsonDraw, format validation, jq, JSONPath, schema tools,
                and image export with focused guides.
              </p>
              <PublicActions>
                <PublicPrimaryLink href="/docs">Explore documentation</PublicPrimaryLink>
              </PublicActions>
            </StyledSectionIntro>
            <StyledFAQ id="faq">
              <PublicEyebrow>Frequently asked</PublicEyebrow>
              <Accordion>
                {Questions.map(({ title, content }) => (
                  <Accordion.Item key={title} value={title}>
                    <Accordion.Control>{title}</Accordion.Control>
                    <Accordion.Panel>{content}</Accordion.Panel>
                  </Accordion.Item>
                ))}
              </Accordion>
            </StyledFAQ>
          </StyledEditorialGrid>
        </PublicContainer>
      </PublicSection>
    </>
  );
};
