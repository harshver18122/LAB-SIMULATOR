'use client';

import React, { useState } from 'react';
import { Zap, RotateCcw, Power } from 'lucide-react';

export const ElectronicsCircuit: React.FC = () => {
  const [voltage, setVoltage] = useState(6.0); // Volts
  const [resistance, setResistance] = useState(100); // Ohms
  const [switchState, setSwitchState] = useState(true); // ON / OFF

  // Current I = V / R (in Amperes), mA = I * 1000
  const currentAmp = switchState ? voltage / resistance : 0;
  const currentMA = currentAmp * 1000;
  const powerMw = switchState ? (voltage * currentMA) : 0;

  // LED Glow intensity based on current (glows bright when > 20mA)
  const bulbGlowRatio = Math.min(1, currentMA / 100);

  return (
    <div className="bg-slate-50 dark:bg-slate-800/50 rounded-2xl p-4 border border-slate-200 dark:border-slate-700">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-center">
        
        {/* Schematic Circuit Canvas Display */}
        <div className="lg:col-span-2 bg-white dark:bg-slate-900 rounded-xl p-6 border border-slate-200 dark:border-slate-800 flex items-center justify-center min-h-[320px] relative">
          
          <div className="w-full max-w-md h-56 border-4 border-slate-700 rounded-2xl relative p-4 flex flex-col justify-between shadow-inner">
            
            {/* Top Wire: Voltmeter */}
            <div className="flex justify-center -mt-8">
              <div className="bg-slate-900 text-amber-400 px-3 py-1 rounded-xl border border-slate-700 text-xs font-mono shadow-md flex items-center gap-1.5">
                <Zap className="w-3.5 h-3.5" />
                Voltmeter: <span className="font-bold text-white">{voltage.toFixed(2)} V</span>
              </div>
            </div>

            {/* Middle Left: Battery Power Source */}
            <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 bg-slate-900 text-white p-2.5 rounded-xl border border-slate-700 text-center font-mono text-[10px] space-y-0.5 shadow-lg">
              <div className="font-bold text-emerald-400">DC Source</div>
              <div className="text-xs font-bold">{voltage}V</div>
            </div>

            {/* Middle Right: LED Light Bulb */}
            <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 flex items-center">
              <div 
                className="w-12 h-12 rounded-full border-2 border-slate-700 flex items-center justify-center transition-all duration-300 shadow-lg"
                style={{
                  backgroundColor: switchState && bulbGlowRatio > 0 ? `rgba(251, 191, 36, ${0.2 + bulbGlowRatio * 0.8})` : '#334155',
                  boxShadow: switchState && bulbGlowRatio > 0 ? `0 0 ${bulbGlowRatio * 30}px rgba(251, 191, 36, 0.8)` : 'none'
                }}
              >
                <Zap className={`w-6 h-6 ${switchState && bulbGlowRatio > 0 ? 'text-amber-200 fill-amber-300' : 'text-slate-500'}`} />
              </div>
            </div>

            {/* Bottom Wire: Switch & Ammeter */}
            <div className="flex items-center justify-between px-8 -mb-7">
              {/* Ammeter */}
              <div className="bg-slate-900 text-blue-400 px-3 py-1 rounded-xl border border-slate-700 text-xs font-mono shadow-md">
                Ammeter: <span className="font-bold text-white">{currentMA.toFixed(1)} mA</span>
              </div>

              {/* Resistor Component */}
              <div className="bg-amber-900/20 border-2 border-amber-600 px-3 py-1 rounded text-[11px] font-mono font-bold text-amber-700 dark:text-amber-300">
                Resistor R = {resistance}Ω
              </div>
            </div>

          </div>

          {/* Telemetry Box */}
          <div className="absolute top-3 right-3 bg-slate-900 text-white px-3 py-1.5 rounded-xl border border-slate-700 text-xs font-mono shadow-md">
            P = V × I = {powerMw.toFixed(1)} mW
          </div>
        </div>

        {/* Control Controls */}
        <div className="space-y-4">
          <div className="font-bold text-xs text-[#1E3A5F] dark:text-white uppercase tracking-wider">Circuit Controls</div>

          {/* Switch Button */}
          <button
            onClick={() => setSwitchState(!switchState)}
            className={`w-full py-2.5 rounded-xl text-xs font-semibold text-white flex items-center justify-center gap-2 transition-colors ${
              switchState ? 'bg-emerald-600 hover:bg-emerald-700' : 'bg-red-600 hover:bg-red-700'
            }`}
          >
            <Power className="w-4 h-4" />
            Circuit Switch: {switchState ? 'ON (CLOSED)' : 'OFF (OPEN)'}
          </button>

          {/* DC Voltage Slider */}
          <div>
            <div className="flex justify-between text-xs font-semibold mb-1">
              <span>DC Voltage (V)</span>
              <span className="text-[#4F7DFF] font-mono">{voltage.toFixed(1)} V</span>
            </div>
            <input
              type="range"
              min="1"
              max="12"
              step="0.5"
              value={voltage}
              onChange={(e) => setVoltage(parseFloat(e.target.value))}
              className="w-full accent-[#4F7DFF]"
            />
          </div>

          {/* Resistance Slider */}
          <div>
            <div className="flex justify-between text-xs font-semibold mb-1">
              <span>Resistor Value (R)</span>
              <span className="text-[#4F7DFF] font-mono">{resistance} Ω</span>
            </div>
            <input
              type="range"
              min="20"
              max="1000"
              step="10"
              value={resistance}
              onChange={(e) => setResistance(parseInt(e.target.value))}
              className="w-full accent-[#4F7DFF]"
            />
          </div>

          {/* Reset */}
          <button
            onClick={() => { setVoltage(6.0); setResistance(100); setSwitchState(true); }}
            className="w-full py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 hover:bg-slate-100 text-xs font-semibold text-slate-600 dark:text-slate-300 flex items-center justify-center gap-1.5"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Reset Circuit Defaults
          </button>
        </div>

      </div>
    </div>
  );
};
