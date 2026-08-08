import type { Metadata } from 'next';
import './globals.css';
import { AppProvider } from '../context/AppContext';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { GlobalSearchModal } from '../components/GlobalSearchModal';
import { AuthModal } from '../components/AuthModal';
import { ToastContainer } from '../components/ToastContainer';

export const metadata: Metadata = {
  title: 'AI Lab Simulator - Virtual Experiment Platform for STEM Education',
  description: 'Perform virtual experiments in Physics, Chemistry, Biology, Electronics, and CS safely with 24/7 AI tutoring and verified lab reports.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full">
      <body className="h-full flex flex-col min-h-screen bg-[#FFFFFF] text-[#333333] selection:bg-[#4F7DFF]/20 selection:text-[#4F7DFF]">
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
