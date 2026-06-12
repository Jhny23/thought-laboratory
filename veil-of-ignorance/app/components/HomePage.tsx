"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Nav from "@/app/components/Nav";
import Footer from "@/app/components/Footer";

const slides = [
  {
    bg: "#1A1918",
    image: "/images/download.gif",
    caption: "what kind of world would you build",
    sub: "if you didn't know where you'd end up in it?",
  },
  {
    bg: "#2C2825",
    image: "/images/slide-3.jpg",
    caption: "six decisions",
    sub: "one veil · one society · no certainty",
  },
  {
    bg: "#1E1C20",
    image: "/images/slide-2.gif",
    caption: "philosophy is not a spectator sport",
    sub: "thought laboratory · est. 2025",
  },
  {
    bg: "#1A1C1A",
    image: "/images/slid4.jpg",
    caption: "the unexamined life is not worth living",
    sub: "— socrates",
  },
];

function HeroSlide({ slide, active }: { slide: typeof slides[0]; active: boolean }) {
  return (
    <div style={{
      position: "absolute", inset: 0,
      backgroundColor: slide.bg,
      opacity: active ? 1 : 0,
      transition: "opacity 2s ease",
      display: "flex", alignItems: "flex-end",
      padding: "2.8rem",
    }}>
      {slide.image && (
        <div style={{
          position: "absolute", inset: 0,
          backgroundImage: `url(${slide.image})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          opacity: 0.55,
          transform: active ? "scale(1.06)" : "scale(1)",
          transition: "transform 8s ease, opacity 2s ease",
        }} />
      )}
      <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.04 }} preserveAspectRatio="none">
        {Array.from({ length: 18 }).map((_, i) => (
          <line key={i} x1="0" y1={`${(i / 18) * 100}%`} x2="100%" y2={`${(i / 18) * 100}%`}
            stroke="white" strokeWidth="0.5" />
        ))}
      </svg>
      <div style={{ position: "relative", zIndex: 1 }}>
        <p style={{
          fontFamily: "var(--serif)",
          fontSize: "clamp(1.1rem, 2.2vw, 1.5rem)",
          fontStyle: "italic", fontWeight: 400,
          color: "rgba(250,250,248,0.85)",
          marginBottom: "0.3rem", lineHeight: 1.3,
        }}>
          {slide.caption}
        </p>
        <p style={{
          fontFamily: "var(--mono)", fontSize: "0.55rem",
          letterSpacing: "0.12em",
          color: "rgba(250,250,248,0.45)",
        }}>
          {slide.sub}
        </p>
      </div>
    </div>
  );
}

function Hero() {
  const [current, setCurrent] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setCurrent(c => (c + 1) % slides.length), 7000);
    return () => clearInterval(t);
  }, []);
  return (
    <div style={{
      position: "relative", width: "100%",
      aspectRatio: "16 / 7", overflow: "hidden",
      borderBottom: "1px solid var(--border)",
    }}>
      {slides.map((s, i) => <HeroSlide key={i} slide={s} active={i === current} />)}
      <div style={{
        position: "absolute", bottom: "1.2rem", right: "1.8rem",
        display: "flex", gap: "6px", zIndex: 2,
      }}>
        {slides.map((_, i) => (
          <button key={i} onClick={() => setCurrent(i)} style={{
            width: "5px", height: "5px", borderRadius: "50%",
            backgroundColor: i === current ? "rgba(250,250,248,0.8)" : "rgba(250,250,248,0.25)",
            border: "none", padding: 0, cursor: "pointer",
            transition: "background-color 0.3s",
          }} />
        ))}
      </div>
    </div>
  );
}

function Reveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.08, rootMargin: "0px 0px -40px 0px" }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return (
    <div ref={ref} style={{
      opacity: visible ? 1 : 0,
      transform: visible ? "translateY(0)" : "translateY(18px)",
      transition: `opacity 900ms ease ${delay}ms, transform 900ms ease ${delay}ms`,
    }}>
      {children}
    </div>
  );
}

export default function HomePage() {
  return (
    <div style={{ backgroundColor: "var(--white)", minHeight: "100vh" }}>
      <Nav />

      <div style={{ paddingTop: "3rem" }}>
        <Hero />
      </div>

      {/* ── ABOUT THE LAB ── */}
      <div style={{
        maxWidth: "700px",
        margin: "0 auto",
        padding: "8rem 1.8rem 8rem",
        borderBottom: "1px solid var(--border)",
      }}>
        <Reveal>
          <p style={{
            fontFamily: "var(--mono)", fontSize: "0.52rem",
            letterSpacing: "0.2em", color: "var(--muted)",
            marginBottom: "3rem",
          }}>
            thought laboratory
          </p>
        </Reveal>

        <Reveal delay={80}>
          <h2 style={{
            fontFamily: "var(--serif)",
            fontSize: "clamp(1.8rem, 4vw, 3rem)",
            fontWeight: 400, fontStyle: "italic",
            lineHeight: 1.1, color: "var(--ink)",
            marginBottom: "3rem",
            letterSpacing: "-0.01em",
          }}>
            Philosophy is not something<br />you observe from a distance.
          </h2>
        </Reveal>

        <Reveal delay={140}>
          <div style={{ height: "1px", backgroundColor: "var(--border)", marginBottom: "3rem" }} />
        </Reveal>

        <Reveal delay={180}>
          <p style={{
            fontFamily: "var(--serif)", fontSize: "1rem",
            fontWeight: 300, lineHeight: 1.9,
            color: "var(--ink)", marginBottom: "1.6rem",
            maxWidth: "58ch",
          }}>
            Thought Laboratory is a collection of interactive experiments built on canonical philosophy. Not essays to read. Not arguments to follow at arm's length. Positions to take, under conditions that make taking them difficult.
          </p>
        </Reveal>

        <Reveal delay={220}>
          <p style={{
            fontFamily: "var(--serif)", fontSize: "1rem",
            fontWeight: 300, lineHeight: 1.9,
            color: "var(--muted)", fontStyle: "italic",
            maxWidth: "52ch",
          }}>
            Each experiment is drawn from a thought experiment that changed how philosophers reason — and redesigned so that you have to reason through it yourself.
          </p>
        </Reveal>
      </div>

      {/* ── FEATURED EXPERIMENT ── */}
      <div style={{
        maxWidth: "700px",
        margin: "0 auto",
        padding: "8rem 1.8rem 10rem",
      }}>
        <Reveal>
          <p style={{
            fontFamily: "var(--mono)", fontSize: "0.52rem",
            letterSpacing: "0.2em", color: "var(--muted)",
            marginBottom: "5rem",
          }}>
            now open
          </p>
        </Reveal>

        <Reveal delay={60}>
          <p style={{
            fontFamily: "var(--mono)", fontSize: "0.52rem",
            letterSpacing: "0.15em", color: "var(--muted)",
            marginBottom: "1.8rem",
          }}>
            experiment 016 · John Rawls · 1971
          </p>
        </Reveal>

        <Reveal delay={100}>
          <h2 style={{
            fontFamily: "var(--serif)",
            fontSize: "clamp(2rem, 5vw, 3.8rem)",
            fontWeight: 400,
            lineHeight: 1.05,
            color: "var(--ink)",
            marginBottom: "3rem",
            letterSpacing: "-0.02em",
            maxWidth: "18ch",
          }}>
            Veil of<br /><em>Ignorance</em>
          </h2>
        </Reveal>

        <Reveal delay={140}>
          <div style={{ height: "1px", backgroundColor: "var(--border)", marginBottom: "3rem" }} />
        </Reveal>

        <Reveal delay={180}>
          <div style={{ marginBottom: "4rem" }}>
            {[
              ["domain",    "justice · society"],
              ["duration",  "8 minutes"],
              ["decisions", "6"],
              ["thinker",   "John Rawls"],
            ].map(([k, v]) => (
              <div key={k} style={{
                display: "grid", gridTemplateColumns: "100px 1fr",
                borderTop: "1px solid var(--border)",
                padding: "0.6rem 0",
              }}>
                <span style={{ fontFamily: "var(--mono)", fontSize: "0.5rem", letterSpacing: "0.1em", color: "var(--muted)" }}>
                  {k}
                </span>
                <span style={{ fontFamily: "var(--mono)", fontSize: "0.5rem", letterSpacing: "0.06em", color: "var(--ink)" }}>
                  {v}
                </span>
              </div>
            ))}
            <div style={{ borderTop: "1px solid var(--border)" }} />
          </div>
        </Reveal>

        <Reveal delay={220}>
          <p style={{
            fontFamily: "var(--serif)", fontSize: "1rem",
            fontWeight: 300, lineHeight: 1.9,
            color: "var(--ink)", marginBottom: "1.4rem",
            maxWidth: "58ch",
          }}>
            Imagine you are about to be born into a world you must design — but you don't yet know who you will be in it. Rich or poor. Healthy or ill. Majority or minority.
          </p>
        </Reveal>

        <Reveal delay={250}>
          <p style={{
            fontFamily: "var(--serif)", fontSize: "1rem",
            fontWeight: 300, lineHeight: 1.9,
            color: "var(--muted)", fontStyle: "italic",
            marginBottom: "4rem", maxWidth: "52ch",
          }}>
            From behind this veil of ignorance, you have six decisions to make. The society you design is the one you will inhabit.
          </p>
        </Reveal>

        <Reveal delay={290}>
          <div style={{ display: "flex", alignItems: "center", gap: "2rem" }}>
            <Link href="/experiments/veil-of-ignorance" style={{
              fontFamily: "var(--mono)", fontSize: "0.6rem",
              letterSpacing: "0.12em", color: "var(--ink)",
              border: "1px solid var(--ink)", padding: "0.75rem 1.6rem",
              textDecoration: "none", transition: "all 0.2s",
            }}
            onMouseEnter={e => {
              e.currentTarget.style.backgroundColor = "var(--ink)";
              e.currentTarget.style.color = "var(--white)";
            }}
            onMouseLeave={e => {
              e.currentTarget.style.backgroundColor = "transparent";
              e.currentTarget.style.color = "var(--ink)";
            }}>
              (enter experiment)
            </Link>
            <Link href="/experiments" style={{
              fontFamily: "var(--mono)", fontSize: "0.55rem",
              letterSpacing: "0.1em", color: "var(--muted)",
              textDecoration: "none",
              borderBottom: "1px solid transparent", paddingBottom: "1px",
              transition: "all 0.2s",
            }}
            onMouseEnter={e => {
              e.currentTarget.style.color = "var(--ink)";
              e.currentTarget.style.borderColor = "var(--ink)";
            }}
            onMouseLeave={e => {
              e.currentTarget.style.color = "var(--muted)";
              e.currentTarget.style.borderColor = "transparent";
            }}>
              view all experiments →
            </Link>
          </div>
        </Reveal>
      </div>

      <Footer />
    </div>
  );
}
