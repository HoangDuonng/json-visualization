export interface NoteNode {
  id: string;
  text: string;
  depth: number;
  children: NoteNode[];
  isExpanded?: boolean;
}

export type MindmapDirection = "RIGHT" | "DOWN";

export interface NoteCardData {
  label: string;
  depth: number;
  direction?: MindmapDirection;
  isEditing?: boolean;
  isRoot?: boolean;
  hasChildren?: boolean;
  isExpanded?: boolean;
  childCount?: number;
  color?: string;
  [key: string]: unknown;
}
