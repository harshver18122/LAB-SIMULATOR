'use client';

import React, { useState } from 'react';
import { User, Lock, Bell, Shield, Camera, CheckCircle2, GraduationCap, Calendar } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { ProtectedRoute } from '../../components/auth/ProtectedRoute';

export default function SettingsPage() {
  const { user, showToast } = useApp();
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [education, setEducation] = useState(user.college || 'Stanford University, B.Sc Physics');
  const [notifEmail, setNotifEmail] = useState(true);
  const [notifSession, setNotifSession] = useState(true);

  // Password fields
  const [currentPass, setCurrentPass] = useState('');
  const [newPass, setNewPass] = useState('');

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    showToast('Profile information saved successfully!', 'success');
  };

  const handleChangePassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentPass || !newPass) {
      showToast('Please fill out password fields', 'error');
      return;
    }
    showToast('Password updated successfully!', 'success');
    setCurrentPass('');
    setNewPass('');
  };

  return (
    <ProtectedRoute>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
        
        {/* Header */}
        <div>
          <h1 className="text-3xl font-extrabold text-[#0F2942] tracking-tight">
            Profile & Account Settings
          </h1>
          <p className="text-xs text-slate-600 mt-1">
            Manage your personal details, academic credentials, and security options.
          </p>
        </div>

        {/* Profile Overview Card */}
        <div className="academic-card p-6 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
            <div className="relative">
              <img
                src={user.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80'}
                alt={user.name}
                className="w-20 h-20 rounded-xl object-cover border border-slate-200"
              />
              <button className="absolute -bottom-1 -right-1 p-1.5 rounded-full bg-[#2563EB] text-white shadow-xs">
                <Camera className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="space-y-1">
              <h2 className="text-xl font-bold text-[#0F2942]">{user.name}</h2>
              <p className="text-xs text-slate-500 font-mono">{user.email}</p>
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 pt-1 text-xs">
                <span className="px-2.5 py-0.5 rounded bg-blue-50 text-[#2563EB] font-bold uppercase text-[10px]">
                  {user.role} Role
                </span>
                <span className="text-slate-400">•</span>
                <span className="text-slate-600 flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-slate-400" /> Joined Aug 2026
                </span>
              </div>
            </div>
          </div>

          <button
            onClick={() => showToast('Profile edit mode enabled', 'info')}
            className="px-4 py-2 rounded-lg bg-white border border-slate-300 text-xs font-semibold text-[#0F2942] hover:bg-slate-50 transition-colors"
          >
            Edit Profile Photo
          </button>
        </div>

        {/* Edit Profile Form */}
        <div className="academic-card p-6 space-y-4">
          <h3 className="font-bold text-sm text-[#0F2942] flex items-center gap-2">
            <User className="w-4 h-4 text-[#2563EB]" />
            Personal & Academic Details
          </h3>

          <form onSubmit={handleSaveProfile} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Full Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3.5 py-2 text-xs rounded-lg border border-slate-300 bg-white text-slate-900 focus:outline-none focus:border-[#2563EB]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Email Address</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3.5 py-2 text-xs rounded-lg border border-slate-300 bg-white text-slate-900 focus:outline-none focus:border-[#2563EB]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Education / Institution</label>
              <div className="relative">
                <GraduationCap className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                <input
                  type="text"
                  value={education}
                  onChange={(e) => setEducation(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 text-xs rounded-lg border border-slate-300 bg-white text-slate-900 focus:outline-none focus:border-[#2563EB]"
                />
              </div>
            </div>

            <button
              type="submit"
              className="px-4 py-2 rounded-lg bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs font-semibold shadow-xs"
            >
              Save Profile Changes
            </button>
          </form>
        </div>

        {/* Change Password */}
        <div className="academic-card p-6 space-y-4">
          <h3 className="font-bold text-sm text-[#0F2942] flex items-center gap-2">
            <Lock className="w-4 h-4 text-[#2563EB]" />
            Change Password
          </h3>

          <form onSubmit={handleChangePassword} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Current Password</label>
                <input
                  type="password"
                  placeholder="••••••••••••"
                  value={currentPass}
                  onChange={(e) => setCurrentPass(e.target.value)}
                  className="w-full px-3.5 py-2 text-xs rounded-lg border border-slate-300 bg-white text-slate-900 font-mono focus:outline-none focus:border-[#2563EB]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">New Password</label>
                <input
                  type="password"
                  placeholder="••••••••••••"
                  value={newPass}
                  onChange={(e) => setNewPass(e.target.value)}
                  className="w-full px-3.5 py-2 text-xs rounded-lg border border-slate-300 bg-white text-slate-900 font-mono focus:outline-none focus:border-[#2563EB]"
                />
              </div>
            </div>

            <button
              type="submit"
              className="px-4 py-2 rounded-lg bg-[#0F2942] hover:bg-[#153454] text-white text-xs font-semibold shadow-xs"
            >
              Update Security Password
            </button>
          </form>
        </div>

        {/* Notification Settings */}
        <div className="academic-card p-6 space-y-4">
          <h3 className="font-bold text-sm text-[#0F2942] flex items-center gap-2">
            <Bell className="w-4 h-4 text-emerald-600" />
            Notification Preferences
          </h3>

          <div className="space-y-3 divide-y divide-slate-100">
            <div className="flex items-center justify-between pt-2">
              <div>
                <div className="font-bold text-xs text-slate-800">Email Notifications</div>
                <div className="text-[11px] text-slate-500">Receive lab completion summaries and quiz results by email</div>
              </div>
              <input
                type="checkbox"
                checked={notifEmail}
                onChange={(e) => setNotifEmail(e.target.checked)}
                className="rounded border-slate-300 text-[#2563EB]"
              />
            </div>

            <div className="flex items-center justify-between pt-3">
              <div>
                <div className="font-bold text-xs text-slate-800">Consultation Session Alerts</div>
                <div className="text-[11px] text-slate-500">Receive reminder notifications 15 minutes before 1-on-1 calls</div>
              </div>
              <input
                type="checkbox"
                checked={notifSession}
                onChange={(e) => setNotifSession(e.target.checked)}
                className="rounded border-slate-300 text-[#2563EB]"
              />
            </div>
          </div>
        </div>

      </div>
    </ProtectedRoute>
  );
}
