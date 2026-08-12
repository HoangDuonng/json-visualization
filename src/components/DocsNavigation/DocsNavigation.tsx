import React from "react";
import Link from "next/link";
import { Text, type TextProps } from "@mantine/core";
import styled from "styled-components";

export interface DocsNavItem {
  label: string;
  title: string;
  href: string;
}

export interface DocsNavigationProps {
  title: string;
  previous?: DocsNavItem;
  next?: DocsNavItem;
}

const StyledNavCard = styled.div`
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

const StyledNavLabel = styled(Text)<TextProps & any>`
  text-transform: uppercase;
  letter-spacing: 0.1em;
  font-size: 0.7rem;
  margin: 0 0 0.5rem;
  color: var(--public-text-subtle);
`;

const StyledNavigation = styled.nav`
  padding-block: clamp(2.5rem, 6vw, 4rem);
  border-block: 1px solid var(--public-border);

  h3 {
    margin: 0 0 1.5rem;
    color: var(--public-text);
    font-size: clamp(1.4rem, 3vw, 2rem);
    font-weight: 500;
  }
`;

const StyledNavGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const StyledNavItem = styled.div<{ $align?: "left" | "right" }>`
  grid-column: ${props => (props.$align === "right" ? "2 / 3" : "auto")};

  @media (max-width: 768px) {
    grid-column: auto;
  }
`;

export const DocsNavigation: React.FC<DocsNavigationProps> = ({ title, previous, next }) => {
  if (!previous && !next) {
    return null;
  }

  return (
    <StyledNavigation aria-label={title}>
      <h3>{title}</h3>
      <StyledNavGrid>
        {previous && (
          <StyledNavItem>
            <Link
              href={previous.href}
              style={{ textDecoration: "none", color: "inherit" }}
              aria-label={`${previous.label}: ${previous.title}`}
            >
              <StyledNavCard>
                <StyledNavLabel>{previous.label}</StyledNavLabel>
                <Text fw={600}>{previous.title}</Text>
              </StyledNavCard>
            </Link>
          </StyledNavItem>
        )}
        {next && (
          <StyledNavItem $align={previous ? "left" : "right"}>
            <Link
              href={next.href}
              style={{ textDecoration: "none", color: "inherit" }}
              aria-label={`${next.label}: ${next.title}`}
            >
              <StyledNavCard>
                <StyledNavLabel>{next.label}</StyledNavLabel>
                <Text fw={600}>{next.title}</Text>
              </StyledNavCard>
            </Link>
          </StyledNavItem>
        )}
      </StyledNavGrid>
    </StyledNavigation>
  );
};
