"use client";
import { useState, useRef } from "react";

export default function AudioPlayer() {
  const [playing, setPlaying] = useState(false);
  const audio = useRef<HTMLAudioElement | null>(null);

  const toggle = () => {
    // Lazily create the Audio element only on first interaction —
    // avoids fetching a multi-MB file on every page load.
    if (!audio.current) {
      audio.current = new Audio("/audio/ambient.mp3");
      audio.current.loop = true;
      audio.current.volume = 0;
    }

    if (!playing) {
      audio.current.play();
      let vol = 0;
      const fade = setInterval(() => {
        vol = Math.min(vol + 0.02, 0.35);
        audio.current!.volume = vol;
        if (vol >= 0.35) clearInterval(fade);
      }, 40);
    } else {
      audio.current.pause();
    }
    setPlaying(p => !p);
  };

  return (
    <button
      onClick={toggle}
      style={{
        fontFamily: "var(--mono)",
        fontSize: "0.55rem",
        letterSpacing: "0.12em",
        color: playing ? "var(--ink)" : "var(--muted)",
        backgroundColor: "transparent",
        border: "none",
        cursor: "pointer",
        transition: "color 0.3s",
        padding: 0,
      }}
    >
      {playing ? "(sound on)" : "(sound off)"}
    </button>
  );
}