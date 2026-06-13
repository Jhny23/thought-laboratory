"use client";
import { useState, useEffect, useRef } from "react";
import Nav from "@/app/components/Nav";

type Entry = {
  id: string;
  name: string;
  thought: string;
  x: number;      // % from left
  y: number;      // % from top
  rotate: number; // degrees
  size: number;   // relative font scale
  color: string;
  ts: number;
};

const colors = [
  "#1A1918", "#1A1918", "#1A1918",  // mostly ink
  "#2C3E6B",  // deep blue
  "#4A3728",  // dark brown
  "#2C4A3E",  // dark green
  "#6B4E3D",  // rust
  "#5C4A6E",  // muted purple
  "#B01C1C",  // red — rare
];

function seededRand(seed: number) {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

function placeEntry(index: number, total: number): Pick<Entry, "x" | "y" | "rotate" | "size" | "color"> {
  const r = (i: number) => seededRand(index * 7 + i);
  return {
    x: 4 + r(0) * 88,
    y: 4 + r(1) * 88,
    rotate: (r(2) - 0.5) * 22,
    size: 0.65 + r(3) * 0.7,
    color: colors[Math.floor(r(4) * colors.length)],
  };
}

const STORAGE_KEY = "corner_entries_v1";

function loadEntries(): Entry[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
  } catch { return []; }
}

function saveEntries(entries: Entry[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
}

export default function CornerPage() {
  const [entries, setEntries] = useState<Entry[]>([]);
  const [name, setName] = useState("");
  const [thought, setThought] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [focused, setFocused] = useState<string | null>(null);
  const wallRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setEntries(loadEntries());
  }, []);

  const handleSubmit = () => {
    if (!name.trim() || !thought.trim()) return;
    const placed = placeEntry(entries.length, entries.length + 1);
    const entry: Entry = {
      id: `${Date.now()}-${Math.random()}`,
      name: name.trim(),
      thought: thought.trim(),
      ts: Date.now(),
      ...placed,
    };
    const next = [...entries, entry];
    setEntries(next);
    saveEntries(next);
    setName("");
    setThought("");
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <div style={{ backgroundColor: "var(--white)", minHeight: "100vh" }}>
      <Nav />
      <div style={{ paddingTop: "3rem" }}>

        {/* Header */}
        <div style={{
          padding: "3.5rem 2.4rem 2.5rem",
          borderBottom: "1px solid var(--border)",
          display: "flex", justifyContent: "space-between", alignItems: "flex-end",
        }}>
          <div>
            <p style={{ fontFamily: "var(--mono)", fontSize: "0.52rem", letterSpacing: "0.2em", color: "var(--muted)", marginBottom: "0.8rem" }}>
              the corner
            </p>
            <h1 style={{
              fontFamily: "var(--serif)", fontSize: "clamp(1.8rem, 4vw, 3rem)",
              fontWeight: 400, fontStyle: "italic", lineHeight: 1.05, color: "var(--ink)",
            }}>
              I was here.
            </h1>
          </div>
          <p style={{
            fontFamily: "var(--serif)", fontSize: "0.85rem",
            fontStyle: "italic", color: "var(--muted)",
            maxWidth: "26ch", textAlign: "right", lineHeight: 1.7,
          }}>
            Leave your name. Leave one thought. Join the wall.
          </p>
        </div>

        {/* Wall */}
        <div
          ref={wallRef}
          style={{
            position: "relative",
            width: "100%",
            minHeight: "80vh",
            backgroundColor: "#F5F2EC",
            backgroundImage: `
              repeating-linear-gradient(0deg, transparent, transparent 59px, rgba(28,28,26,0.04) 60px),
              repeating-linear-gradient(90deg, transparent, transparent 59px, rgba(28,28,26,0.04) 60px)
            `,
            backgroundSize: "60px 60px",
            overflow: "hidden",
          }}
        >
          {entries.length === 0 && (
            <div style={{
              position: "absolute", inset: 0,
              display: "flex", alignItems: "center", justifyContent: "center",
              pointerEvents: "none",
            }}>
              <p style={{
                fontFamily: "var(--serif)", fontSize: "1rem",
                fontStyle: "italic", color: "rgba(28,28,26,0.18)",
                letterSpacing: "0.04em",
              }}>
                the wall is empty. be first.
              </p>
            </div>
          )}

          {entries.map((entry, i) => {
            const isFocused = focused === entry.id;
            return (
              <div
                key={entry.id}
                onMouseEnter={() => setFocused(entry.id)}
                onMouseLeave={() => setFocused(null)}
                style={{
                  position: "absolute",
                  left: `${entry.x}%`,
                  top: `${entry.y}%`,
                  transform: `rotate(${entry.rotate}deg)`,
                  zIndex: isFocused ? 10 : 1,
                  cursor: "default",
                  maxWidth: "220px",
                  transition: "opacity 0.3s",
                  opacity: focused && !isFocused ? 0.35 : 1,
                }}
              >
                <p style={{
                  fontFamily: "var(--serif)",
                  fontSize: `${entry.size * 0.95}rem`,
                  fontStyle: "italic",
                  fontWeight: 400,
                  color: entry.color,
                  lineHeight: 1.25,
                  marginBottom: "0.15rem",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  maxWidth: "220px",
                }}>
                  {entry.thought}
                </p>
                <p style={{
                  fontFamily: "var(--mono)",
                  fontSize: `${entry.size * 0.42}rem`,
                  letterSpacing: "0.12em",
                  color: entry.color,
                  opacity: 0.55,
                }}>
                  — {entry.name}
                </p>
              </div>
            );
          })}
        </div>

        {/* Input form */}
        <div style={{
          borderTop: "1px solid var(--border)",
          padding: "2.5rem 2.4rem 3rem",
          backgroundColor: "var(--white)",
          display: "grid",
          gridTemplateColumns: "1fr 1fr auto",
          gap: "0",
          alignItems: "end",
        }}>
          <div style={{ borderRight: "1px solid var(--border)", paddingRight: "2rem" }}>
            <label style={{ fontFamily: "var(--mono)", fontSize: "0.5rem", letterSpacing: "0.15em", color: "var(--muted)", display: "block", marginBottom: "0.6rem" }}>
              your name
            </label>
            <input
              type="text"
              value={name}
              onChange={e => setName(e.target.value)}
              maxLength={40}
              placeholder="John"
              onFocus={() => setFocused(null)}
              style={{
                width: "100%",
                fontFamily: "var(--serif)", fontSize: "1rem",
                fontStyle: "italic", color: "var(--ink)",
                backgroundColor: "transparent",
                border: "none", borderBottom: "1px solid var(--border)",
                padding: "0.4rem 0", outline: "none",
                transition: "border-color 0.2s",
              }}
              onMouseEnter={e => (e.currentTarget.style.borderColor = "var(--ink)")}
              onMouseLeave={e => (e.currentTarget.style.borderColor = "var(--border)")}
            />
          </div>

          <div style={{ padding: "0 2rem" }}>
            <label style={{ fontFamily: "var(--mono)", fontSize: "0.5rem", letterSpacing: "0.15em", color: "var(--muted)", display: "block", marginBottom: "0.6rem" }}>
              one thought
            </label>
            <input
              type="text"
              value={thought}
              onChange={e => setThought(e.target.value)}
              maxLength={80}
              placeholder="consciousness is stranger than I imagined"
              onKeyDown={e => { if (e.key === "Enter") handleSubmit(); }}
              style={{
                width: "100%",
                fontFamily: "var(--serif)", fontSize: "1rem",
                fontStyle: "italic", color: "var(--ink)",
                backgroundColor: "transparent",
                border: "none", borderBottom: "1px solid var(--border)",
                padding: "0.4rem 0", outline: "none",
                transition: "border-color 0.2s",
              }}
              onMouseEnter={e => (e.currentTarget.style.borderColor = "var(--ink)")}
              onMouseLeave={e => (e.currentTarget.style.borderColor = "var(--border)")}
            />
          </div>

          <div style={{ paddingLeft: "2rem" }}>
            {submitted ? (
              <p style={{ fontFamily: "var(--mono)", fontSize: "0.55rem", letterSpacing: "0.12em", color: "#2C4A3E" }}>
                (marked.)
              </p>
            ) : (
              <button
                onClick={handleSubmit}
                disabled={!name.trim() || !thought.trim()}
                style={{
                  fontFamily: "var(--mono)", fontSize: "0.6rem",
                  letterSpacing: "0.12em",
                  color: name.trim() && thought.trim() ? "var(--ink)" : "var(--muted)",
                  border: `1px solid ${name.trim() && thought.trim() ? "var(--ink)" : "var(--border)"}`,
                  padding: "0.75rem 1.4rem",
                  backgroundColor: "transparent",
                  cursor: name.trim() && thought.trim() ? "pointer" : "default",
                  transition: "all 0.2s",
                }}
                onMouseEnter={e => {
                  if (name.trim() && thought.trim()) {
                    e.currentTarget.style.backgroundColor = "var(--ink)";
                    e.currentTarget.style.color = "var(--white)";
                  }
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.backgroundColor = "transparent";
                  e.currentTarget.style.color = name.trim() && thought.trim() ? "var(--ink)" : "var(--muted)";
                }}
              >
                (leave mark)
              </button>
            )}
          </div>
        </div>

        {/* Entry count */}
        {entries.length > 0 && (
          <div style={{
            padding: "0.8rem 2.4rem",
            borderTop: "1px solid var(--border)",
            backgroundColor: "var(--white)",
          }}>
            <p style={{ fontFamily: "var(--mono)", fontSize: "0.48rem", letterSpacing: "0.12em", color: "var(--muted)" }}>
              {entries.length} {entries.length === 1 ? "person has" : "people have"} been here
            </p>
          </div>
        )}

      </div>
    </div>
  );
}
