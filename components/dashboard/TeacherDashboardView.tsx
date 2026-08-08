'use client';

import React, { useState } from 'react';
import { Users, Calendar, Plus, FileText, CheckCircle2, MessageSquare, Upload, Star, Clock } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const TeacherDashboardView: React.FC = () => {
  const { experiments, reports, gradeReport, publishQuizQuestion, showToast } = useApp();
  const [quizQuestion, setQuizQuestion] = useState('');
  const [selectedExpId, setSelectedExpId] = useState(experiments[0]?.id || 'exp-phy-01');
  const [opt1, setOpt1] = useState('');
  const [opt2, setOpt2] = useState('');

  const handleCreateQuiz = (e: React.FormEvent) => {
    e.preventDefault();
    if (!quizQuestion) return;
    publishQuizQuestion(selectedExpId, quizQuestion, opt1, opt2);
    setQuizQuestion('');
    setOpt1('');
    setOpt2('');
  };

  const todaySessions = [
    { id: 'ts-1', student: 'Alex Vance', subject: 'Physics', time: '10:00 AM', mode: 'Video', status: 'Confirmed' },
    { id: 'ts-2', student: 'Sarah Jenkins', subject: 'Chemistry', time: '02:30 PM', mode: 'Audio', status: 'Pending' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0F2942] tracking-tight">
            Teacher Dashboard
          </h1>
          <p className="text-xs text-slate-600 mt-1">
            Manage your consultation schedule, student requests, and lab quizzes.
          </p>
        </div>

        <button
          onClick={() => showToast('Material uploaded to storage!', 'success')}
          className="px-4 py-2 rounded-lg bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs font-semibold shadow-xs flex items-center gap-1.5"
        >
          <Upload className="w-4 h-4" />
          <span>Upload Material</span>
        </button>
      </div>

      {/* Overview Cards (Section 15 Requirement) */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="academic-card p-5 space-y-1">
          <div className="flex items-center justify-between text-xs text-slate-500">
            <span>Upcoming Sessions</span>
            <Calendar className="w-4 h-4 text-[#2563EB]" />
          </div>
          <div className="text-2xl font-extrabold text-[#0F2942]">8 Sessions</div>
          <div className="text-[11px] text-[#2563EB] font-medium">Next: Today 10:00 AM</div>
        </div>

        <div className="academic-card p-5 space-y-1">
          <div className="flex items-center justify-between text-xs text-slate-500">
            <span>Total Students</span>
            <Users className="w-4 h-4 text-purple-600" />
          </div>
          <div className="text-2xl font-extrabold text-[#0F2942]">128</div>
          <div className="text-[11px] text-purple-600 font-medium">Mentored across labs</div>
        </div>

        <div className="academic-card p-5 space-y-1">
          <div className="flex items-center justify-between text-xs text-slate-500">
            <span>Completed Sessions</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-2xl font-extrabold text-[#0F2942]">64</div>
          <div className="text-[11px] text-emerald-600 font-medium">100% satisfaction</div>
        </div>

        <div className="academic-card p-5 space-y-1">
          <div className="flex items-center justify-between text-xs text-slate-500">
            <span>Rating</span>
            <Star className="w-4 h-4 text-amber-500 fill-amber-400" />
          </div>
          <div className="text-2xl font-extrabold text-[#0F2942]">4.96 / 5.0</div>
          <div className="text-[11px] text-amber-600 font-medium">128 Verified Reviews</div>
        </div>
      </div>

      {/* Today's Sessions Table (Section 15 Requirement) */}
      <div className="academic-card p-6 space-y-4">
        <h3 className="font-bold text-sm text-[#0F2942]">Today's Consultation Sessions</h3>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-50 text-[#0F2942] font-bold border-b border-slate-200">
                <th className="p-3">Student Name</th>
                <th className="p-3">Subject</th>
                <th className="p-3">Scheduled Time</th>
                <th className="p-3">Format</th>
                <th className="p-3">Status</th>
                <th className="p-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {todaySessions.map((s) => (
                <tr key={s.id} className="hover:bg-slate-50">
                  <td className="p-3 font-bold text-[#0F2942]">{s.student}</td>
                  <td className="p-3">{s.subject}</td>
                  <td className="p-3 font-mono">{s.time}</td>
                  <td className="p-3 font-semibold text-[#2563EB]">{s.mode}</td>
                  <td className="p-3">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-700">
                      {s.status}
                    </span>
                  </td>
                  <td className="p-3 text-right">
                    <button
                      onClick={() => showToast(`Starting ${s.mode} session with ${s.student}...`, 'info')}
                      className="px-3 py-1 bg-[#2563EB] text-white text-[11px] font-semibold rounded hover:bg-[#1D4ED8]"
                    >
                      Start Session
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Grid: Student Requests & Quiz Publisher */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Student Lab Requests / Submissions */}
        <div className="academic-card p-6 space-y-4">
          <h3 className="font-bold text-sm text-[#0F2942] flex items-center gap-2">
            <FileText className="w-4 h-4 text-emerald-600" />
            Student Lab Submissions
          </h3>

          <div className="space-y-3">
            {reports.map((rpt) => (
              <div key={rpt.id} className="p-3.5 rounded-lg bg-slate-50 border border-slate-200 flex items-center justify-between gap-4">
                <div>
                  <div className="font-bold text-xs text-[#0F2942]">{rpt.studentName}</div>
                  <div className="text-[11px] text-slate-500">{rpt.experimentTitle} • Grade: {rpt.scoreGrade || 'A+'}</div>
                </div>
                <button
                  onClick={() => gradeReport(rpt.id, 'A+', 'Verified experimental accuracy by Faculty.')}
                  className="px-3 py-1 rounded bg-emerald-600 text-white text-xs font-semibold hover:bg-emerald-700"
                >
                  Grade
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Publish Quiz Tool */}
        <div className="academic-card p-6 space-y-4">
          <h3 className="font-bold text-sm text-[#0F2942] flex items-center gap-2">
            <Plus className="w-4 h-4 text-[#2563EB]" />
            Publish Quiz Question
          </h3>

          <form onSubmit={handleCreateQuiz} className="space-y-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Target Experiment</label>
              <select
                value={selectedExpId}
                onChange={(e) => setSelectedExpId(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 bg-white text-slate-800"
              >
                {experiments.map((exp) => (
                  <option key={exp.id} value={exp.id}>{exp.title}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Question Prompt</label>
              <input
                type="text"
                required
                placeholder="e.g. What is the effect of string length L on period T?"
                value={quizQuestion}
                onChange={(e) => setQuizQuestion(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 bg-white text-slate-800"
              />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Option A</label>
                <input
                  type="text"
                  placeholder="T ∝ √L"
                  value={opt1}
                  onChange={(e) => setOpt1(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 bg-white text-slate-800"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Option B</label>
                <input
                  type="text"
                  placeholder="T ∝ L²"
                  value={opt2}
                  onChange={(e) => setOpt2(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 bg-white text-slate-800"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-2.5 rounded-lg bg-[#0F2942] hover:bg-[#153454] text-white text-xs font-semibold shadow-xs"
            >
              Publish Question
            </button>
          </form>
        </div>

      </div>

    </div>
  );
};
