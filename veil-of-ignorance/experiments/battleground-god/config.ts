// Battleground God — experiment config
// Questions, hits, and bullets based on the document provided.

export type Answer = "true" | "false" | "dontknow";

export interface BGQuestion {
  id: number;
  text: string;
  allowDontKnow?: boolean;
}

export interface BGOutcome {
  id: string;
  type: "hit" | "bullet";
  condition: (a: Record<number, Answer>) => boolean;
  title: string;
  explanation: string;
}

export const questions: BGQuestion[] = [
  { id: 1,  text: "God exists.", allowDontKnow: true },
  { id: 2,  text: "God is a logical possibility — there is nothing contradictory about the very idea of God." },
  { id: 3,  text: "If God does not exist then there is no basis for morality." },
  { id: 4,  text: "Any entity that it is right to call God must be free to do anything." },
  { id: 5,  text: "Any entity that it is right to call God must want there to be as little suffering in the world as is possible." },
  { id: 6,  text: "Any entity that it is right to call God must have the power to do anything." },
  { id: 7,  text: "While there might be argument over the details, evolution by natural selection is the correct explanation for the origin of species." },
  { id: 8,  text: "It is justified to base one's belief about the external world — the world outside one's head — on a firm inner conviction, even in the absence of any independent evidence for the truth of this conviction." },
  { id: 9,  text: "Any entity that it is right to call God must know everything there is to know." },
  { id: 10, text: "Torturing innocent people is morally wrong." },
  { id: 11, text: "If a thorough search for extraterrestrial intelligence lasting many decades brings no evidence of alien life, it is rational to believe that intelligent aliens do not exist." },
  { id: 12, text: "People who die of horrible, painful diseases need to die in such a way for some higher purpose." },
  { id: 13, text: "If God exists, She can make it so that everything now considered sinful becomes morally acceptable, and everything now considered morally good becomes sinful." },
  { id: 14, text: "It is foolish to believe in God without certain, irrevocable proof that God exists." },
  { id: 15, text: "The lack of compelling arguments or evidence to show that God does not exist necessarily means that atheism is irrational — something akin to a faith." },
  { id: 16, text: "The serial killer Peter Sutcliffe had a firm inner conviction that God wanted him to kill prostitutes. He was therefore justified in believing he was carrying out God's will in murdering his victims." },
  { id: 17, text: "If God exists, She can create square circles and make 1 + 1 = 72." },
  { id: 18, text: "It is justified to believe in God if one has a firm inner conviction that God exists, even if there is no independent evidence that God exists." },
];

export const outcomes: BGOutcome[] = [
  // ── BULLETS ──
  {
    id: "bullet-1-2",
    type: "bullet",
    condition: a => a[1] === "true" && a[2] === "false",
    title: "God exists but is logically impossible",
    explanation: "How can it be claimed that God exists, yet God is a logical impossibility? Indeed, many would see this as a direct hit, because it is usually held that a logical impossibility cannot exist. But we would rather say this view requires biting a nasty bullet: if you really believe logical impossibilities can exist, what criteria can you use to determine whether anything in this world is possible or not?",
  },
  {
    id: "bullet-1-false-3",
    type: "bullet",
    condition: a => a[1] !== "true" && a[3] === "true",
    title: "Morality requires God — but God doesn't exist",
    explanation: "You've indicated that God doesn't exist, yet you also hold that without God there is no basis for morality. This commits you to the view that there is no basis for morality — a bullet most people find very hard to swallow.",
  },
  {
    id: "bullet-6-17-false",
    type: "bullet",
    condition: a => a[6] === "true" && a[17] === "false",
    title: "God is all-powerful but cannot do logical impossibilities",
    explanation: "You've said God must have the power to do anything, but denied that God can create square circles or make 1+1=72. These are logically impossible tasks. This requires biting a bullet: either 'all-powerful' must be qualified to exclude logical impossibilities, or your two answers are in tension.",
  },
  {
    id: "bullet-4-13",
    type: "bullet",
    condition: a => a[4] === "true" && a[13] === "false",
    title: "God is free to do anything — but not to redefine morality",
    explanation: "You hold that God must be free to do anything, but deny that God can make sinful things morally good and vice versa. If God is truly free to do anything, this should include the power to redefine the moral order. Denying it limits God's freedom and bites a bullet.",
  },
  {
    id: "bullet-5-12",
    type: "bullet",
    condition: a => a[5] === "true" && a[12] === "false",
    title: "God wants minimal suffering — but painful deaths serve no purpose",
    explanation: "You hold that God wants to minimise suffering, but deny that those who die horrible deaths do so for some higher purpose. If God wants minimal suffering yet such suffering exists, it requires a purpose to justify God's failure to prevent it. Denying a purpose while affirming a benevolent God is an uncomfortable position.",
  },
  {
    id: "bullet-8-16",
    type: "bullet",
    condition: a => a[8] === "true" && a[16] === "false",
    title: "Inner conviction justifies belief — but not for Sutcliffe",
    explanation: "You've said it is justified to base beliefs on firm inner conviction without independent evidence. But you denied that Peter Sutcliffe was justified in his conviction that God wanted him to kill. If inner conviction is a valid basis for belief, it is difficult to say it was not valid for Sutcliffe — however unpalatable that conclusion is.",
  },
  {
    id: "bullet-11-7",
    type: "bullet",
    condition: a => a[11] === "false" && a[7] === "true",
    title: "Evidence justifies belief in evolution — but not absence of evidence for aliens",
    explanation: "You accept that evolution is correct on the basis of evidence, but deny that decades of absence of evidence for alien life justifies believing aliens don't exist. This sets an inconsistent evidential threshold: evidence justifies belief in one case, but absence of evidence does not justify disbelief in another.",
  },

  // ── HITS ──
  {
    id: "hit-8-18",
    type: "hit",
    condition: a => a[8] === "false" && a[18] === "true",
    title: "Inner conviction rejected — then accepted for God",
    explanation: "Earlier you stated that in the absence of independent evidence, it is not justified to base one's beliefs about the external world on a firm inner conviction. But now you say it is justified to believe in God on precisely these grounds. That's a direct contradiction.",
  },
  {
    id: "hit-6-4",
    type: "hit",
    condition: a => a[6] === "true" && a[4] === "false",
    title: "God has the power to do anything — but is not free to do anything",
    explanation: "You've said God must have the power to do anything, but denied that God must be free to do anything. Power without freedom is an incoherent combination: if God has the power to do something but is not free to do it, what constrains God? This is a direct contradiction in what you require of God.",
  },
  {
    id: "hit-1-true-3",
    type: "hit",
    condition: a => a[1] === "true" && a[3] === "false" && a[10] === "true",
    title: "God exists and grounds morality — but morality doesn't require God",
    explanation: "You believe God exists and that torturing innocents is morally wrong, but deny that morality requires God. If God exists and morality is objective, the question of what grounds that objectivity becomes pressing. These answers don't strictly contradict, but they place you in significant tension.",
  },
  {
    id: "hit-9-12",
    type: "hit",
    condition: a => a[9] === "true" && a[12] === "false" && a[5] === "true",
    title: "God knows everything and wants minimal suffering — but disease serves no higher purpose",
    explanation: "You hold that God must know everything and want minimal suffering, yet deny that those who die of horrible diseases do so for some higher purpose. If God is omniscient and benevolent, every instance of suffering that God permits must be permitted for a reason. Denying that reason while affirming both omniscience and benevolence is a direct contradiction.",
  },
  {
    id: "hit-14-18",
    type: "hit",
    condition: a => a[14] === "true" && a[18] === "true",
    title: "Believing without proof is foolish — yet inner conviction justifies belief in God",
    explanation: "You've said it is foolish to believe in God without certain, irrevocable proof, but also that a firm inner conviction justifies believing in God without independent evidence. Inner conviction is not certain, irrevocable proof. These two positions directly contradict each other.",
  },
  {
    id: "hit-15-11",
    type: "hit",
    condition: a => a[15] === "true" && a[11] === "false",
    title: "Absence of evidence makes atheism irrational — but not absence of alien evidence",
    explanation: "You hold that the absence of evidence for God's non-existence makes atheism irrational. But you deny that decades of absence of evidence for alien life makes belief in no aliens rational. You can't set different evidential standards for the two cases without a principled reason for the distinction — this is a direct contradiction.",
  },
  {
    id: "hit-7-8",
    type: "hit",
    condition: a => a[7] === "true" && a[8] === "true" && a[14] === "true",
    title: "Evidence justifies evolution — inner conviction justifies God — but proof is required",
    explanation: "You accept evolution on the basis of evidence (not irrevocable proof), accept inner conviction as a basis for belief, but also hold that irrevocable proof is required to believe in God. These three positions together are inconsistent: you've accepted lower evidential thresholds in other cases while demanding the highest possible threshold for God.",
  },
];

export const archetypes: Array<{
  minScore: number;
  name: string;
  description: string;
}> = [
  { minScore: 90, name: "Thomas Aquinas", description: "Your beliefs are remarkably coherent. Like Aquinas, you've constructed a rational theological framework that withstands logical scrutiny — whatever your conclusions." },
  { minScore: 75, name: "William of Ockham", description: "Sharp and minimalist. Like Ockham, you are willing to bite the bullet to maintain logical consistency, prioritising reason over comfortable intuition." },
  { minScore: 50, name: "David Hume", description: "Sceptical and probing. Like Hume, your answers reveal the genuine difficulty of these questions — some tensions remain unresolved, but the questioning is serious." },
  { minScore: 0,  name: "Søren Kierkegaard", description: "Like Kierkegaard, you seem willing to embrace contradiction as part of faith — the leap beyond reason. Whether that is a strength or a weakness depends entirely on what you think reason is for." },
];
