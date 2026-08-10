import React, { useCallback, useEffect, useState } from "react";
import Head from "next/head";
import { CopyButton, Text, TextInput, Tooltip } from "@mantine/core";
import styled from "styled-components";
import { ref, set } from "firebase/database";
import { nanoid } from "nanoid";
import { generateNextSeo } from "next-seo/pages";
import { createPortal } from "react-dom";
import {
  IoCheckmark,
  IoChevronBack,
  IoChevronForward,
  IoClose,
  IoCopyOutline,
  IoLink,
  IoOpenOutline,
  IoTimeOutline,
  IoTrashOutline,
} from "react-icons/io5";
import { toast } from "sonner";
import { SEO, SITE_URL } from "../constants/seo";
import Layout from "../layout/PageLayout";
import { PublicContainer, PublicEyebrow, PublicToolHeader } from "../layout/PageLayout/PublicPage";
import { getDb } from "../lib/db";

const StyledWorkspace = styled.section`
  padding-block: clamp(2rem, 5vw, 4rem);
  border-bottom: 1px solid var(--public-border);
`;

const StyledForm = styled.div`
  width: 100%;
  padding-bottom: 2rem;

  @media (max-width: 600px) {
    padding-bottom: 1.5rem;
  }
`;

const StyledInputGroup = styled.div`
  display: flex;
  width: 100%;
  gap: 12px;
  align-items: flex-end;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: stretch;
  }
`;

const StyledShortenButton = styled.button`
  background: var(--public-accent);
  color: var(--public-accent-contrast);
  border: 1px solid var(--public-accent);
  border-radius: var(--public-radius-sm);
  padding: 10px 24px;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  white-space: nowrap;
  height: 42px;
  font-family: inherit;

  &:hover:not(:disabled) {
    background: var(--public-accent-hover);
    border-color: var(--public-accent-hover);
  }

  &:active:not(:disabled) {
    transform: scale(0.98);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const StyledResultCard = styled.div`
  padding-top: 2rem;
`;

const StyledShortUrl = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  border-top: 1px solid var(--public-border-strong);
  border-bottom: 1px solid var(--public-border-strong);
  padding: 12px 16px;
  font-size: 16px;
  font-weight: 500;
  color: var(--public-text);
  word-break: break-all;
  font-family: var(--public-font-mono);
`;

const StyledOriginalUrl = styled(Text)<any>`
  word-break: break-all;
`;

const StyledHistoryTrigger = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: var(--public-surface-raised);
  color: var(--public-text);
  border: 1px solid var(--public-border-strong);
  border-radius: var(--public-radius-sm);
  padding: 8px 16px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  font-family: inherit;

  &:hover {
    background: var(--public-surface);
    border-color: var(--public-text);
  }
`;

/* Amp-style Custom Modal Overlay (Portaled to body) */
const StyledBackdrop = styled.div<{ $opened: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100vw;
  height: 100vh;
  z-index: 99999;
  background: rgba(18, 19, 17, 0.6);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1.5rem;
  opacity: ${props => (props.$opened ? 1 : 0)};
  pointer-events: ${props => (props.$opened ? "all" : "none")};
  transition: opacity 180ms ease;
`;

const StyledModalCard = styled.div<{ $opened: boolean }>`
  background: #ffffff;
  color: var(--public-text);
  width: 100%;
  max-width: 580px;
  border-radius: var(--public-radius-md);
  border: 1px solid var(--public-border-strong);
  box-shadow:
    0 24px 48px -12px rgba(0, 0, 0, 0.25),
    0 0 0 1px rgba(0, 0, 0, 0.05);
  transform: ${props => (props.$opened ? "scale(1) translateY(0)" : "scale(0.96) translateY(8px)")};
  transition: transform 180ms cubic-bezier(0.16, 1, 0.3, 1);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  max-height: calc(100vh - 4rem);
  margin: auto;
`;

const StyledModalHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.25rem 1.5rem;
  border-bottom: 1px solid var(--public-border);
  background: #fbfaf7;
`;

const StyledModalTitleGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 0.625rem;

  h2 {
    margin: 0;
    font-size: 1.125rem;
    font-weight: 600;
    font-family: var(--public-font-body);
    color: var(--public-text);
    letter-spacing: -0.01em;
  }
`;

const StyledCloseButton = styled.button`
  background: transparent;
  border: none;
  color: var(--public-text-muted);
  cursor: pointer;
  padding: 6px;
  border-radius: var(--public-radius-sm);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  transition: all 0.15s ease;

  &:hover {
    background: var(--public-border);
    color: var(--public-text);
  }
`;

const StyledModalBody = styled.div`
  padding: 1.25rem 1.5rem;
  overflow-y: auto;
  flex: 1;
  background: #ffffff;
  min-height: 180px;
`;

const StyledModalToolbar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 0.875rem;
  margin-bottom: 0.875rem;
  border-bottom: 1px solid var(--public-border);
`;

const StyledCountText = styled.span`
  font-size: 0.8125rem;
  color: var(--public-text-muted);
  font-weight: 500;
`;

const StyledClearButton = styled.button`
  background: transparent;
  border: 1px solid transparent;
  color: #d9383a;
  font-size: 0.8125rem;
  font-weight: 600;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 5px;
  padding: 4px 8px;
  border-radius: var(--public-radius-sm);
  transition: all 0.15s ease;

  &:hover {
    background: #fdf2f2;
    border-color: #f8d7d7;
  }
`;

const StyledItemRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  padding: 0.875rem 0;
  border-bottom: 1px solid var(--public-border);

  &:last-child {
    border-bottom: none;
  }
`;

const StyledItemInfo = styled.div`
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 3px;
`;

const StyledItemShortLink = styled.a`
  color: var(--public-accent);
  font-family: var(--public-font-mono);
  font-size: 0.875rem;
  font-weight: 600;
  text-decoration: none;
  word-break: break-all;

  &:hover {
    text-decoration: underline;
    text-decoration-color: currentColor;
  }
`;

const StyledItemOriginalUrl = styled.span`
  color: var(--public-text-muted);
  font-size: 0.775rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const StyledItemTime = styled.span`
  color: var(--public-text-subtle);
  font-size: 0.7rem;
`;

const StyledItemActions = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  flex-shrink: 0;
`;

const StyledIconButton = styled.button`
  background: transparent;
  border: 1px solid transparent;
  color: var(--public-text-muted);
  width: 32px;
  height: 32px;
  border-radius: var(--public-radius-sm);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.15s ease;

  &:hover {
    background: var(--public-surface);
    border-color: var(--public-border);
    color: var(--public-text);
  }

  &.delete-btn:hover {
    background: #fdf2f2;
    border-color: #f8d7d7;
    color: #d9383a;
  }
`;

const StyledPaginationFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.875rem 1.5rem;
  border-top: 1px solid var(--public-border);
  background: #fbfaf7;
`;

const StyledPageNav = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
`;

const StyledPageBtn = styled.button<{ $active?: boolean }>`
  background: ${props => (props.$active ? "var(--public-accent)" : "#ffffff")};
  color: ${props => (props.$active ? "#ffffff" : "var(--public-text)")};
  border: 1px solid ${props => (props.$active ? "var(--public-accent)" : "var(--public-border)")};
  border-radius: var(--public-radius-sm);
  padding: 4px 10px;
  font-size: 0.8125rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.15s ease;
  min-width: 32px;
  height: 32px;
  display: inline-flex;
  align-items: center;
  justify-content: center;

  &:hover:not(:disabled) {
    background: ${props =>
      props.$active ? "var(--public-accent-hover)" : "var(--public-surface)"};
    border-color: ${props =>
      props.$active ? "var(--public-accent-hover)" : "var(--public-border-strong)"};
  }

  &:disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }
`;

const StyledEmptyState = styled.div`
  text-align: center;
  padding: 3rem 1.5rem;
  color: var(--public-text-muted);
  font-size: 0.875rem;
`;

interface ShortenResult {
  code: string;
  shortUrl: string;
  originalUrl: string;
  createdAt: number;
}

const ITEMS_PER_PAGE = 5;
const HISTORY_KEY = "jsonviz_shorten_history";

const getHistory = (): ShortenResult[] => {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem(HISTORY_KEY) || "[]");
  } catch {
    return [];
  }
};

const saveHistory = (items: ShortenResult[]) => {
  localStorage.setItem(HISTORY_KEY, JSON.stringify(items.slice(0, 50)));
};

const isValidUrl = (str: string): boolean => {
  try {
    const url = new URL(str);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
};

const ShortenPage = () => {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<ShortenResult | null>(null);
  const [history, setHistory] = useState<ShortenResult[]>([]);
  const [historyOpened, setHistoryOpened] = useState(false);
  const [activePage, setActivePage] = useState(1);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setHistory(getHistory());
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && historyOpened) {
        setHistoryOpened(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [historyOpened]);

  const totalPages = Math.ceil(history.length / ITEMS_PER_PAGE);
  const paginatedHistory = history.slice(
    (activePage - 1) * ITEMS_PER_PAGE,
    activePage * ITEMS_PER_PAGE
  );

  const handleClearHistory = () => {
    setHistory([]);
    saveHistory([]);
    setActivePage(1);
    toast.success("History cleared.");
  };

  const handleDeleteItem = (code: string) => {
    const updated = history.filter(item => item.code !== code);
    setHistory(updated);
    saveHistory(updated);
    const newTotalPages = Math.ceil(updated.length / ITEMS_PER_PAGE);
    if (activePage > newTotalPages && newTotalPages > 0) {
      setActivePage(newTotalPages);
    }
    toast.success("Link removed from history.");
  };

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

      const updated = [newResult, ...history.filter(h => h.originalUrl !== normalizedUrl)];
      setHistory(updated);
      saveHistory(updated);

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
  }, [url, history]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !loading) {
      handleShorten();
    }
  };

  const modalContent = (
    <StyledBackdrop $opened={historyOpened} onClick={() => setHistoryOpened(false)}>
      <StyledModalCard $opened={historyOpened} onClick={e => e.stopPropagation()}>
        <StyledModalHeader>
          <StyledModalTitleGroup>
            <IoTimeOutline size={20} color="var(--public-accent)" />
            <h2>Recent Links</h2>
          </StyledModalTitleGroup>
          <StyledCloseButton onClick={() => setHistoryOpened(false)} aria-label="Close modal">
            <IoClose size={20} />
          </StyledCloseButton>
        </StyledModalHeader>

        <StyledModalBody>
          {history.length === 0 ? (
            <StyledEmptyState>No shortened links in your history yet.</StyledEmptyState>
          ) : (
            <>
              <StyledModalToolbar>
                <StyledCountText>
                  Showing {Math.min((activePage - 1) * ITEMS_PER_PAGE + 1, history.length)}–
                  {Math.min(activePage * ITEMS_PER_PAGE, history.length)} of {history.length} links
                </StyledCountText>
                <StyledClearButton onClick={handleClearHistory}>
                  <IoTrashOutline size={14} />
                  Clear history
                </StyledClearButton>
              </StyledModalToolbar>

              <div>
                {paginatedHistory.map(item => (
                  <StyledItemRow key={item.code}>
                    <StyledItemInfo>
                      <StyledItemShortLink
                        href={item.shortUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {item.shortUrl}
                      </StyledItemShortLink>
                      <StyledItemOriginalUrl title={item.originalUrl}>
                        {item.originalUrl}
                      </StyledItemOriginalUrl>
                      {item.createdAt && (
                        <StyledItemTime>{new Date(item.createdAt).toLocaleString()}</StyledItemTime>
                      )}
                    </StyledItemInfo>

                    <StyledItemActions>
                      <CopyButton value={item.shortUrl}>
                        {({ copied, copy }) => (
                          <Tooltip label={copied ? "Copied!" : "Copy"}>
                            <StyledIconButton onClick={copy} aria-label="Copy short link">
                              {copied ? (
                                <IoCheckmark size={16} color="var(--public-accent)" />
                              ) : (
                                <IoCopyOutline size={16} />
                              )}
                            </StyledIconButton>
                          </Tooltip>
                        )}
                      </CopyButton>
                      <Tooltip label="Open">
                        <StyledIconButton
                          as="a"
                          href={item.shortUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label="Open link"
                        >
                          <IoOpenOutline size={16} />
                        </StyledIconButton>
                      </Tooltip>
                      <Tooltip label="Delete">
                        <StyledIconButton
                          className="delete-btn"
                          onClick={() => handleDeleteItem(item.code)}
                          aria-label="Delete link"
                        >
                          <IoTrashOutline size={16} />
                        </StyledIconButton>
                      </Tooltip>
                    </StyledItemActions>
                  </StyledItemRow>
                ))}
              </div>
            </>
          )}
        </StyledModalBody>

        {history.length > 0 && (
          <StyledPaginationFooter>
            <StyledCountText>
              Page {activePage} of {Math.max(1, totalPages)}
            </StyledCountText>
            <StyledPageNav>
              <StyledPageBtn
                onClick={() => setActivePage(p => Math.max(1, p - 1))}
                disabled={activePage === 1}
                aria-label="Previous page"
              >
                <IoChevronBack size={16} />
              </StyledPageBtn>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map(pageNum => (
                <StyledPageBtn
                  key={pageNum}
                  $active={pageNum === activePage}
                  onClick={() => setActivePage(pageNum)}
                >
                  {pageNum}
                </StyledPageBtn>
              ))}

              <StyledPageBtn
                onClick={() => setActivePage(p => Math.min(totalPages, p + 1))}
                disabled={activePage === totalPages || totalPages === 0}
                aria-label="Next page"
              >
                <IoChevronForward size={16} />
              </StyledPageBtn>
            </StyledPageNav>
          </StyledPaginationFooter>
        )}
      </StyledModalCard>
    </StyledBackdrop>
  );

  return (
    <Layout>
      <Head>
        {generateNextSeo({
          ...SEO,
          title: "URL Shortener - JSON Visualization",
          description:
            "Shorten long URLs for free. Create short, shareable links powered by JSON Visualization.",
          canonical: "https://jsonviz.online/shorten",
        })}
      </Head>

      <PublicContainer>
        <PublicToolHeader>
          <div>
            <PublicEyebrow>Utility</PublicEyebrow>
            <h1>URL Shortener</h1>
            <p>Shorten long URLs into clean, shareable links.</p>
          </div>
          <div>
            <StyledHistoryTrigger onClick={() => setHistoryOpened(true)}>
              <IoTimeOutline size={18} />
              <span>History</span>
            </StyledHistoryTrigger>
          </div>
        </PublicToolHeader>
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
      </PublicContainer>

      {mounted ? createPortal(modalContent, document.body) : null}
    </Layout>
  );
};

export default ShortenPage;
