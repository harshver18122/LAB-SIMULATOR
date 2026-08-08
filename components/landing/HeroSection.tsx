'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, Bot, FlaskConical, Sparkles, Play, ShieldCheck, CheckCircle2 } from 'lucide-react';

export const HeroSection: React.FC = () => {
  return (
    <section className="bg-white border-b border-slate-200 py-16 lg:py-24 relative overflow-hidden">
      
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#f1f5f9_1px,transparent_1px),linear-gradient(to_bottom,#f1f5f9_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none opacity-60" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Hero Content */}
          <div className="lg:col-span-7 space-y-6 text-left">
            
            {/* Small Label */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-[#2563EB] text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>AI-Powered Virtual Learning</span>
            </div>

            {/* Main Heading */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#0F2942] tracking-tight leading-[1.15]">
              Learn. Experiment. <br className="hidden sm:inline" />
              <span className="text-[#2563EB]">Understand.</span>
            </h1>

            {/* Supporting Subtext */}
            <p className="text-slate-600 text-base sm:text-lg max-w-xl leading-relaxed">
              Perform interactive science experiments digitally without expensive equipment. Get instant guidance from your 24/7 AI tutor and book 1-on-1 consultations with verified professional teachers.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <Link
                href="/labs"
                className="px-6 py-3 rounded-lg bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-semibold text-sm shadow-sm transition-all flex items-center gap-2"
              >
                <span>Explore Labs</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <Link
                href="/ai-tutor"
                className="px-6 py-3 rounded-lg bg-white hover:bg-slate-50 text-[#0F2942] border border-slate-300 font-semibold text-sm transition-all flex items-center gap-2"
              >
                <Bot className="w-4 h-4 text-[#2563EB]" />
                <span>Talk to an AI Tutor</span>
              </Link>
            </div>

            {/* Trust Badges */}
            <div className="pt-6 border-t border-slate-100 flex flex-wrap items-center gap-6 text-xs text-slate-500">
              <span className="flex items-center gap-1.5 font-medium">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" /> Free Academic Access
              </span>
              <span className="flex items-center gap-1.5 font-medium">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" /> Verified Science Formulas
              </span>
              <span className="flex items-center gap-1.5 font-medium">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" /> Cloud Firestore Sync
              </span>
            </div>

          </div>

          {/* Right Hero Graphic: Clean Virtual Laboratory Illustration */}
          <div className="lg:col-span-5">
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 shadow-sm relative overflow-hidden">
              
              {/* Header Bar */}
              <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-200">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-400" />
                  <div className="w-3 h-3 rounded-full bg-amber-400" />
                  <div className="w-3 h-3 rounded-full bg-emerald-400" />
                  <span className="text-xs font-mono font-semibold text-slate-500 ml-2">STEM Lab #409: Ohm's Law & Circuit Analysis</span>
                </div>
                <span className="text-[10px] font-semibold bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded">SIMULATION READY</span>
              </div>

              {/* Clean Laboratory Workspace SVG Illustration */}
              <div className="h-64 bg-white rounded-xl border border-slate-200 p-4 flex flex-col justify-between relative">
                
                {/* SVG Apparatus Graphic */}
                <svg className="w-full h-36" viewBox="0 0 320 140">
                  {/* Circuit Wire */}
                  <path d="M 40 70 L 100 70 L 100 30 L 220 30 L 220 70 L 280 70" fill="none" stroke="#94A3B8" strokeWidth="3" strokeDasharray="6 3" />
                  
                  {/* Battery Source */}
                  <rect x="25" y="50" width="30" height="40" rx="4" fill="#0F2942" />
                  <text x="32" y="74" fill="#FFFFFF" fontSize="11" fontWeight="bold" fontFamily="sans-serif">12V</text>
                  
                  {/* Resistor Component */}
                  <rect x="140" y="20" width="40" height="20" rx="3" fill="#2563EB" />
                  <text x="148" y="34" fill="#FFFFFF" fontSize="10" fontWeight="bold" fontFamily="sans-serif">10 Ω</text>

                  {/* Voltmeter Gauge */}
                  <circle cx="220" cy="70" r="18" fill="#F8FAFC" stroke="#2563EB" strokeWidth="2" />
                  <text x="215" y="74" fill="#0F2942" fontSize="12" fontWeight="bold" fontFamily="sans-serif">V</text>

                  {/* Multimeter Digital Readout */}
                  <rect x="255" y="45" width="50" height="50" rx="6" fill="#0F2942" />
                  <rect x="260" y="52" width="40" height="18" rx="2" fill="#10B981" />
                  <text x="264" y="65" fill="#0F2942" fontSize="10" fontFamily="monospace" fontWeight="bold">1.20A</text>
                </svg>

                {/* Lab Control Bar */}
                <div className="flex items-center justify-between pt-3 border-t border-slate-100 bg-slate-50 p-2.5 rounded-lg text-xs">
                  <div className="flex items-center gap-3">
                    <span className="font-semibold text-slate-700">Voltage: <strong className="text-[#2563EB]">12V</strong></span>
                    <span className="font-semibold text-slate-700">Resistance: <strong className="text-[#2563EB]">10Ω</strong></span>
                  </div>
                  <Link 
                    href="/labs/exp-phy-01" 
                    className="px-3 py-1 bg-[#2563EB] text-white rounded text-[11px] font-semibold hover:bg-[#1D4ED8] transition-colors"
                  >
                    Launch Lab
                  </Link>
                </div>

              </div>

              {/* Bottom Quick Feature Tag */}
              <div className="mt-4 flex items-center justify-between text-xs text-slate-500">
                <span className="flex items-center gap-1.5">
                  <FlaskConical className="w-4 h-4 text-[#2563EB]" /> Interactive Controls
                </span>
                <span className="flex items-center gap-1.5">
                  <Bot className="w-4 h-4 text-[#2563EB]" /> Real-time Hints
                </span>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
