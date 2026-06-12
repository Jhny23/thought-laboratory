"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { experiments } from "@/app/data/experiments";
import Nav from "@/app/components/Nav";
import Footer from "@/app/components/Footer";

/* ─── PHC DATA ─── */
const statements = [
  { id: 1,  text: "There are no objective moral standards; moral judgements are merely an expression of the values of particular cultures." },
  { id: 2,  text: "So long as they do not harm others, individuals should be free to pursue their own ends." },
  { id: 3,  text: "People should not journey by car if they can walk, cycle or take a train instead." },
  { id: 4,  text: "It is always wrong to take another person's life." },
  { id: 5,  text: "The right to life is so fundamental that financial considerations are irrelevant in any effort to save lives." },
  { id: 6,  text: "Voluntary euthanasia should remain illegal." },
  { id: 7,  text: "Homosexuality is wrong because it is unnatural." },
  { id: 8,  text: "It is quite reasonable to believe in the existence of a thing without even the possibility of evidence for its existence." },
  { id: 9,  text: "The possession of drugs for personal use should be decriminalised." },
  { id: 10, text: "There exists an all-powerful, loving and good God." },
  { id: 11, text: "The second world war was a just war." },
  { id: 12, text: "Having made a choice, it is always possible that one might have chosen otherwise." },
  { id: 13, text: "It is not always right to judge individuals solely on their merits." },
  { id: 14, text: "Judgements about works of art are purely matters of taste." },
  { id: 15, text: "On bodily death, a person continues to exist in a non-physical form." },
  { id: 16, text: "The government should not permit the sale of health treatments which have not been tested for efficacy and safety." },
  { id: 17, text: "There are no objective truths about matters of fact; 'truth' is always relative to particular cultures and individuals." },
  { id: 18, text: "Atheism is a faith just like any other, because it is not possible to prove the non-existence of God." },
  { id: 19, text: "Proper sanitation and medicines are generally good for a society." },
  { id: 20, text: "In certain circumstances, it might be desirable to discriminate positively in favour of a person as recompense for harms done to him/her in the past." },
  { id: 21, text: "Alternative and complementary medicine is as valuable as mainstream medicine." },
  { id: 22, text: "Severe brain-damage can rob a person of all consciousness and selfhood." },
  { id: 23, text: "To allow an innocent child to suffer needlessly when one could easily prevent it is morally reprehensible." },
  { id: 24, text: "The environment should not be damaged unnecessarily in the pursuit of human ends." },
  { id: 25, text: "Michelangelo is indisputably one of history's finest artists." },
  { id: 26, text: "Individuals have sole rights over their own bodies." },
  { id: 27, text: "Acts of genocide stand as a testament to man's ability to do great evil." },
  { id: 28, text: "The holocaust is an historical reality, taking place more or less as the history books report." },
  { id: 29, text: "Governments should be allowed to increase taxes sharply to save lives in the developing world." },
  { id: 30, text: "The future is fixed, how one's life unfolds is a matter of destiny." },
];

type Tension = {
  a: number; b: number;
  condition: (ans: Record<number, boolean>) => boolean;
  title: string;
  stmtA: string; stmtB: string;
  explanation: string;
  prevalence: number;
};

const tensions: Tension[] = [
  {
    a: 1, b: 27,
    condition: a => a[1] === true && a[27] === true,
    title: "Is morality relative?",
    stmtA: "There are no objective moral standards; moral judgements are merely an expression of the values of particular cultures.",
    stmtB: "Acts of genocide stand as a testament to man's ability to do great evil.",
    explanation: "You hold that morality is merely cultural convention, yet you condemn genocide as objectively evil. If morality is purely relative, genocide can only be 'wrong from your culture's perspective' — which means the perpetrators' view is equally valid. Are you genuinely willing to accept that conclusion?",
    prevalence: 49,
  },
  {
    a: 10, b: 23,
    condition: a => a[10] === true && a[23] === true,
    title: "Is there an all-good, all-powerful God?",
    stmtA: "There exists an all-powerful, loving and good God.",
    stmtB: "To allow an innocent child to suffer needlessly when one could easily prevent it is morally reprehensible.",
    explanation: "This is the classical Problem of Evil. If God is all-powerful and all-good, he could prevent innocent children from suffering and would do so, since allowing it would be morally reprehensible. Yet children suffer from disease, famine, and disaster. The tension between these two beliefs has occupied philosophers and theologians for centuries.",
    prevalence: 31,
  },
  {
    a: 17, b: 28,
    condition: a => a[17] === true && a[28] === true,
    title: "Are there any absolute truths?",
    stmtA: "There are no objective truths about matters of fact; 'truth' is always relative to particular cultures and individuals.",
    stmtB: "The holocaust is an historical reality, taking place more or less as the history books report.",
    explanation: "If truth is always relative to cultures and individuals, then you cannot straightforwardly assert that the Holocaust is a historical fact. It would only be 'true for some people'. This gives intellectual ammunition to Holocaust deniers: on your view, their denial is as epistemically valid as your acceptance. This tension is one of the most politically serious in the test.",
    prevalence: 35,
  },
  {
    a: 26, b: 6,
    condition: a => a[26] === true && a[6] === true,
    title: "Can I make choices for my own body?",
    stmtA: "Individuals have sole rights over their own bodies.",
    stmtB: "Voluntary euthanasia should remain illegal.",
    explanation: "If individuals have sole rights over their own bodies, on what grounds should voluntary euthanasia — a choice about what to do with one's own body — remain illegal? The tension is direct. Any attempt to resolve it must explain why the right to bodily autonomy stops short of decisions about dying.",
    prevalence: 19,
  },
  {
    a: 4, b: 11,
    condition: a => a[4] === true && a[11] === true,
    title: "Is killing always wrong?",
    stmtA: "It is always wrong to take another person's life.",
    stmtB: "The second world war was a just war.",
    explanation: "A just war necessarily involves killing. If it is always wrong to take another person's life, then no war can be just — including one fought against Nazi Germany. To hold both beliefs, you must either abandon the 'always' or explain why the killing involved in a just war is not really 'taking a person's life' in the morally relevant sense.",
    prevalence: 8,
  },
  {
    a: 12, b: 30,
    condition: a => a[12] === true && a[30] === true,
    title: "Is the future fixed?",
    stmtA: "Having made a choice, it is always possible that one might have chosen otherwise.",
    stmtB: "The future is fixed, how one's life unfolds is a matter of destiny.",
    explanation: "If the future is fixed by destiny, then when you stand before two choices, only one outcome is ever possible. The feeling of genuine choice is an illusion. This directly contradicts the belief that you could always have chosen otherwise. Free will and determinism have coexisted uneasily in human thought for millennia — this tension captures exactly why.",
    prevalence: 17,
  },
  {
    a: 19, b: 7,
    condition: a => a[19] === true && a[7] === true,
    title: "Is the unnatural wrong?",
    stmtA: "Proper sanitation and medicines are generally good for a society.",
    stmtB: "Homosexuality is wrong because it is unnatural.",
    explanation: "The argument that homosexuality is wrong because it is unnatural implies that natural equals good and unnatural equals bad. But sophisticated sewage systems and chemotherapy are profoundly unnatural — yet you hold them to be good. If 'unnatural' is not a reliable guide to wrongness in those cases, the argument against homosexuality on these grounds collapses.",
    prevalence: 12,
  },
  {
    a: 22, b: 15,
    condition: a => a[22] === true && a[15] === true,
    title: "What is the seat of the self?",
    stmtA: "Severe brain-damage can rob a person of all consciousness and selfhood.",
    stmtB: "On bodily death, a person continues to exist in a non-physical form.",
    explanation: "You accept that the self depends on brain function — severe brain damage can extinguish it. Yet you also believe the self survives bodily death, when the brain ceases functioning entirely. The tension is not a strict contradiction, but it implies two incompatible worldviews: one where consciousness is caused by brains, and one where it is independent of them.",
    prevalence: 38,
  },
  {
    a: 14, b: 25,
    condition: a => a[14] === true && a[25] === true,
    title: "How do we judge art?",
    stmtA: "Judgements about works of art are purely matters of taste.",
    stmtB: "Michelangelo is indisputably one of history's finest artists.",
    explanation: "If artistic judgement is purely subjective, then no one can be 'indisputably' a great artist — anyone who disagrees is as entitled to their view as you are to yours. The word 'indisputably' implies an objective standard. To hold both, you must explain what makes Michelangelo's greatness more than a matter of personal taste.",
    prevalence: 30,
  },
  {
    a: 16, b: 21,
    condition: a => a[16] === true && a[21] === true,
    title: "What should be permitted?",
    stmtA: "The government should not permit the sale of health treatments which have not been tested for efficacy and safety.",
    stmtB: "Alternative and complementary medicine is as valuable as mainstream medicine.",
    explanation: "Most alternative and complementary treatments have not been subjected to the rigorous clinical trials required of conventional medicine. If you believe the government should prohibit untested treatments, this standard would apply to most alternative therapies. To hold both consistently, you must explain why alternative medicine deserves a different evidential standard.",
    prevalence: 40,
  },
];

type Answers = Record<number, boolean>;
type Demographics = { sex: string; country: string; age: string; education: string; religion: string };

/* ─── Reveal on scroll ─── */
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

/* ─── INTRO ─── */
function Intro({ onStart }: { onStart: () => void }) {
  return (
    <div style={{ maxWidth: "700px", margin: "0 auto", padding: "8rem 1.8rem 10rem" }}>
      <Reveal>
        <p style={{ fontFamily: "var(--mono)", fontSize: "0.52rem", letterSpacing: "0.2em", color: "var(--muted)", marginBottom: "3rem" }}>
          philosophical health test
        </p>
      </Reveal>
      <Reveal delay={80}>
        <h1 style={{ fontFamily: "var(--serif)", fontSize: "clamp(2rem, 5vw, 3.5rem)", fontWeight: 400, fontStyle: "italic", lineHeight: 1.05, color: "var(--ink)", marginBottom: "3rem", letterSpacing: "-0.02em" }}>
          How consistent<br />are your beliefs?
        </h1>
      </Reveal>
      <Reveal delay={140}>
        <div style={{ height: "1px", backgroundColor: "var(--border)", marginBottom: "3rem" }} />
      </Reveal>
      <Reveal delay={180}>
        <p style={{ fontFamily: "var(--serif)", fontSize: "1rem", fontWeight: 300, lineHeight: 1.9, color: "var(--ink)", marginBottom: "1.4rem", maxWidth: "58ch" }}>
          The PHC will take about 5 minutes. You will be presented with 30 statements. For each one, simply indicate whether you agree or disagree. If you're unsure, select the response closest to your opinion.
        </p>
      </Reveal>
      <Reveal delay={220}>
        <p style={{ fontFamily: "var(--serif)", fontSize: "1rem", fontWeight: 300, lineHeight: 1.9, color: "var(--muted)", fontStyle: "italic", marginBottom: "4rem", maxWidth: "52ch" }}>
          The test does not judge whether your beliefs are right or wrong. It identifies where they may contradict each other.
        </p>
      </Reveal>
      <Reveal delay={260}>
        <div style={{ marginBottom: "3rem" }}>
          {[["statements", "30"], ["estimated time", "5 minutes"], ["choices per statement", "agree / disagree"], ["what it measures", "belief consistency"]].map(([k, v]) => (
            <div key={k} style={{ display: "grid", gridTemplateColumns: "160px 1fr", borderTop: "1px solid var(--border)", padding: "0.6rem 0" }}>
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
          (begin test)
        </button>
      </Reveal>
    </div>
  );
}

/* ─── QUESTION ─── */
function Question({
  statement, index, total, onAnswer,
}: {
  statement: typeof statements[0];
  index: number; total: number;
  onAnswer: (agree: boolean) => void;
}) {
  const [chosen, setChosen] = useState<boolean | null>(null);

  const handle = (agree: boolean) => {
    if (chosen !== null) return;
    setChosen(agree);
    setTimeout(() => onAnswer(agree), 500);
  };

  return (
    <div style={{
      minHeight: "100vh", display: "flex", flexDirection: "column",
      justifyContent: "center", maxWidth: "700px",
      margin: "0 auto", padding: "6rem 1.8rem",
      opacity: 1,
    }}>
      {/* Progress */}
      <div style={{ position: "fixed", top: "3rem", left: 0, right: 0, height: "1px", backgroundColor: "var(--border)", zIndex: 99 }}>
        <div style={{ height: "100%", backgroundColor: "var(--ink)", width: `${(index / total) * 100}%`, transition: "width 0.6s ease" }} />
      </div>

      <p style={{ fontFamily: "var(--mono)", fontSize: "0.52rem", letterSpacing: "0.2em", color: "var(--muted)", marginBottom: "2rem" }}>
        statement {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
      </p>

      <h2 style={{
        fontFamily: "var(--serif)", fontSize: "clamp(1.3rem, 3vw, 1.9rem)",
        fontWeight: 400, lineHeight: 1.4, color: "var(--ink)",
        marginBottom: "4rem", maxWidth: "52ch",
      }}>
        {statement.text}
      </h2>

      <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
        {[{ label: "agree", value: true }, { label: "disagree", value: false }].map(opt => {
          const isChosen = chosen === opt.value;
          const isDimmed = chosen !== null && !isChosen;
          return (
            <button
              key={opt.label}
              onClick={() => handle(opt.value)}
              style={{
                textAlign: "left", padding: "1.2rem 1.4rem",
                backgroundColor: isChosen ? "var(--ink)" : "transparent",
                border: `1px solid ${isChosen ? "var(--ink)" : "var(--border)"}`,
                color: isChosen ? "var(--white)" : "var(--ink)",
                fontFamily: "var(--serif)", fontSize: "1rem",
                fontStyle: "italic", cursor: chosen !== null ? "default" : "pointer",
                opacity: isDimmed ? 0.2 : 1,
                transition: "all 0.25s ease",
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

/* ─── DEMOGRAPHICS ─── */
function Demographics({ onSubmit }: { onSubmit: (d: Demographics) => void }) {
  const [form, setForm] = useState<Demographics>({ sex: "", country: "", age: "", education: "", religion: "" });
  const set = (k: keyof Demographics, v: string) => setForm(f => ({ ...f, [k]: v }));

  const fields: { key: keyof Demographics; label: string; options: string[] }[] = [
    { key: "sex", label: "sex", options: ["Male", "Female", "Non-binary", "Prefer not to say"] },
    { key: "country", label: "country", options: ["Kenya", "United Kingdom", "United States", "South Africa", "Nigeria", "India", "Germany", "France", "Other"] },
    { key: "age", label: "age range", options: ["Under 18", "18–24", "25–34", "35–44", "45–54", "55–64", "65+"] },
    { key: "education", label: "education", options: ["No formal education", "Secondary school", "Undergraduate degree", "Postgraduate degree", "Doctoral degree"] },
    { key: "religion", label: "religion", options: ["No religion", "Christianity", "Islam", "Hinduism", "Buddhism", "Judaism", "Other"] },
  ];

  const complete = Object.values(form).every(v => v !== "");

  return (
    <div style={{ maxWidth: "700px", margin: "0 auto", padding: "8rem 1.8rem 10rem" }}>
      <Reveal>
        <p style={{ fontFamily: "var(--mono)", fontSize: "0.52rem", letterSpacing: "0.2em", color: "var(--muted)", marginBottom: "3rem" }}>
          about you
        </p>
      </Reveal>
      <Reveal delay={60}>
        <h2 style={{ fontFamily: "var(--serif)", fontSize: "clamp(1.8rem, 4vw, 2.8rem)", fontWeight: 400, fontStyle: "italic", lineHeight: 1.05, color: "var(--ink)", marginBottom: "1.4rem" }}>
          Demographics
        </h2>
      </Reveal>
      <Reveal delay={100}>
        <p style={{ fontFamily: "var(--serif)", fontSize: "0.95rem", fontWeight: 300, lineHeight: 1.9, color: "var(--muted)", marginBottom: "3rem", maxWidth: "52ch" }}>
          A few questions so we can analyse how you've done compared to others. This information is anonymous and used for statistical analysis only.
        </p>
      </Reveal>

      <div style={{ display: "flex", flexDirection: "column", gap: "0" }}>
        {fields.map(({ key, label, options }, i) => (
          <Reveal key={key} delay={120 + i * 60}>
            <div style={{ display: "grid", gridTemplateColumns: "120px 1fr", alignItems: "center", borderTop: "1px solid var(--border)", padding: "0.8rem 0" }}>
              <label style={{ fontFamily: "var(--mono)", fontSize: "0.52rem", letterSpacing: "0.1em", color: "var(--muted)" }}>
                {label}
              </label>
              <select
                value={form[key]}
                onChange={e => set(key, e.target.value)}
                style={{
                  fontFamily: "var(--mono)", fontSize: "0.55rem", letterSpacing: "0.06em",
                  color: form[key] ? "var(--ink)" : "var(--muted)",
                  backgroundColor: "transparent", border: "none",
                  borderBottom: "1px solid var(--border)", padding: "0.3rem 0",
                  outline: "none", cursor: "pointer", appearance: "none",
                  WebkitAppearance: "none",
                }}
              >
                <option value="">select...</option>
                {options.map(o => <option key={o} value={o}>{o}</option>)}
              </select>
            </div>
          </Reveal>
        ))}
        <div style={{ borderTop: "1px solid var(--border)" }} />
      </div>

      <Reveal delay={500}>
        <button
          onClick={() => complete && onSubmit(form)}
          style={{
            marginTop: "3rem",
            fontFamily: "var(--mono)", fontSize: "0.6rem", letterSpacing: "0.12em",
            color: complete ? "var(--ink)" : "var(--muted)",
            border: `1px solid ${complete ? "var(--ink)" : "var(--border)"}`,
            padding: "0.75rem 1.6rem", backgroundColor: "transparent",
            cursor: complete ? "pointer" : "default", transition: "all 0.2s",
          }}
          onMouseEnter={e => { if (complete) { e.currentTarget.style.backgroundColor = "var(--ink)"; e.currentTarget.style.color = "var(--white)"; } }}
          onMouseLeave={e => { if (complete) { e.currentTarget.style.backgroundColor = "transparent"; e.currentTarget.style.color = "var(--ink)"; } }}
        >
          (submit)
        </button>
      </Reveal>
    </div>
  );
}

/* ─── RESULTS ─── */
function Results({ answers, onRetry }: { answers: Answers; onRetry: () => void }) {
  const found = tensions.filter(t => t.condition(answers));
  const score = Math.round((found.length / tensions.length) * 100);
  const avgScore = 29;

  return (
    <div style={{ maxWidth: "700px", margin: "0 auto", padding: "8rem 1.8rem 10rem" }}>
      <Reveal>
        <p style={{ fontFamily: "var(--mono)", fontSize: "0.52rem", letterSpacing: "0.2em", color: "var(--muted)", marginBottom: "3rem" }}>
          your results
        </p>
      </Reveal>

      <Reveal delay={60}>
        <h2 style={{ fontFamily: "var(--serif)", fontSize: "clamp(2rem, 6vw, 4rem)", fontWeight: 400, fontStyle: "italic", lineHeight: 0.95, color: "var(--ink)", marginBottom: "3rem", letterSpacing: "-0.02em" }}>
          {found.length === 0 ? "No tensions found." : `${found.length} tension${found.length === 1 ? "" : "s"} found.`}
        </h2>
      </Reveal>

      <Reveal delay={100}>
        <div style={{ height: "1px", backgroundColor: "var(--border)", marginBottom: "3rem" }} />
      </Reveal>

      {/* Score bar */}
      <Reveal delay={140}>
        <div style={{ marginBottom: "4rem" }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.6rem" }}>
            <span style={{ fontFamily: "var(--mono)", fontSize: "0.5rem", letterSpacing: "0.1em", color: "var(--muted)" }}>0%</span>
            <span style={{ fontFamily: "var(--mono)", fontSize: "0.5rem", letterSpacing: "0.1em", color: "var(--muted)" }}>tension quotient</span>
            <span style={{ fontFamily: "var(--mono)", fontSize: "0.5rem", letterSpacing: "0.1em", color: "var(--muted)" }}>100%</span>
          </div>
          <div style={{ height: "1px", backgroundColor: "var(--border)", position: "relative", marginBottom: "1.5rem" }}>
            {/* Your score */}
            <div style={{
              position: "absolute", top: "-4px", left: `${score}%`,
              transform: "translateX(-50%)",
              width: "9px", height: "9px",
              backgroundColor: "var(--ink)",
              transform: "translateX(-50%) rotate(45deg)",
            }} />
            {/* Average */}
            <div style={{
              position: "absolute", top: "-3px", left: `${avgScore}%`,
              transform: "translateX(-50%)",
              width: "7px", height: "7px",
              border: "1px solid var(--muted)", backgroundColor: "transparent",
              transform: "translateX(-50%) rotate(45deg)",
            }} />
          </div>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <span style={{ fontFamily: "var(--mono)", fontSize: "0.5rem", letterSpacing: "0.1em", color: "var(--ink)" }}>you: {score}%</span>
            <span style={{ fontFamily: "var(--mono)", fontSize: "0.5rem", letterSpacing: "0.1em", color: "var(--muted)" }}>average: {avgScore}%</span>
          </div>
        </div>
      </Reveal>

      <Reveal delay={180}>
        <p style={{ fontFamily: "var(--serif)", fontSize: "1rem", fontWeight: 300, lineHeight: 1.9, color: "var(--ink)", marginBottom: "1.4rem", maxWidth: "58ch" }}>
          {found.length === 0
            ? "Your beliefs form a remarkably consistent set — either through careful thinking, familiarity with the test, or luck. Consider trying again with different responses to see what tensions you avoided."
            : `The PHC has identified ${found.length} tension${found.length === 1 ? "" : "s"} in your beliefs. Where beliefs are in tension, either one should be given up, or a coherent way of reconciling them needs to be found.`}
        </p>
      </Reveal>

      <Reveal delay={220}>
        <p style={{ fontFamily: "var(--serif)", fontSize: "0.9rem", fontWeight: 300, lineHeight: 1.85, color: "var(--muted)", fontStyle: "italic", marginBottom: "5rem", maxWidth: "52ch" }}>
          The test only detects tensions between pre-selected pairs of beliefs. There may be additional tensions between beliefs you hold which are not detected here.
        </p>
      </Reveal>

      {/* Tensions detail */}
      {found.map((tension, i) => (
        <Reveal key={`${tension.a}-${tension.b}`} delay={260 + i * 80}>
          <div style={{ marginBottom: "5rem" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "1.2rem" }}>
              <p style={{ fontFamily: "var(--mono)", fontSize: "0.5rem", letterSpacing: "0.15em", color: "var(--muted)" }}>
                statements {tension.a} & {tension.b}
              </p>
              <p style={{ fontFamily: "var(--mono)", fontSize: "0.48rem", letterSpacing: "0.1em", color: "var(--muted)" }}>
                {tension.prevalence}% have this tension
              </p>
            </div>

            <h3 style={{ fontFamily: "var(--serif)", fontSize: "clamp(1.1rem, 2vw, 1.5rem)", fontWeight: 400, lineHeight: 1.2, color: "var(--ink)", marginBottom: "1.8rem" }}>
              {tension.title}
            </h3>

            <div style={{ borderLeft: "1px solid var(--border)", paddingLeft: "1.4rem", marginBottom: "1.6rem" }}>
              <p style={{ fontFamily: "var(--serif)", fontSize: "0.88rem", fontStyle: "italic", color: "var(--muted)", lineHeight: 1.75, marginBottom: "0.8rem" }}>
                "{tension.stmtA}"
              </p>
              <p style={{ fontFamily: "var(--serif)", fontSize: "0.88rem", fontStyle: "italic", color: "var(--muted)", lineHeight: 1.75 }}>
                "{tension.stmtB}"
              </p>
            </div>

            <p style={{ fontFamily: "var(--serif)", fontSize: "0.95rem", fontWeight: 300, lineHeight: 1.9, color: "var(--ink)", maxWidth: "58ch" }}>
              {tension.explanation}
            </p>

            {i < found.length - 1 && (
              <div style={{ height: "1px", backgroundColor: "var(--border)", marginTop: "4rem" }} />
            )}
          </div>
        </Reveal>
      ))}

      <Reveal delay={400}>
        <div style={{ display: "flex", gap: "1.2rem", flexWrap: "wrap", borderTop: "1px solid var(--border)", paddingTop: "3rem" }}>
          <button onClick={onRetry} style={{
            fontFamily: "var(--mono)", fontSize: "0.6rem", letterSpacing: "0.12em",
            color: "var(--ink)", border: "1px solid var(--ink)", padding: "0.75rem 1.6rem",
            backgroundColor: "transparent", cursor: "pointer", transition: "all 0.2s",
          }}
          onMouseEnter={e => { e.currentTarget.style.backgroundColor = "var(--ink)"; e.currentTarget.style.color = "var(--white)"; }}
          onMouseLeave={e => { e.currentTarget.style.backgroundColor = "transparent"; e.currentTarget.style.color = "var(--ink)"; }}>
            (take the test again)
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

/* ─── EXPERIMENT DETAIL PAGE (non-PHC) ─── */
function ExperimentDetail({ exp }: { exp: typeof experiments[0] }) {
  return (
    <div style={{ backgroundColor: "var(--white)", minHeight: "100vh" }}>
      <Nav />
      <div style={{ paddingTop: "3rem" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", minHeight: "calc(100vh - 3rem)", borderBottom: "1px solid var(--border)" }}>
          <div style={{ borderRight: "1px solid var(--border)", backgroundColor: exp.hue, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <p style={{ fontFamily: "var(--mono)", fontSize: "0.52rem", letterSpacing: "0.15em", color: "rgba(28,28,26,0.4)" }}>soon</p>
          </div>
          <div style={{ padding: "3rem 2rem", overflowY: "auto" }}>
            <p style={{ fontFamily: "var(--mono)", fontSize: "0.55rem", letterSpacing: "0.1em", color: "var(--muted)", marginBottom: "0.5rem" }}>{exp.thinker}</p>
            <h1 style={{ fontFamily: "var(--serif)", fontSize: "clamp(1.6rem, 3vw, 2.4rem)", fontWeight: 400, fontStyle: "italic", lineHeight: 1.05, color: "var(--ink)", marginBottom: "2.5rem" }}>{exp.name}</h1>
            <p style={{ fontFamily: "var(--serif)", fontSize: "0.95rem", lineHeight: 1.9, color: "var(--ink)", marginBottom: "1.2rem" }}>{exp.description}</p>
            <p style={{ fontFamily: "var(--serif)", fontSize: "0.85rem", fontStyle: "italic", lineHeight: 1.8, color: "var(--muted)", marginBottom: "3rem" }}>{exp.subtext}</p>
            <p style={{ fontFamily: "var(--mono)", fontSize: "0.58rem", letterSpacing: "0.1em", color: "var(--muted)" }}>(coming soon)</p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

/* ─── ROOT ─── */
type Stage = "intro" | "questions" | "demographics" | "results";

export default function ExperimentPage({ params }: { params: { slug: string } }) {
  const exp = experiments.find(e => e.slug === params.slug);
  const [stage, setStage] = useState<Stage>("intro");
  const [qIndex, setQIndex] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});

  if (!exp) return null;

  if (exp.slug !== "philosophical-health-test") {
    return <ExperimentDetail exp={exp} />;
  }

  const handleAnswer = (agree: boolean) => {
    const id = statements[qIndex].id;
    const next = { ...answers, [id]: agree };
    setAnswers(next);
    if (qIndex + 1 >= statements.length) {
      setStage("demographics");
    } else {
      setQIndex(i => i + 1);
    }
  };

  const restart = () => {
    setAnswers({});
    setQIndex(0);
    setStage("intro");
  };

  return (
    <div style={{ backgroundColor: "var(--white)", minHeight: "100vh" }}>
      <Nav />
      <div style={{ paddingTop: "3rem" }}>
        {stage === "intro" && <Intro onStart={() => setStage("questions")} />}
        {stage === "questions" && (
          <Question
            statement={statements[qIndex]}
            index={qIndex}
            total={statements.length}
            onAnswer={handleAnswer}
          />
        )}
        {stage === "demographics" && (
          <Demographics onSubmit={() => setStage("results")} />
        )}
        {stage === "results" && (
          <Results answers={answers} onRetry={restart} />
        )}
      </div>
      {(stage === "intro" || stage === "results") && <Footer />}
    </div>
  );
}
