"use client";
import React from 'react';

type Props = {
  question: string;
  options: string[];
  onSelect: (index: number) => void;
  selectedIndex: number | null;
  disabled?: boolean;
  correctIndex?: number | null;
};

export default function QuestionCard({ question, options, onSelect, selectedIndex, disabled, correctIndex }: Props) {
  return (
    <div className="question-card">
      <h2 className="question">{question}</h2>
      <div className="options">
        {options.map((opt, i) => {
          const isSelected = selectedIndex === i;
          const isCorrect = typeof correctIndex === 'number' && correctIndex === i;
          return (
            <button
              key={i}
              className={`option ${isSelected ? 'selected' : ''} ${isCorrect ? 'correct' : ''}`}
              onClick={() => !disabled && onSelect(i)}
              disabled={disabled}
            >
              {opt}
            </button>
          );
        })}
      </div>

      <style jsx>{`
        .question-card { width:100%; max-width:720px; background:linear-gradient(135deg,#ffffffee,#f7fbff); border-radius:12px; padding:18px; box-shadow:0 6px 20px rgba(10,10,10,.06); }
        .question { margin:0 0 12px; font-size:20px; color:#06283D }
        .options { display:grid; grid-template-columns:1fr 1fr; gap:10px }
        .option { padding:12px 10px; border-radius:10px; border:2px solid transparent; background:#fff; cursor:pointer; font-weight:600; transition:all .18s ease; }
        .option:hover { transform:translateY(-3px); box-shadow:0 6px 14px rgba(0,0,0,.06) }
        .option.selected { background:#f0f8ff; border-color:#4d96ff }
        .option.correct { background:linear-gradient(90deg,#d4ffd9,#a8f0b0); border-color: #2ea44f }
        @media (max-width:600px){ .options{ grid-template-columns:1fr } }
      `}</style>
    </div>
  );
}
