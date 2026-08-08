'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Search, X, FlaskConical, Users, ArrowRight } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const GlobalSearchModal: React.FC = () => {
  const { isSearchOpen, setSearchOpen, experiments, teachers } = useApp();
  const [query, setQuery] = useState('');

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

  const filteredLabs = experiments.filter((exp) =>
    exp.title.toLowerCase().includes(query.toLowerCase()) ||
    exp.subject.toLowerCase().includes(query.toLowerCase()) ||
    exp.aim.toLowerCase().includes(query.toLowerCase())
  );

  const filteredTeachers = teachers.filter((tch) =>
    tch.name.toLowerCase().includes(query.toLowerCase()) ||
    tch.specialization.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-start justify-center pt-16 px-4">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-2xl overflow-hidden">
        
        {/* Search Input Bar */}
        <div className="p-4 border-b border-slate-200 flex items-center gap-3">
          <Search className="w-5 h-5 text-slate-400" />
          <input
            type="text"
            autoFocus
            placeholder="Search experiments, teachers, subjects..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 bg-transparent border-none text-sm focus:outline-none text-slate-800 placeholder:text-slate-400"
          />
          <button
            onClick={() => setSearchOpen(false)}
            className="p-1 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-600"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Results Body */}
        <div className="max-h-[60vh] overflow-y-auto p-4 space-y-4">
          {query.trim() === '' ? (
            <div className="text-center py-8 text-slate-400 text-xs">
              Type something to search across experiments and faculty...
            </div>
          ) : (
            <>
              {/* Virtual Labs Results */}
              <div>
                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <FlaskConical className="w-3.5 h-3.5 text-[#2563EB]" />
                  Virtual Experiments ({filteredLabs.length})
                </div>
                {filteredLabs.length === 0 ? (
                  <div className="text-xs text-slate-400 py-1 pl-2">No matching experiments</div>
                ) : (
                  <div className="space-y-1">
                    {filteredLabs.map((lab) => (
                      <Link
                        key={lab.id}
                        href={`/labs/${lab.id}`}
                        onClick={() => setSearchOpen(false)}
                        className="flex items-center justify-between p-2.5 rounded-lg hover:bg-slate-50 transition-colors border border-transparent hover:border-slate-200 group"
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
                )}
              </div>

              {/* Teachers Results */}
              <div>
                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <Users className="w-3.5 h-3.5 text-emerald-600" />
                  Teachers & Faculty ({filteredTeachers.length})
                </div>
                {filteredTeachers.length === 0 ? (
                  <div className="text-xs text-slate-400 py-1 pl-2">No matching teachers</div>
                ) : (
                  <div className="space-y-1">
                    {filteredTeachers.map((tch) => (
                      <Link
                        key={tch.id}
                        href={`/teachers`}
                        onClick={() => setSearchOpen(false)}
                        className="flex items-center justify-between p-2.5 rounded-lg hover:bg-slate-50 transition-colors border border-transparent hover:border-slate-200 group"
                      >
                        <div className="flex items-center gap-2.5">
                          <img src={tch.avatar} alt={tch.name} className="w-7 h-7 rounded-full object-cover" />
                          <div>
                            <div className="text-xs font-bold text-[#0F2942] group-hover:text-[#2563EB]">
                              {tch.name}
                            </div>
                            <div className="text-[11px] text-slate-500">{tch.specialization}</div>
                          </div>
                        </div>
                        <span className="text-xs font-semibold text-[#2563EB]">${tch.hourlyRate}/hr</span>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            </>
          )}
        </div>
        <div className="p-3 bg-slate-50 border-t border-slate-200 text-[10px] text-slate-400 flex items-center justify-between">
          <span>Press <kbd className="px-1 py-0.5 bg-white border rounded font-mono">ESC</kbd> to exit search</span>
          <span>AI Lab Simulator Engine</span>
        </div>
      </div>
    </div>
  );
};
