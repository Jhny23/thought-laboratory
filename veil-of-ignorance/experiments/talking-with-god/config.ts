// Talking with God — experiment config
// A branching dialogue built around the Euthyphro dilemma (Plato, Euthyphro).
// The experiment is a small graph: each node asks one question, each option
// optionally carries a response (a cost, a contradiction, or a regress) and
// points at the next node.

export type Branch = "A" | "B";

export type NodeId =
  | "frame"
  | "core"
  | "arbitrariness"
  | "tautology"
  | "sovereignty"
  | "secular"
  | "nature";

export type Next = NodeId | "results";

export type ResponseKind =
  | "cost"          // a consistent position that carries a real penalty
  | "contradiction" // the answer clashes with an earlier one; you swap horns
  | "regress"       // the "God's nature" escape collapses back into a horn
  | "ending";       // the conversation stops here

export interface Response {
  kind: ResponseKind;
  title: string;
  explanation: string;
}

export interface Option {
  label: string;
  next: Next;
  /** Which horn of the dilemma this answer commits you to, if any. */
  branch?: Branch;
  response?: Response;
}

export interface DialogueNode {
  id: NodeId;
  /** Short label shown above the question. */
  step: string;
  prompt: string;
  options: Option[];
}

export const nodes: Record<NodeId, DialogueNode> = {
  frame: {
    id: "frame",
    step: "the premise",
    prompt:
      "In this conversation, “God” means the God of the Abrahamic traditions: all-powerful, all-knowing and perfectly good. Not nature, and not a metaphor for love or the universe. Do you accept that definition for the sake of the conversation?",
    options: [
      { label: "Yes, I accept that definition.", next: "core" },
      {
        label: "No, I don’t.",
        next: "results",
        response: {
          kind: "ending",
          title: "Then the dilemma has no purchase",
          explanation:
            "The Euthyphro dilemma is aimed at classical monotheism, where God is both the supreme power and the supreme good. If your God is something else, such as nature, an impersonal ground of being or a symbol, the question of whether God commands the good or the good commands God does not arise in the same way. The conversation ends here.",
        },
      },
    ],
  },

  core: {
    id: "core",
    step: "the dilemma",
    prompt:
      "Suppose God commands us not to murder. Which of these best explains why murder is wrong?",
    options: [
      {
        label: "Murder is wrong simply and solely because God forbids it.",
        next: "arbitrariness",
        branch: "A",
      },
      {
        label: "God forbids murder because murder is wrong in itself.",
        next: "sovereignty",
        branch: "B",
      },
      {
        label: "Murder is wrong because it goes against God’s own nature.",
        next: "nature",
      },
    ],
  },

  // ── Horn A: divine command ──
  arbitrariness: {
    id: "arbitrariness",
    step: "horn one · God’s command",
    prompt:
      "If an act is right or wrong solely because God commands or forbids it, then consider this: what if God commanded you to torture an innocent child tomorrow?",
    options: [
      {
        label:
          "It would become right, and my duty. Whatever God commands is good.",
        next: "tautology",
        branch: "A",
        response: {
          kind: "cost",
          title: "The arbitrariness problem",
          explanation:
            "You have kept God’s authority absolute, and the price is steep. If goodness is nothing more than whatever God happens to command, then cruelty, theft and betrayal are wrong only because of a current decree. Had God decreed otherwise, they would be virtues. Morality starts to look like whim, not principle.",
        },
      },
      {
        label:
          "God could never command that. Torturing an innocent child is wrong in itself.",
        next: "sovereignty",
        branch: "B",
        response: {
          kind: "contradiction",
          title: "You have changed horns",
          explanation:
            "You began by saying that nothing is wrong except by God’s command. Now you say torture is wrong independently of any command. That is the second horn of the dilemma: goodness exists before God commands it. The conversation moves you across.",
        },
      },
    ],
  },

  tautology: {
    id: "tautology",
    step: "horn one · God is good",
    prompt:
      "Believers often praise God as good, as morally perfect. If “good” just means “what God commands”, what does it mean to say “God is good”?",
    options: [
      {
        label: "That God acts in line with his own will. He does what he commands.",
        next: "results",
        branch: "A",
        response: {
          kind: "cost",
          title: "The empty compliment",
          explanation:
            "Then “God is good” shrinks to “God does what God wills”, which is true by definition and so says nothing. It is like praising a ruler as lawful because they follow their own laws. The sentence stops being praise and becomes a tautology.",
        },
      },
      {
        label: "That God meets an objective standard of moral goodness.",
        next: "sovereignty",
        branch: "B",
        response: {
          kind: "contradiction",
          title: "You have changed horns",
          explanation:
            "A standard that God meets is a standard that exists apart from his commands, and that contradicts the view that goodness is defined by those commands. You have stepped onto the second horn.",
        },
      },
    ],
  },

  // ── Horn B: independent standard ──
  sovereignty: {
    id: "sovereignty",
    step: "horn two · God’s power",
    prompt:
      "If murder is wrong in its own right, and God forbids it because it is wrong, then moral truths stand independently of God, much as 2 + 2 = 4 does. Can God change those truths?",
    options: [
      {
        label: "No. God can no more make murder good than make a square circle.",
        next: "secular",
        branch: "B",
        response: {
          kind: "cost",
          title: "The limit on God’s sovereignty",
          explanation:
            "You have kept morality objective and non-arbitrary, but God is no longer the author of all that is. There are moral facts he did not create and cannot alter, and he is bound by them. God becomes the best possible follower of the moral law, not its source.",
        },
      },
      {
        label: "Yes. God can rewrite moral truths whenever he wishes.",
        next: "arbitrariness",
        branch: "A",
        response: {
          kind: "contradiction",
          title: "You have changed horns",
          explanation:
            "If God can change moral truths at will, they were never independent of him, and you are back to the view that goodness depends on his will. The conversation moves you across to the first horn.",
        },
      },
    ],
  },

  secular: {
    id: "secular",
    step: "horn two · God and ethics",
    prompt:
      "If moral truths exist independently of God, can a person know right from wrong, and act on it, without believing in God?",
    options: [
      {
        label: "Yes. Non-believers can discover and follow moral truths too.",
        next: "results",
        branch: "B",
        response: {
          kind: "cost",
          title: "God is not needed for morality",
          explanation:
            "If anyone can reach moral truth without God, then God is at most a helpful teacher, not the foundation of ethics. Morality can stand without him.",
        },
      },
      {
        label: "No. People need God, or revelation, to know right from wrong.",
        next: "results",
        branch: "B",
        response: {
          kind: "cost",
          title: "God as messenger",
          explanation:
            "Then God’s role is to report moral facts, like a reliable textbook or an expert witness, and not to make them true. He is the courier of the good, not its author.",
        },
      },
    ],
  },

  // ── The third way: God's nature ──
  nature: {
    id: "nature",
    step: "the third way",
    prompt:
      "You said murder is wrong because it goes against God’s nature. Let’s press on that. Why is God’s nature good?",
    options: [
      {
        label: "Because God made his nature good. He willed it to be so.",
        next: "arbitrariness",
        branch: "A",
        response: {
          kind: "regress",
          title: "The first horn, one level down",
          explanation:
            "If God’s nature is good because he chose it, then goodness is again whatever God happens to decide, only now the decision is about his own character. The arbitrariness returns, just one step further back.",
        },
      },
      {
        label: "Because it measures up to a standard of goodness.",
        next: "sovereignty",
        branch: "B",
        response: {
          kind: "regress",
          title: "The second horn, one level down",
          explanation:
            "If God’s nature is good because it meets a standard, then that standard sits above God, and he is measured against it. The independent standard returns, just one step further back.",
        },
      },
    ],
  },
};

export const START: NodeId = "frame";

/** After this many changes of horn the conversation stops and calls it a draw. */
export const MAX_SWINGS = 3;

export interface Position {
  name: string;
  tradition: string;
  description: string;
}

export const positions = {
  declined: {
    name: "Outside the dilemma",
    tradition: "not a classical monotheist",
    description:
      "You did not accept the Abrahamic definition of God, so the Euthyphro dilemma was never aimed at you. It is a problem for a particular picture of God, not for every picture.",
  },
  A: {
    name: "William of Ockham",
    tradition: "divine voluntarism",
    description:
      "You rest morality on God’s will. Ockham, among others, defended this: God is bound by nothing, not even moral law. Your God is fully sovereign, and you carry the costs of arbitrariness and an empty “God is good”.",
  },
  B: {
    name: "Gottfried Leibniz",
    tradition: "divine intellectualism",
    description:
      "You hold that goodness exists before God commands it. Leibniz argued against voluntarism: God chooses the good because it is good, and that is what makes him worthy of praise. Your morality is objective, and your God is not the author of it.",
  },
  pendulum: {
    name: "Socrates",
    tradition: "aporia",
    description:
      "You kept swinging between the horns, unable to rest on either. So did Socrates and Euthyphro, and the dialogue ends with neither of them having an answer. It is a respectable place to stand, since the problem has resisted philosophers for twenty-four centuries.",
  },
} as const;

export type PositionId = keyof typeof positions;

export const horns = {
  A: {
    short: "God controls morality",
    note: "morality is not objective",
  },
  B: {
    short: "Morality controls God",
    note: "God is not omnipotent",
  },
} as const;
