// Metamorphosis — editorial summary of Sartre's lecture "Existentialism Is a Humanism".
//
// Everything here is written for Thought Laboratory in our own words. It is a
// summary of the argument, not a reproduction of the lecture or of any
// translation of it. Edit the copy freely; the layout reads only from this file.

export type Tone = "graphite" | "paper" | "sky";
export type Side = "left" | "right";
export type Orientation = "vertical" | "horizontal";

export interface Section {
  id: string;
  /** The word set very large on the plate page. */
  plate: { word: string; side: Side; orientation: Orientation; tone: Tone };
  /** Background of the text page, which sits opposite the plate. */
  textTone: Tone;
  /** A magazine-style caption, set small at the top of the plate page. */
  caption: string;
  headline: string;
  paragraphs: string[];
}

export const cover = {
  photo: {
    src: "/images/metamorphosis-cover.jpg",
    alt: "A single white sheep stands on a rounded, dark green hill, with more hills rolling away under a pale grey sky.",
  },
  title: ["Existentialism", "Is a", "Humanism"],
  caption:
    "(This page) A lecture given in Paris and published in 1946, in which Sartre answers the critics of existentialism.",
  author: "Jean-Paul Sartre",
  credit: "Summarised by Thought Laboratory",
  lead: [
    "By the time Sartre stood up to speak, his philosophy had already been condemned from two sides. Communists said it was a luxury for people who could afford to brood, a despair that kept everyone from acting. Catholics said it dwelt on the ugliest side of human life and, by dismissing God’s commandments, left everyone free to do as they pleased.",
    "Both camps also complained that it shut each person up inside his own head. Sartre’s reply was to claim the opposite: that existentialism is a humanism, severe but hopeful, and that the people attacking it were really bothered by how much it expects of them. What follows summarises how he gets there, one idea at a time.",
  ],
};

export const sections: Section[] = [
  {
    id: "essence",
    plate: { word: "Essence", side: "left", orientation: "vertical", tone: "graphite" },
    textTone: "paper",
    caption:
      "(This page) The paper-knife, Sartre’s example of a thing whose purpose is settled before it exists.",
    headline: "A made object has a purpose before it exists. A person has none.",
    paragraphs: [
      "Sartre says the word covers two groups: Christian thinkers such as Karl Jaspers and Gabriel Marcel, and atheists such as Martin Heidegger and himself. What they share is the claim usually put as existence before essence.",
      "To see what it means, he asks us to picture a paper-knife. Someone designed it for a job, so the idea of it existed in a craftsman’s mind before the object did. For centuries people imagined God as that craftsman, with every human being made to a plan. Even the eighteenth-century thinkers who dropped God kept the plan, in the form of a fixed human nature.",
      "Sartre drops both. If no God holds a blueprint, nothing marks out in advance what a person is for. We turn up first, in a world we did not choose, and become something afterward.",
    ],
  },
  {
    id: "choice",
    plate: { word: "Choice", side: "right", orientation: "horizontal", tone: "sky" },
    textTone: "graphite",
    caption:
      "(This page) Joining a union and marrying are Sartre’s own examples of private choices that speak for everyone.",
    headline: "Whatever you choose, you are choosing a picture of humanity.",
    paragraphs: [
      "Because nothing defines us beforehand, Sartre says each of us is a project, answerable for what we turn into. He calls this subjectivity, and he insists it does not mean doing as you please. It means that no one else, and nothing else, can take the decision off your hands.",
      "He then pushes it further. Every choice declares the chosen thing to be good, since nobody picks what he thinks is worse, and so it recommends that thing to everyone. A worker who joins a Christian union rather than a Communist one is backing resignation as the right attitude for people in general. A man who marries and has children is endorsing marriage for humanity.",
      "Ordinary decisions, on this view, are small acts of lawmaking. In shaping himself, a person shapes his picture of what a human being should be.",
    ],
  },
  {
    id: "anguish",
    plate: { word: "Anguish", side: "left", orientation: "vertical", tone: "paper" },
    textTone: "graphite",
    caption:
      "(This page) Kierkegaard’s Abraham and a field commander: Sartre’s two figures for the weight of deciding.",
    headline: "Being responsible for everyone is no comfort. It is what makes acting possible.",
    paragraphs: [
      "Anguish is Sartre’s name for what a person feels on seeing that his choices work as rules for everyone. Plenty of people feel nothing, he says, and they are dodging. His test is to ask what would happen if everybody did what you are doing. The reply that not everybody does is a way of hiding from the question.",
      "He borrows Abraham from Kierkegaard. Told by an angel to sacrifice his son, Abraham still has to decide that it really is an angel and that he is really the person being addressed. No proof arrives from outside. The judgment is his alone, as it would be for anyone who hears voices and must decide whether they come from heaven or from their own mind.",
      "This is not paralysis. A commander who sends men into an attack feels the same weight and acts anyway. Anguish, for Sartre, is simply what choosing between real possibilities feels like.",
    ],
  },
  {
    id: "abandonment",
    plate: { word: "Abandonment", side: "right", orientation: "horizontal", tone: "graphite" },
    textTone: "paper",
    caption:
      "(This page) The word comes from Heidegger. For Sartre it means only that there is no one left to appeal to.",
    headline: "If God is gone, the values he guaranteed go with him.",
    paragraphs: [
      "Sartre aims at the secular moralists of 1880s France, who set God aside but kept the rules, as if honesty and decency were written somewhere in an intelligible heaven. He thinks that is the cheap way out. With no perfect mind to think up the good, nothing makes it good in advance.",
      "He takes Dostoevsky’s remark that everything is permitted without God as his starting point. We are left with no one to lean on and no excuse: no human nature to blame, no passion that carries us off, no command to hide behind. Hence his verdict that we are sentenced to freedom. We did not make ourselves, yet everything we do is on us.",
    ],
  },
  {
    id: "student",
    plate: { word: "Stay or go", side: "left", orientation: "horizontal", tone: "sky" },
    textTone: "paper",
    caption:
      "(This page) The student appears in the lecture without a name. His situation is Sartre’s test case for ethics without rules.",
    headline: "A young man must choose between his mother and the Resistance. No rule can decide it.",
    paragraphs: [
      "Sartre tells of a pupil in occupied France. His brother had died fighting in 1940, his father leaned toward collaboration, and his mother had only him. He could stay and be of certain use to her, or cross to England and join the Free French, a larger cause but a doubtful one: he might spend months stuck on the way, or end up filling in forms.",
      "Nothing he had been taught could settle it. Christian charity does not say which road is harder. Kant’s rule against treating people as means cuts both ways. Feeling is no guide either, because how strongly he feels is shown only by what he does. Even choosing an adviser decides the answer, since he already knows roughly what each would say.",
      "So Sartre told him that he was free and should invent an answer. Signs do no better. A Jesuit Sartre met in prison read a run of misfortunes as a call to the Order, though they could as easily have pointed to some other life. The reading was his.",
    ],
  },
  {
    id: "despair",
    plate: { word: "Despair", side: "right", orientation: "vertical", tone: "paper" },
    textTone: "graphite",
    caption:
      "(This page) Sartre’s despair is modest: it means counting only on what lies within your own power.",
    headline: "Act on what is in your power, and do not count on the rest.",
    paragraphs: [
      "Despair, as Sartre uses the word, is not gloom. It means limiting yourself to what depends on your own will and on the odds bearing on your action. You can expect a friend’s train to arrive on time. You cannot plan around everything beyond that, because no God or design adapts the world to your wishes.",
      "Marxists objected that we can rely on others to carry our work on. Sartre accepts this for comrades in a shared cause, people one can actually reckon with. He refuses it for strangers. With no fixed human nature, nobody can promise what free people will do after he is dead, and some of them might build a fascist order.",
      "None of this means retreat. One commits first and then acts, without illusions, doing what one can and expecting nothing beyond it.",
    ],
  },
  {
    id: "action",
    plate: { word: "Action", side: "left", orientation: "horizontal", tone: "graphite" },
    textTone: "sky",
    caption:
      "(This page) Proust, Racine and the coward: three cases of a person being defined by what he did.",
    headline: "A person is the sum of what he does, and nothing more.",
    paragraphs: [
      "Quietism, Sartre says, is telling others to do what you will not. His doctrine is the reverse: for him, a life is real only in what a person actually does. That strips away a familiar consolation, the idea that beneath a disappointing life sits unused talent or a great love that never came. Proust’s genius is his books, and Racine’s is his tragedies. Outside them there is nothing.",
      "He admits this sounds bleak to anyone whose life has not gone well. He also thinks it is the only footing that holds, since dreams and hopes define a person only as dreams and hopes that came to nothing.",
      "He applies the argument to fiction. Critics complained that his characters were cowards. Had he blamed heredity or surroundings, as Zola did, readers would have felt reassured: nothing could be done. Instead he shows the coward as having made himself one, which means he could stop. What people resent, Sartre says, is not his pessimism but the severity of his optimism.",
    ],
  },
  {
    id: "others",
    plate: { word: "Others", side: "right", orientation: "vertical", tone: "graphite" },
    textTone: "paper",
    caption:
      "(This page) Sartre swaps human nature for a human condition: the limits every life meets in some form.",
    headline: "Start from the one certain thing, and you find other people already there.",
    paragraphs: [
      "Critics said that beginning from Descartes’s “I think” locks a person inside himself. Sartre argues the reverse. It is the only starting point that does not treat people as objects, as materialism does with a table or a stone, and no other starting point offers a truth to build on.",
      "The self found there is not alone. To be called jealous, or spiteful, or devout, a person needs others to recognise him as such, and to learn anything about himself he must go through someone else. The world of the “I think” is already a world of other freedoms.",
      "There is no fixed human nature, but there is a human condition: being born into a world where you must work and where you will die. Eras and circumstances differ, yet every purpose answers those same limits, so any purpose can be understood by anyone. Universality is not given. It is made, one choice and one act of understanding at a time.",
    ],
  },
  {
    id: "judgement",
    plate: { word: "Judgement", side: "left", orientation: "horizontal", tone: "paper" },
    textTone: "graphite",
    caption:
      "(This page) Maggie Tulliver and La Sanseverina choose opposite things, yet Sartre counts both as acting for freedom.",
    headline: "“Then nothing matters” does not follow. You cannot not choose, and you can be wrong.",
    paragraphs: [
      "He takes three objections in turn: that his view invites anarchy, that it forbids judging anyone, and that values we invent cannot be serious. On the first, he says declining to choose is itself a choice, and we are always placed in situations that demand a stance. The model he offers is art. No rule says which picture a painter ought to paint, yet nobody calls a Picasso irresponsible. Value appears in the coherence of what gets made.",
      "On judging others, he will not condemn anyone who chooses clearly and sincerely. But he can say that someone is deceiving himself. Blaming passion, or invoking determinism, or claiming that certain values bind us from outside, all hide our freedom, and that is an error, not just a failing. Once a person sees that values depend on him, he can will only freedom, and so the freedom of others too.",
      "On the third, he shrugs. Someone has to invent values if God does not supply them. Life has no meaning until it is lived, and what meaning it has is the one you give it.",
    ],
  },
  {
    id: "humanism",
    plate: { word: "Humanism", side: "right", orientation: "vertical", tone: "sky" },
    textTone: "graphite",
    caption:
      "(This page) Auguste Comte, who founded a religion of humanity, is Sartre’s example of the humanism he rejects.",
    headline: "Two kinds of humanism, and why he accepts only one.",
    paragraphs: [
      "The first treats humanity as the highest value and takes pride in the finest things a few people have done. Sartre finds that absurd: only a dog or a horse could be placed to judge humanity, and neither has ever praised it. Worse, a cult of humanity closes in on itself, and he says it ends in fascism.",
      "His own sense of the word is different. A person is always outside himself, reaching for aims beyond, and there is no universe except the human one. That makes him a humanist, he says, because he reminds people that they have no lawgiver but themselves, and because they become fully human only by pursuing something past themselves, such as liberation.",
      "So existentialism is not despair. It is atheism followed through to its end, and it holds that even a proof that God exists would change nothing. People do not need rescuing by an argument; they need to recover themselves, and no argument will do that for them. It is a philosophy of action, and in that sense an optimistic one.",
    ],
  },
];

export const closing = {
  lead: [
    "Nothing in the lecture hands you an answer, and that is the point. The answer has to be made by you, in a situation you did not pick, in a way you could bear to see everyone copy.",
    "Sartre meant that as a demand. He also meant it as good news.",
  ],
  note:
    "This page summarises Sartre’s lecture in our own words and is not a reproduction of it. The full text is in Philip Mairet’s translation, collected in Walter Kaufmann’s Existentialism from Dostoyevsky to Sartre (Meridian, 1989).",
};
