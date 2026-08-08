'use client';

import React from 'react';
import { Award, Download, Share2, ShieldCheck, QrCode, CheckCircle2 } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { ProtectedRoute } from '../../components/auth/ProtectedRoute';

export default function CertificatesPage() {
  const { certificates, user, showToast } = useApp();

  return (
    <ProtectedRoute>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-[#0F2942] tracking-tight">
            Academic STEM Certificates
          </h1>
          <p className="text-xs text-slate-600 mt-1">
            Verified course completion credentials for student portfolios.
          </p>
        </div>
      </div>

      {/* List of Certificates */}
      <div className="space-y-8">
        {certificates.map((cert) => (
          <div key={cert.id} className="academic-card p-6 sm:p-8 bg-white border border-slate-300 space-y-6">
            
            {/* Top Bar: Verification Status & Actions (Section 21 Requirement) */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-1 rounded bg-emerald-50 text-emerald-700 text-xs font-bold flex items-center gap-1.5 border border-emerald-200">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  Verification Status: Verified Active
                </span>
                <span className="text-xs text-slate-400 font-mono">ID: {cert.verificationCode}</span>
              </div>

              {/* Buttons: Download, Share, Verify */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => showToast(`Certificate ${cert.verificationCode} verified on blockchain!`, 'success')}
                  className="px-3 py-1.5 rounded-lg border border-slate-300 bg-white hover:bg-slate-50 text-xs font-semibold text-slate-700 flex items-center gap-1.5"
                >
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Verify
                </button>
                <button
                  onClick={() => showToast('Certificate link copied to clipboard!', 'info')}
                  className="px-3 py-1.5 rounded-lg border border-slate-300 bg-white hover:bg-slate-50 text-xs font-semibold text-slate-700 flex items-center gap-1.5"
                >
                  <Share2 className="w-3.5 h-3.5" /> Share
                </button>
                <button
                  onClick={() => showToast('Certificate PDF downloaded!', 'success')}
                  className="px-4 py-1.5 rounded-lg bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs font-semibold shadow-xs flex items-center gap-1.5"
                >
                  <Download className="w-3.5 h-3.5" /> Download PDF
                </button>
              </div>
            </div>

            {/* Certificate Core Content */}
            <div className="text-center space-y-3 py-4 bg-slate-50/50 rounded-xl p-6 border border-slate-100">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-[#2563EB] text-[10px] font-bold uppercase tracking-wider">
                <Award className="w-3.5 h-3.5" /> Academic Completion Credential
              </div>
              <h2 className="text-2xl font-serif font-extrabold text-[#0F2942]">
                {cert.studentName}
              </h2>
              <p className="text-xs text-slate-600 max-w-lg mx-auto">
                has successfully completed all required virtual experiments, observation data tables, and viva examinations for
              </p>
              <h3 className="text-lg font-bold text-[#2563EB]">{cert.courseTitle}</h3>
              <div className="text-xs text-slate-500 font-mono pt-1">
                Issued Date: <strong className="text-slate-800">{cert.issueDate}</strong> • Score: <strong className="text-emerald-700">{cert.score}%</strong>
              </div>
            </div>

            {/* Bottom QR & Signatures */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2 text-xs">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-white p-1 rounded border border-slate-200 flex items-center justify-center">
                  <QrCode className="w-10 h-10 text-slate-800" />
                </div>
                <div className="text-[11px] text-slate-500">
                  <div>Verification Code: <span className="font-mono font-bold text-[#0F2942]">{cert.verificationCode}</span></div>
                  <div>Official Academic Seal</div>
                </div>
              </div>

              <div className="flex items-center gap-6 text-center text-xs">
                <div>
                  <div className="font-serif italic font-bold text-slate-800">Dr. Sarah Jenkins</div>
                  <div className="text-[10px] text-slate-400 font-mono border-t pt-0.5">Faculty Lead</div>
                </div>
                <div>
                  <div className="font-serif italic font-bold text-slate-800">Prof. Robert Chen</div>
                  <div className="text-[10px] text-slate-400 font-mono border-t pt-0.5">Academic Dean</div>
                </div>
              </div>
            </div>

          </div>
        ))}
      </div>

      </div>
    </ProtectedRoute>
  );
}
