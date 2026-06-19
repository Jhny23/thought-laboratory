import { Scenario, AnswerState } from "./types";

export function resolveIntro(scenario: Scenario, answers: AnswerState): string | undefined {
  const match = scenario.conditionalIntros?.find(c => c.when(answers));
  return match?.text ?? scenario.defaultIntro;
}
