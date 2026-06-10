export type Biography = {
  slug: string;
  name: string;
  descriptor: string;
  location: string;
  years: string;
  experiment: string;
  experimentSlug: string;
  portrait: string;
  images: string[];
  sections: {
    question: string;
    answer: string;
  }[];
};

export const biographies: Biography[] = [
  {
    slug: "john-rawls",
    name: "John Rawls",
    descriptor: "Philosopher of Justice",
    location: "Baltimore, Maryland",
    years: "1921 — 2002",
    experiment: "Veil of Ignorance",
    experimentSlug: "veil-of-ignorance",
    portrait: "/images/bio-rawls.jpg",
    images: ["/images/bio-rawls-2.jpg", "/images/bio-rawls-3.jpg"],
    sections: [
      {
        question: "Who was John Rawls?",
        answer: "John Rawls was an American moral and political philosopher whose work reshaped the foundations of liberal political theory in the twentieth century. Born in Baltimore in 1921, he spent most of his academic career at Harvard University, where he taught for decades and wrote the works that would define a generation of political thought.",
      },
      {
        question: "What did he believe?",
        answer: "Rawls believed that a just society is one whose basic structure could be agreed upon by rational people who did not know what position they would occupy within it. His central device — the veil of ignorance — asked us to imagine designing society before knowing whether we would be born rich or poor, healthy or ill, talented or not. From behind this veil, he argued, rational people would choose principles that protect the least advantaged members of society.",
      },
      {
        question: "Why does his work still matter?",
        answer: "A Theory of Justice, published in 1971, is widely considered one of the most important works of political philosophy of the twentieth century. It revived social contract theory and gave liberalism a rigorous philosophical foundation at a time when it was under sustained attack from both utilitarian and libertarian thinkers. His insistence that justice requires taking the perspective of the worst-off remains a provocation to both left and right.",
      },
      {
        question: "What is the veil of ignorance?",
        answer: "The veil of ignorance is a thought experiment. Rawls asks us to imagine a hypothetical moment before birth — an original position — in which we must choose the principles that will govern the society we are about to enter, without knowing anything about who we will be within it. We do not know our race, our sex, our class, our talents, our conception of the good. From behind this veil, Rawls argued, we would choose principles of justice that protect everyone equally, because we cannot afford to favour any particular group.",
      },
      {
        question: "How did he live?",
        answer: "Rawls was known for his extraordinary intellectual humility. He revised his work constantly, listened carefully to critics, and remained deeply uncomfortable with public attention. He served in the Pacific during World War II and the experience of witnessing suffering at close range marked his moral thinking for life. He died in 2002, having spent his final years revising and extending his theory to address international justice.",
      },
    ],
  },
  {
    slug: "robert-nozick",
    name: "Robert Nozick",
    descriptor: "Philosopher of Liberty",
    location: "Brooklyn, New York",
    years: "1938 — 2002",
    experiment: "Experience Machine",
    experimentSlug: "experience-machine",
    portrait: "/images/bio-nozick.jpg",
    images: ["/images/bio-nozick-2.jpg"],
    sections: [
      {
        question: "Who was Robert Nozick?",
        answer: "Robert Nozick was an American philosopher who taught at Harvard University for most of his career, and who became — perhaps unexpectedly — the most important philosophical defender of libertarianism in the twentieth century. His first major work, Anarchy, State, and Utopia, appeared in 1974, just three years after Rawls' A Theory of Justice, and was immediately read as its most formidable challenge.",
      },
      {
        question: "What did he stand against?",
        answer: "Nozick argued that individuals have rights so strong that no state or collective has the right to violate them, even in the name of equality or social welfare. Where Rawls saw redistribution as justice, Nozick saw it as coercion. Taxation, he famously argued, is on a par with forced labour. The only legitimate state is a minimal one that protects individuals from violence and theft — nothing more.",
      },
      {
        question: "What is the experience machine?",
        answer: "The experience machine is one of the most discussed thought experiments in modern philosophy. Nozick asks: if you could plug into a machine that would give you any experience you desired — indistinguishable from reality, permanently satisfying — would you do it? Most people say no. And Nozick argues that this reveals something important: we care about more than pleasure. We care about actually doing things, actually being certain kinds of people, actually being in contact with a deeper reality.",
      },
      {
        question: "Did he ever change his mind?",
        answer: "Unlike many philosophers, Nozick publicly revised his views. In The Examined Life, published in 1989, he stepped back from some of the more absolute positions of Anarchy, State, and Utopia, suggesting that his earlier arguments had understated the importance of community and symbolic meaning. This willingness to revise made him unusual — and, to his critics, maddening.",
      },
      {
        question: "How should we remember him?",
        answer: "Nozick died of stomach cancer in 2002, the same year as Rawls. The coincidence felt to many like the closing of a chapter. Together they had defined the terms of political philosophy for thirty years — Rawls arguing for the claims of equality, Nozick for the claims of liberty. Neither won. The argument continues.",
      },
    ],
  },
  {
    slug: "thomas-nagel",
    name: "Thomas Nagel",
    descriptor: "Philosopher of Mind & Morality",
    location: "Belgrade, Yugoslavia",
    years: "1937 —",
    experiment: "Moral Luck",
    experimentSlug: "moral-luck",
    portrait: "/images/bio-nagel.jpg",
    images: ["/images/bio-nagel-2.jpg"],
    sections: [
      {
        question: "Who is Thomas Nagel?",
        answer: "Thomas Nagel is an American philosopher born in Belgrade in 1937 who has spent most of his career at New York University. He is among the most wide-ranging philosophers of his generation — writing with equal authority on the nature of consciousness, the foundations of ethics, political philosophy, and the limits of scientific explanation.",
      },
      {
        question: "What is he most known for?",
        answer: "His 1974 essay 'What Is It Like to Be a Bat?' is one of the most cited papers in the philosophy of mind. Nagel argued that no amount of objective, physical description can capture what it is like to experience something from the inside. There is an irreducible subjective character to conscious experience that science, as currently conceived, cannot touch.",
      },
      {
        question: "What is moral luck?",
        answer: "Moral luck is the disturbing observation that we hold people morally responsible for outcomes that were partly — or entirely — outside their control. Two drivers run a red light. One reaches the other side safely. The other hits a child who runs into the road. We judge them differently, despite the fact that their choices were identical. The difference was luck. Nagel argues this is deeply troubling, and that no satisfying resolution has been found.",
      },
      {
        question: "What drives his philosophy?",
        answer: "Nagel is animated by a profound resistance to reductionism — the tendency to explain complex phenomena away by reducing them to simpler ones. He believes the world contains more than physics can describe, that consciousness cannot be dissolved into neuroscience, and that ethics cannot be grounded purely in self-interest. His 2012 book Mind and Cosmos argued that the standard neo-Darwinian account of nature is fundamentally incomplete — a position that drew fierce criticism and, from some quarters, quiet agreement.",
      },
    ],
  },
  {
    slug: "albert-camus",
    name: "Albert Camus",
    descriptor: "Novelist, Philosopher, Journalist",
    location: "Mondovi, Algeria",
    years: "1913 — 1960",
    experiment: "The Absurd",
    experimentSlug: "the-absurd",
    portrait: "/images/bio-camus.jpg",
    images: ["/images/bio-camus-2.jpg", "/images/bio-camus-3.jpg"],
    sections: [
      {
        question: "Who was Albert Camus?",
        answer: "Albert Camus was a French Algerian novelist, essayist, and playwright who became one of the defining voices of twentieth century European thought. Born into poverty in colonial Algeria in 1913, he won the Nobel Prize for Literature in 1957, three years before his death in a car accident at the age of 46. His life was brief, extraordinarily productive, and marked by an unusual combination of intellectual rigour and sensory joy.",
      },
      {
        question: "What is the absurd?",
        answer: "The absurd, for Camus, is the collision between our human need for meaning, clarity, and purpose, and the universe's complete silence in response to that need. The world offers us no answers. It does not conform to our expectations. It does not care. The absurd is not a property of the world alone, nor of human beings alone — it arises in the space between our longing and the world's indifference.",
      },
      {
        question: "What are the three responses to the absurd?",
        answer: "In The Myth of Sisyphus, Camus identifies three possible responses. Physical suicide — ending one's life because it lacks meaning — he rejects as a failure of honesty. Philosophical suicide — making a leap of faith into religion or ideology — he rejects as intellectual cowardice. The third response, the one he advocates, is revolt: to acknowledge the absurd fully, to refuse false consolations, and to continue living with full intensity in spite of — and in defiance of — the meaninglessness.",
      },
      {
        question: "How does Sisyphus become a hero?",
        answer: "Sisyphus is condemned by the gods to roll a boulder up a hill for eternity, only to watch it roll back down each time. For Camus, this is the human condition. But at the moment Sisyphus descends the hill to begin again — that moment of clear-eyed acknowledgment — Camus sees something like freedom. 'One must imagine Sisyphus happy,' he writes. It is one of the most audacious sentences in modern philosophy.",
      },
      {
        question: "Why does he still matter?",
        answer: "Camus matters because the question he asked — what do we do when we cannot find meaning? — has not gone away. If anything, it presses more urgently in a secular age. His answer asks nothing supernatural of us. It asks only honesty, courage, and a willingness to remain present to the full weight of existence. That is harder than it sounds.",
      },
    ],
  },
  {
    slug: "derek-parfit",
    name: "Derek Parfit",
    descriptor: "Philosopher of Personal Identity & Ethics",
    location: "Chengdu, China",
    years: "1942 — 2017",
    experiment: "Repugnant Conclusion",
    experimentSlug: "repugnant-conclusion",
    portrait: "/images/bio-parfit.jpg",
    images: ["/images/bio-parfit-2.jpg"],
    sections: [
      {
        question: "Who was Derek Parfit?",
        answer: "Derek Parfit was a British philosopher who spent his career at All Souls College, Oxford, and was widely regarded as one of the greatest moral philosophers of the twentieth century. Born in Chengdu, China, where his parents were working as doctors, he lived an unusually ascetic intellectual life — spending his summers at All Souls photographing architecture and his winters writing philosophy with an intensity that those around him found both inspiring and alarming.",
      },
      {
        question: "What made him unusual?",
        answer: "Parfit genuinely believed that philosophy could save lives — that getting our moral reasoning right mattered enormously for the future of humanity. He worked on his masterwork, Reasons and Persons, for over two decades, and then spent the following decades revising and extending it into a three-volume work, On What Matters, which he sent in draft to virtually every major philosopher alive, soliciting criticism. He was famous for his inability to stop working.",
      },
      {
        question: "What is personal identity?",
        answer: "Parfit argued that the common-sense view of personal identity — that there is a deep fact about whether the person who wakes up tomorrow is really you — is mistaken. What matters in survival is not identity but psychological continuity: the connections of memory, intention, and character that link our future selves to our present ones. This has radical implications for how we think about self-interest, rationality, and our obligations to future generations.",
      },
      {
        question: "What is the repugnant conclusion?",
        answer: "The repugnant conclusion is a problem in population ethics. Parfit showed that standard utilitarian reasoning — maximising total welfare — leads to the conclusion that a world containing an enormous number of people whose lives are barely worth living is better than a world containing a smaller number of very happy people. Almost everyone finds this conclusion repugnant. But rejecting it seems to require giving up other principles we are equally unwilling to abandon. No one has yet found a satisfying way out.",
      },
      {
        question: "How did he see himself?",
        answer: "Parfit believed that we are all, in a deep sense, the same — that the separateness of persons is less metaphysically significant than we ordinarily assume. This conviction informed both his ethics and his way of living. He gave much of his income away. He worked without rest. He seemed, to those who knew him, to be animated by a sense of genuine urgency — as if there were real things at stake, and not much time.",
      },
    ],
  },
];