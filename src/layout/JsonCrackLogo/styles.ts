import styled from "styled-components";

export const StyledLogoWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  color: ${({ theme }) => theme.TEXT_NORMAL};
`;

export const StyledTitle = styled.span<{ $fontSize: string }>`
  font-weight: 400;
  margin: 0;
  font-family: "Playfair Display", "Sagittaire Display", serif;
  font-size: ${({ $fontSize }) => $fontSize};
  white-space: nowrap;
  z-index: 10;
  vertical-align: middle;
  color: currentColor;
  text-shadow: 0 0 20px rgba(255, 255, 255, 0.5);
  letter-spacing: -0.02em;
`;
