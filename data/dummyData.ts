import { INITIAL_USER, SEED_EXPERIMENTS, SEED_TEACHERS } from './seedData';
import { ConsultationBooking, LabReport, Certificate, NotificationItem, AIMessage } from '../types';

export { INITIAL_USER };
export const MOCK_EXPERIMENTS = SEED_EXPERIMENTS;
export const MOCK_TEACHERS = SEED_TEACHERS;

export const MOCK_BOOKINGS: ConsultationBooking[] = [];
export const MOCK_REPORTS: LabReport[] = [];
export const MOCK_CERTIFICATES: Certificate[] = [];
export const MOCK_NOTIFICATIONS: NotificationItem[] = [];
export const MOCK_AI_HISTORY: AIMessage[] = [
  {
    id: 'm1',
    sender: 'tutor',
    text: "Hello! I am **Dr. Nova**, your AI Science Tutor. Ask me any question about physics formulas, chemical reactions, or code!",
    timestamp: '10:00 AM'
  }
];
