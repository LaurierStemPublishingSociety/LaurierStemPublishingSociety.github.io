"use client";

/**
 * The events page calendar: a month grid on the left and a list of events
 * on the right.
 *
 * What the list shows:
 * - by default: the next 6 upcoming events ("Coming up")
 * - after moving to another month: that month's events
 * - after clicking a day: that day's events (click it again to go back)
 */
import { useEffect, useMemo, useState } from "react";
import {
  type PreparedEvent,
  WEEKDAY_SHORT,
  dayKey,
  fullDate,
  isPast,
  monthAndYear,
  monthName,
  prepareEvents,
  sameDay,
} from "@/lib/dates";
import type { ClubEvent } from "@/lib/types";
import { useNow } from "@/lib/use-now";
import EventCard from "./EventCard";
import { Icon } from "./Icons";

type ListMode = "upcoming" | "month" | "day";

export default function EventsCalendar({
  events: rawEvents,
  builtAt,
  instagram,
}: {
  events: ClubEvent[];
  builtAt: number;
  instagram?: string;
}) {
  const now = useNow(builtAt);
  const events = useMemo(() => prepareEvents(rawEvents), [rawEvents]);

  // Which month the grid shows (the 1st of that month)
  const [month, setMonth] = useState(
    () => new Date(now.getFullYear(), now.getMonth(), 1),
  );
  const [selectedDay, setSelectedDay] = useState<Date | null>(null);
  const [mode, setMode] = useState<ListMode>("upcoming");

  // Once the visitor's real date is known, jump the grid to the current month
  const thisYear = now.getFullYear();
  const thisMonth = now.getMonth();
  useEffect(() => {
    setMonth(new Date(thisYear, thisMonth, 1));
  }, [thisYear, thisMonth]);

  // Group events by calendar day. Multi-day events appear on every day they cover.
  const eventsByDay = useMemo(() => {
    const map: Record<string, PreparedEvent[]> = {};
    for (const event of events) {
      const last =
        event.endDate && event.endDate > event.startDate
          ? event.endDate
          : event.startDate;
      const day = new Date(
        event.startDate.getFullYear(),
        event.startDate.getMonth(),
        event.startDate.getDate(),
      );
      while (day <= last) {
        (map[dayKey(day)] ??= []).push(event);
        day.setDate(day.getDate() + 1);
      }
    }
    return map;
  }, [events]);

  const eventsOn = (day: Date) => eventsByDay[dayKey(day)] ?? [];

  /* ----- Actions ----- */
  function changeMonth(step: number) {
    setMonth(new Date(month.getFullYear(), month.getMonth() + step, 1));
    setSelectedDay(null);
    setMode("month");
  }

  function goToToday() {
    setMonth(new Date(now.getFullYear(), now.getMonth(), 1));
    setSelectedDay(null);
    setMode("upcoming");
  }

  function pickDay(day: Date) {
    if (selectedDay && sameDay(day, selectedDay)) {
      setSelectedDay(null);
      setMode("month");
      return;
    }
    setSelectedDay(day);
    setMode("day");
    if (day.getMonth() !== month.getMonth()) {
      setMonth(new Date(day.getFullYear(), day.getMonth(), 1));
    }
    // On phones the list is below the calendar, so scroll down to it
    if (window.matchMedia("(max-width: 960px)").matches) {
      requestAnimationFrame(() =>
        document.getElementById("agenda-title")?.scrollIntoView({ block: "start" }),
      );
    }
  }

  /* ----- Build the month grid (weeks start on Sunday) ----- */
  const firstWeekday = month.getDay();
  const daysInMonth = new Date(month.getFullYear(), month.getMonth() + 1, 0).getDate();
  const weeks = Math.ceil((firstWeekday + daysInMonth) / 7);
  const gridDays = Array.from(
    { length: weeks * 7 },
    (_, i) => new Date(month.getFullYear(), month.getMonth(), 1 - firstWeekday + i),
  );

  /* ----- Work out what the list shows ----- */
  let listTitle = "Coming up";
  let listEvents: PreparedEvent[];
  let emptyMessage = "No upcoming events yet.";

  if (mode === "day" && selectedDay) {
    listTitle = fullDate(selectedDay);
    listEvents = eventsOn(selectedDay);
    emptyMessage = "Nothing on this day.";
  } else if (mode === "month") {
    listTitle = `In ${monthName(month)}`;
    listEvents = events.filter(
      (e) =>
        e.startDate.getFullYear() === month.getFullYear() &&
        e.startDate.getMonth() === month.getMonth(),
    );
    emptyMessage = "No events this month.";
  } else {
    listEvents = events.filter((e) => !isPast(e, now)).slice(0, 6);
  }

  return (
    <div className="cal-layout">
      {/* ---------- Month grid ---------- */}
      <div className="calendar">
        <div className="cal-head">
          <h2 aria-live="polite">{monthAndYear(month)}</h2>
          <div className="cal-nav">
            <button className="cal-today" type="button" onClick={goToToday}>
              Today
            </button>
            <button
              className="icon-btn"
              type="button"
              aria-label="Previous month"
              onClick={() => changeMonth(-1)}
            >
              <Icon name="left" />
            </button>
            <button
              className="icon-btn"
              type="button"
              aria-label="Next month"
              onClick={() => changeMonth(1)}
            >
              <Icon name="right" />
            </button>
          </div>
        </div>

        <div className="cal-grid">
          {WEEKDAY_SHORT.map((day) => (
            <div className="cal-dow" key={day}>
              {day}
            </div>
          ))}

          {gridDays.map((day) => {
            const dayEvents = eventsOn(day);
            const isSelected = !!selectedDay && sameDay(day, selectedDay);
            const classes = [
              "cal-day",
              day.getMonth() !== month.getMonth() && "other",
              sameDay(day, now) && "today",
              isSelected && "selected",
            ]
              .filter(Boolean)
              .join(" ");
            const count = dayEvents.length;
            const label = `${fullDate(day)}, ${count ? `${count} event${count > 1 ? "s" : ""}` : "no events"}`;

            return (
              <button
                key={dayKey(day)}
                type="button"
                className={classes}
                aria-label={label}
                aria-pressed={isSelected}
                onClick={() => pickDay(day)}
              >
                <span className="num">{day.getDate()}</span>
                {dayEvents.slice(0, 2).map((e) => (
                  <span
                    key={e.id}
                    className={isPast(e, now) ? "cal-chip past" : "cal-chip"}
                    title={e.title}
                  >
                    {e.title}
                  </span>
                ))}
                {count > 2 && <span className="cal-chip">+{count - 2} more</span>}
                {count > 0 && (
                  <span className="cal-dots">
                    {dayEvents.slice(0, 3).map((e) => (
                      <i key={e.id} />
                    ))}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* ---------- Event list ---------- */}
      <aside className="agenda" aria-live="polite">
        <h2 id="agenda-title">{listTitle}</h2>
        {mode !== "upcoming" && (
          <p className="agenda-sub">
            <button type="button" className="link-button" onClick={goToToday}>
              Show all upcoming events
            </button>
          </p>
        )}
        <ul className="agenda-list">
          {listEvents.length === 0 ? (
            <li className="empty">
              {emptyMessage} New events are announced on{" "}
              {instagram ? <a href={instagram}>Instagram</a> : "Instagram"} first.
            </li>
          ) : (
            listEvents.map((event) => (
              <EventCard
                key={event.id}
                event={event}
                past={isPast(event, now)}
                now={now}
              />
            ))
          )}
        </ul>
      </aside>
    </div>
  );
}
