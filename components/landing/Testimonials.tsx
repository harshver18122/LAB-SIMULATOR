'use client';

import React from 'react';
import { Star, Quote } from 'lucide-react';

export const Testimonials: React.FC = () => {
  const testimonials = [
    {
      name: 'Dr. Marcus Vance',
      role: 'Professor of Applied Physics',
      institution: 'Stanford STEM Academy',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80',
      comment: 'AI Lab Simulator allows my students to test circuit variables and pendulum physics before stepping into our physical lab. The observation tables and AI viva questions are outstanding.'
    },
    {
      name: 'Elena Rostova',
      role: 'Undergraduate Chemistry Major',
      institution: 'MIT Department of Chemistry',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&auto=format&fit=crop&q=80',
      comment: 'The titration visualizer helped me grasp acid-base equivalence points instantly. Being able to generate structured PDF reports saved hours of tedious manual formatting.'
    },
    {
      name: 'David K. Chen',
      role: 'High School AP Physics Teacher',
      institution: 'Oakridge Science High',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80',
      comment: 'Finding verified virtual labs for remote teaching was tough until we adopted this simulator platform. Booking 1-on-1 consultations directly with students has been seamless.'
    }
  ];

  return (
    <section className="bg-slate-50 py-16 lg:py-24 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-[#2563EB]">Academic Reviews</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0F2942] tracking-tight">
            Trusted by Educators & Students
          </h2>
          <p className="text-slate-600 text-sm">
            Discover how virtual laboratory simulations transform STEM learning outcomes.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, idx) => (
            <div key={idx} className="academic-card p-6 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-1 text-amber-400 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <p className="text-xs text-slate-700 leading-relaxed italic mb-6">
                  "{t.comment}"
                </p>
              </div>

              <div className="flex items-center gap-3 pt-4 border-t border-slate-100">
                <img
                  src={t.avatar}
                  alt={t.name}
                  className="w-10 h-10 rounded-full object-cover ring-1 ring-slate-200"
                />
                <div>
                  <div className="text-xs font-bold text-[#0F2942]">{t.name}</div>
                  <div className="text-[11px] text-slate-500">{t.role}</div>
                  <div className="text-[10px] text-[#2563EB] font-medium">{t.institution}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
