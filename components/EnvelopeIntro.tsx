"use client";

/**
 * Home page intro: a sealed envelope opens and the letter inside becomes the page.
 * Plays once per browser tab (add ?intro to the address to see it again), can be
 * skipped with a click, and is left out for people who have reduced motion turned on.
 * The animation itself is all CSS: see "Envelope intro" in styles/home.css.
 */
import { useLayoutEffect, useRef, useState } from "react";

const SEEN_KEY = "lsps-intro-seen";

// Runs as the page loads, before anything is drawn, so a returning visitor
// never sees a flash of the envelope.
const beforeFirstPaint = `(function(){try{var e=document.currentScript.previousElementSibling;if(sessionStorage.getItem("${SEEN_KEY}")&&!/[?&]intro\\b/.test(location.search)){e.hidden=true}else{sessionStorage.setItem("${SEEN_KEY}","1");e.dataset.playing="1"}}catch(_){}})()`;

// Stays true while moving between pages, so coming back to Home doesn't replay it
let finished = false;

export default function EnvelopeIntro() {
  const ref = useRef<HTMLDivElement>(null);
  const [done, setDone] = useState(finished);

  const finish = () => {
    finished = true;
    setDone(true);
  };

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    // Already seen (hidden by the script above) or reduced motion (hidden by CSS)
    if (
      el.hidden ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      finish();
      return;
    }
    if (el.dataset.playing) return;

    // Arrived from another page of the site, so the script above didn't run
    let seen = false;
    try {
      seen =
        !!sessionStorage.getItem(SEEN_KEY) &&
        !/[?&]intro\b/.test(window.location.search);
      sessionStorage.setItem(SEEN_KEY, "1");
    } catch {}
    if (seen) finish();
    else el.dataset.playing = "1";
  }, []);

  if (done) return null;

  return (
    <>
      <div
        className="envelope-intro"
        ref={ref}
        onClick={finish}
        onAnimationEnd={(event) => {
          // The last step is the whole screen fading out. It stays in the page
          // (invisible) so the hero's entrance, which is timed off it, can finish.
          if (event.target === event.currentTarget) finished = true;
        }}
        suppressHydrationWarning
      >
        <div className="env" aria-hidden="true">
          <div className="env-back" />

          <div className="env-letter">
            <span />
            <span />
            <span />
            <span />
          </div>

          {/* Front pocket: two side folds with the bottom fold over them */}
          <svg
            className="env-front"
            viewBox="0 0 100 64"
            preserveAspectRatio="none"
          >
            <polygon className="env-fold-side" points="0,0 50,34 0,64" />
            <polygon className="env-fold-side" points="100,0 50,34 100,64" />
            <polygon className="env-fold-bottom" points="0,64 50,29 100,64" />
          </svg>

          {/* Top flap: mint outside, pale inside (seen once it has swung open) */}
          <svg
            className="env-flap"
            viewBox="0 0 100 39"
            preserveAspectRatio="none"
          >
            <defs>
              <linearGradient id="env-flap-mint" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" stopColor="#bcd5ce" />
                <stop offset="1" stopColor="#a3c3bb" />
              </linearGradient>
            </defs>
            <path
              className="env-flap-outside"
              d="M0 0H100L52.6 36.7Q50 38.7 47.4 36.7Z"
              fill="url(#env-flap-mint)"
            />
            <path
              className="env-flap-inside"
              d="M0 0H100L52.6 36.7Q50 38.7 47.4 36.7Z"
            />
          </svg>

          {/* The wax seal, as two halves so it can crack down the middle */}
          <div className="env-seal">
            <img className="env-seal-left" src="/images/site/seal.png" alt="" />
            <img
              className="env-seal-right"
              src="/images/site/seal.png"
              alt=""
            />
          </div>
        </div>

        <button type="button" className="env-skip">
          Skip
        </button>
      </div>
      <script dangerouslySetInnerHTML={{ __html: beforeFirstPaint }} />
    </>
  );
}
