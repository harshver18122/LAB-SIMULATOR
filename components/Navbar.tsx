'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  FlaskConical, 
  Search, 
  Bell, 
  Menu, 
  X, 
  BookOpen, 
  Users, 
  ShieldAlert, 
  ChevronDown,
  LogOut,
  Sparkles,
  CheckCircle2,
  LayoutDashboard,
  Award,
  FileText,
  Settings,
  Zap
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { UserRole } from '../types';

export const Navbar: React.FC = () => {
  const pathname = usePathname();
  const { 
    user, 
    setRole, 
    notifications, 
    setSearchOpen, 
    openAuthModal, 
    markNotificationRead, 
    clearAllNotifications, 
    logout 
  } = useApp();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [roleDropdownOpen, setRoleDropdownOpen] = useState(false);
  const [notifDropdownOpen, setNotifDropdownOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  const unreadCount = notifications.filter((n) => !n.read).length;
  const isGuest = !user || user.id === 'guest-learner-01';

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Virtual Labs', href: '/labs' },
    { name: 'AI Tutor', href: '/ai-tutor' },
    { name: 'Teachers', href: '/teachers' },
    { name: 'About', href: '/about' },
  ];

  const handleRoleChange = (newRole: UserRole) => {
    setRole(newRole);
    setRoleDropdownOpen(false);
  };

  const getDashboardHref = () => {
    if (user.role === 'teacher') return '/dashboard/teacher';
    if (user.role === 'admin') return '/dashboard/admin';
    return '/dashboard/student';
  };

  return (
    <header className="sticky top-0 z-40 bg-white/85 backdrop-blur-md border-b border-slate-200/80 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#0F2942] to-[#2563EB] flex items-center justify-center text-white shadow-md group-hover:scale-105 transition-transform duration-300">
            <FlaskConical className="w-5 h-5 stroke-[2.2] group-hover:rotate-12 transition-transform" />
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-base text-[#0F2942] tracking-tight flex items-center gap-1.5 leading-tight">
              AI Lab Simulator
              <span className="text-[9px] bg-gradient-to-r from-[#2563EB]/10 to-[#06B6D4]/10 text-[#2563EB] font-extrabold px-2 py-0.5 rounded-full border border-[#2563EB]/20 tracking-wider">ACADEMY</span>
            </span>
            <span className="text-[10px] text-slate-500 font-medium tracking-wide">Virtual STEM Laboratory</span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-1 bg-slate-100/60 p-1 rounded-xl border border-slate-200/60">
          {navLinks.map((link) => {
            const isActive = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href));
            return (
              <Link
                key={link.name}
                href={link.href}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 ${
                  isActive
                    ? 'bg-white text-[#2563EB] font-bold shadow-xs'
                    : 'text-slate-600 hover:text-[#0F2942] hover:bg-white/50'
                }`}
              >
                {link.name}
              </Link>
            );
          })}
        </nav>

        {/* Right Controls & Persona Switcher */}
        <div className="flex items-center gap-2">
          
          {/* Global Search Button */}
          <button
            onClick={() => setSearchOpen(true)}
            className="p-2 rounded-xl text-slate-600 hover:bg-slate-100 transition-all flex items-center gap-2 border border-slate-200/80 bg-slate-50/80"
            title="Search (Ctrl+K)"
          >
            <Search className="w-4 h-4 text-slate-400" />
            <span className="text-[10px] text-slate-400 font-mono hidden lg:inline px-1.5 py-0.5 bg-white rounded border border-slate-200 shadow-2xs">⌘K</span>
          </button>

          {/* Persona Role Switcher */}
          <div className="relative">
            <button
              onClick={() => setRoleDropdownOpen(!roleDropdownOpen)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 bg-slate-50 text-[#0F2942] font-semibold text-xs hover:bg-slate-100 transition-all shadow-2xs"
            >
              <Zap className="w-3.5 h-3.5 text-[#2563EB]" />
              <span className="capitalize">{user.role} Mode</span>
              <ChevronDown className="w-3.5 h-3.5 opacity-60" />
            </button>

            {roleDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white/95 backdrop-blur-md rounded-2xl shadow-xl border border-slate-200 py-1.5 z-50 animate-in fade-in slide-in-from-top-2">
                <div className="px-3 py-1 text-[10px] font-extrabold tracking-wider text-slate-400 uppercase">Switch Role View</div>
                {(['student', 'teacher', 'admin'] as UserRole[]).map((r) => (
                  <button
                    key={r}
                    onClick={() => handleRoleChange(r)}
                    className={`w-full text-left px-3 py-2 text-xs font-medium flex items-center justify-between hover:bg-slate-50 transition-colors ${
                      user.role === r ? 'text-[#2563EB] font-bold bg-blue-50/60' : 'text-slate-700'
                    }`}
                  >
                    <span className="capitalize flex items-center gap-2">
                      {r === 'student' && <BookOpen className="w-3.5 h-3.5 text-blue-500" />}
                      {r === 'teacher' && <Users className="w-3.5 h-3.5 text-emerald-500" />}
                      {r === 'admin' && <ShieldAlert className="w-3.5 h-3.5 text-amber-500" />}
                      {r} View
                    </span>
                    {user.role === r && <CheckCircle2 className="w-3.5 h-3.5 text-[#2563EB]" />}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Notifications Dropdown */}
          <div className="relative">
            <button
              onClick={() => setNotifDropdownOpen(!notifDropdownOpen)}
              className="relative p-2 rounded-xl text-slate-600 hover:bg-slate-100 transition-colors"
              title="Notifications"
            >
              <Bell className="w-4.5 h-4.5" />
              {unreadCount > 0 && (
                <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 rounded-full bg-red-500 ring-2 ring-white animate-pulse" />
              )}
            </button>

            {notifDropdownOpen && (
              <div className="absolute right-0 mt-2 w-80 bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl border border-slate-200 p-3 z-50">
                <div className="flex items-center justify-between pb-2 border-b border-slate-100 mb-2">
                  <span className="font-bold text-xs text-[#0F2942] flex items-center gap-1.5">
                    Notifications
                    {unreadCount > 0 && <span className="bg-red-100 text-red-600 text-[10px] px-1.5 py-0.5 rounded-full font-bold">{unreadCount}</span>}
                  </span>
                  <button onClick={clearAllNotifications} className="text-[10px] text-slate-400 hover:text-slate-600">Clear all</button>
                </div>
                
                <div className="space-y-2 max-h-64 overflow-y-auto pr-1">
                  {notifications.length === 0 ? (
                    <div className="text-center py-6 text-slate-400 text-xs">No notifications yet</div>
                  ) : (
                    notifications.map((n) => (
                      <div
                        key={n.id}
                        onClick={() => markNotificationRead(n.id)}
                        className={`p-2.5 rounded-xl text-xs cursor-pointer transition-all border ${
                          n.read ? 'bg-slate-50/50 border-slate-100 text-slate-500' : 'bg-blue-50/50 border-blue-100 text-slate-800 font-medium'
                        }`}
                      >
                        <div className="font-bold flex items-center justify-between mb-0.5 text-xs text-[#0F2942]">
                          {n.title}
                          <span className="text-[10px] text-slate-400 font-normal">{n.timestamp}</span>
                        </div>
                        <p className="text-[11px] leading-tight text-slate-600">{n.message}</p>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Auth Controls / User Profile Dropdown */}
          {isGuest ? (
            <div className="hidden sm:flex items-center gap-2 ml-1">
              <button
                onClick={() => openAuthModal('login')}
                className="px-3.5 py-2 rounded-xl text-xs font-semibold text-[#0F2942] hover:bg-slate-100 transition-colors"
              >
                Login
              </button>
              <button
                onClick={() => openAuthModal('register')}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-white bg-gradient-to-r from-[#2563EB] to-[#1D4ED8] hover:shadow-md transition-all shadow-xs"
              >
                Get Started
              </button>
            </div>
          ) : (
            <div className="relative">
              <button
                onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                className="flex items-center gap-2 p-1 rounded-xl hover:bg-slate-100 transition-colors"
              >
                <img
                  src={user.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80'}
                  alt={user.name}
                  className="w-8 h-8 rounded-xl object-cover ring-2 ring-[#2563EB]/20"
                />
              </button>

              {userDropdownOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl border border-slate-200 py-2 z-50">
                  <div className="px-4 py-2 border-b border-slate-100">
                    <p className="text-xs font-bold text-[#0F2942] line-clamp-1">{user.name}</p>
                    <p className="text-[11px] text-slate-500 line-clamp-1">{user.email}</p>
                    <span className="inline-block mt-1 text-[10px] font-bold uppercase bg-blue-50 text-[#2563EB] px-2 py-0.5 rounded-full border border-blue-100">
                      {user.role} Account
                    </span>
                  </div>

                  <div className="py-1">
                    <Link
                      href={getDashboardHref()}
                      onClick={() => setUserDropdownOpen(false)}
                      className="px-4 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50 flex items-center gap-2"
                    >
                      <LayoutDashboard className="w-4 h-4 text-slate-400" />
                      Dashboard
                    </Link>
                    <Link
                      href="/settings"
                      onClick={() => setUserDropdownOpen(false)}
                      className="px-4 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50 flex items-center gap-2"
                    >
                      <Settings className="w-4 h-4 text-slate-400" />
                      Settings & Profile
                    </Link>
                    <Link
                      href="/certificates"
                      onClick={() => setUserDropdownOpen(false)}
                      className="px-4 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50 flex items-center gap-2"
                    >
                      <Award className="w-4 h-4 text-slate-400" />
                      Certificates
                    </Link>
                    <Link
                      href="/report-generator"
                      onClick={() => setUserDropdownOpen(false)}
                      className="px-4 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50 flex items-center gap-2"
                    >
                      <FileText className="w-4 h-4 text-slate-400" />
                      Lab Reports
                    </Link>
                  </div>

                  <div className="border-t border-slate-100 pt-1">
                    <button
                      onClick={() => {
                        logout();
                        setUserDropdownOpen(false);
                      }}
                      className="w-full text-left px-4 py-2 text-xs font-semibold text-red-600 hover:bg-red-50 flex items-center gap-2"
                    >
                      <LogOut className="w-4 h-4" />
                      Sign Out
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Mobile Hamburger Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-xl text-slate-600 hover:bg-slate-100"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white/95 backdrop-blur-md px-4 pt-3 pb-6 space-y-2 shadow-xl">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className={`block px-4 py-2.5 rounded-xl text-sm font-semibold transition-colors ${
                pathname === link.href ? 'bg-[#0F2942] text-white' : 'text-slate-700 hover:bg-slate-100'
              }`}
            >
              {link.name}
            </Link>
          ))}
          <Link
            href={getDashboardHref()}
            onClick={() => setMobileMenuOpen(false)}
            className="block px-4 py-2.5 rounded-xl text-sm font-semibold text-[#0F2942] hover:bg-slate-100"
          >
            Dashboard
          </Link>
          {isGuest && (
            <div className="pt-4 border-t border-slate-100 flex items-center gap-2">
              <button
                onClick={() => { openAuthModal('login'); setMobileMenuOpen(false); }}
                className="flex-1 py-2.5 rounded-xl text-xs font-semibold text-[#0F2942] border border-slate-200"
              >
                Login
              </button>
              <button
                onClick={() => { openAuthModal('register'); setMobileMenuOpen(false); }}
                className="flex-1 py-2.5 rounded-xl text-xs font-semibold text-white bg-[#2563EB]"
              >
                Get Started
              </button>
            </div>
          )}
        </div>
      )}
    </header>
  );
};
