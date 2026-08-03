"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Nav from "@/app/components/Nav";
import Footer from "@/app/components/Footer";
import Preloader from "@/app/components/Preloader";

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
      transition: "opacity 2.8s ease",
      display: "flex", alignItems: "flex-end",
      padding: "3.2rem 3rem",
    }}>
      {slide.image && (
        <div style={{
          position: "absolute", inset: 0,
          backgroundImage: `url(${slide.image})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          opacity: 0.48,
          transform: active ? "scale(1.05)" : "scale(1)",
          transition: "transform 10s ease, opacity 2.8s ease",
        }} />
      )}
      {/* Grain over hero image */}
      <div style={{
        position: "absolute", inset: 0,
        backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E\")",
        backgroundSize: "200px 200px",
        opacity: 0.06,
        mixBlendMode: "overlay",
        pointerEvents: "none",
      }} />
      <div style={{ position: "relative", zIndex: 1, maxWidth: "520px" }}>
        <p style={{
          fontFamily: "var(--serif)",
          fontSize: "clamp(1.15rem, 2.4vw, 1.65rem)",
          fontStyle: "italic", fontWeight: 400,
          color: "rgba(247,244,239,0.82)",
          marginBottom: "0.9rem",
          lineHeight: 1.45,
          letterSpacing: "0.005em",
        }}>
          {slide.caption}
        </p>
        <p style={{
          fontFamily: "var(--mono)", fontSize: "0.54rem",
          letterSpacing: "0.14em",
          color: "rgba(247,244,239,0.38)",
          lineHeight: 1.8,
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
    const t = setInterval(() => setCurrent(c => (c + 1) % slides.length), 8000);
    return () => clearInterval(t);
  }, []);
  return (
    <div className="hero-wrapper" style={{
      position: "relative", width: "100%",
      aspectRatio: "16 / 7", overflow: "hidden",
      borderBottom: "1px solid var(--border)",
    }}>
      {slides.map((s, i) => <HeroSlide key={i} slide={s} active={i === current} />)}
      <div style={{
        position: "absolute", bottom: "1.4rem", right: "2rem",
        display: "flex", gap: "8px", zIndex: 2,
      }}>
        {slides.map((_, i) => (
          <button key={i} onClick={() => setCurrent(i)} style={{
            width: "4px", height: "4px", borderRadius: "50%",
            backgroundColor: i === current ? "rgba(247,244,239,0.75)" : "rgba(247,244,239,0.2)",
            border: "none", padding: 0, cursor: "pointer",
            transition: "background-color 0.5s",
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
      { threshold: 0.05, rootMargin: "0px 0px -40px 0px" }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return (
    <div ref={ref} style={{
      opacity: visible ? 1 : 0,
      transform: visible ? "translateY(0)" : "translateY(16px)",
      transition: `opacity 1100ms ease ${delay}ms, transform 1100ms ease ${delay}ms`,
    }}>
      {children}
    </div>
  );
}

function TempleSection() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current; if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const rightLines = [
    { text: "我們並非各自獨立存在的實體", size: "1.1rem", color: "#2C3E6B", delay: 300 },
    { text: "We are not separately existing entities", size: "0.52rem", color: "#7A6E5F", delay: 450, mono: true },
    { text: "　", size: "1rem", color: "transparent", delay: 0 },
    { text: "自我之幻覺", size: "0.95rem", color: "#4A3728", delay: 550 },
    { text: "意識之流", size: "0.85rem", color: "#3D5A4A", delay: 650 },
    { text: "時間之箭", size: "0.78rem", color: "#6B4E3D", delay: 750 },
    { text: "　", size: "0.8rem", color: "transparent", delay: 0 },
    { text: "道可道，非常道", size: "1rem", color: "#2C4A3E", delay: 850 },
    { text: "知者不言，言者不知", size: "0.85rem", color: "#5C4A6E", delay: 950 },
    { text: "　", size: "0.8rem", color: "transparent", delay: 0 },
    { text: "Derek Parfit", size: "0.52rem", color: "#7A6E5F", delay: 1050, mono: true },
    { text: "Reasons and Persons · 1984", size: "0.48rem", color: "#9A8E7F", delay: 1100, mono: true },
    { text: "　", size: "0.8rem", color: "transparent", delay: 0 },
    { text: "無常是諸行之本質", size: "0.9rem", color: "#3E4A5C", delay: 1150 },
    { text: "因果之鏈", size: "0.82rem", color: "#5C3E2E", delay: 1250 },
    { text: "理由與人格", size: "0.75rem", color: "#4A5C4A", delay: 1350 },
  ];

  return (
    <div
      ref={ref}
      className="temple-section-grid"
      style={{
        borderTop: "1px solid var(--border)",
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
      }}
    >
      <div className="temple-section-image" style={{
        borderRight: "1px solid var(--border)",
        backgroundColor: "#EDE9E2",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "5rem 2.5rem",
        opacity: visible ? 1 : 0,
        transition: "opacity 2s ease 0.2s",
      }}>
        <img
          src="/images/temple.png"
          alt=""
          style={{
            width: "100%",
            maxWidth: "480px",
            display: "block",
            objectFit: "contain",
            mixBlendMode: "multiply",
          }}
        />
      </div>

      <div className="temple-section-text" style={{
        padding: "7rem 3.5rem 7rem 4rem",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        gap: "0.05rem",
        backgroundColor: "var(--white)",
      }}>
        {rightLines.map((line, i) => (
          <p key={i} style={{
            fontFamily: (line as any).mono ? "var(--mono)" : "'Noto Serif SC', 'EB Garamond', serif",
            fontSize: line.size,
            color: line.color,
            letterSpacing: (line as any).mono ? "0.12em" : "0.08em",
            lineHeight: line.text === "　" ? 1.6 : 1.85,
            margin: 0,
          }}>
            {line.text}
          </p>
        ))}
      </div>
    </div>
  );
}

export default function HomePage() {
  return (
    <Preloader>
    <div style={{ backgroundColor: "var(--white)", minHeight: "100vh" }}>
      <Nav />

      <div style={{ paddingTop: "3rem" }}>
        <Hero />
      </div>

      {/* ── ABOUT THE LAB ── */}
      <div style={{
        maxWidth: "680px",
        margin: "0 auto",
        padding: "9rem 1.8rem 9rem 2.2rem",
        borderBottom: "1px solid var(--border)",
      }}>
        <Reveal>
          <p style={{
            fontFamily: "var(--mono)", fontSize: "0.5rem",
            letterSpacing: "0.22em", color: "var(--muted)",
            marginBottom: "3.5rem",
          }}>
            thought laboratory
          </p>
        </Reveal>

        <Reveal delay={80}>
          <h2 style={{
            fontFamily: "var(--serif)",
            fontSize: "clamp(1.9rem, 4.5vw, 3.2rem)",
            fontWeight: 400, fontStyle: "italic",
            lineHeight: 1.15, color: "var(--ink)",
            marginBottom: "3.5rem",
            letterSpacing: "-0.01em",
            maxWidth: "22ch",
          }}>
            Philosophy is not something you observe from a distance.
          </h2>
        </Reveal>

        <Reveal delay={140}>
          {/* Deliberately short divider — not full width, feels handmade */}
          <div style={{ width: "48px", height: "1px", backgroundColor: "var(--border)", marginBottom: "3.5rem" }} />
        </Reveal>

        <Reveal delay={180}>
          <p style={{
            fontFamily: "var(--serif)", fontSize: "1.05rem",
            fontWeight: 400, lineHeight: 2.0,
            color: "var(--ink)", marginBottom: "2rem",
            maxWidth: "54ch",
          }}>
            Thought Laboratory is a collection of interactive experiments built on canonical philosophy. Not essays to read. Not arguments to follow at arm's length. Positions to take, under conditions that make taking them difficult.
          </p>
        </Reveal>

        <Reveal delay={240}>
          <p style={{
            fontFamily: "var(--serif)", fontSize: "1rem",
            fontWeight: 400, lineHeight: 2.0,
            color: "var(--muted)", fontStyle: "italic",
            maxWidth: "48ch",
          }}>
            Each experiment is drawn from a thought experiment that changed how philosophers reason — and rebuilt so that you have to reason through it yourself.
          </p>
        </Reveal>
      </div>

      {/* ── FEATURED EXPERIMENT ── */}
      <div style={{
        maxWidth: "680px",
        margin: "0 auto",
        padding: "9rem 1.8rem 11rem 2.2rem",
      }}>
        <Reveal>
          <p style={{
            fontFamily: "var(--mono)", fontSize: "0.5rem",
            letterSpacing: "0.22em", color: "var(--muted)",
            marginBottom: "5.5rem",
          }}>
            now open
          </p>
        </Reveal>

        <Reveal delay={60}>
          <p style={{
            fontFamily: "var(--mono)", fontSize: "0.5rem",
            letterSpacing: "0.14em", color: "var(--muted)",
            marginBottom: "2rem",
          }}>
            experiment 001 · Philosophy Experiments · 2002
          </p>
        </Reveal>

        <Reveal delay={100}>
          <h2 style={{
            fontFamily: "var(--serif)",
            fontSize: "clamp(2.2rem, 5.5vw, 4rem)",
            fontWeight: 400,
            lineHeight: 1.1,
            color: "var(--ink)",
            marginBottom: "3.5rem",
            letterSpacing: "-0.02em",
            maxWidth: "20ch",
          }}>
            Philosophical<br /><em>Health Test</em>
          </h2>
        </Reveal>

        <Reveal delay={140}>
          {/* Short offset divider */}
          <div style={{ width: "48px", height: "1px", backgroundColor: "var(--border)", marginBottom: "3.5rem" }} />
        </Reveal>

        <Reveal delay={180}>
          <div style={{ marginBottom: "4.5rem" }}>
            {[
              ["domain",     "belief · consistency"],
              ["duration",   "5 minutes"],
              ["statements", "30"],
              ["choices",    "agree / disagree"],
            ].map(([k, v]) => (
              <div key={k} style={{
                display: "grid", gridTemplateColumns: "110px 1fr",
                borderTop: "1px solid var(--border)",
                padding: "0.75rem 0",
              }}>
                <span style={{ fontFamily: "var(--mono)", fontSize: "0.48rem", letterSpacing: "0.1em", color: "var(--muted)" }}>
                  {k}
                </span>
                <span style={{ fontFamily: "var(--mono)", fontSize: "0.48rem", letterSpacing: "0.06em", color: "var(--ink)" }}>
                  {v}
                </span>
              </div>
            ))}
            <div style={{ borderTop: "1px solid var(--border)" }} />
          </div>
        </Reveal>

        <Reveal delay={220}>
          <p style={{
            fontFamily: "var(--serif)", fontSize: "1.05rem",
            fontWeight: 400, lineHeight: 2.0,
            color: "var(--ink)", marginBottom: "1.8rem",
            maxWidth: "54ch",
          }}>
            Thirty statements. Two choices each. The test does not judge whether your beliefs are right or wrong — it finds where they contradict each other.
          </p>
        </Reveal>

        <Reveal delay={260}>
          <p style={{
            fontFamily: "var(--serif)", fontSize: "1rem",
            fontWeight: 400, lineHeight: 2.0,
            color: "var(--muted)", fontStyle: "italic",
            marginBottom: "4.5rem", maxWidth: "48ch",
          }}>
            Most people are surprised by how many tensions their beliefs contain. The question is not whether you are consistent — but where you are not.
          </p>
        </Reveal>

        <Reveal delay={300}>
          <div style={{ display: "flex", alignItems: "center", gap: "2.5rem" }}>
            <Link href="/experiments/philosophical-health-test" style={{
              fontFamily: "var(--mono)", fontSize: "0.58rem",
              letterSpacing: "0.12em", color: "var(--ink)",
              border: "1px solid var(--ink)", padding: "0.85rem 1.8rem",
              textDecoration: "none", transition: "all 0.3s",
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
              fontFamily: "var(--mono)", fontSize: "0.52rem",
              letterSpacing: "0.1em", color: "var(--muted)",
              textDecoration: "none",
              borderBottom: "1px solid transparent", paddingBottom: "2px",
              transition: "all 0.3s",
            }}
            onMouseEnter={e => {
              e.currentTarget.style.color = "var(--ink)";
              e.currentTarget.style.borderColor = "var(--muted)";
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

      {/* ── TEMPLE SECTION ── */}
      <TempleSection />

      <Footer />
    </div>
    <style jsx global>{`
      @media (max-width: 768px) {
        .hero-wrapper { aspect-ratio: 4 / 5 !important; }
        .temple-section-grid { grid-template-columns: 1fr !important; }
        .temple-section-image { border-right: none !important; border-bottom: 1px solid var(--border) !important; padding: 2.5rem 1.5rem !important; }
        .temple-section-text { padding: 3rem 1.8rem !important; }
      }
      @media (max-width: 480px) {
        .hero-wrapper { aspect-ratio: 3 / 4 !important; }
      }
    `}</style>
    </Preloader>
  );
}
