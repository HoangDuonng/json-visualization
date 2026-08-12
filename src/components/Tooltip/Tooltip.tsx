import React, { useState, useEffect } from "react";
import styled from "styled-components";

const StyledTooltipWrapper = styled.div`
  position: relative;
  display: inline-block;
`;

export interface TooltipProps {
  children: React.ReactNode;
  content: string;
  targetId?: string;
}

export const Tooltip: React.FC<TooltipProps> = ({ children, content, targetId }) => {
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (!targetId) return;

    const target = document.getElementById(targetId);
    if (!target) return;

    if (isHovered && content) {
      target.style.outline = "2px solid #1a1a1a";
      target.style.outlineOffset = "2px";
      target.setAttribute("data-tooltip", content);
    } else {
      target.style.outline = "";
      target.style.outlineOffset = "";
      target.removeAttribute("data-tooltip");
    }
  }, [isHovered, targetId, content]);

  if (!content) return <>{children}</>;

  return (
    <StyledTooltipWrapper
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {children}
    </StyledTooltipWrapper>
  );
};
