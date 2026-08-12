import React from "react";
import styled from "styled-components";

const StyledArrowButton = styled.div`
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

export type ArrowButtonProps = React.HTMLAttributes<HTMLDivElement>;

export const ArrowButton: React.FC<ArrowButtonProps> = props => {
  return (
    <StyledArrowButton aria-hidden="true" {...props}>
      <div className="button-box">
        <span className="button-elem">
          <svg viewBox="0 0 46 40" xmlns="http://www.w3.org/2000/svg">
            <path d="M46 20.038c0-.7-.3-1.5-.8-2.1l-16-17c-1.1-1-3.2-1.4-4.4-.3-1.2 1.1-1.2 3.3 0 4.4l11.3 11.9H3c-1.7 0-3 1.3-3 3s1.3 3 3 3h33.1l-11.3 11.9c-1 1-1.2 3.3 0 4.4 1.2 1.1 3.3.8 4.4-.3l16-17c.5-.5.8-1.1.8-1.9z" />
          </svg>
        </span>
        <span className="button-elem">
          <svg viewBox="0 0 46 40" xmlns="http://www.w3.org/2000/svg">
            <path d="M46 20.038c0-.7-.3-1.5-.8-2.1l-16-17c-1.1-1-3.2-1.4-4.4-.3-1.2 1.1-1.2 3.3 0 4.4l11.3 11.9H3c-1.7 0-3 1.3-3 3s1.3 3 3 3h33.1l-11.3 11.9c-1 1-1.2 3.3 0 4.4 1.2 1.1 3.3.8 4.4-.3l16-17c.5-.5.8-1.1.8-1.9z" />
          </svg>
        </span>
      </div>
    </StyledArrowButton>
  );
};
