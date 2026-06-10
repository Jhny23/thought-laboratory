"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { experiments } from "@/app/data/experiments";
import Nav from "@/app/components/Nav";
import Footer from "@/app/components/Footer";

/* ── Hero slides — abstract canvas art representing each mood ── */
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
      transition: "opacity 2s ease",   // slower fade
      display: "flex", alignItems: "flex-end",
      padding: "2.8rem",
    }}>
      {/* Background image with Ken Burns zoom */}
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

      {/* Subtle texture lines */}
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
          marginBottom: "0.3rem",
          lineHeight: 1.3,
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
      position: "relative",
      width: "100%",
      aspectRatio: "16 / 7",
      overflow: "hidden",
      borderBottom: "1px solid var(--border)",
    }}>
      {slides.map((s, i) => (
        <HeroSlide key={i} slide={s} active={i === current} />
      ))}

      {/* Dot indicators — bottom right */}
      <div style={{
        position: "absolute", bottom: "1.2rem", right: "1.8rem",
        display: "flex", gap: "6px", zIndex: 2,
      }}>
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            style={{
              width: "5px", height: "5px", borderRadius: "50%",
              backgroundColor: i === current ? "rgba(250,250,248,0.8)" : "rgba(250,250,248,0.25)",
              border: "none", padding: 0, cursor: "pointer",
              transition: "background-color 0.3s",
            }}
          />
        ))}
      </div>
    </div>
  );
}

/* ── Experiment card — B&W base, colour on hover (Metamorphoses behaviour) ── */
function ExperimentCard({ exp }: { exp: typeof experiments[0] }) {
  const [hovered, setHovered] = useState(false);
  const available = exp.status === "available";

  const CardWrapper = available ? Link : "div";
  const wrapperProps = available ? { href: `/experiments/${exp.slug}` } : {};

  return (
    <CardWrapper
      {...(wrapperProps as any)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "block",
        cursor: available ? "pointer" : "default",
        borderBottom: "1px solid var(--border)",
        padding: "0",
      }}
    >
      {/* Image area — greyscale to colour */}
      <div style={{
        position: "relative",
        aspectRatio: "4 / 3",
        overflow: "hidden",
        borderBottom: "1px solid var(--border)",
      }}>
        {/* Greyscale base */}
        <div style={{
          position: "absolute", inset: 0,
          backgroundColor: "#C8C4BE",
          opacity: hovered ? 0 : 1,
          transition: "opacity 0.5s ease",
          display: "flex", alignItems: "center", justifyContent: "center",
        }}>
          {/* Abstract mark for each experiment */}
          <svg viewBox="0 0 200 200" style={{ width: "55%", opacity: 0.2 }}>
            <ExperimentMark slug={exp.slug} />
          </svg>
        </div>

        {/* Colour version */}
        <div style={{
          position: "absolute", inset: 0,
          backgroundColor: exp.hue,
          opacity: hovered ? 1 : 0,
          transition: "opacity 0.5s ease",
          display: "flex", alignItems: "center", justifyContent: "center",
        }}>
          <svg viewBox="0 0 200 200" style={{ width: "55%", opacity: 0.35 }}>
            <ExperimentMark slug={exp.slug} />
          </svg>
        </div>

        {/* Status tag */}
        {!available && (
          <div style={{
            position: "absolute", top: "0.8rem", right: "0.8rem",
            fontFamily: "var(--mono)", fontSize: "0.48rem",
            letterSpacing: "0.12em", color: "var(--muted)",
            backgroundColor: "var(--white)", padding: "0.2rem 0.5rem",
          }}>
            soon
          </div>
        )}
      </div>

      {/* Card text */}
      <div style={{ padding: "0.9rem 0.1rem 1.2rem" }}>
        <p style={{
          fontFamily: "var(--mono)", fontSize: "0.6rem",
          letterSpacing: "0.06em", color: "var(--muted)",
          marginBottom: "0.25rem",
        }}>
          {exp.thinker}
        </p>
        <p style={{
          fontFamily: "var(--serif)", fontSize: "1rem",
          fontStyle: "italic", fontWeight: 400,
          color: "var(--ink)", lineHeight: 1.2,
          marginBottom: "0.2rem",
        }}>
          {exp.name}
        </p>
        <p style={{
          fontFamily: "var(--mono)", fontSize: "0.55rem",
          letterSpacing: "0.05em", color: "var(--muted)",
        }}>
          {exp.year}
        </p>
      </div>
    </CardWrapper>
  );
}

/* Abstract SVG marks — unique per experiment */
function ExperimentMark({ slug }: { slug: string }) {
  switch (slug) {
    case "veil-of-ignorance":
      return <circle cx="100" cy="100" r="70" stroke="currentColor" strokeWidth="1.5" fill="none" />;
    case "experience-machine":
      return (
        <>
          <rect x="40" y="40" width="120" height="120" stroke="currentColor" strokeWidth="1.5" fill="none" />
          <circle cx="100" cy="100" r="30" stroke="currentColor" strokeWidth="1.5" fill="none" />
        </>
      );
    case "moral-luck":
      return (
        <>
          <line x1="30" y1="100" x2="170" y2="100" stroke="currentColor" strokeWidth="1.5" />
          <line x1="100" y1="30" x2="100" y2="170" stroke="currentColor" strokeWidth="1.5" />
        </>
      );
    case "the-absurd":
      return <path d="M100,30 L170,170 L30,170 Z" stroke="currentColor" strokeWidth="1.5" fill="none" />;
    case "determinism-court":
      return (
        <>
          {[0,1,2,3,4].map(i => (
            <circle key={i} cx="100" cy="100" r={20 + i * 16} stroke="currentColor" strokeWidth="0.8" fill="none" />
          ))}
        </>
      );
    case "repugnant-conclusion":
      return (
        <>
          {[0,1,2,3,4,5,6].map(i => (
            <rect key={i} x={30 + i * 20} y={170 - (i + 1) * 18} width="14" height={(i + 1) * 18}
              stroke="currentColor" strokeWidth="1" fill="none" />
          ))}
        </>
      );
    default:
      return <circle cx="100" cy="100" r="60" stroke="currentColor" strokeWidth="1.5" fill="none" />;
  }
}

export default function HomePage() {
  return (
    <div style={{ backgroundColor: "var(--white)", minHeight: "100vh" }}>
      <Nav />

      {/* Hero */}
      <div style={{ paddingTop: "3rem" }}>
        <Hero />
      </div>

      {/* Filter bar — like Metamorphoses "filter +" */}
      <div style={{
        display: "flex", justifyContent: "space-between", alignItems: "center",
        padding: "0.9rem 1.8rem",
        borderBottom: "1px solid var(--border)",
      }}>
        <span style={{
          fontFamily: "var(--mono)", fontSize: "0.6rem",
          letterSpacing: "0.1em", color: "var(--muted)",
        }}>
          all experiments
        </span>
        <span style={{
          fontFamily: "var(--mono)", fontSize: "0.6rem",
          letterSpacing: "0.1em", color: "var(--muted)",
        }}>
          {experiments.length} total · {experiments.filter(e => e.status === "available").length} available
        </span>
      </div>

      {/* Grid */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        gap: "0",
        borderLeft: "1px solid var(--border)",
      }}>
        {experiments.map(exp => (
          <div key={exp.slug} style={{ borderRight: "1px solid var(--border)", padding: "0 1.2rem" }}>
            <ExperimentCard exp={exp} />
          </div>
        ))}
      </div>

      <Footer />
    </div>
  );
}
