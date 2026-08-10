import React, { useCallback, useState } from "react";
import { CopyButton, Text, TextInput, Tooltip } from "@mantine/core";
import { ref, set } from "firebase/database";
import { nanoid } from "nanoid";
import { IoCheckmark, IoCopyOutline, IoLink, IoOpenOutline } from "react-icons/io5";
import { toast } from "sonner";
import { SITE_URL } from "../../../../constants/seo";
import { getDb } from "../../../../lib/db";
import type { ShortenResult } from "../../types";
import { isValidUrl } from "../../utils/historyStorage";
import {
  StyledForm,
  StyledIconButton,
  StyledInputGroup,
  StyledOriginalUrl,
  StyledResultCard,
  StyledShortenButton,
  StyledShortUrl,
  StyledWorkspace,
} from "./styles";

interface ShortenFormProps {
  onShortenSuccess: (newResult: ShortenResult) => void;
}

export const ShortenForm: React.FC<ShortenFormProps> = ({ onShortenSuccess }) => {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<ShortenResult | null>(null);

  const handleShorten = useCallback(async () => {
    const trimmed = url.trim();
    if (!trimmed) {
      toast.error("Please enter a URL.");
      return;
    }

    const normalizedUrl = trimmed.startsWith("http") ? trimmed : `https://${trimmed}`;

    if (!isValidUrl(normalizedUrl)) {
      toast.error("Invalid URL format.");
      return;
    }

    setLoading(true);
    try {
      const db = getDb();
      const code = nanoid(7);
      const record = {
        url: normalizedUrl,
        createdAt: Date.now(),
      };

      await set(ref(db, `shortlinks/${code}`), record);

      const origin = typeof window !== "undefined" ? window.location.origin : SITE_URL;
      const shortUrl = `${origin}/s?c=${code}`;
      const newResult: ShortenResult = {
        code,
        shortUrl,
        originalUrl: normalizedUrl,
        createdAt: Date.now(),
      };

      setResult(newResult);
      setUrl("");
      onShortenSuccess(newResult);
      toast.success("Short link created!");
    } catch (error: any) {
      console.error("Shorten error:", error);
      toast.error(
        error?.message?.includes("Database configuration")
          ? "URL shortener is not configured. Please set up Database."
          : "Failed to create short link. Please try again."
      );
    } finally {
      setLoading(false);
    }
  }, [url, onShortenSuccess]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !loading) {
      handleShorten();
    }
  };

  return (
    <StyledWorkspace>
      <StyledForm>
        <StyledInputGroup>
          <TextInput
            flex={1}
            placeholder="Paste your long URL here..."
            value={url}
            onChange={e => setUrl(e.currentTarget.value)}
            onKeyDown={handleKeyDown}
            leftSection={<IoLink size={18} />}
            size="md"
            styles={{
              input: {
                borderColor: "var(--public-border-strong)",
                background: "var(--public-surface)",
                color: "var(--public-text)",
              },
            }}
          />
          <StyledShortenButton onClick={handleShorten} disabled={loading}>
            {loading ? "Shortening..." : "Shorten"}
          </StyledShortenButton>
        </StyledInputGroup>

        {result && (
          <StyledResultCard>
            <Text size="xs" c="dimmed" mb={8} tt="uppercase" fw={600}>
              Your short link
            </Text>
            <StyledShortUrl>
              <span style={{ flex: 1 }}>{result.shortUrl}</span>
              <CopyButton value={result.shortUrl}>
                {({ copied, copy }) => (
                  <Tooltip label={copied ? "Copied!" : "Copy"}>
                    <StyledIconButton onClick={copy} aria-label="Copy short link">
                      {copied ? (
                        <IoCheckmark size={18} color="var(--public-accent)" />
                      ) : (
                        <IoCopyOutline size={18} />
                      )}
                    </StyledIconButton>
                  </Tooltip>
                )}
              </CopyButton>
              <Tooltip label="Open">
                <StyledIconButton
                  as="a"
                  href={result.shortUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Open short link"
                >
                  <IoOpenOutline size={18} />
                </StyledIconButton>
              </Tooltip>
            </StyledShortUrl>
            <StyledOriginalUrl size="xs" c="dimmed" mt={8}>
              {result.originalUrl}
            </StyledOriginalUrl>
          </StyledResultCard>
        )}
      </StyledForm>
    </StyledWorkspace>
  );
};
