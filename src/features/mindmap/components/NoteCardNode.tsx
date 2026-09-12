import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { Handle, Position } from "reactflow";
import type { NodeProps } from "reactflow";
import { MONO_FONT_FAMILY } from "../../../constants/globalStyle";
import useMindmap from "../stores/useMindmap";
import type { NoteCardData } from "../types";

const StyledNodeWrapper = styled.div<{
  $selected?: boolean;
  $isRoot?: boolean;
  $isVertical?: boolean;
}>`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: fit-content;
  min-width: 130px;
  max-width: 440px;
  padding: ${({ $isVertical }) => ($isVertical ? "10px 18px 14px 18px" : "10px 18px")};
  background-color: #383b47;
  color: #ffffff;
  border-radius: 8px;
  border: 1.5px solid ${({ $selected }) => ($selected ? "#37ff8b" : "rgba(255, 255, 255, 0.08)")};
  box-shadow: ${({ $selected }) =>
    $selected
      ? "0 0 0 2px rgba(55, 255, 139, 0.3), 0 4px 14px rgba(0, 0, 0, 0.2)"
      : "0 4px 14px rgba(0, 0, 0, 0.16)"};
  font-family: ${MONO_FONT_FAMILY} !important;
  font-size: 13.5px;
  line-height: 1.45;
  cursor: pointer;
  user-select: none;
  transition:
    border-color 140ms ease,
    box-shadow 140ms ease;

  &:hover {
    border-color: ${({ $selected }) => ($selected ? "#37ff8b" : "#9ba7f5")};
  }

  &:hover .node-actions {
    opacity: 1;
    pointer-events: auto;
  }

  * {
    font-family: ${MONO_FONT_FAMILY} !important;
  }
`;

const StyledText = styled.div<{ $isVertical?: boolean }>`
  white-space: nowrap;
  word-break: normal;
  color: #ffffff;
  font-weight: 500;
  margin-right: ${({ $isVertical }) => ($isVertical ? "0" : "10px")};
  text-align: ${({ $isVertical }) => ($isVertical ? "center" : "left")};
`;

const StyledInput = styled.input<{ $isVertical?: boolean }>`
  border: none;
  background: transparent;
  outline: none;
  font-family: inherit;
  font-size: inherit;
  line-height: inherit;
  color: #ffffff;
  font-weight: 500;
  margin-right: ${({ $isVertical }) => ($isVertical ? "0" : "10px")};
  padding: 0;
  text-align: ${({ $isVertical }) => ($isVertical ? "center" : "left")};
  white-space: nowrap;
`;

const StyledChevronButton = styled.button<{
  $hasChildren?: boolean;
  $isVertical?: boolean;
}>`
  position: absolute;
  ${({ $isVertical }) =>
    $isVertical
      ? `
    bottom: -11px;
    left: 50%;
    transform: translateX(-50%);
  `
      : `
    right: -11px;
    top: 50%;
    transform: translateY(-50%);
  `}
  width: 22px;
  height: 22px;
  border-radius: 50%;
  background: #323540;
  border: 1.5px solid #9ba7f5;
  color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 11px;
  font-weight: 700;
  cursor: pointer;
  z-index: 10;
  transition:
    background 140ms ease,
    transform 140ms ease;

  &:hover {
    background: #474b5c;
    transform: ${({ $isVertical }) =>
      $isVertical ? "translateX(-50%) scale(1.1)" : "translateY(-50%) scale(1.1)"};
  }
`;

const StyledActionGroup = styled.div`
  position: absolute;
  top: -12px;
  right: 10px;
  display: flex;
  gap: 4px;
  opacity: 0;
  pointer-events: none;
  transition: opacity 140ms ease;
  z-index: 12;
`;

const StyledMiniAction = styled.button`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: #252830;
  border: 1px solid #4f5364;
  color: #d1d5db;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 11px;
  font-weight: 700;
  cursor: pointer;

  &:hover {
    background: #37ff8b;
    color: #1a1a1a;
    border-color: #37ff8b;
  }
`;

const StyledHiddenHandle = styled(Handle)`
  opacity: 0;
  width: 1px;
  height: 1px;
  border: none;
  min-width: 0;
  min-height: 0;
`;

export const NoteCardNode: React.FC<NodeProps<NoteCardData>> = ({ id, data, selected }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(data.label || "");
  const inputRef = useRef<HTMLInputElement>(null);

  const toggleNodeExpand = useMindmap(state => state.toggleNodeExpand);
  const addChildNode = useMindmap(state => state.addChildNode);
  const deleteNode = useMindmap(state => state.deleteNode);
  const updateNodeLabel = useMindmap(state => state.updateNodeLabel);

  const hasChildren = !!data.hasChildren;
  const isExpanded = data.isExpanded !== false;
  const isRoot = !!data.isRoot;
  const isVertical = data.direction === "DOWN";

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      const len = inputRef.current.value.length;
      inputRef.current.setSelectionRange(len, len);
    }
  }, [isEditing]);

  const handleDoubleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setEditText(data.label || "");
    setIsEditing(true);
  };

  const handleBlur = () => {
    setIsEditing(false);
    updateNodeLabel(id, editText);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      setIsEditing(false);
      updateNodeLabel(id, editText);
    } else if (e.key === "Escape") {
      setIsEditing(false);
      setEditText(data.label || "");
    }
  };

  const handleChevronClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (hasChildren) {
      toggleNodeExpand(id);
    } else {
      addChildNode(id);
    }
  };

  const handleAddChild = (e: React.MouseEvent) => {
    e.stopPropagation();
    addChildNode(id);
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    deleteNode(id);
  };

  const chevronIcon = hasChildren
    ? isExpanded
      ? isVertical
        ? "▴"
        : "‹"
      : isVertical
        ? "▾"
        : "›"
    : "+";

  const inputWidth = Math.min(380, Math.max(120, Math.ceil(editText.length * 8.8 + 16)));

  return (
    <StyledNodeWrapper
      $selected={selected}
      $isRoot={isRoot}
      $isVertical={isVertical}
      onDoubleClick={handleDoubleClick}
    >
      {/* Target handle */}
      <StyledHiddenHandle
        type="target"
        position={isVertical ? Position.Top : Position.Left}
        style={isVertical ? { top: 0, left: "50%" } : { left: 0, top: "50%" }}
      />

      {/* Node text or single-line input */}
      {isEditing ? (
        <StyledInput
          ref={inputRef}
          type="text"
          $isVertical={isVertical}
          value={editText}
          onChange={e => setEditText(e.target.value)}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          style={{ width: `${inputWidth}px` }}
        />
      ) : (
        <StyledText $isVertical={isVertical}>{data.label || "Untitled"}</StyledText>
      )}

      {/* Chevron Expand/Collapse button */}
      <StyledChevronButton
        $hasChildren={hasChildren}
        $isVertical={isVertical}
        onClick={handleChevronClick}
        title={hasChildren ? (isExpanded ? "Collapse branch" : "Expand branch") : "Add child node"}
      >
        {chevronIcon}
      </StyledChevronButton>

      {/* Hover action bar */}
      <StyledActionGroup className="node-actions">
        <StyledMiniAction onClick={handleAddChild} title="Add child node">
          +
        </StyledMiniAction>
        {!isRoot && (
          <StyledMiniAction onClick={handleDelete} title="Delete node">
            ×
          </StyledMiniAction>
        )}
      </StyledActionGroup>

      {/* Source handle */}
      <StyledHiddenHandle
        type="source"
        position={isVertical ? Position.Bottom : Position.Right}
        style={isVertical ? { bottom: -11, left: "50%" } : { right: -11, top: "50%" }}
      />
    </StyledNodeWrapper>
  );
};

export default NoteCardNode;
