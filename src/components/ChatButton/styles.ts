import styled from "styled-components";

export const StyledChatButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 0.875rem;
  background: var(--public-surface-raised, #ffffff);
  font-size: 0.8125rem;
  font-weight: 600;
  color: var(--public-text, #171816);
  border: 1px solid var(--public-border-strong, #bfc0b9);
  border-radius: var(--public-radius-sm, 5px);
  transition:
    background-color var(--public-motion, 160ms ease),
    border-color var(--public-motion, 160ms ease),
    color var(--public-motion, 160ms ease);
  cursor: pointer;
  line-height: 1;

  svg {
    color: var(--public-accent, #236b4a);
    transition: transform var(--public-motion, 160ms ease);
  }

  &:hover {
    background: var(--public-accent-soft, #deeee5);
    border-color: var(--public-accent, #236b4a);
    color: var(--public-accent-hover, #19583c);

    svg {
      transform: scale(1.15) rotate(10deg);
    }
  }

  &:focus-visible {
    outline: 2px solid var(--public-accent, #236b4a);
    outline-offset: 2px;
  }
`;
