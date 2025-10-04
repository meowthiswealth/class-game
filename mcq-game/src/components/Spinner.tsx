"use client";
import React, { useRef, useState } from 'react';

type SpinnerProps = {
  onSpin: (selectedSector: number) => void;
  spinning?: boolean;
};

export default function Spinner({ onSpin }: SpinnerProps) {
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

  const makeGradient = () => {
    const angle = 360 / sectors;
    const gap = Math.min(1.2, angle * 0.06);
    const stops: string[] = [];
    for (let i = 0; i < sectors; i++) {
      const start = i * angle;
      const end = (i + 1) * angle;
      const color = sectorColors[i % sectorColors.length];
      stops.push(`${color} ${start}deg ${end - gap}deg`);
      // small separator as transparent to create a tiny gap
      stops.push(`transparent ${end - gap}deg ${end}deg`);
    }
    return `conic-gradient(${stops.join(',')})`;
  };

  const handleClick = () => {
    if (isSpinning) return;
    setIsSpinning(true);

    const target = Math.floor(Math.random() * sectors);
    const fullTurns = 3 + Math.floor(Math.random() * 4);
    const sectorAngle = 360 / sectors;
    const targetCenter = target * sectorAngle + sectorAngle / 2;
    const jitter = (Math.random() - 0.5) * Math.min(8, sectorAngle * 0.5);
    const finalDeg = fullTurns * 360 + (360 - targetCenter) + jitter;

    setRotDeg((prev) => prev + finalDeg);

    const duration = 3000;
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
        onClick={handleClick}
        onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); handleClick(); } }}
        tabIndex={0}
        role="button"
        aria-label="Spin the wheel"
      >
        <div className="rotor" style={{ transform: `rotate(${rotDeg}deg)` }}>
          <div className="wheel" style={{ background: makeGradient() }}>
            <div className="hub">Spin me</div>
          </div>
        </div>
        <div className="pointer" />
      </div>

      <style jsx>{`
        .spinner-wrapper { display:flex; flex-direction:column; align-items:center; gap:12px }
        .spinner { width:300px; height:300px; border-radius:50%; position:relative; overflow:visible; cursor:pointer; box-shadow: 0 12px 40px rgba(2,6,23,0.15); transition: transform 160ms ease, box-shadow 160ms ease; display:flex; align-items:center; justify-content:center }
        .spinner:focus { outline: none; box-shadow: 0 12px 40px rgba(2,6,23,0.18), 0 0 0 4px rgba(99,102,241,0.12); }
        .spinner:hover { transform: translateY(-4px) scale(1.02); }

        .rotor { width:92%; height:92%; border-radius:50%; transition: transform 3s cubic-bezier(.12,.7,.15,.99); display:flex; align-items:center; justify-content:center; }
        .wheel { position:relative; width:100%; height:100%; border-radius:50%; box-shadow: inset 0 6px 18px rgba(0,0,0,0.08); overflow:hidden }

        /* hub */
        .hub { position:absolute; left:50%; top:50%; transform:translate(-50%,-50%); width:22%; height:22%; background:linear-gradient(180deg, #ffffff, #f3f4f6); border-radius:50%; box-shadow:0 6px 18px rgba(2,6,23,0.12); display:flex; align-items:center; justify-content:center; font-weight:700; color:var(--foreground); font-size:15px; user-select:none; pointer-events:none; }

        /* pointer */
        .pointer { position:absolute; top:-14px; left:50%; transform:translateX(-50%); width:0;height:0;border-left:12px solid transparent;border-right:12px solid transparent;border-bottom:20px solid var(--foreground); filter:drop-shadow(0 2px 0 rgba(255,255,255,0.6)); }
        .pointer:after { content:''; position:absolute; left:50%; top:7px; transform:translateX(-50%); width:8px;height:8px;background:var(--background);border-radius:50%; box-shadow: 0 1px 0 rgba(255,255,255,0.6); }

        /* subtle radial highlight */
        .wheel::before { content:''; position:absolute; inset:0; background:radial-gradient(circle at 35% 20%, rgba(255,255,255,0.06), transparent 18%); pointer-events:none }

      `}</style>
    </div>
  );
}
