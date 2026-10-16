/**
 * Events page: calendar + past events gallery.
 * Events come from content/events.json. Edit that file to add or change events.
 */
import type { Metadata } from "next";
import EnvelopeFlap from "@/components/EnvelopeFlap";
import EventsCalendar from "@/components/EventsCalendar";
import PastEventsGallery from "@/components/PastEventsGallery";
import { events, site } from "@/lib/content";

export const metadata: Metadata = {
  title: "Events",
  description: "Upcoming and past events from the Laurier STEM Publishing Society.",
};

export default function EventsPage() {
  const builtAt = Date.now();

  return (
    <>
      <EnvelopeFlap />

      <header className="page-head wrap">
        <h1>Events</h1>
        <p>
          Discussions, workshops and guest speakers. Pick a date to see what&apos;s on, or
          add any event straight to your calendar.
        </p>
      </header>

      <section className="wrap page-body">
        <EventsCalendar events={events} builtAt={builtAt} instagram={site.instagram} />
      </section>

      <PastEventsGallery events={events} extraPhotos={site.gallery} builtAt={builtAt} />
    </>
  );
}
