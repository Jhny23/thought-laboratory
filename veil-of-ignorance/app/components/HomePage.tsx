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
    <div className="hero-wrapper" style={{
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
      {/* LEFT — temple image */}
      <div className="temple-section-image" style={{
        borderRight: "1px solid var(--border)",
        backgroundColor: "#F0EDE8",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "4rem 2rem",
        opacity: visible ? 1 : 0,
        transition: "opacity 1.6s ease 0.2s",
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

      {/* RIGHT — text cascade */}
      <div className="temple-section-text" style={{
        padding: "6rem 3rem 6rem 3.5rem",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        gap: "0.1rem",
        backgroundColor: "var(--white)",
      }}>
        {rightLines.map((line, i) => (
          <p
            key={i}
            style={{
              fontFamily: (line as any).mono ? "var(--mono)" : "'Noto Serif SC', 'EB Garamond', serif",
              fontSize: line.size,
              color: line.color,
              letterSpacing: (line as any).mono ? "0.12em" : "0.08em",
              lineHeight: line.text === "　" ? 1.2 : 1.7,
              margin: 0,
            }}
          >
            {line.text}
          </p>
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
    <Preloader>
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
            experiment 001 · Philosophy Experiments · 2002
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
            Philosophical<br /><em>Health Test</em>
          </h2>
        </Reveal>

        <Reveal delay={140}>
          <div style={{ height: "1px", backgroundColor: "var(--border)", marginBottom: "3rem" }} />
        </Reveal>

        <Reveal delay={180}>
          <div style={{ marginBottom: "4rem" }}>
            {[
              ["domain",    "belief · consistency"],
              ["duration",  "5 minutes"],
              ["statements", "30"],
              ["choices",   "agree / disagree"],
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
            Thirty statements. Two choices each. The test does not judge whether your beliefs are right or wrong — it finds where they contradict each other.
          </p>
        </Reveal>

        <Reveal delay={250}>
          <p style={{
            fontFamily: "var(--serif)", fontSize: "1rem",
            fontWeight: 300, lineHeight: 1.9,
            color: "var(--muted)", fontStyle: "italic",
            marginBottom: "4rem", maxWidth: "52ch",
          }}>
            Most people are surprised by how many tensions their beliefs contain. The question is not whether you are consistent — but where you are not.
          </p>
        </Reveal>

        <Reveal delay={290}>
          <div style={{ display: "flex", alignItems: "center", gap: "2rem" }}>
            <Link href="/experiments/philosophical-health-test" style={{
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
