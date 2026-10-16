/**
 * The shape of the content files in /content.
 *
 * If you add a new field to one of the JSON files, add it here too so the
 * code knows about it.
 */

/** content/site.json: home page text, links and contact details */
export type SiteSettings = {
  name: string;
  shortName?: string;
  tagline?: string;
  intro?: string;
  joinUrl?: string;
  email?: string;
  instagram?: string;
  tiktok?: string;
  linkedin?: string;
  aboutHeading?: string;
  about?: string;
  aboutImage?: string;
  programs?: { title: string; description?: string; image?: string }[];
  joinSteps?: { title: string; description?: string }[];
  faq?: { question: string; answer?: string }[];
  gallery?: { image: string; caption?: string }[];
};

/** One entry in content/events.json */
export type ClubEvent = {
  title: string;
  /** "2026-10-28T18:00" (Waterloo local time) or just "2026-10-28" */
  start: string;
  end?: string;
  location?: string;
  type?: string;
  description?: string;
  image?: string;
  /** RSVP / Presence link */
  link?: string;
  hidden?: boolean;
};

/** One entry in content/team.json */
export type TeamMember = {
  name: string;
  role?: string;
  bio?: string;
  photo?: string;
  /** Which part of the photo to keep when it's cropped */
  focus?: "top" | "center" | "bottom";
  linkedin?: string;
  hidden?: boolean;
};
