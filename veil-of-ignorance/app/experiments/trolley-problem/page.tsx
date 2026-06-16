"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Nav from "@/app/components/Nav";
import Footer from "@/app/components/Footer";

type Answers = {
  torture?: boolean;
  utilitarian?: boolean;
  causeDealth?: boolean;
  saveInnocent?: boolean;
  divertTrain?: boolean;
  pushFatMan?: boolean;
  pushSaboteur?: boolean;
  tortureBomb?: boolean;
};

type Stage = "intro" | "preliminary" | "prelim_results" | "scenarios" | "analysis";

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
      transition: `opacity 800ms ease ${delay}ms, transform 800ms ease ${delay}ms`,
    }}>
      {children}
    </div>
  );
}

/* ─── Choice Button ─── */
function Choice({ label, sub, chosen, onChoose }: { label: string; sub?: string; chosen: boolean; onChoose: () => void }) {
  return (
    <button
      onClick={onChoose}
      style={{
        textAlign: "left", padding: "1.2rem 1.4rem",
        backgroundColor: chosen ? "var(--ink)" : "transparent",
        border: `1px solid ${chosen ? "var(--ink)" : "var(--border)"}`,
        color: chosen ? "var(--white)" : "var(--ink)",
        fontFamily: "var(--serif)", fontSize: "1rem",
        fontStyle: "italic", cursor: "pointer",
        transition: "all 0.25s ease",
        display: "block", width: "100%", marginBottom: "2px",
      }}
      onMouseEnter={e => { if (!chosen) { e.currentTarget.style.borderColor = "var(--ink)"; e.currentTarget.style.backgroundColor = "var(--hover)"; } }}
      onMouseLeave={e => { if (!chosen) { e.currentTarget.style.borderColor = "var(--border)"; e.currentTarget.style.backgroundColor = "transparent"; } }}
    >
      {label}
      {sub && <span style={{ display: "block", fontSize: "0.8rem", opacity: 0.6, marginTop: "0.2rem" }}>{sub}</span>}
    </button>
  );
}

/* ─── Bar chart ─── */
function BarChart({ items }: { items: { label: string; pct: number; highlight?: boolean }[] }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "0.8rem", margin: "1.5rem 0" }}>
      {items.map((item, i) => (
        <div key={i}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.3rem" }}>
            <span style={{ fontFamily: "var(--mono)", fontSize: "0.5rem", letterSpacing: "0.1em", color: item.highlight ? "var(--ink)" : "var(--muted)" }}>
              {item.label}
            </span>
            <span style={{ fontFamily: "var(--mono)", fontSize: "0.5rem", letterSpacing: "0.1em", color: "var(--muted)" }}>
              {item.pct}%
            </span>
          </div>
          <div style={{ height: "1px", backgroundColor: "var(--border)", position: "relative" }}>
            <div style={{
              position: "absolute", top: "-1px", left: 0,
              height: "3px",
              width: `${item.pct}%`,
              backgroundColor: item.highlight ? "var(--ink)" : "var(--muted)",
              transition: "width 1s ease",
            }} />
          </div>
        </div>
      ))}
    </div>
  );
}

/* ─── INTRO ─── */
function Intro({ onStart }: { onStart: () => void }) {
  return (
    <div style={{ maxWidth: "700px", margin: "0 auto", padding: "8rem 1.8rem 10rem" }}>
      <Reveal>
        <p style={{ fontFamily: "var(--mono)", fontSize: "0.52rem", letterSpacing: "0.2em", color: "var(--muted)", marginBottom: "3rem" }}>
          the trolley problem · experiment 002
        </p>
      </Reveal>
      <Reveal delay={80}>
        <h1 style={{
          fontFamily: "var(--serif)", fontSize: "clamp(2rem, 5vw, 3.5rem)",
          fontWeight: 400, fontStyle: "italic", lineHeight: 1.05,
          color: "var(--ink)", marginBottom: "3rem", letterSpacing: "-0.02em",
        }}>
          Should You Kill<br />the Fat Man?
        </h1>
      </Reveal>
      <Reveal delay={120}>
        <div style={{ height: "1px", backgroundColor: "var(--border)", marginBottom: "3rem" }} />
      </Reveal>
      <Reveal delay={160}>
        <p style={{ fontFamily: "var(--serif)", fontSize: "1rem", fontWeight: 300, lineHeight: 1.9, color: "var(--ink)", marginBottom: "1.4rem", maxWidth: "58ch" }}>
          This activity is a treatment of some of the issues thrown up by a thought experiment called the Trolley Problem, first outlined by the philosopher Philippa Foot and then developed by Judith Jarvis Thomson and others.
        </p>
      </Reveal>
      <Reveal delay={200}>
        <p style={{ fontFamily: "var(--serif)", fontSize: "1rem", fontWeight: 300, lineHeight: 1.9, color: "var(--muted)", fontStyle: "italic", marginBottom: "3rem", maxWidth: "54ch" }}>
          Before the scenarios begin, four preliminary questions will establish how you think about morality. There are no right or wrong answers.
        </p>
      </Reveal>
      <Reveal delay={240}>
        <div style={{ marginBottom: "3rem" }}>
          {[["questions", "8 total (4 preliminary + 4 scenarios)"], ["estimated time", "6 minutes"], ["thinkers", "Foot · Thomson · Singer"], ["what it measures", "moral consistency"]].map(([k, v]) => (
            <div key={k} style={{ display: "grid", gridTemplateColumns: "180px 1fr", borderTop: "1px solid var(--border)", padding: "0.6rem 0" }}>
              <span style={{ fontFamily: "var(--mono)", fontSize: "0.5rem", letterSpacing: "0.1em", color: "var(--muted)" }}>{k}</span>
              <span style={{ fontFamily: "var(--mono)", fontSize: "0.5rem", letterSpacing: "0.06em", color: "var(--ink)" }}>{v}</span>
            </div>
          ))}
          <div style={{ borderTop: "1px solid var(--border)" }} />
        </div>
      </Reveal>
      <Reveal delay={280}>
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

/* ─── PRELIMINARY QUESTIONS ─── */
const prelimQuestions = [
  {
    key: "torture" as keyof Answers,
    q: "Torture, as a matter of principle, is always morally wrong.",
    yes: "Yes", no: "No",
  },
  {
    key: "utilitarian" as keyof Answers,
    q: "The morality of an action is determined by whether, compared to the other available options, it maximises the sum total of happiness of all the people affected by it.",
    yes: "Yes", no: "No",
  },
  {
    key: "causeDealth" as keyof Answers,
    q: "It is always, and everywhere, wrong to cause another person's death — assuming they wish to stay alive — if this outcome is avoidable.",
    yes: "Yes", no: "No",
  },
  {
    key: "saveInnocent" as keyof Answers,
    q: "If you can save the lives of innocent people without reducing the sum total of human happiness, and without putting your own life at risk, you are morally obliged to do so.",
    yes: "Yes", no: "No",
  },
];

function PrelimScreen({ qIndex, answers, onAnswer }: {
  qIndex: number; answers: Answers; onAnswer: (key: keyof Answers, val: boolean) => void;
}) {
  const q = prelimQuestions[qIndex];
  const chosen = answers[q.key];

  return (
    <div style={{ maxWidth: "700px", margin: "0 auto", padding: "8rem 1.8rem 6rem", minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "center" }}>
      <p style={{ fontFamily: "var(--mono)", fontSize: "0.52rem", letterSpacing: "0.2em", color: "var(--muted)", marginBottom: "1.6rem" }}>
        preliminary judgement · {String(qIndex + 1).padStart(2, "0")} / 04
      </p>
      <h2 style={{ fontFamily: "var(--serif)", fontSize: "clamp(1.3rem, 3vw, 1.9rem)", fontWeight: 400, lineHeight: 1.4, color: "var(--ink)", marginBottom: "3rem", maxWidth: "52ch" }}>
        {q.q}
      </h2>
      <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
        <Choice label="Yes" chosen={chosen === true} onChoose={() => onAnswer(q.key, true)} />
        <Choice label="No" chosen={chosen === false} onChoose={() => onAnswer(q.key, false)} />
      </div>
    </div>
  );
}

/* ─── PRELIM RESULTS ─── */
function PrelimResults({ answers, onContinue }: { answers: Answers; onContinue: () => void }) {
  const data = [
    { q: "Torture always wrong?", yourAnswer: answers.torture ? "Yes — always wrong" : "No — not always wrong", yPct: 60, nPct: 40 },
    { q: "Morality = maximise happiness?", yourAnswer: answers.utilitarian ? "Yes" : "No", yPct: 43, nPct: 57 },
    { q: "Always wrong to cause death?", yourAnswer: answers.causeDealth ? "Yes — always wrong" : "No — not always", yPct: 52, nPct: 48 },
    { q: "Obliged to save innocent life?", yourAnswer: answers.saveInnocent ? "Yes — obliged" : "No — not obliged", yPct: 76, nPct: 24 },
  ];

  return (
    <div style={{ maxWidth: "700px", margin: "0 auto", padding: "8rem 1.8rem 6rem" }}>
      <Reveal>
        <p style={{ fontFamily: "var(--mono)", fontSize: "0.52rem", letterSpacing: "0.2em", color: "var(--muted)", marginBottom: "3rem" }}>
          how others responded · preliminary comparison
        </p>
      </Reveal>
      <Reveal delay={60}>
        <h2 style={{ fontFamily: "var(--serif)", fontSize: "clamp(1.6rem, 3.5vw, 2.5rem)", fontWeight: 400, fontStyle: "italic", lineHeight: 1.1, color: "var(--ink)", marginBottom: "3rem" }}>
          Good. That's the preliminary questions done.
        </h2>
      </Reveal>
      <Reveal delay={100}>
        <p style={{ fontFamily: "var(--serif)", fontSize: "0.95rem", fontWeight: 300, lineHeight: 1.9, color: "var(--muted)", fontStyle: "italic", marginBottom: "3rem", maxWidth: "54ch" }}>
          11,461 people have completed this activity to date. Here is how they responded to those four questions.
        </p>
      </Reveal>

      {data.map((item, i) => (
        <Reveal key={i} delay={140 + i * 80}>
          <div style={{ marginBottom: "2.5rem" }}>
            <p style={{ fontFamily: "var(--serif)", fontSize: "0.9rem", color: "var(--ink)", marginBottom: "0.4rem", lineHeight: 1.5 }}>
              {item.q}
            </p>
            <p style={{ fontFamily: "var(--mono)", fontSize: "0.48rem", letterSpacing: "0.1em", color: "var(--muted)", marginBottom: "0.6rem" }}>
              your answer: <span style={{ color: "var(--ink)" }}>{item.yourAnswer}</span>
            </p>
            <BarChart items={[
              { label: "Yes", pct: item.yPct },
              { label: "No", pct: item.nPct },
            ]} />
          </div>
        </Reveal>
      ))}

      <Reveal delay={500}>
        <div style={{ height: "1px", backgroundColor: "var(--border)", margin: "2rem 0" }} />
        <p style={{ fontFamily: "var(--serif)", fontSize: "0.9rem", fontWeight: 300, lineHeight: 1.8, color: "var(--ink)", marginBottom: "2.5rem", maxWidth: "54ch" }}>
          You will now be presented with four scenarios to test your moral intuitions against the answers you just gave.
        </p>
        <button onClick={onContinue} style={{
          fontFamily: "var(--mono)", fontSize: "0.6rem", letterSpacing: "0.12em",
          color: "var(--ink)", border: "1px solid var(--ink)", padding: "0.75rem 1.6rem",
          backgroundColor: "transparent", cursor: "pointer", transition: "all 0.2s",
        }}
        onMouseEnter={e => { e.currentTarget.style.backgroundColor = "var(--ink)"; e.currentTarget.style.color = "var(--white)"; }}
        onMouseLeave={e => { e.currentTarget.style.backgroundColor = "transparent"; e.currentTarget.style.color = "var(--ink)"; }}>
          (continue to scenarios)
        </button>
      </Reveal>
    </div>
  );
}

/* ─── SCENARIOS ─── */
const scenarios = [
  {
    key: "divertTrain" as keyof Answers,
    title: "The Runaway Train",
    num: "Scenario 1 of 4",
    body: `The brakes of the train that Casey Jones is driving have just failed. There are five people on the track ahead of the train. There is no way that they can get off the track before the train hits them. The track has a siding leading off to the right, and Casey can hit a button to direct the train onto it. Unfortunately, there is one person stuck on the siding.

Casey can turn the train, killing one person; or he can allow the train to continue onwards, killing five people.`,
    question: "Should he turn the train (1 dead); or should he allow it to keep going (5 dead)?",
    yes: "Turn the train",
    no: "Allow the train to keep going",
  },
  {
    key: "pushFatMan" as keyof Answers,
    title: "The Fat Man on the Bridge",
    num: "Scenario 2 of 4",
    body: `Marty Bakerman is on a footbridge above the train tracks. He can see that the train approaching the bridge is out of control, and that it is going to hit five people who are stuck on the track just past the bridge. The only way to stop the train is to drop a heavy weight into its path.

The only available heavy enough weight is a very fat man, who is also watching the train from the footbridge. Marty can push the fat man onto the track into the path of the train, which will kill him but save the five people already on the track; or he can allow the train to continue on its way, which will mean that the five will die.`,
    question: "Should he push the fat man onto the track (1 dead); or allow the train to continue (5 dead)?",
    yes: "Push the fat man onto the track",
    no: "Allow the train to continue",
  },
  {
    key: "pushSaboteur" as keyof Answers,
    title: "The Saboteur on the Bridge",
    num: "Scenario 3 of 4",
    body: `The situation is similar to the last scenario, but this time the person on the footbridge is not an innocent bystander. He is a saboteur who deliberately damaged the brakes of the train knowing that it would result in the deaths of the five people stuck on the track.

Marty can push the saboteur onto the track into the path of the train, which will kill him but save the five people on the track; or he can allow the train to continue, which will mean that the five will die.`,
    question: "Should he push the saboteur onto the track (1 dead); or allow the train to continue (5 dead)?",
    yes: "Push the saboteur onto the track",
    no: "Allow the train to continue",
  },
  {
    key: "tortureBomb" as keyof Answers,
    title: "The Fat Man and the Ticking Bomb",
    num: "Scenario 4 of 4",
    body: `The fat man, having avoided being thrown in front of the runaway train, has been arrested and is now in police custody. He states that he has hidden a nuclear device in a major urban centre, primed to explode in 24 hours.

The bomb will kill a million people if it explodes. The fat man cannot be tricked into revealing the location, nor can he be persuaded. If he is tortured, there is a 75% chance he will give up the bomb's location. If he does not reveal the location, the bomb will explode. There is no other way of finding out where the bomb is.`,
    question: "Should the fat man be tortured in the hope that he will reveal the location of the nuclear device?",
    yes: "Yes, the fat man should be tortured",
    no: "No, the fat man should not be tortured",
  },
];

function ScenarioScreen({ sIndex, answers, onAnswer }: {
  sIndex: number; answers: Answers; onAnswer: (key: keyof Answers, val: boolean) => void;
}) {
  const s = scenarios[sIndex];
  const chosen = answers[s.key];

  return (
    <div style={{ maxWidth: "700px", margin: "0 auto", padding: "8rem 1.8rem 6rem", minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "center" }}>
      <p style={{ fontFamily: "var(--mono)", fontSize: "0.52rem", letterSpacing: "0.2em", color: "var(--muted)", marginBottom: "0.6rem" }}>
        {s.num}
      </p>
      <h2 style={{ fontFamily: "var(--serif)", fontSize: "clamp(1.4rem, 3vw, 2rem)", fontWeight: 400, lineHeight: 1.2, color: "var(--ink)", marginBottom: "2rem" }}>
        {s.title}
      </h2>
      <div style={{ height: "1px", backgroundColor: "var(--border)", marginBottom: "2rem" }} />
      {s.body.split("\n\n").map((para, i) => (
        <p key={i} style={{ fontFamily: "var(--serif)", fontSize: "0.95rem", fontWeight: 300, lineHeight: 1.9, color: "var(--ink)", marginBottom: "1.2rem", maxWidth: "58ch" }}>
          {para}
        </p>
      ))}
      <p style={{ fontFamily: "var(--serif)", fontSize: "1rem", fontStyle: "italic", color: "var(--ink)", marginBottom: "2rem", marginTop: "0.8rem", maxWidth: "52ch" }}>
        {s.question}
      </p>
      <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
        <Choice label={s.yes} chosen={chosen === true} onChoose={() => onAnswer(s.key, true)} />
        <Choice label={s.no} chosen={chosen === false} onChoose={() => onAnswer(s.key, false)} />
      </div>
    </div>
  );
}

/* ─── ANALYSIS ─── */
function calcConsistency(a: Answers): { score: number; notes: string[] } {
  const notes: string[] = [];
  let tensions = 0;

  // Tension: said torture always wrong BUT said torture the fat man
  if (a.torture === true && a.tortureBomb === true) {
    tensions++;
    notes.push("You said torture is always morally wrong, yet you agreed to torture the fat man to find the bomb. These beliefs are in direct tension.");
  }

  // Tension: said always wrong to cause death BUT divert train (causing death)
  if (a.causeDealth === true && a.divertTrain === true) {
    tensions++;
    notes.push("You said it is always wrong to cause another person's death, yet you diverted the train — which causes the death of the one person on the siding.");
  }

  // Tension: said always wrong to cause death BUT push fat man
  if (a.causeDealth === true && a.pushFatMan === true) {
    tensions++;
    notes.push("You said it is always wrong to cause another person's death, yet you pushed the fat man — directly causing his death.");
  }

  // Tension: did NOT divert train BUT pushed fat man (harder to justify)
  if (a.divertTrain === false && a.pushFatMan === true) {
    tensions++;
    notes.push("You refused to divert the train — declining to cause one death to save five — yet you pushed the fat man, which involves causing a death to save five. The moral structure is identical.");
  }

  // Tension: utilitarian (maximise happiness) BUT didn't divert train
  if (a.utilitarian === true && a.divertTrain === false) {
    tensions++;
    notes.push("You said morality is about maximising total happiness, yet you refused to divert the train — which would save five lives at the cost of one. A consistent utilitarian should divert.");
  }

  // Tension: obliged to save innocent BUT didn't divert train
  if (a.saveInnocent === true && a.divertTrain === false) {
    tensions++;
    notes.push("You said you are obliged to save innocent lives when you can, yet you refused to divert the train when doing so would save five innocent lives.");
  }

  const maxTensions = 6;
  const score = Math.round(((maxTensions - tensions) / maxTensions) * 100);
  return { score, notes };
}

function Analysis({ answers, onRetry }: { answers: Answers; onRetry: () => void }) {
  const { score, notes } = calcConsistency(answers);
  const avgScore = 66;

  const scenarioResults = [
    { label: "Turn the train?", yours: answers.divertTrain ? "Yes" : "No", yPct: 83, nPct: 17 },
    { label: "Push the fat man?", yours: answers.pushFatMan ? "Yes" : "No", yPct: 37, nPct: 63 },
    { label: "Push the saboteur?", yours: answers.pushSaboteur ? "Yes" : "No", yPct: 78, nPct: 22 },
    { label: "Torture the fat man?", yours: answers.tortureBomb ? "Yes" : "No", yPct: 83, nPct: 17 },
  ];

  const yourResponses = [
    ["Is torture always wrong?", answers.torture ? "Yes" : "No"],
    ["Is morality about maximising happiness?", answers.utilitarian ? "Yes" : "No"],
    ["Is it always wrong to cause another's death?", answers.causeDealth ? "Yes" : "No"],
    ["Obliged to save innocent lives?", answers.saveInnocent ? "Yes" : "No"],
    ["Should Casey Jones divert the train?", answers.divertTrain ? "Yes" : "No"],
    ["Push the fat man onto the track?", answers.pushFatMan ? "Yes" : "No"],
    ["Push the saboteur onto the track?", answers.pushSaboteur ? "Yes" : "No"],
    ["Torture the fat man?", answers.tortureBomb ? "Yes" : "No"],
  ];

  return (
    <div style={{ maxWidth: "700px", margin: "0 auto", padding: "8rem 1.8rem 10rem" }}>
      <Reveal>
        <p style={{ fontFamily: "var(--mono)", fontSize: "0.52rem", letterSpacing: "0.2em", color: "var(--muted)", marginBottom: "3rem" }}>
          analysis · a matter of consistency
        </p>
      </Reveal>

      <Reveal delay={60}>
        <h2 style={{ fontFamily: "var(--serif)", fontSize: "clamp(2rem, 6vw, 4rem)", fontWeight: 400, fontStyle: "italic", lineHeight: 0.95, color: "var(--ink)", marginBottom: "3rem", letterSpacing: "-0.02em" }}>
          Your consistency<br />score: {score}%
        </h2>
      </Reveal>

      <Reveal delay={100}>
        <div style={{ height: "1px", backgroundColor: "var(--border)", marginBottom: "2rem" }} />
      </Reveal>

      {/* Score bar */}
      <Reveal delay={140}>
        <div style={{ marginBottom: "3rem" }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.6rem" }}>
            <span style={{ fontFamily: "var(--mono)", fontSize: "0.5rem", letterSpacing: "0.1em", color: "var(--muted)" }}>0%</span>
            <span style={{ fontFamily: "var(--mono)", fontSize: "0.5rem", letterSpacing: "0.1em", color: "var(--muted)" }}>consistency score (higher is better)</span>
            <span style={{ fontFamily: "var(--mono)", fontSize: "0.5rem", letterSpacing: "0.1em", color: "var(--muted)" }}>100%</span>
          </div>
          <div style={{ height: "1px", backgroundColor: "var(--border)", position: "relative", marginBottom: "1rem" }}>
            <div style={{ position: "absolute", top: "-4px", left: `${score}%`, width: "9px", height: "9px", backgroundColor: "var(--ink)", transform: "translateX(-50%) rotate(45deg)" }} />
            <div style={{ position: "absolute", top: "-3px", left: `${avgScore}%`, width: "7px", height: "7px", border: "1px solid var(--muted)", transform: "translateX(-50%) rotate(45deg)" }} />
          </div>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <span style={{ fontFamily: "var(--mono)", fontSize: "0.5rem", letterSpacing: "0.1em", color: "var(--ink)" }}>you: {score}%</span>
            <span style={{ fontFamily: "var(--mono)", fontSize: "0.5rem", letterSpacing: "0.1em", color: "var(--muted)" }}>average: {avgScore}%</span>
          </div>
        </div>
      </Reveal>

      <Reveal delay={180}>
        <p style={{ fontFamily: "var(--serif)", fontSize: "1rem", fontWeight: 300, lineHeight: 1.9, color: "var(--ink)", marginBottom: "1.4rem", maxWidth: "58ch" }}>
          {score === 100
            ? "Your consistency score is 100% — higher than the average of 66%. Your moral choices appear to be governed by a consistently applied set of principles."
            : `Your consistency score is ${score}%. The average is 66%. It is often thought to be a good thing if one's moral choices are governed by a small number of consistently applied moral principles — otherwise there is the worry that choices are essentially arbitrary.`}
        </p>
      </Reveal>

      {/* Tensions */}
      {notes.length > 0 && (
        <Reveal delay={220}>
          <div style={{ marginBottom: "4rem" }}>
            <p style={{ fontFamily: "var(--mono)", fontSize: "0.52rem", letterSpacing: "0.15em", color: "var(--muted)", marginBottom: "1.2rem" }}>
              tensions identified
            </p>
            {notes.map((note, i) => (
              <div key={i} style={{ borderLeft: "1px solid var(--border)", paddingLeft: "1.2rem", marginBottom: "1.4rem" }}>
                <p style={{ fontFamily: "var(--serif)", fontSize: "0.92rem", fontWeight: 300, lineHeight: 1.85, color: "var(--ink)" }}>
                  {note}
                </p>
              </div>
            ))}
          </div>
        </Reveal>
      )}

      {/* Trolley problem analysis */}
      <Reveal delay={280}>
        <div style={{ height: "1px", backgroundColor: "var(--border)", marginBottom: "3rem" }} />
        <p style={{ fontFamily: "var(--mono)", fontSize: "0.52rem", letterSpacing: "0.15em", color: "var(--muted)", marginBottom: "1.4rem" }}>
          the trolley problem · how others responded
        </p>
        <p style={{ fontFamily: "var(--serif)", fontSize: "0.95rem", fontWeight: 300, lineHeight: 1.9, color: "var(--ink)", marginBottom: "2rem", maxWidth: "58ch" }}>
          Part of what is interesting here is what the results tell us about consequentialist approaches to moral thinking. Straightforward utilitarianism would seem to require an affirmative response to all four scenarios. Yet very few people tend to think that the fat man should be pushed off the bridge — a significant challenge to utilitarian thinking.
        </p>
      </Reveal>

      {scenarioResults.map((item, i) => (
        <Reveal key={i} delay={320 + i * 60}>
          <div style={{ marginBottom: "2rem" }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.3rem" }}>
              <p style={{ fontFamily: "var(--serif)", fontSize: "0.9rem", color: "var(--ink)" }}>{item.label}</p>
              <span style={{ fontFamily: "var(--mono)", fontSize: "0.48rem", letterSpacing: "0.08em", color: "var(--muted)" }}>
                you: {item.yours}
              </span>
            </div>
            <BarChart items={[{ label: "Yes", pct: item.yPct }, { label: "No", pct: item.nPct }]} />
          </div>
        </Reveal>
      ))}

      {/* Your full responses */}
      <Reveal delay={560}>
        <div style={{ height: "1px", backgroundColor: "var(--border)", margin: "3rem 0 2rem" }} />
        <p style={{ fontFamily: "var(--mono)", fontSize: "0.52rem", letterSpacing: "0.15em", color: "var(--muted)", marginBottom: "1.2rem" }}>
          your responses
        </p>
        {yourResponses.map(([q, a], i) => (
          <div key={i} style={{ display: "grid", gridTemplateColumns: "1fr auto", borderTop: "1px solid var(--border)", padding: "0.55rem 0", alignItems: "baseline" }}>
            <span style={{ fontFamily: "var(--serif)", fontSize: "0.85rem", color: "var(--muted)", fontStyle: "italic" }}>{q}</span>
            <span style={{ fontFamily: "var(--mono)", fontSize: "0.48rem", letterSpacing: "0.1em", color: "var(--ink)" }}>{a}</span>
          </div>
        ))}
        <div style={{ borderTop: "1px solid var(--border)" }} />
      </Reveal>

      <Reveal delay={640}>
        <div style={{ display: "flex", gap: "1.2rem", marginTop: "3rem", flexWrap: "wrap" }}>
          <button onClick={onRetry} style={{
            fontFamily: "var(--mono)", fontSize: "0.6rem", letterSpacing: "0.12em",
            color: "var(--ink)", border: "1px solid var(--ink)", padding: "0.75rem 1.6rem",
            backgroundColor: "transparent", cursor: "pointer", transition: "all 0.2s",
          }}
          onMouseEnter={e => { e.currentTarget.style.backgroundColor = "var(--ink)"; e.currentTarget.style.color = "var(--white)"; }}
          onMouseLeave={e => { e.currentTarget.style.backgroundColor = "transparent"; e.currentTarget.style.color = "var(--ink)"; }}>
            (try again)
          </button>
          <Link href="/experiments" style={{
            fontFamily: "var(--mono)", fontSize: "0.55rem", letterSpacing: "0.1em",
            color: "var(--muted)", textDecoration: "none",
            borderBottom: "1px solid transparent", paddingBottom: "1px",
            alignSelf: "center", transition: "all 0.2s",
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

/* ─── PROGRESS BAR ─── */
function ProgressBar({ value }: { value: number }) {
  return (
    <div style={{ position: "fixed", top: "3rem", left: 0, right: 0, height: "1px", backgroundColor: "var(--border)", zIndex: 99 }}>
      <div style={{ height: "100%", backgroundColor: "var(--ink)", width: `${value}%`, transition: "width 0.6s ease" }} />
    </div>
  );
}

/* ─── ROOT ─── */
export default function TrolleyProblemPage() {
  const [stage, setStage] = useState<Stage>("intro");
  const [prelimIndex, setPrelimIndex] = useState(0);
  const [scenarioIndex, setScenarioIndex] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});

  const setAnswer = (key: keyof Answers, val: boolean) => {
    const next = { ...answers, [key]: val };
    setAnswers(next);
    setTimeout(() => {
      if (stage === "preliminary") {
        if (prelimIndex + 1 >= prelimQuestions.length) setStage("prelim_results");
        else setPrelimIndex(i => i + 1);
      } else if (stage === "scenarios") {
        if (scenarioIndex + 1 >= scenarios.length) setStage("analysis");
        else setScenarioIndex(i => i + 1);
      }
    }, 420);
  };

  const retry = () => {
    setAnswers({});
    setPrelimIndex(0);
    setScenarioIndex(0);
    setStage("intro");
  };

  const progressValue = stage === "intro" ? 0
    : stage === "preliminary" ? (prelimIndex / 8) * 100
    : stage === "prelim_results" ? 50
    : stage === "scenarios" ? 50 + ((scenarioIndex / 8) * 100)
    : 100;

  return (
    <div style={{ backgroundColor: "var(--white)", minHeight: "100vh" }}>
      <Nav />
      <div style={{ paddingTop: "3rem" }}>
        {stage !== "intro" && <ProgressBar value={progressValue} />}
        {stage === "intro" && <Intro onStart={() => setStage("preliminary")} />}
        {stage === "preliminary" && (
          <PrelimScreen qIndex={prelimIndex} answers={answers} onAnswer={setAnswer} />
        )}
        {stage === "prelim_results" && (
          <PrelimResults answers={answers} onContinue={() => setStage("scenarios")} />
        )}
        {stage === "scenarios" && (
          <ScenarioScreen sIndex={scenarioIndex} answers={answers} onAnswer={setAnswer} />
        )}
        {stage === "analysis" && (
          <Analysis answers={answers} onRetry={retry} />
        )}
      </div>
      {(stage === "intro" || stage === "analysis") && <Footer />}
    </div>
  );
}
