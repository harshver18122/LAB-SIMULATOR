'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Search, Filter, Bookmark, Star, Clock, ArrowRight, Atom, Beaker, Dna, Code2, Zap } from 'lucide-react';
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
      case 'programming': return <Code2 className="w-4 h-4 text-amber-600" />;
      case 'electronics': return <Zap className="w-4 h-4 text-indigo-600" />;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-[#0F2942] tracking-tight">
            Explore Virtual Labs
          </h1>
          <p className="text-xs text-slate-600 mt-1">
            Conduct STEM experiments online with real-time controls, data tables, and AI explanations.
          </p>
        </div>

        {/* Search Input */}
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
          <input
            type="text"
            placeholder="Search experiments..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 text-xs rounded-lg border border-slate-300 bg-white text-slate-900 focus:outline-none focus:border-[#2563EB]"
          />
        </div>
      </div>

      {/* Filters Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-200">
        
        {/* Subject Category Pills */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => setSelectedSubject('all')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              selectedSubject === 'all'
                ? 'bg-[#0F2942] text-white shadow-xs'
                : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
            }`}
          >
            All ({experiments.length})
          </button>
          {(['physics', 'chemistry', 'biology', 'electronics', 'programming'] as SubjectCategory[]).map((sub) => (
            <button
              key={sub}
              onClick={() => setSelectedSubject(sub)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold capitalize flex items-center gap-1.5 transition-all ${
                selectedSubject === sub
                  ? 'bg-[#0F2942] text-white shadow-xs'
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
            className="px-3 py-1.5 text-xs rounded-lg border border-slate-200 bg-white text-slate-800 font-semibold"
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
        <div className="academic-card p-12 text-center">
          <p className="text-sm font-semibold text-slate-600">No experiments completed yet or matching filters.</p>
          <button 
            onClick={() => { setSelectedSubject('all'); setDifficultyFilter('all'); setSearchQuery(''); }} 
            className="mt-3 text-xs font-bold text-[#2563EB] hover:underline"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((exp) => (
            <div
              key={exp.id}
              className="academic-card overflow-hidden flex flex-col justify-between group"
            >
              {/* Image Header */}
              <div className="relative h-44 overflow-hidden bg-slate-100">
                <img
                  src={exp.image}
                  alt={exp.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                
                {/* Subject Badge */}
                <div className="absolute top-3 left-3 bg-white/95 text-[#0F2942] text-[10px] font-bold px-2.5 py-1 rounded-full shadow-xs flex items-center gap-1.5 capitalize">
                  {getSubjectIcon(exp.subject)}
                  {exp.subject}
                </div>

                {/* Bookmark Button */}
                <button
                  onClick={() => toggleBookmark(exp.id)}
                  className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-xs transition-colors ${
                    exp.isBookmarked ? 'bg-amber-500 text-white' : 'bg-slate-900/60 text-white hover:bg-slate-900'
                  }`}
                  title={exp.isBookmarked ? 'Bookmarked' : 'Bookmark'}
                >
                  <Bookmark className="w-3.5 h-3.5 fill-current" />
                </button>
              </div>

              {/* Body */}
              <div className="p-5 space-y-3 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between text-[11px] text-slate-500 mb-1.5">
                    <span className="font-semibold px-2 py-0.5 bg-slate-100 rounded text-slate-700">{exp.difficulty}</span>
                    <div className="flex items-center gap-3">
                      <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{exp.duration}</span>
                      <span className="flex items-center gap-1 text-amber-500 font-bold"><Star className="w-3 h-3 fill-amber-400" />{exp.rating}</span>
                    </div>
                  </div>

                  <h3 className="font-bold text-base text-[#0F2942] group-hover:text-[#2563EB] transition-colors leading-snug">
                    {exp.title}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed mt-1 line-clamp-2">{exp.aim}</p>
                </div>

                <Link
                  href={`/labs/${exp.id}`}
                  className="w-full py-2.5 rounded-lg bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs font-semibold shadow-xs transition-all flex items-center justify-center gap-1.5 mt-2"
                >
                  <span>Start Experiment</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}

    </div>
  );
};
