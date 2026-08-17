"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Nav from "@/app/components/Nav";
import Footer from "@/app/components/Footer";
import Preloader from "@/app/components/Preloader";
import { FloatingQuestionMark, TinyPhilosopher, TinyTortoise } from "@/app/components/MicroIllustrations";

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
    <div style={{
      position: "relative", width: "100%",
      height: "100vh",
      overflow: "hidden",
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

function TaoSection() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current; if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.08 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className="tao-section"
      style={{
        position: "relative",
        backgroundColor: "#F9EEE8",
        overflow: "hidden",
        borderTop: "1px solid #E8C8BE",
        borderBottom: "1px solid #E8C8BE",
        minHeight: "80vh",
        display: "flex",
        alignItems: "center",
        backgroundImage: "radial-gradient(ellipse at 80% 20%, rgba(220,160,148,0.18) 0%, transparent 60%), radial-gradient(ellipse at 10% 80%, rgba(210,140,130,0.12) 0%, transparent 50%)",
      }}
    >
      {/* Diagonal composition lines — like the reference image */}
      <svg
        style={{
          position: "absolute", inset: 0,
          width: "100%", height: "100%",
          pointerEvents: "none", zIndex: 0,
          opacity: visible ? 1 : 0,
          transition: "opacity 2s ease 0.3s",
        }}
        preserveAspectRatio="none"
      >
        {/* Main diagonal — top-right to bottom-left */}
        <line x1="100%" y1="0" x2="0" y2="100%"
          stroke="#D4917A" strokeWidth="0.6" opacity="0.5" />
        {/* Secondary diagonal — offset */}
        <line x1="85%" y1="0" x2="0" y2="76%"
          stroke="#C4837E" strokeWidth="0.4" strokeDasharray="3 8" opacity="0.35" />
        {/* Faint cross line */}
        <line x1="0" y1="28%" x2="100%" y2="62%"
          stroke="#C4837E" strokeWidth="0.3" strokeDasharray="2 12" opacity="0.25" />
      </svg>

      {/* Ink sketch — pagoda / tower SVG, hand-drawn feel */}
      <div className="tao-pagoda" style={{
        position: "absolute",
        right: "-2%",
        bottom: 0,
        width: "clamp(180px, 32vw, 420px)",
        opacity: visible ? 0.22 : 0,
        transition: "opacity 2.4s ease 0.6s",
        pointerEvents: "none",
      }}>
        <svg viewBox="0 0 300 500" xmlns="http://www.w3.org/2000/svg"
          style={{ width: "100%", height: "auto" }}>
          {/* Pagoda — five tiers, ink-sketch style */}
          {[
            { y: 420, w: 180, h: 18, rx: 60 },
            { y: 340, w: 140, h: 16, rx: 46 },
            { y: 265, w: 108, h: 14, rx: 35 },
            { y: 198, w: 82,  h: 12, rx: 26 },
            { y: 138, w: 62,  h: 10, rx: 19 },
          ].map((tier, i) => (
            <g key={i}>
              {/* Eave shape */}
              <path
                d={`M ${150 - tier.rx} ${tier.y}
                    Q ${150 - tier.rx - 22} ${tier.y - 12} ${150 - tier.w/2} ${tier.y + tier.h}
                    L ${150 + tier.w/2} ${tier.y + tier.h}
                    Q ${150 + tier.rx + 22} ${tier.y - 12} ${150 + tier.rx} ${tier.y} Z`}
                fill="none"
                stroke="var(--ink)"
                strokeWidth={1.2 - i * 0.08}
                strokeLinejoin="round"
              />
              {/* Roof fill hint */}
              <path
                d={`M ${150 - tier.rx} ${tier.y}
                    Q 150 ${tier.y - 18 - i * 2} ${150 + tier.rx} ${tier.y} Z`}
                fill="none"
                stroke="var(--ink)"
                strokeWidth={0.6}
                opacity={0.4}
              />
              {/* Body column below tier */}
              {i < 4 && (
                <rect
                  x={150 - (tier.w * 0.22)}
                  y={tier.y + tier.h}
                  width={tier.w * 0.44}
                  height={[60,58,55,52,0][i]}
                  fill="none"
                  stroke="var(--ink)"
                  strokeWidth={0.7}
                />
              )}
            </g>
          ))}
          {/* Finial spire */}
          <line x1="150" y1="138" x2="150" y2="60" stroke="var(--ink)" strokeWidth="1" />
          <circle cx="150" cy="58" r="4" fill="none" stroke="var(--ink)" strokeWidth="0.8" />
          {/* Ground base */}
          <rect x="60" y="438" width="180" height="8" fill="none" stroke="var(--ink)" strokeWidth="0.8" />
          <rect x="40" y="446" width="220" height="6" fill="none" stroke="var(--ink)" strokeWidth="0.6" />
          {/* Rough sketch hatching on shadow side */}
          {[1,2,3,4,5].map(i => (
            <line key={i}
              x1={170 + i * 7} y1={140 + i * 60}
              x2={185 + i * 7} y2={160 + i * 60}
              stroke="var(--ink)" strokeWidth="0.4" opacity="0.3"
            />
          ))}
        </svg>
      </div>

      {/* Small figure silhouette — walking, bottom left */}
      <div className="tao-figure" style={{
        position: "absolute",
        left: "6%",
        bottom: "8%",
        opacity: visible ? 0.18 : 0,
        transition: "opacity 2s ease 1s",
        pointerEvents: "none",
      }}>
        <svg viewBox="0 0 24 48" width="18" height="36">
          {/* Head */}
          <circle cx="12" cy="5" r="4" fill="none" stroke="var(--ink)" strokeWidth="1.2" />
          {/* Body */}
          <line x1="12" y1="9" x2="12" y2="28" stroke="var(--ink)" strokeWidth="1.2" />
          {/* Arms — slightly asymmetric, mid-stride */}
          <line x1="12" y1="14" x2="4" y2="22" stroke="var(--ink)" strokeWidth="1" />
          <line x1="12" y1="14" x2="20" y2="19" stroke="var(--ink)" strokeWidth="1" />
          {/* Legs — walking */}
          <line x1="12" y1="28" x2="6" y2="44" stroke="var(--ink)" strokeWidth="1.2" />
          <line x1="12" y1="28" x2="17" y2="42" stroke="var(--ink)" strokeWidth="1.2" />
        </svg>
      </div>

      {/* Main content */}
      <div className="tao-content" style={{
        position: "relative", zIndex: 1,
        maxWidth: "680px",
        margin: "0 auto",
        padding: "8rem 2.2rem 8rem",
      }}>

        {/* Source label */}
        <div style={{
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(20px)",
          transition: "opacity 1.2s ease 0.4s, transform 1.2s ease 0.4s",
          marginBottom: "3.5rem",
          display: "flex", alignItems: "center", gap: "1.2rem",
        }}>
          <div style={{ width: "28px", height: "1px", backgroundColor: "#B87A72", opacity: 0.6 }} />
          <p style={{
            fontFamily: "var(--mono)", fontSize: "0.46rem",
            letterSpacing: "0.22em", color: "#9C6B65",
            textTransform: "uppercase",
          }}>
            Laozi · Tao Te Ching · c. 400 BCE
          </p>
        </div>

        {/* Chinese characters — vertical feel, large */}
        <div className="tao-chars" style={{
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(24px)",
          transition: "opacity 1.4s ease 0.6s, transform 1.4s ease 0.6s",
          marginBottom: "2.5rem",
          display: "flex",
          gap: "0.6rem",
          alignItems: "flex-start",
        }}>
          {"知人者智自知者明".split("").map((char, i) => (
            <span key={i} style={{
              fontFamily: "'Noto Serif SC', serif",
              fontSize: "clamp(1.8rem, 4vw, 3rem)",
              color: "#7A2E2E",
              lineHeight: 1,
              opacity: 0.82,
              letterSpacing: 0,
              display: "block",
            }}>
              {char}
            </span>
          ))}
        </div>

        {/* English translation */}
        <div style={{
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(20px)",
          transition: "opacity 1.4s ease 0.9s, transform 1.4s ease 0.9s",
          marginBottom: "1.4rem",
          paddingLeft: "0.2rem",
        }}>
          <p className="tao-quote" style={{
            fontFamily: "var(--serif)",
            fontSize: "clamp(1.1rem, 2.5vw, 1.6rem)",
            fontStyle: "italic",
            fontWeight: 400,
            color: "#5C2A2A",
            lineHeight: 1.6,
            maxWidth: "36ch",
          }}>
            Knowing others is wisdom.
            <br />Knowing yourself is enlightenment.
          </p>
        </div>

        {/* Annotation — like the editorial notes in the reference image */}
        <div style={{
          opacity: visible ? 1 : 0,
          transition: "opacity 1.4s ease 1.3s",
          marginTop: "3rem",
          borderLeft: "1px solid #D4A09A",
          paddingLeft: "1.2rem",
          maxWidth: "42ch",
        }}>
          <p style={{
            fontFamily: "var(--mono)",
            fontSize: "0.46rem",
            letterSpacing: "0.08em",
            color: "#8C5A54",
            lineHeight: 2.2,
          }}>
            Chapter 33 · 勝人者有力，自勝者強
            <br />
            Overcoming others requires force.
            <br />
            Overcoming yourself requires strength.
          </p>
        </div>

        {/* Chapter mark — bottom right, like a printer's mark */}
        <div style={{
          marginTop: "4rem",
          opacity: visible ? 0.4 : 0,
          transition: "opacity 1.6s ease 1.5s",
          textAlign: "right",
          paddingRight: "2rem",
        }}>
          <p style={{
            fontFamily: "'Noto Serif SC', serif",
            fontSize: "0.7rem",
            color: "#B87A72",
            letterSpacing: "0.08em",
          }}>
            三十三
          </p>
        </div>

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

      <Hero />

      {/* ── ABOUT THE LAB ── */}
      <div className="home-section" style={{
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
      <div className="home-section home-section-experiment" style={{
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

      {/* ── TAO SECTION ── */}
      <TaoSection />

      {/* ── TEMPLE SECTION ── */}
      <TempleSection />

      <Footer />
    </div>
    <style jsx global>{`
      @media (max-width: 768px) {
        .home-section { padding: 4rem 1.4rem !important; }
        .home-section-experiment { padding: 4rem 1.4rem 5rem !important; }
        .temple-section-grid { grid-template-columns: 1fr !important; }
        .temple-section-image { border-right: none !important; border-bottom: 1px solid var(--border) !important; padding: 2.5rem 1.5rem !important; }
        .temple-section-text { padding: 3rem 1.4rem !important; }
        .tao-section { min-height: auto !important; }
        .tao-pagoda { display: none !important; }
        .tao-figure { display: none !important; }
        .tao-content { padding: 4rem 1.4rem !important; }
        .tao-chars { flex-wrap: wrap !important; gap: 0.3rem !important; }
        .tao-chars span { font-size: 1.8rem !important; }
        .tao-quote { font-size: 1.1rem !important; }
      }
      @media (max-width: 480px) {
        .home-section { padding: 3rem 1.2rem !important; }
        .home-section-experiment { padding: 3rem 1.2rem 4rem !important; }
        .tao-content { padding: 3rem 1.2rem !important; }
      }
    `}</style>
      <FloatingQuestionMark />
    </Preloader>
  );
}
