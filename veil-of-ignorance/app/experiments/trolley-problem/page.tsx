"use client";
import Link from "next/link";
import Nav from "@/app/components/Nav";
import Footer from "@/app/components/Footer";
import { useExperiment } from "@/lib/experiment-engine/useExperiment";
import { resolveIntro } from "@/lib/experiment-engine/narration";
import { computeConsistencyScore } from "@/lib/experiment-engine/scoring";
import { trolleyProblemConfig as config } from "@/experiments/trolley-problem/config";
import { Reveal } from "@/components/experiment/Reveal";
import { StatsBar } from "@/components/experiment/StatsBar";
import { useState } from "react";

/* ─── Intro ─── */
function IntroScreen({ onStart }: { onStart: () => void }) {
  return (
    <div style={{ maxWidth: "700px", margin: "0 auto", padding: "9rem 2.2rem 11rem" }}>
      <Reveal>
        <p style={{ fontFamily: "var(--mono)", fontSize: "0.52rem", letterSpacing: "0.2em", color: "var(--muted)", marginBottom: "3rem" }}>
          {config.title.toLowerCase()}
        </p>
      </Reveal>
      <Reveal delay={80}>
        <h1 style={{ fontFamily: "var(--serif)", fontSize: "clamp(1.8rem, 4.5vw, 3.2rem)", fontWeight: 400, fontStyle: "italic", lineHeight: 1.05, color: "var(--ink)", marginBottom: "3rem", letterSpacing: "-0.02em" }}>
          {config.subtitle}
        </h1>
      </Reveal>
      <Reveal delay={140}>
        <div style={{ height: "1px", backgroundColor: "var(--border)", marginBottom: "3rem" }} />
      </Reveal>
      <Reveal delay={180}>
        <p style={{ fontFamily: "var(--serif)", fontSize: "1rem", fontWeight: 300, lineHeight: 2.0, color: "var(--ink)", marginBottom: "2rem", maxWidth: "58ch" }}>
          {config.intro}
        </p>
      </Reveal>
      <Reveal delay={220}>
        <p style={{ fontFamily: "var(--serif)", fontSize: "1rem", fontWeight: 300, lineHeight: 2.0, color: "var(--muted)", fontStyle: "italic", marginBottom: "4rem", maxWidth: "52ch" }}>
          {config.introNote}
        </p>
      </Reveal>
      <Reveal delay={260}>
        <div style={{ marginBottom: "3rem" }}>
          {[
            ["preliminary questions", String(config.propositions.length)],
            ["scenarios", String(config.scenarios.length)],
            ["respondents so far", config.totalRespondents.toLocaleString()],
            ["what it measures", "moral consistency"],
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

/* ─── Proposition (preliminary yes/no) ─── */
function PropositionScreen({
  index, progress, onAnswer,
}: {
  index: number; progress: number;
  onAnswer: (yes: boolean) => void;
}) {
  const [chosen, setChosen] = useState<boolean | null>(null);
  const prop = config.propositions[index];

  const handle = (yes: boolean) => {
    if (chosen !== null) return;
    setChosen(yes);
    setTimeout(() => onAnswer(yes), 450);
  };

  return (
    <div key={prop.id} style={{ minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "center", maxWidth: "700px", margin: "0 auto", padding: "6rem 1.8rem" }}>
      <div style={{ position: "fixed", top: "3rem", left: 0, right: 0, height: "1px", backgroundColor: "var(--border)", zIndex: 99 }}>
        <div style={{ height: "100%", backgroundColor: "var(--ink)", width: `${progress * 100}%`, transition: "width 0.6s ease" }} />
      </div>

      <p style={{ fontFamily: "var(--mono)", fontSize: "0.52rem", letterSpacing: "0.2em", color: "var(--muted)", marginBottom: "2rem" }}>
        preliminary {String(index + 1).padStart(2, "0")} / {String(config.propositions.length).padStart(2, "0")}
      </p>

      <h2 style={{ fontFamily: "var(--serif)", fontSize: "clamp(1.3rem, 3vw, 1.9rem)", fontWeight: 400, lineHeight: 1.4, color: "var(--ink)", marginBottom: "4rem", maxWidth: "52ch" }}>
        {prop.text}
      </h2>

      <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
        {[{ label: prop.yesLabel ?? "yes", value: true }, { label: prop.noLabel ?? "no", value: false }].map(opt => {
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

/* ─── Preliminary comparison stats page ─── */
function PreliminaryStatsScreen({ onContinue }: { onContinue: () => void }) {
  return (
    <div style={{ maxWidth: "700px", margin: "0 auto", padding: "9rem 2.2rem 11rem" }}>
      <Reveal>
        <p style={{ fontFamily: "var(--mono)", fontSize: "0.52rem", letterSpacing: "0.2em", color: "var(--muted)", marginBottom: "2rem" }}>
          how others responded
        </p>
      </Reveal>
      <Reveal delay={60}>
        <h2 style={{ fontFamily: "var(--serif)", fontSize: "clamp(1.6rem, 3.5vw, 2.4rem)", fontWeight: 400, fontStyle: "italic", lineHeight: 1.1, color: "var(--ink)", marginBottom: "2rem" }}>
          {config.totalRespondents.toLocaleString()} people have done this before you.
        </h2>
      </Reveal>
      <Reveal delay={100}>
        <p style={{ fontFamily: "var(--serif)", fontSize: "0.95rem", fontWeight: 300, lineHeight: 1.85, color: "var(--muted)", fontStyle: "italic", marginBottom: "3.5rem", maxWidth: "52ch" }}>
          Here's how they answered the same four questions you just did.
        </p>
      </Reveal>
      {config.propositions.map((p, i) => (
        <Reveal key={p.id} delay={140 + i * 60}>
          <StatsBar yesPct={p.avgYes} leftLabel="yes" rightLabel="no" />
        </Reveal>
      ))}
      <Reveal delay={400}>
        <button onClick={onContinue} style={{
          fontFamily: "var(--mono)", fontSize: "0.6rem", letterSpacing: "0.12em",
          color: "var(--ink)", border: "1px solid var(--ink)", padding: "0.75rem 1.6rem",
          backgroundColor: "transparent", cursor: "pointer", transition: "all 0.2s",
          marginTop: "2rem",
        }}
        onMouseEnter={e => { e.currentTarget.style.backgroundColor = "var(--ink)"; e.currentTarget.style.color = "var(--white)"; }}
        onMouseLeave={e => { e.currentTarget.style.backgroundColor = "transparent"; e.currentTarget.style.color = "var(--ink)"; }}>
          (begin scenarios)
        </button>
      </Reveal>
    </div>
  );
}

/* ─── Scenario screen ─── */
function ScenarioScreen({
  index, progress, answers, onAnswer,
}: {
  index: number; progress: number;
  answers: { propositions: Record<string, boolean>; scenarios: Record<string, boolean> };
  onAnswer: (tookAction: boolean) => void;
}) {
  const [chosen, setChosen] = useState<number | null>(null);
  const scenario = config.scenarios[index];
  const intro = resolveIntro(scenario, answers);

  const handle = (i: number) => {
    if (chosen !== null) return;
    setChosen(i);
    setTimeout(() => onAnswer(i === 0), 500);
  };

  return (
    <div key={scenario.id} style={{ minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "center", maxWidth: "700px", margin: "0 auto", padding: "6rem 1.8rem" }}>
      <div style={{ position: "fixed", top: "3rem", left: 0, right: 0, height: "1px", backgroundColor: "var(--border)", zIndex: 99 }}>
        <div style={{ height: "100%", backgroundColor: "var(--ink)", width: `${progress * 100}%`, transition: "width 0.6s ease" }} />
      </div>

      <p style={{ fontFamily: "var(--mono)", fontSize: "0.52rem", letterSpacing: "0.2em", color: "var(--muted)", marginBottom: "2rem" }}>
        scenario {String(index + 1).padStart(2, "0")} / {String(config.scenarios.length).padStart(2, "0")} — {scenario.source}
      </p>

      {intro && (
        <p style={{ fontFamily: "var(--serif)", fontSize: "0.88rem", fontStyle: "italic", color: "var(--muted)", marginBottom: "1.6rem", lineHeight: 1.7, maxWidth: "54ch" }}>
          {intro}
        </p>
      )}

      <h2 style={{ fontFamily: "var(--serif)", fontSize: "clamp(1.5rem, 3.5vw, 2.2rem)", fontWeight: 400, fontStyle: "italic", lineHeight: 1.15, color: "var(--ink)", marginBottom: "0.8rem" }}>
        {scenario.title}
      </h2>

      <p style={{ fontFamily: "var(--mono)", fontSize: "0.46rem", letterSpacing: "0.1em", color: "var(--muted)", marginBottom: "1.8rem", textTransform: "uppercase" }}>
        tests: {scenario.principle}
      </p>

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

/* ─── Analysis page 1: consistency score ─── */
function AnalysisPage1({ score, onContinue }: { score: number; onContinue: () => void }) {
  const avg = 66;
  return (
    <div style={{ maxWidth: "700px", margin: "0 auto", padding: "9rem 2.2rem 11rem" }}>
      <Reveal>
        <p style={{ fontFamily: "var(--mono)", fontSize: "0.52rem", letterSpacing: "0.2em", color: "var(--muted)", marginBottom: "3rem" }}>
          analysis 01 / 04 — a matter of consistency
        </p>
      </Reveal>
      <Reveal delay={60}>
        <h2 style={{ fontFamily: "var(--serif)", fontSize: "clamp(2rem, 6vw, 4rem)", fontWeight: 400, fontStyle: "italic", lineHeight: 0.95, color: "var(--ink)", marginBottom: "3rem", letterSpacing: "-0.02em" }}>
          {score}% consistent
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
            <div style={{ position: "absolute", top: "-4px", left: `${score}%`, width: "9px", height: "9px", backgroundColor: "var(--ink)", transform: "translateX(-50%) rotate(45deg)" }} />
            <div style={{ position: "absolute", top: "-3px", left: `${avg}%`, width: "7px", height: "7px", border: "1px solid var(--muted)", backgroundColor: "transparent", transform: "translateX(-50%) rotate(45deg)" }} />
          </div>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <span style={{ fontFamily: "var(--mono)", fontSize: "0.5rem", letterSpacing: "0.1em", color: "var(--ink)" }}>you: {score}%</span>
            <span style={{ fontFamily: "var(--mono)", fontSize: "0.5rem", letterSpacing: "0.1em", color: "var(--muted)" }}>average: {avg}%</span>
          </div>
        </div>
      </Reveal>
      <Reveal delay={180}>
        <p style={{ fontFamily: "var(--serif)", fontSize: "1rem", fontWeight: 300, lineHeight: 2.0, color: "var(--ink)", marginBottom: "2rem", maxWidth: "58ch" }}>
          It's generally thought to be a good thing if your moral judgements are governed by a small number of consistently applied principles. If that's not the case, there's a worry that those judgements are arbitrary — intuition, or just making it up scenario by scenario.
        </p>
      </Reveal>
      <Reveal delay={220}>
        <p style={{ fontFamily: "var(--serif)", fontSize: "0.95rem", fontWeight: 300, lineHeight: 2.0, color: "var(--muted)", fontStyle: "italic", marginBottom: "2rem", maxWidth: "55ch" }}>
          Say you think diverting the train is right purely because it maximises happiness, but you don't think that justification carries over to the man on the bridge. Unless you can name a morally relevant difference between the two cases, that justification wasn't really doing the work you thought it was.
        </p>
      </Reveal>
      <Reveal delay={250}>
        <p style={{ fontFamily: "var(--serif)", fontSize: "1rem", fontWeight: 300, lineHeight: 2.0, color: "var(--ink)", marginBottom: "5rem", maxWidth: "58ch" }}>
          If your score came out above average, that's worth noting, but it's not a finish line — most people, if they're honest, haven't thought all the way through their own moral commitments. There's more in the next page worth sitting with before you draw any final conclusions about yourself.
        </p>
      </Reveal>
      <Reveal delay={260}>
        <button onClick={onContinue} style={{
          fontFamily: "var(--mono)", fontSize: "0.6rem", letterSpacing: "0.12em",
          color: "var(--ink)", border: "1px solid var(--ink)", padding: "0.75rem 1.6rem",
          backgroundColor: "transparent", cursor: "pointer", transition: "all 0.2s",
        }}
        onMouseEnter={e => { e.currentTarget.style.backgroundColor = "var(--ink)"; e.currentTarget.style.color = "var(--white)"; }}
        onMouseLeave={e => { e.currentTarget.style.backgroundColor = "transparent"; e.currentTarget.style.color = "var(--ink)"; }}>
          (continue)
        </button>
      </Reveal>
    </div>
  );
}

/* ─── Analysis page 2: scenario population breakdown ─── */
function AnalysisPage2({ onContinue }: { onContinue: () => void }) {
  return (
    <div style={{ maxWidth: "700px", margin: "0 auto", padding: "9rem 2.2rem 11rem" }}>
      <Reveal>
        <p style={{ fontFamily: "var(--mono)", fontSize: "0.52rem", letterSpacing: "0.2em", color: "var(--muted)", marginBottom: "3rem" }}>
          analysis 02 / 04 — the trolley problem
        </p>
      </Reveal>
      <Reveal delay={60}>
        <h2 style={{ fontFamily: "var(--serif)", fontSize: "clamp(1.6rem, 3.5vw, 2.4rem)", fontWeight: 400, fontStyle: "italic", lineHeight: 1.15, color: "var(--ink)", marginBottom: "2rem" }}>
          What this tells us about consequentialism
        </h2>
      </Reveal>
      <Reveal delay={100}>
        <p style={{ fontFamily: "var(--serif)", fontSize: "1rem", fontWeight: 300, lineHeight: 2.0, color: "var(--ink)", marginBottom: "2rem", maxWidth: "58ch" }}>
          Straightforward utilitarianism — an act is right to the extent it maximises total happiness compared with the alternatives — would predict the same answer to every scenario above: act, every time, since the numbers never change. But that's not what happens.
        </p>
      </Reveal>
      <Reveal delay={140}>
        <p style={{ fontFamily: "var(--serif)", fontSize: "0.95rem", fontWeight: 300, lineHeight: 2.0, color: "var(--muted)", fontStyle: "italic", marginBottom: "3.5rem", maxWidth: "55ch" }}>
          Very few people are willing to push the man off the bridge, even though the arithmetic is identical to diverting the train. That gap is one of the most discussed challenges to pure consequentialist ethics.
        </p>
      </Reveal>
      {config.scenarios.map((s, i) => (
        <Reveal key={s.id} delay={180 + i * 60}>
          <StatsBar yesPct={s.avgAction} leftLabel={s.choices[0].label.toLowerCase()} rightLabel={s.choices[1].label.toLowerCase()} />
        </Reveal>
      ))}
      <Reveal delay={420}>
        <button onClick={onContinue} style={{
          fontFamily: "var(--mono)", fontSize: "0.6rem", letterSpacing: "0.12em",
          color: "var(--ink)", border: "1px solid var(--ink)", padding: "0.75rem 1.6rem",
          backgroundColor: "transparent", cursor: "pointer", transition: "all 0.2s",
          marginTop: "1.5rem",
        }}
        onMouseEnter={e => { e.currentTarget.style.backgroundColor = "var(--ink)"; e.currentTarget.style.color = "var(--white)"; }}
        onMouseLeave={e => { e.currentTarget.style.backgroundColor = "transparent"; e.currentTarget.style.color = "var(--ink)"; }}>
          (continue)
        </button>
      </Reveal>
    </div>
  );
}

/* ─── Analysis page 3: is it because he's fat ─── */
function AnalysisPage3({ onContinue }: { onContinue: () => void }) {
  return (
    <div style={{ maxWidth: "700px", margin: "0 auto", padding: "9rem 2.2rem 11rem" }}>
      <Reveal>
        <p style={{ fontFamily: "var(--mono)", fontSize: "0.52rem", letterSpacing: "0.2em", color: "var(--muted)", marginBottom: "3rem" }}>
          analysis 03 / 04 — a confounding variable
        </p>
      </Reveal>
      <Reveal delay={60}>
        <h2 style={{ fontFamily: "var(--serif)", fontSize: "clamp(1.6rem, 3.5vw, 2.4rem)", fontWeight: 400, fontStyle: "italic", lineHeight: 1.15, color: "var(--ink)", marginBottom: "2rem" }}>
          Is it the size of the man, or the structure of the act?
        </h2>
      </Reveal>
      <Reveal delay={100}>
        <p style={{ fontFamily: "var(--serif)", fontSize: "1rem", fontWeight: 300, lineHeight: 2.0, color: "var(--ink)", marginBottom: "2rem", maxWidth: "58ch" }}>
          The original version of this thought experiment, going back to Thomson, specifies a man large enough that his body alone can stop a train. That detail has drawn criticism over the years — the worry being that singling out a "fat man" smuggles in a bias that has nothing to do with the philosophical point being tested.
        </p>
      </Reveal>
      <Reveal delay={140}>
        <p style={{ fontFamily: "var(--serif)", fontSize: "1rem", fontWeight: 300, lineHeight: 2.0, color: "var(--ink)", marginBottom: "2rem", maxWidth: "58ch" }}>
          It's a fair concern to raise, and worth taking seriously rather than dismissing. The honest answer is that no single experiment like this one can rule it out definitively. But there are a couple of patterns in how people respond that suggest the weight of the man isn't carrying much of the moral judgement on its own.
        </p>
      </Reveal>
      <Reveal delay={180}>
        <p style={{ fontFamily: "var(--serif)", fontSize: "0.95rem", fontWeight: 300, lineHeight: 2.0, color: "var(--muted)", fontStyle: "italic", marginBottom: "3.5rem", maxWidth: "55ch" }}>
          People who say morality is about maximising happiness are noticeably more willing to push him off the bridge than people who reject that view — which tracks their stated principles, not any attitude toward body size.
        </p>
      </Reveal>
      <Reveal delay={220}>
        <StatsBar yesPct={51} leftLabel="maximise-happiness believers who'd push" rightLabel="" />
      </Reveal>
      <Reveal delay={260}>
        <StatsBar yesPct={27} leftLabel="everyone else who'd push" rightLabel="" />
      </Reveal>
      <Reveal delay={300}>
        <p style={{ fontFamily: "var(--serif)", fontSize: "1rem", fontWeight: 300, lineHeight: 2.0, color: "var(--ink)", marginBottom: "3.5rem", maxWidth: "58ch" }}>
          The second pattern: among people who wouldn't even divert the train in the very first scenario — the least controversial case — almost none of them are willing to push the man off the bridge either. If the man's size were the thing actually driving the judgement, you'd expect at least some of that group to make an exception for him regardless of their general view on diverting. That's not what the data shows.
        </p>
      </Reveal>
      <Reveal delay={340}>
        <button onClick={onContinue} style={{
          fontFamily: "var(--mono)", fontSize: "0.6rem", letterSpacing: "0.12em",
          color: "var(--ink)", border: "1px solid var(--ink)", padding: "0.75rem 1.6rem",
          backgroundColor: "transparent", cursor: "pointer", transition: "all 0.2s",
        }}
        onMouseEnter={e => { e.currentTarget.style.backgroundColor = "var(--ink)"; e.currentTarget.style.color = "var(--white)"; }}
        onMouseLeave={e => { e.currentTarget.style.backgroundColor = "transparent"; e.currentTarget.style.color = "var(--ink)"; }}>
          (continue)
        </button>
      </Reveal>
    </div>
  );
}

/* ─── Overall results page ─── */
function OverallResults({
  answers, score, violated, onRetry,
}: {
  answers: { propositions: Record<string, boolean>; scenarios: Record<string, boolean> };
  score: number;
  violated: { id: string; description: string }[];
  onRetry: () => void;
}) {
  return (
    <div style={{ maxWidth: "700px", margin: "0 auto", padding: "9rem 2.2rem 11rem" }}>
      <Reveal>
        <p style={{ fontFamily: "var(--mono)", fontSize: "0.52rem", letterSpacing: "0.2em", color: "var(--muted)", marginBottom: "3rem" }}>
          analysis 04 / 04 — overall results
        </p>
      </Reveal>
      <Reveal delay={60}>
        <h2 style={{ fontFamily: "var(--serif)", fontSize: "clamp(1.8rem, 4vw, 2.8rem)", fontWeight: 400, fontStyle: "italic", lineHeight: 1.05, color: "var(--ink)", marginBottom: "2rem" }}>
          Your responses, in full
        </h2>
      </Reveal>
      <Reveal delay={100}>
        <p style={{ fontFamily: "var(--serif)", fontSize: "0.9rem", fontStyle: "italic", color: "var(--muted)", lineHeight: 1.7, marginBottom: "3.5rem", maxWidth: "55ch" }}>
          This activity has been completed by {config.totalRespondents.toLocaleString()} people to date.
        </p>
      </Reveal>

      <Reveal delay={140}>
        <div style={{ marginBottom: "3.5rem" }}>
          <p style={{ fontFamily: "var(--mono)", fontSize: "0.5rem", letterSpacing: "0.15em", color: "var(--muted)", marginBottom: "1.2rem" }}>
            your propositions
          </p>
          {config.propositions.map(p => (
            <div key={p.id} style={{ display: "grid", gridTemplateColumns: "1fr 60px", borderTop: "1px solid var(--border)", padding: "0.7rem 0", alignItems: "center" }}>
              <span style={{ fontFamily: "var(--serif)", fontSize: "0.85rem", color: "var(--ink)" }}>{p.text}</span>
              <span style={{ fontFamily: "var(--mono)", fontSize: "0.48rem", letterSpacing: "0.06em", color: "var(--ink)", textAlign: "right" }}>
                {answers.propositions[p.id] ? "yes" : "no"}
              </span>
            </div>
          ))}
          <div style={{ borderTop: "1px solid var(--border)" }} />
        </div>
      </Reveal>

      <Reveal delay={180}>
        <div style={{ marginBottom: "3.5rem" }}>
          <p style={{ fontFamily: "var(--mono)", fontSize: "0.5rem", letterSpacing: "0.15em", color: "var(--muted)", marginBottom: "1.2rem" }}>
            your scenarios vs. the {config.totalRespondents.toLocaleString()} before you
          </p>
          {config.scenarios.map(s => (
            <div key={s.id} style={{ display: "grid", gridTemplateColumns: "1fr 70px 70px", gap: "0.8rem", borderTop: "1px solid var(--border)", padding: "0.7rem 0", alignItems: "center" }}>
              <span style={{ fontFamily: "var(--serif)", fontSize: "0.85rem", fontStyle: "italic", color: "var(--ink)" }}>{s.title}</span>
              <span style={{ fontFamily: "var(--mono)", fontSize: "0.46rem", color: "var(--ink)" }}>you: {answers.scenarios[s.id] ? "acted" : "didn't"}</span>
              <span style={{ fontFamily: "var(--mono)", fontSize: "0.46rem", color: "var(--muted)" }}>avg: {s.avgAction}%</span>
            </div>
          ))}
          <div style={{ borderTop: "1px solid var(--border)" }} />
        </div>
      </Reveal>

      {violated.length > 0 && (
        <Reveal delay={220}>
          <div style={{ marginBottom: "4rem" }}>
            <p style={{ fontFamily: "var(--mono)", fontSize: "0.5rem", letterSpacing: "0.15em", color: "var(--muted)", marginBottom: "2rem" }}>
              tensions found
            </p>
            {violated.map(v => (
              <p key={v.id} style={{ fontFamily: "var(--serif)", fontSize: "0.92rem", fontStyle: "italic", color: "var(--ink)", lineHeight: 1.8, marginBottom: "1.2rem", borderLeft: "1px solid var(--border)", paddingLeft: "1.2rem" }}>
                {v.description}
              </p>
            ))}
          </div>
        </Reveal>
      )}

      <Reveal delay={260}>
        <p style={{ fontFamily: "var(--serif)", fontSize: "1.4rem", fontStyle: "italic", color: "var(--ink)", marginBottom: "0.4rem" }}>
          {score}% consistent
        </p>
        <p style={{ fontFamily: "var(--mono)", fontSize: "0.5rem", letterSpacing: "0.08em", color: "var(--muted)", marginBottom: "4rem" }}>
          average across all respondents: 66%
        </p>
      </Reveal>

      <Reveal delay={300}>
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
  const { current, answer, advance, restart, answers, progress } = useExperiment(config);

  const { score, violated } = computeConsistencyScore(answers, config.consistencyRules);

  const showFooter = current.kind === "intro" || current.kind === "overall-results";

  return (
    <div style={{ backgroundColor: "var(--white)", minHeight: "100vh" }}>
      <Nav />
      <div style={{ paddingTop: "3rem" }}>
        {current.kind === "intro" && <IntroScreen onStart={advance} />}

        {current.kind === "proposition" && (
          <PropositionScreen
            key={current.index}
            index={current.index}
            progress={current.index / (config.propositions.length + config.scenarios.length + 5)}
            onAnswer={(yes) => answer(config.propositions[current.index].id, yes, "propositions")}
          />
        )}

        {current.kind === "preliminary-stats" && (
          <PreliminaryStatsScreen onContinue={advance} />
        )}

        {current.kind === "scenario" && (
          <ScenarioScreen
            key={current.index}
            index={current.index}
            progress={(config.propositions.length + 1 + current.index) / (config.propositions.length + config.scenarios.length + 5)}
            answers={answers}
            onAnswer={(tookAction) => answer(config.scenarios[current.index].id, tookAction, "scenarios")}
          />
        )}

        {current.kind === "analysis" && current.page === 1 && (
          <AnalysisPage1 score={score} onContinue={advance} />
        )}
        {current.kind === "analysis" && current.page === 2 && (
          <AnalysisPage2 onContinue={advance} />
        )}
        {current.kind === "analysis" && current.page === 3 && (
          <AnalysisPage3 onContinue={advance} />
        )}

        {current.kind === "overall-results" && (
          <OverallResults answers={answers} score={score} violated={violated} onRetry={restart} />
        )}
      </div>
      {showFooter && <Footer />}
    </div>
  );
}
