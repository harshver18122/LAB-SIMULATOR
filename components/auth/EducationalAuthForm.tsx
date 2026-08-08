'use client';

import React, { useState, useEffect } from 'react';
import { 
  Mail, 
  Lock, 
  User, 
  ArrowRight, 
  Eye, 
  EyeOff, 
  GraduationCap, 
  BookOpen, 
  Microscope, 
  CheckCircle2, 
  AlertCircle,
  Loader2,
  RefreshCw,
  FlaskConical
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { useApp } from '../../context/AppContext';
import { UserRole } from '../../types';
import { formatAuthError, loginWithGoogleRedirect } from '../../lib/firebaseAuth';

interface EducationalAuthFormProps {
  initialMode?: 'login' | 'register' | 'forgot' | 'sent-reset';
  onSuccess?: () => void;
  isModal?: boolean;
}

export const EducationalAuthForm: React.FC<EducationalAuthFormProps> = ({
  initialMode = 'login',
  onSuccess,
  isModal = false
}) => {
  const { 
    loginWithEmail, 
    registerWithEmail, 
    signInGoogle, 
    sendResetPassword,
    isAuthLoading,
    showToast,
    closeAuthModal
  } = useApp();

  const [mode, setMode] = useState<'login' | 'register' | 'forgot' | 'sent-reset'>(initialMode);
  const [role, setRole] = useState<UserRole>('student');
  
  // Form Inputs
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [rememberMe, setRememberMe] = useState(true);
  const [showPassword, setShowPassword] = useState(false);

  // Status Banners
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [errorCode, setErrorCode] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  useEffect(() => {
    setMode(initialMode);
    setErrorMessage(null);
    setErrorCode(null);
    setSuccessMessage(null);
  }, [initialMode]);

  const triggerCelebration = () => {
    try {
      confetti({ particleCount: 60, spread: 60, origin: { y: 0.6 } });
    } catch (e) {}
  };

  const handleModeChange = (newMode: 'login' | 'register' | 'forgot' | 'sent-reset') => {
    setErrorMessage(null);
    setErrorCode(null);
    setSuccessMessage(null);
    setMode(newMode);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setErrorCode(null);
    setSuccessMessage(null);

    // Basic client validation
    if (!email) {
      setErrorMessage('Please enter a valid email address.');
      return;
    }

    if (mode === 'login') {
      if (!password) {
        setErrorMessage('Please enter your password.');
        return;
      }
      const res = await loginWithEmail(email, password);
      if (res.success) {
        triggerCelebration();
        if (onSuccess) onSuccess();
        if (isModal) closeAuthModal();
      } else {
        setErrorMessage(res.error || 'Incorrect email or password credentials. Please try again.');
        setErrorCode(res.code || null);
      }
      return;
    }

    if (mode === 'register') {
      if (!name.trim()) {
        setErrorMessage('Please enter your full name.');
        return;
      }
      if (password.length < 6) {
        setErrorMessage('Password must be at least 6 characters long.');
        return;
      }
      const res = await registerWithEmail(email, password, name.trim(), role);
      if (res.success) {
        triggerCelebration();
        setSuccessMessage('Account created! A verification link has been sent to your email.');
        if (onSuccess) onSuccess();
        if (isModal) closeAuthModal();
      } else {
        setErrorMessage(res.error || 'Failed to create account. Email may already be registered.');
        setErrorCode(res.code || null);
      }
      return;
    }

    if (mode === 'forgot' || mode === 'sent-reset') {
      const res = await sendResetPassword(email);
      if (res.success) {
        setSuccessMessage(`Password reset link sent to ${email}. Check your inbox.`);
        setMode('sent-reset');
      } else {
        setErrorMessage(res.error || 'Unable to send password reset email. Please verify your email address.');
        setErrorCode(res.code || null);
      }
      return;
    }
  };

  const handleGoogleSignIn = async () => {
    setErrorMessage(null);
    setErrorCode(null);
    setSuccessMessage(null);
    const res = await signInGoogle(role);
    if (res.success) {
      triggerCelebration();
      if (onSuccess) onSuccess();
      if (isModal) closeAuthModal();
    } else {
      setErrorMessage(res.error || 'Google sign-in failed.');
      setErrorCode(res.code || null);
    }
  };

  const handleAutofillDemo = (demoRole: 'student' | 'teacher' | 'admin') => {
    setRole(demoRole);
    setErrorMessage(null);
    setSuccessMessage(null);
    if (demoRole === 'student') {
      setEmail('student@ailabs.edu');
      setPassword('Student#2026');
      setName('Alex Vance');
    } else if (demoRole === 'teacher') {
      setEmail('prof.sarah@science.edu');
      setPassword('Teacher#2026');
      setName('Dr. Sarah Jenkins');
    } else {
      setEmail('admin.stem@inst.edu');
      setPassword('AdminPass#2026');
      setName('Prof. Robert Chen');
    }
    showToast(`Autofilled credentials for ${demoRole.toUpperCase()}`, 'info');
  };

  return (
    <div className="w-full space-y-4 text-slate-800">
      
      {/* Role Selection Tabs */}
      <div>
        <label className="block text-[11px] font-bold tracking-wider uppercase text-slate-400 mb-1.5">
          Academic Persona
        </label>
        <div className="grid grid-cols-3 gap-2">
          {[
            { id: 'student', title: 'Student', icon: GraduationCap },
            { id: 'teacher', title: 'Teacher', icon: BookOpen },
            { id: 'admin', title: 'Researcher', icon: Microscope }
          ].map((r) => {
            const IconComponent = r.icon;
            const isSelected = role === r.id;
            return (
              <button
                key={r.id}
                type="button"
                disabled={isAuthLoading}
                onClick={() => setRole(r.id as UserRole)}
                className={`py-2 px-3 rounded-lg border text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors ${
                  isSelected 
                    ? 'bg-[#0F2942] text-white border-[#0F2942] shadow-xs' 
                    : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                }`}
              >
                <IconComponent className="w-3.5 h-3.5" />
                <span>{r.title}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Inline Status Banners */}
      {errorMessage && (
        <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs space-y-2 animate-in fade-in">
          <div className="flex items-start gap-2">
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-red-600" />
            <div className="flex-1">
              <p className="font-bold">{errorMessage}</p>
            </div>
          </div>

          {/* Quick Action Triggers for Already Registered Email */}
          {errorCode === 'auth/email-already-in-use' && (
            <div className="pt-2 border-t border-red-200/60 flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={() => handleModeChange('login')}
                className="px-3 py-1.5 rounded-lg bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-bold text-[11px] transition-colors shadow-2xs"
              >
                Log In with this Email →
              </button>
              <button
                type="button"
                onClick={() => handleModeChange('forgot')}
                className="px-3 py-1.5 rounded-lg bg-white border border-red-300 text-red-700 hover:bg-red-100/60 font-semibold text-[11px] transition-colors"
              >
                Reset Password
              </button>
            </div>
          )}

          {/* Quick Action Triggers for User Not Found */}
          {errorCode === 'auth/user-not-found' && (
            <div className="pt-2 border-t border-red-200/60 flex items-center gap-2">
              <button
                type="button"
                onClick={() => handleModeChange('register')}
                className="px-3 py-1.5 rounded-lg bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-bold text-[11px] transition-colors shadow-2xs"
              >
                Create Account for {email} →
              </button>
            </div>
          )}

          {/* Quick Action Triggers for Google Popup Blocked/Closed */}
          {(errorCode === 'auth/popup-blocked' || errorCode === 'auth/popup-closed-by-user') && (
            <div className="pt-2 border-t border-red-200/60 flex items-center gap-2">
              <button
                type="button"
                onClick={() => { loginWithGoogleRedirect(); }}
                className="px-3.5 py-1.5 rounded-lg bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-bold text-[11px] transition-colors shadow-2xs flex items-center gap-1.5"
              >
                <span>Continue with Google via Redirect →</span>
              </button>
            </div>
          )}
        </div>
      )}

      {successMessage && (
        <div className="p-3 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-start gap-2 animate-in fade-in">
          <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5 text-emerald-600" />
          <div className="flex-1">
            <p className="font-semibold">{successMessage}</p>
          </div>
        </div>
      )}

      {/* Reset Sent Confirmation View */}
      {mode === 'sent-reset' ? (
        <div className="space-y-4 text-center py-4">
          <div className="w-12 h-12 rounded-full bg-blue-50 text-[#2563EB] mx-auto flex items-center justify-center border border-blue-100">
            <Mail className="w-6 h-6 animate-pulse" />
          </div>

          <div className="space-y-1">
            <h3 className="font-bold text-base text-[#0F2942]">Password Reset Email Sent</h3>
            <p className="text-xs text-slate-600">
              Check your inbox for instructions to reset your password for <strong className="text-slate-800">{email}</strong>.
            </p>
          </div>

          <div className="pt-2 space-y-2">
            <button
              type="button"
              onClick={handleSubmit}
              disabled={isAuthLoading}
              className="w-full py-2.5 rounded-lg border border-slate-300 bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold transition-all flex items-center justify-center gap-2"
            >
              {isAuthLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <RefreshCw className="w-3.5 h-3.5" />}
              <span>Resend Reset Link</span>
            </button>

            <button
              type="button"
              onClick={() => handleModeChange('login')}
              className="w-full py-2.5 rounded-lg bg-[#0F2942] hover:bg-[#1D4ED8] text-white text-xs font-bold transition-colors"
            >
              Return to Login
            </button>
          </div>
        </div>
      ) : (
        /* Main Form */
        <form onSubmit={handleSubmit} className="space-y-3.5">
          
          {/* Name for Register */}
          {mode === 'register' && (
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Full Name
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type="text"
                  required
                  placeholder="e.g. Alex Vance"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  disabled={isAuthLoading}
                  className="w-full pl-9 pr-4 py-2.5 text-xs rounded-lg border border-slate-300 bg-white focus:outline-none focus:border-[#2563EB] disabled:bg-slate-50"
                />
              </div>
            </div>
          )}

          {/* Email */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Email Address
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type="email"
                required
                placeholder="student@university.edu"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isAuthLoading}
                className="w-full pl-9 pr-4 py-2.5 text-xs rounded-lg border border-slate-300 bg-white focus:outline-none focus:border-[#2563EB] disabled:bg-slate-50"
              />
            </div>
          </div>

          {/* Password */}
          {(mode === 'login' || mode === 'register') && (
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-xs font-semibold text-slate-700">Password</label>
                {mode === 'login' && (
                  <button
                    type="button"
                    onClick={() => handleModeChange('forgot')}
                    className="text-[11px] font-semibold text-[#2563EB] hover:underline"
                  >
                    Forgot Password?
                  </button>
                )}
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  placeholder="••••••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={isAuthLoading}
                  className="w-full pl-9 pr-10 py-2.5 text-xs rounded-lg border border-slate-300 bg-white font-mono focus:outline-none focus:border-[#2563EB] disabled:bg-slate-50"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-slate-400 hover:text-slate-600"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {mode === 'register' && (
                <p className="text-[10px] text-slate-400 mt-1">Must be at least 6 characters</p>
              )}
            </div>
          )}

          {/* Remember Me */}
          {mode === 'login' && (
            <div className="flex items-center justify-between text-xs text-slate-600">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="rounded border-slate-300 text-[#2563EB]"
                />
                Remember Me
              </label>
            </div>
          )}

          {/* Primary Submit Button */}
          <button
            type="submit"
            disabled={isAuthLoading}
            className="w-full py-2.5 rounded-lg bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs font-semibold shadow-xs transition-all flex items-center justify-center gap-2 disabled:opacity-60 cursor-pointer"
          >
            {isAuthLoading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Processing...</span>
              </>
            ) : (
              <>
                <span>
                  {mode === 'login' && 'Sign In'}
                  {mode === 'register' && 'Create Account'}
                  {mode === 'forgot' && 'Send Reset Link'}
                </span>
                <ArrowRight className="w-3.5 h-3.5" />
              </>
            )}
          </button>

        </form>
      )}

      {/* Divider & Google SSO */}
      {(mode === 'login' || mode === 'register') && (
        <div className="space-y-3 pt-2">
          <div className="relative">
            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-slate-200" /></div>
            <div className="relative text-[10px] text-slate-400 uppercase tracking-wider bg-white px-2 text-center inline-block w-full">
              Or
            </div>
          </div>

          <button
            type="button"
            onClick={handleGoogleSignIn}
            disabled={isAuthLoading}
            className="w-full py-2.5 px-3 rounded-lg border border-slate-300 bg-white hover:bg-slate-50 text-xs font-semibold text-slate-700 transition-all flex items-center justify-center gap-2 disabled:opacity-60 cursor-pointer"
          >
            {isAuthLoading ? (
              <Loader2 className="w-4 h-4 animate-spin text-slate-400" />
            ) : (
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
              </svg>
            )}
            <span>Continue with Google</span>
          </button>
        </div>
      )}

      {/* Switch Mode Link */}
      <div className="text-center text-xs text-slate-500 pt-2 border-t border-slate-100">
        {mode === 'login' && (
          <span>
            Don't have an account?{' '}
            <button onClick={() => handleModeChange('register')} className="text-[#2563EB] font-bold hover:underline">
              Sign Up
            </button>
          </span>
        )}
        {mode === 'register' && (
          <span>
            Already have an account?{' '}
            <button onClick={() => handleModeChange('login')} className="text-[#2563EB] font-bold hover:underline">
              Sign In
            </button>
          </span>
        )}
        {(mode === 'forgot' || mode === 'sent-reset') && (
          <button onClick={() => handleModeChange('login')} className="text-[#2563EB] font-bold hover:underline">
            ← Back to Sign In
          </button>
        )}
      </div>

      {/* Quick Demo Autofill */}
      <div className="pt-2">
        <div className="flex items-center justify-between text-[10px] text-slate-400 font-bold uppercase mb-1">
          <span>Autofill Demo Account:</span>
        </div>
        <div className="grid grid-cols-3 gap-1">
          <button onClick={() => handleAutofillDemo('student')} disabled={isAuthLoading} className="p-1.5 rounded bg-slate-100 text-[10px] font-semibold text-slate-600 hover:bg-slate-200">Student</button>
          <button onClick={() => handleAutofillDemo('teacher')} disabled={isAuthLoading} className="p-1.5 rounded bg-slate-100 text-[10px] font-semibold text-slate-600 hover:bg-slate-200">Teacher</button>
          <button onClick={() => handleAutofillDemo('admin')} disabled={isAuthLoading} className="p-1.5 rounded bg-slate-100 text-[10px] font-semibold text-slate-600 hover:bg-slate-200">Admin</button>
        </div>
      </div>

    </div>
  );
};
