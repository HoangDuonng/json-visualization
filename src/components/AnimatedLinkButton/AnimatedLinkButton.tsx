import React from "react";
import styled from "styled-components";
import { FaArrowRightLong } from "react-icons/fa6";

const StyledButton = styled.button`
  --primary-color: #111;
  --hovered-color: #37ff8b;
  padding: 0;
  margin: 0;
  border: none;
  background: none;
  cursor: pointer;
  position: relative;
  display: flex;
  font-weight: 600;
  font-size: 16px;
  gap: 0.5rem;
  align-items: center;

  p {
    margin: 0;
    position: relative;
    font-size: 16px;
    color: var(--primary-color);
  }

  &::after {
    position: absolute;
    content: "";
    width: 0;
    left: 0;
    bottom: -7px;
    background: var(--hovered-color);
    height: 2px;
    transition: 0.3s ease-out;
  }

  &:hover::after {
    width: 100%;
  }

  &:hover svg {
    transform: translateX(4px);
    color: var(--hovered-color);
  }

  svg {
    color: var(--primary-color);
    transition: 0.2s;
    position: relative;
    width: 15px;
    transition-delay: 0.2s;
  }
`;

export interface AnimatedLinkButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export const AnimatedLinkButton: React.FC<AnimatedLinkButtonProps> = ({
  children,
  onClick,
  type = "button",
  ...props
}) => {
  return (
    <StyledButton type={type} onClick={onClick} {...props}>
      <p>{children}</p>
      <FaArrowRightLong />
    </StyledButton>
  );
};
