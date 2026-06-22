"use client";
import { useState, useEffect } from "react";

const SEEN_KEY = "thought_lab_preloader_seen";

export default function Preloader({ children }: { children: React.ReactNode }) {
  const [show, setShow] = useState(false);
  const [fadingOut, setFadingOut] = useState(false);
  const [ready, setReady] = useState(false);
  const [lineFilled, setLineFilled] = useState(false);

  useEffect(() => {
    const seen = sessionStorage.getItem(SEEN_KEY);
    if (seen) {
      setReady(true);
      return;
    }
    setShow(true);
    sessionStorage.setItem(SEEN_KEY, "1");

    const lineTimer = setTimeout(() => setLineFilled(true), 300);
    const fadeTimer = setTimeout(() => setFadingOut(true), 2200);
    const doneTimer = setTimeout(() => {
      setShow(false);
      setReady(true);
    }, 2700);

    return () => {
      clearTimeout(lineTimer);
      clearTimeout(fadeTimer);
      clearTimeout(doneTimer);
    };
  }, []);

  return (
    <>
      {show && (
        <div style={{
          position: "fixed", inset: 0, zIndex: 9999,
          backgroundColor: "var(--white)",
          display: "flex", flexDirection: "column",
          alignItems: "center", justifyContent: "center",
          opacity: fadingOut ? 0 : 1,
          transition: "opacity 700ms ease",
          pointerEvents: fadingOut ? "none" : "auto",
        }}>
          <p style={{
            fontFamily: "var(--serif)",
            fontSize: "1.15rem",
            fontStyle: "italic",
            fontWeight: 400,
            color: "var(--ink)",
            letterSpacing: "0.02em",
            marginBottom: "1.4rem",
            opacity: 0,
            animation: "preloader-text-in 1200ms ease forwards 200ms",
          }}>
            thought laboratory
          </p>

          <div style={{
            width: "120px", height: "1px",
            backgroundColor: "var(--border)",
            position: "relative", overflow: "hidden",
          }}>
            <div style={{
              position: "absolute", top: 0, left: 0,
              height: "100%", backgroundColor: "var(--ink)",
              width: lineFilled ? "100%" : "0%",
              transition: "width 1600ms ease",
            }} />
          </div>
        </div>
      )}
      <div style={{ opacity: ready || !show ? 1 : 0, transition: "opacity 500ms ease" }}>
        {children}
      </div>
      <style jsx global>{`
        @keyframes preloader-text-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}</style>
    </>
  );
}
