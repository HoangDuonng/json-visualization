import type { DefaultSeoProps } from "next-seo/pages";

export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://jsonviz.online";

export const SEO: DefaultSeoProps = {
  titleTemplate: "%s | JSON Visualization",
  defaultTitle:
    "JSON Visualization | Online JSON Viewer - Transform your data into interactive graphs",
  title: "JSON Visualization | Online JSON Viewer - Transform your data into interactive graphs",
  description:
    "Free online JSON viewer: visualize JSON as graphs, format, validate, convert to CSV/YAML/XML. Edit, query with jq, generate TypeScript/Go/Rust types. No signup, data stays in your browser.",
  canonical: SITE_URL,
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: "JSON Visualization",
    title: "JSON Visualization | Online JSON Viewer & Editor",
    description:
      "Free online JSON viewer: visualize, format, validate, convert JSON. Edit, jq query, generate types. Secure, no signup.",
    locale: "en_US",
    images: [
      {
        url: "https://jsonviz.online/jsonvisualization.png",
        width: 1200,
        height: 627,
        alt: "JSON Visualization - Online JSON viewer and editor",
      },
    ],
  },
  twitter: {
    handle: "@HoanggDuonng",
    cardType: "summary_large_image",
  },
  additionalMetaTags: [
    { name: "theme-color", content: "#36393E" },
    { name: "application-name", content: "JSON Visualization" },
  ],
  additionalLinkTags: [
    { rel: "manifest", href: "/manifest.json" },
    { rel: "icon", href: "/favicon.ico", sizes: "48x48" },
    { rel: "icon", type: "image/png", sizes: "32x32", href: "/assets/favicon-32x32.png" },
    { rel: "icon", type: "image/png", sizes: "16x16", href: "/assets/favicon-16x16.png" },
    { rel: "apple-touch-icon", sizes: "180x180", href: "/assets/apple-touch-icon.png" },
  ],
};
