"use client";
import { useState, useEffect } from "react";

/* ── Floating question mark — homepage idle ── */
export function FloatingQuestionMark() {
  return (
    <div style={{
      position: "fixed",
      bottom: "12vh",
      right: "3vw",
      zIndex: 5,
      pointerEvents: "none",
      animation: "floatBob 4s ease-in-out infinite",
      opacity: 0.18,
    }}>
      <svg viewBox="0 0 32 48" width="22" height="32">
        <text x="4" y="36" fontSize="32" fontFamily="Georgia, serif" fill="var(--ink)">?</text>
      </svg>
      <style jsx global>{`
        @keyframes floatBob {
          0%, 100% { transform: translateY(0px) rotate(-3deg); }
          50% { transform: translateY(-10px) rotate(3deg); }
        }
      `}</style>
    </div>
  );
}

/* ── Tiny philosopher — glasses + floating ? ── */
export function TinyPhilosopher({ style = {} }: { style?: React.CSSProperties }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ display: "inline-block", cursor: "default", ...style }}
    >
      <svg viewBox="0 0 40 56" width="36" height="50">
        {/* Body */}
        <ellipse cx="20" cy="38" rx="10" ry="13" fill="none" stroke="var(--ink)" strokeWidth="1.2" />
        {/* Head */}
        <circle cx="20" cy="17" r="9" fill="none" stroke="var(--ink)" strokeWidth="1.2" />
        {/* Glasses */}
        <circle cx="16" cy="17" r="4" fill="none" stroke="var(--ink)" strokeWidth="1" />
        <circle cx="24" cy="17" r="4" fill="none" stroke="var(--ink)" strokeWidth="1" />
        <line x1="12" y1="17" x2="10" y2="17" stroke="var(--ink)" strokeWidth="1" />
        <line x1="28" y1="17" x2="30" y2="17" stroke="var(--ink)" strokeWidth="1" />
        <line x1="20" y1="17" x2="20" y2="17" stroke="var(--ink)" strokeWidth="1" />
        {/* Arms */}
        <line x1="10" y1="33" x2="4" y2="40" stroke="var(--ink)" strokeWidth="1.2" strokeLinecap="round" />
        <line x1="30" y1="33" x2="36" y2="40" stroke="var(--ink)" strokeWidth="1.2" strokeLinecap="round" />
        {/* Floating ? on hover */}
        {hovered && (
          <text x="28" y="8" fontSize="10" fontFamily="Georgia, serif" fill="var(--ink)" opacity="0.7">?</text>
        )}
      </svg>
    </div>
  );
}

/* ── Tortoise with book ── */
export function TinyTortoise({ style = {} }: { style?: React.CSSProperties }) {
  return (
    <div style={{ display: "inline-block", ...style }}>
      <svg viewBox="0 0 52 36" width="48" height="32">
        {/* Shell */}
        <ellipse cx="24" cy="20" rx="16" ry="11" fill="none" stroke="var(--ink)" strokeWidth="1.2" />
        {/* Shell pattern */}
        <ellipse cx="24" cy="20" rx="9" ry="6" fill="none" stroke="var(--ink)" strokeWidth="0.7" opacity="0.5" />
        <line x1="24" y1="14" x2="24" y2="26" stroke="var(--ink)" strokeWidth="0.6" opacity="0.4" />
        <line x1="15" y1="20" x2="33" y2="20" stroke="var(--ink)" strokeWidth="0.6" opacity="0.4" />
        {/* Head */}
        <circle cx="38" cy="18" r="5" fill="none" stroke="var(--ink)" strokeWidth="1.2" />
        {/* Eye */}
        <circle cx="40" cy="17" r="1" fill="var(--ink)" />
        {/* Neck */}
        <line x1="33" y1="19" x2="38" y2="19" stroke="var(--ink)" strokeWidth="1.5" />
        {/* Legs */}
        <line x1="13" y1="28" x2="10" y2="34" stroke="var(--ink)" strokeWidth="1.2" strokeLinecap="round" />
        <line x1="20" y1="30" x2="18" y2="35" stroke="var(--ink)" strokeWidth="1.2" strokeLinecap="round" />
        <line x1="28" y1="30" x2="28" y2="35" stroke="var(--ink)" strokeWidth="1.2" strokeLinecap="round" />
        {/* Tiny book on back */}
        <rect x="18" y="9" width="10" height="7" rx="1" fill="none" stroke="var(--ink)" strokeWidth="1" />
        <line x1="23" y1="9" x2="23" y2="16" stroke="var(--ink)" strokeWidth="0.6" />
      </svg>
    </div>
  );
}

/* ── Lightning bolt hit animation ── */
export function LightningHit({ active }: { active: boolean }) {
  return (
    <div style={{
      display: "inline-flex", alignItems: "center", gap: "0.4rem",
      opacity: active ? 1 : 0,
      transform: active ? "scale(1)" : "scale(0.5)",
      transition: "all 0.3s cubic-bezier(0.34,1.56,0.64,1)",
    }}>
      <svg viewBox="0 0 24 36" width="18" height="27">
        {/* Umbrella */}
        <path d="M 12 28 L 12 20 Q 12 10 2 10 Q 12 4 22 10 Q 12 10 12 20 Z"
          fill="none" stroke="var(--ink)" strokeWidth="1.2" strokeLinejoin="round" />
        {/* Lightning */}
        <path d="M 18 2 L 14 12 L 17 12 L 13 22 L 20 10 L 17 10 Z"
          fill="#B01C1C" stroke="#B01C1C" strokeWidth="0.5"
          style={{ animation: active ? "boltFlash 0.4s ease-out" : "none" }}
        />
        <style jsx global>{`
          @keyframes boltFlash {
            0% { opacity: 0; transform: translateY(-4px); }
            50% { opacity: 1; }
            100% { opacity: 0.8; transform: translateY(0); }
          }
        `}</style>
      </svg>
    </div>
  );
}

/* ── Bullet bite face ── */
export function BulletBite({ active }: { active: boolean }) {
  return (
    <div style={{
      display: "inline-flex", alignItems: "center", gap: "0.5rem",
      opacity: active ? 1 : 0,
      transform: active ? "scale(1)" : "scale(0.5)",
      transition: "all 0.35s cubic-bezier(0.34,1.56,0.64,1)",
    }}>
      <svg viewBox="0 0 44 32" width="44" height="32">
        {/* Round character */}
        <circle cx="14" cy="16" r="12" fill="none" stroke="var(--ink)" strokeWidth="1.2" />
        {/* Eyes — worried */}
        <circle cx="10" cy="13" r="1.5" fill="var(--ink)" />
        <circle cx="18" cy="13" r="1.5" fill="var(--ink)" />
        {/* Eyebrows raised */}
        <path d="M 8 9 Q 10 7 12 9" fill="none" stroke="var(--ink)" strokeWidth="1" />
        <path d="M 16 9 Q 18 7 20 9" fill="none" stroke="var(--ink)" strokeWidth="1" />
        {/* "ulp" mouth — open */}
        <ellipse cx="14" cy="20" rx="3" ry="2" fill="none" stroke="var(--ink)" strokeWidth="1" />
        {/* Tiny bullet */}
        <ellipse cx="32" cy="16" rx="6" ry="4" fill="none" stroke="#8C5A00" strokeWidth="1.2" />
        <path d="M 38 16 Q 42 14 44 16 Q 42 18 38 16 Z" fill="#8C5A00" />
        {/* Arm reaching for bullet */}
        <path d="M 24 18 Q 28 16 30 16" fill="none" stroke="var(--ink)" strokeWidth="1.2" strokeLinecap="round" />
      </svg>
    </div>
  );
}

/* ── Thinking dots (between questions) ── */
export function ThinkingDots() {
  return (
    <div style={{ display: "flex", gap: "6px", alignItems: "center", justifyContent: "center", padding: "2rem" }}>
      {[0, 1, 2].map(i => (
        <div key={i} style={{
          width: "5px", height: "5px", borderRadius: "50%",
          backgroundColor: "var(--muted)",
          animation: `thinkPulse 1.2s ease-in-out ${i * 0.2}s infinite`,
        }} />
      ))}
      <style jsx global>{`
        @keyframes thinkPulse {
          0%, 100% { transform: scale(1); opacity: 0.3; }
          50% { transform: scale(1.5); opacity: 0.8; }
        }
      `}</style>
    </div>
  );
}

/* ── Zero-hit confetti ── */
export function PhilosophyConfetti({ active }: { active: boolean }) {
  const symbols = ["?", "∴", "∵", "⚖", "∞", "☯", "◦"];
  if (!active) return null;
  return (
    <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 9000, overflow: "hidden" }}>
      {Array.from({ length: 28 }).map((_, i) => (
        <div key={i} style={{
          position: "absolute",
          left: `${10 + Math.random() * 80}%`,
          top: "-20px",
          fontFamily: "var(--serif)",
          fontSize: `${10 + Math.random() * 14}px`,
          color: "var(--ink)",
          opacity: 0.6,
          animation: `confettiFall ${1.2 + Math.random() * 1.4}s ease-in ${Math.random() * 0.6}s forwards`,
        }}>
          {symbols[i % symbols.length]}
        </div>
      ))}
      <style jsx global>{`
        @keyframes confettiFall {
          0% { transform: translateY(0) rotate(0deg); opacity: 0.7; }
          100% { transform: translateY(110vh) rotate(${Math.random() > 0.5 ? "" : "-"}${120 + Math.random() * 80}deg); opacity: 0; }
        }
      `}</style>
    </div>
  );
}
