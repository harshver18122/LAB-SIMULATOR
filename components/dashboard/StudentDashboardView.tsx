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
  Play,
  Sparkles,
  ChevronRight
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const StudentDashboardView: React.FC = () => {
  const { user, bookings, reports, certificates, experiments } = useApp();
  const [activeTab, setActiveTab] = useState<'dashboard' | 'mylabs' | 'tutor' | 'teachers' | 'bookings' | 'reports' | 'certificates' | 'settings'>('dashboard');

  const activeExperiments = experiments.slice(0, 2);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Subnav Tabs Bar */}
      <div className="flex items-center gap-2 border-b border-slate-200/80 overflow-x-auto pb-3">
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
                  className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:text-[#0F2942] hover:bg-slate-100/80 flex items-center gap-2 whitespace-nowrap transition-all"
                >
                  <IconComp className="w-4 h-4 text-slate-400" />
                  {tab.label}
                </Link>
              ) : (
                <button
                  type="button"
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 whitespace-nowrap transition-all ${
                    isActive ? 'bg-[#0F2942] text-white shadow-md' : 'text-slate-600 hover:bg-slate-100/80'
                  }`}
                >
                  <IconComp className="w-4 h-4" />
                  {tab.label}
                </button>
              )}
            </React.Fragment>
          );
        })}
      </div>

      {/* Header Greeting */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-3xl font-extrabold text-[#0F2942] tracking-tight">
            Welcome back, {user.name} 👋
          </h1>
          <p className="text-xs sm:text-sm text-slate-600">
            Track your virtual experiment progress, lab reports, and upcoming consultations.
          </p>
        </div>
        <Link
          href="/labs"
          className="px-5 py-2.5 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs font-bold shadow-md transition-all flex items-center gap-2 self-start sm:self-auto"
        >
          <FlaskConical className="w-4 h-4" />
          <span>Launch Virtual Lab</span>
        </Link>
      </div>

      {/* Top Stat Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
        <div className="glass-card p-5 space-y-2 border border-slate-200/80">
          <div className="flex items-center justify-between text-xs text-slate-500 font-semibold">
            <span>Completed Labs</span>
            <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-extrabold text-[#0F2942]">{user.completedLabsCount || 14}</div>
          <div className="text-[11px] text-emerald-600 font-bold flex items-center gap-1">
            <TrendingUp className="w-3 h-3" /> +2 completed this week
          </div>
        </div>

        <div className="glass-card p-5 space-y-2 border border-slate-200/80">
          <div className="flex items-center justify-between text-xs text-slate-500 font-semibold">
            <span>Learning Hours</span>
            <div className="w-8 h-8 rounded-xl bg-blue-50 text-[#2563EB] flex items-center justify-center">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-extrabold text-[#0F2942]">14.5 hrs</div>
          <div className="text-[11px] text-[#2563EB] font-bold">On track for weekly goal</div>
        </div>

        <div className="glass-card p-5 space-y-2 border border-slate-200/80">
          <div className="flex items-center justify-between text-xs text-slate-500 font-semibold">
            <span>Viva Score</span>
            <div className="w-8 h-8 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
              <Zap className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-extrabold text-[#0F2942]">94%</div>
          <div className="text-[11px] text-purple-600 font-bold">Top 5% quantile</div>
        </div>

        <div className="glass-card p-5 space-y-2 border border-slate-200/80">
          <div className="flex items-center justify-between text-xs text-slate-500 font-semibold">
            <span>Certificates</span>
            <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
              <Award className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-extrabold text-[#0F2942]">{certificates.length || 3}</div>
          <div className="text-[11px] text-amber-600 font-bold">Verified credentials</div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Continue Learning Section */}
        <div className="lg:col-span-7 space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-base text-[#0F2942] flex items-center gap-2">
              <FlaskConical className="w-4 h-4 text-[#2563EB]" /> Continue Learning
            </h3>
            <Link href="/labs" className="text-xs font-bold text-[#2563EB] hover:underline flex items-center gap-1">
              View All Labs <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="space-y-3">
            {activeExperiments.map((exp) => (
              <div key={exp.id} className="glass-card p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border border-slate-200/80">
                <div className="flex items-center gap-3.5">
                  <img src={exp.image} alt={exp.title} className="w-20 h-16 rounded-xl object-cover border border-slate-200 shadow-2xs" />
                  <div>
                    <span className="text-[10px] font-extrabold text-[#2563EB] uppercase tracking-wider bg-blue-50 px-2 py-0.5 rounded border border-blue-100">{exp.subject}</span>
                    <h4 className="font-bold text-sm text-[#0F2942] mt-1">{exp.title}</h4>
                    <p className="text-xs text-slate-500 line-clamp-1">{exp.aim}</p>
                  </div>
                </div>

                <Link
                  href={`/labs/${exp.id}`}
                  className="px-4 py-2 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs font-bold shadow-xs flex items-center gap-1.5 shrink-0 transition-all"
                >
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>Resume</span>
                </Link>
              </div>
            ))}
          </div>

          {/* Learning Progress Section */}
          <div className="glass-card p-6 space-y-4 border border-slate-200/80">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-bold text-sm text-[#0F2942]">Curriculum Mastery</h3>
              <span className="text-xs font-mono font-bold text-[#2563EB] bg-blue-50 px-2.5 py-0.5 rounded-full">Weekly Target: 80%</span>
            </div>

            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-xs text-slate-700 font-semibold mb-1">
                  <span>Physics Practicals</span>
                  <span className="font-bold text-[#0F2942]">90%</span>
                </div>
                <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                  <div className="bg-gradient-to-r from-[#2563EB] to-[#06B6D4] h-full w-[90%] rounded-full" />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs text-slate-700 font-semibold mb-1">
                  <span>Chemistry Practicals</span>
                  <span className="font-bold text-[#0F2942]">75%</span>
                </div>
                <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                  <div className="bg-gradient-to-r from-emerald-500 to-teal-400 h-full w-[75%] rounded-full" />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs text-slate-600 font-semibold mb-1">
                  <span>Computer Science</span>
                  <span className="font-bold text-[#0F2942]">85%</span>
                </div>
                <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                  <div className="bg-gradient-to-r from-purple-500 to-pink-400 h-full w-[85%] rounded-full" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Upcoming Consultations & Recent Activity */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Upcoming Consultation Card */}
          <div className="glass-card p-6 space-y-4 border border-slate-200/80">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-bold text-sm text-[#0F2942] flex items-center gap-2">
                <Calendar className="w-4 h-4 text-[#2563EB]" /> Upcoming Consultation
              </h3>
              <Link href="/teachers" className="text-xs font-bold text-[#2563EB] hover:underline">Find Teacher</Link>
            </div>

            {bookings.length === 0 ? (
              <div className="text-center py-6 space-y-2 border border-dashed border-slate-200 rounded-xl bg-slate-50/50">
                <p className="text-xs text-slate-500">No consultations booked.</p>
                <Link href="/teachers" className="inline-block text-xs font-bold text-[#2563EB] hover:underline">Find a Faculty Mentor →</Link>
              </div>
            ) : (
              bookings.map((bk) => (
                <div key={bk.id} className="p-4 rounded-xl bg-slate-50/80 border border-slate-200 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <img src={bk.teacherAvatar} alt={bk.teacherName} className="w-10 h-10 rounded-full object-cover ring-2 ring-blue-100" />
                      <div>
                        <div className="font-bold text-xs text-[#0F2942]">{bk.teacherName}</div>
                        <div className="text-[11px] text-slate-500 font-mono">{bk.date} • {bk.time}</div>
                      </div>
                    </div>
                  </div>
                  <a
                    href={bk.meetingUrl || '#'}
                    target="_blank"
                    rel="noreferrer"
                    className="w-full py-2.5 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs font-bold text-center block shadow-xs transition-all"
                  >
                    Join Video Call Session
                  </a>
                </div>
              ))
            )}
          </div>

          {/* Recent Activity Feed */}
          <div className="glass-card p-6 space-y-4 border border-slate-200/80">
            <h3 className="font-bold text-sm text-[#0F2942] flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-emerald-500" /> Recent Activity
            </h3>
            <div className="space-y-3.5 text-xs">
              <div className="flex items-start gap-3">
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 mt-1 shrink-0 ring-4 ring-emerald-100" />
                <div>
                  <p className="font-bold text-slate-800">Completed Ohm's Law Experiment</p>
                  <p className="text-[10px] text-slate-400">2 hours ago • Viva Score 94%</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2.5 h-2.5 rounded-full bg-[#2563EB] mt-1 shrink-0 ring-4 ring-blue-100" />
                <div>
                  <p className="font-bold text-slate-800">Generated Lab Report PDF</p>
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
