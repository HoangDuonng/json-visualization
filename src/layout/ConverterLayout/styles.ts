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
    color: var(--public-text);
  }

  &:focus-visible {
    outline: 2px solid var(--public-accent);
    outline-offset: 2px;
  }
`;

export const StyledToolFooter = styled.section`
  padding-block: 1rem var(--public-section-space);
  border-top: 1px solid var(--public-border);
`;
