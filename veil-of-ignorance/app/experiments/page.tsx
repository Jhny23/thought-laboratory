"use client";
import { useState } from "react";
import Link from "next/link";
import { experiments } from "@/app/data/experiments";
import Nav from "@/app/components/Nav";
import Footer from "@/app/components/Footer";

/* One background image per experiment — add more as you build them */
const cardImages: Record<string, string> = {
  "battleground-god":          "/images/angel.jpg",
  "philosophical-health-test": "/images/angel.jpg",
  "experience-machine":        "/images/figure.jpg",
  "moral-luck":                "/images/temple.png",
  "the-absurd":                "/images/angel.jpg",
  "determinism-court":         "/images/figure.jpg",
  "repugnant-conclusion":      "/images/temple.png",
};

function ExperimentCard({ exp, index }: { exp: typeof experiments[0]; index: number }) {
  const [hovered, setHovered] = useState(false);
  const available = exp.status === "available";
  const Wrapper = available ? Link : "div";
  const image = cardImages[exp.slug];

  return (
    <Wrapper
      {...(available ? { href: `/experiments/${exp.slug}` } : {}) as any}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "block",
        textDecoration: "none",
        cursor: available ? "pointer" : "default",
      }}
    >
      <div style={{
        position: "relative",
        aspectRatio: "2 / 3",
        overflow: "hidden",
        backgroundColor: "#E8E4DE",
        boxShadow: hovered
          ? "0 16px 48px rgba(28,28,26,0.14)"
          : "0 2px 16px rgba(28,28,26,0.06)",
        transform: hovered ? "translateY(-6px)" : "translateY(0)",
        transition: "box-shadow 0.5s ease, transform 0.5s ease",
      }}>

        {/* Background image */}
        {image && (
          <div style={{
            position: "absolute", inset: 0,
            backgroundImage: `url(${image})`,
            backgroundSize: "cover",
            backgroundPosition: "center top",
            opacity: hovered ? 1 : 0.88,
            transition: "opacity 0.6s ease",
          }} />
        )}

        {/* Warm tinted overlay — fades on hover to reveal image more */}
        <div style={{
          position: "absolute", inset: 0,
          backgroundColor: exp.hue,
          opacity: hovered ? 0.08 : 0.18,
          transition: "opacity 0.6s ease",
        }} />

        {/* Index — top left */}
        <div style={{
          position: "absolute", top: "1.2rem", left: "1.4rem",
          fontFamily: "var(--mono)", fontSize: "0.48rem",
          letterSpacing: "0.15em", color: "rgba(28,28,26,0.4)",
        }}>
          {String(index + 1).padStart(2, "0")}
        </div>

        {/* Status — top right */}
        {!available && (
          <div style={{
            position: "absolute", top: "1.2rem", right: "1.4rem",
            fontFamily: "var(--mono)", fontSize: "0.44rem",
            letterSpacing: "0.12em", color: "rgba(28,28,26,0.4)",
          }}>
            soon
          </div>
        )}

        {/* Text — bottom of card, over image */}
        <div style={{
          position: "absolute", bottom: 0, left: 0, right: 0,
          padding: "2rem 1.4rem 1.6rem",
          background: "linear-gradient(to top, rgba(245,242,236,0.95) 60%, transparent 100%)",
        }}>
          <p style={{
            fontFamily: "var(--mono)", fontSize: "0.48rem",
            letterSpacing: "0.12em", color: "var(--muted)",
            marginBottom: "0.5rem",
          }}>
            {exp.thinker}
          </p>
          <h3 style={{
            fontFamily: "var(--serif)",
            fontSize: "clamp(1.1rem, 2vw, 1.5rem)",
            fontWeight: 400, fontStyle: "italic",
            lineHeight: 1.1, color: "var(--ink)",
            marginBottom: "0.4rem",
          }}>
            {exp.name}
          </h3>
          <p style={{
            fontFamily: "var(--serif)", fontSize: "0.75rem",
            fontStyle: "italic", color: "var(--muted)",
            lineHeight: 1.5,
          }}>
            {exp.domain}
          </p>
        </div>
      </div>
    </Wrapper>
  );
}

export default function ExperimentsPage() {
  return (
    <div style={{ backgroundColor: "var(--off)", minHeight: "100vh" }}>
      <Nav />
      <div style={{ paddingTop: "3rem" }}>

        <div className="experiments-header" style={{
          padding: "4rem 2.4rem 3rem",
          borderBottom: "1px solid var(--border)",
          backgroundColor: "var(--white)",
          display: "flex", justifyContent: "space-between", alignItems: "flex-end",
        }}>
          <div>
            <p style={{ fontFamily: "var(--mono)", fontSize: "0.52rem", letterSpacing: "0.2em", color: "var(--muted)", marginBottom: "0.8rem" }}>
              thought laboratory
            </p>
            <h1 style={{
              fontFamily: "var(--serif)", fontSize: "clamp(1.8rem, 4vw, 3rem)",
              fontWeight: 400, fontStyle: "italic", lineHeight: 1.05, color: "var(--ink)",
            }}>
              All Experiments
            </h1>
          </div>
          <span style={{ fontFamily: "var(--mono)", fontSize: "0.55rem", letterSpacing: "0.1em", color: "var(--muted)" }}>
            {experiments.length} total · {experiments.filter(e => e.status === "available").length} available
          </span>
        </div>

        <div className="experiments-grid" style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "1.5rem",
          padding: "3rem 2.4rem 6rem",
          alignItems: "start",
        }}>
          {experiments.map((exp, i) => (
            <ExperimentCard key={exp.slug} exp={exp} index={i} />
          ))}
        </div>

      </div>
      <Footer />
      <style jsx global>{`
        @media (max-width: 900px) {
          .experiments-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 580px) {
          .experiments-grid { grid-template-columns: 1fr !important; padding: 2rem 1.4rem 4rem !important; }
          .experiments-header { flex-direction: column !important; align-items: flex-start !important; gap: 1rem; padding: 3rem 1.4rem 2rem !important; }
        }
      `}</style>
    </div>
  );
}
