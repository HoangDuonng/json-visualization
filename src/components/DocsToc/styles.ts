import styled from "styled-components";

export const StyledTocCard = styled.nav`
  padding-block: 1.5rem;
  border-block: 1px solid var(--public-border);

  h3 {
    margin: 0 0 1rem;
    color: var(--public-text);
    font-size: 1.2rem;
    font-weight: 500;
  }
`;

export const StyledTocList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.65rem;
`;

export const StyledTocLink = styled.a`
  color: var(--public-text-muted);
  text-decoration: none;
  font-weight: 500;
  font-size: 0.95rem;

  &:hover {
    color: var(--public-accent);
    text-decoration: underline;
    text-underline-offset: 0.2em;
  }
`;
