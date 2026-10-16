"use client";

/**
 * One event in a list: date, name, time, place, description and buttons
 * (RSVP and add-to-calendar for upcoming events).
 */
import { downloadIcs, googleCalendarUrl } from "@/lib/calendar-links";
import type { PreparedEvent } from "@/lib/dates";
import { toParagraphs } from "@/lib/text";
import { DateBlock, EventMeta } from "./EventBits";

export default function EventCard({
  event,
  past,
  now,
}: {
  event: PreparedEvent;
  past: boolean;
  now: Date;
}) {
  return (
    <li className={past ? "event-card is-past" : "event-card"} id={event.id}>
      <DateBlock date={event.startDate} />

      <div>
        <div className="event-tags">
          {event.type && <span className="event-type">{event.type}</span>}
          {past && <span className="event-type">Already happened</span>}
        </div>
        <h3>{event.title}</h3>
        <EventMeta event={event} showDate={false} now={now} />

        {event.description && (
          <div className="desc">
            {toParagraphs(event.description).map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        )}

        {!past && (
          <div className="actions">
            {event.link && (
              <a className="btn btn-primary btn-small" href={event.link}>
                RSVP
              </a>
            )}
            <span className="add-label">Add to calendar</span>
            <a
              className="btn btn-ghost btn-small"
              href={googleCalendarUrl(event)}
              target="_blank"
              rel="noopener"
            >
              Google Calendar
            </a>
            <button
              className="btn btn-ghost btn-small"
              type="button"
              title="Downloads a calendar file (.ics)"
              onClick={() => downloadIcs(event)}
            >
              Apple / Outlook
            </button>
          </div>
        )}

        {past && event.link && (
          <div className="actions">
            <a className="btn btn-ghost btn-small" href={event.link}>
              Event page
            </a>
          </div>
        )}
      </div>
    </li>
  );
}
