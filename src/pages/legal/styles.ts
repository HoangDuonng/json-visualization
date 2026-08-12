import styled from "styled-components";

export const StyledTitle = styled.h1`
  max-width: 16ch;
  margin: 0;
  color: var(--public-text);
  font-size: var(--public-type-page-title);
  font-weight: 500;
  letter-spacing: -0.04em;
  line-height: 1.05;
`;

export const StyledUpdated = styled.p`
  margin: 1.25rem 0 0;
  color: var(--public-text-muted);
  font-size: var(--public-type-meta);
`;

export const StyledDocument = styled.div`
  padding-block: clamp(2.5rem, 6vw, 5rem);

  section {
    padding-block: 2rem;
    border-top: 1px solid var(--public-border);
  }

  section:first-child {
    padding-top: 0;
    border-top: 0;
  }

  h2 {
    margin: 0 0 1.25rem;
    color: var(--public-text);
    font-size: clamp(1.35rem, 3vw, 1.75rem);
    font-weight: 500;
    letter-spacing: -0.025em;
  }

  p {
    margin: 0.875rem 0 0;
    color: var(--public-text-muted);
    font-size: var(--public-type-body);
    line-height: 1.75;
  }

  p[data-list-item="true"] {
    padding-left: 1rem;
  }
`;
