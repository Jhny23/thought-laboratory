"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Nav from "@/app/components/Nav";
import Footer from "@/app/components/Footer";
import { questions, outcomes, archetypes, type Answer } from "@/experiments/battleground-god/config";
import { LightningHit, BulletBite, PhilosophyConfetti, ThinkingDots } from "@/app/components/MicroIllustrations";

/* ─── Reveal ─── */
function Reveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.05 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return (
    <div ref={ref} style={{
      opacity: visible ? 1 : 0,
      transform: visible ? "translateY(0)" : "translateY(14px)",
      transition: `opacity 900ms ease ${delay}ms, transform 900ms ease ${delay}ms`,
    }}>
      {children}
    </div>
  );
}

/* ─── Stickman health indicator ─── */
function Stickman({ hits }: { hits: number }) {
  const hurt = hits > 0;
  const dead = hits >= 3;
  return (
    <svg viewBox="0 0 40 60" width="32" height="48" style={{ display: "block" }}>
      {/* Head */}
      <circle cx="20" cy="8" r="6" fill="none" stroke={dead ? "#B01C1C" : hurt ? "#8C5A00" : "var(--ink)"} strokeWidth="1.5" />
      {/* Body */}
      <line x1="20" y1="14" x2="20" y2="36"
        stroke={dead ? "#B01C1C" : "var(--ink)"} strokeWidth="1.5"
        transform={hurt ? "rotate(12 20 25)" : ""} />
      {/* Arms */}
      {dead ? (
        <>
          <line x1="20" y1="20" x2="8" y2="30" stroke="#B01C1C" strokeWidth="1.5" />
          <line x1="20" y1="20" x2="32" y2="30" stroke="#B01C1C" strokeWidth="1.5" />
        </>
      ) : (
        <>
          <line x1="20" y1="20" x2="8" y2="26" stroke="var(--ink)" strokeWidth="1.5" />
          <line x1="20" y1="20" x2="32" y2="26" stroke="var(--ink)" strokeWidth="1.5" />
        </>
      )}
      {/* Legs */}
      {dead ? (
        <>
          <line x1="20" y1="36" x2="10" y2="52" stroke="#B01C1C" strokeWidth="1.5" transform="rotate(20 20 36)" />
          <line x1="20" y1="36" x2="30" y2="52" stroke="#B01C1C" strokeWidth="1.5" transform="rotate(-15 20 36)" />
        </>
      ) : (
        <>
          <line x1="20" y1="36" x2="13" y2="52" stroke="var(--ink)" strokeWidth="1.5" />
          <line x1="20" y1="36" x2="27" y2="52" stroke="var(--ink)" strokeWidth="1.5" />
        </>
      )}
      {/* Hit marker */}
      {hits > 0 && (
        <text x="28" y="6" fontSize="10" fill="#B01C1C" fontFamily="var(--mono)">✕</text>
      )}
    </svg>
  );
}

/* ─── Intro ─── */
function Intro({ onStart }: { onStart: () => void }) {
  return (
    <div style={{ maxWidth: "700px", margin: "0 auto", padding: "9rem 2.2rem 11rem" }}>
      <Reveal>
        <p style={{ fontFamily: "var(--mono)", fontSize: "0.5rem", letterSpacing: "0.22em", color: "var(--muted)", marginBottom: "3.5rem" }}>
          battleground god
        </p>
      </Reveal>
      <Reveal delay={80}>
        <h1 style={{ fontFamily: "var(--serif)", fontSize: "clamp(1.8rem, 4.5vw, 3.2rem)", fontWeight: 400, fontStyle: "italic", lineHeight: 1.1, color: "var(--ink)", marginBottom: "3.5rem", letterSpacing: "-0.02em" }}>
          Can your beliefs about God make it across the battlefield?
        </h1>
      </Reveal>
      <Reveal delay={140}>
        <div style={{ width: "48px", height: "1px", backgroundColor: "var(--border)", marginBottom: "3.5rem" }} />
      </Reveal>
      <Reveal delay={180}>
        <p style={{ fontFamily: "var(--serif)", fontSize: "1.05rem", lineHeight: 2.0, color: "var(--ink)", marginBottom: "2rem", maxWidth: "54ch" }}>
          You'll be asked eighteen questions about God and religion. Apart from the first question, each requires a True or False answer. The aim is not to judge whether your answers are correct — the battleground is one of rational consistency.
        </p>
      </Reveal>
      <Reveal delay={220}>
        <p style={{ fontFamily: "var(--serif)", fontSize: "1rem", lineHeight: 2.0, color: "var(--muted)", fontStyle: "italic", marginBottom: "3.5rem", maxWidth: "50ch" }}>
          To cross unscathed, your answers must not contradict each other. If they do, you take a direct hit. If they are consistent but lead to uncomfortable conclusions, you bite a bullet.
        </p>
      </Reveal>
      <Reveal delay={260}>
        <div style={{ marginBottom: "3.5rem" }}>
          {[
            ["direct hit", "your answers directly contradict each other"],
            ["bite a bullet", "your answers are consistent but have unpalatable implications"],
            ["questions", "18"],
            ["format", "true / false (+ don't know on Q1)"],
          ].map(([k, v]) => (
            <div key={k} style={{ display: "grid", gridTemplateColumns: "130px 1fr", borderTop: "1px solid var(--border)", padding: "0.75rem 0" }}>
              <span style={{ fontFamily: "var(--mono)", fontSize: "0.48rem", letterSpacing: "0.1em", color: "var(--muted)" }}>{k}</span>
              <span style={{ fontFamily: "var(--serif)", fontSize: "0.88rem", fontStyle: "italic", color: "var(--ink)" }}>{v}</span>
            </div>
          ))}
          <div style={{ borderTop: "1px solid var(--border)" }} />
        </div>
      </Reveal>
      <Reveal delay={300}>
        <button onClick={onStart} style={{
          fontFamily: "var(--mono)", fontSize: "0.58rem", letterSpacing: "0.12em",
          color: "var(--ink)", border: "1px solid var(--ink)", padding: "0.85rem 1.8rem",
          backgroundColor: "transparent", cursor: "pointer", transition: "all 0.3s",
        }}
        onMouseEnter={e => { e.currentTarget.style.backgroundColor = "var(--ink)"; e.currentTarget.style.color = "var(--white)"; }}
        onMouseLeave={e => { e.currentTarget.style.backgroundColor = "transparent"; e.currentTarget.style.color = "var(--ink)"; }}>
          (enter the battlefield)
        </button>
      </Reveal>
    </div>
  );
}

/* ─── Question screen ─── */
function QuestionScreen({
  index, answers, hits, bullets, onAnswer,
}: {
  index: number;
  answers: Record<number, Answer>;
  hits: number; bullets: number;
  onAnswer: (a: Answer) => void;
}) {
  const [chosen, setChosen] = useState<Answer | null>(null);
  const q = questions[index];
  const progress = (index / questions.length) * 100;

  const handle = (a: Answer) => {
    if (chosen) return;
    setChosen(a);
    setTimeout(() => onAnswer(a), 480);
  };

  const opts = q.allowDontKnow
    ? [{ label: "true", val: "true" as Answer }, { label: "false", val: "false" as Answer }, { label: "don't know", val: "dontknow" as Answer }]
    : [{ label: "true", val: "true" as Answer }, { label: "false", val: "false" as Answer }];

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "center", maxWidth: "700px", margin: "0 auto", padding: "6rem 2.2rem" }}>
      {/* Progress bar */}
      <div style={{ position: "fixed", top: "3rem", left: 0, right: 0, height: "1px", backgroundColor: "var(--border)", zIndex: 99 }}>
        <div style={{ height: "100%", backgroundColor: "var(--ink)", width: `${progress}%`, transition: "width 0.6s ease" }} />
      </div>

      {/* Health bar */}
      <div style={{ position: "fixed", top: "4.5rem", right: "2rem", zIndex: 98, display: "flex", flexDirection: "column", alignItems: "center", gap: "0.3rem" }}>
        <Stickman hits={hits} />
        <div style={{ display: "flex", gap: "0.8rem" }}>
          <span style={{ fontFamily: "var(--mono)", fontSize: "0.42rem", letterSpacing: "0.1em", color: hits > 0 ? "#B01C1C" : "var(--muted)" }}>
            {hits} hit{hits !== 1 ? "s" : ""}
          </span>
          <span style={{ fontFamily: "var(--mono)", fontSize: "0.42rem", letterSpacing: "0.1em", color: bullets > 0 ? "#8C5A00" : "var(--muted)" }}>
            {bullets} bullet{bullets !== 1 ? "s" : ""}
          </span>
        </div>
      </div>

      <p style={{ fontFamily: "var(--mono)", fontSize: "0.5rem", letterSpacing: "0.2em", color: "var(--muted)", marginBottom: "1.2rem" }}>
        question {String(index + 1).padStart(2, "0")} / {String(questions.length).padStart(2, "0")}
      </p>
      {/* Footprint progress */}
      <div style={{ display: "flex", gap: "4px", marginBottom: "2rem", flexWrap: "wrap", maxWidth: "240px" }}>
        {Array.from({ length: questions.length }).map((_, i) => (
          <span key={i} className={i <= index ? "footprint-active" : ""} style={{
            fontSize: "9px", opacity: i < index ? 0.35 : i === index ? 0.7 : 0.1,
            transition: "opacity 0.4s",
          }}>👣</span>
        ))}
      </div>

      <h2 style={{ fontFamily: "var(--serif)", fontSize: "clamp(1.2rem, 3vw, 1.8rem)", fontWeight: 400, lineHeight: 1.5, color: "var(--ink)", marginBottom: "4rem", maxWidth: "52ch" }}>
        {q.text}
      </h2>

      <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
        {opts.map(opt => {
          const isChosen = chosen === opt.val;
          const isDimmed = chosen !== null && !isChosen;
          return (
            <button key={opt.val} onClick={() => handle(opt.val)} style={{
              textAlign: "left", padding: "1.2rem 1.4rem",
              backgroundColor: isChosen ? "var(--ink)" : "transparent",
              border: `1px solid ${isChosen ? "var(--ink)" : "var(--border)"}`,
              color: isChosen ? "var(--white)" : "var(--ink)",
              fontFamily: "var(--serif)", fontSize: "1rem", fontStyle: "italic",
              cursor: chosen ? "default" : "pointer",
              opacity: isDimmed ? 0.2 : 1, transition: "all 0.25s ease",
            }}
            className="answer-btn"
            data-emoji={opt.val === "true" ? "✝️" : opt.val === "false" ? "🤨" : "🌫️"}
            onMouseEnter={e => { if (!chosen) { e.currentTarget.style.borderColor = "var(--ink)"; } }}
            onMouseLeave={e => { if (!chosen) { e.currentTarget.style.borderColor = "var(--border)"; } }}>
              {opt.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}

/* ─── Mid-battle response ─── */
function BattleResponse({
  outcome, onContinue,
}: {
  outcome: { type: "hit" | "bullet"; title: string; explanation: string } | null;
  onContinue: () => void;
}) {
  const isHit = outcome?.type === "hit";
  const isBullet = outcome?.type === "bullet";

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "center", maxWidth: "700px", margin: "0 auto", padding: "6rem 2.2rem" }}>
      {outcome && (
        <div style={{ marginBottom: "2.5rem" }}>
          <div style={{
            display: "inline-flex", alignItems: "center", gap: "0.7rem",
            padding: "0.5rem 1rem",
            border: `1px solid ${isHit ? "#B01C1C" : "#8C5A00"}`,
            marginBottom: "2rem",
          }}>
            {isHit ? <LightningHit active={true} /> : <BulletBite active={true} />}
            <span style={{
              fontFamily: "var(--mono)", fontSize: "0.5rem", letterSpacing: "0.14em",
              color: isHit ? "#B01C1C" : "#8C5A00",
              textTransform: "uppercase",
            }}>
              {isHit ? "direct hit!" : "bullet bitten"}
            </span>
          </div>
          <h2 style={{ fontFamily: "var(--serif)", fontSize: "clamp(1.3rem, 3vw, 2rem)", fontWeight: 400, fontStyle: "italic", lineHeight: 1.3, color: "var(--ink)", marginBottom: "2rem" }}>
            {outcome.title}
          </h2>
          <p style={{ fontFamily: "var(--serif)", fontSize: "1rem", lineHeight: 2.0, color: "var(--ink)", maxWidth: "54ch" }}>
            {outcome.explanation}
          </p>
        </div>
      )}

      <button onClick={onContinue} style={{
        fontFamily: "var(--mono)", fontSize: "0.58rem", letterSpacing: "0.12em",
        color: "var(--ink)", border: "1px solid var(--ink)", padding: "0.85rem 1.8rem",
        backgroundColor: "transparent", cursor: "pointer", transition: "all 0.3s",
        alignSelf: "flex-start", marginTop: "1.5rem",
      }}
      onMouseEnter={e => { e.currentTarget.style.backgroundColor = "var(--ink)"; e.currentTarget.style.color = "var(--white)"; }}
      onMouseLeave={e => { e.currentTarget.style.backgroundColor = "transparent"; e.currentTarget.style.color = "var(--ink)"; }}>
        (press on)
      </button>
    </div>
  );
}

/* ─── Results ─── */
function Results({
  answers, hitList, bulletList, onRetry,
}: {
  answers: Record<number, Answer>;
  hitList: typeof outcomes;
  bulletList: typeof outcomes;
  onRetry: () => void;
}) {
  const damage = hitList.length * 2 + bulletList.length;
  const maxDamage = 15;
  const score = Math.max(0, Math.round(((maxDamage - damage) / maxDamage) * 100));
  const archetype = [...archetypes].reverse().find(a => score >= a.minScore) ?? archetypes[archetypes.length - 1];
  const perfect = hitList.length === 0 && bulletList.length === 0;

  return (
    <div style={{ maxWidth: "700px", margin: "0 auto", padding: "9rem 2.2rem 11rem" }}>
      <PhilosophyConfetti active={perfect} />
      <Reveal>
        <p style={{ fontFamily: "var(--mono)", fontSize: "0.5rem", letterSpacing: "0.22em", color: "var(--muted)", marginBottom: "3.5rem" }}>
          your results
        </p>
      </Reveal>
      <Reveal delay={60}>
        <h2 style={{ fontFamily: "var(--serif)", fontSize: "clamp(2rem, 6vw, 4rem)", fontWeight: 400, fontStyle: "italic", lineHeight: 0.95, color: "var(--ink)", marginBottom: "1rem", letterSpacing: "-0.02em" }}>
          {score}% coherent
        </h2>
      </Reveal>
      <Reveal delay={100}>
        <div style={{ display: "flex", gap: "2rem", marginBottom: "3rem" }}>
          <span style={{ fontFamily: "var(--mono)", fontSize: "0.52rem", letterSpacing: "0.1em", color: hitList.length > 0 ? "#B01C1C" : "var(--muted)" }}>
            {hitList.length} direct hit{hitList.length !== 1 ? "s" : ""}
          </span>
          <span style={{ fontFamily: "var(--mono)", fontSize: "0.52rem", letterSpacing: "0.1em", color: bulletList.length > 0 ? "#8C5A00" : "var(--muted)" }}>
            {bulletList.length} bullet{bulletList.length !== 1 ? "s" : ""} bitten
          </span>
        </div>
      </Reveal>

      {/* Score bar */}
      <Reveal delay={130}>
        <div style={{ marginBottom: "4rem" }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.6rem" }}>
            <span style={{ fontFamily: "var(--mono)", fontSize: "0.48rem", color: "var(--muted)" }}>0%</span>
            <span style={{ fontFamily: "var(--mono)", fontSize: "0.48rem", color: "var(--muted)" }}>coherence rating</span>
            <span style={{ fontFamily: "var(--mono)", fontSize: "0.48rem", color: "var(--muted)" }}>100%</span>
          </div>
          <div style={{ height: "1px", backgroundColor: "var(--border)", position: "relative", marginBottom: "1.5rem" }}>
            <div style={{ position: "absolute", top: "-4px", left: `${score}%`, width: "9px", height: "9px", backgroundColor: "var(--ink)", transform: "translateX(-50%) rotate(45deg)" }} />
          </div>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <span style={{ fontFamily: "var(--mono)", fontSize: "0.48rem", color: "var(--ink)" }}>you: {score}%</span>
          </div>
        </div>
      </Reveal>

      {/* Archetype */}
      <Reveal delay={170}>
        <div style={{ borderLeft: "1px solid var(--border)", paddingLeft: "1.4rem", marginBottom: "4rem" }}>
          <p style={{ fontFamily: "var(--mono)", fontSize: "0.46rem", letterSpacing: "0.14em", color: "var(--muted)", marginBottom: "0.5rem" }}>
            your philosopher
          </p>
          <p style={{ fontFamily: "var(--serif)", fontSize: "1.2rem", fontStyle: "italic", color: "var(--ink)", marginBottom: "0.6rem" }}>
            {archetype.name}
          </p>
          <p style={{ fontFamily: "var(--serif)", fontSize: "0.9rem", lineHeight: 1.85, color: "var(--muted)" }}>
            {archetype.description}
          </p>
        </div>
      </Reveal>

      {/* Scoring key */}
      <Reveal delay={200}>
        <div style={{ marginBottom: "4rem" }}>
          <p style={{ fontFamily: "var(--mono)", fontSize: "0.46rem", letterSpacing: "0.14em", color: "var(--muted)", marginBottom: "1.2rem" }}>
            how it's calculated
          </p>
          {[
            ["direct hit", "−2 points each"],
            ["bullet bitten", "−1 point each"],
            ["maximum damage", "15 points"],
          ].map(([k, v]) => (
            <div key={k} style={{ display: "grid", gridTemplateColumns: "130px 1fr", borderTop: "1px solid var(--border)", padding: "0.6rem 0" }}>
              <span style={{ fontFamily: "var(--mono)", fontSize: "0.46rem", letterSpacing: "0.08em", color: "var(--muted)" }}>{k}</span>
              <span style={{ fontFamily: "var(--mono)", fontSize: "0.46rem", letterSpacing: "0.06em", color: "var(--ink)" }}>{v}</span>
            </div>
          ))}
          <div style={{ borderTop: "1px solid var(--border)" }} />
        </div>
      </Reveal>

      {/* Hits detail */}
      {hitList.length > 0 && (
        <Reveal delay={240}>
          <div style={{ marginBottom: "3.5rem" }}>
            <p style={{ fontFamily: "var(--mono)", fontSize: "0.46rem", letterSpacing: "0.14em", color: "#B01C1C", marginBottom: "1.8rem" }}>
              your direct hits
            </p>
            {hitList.map((h, i) => (
              <div key={h.id} style={{ marginBottom: "2.5rem", paddingLeft: "1.4rem", borderLeft: "1px solid #B01C1C" }}>
                <p style={{ fontFamily: "var(--serif)", fontSize: "0.95rem", fontStyle: "italic", color: "var(--ink)", marginBottom: "0.6rem" }}>
                  {h.title}
                </p>
                <p style={{ fontFamily: "var(--serif)", fontSize: "0.88rem", lineHeight: 1.85, color: "var(--muted)" }}>
                  {h.explanation}
                </p>
              </div>
            ))}
          </div>
        </Reveal>
      )}

      {/* Bullets detail */}
      {bulletList.length > 0 && (
        <Reveal delay={280}>
          <div style={{ marginBottom: "3.5rem" }}>
            <p style={{ fontFamily: "var(--mono)", fontSize: "0.46rem", letterSpacing: "0.14em", color: "#8C5A00", marginBottom: "1.8rem" }}>
              your bitten bullets
            </p>
            {bulletList.map((b, i) => (
              <div key={b.id} style={{ marginBottom: "2.5rem", paddingLeft: "1.4rem", borderLeft: "1px solid #8C5A00" }}>
                <p style={{ fontFamily: "var(--serif)", fontSize: "0.95rem", fontStyle: "italic", color: "var(--ink)", marginBottom: "0.6rem" }}>
                  {b.title}
                </p>
                <p style={{ fontFamily: "var(--serif)", fontSize: "0.88rem", lineHeight: 1.85, color: "var(--muted)" }}>
                  {b.explanation}
                </p>
              </div>
            ))}
          </div>
        </Reveal>
      )}

      {hitList.length === 0 && bulletList.length === 0 && (
        <Reveal delay={240}>
          <p style={{ fontFamily: "var(--serif)", fontSize: "1rem", fontStyle: "italic", lineHeight: 2.0, color: "var(--ink)", marginBottom: "3.5rem", maxWidth: "52ch" }}>
            You crossed the battlefield unscathed. Your beliefs about God are internally consistent — whether or not they are correct is another question entirely.
          </p>
        </Reveal>
      )}

      <Reveal delay={320}>
        <div style={{ display: "flex", gap: "1.5rem", flexWrap: "wrap", borderTop: "1px solid var(--border)", paddingTop: "3rem" }}>
          <button onClick={onRetry} style={{
            fontFamily: "var(--mono)", fontSize: "0.58rem", letterSpacing: "0.12em",
            color: "var(--ink)", border: "1px solid var(--ink)", padding: "0.85rem 1.8rem",
            backgroundColor: "transparent", cursor: "pointer", transition: "all 0.3s",
          }}
          onMouseEnter={e => { e.currentTarget.style.backgroundColor = "var(--ink)"; e.currentTarget.style.color = "var(--white)"; }}
          onMouseLeave={e => { e.currentTarget.style.backgroundColor = "transparent"; e.currentTarget.style.color = "var(--ink)"; }}>
            (try again)
          </button>
          <Link href="/experiments" style={{
            fontFamily: "var(--mono)", fontSize: "0.52rem", letterSpacing: "0.1em",
            color: "var(--muted)", textDecoration: "none",
            borderBottom: "1px solid transparent", paddingBottom: "2px", transition: "all 0.3s",
            alignSelf: "center",
          }}
          onMouseEnter={e => { e.currentTarget.style.color = "var(--ink)"; e.currentTarget.style.borderColor = "var(--muted)"; }}
          onMouseLeave={e => { e.currentTarget.style.color = "var(--muted)"; e.currentTarget.style.borderColor = "transparent"; }}>
            all experiments →
          </Link>
        </div>
      </Reveal>
    </div>
  );
}

/* ─── ROOT ─── */
type Stage = "intro" | "question" | "response" | "results";

export default function BattlegroundGodPage() {
  const [stage, setStage] = useState<Stage>("intro");
  const [qIndex, setQIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, Answer>>({});
  const [currentOutcome, setCurrentOutcome] = useState<typeof outcomes[0] | null>(null);
  const [hitList, setHitList] = useState<typeof outcomes>([]);
  const [bulletList, setBulletList] = useState<typeof outcomes>([]);

  const checkOutcomes = (newAnswers: Record<number, Answer>) => {
    const triggered: typeof outcomes[0][] = [];
    for (const o of outcomes) {
      if (o.condition(newAnswers)) {
        const alreadySeen = hitList.find(h => h.id === o.id) || bulletList.find(b => b.id === o.id);
        if (!alreadySeen) triggered.push(o);
      }
    }
    return triggered;
  };

  const handleAnswer = (a: Answer) => {
    const qId = questions[qIndex].id;
    const newAnswers = { ...answers, [qId]: a };
    setAnswers(newAnswers);

    const triggered = checkOutcomes(newAnswers);
    const newHits = triggered.filter(o => o.type === "hit");
    const newBullets = triggered.filter(o => o.type === "bullet");

    if (newHits.length > 0) setHitList(prev => [...prev, ...newHits]);
    if (newBullets.length > 0) setBulletList(prev => [...prev, ...newBullets]);

    const latestOutcome = triggered[triggered.length - 1] ?? null;
    setCurrentOutcome(latestOutcome);

    if (qIndex + 1 >= questions.length) {
      if (latestOutcome) {
        setStage("response");
      } else {
        setStage("results");
      }
    } else if (latestOutcome) {
      setStage("response");
    } else {
      setQIndex(i => i + 1);
      // stay on question stage
    }
  };

  const handleContinue = () => {
    if (qIndex + 1 >= questions.length) {
      setStage("results");
    } else {
      setQIndex(i => i + 1);
      setStage("question");
    }
  };

  const restart = () => {
    setStage("intro");
    setQIndex(0);
    setAnswers({});
    setHitList([]);
    setBulletList([]);
    setCurrentOutcome(null);
  };

  const showFooter = stage === "intro" || stage === "results";

  return (
    <div style={{ backgroundColor: "var(--white)", minHeight: "100vh" }}>
      <Nav />
      <div style={{ paddingTop: "3rem" }}>
        {stage === "intro" && <Intro onStart={() => setStage("question")} />}
        {stage === "question" && (
          <QuestionScreen
            key={qIndex}
            index={qIndex}
            answers={answers}
            hits={hitList.length}
            bullets={bulletList.length}
            onAnswer={handleAnswer}
          />
        )}
        {stage === "response" && (
          <BattleResponse outcome={currentOutcome} onContinue={handleContinue} />
        )}
        {stage === "results" && (
          <Results answers={answers} hitList={hitList} bulletList={bulletList} onRetry={restart} />
        )}
      </div>
      {showFooter && <Footer />}
    </div>
  );
}
