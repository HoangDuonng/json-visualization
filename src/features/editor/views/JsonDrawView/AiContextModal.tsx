import React, { useState, useCallback, useRef } from "react";
import {
  Modal,
  Box,
  Stack,
  Group,
  Text,
  Badge,
  Button,
  ActionIcon,
  Tabs,
  ScrollArea,
  Tooltip,
} from "@mantine/core";
import styled from "styled-components";
import {
  FiCopy,
  FiCheck,
  FiDownload,
  FiX,
  FiCpu,
  FiFileText,
  FiLayers,
  FiGitBranch,
} from "react-icons/fi";
import { toast } from "sonner";
import { MONO_FONT_FAMILY } from "../../../../constants/globalStyle";
import type { DiagramSemantics } from "./aiContextParser";

interface AiContextModalProps {
  opened: boolean;
  onClose: () => void;
  semantics: DiagramSemantics | null;
  darkMode: boolean;
}

const StyledCodePreview = styled.pre`
  font-family: ${MONO_FONT_FAMILY} !important;
  font-size: 13px;
  line-height: 1.5;
  white-space: pre-wrap;
  word-break: break-word;
  margin: 0;
  padding: 16px;
  border-radius: 8px;

  * {
    font-family: ${MONO_FONT_FAMILY} !important;
  }
`;

const StyledStatCard = styled.div<{ $dark: boolean }>`
  display: flex;
  flex-direction: column;
  padding: 10px 14px;
  border-radius: 8px;
  background: ${({ $dark }) => ($dark ? "rgba(255, 255, 255, 0.04)" : "#f8f9fa")};
  border: 1px solid ${({ $dark }) => ($dark ? "rgba(255, 255, 255, 0.08)" : "#e9ecef")};
  flex: 1;
`;

export const AiContextModal: React.FC<AiContextModalProps> = ({
  opened,
  onClose,
  semantics,
  darkMode,
}) => {
  const [copiedPrompt, setCopiedPrompt] = useState(false);
  const [copiedMermaid, setCopiedMermaid] = useState(false);
  const copyTimerRef = useRef<number | null>(null);

  const stats = semantics?.stats || {
    nodeCount: 0,
    connectionCount: 0,
    annotationCount: 0,
    frameCount: 0,
    estimatedTokens: 0,
  };

  const handleCopyPrompt = useCallback(() => {
    if (!semantics?.aiPrompt) return;

    navigator.clipboard
      .writeText(semantics.aiPrompt)
      .then(() => {
        setCopiedPrompt(true);
        toast.success("AI Prompt context copied to clipboard!");
        if (copyTimerRef.current) window.clearTimeout(copyTimerRef.current);
        copyTimerRef.current = window.setTimeout(() => setCopiedPrompt(false), 3000) as any;
      })
      .catch(() => toast.error("Failed to copy AI context."));
  }, [semantics]);

  const handleCopyMermaid = useCallback(() => {
    if (!semantics?.mermaid) return;

    navigator.clipboard
      .writeText(semantics.mermaid)
      .then(() => {
        setCopiedMermaid(true);
        toast.success("Mermaid diagram code copied!");
        if (copyTimerRef.current) window.clearTimeout(copyTimerRef.current);
        copyTimerRef.current = window.setTimeout(() => setCopiedMermaid(false), 3000) as any;
      })
      .catch(() => toast.error("Failed to copy Mermaid code."));
  }, [semantics]);

  const handleDownloadMarkdown = useCallback(() => {
    if (!semantics?.aiPrompt) return;

    try {
      const blob = new Blob([semantics.aiPrompt], { type: "text/markdown;charset=utf-8;" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `architecture-context-${new Date().toISOString().slice(0, 10)}.md`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      toast.success("Downloaded architecture-context.md!");
    } catch {
      toast.error("Failed to download file.");
    }
  }, [semantics]);

  const previewBg = darkMode ? "rgba(0, 0, 0, 0.4)" : "#f4f5f7";
  const previewColor = darkMode ? "#e6edf3" : "#24292f";

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title={null}
      withCloseButton={false}
      centered
      size="xl"
      padding="xl"
      radius="lg"
      styles={{
        content: {
          backgroundColor: darkMode ? "#121212" : "#ffffff",
          maxHeight: "90vh",
          display: "flex",
          flexDirection: "column",
        },
        body: {
          flex: 1,
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
        },
      }}
    >
      <Stack gap="md" style={{ height: "100%", flex: 1 }}>
        {/* Header */}
        <Group justify="space-between" align="center">
          <Group gap="sm">
            <Box
              style={{
                width: 36,
                height: 36,
                borderRadius: 8,
                background: darkMode ? "rgba(99, 102, 241, 0.2)" : "#eef2ff",
                display: "grid",
                placeItems: "center",
                color: "#6366f1",
              }}
            >
              <FiCpu size={20} />
            </Box>
            <Box>
              <Group gap="xs">
                <Text fw={700} size="lg" style={{ fontFamily: "Assistant, sans-serif" }}>
                  AI Architecture Context
                </Text>
                <Badge color="violet" variant="light" size="sm">
                  Whiteboard Semantic
                </Badge>
              </Group>
              <Text size="xs" c="dimmed">
                Faithful extraction from canvas elements • Zero hallucination
              </Text>
            </Box>
          </Group>
          <ActionIcon variant="subtle" color="gray" onClick={onClose}>
            <FiX size={20} />
          </ActionIcon>
        </Group>

        {/* Stats Metrics Bar */}
        <Group gap="xs" grow>
          <StyledStatCard $dark={darkMode}>
            <Text size="xs" c="dimmed">
              Components / Nodes
            </Text>
            <Text size="md" fw={700}>
              {stats.nodeCount}
            </Text>
          </StyledStatCard>
          <StyledStatCard $dark={darkMode}>
            <Text size="xs" c="dimmed">
              Flows / Connections
            </Text>
            <Text size="md" fw={700}>
              {stats.connectionCount}
            </Text>
          </StyledStatCard>
          <StyledStatCard $dark={darkMode}>
            <Text size="xs" c="dimmed">
              Annotations / Frames
            </Text>
            <Text size="md" fw={700}>
              {stats.annotationCount + stats.frameCount}
            </Text>
          </StyledStatCard>
          <StyledStatCard $dark={darkMode}>
            <Text size="xs" c="dimmed">
              Estimated AI Tokens
            </Text>
            <Text size="md" fw={700} c={stats.estimatedTokens > 10000 ? "orange" : "teal"}>
              ~{stats.estimatedTokens.toLocaleString()}
            </Text>
          </StyledStatCard>
        </Group>

        {/* Action Buttons Bar */}
        <Group justify="space-between" align="center">
          <Text size="xs" c="dimmed">
            Ready to paste into ChatGPT, Claude, Cursor, or your AI workflow.
          </Text>
          <Group gap="xs">
            <Tooltip label="Download markdown file to attach directly into AI chat" withArrow>
              <Button
                size="sm"
                variant="default"
                leftSection={<FiDownload size={14} />}
                onClick={handleDownloadMarkdown}
              >
                Download .md
              </Button>
            </Tooltip>
            <Button
              size="sm"
              color={copiedPrompt ? "teal" : "violet"}
              leftSection={copiedPrompt ? <FiCheck size={16} /> : <FiCopy size={16} />}
              onClick={handleCopyPrompt}
            >
              {copiedPrompt ? "Copied Prompt!" : "Copy for AI"}
            </Button>
          </Group>
        </Group>

        {/* Tabs for Preview */}
        <Tabs defaultValue="prompt" style={{ flex: 1, display: "flex", flexDirection: "column" }}>
          <Tabs.List>
            <Tabs.Tab value="prompt" leftSection={<FiFileText size={14} />}>
              Full Prompt (Markdown)
            </Tabs.Tab>
            <Tabs.Tab value="mermaid" leftSection={<FiGitBranch size={14} />}>
              Mermaid Flowchart
            </Tabs.Tab>
            <Tabs.Tab value="inventory" leftSection={<FiLayers size={14} />}>
              Component Inventory ({stats.nodeCount})
            </Tabs.Tab>
          </Tabs.List>

          <Tabs.Panel value="prompt" pt="xs" style={{ flex: 1, overflow: "hidden" }}>
            <ScrollArea h={340} offsetScrollbars>
              <StyledCodePreview style={{ background: previewBg, color: previewColor }}>
                {semantics?.aiPrompt || "No components found on canvas."}
              </StyledCodePreview>
            </ScrollArea>
          </Tabs.Panel>

          <Tabs.Panel value="mermaid" pt="xs" style={{ flex: 1, overflow: "hidden" }}>
            <Stack gap="xs" style={{ height: "100%" }}>
              <Group justify="flex-end">
                <Button
                  size="xs"
                  variant="light"
                  color={copiedMermaid ? "teal" : "blue"}
                  leftSection={copiedMermaid ? <FiCheck size={12} /> : <FiCopy size={12} />}
                  onClick={handleCopyMermaid}
                >
                  {copiedMermaid ? "Copied" : "Copy Mermaid"}
                </Button>
              </Group>
              <ScrollArea h={300} offsetScrollbars>
                <StyledCodePreview style={{ background: previewBg, color: previewColor }}>
                  {semantics?.mermaid || 'flowchart LR\n  empty["Empty Canvas"]'}
                </StyledCodePreview>
              </ScrollArea>
            </Stack>
          </Tabs.Panel>

          <Tabs.Panel value="inventory" pt="xs" style={{ flex: 1, overflow: "hidden" }}>
            <ScrollArea h={340} offsetScrollbars>
              <Stack gap="xs">
                {semantics?.nodes && semantics.nodes.length > 0 ? (
                  semantics.nodes.map(n => (
                    <Box
                      key={n.id}
                      p="xs"
                      style={{
                        borderRadius: 6,
                        background: darkMode ? "rgba(255,255,255,0.03)" : "#f8f9fa",
                        border: `1px solid ${darkMode ? "rgba(255,255,255,0.06)" : "#e9ecef"}`,
                      }}
                    >
                      <Group justify="space-between" align="flex-start">
                        <Box>
                          <Group gap="xs">
                            <Badge size="xs" variant="outline">
                              {n.type}
                            </Badge>
                            <Text size="sm" fw={600}>
                              {n.label}
                            </Text>
                          </Group>
                          {n.rawText && n.rawText !== n.label && (
                            <Text size="xs" c="dimmed" mt={4} style={{ whiteSpace: "pre-line" }}>
                              {n.rawText}
                            </Text>
                          )}
                        </Box>
                        <Text size="xs" c="dimmed">
                          {n.x}, {n.y} ({n.width}x{n.height})
                        </Text>
                      </Group>
                    </Box>
                  ))
                ) : (
                  <Text size="sm" c="dimmed" ta="center" py="xl">
                    No shape or node components found on canvas.
                  </Text>
                )}
              </Stack>
            </ScrollArea>
          </Tabs.Panel>
        </Tabs>
      </Stack>
    </Modal>
  );
};
