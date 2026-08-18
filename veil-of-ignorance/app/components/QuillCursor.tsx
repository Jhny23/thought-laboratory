"use client";
import { useEffect, useRef, useState } from "react";

export default function QuillCursor() {
  const quillRef = useRef<HTMLDivElement>(null);
  const pos = useRef({ x: -100, y: -100 });
  const current = useRef({ x: -100, y: -100 });
  const raf = useRef<number>(0);
  const [visible, setVisible] = useState(false);
  const [hovering, setHovering] = useState(false);

  useEffect(() => {
    // Hide on touch devices
    if (window.matchMedia("(pointer: coarse)").matches) return;

    // Hide native cursor
    document.documentElement.style.cursor = "none";

    const onMove = (e: MouseEvent) => {
      pos.current = { x: e.clientX, y: e.clientY };
      setVisible(true);
      const t = e.target as HTMLElement;
      setHovering(!!t.closest("a, button, [role='button']"));
    };
    const onLeave = () => setVisible(false);
    const onEnter = () => setVisible(true);

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseleave", onLeave);
    window.addEventListener("mouseenter", onEnter);

    const animate = () => {
      // Smooth follow with slight lag for natural pen feel
      current.current.x += (pos.current.x - current.current.x) * 0.18;
      current.current.y += (pos.current.y - current.current.y) * 0.18;

      if (quillRef.current) {
        quillRef.current.style.transform =
          `translate(${current.current.x}px, ${current.current.y}px) rotate(-35deg) scale(${hovering ? 1.15 : 1})`;
      }
      raf.current = requestAnimationFrame(animate);
    };
    raf.current = requestAnimationFrame(animate);

    return () => {
      document.documentElement.style.cursor = "";
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseleave", onLeave);
      window.removeEventListener("mouseenter", onEnter);
      cancelAnimationFrame(raf.current);
    };
  }, [hovering]);

  return (
    <div
      ref={quillRef}
      style={{
        position: "fixed",
        top: "-28px",
        left: "-6px",
        zIndex: 99999,
        pointerEvents: "none",
        opacity: visible ? 1 : 0,
        transition: "opacity 0.3s ease, transform 0.08s ease",
        willChange: "transform",
      }}
    >
      <svg
        viewBox="0 0 24 64"
        width="18"
        height="48"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Feather body — large curved shape */}
        <path
          d="M 12 2 C 20 8 22 18 18 28 C 16 34 14 38 12 44 L 10 44 C 8 38 6 34 4 28 C 0 18 4 8 12 2 Z"
          fill="var(--off)"
          stroke="var(--ink)"
          strokeWidth="0.8"
        />
        {/* Central quill spine */}
        <line
          x1="12" y1="4"
          x2="12" y2="44"
          stroke="var(--ink)"
          strokeWidth="0.7"
          strokeLinecap="round"
        />
        {/* Feather barbs — left */}
        <line x1="12" y1="10" x2="6"  y2="14"  stroke="var(--ink)" strokeWidth="0.4" opacity="0.5" />
        <line x1="12" y1="15" x2="5"  y2="20"  stroke="var(--ink)" strokeWidth="0.4" opacity="0.5" />
        <line x1="12" y1="20" x2="5"  y2="26"  stroke="var(--ink)" strokeWidth="0.4" opacity="0.5" />
        <line x1="12" y1="25" x2="6"  y2="31"  stroke="var(--ink)" strokeWidth="0.4" opacity="0.5" />
        <line x1="12" y1="30" x2="7"  y2="36"  stroke="var(--ink)" strokeWidth="0.4" opacity="0.4" />
        {/* Feather barbs — right */}
        <line x1="12" y1="10" x2="18" y2="14"  stroke="var(--ink)" strokeWidth="0.4" opacity="0.5" />
        <line x1="12" y1="15" x2="19" y2="20"  stroke="var(--ink)" strokeWidth="0.4" opacity="0.5" />
        <line x1="12" y1="20" x2="19" y2="26"  stroke="var(--ink)" strokeWidth="0.4" opacity="0.5" />
        <line x1="12" y1="25" x2="18" y2="31"  stroke="var(--ink)" strokeWidth="0.4" opacity="0.5" />
        <line x1="12" y1="30" x2="17" y2="36"  stroke="var(--ink)" strokeWidth="0.4" opacity="0.4" />
        {/* Nib — tapered tip */}
        <path
          d="M 10 44 L 12 64 L 14 44 Z"
          fill="var(--ink)"
          opacity="0.85"
        />
        {/* Ink droplet at very tip — glows slightly on hover */}
        <circle
          cx="12" cy="63"
          r={hovering ? "1.8" : "1.2"}
          fill="var(--ink)"
          opacity={hovering ? "1" : "0.7"}
          style={{ transition: "r 0.2s ease, opacity 0.2s ease" }}
        />
      </svg>
    </div>
  );
}
