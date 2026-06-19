import { AnswerState, ConsistencyRule } from "./types";

export function computeConsistencyScore(
  answers: AnswerState,
  rules: ConsistencyRule[]
): { score: number; violated: ConsistencyRule[]; applicable: ConsistencyRule[] } {
  const applicable = rules.filter(r => !r.appliesWhen || r.appliesWhen(answers));
  const violated = applicable.filter(r => !r.isSatisfied(answers));
  const score = applicable.length === 0
    ? 100
    : Math.round(((applicable.length - violated.length) / applicable.length) * 100);
  return { score, violated, applicable };
}
