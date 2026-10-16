/**
 * The footer at the bottom of every page (styled as the back of an envelope).
 * Contact details and social links come from content/site.json.
 */
import Link from "next/link";
import type { SiteSettings } from "@/lib/types";
import { Icon } from "./Icons";

export default function SiteFooter({ site }: { site: SiteSettings }) {
  const socials = [
    { url: site.instagram, label: "Instagram", icon: "instagram" },
    { url: site.tiktok, label: "TikTok", icon: "tiktok" },
    { url: site.linkedin, label: "LinkedIn", icon: "linkedin" },
    { url: site.email && `mailto:${site.email}`, label: "Email", icon: "mail" },
  ] as const;

  return (
    <footer className="site-footer">
      <div className="wrap footer-inner">
        <div className="footer-brand">
          <img src="/images/site/seal.png" alt="" />
          <div>
            <strong>{site.name}</strong>
            <p>Wilfrid Laurier University, Waterloo campus</p>
            <div className="socials">
              {socials.map(
                (s) =>
                  s.url && (
                    <a key={s.label} href={s.url} aria-label={s.label}>
                      <Icon name={s.icon} />
                    </a>
                  ),
              )}
            </div>
          </div>
        </div>

        <div>
          <h2>Visit</h2>
          <ul className="footer-links">
            <li>
              <Link href="/#about">About</Link>
            </li>
            <li>
              <Link href="/events/">Events</Link>
            </li>
            <li>
              <Link href="/team/">Our team</Link>
            </li>
            {site.joinUrl && (
              <li>
                <a href={site.joinUrl}>Join on Presence</a>
              </li>
            )}
          </ul>
        </div>

        <div>
          <h2>Contact</h2>
          <ul className="footer-links">
            {site.email && (
              <li>
                <a href={`mailto:${site.email}`}>{site.email}</a>
              </li>
            )}
            {site.instagram && (
              <li>
                <a href={site.instagram}>Message us on Instagram</a>
              </li>
            )}
          </ul>
        </div>
      </div>

      <div className="wrap footer-bottom">
        <span>
          © {new Date().getFullYear()} {site.name}
        </span>
      </div>
    </footer>
  );
}
