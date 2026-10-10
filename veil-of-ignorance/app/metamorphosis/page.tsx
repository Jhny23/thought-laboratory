"use client";
import type { CSSProperties, ReactNode } from "react";
import Link from "next/link";
import Nav from "@/app/components/Nav";
import Footer from "@/app/components/Footer";
import { cover, sections, closing, type Section, type Tone } from "@/app/metamorphosis/content";

/* ─── Page furniture ─── */

type Kind = "cover" | "lead" | "plate" | "text" | "colophon";
type PageTone = Tone | "photo";

function Page({
  side, tone, kind, folio, children,
}: {
  side: "left" | "right";
  tone: PageTone;
  kind: Kind;
  folio: number;
  children: ReactNode;
}) {
  return (
    <div className={`mm-page mm-page--${side} mm-page--${kind} mm-tone-${tone}`}>
      {children}
      {/* Folios are page furniture, so they stay out of the reading order. */}
      <div className="mm-folio" aria-hidden="true">
        <span>{folio}</span>
        {side === "right" && <span>Thought Laboratory</span>}
      </div>
    </div>
  );
}

function Spread({ id, labelledBy, children }: { id?: string; labelledBy: string; children: ReactNode }) {
  return (
    <section id={id} className="mm-spread" aria-labelledby={labelledBy}>
      {children}
    </section>
  );
}

/* ─── One section of the lecture: a plate page facing a text page ─── */

function PlatePage({ section }: { section: Section }) {
  const { plate, caption } = section;
  return (
    <>
      <p className="mm-caption">{caption}</p>
      <div
        className={`mm-plate mm-plate--${plate.orientation}`}
        style={{ "--chars": plate.word.length } as CSSProperties}
        aria-hidden="true"
      >
        {plate.word}
      </div>
    </>
  );
}

function TextPage({ section }: { section: Section }) {
  return (
    <>
      <h2 id={`mm-h-${section.id}`} className="mm-headline">{section.headline}</h2>
      <div className="mm-body">
        {section.paragraphs.map((p, i) => <p key={i}>{p}</p>)}
      </div>
    </>
  );
}

function SectionSpread({ section, index }: { section: Section; index: number }) {
  const plateLeft = section.plate.side === "left";
  const left = 2 + index * 2;
  const plate = <PlatePage section={section} />;
  const text = <TextPage section={section} />;

  return (
    <Spread id={section.id} labelledBy={`mm-h-${section.id}`}>
      <Page
        side="left" folio={left}
        kind={plateLeft ? "plate" : "text"}
        tone={plateLeft ? section.plate.tone : section.textTone}
      >
        {plateLeft ? plate : text}
      </Page>
      <Page
        side="right" folio={left + 1}
        kind={plateLeft ? "text" : "plate"}
        tone={plateLeft ? section.textTone : section.plate.tone}
      >
        {plateLeft ? text : plate}
      </Page>
    </Spread>
  );
}

/* ─── Root ─── */

export default function Metamorphosis() {
  const closingIndex = sections.length + 1;

  return (
    <div className="mm-root">
      <Nav />
      <main className="mm">
        {/* Cover spread: title plate facing the oversized opening text */}
        <Spread id="cover" labelledBy="mm-title">
          <Page side="left" tone="photo" kind="cover" folio={2}>
            <div
              className="mm-photo"
              role="img"
              aria-label={cover.photo.alt}
              style={{ backgroundImage: `url(${cover.photo.src})` }}
            />
            <p className="mm-caption">{cover.caption}</p>
            <h1 id="mm-title" className="mm-title">
              {cover.title.map((line, i) => (
                <span key={line} className="mm-title__line">
                  {line}{i < cover.title.length - 1 ? " " : ""}
                </span>
              ))}
            </h1>
          </Page>
          <Page side="right" tone="graphite" kind="lead" folio={3}>
            <div className="mm-lead">
              <div className="mm-byline">
                <span>By <strong>{cover.author}</strong></span>
                <span>{cover.credit}</span>
              </div>
              {cover.lead.map((p, i) => <p key={i}>{p}</p>)}
            </div>
          </Page>
        </Spread>

        {sections.map((s, i) => (
          <SectionSpread key={s.id} section={s} index={i + 1} />
        ))}

        {/* Closing spread */}
        <Spread labelledBy="mm-closing">
          <Page side="left" tone="graphite" kind="colophon" folio={2 + closingIndex * 2}>
            <p className="mm-note">{closing.note}</p>
            <div className="mm-links">
              <Link href="/experiments">All experiments</Link>
              <a href="#cover">Back to the start</a>
            </div>
          </Page>
          <Page side="right" tone="paper" kind="lead" folio={3 + closingIndex * 2}>
            <div id="mm-closing" className="mm-lead mm-lead--closing">
              {closing.lead.map((p, i) => <p key={i}>{p}</p>)}
            </div>
          </Page>
        </Spread>
      </main>
      <Footer />

      <style jsx global>{`
        .mm-root { background: var(--white); min-height: 100vh; }

        .mm {
          --mm-graphite: #2a2a28;
          --mm-bone: #efebe3;
          --mm-paper: #e9e5dc;
          --mm-ink: #1b1a18;
          --mm-sky: #aebbc6;
          --mm-pw: min(50vw, 850px);                /* width of one page */
          --mm-ph: clamp(640px, 69vw, 1100px);      /* height of one page */
          font-family: 'Inter Tight', 'Helvetica Neue', Arial, sans-serif;
          letter-spacing: 0;
          background: var(--mm-graphite);
          padding-top: 4rem;                         /* clears the fixed nav */
        }

        .mm-spread {
          display: grid;
          grid-template-columns: 1fr 1fr;
          max-width: 1700px;
          margin: 0 auto;
          scroll-margin-top: 4rem;
        }

        /* Page tones: each sets its own colours for everything inside it. */
        .mm-tone-graphite { background: var(--mm-graphite); color: var(--mm-bone); --mm-mute: #a29e94; --mm-shade: 0.24; }
        .mm-tone-paper    { background: var(--mm-paper);    color: var(--mm-ink);  --mm-mute: #5b5750; --mm-shade: 0.09; }
        .mm-tone-sky      { background: var(--mm-sky);      color: var(--mm-ink);  --mm-mute: #39404a; --mm-shade: 0.11; }
        .mm-tone-photo    { background: #1f3326;            color: var(--mm-bone); --mm-mute: rgba(239, 235, 227, 0.86); --mm-shade: 0.3; }

        .mm-page {
          position: relative;
          min-height: var(--mm-ph);
          padding: 3rem 3rem 5rem;
          display: flex;
          flex-direction: column;
          overflow: hidden;
        }
        .mm-page--left  { padding-right: 3.5rem; }
        .mm-page--right { padding-left: 3.5rem; }

        /* The gutter: a soft shadow on each page where the spread folds. */
        .mm-page--left::after,
        .mm-page--right::after {
          content: "";
          position: absolute;
          top: 0; bottom: 0;
          width: 2.8rem;
          pointer-events: none;
        }
        .mm-page--left::after  { right: 0; background: linear-gradient(to right, rgba(0,0,0,0), rgba(0,0,0,var(--mm-shade))); }
        .mm-page--right::after { left: 0;  background: linear-gradient(to left,  rgba(0,0,0,0), rgba(0,0,0,var(--mm-shade))); }

        .mm-folio {
          position: absolute;
          bottom: 1.6rem;
          display: flex;
          gap: 2.4rem;
          font-size: 0.7rem;
          line-height: 1;
          font-weight: 500;
          color: var(--mm-mute);
        }
        .mm-page--left  .mm-folio { left: 3rem; }
        .mm-page--right .mm-folio { left: 3.5rem; }

        .mm-caption {
          max-width: 17rem;
          font-size: 0.72rem;
          line-height: 1.4;
          font-weight: 400;
          color: var(--mm-mute);
        }

        /* ── Cover ── */
        .mm-title {
          margin-top: 2.4rem;
          font-weight: 500;
          line-height: 0.9;
          letter-spacing: -0.05em;
          font-size: min(calc((var(--mm-pw) - 6.5rem) / (14 * 0.47)), 11rem);
        }
        .mm-title__line { display: block; }

        /* The photo fills the page; the caption and title sit above it. */
        .mm-photo {
          position: absolute;
          inset: 0;
          z-index: 0;
          background-size: cover;
          background-position: center 70%;       /* keeps the sheep in the lower third */
        }
        .mm-photo::after {                        /* a soft shade so the type stays legible */
          content: "";
          position: absolute;
          inset: 0;
          background: linear-gradient(to bottom, rgba(10, 20, 14, 0.62), rgba(10, 20, 14, 0) 50%);
        }
        .mm-page--cover .mm-caption,
        .mm-page--cover .mm-title { position: relative; z-index: 1; }

        /* ── Oversized running text ── */
        .mm-page--lead { display: block; }
        .mm-lead {
          font-size: clamp(1.35rem, 2.3vw, 2.5rem);
          line-height: 1.17;
          letter-spacing: -0.018em;
          font-weight: 450;
          max-width: 40rem;
        }
        .mm-lead p { margin: 0; line-height: inherit; }
        .mm-lead p + p { text-indent: 2.2em; }
        .mm-lead--closing { margin-top: 6vw; }
        .mm-byline {
          float: left;
          width: 11.5rem;
          margin: 0.3rem 1rem 0 0;
          font-size: 0.72rem;
          line-height: 1.35;
          letter-spacing: 0;
          font-weight: 400;
          color: var(--mm-mute);
        }
        .mm-byline span { display: block; }
        .mm-byline strong { font-weight: 600; color: inherit; }

        /* ── Plates: one very large word standing in for a picture ── */
        .mm-plate {
          margin-top: auto;
          font-weight: 500;
          line-height: 0.8;
          letter-spacing: -0.045em;
          white-space: nowrap;
        }
        .mm-plate--horizontal {
          padding-bottom: 0.06em;
          font-size: min(calc((var(--mm-pw) - 6.5rem) / (var(--chars) * 0.6)), 15rem);
        }
        .mm-plate--vertical {
          writing-mode: vertical-rl;
          transform: rotate(180deg);              /* reads upward, like a spine */
          align-self: flex-start;
          font-size: min(calc((var(--mm-ph) - 13rem) / (var(--chars) * 0.56)), 12rem);
        }
        .mm-page--right .mm-plate--vertical { align-self: flex-end; }

        /* ── Text pages ── */
        .mm-headline {
          max-width: 15em;
          font-size: clamp(1.6rem, 2.7vw, 2.7rem);
          line-height: 1.06;
          font-weight: 500;
          letter-spacing: -0.03em;
          text-wrap: balance;
          margin: 0 0 3rem;
        }
        .mm-body {
          margin-top: auto;
          max-width: 33rem;
          font-size: clamp(0.92rem, 1.05vw, 1.05rem);
          line-height: 1.55;
          letter-spacing: 0;
          font-weight: 400;
        }
        .mm-body p { margin: 0; line-height: inherit; text-indent: 1.4em; }
        .mm-body p:first-child { text-indent: 0; }

        /* ── Closing ── */
        .mm-page--colophon { justify-content: flex-end; gap: 2.2rem; }
        .mm-note {
          max-width: 24rem;
          font-size: 0.82rem;
          line-height: 1.5;
          color: var(--mm-mute);
        }
        .mm-links { display: flex; gap: 2rem; flex-wrap: wrap; }
        .mm-links a {
          font-size: 0.95rem;
          line-height: 1.3;
          font-weight: 500;
          border-bottom: 1px solid currentColor;
          padding-bottom: 0.15rem;
        }
        .mm a:focus-visible { outline: 2px solid currentColor; outline-offset: 4px; }

        /* ── Phones and small tablets: pages stack, one per screen-ish ── */
        @media (max-width: 820px) {
          .mm {
            --mm-pw: 100vw;
            --mm-ph: 30rem;
          }
          .mm-spread { grid-template-columns: 1fr; }
          .mm-page,
          .mm-page--left,
          .mm-page--right { min-height: 0; padding: 2.2rem 1.4rem 4.2rem; }
          .mm-page + .mm-page { border-top: 1px solid rgba(128, 128, 128, 0.35); }
          .mm-page--plate { min-height: 20rem; }
          .mm-page--cover { min-height: min(80vh, 42rem); min-height: min(80svh, 42rem); }
          .mm-page--left::after, .mm-page--right::after { display: none; }
          .mm-page--left .mm-folio,
          .mm-page--right .mm-folio { left: 1.4rem; bottom: 1.3rem; }

          .mm-title { margin-top: 1.8rem; font-size: min(calc((100vw - 2.8rem) / (14 * 0.5)), 7rem); }
          .mm-plate--horizontal,
          .mm-plate--vertical {
            writing-mode: horizontal-tb;
            transform: none;
            align-self: flex-start;
            margin-top: 3rem;
            font-size: min(calc((100vw - 2.8rem) / (var(--chars) * 0.62)), 9rem);
          }
          .mm-page--right .mm-plate--vertical { align-self: flex-start; }

          .mm-headline { max-width: none; margin-bottom: 2rem; }
          .mm-body { margin-top: 0; max-width: none; }
          .mm-byline { width: 8.5rem; }
          .mm-lead--closing { margin-top: 0; }
        }
      `}</style>
    </div>
  );
}
