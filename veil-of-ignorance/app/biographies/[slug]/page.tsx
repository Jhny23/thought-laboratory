"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { biographies } from "@/app/data/biographies";
import Nav from "@/app/components/Nav";
import Footer from "@/app/components/Footer";

function Reveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.08, rootMargin: "0px 0px -30px 0px" }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div ref={ref} style={{
      opacity: visible ? 1 : 0,
      transform: visible ? "translateY(0)" : "translateY(16px)",
      transition: `opacity 1000ms ease ${delay}ms, transform 1000ms ease ${delay}ms`,
    }}>
      {children}
    </div>
  );
}

export default function BiographyPage({ params }: { params: { slug: string } }) {
  const bio = biographies.find(b => b.slug === params.slug);
  const [entered, setEntered] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setEntered(true), 60);
    return () => clearTimeout(t);
  }, []);

  if (!bio) return null;

  const imageInsertAt = [1, 3];

  return (
    <div style={{
      backgroundColor: "#F5F2EC",
      minHeight: "100vh",
      opacity: entered ? 1 : 0,
      transform: entered ? "translateY(0)" : "translateY(20px)",
      transition: "opacity 1000ms ease, transform 1000ms ease",
    }}>
      <Nav />

      <div style={{ paddingTop: "3rem" }}>

        {/* Hero */}
        <div style={{
          padding: "8rem 1.8rem 7rem",
          maxWidth: "700px",
          margin: "0 auto",
        }}>
          <p style={{
            fontFamily: "var(--mono)", fontSize: "0.52rem",
            letterSpacing: "0.2em", color: "var(--muted)",
            marginBottom: "4rem",
          }}>
            <Link href="/biographies" style={{
              color: "var(--muted)", textDecoration: "none",
              borderBottom: "1px solid transparent",
              transition: "border-color 0.2s",
            }}
            onMouseEnter={e => e.currentTarget.style.borderColor = "var(--muted)"}
            onMouseLeave={e => e.currentTarget.style.borderColor = "transparent"}
            >
              biographies
            </Link>
            {" "}·{" "}
            <span style={{ color: "var(--ink)" }}>{bio.name}</span>
          </p>

          <h1 style={{
            fontFamily: "var(--serif)",
            fontSize: "clamp(3rem, 7vw, 6.5rem)",
            fontWeight: 300,
            lineHeight: 0.9,
            letterSpacing: "-0.02em",
            color: "#1C1C1C",
            marginBottom: "3rem",
          }}>
            {bio.name}
          </h1>

          <div style={{
            height: "1px",
            backgroundColor: "#E9E2D8",
            marginBottom: "2.5rem",
          }} />

          <p style={{
            fontFamily: "var(--serif)",
            fontSize: "clamp(1rem, 1.5vw, 1.15rem)",
            fontWeight: 400, fontStyle: "italic",
            color: "#B6A99A",
            marginBottom: "0.8rem",
            lineHeight: 1.5,
          }}>
            {bio.descriptor}
          </p>

          <p style={{
            fontFamily: "var(--mono)", fontSize: "0.52rem",
            letterSpacing: "0.1em", color: "#B6A99A",
          }}>
            {bio.location} · {bio.years}
          </p>
        </div>

        {/* Portrait */}
        <Reveal>
          <div style={{
            maxWidth: "700px", margin: "0 auto",
            padding: "0 1.8rem",
            marginBottom: "8rem",
          }}>
            <div style={{
              width: "100%", aspectRatio: "3 / 2",
              backgroundColor: "#DCCFC2",
              overflow: "hidden", position: "relative",
            }}>
              <div style={{
                position: "absolute", inset: 0,
                backgroundImage: `url(${bio.portrait})`,
                backgroundSize: "cover",
                backgroundPosition: "center top",
                opacity: 0.85,
              }} />
            </div>
            <p style={{
              fontFamily: "var(--mono)", fontSize: "0.48rem",
              letterSpacing: "0.12em", color: "#B6A99A",
              marginTop: "0.8rem",
            }}>
              {bio.name} · {bio.years}
            </p>
          </div>
        </Reveal>

        {/* Content */}
        <div style={{
          maxWidth: "700px", margin: "0 auto",
          padding: "0 1.8rem 10rem",
        }}>
          {bio.sections.map((section, i) => (
            <div key={i}>
              <Reveal delay={i * 30}>
                <div style={{ marginBottom: "6rem" }}>
                  <p style={{
                    fontFamily: "var(--mono)", fontSize: "0.52rem",
                    letterSpacing: "0.15em", color: "#B6A99A",
                    marginBottom: "1.6rem",
                  }}>
                    {String(i + 1).padStart(2, "0")}
                  </p>

                  <h2 style={{
                    fontFamily: "var(--serif)",
                    fontSize: "clamp(1.2rem, 2vw, 1.7rem)",
                    fontWeight: 400,
                    lineHeight: 1.25,
                    color: "#1C1C1C",
                    marginBottom: "2rem",
                    maxWidth: "52ch",
                  }}>
                    {section.question}
                  </h2>

                  <p style={{
                    fontFamily: "var(--serif)",
                    fontSize: "1rem",
                    fontWeight: 300,
                    lineHeight: 1.9,
                    color: "#1C1C1C",
                    maxWidth: "65ch",
                  }}>
                    {section.answer}
                  </p>
                </div>
              </Reveal>

              {imageInsertAt.includes(i) && bio.images[imageInsertAt.indexOf(i)] && (
                <Reveal>
                  <div style={{ marginBottom: "8rem" }}>
                    <div style={{
                      width: "100%", aspectRatio: "4 / 3",
                      backgroundColor: "#E9E2D8",
                      overflow: "hidden", position: "relative",
                    }}>
                      <div style={{
                        position: "absolute", inset: 0,
                        backgroundImage: `url(${bio.images[imageInsertAt.indexOf(i)]})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        opacity: 0.8,
                      }} />
                    </div>
                  </div>
                </Reveal>
              )}
            </div>
          ))}

          {/* Related experiment */}
          <Reveal>
            <div style={{
              marginTop: "4rem",
              paddingTop: "3rem",
              borderTop: "1px solid #E9E2D8",
            }}>
              <p style={{
                fontFamily: "var(--mono)", fontSize: "0.52rem",
                letterSpacing: "0.15em", color: "var(--muted)",
                marginBottom: "1.4rem",
              }}>
                related experiment
              </p>
              <Link href={`/experiments/${bio.experimentSlug}`} style={{
                display: "flex", justifyContent: "space-between",
                alignItems: "baseline", textDecoration: "none",
                padding: "1rem 0",
                borderTop: "1px solid #E9E2D8",
                borderBottom: "1px solid #E9E2D8",
                transition: "opacity 0.2s",
              }}
              onMouseEnter={e => e.currentTarget.style.opacity = "0.5"}
              onMouseLeave={e => e.currentTarget.style.opacity = "1"}
              >
                <span style={{
                  fontFamily: "var(--serif)", fontSize: "1.1rem",
                  fontStyle: "italic", color: "var(--ink)",
                }}>
                  {bio.experiment}
                </span>
                <span style={{
                  fontFamily: "var(--mono)", fontSize: "0.5rem",
                  letterSpacing: "0.1em", color: "var(--muted)",
                }}>
                  (enter experiment)
                </span>
              </Link>
            </div>
          </Reveal>

          {/* Other biographies */}
          <Reveal>
            <div style={{ marginTop: "6rem" }}>
              <p style={{
                fontFamily: "var(--mono)", fontSize: "0.52rem",
                letterSpacing: "0.15em", color: "var(--muted)",
                marginBottom: "1rem",
              }}>
                other biographies
              </p>
              {biographies.filter(b => b.slug !== bio.slug).map(b => (
                <Link key={b.slug} href={`/biographies/${b.slug}`} style={{
                  display: "grid", gridTemplateColumns: "1fr auto",
                  padding: "0.75rem 0",
                  borderTop: "1px solid #E9E2D8",
                  alignItems: "baseline",
                  textDecoration: "none",
                  transition: "opacity 0.2s",
                }}
                onMouseEnter={e => e.currentTarget.style.opacity = "0.5"}
                onMouseLeave={e => e.currentTarget.style.opacity = "1"}
                >
                  <span style={{
                    fontFamily: "var(--serif)", fontSize: "0.95rem",
                    fontStyle: "italic", color: "var(--ink)",
                  }}>
                    {b.name}
                  </span>
                  <span style={{
                    fontFamily: "var(--mono)", fontSize: "0.48rem",
                    letterSpacing: "0.08em", color: "var(--muted)",
                  }}>
                    {b.descriptor}
                  </span>
                </Link>
              ))}
              <div style={{ borderTop: "1px solid #E9E2D8" }} />
            </div>
          </Reveal>
        </div>
      </div>

      <Footer />
    </div>
  );
}