"use client";
import { useState, useEffect } from "react";

const COOKIE_KEY = "tl_cookie_consent";

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);
  const [hiding, setHiding] = useState(false);

  useEffect(() => {
    const accepted = localStorage.getItem(COOKIE_KEY);
    if (!accepted) setTimeout(() => setVisible(true), 1800);
  }, []);

  const dismiss = (choice: "accept" | "decline") => {
    localStorage.setItem(COOKIE_KEY, choice);
    setHiding(true);
    setTimeout(() => setVisible(false), 350);
  };

  if (!visible) return null;

  return (
    <div style={{
      position: "fixed",
      bottom: "1.5rem",
      left: "1.5rem",
      zIndex: 9998,
      width: "clamp(260px, 90vw, 360px)",
      opacity: hiding ? 0 : 1,
      transform: hiding ? "translateY(8px)" : "translateY(0)",
      transition: "opacity 350ms ease, transform 350ms ease",
    }}>
      <div style={{
        backgroundColor: "var(--white)",
        border: "1px solid var(--ink)",
        boxShadow: "3px 3px 0px var(--ink)",
        padding: "1.2rem 1.4rem 1.1rem",
        position: "relative",
      }}>
        {/* Pixel corner accents */}
        {[
          { top: -1, left: -1 }, { top: -1, right: -1 },
          { bottom: -1, left: -1 }, { bottom: -1, right: -1 },
        ].map((pos, i) => (
          <div key={i} style={{
            position: "absolute", width: "6px", height: "6px",
            backgroundColor: "var(--white)", outline: "1px solid var(--ink)",
            ...pos,
          }} />
        ))}

        {/* Header row */}
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.75rem" }}>
          {/* Pixel cookie icon — 5x5 grid */}
          <svg width="14" height="14" viewBox="0 0 5 5" style={{ imageRendering: "pixelated", flexShrink: 0 }}>
            {([
              [0,1],[0,2],[0,3],
              [1,0],[1,1],[1,3],[1,4],
              [2,0],[2,2],[2,4],
              [3,0],[3,1],[3,3],[3,4],
              [4,1],[4,2],[4,3],
            ] as [number,number][]).map(([x, y]) => (
              <rect key={`${x}-${y}`} x={x} y={y} width="1" height="1" fill="var(--ink)" />
            ))}
          </svg>
          <p style={{
            fontFamily: "var(--mono)",
            fontSize: "0.46rem",
            letterSpacing: "0.2em",
            color: "var(--ink)",
            textTransform: "uppercase",
          }}>
            cookies
          </p>
        </div>

        <p style={{
          fontFamily: "var(--serif)",
          fontSize: "0.82rem",
          fontStyle: "italic",
          lineHeight: 1.65,
          color: "var(--ink)",
          marginBottom: "1.1rem",
          maxWidth: "38ch",
        }}>
          This site uses cookies to remember your preferences across visits. Nothing is sold or shared.
        </p>

        <div style={{ display: "flex", gap: "0.5rem" }}>
          {[
            { label: "(accept)", choice: "accept" as const, filled: true },
            { label: "(decline)", choice: "decline" as const, filled: false },
          ].map(({ label, choice, filled }) => (
            <button
              key={choice}
              onClick={() => dismiss(choice)}
              style={{
                fontFamily: "var(--mono)",
                fontSize: "0.46rem",
                letterSpacing: "0.12em",
                color: filled ? "var(--white)" : "var(--muted)",
                backgroundColor: filled ? "var(--ink)" : "transparent",
                border: `1px solid ${filled ? "var(--ink)" : "var(--border)"}`,
                boxShadow: `2px 2px 0px ${filled ? "rgba(28,28,26,0.35)" : "rgba(28,28,26,0.1)"}`,
                padding: "0.45rem 0.9rem",
                cursor: "pointer",
                transition: "box-shadow 0.1s ease, transform 0.1s ease, color 0.15s ease",
              }}
              onMouseEnter={e => {
                e.currentTarget.style.boxShadow = "none";
                e.currentTarget.style.transform = "translate(2px, 2px)";
                if (!filled) e.currentTarget.style.color = "var(--ink)";
              }}
              onMouseLeave={e => {
                e.currentTarget.style.boxShadow = `2px 2px 0px ${filled ? "rgba(28,28,26,0.35)" : "rgba(28,28,26,0.1)"}`;
                e.currentTarget.style.transform = "none";
                if (!filled) e.currentTarget.style.color = "var(--muted)";
              }}
            >
              {label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
