'use client';

import React, { useState, useEffect } from 'react';
import { Users, ShieldAlert, DollarSign, FlaskConical, Search, CheckCircle2, XCircle, BarChart3, Filter, Check, Clock } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { UserProfile } from '../../types';
import { subscribeAllUsers, updateUserStatusInFirestore } from '../../lib/firestoreService';

export const AdminDashboardView: React.FC = () => {
  const { showToast } = useApp();
  const [usersList, setUsersList] = useState<UserProfile[]>([]);
  const [userSearch, setUserSearch] = useState('');
  const [activeTab, setActiveTab] = useState<'overview' | 'users' | 'students' | 'teachers' | 'experiments' | 'bookings' | 'reports' | 'analytics' | 'settings'>('overview');

  useEffect(() => {
    const unsub = subscribeAllUsers((list) => {
      if (list && list.length > 0) setUsersList(list);
    });
    return () => unsub();
  }, []);

  const filteredUsers = usersList.filter((u) =>
    u.name.toLowerCase().includes(userSearch.toLowerCase()) ||
    u.email.toLowerCase().includes(userSearch.toLowerCase())
  );

  const handleToggleStatus = (u: UserProfile, newStatus: string) => {
    updateUserStatusInFirestore(u.id, newStatus);
    showToast(`Updated ${u.name} status to ${newStatus}`, 'success');
  };

  const pendingTeachers = [
    { id: 'pt-1', name: 'Dr. Alan Vance', qualification: 'Ph.D in Nuclear Physics', subject: 'Physics', status: 'Pending Verification' },
    { id: 'pt-2', name: 'Prof. Maria Garcia', qualification: 'M.Sc Organic Chemistry', subject: 'Chemistry', status: 'Pending Verification' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Subnav Tabs (Section 16 Requirement) */}
      <div className="flex items-center gap-1.5 border-b border-slate-200 overflow-x-auto pb-2">
        {[
          { id: 'overview', label: 'Overview' },
          { id: 'users', label: 'Users' },
          { id: 'students', label: 'Students' },
          { id: 'teachers', label: 'Teachers' },
          { id: 'experiments', label: 'Experiments' },
          { id: 'bookings', label: 'Bookings' },
          { id: 'reports', label: 'Reports' },
          { id: 'analytics', label: 'Analytics' },
          { id: 'settings', label: 'Settings' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
              activeTab === tab.id ? 'bg-[#0F2942] text-white shadow-xs' : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0F2942] tracking-tight flex items-center gap-2">
            System Administration
            <ShieldAlert className="w-6 h-6 text-amber-500" />
          </h1>
          <p className="text-xs text-slate-600 mt-1">
            Platform governance, user management, teacher verifications, and analytics.
          </p>
        </div>
      </div>

      {/* Analytics Cards (Section 16 Requirement) */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="academic-card p-5 space-y-1">
          <div className="text-xs font-semibold text-slate-500">Total Users</div>
          <div className="text-2xl font-extrabold text-[#0F2942]">{usersList.length || 51240}</div>
          <div className="text-[11px] text-emerald-600 font-bold">+12% growth this week</div>
        </div>

        <div className="academic-card p-5 space-y-1">
          <div className="text-xs font-semibold text-slate-500">Verified Faculty</div>
          <div className="text-2xl font-extrabold text-[#2563EB]">1,240</div>
          <div className="text-[11px] text-amber-600 font-bold">2 Pending Approvals</div>
        </div>

        <div className="academic-card p-5 space-y-1">
          <div className="text-xs font-semibold text-slate-500">Total Revenue Volume</div>
          <div className="text-2xl font-extrabold text-emerald-600">$184,200</div>
          <div className="text-[11px] text-slate-500">Gross platform GMV</div>
        </div>

        <div className="academic-card p-5 space-y-1">
          <div className="text-xs font-semibold text-slate-500">Total Experiments Run</div>
          <div className="text-2xl font-extrabold text-purple-600">342,800</div>
          <div className="text-[11px] text-purple-600 font-bold">99.98% Server Uptime</div>
        </div>
      </div>

      {/* Teacher Verification Table (Section 16 Requirement) */}
      <div className="academic-card p-6 space-y-4">
        <h3 className="font-bold text-sm text-[#0F2942]">Teacher Verification Requests</h3>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-50 text-[#0F2942] font-bold border-b border-slate-200">
                <th className="p-3">Applicant Name</th>
                <th className="p-3">Academic Qualification</th>
                <th className="p-3">Subject Discipline</th>
                <th className="p-3">Status</th>
                <th className="p-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {pendingTeachers.map((pt) => (
                <tr key={pt.id} className="hover:bg-slate-50">
                  <td className="p-3 font-bold text-[#0F2942]">{pt.name}</td>
                  <td className="p-3">{pt.qualification}</td>
                  <td className="p-3 capitalize">{pt.subject}</td>
                  <td className="p-3">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-100 text-amber-800">
                      {pt.status}
                    </span>
                  </td>
                  <td className="p-3 text-right space-x-2">
                    <button
                      onClick={() => showToast(`Approved ${pt.name} faculty credentials!`, 'success')}
                      className="px-2.5 py-1 bg-emerald-600 text-white rounded text-[11px] font-semibold hover:bg-emerald-700"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => showToast(`Rejected verification for ${pt.name}`, 'info')}
                      className="px-2.5 py-1 bg-slate-200 text-slate-700 rounded text-[11px] font-semibold hover:bg-slate-300"
                    >
                      Reject
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Users Directory Table (Section 16 Requirement) */}
      <div className="academic-card p-6 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <h3 className="font-bold text-sm text-[#0F2942]">Platform Users Directory</h3>
          
          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Search users..."
              value={userSearch}
              onChange={(e) => setUserSearch(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 text-xs rounded-lg border border-slate-200 bg-white"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-50 text-[#0F2942] font-bold border-b border-slate-200">
                <th className="p-3">User Name</th>
                <th className="p-3">Email Address</th>
                <th className="p-3">Role</th>
                <th className="p-3">College / Grade</th>
                <th className="p-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {filteredUsers.map((u) => (
                <tr key={u.id} className="hover:bg-slate-50">
                  <td className="p-3 font-bold text-[#0F2942]">{u.name}</td>
                  <td className="p-3 font-mono">{u.email}</td>
                  <td className="p-3"><span className="px-2 py-0.5 rounded bg-blue-50 text-[#2563EB] font-bold capitalize">{u.role}</span></td>
                  <td className="p-3 text-slate-500">{u.college || 'Stanford University'}</td>
                  <td className="p-3 text-right space-x-1">
                    <button onClick={() => handleToggleStatus(u, 'Active')} className="p-1 rounded text-emerald-600 hover:bg-emerald-50" title="Approve User"><CheckCircle2 className="w-4 h-4" /></button>
                    <button onClick={() => handleToggleStatus(u, 'Suspended')} className="p-1 rounded text-red-600 hover:bg-red-50" title="Suspend User"><XCircle className="w-4 h-4" /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
