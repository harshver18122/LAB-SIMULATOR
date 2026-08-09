'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useApp } from '../../context/AppContext';
import { ProtectedRoute } from '../../components/auth/ProtectedRoute';
import { Loader2, FlaskConical } from 'lucide-react';

function DashboardRedirect() {
  const { user } = useApp();
  const router = useRouter();

  useEffect(() => {
    if (!user) return;
    if (user.role === 'teacher') {
      router.replace('/dashboard/teacher');
    } else if (user.role === 'owner' || user.role === 'admin') {
      router.replace('/dashboard/admin');
    } else {
      router.replace('/dashboard/student');
    }
  }, [user, router]);

  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center p-6 space-y-4">
      <div className="w-12 h-12 rounded-2xl bg-[#0F2942] text-white flex items-center justify-center shadow-lg animate-bounce">
        <FlaskConical className="w-6 h-6 text-[#2563EB]" />
      </div>
      <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
        <Loader2 className="w-4 h-4 animate-spin text-[#2563EB]" />
        <span>Loading your customized portal...</span>
      </div>
    </div>
  );
}

export default function DashboardPage() {
  return (
    <ProtectedRoute>
      <DashboardRedirect />
    </ProtectedRoute>
  );
}
