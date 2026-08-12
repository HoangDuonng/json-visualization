import React from "react";
import { Text } from "@mantine/core";
import { StyledTocCard, StyledTocLink, StyledTocList } from "./styles";

export interface DocsTocItem {
  id: string;
  label: string;
}

export interface DocsTocProps {
  title: string;
  items: DocsTocItem[];
}

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
