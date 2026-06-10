"use client";
import { useState } from "react";
import Link from "next/link";
import { biographies } from "@/app/data/biographies";
import Nav from "@/app/components/Nav";
import Footer from "@/app/components/Footer";

function BiographyRow({ bio, index }: { bio: typeof biographies[0]; index: number }) {
  const [hovered, setHovered] = useState(false);

  return (
    <Link
      href={`/biographies/${bio.slug}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        borderBottom: "1px solid var(--border)",
        backgroundColor: hovered ? "#F5F2EC" : "var(--white)",
        transition: "background-color 0.4s ease",
        textDecoration: "none",
      }}
    >
      {/* Left — portrait */}
      <div style={{
        borderRight: "1px solid var(--border)",
        aspectRatio: "16 / 9",
        overflow: "hidden",
        position: "relative",
        backgroundColor: "#DCCFC2",
      }}>
        <div style={{
          position: "absolute", inset: 0,
          backgroundImage: `url(${bio.portrait})`,
          backgroundSize: "cover",
          backgroundPosition: "center top",
          filter: hovered ? "none" : "grayscale(100%)",
          opacity: hovered ? 0.9 : 0.6,
          transition: "filter 0.7s ease, opacity 0.7s ease",
        }} />
        <span style={{
          position: "absolute", bottom: "1rem", left: "1.2rem",
          fontFamily: "var(--mono)", fontSize: "0.48rem",
          letterSpacing: "0.15em",
          color: "rgba(250,250,248,0.5)",
        }}>
          ({String(index + 1).padStart(2, "0")})
        </span>
      </div>

      {/* Right — text */}
      <div style={{ padding: "2.5rem 2rem" }}>
        <p style={{
          fontFamily: "var(--mono)", fontSize: "0.52rem",
          letterSpacing: "0.1em", color: "var(--muted)",
          marginBottom: "0.6rem",
        }}>
          {bio.descriptor}
        </p>

        <h2 style={{
          fontFamily: "var(--serif)",
          fontSize: "clamp(1.4rem, 2.5vw, 2rem)",
          fontWeight: 400, fontStyle: "italic",
          lineHeight: 1.1, color: "var(--ink)",
          marginBottom: "0.4rem",
        }}>
          {bio.name}
        </h2>

        <p style={{
          fontFamily: "var(--mono)", fontSize: "0.5rem",
          letterSpacing: "0.08em", color: "var(--muted)",
          marginBottom: "2rem",
        }}>
          {bio.years} · {bio.location}
        </p>

        <p style={{
          fontFamily: "var(--serif)", fontSize: "0.88rem",
          lineHeight: 1.8, color: "var(--muted)",
          maxWidth: "38ch", marginBottom: "2rem",
        }}>
          {bio.sections[0].answer.slice(0, 160)}…
        </p>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
          <span style={{
            fontFamily: "var(--mono)", fontSize: "0.5rem",
            letterSpacing: "0.1em",
            color: hovered ? "var(--ink)" : "var(--muted)",
            borderBottom: `1px solid ${hovered ? "var(--ink)" : "transparent"}`,
            paddingBottom: "1px",
            transition: "all 0.2s",
          }}>
            (read biography)
          </span>
          <span style={{
            fontFamily: "var(--mono)", fontSize: "0.48rem",
            letterSpacing: "0.08em", color: "var(--muted)",
          }}>
            {bio.experiment}
          </span>
        </div>
      </div>
    </Link>
  );
}

export default function BiographiesPage() {
  return (
    <div style={{ backgroundColor: "var(--white)", minHeight: "100vh" }}>
      <Nav />
      <div style={{ paddingTop: "3rem" }}>

        <div style={{
          padding: "5rem 1.8rem 4rem",
          maxWidth: "700px",
          borderBottom: "1px solid var(--border)",
        }}>
          <p style={{
            fontFamily: "var(--mono)", fontSize: "0.52rem",
            letterSpacing: "0.2em", color: "var(--muted)",
            marginBottom: "1.4rem",
          }}>
            biographies
          </p>
          <h1 style={{
            fontFamily: "var(--serif)",
            fontSize: "clamp(2rem, 5vw, 3.5rem)",
            fontWeight: 400, fontStyle: "italic",
            lineHeight: 1.05, color: "var(--ink)",
            marginBottom: "1.6rem",
          }}>
            The thinkers<br />behind the experiments
          </h1>
          <p style={{
            fontFamily: "var(--serif)", fontSize: "0.95rem",
            lineHeight: 1.9, color: "var(--muted)",
            maxWidth: "52ch",
          }}>
            Five philosophers whose thought experiments changed how we reason about justice, consciousness, responsibility, meaning, and identity.
          </p>
        </div>

        <div>
          {biographies.map((bio, i) => (
            <BiographyRow key={bio.slug} bio={bio} index={i} />
          ))}
        </div>

      </div>
      <Footer />
    </div>
  );
}