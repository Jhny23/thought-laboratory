import { ExperimentConfig } from "@/lib/experiment-engine/types";

/* Sourced from Philippa Foot, "The Problem of Abortion and the Doctrine of
   Double Effect" (1967), and Judith Jarvis Thomson, "Killing, Letting Die,
   and the Trolley Problem" (1976) and "The Trolley Problem" (1985).
   Wording throughout is original. */

export const trolleyProblemConfig: ExperimentConfig = {
  id: "trolley-problem",
  title: "Should You Kill the Fat Man?",
  subtitle: "A moral dilemma, four different ways",
  attribution: "Philippa Foot · Judith Jarvis Thomson",
  intro:
    "This experiment draws on the trolley problem literature — Philippa Foot's original driver case, and the bystander, footbridge, and saboteur variants developed by Judith Jarvis Thomson. Before the scenarios, four short questions about how you think morality works in general.",
  introNote:
    "There are no right answers here. What matters is whether your answers to the scenarios actually follow from the principles you say you hold.",
  totalRespondents: 11461,

  propositions: [
    {
      id: "torture-always-wrong",
      text: "Torture, as a matter of principle, is always morally wrong.",
      avgYes: 60,
    },
    {
      id: "maximise-happiness",
      text: "The morality of an action is determined by whether it maximises total happiness, compared with the other options available.",
      avgYes: 43,
    },
    {
      id: "never-cause-death",
      text: "It is always wrong to cause another person's death — if they wish to stay alive — when this is avoidable.",
      avgYes: 52,
    },
    {
      id: "save-innocent-life",
      text: "If you can save innocent lives without reducing total happiness, and without risking your own life, you are morally obliged to do so.",
      avgYes: 76,
    },
  ],

  scenarios: [
    {
      id: "divert-train",
      title: "The Runaway Train",
      source: "Foot, 1967",
      principle: "killing vs. letting die",
      defaultIntro: "That's the preliminary questions done. Now four scenarios, to test those answers against your actual intuitions.",
      text: "The brakes have failed on a train. Five people are standing on the track ahead, with no way to escape in time. A side track leads off to the right, with one person stuck on it. The driver can divert the train onto the siding, killing one — or stay on course, killing five.",
      choices: [
        { label: "Divert the train", killCount: "1 dead" },
        { label: "Let it continue", killCount: "5 dead" },
      ],
      avgAction: 83,
    },
    {
      id: "push-fatman",
      title: "The Man on the Bridge",
      source: "Thomson, 1976 / 1985",
      principle: "doctrine of double effect",
      conditionalIntros: [
        {
          when: a => a.propositions["maximise-happiness"] === false && a.scenarios["divert-train"] === true,
          text: "You don't think morality is fundamentally about maximising happiness — yet you'd divert the train. No contradiction there, but it raises the question of what was actually driving that decision. Here's a scenario built to test it further.",
        },
        {
          when: a => a.propositions["maximise-happiness"] === true && a.scenarios["divert-train"] === false,
          text: "You believe morality is about maximising total happiness, but you wouldn't divert the train. Worth asking what's doing the work in that judgement, since diverting clearly produces more happiness on the numbers alone.",
        },
      ],
      defaultIntro: "Same arithmetic as before. A different way of bringing it about.",
      text: "A train is about to hit five people stuck on the track. You're on a footbridge above the track, next to a large stranger. The only way to stop the train in time is to push him onto the track — his body would derail it, killing him but saving the five. Or you do nothing, and the five die.",
      choices: [
        { label: "Push him onto the track", killCount: "1 dead" },
        { label: "Do nothing", killCount: "5 dead" },
      ],
      avgAction: 37,
    },
    {
      id: "push-saboteur",
      title: "The Saboteur",
      source: "Thomson, 1976",
      principle: "culpability and desert",
      conditionalIntros: [
        {
          when: a => a.scenarios["push-fatman"] === false,
          text: "You wouldn't push an innocent stranger off the bridge — most people answer the same way. Here's a version of the same bridge, with one detail changed.",
        },
        {
          when: a => a.scenarios["push-fatman"] === true,
          text: "You were willing to push the stranger. Let's see if a change in who he is changes anything for you.",
        },
      ],
      text: "Same bridge, same train, same five people on the track below. Except this time, the man standing next to you is the one who sabotaged the train's brakes in the first place — he deliberately set this entire situation in motion. Pushing him onto the track will still save the five. Doing nothing will still mean they die.",
      choices: [
        { label: "Push him onto the track", killCount: "1 dead" },
        { label: "Do nothing", killCount: "5 dead" },
      ],
      avgAction: 78,
    },
    {
      id: "torture-fatman",
      title: "The Ticking Clock",
      source: "philosophyexperiments.com tradition",
      principle: "torture and ticking-bomb cases",
      conditionalIntros: [
        {
          when: a => a.scenarios["push-saboteur"] === true && a.scenarios["push-fatman"] === false,
          text: "You'd push the saboteur but not the innocent stranger — and that's not actually inconsistent. It suggests culpability matters to you: what someone did, not just the raw numbers. Worth keeping in mind for what follows.",
        },
      ],
      defaultIntro: "A different kind of dilemma — not about who dies, but about how far you'll go to prevent it.",
      text: "The saboteur from the bridge has been arrested. He says he's hidden a bomb in a city center, set to explode in 24 hours and kill a million people. He cannot be tricked or persuaded into revealing its location. Experts estimate that torturing him gives a 75% chance of extracting the location in time. Without it, the bomb explodes and a million people die.",
      choices: [
        { label: "Torture him for the location", killCount: "75% chance of saving 1,000,000" },
        { label: "Do not torture him", killCount: "bomb explodes" },
      ],
      avgAction: 83,
    },
  ],

  consistencyRules: [
    {
      id: "utilitarian-implies-both-kills",
      description: "If morality is about maximising total happiness, diverting the train and pushing the stranger should be treated the same way — both trade one life for five.",
      appliesWhen: a => a.propositions["maximise-happiness"] === true,
      isSatisfied: a => a.scenarios["divert-train"] === a.scenarios["push-fatman"],
    },
    {
      id: "never-cause-death-implies-no-divert",
      description: "If causing death is always wrong, diverting the train — which directly causes one death — should be rejected too.",
      appliesWhen: a => a.propositions["never-cause-death"] === true,
      isSatisfied: a => a.scenarios["divert-train"] === false,
    },
    {
      id: "torture-always-wrong-implies-no-bomb-torture",
      description: "If torture is always wrong as a matter of principle, the ticking-bomb case shouldn't be treated as an exception.",
      appliesWhen: a => a.propositions["torture-always-wrong"] === true,
      isSatisfied: a => a.scenarios["torture-fatman"] === false,
    },
    {
      id: "fatman-saboteur-consistency",
      description: "Treating the innocent stranger and the saboteur the same way, despite the difference in culpability, suggests culpability isn't actually doing any moral work for you.",
      appliesWhen: a => a.scenarios["push-fatman"] !== undefined && a.scenarios["push-saboteur"] !== undefined,
      isSatisfied: a => a.scenarios["push-fatman"] !== a.scenarios["push-saboteur"],
    },
  ],
};
