import styled from "styled-components";

export const StyledStatus = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding-block: 2rem;
  color: var(--public-text-muted);
  font-size: var(--public-type-body);
`;

export const StyledIndicator = styled.span`
  width: 0.65rem;
  height: 0.65rem;
  border: 1px solid var(--public-accent);
  border-radius: 50%;
  animation: pulse 1.2s ease-in-out infinite;

  @keyframes pulse {
    50% {
      background: var(--public-accent);
    }
  }
`;
