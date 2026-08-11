import React from "react";
import {
  PublicContainer,
  PublicEyebrow,
  PublicSection,
  PublicSectionHeading,
} from "src/layout/PageLayout/PublicPage";
import { StyledEditorialGrid, StyledSectionIntro } from "../StorySection/styles";
import { StyledWorkflow, StyledWorkflowList } from "./styles";

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

export const WorkflowsSection: React.FC = () => {
  return (
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
  );
};
