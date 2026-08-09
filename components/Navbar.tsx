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
  LogOut,
  LayoutDashboard,
  Award,
  FileText,
  Settings,
  User,
  ExternalLink,
  ShieldCheck,
  GraduationCap
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const Navbar: React.FC = () => {
  const pathname = usePathname();
  const { 
    user, 
    notifications, 
    setSearchOpen, 
    openAuthModal, 
    markNotificationRead, 
    clearAllNotifications, 
    logout 
  } = useApp();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
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

  const getDashboardHref = () => {
    if (user.role === 'teacher') return '/dashboard/teacher';
    if (user.role === 'owner' || user.role === 'admin') return '/dashboard/admin';
    return '/dashboard/student';
  };

  const isOwner = user.role === 'owner' || user.role === 'admin';

  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-slate-200/80 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-3 sm:gap-6">
        
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2.5 group shrink-0">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#0F2942] to-[#2563EB] flex items-center justify-center text-white shadow-sm group-hover:scale-105 transition-transform duration-300">
            <FlaskConical className="w-5 h-5 stroke-[2.2] group-hover:rotate-12 transition-transform" />
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-base text-[#0F2942] tracking-tight flex items-center gap-1.5 leading-tight">
              AI Lab Simulator
              <span className="text-[9px] bg-blue-50 text-[#2563EB] font-extrabold px-2 py-0.5 rounded-full border border-blue-100 tracking-wider">ACADEMY</span>
            </span>
            <span className="text-[10px] text-slate-500 font-medium tracking-wide">Virtual STEM Laboratory</span>
          </div>
        </Link>

        {/* Global Search Bar (Desktop Trigger Input) */}
        <div className="hidden lg:flex items-center flex-1 max-w-sm">
          <button
            onClick={() => setSearchOpen(true)}
            className="w-full px-3.5 py-1.5 rounded-xl border border-slate-200 bg-slate-50/80 text-slate-400 hover:text-slate-600 hover:border-slate-300 hover:bg-slate-100/80 text-xs font-medium flex items-center justify-between transition-all group"
          >
            <span className="flex items-center gap-2">
              <Search className="w-4 h-4 text-slate-400 group-hover:text-[#2563EB] transition-colors" />
              <span>Search experiments, subjects, teachers...</span>
            </span>
            <span className="text-[10px] text-slate-400 font-mono bg-white px-1.5 py-0.5 rounded border border-slate-200 shadow-2xs">⌘K</span>
          </button>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-1 bg-slate-100/70 p-1 rounded-xl border border-slate-200/60">
          {navLinks.map((link) => {
            const isActive = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href));
            return (
              <Link
                key={link.name}
                href={link.href}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 ${
                  isActive
                    ? 'bg-white text-[#2563EB] font-bold shadow-2xs'
                    : 'text-slate-600 hover:text-[#0F2942] hover:bg-white/50'
                }`}
              >
                {link.name}
              </Link>
            );
          })}
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-2">
          
          {/* Mobile/Tablet Search Button */}
          <button
            onClick={() => setSearchOpen(true)}
            className="lg:hidden p-2 rounded-xl text-slate-600 hover:bg-slate-100 transition-all border border-slate-200/80 bg-slate-50/80"
            title="Search"
          >
            <Search className="w-4.5 h-4.5 text-slate-500" />
          </button>

          {/* Notifications Dropdown */}
          <div className="relative">
            <button
              onClick={() => {
                setNotifDropdownOpen(!notifDropdownOpen);
                setUserDropdownOpen(false);
              }}
              className="relative p-2 rounded-xl text-slate-600 hover:bg-slate-100 transition-colors border border-transparent hover:border-slate-200"
              title="Notifications"
            >
              <Bell className="w-4.5 h-4.5" />
              {unreadCount > 0 && (
                <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 rounded-full bg-red-500 ring-2 ring-white animate-pulse" />
              )}
            </button>

            {notifDropdownOpen && (
              <div className="absolute right-0 mt-2 w-80 bg-white rounded-2xl shadow-2xl border border-slate-200 p-3 z-50 animate-in fade-in slide-in-from-top-2">
                <div className="flex items-center justify-between pb-2 border-b border-slate-100 mb-2">
                  <span className="font-bold text-xs text-[#0F2942] flex items-center gap-1.5">
                    Notifications
                    {unreadCount > 0 && <span className="bg-red-100 text-red-600 text-[10px] px-1.5 py-0.5 rounded-full font-bold">{unreadCount}</span>}
                  </span>
                  <div className="flex items-center gap-2">
                    <button onClick={clearAllNotifications} className="text-[10px] text-slate-400 hover:text-slate-600 font-medium">Clear all</button>
                    <Link href="/notifications" onClick={() => setNotifDropdownOpen(false)} className="text-[10px] text-[#2563EB] hover:underline font-bold">Full View</Link>
                  </div>
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
                <div className="pt-2 mt-2 border-t border-slate-100 text-center">
                  <Link
                    href="/notifications"
                    onClick={() => setNotifDropdownOpen(false)}
                    className="text-[11px] text-[#2563EB] font-bold hover:underline inline-flex items-center gap-1"
                  >
                    <span>View all notifications</span>
                    <ExternalLink className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            )}
          </div>

          {/* User Auth Menu */}
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
                className="px-4 py-2 rounded-xl text-xs font-semibold text-white bg-[#2563EB] hover:bg-[#1D4ED8] transition-all shadow-2xs"
              >
                Get Started
              </button>
            </div>
          ) : (
            <div className="relative">
              <button
                onClick={() => {
                  setUserDropdownOpen(!userDropdownOpen);
                  setNotifDropdownOpen(false);
                }}
                className="flex items-center gap-2 p-1 rounded-xl hover:bg-slate-100 transition-colors"
              >
                <img
                  src={user.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80'}
                  alt={user.name}
                  className="w-8.5 h-8.5 rounded-xl object-cover ring-2 ring-[#2563EB]/20"
                />
              </button>

              {userDropdownOpen && (
                <div className="absolute right-0 mt-2 w-60 bg-white rounded-2xl shadow-2xl border border-slate-200 py-2 z-50 animate-in fade-in slide-in-from-top-2">
                  <div className="px-4 py-2.5 border-b border-slate-100">
                    <p className="text-xs font-bold text-[#0F2942] line-clamp-1">{user.name}</p>
                    <p className="text-[11px] text-slate-500 line-clamp-1">{user.email}</p>
                    <div className="flex items-center gap-1.5 mt-1.5">
                      <span className={`inline-flex items-center gap-1 text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full border ${
                        isOwner
                          ? 'bg-amber-50 text-amber-700 border-amber-200'
                          : user.role === 'teacher'
                          ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                          : 'bg-blue-50 text-[#2563EB] border-blue-200'
                      }`}>
                        {isOwner && <ShieldCheck className="w-3 h-3 text-amber-600" />}
                        {user.role === 'teacher' && <GraduationCap className="w-3 h-3 text-emerald-600" />}
                        {user.role} Account
                      </span>
                    </div>
                  </div>

                  <div className="py-1">
                    <Link
                      href={getDashboardHref()}
                      onClick={() => setUserDropdownOpen(false)}
                      className="px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 hover:text-[#2563EB] flex items-center gap-2.5 transition-colors"
                    >
                      <LayoutDashboard className="w-4 h-4 text-slate-400" />
                      Dashboard
                    </Link>

                    {isOwner && (
                      <Link
                        href="/admin"
                        onClick={() => setUserDropdownOpen(false)}
                        className="px-4 py-2 text-xs font-semibold text-amber-700 bg-amber-50/50 hover:bg-amber-50 flex items-center gap-2.5 transition-colors"
                      >
                        <ShieldCheck className="w-4 h-4 text-amber-600" />
                        Owner Admin Panel
                      </Link>
                    )}

                    <Link
                      href="/profile"
                      onClick={() => setUserDropdownOpen(false)}
                      className="px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 hover:text-[#2563EB] flex items-center gap-2.5 transition-colors"
                    >
                      <User className="w-4 h-4 text-slate-400" />
                      My Academic Profile
                    </Link>

                    <Link
                      href="/settings"
                      onClick={() => setUserDropdownOpen(false)}
                      className="px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 hover:text-[#2563EB] flex items-center gap-2.5 transition-colors"
                    >
                      <Settings className="w-4 h-4 text-slate-400" />
                      Account Settings
                    </Link>

                    <Link
                      href="/certificates"
                      onClick={() => setUserDropdownOpen(false)}
                      className="px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 hover:text-[#2563EB] flex items-center gap-2.5 transition-colors"
                    >
                      <Award className="w-4 h-4 text-slate-400" />
                      Certificates
                    </Link>

                    <Link
                      href="/report-generator"
                      onClick={() => setUserDropdownOpen(false)}
                      className="px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 hover:text-[#2563EB] flex items-center gap-2.5 transition-colors"
                    >
                      <FileText className="w-4 h-4 text-slate-400" />
                      Lab Reports
                    </Link>
                  </div>

                  <div className="border-t border-slate-100 pt-1 mt-1">
                    <button
                      onClick={() => {
                        logout();
                        setUserDropdownOpen(false);
                      }}
                      className="w-full text-left px-4 py-2 text-xs font-semibold text-red-600 hover:bg-red-50 flex items-center gap-2.5 transition-colors"
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
        <div className="md:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 space-y-2 shadow-xl animate-in slide-in-from-top-2">
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

          {!isGuest && (
            <>
              <Link
                href={getDashboardHref()}
                onClick={() => setMobileMenuOpen(false)}
                className="block px-4 py-2.5 rounded-xl text-sm font-semibold text-[#2563EB] bg-blue-50/60 hover:bg-blue-100/60"
              >
                Dashboard
              </Link>
              <Link
                href="/profile"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-4 py-2.5 rounded-xl text-sm font-semibold text-slate-700 hover:bg-slate-100"
              >
                Academic Profile
              </Link>
              <Link
                href="/settings"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-4 py-2.5 rounded-xl text-sm font-semibold text-slate-700 hover:bg-slate-100"
              >
                Settings
              </Link>
            </>
          )}

          {isGuest && (
            <div className="pt-4 border-t border-slate-100 flex items-center gap-2">
              <button
                onClick={() => { openAuthModal('login'); setMobileMenuOpen(false); }}
                className="flex-1 py-2.5 rounded-xl text-xs font-semibold text-[#0F2942] border border-slate-200 hover:bg-slate-50"
              >
                Login
              </button>
              <button
                onClick={() => { openAuthModal('register'); setMobileMenuOpen(false); }}
                className="flex-1 py-2.5 rounded-xl text-xs font-semibold text-white bg-[#2563EB] hover:bg-[#1D4ED8]"
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
