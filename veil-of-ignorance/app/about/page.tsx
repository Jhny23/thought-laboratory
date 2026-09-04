"use client";
import { useRef, useState, useEffect } from "react";
import Nav from "@/app/components/Nav";
import Footer from "@/app/components/Footer";

function Reveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.05 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return (
    <div ref={ref} style={{
      opacity: visible ? 1 : 0,
      transform: visible ? "translateY(0)" : "translateY(14px)",
      transition: `opacity 1000ms ease ${delay}ms, transform 1000ms ease ${delay}ms`,
    }}>
      {children}
    </div>
  );
}

export default function About() {
  return (
    <div style={{ backgroundColor: "var(--white)", minHeight: "100vh" }}>
      <Nav />
      <div style={{ maxWidth: "620px", margin: "0 auto", padding: "9rem 2.2rem 8rem" }}>

        <Reveal>
          <p style={{ fontFamily: "var(--mono)", fontSize: "0.5rem", letterSpacing: "0.22em", color: "var(--muted)", marginBottom: "3.5rem" }}>
            about
          </p>
        </Reveal>

        <Reveal delay={80}>
          <h1 style={{ fontFamily: "var(--serif)", fontSize: "clamp(2rem, 5vw, 3.2rem)", fontWeight: 400, fontStyle: "italic", lineHeight: 1.1, color: "var(--ink)", marginBottom: "3.5rem", letterSpacing: "-0.02em" }}>
            This started as a question I couldn't stop asking myself.
          </h1>
        </Reveal>

        <Reveal delay={140}>
          <div style={{ width: "48px", height: "1px", backgroundColor: "var(--border)", marginBottom: "3.5rem" }} />
        </Reveal>

        <Reveal delay={180}>
          <p style={{ fontFamily: "var(--serif)", fontSize: "1.05rem", lineHeight: 2.1, color: "var(--ink)", marginBottom: "2rem" }}>
            I kept reading philosophy and nodding along. Rawls made sense. Parfit made sense. Foot and Thomson made sense. And then I'd close the book and go back to my life and nothing had changed. I hadn't been tested. I'd just been informed.
          </p>
        </Reveal>

        <Reveal delay={220}>
          <p style={{ fontFamily: "var(--serif)", fontSize: "1.05rem", lineHeight: 2.1, color: "var(--ink)", marginBottom: "2rem" }}>
            The thought experiments that changed how I think weren't the ones I read about. They were the ones I had to sit inside — where I had to choose, and then live with what that choice said about me.
          </p>
        </Reveal>

        <Reveal delay={260}>
          <p style={{ fontFamily: "var(--serif)", fontSize: "1.05rem", lineHeight: 2.1, color: "var(--ink)", marginBottom: "2rem" }}>
            Thought Laboratory is an attempt to build that experience for anyone who wants it. Not a course. Not a textbook. Not a podcast. A place where you have to decide.
          </p>
        </Reveal>

        <Reveal delay={300}>
          <p style={{ fontFamily: "var(--serif)", fontSize: "1.05rem", lineHeight: 2.1, color: "var(--ink)", marginBottom: "2rem" }}>
            The experiments here are grounded in real philosophy — Rawls on justice, Foot and Thomson on the trolley problem, Parfit on personal identity, Camus on meaning. But they're rebuilt from the ground up so that you have to reason through them yourself, under conditions designed to make that reasoning genuinely difficult.
          </p>
        </Reveal>

        <Reveal delay={340}>
          <p style={{ fontFamily: "var(--serif)", fontSize: "1.05rem", lineHeight: 2.1, color: "var(--muted)", fontStyle: "italic", marginBottom: "3.5rem" }}>
            There is no correct answer here. There is only what you choose, and what that reveals.
          </p>
        </Reveal>

        <Reveal delay={380}>
          <div style={{ width: "48px", height: "1px", backgroundColor: "var(--border)", marginBottom: "3.5rem" }} />
        </Reveal>

        {/* Manifesto lines */}
        <Reveal delay={420}>
          <div style={{ marginBottom: "4rem" }}>
            {[
              "Philosophy is not an spectator sport.",
              "The examined life requires examination, not just reading about examination.",
              "Consistency is a form of honesty.",
              "What you say you believe and what you choose under pressure are rarely the same thing.",
              "That gap is where the real thinking begins.",
            ].map((line, i) => (
              <p key={i} style={{
                fontFamily: "var(--serif)",
                fontSize: "0.95rem",
                fontStyle: "italic",
                lineHeight: 2.0,
                color: "var(--ink)",
                opacity: 1 - i * 0.08,
                paddingLeft: `${i * 0.4}rem`,
              }}>
                {line}
              </p>
            ))}
          </div>
        </Reveal>

        <Reveal delay={460}>
          <div style={{ width: "48px", height: "1px", backgroundColor: "var(--border)", marginBottom: "3.5rem" }} />
        </Reveal>

        {/* Contact metadata */}
        <Reveal delay={500}>
          <div style={{ display: "flex", flexDirection: "column", gap: "0" }}>
            {[
              ["author", "John Kimeu"],
              ["instagram", "@inthiscult"],
              ["enquiries", "info@thoughtlaboratory.com"],
              ["built", "Nairobi, 2025"],
            ].map(([k, v]) => (
              <div key={k} style={{
                display: "grid", gridTemplateColumns: "120px 1fr",
                borderTop: "1px solid var(--border)",
                padding: "0.7rem 0",
              }}>
                <span style={{ fontFamily: "var(--mono)", fontSize: "0.5rem", letterSpacing: "0.1em", color: "var(--muted)" }}>{k}</span>
                <span style={{ fontFamily: "var(--mono)", fontSize: "0.5rem", letterSpacing: "0.06em", color: "var(--ink)" }}>{v}</span>
              </div>
            ))}
            <div style={{ borderTop: "1px solid var(--border)" }} />
          </div>
        </Reveal>

      </div>
      <Footer />
    </div>
  );
}
