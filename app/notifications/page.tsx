'use client';

import React, { useState } from 'react';
import { 
  Bell, 
  CheckCircle2, 
  Trash2, 
  CheckCheck, 
  FlaskConical, 
  Calendar, 
  Award, 
  ShieldAlert,
  MessageSquare
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { ProtectedRoute } from '../../components/auth/ProtectedRoute';

function NotificationsContent() {
  const { notifications, markNotificationRead, clearAllNotifications, showToast } = useApp();
  const [filter, setFilter] = useState<'all' | 'unread' | 'lab' | 'remind' | 'message'>('all');

  const filteredNotifications = notifications.filter((n) => {
    if (filter === 'unread') return !n.read;
    if (filter === 'lab') return n.type === 'lab';
    if (filter === 'remind') return n.type === 'remind';
    if (filter === 'message') return n.type === 'message';
    return true;
  });

  const handleMarkAllRead = () => {
    notifications.forEach((n) => markNotificationRead(n.id));
    showToast('All notifications marked as read', 'info');
  };

  const getNotifIcon = (type: string) => {
    switch (type) {
      case 'lab':
        return <FlaskConical className="w-5 h-5 text-[#2563EB]" />;
      case 'remind':
        return <Calendar className="w-5 h-5 text-amber-500" />;
      case 'certificate':
        return <Award className="w-5 h-5 text-emerald-500" />;
      case 'message':
        return <MessageSquare className="w-5 h-5 text-purple-500" />;
      default:
        return <ShieldAlert className="w-5 h-5 text-slate-500" />;
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-5">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0F2942] tracking-tight flex items-center gap-2.5">
            Notifications Center
            <Bell className="w-6 h-6 text-[#2563EB]" />
          </h1>
          <p className="text-xs text-slate-600 mt-1">
            Stay updated with your experiment progress, consultation sessions, lab report feedback, and system announcements.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleMarkAllRead}
            className="px-3.5 py-2 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold flex items-center gap-1.5 shadow-2xs transition-all"
          >
            <CheckCheck className="w-4 h-4 text-emerald-600" />
            <span>Mark All as Read</span>
          </button>

          <button
            onClick={clearAllNotifications}
            className="px-3.5 py-2 rounded-xl border border-red-200 bg-red-50/50 hover:bg-red-50 text-red-600 text-xs font-semibold flex items-center gap-1.5 transition-all"
          >
            <Trash2 className="w-4 h-4" />
            <span>Clear All</span>
          </button>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        {[
          { id: 'all', label: `All (${notifications.length})` },
          { id: 'unread', label: `Unread (${notifications.filter(n => !n.read).length})` },
          { id: 'lab', label: 'Lab Updates' },
          { id: 'remind', label: 'Bookings & Sessions' },
          { id: 'message', label: 'Teacher Messages' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setFilter(tab.id as any)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
              filter === tab.id
                ? 'bg-[#0F2942] text-white shadow-2xs'
                : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-100'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Notifications List */}
      {filteredNotifications.length === 0 ? (
        <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center space-y-3">
          <div className="w-14 h-14 rounded-2xl bg-blue-50 text-[#2563EB] mx-auto flex items-center justify-center">
            <CheckCircle2 className="w-7 h-7" />
          </div>
          <h3 className="text-base font-bold text-[#0F2942]">All Caught Up!</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            You don't have any notifications under this filter category right now.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {filteredNotifications.map((n) => (
            <div
              key={n.id}
              onClick={() => markNotificationRead(n.id)}
              className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-start gap-4 ${
                n.read
                  ? 'bg-white border-slate-200 text-slate-600'
                  : 'bg-blue-50/40 border-blue-200 shadow-2xs text-slate-900 font-medium'
              }`}
            >
              <div className={`p-2.5 rounded-xl shrink-0 ${
                n.read ? 'bg-slate-100' : 'bg-white border border-blue-100 shadow-2xs'
              }`}>
                {getNotifIcon(n.type)}
              </div>

              <div className="flex-1 space-y-1">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold text-[#0F2942]">{n.title}</h4>
                  <span className="text-[11px] text-slate-400 font-mono">{n.timestamp}</span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">{n.message}</p>
              </div>

              {!n.read && (
                <span className="w-2.5 h-2.5 rounded-full bg-[#2563EB] shrink-0 mt-1.5" />
              )}
            </div>
          ))}
        </div>
      )}

    </div>
  );
}

export default function NotificationsPage() {
  return (
    <ProtectedRoute>
      <NotificationsContent />
    </ProtectedRoute>
  );
}
