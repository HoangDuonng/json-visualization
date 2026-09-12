const path = require("path");
const webpack = require("webpack");
const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

const normalizeUrl = value => (value || "").replace(/\/+$/, "");

const librarySiteUrl = normalizeUrl(
  process.env.NEXT_PUBLIC_LIBRARY_SITE_URL || process.env.VITE_APP_LIBRARY_URL
);

const libraryBackendUrl = normalizeUrl(
  process.env.NEXT_PUBLIC_LIBRARY_BACKEND_URL || process.env.VITE_APP_LIBRARY_BACKEND
);

if (!libraryBackendUrl) {
  throw new Error(
    "Missing library backend URL. Set NEXT_PUBLIC_LIBRARY_BACKEND_URL or VITE_APP_LIBRARY_BACKEND."
  );
}

/**
 * @type {import('next').NextConfig}
 */
const config = {
  output: "export",
  reactStrictMode: false,
  productionBrowserSourceMaps: true,
  devIndicators: false,
  typescript: {
    // Forked JsonDraw source has strict-null-checks conflicts
    // Webpack still compiles everything; this only skips the TS checker step
    ignoreBuildErrors: true,
  },
  compiler: {
    styledComponents: true,
  },
  sassOptions: {
    silenceDeprecations: ["legacy-js-api"],
  },
  turbopack: {
    resolveAlias: {
      fs: {
        browser: "./shims/empty.ts",
      },
    },
  },
  webpack: (config, { isServer }) => {
    config.resolve.fallback = { fs: false };
    config.output.webassemblyModuleFilename = "static/wasm/[modulehash].wasm";
    config.experiments = { asyncWebAssembly: true, layers: true };

    if (!isServer) {
      config.output.environment = { ...config.output.environment, asyncFunction: true };
    }

    // JsonDraw internal package aliases (local source)
    config.resolve.alias = {
      ...config.resolve.alias,
      "@jsondraw/common": path.resolve(__dirname, "src/jsondraw/common"),
      "@jsondraw/math": path.resolve(__dirname, "src/jsondraw/math"),
      "@jsondraw/element": path.resolve(__dirname, "src/jsondraw/element"),
      "@jsondraw/jsondraw": path.resolve(__dirname, "src/jsondraw/engine"),
      "@jsondraw/utils": path.resolve(__dirname, "src/jsondraw/utils"),
      "@jsondraw-runtime$": path.resolve(__dirname, "src/jsondraw/index.ts"),
      "@jsondraw-runtime/font$": path.resolve(__dirname, "src/jsondraw/common/constants.ts"),
    };

    // Shim import.meta.env for JsonDraw source (Vite → Next.js)
    config.plugins.push(
      new webpack.DefinePlugin({
        "import.meta.env.DEV": JSON.stringify(process.env.NODE_ENV === "development"),
        "import.meta.env.PROD": JSON.stringify(process.env.NODE_ENV === "production"),
        "import.meta.env.MODE": JSON.stringify(process.env.NODE_ENV || "development"),
        "import.meta.env.PKG_NAME": JSON.stringify("@jsondraw/jsondraw"),
        "import.meta.env.PKG_VERSION": JSON.stringify("0.18.0"),
        // Neutralize Vite-specific env vars
        "import.meta.env.VITE_APP_DISABLE_SENTRY": JSON.stringify("true"),
        "import.meta.env.VITE_APP_ENABLE_TRACKING": JSON.stringify("false"),
        "import.meta.env.VITE_APP_LIBRARY_URL": JSON.stringify(librarySiteUrl),
        "import.meta.env.VITE_APP_LIBRARY_BACKEND": JSON.stringify(libraryBackendUrl),
        "import.meta.env.VITE_APP_AI_BACKEND": JSON.stringify(""),
        "import.meta.env.VITE_APP_BACKEND_V2_GET_URL": JSON.stringify(
          "https://json.jsonviz.online/api/v2/"
        ),
        "import.meta.env.VITE_APP_BACKEND_V2_POST_URL": JSON.stringify(
          "https://json.jsonviz.online/api/v2/post/"
        ),
        "import.meta.env.VITE_APP_FIREBASE_CONFIG": JSON.stringify("{}"),
        "import.meta.env.VITE_APP_PORTAL_URL": JSON.stringify(""),
        "import.meta.env.VITE_APP_WS_SERVER_URL": JSON.stringify(""),
        "import.meta.env.VITE_WORKER_ID": JSON.stringify(""),
        "import.meta.env.VITE_APP_DEBUG_ENABLE_TEXT_CONTAINER_BOUNDING_BOX":
          JSON.stringify("false"),
        "import.meta.env.VITE_APP_PLUS_LP": JSON.stringify(""),
      })
    );

    // Bypass Next.js global CSS restriction for the forked JsonDraw source.
    // Prepend a custom rule that intercepts SCSS/CSS from src/jsondraw/ directory
    // BEFORE Next.js's built-in CSS rules (which block global CSS outside _app.tsx).
    const jsondrawDir = path.resolve(__dirname, "src/jsondraw");

    // Find the oneOf rule group (Next.js puts all CSS rules inside a oneOf)
    for (const rule of config.module.rules) {
      if (rule.oneOf) {
        // Prepend woff2 font handler for JsonDraw source
        rule.oneOf.unshift({
          test: /\.woff2$/,
          include: jsondrawDir,
          ...(isServer
            ? { use: [require.resolve("null-loader")] }
            : {
                type: "asset/resource",
                generator: { filename: "static/fonts/[name][ext]" },
              }),
        });
        // Prepend our jsondraw SCSS/CSS rule at the beginning of oneOf
        rule.oneOf.unshift({
          test: /\.(scss|sass|css)$/,
          include: jsondrawDir,
          use: isServer
            ? [require.resolve("null-loader")] // Server doesn't need styles
            : [
                require.resolve("style-loader"),
                {
                  loader: require.resolve("css-loader"),
                  options: {
                    importLoaders: 2,
                    modules: false,
                  },
                },
                {
                  loader: require.resolve("sass-loader"),
                  options: {
                    sassOptions: {
                      silenceDeprecations: ["legacy-js-api"],
                    },
                  },
                },
              ],
        });
        break;
      }
    }

    return config;
  },
};

const configExport = () => {
  if (process.env.ANALYZE === "true") return withBundleAnalyzer(config);
  return config;
};

module.exports = configExport();
