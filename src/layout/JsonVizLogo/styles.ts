import styled from "styled-components";

export const StyledLogoWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  width: fit-content;

  &[data-logo-hidden="true"] {
    display: none;
  }
`;

export const StyledTitle = styled.h1<{ $fontSize?: string }>`
  font-family: var(--public-font-display), "Playfair Display", Georgia, serif !important;
  color: var(--public-text);
  font-weight: 700;
  font-size: ${props => props.$fontSize ?? "1.2rem"};
  letter-spacing: -0.04em;
  margin: 0;
  white-space: nowrap;
  user-select: none;
  transition: opacity var(--public-motion);

  &:hover {
    opacity: 0.85;
  }
`;
