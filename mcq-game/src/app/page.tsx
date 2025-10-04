"use client";
import Image from 'next/image';
import { useEffect, useMemo, useState } from 'react';
import Spinner from '../components/Spinner';
import QuestionCard from '../components/QuestionCard';
import ScoreBadge from '../components/ScoreBadge';
import ThemeToggle from '../components/ThemeToggle';
import { QUESTIONS, Question } from '../game/questions';

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
    // when the spinner reports a selected sector, pick a question deterministically from it
    setSpinning(true);
    setDisabled(true);
    setSelected(null);
    setLastCorrect(null);
    // Map sector to a question index
    const qIndex = sector % QUESTIONS.length;
    // small delay to sync with spinner animation
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
    // show feedback then allow spin again
    setTimeout(() => setDisabled(false), 1200);
  };

  useEffect(() => {
    // show an initial question
    setCurrent(pickRandom());
  }, []);

  return (
    <div className="game-root min-h-screen p-6 sm:p-12 flex flex-col items-center bg-gradient-to-b from-[#fff7f0] via-[#f7fbff] to-[#f0fff7]">
      <ScoreBadge score={score} />
      <header className="w-full max-w-4xl flex items-center justify-between mb-6">
        <div className="branding flex items-center gap-3">
          <h1 className="text-2xl font-extrabold text-[#05204A]">MCQ Spin!</h1>
        </div>
        <div className="controls hidden sm:flex gap-3 items-center">
          <ThemeToggle />
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
            <div className="placeholder">Click the wheel to spin and get a question!</div>
          )}
        </div>
      </main>

      <footer className="mt-8 text-sm text-[#334155] opacity-90">Click the wheel to spin — get points for correct answers!</footer>

      <style jsx>{`
        .placeholder{ padding:18px 24px; background:#fff; border-radius:12px; box-shadow:0 6px 20px rgba(0,0,0,.06) }
      `}</style>
    </div>
  );
}
