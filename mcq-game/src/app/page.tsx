"use client";
import { useEffect, useState } from "react";
import Spinner from "../components/Spinner";
import QuestionCard from "../components/QuestionCard";
import ScoreBadge from "../components/ScoreBadge";
import { ModeToggle } from "../components/theme-switcher";
import { QUESTIONS, Question } from "../game/questions";

export default function Home() {
  const [score, setScore] = useState(0);
  const [current, setCurrent] = useState<Question | null>(null);
  const [spinning, setSpinning] = useState(false);
  const [selected, setSelected] = useState<number | null>(null);
  const [disabled, setDisabled] = useState(false);
  const [lastCorrect, setLastCorrect] = useState<number | null>(null);

  const pickRandom = () => {
    const idx = Math.floor(Math.random() * QUESTIONS.length);
    return QUESTIONS[idx];
  };

  const onSpin = (sector: number) => {
    setSpinning(true);
    setDisabled(true);
    setSelected(null);
    setLastCorrect(null);
    const qIndex = sector % QUESTIONS.length;
    setTimeout(() => {
      setCurrent(QUESTIONS[qIndex]);
      setSpinning(false);
      setDisabled(false);
    }, 350);
  };

  const onSelect = (i: number) => {
    if (!current || disabled) return;
    setSelected(i);
    setDisabled(true);
    const correct = current.answer === i;
    setLastCorrect(current.answer);
    if (correct) setScore((s) => s + 1);
    setTimeout(() => setDisabled(false), 1200);
  };

  useEffect(() => {
    setCurrent(pickRandom());
  }, []);

  return (
    <div className="game-root min-h-screen p-6 sm:p-12 flex flex-col items-center bg-gradient-to-b from-white to-gray-100 dark:from-slate-800 dark:to-slate-900">
      <header className="w-full max-w-4xl flex items-center justify-between mb-6">
        <div className="branding flex items-center gap-3">
          <h1 className="text-2xl font-extrabold text-primary">MCQ Spin!</h1>
        </div>
        <div className="controls flex gap-3 items-center">
          <ScoreBadge score={score} />
          <ModeToggle />
        </div>
      </header>

      <main className="flex flex-col items-center gap-8 w-full max-w-4xl">
        <Spinner onSpin={onSpin} spinning={spinning} />

        <div className="w-full flex flex-col items-center gap-4">
          {current ? (
            <QuestionCard
              question={current.question}
              options={current.options}
              onSelect={onSelect}
              selectedIndex={selected}
              disabled={disabled}
              correctIndex={selected !== null ? lastCorrect : null}
            />
          ) : (
            <div className="bg-card p-6 rounded-lg shadow-md">
              Click the wheel to spin and get a question!
            </div>
          )}
        </div>
      </main>

      <footer className="mt-8 text-sm text-muted-foreground opacity-90">
        Click the wheel to spin — get points for correct answers!
      </footer>
    </div>
  );
}