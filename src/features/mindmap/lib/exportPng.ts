import { toBlob, toPng } from "html-to-image";
import { getRectOfNodes, getViewportForBounds } from "reactflow";
import type { Node } from "reactflow";
import { toast } from "sonner";

interface MindmapRenderConfig {
  viewport: HTMLElement;
  options: {
    backgroundColor: string;
    width: number;
    height: number;
    skipFonts: boolean;
    style: {
      width: string;
      height: string;
      transform: string;
    };
    filter: (node: HTMLElement) => boolean;
  };
}

/**
 * Common viewport and dimension configuration helper for mindmap PNG export.
 */
function getMindmapRenderConfig(
  nodes: Node[],
  backgroundColor = "#121310"
): MindmapRenderConfig | null {
  const viewport = document.querySelector(".react-flow__viewport") as HTMLElement | null;
  if (!viewport) return null;

  const nodesBounds = getRectOfNodes(nodes);
  const padding = 0.25;
  const imageWidth = Math.max(600, Math.ceil(nodesBounds.width * 1.35));
  const imageHeight = Math.max(400, Math.ceil(nodesBounds.height * 1.35));

  const { x, y, zoom } = getViewportForBounds(
    nodesBounds,
    imageWidth,
    imageHeight,
    0.2,
    2,
    padding
  );

  return {
    viewport,
    options: {
      backgroundColor,
      width: imageWidth,
      height: imageHeight,
      skipFonts: true,
      style: {
        width: `${imageWidth}px`,
        height: `${imageHeight}px`,
        transform: `translate(${x}px, ${y}px) scale(${zoom})`,
      },
      filter: (node: HTMLElement) => {
        if (node?.classList?.contains("react-flow__controls")) return false;
        if (node?.classList?.contains("node-actions")) return false;
        return true;
      },
    },
  };
}

/**
 * Exports reactflow mindmap canvas as a PNG file download.
 */
export async function downloadMindmapPng(
  nodes: Node[],
  backgroundColor = "#121310",
  filename = "mindmap.png"
): Promise<void> {
  if (nodes.length === 0) {
    toast.error("No nodes to export.");
    return;
  }

  const toastId = toast.loading("Generating PNG image...", { id: "mindmap-png" });

  try {
    const config = getMindmapRenderConfig(nodes, backgroundColor);
    if (!config) {
      toast.error("Canvas viewport not found.", { id: toastId });
      return;
    }

    const dataUrl = await toPng(config.viewport, config.options);

    const a = document.createElement("a");
    a.download = filename;
    a.href = dataUrl;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);

    toast.success("Downloaded mindmap.png", { id: toastId });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Unknown error";
    toast.error("Failed to export PNG: " + message, { id: toastId });
  }
}

/**
 * Copies reactflow mindmap canvas as a PNG image to system clipboard.
 */
export async function copyMindmapPngToClipboard(
  nodes: Node[],
  backgroundColor = "#121310"
): Promise<void> {
  if (nodes.length === 0) {
    toast.error("No nodes to copy.");
    return;
  }

  const toastId = toast.loading("Copying PNG to clipboard...", { id: "mindmap-png-copy" });

  try {
    const config = getMindmapRenderConfig(nodes, backgroundColor);
    if (!config) {
      toast.error("Canvas viewport not found.", { id: toastId });
      return;
    }

    const blob = await toBlob(config.viewport, config.options);

    if (!blob) {
      toast.error("Failed to generate PNG image.", { id: toastId });
      return;
    }

    await navigator.clipboard.write([
      new ClipboardItem({
        [blob.type]: blob,
      }),
    ]);

    toast.success("Copied PNG image to clipboard!", { id: toastId });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Clipboard write permission denied";
    toast.error("Failed to copy PNG: " + message, { id: toastId });
  }
}
