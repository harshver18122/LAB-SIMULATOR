import type { Metadata, Viewport } from 'next';
import './globals.css';
import { AppProvider } from '../context/AppContext';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { GlobalSearchModal } from '../components/GlobalSearchModal';
import { AuthModal } from '../components/AuthModal';
import { ToastContainer } from '../components/ToastContainer';

export const metadata: Metadata = {
  title: 'AI Lab Simulator — Virtual Science Laboratory & STEM Learning Platform',
  description: 'Perform interactive virtual science experiments in Physics, Chemistry, Biology, Electronics, and Programming safely with 24/7 AI tutoring and verified academic lab reports.',
  keywords: ['Virtual Lab', 'STEM Education', 'Physics Simulation', 'Chemistry Titration', 'AI Tutor', 'Science Experiments'],
};

export const viewport: Viewport = {
  themeColor: '#0F2942',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full scroll-smooth">
      <body className="h-full flex flex-col min-h-screen bg-[#F8FAFC] text-[#0F172A] selection:bg-[#2563EB]/20 selection:text-[#2563EB] antialiased">
        <AppProvider>
          <Navbar />
          <main className="flex-1">
            {children}
          </main>
          <Footer />
          <GlobalSearchModal />
          <AuthModal />
          <ToastContainer />
        </AppProvider>
      </body>
    </html>
  );
}
