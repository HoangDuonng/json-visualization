import styled from "styled-components";

export const StyledArrowButton = styled.div`
  display: grid;
  place-items: center;
  width: 32px;
  height: 32px;
  margin: 0;
  border: 1px solid var(--public-border-strong);
  border-radius: 50%;
  background: var(--public-surface-raised);
  cursor: default;

  .button-box {
    display: flex;
  }

  .button-elem {
    display: block;
    width: 12px;
    height: 12px;
    fill: var(--public-text-muted);

    &:last-child {
      display: none;
    }
  }
`;
