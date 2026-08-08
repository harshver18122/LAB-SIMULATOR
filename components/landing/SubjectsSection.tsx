'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, Zap, Beaker, Dna, Cpu, Code2, Sparkles } from 'lucide-react';

export const SubjectsSection: React.FC = () => {
  const subjects = [
    {
      id: 'physics',
      name: 'Physics',
      experimentsCount: '48 Interactive Labs',
      description: 'Pendulum mechanics, Ohm\'s law, Optics, Circuit analysis & Thermodynamics.',
      icon: Zap,
      gradient: 'from-blue-500 to-indigo-600',
      badgeColor: 'bg-blue-50 text-[#2563EB] border-blue-200'
    },
    {
      id: 'chemistry',
      name: 'Chemistry',
      experimentsCount: '52 Interactive Labs',
      description: 'Acid-base titration, Chemical kinetics, Periodic properties & Electrochemistry.',
      icon: Beaker,
      gradient: 'from-emerald-500 to-teal-600',
      badgeColor: 'bg-emerald-50 text-emerald-700 border-emerald-200'
    },
    {
      id: 'biology',
      name: 'Biology',
      experimentsCount: '35 Interactive Labs',
      description: 'Cell mitosis, DNA extraction, Microscopy & Enzyme activity simulations.',
      icon: Dna,
      gradient: 'from-purple-500 to-pink-600',
      badgeColor: 'bg-purple-50 text-purple-700 border-purple-200'
    },
    {
      id: 'electronics',
      name: 'Electronics',
      experimentsCount: '30 Interactive Labs',
      description: 'Logic gates, Transistor characteristics, Oscilloscopes & Microcontrollers.',
      icon: Cpu,
      gradient: 'from-amber-500 to-orange-600',
      badgeColor: 'bg-amber-50 text-amber-700 border-amber-200'
    },
    {
      id: 'programming',
      name: 'Computer Science',
      experimentsCount: '40 Interactive Labs',
      description: 'Sorting algorithms, Binary Search visualizer, Data structures & SQL queries.',
      icon: Code2,
      gradient: 'from-cyan-500 to-blue-600',
      badgeColor: 'bg-cyan-50 text-cyan-700 border-cyan-200'
    }
  ];

  return (
    <section className="bg-slate-50/70 py-16 lg:py-24 border-b border-slate-200/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <span className="text-[11px] font-extrabold uppercase tracking-wider text-[#2563EB] bg-blue-50 px-3 py-1 rounded-full border border-blue-200/60 inline-flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" /> STEM Curriculum Coverage
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0F2942] tracking-tight mt-2">
              Explore STEM Disciplines
            </h2>
            <p className="text-slate-600 text-sm mt-1 max-w-xl">
              Interactive simulation engines tailored to high school and university science standards.
            </p>
          </div>

          <Link
            href="/labs"
            className="inline-flex items-center gap-2 text-xs font-bold text-[#2563EB] hover:text-[#1D4ED8] bg-white px-4 py-2.5 rounded-xl border border-slate-200 shadow-2xs hover:shadow-xs transition-all"
          >
            <span>Browse All Subjects</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {subjects.map((sub) => {
            const IconComponent = sub.icon;
            return (
              <Link
                key={sub.id}
                href={`/labs?subject=${sub.id}`}
                className="glass-card p-6 flex flex-col justify-between group hover:border-[#2563EB]/40 transition-all duration-300"
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-tr ${sub.gradient} text-white flex items-center justify-center shadow-md group-hover:scale-110 transition-transform`}>
                      <IconComponent className="w-6 h-6 stroke-[2.2]" />
                    </div>
                    <span className={`text-[10px] font-bold px-3 py-1 rounded-full border ${sub.badgeColor}`}>
                      {sub.experimentsCount}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-[#0F2942] group-hover:text-[#2563EB] transition-colors mb-2">
                    {sub.name}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed mb-6 font-normal">
                    {sub.description}
                  </p>
                </div>

                <div className="flex items-center justify-between text-xs font-bold text-[#2563EB] pt-4 border-t border-slate-100">
                  <span>Enter {sub.name} Labs</span>
                  <div className="w-7 h-7 rounded-full bg-blue-50 flex items-center justify-center group-hover:bg-[#2563EB] group-hover:text-white transition-colors">
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

      </div>
    </section>
  );
};
