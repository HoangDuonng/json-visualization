import Link from "next/link";
import styled from "styled-components";

export const PublicContainer = styled.div<{ $narrow?: boolean; $wide?: boolean }>`
  width: min(
    calc(100% - (2 * var(--public-gutter))),
    ${props =>
      props.$narrow
        ? "var(--public-reading-width)"
        : props.$wide
          ? "var(--public-wide-width)"
          : "var(--public-container-width)"}
  );
  margin-inline: auto;
`;

export const PublicPageHeader = styled.header`
  padding-block: clamp(4.5rem, 9vw, 8rem) clamp(3rem, 6vw, 5rem);
  border-bottom: 1px solid var(--public-border);
`;

export const PublicEyebrow = styled.p`
  margin: 0 0 1.25rem;
  color: var(--public-text-subtle);
  font-size: var(--public-type-meta);
  font-weight: 650;
  letter-spacing: 0.12em;
  line-height: 1.4;
  text-transform: uppercase;
`;

export const PublicDisplay = styled.h1`
  max-width: 15ch;
  margin: 0;
  color: var(--public-text);
  font-size: var(--public-type-display);
  font-weight: 500;
  letter-spacing: -0.045em;
  line-height: 0.98;
`;

export const PublicLead = styled.p`
  max-width: 42rem;
  margin: 1.75rem 0 0;
  color: var(--public-text-muted);
  font-size: var(--public-type-lead);
  line-height: 1.55;
`;

export const PublicSection = styled.section`
  padding-block: var(--public-section-space);
  border-bottom: 1px solid var(--public-border);
`;

export const PublicSectionHeading = styled.h2`
  max-width: 18ch;
  margin: 0;
  color: var(--public-text);
  font-size: var(--public-type-section);
  font-weight: 500;
  letter-spacing: -0.035em;
  line-height: 1.08;
`;

export const PublicActions = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin-top: 2rem;
`;

export const PublicPrimaryLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 2.75rem;
  padding: 0.7rem 1rem;
  border: 1px solid var(--public-accent);
  border-radius: var(--public-radius-sm);
  background: var(--public-accent);
  color: var(--public-accent-contrast);
  font-size: 0.875rem;
  font-weight: 650;
  line-height: 1;
  text-decoration: none;
  transition:
    background-color var(--public-motion),
    border-color var(--public-motion),
    transform var(--public-motion);

  &:hover {
    background: var(--public-accent-hover);
    border-color: var(--public-accent-hover);
    transform: translateY(-1px);
  }

  &:focus-visible {
    outline: 2px solid var(--public-accent);
    outline-offset: 3px;
  }
`;

export const PublicSecondaryLink = styled(PublicPrimaryLink)`
  background: transparent;
  border-color: var(--public-border-strong);
  color: var(--public-text);

  &:hover {
    background: var(--public-surface-raised);
    border-color: var(--public-text);
  }
`;

export const PublicTextLink = styled(Link)`
  color: var(--public-text);
  font-weight: 650;
  text-decoration: underline;
  text-decoration-color: var(--public-border-strong);
  text-decoration-thickness: 1px;
  text-underline-offset: 0.25em;

  &:hover {
    color: var(--public-accent);
    text-decoration-color: currentColor;
  }

  &:focus-visible {
    outline: 2px solid var(--public-accent);
    outline-offset: 3px;
  }
`;

export const PublicToolHeader = styled.header`
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  gap: 2rem;
  align-items: end;
  padding-block: clamp(3.5rem, 7vw, 6rem) 2.5rem;
  border-bottom: 1px solid var(--public-border);

  h1 {
    max-width: 18ch;
    margin: 0;
    font-size: var(--public-type-page-title);
    font-weight: 500;
    letter-spacing: -0.04em;
    line-height: 1.05;
  }

  p {
    max-width: 42rem;
    margin: 1rem 0 0;
    color: var(--public-text-muted);
    font-size: var(--public-type-body-lg);
    line-height: 1.6;
  }

  @media (max-width: 720px) {
    grid-template-columns: 1fr;
  }
`;

export const PublicToolGrid = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1fr) 2rem minmax(0, 1fr);
  gap: 1.25rem;
  align-items: center;
  padding-block: 2.5rem;

  @media (max-width: 900px) {
    grid-template-columns: minmax(0, 1fr);

    & > [data-tool-arrow] {
      display: none;
    }
  }
`;

export const PublicToolPanel = styled.div`
  min-width: 0;
  overflow: hidden;
  border: 1px solid var(--public-border-strong);
  border-radius: var(--public-radius-md);
  background: var(--public-surface);
`;

export const PublicToolPanelHeader = styled.div`
  display: flex;
  min-height: 2.75rem;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  padding-inline: 0.875rem;
  border-bottom: 1px solid var(--public-border);
  background: var(--public-surface-raised);
  color: var(--public-text-muted);
  font-size: var(--public-type-meta);
  font-weight: 650;
  letter-spacing: 0.08em;
  text-transform: uppercase;

  & > * {
    width: 100%;
  }
`;
