import React, { useEffect, useState } from "react";
import { CopyButton, Tooltip } from "@mantine/core";
import { createPortal } from "react-dom";
import {
  IoCheckmark,
  IoChevronBack,
  IoChevronForward,
  IoClose,
  IoCopyOutline,
  IoOpenOutline,
  IoTimeOutline,
  IoTrashOutline,
} from "react-icons/io5";
import type { ShortenResult } from "../../types";
import { ITEMS_PER_PAGE } from "../../utils/historyStorage";
import {
  StyledBackdrop,
  StyledClearButton,
  StyledCloseButton,
  StyledCountText,
  StyledEmptyState,
  StyledIconButton,
  StyledItemActions,
  StyledItemInfo,
  StyledItemOriginalUrl,
  StyledItemRow,
  StyledItemShortLink,
  StyledItemTime,
  StyledModalBody,
  StyledModalCard,
  StyledModalHeader,
  StyledModalTitleGroup,
  StyledModalToolbar,
  StyledPageBtn,
  StyledPageNav,
  StyledPaginationFooter,
} from "./styles";

interface HistoryModalProps {
  opened: boolean;
  onClose: () => void;
  history: ShortenResult[];
  onClear: () => void;
  onDelete: (code: string) => void;
}

export const HistoryModal: React.FC<HistoryModalProps> = ({
  opened,
  onClose,
  history,
  onClear,
  onDelete,
}) => {
  const [activePage, setActivePage] = useState(1);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && opened) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [opened, onClose]);

  const totalPages = Math.ceil(history.length / ITEMS_PER_PAGE);
  const paginatedHistory = history.slice(
    (activePage - 1) * ITEMS_PER_PAGE,
    activePage * ITEMS_PER_PAGE
  );

  const handleDeleteItem = (code: string) => {
    onDelete(code);
    const newTotalPages = Math.ceil((history.length - 1) / ITEMS_PER_PAGE);
    if (activePage > newTotalPages && newTotalPages > 0) {
      setActivePage(newTotalPages);
    }
  };

  if (typeof window === "undefined" || !opened) return null;

  return createPortal(
    <StyledBackdrop $opened={opened} onClick={onClose}>
      <StyledModalCard $opened={opened} onClick={e => e.stopPropagation()}>
        <StyledModalHeader>
          <StyledModalTitleGroup>
            <IoTimeOutline size={20} color="var(--public-accent)" />
            <h2>Recent Links</h2>
          </StyledModalTitleGroup>
          <StyledCloseButton onClick={onClose} aria-label="Close modal">
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
                <StyledClearButton onClick={onClear}>
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
    </StyledBackdrop>,
    document.body
  );
};
