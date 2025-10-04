"use client";
import React from 'react';

export default function ScoreBadge({ score }: { score: number }) {
  return (
    <div className="flex flex-col items-center rounded-lg bg-card p-2 shadow-sm">
      <div className="text-xs text-muted-foreground">Score</div>
      <div className="text-lg font-bold text-primary">{score}</div>
    </div>
  );
}