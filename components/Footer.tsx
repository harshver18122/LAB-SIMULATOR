'use client';

import React from 'react';
import Link from 'next/link';
import { FlaskConical, ShieldCheck, Mail, Globe, ArrowRight } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#0F2942] text-slate-300 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-[#2563EB] flex items-center justify-center text-white">
                <FlaskConical className="w-5 h-5 stroke-[2.2]" />
              </div>
              <span className="font-bold text-lg text-white tracking-tight">
                AI Lab Simulator
              </span>
            </Link>
            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              A modern virtual science laboratory platform enabling students and educators to perform STEM experiments digitally, analyze live data, and consult AI tutors.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-800/80 border border-slate-700/80 text-[11px] text-emerald-400 font-mono">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                Firestore Live Sync Active
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-sm text-white mb-3 tracking-wide">Platform</h4>
            <ul className="space-y-2 text-xs">
              <li><Link href="/labs" className="hover:text-white transition-colors">Virtual Labs</Link></li>
              <li><Link href="/ai-tutor" className="hover:text-white transition-colors">AI Science Tutor</Link></li>
              <li><Link href="/teachers" className="hover:text-white transition-colors">Teacher Directory</Link></li>
              <li><Link href="/report-generator" className="hover:text-white transition-colors">Lab Report Generator</Link></li>
              <li><Link href="/certificates" className="hover:text-white transition-colors">STEM Certificates</Link></li>
            </ul>
          </div>

          {/* STEM Subjects */}
          <div>
            <h4 className="font-bold text-sm text-white mb-3 tracking-wide">Subjects</h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>Physics Laboratories</li>
              <li>Chemistry Experiments</li>
              <li>Biology & Cell Biology</li>
              <li>Digital Electronics & Logic</li>
              <li>Computer Science Algorithms</li>
            </ul>
          </div>

          {/* Academic Trust */}
          <div>
            <h4 className="font-bold text-sm text-white mb-3 tracking-wide">Institutional</h4>
            <ul className="space-y-2 text-xs">
              <li><Link href="/about" className="hover:text-white transition-colors">About Academy</Link></li>
              <li><Link href="/contact" className="hover:text-white transition-colors">Contact & Support</Link></li>
              <li><Link href="/auth" className="hover:text-white transition-colors">Student & Educator Portal</Link></li>
              <li><span className="text-slate-500">Curriculum Compliance</span></li>
              <li><span className="text-slate-500">Firebase Cloud Security</span></li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>© 2026 AI Lab Simulator Platform. Designed for STEM Higher Education.</p>
          <div className="flex items-center gap-6">
            <span>Privacy Policy</span>
            <span>Terms of Service</span>
            <span>Academic Guidelines</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
