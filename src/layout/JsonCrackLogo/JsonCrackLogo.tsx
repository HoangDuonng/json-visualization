import React, { useCallback } from "react";
import Link from "next/link";
import { StyledLogoWrapper, StyledTitle } from "./styles";

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

export default JSONCrackLogo;
