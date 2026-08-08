'use client';

import React, { useState } from 'react';
import { Search, Star, ArrowRight, ShieldCheck, Filter, Globe, Calendar, DollarSign } from 'lucide-react';
import { Teacher, SubjectCategory } from '../../types';
import { useApp } from '../../context/AppContext';
import { TeacherProfileModal } from './TeacherProfileModal';
import { BookingModal } from './BookingModal';

export const TeacherDirectory: React.FC = () => {
  const { teachers } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSubject, setSelectedSubject] = useState<SubjectCategory | 'all'>('all');
  const [experienceFilter, setExperienceFilter] = useState<string>('all');
  const [selectedTeacherProfile, setSelectedTeacherProfile] = useState<Teacher | null>(null);
  const [selectedTeacherBooking, setSelectedTeacherBooking] = useState<Teacher | null>(null);

  const filteredTeachers = teachers.filter((tch) => {
    const matchSubject = selectedSubject === 'all' || tch.subject === selectedSubject;
    const matchQuery = tch.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                       tch.specialization.toLowerCase().includes(searchQuery.toLowerCase()) ||
                       tch.qualification.toLowerCase().includes(searchQuery.toLowerCase());
    return matchSubject && matchQuery;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Heading (Section 11 Requirement) */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-[#0F2942] tracking-tight">
            Learn Directly From Experts
          </h1>
          <p className="text-xs text-slate-600 mt-1">
            Book 1-on-1 consultations with verified STEM professors for personalized guidance and lab assistance.
          </p>
        </div>

        {/* Search */}
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
          <input
            type="text"
            placeholder="Search teachers or subjects..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 text-xs rounded-lg border border-slate-300 bg-white text-slate-900 focus:outline-none focus:border-[#2563EB]"
          />
        </div>
      </div>

      {/* Filters Bar (Subject, Experience, Rating, Language, Availability, Price) */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-200">
        
        {/* Subject Pills */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => setSelectedSubject('all')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              selectedSubject === 'all'
                ? 'bg-[#0F2942] text-white shadow-xs'
                : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
            }`}
          >
            All Faculty ({teachers.length})
          </button>
          {(['physics', 'chemistry', 'biology', 'programming', 'electronics'] as SubjectCategory[]).map((sub) => (
            <button
              key={sub}
              onClick={() => setSelectedSubject(sub)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold capitalize transition-all ${
                selectedSubject === sub
                  ? 'bg-[#0F2942] text-white shadow-xs'
                  : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
              }`}
            >
              {sub}
            </button>
          ))}
        </div>

        {/* Experience & Price Dropdown */}
        <div className="flex items-center gap-2 text-xs text-slate-600">
          <Filter className="w-4 h-4 text-slate-400" />
          <select
            value={experienceFilter}
            onChange={(e) => setExperienceFilter(e.target.value)}
            className="px-3 py-1.5 text-xs rounded-lg border border-slate-200 bg-white font-semibold"
          >
            <option value="all">All Experience Levels</option>
            <option value="5+">5+ Years Experience</option>
            <option value="10+">10+ Years Experience</option>
          </select>
        </div>

      </div>

      {/* Teacher Cards Grid */}
      {filteredTeachers.length === 0 ? (
        <div className="academic-card p-12 text-center">
          <p className="text-sm font-semibold text-slate-600">No teachers found. Try searching for a different subject or name.</p>
          <button onClick={() => { setSelectedSubject('all'); setSearchQuery(''); }} className="mt-2 text-xs font-bold text-[#2563EB] hover:underline">
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
          {filteredTeachers.map((tch) => (
            <div
              key={tch.id}
              className="academic-card p-6 space-y-4 flex flex-col justify-between group"
            >
              <div className="space-y-3">
                
                {/* Header info */}
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <img
                      src={tch.avatar}
                      alt={tch.name}
                      className="w-14 h-14 rounded-xl object-cover border border-slate-200 shadow-xs"
                    />
                    <div>
                      <h3 className="font-bold text-base text-[#0F2942] group-hover:text-[#2563EB] transition-colors flex items-center gap-1.5">
                        {tch.name}
                        <ShieldCheck className="w-4 h-4 text-[#2563EB]" />
                      </h3>
                      <p className="text-xs font-medium text-slate-600">{tch.qualification}</p>
                      <div className="flex items-center gap-2 text-[11px] text-slate-500 mt-1">
                        <span className="flex items-center gap-1 text-amber-500 font-bold">
                          <Star className="w-3.5 h-3.5 fill-amber-400" />{tch.rating} ({tch.totalReviews} reviews)
                        </span>
                        <span>•</span>
                        <span>{tch.experience} Exp</span>
                      </div>
                    </div>
                  </div>

                  <div className="text-right shrink-0">
                    <div className="text-lg font-extrabold text-[#0F2942]">${tch.hourlyRate}</div>
                    <div className="text-[10px] text-slate-400">per 60-min session</div>
                  </div>
                </div>

                {/* Bio */}
                <p className="text-xs text-slate-600 leading-relaxed line-clamp-2">
                  {tch.bio}
                </p>

                {/* Metadata Pills */}
                <div className="flex flex-wrap items-center gap-2 text-[11px]">
                  <span className="bg-blue-50 text-[#2563EB] px-2 py-0.5 rounded font-semibold capitalize">{tch.subject}</span>
                  <span className="bg-slate-100 text-slate-700 px-2 py-0.5 rounded">Languages: {tch.languages.join(', ')}</span>
                  <span className="bg-slate-100 text-slate-700 px-2 py-0.5 rounded">Slots: {tch.availability[0] || 'Mon 10:00 AM'}</span>
                </div>

              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setSelectedTeacherProfile(tch)}
                  className="flex-1 py-2 rounded-lg border border-slate-300 bg-white hover:bg-slate-50 text-xs font-semibold text-[#0F2942] transition-colors"
                >
                  View Profile
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedTeacherBooking(tch)}
                  className="flex-1 py-2 rounded-lg bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs font-semibold shadow-xs transition-all flex items-center justify-center gap-1.5"
                >
                  <span>Book Session</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

            </div>
          ))}
        </div>
      )}

      {/* Teacher Profile Modal */}
      {selectedTeacherProfile && (
        <TeacherProfileModal
          teacher={selectedTeacherProfile}
          onClose={() => setSelectedTeacherProfile(null)}
          onBookSession={() => {
            const t = selectedTeacherProfile;
            setSelectedTeacherProfile(null);
            setSelectedTeacherBooking(t);
          }}
        />
      )}

      {/* Booking Flow Modal */}
      {selectedTeacherBooking && (
        <BookingModal
          teacher={selectedTeacherBooking}
          onClose={() => setSelectedTeacherBooking(null)}
        />
      )}

    </div>
  );
};
