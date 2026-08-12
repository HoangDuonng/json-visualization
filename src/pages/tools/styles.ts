import { Paper } from "@mantine/core";
import styled from "styled-components";
import { MONO_FONT_FAMILY } from "src/constants/globalStyle";

export const StyledEditorWrapper = styled.div`
  * {
    font-family: ${MONO_FONT_FAMILY} !important;
  }
`;

export const StyledCopyButton = styled.button`
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 4px;
  display: flex;
  align-items: center;
  color: #666;
  transition: color 0.2s ease;

  &:hover {
    color: #1a1a1a;
  }
`;

export const StyledPaper = styled(Paper)<any>`
  min-width: 0;
  overflow: hidden;
  border: 1px solid var(--public-border-strong);
  border-radius: var(--public-radius-md);
  background: var(--public-surface);
  transition: outline 0.3s ease;

  &[data-tooltip] {
    position: relative;
  }

  &[data-tooltip]::before {
    content: attr(data-tooltip);
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: rgba(26, 26, 26, 0.95);
    color: #fff;
    padding: 16px 20px;
    border-radius: var(--public-radius-sm);
    font-size: 0.95rem;
    white-space: normal;
    max-width: 280px;
    text-align: center;
    z-index: 1000;
    pointer-events: none;
    font-family: inherit;
  }
`;

export const StyledActions = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  padding-block: 1.5rem 0;
`;
