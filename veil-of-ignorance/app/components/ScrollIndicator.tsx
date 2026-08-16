"use client";
import { useEffect, useState } from "react";

export default function ScrollIndicator() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const update = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(total > 0 ? window.scrollY / total : 0);
    };
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  return (
    <div style={{
      position: "fixed", bottom: 0, left: 0,
      height: "1px", zIndex: 9000, pointerEvents: "none",
      backgroundColor: "var(--ink)",
      width: `${progress * 100}%`,
      opacity: 0.3,
      transition: "width 0.1s linear",
    }} />
  );
}
