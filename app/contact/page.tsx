'use client';

import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export default function ContactPage() {
  const { showToast } = useApp();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    showToast('Thank you! Your message has been sent to support.', 'success');
    setName('');
    setEmail('');
    setMessage('');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      
      {/* Title */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <span className="text-xs font-bold text-[#2563EB] uppercase tracking-wider bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
          Get in Touch
        </span>
        <h1 className="text-3xl font-extrabold text-[#0F2942] tracking-tight">
          Contact Academic Support & Partnerships
        </h1>
        <p className="text-xs text-slate-600">Have questions about university campus licenses or technical lab inquiries?</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Contact Info */}
        <div className="lg:col-span-5 space-y-6">
          <div className="academic-card p-6 space-y-4">
            <h3 className="font-bold text-base text-[#0F2942]">Contact Information</h3>
            
            <div className="space-y-3 text-xs">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center text-[#2563EB]">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-slate-400">Email Address</div>
                  <div className="font-bold text-slate-800">support@ailabsimulator.com</div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-emerald-50 flex items-center justify-center text-emerald-600">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-slate-400">Phone Support</div>
                  <div className="font-bold text-slate-800">+1 (800) 555-LABS</div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-purple-50 flex items-center justify-center text-purple-600 shrink-0">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-slate-400">Headquarters</div>
                  <div className="font-bold text-slate-800">Palo Alto Science & Tech Center, CA 94301</div>
                </div>
              </div>
            </div>
          </div>

          <div className="academic-card h-48 bg-slate-50 flex flex-col items-center justify-center space-y-2 text-slate-400 text-xs">
            <MapPin className="w-6 h-6 text-[#2563EB]" />
            <div className="font-bold text-slate-700">Palo Alto Office Location Map</div>
            <div className="text-[10px]">37.4419° N, 122.1430° W</div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="lg:col-span-7 academic-card p-8 space-y-6">
          <h3 className="font-bold text-lg text-[#0F2942]">Send Us a Message</h3>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Your Full Name</label>
              <input
                type="text"
                required
                placeholder="Alex Johnson"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3.5 py-2 text-xs rounded-lg border border-slate-300 bg-white text-slate-900 focus:outline-none focus:border-[#2563EB]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Email Address</label>
              <input
                type="email"
                required
                placeholder="alex@university.edu"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3.5 py-2 text-xs rounded-lg border border-slate-300 bg-white text-slate-900 focus:outline-none focus:border-[#2563EB]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Inquiry Details</label>
              <textarea
                required
                rows={4}
                placeholder="How can we assist your university or lab studies?"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full px-3.5 py-2 text-xs rounded-lg border border-slate-300 bg-white text-slate-900 resize-none focus:outline-none focus:border-[#2563EB]"
              />
            </div>

            <button
              type="submit"
              className="w-full py-2.5 rounded-lg bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs font-semibold shadow-xs flex items-center justify-center gap-1.5"
            >
              <Send className="w-4 h-4" />
              Send Message
            </button>
          </form>
        </div>

      </div>
    </div>
  );
}
