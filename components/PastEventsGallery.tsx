"use client";

/**
 * "Past events" photo gallery on the events page.
 * Shows every past event that has a photo (newest first), then any extra
 * photos listed under "gallery" in content/site.json.
 */
import { isPast, prepareEvents, whenText } from "@/lib/dates";
import { imageSrc } from "@/lib/text";
import type { ClubEvent, SiteSettings } from "@/lib/types";
import { useNow } from "@/lib/use-now";

export default function PastEventsGallery({
  events,
  extraPhotos = [],
  builtAt,
}: {
  events: ClubEvent[];
  extraPhotos?: SiteSettings["gallery"];
  builtAt: number;
}) {
  const now = useNow(builtAt);

  const pastWithPhotos = prepareEvents(events)
    .filter((event) => isPast(event, now) && event.image)
    .reverse();

  // Skip extra photos that are already shown with an event
  const shown = new Set(pastWithPhotos.map((e) => imageSrc(e.image)));
  const extras = (extraPhotos ?? []).filter(
    (p) => p?.image && !shown.has(imageSrc(p.image)),
  );

  if (pastWithPhotos.length === 0 && extras.length === 0) return null;

  return (
    <section className="section" id="past" aria-labelledby="past-title">
      <div className="wrap">
        <div className="section-head">
          <h2 id="past-title">Past events</h2>
          <p>A look back at what we&apos;ve done together.</p>
        </div>
        <div className="gallery">
          {pastWithPhotos.map((event) => (
            <figure key={event.id}>
              <img
                src={imageSrc(event.image)}
                alt={`Photo from ${event.title}`}
                loading="lazy"
              />
              <figcaption>
                {event.title}
                <span>{whenText(event, now)}</span>
              </figcaption>
            </figure>
          ))}
          {extras.map((photo) => (
            <figure key={photo.image}>
              <img
                src={imageSrc(photo.image)}
                alt={photo.caption || "LSPS event photo"}
                loading="lazy"
              />
              {photo.caption && <figcaption>{photo.caption}</figcaption>}
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
