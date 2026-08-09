'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Search, 
  X, 
  FlaskConical, 
  Users, 
  FileText, 
  Award, 
  BookOpen, 
  ArrowRight, 
  Sparkles,
  RotateCcw
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const GlobalSearchModal: React.FC = () => {
  const { isSearchOpen, setSearchOpen, experiments, teachers, reports, certificates } = useApp();
  const [query, setQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'experiments' | 'teachers' | 'courses' | 'reports' | 'certificates'>('all');
  const [recentSearches, setRecentSearches] = useState<string[]>([
    'Pendulum Oscillation',
    'Titration Experiment',
    'Circuit Analysis',
    'Dr. Nova'
  ]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setSearchOpen(true);
      }
      if (e.key === 'Escape') {
        setSearchOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [setSearchOpen]);

  if (!isSearchOpen) return null;

  const handleSelectRecent = (term: string) => {
    setQuery(term);
  };

  const handleAddRecent = (term: string) => {
    if (!term || !term.trim()) return;
    setRecentSearches((prev) => Array.from(new Set([term.trim(), ...prev])).slice(0, 5));
  };

  // Filtered data
  const filteredLabs = experiments.filter((exp) =>
    exp.title.toLowerCase().includes(query.toLowerCase()) ||
    exp.subject.toLowerCase().includes(query.toLowerCase()) ||
    exp.aim.toLowerCase().includes(query.toLowerCase())
  );

  const filteredTeachers = teachers.filter((tch) =>
    tch.name.toLowerCase().includes(query.toLowerCase()) ||
    tch.specialization.toLowerCase().includes(query.toLowerCase()) ||
    tch.subject.toLowerCase().includes(query.toLowerCase())
  );

  const filteredReports = reports.filter((rpt) =>
    rpt.experimentTitle.toLowerCase().includes(query.toLowerCase()) ||
    rpt.subject.toLowerCase().includes(query.toLowerCase())
  );

  const filteredCertificates = certificates.filter((cert) =>
    cert.courseTitle.toLowerCase().includes(query.toLowerCase()) ||
    cert.subject.toLowerCase().includes(query.toLowerCase())
  );

  const coursesList = [
    { title: 'Advanced Newtonian Physics', subject: 'Physics', labsCount: 6 },
    { title: 'Organic Chemistry Reactions', subject: 'Chemistry', labsCount: 8 },
    { title: 'Cellular Biology & Optics', subject: 'Biology', labsCount: 5 },
    { title: 'Digital Electronics & Logic Gates', subject: 'Electronics', labsCount: 7 },
    { title: 'Python Algorithms & Data Structures', subject: 'Programming', labsCount: 10 }
  ].filter(c => c.title.toLowerCase().includes(query.toLowerCase()) || c.subject.toLowerCase().includes(query.toLowerCase()));

  const totalResults = 
    (selectedCategory === 'all' || selectedCategory === 'experiments' ? filteredLabs.length : 0) +
    (selectedCategory === 'all' || selectedCategory === 'teachers' ? filteredTeachers.length : 0) +
    (selectedCategory === 'all' || selectedCategory === 'courses' ? coursesList.length : 0) +
    (selectedCategory === 'all' || selectedCategory === 'reports' ? filteredReports.length : 0) +
    (selectedCategory === 'all' || selectedCategory === 'certificates' ? filteredCertificates.length : 0);

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-start justify-center pt-12 sm:pt-16 px-4">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        
        {/* Search Header Bar */}
        <div className="p-4 border-b border-slate-200 flex items-center gap-3">
          <Search className="w-5 h-5 text-slate-400 shrink-0" />
          <input
            type="text"
            autoFocus
            placeholder="Search experiments, teachers, subjects, reports..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => { if (e.key === 'Enter') handleAddRecent(query); }}
            className="flex-1 bg-transparent border-none text-sm focus:outline-none text-slate-800 placeholder:text-slate-400 font-medium"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="text-xs text-slate-400 hover:text-slate-600 px-2 py-0.5 rounded bg-slate-100 font-semibold"
            >
              Clear
            </button>
          )}
          <button
            onClick={() => setSearchOpen(false)}
            className="p-1 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-600"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Category Filters */}
        <div className="flex items-center gap-1.5 p-2 px-4 bg-slate-50 border-b border-slate-200 overflow-x-auto">
          {[
            { id: 'all', label: 'All Categories' },
            { id: 'experiments', label: 'Experiments' },
            { id: 'teachers', label: 'Teachers' },
            { id: 'courses', label: 'Courses' },
            { id: 'reports', label: 'Reports' },
            { id: 'certificates', label: 'Certificates' },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id as any)}
              className={`px-3 py-1 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
                selectedCategory === cat.id
                  ? 'bg-[#0F2942] text-white shadow-2xs'
                  : 'text-slate-600 hover:bg-slate-200/60'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Modal Results Container */}
        <div className="max-h-[60vh] overflow-y-auto p-4 space-y-5">
          {query.trim() === '' ? (
            <div className="space-y-4 py-2">
              {/* Recent Searches */}
              <div>
                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <RotateCcw className="w-3.5 h-3.5 text-slate-400" />
                  Recent Searches
                </div>
                <div className="flex flex-wrap gap-2">
                  {recentSearches.map((term) => (
                    <button
                      key={term}
                      onClick={() => handleSelectRecent(term)}
                      className="px-3 py-1 rounded-lg border border-slate-200 bg-slate-50 hover:bg-slate-100 text-xs font-medium text-slate-700 transition-colors"
                    >
                      {term}
                    </button>
                  ))}
                </div>
              </div>

              {/* Suggestions */}
              <div>
                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-[#2563EB]" />
                  Suggested Categories
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {['Physics Pendulum', 'Acid-Base Titration', 'Logic Gates', 'Python Code Simulator', 'Biology Optics'].map((sug) => (
                    <button
                      key={sug}
                      onClick={() => handleSelectRecent(sug)}
                      className="p-2.5 rounded-xl border border-slate-200 hover:border-blue-300 hover:bg-blue-50/50 text-left transition-all text-xs font-semibold text-slate-800"
                    >
                      {sug}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ) : totalResults === 0 ? (
            <div className="text-center py-10 space-y-2">
              <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-400 mx-auto flex items-center justify-center">
                <Search className="w-6 h-6" />
              </div>
              <h4 className="text-sm font-bold text-[#0F2942]">No results found</h4>
              <p className="text-xs text-slate-500 max-w-xs mx-auto">
                No matching items found for "{query}". Try searching for physics, titration, teachers, or reports.
              </p>
            </div>
          ) : (
            <>
              {/* Experiments */}
              {(selectedCategory === 'all' || selectedCategory === 'experiments') && filteredLabs.length > 0 && (
                <div>
                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <FlaskConical className="w-3.5 h-3.5 text-[#2563EB]" />
                    Experiments ({filteredLabs.length})
                  </div>
                  <div className="space-y-1.5">
                    {filteredLabs.map((lab) => (
                      <Link
                        key={lab.id}
                        href={`/labs/${lab.id}`}
                        onClick={() => { handleAddRecent(query); setSearchOpen(false); }}
                        className="flex items-center justify-between p-2.5 rounded-xl hover:bg-blue-50/60 transition-colors border border-slate-100 hover:border-blue-200 group"
                      >
                        <div>
                          <div className="text-xs font-bold text-[#0F2942] group-hover:text-[#2563EB]">
                            {lab.title}
                          </div>
                          <div className="text-[11px] text-slate-500 capitalize">{lab.subject} • {lab.difficulty} • {lab.duration}</div>
                        </div>
                        <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-[#2563EB] transition-colors" />
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* Teachers */}
              {(selectedCategory === 'all' || selectedCategory === 'teachers') && filteredTeachers.length > 0 && (
                <div>
                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <Users className="w-3.5 h-3.5 text-emerald-600" />
                    Teachers & Faculty ({filteredTeachers.length})
                  </div>
                  <div className="space-y-1.5">
                    {filteredTeachers.map((tch) => (
                      <Link
                        key={tch.id}
                        href={`/teachers`}
                        onClick={() => { handleAddRecent(query); setSearchOpen(false); }}
                        className="flex items-center justify-between p-2.5 rounded-xl hover:bg-emerald-50/60 transition-colors border border-slate-100 hover:border-emerald-200 group"
                      >
                        <div className="flex items-center gap-2.5">
                          <img src={tch.avatar} alt={tch.name} className="w-7 h-7 rounded-full object-cover ring-1 ring-slate-200" />
                          <div>
                            <div className="text-xs font-bold text-[#0F2942] group-hover:text-emerald-700">
                              {tch.name}
                            </div>
                            <div className="text-[11px] text-slate-500">{tch.qualification} • {tch.specialization}</div>
                          </div>
                        </div>
                        <span className="text-xs font-bold text-[#2563EB]">${tch.hourlyRate}/hr</span>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* Courses */}
              {(selectedCategory === 'all' || selectedCategory === 'courses') && coursesList.length > 0 && (
                <div>
                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <BookOpen className="w-3.5 h-3.5 text-indigo-600" />
                    Available Courses ({coursesList.length})
                  </div>
                  <div className="space-y-1.5">
                    {coursesList.map((crs, idx) => (
                      <Link
                        key={idx}
                        href="/labs"
                        onClick={() => { handleAddRecent(query); setSearchOpen(false); }}
                        className="flex items-center justify-between p-2.5 rounded-xl hover:bg-indigo-50/60 transition-colors border border-slate-100 hover:border-indigo-200 group"
                      >
                        <div>
                          <div className="text-xs font-bold text-[#0F2942] group-hover:text-indigo-700">
                            {crs.title}
                          </div>
                          <div className="text-[11px] text-slate-500">{crs.subject} • {crs.labsCount} Virtual Experiments</div>
                        </div>
                        <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-indigo-600 transition-colors" />
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* Reports */}
              {(selectedCategory === 'all' || selectedCategory === 'reports') && filteredReports.length > 0 && (
                <div>
                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <FileText className="w-3.5 h-3.5 text-purple-600" />
                    Lab Reports ({filteredReports.length})
                  </div>
                  <div className="space-y-1.5">
                    {filteredReports.map((rpt) => (
                      <Link
                        key={rpt.id}
                        href="/report-generator"
                        onClick={() => { handleAddRecent(query); setSearchOpen(false); }}
                        className="flex items-center justify-between p-2.5 rounded-xl hover:bg-purple-50/60 transition-colors border border-slate-100 hover:border-purple-200 group"
                      >
                        <div>
                          <div className="text-xs font-bold text-[#0F2942] group-hover:text-purple-700">
                            {rpt.experimentTitle}
                          </div>
                          <div className="text-[11px] text-slate-500">{rpt.subject} • {rpt.date}</div>
                        </div>
                        <span className="text-xs font-bold text-purple-600 bg-purple-50 px-2 py-0.5 rounded border border-purple-100">
                          {rpt.scoreGrade || 'Submitted'}
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* Certificates */}
              {(selectedCategory === 'all' || selectedCategory === 'certificates') && filteredCertificates.length > 0 && (
                <div>
                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <Award className="w-3.5 h-3.5 text-amber-600" />
                    Certificates ({filteredCertificates.length})
                  </div>
                  <div className="space-y-1.5">
                    {filteredCertificates.map((cert) => (
                      <Link
                        key={cert.id}
                        href="/certificates"
                        onClick={() => { handleAddRecent(query); setSearchOpen(false); }}
                        className="flex items-center justify-between p-2.5 rounded-xl hover:bg-amber-50/60 transition-colors border border-slate-100 hover:border-amber-200 group"
                      >
                        <div>
                          <div className="text-xs font-bold text-[#0F2942] group-hover:text-amber-700">
                            {cert.courseTitle}
                          </div>
                          <div className="text-[11px] text-slate-500">{cert.subject} • Code: {cert.verificationCode}</div>
                        </div>
                        <span className="text-xs font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded border border-amber-100">
                          Score: {cert.score}%
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-3 bg-slate-50 border-t border-slate-200 text-[10px] text-slate-400 flex items-center justify-between">
          <span>Press <kbd className="px-1.5 py-0.5 bg-white border border-slate-300 rounded font-mono text-slate-600">ESC</kbd> to close</span>
          <span>AI Lab Simulator Global Search Engine</span>
        </div>
      </div>
    </div>
  );
};
