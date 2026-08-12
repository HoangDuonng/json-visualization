import styled from "styled-components";

export const StyledFooter = styled.footer`
  padding-block: clamp(4rem, 8vw, 7rem) 2rem;
  background: var(--public-text);
  color: #f5f4ef;
  position: relative;
  z-index: 2;
`;

export const StyledFooterGrid = styled.div`
  display: grid;
  grid-template-columns: minmax(16rem, 2fr) repeat(3, minmax(8rem, 1fr));
  gap: clamp(2rem, 6vw, 6rem);
  padding-bottom: clamp(3rem, 6vw, 5rem);

  @media (max-width: 900px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media (max-width: 520px) {
    grid-template-columns: 1fr;
  }
`;

export const StyledFooterLeft = styled.div`
  max-width: 24rem;

  p {
    margin: 1rem 0 0;
    color: #aaada5;
    font-size: 0.925rem;
    line-height: 1.65;
  }
`;

export const StyledFooterSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.75rem;
`;

export const StyledFooterTitle = styled.h3`
  margin: 0 0 0.5rem;
  color: #777b73;
  font-family: inherit;
  font-size: var(--public-type-meta);
  font-weight: 650;
  text-transform: uppercase;
  letter-spacing: 0.12em;
`;

export const StyledFooterLink = styled.a`
  color: #d8dad4;
  font-size: 0.875rem;
  text-decoration: none;
  transition: color var(--public-motion);
  cursor: pointer;

  &:hover {
    color: #ffffff;
  }

  &:focus-visible {
    outline: 2px solid #88b99f;
    outline-offset: 3px;
  }
`;

export const StyledFooterBottom = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1.5rem;
  padding-top: 1.5rem;
  border-top: 1px solid #353833;
  color: #888c83;
  font-size: 0.75rem;

  @media (max-width: 600px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

export const StyledLegalLinks = styled.div`
  display: flex;
  gap: 1.5rem;
`;
