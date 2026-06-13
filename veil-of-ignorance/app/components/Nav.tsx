"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import AudioPlayer from "@/app/components/AudioPlayer";

export default function Nav() {
  const path = usePathname();

  const links = [
    { href: "/experiments", label: "experiments" },
    { href: "/biographies", label: "biographies" },
    { href: "/about", label: "about" },
  ];

  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
      display: "flex", alignItems: "center", justifyContent: "space-between",
      padding: "1.1rem 1.8rem",
      backgroundColor: "var(--white)",
      borderBottom: "1px solid var(--border)",
    }}>
      <Link href="/" style={{
        fontFamily: "var(--serif)",
        fontSize: "0.95rem",
        fontStyle: "italic",
        letterSpacing: "0.01em",
        color: "var(--ink)",
      }}>
        thought laboratory
      </Link>

      <div style={{ display: "flex", gap: "1.8rem", alignItems: "center" }}>
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
    </nav>
  );
}