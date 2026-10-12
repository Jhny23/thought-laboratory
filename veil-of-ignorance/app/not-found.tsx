"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Nav from "@/app/components/Nav";
import Footer from "@/app/components/Footer";

/* A 404 written as a small argument, in the site's own voice. */
export default function NotFound() {
  const path = usePathname() || "/";
  const shown = path.length > 42 ? path.slice(0, 41) + "…" : path;

  const way = [
    { href: "/experiments", label: "Run an experiment", note: "Choose, and see what it costs you" },
    { href: "/biographies", label: "Meet a thinker", note: "The people behind the arguments" },
    { href: "/metamorphosis", label: "Read Sartre", note: "A lecture in twenty-five pages" },
  ];

  return (
    <div style={{ backgroundColor: "var(--white)", minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <Nav />

      <main className="nf" style={{ flex: 1, padding: "7.5rem 1.8rem 5rem", position: "relative", overflow: "hidden" }}>
        {/* The numeral: one solid, one ghosted and out of register, like a misprint */}
        <div className="nf-numeral" aria-hidden="true">
          <span className="nf-ghost">404</span>
          <span className="nf-solid">404</span>
        </div>

        <div className="nf-body">
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
      </main>

      <Footer />

      <style jsx global>{`
        .nf { display: block; }
        .nf-numeral {
          position: absolute;
          top: 3.5rem;
          right: 4vw;
          font-family: var(--serif);
          font-style: italic;
          font-size: clamp(9rem, 30vw, 26rem);
          line-height: 0.8;
          letter-spacing: -0.04em;
          user-select: none;
          pointer-events: none;
        }
        .nf-numeral span { position: absolute; top: 0; right: 0; white-space: nowrap; }
        .nf-solid { color: var(--ink); opacity: 0.07; }
        .nf-ghost { color: transparent; -webkit-text-stroke: 1px rgba(28, 26, 23, 0.22); transform: translate(0.035em, 0.03em); }
        .nf-numeral { width: 1px; height: 1px; }

        .nf-body { position: relative; z-index: 1; max-width: 560px; margin: 0 auto 0 max(1.8rem, 8vw); }
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

        @media (max-width: 700px) {
          .nf { padding-top: 6rem !important; }
          .nf-body { margin-left: 0; }
          .nf-numeral { position: relative; top: 0; right: auto; width: auto; height: auto; font-size: 7.5rem; margin: 0 0 0.6rem 1.4rem; }
          .nf-numeral span { position: static; display: block; }
          .nf-ghost { display: none !important; }
          .nf-solid { opacity: 0.12; }
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
