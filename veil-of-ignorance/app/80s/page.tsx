"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

const BOOT_LINES = [
  "THOUGHT LABORATORY OS v1.0",
  "Copyright (C) 1984 Thought Laboratory Corp.",
  "",
  "Memory Test: 640K OK",
  "Loading PHILOSOPHY.SYS...",
  "Loading REASON.EXE...",
  "Loading ETHICS.DRV...",
  "",
  "WARNING: Unexamined life detected.",
  "Running SOCRATES.BAT...",
  "",
  "System ready.",
  "> _",
];

const icons = [
  { label: "Experiments", icon: "🧪", href: "/experiments" },
  { label: "Biographies", icon: "📜", href: "/biographies" },
  { label: "About", icon: "❓", href: "/about" },
  { label: "Home", icon: "🏠", href: "/" },
];

const windows = [
  {
    id: "welcome",
    title: "WELCOME.TXT",
    x: 180, y: 80,
    w: 340, h: 200,
    content: (
      <div>
        <p style={{ marginBottom: "0.6rem" }}>Welcome to Thought Laboratory.</p>
        <p style={{ marginBottom: "0.6rem" }}>This machine runs on pure reason.</p>
        <p style={{ marginBottom: "0.6rem" }}>No disk required. No RAM sufficient.</p>
        <p>Only questions. Only answers.</p>
      </div>
    ),
  },
  {
    id: "quote",
    title: "QUOTE.EXE",
    x: 380, y: 200,
    w: 300, h: 160,
    content: (
      <div>
        <p style={{ marginBottom: "0.8rem", fontStyle: "italic" }}>
          "The unexamined life<br />is not worth living."
        </p>
        <p>— Socrates</p>
        <p style={{ marginTop: "0.8rem", opacity: 0.6, fontSize: "10px" }}>
          [Press any key to continue]
        </p>
      </div>
    ),
  },
];

export default function RetrOSPage() {
  const [booted, setBooted] = useState(false);
  const [bootLines, setBootLines] = useState<string[]>([]);
  const [openWindows, setOpenWindows] = useState<string[]>(["welcome"]);
  const [activeWindow, setActiveWindow] = useState("welcome");
  const [dragState, setDragState] = useState<{ id: string; ox: number; oy: number } | null>(null);
  const [positions, setPositions] = useState<Record<string, { x: number; y: number }>>({
    welcome: { x: 180, y: 80 },
    quote: { x: 380, y: 200 },
  });
  const [time, setTime] = useState("");
  const [blinkOn, setBlinkOn] = useState(true);

  // Boot sequence
  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      if (i < BOOT_LINES.length) {
        setBootLines(prev => [...prev, BOOT_LINES[i]]);
        i++;
      } else {
        clearInterval(interval);
        setTimeout(() => setBooted(true), 600);
      }
    }, 120);
    return () => clearInterval(interval);
  }, []);

  // Clock
  useEffect(() => {
    const update = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString("en-US", { hour12: false }));
    };
    update();
    const t = setInterval(update, 1000);
    return () => clearInterval(t);
  }, []);

  // Cursor blink
  useEffect(() => {
    const t = setInterval(() => setBlinkOn(b => !b), 530);
    return () => clearInterval(t);
  }, []);

  // Drag
  useEffect(() => {
    if (!dragState) return;
    const onMove = (e: MouseEvent) => {
      setPositions(prev => ({
        ...prev,
        [dragState.id]: {
          x: e.clientX - dragState.ox,
          y: e.clientY - dragState.oy,
        },
      }));
    };
    const onUp = () => setDragState(null);
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
    };
  }, [dragState]);

  const FONT = "'Courier New', Courier, monospace";
  const BG = "#8B8B7A";
  const WIN_BG = "#C0C0C0";
  const TITLE_BG = "#000080";
  const BORDER_LIGHT = "#FFFFFF";
  const BORDER_DARK = "#808080";
  const BORDER_DARKER = "#404040";
  const TEXT = "#000000";

  if (!booted) {
    return (
      <div style={{
        backgroundColor: "#000", minHeight: "100vh",
        fontFamily: FONT, fontSize: "13px", color: "#33FF33",
        padding: "2rem",
        display: "flex", flexDirection: "column", justifyContent: "flex-start",
      }}>
        <div style={{ marginBottom: "1rem", color: "#AAFFAA", fontSize: "11px" }}>
          THOUGHT LABORATORY BIOS v2.0 — 24 Aug 1984 — 09:15 AM
        </div>
        {bootLines.map((line, i) => (
          <div key={i} style={{
            lineHeight: "1.6",
            color: line.startsWith("WARNING") ? "#FFFF00" : line.startsWith(">") ? "#FFFFFF" : "#33FF33",
          }}>
            {line || "\u00A0"}
          </div>
        ))}
        <style jsx global>{`
          @keyframes scanlines {
            0% { background-position: 0 0; }
            100% { background-position: 0 4px; }
          }
        `}</style>
      </div>
    );
  }

  return (
    <div style={{
      minHeight: "100vh",
      backgroundColor: BG,
      fontFamily: FONT,
      fontSize: "12px",
      color: TEXT,
      userSelect: "none",
      position: "relative",
      overflow: "hidden",
      backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 1px, rgba(0,0,0,0.03) 2px)",
    }}>

      {/* Scanline overlay */}
      <div style={{
        position: "fixed", inset: 0, zIndex: 9999, pointerEvents: "none",
        backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.06) 3px)",
        backgroundSize: "100% 3px",
      }} />

      {/* Menu bar */}
      <div style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000,
        backgroundColor: WIN_BG,
        borderBottom: `2px solid ${BORDER_DARKER}`,
        display: "flex", alignItems: "center",
        padding: "2px 8px", gap: "1.5rem",
        height: "22px",
      }}>
        <span style={{ fontWeight: "bold", fontSize: "12px" }}>🧠 ThoughtOS</span>
        {["File", "Edit", "View", "Help"].map(m => (
          <span key={m} style={{ fontSize: "12px", cursor: "default", padding: "0 4px" }}
            onMouseEnter={e => { e.currentTarget.style.backgroundColor = TITLE_BG; e.currentTarget.style.color = "#fff"; }}
            onMouseLeave={e => { e.currentTarget.style.backgroundColor = "transparent"; e.currentTarget.style.color = TEXT; }}>
            {m}
          </span>
        ))}
        <span style={{ marginLeft: "auto", fontSize: "11px", color: "#333" }}>
          {time}
        </span>
      </div>

      {/* Desktop icons */}
      <div style={{
        position: "fixed", top: "30px", left: "12px",
        display: "flex", flexDirection: "column", gap: "1.5rem",
        zIndex: 10, paddingTop: "1rem",
      }}>
        {icons.map(icon => (
          <Link key={icon.label} href={icon.href} style={{
            display: "flex", flexDirection: "column", alignItems: "center",
            gap: "4px", textDecoration: "none", color: TEXT,
            width: "52px",
          }}>
            <div style={{
              fontSize: "24px", lineHeight: 1,
              filter: "drop-shadow(1px 1px 0 rgba(0,0,0,0.3))",
            }}>{icon.icon}</div>
            <span style={{
              fontSize: "10px", textAlign: "center",
              backgroundColor: "transparent",
              color: "#fff",
              textShadow: "1px 1px 0 #000, -1px 1px 0 #000",
              lineHeight: 1.2,
            }}>{icon.label}</span>
          </Link>
        ))}
      </div>

      {/* Desktop area */}
      <div style={{ paddingTop: "28px", minHeight: "100vh" }}>

        {/* Draggable windows */}
        {windows.map(win => {
          if (!openWindows.includes(win.id)) return null;
          const pos = positions[win.id] || { x: win.x, y: win.y };
          const isActive = activeWindow === win.id;

          return (
            <div
              key={win.id}
              style={{
                position: "absolute",
                left: pos.x, top: pos.y,
                width: win.w,
                zIndex: isActive ? 100 : 50,
                boxShadow: `2px 2px 0 ${BORDER_DARKER}`,
              }}
              onMouseDown={() => setActiveWindow(win.id)}
            >
              {/* Title bar */}
              <div
                style={{
                  background: isActive
                    ? `repeating-linear-gradient(90deg, ${TITLE_BG} 0px, ${TITLE_BG} 8px, #1084d0 8px, #1084d0 10px)`
                    : BORDER_DARK,
                  color: "#fff",
                  padding: "2px 6px",
                  display: "flex", alignItems: "center", justifyContent: "space-between",
                  cursor: "move",
                  fontSize: "11px", fontWeight: "bold",
                  height: "20px",
                }}
                onMouseDown={e => {
                  setActiveWindow(win.id);
                  setDragState({ id: win.id, ox: e.clientX - pos.x, oy: e.clientY - pos.y });
                }}
              >
                <span>{win.title}</span>
                <div style={{ display: "flex", gap: "2px" }}>
                  {/* Minimize */}
                  <button style={{
                    width: "14px", height: "14px", fontSize: "8px",
                    backgroundColor: WIN_BG, border: `1px outset ${BORDER_LIGHT}`,
                    cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
                  }} onClick={() => setOpenWindows(w => w.filter(id => id !== win.id))}>
                    _
                  </button>
                  {/* Close */}
                  <button style={{
                    width: "14px", height: "14px", fontSize: "9px",
                    backgroundColor: WIN_BG, border: `1px outset ${BORDER_LIGHT}`,
                    cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
                    fontWeight: "bold",
                  }} onClick={() => setOpenWindows(w => w.filter(id => id !== win.id))}>
                    ×
                  </button>
                </div>
              </div>

              {/* Window body */}
              <div style={{
                backgroundColor: WIN_BG,
                border: `2px solid`,
                borderColor: `${BORDER_LIGHT} ${BORDER_DARKER} ${BORDER_DARKER} ${BORDER_LIGHT}`,
                padding: "12px",
                minHeight: win.h - 20,
                fontSize: "12px",
                lineHeight: "1.7",
              }}>
                {win.content}
              </div>
            </div>
          );
        })}

        {/* Taskbar — closed windows re-open from here */}
        {windows.filter(w => !openWindows.includes(w.id)).map(win => (
          <button key={win.id}
            style={{
              position: "fixed", bottom: "30px",
              left: "80px",
              backgroundColor: WIN_BG,
              border: `2px outset ${BORDER_LIGHT}`,
              padding: "2px 12px", fontSize: "11px",
              cursor: "pointer", fontFamily: FONT,
            }}
            onClick={() => setOpenWindows(w => [...w, win.id])}
          >
            📄 {win.title}
          </button>
        ))}

        {/* Status bar */}
        <div style={{
          position: "fixed", bottom: 0, left: 0, right: 0,
          backgroundColor: WIN_BG,
          borderTop: `2px solid ${BORDER_DARKER}`,
          padding: "2px 8px",
          display: "flex", justifyContent: "space-between", alignItems: "center",
          height: "22px", zIndex: 1000,
        }}>
          <span style={{ fontSize: "11px" }}>
            Ready{blinkOn ? "█" : " "}
          </span>
          <span style={{ fontSize: "11px", color: "#333" }}>
            THOUGHT-LAB OS · 640K free · {time}
          </span>
          <Link href="/" style={{
            fontSize: "11px", color: TEXT, textDecoration: "none",
            border: `1px outset ${BORDER_LIGHT}`, padding: "1px 8px",
            backgroundColor: WIN_BG,
          }}>
            ← Back to site
          </Link>
        </div>
      </div>

      <style jsx global>{`
        body { cursor: default !important; }
        * { cursor: default !important; }
        a, button { cursor: pointer !important; }
      `}</style>
    </div>
  );
}
