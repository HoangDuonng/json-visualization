import type { DefaultTheme } from "styled-components";
import styled from "styled-components";
import { LinkItUrl } from "react-linkify-it";
import { NODE_DIMENSIONS } from "../../../../../constants/graph";

type TextColorFn = {
  theme: DefaultTheme;
  $type?: string;
  $value?: string | number | null | boolean;
};

function getTextColor({ $value, $type, theme }: TextColorFn) {
  const isDark = theme.BACKGROUND_PRIMARY !== "#FFFFFF";
  if ($value === null) return isDark ? "#94a3b8" : "#64748b";
  if ($type === "object") return isDark ? "#818cf8" : "#4f46e5";
  if ($type === "number") return isDark ? "#fbbf24" : "#d97706";
  if ($value === true) return isDark ? "#34d399" : "#16a34a";
  if ($value === false) return isDark ? "#f87171" : "#dc2626";
  return isDark ? "#cbd5e1" : "#334155";
}

export const StyledLinkItUrl = styled(LinkItUrl)`
  text-decoration: underline;
  pointer-events: all;
  color: #2563eb;
`;

export const StyledForeignObject = styled.foreignObject<{ $isObject?: boolean }>`
  text-align: ${({ $isObject }) => !$isObject && "center"};
  color: ${({ theme }) => (theme.BACKGROUND_PRIMARY === "#FFFFFF" ? "#1e293b" : "#f8fafc")};
  font-family: var(--public-font-mono, monospace);
  font-size: 12px;
  font-weight: 500;
  overflow: hidden;
  pointer-events: none;
  border-radius: 8px;

  &.searched {
    background: rgba(59, 130, 246, 0.1);
    border: 1.5px solid #3b82f6;
    border-radius: 8px;
    box-sizing: border-box;
  }

  .highlight {
    background: rgba(250, 204, 21, 0.3);
    border-radius: 2px;
  }

  .renderVisible {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 12px;
    width: 100%;
    height: 100%;
    overflow: hidden;
    cursor: pointer;
  }
`;

export const StyledKey = styled.span<{
  $type: TextColorFn["$type"];
  $value?: TextColorFn["$value"];
}>`
  display: inline;
  align-items: center;
  justify-content: center;
  flex: 1;
  min-width: 0;
  height: auto;
  line-height: inherit;
  padding: 0;
  color: ${({ theme, $type, $value = "" }) => getTextColor({ $value, $type, theme })};
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-weight: 600;
`;

export const StyledRow = styled.span<{
  $value: TextColorFn["$value"];
  $isFirst?: boolean;
}>`
  padding: 3px 12px;
  height: ${NODE_DIMENSIONS.ROW_HEIGHT}px;
  line-height: 24px;
  color: ${({ theme, $value }) => getTextColor({ $value, theme, $type: typeof $value })};
  display: block;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  box-sizing: border-box;
  font-family: var(--public-font-mono, monospace);
  font-size: 12px;

  ${({ $isFirst, theme }) =>
    $isFirst
      ? `
    background: ${theme.BACKGROUND_PRIMARY === "#FFFFFF" ? "#f8fafc" : "#27272a"};
    border-bottom: 1px solid ${theme.BACKGROUND_PRIMARY === "#FFFFFF" ? "#e2e8f0" : "#3f3f46"};
    border-top-left-radius: 7px;
    border-top-right-radius: 7px;
    font-weight: 600;
  `
      : `
    background: ${theme.BACKGROUND_PRIMARY === "#FFFFFF" ? "#ffffff" : "#18181b"};
    border-bottom: 1px solid ${theme.BACKGROUND_PRIMARY === "#FFFFFF" ? "#f1f5f9" : "#27272a"};
  `}

  &:last-of-type {
    border-bottom: none;
    border-bottom-left-radius: 7px;
    border-bottom-right-radius: 7px;
  }

  .searched & {
    border-bottom: 1px solid #3b82f6;
  }
`;

export const StyledChildrenCount = styled.span`
  color: ${({ theme }) => theme.NODE_COLORS.CHILD_COUNT};
  padding: 10px;
  margin-left: -15px;
`;
