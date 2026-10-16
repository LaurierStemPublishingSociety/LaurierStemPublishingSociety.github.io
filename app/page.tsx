/**
 * Home page.
 * All the text here comes from content/site.json. Edit that file to change it.
 */
import Link from "next/link";
import EnvelopeFlap from "@/components/EnvelopeFlap";
import NextEventCard from "@/components/NextEventCard";
import { events, site } from "@/lib/content";
import { imageSrc, toParagraphs } from "@/lib/text";

export default function HomePage() {
  const builtAt = Date.now();

  return (
    <>
      <EnvelopeFlap size="large" />

      {/* ---------- Hero ---------- */}
      <header className="hero wrap">
        <h1>{site.name}</h1>
        {site.tagline && <p className="tagline">{site.tagline}</p>}
        {site.intro && <p className="intro">{site.intro}</p>}
        <div className="hero-actions">
          {site.joinUrl && (
            <a className="btn btn-primary" href={site.joinUrl}>
              Join on Presence
            </a>
          )}
          <Link className="btn btn-ghost" href="/events/">
            See upcoming events
          </Link>
        </div>
      </header>

      {/* ---------- Next event ---------- */}
      <section className="next-up" aria-label="Next event">
        <div className="wrap">
          <NextEventCard events={events} builtAt={builtAt} />
        </div>
      </section>

      {/* ---------- About ---------- */}
      <section className="section" id="about">
        <div className="wrap about-grid">
          <div className="copy measure">
            <h2>{site.aboutHeading || "About us"}</h2>
            {toParagraphs(site.about).map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
          {site.aboutImage && (
            <div className="framed">
              <img
                src={imageSrc(site.aboutImage)}
                alt="A student reading a book"
                loading="lazy"
              />
            </div>
          )}
        </div>
      </section>

      {/* ---------- What we do ---------- */}
      {site.programs && site.programs.length > 0 && (
        <section className="section" id="programs" aria-labelledby="programs-title">
          <div className="wrap">
            <div className="section-head">
              <h2 id="programs-title">What we do</h2>
            </div>
            <div className="programs">
              {site.programs.map((program) => (
                <article className="program" key={program.title}>
                  {program.image && (
                    <img src={imageSrc(program.image)} alt="" loading="lazy" />
                  )}
                  <h3>{program.title}</h3>
                  {program.description && <p>{program.description}</p>}
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ---------- How to join ---------- */}
      <section className="section join" id="join" aria-labelledby="join-title">
        <div className="wrap">
          <div className="section-head">
            <h2 id="join-title">How to join</h2>
            <p>Anyone on campus interested in STEM and publishing is welcome.</p>
          </div>
          <ol className="steps">
            {(site.joinSteps ?? []).map((step) => (
              <li key={step.title}>
                <h3>{step.title}</h3>
                {step.description && <p>{step.description}</p>}
              </li>
            ))}
          </ol>
          <div className="join-actions">
            {site.joinUrl && (
              <a className="btn btn-primary" href={site.joinUrl}>
                Join on Presence
              </a>
            )}
            {site.instagram && (
              <a className="btn btn-ghost" href={site.instagram}>
                Follow on Instagram
              </a>
            )}
          </div>
        </div>
      </section>

      {/* ---------- FAQ ---------- */}
      <section className="section" id="faq" aria-labelledby="faq-title">
        <div className="wrap faq-grid">
          <div className="section-head">
            <h2 id="faq-title">Questions</h2>
            {site.email && (
              <p>
                Something else? Email{" "}
                <a className="text-link" href={`mailto:${site.email}`}>
                  {site.email}
                </a>{" "}
                and we&apos;ll get back to you.
              </p>
            )}
          </div>
          <div className="faq-list">
            {(site.faq ?? []).map((item) => (
              <details key={item.question}>
                <summary>{item.question}</summary>
                <div className="answer">
                  {toParagraphs(item.answer).map((p, i) => (
                    <p key={i}>{p}</p>
                  ))}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
