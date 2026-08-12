import React, { useCallback } from "react";
import Link from "next/link";
import styled from "styled-components";

const StyledLogoWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  color: ${({ theme }) => theme.TEXT_NORMAL};
`;

const StyledTitle = styled.span<{ $fontSize: string }>`
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

export interface LogoProps extends React.ComponentPropsWithoutRef<"div"> {
  fontSize?: string;
  hideLogo?: boolean;
  hideText?: boolean;
}

export const JSONCrackLogo: React.FC<LogoProps> = ({
  fontSize = "1.2rem",
  hideText,
  hideLogo,
  ...props
}) => {
  const handleLogoClick = useCallback((event: React.MouseEvent<HTMLAnchorElement>) => {
    if (typeof window === "undefined") return;
    if (!window.location.href.includes("widget")) return;

    event.preventDefault();
    window.open("/", "_blank", "noopener,noreferrer");
  }, []);

  return (
    <Link href="/" prefetch={false} target="_self" onClick={handleLogoClick}>
      <StyledLogoWrapper data-logo-hidden={hideLogo}>
        {!hideText && (
          <StyledTitle $fontSize={fontSize} {...props}>
            JSON VIZ
          </StyledTitle>
        )}
      </StyledLogoWrapper>
    </Link>
  );
};
