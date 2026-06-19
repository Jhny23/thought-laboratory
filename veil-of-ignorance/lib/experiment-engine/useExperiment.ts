"use client";
import { useState, useMemo } from "react";
import { ExperimentConfig, AnswerState, AnswerValue } from "./types";

export type Step =
  | { kind: "intro" }
  | { kind: "proposition"; index: number }
  | { kind: "preliminary-stats" }
  | { kind: "scenario"; index: number }
  | { kind: "analysis"; page: number }
  | { kind: "overall-results" };

function buildSteps(config: ExperimentConfig): Step[] {
  return [
    { kind: "intro" },
    ...config.propositions.map((_, index) => ({ kind: "proposition" as const, index })),
    { kind: "preliminary-stats" },
    ...config.scenarios.map((_, index) => ({ kind: "scenario" as const, index })),
    { kind: "analysis", page: 1 },
    { kind: "analysis", page: 2 },
    { kind: "analysis", page: 3 },
    { kind: "overall-results" },
  ];
}

export function useExperiment(config: ExperimentConfig) {
  const [stepIndex, setStepIndex] = useState(0);
  const [answers, setAnswers] = useState<AnswerState>({ propositions: {}, scenarios: {} });

  const steps = useMemo(() => buildSteps(config), [config]);
  const current = steps[stepIndex];

  function answer(key: string, value: AnswerValue, group: "propositions" | "scenarios") {
    setAnswers(prev => ({ ...prev, [group]: { ...prev[group], [key]: value } }));
    setStepIndex(i => i + 1);
  }

  function advance() {
    setStepIndex(i => i + 1);
  }

  function restart() {
    setAnswers({ propositions: {}, scenarios: {} });
    setStepIndex(0);
  }

  return {
    current,
    stepIndex,
    totalSteps: steps.length,
    answer,
    advance,
    restart,
    answers,
    progress: stepIndex / steps.length,
  };
}
