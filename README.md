# Laurier STEM Publishing Society website

The club website, live at **https://laurierstempublishingsociety.github.io**.

It's built with [Next.js](https://nextjs.org) and hosted for free on GitHub Pages.

---

## Where do I change…?

| I want to change…                             | Edit this                                             |
| --------------------------------------------- | ----------------------------------------------------- |
| Events                                        | `content/events.json`                                 |
| Team members                                  | `content/team.json`                                   |
| Home page text, FAQ, join steps, links, email | `content/site.json`                                   |
| Colours or fonts                              | `styles/tokens.css`                                   |
| The top menu (add/remove a link)              | `components/SiteNav.tsx` (the `links` list)           |
| The footer                                    | `components/SiteFooter.tsx`                           |
| Layout of the home page sections              | `app/page.tsx` + `styles/home.css`                    |
| How the calendar works                        | `components/EventsCalendar.tsx` + `styles/events.css` |
| How a single event looks                      | `components/EventCard.tsx`                            |
| How a team member looks                       | `components/TeamMemberCard.tsx` + `styles/team.css`   |
| Photos and the logo                           | `public/images/`                                      |
| What fields the content files can have        | `lib/types.ts`                                        |

---

## Editing content

All of the site's text, events and team members are in the three JSON files in `content/`. You can edit them right on GitHub: open the file, click the ✏️ pencil, make your change and press **Commit changes**. The site updates within about 2 minutes.

JSON is picky. Keep the quotes and commas exactly as in the entries around your change. If the site doesn't update, check the repo's **Actions** tab. A red ❌ means the build failed, and clicking it shows the line with the problem.

### Add an event (`content/events.json`)

Copy an existing event, paste it after it (with a comma between the two), and change the values:

```json
{
  "title": "Monthly discussion circle",
  "start": "2026-10-28T18:00",
  "end": "2026-10-28T19:00",
  "location": "Science Building N1002",
  "type": "Discussion",
  "description": "Bring a draft, a question or just curiosity.",
  "image": "",
  "link": "https://laurierstudentsunion.presence.io/event/..."
}
```

- `start` / `end`: `YYYY-MM-DDTHH:MM` in 24-hour Waterloo time, so 6 PM is `18:00`. `end` can be left as `""`. For an all-day event, use just the date (`"2026-11-12"`).
- `link`: the Presence page. Adds an RSVP button. Use `""` for none.
- `image`: a photo for the Past events gallery, e.g. `"/images/events/book-drive.jpg"`. Put the file in `public/images/events/` first.
- `"hidden": true` keeps an event in the file without showing it on the site.

You don't need to remove old events. Once an event's date passes, it moves to "Past events" on its own.

### Add a team member (`content/team.json`)

```json
{
  "name": "Full Name",
  "role": "VP of Events",
  "bio": "One or two sentences about what they do.",
  "photo": "/images/team/firstname.jpg",
  "focus": "top"
}
```

- People appear in the order they're listed in the file.
- `focus` sets which part of the photo is kept when it's cropped: `"top"`, `"center"` or `"bottom"`.
- With no photo, their initials are shown instead.
- Before uploading a photo, shrink it to about 1000px wide, for example with squoosh.app.

---

## Folder map

```
app/                    Pages. Each folder is a URL.
  layout.tsx            Shared frame: fonts, menu, footer (every page)
  page.tsx              Home page  (/)
  events/page.tsx       Events page (/events/)
  team/page.tsx         Our team page (/team/)
  not-found.tsx         "Page not found"

components/             Reusable pieces of the pages
  SiteNav.tsx           Top menu
  SiteFooter.tsx        Footer
  EnvelopeFlap.tsx      Mint envelope flap + wax seal at the top of pages
  NextEventCard.tsx     "Next event" card on the home page
  EventsCalendar.tsx    Month calendar + event list
  EventCard.tsx         One event (with RSVP / add-to-calendar buttons)
  EventBits.tsx         Date stamp, date block, date/time/place row
  PastEventsGallery.tsx Past events photos
  TeamMemberCard.tsx    One team member
  Icons.tsx             Small icons

content/                The site's content
  site.json             Home page text, links, FAQ, extra gallery photos
  events.json           Events
  team.json             Team members

lib/                    Helper code
  content.ts            Loads the content files
  types.ts              The shape of each content file
  dates.ts              Reading and formatting event dates
  calendar-links.ts     Google Calendar link + .ics download
  use-now.ts            Keeps "upcoming vs past" correct between rebuilds
  text.ts               Paragraph splitting + image paths

styles/                 CSS, one file per area
  tokens.css            Colours, fonts, spacing (start here)
  base.css              Typography, buttons, shared helpers
  site-chrome.css       Menu, envelope flap, page titles, footer
  home.css / events.css / team.css

public/images/          Photos and the seal logo (served at /images/...)
.github/workflows/      Automatic build + publish to GitHub Pages
```

---

## Working on the site on your computer

You need [Node.js](https://nodejs.org) 20 or newer.

```bash
npm install        # first time only
npm run dev        # open http://localhost:3000; changes appear as you save
```

Before you push:

```bash
npm run format     # tidies code formatting (Prettier)
npm run build      # checks that everything builds; output goes to out/
```

In VS Code, install the recommended Prettier extension when prompted. Files then format themselves on save.

## How publishing works

1. Someone pushes to the `main` branch, either from their computer or by editing a file on GitHub.
2. GitHub Actions runs `.github/workflows/deploy.yml`, which builds the site into plain HTML files.
3. GitHub Pages serves those files. The whole process takes about 1–2 minutes, and you can watch it in the repo's **Actions** tab.

The site also rebuilds once a day to keep "Next event" and "Past events" current. Both sections also update in each visitor's browser, so a missed rebuild doesn't break anything.

### One-time setup

In the repo, go to **Settings → Pages → Build and deployment** and set **Source** to **GitHub Actions**.

## Notes for developers

- The site is a static export (`output: "export"` in `next.config.ts`). There's no server, so API routes, server actions and `next/image` optimization aren't available.
- Event dates are stored as `YYYY-MM-DDTHH:mm` in Waterloo local time. `lib/dates.ts` formats dates by hand so the pre-built HTML matches what the browser shows.
- Components that need today's date (`NextEventCard`, `EventsCalendar`, `PastEventsGallery`) are client components and use `useNow()`.
