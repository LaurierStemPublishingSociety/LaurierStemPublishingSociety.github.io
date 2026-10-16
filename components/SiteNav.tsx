"use client";

/**
 * The bar at the top of every page.
 * To add a page to the menu, add it to `links` below.
 */
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Icon } from "./Icons";

const links = [
  { href: "/", label: "Home" },
  { href: "/events/", label: "Events" },
  { href: "/team/", label: "Our team" },
  { href: "/#faq", label: "FAQ" },
];

export default function SiteNav({ joinUrl }: { joinUrl?: string }) {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Show a thin line under the bar once the page is scrolled
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the phone menu after moving to another page
  useEffect(() => setMenuOpen(false), [pathname]);

  const isCurrent = (href: string) =>
    href === "/" ? pathname === "/" : !href.includes("#") && pathname.startsWith(href);

  return (
    <nav className={`site-nav${scrolled ? " scrolled" : ""}`} aria-label="Main">
      <div className="wrap nav-inner">
        <Link className="brand" href="/">
          <img src="/images/site/seal.png" alt="" />
          <span>LSPS</span>
        </Link>

        <button
          className="nav-toggle"
          type="button"
          aria-expanded={menuOpen}
          aria-controls="nav-links"
          aria-label="Menu"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <Icon name={menuOpen ? "close" : "menu"} />
        </button>

        <ul className={`nav-links${menuOpen ? " open" : ""}`} id="nav-links">
          {links.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                aria-current={isCurrent(link.href) ? "page" : undefined}
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </Link>
            </li>
          ))}
          {joinUrl && (
            <li>
              <a className="btn btn-primary btn-small" href={joinUrl}>
                Join LSPS
              </a>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
}
