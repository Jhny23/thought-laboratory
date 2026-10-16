"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Nav from "@/app/components/Nav";
import Footer from "@/app/components/Footer";

/* A 404 written as a small argument, in the site's own voice. */
export default function NotFound() {
  const path = usePathname() || "/";
  const shown = path.length > 42 ? path.slice(0, 41) + "…" : path;

  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(true);

  /* Honour "reduce motion": show the still frame and let the visitor start the film. */
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      v.pause();
      setPlaying(false);
    }
  }, []);

  const toggle = () => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) { v.play().then(() => setPlaying(true)).catch(() => setPlaying(false)); }
    else { v.pause(); setPlaying(false); }
  };

  const way = [
    { href: "/experiments", label: "Run an experiment", note: "Choose, and see what it costs you" },
    { href: "/biographies", label: "Meet a thinker", note: "The people behind the arguments" },
    { href: "/metamorphosis", label: "Read Sartre", note: "A lecture in twenty-five pages" },
  ];

  return (
    <div style={{ backgroundColor: "var(--white)", minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <Nav />

      <main className="nf" style={{ flex: 1, padding: "7.5rem 1.8rem 5rem", position: "relative", overflow: "hidden" }}>
        <div className="nf-grid">
        <div className="nf-body">
          {/* The numeral: one solid, one ghosted and out of register, like a misprint */}
          <div className="nf-numeral" aria-hidden="true">
            <span className="nf-ghost">404</span>
            <span className="nf-solid">404</span>
          </div>

          <p className="nf-label">page not found</p>

          <h1 className="nf-title">
            This thought hasn&rsquo;t been thought yet.
          </h1>

          <div className="nf-proof" role="group" aria-label="Why you are seeing this page">
            <p><span className="nf-k">P1</span><span>You asked for <code>{shown}</code></span></p>
            <p><span className="nf-k">P2</span><span>Nothing lives at that address.</span></p>
            <p className="nf-therefore"><span className="nf-k">∴</span><span>One of us took a wrong turn. It is probably not you.</span></p>
          </div>

          <ul className="nf-ways">
            {way.map((w) => (
              <li key={w.href}>
                <Link href={w.href}>
                  <span className="nf-way-label">{w.label}</span>
                  <span className="nf-way-note">{w.note}</span>
                  <span className="nf-arrow" aria-hidden="true">→</span>
                </Link>
              </li>
            ))}
          </ul>

          <Link href="/" className="nf-home">← back to the laboratory</Link>
        </div>

        <figure className="nf-plate">
          <div className="nf-plate__frame">
            <video
              ref={videoRef}
              className="nf-plate__video"
              src="/videos/cosmos.mp4"
              poster="/images/404-cosmos-poster.jpg"
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              aria-hidden="true"
            />
          </div>
          <figcaption>
            <span>(This page) Nothing here, so here is somewhere else.</span>
            <button type="button" onClick={toggle} aria-label={playing ? "Pause the film" : "Play the film"}>
              {playing ? "pause" : "play"}
            </button>
          </figcaption>
        </figure>
        </div>
      </main>

      <Footer />

      <style jsx global>{`
        .nf { display: block; }
        .nf-grid {
          max-width: 1180px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: minmax(0, 560px) minmax(15rem, 27rem);
          justify-content: space-between;
          align-items: start;
          gap: 3rem 4rem;
        }
        .nf-body { position: relative; z-index: 1; min-width: 0; }

        /* The numeral: one solid, one ghosted and out of register, like a misprint */
        .nf-numeral {
          position: relative;
          font-family: var(--serif);
          font-style: italic;
          font-size: clamp(5.5rem, 9vw, 8rem);
          line-height: 0.85;
          letter-spacing: -0.04em;
          margin: 0 0 1.4rem -0.04em;
          user-select: none;
          pointer-events: none;
        }
        .nf-numeral span { display: block; }
        .nf-solid { color: var(--ink); opacity: 0.1; }
        .nf-ghost { position: absolute; top: 0; left: 0; color: transparent; -webkit-text-stroke: 1px rgba(28, 26, 23, 0.25); transform: translate(0.035em, 0.03em); }

        /* The film, set like a plate in the magazine */
        .nf-plate { margin: 0; position: sticky; top: 5.5rem; }
        .nf-plate__frame { aspect-ratio: 4 / 5; background: #d9d9d9; overflow: hidden; box-shadow: 0 2px 16px rgba(28, 28, 26, 0.08); }
        .nf-plate__video { display: block; width: 100%; height: 100%; object-fit: cover; }
        .nf-plate figcaption {
          display: flex;
          justify-content: space-between;
          align-items: baseline;
          gap: 1rem;
          margin-top: 0.8rem;
          font-family: var(--mono);
          font-size: 0.55rem;
          letter-spacing: 0.06em;
          line-height: 1.5;
          color: var(--muted);
        }
        .nf-plate figcaption button {
          font-family: var(--mono);
          font-size: 0.55rem;
          letter-spacing: 0.1em;
          color: var(--muted);
          border-bottom: 1px solid var(--border);
          padding: 0.15rem 0;
          flex-shrink: 0;
        }
        .nf-plate figcaption button:hover, .nf-plate figcaption button:focus-visible { color: var(--ink); border-color: var(--ink); outline: none; }

        .nf-label {
          font-family: var(--mono);
          font-size: 0.55rem;
          letter-spacing: 0.18em;
          color: var(--muted);
          margin-bottom: 2.4rem;
        }
        .nf-title {
          font-family: var(--serif);
          font-weight: 400;
          font-style: italic;
          font-size: clamp(2.1rem, 5.6vw, 3.8rem);
          line-height: 1.08;
          color: var(--ink);
          margin-bottom: 2.6rem;
          text-wrap: balance;
        }

        .nf-proof {
          border-left: 1px solid var(--border);
          padding: 0.2rem 0 0.2rem 1.3rem;
          margin-bottom: 3rem;
          display: grid;
          gap: 0.35rem;
        }
        .nf-proof p {
          font-family: var(--serif);
          font-size: 1.02rem;
          line-height: 1.55;
          color: var(--ink);
          display: grid;
          grid-template-columns: 2.2rem 1fr;
          align-items: baseline;
        }
        .nf-proof .nf-k {
          font-family: var(--mono);
          font-size: 0.55rem;
          letter-spacing: 0.1em;
          color: var(--muted);
        }
        .nf-proof code {
          font-family: var(--mono);
          font-size: 0.74rem;
          background: var(--off);
          padding: 0.1rem 0.45rem;
          word-break: break-all;
        }
        .nf-therefore { font-style: italic; }

        .nf-ways { list-style: none; border-top: 1px solid var(--border); margin-bottom: 2.4rem; }
        .nf-ways li { border-bottom: 1px solid var(--border); }
        .nf-ways a {
          display: grid;
          grid-template-columns: 1fr auto;
          grid-template-areas: "label arrow" "note arrow";
          column-gap: 1rem;
          padding: 1.05rem 0.2rem;
          transition: background-color 0.3s ease, padding 0.3s ease;
        }
        .nf-ways a:hover, .nf-ways a:focus-visible { background: var(--hover); padding-left: 0.9rem; padding-right: 0.9rem; outline: none; }
        .nf-way-label { grid-area: label; font-family: var(--serif); font-size: 1.15rem; font-style: italic; color: var(--ink); }
        .nf-way-note { grid-area: note; font-family: var(--mono); font-size: 0.55rem; letter-spacing: 0.08em; color: var(--muted); margin-top: 0.15rem; }
        .nf-arrow { grid-area: arrow; align-self: center; font-family: var(--serif); font-size: 1.1rem; color: var(--muted); transition: transform 0.3s ease; }
        .nf-ways a:hover .nf-arrow, .nf-ways a:focus-visible .nf-arrow { transform: translateX(4px); color: var(--ink); }

        .nf-home { font-family: var(--mono); font-size: 0.6rem; letter-spacing: 0.1em; color: var(--muted); border-bottom: 1px solid var(--border); padding-bottom: 0.15rem; }
        .nf-home:hover { color: var(--ink); border-color: var(--ink); }

        @media (max-width: 900px) {
          .nf-grid { grid-template-columns: minmax(0, 1fr); gap: 3.2rem; }
          .nf-plate { position: static; width: min(100%, 26rem); }
        }
        @media (max-width: 700px) {
          .nf { padding-top: 6rem !important; }
          .nf-numeral { font-size: 6rem; margin-bottom: 0.6rem; }
          .nf-label { margin-bottom: 1.6rem; }
          .nf-title { margin-bottom: 2rem; }
          .nf-proof { margin-bottom: 2.2rem; }
        }
        @media (prefers-reduced-motion: reduce) {
          .nf-ways a, .nf-arrow { transition: none; }
        }
      `}</style>
    </div>
  );
}
