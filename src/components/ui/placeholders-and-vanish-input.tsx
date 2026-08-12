import React from "react";
import styled from "styled-components";

const StyledInputWrapper = styled.div`
  position: relative;
  width: 100%;
`;

const StyledInput = styled.input`
  width: 100%;
  padding: 0.75rem 3.25rem 0.75rem 1rem;
  border: 1px solid var(--public-border-strong, #bfc0b9);
  border-radius: var(--public-radius-md, 10px);
  font-size: 0.875rem;
  background: var(--public-surface-raised, #ffffff);
  color: var(--public-text, #171816);
  transition:
    border-color var(--public-motion, 160ms ease),
    box-shadow var(--public-motion, 160ms ease);

  &:focus {
    outline: none;
    border-color: var(--public-accent, #236b4a);
    box-shadow: 0 0 0 3px var(--public-accent-soft, #deeee5);
  }

  &::placeholder {
    color: var(--public-text-subtle, #81847c);
  }
`;

const StyledSendButton = styled.button`
  position: absolute;
  right: 6px;
  top: 50%;
  transform: translateY(-50%);
  background: var(--public-accent, #236b4a);
  border: none;
  border-radius: var(--public-radius-sm, 5px);
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition:
    background-color var(--public-motion, 160ms ease),
    transform var(--public-motion, 160ms ease);
  color: var(--public-accent-contrast, #ffffff);

  &:hover:not(:disabled) {
    background: var(--public-accent-hover, #19583c);
  }

  &:disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }
`;

const StyledPlaceholder = styled.span<{ visible: boolean }>`
  position: absolute;
  left: 1rem;
  top: 50%;
  transform: translateY(-50%);
  color: var(--public-text-subtle, #81847c);
  font-size: 0.875rem;
  pointer-events: none;
  transition: opacity var(--public-motion, 160ms ease);
  opacity: ${props => (props.visible ? 1 : 0)};
`;

interface PlaceholdersAndVanishInputProps {
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

export const PlaceholdersAndVanishInput: React.FC<PlaceholdersAndVanishInputProps> = ({
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

  // Keep focus on input automatically when component mounts, after submit, or when loading completes
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
    <form onSubmit={handleSubmit} style={{ width: "100%" }}>
      <StyledInputWrapper>
        <StyledPlaceholder visible={!value}>{placeholders[currentPlaceholder]}</StyledPlaceholder>
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
    </form>
  );
};
