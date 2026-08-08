'use client';

import React, { useState } from 'react';
import { ZoomIn, Eye, Sparkles } from 'lucide-react';

export const BiologyMicroscope: React.FC = () => {
  const [magnification, setMagnification] = useState<100 | 400 | 1000>(100);
  const [focusLevel, setFocusLevel] = useState(80); // 0 - 100
  const [sampleType, setSampleType] = useState<'plant' | 'animal' | 'bacteria'>('plant');
  const [showLabels, setShowLabels] = useState(true);

  // Blur blur value based on distance from focusLevel 80
  const blurAmount = Math.abs(focusLevel - 80) * 0.15;

  return (
    <div className="bg-slate-50 dark:bg-slate-800/50 rounded-2xl p-4 border border-slate-200 dark:border-slate-700">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-center">
        
        {/* Optical Circular Lens Viewport */}
        <div className="lg:col-span-2 bg-slate-950 rounded-2xl p-6 border border-slate-800 flex items-center justify-center relative overflow-hidden min-h-[360px]">
          
          {/* Circular Lens Frame */}
          <div className="relative w-72 h-72 rounded-full border-8 border-slate-800 shadow-2xl overflow-hidden flex items-center justify-center bg-emerald-950/30">
            
            {/* Specimen Slide Image Graphic */}
            <div 
              className="w-full h-full relative transition-all duration-300 flex items-center justify-center"
              style={{
                filter: `blur(${blurAmount}px)`,
                transform: `scale(${magnification === 100 ? 1 : magnification === 400 ? 1.6 : 2.4})`
              }}
            >
              {sampleType === 'plant' && (
                <div className="w-64 h-64 grid grid-cols-3 grid-rows-3 gap-1 p-2">
                  {[...Array(9)].map((_, i) => (
                    <div key={i} className="border-2 border-emerald-500/80 bg-emerald-900/40 rounded-sm relative flex items-center justify-center">
                      <div className="w-3 h-3 rounded-full bg-emerald-300 shadow-sm" />
                      {showLabels && i === 4 && (
                        <div className="absolute -top-4 text-[8px] bg-black/80 text-emerald-200 px-1 rounded whitespace-nowrap z-10">
                          Cell Wall & Nucleus
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}

              {sampleType === 'animal' && (
                <div className="w-64 h-64 relative flex items-center justify-center">
                  <div className="w-48 h-48 rounded-full border-2 border-dashed border-purple-400 bg-purple-900/30 relative flex items-center justify-center">
                    <div className="w-12 h-12 rounded-full bg-purple-400/80 border border-purple-200 flex items-center justify-center">
                      <div className="w-4 h-4 rounded-full bg-purple-200" />
                    </div>
                    {showLabels && (
                      <div className="absolute top-4 text-[8px] bg-black/80 text-purple-200 px-1 rounded">
                        Cytoplasm & Nucleolus
                      </div>
                    )}
                  </div>
                </div>
              )}

              {sampleType === 'bacteria' && (
                <div className="w-64 h-64 relative flex items-center justify-center gap-3">
                  {[...Array(6)].map((_, i) => (
                    <div key={i} className="w-4 h-12 rounded-full bg-amber-400/80 border border-amber-200 rotate-12 shadow-sm animate-pulse" />
                  ))}
                </div>
              )}
            </div>

            {/* Lens Reticle Crosshair Grid */}
            <div className="absolute inset-0 border border-slate-700/30 rounded-full pointer-events-none flex items-center justify-center">
              <div className="w-full h-px bg-emerald-500/20" />
              <div className="h-full w-px bg-emerald-500/20 absolute" />
            </div>

          </div>

          {/* Telemetry Badge */}
          <div className="absolute bottom-4 left-4 bg-slate-900/90 text-white px-3 py-1.5 rounded-xl border border-slate-700 text-xs font-mono">
            Mag: {magnification}x | Clarity: {blurAmount < 0.5 ? 'Sharp Focus (100%)' : 'Blurry'}
          </div>
        </div>

        {/* Microscope Controls */}
        <div className="space-y-4">
          <div className="font-bold text-xs text-[#1E3A5F] dark:text-white uppercase tracking-wider">Microscope Controls</div>

          {/* Sample Select */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Select Specimen</label>
            <div className="grid grid-cols-3 gap-1.5">
              {(['plant', 'animal', 'bacteria'] as const).map((s) => (
                <button
                  key={s}
                  onClick={() => setSampleType(s)}
                  className={`py-1.5 rounded-lg text-xs font-semibold capitalize transition-all ${
                    sampleType === s ? 'bg-[#1E3A5F] text-white shadow-sm' : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300'
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Objective Lens Magnification */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Objective Lens</label>
            <div className="grid grid-cols-3 gap-1.5">
              {([100, 400, 1000] as const).map((m) => (
                <button
                  key={m}
                  onClick={() => setMagnification(m)}
                  className={`py-1.5 rounded-lg text-xs font-semibold transition-all ${
                    magnification === m ? 'bg-[#4F7DFF] text-white shadow-sm' : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300'
                  }`}
                >
                  {m}x Mag
                </button>
              ))}
            </div>
          </div>

          {/* Fine Focus Knob Slider */}
          <div>
            <div className="flex justify-between text-xs font-semibold mb-1">
              <span>Fine Focus Adjustment Knob</span>
              <span className="text-[#4F7DFF] font-mono">{focusLevel}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={focusLevel}
              onChange={(e) => setFocusLevel(parseInt(e.target.value))}
              className="w-full accent-[#4F7DFF]"
            />
          </div>

          {/* Show/Hide Organelle Labels */}
          <button
            onClick={() => setShowLabels(!showLabels)}
            className="w-full py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 hover:bg-slate-100 text-xs font-semibold text-slate-700 dark:text-slate-200 flex items-center justify-center gap-1.5"
          >
            <Eye className="w-4 h-4 text-[#4F7DFF]" />
            {showLabels ? 'Hide Organelle Markers' : 'Show Organelle Markers'}
          </button>
        </div>

      </div>
    </div>
  );
};
