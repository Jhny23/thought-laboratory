"use client";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export default function PageTransition() {
  const pathname = usePathname();
  const [phase, setPhase] = useState<"in" | "out" | "idle">("idle");

  useEffect(() => {
    setPhase("in");
    const t1 = setTimeout(() => setPhase("out"), 80);
    const t2 = setTimeout(() => setPhase("idle"), 600);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, [pathname]);

  if (phase === "idle") return null;

  return (
    <div style={{
      position: "fixed", inset: 0, zIndex: 9990,
      pointerEvents: "none",
      backgroundColor: "var(--ink)",
      transformOrigin: phase === "in" ? "left" : "right",
      transform: phase === "out" ? "scaleX(0)" : "scaleX(1)",
      transition: phase === "out"
        ? "transform 0.45s cubic-bezier(0.76, 0, 0.24, 1)"
        : "none",
    }} />
  );
}
