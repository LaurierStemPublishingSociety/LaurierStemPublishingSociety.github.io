/**
 * The frame shared by every page: fonts, styles, the top menu and footer.
 */
import type { Metadata, Viewport } from "next";
import SiteFooter from "@/components/SiteFooter";
import SiteNav from "@/components/SiteNav";
import { site } from "@/lib/content";

import "@/styles/tokens.css";
import "@/styles/base.css";
import "@/styles/site-chrome.css";
import "@/styles/home.css";
import "@/styles/events.css";
import "@/styles/team.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://laurierstempublishingsociety.github.io"),
  title: {
    default: site.name,
    template: `%s · ${site.name}`,
  },
  description: site.tagline,
  icons: { icon: "/images/site/seal.png" },
  openGraph: {
    title: site.name,
    description: site.tagline,
    images: ["/images/site/seal.png"],
  },
};

export const viewport: Viewport = {
  themeColor: "#f4f7f5",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        {/* Fonts: Literata for headings, Schibsted Grotesk for everything else */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Literata:ital,opsz,wght@0,7..72,400..700;1,7..72,400..600&family=Schibsted+Grotesk:wght@400..700&display=swap"
        />
      </head>
      <body>
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        <SiteNav joinUrl={site.joinUrl} />
        <main id="main">{children}</main>
        <SiteFooter site={site} />
      </body>
    </html>
  );
}
