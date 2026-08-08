'use client';

import React from 'react';
import { Target, Eye, ShieldCheck, CheckCircle2 } from 'lucide-react';

export default function AboutPage() {
  const team = [
    { name: 'Dr. Sarah Jenkins', role: 'Chief Executive Officer & Founder', bg: 'Ex-NASA & MIT Physics Researcher', img: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&auto=format&fit=crop&q=80' },
    { name: 'Michael Chang', role: 'Head of Product & AI Architecture', bg: 'Ex-Google EdTech & Stanford CS Alum', img: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=200&auto=format&fit=crop&q=80' },
    { name: 'Dr. Priya Sharma', role: 'Director of Virtual Pedagogy', bg: 'Cambridge Chemistry Senior Fellow', img: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&auto=format&fit=crop&q=80' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      
      {/* Hero Mission Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-xs font-bold text-[#2563EB] uppercase tracking-wider bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
          Our Mission & Vision
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#0F2942] tracking-tight">
          Democratizing STEM Education Worldwide
        </h1>
        <p className="text-sm text-slate-600 leading-relaxed">
          AI Lab Simulator provides every student and teacher with research-grade virtual laboratories powered by mathematical physics engines and 24/7 AI tutoring.
        </p>
      </div>

      {/* Mission & Vision Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="academic-card p-8 space-y-3">
          <div className="w-12 h-12 rounded-xl bg-blue-50 text-[#2563EB] flex items-center justify-center">
            <Target className="w-6 h-6" />
          </div>
          <h2 className="text-xl font-bold text-[#0F2942]">Our Mission</h2>
          <p className="text-xs text-slate-600 leading-relaxed">
            To deliver interactive, scientifically verified lab simulations across Physics, Chemistry, Biology, Electronics, and Computer Science.
          </p>
        </div>

        <div className="academic-card p-8 space-y-3">
          <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
            <Eye className="w-6 h-6" />
          </div>
          <h2 className="text-xl font-bold text-[#0F2942]">Our Vision</h2>
          <p className="text-xs text-slate-600 leading-relaxed">
            To empower over 10 million students worldwide to achieve STEM mastery through hands-on simulations, 1-on-1 expert faculty mentorship, and verified certificates.
          </p>
        </div>
      </div>

      {/* Core Leadership Team */}
      <div className="space-y-8">
        <div className="text-center max-w-xl mx-auto space-y-2">
          <h2 className="text-2xl font-extrabold text-[#0F2942]">Academic Leadership Team</h2>
          <p className="text-xs text-slate-500">World-class educators, NASA researchers, and EdTech engineers.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {team.map((t, idx) => (
            <div key={idx} className="academic-card p-6 text-center space-y-3">
              <img src={t.img} alt={t.name} className="w-20 h-20 rounded-full object-cover mx-auto border-2 border-[#2563EB]" />
              <div>
                <h3 className="font-bold text-base text-[#0F2942]">{t.name}</h3>
                <div className="text-xs font-semibold text-[#2563EB] mt-0.5">{t.role}</div>
                <div className="text-[11px] text-slate-500 mt-1">{t.bg}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
