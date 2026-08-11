import React from "react";
import { Code, Overlay, Stack, Text } from "@mantine/core";
import useConfig from "src/store/useConfig";

export const NotSupported = () => {
  const darkmodeEnabled = useConfig(state => state.darkmodeEnabled);

  return (
    <Overlay
      backgroundOpacity={0.8}
      color={darkmodeEnabled ? "gray" : "rgb(226, 240, 243)"}
      blur="1.5"
      center
    >
      <Stack maw="60%" align="center" justify="center" gap="sm">
        <Text fz="48" fw={600} c="bright">
          File too large!
        </Text>
        <Text ta="center" size="lg" fw={500} c="gray" maw="600">
          This diagram is too large and not supported at JSON Visualization.
          <br />
          You can increase the limit by setting <Code>NEXT_PUBLIC_NODE_LIMIT</Code> in your{" "}
          <Code>.env</Code> file.
        </Text>
      </Stack>
    </Overlay>
  );
};
