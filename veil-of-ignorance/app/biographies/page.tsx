"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { biographies } from "@/app/data/biographies";
import Nav from "@/app/components/Nav";
import Footer from "@/app/components/Footer";

/* Polaroid card positions radiating from center */
const positions = [
  { top: "2%",  left: "38%",  rotate: "-2deg"  },  // top center
  { top: "18%", left: "68%",  rotate: "3deg"   },  // right top
  { top: "52%", left: "72%",  rotate: "-4deg"  },  // right bottom
  { top: "62%", left: "28%",  rotate: "2deg"   },  // left bottom
  { top: "18%", left: "4%",   rotate: "-3deg"  },  // left top
];

/* SVG line endpoints from center (50%, 42%) to each card center */
const lineTargets = [
  { x2: "50%", y2: "10%"  },
  { x2: "78%", y2: "26%"  },
  { x2: "82%", y2: "60%"  },
  { x2: "38%", y2: "72%"  },
  { x2: "14%", y2: "26%"  },
];

function PolaroidCard({ bio, index, pos }: {
  bio: typeof biographies[0];
  index: number;
  pos: typeof positions[0];
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <Link
      href={`/biographies/${bio.slug}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: "absolute",
        top: pos.top, left: pos.left,
        width: "clamp(140px, 16vw, 200px)",
        textDecoration: "none",
        transform: `rotate(${pos.rotate}) translateY(${hovered ? "-6px" : "0"})`,
        transition: "transform 0.4s ease, box-shadow 0.4s ease",
        boxShadow: hovered
          ? "0 16px 40px rgba(28,28,26,0.18)"
          : "0 4px 20px rgba(28,28,26,0.10)",
        zIndex: hovered ? 10 : 1,
      }}
    >
      {/* Photo area */}
      <div style={{
        width: "100%",
        aspectRatio: "1",
        overflow: "hidden",
        backgroundColor: "#C8C4BE",
      }}>
        <div style={{
          width: "100%", height: "100%",
          backgroundImage: `url(${bio.portrait})`,
          backgroundSize: "cover",
          backgroundPosition: "center top",
          filter: hovered ? "grayscale(0%)" : "grayscale(100%)",
          opacity: hovered ? 0.9 : 0.65,
          transition: "filter 0.5s ease, opacity 0.5s ease",
        }} />
      </div>

      {/* Polaroid bottom label */}
      <div style={{
        backgroundColor: "var(--white)",
        padding: "0.7rem 0.8rem 0.8rem",
      }}>
        <p style={{
          fontFamily: "var(--mono)", fontSize: "0.44rem",
          letterSpacing: "0.1em", color: "var(--muted)",
          marginBottom: "0.2rem",
        }}>
          {bio.years}
        </p>
        <p style={{
          fontFamily: "var(--serif)", fontSize: "0.85rem",
          fontStyle: "italic", fontWeight: 400,
          color: "var(--ink)", lineHeight: 1.1,
        }}>
          {bio.name}
        </p>
      </div>
    </Link>
  );
}

function ConstellationMap() {
  const [visible, setVisible] = useState(false);
  useEffect(() => { const t = setTimeout(() => setVisible(true), 100); return () => clearTimeout(t); }, []);

  return (
    <div style={{
      position: "relative",
      width: "100%",
      minHeight: "90vh",
      overflow: "hidden",
    }}>
      {/* SVG lines radiating from center */}
      <svg style={{
        position: "absolute", inset: 0,
        width: "100%", height: "100%",
        pointerEvents: "none", zIndex: 0,
        opacity: visible ? 1 : 0,
        transition: "opacity 1.2s ease 0.4s",
      }}>
        {lineTargets.map((t, i) => (
          <line
            key={i}
            x1="50%" y1="42%"
            x2={t.x2} y2={t.y2}
            stroke="rgba(28,28,26,0.12)"
            strokeWidth="0.8"
            strokeDasharray="4 4"
          />
        ))}
        {/* Gold accent dots at junctions */}
        {lineTargets.map((t, i) => (
          <circle key={`dot-${i}`} cx={t.x2} cy={t.y2} r="3" fill="#B8922A" opacity="0.6" />
        ))}
        {/* Center dot */}
        <circle cx="50%" cy="42%" r="6" fill="var(--ink)" />
      </svg>

      {/* Center card — Tony Soprano */}
      <div style={{
        position: "absolute",
        top: "28%", left: "50%",
        transform: "translateX(-50%)",
        width: "clamp(160px, 18vw, 220px)",
        zIndex: 2,
        boxShadow: "0 8px 32px rgba(28,28,26,0.14)",
        opacity: visible ? 1 : 0,
        transition: "opacity 0.8s ease 0.2s",
      }}>
        {/* Photo */}
        <div style={{
          width: "100%", aspectRatio: "3 / 4",
          overflow: "hidden", backgroundColor: "#C8C4BE",
        }}>
          <div style={{
            width: "100%", height: "100%",
            backgroundImage: "url(/images/tony.jpg)",
            backgroundSize: "cover",
            backgroundPosition: "center top",
            filter: "grayscale(100%)",
            opacity: 0.75,
          }} />
        </div>
        {/* Label */}
        <div style={{ backgroundColor: "var(--white)", padding: "0.8rem 1rem 1rem" }}>
          <p style={{ fontFamily: "var(--mono)", fontSize: "0.44rem", letterSpacing: "0.12em", color: "var(--muted)", marginBottom: "0.3rem" }}>
            the examined life
          </p>
          <p style={{ fontFamily: "var(--serif)", fontSize: "0.95rem", fontStyle: "italic", color: "var(--ink)", lineHeight: 1.1 }}>
            Biographies
          </p>
        </div>
      </div>

      {/* Philosopher cards */}
      {biographies.map((bio, i) => (
        <div key={bio.slug} style={{
          opacity: visible ? 1 : 0,
          transition: `opacity 0.8s ease ${0.3 + i * 0.12}s`,
        }}>
          <PolaroidCard bio={bio} index={i} pos={positions[i]} />
        </div>
      ))}
    </div>
  );
}

export default function BiographiesPage() {
  return (
    <div style={{ backgroundColor: "#EDEAE4", minHeight: "100vh" }}>
      <Nav />
      <div style={{ paddingTop: "3rem" }}>

        {/* Header */}
        <div style={{
          padding: "3.5rem 2.4rem 2.5rem",
          borderBottom: "1px solid var(--border)",
          backgroundColor: "var(--white)",
          display: "flex", justifyContent: "space-between", alignItems: "flex-end",
        }}>
          <div>
            <p style={{ fontFamily: "var(--mono)", fontSize: "0.52rem", letterSpacing: "0.2em", color: "var(--muted)", marginBottom: "0.8rem" }}>
              biographies
            </p>
            <h1 style={{
              fontFamily: "var(--serif)", fontSize: "clamp(1.8rem, 4vw, 3rem)",
              fontWeight: 400, fontStyle: "italic", lineHeight: 1.05, color: "var(--ink)",
            }}>
              The thinkers behind<br />the experiments
            </h1>
          </div>
          <p style={{ fontFamily: "var(--serif)", fontSize: "0.85rem", fontStyle: "italic", color: "var(--muted)", maxWidth: "28ch", textAlign: "right", lineHeight: 1.7 }}>
            Five philosophers whose thought experiments changed how we reason.
          </p>
        </div>

        {/* Constellation */}
        <ConstellationMap />

        {/* List fallback below */}
        <div style={{
          borderTop: "1px solid var(--border)",
          backgroundColor: "var(--white)",
        }}>
          {biographies.map((bio, i) => (
            <Link key={bio.slug} href={`/biographies/${bio.slug}`} style={{
              display: "grid", gridTemplateColumns: "40px 1fr auto",
              padding: "1rem 2.4rem",
              borderBottom: "1px solid var(--border)",
              alignItems: "center", gap: "1.2rem",
              textDecoration: "none",
              transition: "background-color 0.2s",
            }}
            onMouseEnter={e => e.currentTarget.style.backgroundColor = "var(--off)"}
            onMouseLeave={e => e.currentTarget.style.backgroundColor = "transparent"}
            >
              <span style={{ fontFamily: "var(--mono)", fontSize: "0.5rem", letterSpacing: "0.1em", color: "var(--muted)" }}>
                {String(i + 1).padStart(2, "0")}
              </span>
              <div>
                <p style={{ fontFamily: "var(--serif)", fontSize: "1rem", fontStyle: "italic", color: "var(--ink)", marginBottom: "0.1rem" }}>
                  {bio.name}
                </p>
                <p style={{ fontFamily: "var(--mono)", fontSize: "0.48rem", letterSpacing: "0.08em", color: "var(--muted)" }}>
                  {bio.descriptor} · {bio.years}
                </p>
              </div>
              <span style={{ fontFamily: "var(--mono)", fontSize: "0.48rem", letterSpacing: "0.1em", color: "var(--muted)" }}>
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
