'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  FlaskConical, 
  CheckCircle2, 
  Clock, 
  Bot, 
  Award, 
  Zap, 
  Calendar, 
  TrendingUp, 
  ArrowRight,
  BookOpen,
  FileText,
  Users,
  Settings,
  ShieldCheck,
  Play
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const StudentDashboardView: React.FC = () => {
  const { user, bookings, reports, certificates, experiments } = useApp();
  const [activeTab, setActiveTab] = useState<'dashboard' | 'mylabs' | 'tutor' | 'teachers' | 'bookings' | 'reports' | 'certificates' | 'settings'>('dashboard');

  const activeExperiments = experiments.slice(0, 2);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Sidebar / Subnav Tabs (Section 14 Requirement) */}
      <div className="flex items-center gap-1.5 border-b border-slate-200 overflow-x-auto pb-2">
        {[
          { id: 'dashboard', label: 'Dashboard', icon: TrendingUp },
          { id: 'mylabs', label: 'My Labs', icon: FlaskConical, href: '/labs' },
          { id: 'tutor', label: 'AI Tutor', icon: Bot, href: '/ai-tutor' },
          { id: 'teachers', label: 'Teachers', icon: Users, href: '/teachers' },
          { id: 'bookings', label: 'Bookings', icon: Calendar },
          { id: 'reports', label: 'Reports', icon: FileText, href: '/report-generator' },
          { id: 'certificates', label: 'Certificates', icon: Award, href: '/certificates' },
          { id: 'settings', label: 'Settings', icon: Settings, href: '/settings' },
        ].map((tab) => {
          const IconComp = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <React.Fragment key={tab.id}>
              {tab.href ? (
                <Link
                  href={tab.href}
                  className="px-3.5 py-1.5 rounded-lg text-xs font-semibold text-slate-600 hover:text-[#0F2942] hover:bg-slate-100 flex items-center gap-1.5 whitespace-nowrap"
                >
                  <IconComp className="w-3.5 h-3.5" />
                  {tab.label}
                </Link>
              ) : (
                <button
                  type="button"
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 whitespace-nowrap transition-colors ${
                    isActive ? 'bg-[#0F2942] text-white shadow-xs' : 'text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  <IconComp className="w-3.5 h-3.5" />
                  {tab.label}
                </button>
              )}
            </React.Fragment>
          );
        })}
      </div>

      {/* Header Greeting (Section 14 Requirement) */}
      <div className="space-y-1">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0F2942] tracking-tight">
          Good morning, {user.name} 👋
        </h1>
        <p className="text-xs text-slate-600">
          Continue your learning journey and explore virtual science laboratories.
        </p>
      </div>

      {/* Top Cards (Section 14 Requirement) */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="academic-card p-5 space-y-1">
          <div className="flex items-center justify-between text-xs text-slate-500">
            <span>Experiments Completed</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-2xl font-extrabold text-[#0F2942]">{user.completedLabsCount || 14}</div>
          <div className="text-[11px] text-emerald-600 font-medium">+2 completed this week</div>
        </div>

        <div className="academic-card p-5 space-y-1">
          <div className="flex items-center justify-between text-xs text-slate-500">
            <span>Learning Hours</span>
            <Clock className="w-4 h-4 text-[#2563EB]" />
          </div>
          <div className="text-2xl font-extrabold text-[#0F2942]">14.5 hrs</div>
          <div className="text-[11px] text-[#2563EB] font-medium">On track for weekly goal</div>
        </div>

        <div className="academic-card p-5 space-y-1">
          <div className="flex items-center justify-between text-xs text-slate-500">
            <span>Quiz Score</span>
            <TrendingUp className="w-4 h-4 text-purple-600" />
          </div>
          <div className="text-2xl font-extrabold text-[#0F2942]">94%</div>
          <div className="text-[11px] text-purple-600 font-medium">Excellent viva score</div>
        </div>

        <div className="academic-card p-5 space-y-1">
          <div className="flex items-center justify-between text-xs text-slate-500">
            <span>Certificates</span>
            <Award className="w-4 h-4 text-amber-600" />
          </div>
          <div className="text-2xl font-extrabold text-[#0F2942]">{certificates.length || 3}</div>
          <div className="text-[11px] text-amber-600 font-medium">Verified credentials</div>
        </div>
      </div>

      {/* Main Grid: Continue Learning & Upcoming Consultations */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Continue Learning Section (Section 14 Requirement) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-sm text-[#0F2942]">Continue Learning</h3>
            <Link href="/labs" className="text-xs font-bold text-[#2563EB] hover:underline">View All Labs</Link>
          </div>

          <div className="space-y-3">
            {activeExperiments.map((exp) => (
              <div key={exp.id} className="academic-card p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <img src={exp.image} alt={exp.title} className="w-16 h-14 rounded-lg object-cover border border-slate-200" />
                  <div>
                    <span className="text-[10px] font-bold text-[#2563EB] uppercase tracking-wider">{exp.subject}</span>
                    <h4 className="font-bold text-xs text-[#0F2942]">{exp.title}</h4>
                    <p className="text-[11px] text-slate-500 line-clamp-1">{exp.aim}</p>
                  </div>
                </div>

                <Link
                  href={`/labs/${exp.id}`}
                  className="px-4 py-2 rounded-lg bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs font-semibold flex items-center gap-1.5 shrink-0"
                >
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>Resume</span>
                </Link>
              </div>
            ))}
          </div>

          {/* Learning Progress Charts (Section 14 Requirement) */}
          <div className="academic-card p-5 space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-xs text-[#0F2942]">Learning Progress</h3>
              <span className="text-[11px] font-mono text-slate-500">Weekly Target: 80%</span>
            </div>

            <div className="space-y-2">
              <div>
                <div className="flex justify-between text-xs text-slate-600 mb-1">
                  <span>Physics Practicals</span>
                  <span className="font-bold text-[#0F2942]">90%</span>
                </div>
                <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                  <div className="bg-[#2563EB] h-full w-[90%]" />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-xs text-slate-600 mb-1">
                  <span>Chemistry Practicals</span>
                  <span className="font-bold text-[#0F2942]">75%</span>
                </div>
                <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                  <div className="bg-emerald-500 h-full w-[75%]" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Upcoming Consultations & Recent Activity */}
        <div className="lg:col-span-5 space-y-4">
          
          {/* Upcoming Consultation Section (Section 14 Requirement) */}
          <div className="academic-card p-5 space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-xs text-[#0F2942]">Upcoming Consultation</h3>
              <Link href="/teachers" className="text-[11px] font-bold text-[#2563EB] hover:underline">Find Teacher</Link>
            </div>

            {bookings.length === 0 ? (
              <div className="text-center py-6 space-y-2 border border-dashed border-slate-200 rounded-lg">
                <p className="text-xs text-slate-500">No consultations booked.</p>
                <Link href="/teachers" className="inline-block text-xs font-bold text-[#2563EB]">Find a Teacher →</Link>
              </div>
            ) : (
              bookings.map((bk) => (
                <div key={bk.id} className="p-3.5 rounded-lg bg-slate-50 border border-slate-200 space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <img src={bk.teacherAvatar} alt={bk.teacherName} className="w-8 h-8 rounded-full object-cover" />
                      <div>
                        <div className="font-bold text-xs text-[#0F2942]">{bk.teacherName}</div>
                        <div className="text-[10px] text-slate-500">{bk.date} • {bk.time}</div>
                      </div>
                    </div>
                  </div>
                  <a
                    href={bk.meetingUrl || '#'}
                    target="_blank"
                    rel="noreferrer"
                    className="w-full py-2 rounded-lg bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs font-bold text-center block"
                  >
                    Join Session
                  </a>
                </div>
              ))
            )}
          </div>

          {/* Recent Activity Timeline */}
          <div className="academic-card p-5 space-y-3">
            <h3 className="font-bold text-xs text-[#0F2942]">Recent Activity</h3>
            <div className="space-y-3 text-xs">
              <div className="flex items-start gap-2.5">
                <div className="w-2 h-2 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
                <div>
                  <p className="font-semibold text-slate-800">Completed Ohm's Law Experiment</p>
                  <p className="text-[10px] text-slate-400">2 hours ago</p>
                </div>
              </div>
              <div className="flex items-start gap-2.5">
                <div className="w-2 h-2 rounded-full bg-[#2563EB] mt-1.5 shrink-0" />
                <div>
                  <p className="font-semibold text-slate-800">Generated Lab Report PDF</p>
                  <p className="text-[10px] text-slate-400">Yesterday at 4:30 PM</p>
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
