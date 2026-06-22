"use client";
import { useState, useEffect } from "react";

const SEEN_KEY = "thought_lab_preloader_seen";

export default function Preloader({ children }: { children: React.ReactNode }) {
  const [show, setShow] = useState(false);
  const [fadingOut, setFadingOut] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const seen = sessionStorage.getItem(SEEN_KEY);
    if (seen) {
      setReady(true);
      return;
    }
    setShow(true);
    sessionStorage.setItem(SEEN_KEY, "1");

    const fadeTimer = setTimeout(() => setFadingOut(true), 1400);
    const doneTimer = setTimeout(() => {
      setShow(false);
      setReady(true);
    }, 1900);

    return () => {
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
          display: "flex", alignItems: "center", justifyContent: "center",
          opacity: fadingOut ? 0 : 1,
          transition: "opacity 500ms ease",
          pointerEvents: fadingOut ? "none" : "auto",
        }}>
          <p style={{
            fontFamily: "var(--serif)",
            fontSize: "1.3rem",
            fontStyle: "italic",
            fontWeight: 400,
            color: "var(--ink)",
            letterSpacing: "0.01em",
            opacity: 0,
            animation: "preloader-fade-in 900ms ease forwards",
          }}>
            thought laboratory
          </p>
        </div>
      )}
      <div style={{ opacity: ready || !show ? 1 : 0, transition: "opacity 400ms ease" }}>
        {children}
      </div>
      <style jsx global>{`
        @keyframes preloader-fade-in {
          from { opacity: 0; transform: translateY(6px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </>
  );
}
