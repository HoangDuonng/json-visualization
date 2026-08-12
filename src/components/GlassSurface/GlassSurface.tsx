import React from "react";
import styled from "styled-components";

export interface GlassSurfaceProps {
  children: React.ReactNode;
  blur?: number;
  opacity?: number;
  borderRadius?: number;
  padding?: string;
  className?: string;
  style?: React.CSSProperties;
}

const StyledGlassSurface = styled.div<{
  $blur: number;
  $opacity: number;
  $borderRadius: number;
  $padding: string;
}>`
  position: relative;
  display: inline-flex;
  background: rgba(255, 255, 255, ${({ $opacity }) => $opacity});
  backdrop-filter: blur(${({ $blur }) => $blur}px) saturate(180%);
  -webkit-backdrop-filter: blur(${({ $blur }) => $blur}px) saturate(180%);
  border: 1px solid rgba(255, 255, 255, 0.18);
  border-radius: ${({ $borderRadius }) => $borderRadius}px;
  padding: ${({ $padding }) => $padding};
  box-shadow:
    0 8px 32px 0 rgba(31, 38, 135, 0.15),
    inset 0 1px 0 0 rgba(255, 255, 255, 0.3),
    inset 0 -1px 0 0 rgba(255, 255, 255, 0.1);
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(
      135deg,
      rgba(255, 255, 255, 0.1) 0%,
      rgba(255, 255, 255, 0.05) 50%,
      rgba(255, 255, 255, 0) 100%
    );
    pointer-events: none;
  }

  & > * {
    position: relative;
    z-index: 1;
  }
`;

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
