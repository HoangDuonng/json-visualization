import React from "react";
import styled from "styled-components";
import { MindmapSearchInput } from "./MindmapSearchInput";

const StyledPanelHeader = styled.header`
  display: flex;
  min-height: 46px;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  padding: 7px 10px 7px 14px;
  border-bottom: 1px solid ${({ theme }) => theme.EDITOR_BORDER};
  background: ${({ theme }) => theme.EDITOR_PANEL};
  flex: 0 0 auto;
`;

const StyledPanelIdentity = styled.div`
  display: flex;
  min-width: 0;
  align-items: baseline;
  gap: 10px;

  strong {
    color: ${({ theme }) => theme.TEXT_NORMAL};
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 0.1em;
    text-transform: uppercase;
  }

  span {
    overflow: hidden;
    color: ${({ theme }) => theme.EDITOR_TEXT_MUTED};
    font-size: 10px;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
`;

export const MindmapHeader: React.FC = () => {
  return (
    <StyledPanelHeader>
      <StyledPanelIdentity>
        <strong>Visualization</strong>
        <span>Interactive Note Canvas</span>
      </StyledPanelIdentity>

      <MindmapSearchInput />
    </StyledPanelHeader>
  );
};

export default MindmapHeader;
