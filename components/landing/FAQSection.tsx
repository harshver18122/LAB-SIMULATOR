'use client';

import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';

export const FAQSection: React.FC = () => {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const faqs = [
    {
      q: 'Are the virtual lab formulas and simulations scientifically accurate?',
      a: 'Yes. Every virtual experiment is built upon standard scientific equations (such as Ohm\'s Law V=IR, Pendulum Period T=2π√(L/g), and Stoichiometry). Calculations match verified physical laboratory measurements.'
    },
    {
      q: 'Can teachers assign virtual experiments and grade student reports?',
      a: 'Absolutely. Teachers can toggle into "Teacher View", view submitted student observation reports, assign grades, and leave feedback stored securely in Cloud Firestore.'
    },
    {
      q: 'How does the 24/7 AI Science Tutor work?',
      a: 'The AI Tutor ("Dr. Nova") uses specialized STEM models to provide instant explanations, step-by-step formula derivations, and viva exam question practice tailored to your current experiment.'
    },
    {
      q: 'Do I need special hardware or plugins to run the simulations?',
      a: 'No. AI Lab Simulator runs directly in any modern Web Browser on desktop, tablet, or smartphone without installing extra software or browser extensions.'
    },
    {
      q: 'How do I download or share my experiment completion certificates?',
      a: 'Once you complete a lab and pass its quiz, a verified academic certificate with a unique tracking code is issued. You can view, download, or share it anytime from your Certificates page.'
    }
  ];

  return (
    <section className="bg-white py-16 lg:py-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-[#2563EB]">FAQ</span>
          <h2 className="text-3xl font-extrabold text-[#0F2942] tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-slate-600 text-sm">
            Everything you need to know about conducting STEM experiments digitally.
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, i) => {
            const isOpen = openIdx === i;
            return (
              <div
                key={i}
                className="academic-card overflow-hidden transition-colors"
              >
                <button
                  type="button"
                  onClick={() => setOpenIdx(isOpen ? null : i)}
                  className="w-full p-5 text-left flex items-center justify-between font-bold text-sm text-[#0F2942] hover:text-[#2563EB] transition-colors"
                >
                  <span className="flex items-center gap-2.5">
                    <HelpCircle className="w-4 h-4 text-[#2563EB] shrink-0" />
                    {faq.q}
                  </span>
                  <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${isOpen ? 'rotate-180 text-[#2563EB]' : ''}`} />
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 text-xs text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
