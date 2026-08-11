import styled from "styled-components";

export const StyledFAQ = styled.div`
  .mantine-Accordion-item {
    border: 0;
    border-bottom: 1px solid var(--public-border);
    border-radius: 0;
    background: transparent;
  }

  .mantine-Accordion-control {
    padding: 1.25rem 0;
    color: var(--public-text);
    font-size: 0.95rem;
    font-weight: 650;
  }

  .mantine-Accordion-content {
    max-width: 42rem;
    padding: 0 0 1.5rem;
    color: var(--public-text-muted);
    font-size: 0.9rem;
    line-height: 1.7;
  }
`;
