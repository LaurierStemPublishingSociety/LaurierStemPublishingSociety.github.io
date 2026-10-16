/**
 * "Add to calendar" helpers: a Google Calendar link and a downloadable
 * .ics file (works with Apple Calendar and Outlook).
 */
import type { PreparedEvent } from "./dates";

const TIME_ZONE = "America/Toronto";

const pad = (n: number) => String(n).padStart(2, "0");

/** Date -> "20261028T180000" (or "20261028" for all-day events) */
function stamp(date: Date, withTime: boolean): string {
  const day = `${date.getFullYear()}${pad(date.getMonth() + 1)}${pad(date.getDate())}`;
  return withTime ? `${day}T${pad(date.getHours())}${pad(date.getMinutes())}00` : day;
}

/** Calendar apps need an end time, so default to 1 hour (or the next day if all-day). */
function calendarEnd(event: PreparedEvent): Date {
  if (event.endDate) return event.endDate;
  const s = event.startDate;
  if (event.timed) return new Date(s.getTime() + 60 * 60 * 1000);
  return new Date(s.getFullYear(), s.getMonth(), s.getDate() + 1);
}

function detailsText(event: PreparedEvent): string {
  return (event.description ?? "") + (event.link ? `\n\n${event.link}` : "");
}

export function googleCalendarUrl(event: PreparedEvent): string {
  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: event.title,
    dates: `${stamp(event.startDate, event.timed)}/${stamp(calendarEnd(event), event.timed)}`,
    details: detailsText(event),
    location: event.location ?? "",
    ctz: TIME_ZONE,
  });
  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}

/** Escape text for the .ics format */
function icsText(text?: string): string {
  return String(text ?? "")
    .replace(/\\/g, "\\\\")
    .replace(/\n/g, "\\n")
    .replace(/,/g, "\\,")
    .replace(/;/g, "\\;");
}

/** Download a .ics file for the event (runs in the browser only). */
export function downloadIcs(event: PreparedEvent): void {
  const dateType = event.timed ? `;TZID=${TIME_ZONE}:` : ";VALUE=DATE:";
  const slug = event.title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
  const nowUtc = new Date()
    .toISOString()
    .replace(/[-:]/g, "")
    .replace(/\.\d{3}/, "");

  const lines = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//LSPS//Events//EN",
    "BEGIN:VEVENT",
    `UID:${stamp(event.startDate, true)}-${slug}@lsps`,
    `DTSTAMP:${nowUtc}`,
    `DTSTART${dateType}${stamp(event.startDate, event.timed)}`,
    `DTEND${dateType}${stamp(calendarEnd(event), event.timed)}`,
    `SUMMARY:${icsText(event.title)}`,
    `DESCRIPTION:${icsText(detailsText(event))}`,
    `LOCATION:${icsText(event.location)}`,
    "END:VEVENT",
    "END:VCALENDAR",
  ];

  const file = new Blob([lines.join("\r\n")], { type: "text/calendar" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(file);
  link.download = `${slug || "event"}.ics`;
  document.body.appendChild(link);
  link.click();
  link.remove();
  setTimeout(() => URL.revokeObjectURL(link.href), 1000);
}
