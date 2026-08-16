"use client";
import { useEffect, useRef, useState } from "react";

export default function CursorEffects() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const pos = useRef({ x: -100, y: -100 });
  const ring = useRef({ x: -100, y: -100 });
  const raf = useRef<number>(0);
  const [visible, setVisible] = useState(false);
  const [hovering, setHovering] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches) return;

    const onMove = (e: MouseEvent) => {
      pos.current = { x: e.clientX, y: e.clientY };
      setVisible(true);
      const t = e.target as HTMLElement;
      setHovering(!!t.closest("a, button, [data-magnet]"));
    };
    const onLeave = () => setVisible(false);

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseleave", onLeave);

    const animate = () => {
      ring.current.x += (pos.current.x - ring.current.x) * 0.1;
      ring.current.y += (pos.current.y - ring.current.y) * 0.1;
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${pos.current.x}px,${pos.current.y}px)`;
      }
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${ring.current.x}px,${ring.current.y}px)`;
      }
      raf.current = requestAnimationFrame(animate);
    };
    raf.current = requestAnimationFrame(animate);

    // Magnetic pull on interactive elements
    const onMagnet = (e: MouseEvent) => {
      document.querySelectorAll<HTMLElement>("button, a").forEach(el => {
        const r = el.getBoundingClientRect();
        const cx = r.left + r.width / 2;
        const cy = r.top + r.height / 2;
        const dx = e.clientX - cx;
        const dy = e.clientY - cy;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 55) {
          const s = (1 - dist / 55) * 6;
          el.style.transform = `translate(${(dx / dist) * s}px,${(dy / dist) * s}px)`;
        } else if (el.style.transform && !el.style.transition.includes("all")) {
          el.style.transform = "";
        }
      });
    };
    window.addEventListener("mousemove", onMagnet);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseleave", onLeave);
      window.removeEventListener("mousemove", onMagnet);
      cancelAnimationFrame(raf.current);
    };
  }, []);

  return (
    <>
      <div ref={dotRef} style={{
        position: "fixed", zIndex: 99999, pointerEvents: "none",
        width: hovering ? "8px" : "5px",
        height: hovering ? "8px" : "5px",
        borderRadius: "50%",
        backgroundColor: "var(--ink)",
        top: hovering ? "-4px" : "-2.5px",
        left: hovering ? "-4px" : "-2.5px",
        opacity: visible ? 0.85 : 0,
        transition: "opacity 0.3s, width 0.2s, height 0.2s, top 0.2s, left 0.2s",
        mixBlendMode: "multiply",
      }} />
      <div ref={ringRef} style={{
        position: "fixed", zIndex: 99998, pointerEvents: "none",
        width: hovering ? "40px" : "28px",
        height: hovering ? "40px" : "28px",
        borderRadius: "50%",
        border: "1px solid rgba(28,28,26,0.22)",
        top: hovering ? "-20px" : "-14px",
        left: hovering ? "-20px" : "-14px",
        opacity: visible ? 1 : 0,
        transition: "opacity 0.3s, width 0.3s, height 0.3s, top 0.3s, left 0.3s",
        mixBlendMode: "multiply",
      }} />
    </>
  );
}
