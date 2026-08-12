import { Button, type ButtonProps } from "@mantine/core";
import styled from "styled-components";

export const StyledLanguageButton = styled(Button)<ButtonProps & any>`
  flex-shrink: 0;
  white-space: nowrap;
  min-width: fit-content;
  font-weight: 500;
  color: var(--public-text, #171816);

  && .mantine-Button-label {
    white-space: nowrap;
    overflow: visible;
    text-overflow: clip;
    display: inline-flex;
    align-items: center;
    gap: 0.375rem;
  }

  &:hover {
    background-color: var(--public-accent-soft, #deeee5);
    color: var(--public-accent-hover, #19583c);
  }
`;
