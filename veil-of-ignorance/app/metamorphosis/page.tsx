"use client";
import Nav from "@/app/components/Nav";
import Footer from "@/app/components/Footer";

export default function Metamorphosis() {
  return (
    <div style={{ backgroundColor: "var(--white)", minHeight: "100vh" }}>
      <Nav />
      <div style={{ maxWidth: "560px", margin: "0 auto", padding: "8rem 1.8rem 6rem" }}>
        <p style={{ fontFamily: "var(--mono)", fontSize: "0.55rem", letterSpacing: "0.15em", color: "var(--muted)", marginBottom: "3rem" }}>
          metamorphosis
        </p>

        <h1 style={{ fontFamily: "var(--serif)", fontSize: "clamp(1.8rem, 4vw, 2.8rem)", fontWeight: 400, fontStyle: "italic", lineHeight: 1.1, color: "var(--ink)", marginBottom: "2.5rem" }}>
          Metamorphosis
        </h1>

        <div style={{ height: "1px", backgroundColor: "var(--border)", marginBottom: "2.5rem" }} />

        <p style={{ fontFamily: "var(--serif)", fontSize: "1rem", lineHeight: 1.9, color: "var(--muted)", fontStyle: "italic" }}>
          Coming soon.
        </p>
      </div>
      <Footer />
    </div>
  );
}
