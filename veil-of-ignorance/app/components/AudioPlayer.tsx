"use client";
import { useState, useRef, useEffect } from "react";

export default function AudioPlayer() {
  const [playing, setPlaying] = useState(false);
  const [ready, setReady] = useState(false);
  const audio = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    audio.current = new Audio("/audio/ambient.mp3");
    audio.current.loop = true;
    audio.current.volume = 0.35;
    audio.current.addEventListener("canplaythrough", () => setReady(true));
    return () => {
      audio.current?.pause();
      audio.current = null;
    };
  }, []);

  const toggle = () => {
    if (!audio.current) return;
    if (!playing) {
  audio.current.volume = 0;
  audio.current.play();
  // fade in over 2 seconds
  let vol = 0;
  const fade = setInterval(() => {
    vol = Math.min(vol + 0.02, 0.35);
    audio.current!.volume = vol;
    if (vol >= 0.35) clearInterval(fade);
  }, 40);
}
    if (playing) {
      audio.current.pause();
    } else {
      audio.current.play();
    }
    setPlaying(p => !p);
  };

  return (
    <button
      onClick={toggle}
      disabled={!ready}
      style={{
        fontFamily: "var(--mono)",
        fontSize: "0.55rem",
        letterSpacing: "0.12em",
        color: playing ? "var(--ink)" : "var(--muted)",
        backgroundColor: "transparent",
        border: "none",
        cursor: ready ? "pointer" : "default",
        transition: "color 0.3s",
        padding: 0,
      }}
    >
      {!ready ? "(loading)" : playing ? "(sound on)" : "(sound off)"}
    </button>
  );
}