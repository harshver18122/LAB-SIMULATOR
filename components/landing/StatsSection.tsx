'use client';

import React from 'react';
import { FlaskConical, BookOpen, Users, Award } from 'lucide-react';

export const StatsSection: React.FC = () => {
  const stats = [
    { count: '250+', label: 'Virtual Experiments', desc: 'Physics, Chemistry & Biology', icon: FlaskConical },
    { count: '5+', label: 'STEM Subjects', desc: 'Curriculum-aligned modules', icon: BookOpen },
    { count: '50,000+', label: 'Active Students', desc: 'Performing digital labs', icon: Users },
    { count: '120+', label: 'Professional Teachers', desc: 'Verified academic tutors', icon: Award },
  ];

  return (
    <section className="bg-slate-50 border-b border-slate-200 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((item, index) => {
            const IconComponent = item.icon;
            return (
              <div 
                key={index}
                className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs flex items-center gap-4 transition-all hover:border-slate-300"
              >
                <div className="w-10 h-10 rounded-lg bg-blue-50 text-[#2563EB] flex items-center justify-center shrink-0">
                  <IconComponent className="w-5 h-5 stroke-[2.2]" />
                </div>
                <div>
                  <div className="text-xl sm:text-2xl font-extrabold text-[#0F2942]">{item.count}</div>
                  <div className="text-xs font-bold text-slate-700">{item.label}</div>
                  <div className="text-[11px] text-slate-400 hidden sm:block">{item.desc}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
