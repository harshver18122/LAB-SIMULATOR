'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  ArrowLeft, 
  Bookmark, 
  Share2, 
  Download, 
  Sparkles, 
  CheckCircle2, 
  AlertTriangle, 
  FlaskConical, 
  FileText, 
  HelpCircle, 
  Plus, 
  ShieldAlert,
  Bot,
  Send,
  Save,
  Check
} from 'lucide-react';
import { LabExperiment, ObservationRow } from '../../types';
import { useApp } from '../../context/AppContext';
import { PhysicsPendulum } from './simulations/PhysicsPendulum';
import { ChemistryTitration } from './simulations/ChemistryTitration';
import { BiologyMicroscope } from './simulations/BiologyMicroscope';
import { ProgrammingEditor } from './simulations/ProgrammingEditor';
import { ElectronicsCircuit } from './simulations/ElectronicsCircuit';

export const LabDetailsView: React.FC<{ experiment: LabExperiment }> = ({ experiment }) => {
  const { toggleBookmark, addReport, user, showToast } = useApp();
  const [observations, setObservations] = useState<ObservationRow[]>(experiment.defaultObservations);
  const [userAnswers, setUserAnswers] = useState<{ [qId: string]: number }>({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [showQuizModal, setShowQuizModal] = useState(false);
  
  // Right side AI Assistant State
  const [aiQuestion, setAiQuestion] = useState('');
  const [chatLog, setChatLog] = useState<{ sender: 'user' | 'ai'; text: string }[]>([
    { sender: 'ai', text: `Hello! I am your AI Lab Tutor for ${experiment.title}. Ask me any question or pick a suggested topic below.` }
  ]);

  // Render simulation component
  const renderSimulation = () => {
    switch (experiment.subject) {
      case 'physics': return <PhysicsPendulum />;
      case 'chemistry': return <ChemistryTitration />;
      case 'biology': return <BiologyMicroscope />;
      case 'programming': return <ProgrammingEditor />;
      case 'electronics': return <ElectronicsCircuit />;
      default: return <PhysicsPendulum />;
    }
  };

  const handleAddObservation = () => {
    const nextTrial = observations.length + 1;
    const newRow: ObservationRow = {
      id: Date.now().toString(),
      trial: nextTrial,
      variable1: '0.85',
      variable2: '18.50',
      calculatedResult: experiment.resultFormula.includes('T =') ? '1.85' : '9.81'
    };
    setObservations([...observations, newRow]);
    showToast('New trial row added to Observation Table', 'info');
  };

  const handleGenerateReport = () => {
    const newReport = {
      id: `rpt-${Date.now()}`,
      experimentId: experiment.id,
      experimentTitle: experiment.title,
      subject: experiment.subject,
      date: new Date().toISOString().split('T')[0],
      studentName: user.name,
      aim: experiment.aim,
      theory: experiment.theory,
      procedureSummary: experiment.procedure.slice(0, 3).join(' '),
      observations,
      calculatedResult: experiment.expectedResult,
      conclusion: experiment.conclusion,
      aiInsights: experiment.aiExplanation,
      scoreGrade: 'A+'
    };
    addReport(newReport);
    showToast('Standardized PDF Lab Report generated successfully!', 'success');
  };

  const handleAskAI = (promptText?: string) => {
    const query = promptText || aiQuestion;
    if (!query.trim()) return;

    const newLog = [...chatLog, { sender: 'user' as const, text: query }];
    setChatLog(newLog);
    setAiQuestion('');

    let reply = `In ${experiment.title}, the physical outcome is directly governed by ${experiment.resultFormula}. Keep your measurements precise!`;
    if (query.toLowerCase().includes('voltage')) {
      reply = "Voltage (V) increases proportionally with Current (I) when Resistance (R) stays constant according to Ohm's Law (V = I × R).";
    } else if (query.toLowerCase().includes('formula')) {
      reply = `Key Formula for this lab: ${experiment.resultFormula}. Apply consistent units before calculating averages.`;
    } else if (query.toLowerCase().includes('viva')) {
      reply = `Viva Question: ${experiment.vivaQuestions[0]?.q || 'What source of systematic error occurs in this apparatus?'}\nAnswer: ${experiment.vivaQuestions[0]?.a || 'Zero calibration error.'}`;
    }

    setTimeout(() => {
      setChatLog((prev) => [...prev, { sender: 'ai', text: reply }]);
    }, 400);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      
      {/* Section 9 Top Breadcrumb & Title Header */}
      <div className="space-y-2">
        <nav className="flex items-center gap-2 text-xs text-slate-500">
          <Link href="/labs" className="hover:text-[#2563EB]">Labs</Link>
          <span>/</span>
          <span className="capitalize">{experiment.subject}</span>
          <span>/</span>
          <span className="font-semibold text-slate-800">{experiment.title}</span>
        </nav>

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pt-1">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0F2942] tracking-tight">
              {experiment.title}
            </h1>
            <div className="flex items-center gap-3 mt-2 text-xs font-semibold text-slate-600">
              <span className="px-2.5 py-0.5 rounded bg-blue-50 text-[#2563EB] border border-blue-200 capitalize">
                {experiment.subject}
              </span>
              <span>•</span>
              <span className="px-2.5 py-0.5 rounded bg-slate-100 text-slate-700">
                {experiment.difficulty}
              </span>
              <span>•</span>
              <span>Est. Time: {experiment.duration}</span>
            </div>
          </div>

          {/* Action Header Controls */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => toggleBookmark(experiment.id)}
              className={`px-3.5 py-2 rounded-lg text-xs font-semibold border flex items-center gap-1.5 transition-colors ${
                experiment.isBookmarked
                  ? 'bg-amber-500 text-white border-amber-500'
                  : 'bg-white border-slate-300 text-slate-700 hover:bg-slate-50'
              }`}
            >
              <Bookmark className="w-3.5 h-3.5 fill-current" />
              {experiment.isBookmarked ? 'Saved' : 'Save Experiment'}
            </button>
            <button
              onClick={handleGenerateReport}
              className="px-4 py-2 rounded-lg bg-[#0F2942] hover:bg-[#153454] text-white text-xs font-semibold shadow-xs transition-all flex items-center gap-1.5"
            >
              <FileText className="w-3.5 h-3.5" />
              Generate Report
            </button>
            <button
              onClick={() => setShowQuizModal(true)}
              className="px-4 py-2 rounded-lg bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs font-semibold shadow-xs transition-all flex items-center gap-1.5"
            >
              <HelpCircle className="w-3.5 h-3.5" />
              Take Quiz
            </button>
          </div>
        </div>
      </div>

      {/* Main 3-Column Laboratory Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* LEFT COLUMN: Aim, Theory, Apparatus, Procedure, Safety */}
        <div className="lg:col-span-3 space-y-4">
          
          {/* Aim & Theory */}
          <div className="academic-card p-4 space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#2563EB] flex items-center gap-1.5">
              <FlaskConical className="w-4 h-4" /> Aim & Theory
            </h3>
            <div>
              <p className="text-xs font-bold text-[#0F2942]">Aim:</p>
              <p className="text-xs text-slate-600 leading-relaxed mt-0.5">{experiment.aim}</p>
            </div>
            <div className="pt-2 border-t border-slate-100">
              <p className="text-xs font-bold text-[#0F2942]">Theory:</p>
              <p className="text-xs text-slate-600 leading-relaxed mt-0.5 line-clamp-6">{experiment.theory}</p>
            </div>
          </div>

          {/* Apparatus */}
          <div className="academic-card p-4 space-y-2">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700">Apparatus Required</h3>
            <ul className="space-y-1.5 text-xs text-slate-600">
              {experiment.apparatus.map((item, idx) => (
                <li key={idx} className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Procedure */}
          <div className="academic-card p-4 space-y-2">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700">Procedure</h3>
            <ol className="space-y-2 text-xs text-slate-600">
              {experiment.procedure.map((step, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="w-4 h-4 rounded-full bg-slate-200 text-slate-700 font-bold text-[10px] flex items-center justify-center shrink-0 mt-0.5">
                    {idx + 1}
                  </span>
                  <span>{step}</span>
                </li>
              ))}
            </ol>
          </div>

          {/* Safety */}
          <div className="bg-rose-50 border border-rose-200 rounded-xl p-4 space-y-2">
            <h3 className="text-xs font-bold uppercase tracking-wider text-rose-800 flex items-center gap-1.5">
              <AlertTriangle className="w-4 h-4 text-rose-600" /> Safety Instructions
            </h3>
            <ul className="space-y-1 text-xs text-rose-900">
              {experiment.safetyInstructions.map((item, idx) => (
                <li key={idx}>• {item}</li>
              ))}
            </ul>
          </div>

        </div>

        {/* CENTER COLUMN: Large Interactive Simulation Workbench */}
        <div className="lg:col-span-6 space-y-4">
          <div className="academic-card p-4 space-y-3">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <span className="text-xs font-bold text-[#0F2942] uppercase tracking-wider flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                Virtual Simulation Workbench
              </span>
              <span className="text-[11px] font-mono bg-slate-100 text-slate-600 px-2 py-0.5 rounded">Interactive Mode</span>
            </div>

            {/* Simulation Canvas */}
            <div className="min-h-[380px] bg-slate-900 rounded-xl overflow-hidden p-2">
              {renderSimulation()}
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: AI Assistant Sidebar Panel */}
        <div className="lg:col-span-3 space-y-4">
          <div className="academic-card p-4 space-y-3 flex flex-col justify-between h-[460px]">
            <div>
              <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
                <div className="w-7 h-7 rounded-lg bg-[#2563EB] text-white flex items-center justify-center">
                  <Bot className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-xs font-bold text-[#0F2942]">AI Lab Assistant</h3>
                  <p className="text-[10px] text-slate-400">Dr. Nova • 24/7 Guidance</p>
                </div>
              </div>

              {/* Chat Log Window */}
              <div className="mt-3 space-y-2 h-44 overflow-y-auto pr-1">
                {chatLog.map((msg, i) => (
                  <div
                    key={i}
                    className={`p-2.5 rounded-lg text-xs ${
                      msg.sender === 'user'
                        ? 'bg-blue-50 text-[#0F2942] border border-blue-100 ml-4 font-medium'
                        : 'bg-slate-50 text-slate-700 border border-slate-200 leading-relaxed'
                    }`}
                  >
                    {msg.text}
                  </div>
                ))}
              </div>

              {/* Suggested Questions Chips */}
              <div className="mt-3 pt-3 border-t border-slate-100 space-y-1.5">
                <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Suggested Questions:</p>
                <div className="flex flex-col gap-1">
                  {[
                    'Explain this experiment',
                    'Why does voltage increase?',
                    'Help me understand the formula',
                    'Give me a viva question'
                  ].map((q, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => handleAskAI(q)}
                      className="text-left text-[11px] px-2 py-1 rounded bg-slate-100 hover:bg-blue-50 hover:text-[#2563EB] text-slate-700 transition-colors font-medium"
                    >
                      • {q}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Input Bar */}
            <div className="pt-2 border-t border-slate-100">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleAskAI();
                }}
                className="flex items-center gap-1.5"
              >
                <input
                  type="text"
                  placeholder="Ask anything about this experiment..."
                  value={aiQuestion}
                  onChange={(e) => setAiQuestion(e.target.value)}
                  className="w-full px-3 py-1.5 text-xs rounded-lg border border-slate-200 bg-white text-slate-800 focus:outline-none focus:border-[#2563EB]"
                />
                <button
                  type="submit"
                  className="p-1.5 rounded-lg bg-[#2563EB] text-white hover:bg-[#1D4ED8] transition-colors shrink-0"
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </form>
            </div>

          </div>
        </div>

      </div>

      {/* BOTTOM SECTION: Observation Table, Calculations, Result, Conclusion */}
      <div className="academic-card p-6 space-y-6">
        
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <div>
            <h3 className="text-base font-bold text-[#0F2942]">Observation Table & Calculations</h3>
            <p className="text-xs text-slate-500">Record trial measurements and verify physical formulas.</p>
          </div>
          <button
            onClick={handleAddObservation}
            className="px-3.5 py-1.5 rounded-lg bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs font-semibold flex items-center gap-1.5 shadow-xs"
          >
            <Plus className="w-4 h-4" /> Add Trial Row
          </button>
        </div>

        {/* Observations Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-50 text-[#0F2942] font-bold border-b border-slate-200">
                <th className="p-3">Trial #</th>
                <th className="p-3">{experiment.observationHeaders.col1}</th>
                <th className="p-3">{experiment.observationHeaders.col2}</th>
                <th className="p-3">{experiment.observationHeaders.col3}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {observations.map((obs) => (
                <tr key={obs.id} className="hover:bg-slate-50">
                  <td className="p-3 font-bold text-[#0F2942]">Trial #{obs.trial}</td>
                  <td className="p-3 font-mono">{obs.variable1}</td>
                  <td className="p-3 font-mono">{obs.variable2}</td>
                  <td className="p-3 font-mono font-bold text-[#2563EB]">{obs.calculatedResult}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Calculations & Results */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-slate-100">
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Formula Used:</span>
            <p className="text-xs font-mono font-bold text-[#2563EB] mt-1">{experiment.resultFormula}</p>
          </div>
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Expected Result:</span>
            <p className="text-xs font-semibold text-slate-800 mt-1">{experiment.expectedResult}</p>
          </div>
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Conclusion:</span>
            <p className="text-xs text-slate-600 mt-1 leading-relaxed">{experiment.conclusion}</p>
          </div>
        </div>

      </div>

      {/* Quiz Modal */}
      {showQuizModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 max-w-lg w-full space-y-4 shadow-2xl max-h-[85vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="font-bold text-base text-[#0F2942]">
                Interactive Quiz: {experiment.title}
              </h3>
              <button 
                onClick={() => setShowQuizModal(false)}
                className="text-slate-400 hover:text-slate-600 font-bold"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4">
              {experiment.quiz.map((q, idx) => (
                <div key={q.id} className="p-3.5 bg-slate-50 rounded-xl space-y-2 border border-slate-200">
                  <p className="text-xs font-bold text-[#0F2942]">Q{idx + 1}. {q.question}</p>
                  <div className="grid grid-cols-1 gap-1.5">
                    {q.options.map((opt, optIdx) => (
                      <button
                        key={optIdx}
                        onClick={() => setUserAnswers({ ...userAnswers, [q.id]: optIdx })}
                        className={`text-left text-xs p-2 rounded-lg font-medium border transition-colors ${
                          userAnswers[q.id] === optIdx
                            ? 'bg-[#2563EB] text-white border-[#2563EB]'
                            : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
                        }`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
              <button
                onClick={() => setShowQuizModal(false)}
                className="px-4 py-2 bg-slate-100 text-slate-700 font-semibold text-xs rounded-lg"
              >
                Close
              </button>
              <button
                onClick={() => {
                  setQuizSubmitted(true);
                  showToast('Quiz submitted successfully! Score recorded.', 'success');
                  setShowQuizModal(false);
                }}
                className="px-4 py-2 bg-[#2563EB] text-white font-semibold text-xs rounded-lg hover:bg-[#1D4ED8]"
              >
                Submit Quiz
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
