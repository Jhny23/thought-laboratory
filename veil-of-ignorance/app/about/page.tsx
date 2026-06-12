"use client";
import Nav from "@/app/components/Nav";
import Footer from "@/app/components/Footer";

export default function About() {
  return (
    <div style={{ backgroundColor: "var(--white)", minHeight: "100vh" }}>
      <Nav />
      <div style={{ maxWidth: "560px", margin: "0 auto", padding: "8rem 1.8rem 6rem" }}>
        <p style={{ fontFamily: "var(--mono)", fontSize: "0.55rem", letterSpacing: "0.15em", color: "var(--muted)", marginBottom: "3rem" }}>
          about
        </p>

        <h1 style={{ fontFamily: "var(--serif)", fontSize: "clamp(1.8rem, 4vw, 2.8rem)", fontWeight: 400, fontStyle: "italic", lineHeight: 1.1, color: "var(--ink)", marginBottom: "2.5rem" }}>
          Thought Laboratory
        </h1>

        <div style={{ height: "1px", backgroundColor: "var(--border)", marginBottom: "2.5rem" }} />

        {[
          "Thought Laboratory is a collection of interactive philosophy experiments designed for people who prefer to think rather than scroll.",
          "Each experiment is grounded in a canonical thought experiment from the philosophical tradition — Rawls, Nozick, Nagel, Camus, Parfit — but built to be felt rather than merely read.",
          "Most philosophical writing asks you to observe at a safe distance. This platform does something different. It puts you inside the argument, makes you choose, and shows you what your choices reveal.",
          "We focus on experiments that expose the gap between what people say they believe and what they actually choose when the consequences become real.",
          "There is no correct answer. There is only what you decide, and what that says.",
        ].map((p, i) => (
          <p key={i} style={{ fontFamily: "var(--serif)", fontSize: "1rem", lineHeight: 1.9, color: "var(--ink)", marginBottom: "1.4rem" }}>
            {p}
          </p>
        ))}

        <div style={{ height: "1px", backgroundColor: "var(--border)", margin: "3rem 0" }} />

        <div style={{ display: "flex", flexDirection: "column", gap: "0.7rem" }}>
          {[
            ["enquiries", "info@thoughtlaboratory.com"],
            ["instagram", "@inthiscult"],
            ["Author", "John Kimeu"],
            ["newsletter", "(subscribe below)"],
          ].map(([k, v]) => (
            <div key={k} style={{ display: "grid", gridTemplateColumns: "100px 1fr" }}>
              <span style={{ fontFamily: "var(--mono)", fontSize: "0.55rem", letterSpacing: "0.08em", color: "var(--muted)" }}>{k}</span>
              <span style={{ fontFamily: "var(--mono)", fontSize: "0.55rem", letterSpacing: "0.06em", color: "var(--ink)" }}>{v}</span>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}
