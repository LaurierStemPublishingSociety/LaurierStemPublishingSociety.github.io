/**
 * Our team page.
 * Team members come from content/team.json. Edit that file to add or change people.
 */
import type { Metadata } from "next";
import EnvelopeFlap from "@/components/EnvelopeFlap";
import TeamMemberCard from "@/components/TeamMemberCard";
import { team } from "@/lib/content";

export const metadata: Metadata = {
  title: "Our team",
  description: "Meet the executive team behind the Laurier STEM Publishing Society.",
};

export default function TeamPage() {
  return (
    <>
      <EnvelopeFlap />

      <header className="page-head wrap">
        <h1>Our team</h1>
        <p>The students who plan the events, run the socials and keep LSPS going.</p>
      </header>

      <section className="wrap page-body">
        {team.length > 0 ? (
          <div className="team-grid">
            {team.map((member) => (
              <TeamMemberCard key={member.name} member={member} />
            ))}
          </div>
        ) : (
          <p className="empty">Team members will appear here soon.</p>
        )}
      </section>
    </>
  );
}
