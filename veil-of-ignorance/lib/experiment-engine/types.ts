export type AnswerValue = boolean; // true = "yes" / action taken

export interface AnswerState {
  propositions: Record<string, AnswerValue>;
  scenarios: Record<string, AnswerValue>;
}

export interface Proposition {
  id: string;
  text: string;
  yesLabel?: string;
  noLabel?: string;
  avgYes: number; // population %
}

export interface ScenarioChoice {
  label: string;
  killCount: string;
}

export interface Scenario {
  id: string;
  title: string;
  source: string;
  principle: string;
  defaultIntro?: string;
  conditionalIntros?: Array<{
    when: (a: AnswerState) => boolean;
    text: string;
  }>;
  text: string;
  choices: [ScenarioChoice, ScenarioChoice]; // [action, inaction]
  avgAction: number; // population % who chose action
}

export interface ConsistencyRule {
  id: string;
  description: string;
  appliesWhen?: (a: AnswerState) => boolean;
  isSatisfied: (a: AnswerState) => boolean;
}

export interface ExperimentConfig {
  id: string;
  title: string;
  subtitle: string;
  attribution: string;
  intro: string;
  introNote: string;
  propositions: Proposition[];
  scenarios: Scenario[];
  consistencyRules: ConsistencyRule[];
  totalRespondents: number;
}
