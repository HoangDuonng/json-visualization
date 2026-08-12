import React from "react";
import styled from "styled-components";
import { FaChevronRight } from "react-icons/fa6";

const StyledButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  font-family: inherit;
  font-size: 11px;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.4px;
  color: var(--site-text, #1a1a1a);
  background-color: var(--site-highlight, #f7c948);
  border: 1px solid rgba(26, 26, 26, 0.14);
  border-radius: 40px;
  padding: 12px 20px 12px 22px;
  transition:
    background-color 0.2s ease,
    box-shadow 0.2s ease,
    transform 0.2s ease;
  box-shadow: 0 6px 0 rgba(26, 26, 26, 0.14);
  cursor: pointer;

  &:hover,
  &:focus-visible {
    background-color: var(--site-accent, #37ff8b);
    box-shadow: 0 4px 0 rgba(26, 26, 26, 0.16);
    transform: translateY(2px);
  }

  &:active {
    box-shadow: none;
    transform: translateY(6px);
  }
`;

export interface ExploreButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export const ExploreButton: React.FC<ExploreButtonProps> = ({
  children,
  onClick,
  type = "button",
  ...props
}) => {
  return (
    <StyledButton type={type} onClick={onClick} {...props}>
      {children}
      <FaChevronRight size={14} />
    </StyledButton>
  );
};
