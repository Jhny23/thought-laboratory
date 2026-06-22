"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import AudioPlayer from "@/app/components/AudioPlayer";

export default function Nav() {
  const path = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  const links = [
    { href: "/experiments", label: "experiments" },
    { href: "/biographies", label: "biographies" },
    { href: "/about", label: "about" },
  ];

  return (
    <>
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "1.1rem 1.8rem",
        backgroundColor: "var(--white)",
        borderBottom: "1px solid var(--border)",
      }}>
        <Link href="/" onClick={() => setMenuOpen(false)} style={{
          fontFamily: "var(--serif)",
          fontSize: "0.95rem",
          fontStyle: "italic",
          letterSpacing: "0.01em",
          color: "var(--ink)",
        }}>
          thought laboratory
        </Link>

        {/* Desktop links */}
        <div className="nav-desktop-links" style={{ display: "flex", gap: "1.8rem", alignItems: "center" }}>
          {links.map(l => (
            <Link key={l.href} href={l.href} style={{
              fontFamily: "var(--mono)",
              fontSize: "0.62rem",
              letterSpacing: "0.08em",
              color: path.startsWith(l.href) ? "var(--ink)" : "var(--muted)",
              transition: "color 0.2s",
            }}>
              {l.label}
            </Link>
          ))}
          <AudioPlayer />
        </div>

        {/* Mobile toggle */}
        <button
          className="nav-mobile-toggle"
          onClick={() => setMenuOpen(o => !o)}
          aria-label="Toggle menu"
          style={{
            display: "none",
            background: "none", border: "none", cursor: "pointer",
            padding: "0.3rem", flexDirection: "column", gap: "5px",
          }}
        >
          <span style={{
            width: "18px", height: "1px", backgroundColor: "var(--ink)",
            display: "block", transition: "transform 0.25s ease",
            transform: menuOpen ? "translateY(3px) rotate(45deg)" : "none",
          }} />
          <span style={{
            width: "18px", height: "1px", backgroundColor: "var(--ink)",
            display: "block", transition: "transform 0.25s ease",
            transform: menuOpen ? "translateY(-3px) rotate(-45deg)" : "none",
          }} />
        </button>
      </nav>

      {/* Mobile dropdown panel */}
      <div className="nav-mobile-panel" style={{
        position: "fixed", top: "3.2rem", left: 0, right: 0, zIndex: 99,
        backgroundColor: "var(--white)",
        borderBottom: "1px solid var(--border)",
        maxHeight: menuOpen ? "240px" : "0px",
        overflow: "hidden",
        transition: "max-height 0.3s ease",
        display: "none",
      }}>
        <div style={{ display: "flex", flexDirection: "column", padding: "0.5rem 1.8rem 1.4rem" }}>
          {links.map(l => (
            <Link key={l.href} href={l.href} onClick={() => setMenuOpen(false)} style={{
              fontFamily: "var(--mono)",
              fontSize: "0.65rem",
              letterSpacing: "0.08em",
              color: path.startsWith(l.href) ? "var(--ink)" : "var(--muted)",
              padding: "0.7rem 0",
              borderBottom: "1px solid var(--border)",
            }}>
              {l.label}
            </Link>
          ))}
          <div style={{ padding: "0.7rem 0" }}>
            <AudioPlayer />
          </div>
        </div>
      </div>

      <style jsx global>{`
        @media (max-width: 640px) {
          .nav-desktop-links { display: none !important; }
          .nav-mobile-toggle { display: flex !important; }
          .nav-mobile-panel { display: block !important; }
        }
      `}</style>
    </>
  );
}
