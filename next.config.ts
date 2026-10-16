import type { NextConfig } from "next";

/**
 * Next.js settings.
 *
 * - output: "export" builds the site into plain HTML/CSS/JS files in the
 *   `out/` folder, which is what GitHub Pages hosts.
 * - trailingSlash: true makes /events/ become events/index.html, so links
 *   work on GitHub Pages without a server.
 * - images.unoptimized: GitHub Pages can't resize images on the fly.
 */
const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
};

export default nextConfig;
