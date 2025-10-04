"use client";
import React from 'react';

export default function ScoreBadge({ score }: { score: number }) {
  return (
    <div className="score-badge" aria-live="polite">
      <div className="label">Score</div>
      <div className="value">{score}</div>
      <style jsx>{`
        .score-badge { position:fixed; right:18px; top:18px; background:linear-gradient(135deg,#fff,#fff0); padding:8px 12px; border-radius:12px; box-shadow:0 8px 30px rgba(13,30,70,.12); display:flex; flex-direction:column; align-items:center; min-width:64px }
        .label { font-size:11px; color:#7b8ba1 }
        .value { font-size:18px; font-weight:700; color:#0b3d91 }
        @media (max-width:640px){ .score-badge{ right:10px; top:10px; padding:6px 8px } }
      `}</style>
    </div>
  );
}
