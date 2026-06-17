"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Nav from "@/app/components/Nav";
import Footer from "@/app/components/Footer";

/* ─── DATA ─── */
const preliminary = [
  { id: "torture", text: "Torture, as a matter of principle, is always morally wrong.", avgYes: 60 },
  { id: "maximise", text: "The morality of an action is determined by whether it maximises total happiness compared with the alternatives.", avgYes: 43 },
  { id: "causedeath", text: "It is always wrong to cause another person's death, if they wish to stay alive, when this is avoidable.", avgYes: 52 },
  { id: "saveinnocent", text: "If you can save innocent lives without reducing total happiness or risking your own life, you are morally obliged to do so.", avgYes: 76 },
];

type ScenarioChoice = { label: string; killCount: string };

const scenarios: {
  id: string;
  title: string;
  intro?: string;
  text: string;
  choices: [ScenarioChoice, ScenarioChoice]; // [action, inaction]
  avgAction: number;
}[] = [
  {
    id: "divert",
    title: "The Runaway Train",
    text: "A train's brakes have failed. Five people are on the track ahead, with no way to escape in time. A side track leads off to the right, with one person standing on it. The driver can divert the train onto the siding, killing one — or do nothing, and let it continue toward the five.",
    choices: [
      { label: "Divert the train", killCount: "1 dead" },
      { label: "Let it continue", killCount: "5 dead" },
    ],
    avgAction: 83,
  },
  {
    id: "fatman",
    title: "The Man on the Bridge",
    intro: "Same arithmetic, different mechanism.",
    text: "A train is about to hit five people stuck on the track. You are on a footbridge above the track, standing next to a very large man. The only way to stop the train in time is to push him onto the track — his body would derail it, killing him but saving the five. Or you do nothing, and the five die.",
    choices: [
      { label: "Push him onto the track", killCount: "1 dead" },
      { label: "Do nothing", killCount: "5 dead" },
    ],
    avgAction: 37,
  },
  {
    id: "saboteur",
    title: "The Saboteur",
    intro: "Same bridge. Different person.",
    text: "Same scenario — except this time, the large man on the bridge is the one who sabotaged the train's brakes in the first place, deliberately setting this entire chain of events in motion. Pushing him onto the track will still save the five. Doing nothing will still mean they die.",
    choices: [
      { label: "Push him onto the track", killCount: "1 dead" },
      { label: "Do nothing", killCount: "5 dead" },
    ],
    avgAction: 78,
  },
  {
    id: "torture",
    title: "The Ticking Clock",
    intro: "A different kind of dilemma.",
    text: "The man from the bridge has been arrested. He has hidden a bomb in a city center, set to detonate in 24 hours and kill a million people. He cannot be persuaded or tricked into revealing its location. Experts estimate that torturing him gives a 75% chance of extracting the location in time. Without it, the bomb explodes and a million people die.",
    choices: [
      { label: "Torture him for the location", killCount: "75% chance of saving 1,000,000" },
      { label: "Do not torture him", killCount: "bomb explodes" },
    ],
    avgAction: 83,
  },
];

type Stage = "intro" | "preliminary" | "scenarios" | "results";
type Answers = Record<string, boolean>; // true = yes / action taken

/* ─── Reveal ─── */
function Reveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.05, rootMargin: "0px 0px -30px 0px" }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return (
    <div ref={ref} style={{
      opacity: visible ? 1 : 0,
      transform: visible ? "translateY(0)" : "translateY(14px)",
      transition: `opacity 800ms ease ${delay}ms, transform 800ms ease ${delay}ms`,
    }}>
      {children}
    </div>
  );
}

/* ─── Intro ─── */
function Intro({ onStart }: { onStart: () => void }) {
  return (
    <div style={{ maxWidth: "700px", margin: "0 auto", padding: "8rem 1.8rem 10rem" }}>
      <Reveal>
        <p style={{ fontFamily: "var(--mono)", fontSize: "0.52rem", letterSpacing: "0.2em", color: "var(--muted)", marginBottom: "3rem" }}>
          should you kill the fat man?
        </p>
      </Reveal>
      <Reveal delay={80}>
        <h1 style={{ fontFamily: "var(--serif)", fontSize: "clamp(1.8rem, 4.5vw, 3.2rem)", fontWeight: 400, fontStyle: "italic", lineHeight: 1.05, color: "var(--ink)", marginBottom: "3rem", letterSpacing: "-0.02em" }}>
          A moral dilemma,<br />four different ways
        </h1>
      </Reveal>
      <Reveal delay={140}>
        <div style={{ height: "1px", backgroundColor: "var(--border)", marginBottom: "3rem" }} />
      </Reveal>
      <Reveal delay={180}>
        <p style={{ fontFamily: "var(--serif)", fontSize: "1rem", fontWeight: 300, lineHeight: 1.9, color: "var(--ink)", marginBottom: "1.4rem", maxWidth: "58ch" }}>
          This experiment is built on the trolley problem — first outlined by Philippa Foot, later developed by Judith Jarvis Thomson and others. Before the scenarios, four short questions about how you think morality works in general.
        </p>
      </Reveal>
      <Reveal delay={220}>
        <p style={{ fontFamily: "var(--serif)", fontSize: "1rem", fontWeight: 300, lineHeight: 1.9, color: "var(--muted)", fontStyle: "italic", marginBottom: "4rem", maxWidth: "52ch" }}>
          There are no right answers. What matters is whether your answers to the scenarios actually follow from the principles you say you hold.
        </p>
      </Reveal>
      <Reveal delay={260}>
        <div style={{ marginBottom: "3rem" }}>
          {[["preliminary questions", "4"], ["scenarios", "4"], ["estimated time", "6 minutes"], ["what it measures", "moral consistency"]].map(([k, v]) => (
            <div key={k} style={{ display: "grid", gridTemplateColumns: "180px 1fr", borderTop: "1px solid var(--border)", padding: "0.6rem 0" }}>
              <span style={{ fontFamily: "var(--mono)", fontSize: "0.5rem", letterSpacing: "0.1em", color: "var(--muted)" }}>{k}</span>
              <span style={{ fontFamily: "var(--mono)", fontSize: "0.5rem", letterSpacing: "0.06em", color: "var(--ink)" }}>{v}</span>
            </div>
          ))}
          <div style={{ borderTop: "1px solid var(--border)" }} />
        </div>
      </Reveal>
      <Reveal delay={300}>
        <button onClick={onStart} style={{
          fontFamily: "var(--mono)", fontSize: "0.6rem", letterSpacing: "0.12em",
          color: "var(--ink)", border: "1px solid var(--ink)", padding: "0.75rem 1.6rem",
          backgroundColor: "transparent", cursor: "pointer", transition: "all 0.2s",
        }}
        onMouseEnter={e => { e.currentTarget.style.backgroundColor = "var(--ink)"; e.currentTarget.style.color = "var(--white)"; }}
        onMouseLeave={e => { e.currentTarget.style.backgroundColor = "transparent"; e.currentTarget.style.color = "var(--ink)"; }}>
          (begin)
        </button>
      </Reveal>
    </div>
  );
}

/* ─── Yes/No question (preliminary) ─── */
function YesNoQuestion({
  text, index, total, onAnswer,
}: {
  text: string; index: number; total: number;
  onAnswer: (yes: boolean) => void;
}) {
  const [chosen, setChosen] = useState<boolean | null>(null);
  const handle = (yes: boolean) => {
    if (chosen !== null) return;
    setChosen(yes);
    setTimeout(() => onAnswer(yes), 450);
  };

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "center", maxWidth: "700px", margin: "0 auto", padding: "6rem 1.8rem" }}>
      <div style={{ position: "fixed", top: "3rem", left: 0, right: 0, height: "1px", backgroundColor: "var(--border)", zIndex: 99 }}>
        <div style={{ height: "100%", backgroundColor: "var(--ink)", width: `${(index / total) * 100}%`, transition: "width 0.6s ease" }} />
      </div>

      <p style={{ fontFamily: "var(--mono)", fontSize: "0.52rem", letterSpacing: "0.2em", color: "var(--muted)", marginBottom: "2rem" }}>
        preliminary {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
      </p>

      <h2 style={{ fontFamily: "var(--serif)", fontSize: "clamp(1.3rem, 3vw, 1.9rem)", fontWeight: 400, lineHeight: 1.4, color: "var(--ink)", marginBottom: "4rem", maxWidth: "52ch" }}>
        {text}
      </h2>

      <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
        {[{ label: "yes", value: true }, { label: "no", value: false }].map(opt => {
          const isChosen = chosen === opt.value;
          const isDimmed = chosen !== null && !isChosen;
          return (
            <button key={opt.label} onClick={() => handle(opt.value)} style={{
              textAlign: "left", padding: "1.2rem 1.4rem",
              backgroundColor: isChosen ? "var(--ink)" : "transparent",
              border: `1px solid ${isChosen ? "var(--ink)" : "var(--border)"}`,
              color: isChosen ? "var(--white)" : "var(--ink)",
              fontFamily: "var(--serif)", fontSize: "1rem", fontStyle: "italic",
              cursor: chosen !== null ? "default" : "pointer",
              opacity: isDimmed ? 0.2 : 1, transition: "all 0.25s ease",
            }}
            onMouseEnter={e => { if (chosen === null) { e.currentTarget.style.borderColor = "var(--ink)"; e.currentTarget.style.backgroundColor = "var(--hover)"; } }}
            onMouseLeave={e => { if (chosen === null) { e.currentTarget.style.borderColor = "var(--border)"; e.currentTarget.style.backgroundColor = "transparent"; } }}>
              {opt.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}

/* ─── Scenario ─── */
function Scenario({
  scenario, index, total, onAnswer,
}: {
  scenario: typeof scenarios[0]; index: number; total: number;
  onAnswer: (tookAction: boolean) => void;
}) {
  const [chosen, setChosen] = useState<number | null>(null);
  const handle = (i: number) => {
    if (chosen !== null) return;
    setChosen(i);
    setTimeout(() => onAnswer(i === 0), 500);
  };

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "center", maxWidth: "700px", margin: "0 auto", padding: "6rem 1.8rem" }}>
      <div style={{ position: "fixed", top: "3rem", left: 0, right: 0, height: "1px", backgroundColor: "var(--border)", zIndex: 99 }}>
        <div style={{ height: "100%", backgroundColor: "var(--ink)", width: `${((index + 4) / (total + 4)) * 100}%`, transition: "width 0.6s ease" }} />
      </div>

      <p style={{ fontFamily: "var(--mono)", fontSize: "0.52rem", letterSpacing: "0.2em", color: "var(--muted)", marginBottom: "1.4rem" }}>
        scenario {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
      </p>

      {scenario.intro && (
        <p style={{ fontFamily: "var(--serif)", fontSize: "0.85rem", fontStyle: "italic", color: "var(--muted)", marginBottom: "1.2rem" }}>
          {scenario.intro}
        </p>
      )}

      <h2 style={{ fontFamily: "var(--serif)", fontSize: "clamp(1.5rem, 3.5vw, 2.2rem)", fontWeight: 400, fontStyle: "italic", lineHeight: 1.15, color: "var(--ink)", marginBottom: "1.8rem" }}>
        {scenario.title}
      </h2>

      <p style={{ fontFamily: "var(--serif)", fontSize: "1rem", fontWeight: 300, lineHeight: 1.85, color: "var(--ink)", marginBottom: "3rem", maxWidth: "56ch" }}>
        {scenario.text}
      </p>

      <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
        {scenario.choices.map((choice, i) => {
          const isChosen = chosen === i;
          const isDimmed = chosen !== null && !isChosen;
          return (
            <button key={i} onClick={() => handle(i)} style={{
              textAlign: "left", padding: "1.2rem 1.4rem",
              backgroundColor: isChosen ? "var(--ink)" : "transparent",
              border: `1px solid ${isChosen ? "var(--ink)" : "var(--border)"}`,
              color: isChosen ? "var(--white)" : "var(--ink)",
              cursor: chosen !== null ? "default" : "pointer",
              opacity: isDimmed ? 0.2 : 1, transition: "all 0.25s ease",
              display: "flex", justifyContent: "space-between", alignItems: "baseline",
            }}
            onMouseEnter={e => { if (chosen === null) { e.currentTarget.style.borderColor = "var(--ink)"; e.currentTarget.style.backgroundColor = "var(--hover)"; } }}
            onMouseLeave={e => { if (chosen === null) { e.currentTarget.style.borderColor = "var(--border)"; e.currentTarget.style.backgroundColor = "transparent"; } }}>
              <span style={{ fontFamily: "var(--serif)", fontSize: "1rem", fontStyle: "italic" }}>{choice.label}</span>
              <span style={{ fontFamily: "var(--mono)", fontSize: "0.5rem", letterSpacing: "0.08em", opacity: 0.6 }}>{choice.killCount}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

/* ─── Results ─── */
function Results({ prelim, scenarioAnswers, onRetry }: {
  prelim: Answers;
  scenarioAnswers: Answers;
  onRetry: () => void;
}) {
  // Consistency logic: utilitarian-leaning if "maximise" = yes.
  // If you take action in divert + fatman + saboteur consistently (all same), high consistency.
  // Simplified: consistency = how many of {divert, fatman, saboteur} match each other (all act or all don't),
  // weighted against whether "maximise happiness" belief aligns with that pattern.
  const actionCount = ["divert", "fatman", "saboteur"].filter(k => scenarioAnswers[k]).length;
  const consistency = actionCount === 3 || actionCount === 0 ? 100 : actionCount === 1 || actionCount === 2 ? 50 : 0;

  // Are they utilitarian (maximise=yes) but inconsistent in fatman vs divert?
  const isUtilitarian = prelim["maximise"] === true;
  const divertedButNotFatman = scenarioAnswers["divert"] === true && scenarioAnswers["fatman"] === false;

  const avgConsistency = 66;

  return (
    <div style={{ maxWidth: "700px", margin: "0 auto", padding: "8rem 1.8rem 10rem" }}>
      <Reveal>
        <p style={{ fontFamily: "var(--mono)", fontSize: "0.52rem", letterSpacing: "0.2em", color: "var(--muted)", marginBottom: "3rem" }}>
          your results
        </p>
      </Reveal>

      <Reveal delay={60}>
        <h2 style={{ fontFamily: "var(--serif)", fontSize: "clamp(2rem, 6vw, 4rem)", fontWeight: 400, fontStyle: "italic", lineHeight: 0.95, color: "var(--ink)", marginBottom: "3rem", letterSpacing: "-0.02em" }}>
          {consistency}% consistent
        </h2>
      </Reveal>

      <Reveal delay={100}>
        <div style={{ height: "1px", backgroundColor: "var(--border)", marginBottom: "3rem" }} />
      </Reveal>

      <Reveal delay={140}>
        <div style={{ marginBottom: "4rem" }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.6rem" }}>
            <span style={{ fontFamily: "var(--mono)", fontSize: "0.5rem", letterSpacing: "0.1em", color: "var(--muted)" }}>0%</span>
            <span style={{ fontFamily: "var(--mono)", fontSize: "0.5rem", letterSpacing: "0.1em", color: "var(--muted)" }}>consistency score</span>
            <span style={{ fontFamily: "var(--mono)", fontSize: "0.5rem", letterSpacing: "0.1em", color: "var(--muted)" }}>100%</span>
          </div>
          <div style={{ height: "1px", backgroundColor: "var(--border)", position: "relative", marginBottom: "1.5rem" }}>
            <div style={{ position: "absolute", top: "-4px", left: `${consistency}%`, width: "9px", height: "9px", backgroundColor: "var(--ink)", transform: "translateX(-50%) rotate(45deg)" }} />
            <div style={{ position: "absolute", top: "-3px", left: `${avgConsistency}%`, width: "7px", height: "7px", border: "1px solid var(--muted)", backgroundColor: "transparent", transform: "translateX(-50%) rotate(45deg)" }} />
          </div>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <span style={{ fontFamily: "var(--mono)", fontSize: "0.5rem", letterSpacing: "0.1em", color: "var(--ink)" }}>you: {consistency}%</span>
            <span style={{ fontFamily: "var(--mono)", fontSize: "0.5rem", letterSpacing: "0.1em", color: "var(--muted)" }}>average: {avgConsistency}%</span>
          </div>
        </div>
      </Reveal>

      <Reveal delay={180}>
        <p style={{ fontFamily: "var(--serif)", fontSize: "1rem", fontWeight: 300, lineHeight: 1.9, color: "var(--ink)", marginBottom: "1.4rem", maxWidth: "58ch" }}>
          A consistency score matters because moral judgements that don't follow from any stable principle risk being arbitrary — just intuition, or making it up scenario by scenario. If you'd act in one trolley case but not in a structurally identical one, the question is what morally relevant difference you're tracking.
        </p>
      </Reveal>

      {isUtilitarian && divertedButNotFatman && (
        <Reveal delay={220}>
          <div style={{ borderLeft: "1px solid var(--ink)", paddingLeft: "1.4rem", marginBottom: "3rem" }}>
            <p style={{ fontFamily: "var(--serif)", fontSize: "0.95rem", fontWeight: 300, lineHeight: 1.85, color: "var(--ink)", fontStyle: "italic" }}>
              You said morality is about maximising total happiness — yet you diverted the train but wouldn't push the man off the bridge. Both save five lives at the cost of one. If pure utilitarian arithmetic were really driving your judgement, both cases should land the same way. Something else is doing the work here — probably the difference between killing someone as a side effect versus killing them as the means.
            </p>
          </div>
        </Reveal>
      )}

      {/* Scenario comparison table */}
      <Reveal delay={260}>
        <div style={{ marginBottom: "4rem" }}>
          <p style={{ fontFamily: "var(--mono)", fontSize: "0.5rem", letterSpacing: "0.15em", color: "var(--muted)", marginBottom: "1.4rem" }}>
            how others responded
          </p>
          {scenarios.map((s, i) => {
            const youActed = scenarioAnswers[s.id];
            return (
              <div key={s.id} style={{ display: "grid", gridTemplateColumns: "1fr 60px 60px", gap: "1rem", borderTop: "1px solid var(--border)", padding: "0.8rem 0", alignItems: "center" }}>
                <span style={{ fontFamily: "var(--serif)", fontSize: "0.88rem", fontStyle: "italic", color: "var(--ink)" }}>{s.title}</span>
                <span style={{ fontFamily: "var(--mono)", fontSize: "0.48rem", letterSpacing: "0.06em", color: youActed ? "var(--ink)" : "var(--muted)" }}>
                  you: {youActed ? "yes" : "no"}
                </span>
                <span style={{ fontFamily: "var(--mono)", fontSize: "0.48rem", letterSpacing: "0.06em", color: "var(--muted)" }}>
                  avg: {s.avgAction}%
                </span>
              </div>
            );
          })}
          <div style={{ borderTop: "1px solid var(--border)" }} />
        </div>
      </Reveal>

      <Reveal delay={320}>
        <p style={{ fontFamily: "var(--serif)", fontSize: "0.9rem", fontWeight: 300, lineHeight: 1.85, color: "var(--muted)", fontStyle: "italic", marginBottom: "5rem", maxWidth: "55ch" }}>
          One pattern worth noting: across thousands of responses, most people happily divert the train but refuse to push the man off the bridge — even though both kill one to save five. That asymmetry is one of the hardest things for purely consequentialist ethics to explain.
        </p>
      </Reveal>

      <Reveal delay={360}>
        <div style={{ display: "flex", gap: "1.2rem", flexWrap: "wrap", borderTop: "1px solid var(--border)", paddingTop: "3rem" }}>
          <button onClick={onRetry} style={{
            fontFamily: "var(--mono)", fontSize: "0.6rem", letterSpacing: "0.12em",
            color: "var(--ink)", border: "1px solid var(--ink)", padding: "0.75rem 1.6rem",
            backgroundColor: "transparent", cursor: "pointer", transition: "all 0.2s",
          }}
          onMouseEnter={e => { e.currentTarget.style.backgroundColor = "var(--ink)"; e.currentTarget.style.color = "var(--white)"; }}
          onMouseLeave={e => { e.currentTarget.style.backgroundColor = "transparent"; e.currentTarget.style.color = "var(--ink)"; }}>
            (take it again)
          </button>
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
export default function TrolleyProblemPage() {
  const [stage, setStage] = useState<Stage>("intro");
  const [prelimIndex, setPrelimIndex] = useState(0);
  const [scenarioIndex, setScenarioIndex] = useState(0);
  const [prelim, setPrelim] = useState<Answers>({});
  const [scenarioAnswers, setScenarioAnswers] = useState<Answers>({});

  const handlePrelim = (yes: boolean) => {
    const id = preliminary[prelimIndex].id;
    const next = { ...prelim, [id]: yes };
    setPrelim(next);
    if (prelimIndex + 1 >= preliminary.length) setStage("scenarios");
    else setPrelimIndex(i => i + 1);
  };

  const handleScenario = (tookAction: boolean) => {
    const id = scenarios[scenarioIndex].id;
    const next = { ...scenarioAnswers, [id]: tookAction };
    setScenarioAnswers(next);
    if (scenarioIndex + 1 >= scenarios.length) setStage("results");
    else setScenarioIndex(i => i + 1);
  };

  const restart = () => {
    setPrelim({});
    setScenarioAnswers({});
    setPrelimIndex(0);
    setScenarioIndex(0);
    setStage("intro");
  };

  return (
    <div style={{ backgroundColor: "var(--white)", minHeight: "100vh" }}>
      <Nav />
      <div style={{ paddingTop: "3rem" }}>
        {stage === "intro" && <Intro onStart={() => setStage("preliminary")} />}
        {stage === "preliminary" && (
          <YesNoQuestion
            key={prelimIndex}
            text={preliminary[prelimIndex].text}
            index={prelimIndex}
            total={preliminary.length}
            onAnswer={handlePrelim}
          />
        )}
        {stage === "scenarios" && (
          <Scenario
            key={scenarioIndex}
            scenario={scenarios[scenarioIndex]}
            index={scenarioIndex}
            total={scenarios.length}
            onAnswer={handleScenario}
          />
        )}
        {stage === "results" && (
          <Results prelim={prelim} scenarioAnswers={scenarioAnswers} onRetry={restart} />
        )}
      </div>
      {(stage === "intro" || stage === "results") && <Footer />}
    </div>
  );
}
