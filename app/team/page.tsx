/**
 * Our team page.
 * Each year's team comes from content/team.json. Edit that file to add or change people,
 * or add a new year at the top.
 */
import type { Metadata } from "next";
import EnvelopeFlap from "@/components/EnvelopeFlap";
import TeamYears from "@/components/TeamYears";
import { teamYears } from "@/lib/content";

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
        <TeamYears years={teamYears} />
      </section>
    </>
  );
}
