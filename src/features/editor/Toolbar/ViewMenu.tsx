import { SegmentedControl } from "@mantine/core";
import { useSessionStorage } from "@mantine/hooks";
import { event as gaEvent } from "nextjs-google-analytics";
import { ViewMode } from "../../../constants/enumData";

export const ViewMenu = () => {
  const [viewMode, setViewMode] = useSessionStorage({
    key: "viewMode",
    defaultValue: ViewMode.Graph,
  });

  const selectedValue = viewMode === ViewMode.Tree ? ViewMode.Tree : ViewMode.Graph;

  return (
    <SegmentedControl
      size="xs"
      value={selectedValue}
      onChange={value => {
        setViewMode(value as ViewMode);
        gaEvent("change_view_mode", { label: value });
      }}
      data={[
        { value: ViewMode.Graph, label: "Graph" },
        { value: ViewMode.Tree, label: "Tree" },
      ]}
      styles={{
        root: {
          flexShrink: 0,
          padding: 2,
          border: "1px solid var(--editor-border)",
          background: "var(--editor-panel-muted)",
        },
        label: { paddingInline: 9, fontSize: 10 },
      }}
    />
  );
};
