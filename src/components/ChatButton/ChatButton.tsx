import React from "react";
import { VscSparkle } from "react-icons/vsc";
import { StyledChatButton } from "./styles";

export type ChatButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

export const ChatButton: React.FC<ChatButtonProps> = ({
  onClick,
  type = "button",
  "aria-label": ariaLabel = "Open AI Assistant",
  ...props
}) => {
  return (
    <StyledChatButton onClick={onClick} type={type} aria-label={ariaLabel} {...props}>
      <VscSparkle size={15} />
      <span>Assistant</span>
    </StyledChatButton>
  );
};
