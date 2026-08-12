import React from "react";
import { Text } from "@mantine/core";
import styled from "styled-components";

export interface DocsTocItem {
  id: string;
  label: string;
}

export interface DocsTocProps {
  title: string;
  items: DocsTocItem[];
}

const StyledTocCard = styled.nav`
  padding-block: 1.5rem;
  border-block: 1px solid var(--public-border);

  h3 {
    margin: 0 0 1rem;
    color: var(--public-text);
    font-size: 1.2rem;
    font-weight: 500;
  }
`;

const StyledTocList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.65rem;
`;

const StyledTocLink = styled.a`
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

export const DocsToc: React.FC<DocsTocProps> = ({ title, items }) => {
  if (!items.length) return null;

  return (
    <StyledTocCard aria-label={title}>
      <h3>{title}</h3>
      <StyledTocList>
        {items.map(item => (
          <Text key={item.id}>
            <StyledTocLink href={`#${item.id}`}>{item.label}</StyledTocLink>
          </Text>
        ))}
      </StyledTocList>
    </StyledTocCard>
  );
};
