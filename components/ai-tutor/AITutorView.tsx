'use client';

import React, { useState } from 'react';
import { 
  Bot, 
  Send, 
  Mic, 
  Paperclip, 
  FileText, 
  Sparkles, 
  Trash2, 
  HelpCircle, 
  Zap, 
  Upload,
  X,
  Plus,
  MessageSquare,
  FileCheck
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { uploadDocumentToStorage } from '../../lib/storageService';

export const AITutorView: React.FC = () => {
  const { aiMessages, sendAIMessage, clearAIChat, showToast } = useApp();
  const [inputText, setInputText] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [uploadModalOpen, setUploadModalOpen] = useState(false);
  const [uploadedFileName, setUploadedFileName] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [activeChatId, setActiveChatId] = useState<string>('chat-1');

  const recentChats = [
    { id: 'chat-1', title: 'Pendulum Formula & Motion', time: '10m ago' },
    { id: 'chat-2', title: "Ohm's Law Circuit Calculations", time: '2h ago' },
    { id: 'chat-3', title: 'Acid-Base Titration Equivalence', time: 'Yesterday' }
  ];

  const suggestedPrompts = [
    "Explain Simple Pendulum formula in simple terms",
    "How does Phenolphthalein indicator work in titration?",
    "What is the time complexity of Binary Search?",
    "How do I calculate Ohm's law current for a 220Ω resistor?"
  ];

  const handleSend = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!inputText.trim() && !uploadedFileName) return;

    let textToSend = inputText;
    if (uploadedFileName) {
      textToSend = `[Uploaded Document: ${uploadedFileName}] ` + textToSend;
    }

    sendAIMessage(textToSend);
    setInputText('');
    setUploadedFileName(null);
  };

  const handleQuickAction = (actionType: 'notes' | 'summary' | 'quiz') => {
    if (actionType === 'notes') {
      sendAIMessage("Generate interactive study notes for my last experiment", 'notes');
    } else if (actionType === 'summary') {
      sendAIMessage("Summarize the key formula and concept simply", 'summary');
    } else if (actionType === 'quiz') {
      sendAIMessage("Create a 5-question quick quiz for me", 'quiz');
    }
  };

  const handleVoiceToggle = () => {
    setIsListening(!isListening);
    if (!isListening) {
      showToast('Voice Mic listening... Speak now!', 'info');
      setTimeout(() => {
        setInputText("Can you summarize the Pendulum period formula?");
        setIsListening(false);
        showToast('Voice transcribed: "Can you summarize the Pendulum period formula?"', 'success');
      }, 2500);
    }
  };

  const handleRealFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    showToast(`Uploading ${file.name} to Firebase Storage...`, 'info');
    
    const result = await uploadDocumentToStorage(file, 'ai_tutor_uploads');
    setUploadedFileName(result.fileName);
    setUploading(false);
    setUploadModalOpen(false);
    showToast(`Uploaded ${result.fileName} to Firebase Storage!`, 'success');
  };

  const handleSimulatedFileUpload = (fileName: string) => {
    setUploadedFileName(fileName);
    setUploadModalOpen(false);
    showToast(`Attached ${fileName} for AI analysis!`, 'success');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      
      {/* Interface Container */}
      <div className="glass-card overflow-hidden grid grid-cols-1 lg:grid-cols-12 min-h-[660px] border border-slate-200 shadow-xl">
        
        {/* LEFT SIDEBAR */}
        <div className="lg:col-span-4 border-r border-slate-200/80 p-5 bg-slate-50/70 space-y-6 flex flex-col justify-between">
          <div className="space-y-5">
            
            {/* AI Tutor Profile */}
            <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-white border border-slate-200/80 shadow-2xs">
              <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-[#0F2942] to-[#2563EB] text-white flex items-center justify-center font-bold shadow-md">
                <Bot className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-sm text-[#0F2942] flex items-center gap-1.5">
                  Dr. Nova AI
                  <span className="flex h-2 w-2 relative">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                  </span>
                </h3>
                <p className="text-[11px] text-slate-500 font-medium">Virtual Science Professor</p>
              </div>
            </div>

            {/* New Chat Button */}
            <button
              onClick={clearAIChat}
              className="w-full py-2.5 px-3 rounded-xl bg-[#0F2942] hover:bg-[#153454] text-white text-xs font-bold flex items-center justify-center gap-2 shadow-xs transition-all"
            >
              <Plus className="w-4 h-4" /> New Conversation
            </button>

            {/* Quick Actions */}
            <div className="space-y-2">
              <div className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400">Quick AI Actions</div>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => handleQuickAction('summary')}
                  className="p-2.5 rounded-xl border border-slate-200 bg-white hover:bg-blue-50 hover:text-[#2563EB] text-[11px] font-semibold text-slate-700 transition-all flex items-center gap-1.5 shadow-2xs"
                >
                  <Zap className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                  Explain Simply
                </button>
                <button
                  type="button"
                  onClick={() => handleQuickAction('summary')}
                  className="p-2.5 rounded-xl border border-slate-200 bg-white hover:bg-blue-50 hover:text-[#2563EB] text-[11px] font-semibold text-slate-700 transition-all flex items-center gap-1.5 shadow-2xs"
                >
                  <FileText className="w-3.5 h-3.5 text-blue-500 shrink-0" />
                  Summarize
                </button>
                <button
                  type="button"
                  onClick={() => handleQuickAction('quiz')}
                  className="p-2.5 rounded-xl border border-slate-200 bg-white hover:bg-blue-50 hover:text-[#2563EB] text-[11px] font-semibold text-slate-700 transition-all flex items-center gap-1.5 shadow-2xs"
                >
                  <HelpCircle className="w-3.5 h-3.5 text-purple-500 shrink-0" />
                  Generate Quiz
                </button>
                <button
                  type="button"
                  onClick={() => handleQuickAction('notes')}
                  className="p-2.5 rounded-xl border border-slate-200 bg-white hover:bg-blue-50 hover:text-[#2563EB] text-[11px] font-semibold text-slate-700 transition-all flex items-center gap-1.5 shadow-2xs"
                >
                  <FileCheck className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                  Generate Notes
                </button>
              </div>
            </div>

            {/* Recent & Saved Chats */}
            <div className="space-y-2">
              <div className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400">Recent Chats</div>
              <div className="space-y-1">
                {recentChats.map((c) => (
                  <button
                    key={c.id}
                    onClick={() => setActiveChatId(c.id)}
                    className={`w-full text-left p-2.5 rounded-xl text-xs flex items-center justify-between transition-colors ${
                      activeChatId === c.id 
                        ? 'bg-blue-50 text-[#2563EB] font-bold border border-blue-200/80 shadow-2xs' 
                        : 'text-slate-700 hover:bg-white border border-transparent'
                    }`}
                  >
                    <span className="flex items-center gap-2 truncate">
                      <MessageSquare className="w-3.5 h-3.5 shrink-0 text-slate-400" />
                      <span className="truncate">{c.title}</span>
                    </span>
                    <span className="text-[10px] text-slate-400 font-normal shrink-0">{c.time}</span>
                  </button>
                ))}
              </div>
            </div>

          </div>

          {/* Clear History */}
          <button
            onClick={clearAIChat}
            className="w-full py-2.5 rounded-xl border border-slate-200 bg-white hover:bg-red-50 text-xs font-bold text-slate-600 hover:text-red-600 transition-colors flex items-center justify-center gap-1.5"
          >
            <Trash2 className="w-3.5 h-3.5" /> Clear History
          </button>
        </div>

        {/* RIGHT MAIN CHAT AREA */}
        <div className="lg:col-span-8 flex flex-col justify-between h-[660px] bg-white">
          
          {/* Feed */}
          <div className="flex-1 p-6 overflow-y-auto space-y-4">
            {aiMessages.map((msg) => (
              <div
                key={msg.id}
                className={`flex items-start gap-3 ${msg.sender === 'user' ? 'flex-row-reverse' : ''}`}
              >
                <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 text-white font-bold text-xs shadow-md ${
                  msg.sender === 'user' ? 'bg-[#0F2942]' : 'bg-gradient-to-tr from-[#2563EB] to-[#06B6D4]'
                }`}>
                  {msg.sender === 'user' ? 'YOU' : <Bot className="w-4 h-4" />}
                </div>

                <div className={`max-w-lg p-4 rounded-2xl text-xs space-y-1.5 shadow-2xs ${
                  msg.sender === 'user'
                    ? 'bg-[#0F2942] text-white rounded-tr-none'
                    : 'bg-slate-50 text-slate-800 rounded-tl-none border border-slate-200'
                }`}>
                  <div className="flex items-center justify-between text-[10px] opacity-70 mb-1 font-bold">
                    <span>{msg.sender === 'user' ? 'Student' : 'Dr. Nova AI'}</span>
                    <span>{msg.timestamp}</span>
                  </div>
                  <div className="whitespace-pre-line leading-relaxed">{msg.text}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Quick Prompt Chips */}
          <div className="px-6 py-2.5 border-t border-slate-100 bg-slate-50/50 overflow-x-auto flex items-center gap-2">
            <span className="text-[10px] font-extrabold text-slate-400 uppercase shrink-0 flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-[#2563EB]" /> Suggested:
            </span>
            {suggestedPrompts.map((p, i) => (
              <button
                key={i}
                onClick={() => { setInputText(p); }}
                className="px-3 py-1 rounded-full bg-white border border-slate-200/80 text-[11px] font-semibold text-slate-700 hover:border-[#2563EB] hover:text-[#2563EB] whitespace-nowrap shadow-2xs transition-all"
              >
                {p}
              </button>
            ))}
          </div>

          {/* Input Bar */}
          <form onSubmit={handleSend} className="p-4 border-t border-slate-200 bg-white flex items-center gap-2">
            
            {/* Upload Button */}
            <button
              type="button"
              onClick={() => setUploadModalOpen(true)}
              className="p-2.5 rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-600 transition-colors"
              title="Upload PDF or Image"
            >
              <Paperclip className="w-4 h-4" />
            </button>

            {/* Voice Button */}
            <button
              type="button"
              onClick={handleVoiceToggle}
              className={`p-2.5 rounded-xl border transition-all ${
                isListening
                  ? 'bg-red-500 text-white border-red-500 animate-pulse shadow-md'
                  : 'border-slate-200 bg-slate-50 text-slate-600 hover:bg-slate-100'
              }`}
              title="Voice Input"
            >
              <Mic className="w-4 h-4" />
            </button>

            {/* Text Input */}
            <input
              type="text"
              placeholder={uploadedFileName ? `Attached: ${uploadedFileName} - Ask question...` : "Ask any science question..."}
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              className="flex-1 px-4 py-2.5 text-xs rounded-xl border border-slate-200 bg-slate-50 text-slate-900 focus:outline-none focus:border-[#2563EB] shadow-2xs"
            />

            {/* Send Button */}
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs font-bold shadow-md transition-all flex items-center gap-1.5"
            >
              <span>Send</span>
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>

        </div>

      </div>

      {/* Upload File Modal */}
      {uploadModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 border border-slate-200 max-w-sm w-full space-y-4 relative shadow-2xl">
            <button onClick={() => setUploadModalOpen(false)} className="absolute top-4 right-4 text-slate-400">
              <X className="w-4 h-4" />
            </button>
            
            <h3 className="font-bold text-base text-[#0F2942]">Upload Image or PDF</h3>
            <p className="text-xs text-slate-500">Attach a lab manual PDF or experiment diagram image for AI analysis.</p>

            <div className="space-y-3">
              <label className="w-full p-3.5 rounded-xl border border-dashed border-[#2563EB] bg-blue-50/50 hover:bg-blue-50 text-xs font-bold text-[#2563EB] flex items-center justify-center gap-2 cursor-pointer transition-all">
                {uploading ? (
                  <svg className="w-4 h-4 animate-spin text-[#2563EB]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <circle cx="12" cy="12" r="10" strokeOpacity="0.25" />
                    <path d="M12 2a10 10 0 0 1 10 10" />
                  </svg>
                ) : (
                  <Upload className="w-4 h-4" />
                )}
                {uploading ? 'Uploading to Storage...' : 'Upload Image or PDF File'}
                <input
                  type="file"
                  accept=".pdf,image/*"
                  onChange={handleRealFileUpload}
                  className="hidden"
                />
              </label>

              <div className="text-[10px] text-slate-400 text-center font-extrabold uppercase">Or Choose Sample File</div>

              <button
                onClick={() => handleSimulatedFileUpload('Sample_Physics_Diagram.png')}
                className="w-full p-3 rounded-xl border border-slate-200 hover:bg-slate-50 text-xs font-semibold text-slate-700 flex items-center gap-2 shadow-2xs"
              >
                <FileText className="w-4 h-4 text-blue-500" />
                Sample_Physics_Diagram.png
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
