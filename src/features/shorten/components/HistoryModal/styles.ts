import styled from "styled-components";

export const StyledBackdrop = styled.div<{ $opened: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100vw;
  height: 100vh;
  z-index: 99999;
  background: rgba(18, 19, 17, 0.6);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1.5rem;
  opacity: ${props => (props.$opened ? 1 : 0)};
  pointer-events: ${props => (props.$opened ? "all" : "none")};
  transition: opacity 180ms ease;
`;

export const StyledModalCard = styled.div<{ $opened: boolean }>`
  background: #ffffff;
  color: var(--public-text);
  width: 100%;
  max-width: 580px;
  border-radius: var(--public-radius-md);
  border: 1px solid var(--public-border-strong);
  box-shadow:
    0 24px 48px -12px rgba(0, 0, 0, 0.25),
    0 0 0 1px rgba(0, 0, 0, 0.05);
  transform: ${props => (props.$opened ? "scale(1) translateY(0)" : "scale(0.96) translateY(8px)")};
  transition: transform 180ms cubic-bezier(0.16, 1, 0.3, 1);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  max-height: calc(100vh - 4rem);
  margin: auto;
`;

export const StyledModalHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.25rem 1.5rem;
  border-bottom: 1px solid var(--public-border);
  background: #fbfaf7;
`;

export const StyledModalTitleGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 0.625rem;

  h2 {
    margin: 0;
    font-size: 1.125rem;
    font-weight: 600;
    font-family: var(--public-font-body);
    color: var(--public-text);
    letter-spacing: -0.01em;
  }
`;

export const StyledCloseButton = styled.button`
  background: transparent;
  border: none;
  color: var(--public-text-muted);
  cursor: pointer;
  padding: 6px;
  border-radius: var(--public-radius-sm);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  transition: all 0.15s ease;

  &:hover {
    background: var(--public-border);
    color: var(--public-text);
  }
`;

export const StyledModalBody = styled.div`
  padding: 1.25rem 1.5rem;
  overflow-y: auto;
  flex: 1;
  background: #ffffff;
  min-height: 180px;
`;

export const StyledModalToolbar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 0.875rem;
  margin-bottom: 0.875rem;
  border-bottom: 1px solid var(--public-border);
`;

export const StyledCountText = styled.span`
  font-size: 0.8125rem;
  color: var(--public-text-muted);
  font-weight: 500;
`;

export const StyledClearButton = styled.button`
  background: transparent;
  border: 1px solid transparent;
  color: #d9383a;
  font-size: 0.8125rem;
  font-weight: 600;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 5px;
  padding: 4px 8px;
  border-radius: var(--public-radius-sm);
  transition: all 0.15s ease;

  &:hover {
    background: #fdf2f2;
    border-color: #f8d7d7;
  }
`;

/* Block Card Items */
export const StyledItemCard = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 12px 14px;
  margin-bottom: 10px;
  background: var(--public-surface, #fbfaf7);
  border: 1px solid var(--public-border, #d9d9d3);
  border-radius: var(--public-radius-sm, 6px);
  transition: all 0.15s ease;

  &:hover {
    border-color: var(--public-border-strong, #bfc0b9);
    background: #ffffff;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
  }

  &:last-child {
    margin-bottom: 0;
  }
`;

export const StyledCardTop = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
`;

export const StyledItemShortLink = styled.a`
  color: var(--public-accent, #236b4a);
  font-family: var(--public-font-mono);
  font-size: 0.875rem;
  font-weight: 600;
  text-decoration: none;
  word-break: break-all;

  &:hover {
    text-decoration: underline;
    text-decoration-color: currentColor;
  }
`;

export const StyledItemActions = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  flex-shrink: 0;
`;

export const StyledIconButton = styled.button`
  background: transparent;
  border: 1px solid transparent;
  color: var(--public-text-muted);
  width: 30px;
  height: 30px;
  border-radius: var(--public-radius-sm);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.15s ease;

  &:hover {
    background: var(--public-surface, #fbfaf7);
    border-color: var(--public-border);
    color: var(--public-text);
  }

  &.delete-btn:hover {
    background: #fdf2f2;
    border-color: #f8d7d7;
    color: #d9383a;
  }
`;

export const StyledCardBottom = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding-top: 6px;
  border-top: 1px dashed var(--public-border, #e8e4db);
`;

export const StyledOriginalLinkBox = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  min-width: 0;
  flex: 1;
  color: var(--public-text-muted, #5f625b);
  background: rgba(0, 0, 0, 0.03);
  padding: 4px 8px;
  border-radius: 4px;

  span {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-size: 0.75rem;
  }
`;

export const StyledItemTime = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 4px;
  color: var(--public-text-subtle, #81847c);
  font-size: 0.72rem;
  white-space: nowrap;
  flex-shrink: 0;
`;

export const StyledPaginationFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.875rem 1.5rem;
  border-top: 1px solid var(--public-border);
  background: #fbfaf7;
`;

export const StyledPageNav = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
`;

export const StyledPageBtn = styled.button<{ $active?: boolean }>`
  background: ${props => (props.$active ? "var(--public-accent)" : "#ffffff")};
  color: ${props => (props.$active ? "#ffffff" : "var(--public-text)")};
  border: 1px solid ${props => (props.$active ? "var(--public-accent)" : "var(--public-border)")};
  border-radius: var(--public-radius-sm);
  padding: 4px 10px;
  font-size: 0.8125rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.15s ease;
  min-width: 32px;
  height: 32px;
  display: inline-flex;
  align-items: center;
  justify-content: center;

  &:hover:not(:disabled) {
    background: ${props =>
      props.$active ? "var(--public-accent-hover)" : "var(--public-surface)"};
    border-color: ${props =>
      props.$active ? "var(--public-accent-hover)" : "var(--public-border-strong)"};
  }

  &:disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }
`;

export const StyledEmptyState = styled.div`
  text-align: center;
  padding: 3rem 1.5rem;
  color: var(--public-text-muted);
  font-size: 0.875rem;
`;
