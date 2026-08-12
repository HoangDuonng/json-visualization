import React from "react";
import type { AppProps } from "next/app";
import Head from "next/head";
import { useRouter } from "next/router";
import { createTheme, MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";
import { CodeHighlightAdapterProvider, createShikiAdapter } from "@mantine/code-highlight";
import "@mantine/code-highlight/styles.css";
import { ThemeProvider } from "styled-components";
import { SoftwareApplicationJsonLd } from "next-seo";
import { generateDefaultSeo } from "next-seo/pages";
import { GoogleAnalytics } from "nextjs-google-analytics";
import { Toaster } from "sonner";
import GlobalStyle from "../constants/globalStyle";
import { SEO, SITE_URL } from "../constants/seo";
import { lightTheme } from "../constants/theme";
import { CollabProvider } from "../features/collab/CollabRoot";
import { smartColorSchemeManager } from "../lib/utils/mantineColorScheme";

async function loadShiki() {
  const { createHighlighter } = await import("shiki");
  const shiki = await createHighlighter({
    langs: ["typescript", "json", "go", "kotlin", "rust"],
    themes: [],
  });

  return shiki;
}

const shikiAdapter = createShikiAdapter(loadShiki);

const theme = createTheme({
  autoContrast: true,
  fontSmoothing: false,
  respectReducedMotion: true,
  cursorType: "pointer",
  fontFamily: '"Playfair Display", serif',
  defaultGradient: {
    from: "#388cdb",
    to: "#0f037f",
    deg: 180,
  },
  primaryShade: 8,
  colors: {
    brightBlue: [
      "#e6f2ff",
      "#cee1ff",
      "#9bc0ff",
      "#649dff",
      "#3980fe",
      "#1d6dfe",
      "#0964ff",
      "#0054e4",
      "#004acc",
      "#003fb5",
    ],
  },
  radius: {
    lg: "12px",
  },
  components: {
    Button: {
      defaultProps: {
        fw: 500,
      },
    },
  },
});

function JsonViz({ Component, pageProps }: AppProps) {
  const { pathname } = useRouter();

  // Create a single smart manager that handles pathname logic internally
  const colorSchemeManager = smartColorSchemeManager({
    key: "editor-color-scheme",
    getPathname: () => pathname,
    dynamicPaths: ["/editor"], // Only editor paths use dynamic theme
  });

  const webSiteJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "JSON Visualization",
    url: SITE_URL,
    description: SEO.description,
  };

  return (
    <>
      <Head>
        {generateDefaultSeo(SEO)}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(webSiteJsonLd) }}
        />
      </Head>
      <SoftwareApplicationJsonLd
        name="JSON Visualization"
        type="SoftwareApplication"
        operatingSystem="Browser"
        applicationCategory="DeveloperApplication"
        aggregateRating={{ ratingValue: 4.9, ratingCount: 19 }}
        datePublished="2026-05-02"
      />
      <MantineProvider
        colorSchemeManager={colorSchemeManager}
        defaultColorScheme="light"
        theme={theme}
      >
        <CodeHighlightAdapterProvider adapter={shikiAdapter}>
          <ThemeProvider theme={lightTheme}>
            <Toaster
              position="bottom-right"
              toastOptions={{
                style: {
                  background: "#ffffff",
                  color: "#1a1a1a",
                  border: "1px solid #e8e4db",
                  borderRadius: 8,
                  fontSize: 14,
                },
                classNames: {
                  success: "toast-success",
                  error: "toast-error",
                  warning: "toast-warning",
                },
              }}
            />
            <style>{`
              .toast-success {
                border-color: #37ff8b !important;
                color: #166534 !important;
              }
              .toast-error {
                border-color: #ef4444 !important;
                color: #991b1b !important;
              }
              .toast-warning {
                border-color: #f7c948 !important;
                color: #854d0e !important;
              }
            `}</style>
            <GlobalStyle />
            {process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID && <GoogleAnalytics trackPageViews />}
            <CollabProvider>
              <Component {...pageProps} />
            </CollabProvider>
          </ThemeProvider>
        </CodeHighlightAdapterProvider>
      </MantineProvider>
    </>
  );
}

export default JsonViz;
