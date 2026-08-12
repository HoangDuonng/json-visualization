import React from "react";
import { FaArrowRightLong } from "react-icons/fa6";
import { StyledButton } from "./styles";

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
