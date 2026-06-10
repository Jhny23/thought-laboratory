import Link from "next/link";

export default function Footer() {
  return (
    <footer style={{
      borderTop: "1px solid var(--border)",
      padding: "1.4rem 1.8rem",
      display: "flex", gap: "1.4rem", flexWrap: "wrap", alignItems: "center",
    }}>
      {[
        { label: "(about)", href: "/about" },
        { label: "(newsletter)", href: "#" },
        { label: "(github)", href: "#" },
        { label: "(privacy policy)", href: "#" },
      ].map(l => (
        <Link key={l.label} href={l.href} style={{
          fontFamily: "var(--mono)", fontSize: "0.6rem",
          letterSpacing: "0.06em", color: "var(--muted)",
          transition: "color 0.2s",
        }}
        onMouseEnter={e => (e.currentTarget.style.color = "var(--ink)")}
        onMouseLeave={e => (e.currentTarget.style.color = "var(--muted)")}
        >
          {l.label}
        </Link>
      ))}
    </footer>
  );
}
