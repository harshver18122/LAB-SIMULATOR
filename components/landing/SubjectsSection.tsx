'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, Zap, Beaker, Dna, Cpu, Code2 } from 'lucide-react';

export const SubjectsSection: React.FC = () => {
  const subjects = [
    {
      id: 'physics',
      name: 'Physics',
      experimentsCount: '48 Labs',
      description: 'Pendulum mechanics, Ohm\'s law, Optics, Circuit analysis & Thermodynamics.',
      icon: Zap,
      badgeColor: 'bg-blue-50 text-blue-700 border-blue-200'
    },
    {
      id: 'chemistry',
      name: 'Chemistry',
      experimentsCount: '52 Labs',
      description: 'Acid-base titration, Chemical kinetics, Periodic properties & Electrochemistry.',
      icon: Beaker,
      badgeColor: 'bg-emerald-50 text-emerald-700 border-emerald-200'
    },
    {
      id: 'biology',
      name: 'Biology',
      experimentsCount: '35 Labs',
      description: 'Cell mitosis, DNA extraction, Microscopy & Enzyme activity simulations.',
      icon: Dna,
      badgeColor: 'bg-purple-50 text-purple-700 border-purple-200'
    },
    {
      id: 'electronics',
      name: 'Electronics',
      experimentsCount: '30 Labs',
      description: 'Logic gates, Transistor characteristics, Oscilloscopes & Microcontrollers.',
      icon: Cpu,
      badgeColor: 'bg-amber-50 text-amber-700 border-amber-200'
    },
    {
      id: 'programming',
      name: 'Computer Science',
      experimentsCount: '40 Labs',
      description: 'Sorting algorithms, Binary Search visualizer, Data structures & SQL queries.',
      icon: Code2,
      badgeColor: 'bg-indigo-50 text-indigo-700 border-indigo-200'
    }
  ];

  return (
    <section className="bg-slate-50 py-16 lg:py-24 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#2563EB]">Curriculum Coverage</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0F2942] tracking-tight mt-1">
              Explore STEM Disciplines
            </h2>
            <p className="text-slate-600 text-sm mt-1 max-w-xl">
              Fully interactive simulation engines tailored to high school and university science standards.
            </p>
          </div>

          <Link
            href="/labs"
            className="inline-flex items-center gap-2 text-xs font-bold text-[#2563EB] hover:text-[#1D4ED8] bg-white px-4 py-2.5 rounded-lg border border-slate-200 shadow-xs"
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
                className="academic-card p-6 flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 rounded-lg bg-[#0F2942] text-white flex items-center justify-center">
                      <IconComponent className="w-5 h-5 stroke-[2.2]" />
                    </div>
                    <span className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-full border ${sub.badgeColor}`}>
                      {sub.experimentsCount}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-[#0F2942] group-hover:text-[#2563EB] transition-colors mb-2">
                    {sub.name}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed mb-4">
                    {sub.description}
                  </p>
                </div>

                <div className="flex items-center gap-1.5 text-xs font-semibold text-[#2563EB] pt-3 border-t border-slate-100">
                  <span>Enter {sub.name} Labs</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            );
          })}
        </div>

      </div>
    </section>
  );
};
