"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { biographies } from "@/app/data/biographies";
import Nav from "@/app/components/Nav";
import Footer from "@/app/components/Footer";

const cards = [
  { top: "5%",  left: "4%",   rotate: "-3deg", img: "/images/tony.jpg"    },
  { top: "4%",  left: "60%",  rotate: "2deg",  img: "/images/walter.jpg"  },
  { top: "48%", left: "70%",  rotate: "-2deg", img: "/images/dwight.jpg"  },
  { top: "64%", left: "32%",  rotate: "3deg",  img: "/images/michael.jpg" },
  { top: "46%", left: "2%",   rotate: "-1deg", img: "/images/tony.jpg"    },
];

/* String start points near each card's pin */
const stringStart = [
  { x: "16%", y: "18%" },
  { x: "76%", y: "16%" },
  { x: "86%", y: "58%" },
  { x: "46%", y: "76%" },
  { x: "12%", y: "58%" },
];

/* Center anchor */
const cx = "50%";
const cy = "40%";

function Pin({ x, y }: { x: string; y: string }) {
  return (
    <g>
      <circle cx={x} cy={y} r="5" fill="#B01C1C" opacity="0.9" />
      <circle cx={x} cy={y} r="2.5" fill="rgba(255,255,255,0.55)" />
    </g>
  );
}

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
        width: "clamp(130px, 14vw, 185px)",
        textDecoration: "none",
        transform: `rotate(${card.rotate}) translateY(${hovered ? "-5px" : "0"})`,
        transition: "transform 0.35s ease, box-shadow 0.35s ease",
        boxShadow: hovered
          ? "0 14px 40px rgba(28,28,26,0.16)"
          : "0 3px 16px rgba(28,28,26,0.09)",
        zIndex: hovered ? 20 : index + 1,
      }}
    >
      {/* Pin */}
      <div style={{
        position: "absolute", top: "-9px", left: "50%",
        transform: "translateX(-50%)",
        width: "13px", height: "13px", borderRadius: "50%",
        backgroundColor: "#B01C1C",
        boxShadow: "0 2px 5px rgba(0,0,0,0.2)",
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
        overflow: "hidden", backgroundColor: "#C8C4BE",
      }}>
        <div style={{
          width: "100%", height: "100%",
          backgroundImage: `url(${card.img})`,
          backgroundSize: "cover",
          backgroundPosition: "center top",
          filter: hovered ? "grayscale(20%)" : "grayscale(100%)",
          opacity: hovered ? 0.92 : 0.65,
          transition: "filter 0.5s ease, opacity 0.5s ease",
        }} />
      </div>

      {/* Label */}
      <div style={{
        backgroundColor: "var(--white)",
        padding: "0.55rem 0.8rem 0.7rem",
        borderTop: "1px solid var(--border)",
      }}>
        <p style={{
          fontFamily: "var(--mono)", fontSize: "0.38rem",
          letterSpacing: "0.1em", color: "var(--muted)",
          marginBottom: "0.2rem",
        }}>
          {bio.years}
        </p>
        <p style={{
          fontFamily: "var(--serif)", fontSize: "0.78rem",
          fontStyle: "italic", color: "var(--ink)", lineHeight: 1.1,
        }}>
          {bio.name}
        </p>
        <p style={{
          fontFamily: "var(--mono)", fontSize: "0.36rem",
          color: "#B01C1C", letterSpacing: "0.07em", marginTop: "0.15rem",
        }}>
          {bio.descriptor}
        </p>
      </div>
    </Link>
  );
}

function Board() {
  const [visible, setVisible] = useState(false);
  useEffect(() => { const t = setTimeout(() => setVisible(true), 120); return () => clearTimeout(t); }, []);

  return (
    <div className="biographies-board" style={{
      position: "relative",
      width: "100%",
      minHeight: "88vh",
      backgroundColor: "var(--off)",
      backgroundImage: "radial-gradient(rgba(28,28,26,0.04) 1px, transparent 1px)",
      backgroundSize: "28px 28px",
      overflow: "hidden",
    }}>

      {/* Red strings + pins SVG */}
      <svg style={{
        position: "absolute", inset: 0,
        width: "100%", height: "100%",
        pointerEvents: "none", zIndex: 1,
        opacity: visible ? 1 : 0,
        transition: "opacity 1.2s ease 0.5s",
      }} preserveAspectRatio="none">
        {/* Strings */}
        {stringStart.map((s, i) => (
          <line
            key={i}
            x1={s.x} y1={s.y}
            x2={cx}  y2={cy}
            stroke="#B01C1C"
            strokeWidth="0.9"
            strokeOpacity="0.5"
          />
        ))}
        {/* Card pins */}
        {stringStart.map((s, i) => (
          <Pin key={i} x={s.x} y={s.y} />
        ))}
        {/* Center pin */}
        <circle cx={cx} cy={cy} r="6" fill="#1A1918" opacity="0.8" />
        <circle cx={cx} cy={cy} r="2.5" fill="rgba(255,255,255,0.4)" />
      </svg>

      {/* Center card */}
      <div style={{
        position: "absolute",
        top: "26%", left: "50%",
        transform: "translateX(-50%) rotate(-1deg)",
        width: "clamp(155px, 17vw, 210px)",
        backgroundColor: "var(--white)",
        border: "1px solid var(--border)",
        boxShadow: "0 6px 28px rgba(28,28,26,0.10)",
        zIndex: 10,
        opacity: visible ? 1 : 0,
        transition: "opacity 0.8s ease 0.2s",
      }}>
        {/* Center pin */}
        <div style={{
          position: "absolute", top: "-9px", left: "50%",
          transform: "translateX(-50%)",
          width: "14px", height: "14px", borderRadius: "50%",
          backgroundColor: "#1A1918",
          boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
          zIndex: 2,
        }}>
          <div style={{
            position: "absolute", top: "50%", left: "50%",
            transform: "translate(-50%,-50%)",
            width: "5px", height: "5px", borderRadius: "50%",
            backgroundColor: "rgba(255,255,255,0.35)",
          }} />
        </div>
        <div style={{ padding: "1.2rem 1rem 1.4rem" }}>
          <p style={{
            fontFamily: "var(--mono)", fontSize: "0.4rem",
            letterSpacing: "0.18em", color: "#B01C1C",
            marginBottom: "0.9rem", textTransform: "uppercase",
          }}>
            thought laboratory
          </p>
          <p style={{
            fontFamily: "var(--serif)", fontSize: "0.95rem",
            fontStyle: "italic", color: "var(--ink)",
            lineHeight: 1.25, marginBottom: "0.8rem",
          }}>
            The thinkers behind the experiments
          </p>
          <div style={{ height: "1px", backgroundColor: "var(--border)", marginBottom: "0.8rem" }} />
          {biographies.map(b => (
            <p key={b.slug} style={{
              fontFamily: "var(--mono)", fontSize: "0.38rem",
              letterSpacing: "0.05em", color: "var(--muted)",
              lineHeight: 2,
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
          transition: `opacity 0.7s ease ${0.3 + i * 0.1}s`,
        }}>
          <BoardCard bio={bio} card={cards[i]} index={i} />
        </div>
      ))}

      {/* Corner watermark */}
      <div style={{
        position: "absolute", bottom: "1.5rem", right: "2rem",
        fontFamily: "var(--mono)", fontSize: "0.42rem",
        letterSpacing: "0.18em", color: "rgba(28,28,26,0.15)",
      }}>
        biographies · thought laboratory
      </div>
    </div>
  );
}

export default function BiographiesPage() {
  return (
    <div style={{ backgroundColor: "var(--white)", minHeight: "100vh" }}>
      <Nav />
      <div style={{ paddingTop: "3rem" }}>

        {/* Header */}
        <div className="bios-header" style={{
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
          <p style={{
            fontFamily: "var(--serif)", fontSize: "0.85rem",
            fontStyle: "italic", color: "var(--muted)",
            maxWidth: "26ch", textAlign: "right", lineHeight: 1.7,
          }}>
            Five philosophers whose thought experiments changed how we reason.
          </p>
        </div>

        {/* Board — constellation layout, desktop only. Mobile relies on the list below. */}
        <Board />

        {/* List */}
        <div style={{ borderTop: "1px solid var(--border)", backgroundColor: "var(--white)" }}>
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
              <span style={{ fontFamily: "var(--mono)", fontSize: "0.5rem", letterSpacing: "0.1em", color: "#B01C1C" }}>
                {String(i + 1).padStart(2, "0")}
              </span>
              <div>
                <p style={{ fontFamily: "var(--serif)", fontSize: "0.95rem", fontStyle: "italic", color: "var(--ink)", marginBottom: "0.15rem" }}>
                  {bio.name}
                </p>
                <p style={{ fontFamily: "var(--mono)", fontSize: "0.45rem", letterSpacing: "0.08em", color: "var(--muted)" }}>
                  {bio.descriptor} · {bio.years}
                </p>
              </div>
              <span style={{ fontFamily: "var(--mono)", fontSize: "0.45rem", letterSpacing: "0.1em", color: "var(--muted)" }}>
                (read →)
              </span>
            </Link>
          ))}
        </div>

      </div>
      <Footer />
      <style jsx global>{`
        @media (max-width: 700px) {
          .biographies-board { display: none !important; }
          .bios-header { flex-direction: column !important; align-items: flex-start !important; gap: 1.2rem; padding: 2.5rem 1.4rem 2rem !important; }
          .bios-header p { text-align: left !important; max-width: none !important; }
        }
      `}</style>
    </div>
  );
}
