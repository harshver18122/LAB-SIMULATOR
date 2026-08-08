'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw, Activity } from 'lucide-react';

export const PhysicsPendulum: React.FC = () => {
  const [length, setLength] = useState(0.7); // in meters
  const [mass, setMass] = useState(0.5); // in kg
  const [gravity, setGravity] = useState(9.81); // m/s^2
  const [angleMax, setAngleMax] = useState(15); // degrees
  const [isRunning, setIsRunning] = useState(false);
  const [timePassed, setTimePassed] = useState(0);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Period T = 2 * pi * sqrt(L / g)
  const period = 2 * Math.PI * Math.sqrt(length / gravity);
  const frequency = 1 / period;

  useEffect(() => {
    let animationFrameId: number;
    let startTime = performance.now();

    const render = (now: number) => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      const width = canvas.width;
      const height = canvas.height;
      const originX = width / 2;
      const originY = 40;

      ctx.clearRect(0, 0, width, height);

      // Draw Support Stand
      ctx.fillStyle = '#1E3A5F';
      ctx.fillRect(originX - 60, originY - 15, 120, 15);
      ctx.fillRect(originX - 5, originY - 35, 10, 20);

      // Compute current pendulum angle using SHM theta(t) = theta_max * cos(w * t)
      const omega = Math.sqrt(gravity / length);
      let currentT = isRunning ? (now - startTime) / 1000 : timePassed;
      if (isRunning) setTimePassed(currentT);

      const theta = (angleMax * Math.PI / 180) * Math.cos(omega * currentT);

      // Pixel scale for string length (0.7m -> ~180px)
      const pixelLength = length * 220;
      const bobX = originX + pixelLength * Math.sin(theta);
      const bobY = originY + pixelLength * Math.cos(theta);

      // Draw Trajectory Arc
      ctx.beginPath();
      const maxArcX1 = originX + pixelLength * Math.sin(angleMax * Math.PI / 180);
      const maxArcX2 = originX + pixelLength * Math.sin(-angleMax * Math.PI / 180);
      ctx.strokeStyle = '#E2E8F0';
      ctx.setLineDash([4, 4]);
      ctx.arc(originX, originY, pixelLength, Math.PI / 2 - (angleMax * Math.PI / 180), Math.PI / 2 + (angleMax * Math.PI / 180));
      ctx.stroke();
      ctx.setLineDash([]);

      // Draw String
      ctx.beginPath();
      ctx.moveTo(originX, originY);
      ctx.lineTo(bobX, bobY);
      ctx.strokeStyle = '#475569';
      ctx.lineWidth = 2;
      ctx.stroke();

      // Draw Metallic Bob
      const bobRadius = 12 + mass * 6;
      ctx.beginPath();
      ctx.arc(bobX, bobY, bobRadius, 0, 2 * Math.PI);
      ctx.fillStyle = '#4F7DFF';
      ctx.fill();
      ctx.strokeStyle = '#1E3A5F';
      ctx.lineWidth = 2;
      ctx.stroke();

      // Draw Highlight reflection on metallic bob
      ctx.beginPath();
      ctx.arc(bobX - bobRadius * 0.3, bobY - bobRadius * 0.3, bobRadius * 0.3, 0, 2 * Math.PI);
      ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
      ctx.fill();

      if (isRunning) {
        animationFrameId = requestAnimationFrame(render);
      }
    };

    render(performance.now());

    return () => cancelAnimationFrame(animationFrameId);
  }, [isRunning, length, mass, gravity, angleMax, timePassed]);

  const handleReset = () => {
    setIsRunning(false);
    setTimePassed(0);
  };

  return (
    <div className="bg-slate-50 dark:bg-slate-800/50 rounded-2xl p-4 border border-slate-200 dark:border-slate-700">
      <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
        
        {/* Canvas Display */}
        <div className="relative flex-1 bg-white dark:bg-slate-900 rounded-xl p-4 border border-slate-200 dark:border-slate-800 flex items-center justify-center shadow-inner">
          <canvas
            ref={canvasRef}
            width={400}
            height={320}
            className="w-full max-w-[400px] h-[320px]"
          />
          <div className="absolute top-3 left-3 bg-[#1E3A5F] text-white px-2.5 py-1 rounded-lg text-[11px] font-mono shadow-sm">
            Period (T): {period.toFixed(2)}s | Frequency: {frequency.toFixed(2)} Hz
          </div>
        </div>

        {/* Real-time Controls */}
        <div className="w-full lg:w-72 space-y-4">
          <div className="font-bold text-xs text-[#1E3A5F] dark:text-white uppercase tracking-wider flex items-center gap-1.5">
            <Activity className="w-4 h-4 text-[#4F7DFF]" />
            Simulation Parameters
          </div>

          {/* Length Slider */}
          <div>
            <div className="flex justify-between text-xs font-semibold mb-1">
              <span>String Length (L)</span>
              <span className="text-[#4F7DFF] font-mono">{length.toFixed(2)} m</span>
            </div>
            <input
              type="range"
              min="0.3"
              max="1.2"
              step="0.05"
              value={length}
              onChange={(e) => setLength(parseFloat(e.target.value))}
              className="w-full accent-[#4F7DFF]"
            />
          </div>

          {/* Mass Slider */}
          <div>
            <div className="flex justify-between text-xs font-semibold mb-1">
              <span>Bob Mass (m)</span>
              <span className="text-[#4F7DFF] font-mono">{mass.toFixed(2)} kg</span>
            </div>
            <input
              type="range"
              min="0.1"
              max="1.5"
              step="0.1"
              value={mass}
              onChange={(e) => setMass(parseFloat(e.target.value))}
              className="w-full accent-[#4F7DFF]"
            />
          </div>

          {/* Gravity Selector */}
          <div>
            <div className="flex justify-between text-xs font-semibold mb-1">
              <span>Gravity Constant (g)</span>
              <span className="text-[#4F7DFF] font-mono">{gravity} m/s²</span>
            </div>
            <select
              value={gravity}
              onChange={(e) => setGravity(parseFloat(e.target.value))}
              className="w-full px-2.5 py-1.5 text-xs rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900"
            >
              <option value={9.81}>Earth (g = 9.81 m/s²)</option>
              <option value={1.62}>Moon (g = 1.62 m/s²)</option>
              <option value={24.79}>Jupiter (g = 24.79 m/s²)</option>
              <option value={3.71}>Mars (g = 3.71 m/s²)</option>
            </select>
          </div>

          {/* Controls Buttons */}
          <div className="flex items-center gap-2 pt-2">
            <button
              onClick={() => setIsRunning(!isRunning)}
              className={`flex-1 py-2 rounded-xl text-xs font-semibold text-white flex items-center justify-center gap-1.5 transition-colors ${
                isRunning ? 'bg-amber-600 hover:bg-amber-700' : 'bg-[#4F7DFF] hover:bg-[#3b68ed]'
              }`}
            >
              {isRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              {isRunning ? 'Pause' : 'Start Oscillation'}
            </button>
            <button
              onClick={handleReset}
              className="p-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300"
              title="Reset Simulation"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
