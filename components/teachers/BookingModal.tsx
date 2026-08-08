'use client';

import React, { useState } from 'react';
import { X, Video, Phone, MessageSquare, Calendar, Clock, CreditCard, CheckCircle2, ArrowRight } from 'lucide-react';
import { Teacher, ConsultationBooking } from '../../types';
import { useApp } from '../../context/AppContext';

interface BookingModalProps {
  teacher: Teacher;
  onClose: () => void;
}

export const BookingModal: React.FC<BookingModalProps> = ({ teacher, onClose }) => {
  const { addBooking, showToast } = useApp();
  const [step, setStep] = useState<1 | 2 | 3 | 4 | 5>(1);
  
  // Form selections
  const [selectedDate, setSelectedDate] = useState<string>('2026-08-10');
  const [selectedTime, setSelectedTime] = useState<string>('10:00 AM');
  const [sessionType, setSessionType] = useState<'video' | 'voice' | 'chat'>('video');
  const [bookingId, setBookingId] = useState<string>('');

  const handleConfirmBooking = () => {
    const bId = `BK-${Math.floor(100000 + Math.random() * 900000)}`;
    setBookingId(bId);

    const newBooking: ConsultationBooking = {
      id: bId,
      teacherId: teacher.id,
      teacherName: teacher.name,
      teacherAvatar: teacher.avatar,
      subject: teacher.subject,
      sessionType,
      date: selectedDate,
      time: selectedTime,
      status: 'upcoming',
      meetingUrl: `https://meet.ailabsimulator.com/room/${bId.toLowerCase()}`,
      amount: teacher.hourlyRate
    };

    addBooking(newBooking);
    setStep(5); // Success screen
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-md overflow-hidden relative p-6 space-y-5">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 font-bold"
        >
          <X className="w-5 h-5" />
        </button>

        {step < 5 ? (
          <>
            {/* Header & Steps */}
            <div>
              <h2 className="text-lg font-bold text-[#0F2942]">Book Session with {teacher.name}</h2>
              <p className="text-xs text-slate-500 mt-0.5">{teacher.qualification} • ${teacher.hourlyRate}/hr</p>
              
              <div className="flex items-center gap-1 mt-3 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                <span className={step >= 1 ? 'text-[#2563EB]' : ''}>1. Date</span>
                <span>→</span>
                <span className={step >= 2 ? 'text-[#2563EB]' : ''}>2. Time</span>
                <span>→</span>
                <span className={step >= 3 ? 'text-[#2563EB]' : ''}>3. Type</span>
                <span>→</span>
                <span className={step >= 4 ? 'text-[#2563EB]' : ''}>4. Confirm</span>
              </div>
            </div>

            {/* STEP 1: Choose Date */}
            {step === 1 && (
              <div className="space-y-3">
                <label className="block text-xs font-bold text-[#0F2942]">Step 1: Select Session Date</label>
                <input
                  type="date"
                  value={selectedDate}
                  min="2026-08-09"
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="w-full p-2.5 rounded-lg border border-slate-300 text-xs text-slate-800 font-semibold focus:outline-none focus:border-[#2563EB]"
                />
                <button
                  onClick={() => setStep(2)}
                  className="w-full py-2.5 rounded-lg bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs font-semibold shadow-xs flex items-center justify-center gap-1.5"
                >
                  <span>Next: Select Available Time</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            )}

            {/* STEP 2: Choose Available Time */}
            {step === 2 && (
              <div className="space-y-3">
                <label className="block text-xs font-bold text-[#0F2942]">Step 2: Select Available Time Slot</label>
                <div className="grid grid-cols-2 gap-2">
                  {['09:00 AM', '10:00 AM', '02:00 PM', '04:30 PM'].map((t) => (
                    <button
                      key={t}
                      type="button"
                      onClick={() => setSelectedTime(t)}
                      className={`p-2.5 rounded-lg text-xs font-semibold border flex items-center gap-2 transition-colors ${
                        selectedTime === t
                          ? 'bg-[#2563EB] text-white border-[#2563EB]'
                          : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      <Clock className="w-3.5 h-3.5" />
                      {t}
                    </button>
                  ))}
                </div>
                <div className="flex items-center gap-2 pt-2">
                  <button onClick={() => setStep(1)} className="py-2 px-3 rounded-lg border border-slate-300 text-xs font-semibold text-slate-600">Back</button>
                  <button
                    onClick={() => setStep(3)}
                    className="flex-1 py-2 rounded-lg bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs font-semibold shadow-xs flex items-center justify-center gap-1.5"
                  >
                    <span>Next: Select Consultation Type</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 3: Choose Consultation Type */}
            {step === 3 && (
              <div className="space-y-3">
                <label className="block text-xs font-bold text-[#0F2942]">Step 3: Select Consultation Format</label>
                <div className="space-y-2">
                  {([
                    { type: 'video' as const, label: 'Live Video Call', icon: Video, desc: '1-on-1 video & screen share review' },
                    { type: 'voice' as const, label: 'Audio Voice Session', icon: Phone, desc: 'Rapid audio discussion' },
                    { type: 'chat' as const, label: 'Text Chat Mentorship', desc: 'Asynchronous Q&A & code/math feedback' }
                  ] as { type: 'video' | 'voice' | 'chat'; label: string; icon: React.ComponentType<{ className?: string }>; desc: string }[]).map((m) => {
                    const IconComp = m.icon;
                    return (
                      <button
                        key={m.type}
                        type="button"
                        onClick={() => setSessionType(m.type)}
                        className={`w-full p-3 rounded-lg border text-left flex items-center gap-3 transition-colors ${
                          sessionType === m.type
                            ? 'bg-blue-50 border-[#2563EB] text-[#0F2942]'
                            : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                        }`}
                      >
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${sessionType === m.type ? 'bg-[#2563EB] text-white' : 'bg-slate-100 text-slate-500'}`}>
                          <IconComp className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="text-xs font-bold">{m.label}</div>
                          <div className="text-[10px] text-slate-500">{m.desc}</div>
                        </div>
                      </button>
                    );
                  })}
                </div>
                <div className="flex items-center gap-2 pt-2">
                  <button onClick={() => setStep(2)} className="py-2 px-3 rounded-lg border border-slate-300 text-xs font-semibold text-slate-600">Back</button>
                  <button
                    onClick={() => setStep(4)}
                    className="flex-1 py-2 rounded-lg bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs font-semibold shadow-xs flex items-center justify-center gap-1.5"
                  >
                    <span>Next: Confirm Details</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 4: Confirm Booking */}
            {step === 4 && (
              <div className="space-y-4">
                <label className="block text-xs font-bold text-[#0F2942]">Step 4: Confirm Booking Details</label>
                
                <div className="academic-card p-4 space-y-2 bg-slate-50 border border-slate-200 text-xs">
                  <div className="flex justify-between border-b border-slate-200 pb-2">
                    <span className="text-slate-500">Teacher:</span>
                    <span className="font-bold text-[#0F2942]">{teacher.name}</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-200 pb-2">
                    <span className="text-slate-500">Date:</span>
                    <span className="font-semibold">{selectedDate}</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-200 pb-2">
                    <span className="text-slate-500">Time Slot:</span>
                    <span className="font-semibold">{selectedTime}</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-200 pb-2">
                    <span className="text-slate-500">Session Format:</span>
                    <span className="font-bold uppercase text-[#2563EB]">{sessionType}</span>
                  </div>
                  <div className="flex justify-between pt-1 font-extrabold text-sm text-[#0F2942]">
                    <span>Total Fee:</span>
                    <span>${teacher.hourlyRate}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button onClick={() => setStep(3)} className="py-2.5 px-4 rounded-lg border border-slate-300 text-xs font-semibold text-slate-600">Back</button>
                  <button
                    onClick={handleConfirmBooking}
                    className="flex-1 py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-xs flex items-center justify-center gap-1.5"
                  >
                    <span>Confirm Booking</span>
                    <CheckCircle2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}
          </>
        ) : (
          /* STEP 5: Success Screen Confirmation Card (Section 13 Requirement) */
          <div className="text-center py-4 space-y-4">
            <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center">
              <CheckCircle2 className="w-7 h-7 stroke-[2.5]" />
            </div>

            <div>
              <h3 className="font-extrabold text-lg text-[#0F2942]">Booking Confirmed!</h3>
              <p className="text-xs text-slate-500 mt-0.5">Your consultation has been saved to your dashboard.</p>
            </div>

            {/* Confirmation Card */}
            <div className="academic-card p-4 text-left space-y-2 text-xs bg-slate-50 border border-slate-200">
              <div className="flex justify-between">
                <span className="text-slate-500">Booking ID:</span>
                <span className="font-mono font-bold text-[#0F2942]">{bookingId}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Teacher:</span>
                <span className="font-semibold text-slate-800">{teacher.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Date:</span>
                <span className="font-semibold text-slate-800">{selectedDate}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Time:</span>
                <span className="font-semibold text-slate-800">{selectedTime}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Session Type:</span>
                <span className="font-bold uppercase text-[#2563EB]">{sessionType}</span>
              </div>
            </div>

            <button
              onClick={onClose}
              className="w-full py-2.5 rounded-lg bg-[#0F2942] hover:bg-[#153454] text-white text-xs font-semibold shadow-xs"
            >
              Done & Return
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
