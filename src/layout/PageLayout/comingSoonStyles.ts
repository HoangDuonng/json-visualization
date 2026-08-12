import styled from "styled-components";

export const StyledHighlights = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  margin-top: 2.5rem;
  border-top: 1px solid var(--public-border);

  @media (max-width: 720px) {
    grid-template-columns: 1fr;
  }
`;

export const StyledHighlight = styled.div`
  padding: 1.5rem 1.5rem 1.5rem 0;
  border-bottom: 1px solid var(--public-border);

  & + & {
    padding-left: 1.5rem;
    border-left: 1px solid var(--public-border);
  }

  @media (max-width: 720px) {
    padding-inline: 0;

    & + & {
      padding-left: 0;
      border-left: 0;
    }
  }
`;

export const StyledHighlightTitle = styled.h3`
  margin: 0 0 0.5rem;
  color: var(--public-text);
  font-size: var(--public-type-body);
  font-weight: 650;
`;

export const StyledHighlightText = styled.p`
  margin: 0;
  color: var(--public-text-muted);
  font-size: var(--public-type-body);
  line-height: 1.6;
`;
