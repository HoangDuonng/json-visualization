import styled from "styled-components";
import { MONO_FONT_FAMILY } from "src/constants/globalStyle";
import { PublicContainer } from "src/layout/PageLayout/PublicPage";

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

  .mantine-Alert-root {
    margin-block: 1.5rem;
    border: 1px solid var(--public-border);
    background: var(--public-surface);
  }

  .mantine-Table-scrollContainer {
    overflow-x: auto;
  }

  @media (max-width: 480px) {
    & > .mantine-Stack-root > div:first-child {
      flex-direction: column;
      gap: 1.5rem;
    }
  }
`;

export const StyledContentBody = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  line-height: 1.7;
`;

export const StyledLink = styled.a`
  color: var(--public-accent);
  text-decoration: none;
  font-weight: 500;

  &:hover {
    text-decoration: underline;
  }
`;

export const StyledInlineCode = styled.code`
  background: #f8f9fa;
  padding: 2px 6px;
  border-radius: 4px;
  font-family: ${MONO_FONT_FAMILY} !important;
  font-size: 0.9em;
  border: 1px solid #e9ecef;
`;
