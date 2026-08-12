import React from "react";
import Link from "next/link";
import styled from "styled-components";
import { formats } from "src/constants/enumData";

const StyledHeader = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 2rem;
  align-items: baseline;
  padding-block: 2rem 1.25rem;

  h2 {
    margin: 0;
    font-size: clamp(1.5rem, 3vw, 2.25rem);
    font-weight: 500;
    letter-spacing: -0.03em;
  }

  span {
    color: var(--public-text-subtle);
    font-size: var(--public-type-meta);
    letter-spacing: 0.1em;
    text-transform: uppercase;
  }
`;

const StyledGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  border-top: 1px solid var(--public-border-strong);

  @media (max-width: 760px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media (max-width: 420px) {
    grid-template-columns: 1fr;
  }
`;

const StyledColumn = styled.div`
  padding: 1.25rem;
  border-right: 1px solid var(--public-border);
  border-bottom: 1px solid var(--public-border);

  &:first-child {
    border-left: 1px solid var(--public-border);
  }

  h3 {
    margin: 0 0 1rem;
    font-family: inherit;
    font-size: var(--public-type-meta);
    letter-spacing: 0.1em;
    text-transform: uppercase;
  }
`;

const StyledLinks = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.65rem;
`;

const StyledLink = styled(Link)`
  color: var(--public-text-muted);
  font-size: 0.825rem;
  text-decoration: none;

  &:hover {
    color: var(--public-accent);
  }
`;

const languages = formats.map(format => format.label);

function groupCombinations(array: string[]): Record<string, string[]> {
  const grouped: Record<string, string[]> = {};
  array.forEach(from => {
    const targets = array.filter(to => to !== from);
    grouped[from] = targets;
  });
  return grouped;
}

const groupedLanguages = groupCombinations(languages);

export const PageLinks: React.FC = () => {
  return (
    <>
      <StyledHeader>
        <h2>Other conversions</h2>
        <span>JSON · YAML · XML · CSV</span>
      </StyledHeader>
      <StyledGrid>
        {Object.entries(groupedLanguages).map(([from, tos]) => (
          <StyledColumn key={from}>
            <h3>From {from}</h3>
            <StyledLinks>
              {tos.map(to => (
                <StyledLink
                  key={to}
                  href={`/converter/${from.toLowerCase()}-to-${to.toLowerCase()}`}
                  prefetch={false}
                >
                  {from} to {to} →
                </StyledLink>
              ))}
            </StyledLinks>
          </StyledColumn>
        ))}
      </StyledGrid>
    </>
  );
};
