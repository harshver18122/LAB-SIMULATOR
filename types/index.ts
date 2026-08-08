export type UserRole = 'student' | 'teacher' | 'admin';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar: string;
  college?: string;
  grade?: string;
  xp?: number;
  completedLabsCount?: number;
  emailVerified?: boolean;
}

export type SubjectCategory = 'physics' | 'chemistry' | 'biology' | 'programming' | 'electronics';

export interface ObservationRow {
  id: string;
  trial: number;
  variable1: string; // e.g. Length (m) or Volume added (mL)
  variable2: string; // e.g. Time for 10 oscillations (s) or pH value
  calculatedResult: string; // e.g. g = 9.81 m/s^2 or Molarity = 0.1M
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number; // 0-indexed
  explanation: string;
  type?: 'mcq' | 'true-false' | 'fill-blank';
}

export interface LabExperiment {
  id: string;
  title: string;
  subject: SubjectCategory;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  duration: string; // e.g. "45 mins"
  rating: number;
  readsCount: number;
  image: string;
  aim: string;
  theory: string;
  apparatus: string[];
  procedure: string[];
  safetyInstructions: string[];
  observationHeaders: { col1: string; col2: string; col3: string };
  defaultObservations: ObservationRow[];
  resultFormula: string;
  expectedResult: string;
  conclusion: string;
  aiExplanation: string;
  quiz: QuizQuestion[];
  vivaQuestions: { q: string; a: string }[];
  isBookmarked?: boolean;
}

export interface TeacherReview {
  id: string;
  studentName: string;
  studentAvatar: string;
  rating: number;
  date: string;
  comment: string;
}

export interface Teacher {
  id: string;
  name: string;
  avatar: string;
  qualification: string;
  specialization: string;
  subject: SubjectCategory;
  experience: string;
  languages: string[];
  hourlyRate: number; // e.g. $25
  rating: number;
  totalReviews: number;
  bio: string;
  availability: string[]; // e.g. ["Mon 10:00 AM", "Wed 2:00 PM"]
  certificates: string[];
  reviews: TeacherReview[];
}

export interface ConsultationBooking {
  id: string;
  teacherId: string;
  teacherName: string;
  teacherAvatar: string;
  subject: SubjectCategory;
  sessionType: 'video' | 'voice' | 'chat';
  date: string;
  time: string;
  status: 'upcoming' | 'completed' | 'cancelled';
  meetingUrl?: string;
  amount: number;
}

export interface AIMessage {
  id: string;
  sender: 'user' | 'tutor';
  text: string;
  timestamp: string;
  attachments?: string[];
  suggestedAction?: 'notes' | 'summary' | 'quiz';
}

export interface LabReport {
  id: string;
  experimentId: string;
  experimentTitle: string;
  subject: SubjectCategory;
  date: string;
  studentName: string;
  aim: string;
  theory: string;
  procedureSummary: string;
  observations: ObservationRow[];
  calculatedResult: string;
  conclusion: string;
  aiInsights: string;
  teacherFeedback?: string;
  scoreGrade?: string;
}

export interface Certificate {
  id: string;
  studentName: string;
  courseTitle: string;
  subject: SubjectCategory;
  issueDate: string;
  verificationCode: string;
  score: number;
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  type: 'remind' | 'certificate' | 'message' | 'lab';
  read: boolean;
}
