"use client";
import { useState } from "react";
import Link from "next/link";
import { experiments } from "@/app/data/experiments";
import Nav from "@/app/components/Nav";
import Footer from "@/app/components/Footer";

function ExperimentMark({ slug }: { slug: string }) {
  switch (slug) {
    case "veil-of-ignorance":
      return <circle cx="100" cy="100" r="70" stroke="currentColor" strokeWidth="1.5" fill="none" />;
    case "experience-machine":
      return <><rect x="40" y="40" width="120" height="120" stroke="currentColor" strokeWidth="1.5" fill="none" /><circle cx="100" cy="100" r="30" stroke="currentColor" strokeWidth="1.5" fill="none" /></>;
    case "moral-luck":
      return <><line x1="30" y1="100" x2="170" y2="100" stroke="currentColor" strokeWidth="1.5" /><line x1="100" y1="30" x2="100" y2="170" stroke="currentColor" strokeWidth="1.5" /></>;
    case "the-absurd":
      return <path d="M100,30 L170,170 L30,170 Z" stroke="currentColor" strokeWidth="1.5" fill="none" />;
    case "determinism-court":
      return <>{[0,1,2,3,4].map(i => <circle key={i} cx="100" cy="100" r={20+i*16} stroke="currentColor" strokeWidth="0.8" fill="none" />)}</>;
    case "repugnant-conclusion":
      return <>{[0,1,2,3,4,5,6].map(i => <rect key={i} x={30+i*20} y={170-(i+1)*18} width="14" height={(i+1)*18} stroke="currentColor" strokeWidth="1" fill="none" />)}</>;
    default:
      return <circle cx="100" cy="100" r="60" stroke="currentColor" strokeWidth="1.5" fill="none" />;
  }
}

function ExperimentCard({ exp }: { exp: typeof experiments[0] }) {
  const [hovered, setHovered] = useState(false);
  const available = exp.status === "available";
  const Wrapper = available ? Link : "div";

  return (
    <Wrapper
      {...(available ? { href: `/experiments/${exp.slug}` } : {}) as any}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ display: "block", cursor: available ? "pointer" : "default" }}
    >
      <div style={{
        position: "relative", aspectRatio: "4 / 3",
        overflow: "hidden", borderBottom: "1px solid var(--border)",
      }}>
        <div style={{
          position: "absolute", inset: 0,
          backgroundColor: "#C8C4BE",
          opacity: hovered ? 0 : 1,
          transition: "opacity 0.5s ease",
          display: "flex", alignItems: "center", justifyContent: "center",
          color: "rgba(26,25,24,0.2)",
        }}>
          <svg viewBox="0 0 200 200" style={{ width: "50%" }}><ExperimentMark slug={exp.slug} /></svg>
        </div>
        <div style={{
          position: "absolute", inset: 0,
          backgroundColor: exp.hue,
          opacity: hovered ? 1 : 0,
          transition: "opacity 0.5s ease",
          display: "flex", alignItems: "center", justifyContent: "center",
          color: "rgba(26,25,24,0.3)",
        }}>
          <svg viewBox="0 0 200 200" style={{ width: "50%" }}><ExperimentMark slug={exp.slug} /></svg>
        </div>
        {!available && (
          <div style={{
            position: "absolute", top: "0.8rem", right: "0.8rem",
            fontFamily: "var(--mono)", fontSize: "0.45rem",
            letterSpacing: "0.12em", color: "var(--muted)",
            backgroundColor: "var(--white)", padding: "0.2rem 0.5rem",
          }}>soon</div>
        )}
      </div>
      <div style={{ padding: "0.9rem 0 1.2rem" }}>
        <p style={{ fontFamily: "var(--mono)", fontSize: "0.55rem", letterSpacing: "0.06em", color: "var(--muted)", marginBottom: "0.2rem" }}>
          {exp.thinker}
        </p>
        <p style={{ fontFamily: "var(--serif)", fontSize: "1rem", fontStyle: "italic", color: "var(--ink)", lineHeight: 1.2, marginBottom: "0.2rem" }}>
          {exp.name}
        </p>
        <p style={{ fontFamily: "var(--mono)", fontSize: "0.5rem", letterSpacing: "0.05em", color: "var(--muted)" }}>
          {exp.year}
        </p>
      </div>
    </Wrapper>
  );
}

export default function ExperimentsPage() {
  return (
    <div style={{ backgroundColor: "var(--white)", minHeight: "100vh" }}>
      <Nav />
      <div style={{ paddingTop: "3rem" }}>
        <div style={{
          display: "flex", justifyContent: "space-between", alignItems: "center",
          padding: "0.9rem 1.8rem",
          borderBottom: "1px solid var(--border)",
        }}>
          <span style={{ fontFamily: "var(--mono)", fontSize: "0.6rem", letterSpacing: "0.1em", color: "var(--muted)" }}>
            all experiments
          </span>
          <span style={{ fontFamily: "var(--mono)", fontSize: "0.6rem", letterSpacing: "0.1em", color: "var(--muted)" }}>
            {experiments.length} total · {experiments.filter(e => e.status === "available").length} available
          </span>
        </div>
        <div style={{
          display: "grid", gridTemplateColumns: "repeat(3, 1fr)",
          borderLeft: "1px solid var(--border)",
        }}>
          {experiments.map(exp => (
            <div key={exp.slug} style={{ borderRight: "1px solid var(--border)", borderBottom: "1px solid var(--border)", padding: "0 1.2rem" }}>
              <ExperimentCard exp={exp} />
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}
