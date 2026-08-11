import styled from "styled-components";

export const StyledHero = styled.section`
  padding-block: clamp(5rem, 12vw, 10rem) clamp(3.5rem, 8vw, 7rem);
  border-bottom: 1px solid var(--public-border);
`;

export const StyledHeroGrid = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1.55fr) minmax(16rem, 0.65fr);
  gap: clamp(3rem, 8vw, 8rem);
  align-items: end;

  @media (max-width: 820px) {
    grid-template-columns: 1fr;
  }
`;

export const StyledHeroAside = styled.aside`
  padding-top: 1.25rem;
  border-top: 1px solid var(--public-border-strong);

  p {
    margin: 0;
    color: var(--public-text-muted);
    font-size: 0.9rem;
    line-height: 1.65;
  }
`;

export const StyledHeroVisual = styled.div`
  margin-top: 1.25rem;
  overflow: hidden;
  border-radius: var(--public-radius-md);

  img {
    display: block;
    width: 100%;
    height: auto;
    object-fit: contain;
  }
`;

export const StyledMeta = styled.dl`
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 0.7rem 1.5rem;
  margin: 1.5rem 0 0;
  font-size: 0.75rem;

  dt {
    color: var(--public-text-subtle);
  }

  dd {
    margin: 0;
    color: var(--public-text);
    font-weight: 650;
  }
`;
