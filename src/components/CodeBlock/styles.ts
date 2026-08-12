import styled from "styled-components";
import { MONO_FONT_FAMILY } from "src/constants/globalStyle";

export const StyledCodeBlockContainer = styled.div`
  pre {
    font-family: ${MONO_FONT_FAMILY} !important;
    border-radius: 8px;
    margin: 0;
    background: #fefcf7 !important;
    border: 1px solid #e8e4db;

    * {
      font-family: ${MONO_FONT_FAMILY} !important;
    }
  }
`;
