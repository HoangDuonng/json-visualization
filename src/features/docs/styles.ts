import { Paper } from "@mantine/core";
import styled from "styled-components";
import { PublicContainer } from "../../layout/PageLayout/PublicPage";

export const StyledDocsContainer = styled(PublicContainer)`
  padding-block: clamp(3rem, 7vw, 6rem);
  & > .mantine-Stack-root {
    gap: 0;
  }
  & > .mantine-Stack-root > div:first-child {
    padding-bottom: 3rem;
    border-bottom: 1px solid var(--public-border);
  }
  & > .mantine-Stack-root > .mantine-Paper-root {
    padding: clamp(2.5rem, 6vw, 4rem) 0;
    border: 0;
    border-bottom: 1px solid var(--public-border);
    border-radius: 0;
    background: transparent;
  }
  h1 {
    font-size: var(--public-type-page-title);
    letter-spacing: -0.04em;
    line-height: 1.05;
  }
  @media (max-width: 480px) {
    & > .mantine-Stack-root > div:first-child {
      flex-direction: column;
      align-items: flex-start !important;
      gap: 1.5rem;
    }
  }
`;

export const StyledContentBody = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  line-height: 1.7;
`;

export const StyledFeatureCard = styled(Paper)<any>`
  cursor: pointer;
  border: 0;
  border-top: 1px solid var(--public-border);
  border-radius: 0;
  transition: border-color var(--public-motion);
  height: 100%;
  background: var(--site-surface, #fffdf7);
  color: var(--site-text, #1a1a1a);
  border-color: var(--site-border, #e8e4db);

  &:hover {
    border-color: var(--public-accent);
  }
`;

export const StyledLink = styled.a`
  color: var(--site-text, #1a1a1a);
  text-decoration: none;
  font-weight: 500;

  &:hover {
    text-decoration: underline;
    text-decoration-color: var(--site-accent, #37ff8b);
    text-decoration-thickness: 3px;
  }
`;

export const StyledDocsPaper = styled(Paper)<any>`
  background: var(--site-surface, #fffdf7);
  color: var(--site-text, #1a1a1a);
  border-color: var(--site-border, #e8e4db);
`;
