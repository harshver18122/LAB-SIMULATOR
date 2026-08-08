'use client';

import React, { useState } from 'react';
import { Droplet, RotateCcw, CheckCircle2 } from 'lucide-react';

export const ChemistryTitration: React.FC = () => {
  const [addedVolume, setAddedVolume] = useState(0.0); // mL of NaOH added
  const [buretteLevel, setBuretteLevel] = useState(50.0); // burette remaining

  // Equivalence point is at 25.0 mL
  // pH curve calculation:
  // Before 25mL: pH rises slowly from 1.0 to ~3.5
  // Near 25mL (24.5 - 25.5): pH jumps rapidly from 3.5 to 10.5
  // After 25.5mL: pH settles around 12.0 - 13.0
  let currentPH = 1.0;
  if (addedVolume < 24.5) {
    currentPH = 1.0 + (addedVolume / 24.5) * 2.5;
  } else if (addedVolume >= 24.5 && addedVolume <= 25.5) {
    currentPH = 3.5 + ((addedVolume - 24.5) / 1.0) * 7.0;
  } else {
    currentPH = 10.5 + Math.min(2.0, (addedVolume - 25.5) * 0.2);
  }

  // Solution Color: Phenolphthalein is colorless below pH 8.2, turns faint pink 8.2-10, deep pink above 10
  let solutionColor = 'bg-slate-100/50'; // colorless
  let colorLabel = 'Colorless Solution';
  if (currentPH >= 8.2 && currentPH < 9.5) {
    solutionColor = 'bg-pink-200/80';
    colorLabel = 'Faint Pink (Equivalence Point!)';
  } else if (currentPH >= 9.5) {
    solutionColor = 'bg-pink-500/80';
    colorLabel = 'Deep Magenta Pink (Over-titrated)';
  }

  const addDrop = (amount: number) => {
    if (addedVolume + amount <= 50.0) {
      setAddedVolume((prev) => parseFloat((prev + amount).toFixed(2)));
      setBuretteLevel((prev) => parseFloat((prev - amount).toFixed(2)));
    }
  };

  const handleReset = () => {
    setAddedVolume(0.0);
    setBuretteLevel(50.0);
  };

  return (
    <div className="bg-slate-50 dark:bg-slate-800/50 rounded-2xl p-4 border border-slate-200 dark:border-slate-700">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-center">
        
        {/* Burette & Conical Flask Graphic */}
        <div className="lg:col-span-2 bg-white dark:bg-slate-900 rounded-xl p-6 border border-slate-200 dark:border-slate-800 flex items-center justify-center min-h-[340px] relative">
          
          <div className="flex flex-col items-center">
            {/* Top Burette Clamp Stand */}
            <div className="w-32 h-3 bg-slate-700 rounded-t-sm" />
            
            {/* Glass Burette Tube */}
            <div className="w-8 h-48 bg-[#E2E8F0]/40 border-2 border-slate-400 rounded-b-md relative flex flex-col justify-end overflow-hidden">
              <div 
                className="w-full bg-blue-400/50 transition-all duration-300"
                style={{ height: `${(buretteLevel / 50.0) * 100}%` }}
              />
              <div className="absolute inset-0 flex flex-col justify-between py-1 text-[8px] font-mono text-slate-500 pl-1 select-none pointer-events-none">
                <span>0mL</span>
                <span>25mL</span>
                <span>50mL</span>
              </div>
            </div>

            {/* Burette Valve Stopcock */}
            <div className="w-12 h-3 bg-slate-800 rounded-full my-1 flex items-center justify-center">
              <div className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            </div>

            {/* Droplet Animation */}
            <div className="h-8 flex items-center justify-center">
              <div className="w-2 h-3 bg-blue-400 rounded-b-full animate-bounce opacity-75" />
            </div>

            {/* Conical Flask */}
            <div className="relative w-40 h-36 flex flex-col items-center">
              {/* Flask Neck */}
              <div className="w-12 h-10 border-t-0 border-x-2 border-slate-400 bg-transparent" />
              {/* Flask Triangular Body */}
              <div className={`w-40 h-26 rounded-b-3xl border-2 border-t-0 border-slate-400 transition-all duration-500 flex flex-col justify-end p-2 overflow-hidden shadow-inner ${solutionColor}`}>
                <div className="text-center font-bold text-[10px] text-slate-700 dark:text-slate-200 bg-white/60 dark:bg-slate-900/60 rounded px-1 py-0.5 backdrop-blur-xs">
                  25mL HCl + Phenolphthalein
                </div>
              </div>
            </div>

          </div>

          {/* Solution Status Badge */}
          <div className="absolute top-4 right-4 bg-slate-900 text-white p-3 rounded-xl shadow-lg border border-slate-700 space-y-1 text-xs font-mono">
            <div className="text-[10px] text-slate-400 uppercase tracking-wider">Titration Telemetry</div>
            <div>Added NaOH: <span className="text-[#4F7DFF] font-bold">{addedVolume.toFixed(2)} mL</span></div>
            <div>Current pH: <span className={currentPH >= 8.2 ? 'text-pink-400 font-bold' : 'text-emerald-400 font-bold'}>{currentPH.toFixed(2)}</span></div>
            <div className="text-[11px] font-semibold text-slate-300">{colorLabel}</div>
          </div>
        </div>

        {/* Action Controls */}
        <div className="space-y-4">
          <div className="font-bold text-xs text-[#1E3A5F] dark:text-white uppercase tracking-wider">Titrant Control (0.1M NaOH)</div>
          
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => addDrop(0.1)}
              className="py-2.5 px-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 hover:bg-blue-50 text-xs font-semibold text-slate-700 dark:text-slate-200 transition-colors flex items-center justify-center gap-1.5"
            >
              <Droplet className="w-3.5 h-3.5 text-[#4F7DFF]" />
              +0.1 mL (Drop)
            </button>
            <button
              onClick={() => addDrop(1.0)}
              className="py-2.5 px-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 hover:bg-blue-50 text-xs font-semibold text-slate-700 dark:text-slate-200 transition-colors flex items-center justify-center gap-1.5"
            >
              <Droplet className="w-3.5 h-3.5 text-blue-600" />
              +1.0 mL
            </button>
          </div>

          <button
            onClick={() => addDrop(5.0)}
            className="w-full py-2.5 rounded-xl bg-[#1E3A5F] hover:bg-[#152a45] text-white text-xs font-semibold shadow-sm transition-colors flex items-center justify-center gap-1.5"
          >
            Fast Dispense (+5.0 mL)
          </button>

          {currentPH >= 8.2 && currentPH <= 9.5 && (
            <div className="p-3 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 rounded-xl text-xs text-emerald-800 dark:text-emerald-300 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600" />
              <span>Equivalence Point Reached! Perfect stoichiometric neutralisation!</span>
            </div>
          )}

          <button
            onClick={handleReset}
            className="w-full py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 hover:bg-slate-100 text-xs font-semibold text-slate-600 dark:text-slate-300 flex items-center justify-center gap-1.5"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Refill Burette to 0.0mL
          </button>
        </div>

      </div>
    </div>
  );
};
