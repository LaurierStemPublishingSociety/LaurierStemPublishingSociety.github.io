/**
 * Date helpers for events.
 *
 * Event dates are stored as "2026-10-28T18:00" in Waterloo local time.
 * We format dates by hand (instead of with the browser's date formatter) so
 * the text is identical when the page is built and when it runs in a
 * visitor's browser.
 */
import type { ClubEvent } from "./types";

const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const WEEKDAYS = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

export const WEEKDAY_SHORT = WEEKDAYS.map((day) => day.slice(0, 3));

/** An event with its dates already worked out */
export type PreparedEvent = ClubEvent & {
  id: string;
  startDate: Date;
  endDate: Date | null;
  /** false for all-day events (no time given) */
  timed: boolean;
};

/** "2026-10-28T18:00" -> Date. Returns null if the text isn't a date. */
export function parseDate(text?: string): Date | null {
  if (!text) return null;
  const match = String(text).match(/^(\d{4})-(\d{2})-(\d{2})(?:[T ](\d{2}):(\d{2}))?/);
  if (!match) return null;
  const [, year, month, day, hour = "0", minute = "0"] = match;
  return new Date(+year, +month - 1, +day, +hour, +minute);
}

function hasTime(text?: string) {
  return /[T ]\d{2}:\d{2}/.test(String(text ?? ""));
}

/** Parse dates and sort events from earliest to latest. */
export function prepareEvents(events: ClubEvent[]): PreparedEvent[] {
  return events
    .map((event, index) => {
      const startDate = parseDate(event.start);
      let endDate = parseDate(event.end);
      if (startDate && endDate && endDate < startDate) endDate = null;
      return {
        ...event,
        id: `event-${index}`,
        startDate,
        endDate,
        timed: hasTime(event.start),
      };
    })
    .filter((event): event is PreparedEvent => event.startDate !== null)
    .sort((a, b) => a.startDate.getTime() - b.startDate.getTime());
}

/** When the event finishes (falls back to 1 hour, or end of day for all-day events). */
export function eventFinish(event: PreparedEvent): Date {
  if (event.endDate) return event.endDate;
  const s = event.startDate;
  if (event.timed) return new Date(s.getTime() + 60 * 60 * 1000);
  return new Date(s.getFullYear(), s.getMonth(), s.getDate(), 23, 59);
}

export function isPast(event: PreparedEvent, now: Date): boolean {
  return eventFinish(event) < now;
}

export function sameDay(a: Date | null, b: Date | null): boolean {
  return (
    !!a &&
    !!b &&
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

/** A short key for a calendar day, e.g. "2026-9-28" */
export function dayKey(date: Date): string {
  return `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
}

/* ---------- Text formatting ---------- */

/** "Oct" */
export const monthShort = (d: Date) => MONTHS[d.getMonth()].slice(0, 3);
/** "Wed" */
export const weekdayShort = (d: Date) => WEEKDAY_SHORT[d.getDay()];
/** "October 2026" */
export const monthAndYear = (d: Date) => `${MONTHS[d.getMonth()]} ${d.getFullYear()}`;
/** "October" */
export const monthName = (d: Date) => MONTHS[d.getMonth()];
/** "Wednesday, October 28" (adds the year if it isn't this year) */
export function fullDate(d: Date, now?: Date): string {
  const text = `${WEEKDAYS[d.getDay()]}, ${MONTHS[d.getMonth()]} ${d.getDate()}`;
  return now && d.getFullYear() !== now.getFullYear()
    ? `${text}, ${d.getFullYear()}`
    : text;
}

/** "6:00 PM" */
export function timeText(d: Date): string {
  const hour = d.getHours() % 12 || 12;
  const minutes = String(d.getMinutes()).padStart(2, "0");
  return `${hour}:${minutes} ${d.getHours() < 12 ? "AM" : "PM"}`;
}

/** "Wednesday, October 28" or a range for multi-day events */
export function whenText(event: PreparedEvent, now?: Date): string {
  let text = fullDate(event.startDate, now);
  if (event.endDate && !sameDay(event.startDate, event.endDate)) {
    text += ` – ${fullDate(event.endDate, now)}`;
  }
  return text;
}

/** "6:00 PM – 7:00 PM", "6:00 PM" or "All day" */
export function timeRange(event: PreparedEvent): string {
  if (!event.timed) return "All day";
  let text = timeText(event.startDate);
  if (event.endDate && sameDay(event.startDate, event.endDate)) {
    text += ` – ${timeText(event.endDate)}`;
  }
  return text;
}
