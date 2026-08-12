import React from "react";
import { StyledButton } from "./styles";

export interface GenerateButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export const GenerateButton: React.FC<GenerateButtonProps> = ({
  onClick,
  children,
  disabled,
  type = "button",
  ...props
}) => {
  return (
    <StyledButton type={type} onClick={onClick} disabled={disabled} {...props}>
      {children}
    </StyledButton>
  );
};
