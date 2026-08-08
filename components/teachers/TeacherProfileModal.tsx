'use client';

import React from 'react';
import { X, Star, GraduationCap, Award, Globe, Clock, CheckCircle2, ShieldCheck, ArrowRight, Video, Mic, MessageSquare } from 'lucide-react';
import { Teacher } from '../../types';

interface TeacherProfileModalProps {
  teacher: Teacher;
  onClose: () => void;
  onBookSession: () => void;
}

export const TeacherProfileModal: React.FC<TeacherProfileModalProps> = ({ teacher, onClose, onBookSession }) => {
  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-2xl max-h-[90vh] overflow-y-auto relative p-6 space-y-6">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-600"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Profile Banner */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <img
            src={teacher.avatar}
            alt={teacher.name}
            className="w-20 h-20 rounded-xl object-cover border-2 border-[#2563EB] shadow-xs"
          />
          <div className="space-y-1">
            <h2 className="text-xl font-bold text-[#0F2942] flex items-center gap-2">
              {teacher.name}
              <ShieldCheck className="w-5 h-5 text-[#2563EB]" />
            </h2>
            <p className="text-xs font-semibold text-[#2563EB]">{teacher.qualification}</p>
            <div className="flex items-center gap-3 text-xs text-slate-500">
              <span className="flex items-center gap-1 text-amber-500 font-bold">
                <Star className="w-3.5 h-3.5 fill-amber-400" />{teacher.rating} ({teacher.totalReviews} reviews)
              </span>
              <span>•</span>
              <span>{teacher.experience} Exp</span>
              <span>•</span>
              <span className="capitalize font-semibold text-[#0F2942]">{teacher.subject}</span>
            </div>
          </div>
        </div>

        {/* About Section */}
        <div className="space-y-2">
          <h3 className="font-bold text-xs text-[#0F2942] uppercase tracking-wider">About</h3>
          <p className="text-xs text-slate-600 leading-relaxed bg-slate-50 p-3.5 rounded-xl border border-slate-100">
            {teacher.bio}
          </p>
        </div>

        {/* Session Mode Options & Availability */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <h3 className="font-bold text-xs text-[#0F2942] uppercase tracking-wider">Available Consultation Modes</h3>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-1 rounded bg-blue-50 text-[#2563EB] text-xs font-semibold flex items-center gap-1">
                <Video className="w-3.5 h-3.5" /> Video Call
              </span>
              <span className="px-2.5 py-1 rounded bg-emerald-50 text-emerald-700 text-xs font-semibold flex items-center gap-1">
                <Mic className="w-3.5 h-3.5" /> Audio Call
              </span>
              <span className="px-2.5 py-1 rounded bg-purple-50 text-purple-700 text-xs font-semibold flex items-center gap-1">
                <MessageSquare className="w-3.5 h-3.5" /> Live Chat
              </span>
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="font-bold text-xs text-[#0F2942] uppercase tracking-wider">Availability Calendar Slots</h3>
            <div className="flex flex-wrap gap-1.5">
              {teacher.availability.map((slot, idx) => (
                <span key={idx} className="px-2.5 py-1 rounded bg-slate-100 text-slate-700 text-xs font-mono font-medium">
                  {slot}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Credentials & Languages */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <h3 className="font-bold text-xs text-[#0F2942] uppercase tracking-wider flex items-center gap-1.5">
              <Award className="w-3.5 h-3.5 text-[#2563EB]" />
              Verified Credentials
            </h3>
            <ul className="space-y-1">
              {teacher.certificates.map((cert, idx) => (
                <li key={idx} className="text-xs text-slate-600 flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                  {cert}
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-2">
            <h3 className="font-bold text-xs text-[#0F2942] uppercase tracking-wider flex items-center gap-1.5">
              <Globe className="w-3.5 h-3.5 text-[#2563EB]" />
              Languages Spoken
            </h3>
            <div className="flex flex-wrap gap-1.5">
              {teacher.languages.map((lang, idx) => (
                <span key={idx} className="px-2.5 py-1 rounded bg-slate-100 text-xs font-semibold text-slate-700">
                  {lang}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Student Reviews */}
        <div className="space-y-3 pt-2 border-t border-slate-100">
          <h3 className="font-bold text-xs text-[#0F2942] uppercase tracking-wider">Student Reviews</h3>
          <div className="space-y-2">
            {teacher.reviews.map((rev) => (
              <div key={rev.id} className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <img src={rev.studentAvatar} alt={rev.studentName} className="w-5 h-5 rounded-full object-cover" />
                    <span className="font-bold text-[#0F2942]">{rev.studentName}</span>
                  </div>
                  <span className="text-[10px] text-slate-400">{rev.date}</span>
                </div>
                <p className="text-xs text-slate-600 italic">"{rev.comment}"</p>
              </div>
            ))}
          </div>
        </div>

        {/* Large Book Consultation Button */}
        <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
          <div>
            <div className="text-[11px] text-slate-500">Rate</div>
            <div className="text-xl font-extrabold text-[#0F2942]">${teacher.hourlyRate} / hr</div>
          </div>
          <button
            onClick={onBookSession}
            className="px-6 py-3 rounded-lg bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs font-bold shadow-xs flex items-center gap-2"
          >
            <span>Book Consultation</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
};
