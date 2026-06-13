"use client";
import { useState } from "react";
import Link from "next/link";
import { experiments } from "@/app/data/experiments";
import Nav from "@/app/components/Nav";
import Footer from "@/app/components/Footer";

function ExperimentMark({ slug }: { slug: string }) {
  switch (slug) {
    case "philosophical-health-test":
      return (
        <>
          <circle cx="100" cy="100" r="70" stroke="currentColor" strokeWidth="1" fill="none" opacity="0.6" />
          <circle cx="100" cy="100" r="45" stroke="currentColor" strokeWidth="0.8" fill="none" opacity="0.4" />
          <circle cx="100" cy="100" r="20" stroke="currentColor" strokeWidth="0.6" fill="none" opacity="0.3" />
        </>
      );
    case "experience-machine":
      return <><rect x="40" y="40" width="120" height="120" stroke="currentColor" strokeWidth="1" fill="none" opacity="0.5" /><circle cx="100" cy="100" r="30" stroke="currentColor" strokeWidth="0.8" fill="none" opacity="0.4" /></>;
    case "moral-luck":
      return <><line x1="30" y1="100" x2="170" y2="100" stroke="currentColor" strokeWidth="1" opacity="0.5" /><line x1="100" y1="30" x2="100" y2="170" stroke="currentColor" strokeWidth="1" opacity="0.5" /></>;
    case "the-absurd":
      return <path d="M100,30 L170,170 L30,170 Z" stroke="currentColor" strokeWidth="1" fill="none" opacity="0.5" />;
    case "determinism-court":
      return <>{[0,1,2,3,4].map(i => <circle key={i} cx="100" cy="100" r={20+i*16} stroke="currentColor" strokeWidth="0.6" fill="none" opacity={0.5 - i * 0.08} />)}</>;
    case "repugnant-conclusion":
      return <>{[0,1,2,3,4,5,6].map(i => <rect key={i} x={30+i*20} y={170-(i+1)*18} width="14" height={(i+1)*18} stroke="currentColor" strokeWidth="0.8" fill="none" opacity="0.4" />)}</>;
    default:
      return <circle cx="100" cy="100" r="60" stroke="currentColor" strokeWidth="1" fill="none" opacity="0.5" />;
  }
}

function ExperimentCard({ exp, index }: { exp: typeof experiments[0]; index: number }) {
  const [hovered, setHovered] = useState(false);
  const available = exp.status === "available";
  const Wrapper = available ? Link : "div";

  return (
    <Wrapper
      {...(available ? { href: `/experiments/${exp.slug}` } : {}) as any}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "block",
        cursor: available ? "pointer" : "default",
        textDecoration: "none",
      }}
    >
      <div style={{
        backgroundColor: "var(--white)",
        border: "1px solid var(--border)",
        boxShadow: hovered
          ? "0 8px 40px rgba(28,28,26,0.10)"
          : "0 2px 16px rgba(28,28,26,0.05)",
        transition: "box-shadow 0.4s ease, transform 0.4s ease",
        transform: hovered ? "translateY(-4px)" : "translateY(0)",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
        height: "100%",
      }}>

        {/* Image area — ghosted SVG mark fading into white, like ar3na cards */}
        <div style={{
          position: "relative",
          flex: "1",
          minHeight: "260px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: hovered ? exp.hue : "var(--white)",
          transition: "background-color 0.5s ease",
          overflow: "hidden",
        }}>
          {/* Large faded mark — bleeds into background */}
          <svg
            viewBox="0 0 200 200"
            style={{
              width: "75%",
              opacity: hovered ? 0.25 : 0.12,
              transition: "opacity 0.5s ease",
              color: "var(--ink)",
            }}
          >
            <ExperimentMark slug={exp.slug} />
          </svg>

          {/* Status tag */}
          {!available && (
            <div style={{
              position: "absolute", top: "1rem", left: "1rem",
              fontFamily: "var(--mono)", fontSize: "0.44rem",
              letterSpacing: "0.15em", color: "var(--muted)",
            }}>
              soon
            </div>
          )}

          {/* Index number — top right */}
          <div style={{
            position: "absolute", top: "1rem", right: "1rem",
            fontFamily: "var(--mono)", fontSize: "0.44rem",
            letterSpacing: "0.1em", color: "var(--muted)",
          }}>
            {String(index + 1).padStart(2, "0")}
          </div>
        </div>

        {/* Text — bottom of card */}
        <div style={{
          padding: "1.4rem 1.4rem 1.6rem",
          borderTop: "1px solid var(--border)",
        }}>
          <p style={{
            fontFamily: "var(--mono)", fontSize: "0.5rem",
            letterSpacing: "0.1em", color: "var(--muted)",
            marginBottom: "0.5rem",
          }}>
            {exp.thinker}
          </p>
          <h3 style={{
            fontFamily: "var(--serif)",
            fontSize: "clamp(1rem, 1.8vw, 1.3rem)",
            fontWeight: 400, fontStyle: "italic",
            lineHeight: 1.15, color: "var(--ink)",
            marginBottom: "0.4rem",
          }}>
            {exp.name}
          </h3>
          <p style={{
            fontFamily: "var(--serif)", fontSize: "0.78rem",
            color: "var(--muted)", lineHeight: 1.6,
            fontStyle: "italic",
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

        {/* Header */}
        <div style={{
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

        {/* Card grid */}
        <div style={{
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
    </div>
  );
}
