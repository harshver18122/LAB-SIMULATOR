'use client';

import React, { useState } from 'react';
import { 
  User, 
  Mail, 
  Building2, 
  GraduationCap, 
  Award, 
  FlaskConical, 
  Zap, 
  Calendar, 
  Edit3, 
  CheckCircle2, 
  X, 
  ShieldCheck, 
  Save
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { ProtectedRoute } from '../../components/auth/ProtectedRoute';
import { syncUserProfileToFirestore } from '../../lib/firebaseAuth';
import { auth } from '../../lib/firebase';

function ProfileContent() {
  const { user, showToast } = useApp();
  const [isEditModalOpen, setEditModalOpen] = useState(false);

  const [name, setName] = useState(user.name || '');
  const [college, setCollege] = useState(user.college || 'Stanford Institute of Technology');
  const [grade, setGrade] = useState(user.grade || 'Junior Year - Physics Major');
  const [avatar, setAvatar] = useState(user.avatar || '');
  const [isSaving, setIsSaving] = useState(false);

  const isOwner = user.role === 'owner' || user.role === 'admin';

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      if (auth.currentUser) {
        await syncUserProfileToFirestore(auth.currentUser, name);
      }
      showToast('Academic profile updated successfully!', 'success');
      setEditModalOpen(false);
    } catch (err) {
      showToast('Failed to update profile', 'error');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Profile Banner / Header */}
      <div className="bg-gradient-to-r from-[#0F2942] to-[#2563EB] rounded-3xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden">
        <div className="absolute right-0 top-0 w-96 h-96 bg-white/5 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none" />

        <div className="relative z-10 flex flex-col sm:flex-row items-center sm:items-start gap-6 text-center sm:text-left">
          <img
            src={user.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80'}
            alt={user.name}
            className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl object-cover ring-4 ring-white/20 shadow-2xl shrink-0"
          />

          <div className="flex-1 space-y-2">
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
              <span className={`px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider border ${
                isOwner
                  ? 'bg-amber-400/20 text-amber-300 border-amber-400/30'
                  : user.role === 'teacher'
                  ? 'bg-emerald-400/20 text-emerald-300 border-emerald-400/30'
                  : 'bg-white/20 text-white border-white/30'
              }`}>
                {user.role} Persona
              </span>
              <span className="text-[11px] text-blue-200 flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5" /> Member since 2026
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">{user.name}</h1>
            <p className="text-xs text-blue-100 flex items-center justify-center sm:justify-start gap-2">
              <Mail className="w-3.5 h-3.5 opacity-80" />
              <span>{user.email}</span>
            </p>

            <p className="text-xs text-blue-200/90 pt-1">
              {user.college || 'Stanford Institute of Technology'} • {user.grade || 'Physics & CS'}
            </p>
          </div>

          <button
            onClick={() => setEditModalOpen(true)}
            className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white text-xs font-semibold flex items-center gap-2 transition-all shadow-2xs backdrop-blur-xs shrink-0"
          >
            <Edit3 className="w-4 h-4" />
            <span>Edit Profile</span>
          </button>
        </div>
      </div>

      {/* Academic Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="academic-card p-5 space-y-1">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-semibold">Total XP Earned</span>
            <Zap className="w-4 h-4 text-amber-500" />
          </div>
          <div className="text-2xl font-extrabold text-[#0F2942]">{user.xp || 2450} XP</div>
          <div className="text-[11px] text-emerald-600 font-bold">Top 5% Learner</div>
        </div>

        <div className="academic-card p-5 space-y-1">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-semibold">Labs Completed</span>
            <FlaskConical className="w-4 h-4 text-[#2563EB]" />
          </div>
          <div className="text-2xl font-extrabold text-[#2563EB]">{user.completedLabsCount || 14}</div>
          <div className="text-[11px] text-slate-500">Across 4 Subject Fields</div>
        </div>

        <div className="academic-card p-5 space-y-1">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-semibold">Certificates Earned</span>
            <Award className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-2xl font-extrabold text-emerald-600">3</div>
          <div className="text-[11px] text-emerald-600 font-bold">Verified Credentials</div>
        </div>

        <div className="academic-card p-5 space-y-1">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-semibold">Account Status</span>
            <ShieldCheck className="w-4 h-4 text-indigo-600" />
          </div>
          <div className="text-2xl font-extrabold text-indigo-600">Verified</div>
          <div className="text-[11px] text-slate-500">Firestore Authenticated</div>
        </div>
      </div>

      {/* Details Sections */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Left Column: Academic Bio & Info */}
        <div className="md:col-span-2 space-y-6">
          
          <div className="academic-card p-6 space-y-4">
            <h3 className="text-sm font-bold text-[#0F2942] flex items-center gap-2">
              <GraduationCap className="w-4 h-4 text-[#2563EB]" />
              Academic Background
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 space-y-1">
                <span className="text-slate-400 font-semibold block text-[11px]">Institution</span>
                <span className="font-bold text-[#0F2942]">{user.college || 'Stanford Institute of Technology'}</span>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 space-y-1">
                <span className="text-slate-400 font-semibold block text-[11px]">Grade / Level</span>
                <span className="font-bold text-[#0F2942]">{user.grade || 'Junior Year - Physics & CS Major'}</span>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 space-y-1">
                <span className="text-slate-400 font-semibold block text-[11px]">Email Address</span>
                <span className="font-mono text-slate-700">{user.email}</span>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 space-y-1">
                <span className="text-slate-400 font-semibold block text-[11px]">User ID</span>
                <span className="font-mono text-slate-500 text-[10px] truncate block">{user.id}</span>
              </div>
            </div>
          </div>

          <div className="academic-card p-6 space-y-4">
            <h3 className="text-sm font-bold text-[#0F2942] flex items-center gap-2">
              <FlaskConical className="w-4 h-4 text-purple-600" />
              Subject Discipline Focus
            </h3>

            <div className="flex flex-wrap gap-2">
              {['Classical Physics', 'Organic Chemistry', 'Microbiology', 'Circuit Electronics', 'Python Algorithms'].map((subj) => (
                <span key={subj} className="px-3 py-1 rounded-xl bg-blue-50 text-[#2563EB] text-xs font-semibold border border-blue-100">
                  {subj}
                </span>
              ))}
            </div>
          </div>

        </div>

        {/* Right Column: Quick Actions & Status */}
        <div className="space-y-6">
          <div className="academic-card p-6 space-y-4">
            <h3 className="text-sm font-bold text-[#0F2942]">Profile Overview</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Your profile is verified and active on Cloud Firestore. All completed virtual lab reports and earned certificates are tied to this profile identity.
            </p>

            <button
              onClick={() => setEditModalOpen(true)}
              className="w-full py-2.5 rounded-xl bg-[#0F2942] hover:bg-[#1D4ED8] text-white text-xs font-bold transition-all shadow-2xs flex items-center justify-center gap-2"
            >
              <Edit3 className="w-4 h-4" />
              <span>Update Profile Details</span>
            </button>
          </div>
        </div>

      </div>

      {/* Edit Profile Modal */}
      {isEditModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 max-w-md w-full p-6 space-y-5 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="font-bold text-base text-[#0F2942]">Edit Academic Profile</h3>
              <button onClick={() => setEditModalOpen(false)} className="p-1 rounded text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveProfile} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 text-slate-800 focus:outline-none focus:border-[#2563EB]"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">College / Institution</label>
                <input
                  type="text"
                  value={college}
                  onChange={(e) => setCollege(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 text-slate-800 focus:outline-none focus:border-[#2563EB]"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Grade / Academic Specialization</label>
                <input
                  type="text"
                  value={grade}
                  onChange={(e) => setGrade(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 text-slate-800 focus:outline-none focus:border-[#2563EB]"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Profile Avatar URL</label>
                <input
                  type="url"
                  value={avatar}
                  onChange={(e) => setAvatar(e.target.value)}
                  placeholder="https://images.unsplash.com/..."
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 text-slate-800 font-mono text-[11px] focus:outline-none focus:border-[#2563EB]"
                />
              </div>

              <div className="pt-3 flex items-center justify-end gap-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setEditModalOpen(false)}
                  className="px-4 py-2 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSaving}
                  className="px-5 py-2 rounded-lg bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-bold flex items-center gap-1.5 shadow-2xs"
                >
                  <Save className="w-4 h-4" />
                  <span>{isSaving ? 'Saving...' : 'Save Changes'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}

export default function ProfilePage() {
  return (
    <ProtectedRoute>
      <ProfileContent />
    </ProtectedRoute>
  );
}
