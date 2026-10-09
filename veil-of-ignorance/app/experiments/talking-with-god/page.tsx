"use client";
import { useState, type CSSProperties, type ReactNode } from "react";
import Link from "next/link";
import Nav from "@/app/components/Nav";
import Footer from "@/app/components/Footer";
import { Reveal } from "@/components/experiment/Reveal";
import {
  nodes,
  START,
  MAX_SWINGS,
  positions,
  horns,
  type Branch,
  type NodeId,
  type Next,
  type Option,
  type PositionId,
  type ResponseKind,
} from "@/experiments/talking-with-god/config";

/* ─── Types & helpers ─── */
interface Step {
  nodeId: NodeId;
  option: Option;
}

interface Pending {
  step: Step;
  next: Next;
}

const kindLabel: Record<ResponseKind, string> = {
  cost: "the price of that answer",
  contradiction: "a contradiction",
  regress: "a regress",
  ending: "the end of the conversation",
};

const swingsOf = (trail: Step[]) =>
  trail.filter(s => s.option.response?.kind === "contradiction").length;

function resolvePosition(trail: Step[]): PositionId {
  const last = trail[trail.length - 1];
  if (last?.option.response?.kind === "ending") return "declined";
  if (swingsOf(trail) >= MAX_SWINGS) return "pendulum";
  const lastBranch = [...trail].reverse().find(s => s.option.branch)?.option.branch;
  return lastBranch ?? "pendulum";
}

const outlineButton: CSSProperties = {
  fontFamily: "var(--mono)", fontSize: "0.6rem", letterSpacing: "0.12em",
  color: "var(--ink)", border: "1px solid var(--ink)", padding: "0.75rem 1.6rem",
  backgroundColor: "transparent", cursor: "pointer", transition: "all 0.2s",
};

function OutlineButton({ onClick, children }: { onClick: () => void; children: ReactNode }) {
  return (
    <button
      onClick={onClick}
      style={outlineButton}
      onMouseEnter={e => { e.currentTarget.style.backgroundColor = "var(--ink)"; e.currentTarget.style.color = "var(--white)"; }}
      onMouseLeave={e => { e.currentTarget.style.backgroundColor = "transparent"; e.currentTarget.style.color = "var(--ink)"; }}
    >
      {children}
    </button>
  );
}

function ProgressBar({ progress }: { progress: number }) {
  return (
    <div style={{ position: "fixed", top: "3rem", left: 0, right: 0, height: "1px", backgroundColor: "var(--border)", zIndex: 99 }}>
      <div style={{ height: "100%", backgroundColor: "var(--ink)", width: `${progress * 100}%`, transition: "width 0.6s ease" }} />
    </div>
  );
}

/* ─── Intro ─── */
function IntroScreen({ onStart }: { onStart: () => void }) {
  return (
    <div style={{ maxWidth: "700px", margin: "0 auto", padding: "9rem 2.2rem 11rem" }}>
      <Reveal>
        <p style={{ fontFamily: "var(--mono)", fontSize: "0.52rem", letterSpacing: "0.2em", color: "var(--muted)", marginBottom: "3rem" }}>
          talking with god
        </p>
      </Reveal>
      <Reveal delay={80}>
        <h1 style={{ fontFamily: "var(--serif)", fontSize: "clamp(1.8rem, 4.5vw, 3.2rem)", fontWeight: 400, fontStyle: "italic", lineHeight: 1.05, color: "var(--ink)", marginBottom: "3rem", letterSpacing: "-0.02em" }}>
          Is an action good because God commands it, or does God command it because it is good?
        </h1>
      </Reveal>
      <Reveal delay={140}>
        <div style={{ height: "1px", backgroundColor: "var(--border)", marginBottom: "3rem" }} />
      </Reveal>
      <Reveal delay={180}>
        <p style={{ fontFamily: "var(--serif)", fontSize: "1rem", fontWeight: 300, lineHeight: 2.0, color: "var(--ink)", marginBottom: "2rem", maxWidth: "58ch" }}>
          Plato put this question in the mouth of Socrates almost twenty-four centuries ago, and it has not gone away. In this conversation you will answer it for a God who is all-powerful, all-knowing and perfectly good, and see what each answer costs you.
        </p>
      </Reveal>
      <Reveal delay={220}>
        <p style={{ fontFamily: "var(--serif)", fontSize: "1rem", fontWeight: 300, lineHeight: 2.0, color: "var(--muted)", fontStyle: "italic", marginBottom: "4rem", maxWidth: "52ch" }}>
          There is no correct answer. Every answer has consequences, and some will contradict what you said before. Notice where you get pushed.
        </p>
      </Reveal>
      <Reveal delay={260}>
        <div style={{ marginBottom: "3rem" }}>
          {[
            ["format", "a branching conversation"],
            ["length", "about four questions"],
            ["origin", "Plato, Euthyphro"],
            ["what it explores", "the foundations of morality"],
          ].map(([k, v]) => (
            <div key={k} style={{ display: "grid", gridTemplateColumns: "180px 1fr", borderTop: "1px solid var(--border)", padding: "0.6rem 0" }}>
              <span style={{ fontFamily: "var(--mono)", fontSize: "0.5rem", letterSpacing: "0.1em", color: "var(--muted)" }}>{k}</span>
              <span style={{ fontFamily: "var(--mono)", fontSize: "0.5rem", letterSpacing: "0.06em", color: "var(--ink)" }}>{v}</span>
            </div>
          ))}
          <div style={{ borderTop: "1px solid var(--border)" }} />
        </div>
      </Reveal>
      <Reveal delay={300}>
        <OutlineButton onClick={onStart}>(begin)</OutlineButton>
      </Reveal>
    </div>
  );
}

/* ─── A question ─── */
function QuestionScreen({
  nodeId, progress, onChoose,
}: {
  nodeId: NodeId;
  progress: number;
  onChoose: (option: Option) => void;
}) {
  const [chosen, setChosen] = useState<number | null>(null);
  const node = nodes[nodeId];

  const handle = (i: number) => {
    if (chosen !== null) return;
    setChosen(i);
    setTimeout(() => onChoose(node.options[i]), 450);
  };

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "center", maxWidth: "700px", margin: "0 auto", padding: "6rem 1.8rem" }}>
      <ProgressBar progress={progress} />

      <p style={{ fontFamily: "var(--mono)", fontSize: "0.52rem", letterSpacing: "0.2em", color: "var(--muted)", marginBottom: "2rem" }}>
        {node.step}
      </p>

      <h2 style={{ fontFamily: "var(--serif)", fontSize: "clamp(1.3rem, 3vw, 1.9rem)", fontWeight: 400, lineHeight: 1.4, color: "var(--ink)", marginBottom: "4rem", maxWidth: "52ch" }}>
        {node.prompt}
      </h2>

      <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
        {node.options.map((opt, i) => {
          const isChosen = chosen === i;
          const isDimmed = chosen !== null && !isChosen;
          return (
            <button
              key={opt.label}
              onClick={() => handle(i)}
              style={{
                textAlign: "left", padding: "1.2rem 1.4rem",
                backgroundColor: isChosen ? "var(--ink)" : "transparent",
                border: `1px solid ${isChosen ? "var(--ink)" : "var(--border)"}`,
                color: isChosen ? "var(--white)" : "var(--ink)",
                fontFamily: "var(--serif)", fontSize: "1rem", fontStyle: "italic", lineHeight: 1.5,
                cursor: chosen !== null ? "default" : "pointer",
                opacity: isDimmed ? 0.2 : 1, transition: "all 0.25s ease",
              }}
              onMouseEnter={e => { if (chosen === null) { e.currentTarget.style.borderColor = "var(--ink)"; e.currentTarget.style.backgroundColor = "var(--hover)"; } }}
              onMouseLeave={e => { if (chosen === null) { e.currentTarget.style.borderColor = "var(--border)"; e.currentTarget.style.backgroundColor = "transparent"; } }}
            >
              {opt.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}

/* ─── What your answer costs you ─── */
function ResponseScreen({
  pending, progress, onContinue,
}: {
  pending: Pending;
  progress: number;
  onContinue: () => void;
}) {
  const { step, next } = pending;
  const response = step.option.response;
  if (!response) return null;

  const buttonLabel =
    next === "results" ? "(see where you stand)" : "(continue)";

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "center", maxWidth: "700px", margin: "0 auto", padding: "6rem 1.8rem" }}>
      <ProgressBar progress={progress} />

      <Reveal>
        <p style={{ fontFamily: "var(--mono)", fontSize: "0.52rem", letterSpacing: "0.2em", color: "#B01C1C", marginBottom: "2rem" }}>
          {kindLabel[response.kind]}
        </p>
      </Reveal>

      <Reveal delay={60}>
        <p style={{ fontFamily: "var(--serif)", fontSize: "0.9rem", fontStyle: "italic", color: "var(--muted)", lineHeight: 1.7, marginBottom: "2.4rem", maxWidth: "54ch", borderLeft: "1px solid var(--border)", paddingLeft: "1.2rem" }}>
          You said: {step.option.label}
        </p>
      </Reveal>

      <Reveal delay={120}>
        <h2 style={{ fontFamily: "var(--serif)", fontSize: "clamp(1.5rem, 3.5vw, 2.3rem)", fontWeight: 400, fontStyle: "italic", lineHeight: 1.15, color: "var(--ink)", marginBottom: "2rem", letterSpacing: "-0.01em" }}>
          {response.title}
        </h2>
      </Reveal>

      <Reveal delay={180}>
        <p style={{ fontFamily: "var(--serif)", fontSize: "1.05rem", fontWeight: 300, lineHeight: 1.95, color: "var(--ink)", marginBottom: "3.5rem", maxWidth: "58ch" }}>
          {response.explanation}
        </p>
      </Reveal>

      <Reveal delay={240}>
        <div>
          <OutlineButton onClick={onContinue}>{buttonLabel}</OutlineButton>
        </div>
      </Reveal>
    </div>
  );
}

/* ─── The shape of the dilemma (after the attached diagram) ─── */
function MapBox({
  children, note, highlighted = false, dashed = false, strong = false,
}: {
  children: ReactNode;
  note?: string;
  highlighted?: boolean;
  dashed?: boolean;
  strong?: boolean;
}) {
  return (
    <div style={{
      flex: 1,
      padding: "0.9rem 0.8rem",
      textAlign: "center",
      border: `${strong || highlighted ? 2 : 1}px ${dashed ? "dashed" : "solid"} ${highlighted || strong ? "var(--ink)" : "var(--border)"}`,
      backgroundColor: highlighted ? "var(--hover)" : "transparent",
      transition: "all 0.3s ease",
    }}>
      <p style={{ fontFamily: "var(--serif)", fontSize: "0.92rem", fontStyle: "italic", color: "var(--ink)", lineHeight: 1.35 }}>
        {children}
      </p>
      {note && (
        <p style={{ fontFamily: "var(--mono)", fontSize: "0.44rem", letterSpacing: "0.06em", color: "var(--muted)", marginTop: "0.45rem", lineHeight: 1.5 }}>
          ({note})
        </p>
      )}
    </div>
  );
}

function Arrow() {
  return (
    <p aria-hidden style={{ textAlign: "center", fontFamily: "var(--mono)", fontSize: "0.7rem", color: "var(--muted)", lineHeight: 1, margin: "0.5rem 0" }}>↓</p>
  );
}

function DilemmaMap({ highlight }: { highlight?: Branch }) {
  return (
    <div style={{ maxWidth: "520px" }}>
      <MapBox strong>Does God control morality, or does morality control him?</MapBox>
      <Arrow />
      <div style={{ display: "flex", gap: "0.8rem" }}>
        <MapBox note={horns.A.note} highlighted={highlight === "A"}>{horns.A.short}</MapBox>
        <MapBox note={horns.B.note} highlighted={highlight === "B"}>{horns.B.short}</MapBox>
      </div>
      <Arrow />
      <MapBox dashed>“Neither. Morality is God’s nature.”</MapBox>
      <Arrow />
      <div style={{ display: "flex", gap: "0.8rem" }}>
        <MapBox note={horns.A.note}>God controls his own nature</MapBox>
        <MapBox note={horns.B.note}>God’s nature controls him</MapBox>
      </div>
      <Arrow />
      <MapBox dashed>“Morality is in God’s character.”</MapBox>
      <p aria-hidden style={{ textAlign: "center", fontFamily: "var(--mono)", fontSize: "0.8rem", color: "var(--muted)", lineHeight: 1.1, margin: "0.7rem 0 0.4rem" }}>
        ·<br />·<br />·
      </p>
      <p style={{ textAlign: "center", fontFamily: "var(--mono)", fontSize: "0.46rem", letterSpacing: "0.12em", color: "var(--muted)" }}>
        (infinite regress)
      </p>
    </div>
  );
}

/* ─── Results ─── */
function ResultsScreen({ trail, onRetry }: { trail: Step[]; onRetry: () => void }) {
  const positionId = resolvePosition(trail);
  const position = positions[positionId];
  const swings = swingsOf(trail);
  const finalBranch: Branch | undefined =
    positionId === "A" || positionId === "B" ? positionId : undefined;

  return (
    <div style={{ maxWidth: "700px", margin: "0 auto", padding: "9rem 2.2rem 11rem" }}>
      <Reveal>
        <p style={{ fontFamily: "var(--mono)", fontSize: "0.52rem", letterSpacing: "0.2em", color: "var(--muted)", marginBottom: "3rem" }}>
          where you stand
        </p>
      </Reveal>

      <Reveal delay={60}>
        <h1 style={{ fontFamily: "var(--serif)", fontSize: "clamp(2rem, 5vw, 3.4rem)", fontWeight: 400, fontStyle: "italic", lineHeight: 1.05, color: "var(--ink)", marginBottom: "0.9rem", letterSpacing: "-0.02em" }}>
          {position.name}
        </h1>
        <p style={{ fontFamily: "var(--mono)", fontSize: "0.5rem", letterSpacing: "0.12em", color: "#B01C1C", marginBottom: "2.5rem" }}>
          {position.tradition}
        </p>
      </Reveal>

      <Reveal delay={120}>
        <div style={{ height: "1px", backgroundColor: "var(--border)", marginBottom: "2.5rem" }} />
        <p style={{ fontFamily: "var(--serif)", fontSize: "1.05rem", fontWeight: 300, lineHeight: 1.95, color: "var(--ink)", marginBottom: swings > 0 ? "1.4rem" : "4rem", maxWidth: "58ch" }}>
          {position.description}
        </p>
        {swings > 0 && (
          <p style={{ fontFamily: "var(--serif)", fontSize: "0.95rem", fontStyle: "italic", color: "var(--muted)", lineHeight: 1.8, marginBottom: "4rem", maxWidth: "54ch" }}>
            You changed horns {swings === 1 ? "once" : `${swings} times`} along the way.
          </p>
        )}
      </Reveal>

      <Reveal delay={160}>
        <div style={{ marginBottom: "4.5rem" }}>
          <p style={{ fontFamily: "var(--mono)", fontSize: "0.5rem", letterSpacing: "0.15em", color: "var(--muted)", marginBottom: "1.2rem" }}>
            your conversation
          </p>
          {trail.map((s, i) => (
            <div key={i} style={{ display: "grid", gridTemplateColumns: "36px 1fr", gap: "0.8rem", borderTop: "1px solid var(--border)", padding: "1rem 0", alignItems: "baseline" }}>
              <span style={{ fontFamily: "var(--mono)", fontSize: "0.48rem", letterSpacing: "0.1em", color: "#B01C1C" }}>
                {String(i + 1).padStart(2, "0")}
              </span>
              <div>
                <p style={{ fontFamily: "var(--mono)", fontSize: "0.44rem", letterSpacing: "0.1em", color: "var(--muted)", marginBottom: "0.4rem" }}>
                  {nodes[s.nodeId].step}
                </p>
                <p style={{ fontFamily: "var(--serif)", fontSize: "0.95rem", fontStyle: "italic", color: "var(--ink)", lineHeight: 1.6, marginBottom: s.option.response ? "0.4rem" : 0 }}>
                  {s.option.label}
                </p>
                {s.option.response && (
                  <p style={{ fontFamily: "var(--mono)", fontSize: "0.44rem", letterSpacing: "0.06em", color: "var(--muted)" }}>
                    → {s.option.response.title.toLowerCase()}
                  </p>
                )}
              </div>
            </div>
          ))}
          <div style={{ borderTop: "1px solid var(--border)" }} />
        </div>
      </Reveal>

      <Reveal delay={200}>
        <div style={{ marginBottom: "4.5rem" }}>
          <p style={{ fontFamily: "var(--mono)", fontSize: "0.5rem", letterSpacing: "0.15em", color: "var(--muted)", marginBottom: "1.6rem" }}>
            the shape of the problem
          </p>
          <DilemmaMap highlight={finalBranch} />
          <p style={{ fontFamily: "var(--serif)", fontSize: "0.9rem", fontStyle: "italic", color: "var(--muted)", lineHeight: 1.8, marginTop: "1.8rem", maxWidth: "54ch" }}>
            Calling goodness part of God’s nature does not escape the dilemma. It moves it one level down, where the same two questions wait.
          </p>
        </div>
      </Reveal>

      <Reveal delay={240}>
        <div style={{ display: "flex", gap: "1.2rem", flexWrap: "wrap", borderTop: "1px solid var(--border)", paddingTop: "3rem" }}>
          <OutlineButton onClick={onRetry}>(have the conversation again)</OutlineButton>
          <Link href="/experiments" style={{
            fontFamily: "var(--mono)", fontSize: "0.55rem", letterSpacing: "0.1em",
            color: "var(--muted)", textDecoration: "none",
            borderBottom: "1px solid transparent", paddingBottom: "1px", transition: "all 0.2s",
            alignSelf: "center",
          }}
          onMouseEnter={e => { e.currentTarget.style.color = "var(--ink)"; e.currentTarget.style.borderColor = "var(--ink)"; }}
          onMouseLeave={e => { e.currentTarget.style.color = "var(--muted)"; e.currentTarget.style.borderColor = "transparent"; }}>
            all experiments →
          </Link>
        </div>
      </Reveal>
    </div>
  );
}

/* ─── ROOT ─── */
export default function TalkingWithGodPage() {
  const [started, setStarted] = useState(false);
  const [nodeId, setNodeId] = useState<NodeId>(START);
  const [trail, setTrail] = useState<Step[]>([]);
  const [pending, setPending] = useState<Pending | null>(null);
  const [done, setDone] = useState(false);

  const go = (next: Next) => {
    if (next === "results") setDone(true);
    else setNodeId(next);
  };

  const choose = (option: Option) => {
    const step: Step = { nodeId, option };
    const newTrail = [...trail, step];
    // Too many changes of horn: the conversation stops and calls it a draw.
    const next: Next = swingsOf(newTrail) >= MAX_SWINGS ? "results" : option.next;
    setTrail(newTrail);
    if (option.response) setPending({ step, next });
    else go(next);
  };

  const continueFromResponse = () => {
    if (!pending) return;
    const { next } = pending;
    setPending(null);
    go(next);
  };

  const restart = () => {
    setStarted(false);
    setNodeId(START);
    setTrail([]);
    setPending(null);
    setDone(false);
  };

  // A rough guide: most conversations take four or five turns.
  const progress = Math.min(trail.length / 6, 0.92);

  const showFooter = !started || done;

  return (
    <div style={{ backgroundColor: "var(--white)", minHeight: "100vh" }}>
      <Nav />
      <div style={{ paddingTop: "3rem" }}>
        {!started && <IntroScreen onStart={() => setStarted(true)} />}

        {started && !done && !pending && (
          <QuestionScreen
            key={`${nodeId}-${trail.length}`}
            nodeId={nodeId}
            progress={progress}
            onChoose={choose}
          />
        )}

        {started && !done && pending && (
          <ResponseScreen
            key={`response-${trail.length}`}
            pending={pending}
            progress={progress}
            onContinue={continueFromResponse}
          />
        )}

        {started && done && <ResultsScreen trail={trail} onRetry={restart} />}
      </div>
      {showFooter && <Footer />}
    </div>
  );
}
