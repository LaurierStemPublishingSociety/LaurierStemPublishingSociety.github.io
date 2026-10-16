"use client";

/**
 * The "Next event" card near the top of the home page.
 * Picks the soonest event that hasn't finished yet.
 */
import Link from "next/link";
import { isPast, prepareEvents } from "@/lib/dates";
import type { ClubEvent } from "@/lib/types";
import { useNow } from "@/lib/use-now";
import { EventMeta, Postmark } from "./EventBits";

export default function NextEventCard({
  events,
  builtAt,
}: {
  events: ClubEvent[];
  builtAt: number;
}) {
  const now = useNow(builtAt);
  const upcoming = prepareEvents(events).filter((event) => !isPast(event, now));
  const next = upcoming[0];

  if (!next) {
    return (
      <div className="letter">
        <div>
          <p className="letter-label">Next event</p>
          <h3>Nothing scheduled yet</h3>
          <p className="muted">
            New events are announced on Instagram first. Check back soon.
          </p>
        </div>
      </div>
    );
  }

  return (
    <article className="letter">
      <Postmark date={next.startDate} />
      <div>
        <p className="letter-label">Next event</p>
        <h3>{next.title}</h3>
        <EventMeta event={next} showDate now={now} />
      </div>
      <div className="letter-actions">
        {next.link && (
          <a className="btn btn-primary btn-small" href={next.link}>
            RSVP
          </a>
        )}
        <Link className="btn btn-ghost btn-small" href="/events/">
          {upcoming.length > 1 ? `See all ${upcoming.length} upcoming` : "Open calendar"}
        </Link>
      </div>
    </article>
  );
}
