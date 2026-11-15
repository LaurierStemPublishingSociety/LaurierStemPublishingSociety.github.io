import type { NextConfig } from "next";

/**
 * Next.js settings. The site is hosted on Vercel, which builds it with
 * `next build` on every push to main.
 *
 * - trailingSlash: true keeps page addresses ending in a slash (/events/),
 *   which is how every link on the site is written.
 * - allowedDevOrigins: only matters for `npm run dev`. Lets a phone on the
 *   same Wi-Fi open the dev site at http://<this computer's 192.168 address>:3000.
 *   Without it the page loads but menus and buttons don't work.
 */
const nextConfig: NextConfig = {
  trailingSlash: true,
  allowedDevOrigins: ["192.168.*.*"],
};

export default nextConfig;
