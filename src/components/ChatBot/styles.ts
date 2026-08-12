import styled, { keyframes } from "styled-components";
import { MONO_FONT_FAMILY } from "../../constants/globalStyle";

export const shimmer = keyframes`
  0% {
    background-position: -200% 0;
  }
  100% {
    background-position: 200% 0;
  }
`;

export const StyledChatContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  height: 520px;
  border-radius: var(--public-radius-md, 10px);
  padding: 16px;
  border: 1px solid var(--public-border, #d9d9d3);
  background: var(--public-surface, #fbfaf7);
`;

export const StyledMessageList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 14px;
  padding: 4px 2px 12px;
`;

export const StyledMessageRow = styled.div<{ $isUser?: boolean }>`
  display: flex;
  align-items: flex-start;
  gap: 10px;
  justify-content: ${props => (props.$isUser ? "flex-end" : "flex-start")};
`;

export const StyledAvatar = styled.div<{ $isUser?: boolean }>`
  width: 28px;
  height: 28px;
  border-radius: var(--public-radius-sm, 5px);
  background: ${props =>
    props.$isUser ? "var(--public-surface-raised, #ffffff)" : "var(--public-accent, #236b4a)"};
  color: ${props =>
    props.$isUser ? "var(--public-text, #171816)" : "var(--public-accent-contrast, #ffffff)"};
  border: 1px solid
    ${props =>
      props.$isUser ? "var(--public-border-strong, #bfc0b9)" : "var(--public-accent, #236b4a)"};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.75rem;
  flex-shrink: 0;
`;

export const StyledMessageBubble = styled.div<{ $isUser?: boolean }>`
  max-width: 84%;
  background: ${props =>
    props.$isUser ? "var(--public-accent-soft, #deeee5)" : "var(--public-surface-raised, #ffffff)"};
  color: var(--public-text, #171816);
  padding: 12px 16px;
  border-radius: var(--public-radius-md, 10px);
  border: 1px solid
    ${props => (props.$isUser ? "var(--public-accent, #236b4a)" : "var(--public-border, #d9d9d3)")};
  font-size: 0.9375rem;
  line-height: 1.6;

  p {
    margin: 0 0 8px 0;
    line-height: 1.6;

    &:last-child {
      margin-bottom: 0;
    }
  }

  code {
    background: var(--public-bg, #f3f2ee);
    border: 1px solid var(--public-border, #d9d9d3);
    padding: 2px 6px;
    border-radius: 4px;
    font-family: ${MONO_FONT_FAMILY} !important;
    font-size: 0.85em;
    color: var(--public-text, #171816);
  }

  code * {
    font-family: ${MONO_FONT_FAMILY} !important;
  }

  pre {
    background: var(--public-code-bg, #171916);
    color: #f8fafc;
    padding: 14px;
    border-radius: var(--public-radius-sm, 5px);
    overflow-x: auto;
    margin: 10px 0;
    font-family: ${MONO_FONT_FAMILY} !important;
    border: 1px solid #2d3748;

    code {
      background: none;
      border: none;
      padding: 0;
      color: inherit;
      font-family: ${MONO_FONT_FAMILY} !important;
    }
  }

  pre * {
    font-family: ${MONO_FONT_FAMILY} !important;
  }

  ul,
  ol {
    margin: 8px 0;
    padding-left: 20px;
  }

  li {
    margin: 4px 0;
  }

  strong {
    font-weight: 650;
  }

  em {
    font-style: italic;
  }

  blockquote {
    border-left: 3px solid var(--public-accent, #236b4a);
    padding-left: 12px;
    margin: 8px 0;
    color: var(--public-text-muted, #5f625b);
  }

  table {
    width: 100%;
    border-collapse: collapse;
    margin: 8px 0;
    font-size: 0.875rem;
  }

  th,
  td {
    border: 1px solid var(--public-border, #d9d9d3);
    padding: 8px 10px;
    text-align: left;
    vertical-align: top;
  }

  th {
    background: var(--public-bg, #f3f2ee);
    font-weight: 650;
  }
`;

export const StyledThinkingContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 2px 0;
  min-width: 160px;
`;

export const StyledThinkingHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
`;

export const StyledThinkingText = styled.span`
  font-size: 0.8125rem;
  font-weight: 400;
  letter-spacing: 0.01em;
  color: var(--public-text-subtle, #81847c);
  background: linear-gradient(
    90deg,
    var(--public-text-subtle, #81847c) 0%,
    var(--public-text, #171816) 40%,
    #ffffff 55%,
    var(--public-text-subtle, #81847c) 100%
  );
  background-size: 250% 100%;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: ${shimmer} 2.5s infinite linear;
`;

export const StyledThinkingBar = styled.div<{ $width?: string }>`
  height: 6px;
  width: ${props => props.$width || "100%"};
  border-radius: var(--public-radius-sm, 5px);
  background: linear-gradient(
    90deg,
    var(--public-border, #d9d9d3) 0%,
    #ffffff 50%,
    var(--public-border, #d9d9d3) 100%
  );
  background-size: 250% 100%;
  animation: ${shimmer} 2.2s infinite linear;
  opacity: 0.75;
`;

export const StyledHeader = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const StyledHeaderTop = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const StyledEyebrow = styled.span`
  color: var(--public-text-subtle, #81847c);
  font-size: 0.68rem;
  font-weight: 650;
  letter-spacing: 0.12em;
  text-transform: uppercase;
`;

export const StyledHeaderBottom = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
`;

export const StyledTitle = styled.h2`
  font-family: var(--public-font-display, "Playfair Display", Georgia, serif);
  font-size: 1.125rem;
  font-weight: 600;
  color: var(--public-text, #171816);
  line-height: 1.2;
  margin: 0;
`;

export const StyledSubtitle = styled.p`
  font-size: 0.8125rem;
  color: var(--public-text-muted, #5f625b);
  margin: 0;
`;

export const StyledCreditLink = styled.a`
  font-size: 0.75rem;
  color: var(--public-text-subtle, #81847c);
  text-decoration: none;
  white-space: nowrap;
  transition: color var(--public-motion, 160ms ease);

  &:hover {
    color: var(--public-accent, #236b4a);
    text-decoration: underline;
  }
`;
