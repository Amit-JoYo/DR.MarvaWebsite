import path from "node:path";
import type { NextConfig } from "next";

const isDev = process.env.NODE_ENV === "development";

const nextConfig: NextConfig = {
  // Static export so the site can be hosted on GitHub Pages (or any static host).
  output: "export",
  trailingSlash: true,
  // Set to "/<repo-name>" when deploying under a sub-path (see .github/workflows/deploy.yml).
  basePath: process.env.NEXT_PUBLIC_BASE_PATH || undefined,
  images: { unoptimized: true },
  // Locally, "/" has no page (static hosting serves public/index.html instead), so send it to Hebrew.
  ...(isDev && {
    async redirects() {
      return [{ source: "/", destination: "/he/", permanent: false }];
    },
  }),
  turbopack: {
    root: path.join(__dirname),
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
