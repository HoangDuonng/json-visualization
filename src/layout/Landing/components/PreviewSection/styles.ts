import styled from "styled-components";

export const StyledPreviewSection = styled.section`
  padding-block: clamp(2rem, 5vw, 4rem) var(--public-section-space);
  border-bottom: 1px solid var(--public-border);
`;

export const StyledPreviewMeta = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 2rem;
  padding-bottom: 1rem;
  color: var(--public-text-subtle);
  font-size: var(--public-type-meta);
  font-weight: 650;
  letter-spacing: 0.1em;
  text-transform: uppercase;
`;

export const StyledPreview = styled.div`
  overflow: hidden;
  border: 1px solid var(--public-border-strong);
  border-radius: var(--public-radius-md);
  background: var(--public-code-bg);

  img {
    display: block;
    width: 100%;
    height: auto;
  }
`;
