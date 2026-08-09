'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Search, Filter, Bookmark, Star, Clock, ArrowRight, Atom, Beaker, Dna, Code2, Zap, Sparkles, X } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { SubjectCategory } from '../../types';

export const LabHub: React.FC = () => {
  const { experiments, toggleBookmark } = useApp();
  const [selectedSubject, setSelectedSubject] = useState<SubjectCategory | 'all'>('all');
  const [difficultyFilter, setDifficultyFilter] = useState<'all' | 'Beginner' | 'Intermediate' | 'Advanced'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filtered = experiments.filter((exp) => {
    const matchSubject = selectedSubject === 'all' || exp.subject === selectedSubject;
    const matchDiff = difficultyFilter === 'all' || exp.difficulty === difficultyFilter;
    const matchQuery = exp.title.toLowerCase().includes(searchQuery.toLowerCase()) || exp.aim.toLowerCase().includes(searchQuery.toLowerCase());
    return matchSubject && matchDiff && matchQuery;
  });

  const getSubjectIcon = (sub: SubjectCategory) => {
    switch (sub) {
      case 'physics': return <Atom className="w-4 h-4 text-blue-600" />;
      case 'chemistry': return <Beaker className="w-4 h-4 text-emerald-600" />;
      case 'biology': return <Dna className="w-4 h-4 text-purple-600" />;
      case 'programming': return <Code2 className="w-4 h-4 text-cyan-600" />;
      case 'electronics': return <Zap className="w-4 h-4 text-amber-600" />;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <span className="text-[11px] font-extrabold uppercase tracking-wider text-[#2563EB] bg-blue-50 px-3 py-1 rounded-full border border-blue-200/60 inline-flex items-center gap-1.5 mb-2">
            <Sparkles className="w-3.5 h-3.5" /> Interactive STEM Workspace
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#0F2942] tracking-tight">
            Explore Virtual Labs
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            Conduct STEM experiments online with real-time controls, observation tables, and AI explanations.
          </p>
        </div>

        {/* Search Input */}
        <div className="relative w-full md:w-80 focus-within:md:w-96 transition-all duration-300 group">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3 pointer-events-none transition-colors group-focus-within:text-[#2563EB]" />
          <input
            type="text"
            placeholder="Search experiments by title or formula..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-9 py-2.5 text-xs font-medium rounded-2xl border border-slate-200/90 bg-white text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-[#2563EB] focus:ring-4 focus:ring-[#2563EB]/10 shadow-xs hover:shadow-md hover:border-slate-300 transition-all"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-2.5 p-0.5 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Filters Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-200/80">
        
        {/* Subject Category Pills */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => setSelectedSubject('all')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              selectedSubject === 'all'
                ? 'bg-[#0F2942] text-white shadow-md'
                : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
            }`}
          >
            All ({experiments.length})
          </button>
          {(['physics', 'chemistry', 'biology', 'electronics', 'programming'] as SubjectCategory[]).map((sub) => (
            <button
              key={sub}
              onClick={() => setSelectedSubject(sub)}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold capitalize flex items-center gap-1.5 transition-all ${
                selectedSubject === sub
                  ? 'bg-[#0F2942] text-white shadow-md'
                  : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
              }`}
            >
              {getSubjectIcon(sub)}
              {sub}
            </button>
          ))}
        </div>

        {/* Difficulty Selector */}
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-slate-400" />
          <select
            value={difficultyFilter}
            onChange={(e) => setDifficultyFilter(e.target.value as any)}
            className="px-3.5 py-2 text-xs rounded-xl border border-slate-200 bg-white text-slate-800 font-bold cursor-pointer"
          >
            <option value="all">All Difficulties</option>
            <option value="Beginner">Beginner</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Advanced">Advanced</option>
          </select>
        </div>

      </div>

      {/* Experiments Grid */}
      {filtered.length === 0 ? (
        <div className="glass-card p-12 text-center">
          <p className="text-sm font-bold text-slate-600">No experiments matching selected filters.</p>
          <button 
            onClick={() => { setSelectedSubject('all'); setDifficultyFilter('all'); setSearchQuery(''); }} 
            className="mt-3 px-4 py-2 rounded-lg bg-[#2563EB] text-white text-xs font-bold hover:bg-[#1D4ED8]"
          >
            Reset All Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((exp) => (
            <div
              key={exp.id}
              className="glass-card overflow-hidden flex flex-col justify-between group hover:border-[#2563EB]/40 transition-all duration-300"
            >
              {/* Image Header */}
              <div className="relative h-48 overflow-hidden bg-slate-100">
                <img
                  src={exp.image}
                  alt={exp.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                
                {/* Subject Badge */}
                <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-md text-[#0F2942] text-[10px] font-extrabold px-3 py-1 rounded-full shadow-md flex items-center gap-1.5 capitalize border border-slate-200">
                  {getSubjectIcon(exp.subject)}
                  {exp.subject}
                </div>

                {/* Bookmark Button */}
                <button
                  onClick={() => toggleBookmark(exp.id)}
                  className={`absolute top-3 right-3 p-2.5 rounded-full backdrop-blur-md transition-all shadow-sm ${
                    exp.isBookmarked ? 'bg-amber-500 text-white' : 'bg-slate-900/60 text-white hover:bg-slate-900'
                  }`}
                  title={exp.isBookmarked ? 'Bookmarked' : 'Bookmark'}
                >
                  <Bookmark className="w-3.5 h-3.5 fill-current" />
                </button>
              </div>

              {/* Body */}
              <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between text-[11px] text-slate-500 mb-2">
                    <span className="font-bold px-2.5 py-0.5 bg-slate-100 rounded-md text-slate-700">{exp.difficulty}</span>
                    <div className="flex items-center gap-3">
                      <span className="flex items-center gap-1 font-medium"><Clock className="w-3.5 h-3.5 text-slate-400" />{exp.duration}</span>
                      <span className="flex items-center gap-1 text-amber-500 font-bold"><Star className="w-3.5 h-3.5 fill-amber-400" />{exp.rating}</span>
                    </div>
                  </div>

                  <h3 className="font-bold text-lg text-[#0F2942] group-hover:text-[#2563EB] transition-colors leading-snug">
                    {exp.title}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed mt-1.5 line-clamp-2">{exp.aim}</p>
                </div>

                <Link
                  href={`/labs/${exp.id}`}
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-[#2563EB] to-[#1D4ED8] hover:from-[#1D4ED8] hover:to-[#1E40AF] text-white text-xs font-bold shadow-md transition-all flex items-center justify-center gap-2 group-hover:shadow-lg"
                >
                  <span>Launch Virtual Simulation</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}

    </div>
  );
};
