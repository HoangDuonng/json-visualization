import React from "react";
import { VscSparkle } from "react-icons/vsc";
import { StyledChatButton } from "./styles";

interface ChatButtonProps {
  onClick?: () => void;
}

export const ChatButton = ({ onClick }: ChatButtonProps) => {
  return (
    <StyledChatButton onClick={onClick} type="button" aria-label="Open AI Assistant">
      <VscSparkle size={15} />
      <span>Assistant</span>
    </StyledChatButton>
  );
};
