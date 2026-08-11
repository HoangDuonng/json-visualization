import React, { useEffect, useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import styled from "styled-components";
import { get, ref } from "firebase/database";
import { generateNextSeo } from "next-seo/pages";
import { buildSeo } from "../constants/seo";
import Layout from "../layout/PageLayout";
import {
  PublicActions,
  PublicContainer,
  PublicEyebrow,
  PublicPrimaryLink,
  PublicToolHeader,
} from "../layout/PageLayout/PublicPage";
import { getDb } from "../lib/db";

const StyledStatus = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding-block: 2rem;
  color: var(--public-text-muted);
  font-size: var(--public-type-body);
`;

const StyledIndicator = styled.span`
  width: 0.65rem;
  height: 0.65rem;
  border: 1px solid var(--public-accent);
  border-radius: 50%;
  animation: pulse 1.2s ease-in-out infinite;

  @keyframes pulse {
    50% {
      background: var(--public-accent);
    }
  }
`;

const RedirectPage = () => {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const missingCode = router.isReady && !router.query.c;

  useEffect(() => {
    if (!router.isReady) return;

    const code = router.query.c as string | undefined;
    if (!code) return;

    const resolve = async () => {
      try {
        const db = getDb();
        const snapshot = await get(ref(db, `shortlinks/${code}`));

        if (!snapshot.exists()) {
          setError("not_found");
          return;
        }

        const data = snapshot.val();
        window.location.replace(data.url);
      } catch {
        setError("server_error");
      }
    };

    resolve();
  }, [router.isReady, router.query.c]);

  if (error || missingCode) {
    const errorType = error || "not_found";

    return (
      <Layout>
        <Head>
          {generateNextSeo(
            buildSeo({
              title: "Link Not Found | JSON Visualization",
              noindex: true,
            })
          )}
        </Head>
        <PublicContainer $narrow>
          <PublicToolHeader>
            <div>
              <PublicEyebrow>Short link</PublicEyebrow>
              <h1>{errorType === "not_found" ? "Link Not Found" : "Something went wrong"}</h1>
              <p>
                {errorType === "not_found"
                  ? "This short link does not exist or has expired."
                  : "An error occurred while resolving this link."}
              </p>
              <PublicActions>
                <PublicPrimaryLink href="/shorten">Create a new short link</PublicPrimaryLink>
              </PublicActions>
            </div>
          </PublicToolHeader>
        </PublicContainer>
      </Layout>
    );
  }

  return (
    <Layout>
      <Head>
        {generateNextSeo(
          buildSeo({
            title: "Redirecting... | JSON Visualization",
          })
        )}
      </Head>
      <PublicContainer $narrow>
        <PublicToolHeader>
          <div>
            <PublicEyebrow>Short link</PublicEyebrow>
            <h1>Taking you there</h1>
            <p>We are resolving the destination for this link.</p>
          </div>
        </PublicToolHeader>
        <StyledStatus role="status" aria-live="polite">
          <StyledIndicator aria-hidden="true" />
          Redirecting...
        </StyledStatus>
      </PublicContainer>
    </Layout>
  );
};

export default RedirectPage;
