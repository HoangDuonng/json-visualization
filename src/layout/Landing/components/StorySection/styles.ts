import styled from "styled-components";

export const StyledEditorialGrid = styled.div`
  display: grid;
  grid-template-columns: minmax(14rem, 0.7fr) minmax(0, 1.3fr);
  gap: clamp(3rem, 10vw, 10rem);

  @media (max-width: 800px) {
    grid-template-columns: 1fr;
  }
`;

export const StyledSectionIntro = styled.div`
  p {
    max-width: 31rem;
    margin: 1.5rem 0 0;
    color: var(--public-text-muted);
    font-size: var(--public-type-body-lg);
    line-height: 1.7;
  }
`;

export const StyledStoryList = styled.ol`
  margin: 0;
  padding: 0;
  list-style: none;
  counter-reset: story;
`;

export const StyledStoryItem = styled.li`
  display: grid;
  grid-template-columns: 3rem minmax(0, 1fr) 14rem;
  gap: 1.5rem;
  align-items: center;
  padding-block: 1.75rem;
  border-top: 1px solid var(--public-border);
  counter-increment: story;

  &::before {
    content: "0" counter(story);
    color: var(--public-text-subtle);
    font-size: var(--public-type-meta);
    font-weight: 650;
    letter-spacing: 0.08em;
  }

  &:last-child {
    border-bottom: 1px solid var(--public-border);
  }

  h3 {
    margin: 0;
    font-family: inherit;
    font-size: 1rem;
    font-weight: 700;
  }

  p {
    max-width: 37rem;
    margin: 0.6rem 0 0;
    color: var(--public-text-muted);
    font-size: 0.925rem;
    line-height: 1.65;
  }

  .step-visual {
    width: 100%;
    height: auto;
    border-radius: 6px;
    object-fit: contain;
    transition: transform 0.2s ease;

    &:hover {
      transform: translateY(-2px);
    }
  }

  @media (max-width: 768px) {
    grid-template-columns: 3rem minmax(0, 1fr);

    .step-visual {
      grid-column: 2 / -1;
      max-width: 18rem;
    }
  }
`;
