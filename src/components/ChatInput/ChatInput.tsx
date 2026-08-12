import React from "react";
import {
  StyledForm,
  StyledInput,
  StyledInputWrapper,
  StyledPlaceholder,
  StyledSendButton,
} from "./styles";

export interface ChatInputProps {
  placeholders: string[];
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  value: string;
  disabled?: boolean;
  loading?: boolean;
  sendIcon?: React.ReactNode;
  stopIcon?: React.ReactNode;
  autoFocus?: boolean;
}

export const ChatInput: React.FC<ChatInputProps> = ({
  placeholders,
  onChange,
  onSubmit,
  value,
  disabled,
  loading,
  sendIcon,
  stopIcon,
  autoFocus = true,
}) => {
  const [currentPlaceholder, setCurrentPlaceholder] = React.useState(0);
  const inputRef = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    if (value) return;

    const interval = setInterval(() => {
      setCurrentPlaceholder(prev => (prev + 1) % placeholders.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [placeholders.length, value]);

  React.useEffect(() => {
    if (autoFocus || !loading) {
      const timer = setTimeout(() => {
        inputRef.current?.focus();
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [autoFocus, loading]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(e);
    requestAnimationFrame(() => {
      inputRef.current?.focus();
    });
  };

  return (
    <StyledForm onSubmit={handleSubmit}>
      <StyledInputWrapper>
        <StyledPlaceholder $visible={!value}>{placeholders[currentPlaceholder]}</StyledPlaceholder>
        <StyledInput
          ref={inputRef}
          type="text"
          value={value}
          onChange={onChange}
          disabled={disabled}
          placeholder=" "
          autoFocus={autoFocus}
        />
        <StyledSendButton type="submit" disabled={!value.trim() && !loading}>
          {loading ? stopIcon : sendIcon}
        </StyledSendButton>
      </StyledInputWrapper>
    </StyledForm>
  );
};
