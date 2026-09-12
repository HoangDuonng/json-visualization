import React, { useRef } from "react";
import { Flex, Text, TextInput } from "@mantine/core";
import { getHotkeyHandler, useHotkeys, useOs } from "@mantine/hooks";
import { AiOutlineSearch } from "react-icons/ai";
import useMindmap from "../stores/useMindmap";

export const MindmapSearchInput: React.FC = () => {
  const searchQuery = useMindmap(state => state.searchQuery);
  const searchMatches = useMindmap(state => state.searchMatches);
  const searchIndex = useMindmap(state => state.searchIndex);
  const setSearchQuery = useMindmap(state => state.setSearchQuery);
  const skipSearchResult = useMindmap(state => state.skipSearchResult);

  const inputRef = useRef<HTMLInputElement>(null);
  const os = useOs();
  const coreKey = os === "macos" ? "⌘" : "Ctrl";

  useHotkeys(
    [
      [
        "mod+f",
        e => {
          e.preventDefault();
          inputRef.current?.focus();
        },
      ],
    ],
    []
  );

  return (
    <TextInput
      ref={inputRef}
      variant="unstyled"
      type="search"
      size="xs"
      id="search-mindmap-node"
      w="clamp(140px, 18vw, 220px)"
      value={searchQuery}
      onChange={e => setSearchQuery(e.currentTarget.value)}
      placeholder={`Find node · ${coreKey} F`}
      autoComplete="off"
      autoCorrect="off"
      onKeyDown={getHotkeyHandler([["Enter", skipSearchResult]])}
      leftSection={<AiOutlineSearch />}
      rightSection={
        searchQuery && (
          <Flex h={30} align="center">
            <Text size="xs" c="dimmed" pr="md">
              {searchMatches.length > 0 ? `${searchIndex + 1}/${searchMatches.length}` : "0/0"}
            </Text>
          </Flex>
        )
      }
      styles={{
        input: {
          height: 30,
          minHeight: 30,
          border: "1px solid var(--editor-border)",
          borderRadius: 4,
          background: "var(--editor-panel-muted)",
          fontSize: 10,
        },
      }}
    />
  );
};

export default MindmapSearchInput;
