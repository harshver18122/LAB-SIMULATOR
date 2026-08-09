'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Mail, RefreshCw, LogOut, ShieldAlert, CheckCircle2, FlaskConical, Loader2, ArrowRight } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { UserRole } from '../../types';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: UserRole;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, requiredRole }) => {
  const { user, isAuthLoading, resendVerification, reloadAuthState, logout, openAuthModal } = useApp();
  const [cooldown, setCooldown] = useState(0);
  const [isResending, setIsResending] = useState(false);
  const [isReloading, setIsReloading] = useState(false);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (cooldown > 0) {
      timer = setInterval(() => setCooldown((prev) => prev - 1), 1000);
    }
    return () => clearInterval(timer);
  }, [cooldown]);

  // Loading state
  if (isAuthLoading) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center p-6 space-y-4">
        <div className="w-12 h-12 rounded-2xl bg-[#0F2942] text-white flex items-center justify-center shadow-lg animate-bounce">
          <FlaskConical className="w-6 h-6 text-[#2563EB]" />
        </div>
        <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
          <Loader2 className="w-4 h-4 animate-spin text-[#2563EB]" />
          <span>Verifying authentication state...</span>
        </div>
      </div>
    );
  }

  const isGuest = !user || user.id === 'guest-learner-01';

  // Unauthenticated user state
  if (isGuest) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center p-4 sm:p-6">
        <div className="max-w-md w-full bg-white rounded-2xl border border-slate-200 shadow-xl p-6 sm:p-8 text-center space-y-5">
          <div className="w-14 h-14 rounded-2xl bg-blue-50 text-[#2563EB] mx-auto flex items-center justify-center">
            <ShieldAlert className="w-7 h-7" />
          </div>

          <div className="space-y-2">
            <h2 className="text-xl font-bold text-[#0F2942]">Authentication Required</h2>
            <p className="text-xs text-slate-600 leading-relaxed">
              You must be logged in to access virtual laboratories, AI tutoring, certificates, and user settings.
            </p>
          </div>

          <div className="pt-2 space-y-2">
            <Link
              href="/login"
              className="w-full py-2.5 rounded-lg bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs font-semibold shadow-xs flex items-center justify-center gap-2 transition-all"
            >
              <span>Sign In to Your Account</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <button
              type="button"
              onClick={() => openAuthModal('register')}
              className="w-full py-2.5 rounded-lg border border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-700 text-xs font-semibold transition-colors"
            >
              Create New Academic Account
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Check Email Verification status for non-guest users
  const needsVerification = user.emailVerified === false;

  if (needsVerification) {
    const handleResend = async () => {
      if (cooldown > 0 || isResending) return;
      setIsResending(true);
      const success = await resendVerification();
      setIsResending(false);
      if (success) {
        setCooldown(60);
      }
    };

    const handleReload = async () => {
      if (isReloading) return;
      setIsReloading(true);
      await reloadAuthState();
      setIsReloading(false);
    };

    return (
      <div className="min-h-[70vh] flex items-center justify-center p-4 sm:p-6">
        <div className="max-w-lg w-full bg-white rounded-2xl border border-amber-200 shadow-xl p-6 sm:p-8 space-y-6 text-center">
          
          <div className="w-16 h-16 rounded-2xl bg-amber-50 text-amber-600 mx-auto flex items-center justify-center border border-amber-100">
            <Mail className="w-8 h-8 animate-pulse" />
          </div>

          <div className="space-y-2">
            <span className="text-[10px] font-extrabold tracking-wider text-amber-600 uppercase bg-amber-50 px-2.5 py-1 rounded-full border border-amber-200">
              Account Verification Required
            </span>
            <h2 className="text-2xl font-bold text-[#0F2942]">Verify your email to continue</h2>
            <p className="text-xs text-slate-600 leading-relaxed max-w-md mx-auto">
              We have sent a verification email to <strong className="text-slate-900 font-mono">{user.email}</strong>. 
              Please check your inbox (and spam folder) and click the verification link to unlock dashboard access.
            </p>
          </div>

          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-3 text-left">
            <div className="flex items-start gap-2.5 text-xs text-slate-700">
              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
              <span>Click the verification link sent to your email.</span>
            </div>
            <div className="flex items-start gap-2.5 text-xs text-slate-700">
              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
              <span>After verifying, click <strong>"I've Verified My Email"</strong> below.</span>
            </div>
          </div>

          <div className="space-y-3 pt-2">
            <button
              type="button"
              onClick={handleReload}
              disabled={isReloading}
              className="w-full py-2.5 rounded-lg bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs font-bold shadow-xs flex items-center justify-center gap-2 transition-all disabled:opacity-60"
            >
              {isReloading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Checking verification status...</span>
                </>
              ) : (
                <>
                  <RefreshCw className="w-4 h-4" />
                  <span>I've Verified My Email — Access Dashboard</span>
                </>
              )}
            </button>

            <button
              type="button"
              onClick={handleResend}
              disabled={cooldown > 0 || isResending}
              className="w-full py-2.5 rounded-lg border border-slate-300 bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold transition-all disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {isResending ? (
                <span>Sending email...</span>
              ) : cooldown > 0 ? (
                <span>Resend Verification Email in {cooldown}s</span>
              ) : (
                <span>Resend Verification Email</span>
              )}
            </button>

            <button
              type="button"
              onClick={logout}
              className="text-xs text-slate-500 hover:text-red-600 font-medium flex items-center justify-center gap-1.5 mx-auto pt-2"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Log out or use a different account</span>
            </button>
          </div>

        </div>
      </div>
    );
  }

  // Strict Role Verification (RBAC)
  if (requiredRole) {
    const isOwnerRole = requiredRole === 'owner' || requiredRole === 'admin';
    const hasOwnerAccess = user.role === 'owner' || user.role === 'admin';

    const isAuthorized = isOwnerRole ? hasOwnerAccess : user.role === requiredRole;

    if (!isAuthorized) {
      const getAppropriateRedirect = () => {
        if (user.role === 'teacher') return '/dashboard/teacher';
        if (hasOwnerAccess) return '/dashboard/admin';
        return '/dashboard/student';
      };

      return (
        <div className="min-h-[70vh] flex items-center justify-center p-4 sm:p-6">
          <div className="max-w-md w-full bg-white rounded-2xl border border-red-200 shadow-xl p-6 sm:p-8 text-center space-y-5">
            <div className="w-16 h-16 rounded-2xl bg-red-50 text-red-600 mx-auto flex items-center justify-center border border-red-100">
              <ShieldAlert className="w-8 h-8" />
            </div>

            <div className="space-y-2">
              <span className="text-[10px] font-extrabold tracking-wider text-red-600 uppercase bg-red-50 px-2.5 py-1 rounded-full border border-red-200">
                403 Access Denied
              </span>
              <h2 className="text-xl font-bold text-[#0F2942]">Restricted Access Area</h2>
              <p className="text-xs text-slate-600 leading-relaxed">
                Your current account role (<strong className="capitalize text-slate-800">{user.role}</strong>) does not have permission to view this section.
              </p>
            </div>

            <div className="pt-2">
              <Link
                href={getAppropriateRedirect()}
                className="w-full py-2.5 rounded-lg bg-[#0F2942] hover:bg-[#1D4ED8] text-white text-xs font-semibold shadow-xs flex items-center justify-center gap-2 transition-all"
              >
                <span>Return to Your Dashboard</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      );
    }
  }

  // Render protected content when authenticated, verified & role authorized
  return <>{children}</>;
};

