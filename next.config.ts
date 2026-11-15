import type { NextConfig } from "next";

/**
 * Next.js settings.
 *
 * - output: "export" builds the site into plain HTML/CSS/JS files in the
 *   `out/` folder, which is what GitHub Pages hosts.
 * - trailingSlash: true makes /events/ become events/index.html, so links
 *   work on GitHub Pages without a server.
 * - images.unoptimized: GitHub Pages can't resize images on the fly.
 * - allowedDevOrigins: only matters for `npm run dev`. Lets a phone on the
 *   same Wi-Fi open the dev site at http://<this computer's 192.168 address>:3000.
 *   Without it the page loads but menus and buttons don't work.
 */
const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
  allowedDevOrigins: ["192.168.*.*"],
};

export default nextConfig;
