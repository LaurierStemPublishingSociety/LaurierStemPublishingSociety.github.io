/** Shown when someone visits a page that doesn't exist. */
import Link from "next/link";
import EnvelopeFlap from "@/components/EnvelopeFlap";

export default function NotFound() {
  return (
    <>
      <EnvelopeFlap />
      <header className="page-head wrap page-body">
        <h1>Page not found</h1>
        <p>This page may have moved. Try the home page or the events calendar.</p>
        <div className="hero-actions">
          <Link className="btn btn-primary" href="/">
            Go to the home page
          </Link>
          <Link className="btn btn-ghost" href="/events/">
            See events
          </Link>
        </div>
      </header>
    </>
  );
}
