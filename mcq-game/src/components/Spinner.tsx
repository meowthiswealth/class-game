"use client";
import React, { useRef, useState } from 'react';

type SpinnerProps = {
  onSpin: (selectedSector: number) => void;
  spinning: boolean;
};

export default function Spinner({ onSpin, spinning }: SpinnerProps) {
  const sectors = 8;
  const sectorColors = [
    '#ff6b6b',
    '#f7b267',
    '#ffd166',
    '#06d6a0',
    '#4d96ff',
    '#9b5de5',
    '#f15bb5',
    '#00bbf9',
  ];

  const [rotDeg, setRotDeg] = useState(0);
  const [isSpinning, setIsSpinning] = useState(false);
  const wheelRef = useRef<HTMLDivElement | null>(null);

  const handleClick = () => {
    if (isSpinning) return;
    setIsSpinning(true);

    // pick a random target sector
    const target = Math.floor(Math.random() * sectors);
    const fullTurns = 3 + Math.floor(Math.random() * 4); // 3..6 turns
    const sectorAngle = 360 / sectors;
    // we want the pointer at top (0deg) to land on target sector
    const jitter = Math.random() * (sectorAngle - 6) - (sectorAngle / 2 - 3);
    const finalDeg = fullTurns * 360 + (360 - (target * sectorAngle + sectorAngle / 2)) + jitter;

    // trigger rotation via inline style
    setRotDeg((prev) => prev + finalDeg);

    // after animation duration, call onSpin with the selected sector
    const duration = 3000; // match CSS animation time
    setTimeout(() => {
      setIsSpinning(false);
      onSpin(target);
    }, duration + 60);
  };

  return (
    <div className="spinner-wrapper">
      <div
        ref={wheelRef}
        className={`spinner ${isSpinning ? 'spinning' : ''}`}
        onClick={() => handleClick()}
        role="button"
        aria-label="Spin the wheel"
        style={{ transform: `rotate(${rotDeg}deg)` }}
      >
        {Array.from({ length: sectors }).map((_, i) => (
          <div
            key={i}
            className="sector"
            style={{
              transform: `rotate(${(360 / sectors) * i}deg) skewY(-30deg)`,
              background: sectorColors[i % sectorColors.length],
            }}
          />
        ))}
        <div className="pointer">▲</div>
      </div>
      <style jsx>{`
        .spinner-wrapper { display:flex; flex-direction:column; align-items:center; gap:12px }
        .spinner { width:260px; height:260px; border-radius:50%; position:relative; overflow:hidden; cursor:pointer; box-shadow: 0 8px 24px rgba(0,0,0,.15); transition: transform 3s cubic-bezier(.12,.7,.15,.99); }
        .spinner.spinning { transition: transform 3s cubic-bezier(.12,.7,.15,.99); }
        .sector { position:absolute; left:50%; top:50%; width:50%; height:50%; transform-origin:0% 0%; border-right:1px solid rgba(255,255,255,.16) }
        .pointer { position:absolute; top:-12px; left:50%; transform:translateX(-50%); font-size:28px; color:#111; text-shadow:0 1px 0 rgba(255,255,255,.6); }
      `}</style>
    </div>
  );
}
