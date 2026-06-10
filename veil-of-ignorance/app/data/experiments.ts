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
  // Colour pair: bg-colour used for the "colour" version of the card hover
  hue: string;
};

export const experiments: Experiment[] = [
  {
    slug: "veil-of-ignorance",
    thinker: "John Rawls",
    name: "Veil of Ignorance",
    year: "1971",
    status: "available",
    domain: "justice · society",
    duration: "8 min · 6 decisions",
    hue: "#D6CFC4",
    description:
      "Imagine you are about to be born, but you do not yet know who you will be. Rich or poor, healthy or sick, majority or minority. From behind this veil of ignorance, you must design the society you will inhabit.",
    subtext:
      "Based on John Rawls' original thought experiment from A Theory of Justice (1971). Rawls argued that principles of justice should be chosen behind a veil of ignorance — a position where no one knows their place in society.",
  },
  {
    slug: "experience-machine",
    thinker: "Robert Nozick",
    name: "Experience Machine",
    year: "1974",
    status: "soon",
    domain: "pleasure · reality",
    duration: "6 min · 5 decisions",
    hue: "#C9CDD4",
    description:
      "A machine can give you any experience you desire — indistinguishable from reality, permanently satisfying. Would you plug in? And if not, what does your refusal reveal about what you actually value?",
    subtext:
      "Robert Nozick introduced the Experience Machine in Anarchy, State, and Utopia (1974) to challenge hedonism — the view that pleasure is the only intrinsic good.",
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
      "From The Myth of Sisyphus (1942). Camus identified three responses to the absurd: physical suicide, philosophical suicide (a leap of faith), or revolt — living fully in the face of meaninglessness.",
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
      "A person commits a crime. The experiment walks you through their genetics, upbringing, neurology, circumstances. At each step you decide: are they still responsible? By the end, your theory of free will is exposed.",
    subtext:
      "Drawing on Hume's An Enquiry Concerning Human Understanding (1748), which argued that all human actions are determined by prior causes — raising the question of whether moral responsibility is coherent.",
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
      "Derek Parfit introduced this problem in Reasons and Persons (1984). His conclusion — that total utilitarianism seems to require a vast population of barely-worth-living lives — has never been satisfactorily resolved.",
  },
];

export const veilQuestions = [
  {
    id: "wealth",
    index: 1,
    domain: "wealth distribution",
    prompt: "How should wealth be distributed in the society you are designing?",
    subtext: "You do not know if you will be born into poverty or privilege.",
    choices: [
      { id: "a", label: "Equal shares for all", sub: "Everyone receives identical resources regardless of contribution", value: 0 },
      { id: "b", label: "A guaranteed floor, merit above", sub: "Basic needs met universally; effort and talent can build more", value: 30 },
      { id: "c", label: "Opportunity equalised, outcomes open", sub: "Same starting conditions; what you make of them is yours", value: 60 },
      { id: "d", label: "Unrestrained free market", sub: "Wealth follows skill, luck, and ambition — no redistribution", value: 100 },
    ],
  },
  {
    id: "healthcare",
    index: 2,
    domain: "healthcare",
    prompt: "You may be born with a chronic illness. How is medical care provided?",
    subtext: "Your condition is unknown to you behind the veil.",
    choices: [
      { id: "a", label: "Universal — identical care for all", sub: "No premium tier. Same hospital, same surgeon, same wait", value: 0 },
      { id: "b", label: "Universal baseline, private optional", sub: "Everyone gets adequate care. The wealthy can add more", value: 33 },
      { id: "c", label: "Insurance-based with safety nets", sub: "Market-driven, with minimum coverage for the destitute", value: 66 },
      { id: "d", label: "Pure private market", sub: "Care is a commodity. What you can pay for, you receive", value: 100 },
    ],
  },
  {
    id: "education",
    index: 3,
    domain: "education",
    prompt: "You may be born to parents with no education. How do children learn?",
    subtext: "Intelligence and curiosity are distributed regardless of birth.",
    choices: [
      { id: "a", label: "Identical schools for all children", sub: "No private schools. One system, uniformly resourced", value: 0 },
      { id: "b", label: "Public excellence, private permitted", sub: "Strong public schools; private schools allowed but regulated", value: 33 },
      { id: "c", label: "Vouchers and school choice", sub: "State funds follow the child — to any accredited school", value: 66 },
      { id: "d", label: "Fully privatised education", sub: "Schools compete. Quality correlates with what families can pay", value: 100 },
    ],
  },
  {
    id: "justice",
    index: 4,
    domain: "criminal justice",
    prompt: "You may be born into a community over-policed by history. How is justice administered?",
    subtext: "You do not know your race, class, or postcode.",
    choices: [
      { id: "a", label: "Restorative — rehabilitation first", sub: "Punishment is proportional. Reintegration is the goal", value: 0 },
      { id: "b", label: "Balanced — fair courts, proportional sentences", sub: "Equal access to defence. Sentences reflect the crime, not identity", value: 33 },
      { id: "c", label: "Retributive — punishment as deterrence", sub: "Harsher penalties for order. Some disparity accepted as systemic", value: 66 },
      { id: "d", label: "Maximum enforcement, minimum mercy", sub: "Security above all. The system is not responsible for your choices", value: 100 },
    ],
  },
  {
    id: "freedom",
    index: 5,
    domain: "personal freedom",
    prompt: "You may hold beliefs that are a minority view. How much freedom of expression exists?",
    subtext: "Majorities often find minorities inconvenient.",
    choices: [
      { id: "a", label: "Absolute — all speech protected", sub: "No idea may be suppressed, however harmful to the majority", value: 100 },
      { id: "b", label: "Broad — speech free, incitement limited", sub: "Expression is near-total; direct calls to violence are restricted", value: 66 },
      { id: "c", label: "Moderate — community standards apply", sub: "Some social consensus limits what may be publicly expressed", value: 33 },
      { id: "d", label: "Collective harmony over individual voice", sub: "Stability is prioritised. Dissent is managed by the state", value: 0 },
    ],
  },
  {
    id: "work",
    index: 6,
    domain: "labour & work",
    prompt: "You may be born into physical labour, or unable to work at all. How is work structured?",
    subtext: "Disability, circumstance, and opportunity are invisible behind the veil.",
    choices: [
      { id: "a", label: "Universal basic income — work is a choice", sub: "Survival is unconditional. Labour is voluntary", value: 0 },
      { id: "b", label: "Strong protections, minimum wage guaranteed", sub: "Work is expected, but protected. Unions are strong", value: 33 },
      { id: "c", label: "Flexible labour markets with safety nets", sub: "Employers and workers negotiate freely; welfare catches the fallen", value: 66 },
      { id: "d", label: "Pure labour market — survival motivates", sub: "No floor. Wages are what the market will pay", value: 100 },
    ],
  },
];

export type Profile = { label: string; description: string; thinker: string; quote: string };

export function getProfile(avg: number): Profile {
  if (avg <= 20) return {
    label: "The Egalitarian",
    description: "You designed a society of deep equality — one where the accident of birth grants no privilege. Behind the veil, you trusted no one, including yourself, to deserve more than another.",
    thinker: "John Rawls", quote: "The principles of justice are chosen behind a veil of ignorance.",
  };
  if (avg <= 40) return {
    label: "The Social Democrat",
    description: "You balanced liberty with security. Your society lifts its weakest members without crushing individual ambition. The difference principle at work.",
    thinker: "John Rawls", quote: "Justice is the first virtue of social institutions.",
  };
  if (avg <= 60) return {
    label: "The Liberal",
    description: "You valued equal opportunity over equal outcome. Your society opens doors — but what happens once inside is yours alone. A fair race, even if the finish line differs.",
    thinker: "John Stuart Mill", quote: "The only freedom which deserves the name is that of pursuing our own good in our own way.",
  };
  if (avg <= 80) return {
    label: "The Libertarian",
    description: "You trusted the market and the individual over collective design. Your society is free but unequal — and you accepted that risk, even not knowing which side of it you would land on.",
    thinker: "Robert Nozick", quote: "Taxation of earnings from labor is on a par with forced labor.",
  };
  return {
    label: "The Strict Libertarian",
    description: "You designed a society of radical freedom. No safety net, no redistribution, no guaranteed floor. You were willing to risk everything — even as someone who might be born with nothing.",
    thinker: "Friedrich Hayek", quote: "The curious task of economics is to demonstrate to men how little they really know about what they imagine they can design.",
  };
}
