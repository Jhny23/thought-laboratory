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

      {/* ── TEMPLE SECTION ── */}
      <TempleSection />

      <Footer />
    </div>
  );
}

/* ── Cascading character streams ── */
const leftStream = [
  "我", "思", "故", "我", "在", "　", "無", "常", "是", "諸", "行",
  "之", "本", "質", "　", "人", "者", "萬", "物", "之", "靈", "長",
  "　", "識", "者", "不", "博", "博", "者", "不", "識", "　", "道",
  "可", "道", "非", "常", "道", "　", "知", "者", "不", "言", "言",
  "者", "不", "知", "　", "天", "下", "皆", "知", "美", "之", "為",
];

const rightStream = [
  "吾", "日", "三", "省", "吾", "身", "　", "為", "人", "謀", "而",
  "不", "忠", "乎", "　", "與", "朋", "友", "交", "而", "不", "信",
  "乎", "　", "傳", "不", "習", "乎", "　", "自", "知", "者", "明",
  "勝", "人", "者", "有", "力", "　", "自", "勝", "者", "強", "　",
  "知", "足", "者", "富", "　", "強", "行", "者", "有", "志", "　",
];

const centerStream = [
  "我", "們", "並", "非", "各", "自", "獨", "立", "存", "在", "的",
  "實", "體", "　", "We", "are", "not", "separately", "existing",
  "entities", "　", "自", "我", "之", "幻", "覺", "　", "意", "識",
  "之", "流", "　", "時", "間", "之", "箭", "　", "因", "果", "之",
  "鏈", "　", "Derek", "Parfit", "　", "理", "由", "與", "人", "格",
];

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

  return (
    <div
      ref={ref}
      style={{
        position: "relative",
        backgroundColor: "#F8F7F4",
        overflow: "hidden",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      {/* Temple image — anchored top center */}
      <div style={{
        position: "relative",
        width: "100%",
        maxWidth: "760px",
        zIndex: 2,
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(-20px)",
        transition: "opacity 1.4s ease 0.2s, transform 1.4s ease 0.2s",
      }}>
        <img
          src="/images/temple.png"
          alt=""
          style={{
            width: "100%",
            display: "block",
            objectFit: "contain",
          }}
        />
      </div>

      {/* Cascading text — positioned below the temple image, overlapping naturally */}
      <div style={{
        position: "relative",
        width: "100%",
        maxWidth: "760px",
        marginTop: "-12rem",
        zIndex: 1,
        display: "grid",
        gridTemplateColumns: "1fr 1fr 1fr",
        gap: "0",
        paddingBottom: "8rem",
      }}>

        {/* Left stream */}
        <div style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-end",
          paddingRight: "1.5rem",
          opacity: visible ? 1 : 0,
          transition: "opacity 1.8s ease 0.6s",
        }}>
          {leftStream.map((char, i) => (
            <span
              key={i}
              style={{
                fontFamily: "'Noto Serif SC', 'Source Han Serif', serif",
                fontSize: char.length > 2 ? "0.48rem" : "0.85rem",
                color: `rgba(28,28,26,${0.15 + (i % 7) * 0.04})`,
                lineHeight: char === "　" ? 2.5 : 1.6,
                letterSpacing: "0.05em",
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(10px)",
                transition: `opacity 600ms ease ${800 + i * 35}ms, transform 600ms ease ${800 + i * 35}ms`,
              }}
            >
              {char}
            </span>
          ))}
        </div>

        {/* Center stream — Parfit quote */}
        <div style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          paddingTop: "6rem",
        }}>
          {centerStream.map((char, i) => (
            <span
              key={i}
              style={{
                fontFamily: char.length > 3
                  ? "var(--mono)"
                  : "'Noto Serif SC', 'Source Han Serif', serif",
                fontSize: char.length > 3 ? "0.42rem" : char === "　" ? "0.5rem" : "0.9rem",
                color: char === "Derek" || char === "Parfit"
                  ? "rgba(28,28,26,0.35)"
                  : `rgba(28,28,26,${0.12 + (i % 5) * 0.05})`,
                lineHeight: char === "　" ? 3 : 1.5,
                letterSpacing: char.length > 3 ? "0.12em" : "0.05em",
                textAlign: "center",
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(10px)",
                transition: `opacity 600ms ease ${1000 + i * 40}ms, transform 600ms ease ${1000 + i * 40}ms`,
              }}
            >
              {char}
            </span>
          ))}

          {/* Red seal stamp */}
          <div style={{
            marginTop: "1.5rem",
            width: "22px", height: "22px",
            backgroundColor: "#8B1A1A",
            display: "flex", alignItems: "center", justifyContent: "center",
            opacity: visible ? 0.8 : 0,
            transition: "opacity 800ms ease 3000ms",
          }}>
            <span style={{
              fontFamily: "'Noto Serif SC', serif",
              fontSize: "0.5rem", color: "white",
              lineHeight: 1,
            }}>思</span>
          </div>
        </div>

        {/* Right stream */}
        <div style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          paddingLeft: "1.5rem",
          paddingTop: "2rem",
          opacity: visible ? 1 : 0,
          transition: "opacity 1.8s ease 0.8s",
        }}>
          {rightStream.map((char, i) => (
            <span
              key={i}
              style={{
                fontFamily: char.length > 2 ? "var(--mono)" : "'Noto Serif SC', 'Source Han Serif', serif",
                fontSize: char.length > 2 ? "0.42rem" : "0.85rem",
                color: `rgba(28,28,26,${0.1 + (i % 6) * 0.04})`,
                lineHeight: char === "　" ? 2.5 : 1.6,
                letterSpacing: char.length > 2 ? "0.1em" : "0.05em",
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(10px)",
                transition: `opacity 600ms ease ${900 + i * 38}ms, transform 600ms ease ${900 + i * 38}ms`,
              }}
            >
              {char}
            </span>
          ))}

          {/* Second red seal */}
          <div style={{
            marginTop: "1rem",
            width: "18px", height: "18px",
            backgroundColor: "#8B1A1A",
            display: "flex", alignItems: "center", justifyContent: "center",
            opacity: visible ? 0.6 : 0,
            transition: "opacity 800ms ease 3500ms",
          }}>
            <span style={{
              fontFamily: "'Noto Serif SC', serif",
              fontSize: "0.42rem", color: "white",
            }}>道</span>
          </div>
        </div>
      </div>

      {/* Parfit attribution — bottom */}
      <div style={{
        position: "relative", zIndex: 3,
        paddingBottom: "5rem",
        textAlign: "center",
        opacity: visible ? 1 : 0,
        transition: "opacity 1s ease 2.5s",
      }}>
        <p style={{
          fontFamily: "var(--serif)", fontSize: "0.85rem",
          fontStyle: "italic", color: "rgba(28,28,26,0.35)",
          letterSpacing: "0.04em", marginBottom: "0.4rem",
        }}>
          "We are not separately existing entities."
        </p>
        <p style={{
          fontFamily: "var(--mono)", fontSize: "0.48rem",
          letterSpacing: "0.15em", color: "rgba(28,28,26,0.2)",
        }}>
          — Derek Parfit · Reasons and Persons · 1984
        </p>
      </div>
    </div>
  );
}
