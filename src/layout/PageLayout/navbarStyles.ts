import Link from "next/link";
import styled from "styled-components";

export const StyledHeader = styled.header`
  position: sticky;
  top: 0;
  z-index: 100;
  border-bottom: 1px solid var(--public-border);
  background: color-mix(in srgb, var(--public-bg) 94%, transparent);
  backdrop-filter: blur(12px);
`;

export const StyledNavbar = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  min-height: 64px;
  gap: 2rem;

  @media (max-width: 680px) {
    min-height: 58px;
    gap: 1rem;
  }
`;

export const StyledNavLinks = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
  gap: 1.5rem;

  @media (max-width: 820px) {
    display: none;
  }
`;

export const StyledNavActions = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  white-space: nowrap;
`;

export const StyledNavLink = styled(Link)`
  color: var(--public-text-muted);
  font-size: 0.825rem;
  font-weight: 600;
  text-decoration: none;
  transition: color var(--public-motion);

  &:hover {
    color: var(--public-text);
  }

  &:focus-visible {
    border-radius: 2px;
    outline: 2px solid var(--public-accent);
    outline-offset: 4px;
  }
`;

export const StyledActionLink = styled(StyledNavLink)<{ $primary?: boolean }>`
  display: inline-flex;
  min-height: 2.25rem;
  align-items: center;
  padding-inline: 0.75rem;
  border: 1px solid
    ${props => (props.$primary ? "var(--public-accent)" : "var(--public-border-strong)")};
  border-radius: var(--public-radius-sm);
  background: ${props => (props.$primary ? "var(--public-accent)" : "transparent")};
  color: ${props => (props.$primary ? "var(--public-accent-contrast)" : "var(--public-text)")};

  &:hover {
    border-color: ${props =>
      props.$primary ? "var(--public-accent-hover)" : "var(--public-text)"};
    background: ${props =>
      props.$primary ? "var(--public-accent-hover)" : "var(--public-surface-raised)"};
    color: ${props => (props.$primary ? "var(--public-accent-contrast)" : "var(--public-text)")};
  }

  @media (max-width: 420px) {
    &:not([data-primary]) {
      display: none;
    }
  }
`;
