import type { DocumentContext, DocumentInitialProps } from "next/document";
import Document, { Html, Head, Main, NextScript } from "next/document";
import { ColorSchemeScript } from "@mantine/core";
import { ServerStyleSheet } from "styled-components";
import { OG_IMAGE_URL, SITE_URL } from "../constants/seo";

class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext): Promise<DocumentInitialProps> {
    const sheet = new ServerStyleSheet();
    const originalRenderPage = ctx.renderPage;

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: App => props => sheet.collectStyles(<App {...props} />),
        });

      const initialProps = await Document.getInitialProps(ctx);

      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </>
        ),
      };
    } finally {
      sheet.seal();
    }
  }

  render() {
    return (
      <Html lang="en">
        <Head>
          <ColorSchemeScript />
          <meta property="og:type" content="website" />
          <meta property="og:site_name" content="JSON Visualization" />
          <meta property="og:title" content="JSON Visualization | Online JSON Viewer & Editor" />
          <meta
            property="og:description"
            content="Free online JSON viewer: visualize, format, validate, convert JSON. Edit, jq query, generate types. Secure, no signup."
          />
          <meta property="og:url" content={SITE_URL} />
          <meta property="og:image" content={OG_IMAGE_URL} />
          <meta property="og:image:secure_url" content={OG_IMAGE_URL} />
          <meta property="og:image:type" content="image/jpeg" />
          <meta property="og:image:width" content="1200" />
          <meta property="og:image:height" content="630" />
          <meta
            property="og:image:alt"
            content="JSON Visualization - Online JSON viewer and editor"
          />
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:site" content="@HoanggDuonng" />
          <meta name="twitter:title" content="JSON Visualization | Online JSON Viewer & Editor" />
          <meta
            name="twitter:description"
            content="Free online JSON viewer: visualize, format, validate, convert JSON. Edit, jq query, generate types. Secure, no signup."
          />
          <meta name="twitter:image" content={OG_IMAGE_URL} />
          <link rel="icon" href="/favicon.ico" sizes="48x48" />
          <link rel="icon" type="image/png" sizes="32x32" href="/assets/favicon-32x32.png" />
          <link rel="icon" type="image/png" sizes="16x16" href="/assets/favicon-16x16.png" />
          <link rel="apple-touch-icon" sizes="180x180" href="/assets/apple-touch-icon.png" />
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
          <link
            href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&display=swap"
            rel="stylesheet"
            media="print"
            // @ts-expect-error non-render-blocking font: apply when loaded
            onLoad="this.media='all'"
          />
          <noscript>
            <link
              rel="stylesheet"
              href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&display=swap"
            />
          </noscript>
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
