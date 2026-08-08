'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Bot, FlaskConical, Sparkles, ShieldCheck, CheckCircle2, Zap, Play, Activity } from 'lucide-react';

export const HeroSection: React.FC = () => {
  const [voltage, setVoltage] = useState(12);
  const resistance = 10;
  const current = (voltage / resistance).toFixed(2);

  return (
    <section className="bg-gradient-to-b from-slate-50 via-white to-slate-50 border-b border-slate-200/80 py-16 lg:py-24 relative overflow-hidden">
      
      {/* Dynamic Background Mesh & Particle Grid */}
      <div className="absolute inset-0 hero-grid-pattern opacity-40 pointer-events-none" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-tr from-blue-400/20 to-cyan-300/20 blur-3xl rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Hero Content */}
          <div className="lg:col-span-7 space-y-6 text-left">
            
            {/* Small Label Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200/80 text-[#2563EB] text-xs font-bold shadow-2xs animate-in fade-in">
              <Sparkles className="w-3.5 h-3.5 text-[#2563EB] animate-pulse" />
              <span>AI-Powered Next-Gen Virtual Laboratory</span>
            </div>

            {/* Main Heading */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#0F2942] tracking-tight leading-[1.12]">
              Learn. Experiment. <br className="hidden sm:inline" />
              <span className="gradient-text-blue">Understand.</span>
            </h1>

            {/* Supporting Subtext */}
            <p className="text-slate-600 text-base sm:text-lg max-w-xl leading-relaxed font-normal">
              Perform interactive science experiments digitally with real-time mathematical precision. Get instant guidance from your 24/7 AI tutor Dr. Nova and book 1-on-1 consultations with verified faculty.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-3.5 pt-2">
              <Link
                href="/labs"
                className="px-7 py-3.5 rounded-xl bg-gradient-to-r from-[#2563EB] to-[#1D4ED8] hover:from-[#1D4ED8] hover:to-[#1E40AF] text-white font-bold text-sm shadow-md glow-shadow-blue transition-all flex items-center gap-2.5 group"
              >
                <span>Explore Virtual Labs</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>

              <Link
                href="/ai-tutor"
                className="px-6 py-3.5 rounded-xl bg-white hover:bg-slate-50 text-[#0F2942] border border-slate-300 font-semibold text-sm shadow-2xs transition-all flex items-center gap-2.5"
              >
                <Bot className="w-4.5 h-4.5 text-[#2563EB]" />
                <span>Talk to AI Tutor</span>
              </Link>
            </div>

            {/* Trust Badges */}
            <div className="pt-6 border-t border-slate-200/80 flex flex-wrap items-center gap-6 text-xs text-slate-500 font-medium">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" /> Free Academic Access
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" /> Verified Science Formulas
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" /> Real-time Cloud Sync
              </span>
            </div>

          </div>

          {/* Right Hero Graphic: Interactive Live Simulation Preview Card */}
          <div className="lg:col-span-5">
            <div className="glass-card p-6 border border-slate-200/90 shadow-xl relative overflow-hidden group">
              
              {/* Header Bar */}
              <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-200">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-400" />
                  <div className="w-3 h-3 rounded-full bg-amber-400" />
                  <div className="w-3 h-3 rounded-full bg-emerald-400" />
                  <span className="text-xs font-mono font-semibold text-slate-600 ml-2 truncate max-w-[200px]">
                    STEM Lab #409: Ohm's Law
                  </span>
                </div>
                <span className="text-[10px] font-extrabold bg-emerald-100 text-emerald-700 px-2.5 py-0.5 rounded-full flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                  SIMULATION ACTIVE
                </span>
              </div>

              {/* Clean Laboratory Workspace Canvas Preview */}
              <div className="h-64 bg-slate-900 rounded-xl border border-slate-800 p-4 flex flex-col justify-between relative overflow-hidden">
                
                {/* Glowing Circuit Wire SVG Graphic */}
                <svg className="w-full h-36" viewBox="0 0 320 140">
                  <path d="M 40 70 L 100 70 L 100 30 L 220 30 L 220 70 L 280 70" fill="none" stroke="#38BDF8" strokeWidth="3" strokeDasharray="6 3" className="animate-pulse" />
                  
                  {/* Battery Source */}
                  <rect x="25" y="50" width="36" height="40" rx="6" fill="#0F2942" stroke="#38BDF8" strokeWidth="1.5" />
                  <text x="31" y="74" fill="#38BDF8" fontSize="11" fontWeight="bold" fontFamily="monospace">{voltage}V</text>
                  
                  {/* Resistor Component */}
                  <rect x="135" y="18" width="50" height="24" rx="4" fill="#1E293B" stroke="#2563EB" strokeWidth="1.5" />
                  <text x="145" y="34" fill="#60A5FA" fontSize="10" fontWeight="bold" fontFamily="monospace">{resistance}Ω</text>

                  {/* Voltmeter Gauge */}
                  <circle cx="220" cy="70" r="18" fill="#0F172A" stroke="#38BDF8" strokeWidth="2" />
                  <text x="215" y="74" fill="#38BDF8" fontSize="12" fontWeight="bold" fontFamily="monospace">V</text>

                  {/* Multimeter Digital Readout */}
                  <rect x="250" y="42" width="60" height="56" rx="8" fill="#0F172A" stroke="#334155" strokeWidth="1.5" />
                  <rect x="255" y="50" width="50" height="20" rx="3" fill="#059669" />
                  <text x="259" y="64" fill="#ECFDF5" fontSize="11" fontFamily="monospace" fontWeight="bold">{current}A</text>
                </svg>

                {/* Lab Voltage Interactive Preview Control */}
                <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-xs text-slate-300">
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-slate-400">Voltage: <strong className="text-cyan-400">{voltage}V</strong></span>
                    <input
                      type="range"
                      min="2"
                      max="30"
                      value={voltage}
                      onChange={(e) => setVoltage(Number(e.target.value))}
                      className="w-24 accent-[#2563EB] cursor-pointer"
                    />
                  </div>
                  <Link 
                    href="/labs/exp-phy-01" 
                    className="px-3.5 py-1.5 bg-[#2563EB] text-white rounded-lg text-xs font-bold hover:bg-[#1D4ED8] transition-all flex items-center gap-1 shadow-sm"
                  >
                    <Play className="w-3 h-3 fill-current" />
                    <span>Launch</span>
                  </Link>
                </div>

              </div>

              {/* Bottom Live Feature Badges */}
              <div className="mt-4 flex items-center justify-between text-xs text-slate-500 font-semibold">
                <span className="flex items-center gap-1.5">
                  <Activity className="w-4 h-4 text-[#2563EB]" /> 99.8% Simulation Accuracy
                </span>
                <span className="flex items-center gap-1.5 text-emerald-600">
                  <Bot className="w-4 h-4 text-emerald-500" /> Dr. Nova AI Active
                </span>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
