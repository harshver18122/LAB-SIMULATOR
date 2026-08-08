'use client';

import React, { useEffect, useState, Suspense } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { FlaskConical, ArrowLeft, ShieldCheck, KeyRound, Loader2, CheckCircle2 } from 'lucide-react';
import { EducationalAuthForm } from '../../components/auth/EducationalAuthForm';
import { useApp } from '../../context/AppContext';

interface AuthPageProps {
  initialMode?: 'login' | 'register' | 'forgot' | 'sent-reset';
}

function AuthPageContent({ initialMode = 'login' }: AuthPageProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { user, isAuthLoading, handleAuthAction } = useApp();

  const urlMode = searchParams.get('mode') as 'login' | 'register' | 'forgot' | 'verifyEmail' | 'resetPassword' | null;
  const oobCode = searchParams.get('oobCode');

  const [activeMode, setActiveMode] = useState<'login' | 'register' | 'forgot' | 'sent-reset'>(
    urlMode === 'register' ? 'register' : urlMode === 'forgot' ? 'forgot' : initialMode
  );

  const [newPassword, setNewPassword] = useState('');
  const [actionStatus, setActionStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [actionMessage, setActionMessage] = useState('');

  // Auto-redirect if already authenticated and verified
  useEffect(() => {
    if (!isAuthLoading && user && user.id !== 'guest-learner-01' && user.emailVerified !== false && !oobCode) {
      const targetDashboard = user.role === 'teacher' ? '/dashboard/teacher' : user.role === 'admin' ? '/dashboard/admin' : '/dashboard/student';
      router.push(targetDashboard);
    }
  }, [user, isAuthLoading, router, oobCode]);

  // Handle Firebase Email Action Link (verifyEmail or resetPassword)
  useEffect(() => {
    if (urlMode === 'verifyEmail' && oobCode) {
      setActionStatus('loading');
      handleAuthAction('verifyEmail', oobCode).then((success) => {
        if (success) {
          setActionStatus('success');
          setActionMessage('Your email has been verified! Redirecting to dashboard...');
          setTimeout(() => router.push('/dashboard/student'), 2500);
        } else {
          setActionStatus('error');
          setActionMessage('Verification link expired or invalid.');
        }
      });
    }
  }, [urlMode, oobCode, handleAuthAction, router]);

  const handlePasswordResetSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!oobCode || !newPassword) return;
    setActionStatus('loading');
    const success = await handleAuthAction('resetPassword', oobCode, newPassword);
    if (success) {
      setActionStatus('success');
      setActionMessage('Password updated successfully! Please log in with your new password.');
      setActiveMode('login');
    } else {
      setActionStatus('error');
      setActionMessage('Failed to reset password. Link may be expired.');
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-between p-4 sm:p-6">
      
      {/* Header */}
      <header className="max-w-7xl w-full mx-auto flex items-center justify-between py-2">
        <Link 
          href="/" 
          className="flex items-center gap-2 text-slate-600 hover:text-[#0F2942] font-semibold text-xs transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Portal</span>
        </Link>

        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-[#0F2942] flex items-center justify-center text-white">
            <FlaskConical className="w-4 h-4" />
          </div>
          <span className="font-bold text-sm text-[#0F2942]">AI Lab Simulator</span>
        </Link>
      </header>

      {/* Centered Auth Container */}
      <main className="max-w-4xl w-full mx-auto my-auto py-8">
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden grid grid-cols-1 md:grid-cols-12 items-center">
          
          {/* Left Side: Illustration */}
          <div className="hidden md:flex md:col-span-5 bg-slate-50 p-8 border-r border-slate-200 h-full flex-col justify-between">
            <div className="space-y-4">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#2563EB] flex items-center justify-center">
                <FlaskConical className="w-5 h-5" />
              </div>
              <h2 className="text-xl font-extrabold text-[#0F2942] leading-snug">
                Virtual Science Learning Platform
              </h2>
              <p className="text-xs text-slate-600 leading-relaxed">
                Access interactive virtual experiments, 24/7 AI tutoring, and 1-on-1 teacher consultations safely.
              </p>
            </div>

            <div className="py-6">
              <svg className="w-full h-32 text-slate-300" viewBox="0 0 200 100">
                <circle cx="100" cy="50" r="30" fill="none" stroke="#CBD5E1" strokeWidth="2" strokeDasharray="4 2" />
                <circle cx="100" cy="50" r="8" fill="#2563EB" />
                <ellipse cx="100" cy="50" rx="60" ry="20" fill="none" stroke="#2563EB" strokeWidth="1.5" />
              </svg>
            </div>

            <div className="text-[11px] text-slate-400 font-medium flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-500" />
              Firebase Cloud Authentication
            </div>
          </div>

          {/* Right Side: Auth Form or Action Link Handler */}
          <div className="md:col-span-7 p-6 sm:p-8 space-y-4">
            
            {urlMode === 'resetPassword' && oobCode ? (
              <div className="space-y-4">
                <div className="text-center md:text-left">
                  <h1 className="text-2xl font-bold text-[#0F2942]">Set New Password</h1>
                  <p className="text-xs text-slate-500 mt-1">Enter your new secure password for your account.</p>
                </div>

                {actionStatus === 'success' && (
                  <div className="p-3 rounded-lg bg-emerald-50 text-emerald-800 text-xs font-semibold flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>{actionMessage}</span>
                  </div>
                )}

                <form onSubmit={handlePasswordResetSubmit} className="space-y-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">New Password</label>
                    <input
                      type="password"
                      required
                      placeholder="••••••••••••"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      className="w-full px-4 py-2.5 text-xs rounded-lg border border-slate-300 font-mono"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={actionStatus === 'loading'}
                    className="w-full py-2.5 rounded-lg bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs font-semibold shadow-xs flex items-center justify-center gap-2"
                  >
                    {actionStatus === 'loading' ? <Loader2 className="w-4 h-4 animate-spin" /> : <span>Update Password</span>}
                  </button>
                </form>
              </div>
            ) : urlMode === 'verifyEmail' && oobCode ? (
              <div className="text-center py-8 space-y-4">
                <div className="w-12 h-12 rounded-full bg-blue-50 text-[#2563EB] mx-auto flex items-center justify-center">
                  <Loader2 className="w-6 h-6 animate-spin" />
                </div>
                <h2 className="text-xl font-bold text-[#0F2942]">Verifying Email...</h2>
                <p className="text-xs text-slate-600">{actionMessage || 'Please wait while we verify your account.'}</p>
              </div>
            ) : (
              <>
                <div className="text-center md:text-left">
                  <h1 className="text-2xl font-bold text-[#0F2942]">
                    {activeMode === 'register' ? 'Create Academic Account' : 'Welcome Back'}
                  </h1>
                  <p className="text-xs text-slate-500 mt-1">
                    {activeMode === 'register' 
                      ? 'Sign up to start exploring virtual labs and AI tutoring.' 
                      : 'Sign in to your academic account to continue learning.'}
                  </p>
                </div>

                <EducationalAuthForm initialMode={activeMode} />
              </>
            )}

          </div>

        </div>
      </main>

      {/* Footer */}
      <footer className="text-center text-xs text-slate-400 py-2">
        © 2026 AI Lab Simulator. All rights reserved.
      </footer>

    </div>
  );
}

export default function AuthPage(props: AuthPageProps) {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-6 h-6 animate-spin text-[#2563EB]" />
      </div>
    }>
      <AuthPageContent {...props} />
    </Suspense>
  );
}
