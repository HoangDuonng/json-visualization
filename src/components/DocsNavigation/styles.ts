import { Text, type TextProps } from "@mantine/core";
import styled from "styled-components";

export const StyledNavCard = styled.div`
  height: 100%;
  cursor: pointer;
  padding: 1.25rem 0;
  border-top: 1px solid var(--public-border);
  color: var(--public-text);
  transition: border-color var(--public-motion);

  &:hover {
    border-color: var(--public-accent);
  }
`;

export const StyledNavLabel = styled(Text)<TextProps & any>`
  text-transform: uppercase;
  letter-spacing: 0.1em;
  font-size: 0.7rem;
  margin: 0 0 0.5rem;
  color: var(--public-text-subtle);
`;

export const StyledNavigation = styled.nav`
  padding-block: clamp(2.5rem, 6vw, 4rem);
  border-block: 1px solid var(--public-border);

  h3 {
    margin: 0 0 1.5rem;
    color: var(--public-text);
    font-size: clamp(1.4rem, 3vw, 2rem);
    font-weight: 500;
  }
`;

export const StyledNavGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

export const StyledNavItem = styled.div<{ $align?: "left" | "right" }>`
  grid-column: ${props => (props.$align === "right" ? "2 / 3" : "auto")};

  @media (max-width: 768px) {
    grid-column: auto;
  }
`;
