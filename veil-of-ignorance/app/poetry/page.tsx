"use client";
import React, { useEffect, useRef, useState } from "react";
import Nav from "@/app/components/Nav";

export default function PoetryPage() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [dims, setDims] = useState({ w: 800, h: 1000 });

  useEffect(() => {
    const update = () => setDims({ w: window.innerWidth, h: window.innerHeight });
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const W = dims.w;
    const H = dims.h;
    canvas.width = W;
    canvas.height = H;

    // Dark background
    ctx.fillStyle = "#0F0E0D";
    ctx.fillRect(0, 0, W, H);

    const cx = W * 0.5;
    const cy = H * 0.28;

    // ── Spiral vortex lines ──
    ctx.save();
    for (let ring = 0; ring < 18; ring++) {
      const r = 18 + ring * 14;
      const opacity = 0.08 + ring * 0.018;
      ctx.beginPath();
      ctx.strokeStyle = `rgba(220,210,195,${opacity})`;
      ctx.lineWidth = 0.6;
      // Slightly elliptical rings for depth
      ctx.ellipse(cx, cy, r * 1.6, r * 0.55, 0, 0, Math.PI * 2);
      ctx.stroke();
    }
    ctx.restore();

    // ── Falling figure (chalk sketch) ──
    ctx.save();
    ctx.translate(cx, cy + 60);
    ctx.strokeStyle = "rgba(235,225,210,0.92)";
    ctx.lineWidth = 1.8;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";

    // Add chalk texture via shadow
    ctx.shadowColor = "rgba(235,225,210,0.3)";
    ctx.shadowBlur = 3;

    // Head
    ctx.beginPath();
    ctx.arc(0, -48, 10, 0, Math.PI * 2);
    ctx.stroke();

    // Torso — arched backward as if falling
    ctx.beginPath();
    ctx.moveTo(0, -38);
    ctx.bezierCurveTo(8, -18, 12, 0, 6, 22);
    ctx.stroke();

    // Left arm reaching up
    ctx.beginPath();
    ctx.moveTo(2, -28);
    ctx.bezierCurveTo(-14, -40, -28, -46, -38, -38);
    ctx.stroke();

    // Right arm falling out
    ctx.beginPath();
    ctx.moveTo(4, -24);
    ctx.bezierCurveTo(18, -20, 32, -10, 42, 2);
    ctx.stroke();

    // Left leg
    ctx.beginPath();
    ctx.moveTo(6, 22);
    ctx.bezierCurveTo(-2, 38, -10, 52, -6, 68);
    ctx.stroke();

    // Right leg
    ctx.beginPath();
    ctx.moveTo(6, 22);
    ctx.bezierCurveTo(14, 36, 20, 50, 16, 66);
    ctx.stroke();

    // Debris / particles falling with figure
    ctx.lineWidth = 0.8;
    const debris = [[-22,30],[-35,15],[-48,45],[28,38],[44,22],[52,55],[-18,60],[34,60]];
    debris.forEach(([dx, dy]) => {
      ctx.beginPath();
      ctx.arc(dx, dy, 1.5 + Math.random() * 2, 0, Math.PI * 2);
      ctx.stroke();
    });

    // Vertical pull — lines of force going down
    ctx.lineWidth = 0.5;
    ctx.strokeStyle = "rgba(235,225,210,0.18)";
    for (let i = -3; i <= 3; i++) {
      ctx.beginPath();
      ctx.moveTo(i * 8, 80);
      ctx.lineTo(i * 6, 240);
      ctx.stroke();
    }
    ctx.restore();

    // ── Text fragments — Lao Tzu ideas, original wording ──
    // Arranged radially, some spiraling, some angular
    const fragments = [
      // Spiral — close to figure, outward
      { text: "the way that can be named", x: cx - 160, y: cy - 80, angle: -38, size: 11, opacity: 0.72 },
      { text: "is not the eternal way", x: cx + 80, y: cy - 95, angle: 22, size: 11, opacity: 0.68 },
      { text: "the nameless is the beginning", x: cx - 240, y: cy - 20, angle: -15, size: 10, opacity: 0.6 },
      { text: "of heaven and earth", x: cx + 140, y: cy - 40, angle: 8, size: 10, opacity: 0.6 },

      // Left cascade — falling
      { text: "to yield is to be preserved whole", x: cx - 280, y: cy + 40, angle: -8, size: 9.5, opacity: 0.55 },
      { text: "to be bent is to become straight", x: cx - 300, y: cy + 80, angle: -5, size: 9, opacity: 0.5 },
      { text: "the soft overcomes the hard", x: cx - 260, y: cy + 120, angle: -3, size: 9, opacity: 0.48 },
      { text: "the still overcomes the restless", x: cx - 230, y: cy + 158, angle: -2, size: 8.5, opacity: 0.44 },
      { text: "knowing others is wisdom", x: cx - 200, y: cy + 192, angle: 0, size: 8.5, opacity: 0.42 },
      { text: "knowing yourself is enlightenment", x: cx - 220, y: cy + 222, angle: 1, size: 8, opacity: 0.38 },
      { text: "mastering others requires force", x: cx - 195, y: cy + 252, angle: 2, size: 7.5, opacity: 0.34 },
      { text: "mastering yourself requires strength", x: cx - 210, y: cy + 278, angle: 3, size: 7, opacity: 0.3 },
      { text: "a journey of a thousand miles", x: cx - 185, y: cy + 302, angle: 3, size: 6.5, opacity: 0.26 },
      { text: "begins beneath the feet", x: cx - 160, y: cy + 324, angle: 4, size: 6, opacity: 0.22 },
      { text: "return is the movement of the way", x: cx - 140, y: cy + 344, angle: 4, size: 5.5, opacity: 0.18 },
      { text: "yielding is the way of the way", x: cx - 120, y: cy + 362, angle: 5, size: 5, opacity: 0.14 },
      { text: "all things arise from being", x: cx - 95, y: cy + 378, angle: 5, size: 4.5, opacity: 0.10 },
      { text: "being arises from nothing", x: cx - 70, y: cy + 392, angle: 5, size: 4, opacity: 0.07 },

      // Right cascade
      { text: "the highest good is like water", x: cx + 80, y: cy + 50, angle: 6, size: 9.5, opacity: 0.55 },
      { text: "water benefits all things", x: cx + 100, y: cy + 85, angle: 4, size: 9, opacity: 0.5 },
      { text: "and does not compete", x: cx + 115, y: cy + 118, angle: 3, size: 8.5, opacity: 0.46 },
      { text: "it dwells in the lowly places", x: cx + 100, y: cy + 150, angle: 2, size: 8, opacity: 0.42 },
      { text: "that all men disdain", x: cx + 110, y: cy + 178, angle: 1, size: 7.5, opacity: 0.38 },
      { text: "the space between heaven and earth", x: cx + 80, y: cy + 204, angle: 0, size: 7, opacity: 0.34 },
      { text: "is like a bellows", x: cx + 108, y: cy + 226, angle: -1, size: 6.5, opacity: 0.3 },
      { text: "empty yet never exhausted", x: cx + 90, y: cy + 246, angle: -1, size: 6, opacity: 0.26 },
      { text: "the more it moves, the more it yields", x: cx + 60, y: cy + 264, angle: -2, size: 5.5, opacity: 0.22 },
      { text: "what is firmly rooted cannot be pulled out", x: cx + 30, y: cy + 280, angle: -2, size: 5, opacity: 0.17 },
      { text: "what is tightly held cannot slip away", x: cx + 20, y: cy + 294, angle: -3, size: 4.5, opacity: 0.12 },
      { text: "be empty, be still", x: cx + 30, y: cy + 307, angle: -3, size: 4, opacity: 0.09 },
      { text: "watch everything return", x: cx + 20, y: cy + 318, angle: -3, size: 3.8, opacity: 0.06 },

      // Top swirl — near vortex
      { text: "before heaven and earth existed", x: cx - 120, y: cy - 140, angle: -55, size: 10, opacity: 0.5 },
      { text: "there was something formless and perfect", x: cx + 20, y: cy - 158, angle: 40, size: 10, opacity: 0.48 },
      { text: "silent. boundless.", x: cx - 40, y: cy - 170, angle: -12, size: 11, opacity: 0.55 },
      { text: "standing alone and unchanging", x: cx - 180, y: cy - 118, angle: -62, size: 9, opacity: 0.42 },
      { text: "ever present and in motion", x: cx + 100, y: cy - 128, angle: 52, size: 9, opacity: 0.4 },
    ];

    ctx.save();
    fragments.forEach(f => {
      ctx.save();
      ctx.translate(f.x, f.y);
      ctx.rotate((f.angle * Math.PI) / 180);
      ctx.font = `${f.size}px 'Georgia', serif`;
      ctx.fillStyle = `rgba(230,220,205,${f.opacity})`;
      ctx.shadowColor = `rgba(230,220,205,${f.opacity * 0.4})`;
      ctx.shadowBlur = 2;
      ctx.fillText(f.text, 0, 0);
      ctx.restore();
    });
    ctx.restore();

    // Attribution
    ctx.font = "9px 'Georgia', serif";
    ctx.fillStyle = "rgba(180,170,155,0.3)";
    ctx.fillText("Lao Tzu · Tao Te Ching · original wording", W - 320, H - 24);

  }, [dims]);

  return (
    <div style={{ backgroundColor: "#0F0E0D", minHeight: "100vh", position: "relative" }}>
      <Nav />
      <canvas
        ref={canvasRef}
        style={{
          display: "block",
          width: "100%",
          height: "100vh",
          cursor: "default",
        }}
      />
      {/* Title overlay — bottom left */}
      <div style={{
        position: "fixed",
        bottom: "2rem",
        left: "2rem",
        zIndex: 10,
      }}>
        <p style={{
          fontFamily: "var(--mono)",
          fontSize: "0.46rem",
          letterSpacing: "0.2em",
          color: "rgba(220,210,195,0.35)",
          textTransform: "uppercase",
          marginBottom: "0.3rem",
        }}>
          poetry · thought laboratory
        </p>
        <p style={{
          fontFamily: "var(--serif)",
          fontSize: "0.85rem",
          fontStyle: "italic",
          color: "rgba(220,210,195,0.5)",
        }}>
          the way
        </p>
      </div>
    </div>
  );
}
