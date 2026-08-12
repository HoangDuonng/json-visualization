import React from "react";
import Link from "next/link";
import { Text } from "@mantine/core";
import {
  StyledNavCard,
  StyledNavGrid,
  StyledNavItem,
  StyledNavLabel,
  StyledNavigation,
} from "./styles";

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
