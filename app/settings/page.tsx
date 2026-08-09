'use client';

import React, { useState } from 'react';
import { 
  User, 
  Lock, 
  Bell, 
  ShieldCheck, 
  Sun, 
  Moon, 
  Globe, 
  LogOut, 
  Trash2, 
  CheckCircle2, 
  Camera, 
  Smartphone, 
  Sliders
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { ProtectedRoute } from '../../components/auth/ProtectedRoute';

function SettingsContent() {
  const { user, showToast, logout, darkMode, toggleDarkMode } = useApp();
  const [activeTab, setActiveTab] = useState<'account' | 'appearance' | 'notifications' | 'privacy' | 'preferences' | 'danger'>('account');

  // Account State
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [phone, setPhone] = useState('+1 (555) 234-5678');
  const [avatar, setAvatar] = useState(user.avatar || '');

  // Passwords
  const [currentPass, setCurrentPass] = useState('');
  const [newPass, setNewPass] = useState('');

  // Notifications
  const [emailNotif, setEmailNotif] = useState(true);
  const [bookingNotif, setBookingNotif] = useState(true);
  const [teacherNotif, setTeacherNotif] = useState(true);
  const [expNotif, setExpNotif] = useState(true);

  // Preferences
  const [language, setLanguage] = useState('English (US)');
  const [fontSize, setFontSize] = useState('Medium');

  const handleSaveAccount = (e: React.FormEvent) => {
    e.preventDefault();
    showToast('Account details updated successfully!', 'success');
  };

  const handleChangePassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentPass || !newPass) {
      showToast('Please enter both current and new password', 'error');
      return;
    }
    showToast('Password security credentials updated!', 'success');
    setCurrentPass('');
    setNewPass('');
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0F2942] tracking-tight">
          System & Account Settings
        </h1>
        <p className="text-xs text-slate-600 mt-1">
          Manage your personal identity, theme preferences, notifications, security settings, and account options.
        </p>
      </div>

      {/* Settings Multi-Tab Bar */}
      <div className="flex items-center gap-2 border-b border-slate-200 overflow-x-auto pb-2">
        {[
          { id: 'account', label: 'Account', icon: User },
          { id: 'appearance', label: 'Appearance', icon: Sun },
          { id: 'notifications', label: 'Notifications', icon: Bell },
          { id: 'privacy', label: 'Privacy & Security', icon: ShieldCheck },
          { id: 'preferences', label: 'Preferences', icon: Sliders },
          { id: 'danger', label: 'Account Management', icon: Trash2 },
        ].map((tab) => {
          const IconComp = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-2 ${
                activeTab === tab.id
                  ? 'bg-[#0F2942] text-white shadow-2xs'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <IconComp className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* 1. ACCOUNT TAB */}
      {activeTab === 'account' && (
        <div className="space-y-6 animate-in fade-in duration-150">
          <div className="academic-card p-6 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
              <img
                src={avatar || user.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80'}
                alt={user.name}
                className="w-20 h-20 rounded-2xl object-cover ring-2 ring-slate-200 shadow-2xs"
              />
              <div>
                <h3 className="font-bold text-base text-[#0F2942]">{user.name}</h3>
                <p className="text-xs text-slate-500 font-mono">{user.email}</p>
                <span className="inline-block mt-1.5 text-[10px] font-extrabold uppercase bg-blue-50 text-[#2563EB] px-2.5 py-0.5 rounded-full border border-blue-100">
                  {user.role} Role
                </span>
              </div>
            </div>

            <button
              onClick={() => showToast('Avatar selection updated', 'info')}
              className="px-4 py-2 rounded-xl bg-white border border-slate-300 text-xs font-semibold text-slate-700 hover:bg-slate-50 shadow-2xs flex items-center gap-2"
            >
              <Camera className="w-4 h-4 text-slate-400" />
              <span>Change Photo</span>
            </button>
          </div>

          <div className="academic-card p-6 space-y-4">
            <h3 className="font-bold text-sm text-[#0F2942]">Edit Account Details</h3>
            <form onSubmit={handleSaveAccount} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Full Name</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:border-[#2563EB]"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Email Address</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:border-[#2563EB]"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Phone Contact</label>
                <div className="relative">
                  <Smartphone className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                  <input
                    type="text"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:border-[#2563EB]"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="px-4 py-2 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs font-bold shadow-2xs"
              >
                Save Account Changes
              </button>
            </form>
          </div>
        </div>
      )}

      {/* 2. APPEARANCE TAB */}
      {activeTab === 'appearance' && (
        <div className="academic-card p-6 space-y-5 animate-in fade-in duration-150 max-w-xl">
          <h3 className="font-bold text-sm text-[#0F2942]">Visual Theme & Display</h3>
          
          <div className="space-y-4 text-xs">
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 flex items-center justify-between">
              <div>
                <div className="font-bold text-[#0F2942] flex items-center gap-2">
                  {darkMode ? <Moon className="w-4 h-4 text-indigo-600" /> : <Sun className="w-4 h-4 text-amber-500" />}
                  <span>{darkMode ? 'Dark Navy Mode' : 'Light Clean Mode'}</span>
                </div>
                <p className="text-slate-500 text-[11px] mt-0.5">Toggle interface contrast mode</p>
              </div>

              <button
                onClick={toggleDarkMode}
                className="px-4 py-2 rounded-xl bg-[#0F2942] text-white font-bold hover:bg-[#1D4ED8] transition-all"
              >
                Switch to {darkMode ? 'Light' : 'Dark'}
              </button>
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Editor Font Size</label>
              <select
                value={fontSize}
                onChange={(e) => setFontSize(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-slate-300 bg-white font-semibold"
              >
                <option value="Small">Small (13px)</option>
                <option value="Medium">Medium (14px)</option>
                <option value="Large">Large (16px)</option>
              </select>
            </div>
          </div>
        </div>
      )}

      {/* 3. NOTIFICATIONS TAB */}
      {activeTab === 'notifications' && (
        <div className="academic-card p-6 space-y-4 animate-in fade-in duration-150 max-w-xl">
          <h3 className="font-bold text-sm text-[#0F2942]">Notification Preferences</h3>
          
          <div className="space-y-3 divide-y divide-slate-100 text-xs">
            <div className="flex items-center justify-between pt-2">
              <div>
                <div className="font-bold text-slate-800">Email Notifications</div>
                <div className="text-[11px] text-slate-500">Receive lab completions & quiz summaries by email</div>
              </div>
              <input type="checkbox" checked={emailNotif} onChange={(e) => setEmailNotif(e.target.checked)} className="rounded text-[#2563EB]" />
            </div>

            <div className="flex items-center justify-between pt-3">
              <div>
                <div className="font-bold text-slate-800">Consultation Alerts</div>
                <div className="text-[11px] text-slate-500">15 minute session reminders</div>
              </div>
              <input type="checkbox" checked={bookingNotif} onChange={(e) => setBookingNotif(e.target.checked)} className="rounded text-[#2563EB]" />
            </div>

            <div className="flex items-center justify-between pt-3">
              <div>
                <div className="font-bold text-slate-800">Teacher Messages</div>
                <div className="text-[11px] text-slate-500">Alerts when teachers grade your lab reports</div>
              </div>
              <input type="checkbox" checked={teacherNotif} onChange={(e) => setTeacherNotif(e.target.checked)} className="rounded text-[#2563EB]" />
            </div>

            <div className="flex items-center justify-between pt-3">
              <div>
                <div className="font-bold text-slate-800">New Experiment Announcements</div>
                <div className="text-[11px] text-slate-500">Updates when new virtual labs are released</div>
              </div>
              <input type="checkbox" checked={expNotif} onChange={(e) => setExpNotif(e.target.checked)} className="rounded text-[#2563EB]" />
            </div>
          </div>
        </div>
      )}

      {/* 4. PRIVACY & SECURITY TAB */}
      {activeTab === 'privacy' && (
        <div className="space-y-6 animate-in fade-in duration-150 max-w-xl">
          <div className="academic-card p-6 space-y-4">
            <h3 className="font-bold text-sm text-[#0F2942] flex items-center gap-2">
              <Lock className="w-4 h-4 text-[#2563EB]" />
              Update Account Password
            </h3>

            <form onSubmit={handleChangePassword} className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Current Password</label>
                <input
                  type="password"
                  value={currentPass}
                  onChange={(e) => setCurrentPass(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 font-mono"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">New Password</label>
                <input
                  type="password"
                  value={newPass}
                  onChange={(e) => setNewPass(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 font-mono"
                />
              </div>

              <button
                type="submit"
                className="px-4 py-2 rounded-xl bg-[#0F2942] text-white font-bold"
              >
                Update Security Credentials
              </button>
            </form>
          </div>

          <div className="academic-card p-6 space-y-3">
            <h3 className="font-bold text-sm text-[#0F2942]">Active Sessions</h3>
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs flex items-center justify-between">
              <div>
                <div className="font-bold text-slate-800">Current Web Session (Windows Chrome)</div>
                <div className="text-[11px] text-slate-400 font-mono">Last active: Just now</div>
              </div>
              <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 font-bold rounded text-[10px]">Active</span>
            </div>
          </div>
        </div>
      )}

      {/* 5. PREFERENCES TAB */}
      {activeTab === 'preferences' && (
        <div className="academic-card p-6 space-y-4 animate-in fade-in duration-150 max-w-xl">
          <h3 className="font-bold text-sm text-[#0F2942] flex items-center gap-2">
            <Globe className="w-4 h-4 text-[#2563EB]" />
            Language & Regional Settings
          </h3>

          <div className="space-y-3 text-xs">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Platform Language</label>
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-slate-300 bg-white font-semibold"
              >
                <option value="English (US)">English (US)</option>
                <option value="Spanish">Spanish (Español)</option>
                <option value="French">French (Français)</option>
                <option value="German">German (Deutsch)</option>
              </select>
            </div>
          </div>
        </div>
      )}

      {/* 6. ACCOUNT MANAGEMENT (DANGER ZONE) TAB */}
      {activeTab === 'danger' && (
        <div className="academic-card p-6 space-y-6 animate-in fade-in duration-150 max-w-xl border-red-200">
          <div className="space-y-2 border-b border-slate-100 pb-4">
            <h3 className="font-bold text-sm text-red-600 flex items-center gap-2">
              <Trash2 className="w-4 h-4" />
              Danger Zone & Account Actions
            </h3>
            <p className="text-xs text-slate-500">Sign out or request permanent removal of your account data.</p>
          </div>

          <div className="space-y-4 text-xs">
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 flex items-center justify-between">
              <div>
                <div className="font-bold text-slate-800">Sign Out of Session</div>
                <div className="text-[11px] text-slate-500">Safely log out of AI Lab Simulator on this device</div>
              </div>
              <button
                onClick={logout}
                className="px-4 py-2 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-800 font-bold flex items-center gap-1.5"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Sign Out</span>
              </button>
            </div>

            <div className="p-4 bg-red-50 rounded-2xl border border-red-200 flex items-center justify-between text-red-900">
              <div>
                <div className="font-bold">Delete Account & Data</div>
                <div className="text-[11px] text-red-700">Permanently delete your profile and completed lab history</div>
              </div>
              <button
                onClick={() => showToast('Account deletion request queued', 'info')}
                className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold shadow-2xs"
              >
                Delete Account
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

export default function SettingsPage() {
  return (
    <ProtectedRoute>
      <SettingsContent />
    </ProtectedRoute>
  );
}
