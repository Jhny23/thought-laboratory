export type Experiment = {
  slug: string;
  thinker: string;
  name: string;
  year: string;
  status: "available" | "soon";
  domain: string;
  duration: string;
  description: string;
  subtext: string;
  hue: string;
};

export const experiments: Experiment[] = [
  {
    slug: "trolley-problem",
    thinker: "Philippa Foot · Judith Jarvis Thomson",
    name: "Should You Kill the Fat Man?",
    year: "1967",
    status: "available",
    domain: "ethics · life and death",
    duration: "6 min · 4 scenarios",
    hue: "#C9CDD4",
    description:
      "A runaway train. Five people on the track. One person who could be sacrificed to save them. The same underlying logic, dressed in four different scenarios — and most people don't answer them the same way twice.",
    subtext:
      "Originating with Philippa Foot and developed further by Judith Jarvis Thomson, the trolley problem remains one of the most discussed thought experiments in moral philosophy. It tests whether your intuitions actually follow the principles you claim to hold.",
  },
  {
    slug: "philosophical-health-test",
    thinker: "Philosophy Experiments",
    name: "Philosophical Health Test",
    year: "2002",
    status: "available",
    domain: "belief · consistency",
    duration: "5 min · 30 statements",
    hue: "#D6CFC4",
    description:
      "Thirty statements. Two choices each. The test doesn't judge whether your beliefs are right or wrong — it finds where they contradict each other.",
    subtext:
      "The Philosophical Health Check was developed by Philosophy Experiments. It identifies logical tensions between pairs of beliefs you hold simultaneously.",
  },
  {
    slug: "trolley-problem",
    thinker: "Philippa Foot · Judith Jarvis Thomson",
    name: "Should You Kill the Fat Man?",
    year: "1967",
    status: "available",
    domain: "moral intuition · consequentialism",
    duration: "6 min · 8 questions",
    hue: "#C9CDD4",
    description:
      "A runaway train. Five people on the track. One person on a bridge above. The scenarios get harder. Your answers will be tested for consistency.",
    subtext:
      "The Trolley Problem was first outlined by Philippa Foot in 1967 and developed by Judith Jarvis Thomson. It remains the most discussed thought experiment in moral philosophy.",
  },
  {
    slug: "moral-luck",
    thinker: "Thomas Nagel",
    name: "Moral Luck",
    year: "1979",
    status: "soon",
    domain: "responsibility · chance",
    duration: "7 min · 8 scenarios",
    hue: "#D4C9C4",
    description:
      "Two people make identical choices. One outcome is fine. The other causes harm — purely by chance. Are they equally guilty? Almost everyone says no, then contradicts themselves.",
    subtext:
      "Thomas Nagel's essay Moral Luck (1979) exposed a fundamental tension in our moral thinking: we hold people responsible for outcomes that were partly or entirely beyond their control.",
  },
  {
    slug: "the-absurd",
    thinker: "Albert Camus",
    name: "The Absurd",
    year: "1942",
    status: "soon",
    domain: "meaning · existence",
    duration: "10 min · open-ended",
    hue: "#C4C9C4",
    description:
      "Life has no inherent meaning. You will die. Your work will be forgotten. Camus said the only serious philosophical question is whether to continue. What do you do with that knowledge?",
    subtext:
      "From The Myth of Sisyphus (1942). Camus identified three responses to the absurd: physical suicide, philosophical suicide (a leap of faith), or revolt.",
  },
  {
    slug: "determinism-court",
    thinker: "David Hume",
    name: "Determinism Court",
    year: "1748",
    status: "soon",
    domain: "free will · causation",
    duration: "9 min · 7 decisions",
    hue: "#CCC4C9",
    description:
      "A person commits a crime. The experiment walks you through their genetics, upbringing, neurology, circumstances. At each step you decide: are they still responsible?",
    subtext:
      "Drawing on Hume's An Enquiry Concerning Human Understanding (1748), which argued that all human actions are determined by prior causes.",
  },
  {
    slug: "repugnant-conclusion",
    thinker: "Derek Parfit",
    name: "Repugnant Conclusion",
    year: "1984",
    status: "soon",
    domain: "ethics · population",
    duration: "8 min · 5 decisions",
    hue: "#C4CACC",
    description:
      "Would a world of ten billion very happy people be better or worse than a world of one hundred trillion people who are just barely happy? Consistent utilitarian reasoning leads somewhere most people find monstrous.",
    subtext:
      "Derek Parfit introduced this problem in Reasons and Persons (1984). His conclusion has never been satisfactorily resolved.",
  },
];
