import styled from "styled-components";

export const StyledFormats = styled.div`
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  border-top: 1px solid var(--public-border-strong);
  border-left: 1px solid var(--public-border);

  @media (max-width: 640px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
`;

export const StyledFormat = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 15rem;
  padding: 1.25rem;
  border-right: 1px solid var(--public-border);
  border-bottom: 1px solid var(--public-border);
  background: var(--public-surface);
  transition:
    background var(--public-motion),
    border-color var(--public-motion);

  &:hover {
    background: var(--public-surface-raised, #ffffff);

    .format-icon {
      color: var(--public-accent);
      transform: translateY(-2px);
    }
  }

  .format-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  strong {
    display: block;
    font-family: var(--public-font-mono);
    font-size: 1.1rem;
    font-weight: 700;
    color: var(--public-text);
  }

  .format-icon {
    color: var(--public-text-subtle);
    transition:
      color var(--public-motion),
      transform var(--public-motion);
  }

  .format-code {
    margin-block: 0.75rem;
    padding: 0.5rem 0.6rem;
    border-radius: 6px;
    background: #f3f2ee;
    border: 1px solid #d9d9d3;
    font-family: var(--public-font-mono, monospace);
    font-size: 0.685rem;
    line-height: 1.4;
    letter-spacing: -0.01em;
    color: #1a1a1a;
    white-space: pre;
    overflow: hidden;
  }

  .format-footer {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 0.4rem;
    margin-top: 0.25rem;
  }

  span {
    display: block;
    color: var(--public-text-subtle);
    font-size: var(--public-type-meta);
    letter-spacing: 0.08em;
    text-transform: uppercase;
    line-height: 1.3;
  }

  .format-link {
    color: var(--public-accent);
    font-size: 0.75rem;
    font-weight: 650;
    text-decoration: none;
    transition: transform var(--public-motion);

    &:hover {
      text-decoration: underline;
    }
  }
`;
