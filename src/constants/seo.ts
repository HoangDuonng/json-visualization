import type { DefaultSeoProps } from "next-seo/pages";

export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://jsonviz.online";
export const OG_IMAGE_URL = `${SITE_URL}/jsonvisualization.png`;

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
        url: OG_IMAGE_URL,
        secureUrl: OG_IMAGE_URL,
        width: 1731,
        height: 909,
        type: "image/png",
        alt: "JSON Visualization - Online JSON viewer and editor",
      },
      {
        url: `${SITE_URL}/assets/jsonvisualization.png`,
        secureUrl: `${SITE_URL}/assets/jsonvisualization.png`,
        width: 1731,
        height: 909,
        type: "image/png",
        alt: "JSON Visualization - Online JSON viewer and editor",
      },
    ],
  },
  twitter: {
    handle: "@HoanggDuonng",
    site: "@HoanggDuonng",
    cardType: "summary_large_image",
  },
  additionalMetaTags: [
    { name: "theme-color", content: "#36393E" },
    { name: "application-name", content: "JSON Visualization" },
    { property: "og:image", content: OG_IMAGE_URL },
    { property: "og:image:secure_url", content: OG_IMAGE_URL },
    { property: "og:image:type", content: "image/png" },
    { property: "og:image:width", content: "1731" },
    { property: "og:image:height", content: "909" },
    { name: "twitter:image", content: OG_IMAGE_URL },
    { name: "twitter:card", content: "summary_large_image" },
  ],
  additionalLinkTags: [
    { rel: "manifest", href: "/manifest.json" },
    { rel: "icon", href: "/favicon.ico", sizes: "48x48" },
    { rel: "icon", type: "image/png", sizes: "32x32", href: "/assets/favicon-32x32.png" },
    { rel: "icon", type: "image/png", sizes: "16x16", href: "/assets/favicon-16x16.png" },
    { rel: "apple-touch-icon", sizes: "180x180", href: "/assets/apple-touch-icon.png" },
  ],
};
