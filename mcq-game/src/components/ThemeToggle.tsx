"use client";
import React, { useEffect, useState } from 'react';

export default function ThemeToggle() {
  // Start deterministic on server (light). Read real preference on mount.
  const [mode, setMode] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    try {
      const saved = localStorage.getItem('theme') as 'light' | 'dark' | null;
      if (saved) {
        setMode(saved);
        document.documentElement.setAttribute('data-theme', saved);
        return;
      }
      const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
      const initial = prefersDark ? 'dark' : 'light';
      setMode(initial);
      document.documentElement.setAttribute('data-theme', initial);
    } catch {
      document.documentElement.setAttribute('data-theme', 'light');
    }
  }, []);

  useEffect(() => {
    try { localStorage.setItem('theme', mode); } catch {}
    document.documentElement.setAttribute('data-theme', mode);
  }, [mode]);

  return (
    <button
      onClick={() => setMode((m) => (m === 'light' ? 'dark' : 'light'))}
      aria-label="Toggle theme"
      className="theme-toggle"
    >
      {mode === 'light' ? '🌞' : '🌙'}
      <style jsx>{`
        .theme-toggle{ background:transparent; border:0; cursor:pointer; font-size:18px }
      `}</style>
    </button>
  );
}
