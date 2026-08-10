import { Text } from "@mantine/core";
import styled from "styled-components";

export const StyledWorkspace = styled.section`
  padding-block: clamp(2rem, 5vw, 4rem);
  border-bottom: 1px solid var(--public-border);
`;

export const StyledForm = styled.div`
  width: 100%;
  padding-bottom: 2rem;

  @media (max-width: 600px) {
    padding-bottom: 1.5rem;
  }
`;

export const StyledInputGroup = styled.div`
  display: flex;
  width: 100%;
  gap: 12px;
  align-items: flex-end;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: stretch;
  }
`;

export const StyledShortenButton = styled.button`
  background: var(--public-accent);
  color: var(--public-accent-contrast);
  border: 1px solid var(--public-accent);
  border-radius: var(--public-radius-sm);
  padding: 10px 24px;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  white-space: nowrap;
  height: 42px;
  font-family: inherit;

  &:hover:not(:disabled) {
    background: var(--public-accent-hover);
    border-color: var(--public-accent-hover);
  }

  &:active:not(:disabled) {
    transform: scale(0.98);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export const StyledResultCard = styled.div`
  padding-top: 2rem;
`;

export const StyledShortUrl = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  border-top: 1px solid var(--public-border-strong);
  border-bottom: 1px solid var(--public-border-strong);
  padding: 12px 16px;
  font-size: 16px;
  font-weight: 500;
  color: var(--public-text);
  word-break: break-all;
  font-family: var(--public-font-mono);
`;

export const StyledOriginalUrl = styled(Text)<any>`
  word-break: break-all;
`;

export const StyledHistoryTrigger = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: var(--public-surface-raised);
  color: var(--public-text);
  border: 1px solid var(--public-border-strong);
  border-radius: var(--public-radius-sm);
  padding: 8px 16px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  font-family: inherit;

  &:hover {
    background: var(--public-surface);
    border-color: var(--public-text);
  }
`;

export const StyledIconButton = styled.button`
  background: transparent;
  border: 1px solid transparent;
  color: var(--public-text-muted);
  width: 32px;
  height: 32px;
  border-radius: var(--public-radius-sm);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.15s ease;

  &:hover {
    background: var(--public-surface);
    border-color: var(--public-border);
    color: var(--public-text);
  }
`;
