/**
 * Loads the files in /content so pages can use them.
 *
 * To change the site's text, events or team, edit the JSON files in
 * /content. After a push to main, Vercel rebuilds the site with the new
 * content.
 */
import siteJson from "@/content/site.json";
import eventsJson from "@/content/events.json";
import teamJson from "@/content/team.json";
import type { ClubEvent, SiteSettings, TeamYear } from "./types";

export const site = siteJson as SiteSettings;

/** Events that aren't hidden and have a title and a start date */
export const events = (eventsJson as ClubEvent[]).filter(
  (event) => event && event.title && event.start && !event.hidden,
);

/**
 * Team for each year that isn't hidden, in the order they appear in the file
 * (put the newest year first). Hidden members are left out.
 */
export const teamYears = (teamJson as TeamYear[])
  .filter((year) => year && year.year && !year.hidden)
  .map((year) => ({
    ...year,
    members: (year.members ?? []).filter(
      (member) => member && member.name && !member.hidden,
    ),
  }));
