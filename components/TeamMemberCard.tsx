"use client";

/**
 * One person on the Our team page.
 * If there's no photo, their initials are shown instead.
 * If they have a fun fact, a lightbulb button on the photo shows it over the photo.
 */
import { useState } from "react";
import { imageSrc } from "@/lib/text";
import type { TeamMember } from "@/lib/types";

// "focus" in content/team.json -> which part of the photo to keep when it's cropped
const cropPositions = {
  top: "50% 18%",
  center: "50% 40%",
  bottom: "50% 85%",
};

// 1 -> "1st year", 2 -> "2nd year", …
function yearText(year: number) {
  const suffixes: Record<number, string> = { 1: "st", 2: "nd", 3: "rd" };
  const suffix = suffixes[year] ?? "th";
  return `${year}${suffix} year`;
}

// Lightbulb, like the one in the club's wax seal
function BulbIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M9 18h6M10 21h4" />
      <path d="M12 3a6 6 0 0 0-3.6 10.8c.7.5 1.1 1.3 1.1 2.2h5c0-.9.4-1.7 1.1-2.2A6 6 0 0 0 12 3z" />
    </svg>
  );
}

export default function TeamMemberCard({ member }: { member: TeamMember }) {
  const [showFact, setShowFact] = useState(false);
  const firstName = member.name.split(/\s+/)[0];
  const initials = member.name
    .split(/\s+/)
    .map((word) => word[0])
    .slice(0, 2)
    .join("");

  // e.g. "2nd year · Health Sciences"
  const study = [
    member.yearOfStudy && yearText(member.yearOfStudy),
    member.program,
  ]
    .filter(Boolean)
    .join(" · ");

  return (
    <article className="member">
      <div className="photo">
        {member.photo ? (
          <img
            src={imageSrc(member.photo)}
            alt={`Photo of ${member.name}`}
            loading="lazy"
            style={{ objectPosition: cropPositions[member.focus ?? "center"] }}
          />
        ) : (
          <span className="initials" aria-hidden="true">
            {initials}
          </span>
        )}

        {member.funFact && (
          <>
            {/* Covers the photo, so opening it doesn't move anything on the page */}
            <div
              className="fun-fact"
              data-open={showFact}
              aria-hidden={!showFact}
              onClick={() => setShowFact(false)}
            >
              <span className="fun-fact-label">Fun fact</span>
              <p>{member.funFact}</p>
            </div>
            <button
              type="button"
              className="fun-fact-button"
              aria-expanded={showFact}
              aria-label={
                showFact
                  ? `Hide ${firstName}'s fun fact`
                  : `Show ${firstName}'s fun fact`
              }
              onClick={() => setShowFact(!showFact)}
            >
              <BulbIcon />
            </button>
          </>
        )}
      </div>
      <h3>{member.name}</h3>
      {member.role && <p className="role">{member.role}</p>}
      {study && <p className="study">{study}</p>}
      {member.bio && <p className="bio">{member.bio}</p>}
      {member.linkedin && (
        <a className="text-link member-link" href={member.linkedin}>
          LinkedIn profile
        </a>
      )}
    </article>
  );
}
