'use client';

import React from 'react';
import Link from 'next/link';
import { 
  FlaskConical, 
  Bot, 
  Users, 
  FileText, 
  HelpCircle, 
  TrendingUp, 
  ArrowRight 
} from 'lucide-react';

export const WhyChooseUs: React.FC = () => {
  const features = [
    {
      id: 'labs',
      title: 'Virtual Labs',
      description: 'Perform science experiments digitally without expensive equipment or safety hazards.',
      icon: FlaskConical,
      link: '/labs',
      btnText: 'Explore Virtual Labs'
    },
    {
      id: 'ai-tutor',
      title: 'AI Tutor',
      description: 'Get instant step-by-step explanations, formula derivations, and doubt resolution 24/7.',
      icon: Bot,
      link: '/ai-tutor',
      btnText: 'Chat with AI Tutor'
    },
    {
      id: 'teachers',
      title: 'Teacher Consultation',
      description: 'Connect with verified professional teachers for 1-on-1 guidance when AI isn\'t enough.',
      icon: Users,
      link: '/teachers',
      btnText: 'Find Teachers'
    },
    {
      id: 'reports',
      title: 'AI Reports',
      description: 'Generate standardized laboratory observation reports and calculations automatically.',
      icon: FileText,
      link: '/report-generator',
      btnText: 'Generate Reports'
    },
    {
      id: 'quizzes',
      title: 'Interactive Quizzes',
      description: 'Test your conceptual understanding and viva prep after completing each virtual experiment.',
      icon: HelpCircle,
      link: '/labs',
      btnText: 'Take Practice Quizzes'
    },
    {
      id: 'progress',
      title: 'Progress Tracking',
      description: 'Track your learning timeline, lab scores, earned certificates, and academic growth.',
      icon: TrendingUp,
      link: '/dashboard/student',
      btnText: 'View Dashboard'
    }
  ];

  return (
    <section className="bg-white py-16 lg:py-24 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-[#2563EB]">Platform Features</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0F2942] tracking-tight">
            Everything You Need for STEM Mastery
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            Designed for students, educators, and institutions seeking a modern, reliable, and hands-on virtual laboratory environment.
          </p>
        </div>

        {/* 6-Card Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((item) => {
            const IconComponent = item.icon;
            return (
              <div
                key={item.id}
                className="academic-card p-6 flex flex-col justify-between group"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-blue-50 text-[#2563EB] flex items-center justify-center mb-4 group-hover:bg-[#2563EB] group-hover:text-white transition-colors">
                    <IconComponent className="w-6 h-6 stroke-[2.2]" />
                  </div>
                  <h3 className="text-lg font-bold text-[#0F2942] mb-2">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed mb-6">
                    {item.description}
                  </p>
                </div>

                <Link
                  href={item.link}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#2563EB] hover:text-[#1D4ED8] transition-colors pt-2 border-t border-slate-100"
                >
                  <span>{item.btnText}</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
