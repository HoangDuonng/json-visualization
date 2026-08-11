import React, { useState } from "react";
import Head from "next/head";
import { generateNextSeo } from "next-seo/pages";
import { IoTimeOutline } from "react-icons/io5";
import { toast } from "sonner";
import { buildSeo } from "../constants/seo";
import {
  getHistory,
  HistoryModal,
  saveHistory,
  ShortenForm,
  StyledHistoryTrigger,
  type ShortenResult,
} from "../features/shorten";
import Layout from "../layout/PageLayout";
import { PublicContainer, PublicEyebrow, PublicToolHeader } from "../layout/PageLayout/PublicPage";

const ShortenPage = () => {
  const [history, setHistory] = useState<ShortenResult[]>(() => getHistory());
  const [historyOpened, setHistoryOpened] = useState(false);

  const handleShortenSuccess = (newResult: ShortenResult) => {
    const updated = [newResult, ...history.filter(h => h.originalUrl !== newResult.originalUrl)];
    setHistory(updated);
    saveHistory(updated);
  };

  const handleClearHistory = () => {
    setHistory([]);
    saveHistory([]);
    toast.success("History cleared.");
  };

  const handleDeleteItem = (code: string) => {
    const updated = history.filter(item => item.code !== code);
    setHistory(updated);
    saveHistory(updated);
    toast.success("Link removed from history.");
  };

  return (
    <Layout>
      <Head>
        {generateNextSeo(
          buildSeo({
            title: "URL Shortener - JSON Visualization",
            description:
              "Shorten long URLs for free. Create short, shareable links powered by JSON Visualization.",
            canonical: "https://jsonviz.online/shorten",
          })
        )}
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
        <ShortenForm onShortenSuccess={handleShortenSuccess} />
      </PublicContainer>

      <HistoryModal
        opened={historyOpened}
        onClose={() => setHistoryOpened(false)}
        history={history}
        onClear={handleClearHistory}
        onDelete={handleDeleteItem}
      />
    </Layout>
  );
};

export default ShortenPage;
