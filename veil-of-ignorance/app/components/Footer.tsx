import Link from "next/link";

export default function Footer() {
  return (
    <footer style={{
      borderTop: "1px solid var(--border)",
      padding: "2.2rem 2.2rem 2rem",
      display: "flex",
      gap: "2rem",
      flexWrap: "wrap",
      alignItems: "center",
      justifyContent: "space-between",
      backgroundColor: "var(--white)",
    }}>
      <p style={{
        fontFamily: "var(--serif)",
        fontSize: "0.78rem",
        fontStyle: "italic",
        color: "var(--muted)",
        letterSpacing: "0.01em",
      }}>
        thought laboratory
      </p>
      <div style={{ display: "flex", gap: "1.8rem", flexWrap: "wrap" }}>
        {[
          { label: "(about)", href: "/about" },
          { label: "(github)", href: "#" },
          { label: "(privacy)", href: "#" },
        ].map(l => (
          <Link key={l.label} href={l.href} style={{
            fontFamily: "var(--mono)", fontSize: "0.5rem",
            letterSpacing: "0.1em", color: "var(--muted)",
            transition: "color 0.3s",
          }}
          onMouseEnter={e => (e.currentTarget.style.color = "var(--ink)")}
          onMouseLeave={e => (e.currentTarget.style.color = "var(--muted)")}
          >
            {l.label}
          </Link>
        ))}
      </div>
    </footer>
  );
}
