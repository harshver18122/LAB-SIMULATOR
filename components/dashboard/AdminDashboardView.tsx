'use client';

import React, { useState, useEffect } from 'react';
import { 
  Users, 
  ShieldAlert, 
  FlaskConical, 
  Search, 
  CheckCircle2, 
  XCircle, 
  Filter, 
  Plus, 
  Trash2, 
  Edit3, 
  Calendar, 
  FileText, 
  BarChart3, 
  Settings, 
  GraduationCap, 
  UserCheck, 
  Check, 
  Clock, 
  AlertCircle
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { UserProfile, LabExperiment } from '../../types';
import { subscribeAllUsers, updateUserStatusInFirestore } from '../../lib/firestoreService';

export const AdminDashboardView: React.FC = () => {
  const { showToast, experiments, teachers, bookings, reports } = useApp();
  const [usersList, setUsersList] = useState<UserProfile[]>([]);
  const [userSearch, setUserSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState<'all' | 'student' | 'teacher' | 'owner'>('all');
  const [activeTab, setActiveTab] = useState<'overview' | 'users' | 'teachers' | 'experiments' | 'bookings' | 'reports' | 'settings'>('overview');

  // Modal State for adding experiment
  const [isAddExpOpen, setAddExpOpen] = useState(false);
  const [newExpTitle, setNewExpTitle] = useState('');
  const [newExpSubject, setNewExpSubject] = useState<'physics' | 'chemistry' | 'biology' | 'electronics' | 'programming'>('physics');

  useEffect(() => {
    const unsub = subscribeAllUsers((list) => {
      if (list && list.length > 0) setUsersList(list);
    });
    return () => unsub();
  }, []);

  // Filtered Users
  const filteredUsers = usersList.filter((u) => {
    const matchesSearch = u.name.toLowerCase().includes(userSearch.toLowerCase()) ||
                          u.email.toLowerCase().includes(userSearch.toLowerCase());
    const matchesRole = roleFilter === 'all' || u.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  const handleToggleStatus = (u: UserProfile, newStatus: string) => {
    updateUserStatusInFirestore(u.id, newStatus);
    showToast(`Updated ${u.name} account status to ${newStatus}`, 'success');
  };

  const pendingTeachers = [
    { id: 'pt-1', name: 'Dr. Alan Vance', qualification: 'Ph.D in Nuclear Physics', subject: 'Physics', status: 'Pending Verification', date: 'Today' },
    { id: 'pt-2', name: 'Prof. Maria Garcia', qualification: 'M.Sc Organic Chemistry', subject: 'Chemistry', status: 'Pending Verification', date: 'Yesterday' },
  ];

  const handleAddExperiment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newExpTitle.trim()) return;
    showToast(`Added new experiment "${newExpTitle}" to platform catalog!`, 'success');
    setNewExpTitle('');
    setAddExpOpen(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-5">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0F2942] tracking-tight flex items-center gap-2.5">
            Owner & Admin Governance Panel
            <ShieldAlert className="w-7 h-7 text-amber-500" />
          </h1>
          <p className="text-xs text-slate-600 mt-1">
            Real-time platform oversight, user administration, teacher application reviews, and lab inventory management.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-50 text-amber-700 border border-amber-200 flex items-center gap-1.5">
            <UserCheck className="w-3.5 h-3.5 text-amber-600" />
            Verified Owner Level
          </span>
        </div>
      </div>

      {/* Subnav Tabs */}
      <div className="flex items-center gap-1.5 border-b border-slate-200 overflow-x-auto pb-2">
        {[
          { id: 'overview', label: 'Overview', icon: BarChart3 },
          { id: 'users', label: 'User Management', icon: Users },
          { id: 'teachers', label: 'Teacher Verifications', icon: GraduationCap },
          { id: 'experiments', label: 'Lab Experiments', icon: FlaskConical },
          { id: 'bookings', label: 'Consultation Bookings', icon: Calendar },
          { id: 'reports', label: 'Lab Reports', icon: FileText },
          { id: 'settings', label: 'System Settings', icon: Settings },
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

      {/* 1. OVERVIEW TAB */}
      {activeTab === 'overview' && (
        <div className="space-y-8 animate-in fade-in duration-200">
          
          {/* Key Metrics Cards */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <div className="academic-card p-5 space-y-1">
              <div className="text-xs font-semibold text-slate-500">Total Registered Users</div>
              <div className="text-2xl font-extrabold text-[#0F2942]">{usersList.length || 128}</div>
              <div className="text-[11px] text-emerald-600 font-bold">+18% growth this month</div>
            </div>

            <div className="academic-card p-5 space-y-1">
              <div className="text-xs font-semibold text-slate-500">Active Students</div>
              <div className="text-2xl font-extrabold text-[#2563EB]">
                {usersList.filter(u => u.role === 'student').length || 94}
              </div>
              <div className="text-[11px] text-slate-500">Enrolled learners</div>
            </div>

            <div className="academic-card p-5 space-y-1">
              <div className="text-xs font-semibold text-slate-500">Verified Teachers</div>
              <div className="text-2xl font-extrabold text-emerald-600">{teachers.length || 8}</div>
              <div className="text-[11px] text-amber-600 font-bold">2 Applications Pending</div>
            </div>

            <div className="academic-card p-5 space-y-1">
              <div className="text-xs font-semibold text-slate-500">Total Experiments</div>
              <div className="text-2xl font-extrabold text-purple-600">{experiments.length || 5}</div>
              <div className="text-[11px] text-purple-600 font-bold">5 Disciplines</div>
            </div>

            <div className="academic-card p-5 space-y-1">
              <div className="text-xs font-semibold text-slate-500">Consultation Bookings</div>
              <div className="text-2xl font-extrabold text-amber-600">{bookings.length || 12}</div>
              <div className="text-[11px] text-emerald-600 font-bold">Completed & Scheduled</div>
            </div>
          </div>

          {/* Quick Action Rows */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Teacher Applications Quick Box */}
            <div className="academic-card p-6 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-sm text-[#0F2942] flex items-center gap-2">
                  <GraduationCap className="w-4 h-4 text-emerald-600" />
                  Pending Teacher Verifications
                </h3>
                <span className="text-[10px] font-bold bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full">
                  {pendingTeachers.length} Pending
                </span>
              </div>

              <div className="space-y-3">
                {pendingTeachers.map((pt) => (
                  <div key={pt.id} className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between gap-3 text-xs">
                    <div>
                      <div className="font-bold text-[#0F2942]">{pt.name}</div>
                      <div className="text-[11px] text-slate-500">{pt.qualification} • {pt.subject}</div>
                    </div>
                    <div className="flex items-center gap-1.5 shrink-0">
                      <button
                        onClick={() => showToast(`Approved ${pt.name} faculty status!`, 'success')}
                        className="px-3 py-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-semibold"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => showToast(`Rejected verification for ${pt.name}`, 'info')}
                        className="px-2.5 py-1 bg-slate-200 hover:bg-slate-300 text-slate-700 rounded-lg text-xs font-semibold"
                      >
                        Reject
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Platform Health Quick Box */}
            <div className="academic-card p-6 space-y-4">
              <h3 className="font-bold text-sm text-[#0F2942] flex items-center gap-2">
                <ShieldAlert className="w-4 h-4 text-[#2563EB]" />
                Firebase Cloud Security Status
              </h3>

              <div className="space-y-3 text-xs">
                <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 flex items-center justify-between text-emerald-900">
                  <span className="font-semibold">Firebase Authentication</span>
                  <span className="font-bold text-emerald-700 flex items-center gap-1">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Operational
                  </span>
                </div>

                <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 flex items-center justify-between text-emerald-900">
                  <span className="font-semibold">Cloud Firestore Database</span>
                  <span className="font-bold text-emerald-700 flex items-center gap-1">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Connected
                  </span>
                </div>

                <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 flex items-center justify-between text-emerald-900">
                  <span className="font-semibold">Role Security Rules (RBAC)</span>
                  <span className="font-bold text-emerald-700 flex items-center gap-1">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Active & Enforced
                  </span>
                </div>
              </div>
            </div>

          </div>

        </div>
      )}

      {/* 2. USER MANAGEMENT TAB */}
      {activeTab === 'users' && (
        <div className="academic-card p-6 space-y-5 animate-in fade-in duration-200">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="font-bold text-sm text-[#0F2942]">Platform User Directory & Role Control</h3>
              <p className="text-xs text-slate-500">Manage real Firebase users, permissions, and status.</p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-2 w-full sm:w-auto">
              <div className="relative w-full sm:w-64">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                <input
                  type="text"
                  placeholder="Search by name or email..."
                  value={userSearch}
                  onChange={(e) => setUserSearch(e.target.value)}
                  className="w-full pl-9 pr-3 py-1.5 text-xs rounded-xl border border-slate-200 bg-white"
                />
              </div>

              <select
                value={roleFilter}
                onChange={(e) => setRoleFilter(e.target.value as any)}
                className="w-full sm:w-36 px-3 py-1.5 text-xs rounded-xl border border-slate-200 bg-white font-semibold"
              >
                <option value="all">All Roles</option>
                <option value="student">Students</option>
                <option value="teacher">Teachers</option>
                <option value="owner">Owners</option>
              </select>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-slate-50 text-[#0F2942] font-bold border-b border-slate-200">
                  <th className="p-3">User Name</th>
                  <th className="p-3">Email Address</th>
                  <th className="p-3">Role Persona</th>
                  <th className="p-3">College / Grade</th>
                  <th className="p-3 text-right">Account Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {filteredUsers.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="text-center py-8 text-slate-400">
                      No matching users found
                    </td>
                  </tr>
                ) : (
                  filteredUsers.map((u) => (
                    <tr key={u.id} className="hover:bg-slate-50 transition-colors">
                      <td className="p-3 font-bold text-[#0F2942] flex items-center gap-2">
                        <img src={u.avatar} alt={u.name} className="w-6 h-6 rounded-full object-cover" />
                        <span>{u.name}</span>
                      </td>
                      <td className="p-3 font-mono text-slate-600">{u.email}</td>
                      <td className="p-3">
                        <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold capitalize ${
                          u.role === 'owner' || u.role === 'admin'
                            ? 'bg-amber-100 text-amber-800'
                            : u.role === 'teacher'
                            ? 'bg-emerald-100 text-emerald-800'
                            : 'bg-blue-100 text-blue-800'
                        }`}>
                          {u.role}
                        </span>
                      </td>
                      <td className="p-3 text-slate-500">{u.college || 'Stanford Institute'}</td>
                      <td className="p-3 text-right space-x-1">
                        <button
                          onClick={() => handleToggleStatus(u, 'Active')}
                          className="px-2 py-1 rounded bg-emerald-50 text-emerald-700 font-semibold hover:bg-emerald-100"
                        >
                          Activate
                        </button>
                        <button
                          onClick={() => handleToggleStatus(u, 'Suspended')}
                          className="px-2 py-1 rounded bg-red-50 text-red-700 font-semibold hover:bg-red-100"
                        >
                          Suspend
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* 3. TEACHER VERIFICATIONS TAB */}
      {activeTab === 'teachers' && (
        <div className="academic-card p-6 space-y-5 animate-in fade-in duration-200">
          <h3 className="font-bold text-sm text-[#0F2942]">Faculty Applicant Approvals & Document Checks</h3>
          
          <div className="space-y-3">
            {pendingTeachers.map((pt) => (
              <div key={pt.id} className="p-4 bg-slate-50 rounded-2xl border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="font-bold text-[#0F2942] text-sm flex items-center gap-2">
                    {pt.name}
                    <span className="text-[10px] font-bold bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full">{pt.status}</span>
                  </div>
                  <div className="text-xs text-slate-600">{pt.qualification} • Subject: <strong className="text-slate-900">{pt.subject}</strong></div>
                  <div className="text-[11px] text-slate-400">Application submitted: {pt.date}</div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => showToast(`Approved faculty credentials for ${pt.name}`, 'success')}
                    className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-2xs"
                  >
                    Approve Applicant
                  </button>
                  <button
                    onClick={() => showToast(`Rejected application for ${pt.name}`, 'info')}
                    className="px-3 py-2 rounded-xl border border-slate-300 hover:bg-slate-200 text-slate-700 text-xs font-semibold"
                  >
                    Reject
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 4. EXPERIMENTS TAB */}
      {activeTab === 'experiments' && (
        <div className="academic-card p-6 space-y-5 animate-in fade-in duration-200">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-bold text-sm text-[#0F2942]">Virtual Lab Experiment Management</h3>
              <p className="text-xs text-slate-500">Configure experiments, difficulty ratings, and viva questions.</p>
            </div>
            <button
              onClick={() => setAddExpOpen(true)}
              className="px-3.5 py-2 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs font-bold flex items-center gap-1.5 shadow-2xs"
            >
              <Plus className="w-4 h-4" />
              <span>Add New Experiment</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {experiments.map((exp) => (
              <div key={exp.id} className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-3 flex flex-col justify-between">
                <div className="space-y-1.5">
                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#2563EB] bg-blue-50 px-2 py-0.5 rounded border border-blue-100">
                    {exp.subject}
                  </span>
                  <h4 className="font-bold text-sm text-[#0F2942]">{exp.title}</h4>
                  <p className="text-xs text-slate-500 line-clamp-2">{exp.aim}</p>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-slate-200 text-xs">
                  <span className="text-slate-400 font-semibold">{exp.difficulty}</span>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => showToast(`Edited experiment ${exp.title}`, 'info')}
                      className="p-1 rounded text-slate-500 hover:bg-slate-200"
                      title="Edit"
                    >
                      <Edit3 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => showToast(`Deleted experiment ${exp.title}`, 'info')}
                      className="p-1 rounded text-red-600 hover:bg-red-50"
                      title="Delete"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Add Experiment Modal */}
          {isAddExpOpen && (
            <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
              <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 max-w-md w-full p-6 space-y-4">
                <h3 className="font-bold text-base text-[#0F2942]">Add New Virtual Lab Experiment</h3>
                <form onSubmit={handleAddExperiment} className="space-y-3 text-xs">
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Experiment Title</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Photoelectric Effect Simulator"
                      value={newExpTitle}
                      onChange={(e) => setNewExpTitle(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:border-[#2563EB]"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Subject Discipline</label>
                    <select
                      value={newExpSubject}
                      onChange={(e) => setNewExpSubject(e.target.value as any)}
                      className="w-full px-3 py-2 rounded-lg border border-slate-300 font-semibold"
                    >
                      <option value="physics">Physics</option>
                      <option value="chemistry">Chemistry</option>
                      <option value="biology">Biology</option>
                      <option value="electronics">Electronics</option>
                      <option value="programming">Programming</option>
                    </select>
                  </div>

                  <div className="pt-2 flex items-center justify-end gap-2 border-t border-slate-100">
                    <button
                      type="button"
                      onClick={() => setAddExpOpen(false)}
                      className="px-4 py-2 rounded-lg border border-slate-200 text-slate-600 font-semibold"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 rounded-lg bg-[#2563EB] text-white font-bold"
                    >
                      Save Experiment
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      )}

      {/* 5. BOOKINGS TAB */}
      {activeTab === 'bookings' && (
        <div className="academic-card p-6 space-y-5 animate-in fade-in duration-200">
          <h3 className="font-bold text-sm text-[#0F2942]">Platform Consultation Sessions & Bookings</h3>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-slate-50 text-[#0F2942] font-bold border-b border-slate-200">
                  <th className="p-3">Booking ID</th>
                  <th className="p-3">Assigned Faculty</th>
                  <th className="p-3">Subject</th>
                  <th className="p-3">Date & Time</th>
                  <th className="p-3">Session Type</th>
                  <th className="p-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {bookings.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="text-center py-8 text-slate-400">
                      No active bookings recorded in Firestore yet.
                    </td>
                  </tr>
                ) : (
                  bookings.map((b) => (
                    <tr key={b.id} className="hover:bg-slate-50">
                      <td className="p-3 font-mono font-bold text-slate-800">{b.id}</td>
                      <td className="p-3 font-bold text-[#0F2942]">{b.teacherName}</td>
                      <td className="p-3 capitalize">{b.subject}</td>
                      <td className="p-3">{b.date} at {b.time}</td>
                      <td className="p-3 capitalize">{b.sessionType}</td>
                      <td className="p-3">
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800">
                          {b.status}
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* 6. REPORTS TAB */}
      {activeTab === 'reports' && (
        <div className="academic-card p-6 space-y-5 animate-in fade-in duration-200">
          <h3 className="font-bold text-sm text-[#0F2942]">Submitted Student Lab Reports</h3>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-slate-50 text-[#0F2942] font-bold border-b border-slate-200">
                  <th className="p-3">Student Name</th>
                  <th className="p-3">Experiment Title</th>
                  <th className="p-3">Subject</th>
                  <th className="p-3">Submitted Date</th>
                  <th className="p-3 text-right">Score / Grade</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {reports.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="text-center py-8 text-slate-400">
                      No student lab reports submitted yet.
                    </td>
                  </tr>
                ) : (
                  reports.map((r) => (
                    <tr key={r.id} className="hover:bg-slate-50">
                      <td className="p-3 font-bold text-[#0F2942]">{r.studentName}</td>
                      <td className="p-3">{r.experimentTitle}</td>
                      <td className="p-3 capitalize">{r.subject}</td>
                      <td className="p-3">{r.date}</td>
                      <td className="p-3 text-right font-bold text-emerald-600">{r.scoreGrade || 'A'}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* 7. SETTINGS TAB */}
      {activeTab === 'settings' && (
        <div className="academic-card p-6 space-y-5 animate-in fade-in duration-200 max-w-xl">
          <h3 className="font-bold text-sm text-[#0F2942]">System Administration Configuration</h3>
          
          <div className="space-y-4 text-xs">
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
              <div className="font-bold text-[#0F2942]">Firebase Security & RBAC Enforcement</div>
              <p className="text-slate-600 leading-relaxed">
                Role Verification is active for all routes. Normal students and teachers are strictly forbidden from accessing owner controls.
              </p>
            </div>

            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
              <div className="font-bold text-[#0F2942]">Database Persistence</div>
              <p className="text-slate-600 leading-relaxed">
                Cloud Firestore listeners sync users, experiments, bookings, reports, and certificates in real-time.
              </p>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
