import React from "react";
import { FaChevronRight } from "react-icons/fa6";
import { StyledButton } from "./styles";

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
