"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { biographies } from "@/app/data/biographies";
import Nav from "@/app/components/Nav";
import Footer from "@/app/components/Footer";

/* Each card: position, rotation, red string endpoints */
const cards = [
  { top: "4%",  left: "5%",   rotate: "-3deg", img: "/images/tony.jpg"    },
  { top: "3%",  left: "58%",  rotate: "2deg",  img: "/images/walter.jpg"  },
  { top: "44%", left: "72%",  rotate: "-2deg", img: "/images/dwight.jpg"  },
  { top: "62%", left: "30%",  rotate: "3deg",  img: "/images/michael.jpg" },
  { top: "42%", left: "-2%",  rotate: "-1deg", img: "/images/tony.jpg"    },
];

/* Red string paths — from each card toward center cluster */
const strings = [
  "M 18% 16%  Q 35% 28% 48% 38%",
  "M 74% 14%  Q 62% 26% 52% 38%",
  "M 84% 54%  Q 70% 48% 54% 42%",
  "M 44% 74%  Q 46% 58% 49% 44%",
  "M 10% 54%  Q 28% 48% 46% 42%",
];

function Pin({ x, y }: { x: string; y: string }) {
  return (
    <g>
      <circle cx={x} cy={y} r="6" fill="#CC1F1F" />
      <circle cx={x} cy={y} r="3" fill="rgba(255,255,255,0.5)" />
    </g>
  );
}

const pinPositions = [
  { x: "18%", y: "16%" },
  { x: "74%", y: "14%" },
  { x: "84%", y: "54%" },
  { x: "44%", y: "74%" },
  { x: "10%", y: "54%" },
];

function BoardCard({ bio, card, index }: {
  bio: typeof biographies[0];
  card: typeof cards[0];
  index: number;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <Link
      href={`/biographies/${bio.slug}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: "absolute",
        top: card.top, left: card.left,
        width: "clamp(130px, 15vw, 190px)",
        textDecoration: "none",
        transform: `rotate(${card.rotate}) translateY(${hovered ? "-5px" : "0"})`,
        transition: "transform 0.3s ease, box-shadow 0.3s ease",
        boxShadow: hovered
          ? "0 12px 36px rgba(0,0,0,0.28)"
          : "0 4px 18px rgba(0,0,0,0.18)",
        zIndex: hovered ? 20 : index + 1,
      }}
    >
      {/* Pin dot at top center */}
      <div style={{
        position: "absolute", top: "-10px", left: "50%",
        transform: "translateX(-50%)",
        width: "14px", height: "14px", borderRadius: "50%",
        backgroundColor: "#CC1F1F",
        boxShadow: "0 2px 6px rgba(0,0,0,0.3)",
        zIndex: 2,
      }}>
        <div style={{
          position: "absolute", top: "50%", left: "50%",
          transform: "translate(-50%,-50%)",
          width: "5px", height: "5px", borderRadius: "50%",
          backgroundColor: "rgba(255,255,255,0.5)",
        }} />
      </div>

      {/* Photo */}
      <div style={{
        width: "100%", aspectRatio: "1",
        overflow: "hidden",
        backgroundColor: "#999",
      }}>
        <div style={{
          width: "100%", height: "100%",
          backgroundImage: `url(${card.img})`,
          backgroundSize: "cover",
          backgroundPosition: "center top",
          filter: hovered ? "grayscale(30%)" : "grayscale(80%)",
          opacity: hovered ? 1 : 0.8,
          transition: "filter 0.4s, opacity 0.4s",
        }} />
      </div>

      {/* Polaroid label */}
      <div style={{
        backgroundColor: "#F9F6F0",
        padding: "0.6rem 0.8rem 0.8rem",
        borderTop: "none",
      }}>
        <p style={{
          fontFamily: "var(--mono)", fontSize: "0.4rem",
          letterSpacing: "0.1em", color: "#888",
          marginBottom: "0.2rem", textTransform: "uppercase",
        }}>
          {bio.years}
        </p>
        <p style={{
          fontFamily: "var(--serif)", fontSize: "0.8rem",
          fontStyle: "italic", color: "#1A1918",
          lineHeight: 1.1,
        }}>
          {bio.name}
        </p>
        <p style={{
          fontFamily: "var(--mono)", fontSize: "0.38rem",
          color: "#CC1F1F", letterSpacing: "0.08em",
          marginTop: "0.2rem",
        }}>
          {bio.descriptor}
        </p>
      </div>
    </Link>
  );
}

function InvestigativeBoard() {
  const [visible, setVisible] = useState(false);
  useEffect(() => { const t = setTimeout(() => setVisible(true), 100); return () => clearTimeout(t); }, []);

  return (
    <div style={{
      position: "relative",
      width: "100%",
      minHeight: "88vh",
      backgroundColor: "#2A2420",
      backgroundImage: `
        repeating-linear-gradient(0deg, transparent, transparent 39px, rgba(255,255,255,0.03) 40px),
        repeating-linear-gradient(90deg, transparent, transparent 39px, rgba(255,255,255,0.03) 40px)
      `,
      overflow: "hidden",
    }}>

      {/* Red string SVG */}
      <svg style={{
        position: "absolute", inset: 0,
        width: "100%", height: "100%",
        pointerEvents: "none", zIndex: 0,
        opacity: visible ? 1 : 0,
        transition: "opacity 1s ease 0.5s",
      }} preserveAspectRatio="none">
        {strings.map((d, i) => (
          <path
            key={i}
            d={d}
            fill="none"
            stroke="#CC1F1F"
            strokeWidth="1.2"
            strokeOpacity="0.65"
          />
        ))}
        {/* Pin marks at card positions */}
        {pinPositions.map((p, i) => (
          <Pin key={i} x={p.x} y={p.y} />
        ))}
      </svg>

      {/* Center evidence card */}
      <div style={{
        position: "absolute",
        top: "32%", left: "50%",
        transform: "translateX(-50%) rotate(-1deg)",
        width: "clamp(160px, 18vw, 220px)",
        backgroundColor: "#F9F6F0",
        boxShadow: "0 8px 32px rgba(0,0,0,0.4)",
        zIndex: 10,
        opacity: visible ? 1 : 0,
        transition: "opacity 0.6s ease 0.2s",
      }}>
        {/* Red pin */}
        <div style={{
          position: "absolute", top: "-10px", left: "50%",
          transform: "translateX(-50%)",
          width: "16px", height: "16px", borderRadius: "50%",
          backgroundColor: "#CC1F1F",
          boxShadow: "0 2px 8px rgba(0,0,0,0.4)",
          zIndex: 2,
        }}>
          <div style={{
            position: "absolute", top: "50%", left: "50%",
            transform: "translate(-50%,-50%)",
            width: "6px", height: "6px", borderRadius: "50%",
            backgroundColor: "rgba(255,255,255,0.5)",
          }} />
        </div>
        <div style={{ padding: "1.2rem 1rem 1.4rem" }}>
          <p style={{
            fontFamily: "var(--mono)", fontSize: "0.4rem",
            letterSpacing: "0.2em", color: "#CC1F1F",
            marginBottom: "0.8rem", textTransform: "uppercase",
          }}>
            classified · thought laboratory
          </p>
          <p style={{
            fontFamily: "var(--serif)", fontSize: "1rem",
            fontStyle: "italic", color: "#1A1918",
            lineHeight: 1.2, marginBottom: "0.6rem",
          }}>
            The thinkers behind the experiments
          </p>
          <div style={{ height: "1px", backgroundColor: "#E0DDD8", margin: "0.8rem 0" }} />
          {biographies.map(b => (
            <p key={b.slug} style={{
              fontFamily: "var(--mono)", fontSize: "0.38rem",
              letterSpacing: "0.06em", color: "#666",
              lineHeight: 1.9,
            }}>
              — {b.name}
            </p>
          ))}
        </div>
      </div>

      {/* Philosopher cards */}
      {biographies.map((bio, i) => (
        <div key={bio.slug} style={{
          opacity: visible ? 1 : 0,
          transition: `opacity 0.7s ease ${0.25 + i * 0.1}s`,
        }}>
          <BoardCard bio={bio} card={cards[i]} index={i} />
        </div>
      ))}

      {/* Corner label */}
      <div style={{
        position: "absolute", bottom: "1.5rem", right: "2rem",
        fontFamily: "var(--mono)", fontSize: "0.45rem",
        letterSpacing: "0.2em", color: "rgba(255,255,255,0.15)",
        textTransform: "uppercase",
      }}>
        thought laboratory · biographies
      </div>
    </div>
  );
}

export default function BiographiesPage() {
  return (
    <div style={{ backgroundColor: "#2A2420", minHeight: "100vh" }}>
      <Nav />
      <div style={{ paddingTop: "3rem" }}>

        {/* Header */}
        <div style={{
          padding: "2.5rem 2.4rem",
          borderBottom: "1px solid rgba(255,255,255,0.08)",
          display: "flex", justifyContent: "space-between", alignItems: "center",
        }}>
          <div>
            <p style={{ fontFamily: "var(--mono)", fontSize: "0.5rem", letterSpacing: "0.2em", color: "rgba(255,255,255,0.3)", marginBottom: "0.5rem" }}>
              biographies
            </p>
            <h1 style={{
              fontFamily: "var(--serif)", fontSize: "clamp(1.6rem, 3.5vw, 2.5rem)",
              fontWeight: 400, fontStyle: "italic", color: "#F2EDE4", lineHeight: 1.05,
            }}>
              The thinkers behind<br />the experiments
            </h1>
          </div>
          <div style={{ textAlign: "right" }}>
            <p style={{ fontFamily: "var(--mono)", fontSize: "0.45rem", letterSpacing: "0.15em", color: "#CC1F1F", marginBottom: "0.3rem" }}>
              ● active investigation
            </p>
            <p style={{ fontFamily: "var(--mono)", fontSize: "0.45rem", letterSpacing: "0.1em", color: "rgba(255,255,255,0.2)" }}>
              {biographies.length} subjects · thought laboratory
            </p>
          </div>
        </div>

        {/* Board */}
        <InvestigativeBoard />

        {/* List */}
        <div style={{ backgroundColor: "#221E1B", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
          {biographies.map((bio, i) => (
            <Link key={bio.slug} href={`/biographies/${bio.slug}`} style={{
              display: "grid", gridTemplateColumns: "40px 1fr auto",
              padding: "1rem 2.4rem",
              borderBottom: "1px solid rgba(255,255,255,0.05)",
              alignItems: "center", gap: "1.2rem",
              textDecoration: "none",
              transition: "background-color 0.2s",
            }}
            onMouseEnter={e => e.currentTarget.style.backgroundColor = "rgba(204,31,31,0.06)"}
            onMouseLeave={e => e.currentTarget.style.backgroundColor = "transparent"}
            >
              <span style={{ fontFamily: "var(--mono)", fontSize: "0.48rem", letterSpacing: "0.1em", color: "#CC1F1F" }}>
                {String(i + 1).padStart(2, "0")}
              </span>
              <div>
                <p style={{ fontFamily: "var(--serif)", fontSize: "0.95rem", fontStyle: "italic", color: "#F2EDE4", marginBottom: "0.15rem" }}>
                  {bio.name}
                </p>
                <p style={{ fontFamily: "var(--mono)", fontSize: "0.45rem", letterSpacing: "0.08em", color: "rgba(255,255,255,0.3)" }}>
                  {bio.descriptor} · {bio.years}
                </p>
              </div>
              <span style={{ fontFamily: "var(--mono)", fontSize: "0.45rem", letterSpacing: "0.1em", color: "rgba(255,255,255,0.25)" }}>
                (read →)
              </span>
            </Link>
          ))}
        </div>

      </div>
      <Footer />
    </div>
  );
}
