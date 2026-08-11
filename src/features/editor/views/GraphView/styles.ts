import styled from "styled-components";

export const StyledEditorWrapper = styled.div<{
  $widget: boolean;
  $showRulers: boolean;
  $showGrid: boolean;
}>`
  width: 100%;
  height: 100vh;

  --bg-color: ${({ theme }) => theme.GRID_BG_COLOR};
  --dot-color: ${({ theme }) => (theme.BACKGROUND_PRIMARY === "#FFFFFF" ? "#cbd5e1" : "#3f3f46")};

  background-color: var(--bg-color);
  ${({ $showGrid }) =>
    $showGrid &&
    `
    background-image: radial-gradient(var(--dot-color) 1.25px, transparent 1.25px);
    background-size: 20px 20px;
    background-position: 0 0;
  `};

  ${({ $widget, theme }) =>
    $widget &&
    `
    background-color: transparent;
    background-image:
      radial-gradient(${theme.BACKGROUND_PRIMARY === "#FFFFFF" ? "rgba(0, 0, 0, 0.08)" : "rgba(255, 255, 255, 0.12)"} 1px, transparent 1px);
    background-size: 20px 20px;
  `};

  .jsoncrack-space {
    cursor: url("/assets/cursor.svg"), auto;
  }

  :active {
    cursor: move;
  }

  .dragging,
  .dragging button {
    pointer-events: none;
  }

  text {
    fill: ${({ theme }) => theme.INTERACTIVE_NORMAL} !important;
  }

  rect {
    fill: ${({ theme }) => theme.BACKGROUND_NODE};
  }

  @media only screen and (max-width: 320px) {
    height: 100vh;
  }
`;
