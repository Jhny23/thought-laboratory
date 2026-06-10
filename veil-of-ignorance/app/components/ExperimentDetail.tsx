"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { experiments, veilQuestions, getProfile } from "@/app/data/experiments";
import Nav from "@/app/components/Nav";
import Footer from "@/app/components/Footer";
import Link from "next/link";

type Stage = "detail" | "ritual" | "question" | "result";

/* ── Ritual ── */
function Ritual({ onComplete }: { onComplete: () => void }) {
  const lines = ["Close your eyes.", "You exist—", "But not as anyone yet.", "Step forward."];
  const [i, setI] = useState(0);

  useState(() => {
    const tick = () => {
      setI(n => {
        if (n < lines.length - 1) {
          setTimeout(tick, 1600);
          return n + 1;
        } else {
          setTimeout(onComplete, 1200);
          return n;
        }
      });
    };
    setTimeout(tick, 900);
  });

  return (
    <div style={{
      position: "fixed", inset: 0, zIndex: 200,
      backgroundColor: "var(--ink)",
      display: "flex", alignItems: "center", justifyContent: "center",
    }}>
      <AnimatePresence mode="wait">
        <motion.p
          key={i}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.7 }}
          style={{
            fontFamily: "var(--serif)",
            fontSize: "clamp(1.4rem, 3vw, 2rem)",
            fontWeight: 400,
            fontStyle: i % 2 === 1 ? "italic" : "normal",
            color: "var(--white)",
            letterSpacing: "0.01em",
          }}
        >
          {lines[i]}
        </motion.p>
      </AnimatePresence>
    </div>
  );
}

/* ── Question ── */
function QuestionScreen({
  question, onAnswer, index, total,
}: {
  question: typeof veilQuestions[0];
  onAnswer: (v: number) => void;
  index: number; total: number;
}) {
  const [chosen, setChosen] = useState<string | null>(null);

  const handle = (value: number, id: string) => {
    if (chosen) return;
    setChosen(id);
    setTimeout(() => onAnswer(value), 500);
  };

  return (
    <motion.div
      key={question.id}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
      style={{ minHeight: "100vh", backgroundColor: "var(--white)" }}
    >
      <Nav />
      {/* Progress */}
      <div style={{ position: "fixed", top: "3rem", left: 0, right: 0, height: "1px", backgroundColor: "var(--border)", zIndex: 99 }}>
        <motion.div
          animate={{ width: `${((index + 1) / total) * 100}%` }}
          transition={{ duration: 0.6 }}
          style={{ height: "100%", backgroundColor: "var(--ink)" }}
        />
      </div>

      <div style={{
        maxWidth: "680px", margin: "0 auto",
        padding: "8rem 1.8rem 4rem",
      }}>
        <p style={{
          fontFamily: "var(--mono)", fontSize: "0.55rem",
          letterSpacing: "0.15em", color: "var(--muted)",
          marginBottom: "2rem",
        }}>
          {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")} — {question.domain}
        </p>

        <h2 style={{
          fontFamily: "var(--serif)",
          fontSize: "clamp(1.5rem, 3.5vw, 2.2rem)",
          fontWeight: 400, fontStyle: "italic",
          lineHeight: 1.25, color: "var(--ink)",
          marginBottom: "0.8rem",
        }}>
          {question.prompt}
        </h2>

        <p style={{
          fontFamily: "var(--serif)", fontSize: "0.95rem",
          color: "var(--muted)", lineHeight: 1.7,
          marginBottom: "2.8rem",
        }}>
          {question.subtext}
        </p>

        <div style={{ display: "flex", flexDirection: "column", gap: "1px", backgroundColor: "var(--border)" }}>
          {question.choices.map((choice, ci) => {
            const isChosen = chosen === choice.id;
            const isDimmed = chosen && !isChosen;
            return (
              <motion.button
                key={choice.id}
                animate={{ opacity: isDimmed ? 0.25 : 1 }}
                transition={{ duration: 0.3 }}
                onClick={() => handle(choice.value, choice.id)}
                style={{
                  textAlign: "left",
                  padding: "1.2rem 1.4rem",
                  backgroundColor: isChosen ? "var(--off)" : "var(--white)",
                  display: "grid",
                  gridTemplateColumns: "1.8rem 1fr",
                  gap: "0.8rem",
                  alignItems: "start",
                  cursor: chosen ? "default" : "pointer",
                  transition: "background-color 0.2s",
                  borderLeft: isChosen ? "2px solid var(--ink)" : "2px solid transparent",
                }}
                onMouseEnter={e => { if (!chosen) e.currentTarget.style.backgroundColor = "var(--hover)"; }}
                onMouseLeave={e => { if (!chosen) e.currentTarget.style.backgroundColor = "var(--white)"; }}
              >
                <span style={{
                  fontFamily: "var(--mono)", fontSize: "0.5rem",
                  letterSpacing: "0.1em", color: "var(--muted)",
                  paddingTop: "0.2rem",
                }}>
                  {String.fromCharCode(97 + ci)}
                </span>
                <div>
                  <p style={{
                    fontFamily: "var(--serif)", fontSize: "1rem",
                    fontWeight: 400, lineHeight: 1.3,
                    marginBottom: "0.2rem", color: "var(--ink)",
                  }}>
                    {choice.label}
                  </p>
                  <p style={{
                    fontFamily: "var(--serif)", fontSize: "0.82rem",
                    fontStyle: "italic", color: "var(--muted)", lineHeight: 1.5,
                  }}>
                    {choice.sub}
                  </p>
                </div>
              </motion.button>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
}

/* ── Result ── */
function ResultScreen({ scores, onRestart }: { scores: number[]; onRestart: () => void }) {
  const avg = scores.reduce((a, b) => a + b, 0) / scores.length;
  const profile = getProfile(avg);
  const domains = ["wealth", "healthcare", "education", "justice", "freedom", "labour"];

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "var(--white)" }}>
      <Nav />
      <div style={{ maxWidth: "680px", margin: "0 auto", padding: "8rem 1.8rem 6rem" }}>

        <p style={{
          fontFamily: "var(--mono)", fontSize: "0.55rem",
          letterSpacing: "0.15em", color: "var(--muted)", marginBottom: "1.8rem",
        }}>
          your society — result
        </p>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          style={{
            fontFamily: "var(--serif)",
            fontSize: "clamp(2.5rem, 7vw, 4.5rem)",
            fontWeight: 400, fontStyle: "italic",
            lineHeight: 0.95, color: "var(--ink)",
            marginBottom: "2rem",
          }}
        >
          {profile.label}
        </motion.h2>

        <div style={{ height: "1px", backgroundColor: "var(--border)", marginBottom: "2rem" }} />

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          style={{
            fontFamily: "var(--serif)", fontSize: "1.05rem",
            fontWeight: 400, lineHeight: 1.85,
            color: "var(--ink)", marginBottom: "3rem",
          }}
        >
          {profile.description}
        </motion.p>

        {/* Spectrum */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          style={{ marginBottom: "3rem" }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.5rem" }}>
            <span style={{ fontFamily: "var(--mono)", fontSize: "0.5rem", letterSpacing: "0.1em", color: "var(--muted)" }}>egalitarian</span>
            <span style={{ fontFamily: "var(--mono)", fontSize: "0.5rem", letterSpacing: "0.1em", color: "var(--muted)" }}>libertarian</span>
          </div>
          <div style={{ height: "1px", backgroundColor: "var(--border)", position: "relative", marginBottom: "2rem" }}>
            <motion.div
              initial={{ left: "50%" }}
              animate={{ left: `${avg}%` }}
              transition={{ delay: 0.8, duration: 1, ease: [0.22, 1, 0.36, 1] }}
              style={{
                position: "absolute", top: "-4px",
                width: "9px", height: "9px",
                backgroundColor: "var(--ink)",
                transform: "translateX(-50%) rotate(45deg)",
              }}
            />
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "0.8rem" }}>
            {scores.map((s, i) => (
              <div key={i} style={{
                display: "grid", gridTemplateColumns: "90px 1fr",
                gap: "1.2rem", alignItems: "center",
              }}>
                <span style={{ fontFamily: "var(--mono)", fontSize: "0.48rem", letterSpacing: "0.1em", color: "var(--muted)" }}>
                  {domains[i]}
                </span>
                <div style={{ height: "1px", backgroundColor: "var(--border)", position: "relative" }}>
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${s}%` }}
                    transition={{ delay: 0.9 + i * 0.07, duration: 0.6 }}
                    style={{ height: "1px", backgroundColor: "var(--ink)" }}
                  />
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Quote block */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          style={{
            borderLeft: "1px solid var(--ink)",
            paddingLeft: "1.2rem",
            marginBottom: "3.5rem",
          }}
        >
          <p style={{
            fontFamily: "var(--serif)", fontSize: "0.95rem",
            fontStyle: "italic", color: "var(--ink)",
            lineHeight: 1.8, marginBottom: "0.5rem",
          }}>
            "{profile.quote}"
          </p>
          <p style={{
            fontFamily: "var(--mono)", fontSize: "0.5rem",
            letterSpacing: "0.1em", color: "var(--muted)",
          }}>
            — {profile.thinker}
          </p>
        </motion.div>

        <div style={{ display: "flex", gap: "1.2rem", alignItems: "center" }}>
          <button
            onClick={onRestart}
            style={{
              fontFamily: "var(--mono)", fontSize: "0.58rem",
              letterSpacing: "0.12em", color: "var(--muted)",
              padding: "0", backgroundColor: "transparent",
              border: "none", cursor: "pointer",
              borderBottom: "1px solid var(--border)",
              paddingBottom: "1px",
              transition: "color 0.2s, border-color 0.2s",
            }}
            onMouseEnter={e => {
              e.currentTarget.style.color = "var(--ink)";
              e.currentTarget.style.borderColor = "var(--ink)";
            }}
            onMouseLeave={e => {
              e.currentTarget.style.color = "var(--muted)";
              e.currentTarget.style.borderColor = "var(--border)";
            }}
          >
            (try again)
          </button>
          <Link href="/" style={{
            fontFamily: "var(--mono)", fontSize: "0.58rem",
            letterSpacing: "0.12em", color: "var(--muted)",
            borderBottom: "1px solid var(--border)",
            paddingBottom: "1px",
          }}>
            (all experiments)
          </Link>
        </div>
      </div>
      <Footer />
    </div>
  );
}

/* ── Main experiment detail page ── */
export default function ExperimentDetail({ slug }: { slug: string }) {
  const exp = experiments.find(e => e.slug === slug);
  const [stage, setStage] = useState<Stage>("detail");
  const [qIndex, setQIndex] = useState(0);
  const [scores, setScores] = useState<number[]>([]);
  const [imgIndex, setImgIndex] = useState(0);

  if (!exp) return null;

  const handleAnswer = (value: number) => {
    const next = [...scores, value];
    setScores(next);
    if (qIndex + 1 >= veilQuestions.length) setStage("result");
    else setQIndex(i => i + 1);
  };

  if (stage === "ritual") return <Ritual onComplete={() => setStage("question")} />;
  if (stage === "question") return (
    <AnimatePresence mode="wait">
      <QuestionScreen
        key={`q-${qIndex}`}
        question={veilQuestions[qIndex]}
        onAnswer={handleAnswer}
        index={qIndex}
        total={veilQuestions.length}
      />
    </AnimatePresence>
  );
  if (stage === "result") return (
    <ResultScreen scores={scores} onRestart={() => { setScores([]); setQIndex(0); setStage("detail"); }} />
  );

  /* ── Detail page — Metamorphoses object layout ── */
  const thumbCount = 4;

  return (
    <div style={{ backgroundColor: "var(--white)", minHeight: "100vh" }}>
      <Nav />
      <div style={{ paddingTop: "3rem" }}>
        <div style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          minHeight: "calc(100vh - 3rem)",
          borderBottom: "1px solid var(--border)",
        }}>

          {/* LEFT — image panel with thumbnails */}
          <div style={{
            borderRight: "1px solid var(--border)",
            display: "grid",
            gridTemplateColumns: "52px 1fr",
            position: "sticky", top: "3rem",
            height: "calc(100vh - 3rem)",
          }}>
            {/* Thumbnail strip */}
            <div style={{
              borderRight: "1px solid var(--border)",
              display: "flex", flexDirection: "column",
              padding: "0.8rem 0",
              gap: "0",
              overflow: "auto",
            }}>
              {Array.from({ length: thumbCount }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => setImgIndex(i)}
                  style={{
                    width: "100%", aspectRatio: "1",
                    backgroundColor: i === imgIndex ? "var(--off)" : "var(--white)",
                    border: "none", borderBottom: "1px solid var(--border)",
                    cursor: "pointer", padding: "8px",
                    transition: "background-color 0.2s",
                  }}
                >
                  <div style={{
                    width: "100%", height: "100%",
                    backgroundColor: i % 2 === 0 ? "#CCCAC6" : exp.hue,
                    display: "flex", alignItems: "center", justifyContent: "center",
                  }}>
                    <span style={{
                      fontFamily: "var(--mono)", fontSize: "0.4rem",
                      color: "rgba(0,0,0,0.3)", letterSpacing: "0.1em",
                    }}>
                      ({i + 1})
                    </span>
                  </div>
                </button>
              ))}
            </div>

            {/* Main image */}
            <div style={{
              backgroundColor: imgIndex % 2 === 0 ? "#CCCAC6" : exp.hue,
              display: "flex", alignItems: "center", justifyContent: "center",
              transition: "background-color 0.4s ease",
            }}>
              <svg viewBox="0 0 200 200" style={{ width: "40%", opacity: 0.25 }}>
                <circle cx="100" cy="100" r="70" stroke="var(--ink)" strokeWidth="1.5" fill="none" />
                <circle cx="100" cy="100" r="40" stroke="var(--ink)" strokeWidth="0.8" fill="none" />
                <line x1="100" y1="30" x2="100" y2="170" stroke="var(--ink)" strokeWidth="0.6" />
                <line x1="30" y1="100" x2="170" y2="100" stroke="var(--ink)" strokeWidth="0.6" />
              </svg>
            </div>
          </div>

          {/* RIGHT — metadata + CTA */}
          <div style={{ padding: "2.5rem 2rem", overflow: "auto" }}>
            <p style={{
              fontFamily: "var(--mono)", fontSize: "0.58rem",
              letterSpacing: "0.1em", color: "var(--muted)",
              marginBottom: "0.5rem",
            }}>
              {exp.thinker}
            </p>

            <h1 style={{
              fontFamily: "var(--serif)",
              fontSize: "clamp(1.6rem, 3.5vw, 2.4rem)",
              fontWeight: 400, fontStyle: "italic",
              lineHeight: 1.1, color: "var(--ink)",
              marginBottom: "0.4rem",
            }}>
              {exp.name}
            </h1>

            <p style={{
              fontFamily: "var(--mono)", fontSize: "0.55rem",
              letterSpacing: "0.08em", color: "var(--muted)",
              marginBottom: "2.5rem",
            }}>
              {exp.year}
            </p>

            {/* Metadata table — like Metamorphoses edition/material/colour */}
            <div style={{ marginBottom: "2.5rem" }}>
              {[
                ["domain", exp.domain],
                ["duration", exp.duration],
                ["status", exp.status],
                ["process", "(click to explore the experiment)"],
              ].map(([k, v]) => (
                <div key={k} style={{
                  display: "grid", gridTemplateColumns: "90px 1fr",
                  borderTop: "1px solid var(--border)",
                  padding: "0.6rem 0",
                }}>
                  <span style={{ fontFamily: "var(--mono)", fontSize: "0.52rem", letterSpacing: "0.08em", color: "var(--muted)" }}>
                    {k}
                  </span>
                  <span style={{ fontFamily: "var(--mono)", fontSize: "0.52rem", letterSpacing: "0.06em", color: "var(--ink)" }}>
                    {v}
                  </span>
                </div>
              ))}
              <div style={{ borderTop: "1px solid var(--border)" }} />
            </div>

            <p style={{
              fontFamily: "var(--serif)", fontSize: "0.95rem",
              lineHeight: 1.85, color: "var(--ink)",
              marginBottom: "1.2rem",
            }}>
              {exp.description}
            </p>

            <p style={{
              fontFamily: "var(--serif)", fontSize: "0.85rem",
              fontStyle: "italic", lineHeight: 1.8,
              color: "var(--muted)", marginBottom: "3rem",
            }}>
              {exp.subtext}
            </p>

            {/* CTA buttons in parentheses — exactly Metamorphoses */}
            <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
              {exp.status === "available" ? (
                <>
                  <button
                    onClick={() => setStage("ritual")}
                    style={{
                      fontFamily: "var(--mono)", fontSize: "0.6rem",
                      letterSpacing: "0.12em", color: "var(--ink)",
                      border: "1px solid var(--ink)", padding: "0.65rem 1.4rem",
                      backgroundColor: "transparent", cursor: "pointer",
                      transition: "all 0.2s",
                    }}
                    onMouseEnter={e => {
                      e.currentTarget.style.backgroundColor = "var(--ink)";
                      e.currentTarget.style.color = "var(--white)";
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.backgroundColor = "transparent";
                      e.currentTarget.style.color = "var(--ink)";
                    }}
                  >
                    (begin experiment)
                  </button>
                  <button
                    style={{
                      fontFamily: "var(--mono)", fontSize: "0.6rem",
                      letterSpacing: "0.12em", color: "var(--muted)",
                      border: "1px solid var(--border)", padding: "0.65rem 1.4rem",
                      backgroundColor: "transparent", cursor: "pointer",
                      transition: "border-color 0.2s",
                    }}
                    onMouseEnter={e => e.currentTarget.style.borderColor = "var(--ink)"}
                    onMouseLeave={e => e.currentTarget.style.borderColor = "var(--border)"}
                  >
                    (share)
                  </button>
                </>
              ) : (
                <p style={{
                  fontFamily: "var(--mono)", fontSize: "0.58rem",
                  letterSpacing: "0.1em", color: "var(--muted)",
                }}>
                  (coming soon — subscribe for release dates)
                </p>
              )}
            </div>

            {/* Related experiments */}
            <div style={{ marginTop: "4rem", paddingTop: "2rem", borderTop: "1px solid var(--border)" }}>
              <p style={{
                fontFamily: "var(--mono)", fontSize: "0.55rem",
                letterSpacing: "0.12em", color: "var(--muted)",
                marginBottom: "1.2rem",
              }}>
                related experiments
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: "0" }}>
                {experiments.filter(e => e.slug !== slug).slice(0, 3).map(e => (
                  <Link key={e.slug} href={`/experiments/${e.slug}`} style={{
                    display: "grid", gridTemplateColumns: "1fr auto",
                    padding: "0.7rem 0",
                    borderTop: "1px solid var(--border)",
                    alignItems: "baseline",
                  }}
                  onMouseEnter={ev => (ev.currentTarget.style.opacity = "0.6")}
                  onMouseLeave={ev => (ev.currentTarget.style.opacity = "1")}
                  >
                    <span style={{ fontFamily: "var(--serif)", fontSize: "0.9rem", fontStyle: "italic" }}>
                      {e.name}
                    </span>
                    <span style={{ fontFamily: "var(--mono)", fontSize: "0.5rem", letterSpacing: "0.08em", color: "var(--muted)" }}>
                      {e.thinker}
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
