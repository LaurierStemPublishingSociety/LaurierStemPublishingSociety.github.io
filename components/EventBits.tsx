/**
 * Small pieces used to show an event's date, time and place.
 */
import {
  type PreparedEvent,
  monthShort,
  timeRange,
  weekdayShort,
  whenText,
} from "@/lib/dates";
import { Icon } from "./Icons";

/** Round "postmark" date stamp used on the home page's Next event card */
export function Postmark({ date }: { date: Date }) {
  return (
    <div className="postmark" aria-hidden="true">
      <span className="pm-month">{monthShort(date).toUpperCase()}</span>
      <span className="pm-day">{date.getDate()}</span>
      <span className="pm-week">{weekdayShort(date)}</span>
    </div>
  );
}

/** Stacked month / day / weekday used on event cards */
export function DateBlock({ date }: { date: Date }) {
  return (
    <div className="date-block" aria-hidden="true">
      <div className="db-month">{monthShort(date)}</div>
      <div className="db-day">{date.getDate()}</div>
      <div className="db-week">{weekdayShort(date)}</div>
    </div>
  );
}

/** Date, time and location in one row with icons */
export function EventMeta({
  event,
  showDate = false,
  now,
}: {
  event: PreparedEvent;
  showDate?: boolean;
  now?: Date;
}) {
  return (
    <ul className="meta">
      {showDate && (
        <li>
          <Icon name="calendar" />
          {whenText(event, now)}
        </li>
      )}
      <li>
        <Icon name="clock" />
        {timeRange(event)}
      </li>
      {event.location && (
        <li>
          <Icon name="pin" />
          {event.location}
        </li>
      )}
    </ul>
  );
}
