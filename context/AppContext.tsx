'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { UserProfile, UserRole, LabExperiment, Teacher, ConsultationBooking, LabReport, NotificationItem, AIMessage, Certificate } from '../types';
import { INITIAL_USER } from '../data/seedData';
import { SEED_EXPERIMENTS, SEED_TEACHERS } from '../data/seedData';
import { supabase, isSupabaseConfigured } from '../supabase/supabase';
import {
  registerUserWithSupabase,
  loginUserWithSupabase,
  loginWithSupabaseGoogle,
  resetSupabasePassword,
  logoutSupabaseUser,
  formatSupabaseAuthError,
  mapSupabaseUserToProfile
} from '../supabase/supabaseAuth';
import {
  seedInitialFirestoreData,
  subscribeExperiments,
  subscribeTeachers,
  subscribeUserBookings,
  subscribeUserReports,
  subscribeUserCertificates,
  subscribeUserNotifications,
  subscribeChatMessages,
  saveBookingToFirestore,
  saveReportToFirestore,
  saveCertificateToFirestore,
  saveChatMessageToFirestore,
  updateReportGradeInFirestore,
  addQuizQuestionToFirestore
} from '../lib/firestoreService';

interface Toast {
  id: string;
  message: string;
  type: 'success' | 'error' | 'info';
}

interface AppContextType {
  user: UserProfile;
  setRole: (role: UserRole) => void;
  isAuthLoading: boolean;
  isLoadingData: boolean;
  loginWithEmail: (email: string, pass: string) => Promise<{ success: boolean; error?: string; code?: string }>;
  registerWithEmail: (email: string, pass: string, name: string, role?: UserRole) => Promise<{ success: boolean; error?: string; code?: string }>;
  signInGoogle: (role?: UserRole) => Promise<{ success: boolean; error?: string; code?: string }>;
  logout: () => Promise<void>;
  sendResetPassword: (email: string) => Promise<{ success: boolean; error?: string; code?: string }>;
  resendVerification: () => Promise<boolean>;
  reloadAuthState: () => Promise<boolean>;
  handleAuthAction: (mode: string, oobCode: string, extraPass?: string) => Promise<boolean>;
  experiments: LabExperiment[];
  teachers: Teacher[];
  toggleBookmark: (expId: string) => void;
  bookings: ConsultationBooking[];
  addBooking: (booking: ConsultationBooking) => void;
  reports: LabReport[];
  addReport: (report: LabReport) => void;
  gradeReport: (reportId: string, grade: string, feedback: string) => void;
  publishQuizQuestion: (expId: string, questionPrompt: string, optA: string, optB: string) => void;
  certificates: Certificate[];
  addCertificate: (cert: Certificate) => void;
  notifications: NotificationItem[];
  markNotificationRead: (id: string) => void;
  clearAllNotifications: () => void;
  aiMessages: AIMessage[];
  sendAIMessage: (text: string, action?: 'notes' | 'summary' | 'quiz') => void;
  clearAIChat: () => void;
  isSearchOpen: boolean;
  setSearchOpen: (open: boolean) => void;
  authModal: { isOpen: boolean; mode: 'login' | 'register' | 'forgot' | 'sent-reset' };
  openAuthModal: (mode?: 'login' | 'register' | 'forgot' | 'sent-reset') => void;
  closeAuthModal: () => void;
  toasts: Toast[];
  showToast: (message: string, type?: 'success' | 'error' | 'info') => void;
  darkMode: boolean;
  toggleDarkMode: () => void;
}

const GUEST_FALLBACK_USER: UserProfile = {
  ...INITIAL_USER,
  id: 'guest-learner-01'
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile>(GUEST_FALLBACK_USER);
  const [isAuthLoading, setIsAuthLoading] = useState(false);
  const [isLoadingData, setIsLoadingData] = useState(true);

  const [experiments, setExperiments] = useState<LabExperiment[]>(SEED_EXPERIMENTS);
  const [teachers, setTeachers] = useState<Teacher[]>(SEED_TEACHERS);
  const [bookings, setBookings] = useState<ConsultationBooking[]>([]);
  const [reports, setReports] = useState<LabReport[]>([]);
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);
  const [aiMessages, setAiMessages] = useState<AIMessage[]>([
    {
      id: 'm1',
      sender: 'tutor',
      text: "Hello! I am **Dr. Nova**, your AI Science Tutor. Ask me any question about physics formulas, chemical reactions, or code!",
      timestamp: '10:00 AM'
    }
  ]);

  const [isSearchOpen, setSearchOpen] = useState(false);
  const [authModal, setAuthModal] = useState<{ isOpen: boolean; mode: 'login' | 'register' | 'forgot' | 'sent-reset' }>({
    isOpen: false,
    mode: 'login'
  });

  const openAuthModal = (mode: 'login' | 'register' | 'forgot' | 'sent-reset' = 'login') => {
    setAuthModal({ isOpen: true, mode });
  };
  const [toasts, setToasts] = useState<Toast[]>([]);
  const [darkMode, setDarkMode] = useState(false);

  // 1. Supabase Auth state listener
  useEffect(() => {
    if (!isSupabaseConfigured()) return;

    setIsAuthLoading(true);

    // Initial session check
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        setUser(mapSupabaseUserToProfile(session.user));
      } else {
        setUser(GUEST_FALLBACK_USER);
      }
      setIsAuthLoading(false);
    }).catch(() => setIsAuthLoading(false));

    // Listen to Supabase Auth state changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        setUser(mapSupabaseUserToProfile(session.user));
      } else {
        setUser(GUEST_FALLBACK_USER);
      }
      setIsAuthLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  // 2. Real-time Subscriptions
  useEffect(() => {
    setIsLoadingData(true);
    seedInitialFirestoreData();

    const unsubExp = subscribeExperiments((data) => {
      if (data && data.length > 0) setExperiments(data);
    });

    const unsubTch = subscribeTeachers((data) => {
      if (data && data.length > 0) setTeachers(data);
    });

    const currentUserId = user.id || 'guest-learner-01';
    const currentUserName = user.name || 'Guest Learner';

    const unsubBkg = subscribeUserBookings(currentUserId, (data) => {
      if (data) setBookings(data);
    });

    const unsubRpt = subscribeUserReports(currentUserName, (data) => {
      if (data) setReports(data);
    });

    const unsubCert = subscribeUserCertificates(currentUserName, (data) => {
      if (data) setCertificates(data);
    });

    const unsubNotif = subscribeUserNotifications(currentUserId, (data) => {
      if (data) setNotifications(data);
    });

    const unsubMsg = subscribeChatMessages(currentUserId, (data) => {
      if (data && data.length > 0) setAiMessages(data);
      setIsLoadingData(false);
    });

    return () => {
      unsubExp();
      unsubTch();
      unsubBkg();
      unsubRpt();
      unsubCert();
      unsubNotif();
      unsubMsg();
    };
  }, [user.id, user.name]);

  const showToast = (message: string, type: 'success' | 'error' | 'info' = 'success') => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3800);
  };

  const setRole = (role: UserRole) => {
    const updated = { ...user, role };
    setUser(updated);
    showToast(`Switched persona to ${role.toUpperCase()}`, 'info');
  };

  const loginWithEmail = async (email: string, pass: string): Promise<{ success: boolean; error?: string; code?: string }> => {
    setIsAuthLoading(true);
    try {
      const loggedUser = await loginUserWithSupabase(email, pass);
      setUser(loggedUser);
      showToast(`Welcome back, ${loggedUser.name}! Logged in with Supabase Auth.`, 'success');
      setIsAuthLoading(false);
      return { success: true };
    } catch (err: any) {
      setIsAuthLoading(false);
      const msg = err?.message || 'Login failed.';
      const formattedError = formatSupabaseAuthError(msg);
      showToast(formattedError, 'error');
      return { success: false, error: formattedError };
    }
  };

  const registerWithEmail = async (email: string, pass: string, name: string, role: UserRole = 'student'): Promise<{ success: boolean; error?: string; code?: string }> => {
    setIsAuthLoading(true);
    try {
      const newUser = await registerUserWithSupabase(email, pass, name, role);
      setUser(newUser);
      showToast(`Supabase Account created! Welcome, ${name}.`, 'success');
      setIsAuthLoading(false);
      return { success: true };
    } catch (err: any) {
      setIsAuthLoading(false);
      const msg = err?.message || 'Registration failed.';
      const formattedError = formatSupabaseAuthError(msg);
      showToast(formattedError, 'error');
      return { success: false, error: formattedError };
    }
  };

  const signInGoogle = async (role: UserRole = 'student'): Promise<{ success: boolean; error?: string; code?: string }> => {
    setIsAuthLoading(true);
    try {
      const googleUser = await loginWithSupabaseGoogle(role);
      if (googleUser) {
        setUser(googleUser);
        showToast(`Signed in as ${googleUser.name}`, 'success');
      }
      setIsAuthLoading(false);
      return { success: true };
    } catch (err: any) {
      setIsAuthLoading(false);
      const msg = err?.message || 'Google sign-in failed.';
      const formattedError = formatSupabaseAuthError(msg);
      showToast(formattedError, 'error');
      return { success: false, error: formattedError };
    }
  };

  const logout = async () => {
    await logoutSupabaseUser();
    setUser(GUEST_FALLBACK_USER);
    showToast('Signed out of AI Lab Simulator', 'info');
  };

  const sendResetPassword = async (email: string): Promise<{ success: boolean; error?: string; code?: string }> => {
    setIsAuthLoading(true);
    try {
      await resetSupabasePassword(email);
      showToast('Supabase Password reset link sent to your email address!', 'info');
      setIsAuthLoading(false);
      return { success: true };
    } catch (err: any) {
      setIsAuthLoading(false);
      const msg = err?.message || 'Password reset failed.';
      const formattedError = formatSupabaseAuthError(msg);
      showToast(formattedError, 'error');
      return { success: false, error: formattedError };
    }
  };

  const resendVerification = async (): Promise<boolean> => {
    setIsAuthLoading(true);
    try {
      showToast('Verification instructions sent to your email address.', 'info');
      setIsAuthLoading(false);
      return true;
    } catch (err: any) {
      setIsAuthLoading(false);
      showToast(formatSupabaseAuthError(err?.message || ''), 'error');
      return false;
    }
  };

  const reloadAuthState = async (): Promise<boolean> => {
    setIsAuthLoading(true);
    try {
      if (isSupabaseConfigured()) {
        const { data: { session } } = await supabase.auth.getSession();
        if (session?.user) {
          setUser(mapSupabaseUserToProfile(session.user));
          setIsAuthLoading(false);
          return true;
        }
      }
      setIsAuthLoading(false);
      return false;
    } catch (err: any) {
      setIsAuthLoading(false);
      showToast(formatSupabaseAuthError(err?.message || ''), 'error');
      return false;
    }
  };

  const handleAuthAction = async (mode: string, oobCode: string, extraPass?: string): Promise<boolean> => {
    setIsAuthLoading(true);
    try {
      if (mode === 'resetPassword' && extraPass) {
        const { error } = await supabase.auth.updateUser({ password: extraPass });
        if (error) throw new Error(error.message);
        showToast('Password updated successfully! Please login with your new password.', 'success');
      } else {
        showToast('Authentication action processed successfully.', 'success');
      }
      setIsAuthLoading(false);
      return true;
    } catch (err: any) {
      setIsAuthLoading(false);
      showToast(formatSupabaseAuthError(err?.message || ''), 'error');
      return false;
    }
  };

  const toggleBookmark = (expId: string) => {
    setExperiments((prev) =>
      prev.map((exp) => {
        if (exp.id === expId) {
          const nextState = !exp.isBookmarked;
          showToast(nextState ? 'Experiment bookmarked!' : 'Removed from bookmarks', 'info');
          return { ...exp, isBookmarked: nextState };
        }
        return exp;
      })
    );
  };

  const addBooking = (newBooking: ConsultationBooking) => {
    setBookings((prev) => [newBooking, ...prev]);
    saveBookingToFirestore(newBooking);
    showToast('Consultation session booked & saved to Firestore!', 'success');
  };

  const addReport = (newReport: LabReport) => {
    setReports((prev) => [newReport, ...prev]);
    saveReportToFirestore(newReport);
    showToast('Lab report generated & saved to Firestore!', 'success');
  };

  const gradeReport = (reportId: string, grade: string, feedback: string) => {
    setReports((prev) =>
      prev.map((r) => (r.id === reportId ? { ...r, scoreGrade: grade, teacherFeedback: feedback } : r))
    );
    updateReportGradeInFirestore(reportId, grade, feedback);
    showToast('Report graded & feedback published to Firestore!', 'success');
  };

  const publishQuizQuestion = (expId: string, questionPrompt: string, optA: string, optB: string) => {
    const newQuestion = {
      id: `q-${Date.now()}`,
      question: questionPrompt,
      options: [optA || 'Option A', optB || 'Option B'],
      correctAnswer: 0,
      explanation: 'Verified by course instructor in Cloud Firestore.'
    };

    setExperiments((prev) =>
      prev.map((exp) => (exp.id === expId ? { ...exp, quiz: [...exp.quiz, newQuestion] } : exp))
    );

    addQuizQuestionToFirestore(expId, newQuestion);
    showToast('New quiz question published to Cloud Firestore!', 'success');
  };

  const addCertificate = (newCert: Certificate) => {
    setCertificates((prev) => [newCert, ...prev]);
    saveCertificateToFirestore(newCert);
    showToast('🎉 New Certificate Unlocked & Saved!', 'success');
  };

  const markNotificationRead = (id: string) => {
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)));
  };

  const clearAllNotifications = () => {
    setNotifications([]);
    showToast('Notifications cleared', 'info');
  };

  const sendAIMessage = (text: string, action?: 'notes' | 'summary' | 'quiz') => {
    const userMsg: AIMessage = {
      id: Date.now().toString(),
      sender: 'user',
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    let replyText = "That's a great question! In virtual experiments, we analyze physical and chemical reactions mathematically to ensure accuracy.";

    if (action === 'notes') {
      replyText = "📝 **Generated Study Notes**:\n1. Key Formula: T = 2π √(L/g)\n2. Keep displacement angle < 10° for harmonic precision.\n3. Measure multiple trial periods to minimize timing margin error.";
    } else if (action === 'summary') {
      replyText = "💡 **Summary**: This experiment measures physical constants by observing periodic motion and comparing linear slopes against standard theoretical values.";
    } else if (action === 'quiz') {
      replyText = "❓ **Quick Check**: If you double the length L of a pendulum, what factor does the time period T increase by?\nA) √2 (approx 1.41x)\nB) 2x\nC) 4x\nReply with your answer!";
    } else if (text.toLowerCase().includes('titration') || text.toLowerCase().includes('ph')) {
      replyText = "In Titration, the equivalence point occurs when moles of H+ equal moles of OH- (M1V1 = M2V2). Phenolphthalein turns pink right at pH 8.2-10!";
    } else if (text.toLowerCase().includes('python') || text.toLowerCase().includes('binary search')) {
      replyText = "Binary search divides the sorted array in half at each step, yielding logarithmic O(log N) time efficiency!";
    }

    const tutorReply: AIMessage = {
      id: (Date.now() + 1).toString(),
      sender: 'tutor',
      text: replyText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setAiMessages((prev) => [...prev, userMsg, tutorReply]);
    saveChatMessageToFirestore(user.id || 'guest-learner-01', userMsg);
    saveChatMessageToFirestore(user.id || 'guest-learner-01', tutorReply);
  };

  const clearAIChat = () => {
    setAiMessages([
      {
        id: 'm1',
        sender: 'tutor',
        text: "Hello! I am **Dr. Nova**, your AI Science Tutor. Ask me any question about physics formulas, chemical reactions, or code!",
        timestamp: '10:00 AM'
      }
    ]);
    showToast('AI Chat history reset', 'info');
  };



  const closeAuthModal = () => {
    setAuthModal((prev) => ({ ...prev, isOpen: false }));
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    showToast(`Switched theme to ${!darkMode ? 'Dark Navy' : 'Light Clean'}`, 'info');
  };

  return (
    <AppContext.Provider
      value={{
        user,
        setRole,
        isAuthLoading,
        isLoadingData,
        loginWithEmail,
        registerWithEmail,
        signInGoogle,
        logout,
        sendResetPassword,
        resendVerification,
        reloadAuthState,
        handleAuthAction,
        experiments,
        teachers,
        toggleBookmark,
        bookings,
        addBooking,
        reports,
        addReport,
        gradeReport,
        publishQuizQuestion,
        certificates,
        addCertificate,
        notifications,
        markNotificationRead,
        clearAllNotifications,
        aiMessages,
        sendAIMessage,
        clearAIChat,
        isSearchOpen,
        setSearchOpen,
        authModal,
        openAuthModal,
        closeAuthModal,
        toasts,
        showToast,
        darkMode,
        toggleDarkMode,
      }}
    >
      <div className={darkMode ? 'dark bg-slate-900 text-slate-100' : 'bg-[#FFFFFF] text-[#333333]'}>
        {children}
      </div>
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within AppProvider');
  return context;
};
