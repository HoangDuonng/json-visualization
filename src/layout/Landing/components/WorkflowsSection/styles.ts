import Link from "next/link";
import styled from "styled-components";

export const StyledWorkflowList = styled.div`
  border-top: 1px solid var(--public-border-strong);
`;

export const StyledWorkflow = styled(Link)`
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
