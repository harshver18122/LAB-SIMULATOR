'use client';

import React from 'react';
import { Play, Calculator, FileCheck, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export const HowItWorks: React.FC = () => {
  const steps = [
    {
      num: '01',
      title: 'Select Experiment',
      desc: 'Choose from Physics, Chemistry, Biology, CS, or Electronics virtual lab modules.',
      icon: Play,
    },
    {
      num: '02',
      title: 'Interact & Measure',
      desc: 'Adjust variables, observe real-time reaction visualizers, and record trial data.',
      icon: Calculator,
    },
    {
      num: '03',
      title: 'Report & AI Review',
      desc: 'Generate standardized observation reports, take viva quizzes, and get tutor feedback.',
      icon: FileCheck,
    },
  ];

  return (
    <section className="bg-white py-16 lg:py-24 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-[#2563EB]">Workflow</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0F2942] tracking-tight">
            How Virtual Experiments Work
          </h2>
          <p className="text-slate-600 text-sm">
            Three simple steps to conduct lab practicals from anywhere.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {steps.map((step, idx) => {
            const IconComp = step.icon;
            return (
              <div key={idx} className="academic-card p-6 relative flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-3xl font-extrabold text-slate-300 font-mono">{step.num}</span>
                    <div className="w-10 h-10 rounded-lg bg-blue-50 text-[#2563EB] flex items-center justify-center">
                      <IconComp className="w-5 h-5 stroke-[2.2]" />
                    </div>
                  </div>
                  <h3 className="text-lg font-bold text-[#0F2942] mb-2">{step.title}</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">{step.desc}</p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-12 text-center">
          <Link
            href="/labs"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-[#0F2942] hover:bg-[#153454] text-white font-semibold text-xs shadow-xs transition-colors"
          >
            <span>Start Your First Virtual Lab</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

      </div>
    </section>
  );
};
