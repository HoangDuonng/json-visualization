import styled from "styled-components";

export const StyledButton = styled.button`
  display: inline-flex;
  min-height: 2.75rem;
  align-items: center;
  justify-content: center;
  padding: 0.7rem 1rem;
  border: 1px solid var(--public-border-strong);
  border-radius: var(--public-radius-sm);
  background: var(--public-surface-raised);
  color: var(--public-text);
  font-family: inherit;
  font-size: 0.85rem;
  font-weight: 650;
  cursor: pointer;
  transition:
    border-color var(--public-motion),
    background-color var(--public-motion),
    color var(--public-motion);

  &:hover:not(:disabled) {
    border-color: var(--public-accent);
    background: var(--public-accent-soft);
    color: var(--public-accent-hover);
  }

  &:focus-visible {
    outline: 2px solid var(--public-accent);
    outline-offset: 3px;
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.45;
  }
`;
