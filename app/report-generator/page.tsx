'use client';

import React from 'react';
import { Download, Printer, Share2, Sparkles, CheckCircle2, FlaskConical, FileText, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { useApp } from '../../context/AppContext';
import { ProtectedRoute } from '../../components/auth/ProtectedRoute';

export default function ReportGeneratorPage() {
  const { reports, user, showToast } = useApp();
  const report = reports[0];

  const handlePrint = () => {
    window.print();
  };

  return (
    <ProtectedRoute>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-6">
      
      {/* Top Action Bar (Section 20 Requirement) */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Link href="/labs" className="text-xs font-semibold text-slate-500 hover:text-[#2563EB] flex items-center gap-1">
              <ArrowLeft className="w-3.5 h-3.5" /> Back to Labs
            </Link>
          </div>
          <h1 className="text-2xl font-extrabold text-[#0F2942]">Academic Laboratory Report</h1>
          <p className="text-xs text-slate-600">Standardized laboratory observation sheet & calculated results.</p>
        </div>

        {/* Actions: View, Download, Share */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => showToast('Shareable report link copied to clipboard!', 'info')}
            className="px-3 py-2 rounded-lg border border-slate-300 bg-white hover:bg-slate-50 text-xs font-semibold text-slate-700 flex items-center gap-1.5"
          >
            <Share2 className="w-4 h-4" /> Share Report
          </button>
          <button
            onClick={handlePrint}
            className="px-3 py-2 rounded-lg border border-slate-300 bg-white hover:bg-slate-50 text-xs font-semibold text-slate-700 flex items-center gap-1.5"
          >
            <Printer className="w-4 h-4" /> Print
          </button>
          <button
            onClick={() => showToast('Report PDF downloaded successfully!', 'success')}
            className="px-4 py-2 rounded-lg bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs font-semibold shadow-xs flex items-center gap-1.5"
          >
            <Download className="w-4 h-4" /> Download PDF
          </button>
        </div>
      </div>

      {/* Official Academic Laboratory Sheet Preview (Section 20 Requirement) */}
      <div className="academic-card p-8 bg-white border border-slate-300 shadow-sm space-y-6 text-slate-900 font-sans print:shadow-none print:border-none">
        
        {/* Academic Header */}
        <div className="flex items-center justify-between border-b-2 border-[#0F2942] pb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-lg bg-[#0F2942] text-white flex items-center justify-center font-bold">
              <FlaskConical className="w-6 h-6" />
            </div>
            <div>
              <h2 className="font-extrabold text-base text-[#0F2942] uppercase tracking-tight">AI LAB SIMULATOR • ACADEMIC REPORT</h2>
              <div className="text-xs text-slate-500 font-mono">Report ID: RPT-2026-88301</div>
            </div>
          </div>
          <div className="text-right text-xs">
            <div className="font-bold text-[#0F2942]">{user.name}</div>
            <div className="text-slate-500">{user.college || 'Stanford STEM Academy'}</div>
            <div className="text-emerald-700 font-bold">Grade Score: {report?.scoreGrade || 'A+ (Verified)'}</div>
          </div>
        </div>

        {/* Report Metadata */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-3 bg-slate-50 rounded-lg border border-slate-200 text-xs">
          <div>
            <span className="text-slate-500 font-medium">Experiment:</span>
            <div className="font-bold text-[#0F2942] truncate">{report?.experimentTitle || 'Ohm\'s Law Experiment'}</div>
          </div>
          <div>
            <span className="text-slate-500 font-medium">Student:</span>
            <div className="font-semibold text-slate-800">{user.name}</div>
          </div>
          <div>
            <span className="text-slate-500 font-medium">Date:</span>
            <div className="font-semibold text-slate-800">{report?.date || '2026-08-08'}</div>
          </div>
          <div>
            <span className="text-slate-500 font-medium">Subject Discipline:</span>
            <div className="font-bold text-[#2563EB] capitalize">{report?.subject || 'Physics'}</div>
          </div>
        </div>

        {/* Section 1: Aim & Theory */}
        <div className="space-y-1.5">
          <h4 className="font-bold text-xs text-[#0F2942] uppercase tracking-wider border-b border-slate-200 pb-1">
            1. Aim & Theoretical Principle
          </h4>
          <p className="text-xs text-slate-700 leading-relaxed">{report?.theory}</p>
        </div>

        {/* Section 2: Observation Table */}
        <div className="space-y-1.5">
          <h4 className="font-bold text-xs text-[#0F2942] uppercase tracking-wider border-b border-slate-200 pb-1">
            2. Recorded Observation Data
          </h4>
          <table className="w-full text-left text-xs border border-slate-300">
            <thead>
              <tr className="bg-slate-100 font-bold border-b border-slate-300">
                <th className="p-2 border-r">Trial #</th>
                <th className="p-2 border-r">Variable 1</th>
                <th className="p-2 border-r">Variable 2</th>
                <th className="p-2">Calculated Result</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 font-mono">
              {report?.observations.map((obs) => (
                <tr key={obs.id}>
                  <td className="p-2 border-r font-bold">Trial #{obs.trial}</td>
                  <td className="p-2 border-r">{obs.variable1}</td>
                  <td className="p-2 border-r">{obs.variable2}</td>
                  <td className="p-2 font-bold text-[#2563EB]">{obs.calculatedResult}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Section 3: Calculated Result & Conclusion */}
        <div className="grid grid-cols-2 gap-4 pt-2">
          <div className="p-3 bg-slate-50 border rounded-lg space-y-1">
            <h5 className="font-bold text-xs text-[#0F2942]">3. Calculated Result</h5>
            <p className="text-xs text-slate-800 font-mono font-semibold">{report?.calculatedResult}</p>
          </div>
          <div className="p-3 bg-slate-50 border rounded-lg space-y-1">
            <h5 className="font-bold text-xs text-[#0F2942]">4. Conclusion</h5>
            <p className="text-xs text-slate-700 leading-relaxed">{report?.conclusion}</p>
          </div>
        </div>

        {/* Faculty Signature Seal */}
        <div className="pt-4 border-t border-slate-200 flex items-center justify-between text-xs">
          <div className="space-y-1">
            <span className="font-bold text-[#0F2942] flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-[#2563EB]" /> AI Tutor Audit Insights
            </span>
            <p className="text-slate-600 text-[11px] max-w-md">{report?.aiInsights}</p>
          </div>
          <div className="text-center space-y-1 border-l border-slate-200 pl-6 shrink-0">
            <div className="font-serif italic font-bold text-slate-800 text-sm">Dr. Sarah Jenkins</div>
            <div className="text-[10px] text-slate-400 font-mono">Faculty Signature Seal • Verified</div>
          </div>
        </div>

      </div>
    </div>
  </ProtectedRoute>
);
}
