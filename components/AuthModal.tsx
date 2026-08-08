'use client';

import React from 'react';
import { X, FlaskConical } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { EducationalAuthForm } from './auth/EducationalAuthForm';

export const AuthModal: React.FC = () => {
  const { authModal, closeAuthModal, isAuthLoading } = useApp();

  if (!authModal.isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      
      {/* Backdrop click closer */}
      <div className="absolute inset-0" onClick={closeAuthModal} />

      <div className="relative bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-md overflow-hidden z-10 p-6 space-y-4">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-[#0F2942] text-white flex items-center justify-center font-bold">
              <FlaskConical className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-base text-[#0F2942]">
                {authModal.mode === 'login' ? 'Welcome Back' : 'Create Account'}
              </h3>
              <p className="text-[11px] text-slate-500">AI Lab Simulator Academic Portal</p>
            </div>
          </div>

          <button
            onClick={closeAuthModal}
            disabled={isAuthLoading}
            className="text-slate-400 hover:text-slate-600 font-bold p-1"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body Content */}
        <div className="max-h-[80vh] overflow-y-auto pr-1">
          <EducationalAuthForm initialMode={authModal.mode} isModal={true} />
        </div>

      </div>
    </div>
  );
};
