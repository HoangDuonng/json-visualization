import React from "react";
import { StyledGlassSurface } from "./styles";

export interface GlassSurfaceProps {
  children: React.ReactNode;
  blur?: number;
  opacity?: number;
  borderRadius?: number;
  padding?: string;
  className?: string;
  style?: React.CSSProperties;
}

export const GlassSurface: React.FC<GlassSurfaceProps> = ({
  children,
  blur = 2,
  opacity = 0.05,
  borderRadius = 999,
  padding = "8px 24px",
  className,
  style,
}) => {
  return (
    <StyledGlassSurface
      $blur={blur}
      $opacity={opacity}
      $borderRadius={borderRadius}
      $padding={padding}
      className={className}
      style={style}
    >
      {children}
    </StyledGlassSurface>
  );
};
