import { 
  collection, 
  doc, 
  setDoc, 
  getDocs, 
  onSnapshot,
  updateDoc,
  arrayUnion
} from 'firebase/firestore';
import { db, isFirebaseConfigured } from './firebase';
import { 
  LabExperiment, 
  Teacher, 
  ConsultationBooking, 
  LabReport, 
  Certificate, 
  NotificationItem, 
  AIMessage, 
  UserProfile,
  QuizQuestion
} from '../types';
import { SEED_EXPERIMENTS, SEED_TEACHERS } from '../data/seedData';

// Seed Initial Experiments & Teachers to Firestore if collections are empty
export const seedInitialFirestoreData = async () => {
  if (!isFirebaseConfigured()) return;

  try {
    const expSnap = await getDocs(collection(db, 'experiments'));
    if (expSnap.empty) {
      for (const exp of SEED_EXPERIMENTS) {
        await setDoc(doc(db, 'experiments', exp.id), exp);
      }
    }

    const tchSnap = await getDocs(collection(db, 'teachers'));
    if (tchSnap.empty) {
      for (const tch of SEED_TEACHERS) {
        await setDoc(doc(db, 'teachers', tch.id), tch);
      }
    }
  } catch (err) {
    console.warn('Firestore seeding notice:', err);
  }
};

// Experiments Real-time Listener (Graceful fallback)
export const subscribeExperiments = (callback: (experiments: LabExperiment[]) => void) => {
  if (!isFirebaseConfigured()) {
    callback(SEED_EXPERIMENTS);
    return () => {};
  }

  try {
    const q = collection(db, 'experiments');
    return onSnapshot(
      q,
      (snapshot) => {
        if (!snapshot.empty) {
          const labs = snapshot.docs.map((d) => d.data() as LabExperiment);
          callback(labs);
        } else {
          seedInitialFirestoreData();
          callback(SEED_EXPERIMENTS);
        }
      },
      (err) => {
        console.warn('subscribeExperiments error fallback:', err);
        callback(SEED_EXPERIMENTS);
      }
    );
  } catch (e) {
    callback(SEED_EXPERIMENTS);
    return () => {};
  }
};

// Teachers Real-time Listener (Graceful fallback)
export const subscribeTeachers = (callback: (teachers: Teacher[]) => void) => {
  if (!isFirebaseConfigured()) {
    callback(SEED_TEACHERS);
    return () => {};
  }

  try {
    const q = collection(db, 'teachers');
    return onSnapshot(
      q,
      (snapshot) => {
        if (!snapshot.empty) {
          const teachersList = snapshot.docs.map((d) => d.data() as Teacher);
          callback(teachersList);
        } else {
          seedInitialFirestoreData();
          callback(SEED_TEACHERS);
        }
      },
      (err) => {
        console.warn('subscribeTeachers error fallback:', err);
        callback(SEED_TEACHERS);
      }
    );
  } catch (e) {
    callback(SEED_TEACHERS);
    return () => {};
  }
};

// Bookings Firestore CRUD & Real-time Listener
export const saveBookingToFirestore = async (booking: ConsultationBooking) => {
  if (!isFirebaseConfigured()) return;
  try {
    await setDoc(doc(db, 'bookings', booking.id), booking);
  } catch (err) {
    console.warn('saveBookingToFirestore error:', err);
  }
};

export const subscribeUserBookings = (userId: string, callback: (bookings: ConsultationBooking[]) => void) => {
  if (!isFirebaseConfigured() || !userId || !userId.trim()) {
    callback([]);
    return () => {};
  }

  try {
    const q = collection(db, 'bookings');
    return onSnapshot(
      q,
      (snapshot) => {
        const list = snapshot.docs.map((d) => d.data() as ConsultationBooking);
        callback(list);
      },
      () => callback([])
    );
  } catch (e) {
    callback([]);
    return () => {};
  }
};

// Reports Firestore CRUD & Real-time Listener
export const saveReportToFirestore = async (report: LabReport) => {
  if (!isFirebaseConfigured()) return;
  try {
    await setDoc(doc(db, 'reports', report.id), report);
  } catch (err) {
    console.warn('saveReportToFirestore error:', err);
  }
};

export const subscribeUserReports = (studentName: string, callback: (reports: LabReport[]) => void) => {
  if (!isFirebaseConfigured() || !studentName || !studentName.trim()) {
    callback([]);
    return () => {};
  }

  try {
    const q = collection(db, 'reports');
    return onSnapshot(
      q,
      (snapshot) => {
        const list = snapshot.docs.map((d) => d.data() as LabReport);
        callback(list);
      },
      () => callback([])
    );
  } catch (e) {
    callback([]);
    return () => {};
  }
};

export const updateReportGradeInFirestore = async (reportId: string, grade: string, feedback: string) => {
  if (!isFirebaseConfigured()) return;
  try {
    await updateDoc(doc(db, 'reports', reportId), {
      scoreGrade: grade,
      teacherFeedback: feedback
    });
  } catch (err) {
    console.warn('updateReportGradeInFirestore error:', err);
  }
};

// Certificates Firestore CRUD & Real-time Listener
export const saveCertificateToFirestore = async (cert: Certificate) => {
  if (!isFirebaseConfigured()) return;
  try {
    await setDoc(doc(db, 'certificates', cert.id), cert);
  } catch (err) {
    console.warn('saveCertificateToFirestore error:', err);
  }
};

export const subscribeUserCertificates = (studentName: string, callback: (certs: Certificate[]) => void) => {
  if (!isFirebaseConfigured() || !studentName || !studentName.trim()) {
    callback([]);
    return () => {};
  }

  try {
    const q = collection(db, 'certificates');
    return onSnapshot(
      q,
      (snapshot) => {
        const list = snapshot.docs.map((d) => d.data() as Certificate);
        callback(list);
      },
      () => callback([])
    );
  } catch (e) {
    callback([]);
    return () => {};
  }
};

// Notifications Real-time Listener
export const subscribeUserNotifications = (userId: string, callback: (notifs: NotificationItem[]) => void) => {
  if (!isFirebaseConfigured() || !userId || !userId.trim()) {
    callback([]);
    return () => {};
  }

  try {
    const q = collection(db, `users/${userId}/notifications`);
    return onSnapshot(
      q,
      (snapshot) => {
        const list = snapshot.docs.map((d) => d.data() as NotificationItem);
        callback(list);
      },
      () => callback([])
    );
  } catch (e) {
    callback([]);
    return () => {};
  }
};

// Chat Messages Firestore CRUD & Listener
export const saveChatMessageToFirestore = async (userId: string, msg: AIMessage) => {
  if (!isFirebaseConfigured() || !userId || !userId.trim()) return;
  try {
    await setDoc(doc(db, `users/${userId}/messages`, msg.id), msg);
  } catch (err) {
    console.warn('saveChatMessageToFirestore error:', err);
  }
};

export const subscribeChatMessages = (userId: string, callback: (msgs: AIMessage[]) => void) => {
  if (!isFirebaseConfigured() || !userId || !userId.trim()) {
    callback([
      {
        id: 'm1',
        sender: 'tutor',
        text: "Hello! I am **Dr. Nova**, your AI Science Tutor. Ask me any question about physics formulas, chemical reactions, or code!",
        timestamp: '10:00 AM'
      }
    ]);
    return () => {};
  }

  try {
    const q = collection(db, `users/${userId}/messages`);
    return onSnapshot(
      q,
      (snapshot) => {
        const list = snapshot.docs.map((d) => d.data() as AIMessage);
        callback(list.length > 0 ? list : [
          {
            id: 'm1',
            sender: 'tutor',
            text: "Hello! I am **Dr. Nova**, your AI Science Tutor. Ask me any question about physics formulas, chemical reactions, or code!",
            timestamp: '10:00 AM'
          }
        ]);
      },
      () => callback([])
    );
  } catch (e) {
    callback([]);
    return () => {};
  }
};

// All Users Listener for Admin Dashboard
export const subscribeAllUsers = (callback: (users: UserProfile[]) => void) => {
  if (!isFirebaseConfigured()) {
    callback([]);
    return () => {};
  }

  try {
    const q = collection(db, 'users');
    return onSnapshot(
      q,
      (snapshot) => {
        const list = snapshot.docs.map((d) => d.data() as UserProfile);
        callback(list);
      },
      (err) => console.warn('subscribeAllUsers error:', err)
    );
  } catch (e) {
    callback([]);
    return () => {};
  }
};

export const updateUserStatusInFirestore = async (userId: string, status: string) => {
  if (!isFirebaseConfigured() || !userId || !userId.trim()) return;
  try {
    await updateDoc(doc(db, 'users', userId), { status });
  } catch (err) {
    console.warn('updateUserStatusInFirestore error:', err);
  }
};

export const addQuizQuestionToFirestore = async (expId: string, quizQuestion: QuizQuestion) => {
  if (!isFirebaseConfigured()) return;
  try {
    const expRef = doc(db, 'experiments', expId);
    await updateDoc(expRef, {
      quiz: arrayUnion(quizQuestion)
    });
  } catch (err) {
    console.warn('addQuizQuestionToFirestore error:', err);
  }
};
