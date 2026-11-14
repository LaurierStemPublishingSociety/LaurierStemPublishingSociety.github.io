"use client";

/**
 * Year list and team grid on the Our team page.
 * Shows the first (newest) year in content/team.json; click a year to see that team.
 */
import { useState } from "react";
import TeamMemberCard from "@/components/TeamMemberCard";
import type { TeamYear } from "@/lib/types";

export default function TeamYears({ years }: { years: TeamYear[] }) {
  const [selected, setSelected] = useState(years[0]?.year);
  const current = years.find((y) => y.year === selected) ?? years[0];

  if (!current) {
    return <p className="empty">Team members will appear here soon.</p>;
  }

  return (
    <>
      {years.length > 1 && (
        <div className="team-years" role="group" aria-label="Choose a year">
          {years.map((y) => (
            <button
              key={y.year}
              type="button"
              aria-pressed={y.year === current.year}
              onClick={() => setSelected(y.year)}
            >
              {y.year}
            </button>
          ))}
        </div>
      )}

      <h2 className="team-year-title">{current.year} team</h2>

      {current.members.length > 0 ? (
        <div className="team-grid">
          {current.members.map((member) => (
            <TeamMemberCard key={member.name} member={member} />
          ))}
        </div>
      ) : (
        <p className="empty">This year&apos;s team will be announced soon.</p>
      )}
    </>
  );
}
