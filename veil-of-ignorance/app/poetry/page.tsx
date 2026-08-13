"use client";
import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Nav from "@/app/components/Nav";
import Footer from "@/app/components/Footer";

/* ─── POEM DATA ───
   Six original concrete poems, each made in the spirit of a specific poet's
   method. None reproduce existing works. ──────────────────────────────── */

type Poem = {
  id: string;
  title: string;
  tribute: string;  // whose method this honours
  method: string;   // what formal technique it uses
  render: () => React.ReactElement;
  // position on gallery wall (% from left, % from top)
  x: number;
  y: number;
  rotate: number;
};

function PoemSilence() {
  /* After Gomringer's "silencio" — absence as meaning,
     white space as the loudest word. */
  const words = ["think", "think", "think", "think", "think", "think",
                 "think", "think",        "",       "think", "think",
                 "think", "think", "think", "think", "think", "think"];
  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "0.6rem 1.2rem" }}>
      {words.map((w, i) => (
        <span key={i} style={{
          fontFamily: "var(--mono)", fontSize: "0.58rem",
          letterSpacing: "0.12em", color: "var(--ink)",
          opacity: w === "" ? 0 : 0.85,
          minWidth: "2.5rem", display: "block",
        }}>{w || "think"}</span>
      ))}
    </div>
  );
}

function PoemFall() {
  /* After Emmett Williams — letters falling, dissolving,
     the word losing itself as it descends. */
  const lines = [
    "consciousness",
    "consciousnes",
    "consciousne",
    "consciousn",
    "conscious",
    "consciou",
    "conscio",
    "consci",
    "consc",
    "cons",
    "con",
    "co",
    "c",
    "",
  ];
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "0.18rem" }}>
      {lines.map((line, i) => (
        <span key={i} style={{
          fontFamily: "var(--mono)", fontSize: "0.56rem",
          letterSpacing: "0.08em", color: "var(--ink)",
          opacity: Math.max(0.08, 1 - i * 0.07),
          display: "block",
        }}>{line || "·"}</span>
      ))}
    </div>
  );
}

function PoemCalligramme() {
  /* After Apollinaire's calligrammes — text arranged as shape.
     Words form the silhouette of an eye. */
  const eyeLines = [
    { text: "w  h  a  t   d  o   y  o  u   s  e  e", indent: 8, size: 0.38 },
    { text: "w h e n  y o u  c l o s e  y o u r  e y e s", indent: 3, size: 0.42 },
    { text: "s e e i n g  i s  b e l i e v i n g  s e e i n g", indent: 0, size: 0.46 },
    { text: "b e l i e v i n g  i s  s e e i n g  b e l i e v", indent: 0, size: 0.5 },
    { text: "·  ·  ·  s e e  ·  ·  ·  s e e  ·  ·  ·", indent: 6, size: 0.52 },
    { text: "s e e i n g  i s  b e l i e v i n g  s e e i n g", indent: 0, size: 0.48 },
    { text: "w h e n  y o u  c l o s e  y o u r  e y e s", indent: 3, size: 0.42 },
    { text: "w  h  a  t   d  o   y  o  u   s  e  e", indent: 8, size: 0.38 },
  ];
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "0.22rem" }}>
      {eyeLines.map((line, i) => (
        <span key={i} style={{
          fontFamily: "var(--mono)", fontSize: `${line.size}rem`,
          letterSpacing: "0.06em", color: "var(--ink)",
          paddingLeft: `${line.indent * 0.35}rem`,
          opacity: 0.82, display: "block",
        }}>{line.text}</span>
      ))}
    </div>
  );
}

function PoemGrid() {
  /* After Noigandres group (Augusto de Campos, Haroldo de Campos, Pignatari) —
     the grid as semantic field, repetition shifting meaning. */
  const grid = [
    ["self", "self", "other"],
    ["self", "other", "other"],
    ["other", "other", "other"],
  ];
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
      {grid.map((row, i) => (
        <div key={i} style={{ display: "flex", gap: "1rem" }}>
          {row.map((word, j) => (
            <span key={j} style={{
              fontFamily: "var(--serif)", fontSize: "0.78rem",
              fontStyle: "italic", color: "var(--ink)",
              opacity: word === "other" ? 0.4 + i * 0.15 : 0.85 - i * 0.18,
              minWidth: "3rem",
            }}>{word}</span>
          ))}
        </div>
      ))}
    </div>
  );
}

function PoemSyntax() {
  /* After e.e. cummings — broken capitalisation, punctuation as breath,
     the sentence refusing its own grammar. */
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "0.3rem", maxWidth: "160px" }}>
      {[
        { t: "i", s: 0.95, o: 0.9, indent: 0 },
        { t: "think", s: 0.85, o: 0.7, indent: 6 },
        { t: "(there", s: 0.72, o: 0.6, indent: 2 },
        { t: "fore", s: 0.65, o: 0.5, indent: 10 },
        { t: "i", s: 0.58, o: 0.4, indent: 4 },
        { t: "am", s: 0.5, o: 0.3, indent: 14 },
        { t: "?)", s: 0.44, o: 0.2, indent: 8 },
      ].map((line, i) => (
        <span key={i} style={{
          fontFamily: "var(--mono)", fontSize: `${line.s}rem`,
          letterSpacing: "0.06em", color: "var(--ink)",
          opacity: line.o, paddingLeft: `${line.indent * 0.18}rem`,
          display: "block",
        }}>{line.t}</span>
      ))}
    </div>
  );
}

function PoemTime() {
  /* After Ian Hamilton Finlay — concrete language in landscape,
     the word as object in space. */
  const rows = [
    ["—", "—", "—", "—", "—", "—", "now", "—", "—", "—", "—"],
    ["—", "—", "—", "—", "—", "then", "—", "—", "—", "—", "—"],
    ["—", "—", "—", "—", "when", "—", "—", "—", "—", "—", "—"],
    ["—", "—", "—", "once", "—", "—", "—", "—", "—", "—", "—"],
    ["—", "—", "before", "—", "—", "—", "—", "—", "—", "—", "—"],
    ["—", "never", "—", "—", "—", "—", "—", "—", "—", "—", "—"],
  ];
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "0.25rem" }}>
      {rows.map((row, i) => (
        <div key={i} style={{ display: "flex", gap: "0.3rem" }}>
          {row.map((cell, j) => (
            <span key={j} style={{
              fontFamily: "var(--mono)", fontSize: "0.48rem",
              letterSpacing: "0.04em",
              color: cell === "—" ? "var(--border)" : "var(--ink)",
              opacity: cell === "—" ? 0.5 : 1,
              minWidth: "2rem", display: "block",
              fontWeight: cell !== "—" ? 700 : 400,
            }}>{cell}</span>
          ))}
        </div>
      ))}
    </div>
  );
}

const poems: Poem[] = [
  {
    id: "silence",
    title: "think",
    tribute: "after Eugen Gomringer",
    method: "absence as word",
    render: PoemSilence,
    x: 6, y: 8, rotate: -1.2,
  },
  {
    id: "fall",
    title: "consciousness",
    tribute: "after Emmett Williams",
    method: "dissolution",
    render: PoemFall,
    x: 28, y: 42, rotate: 0.8,
  },
  {
    id: "calligramme",
    title: "eye",
    tribute: "after Guillaume Apollinaire",
    method: "text as shape",
    render: PoemCalligramme,
    x: 50, y: 10, rotate: -0.5,
  },
  {
    id: "grid",
    title: "self / other",
    tribute: "after Noigandres",
    method: "semantic grid",
    render: PoemGrid,
    x: 64, y: 55, rotate: 1.5,
  },
  {
    id: "syntax",
    title: "i think (therefore",
    tribute: "after e.e. cummings",
    method: "broken grammar",
    render: PoemSyntax,
    x: 14, y: 62, rotate: -2,
  },
  {
    id: "time",
    title: "— now —",
    tribute: "after Ian Hamilton Finlay",
    method: "word in landscape",
    render: PoemTime,
    x: 38, y: 28, rotate: 0.3,
  },
];

/* ─── Gallery card ─── */
function PoemCard({ poem, onClick }: { poem: Poem; onClick: () => void }) {
  const [hovered, setHovered] = useState(false);
  const PoemComponent = poem.render;

  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: "absolute",
        left: `${poem.x}%`,
        top: `${poem.y}%`,
        transform: `rotate(${poem.rotate}deg) translateY(${hovered ? "-4px" : "0"})`,
        transition: "transform 0.4s ease, box-shadow 0.4s ease",
        cursor: "pointer",
        zIndex: hovered ? 10 : 1,
        boxShadow: hovered
          ? "0 12px 32px rgba(28,28,26,0.12)"
          : "0 2px 12px rgba(28,28,26,0.06)",
        backgroundColor: "var(--white)",
        border: "1px solid var(--border)",
        padding: "1.4rem 1.6rem 1.2rem",
        maxWidth: "clamp(180px, 22vw, 280px)",
      }}
    >
      <PoemComponent />
      <div style={{
        marginTop: "1rem",
        paddingTop: "0.7rem",
        borderTop: "1px solid var(--border)",
        opacity: hovered ? 1 : 0.5,
        transition: "opacity 0.3s",
      }}>
        <p style={{
          fontFamily: "var(--serif)", fontSize: "0.7rem",
          fontStyle: "italic", color: "var(--ink)",
          marginBottom: "0.2rem",
        }}>{poem.title}</p>
        <p style={{
          fontFamily: "var(--mono)", fontSize: "0.42rem",
          letterSpacing: "0.1em", color: "var(--muted)",
        }}>{poem.tribute}</p>
      </div>
    </div>
  );
}

/* ─── Full screen poem view ─── */
function PoemFull({ poem, onClose }: { poem: Poem; onClose: () => void }) {
  const PoemComponent = poem.render;
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  return (
    <div style={{
      position: "fixed", inset: 0, zIndex: 200,
      backgroundColor: "var(--white)",
      display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center",
      padding: "4rem 2rem",
    }}>
      <div style={{
        position: "absolute", top: "2rem", right: "2rem",
      }}>
        <button onClick={onClose} style={{
          fontFamily: "var(--mono)", fontSize: "0.52rem",
          letterSpacing: "0.1em", color: "var(--muted)",
          background: "none", border: "none", cursor: "pointer",
          transition: "color 0.2s",
        }}
        onMouseEnter={e => (e.currentTarget.style.color = "var(--ink)")}
        onMouseLeave={e => (e.currentTarget.style.color = "var(--muted)")}
        >
          (close)
        </button>
      </div>

      {/* Scale up the poem */}
      <div style={{ transform: "scale(1.8)", transformOrigin: "center" }}>
        <PoemComponent />
      </div>

      <div style={{ marginTop: "5rem", textAlign: "center" }}>
        <p style={{
          fontFamily: "var(--serif)", fontSize: "1rem",
          fontStyle: "italic", color: "var(--ink)",
          marginBottom: "0.4rem",
        }}>{poem.title}</p>
        <p style={{
          fontFamily: "var(--mono)", fontSize: "0.5rem",
          letterSpacing: "0.14em", color: "var(--muted)",
          marginBottom: "0.2rem",
        }}>{poem.tribute}</p>
        <p style={{
          fontFamily: "var(--mono)", fontSize: "0.46rem",
          letterSpacing: "0.1em", color: "var(--border)",
        }}>{poem.method}</p>
      </div>
    </div>
  );
}

/* ─── ROOT ─── */
export default function PoetryPage() {
  const [active, setActive] = useState<Poem | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(t);
  }, []);

  return (
    <div style={{ backgroundColor: "var(--off)", minHeight: "100vh" }}>
      <Nav />

      {/* Header */}
      <div style={{
        paddingTop: "3rem",
        borderBottom: "1px solid var(--border)",
        backgroundColor: "var(--white)",
      }}>
        <div style={{
          padding: "3.5rem 2.4rem 2.5rem",
          display: "flex", justifyContent: "space-between", alignItems: "flex-end",
          flexWrap: "wrap", gap: "1rem",
        }}>
          <div>
            <p style={{ fontFamily: "var(--mono)", fontSize: "0.52rem", letterSpacing: "0.2em", color: "var(--muted)", marginBottom: "0.8rem" }}>
              poetry
            </p>
            <h1 style={{
              fontFamily: "var(--serif)", fontSize: "clamp(1.8rem, 4vw, 3rem)",
              fontWeight: 400, fontStyle: "italic", lineHeight: 1.05, color: "var(--ink)",
            }}>
              Concrete poems
            </h1>
          </div>
          <p style={{
            fontFamily: "var(--serif)", fontSize: "0.85rem",
            fontStyle: "italic", color: "var(--muted)",
            maxWidth: "30ch", lineHeight: 1.7,
          }}>
            Six original works, each made in the spirit of a poet who believed the page itself was part of the poem.
          </p>
        </div>

        {/* Method key */}
        <div style={{
          display: "flex", gap: "0", overflowX: "auto",
          borderTop: "1px solid var(--border)",
        }}>
          {poems.map(p => (
            <div key={p.id} style={{
              padding: "0.7rem 1.4rem",
              borderRight: "1px solid var(--border)",
              flexShrink: 0,
            }}>
              <p style={{ fontFamily: "var(--mono)", fontSize: "0.44rem", letterSpacing: "0.1em", color: "var(--muted)", marginBottom: "0.15rem" }}>
                {p.tribute}
              </p>
              <p style={{ fontFamily: "var(--serif)", fontSize: "0.72rem", fontStyle: "italic", color: "var(--ink)" }}>
                {p.method}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Gallery wall */}
      <div style={{
        position: "relative",
        width: "100%",
        minHeight: "calc(100vh - 3rem)",
        backgroundColor: "var(--off)",
        backgroundImage: "radial-gradient(rgba(28,28,26,0.035) 1px, transparent 1px)",
        backgroundSize: "32px 32px",
        overflow: "hidden",
      }}>

        {/* Faint horizontal hanging lines */}
        <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none", opacity: 0.2 }}>
          {[15, 48, 78].map(y => (
            <line key={y} x1="0" y1={`${y}%`} x2="100%" y2={`${y}%`}
              stroke="var(--border)" strokeWidth="0.5" strokeDasharray="4 12" />
          ))}
        </svg>

        {/* Poems */}
        {poems.map((poem, i) => (
          <div key={poem.id} style={{
            opacity: visible ? 1 : 0,
            transition: `opacity 0.8s ease ${i * 100}ms`,
          }}>
            <PoemCard poem={poem} onClick={() => setActive(poem)} />
          </div>
        ))}

        {/* Click hint */}
        <div style={{
          position: "absolute", bottom: "2rem", right: "2rem",
          fontFamily: "var(--mono)", fontSize: "0.44rem",
          letterSpacing: "0.14em", color: "rgba(28,28,26,0.25)",
        }}>
          click any poem to read full screen
        </div>
      </div>

      <Footer />

      {/* Full screen overlay */}
      {active && <PoemFull poem={active} onClose={() => setActive(null)} />}
    </div>
  );
}
